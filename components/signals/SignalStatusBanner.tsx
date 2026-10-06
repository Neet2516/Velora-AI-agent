import React from "react";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Radio, AlertCircle } from "lucide-react";

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
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-2 border-black bg-[#F2F2F2] mb-8">
      {/* Left: Status Indicator */}
      <div className="flex items-center gap-3 flex-wrap">
        {status === "connected" && (
          <div className="flex items-center gap-2 bg-black text-white px-2.5 py-1">
            <span className="h-2 w-2 bg-[#FF3000]" />
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
          [ {signalCount} {signalCount === 1 ? "SIGNAL" : "SIGNALS"} ACTIVE ]
        </span>
      </div>

      {/* Right: Last updated & Manual refresh */}
      <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-black font-mono font-bold">
        {lastUpdated && (
          <span className="hidden md:inline">
            SYNCED {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer text-xs font-mono font-bold uppercase"
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
