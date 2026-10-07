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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-2 border-black bg-[#F2F2F2] mb-8 shadow-sm">
      {/* Left: Status Indicator & Counter */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {status === "connected" && (
          <div className="flex items-center gap-2 bg-black text-white px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3000] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3000]" />
            </span>
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              TELEMETRY LIVE
            </span>
          </div>
        )}

        {status === "reconnecting" && (
          <div className="flex items-center gap-2 bg-white text-black border border-black px-2.5 py-1">
            <RefreshCw className="h-3 w-3 animate-spin text-[#FF3000]" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              RECONNECTING...
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 bg-[#FF3000] text-white px-2.5 py-1">
            <AlertCircle className="h-3 w-3" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider">
              FEED OFFLINE
            </span>
          </div>
        )}

        <span className="font-mono text-xs text-black font-bold">
          [ {signalCount} {signalCount === 1 ? "SIGNAL" : "SIGNALS"}{" "}
          {signalCount === 0 ? "IN BUFFER (LISTENING)" : "STREAMING"} ]
        </span>
      </div>

      {/* Right: Quick Simulation & Buffer Controls */}
      <div className="flex items-center gap-2 flex-wrap self-stretch sm:self-auto justify-end text-xs text-black font-mono font-bold">
        {/* Quick Test XAUUSD Button */}
        <button
          type="button"
          onClick={handleSimulate}
          disabled={isSimulating}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black bg-white hover:bg-[#FF3000] hover:border-[#FF3000] hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
          title="Send a simulated XAUUSD signal to preview the two-column card"
        >
          <Zap className="h-3 w-3 text-[#FF3000] group-hover:text-white" />
          <span>{isSimulating ? "SENDING..." : "+ TEST XAUUSD"}</span>
        </button>

        {/* Clear Buffer Button (Wait for real Telegram) */}
        {signalCount > 0 && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isClearing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
            title="Clear all signals in buffer and return to clean waiting state"
          >
            <Trash2 className="h-3 w-3" />
            <span>{isClearing ? "CLEARING..." : "WAIT FOR TELE"}</span>
          </button>
        )}

        {/* Sync / Refresh */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 border-2 border-black bg-black text-white hover:bg-[#FF3000] hover:border-[#FF3000] transition-colors cursor-pointer text-xs font-mono font-bold uppercase"
            title="Refresh signal feed"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>SYNC</span>
          </button>
        )}
      </div>
    </div>
  );
}
