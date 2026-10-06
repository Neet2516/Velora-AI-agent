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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-md mb-6">
      {/* Left: Status Indicator */}
      <div className="flex items-center gap-3">
        {status === "connected" && (
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-foreground">
              TELEMETRY LIVE
            </span>
          </div>
        )}

        {status === "reconnecting" && (
          <div className="flex items-center gap-2 text-warning">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span className="font-mono text-xs font-semibold">
              RECONNECTING TO PIPELINE...
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-3.5 w-3.5" />
            <span className="font-mono text-xs font-semibold">
              FEED OFFLINE
            </span>
          </div>
        )}

        <span className="text-border hidden sm:inline">|</span>

        <span className="text-xs text-muted-foreground font-mono">
          {signalCount} {signalCount === 1 ? "Signal" : "Signals"} Active
        </span>
      </div>

      {/* Right: Last updated & Manual refresh */}
      <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-muted-foreground font-mono">
        {lastUpdated && (
          <span className="hidden md:inline">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2 py-1 rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs"
            title="Refresh signal feed"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
        )}
      </div>
    </div>
  );
}
