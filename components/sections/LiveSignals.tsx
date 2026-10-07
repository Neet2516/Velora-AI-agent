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
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 flex-wrap">
          <span className="font-mono text-sm font-black text-[#5B7CFF] dark:text-[#6F94FF]">
            05
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            / LIVE TELEMETRY
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black dark:bg-[#263B70]" />
          <div className="inline-flex items-center gap-1.5 border border-black dark:border-[#263B70] bg-white dark:bg-[#081331] px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
            <span className="h-2 w-2 rounded-full bg-[#FF4B2B] animate-pulse" />
            <span className="text-foreground">STREAM ACTIVE</span>
          </div>
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-black dark:border-[#263B70]">
          <div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-tight">
              LIVE SIGNALS FEED
            </h2>
            <p className="mt-2 text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Direct telemetry from the Velora algorithmic pipeline. Signals and target hits update in-place within 10 seconds.
            </p>
          </div>

          {/* Filter Tabs in Architectural Sharp Bar */}
          <div
            role="tablist"
            aria-label="Signal status filters"
            className="flex items-center border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] divide-x-2 divide-black dark:divide-[#263B70] dark-glow-card overflow-x-auto max-w-full"
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
                className={`px-4 py-2.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none ${
                  activeTab === tab.id
                    ? "bg-black dark:bg-[#5B7CFF] text-white"
                    : "bg-white dark:bg-[#081331] text-foreground hover:bg-[#F2F4F8] dark:hover:bg-[#0D1838]"
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
