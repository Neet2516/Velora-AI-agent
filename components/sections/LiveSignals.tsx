"use client";

import React, { useState, useMemo } from "react";
import { useSignals } from "@/hooks/useSignals";
import { SignalList } from "@/components/signals/SignalList";
import { SignalStatusBanner } from "@/components/signals/SignalStatusBanner";
import { SignalListError } from "@/components/signals/SignalListError";

type FilterTab = "ALL" | "ACTIVE" | "TP_HIT" | "SL_HIT" | "UNPARSED";

export function LiveSignals() {
  const {
    signals,
    isLoading,
    isError,
    error,
    isRefetching,
    connectionStatus,
    lastUpdated,
    refetch,
  } = useSignals();

  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");

  // Filter signals based on selected tab
  const filteredSignals = useMemo(() => {
    if (activeTab === "ALL") return signals;
    if (activeTab === "ACTIVE") return signals.filter((s) => s.status === "ACTIVE");
    if (activeTab === "TP_HIT")
      return signals.filter(
        (s) => s.status === "TP1_HIT" || s.status === "TP2_HIT" || s.status === "TP3_HIT"
      );
    if (activeTab === "SL_HIT") return signals.filter((s) => s.status === "SL_HIT");
    if (activeTab === "UNPARSED") return signals.filter((s) => s.status === "UNPARSED");
    return signals;
  }, [signals, activeTab]);

  return (
    <section id="live-signals" className="py-16 md:py-24 border-b-2 border-black dark:border-[#263B70] bg-transparent relative transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-gray-200/80">
          <div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-tight">
              LIVE SIGNALS FEED
            </h2>
            <p className="mt-2 text-base text-gray-600 font-medium max-w-2xl leading-relaxed">
              Direct telemetry from the Velora algorithmic pipeline. Signals and target hits update in-place within 10 seconds.
            </p>
          </div>

          {/* Filter Tabs in Rounded Modern Bar */}
          <div
            role="tablist"
            aria-label="Signal status filters"
            className="flex items-center border border-gray-200 bg-white rounded-lg p-1 gap-1 overflow-x-auto max-w-full shadow-sm"
          >
            {(
              [
                { id: "ALL", label: "ALL SIGNALS" },
                { id: "ACTIVE", label: "ACTIVE" },
                { id: "TP_HIT", label: "TP HITS" },
                { id: "SL_HIT", label: "SL HITS" },
                { id: "UNPARSED", label: "UNPARSED" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider uppercase rounded-md transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none ${
                  activeTab === tab.id
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Telemetry Status Banner */}
        <SignalStatusBanner
          status={connectionStatus}
          signalCount={filteredSignals.length}
          lastUpdated={lastUpdated}
          onRefresh={() => refetch()}
          isRefreshing={isRefetching}
        />

        {/* Error State or Signal List */}
        {isError && signals.length === 0 ? (
          <SignalListError
            message={
              error instanceof Error
                ? error.message
                : "Unable to reach the Velora signal pipeline."
            }
            onRetry={() => refetch()}
            isRetrying={isRefetching}
          />
        ) : (
          <SignalList signals={filteredSignals} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}
