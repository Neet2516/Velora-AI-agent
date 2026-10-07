"use client";

import React, { useState } from "react";
import { RefreshCw, Radio, AlertCircle, Trash2, Zap, Send } from "lucide-react";

export type PipelineConnectionStatus = "connected" | "reconnecting" | "error";

interface SignalStatusBannerProps {
  status: PipelineConnectionStatus;
  signalCount?: number;
  lastUpdated?: Date | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function SignalStatusBanner({
  status,
  signalCount = 0,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
}: SignalStatusBannerProps) {
  const [isClearing, setIsClearing] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleClear = async () => {
    try {
      setIsClearing(true);
      await fetch("/api/signals", { method: "DELETE" });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to clear signals buffer:", err);
    } finally {
      setIsClearing(false);
    }
  };

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "simulate_xauusd" }),
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to simulate signal:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-2 border-black dark:border-[#263B70] bg-[#F2F4F8] dark:bg-[#081331] mb-8 dark-glow-card transition-colors duration-300">
      {/* Left: Status Indicator & Counter */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {status === "connected" && (
          <div className="flex items-center gap-2 bg-black dark:bg-[#101D42] text-white px-2.5 py-1 border border-transparent dark:border-[#263B70]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B2B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4B2B]" />
            </span>
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              SIMULATED TELEMETRY FEED
            </span>
          </div>
        )}

        {status === "reconnecting" && (
          <div className="flex items-center gap-2 bg-white dark:bg-[#0D1838] text-foreground border border-black dark:border-[#263B70] px-2.5 py-1">
            <RefreshCw className="h-3 w-3 animate-spin text-[#5B7CFF] dark:text-[#6F94FF]" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              RECONNECTING...
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 bg-[#FF4B2B] text-white px-2.5 py-1">
            <AlertCircle className="h-3 w-3" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              FEED OFFLINE
            </span>
          </div>
        )}

        <span className="font-mono text-xs text-foreground font-bold">
          [ {signalCount} {signalCount === 1 ? "SIGNAL" : "SIGNALS"}{" "}
          {signalCount === 0 ? "IN BUFFER (LISTENING)" : "STREAMING"} ]
        </span>
      </div>

      {/* Right: Quick Simulation & Buffer Controls */}
      <div className="flex items-center gap-2 flex-wrap self-stretch sm:self-auto justify-end text-xs text-foreground font-mono font-bold">
        {/* Quick Test XAUUSD Button */}
        <button
          type="button"
          onClick={handleSimulate}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#0D1838] hover:bg-[#5B7CFF] hover:border-[#5B7CFF] dark:hover:bg-[#5B7CFF] dark:hover:border-[#6F94FF] hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold uppercase text-foreground"
          title="Send a simulated XAUUSD signal to preview the two-column card"
        >
          <Zap className="h-3 w-3 text-[#5B7CFF] dark:text-[#6F94FF] group-hover:text-white" />
          <span>{isSimulating ? "SIMULATING..." : "+ SIMULATE XAUUSD"}</span>
        </button>

        {/* Clear Buffer Button */}
        {signalCount > 0 && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isClearing}
            className="inline-flex items-center gap-1 px-2.5 py-1 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#0D1838] hover:bg-[#FF4B2B] hover:border-[#FF4B2B] hover:text-white text-muted-foreground hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
            title="Clear the current signals in memory to wait for incoming multi-agent signals"
          >
            <Trash2 className="h-3 w-3" />
            <span>{isClearing ? "CLEARING..." : "CLEAR BUFFER"}</span>
          </button>
        )}

        {/* Refresh Feed Button */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1 px-2.5 py-1 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#0D1838] hover:bg-black hover:text-white dark:hover:bg-[#101D42] transition-colors cursor-pointer text-xs font-mono font-bold uppercase text-foreground"
            title="Refresh signals buffer"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>SYNC</span>
          </button>
        )}
      </div>
    </div>
  );
}
