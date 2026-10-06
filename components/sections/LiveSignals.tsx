"use client";

import React, { useState, useMemo } from "react";
import { useSignals } from "@/hooks/useSignals";
import { SignalList } from "@/components/signals/SignalList";
import { SignalStatusBanner } from "@/components/signals/SignalStatusBanner";
import { SignalListError } from "@/components/signals/SignalListError";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, Filter } from "lucide-react";

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
    <section id="live-signals" className="py-20 md:py-28 border-t border-border/60 bg-background/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Live Telemetry
              </Badge>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Live Signals Feed
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">
              Direct telemetry from the Velora algorithmic pipeline. Signals and target hits update in-place within 10 seconds.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Signal status filters"
            className="flex items-center gap-1.5 p-1 rounded-lg bg-card/80 border border-border overflow-x-auto max-w-full"
          >
            {(
              [
                { id: "ALL", label: "All" },
                { id: "ACTIVE", label: "Active" },
                { id: "TP_HIT", label: "TP Hits" },
                { id: "SL_HIT", label: "SL Hits" },
                { id: "UNPARSED", label: "Unparsed" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
