import React from "react";
import { SignalStatus, SignalDirection, normalizeDirection } from "@/lib/types/signal";
import { Check, X, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";

interface StatusBadgeProps {
  status: SignalStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case "ACTIVE":
      return (
        <div
          className={`inline-flex items-center gap-1.5 rounded-md border border-gray-900 bg-black text-white px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4B2B] animate-pulse" />
          <span>ACTIVE</span>
        </div>
      );
    case "TP1_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-100 text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3] text-emerald-600" />
          <span>TP1 HIT</span>
        </div>
      );
    case "TP2_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-gray-800 bg-gray-900 text-white px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3] text-emerald-400" />
          <span>TP2 HIT</span>
        </div>
      );
    case "TP3_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-emerald-600 bg-emerald-600 text-white px-2.5 py-0.5 font-mono text-[10px] font-black tracking-wider uppercase shadow-sm ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3]" />
          <span>TP3 HIT (ALL)</span>
        </div>
      );
    case "SL_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-red-600 bg-red-600 text-white px-2.5 py-0.5 font-mono text-[10px] font-black tracking-wider uppercase ${className || ""}`}
        >
          <X className="h-3 w-3 text-white stroke-[3]" />
          <span>SL HIT</span>
        </div>
      );
    case "UNPARSED":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <AlertTriangle className="h-3 w-3 text-amber-600" />
          <span>UNPARSED</span>
        </div>
      );
    default:
      return (
        <div
          className={`inline-flex items-center rounded-md border border-gray-200 bg-white text-black px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          {status}
        </div>
      );
  }
}

interface DirectionBadgeProps {
  direction?: SignalDirection | null;
  className?: string;
}

export function DirectionBadge({ direction, className }: DirectionBadgeProps) {
  const normalized = normalizeDirection(direction);

  if (normalized === "BUY") {
    return (
      <div
        className={`inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 font-mono font-black text-xs px-2.5 py-0.5 tracking-wider uppercase ${className || ""}`}
      >
        <ArrowUp className="h-3 w-3 stroke-[3] text-emerald-600" />
        <span>BUY</span>
      </div>
    );
  }

  if (normalized === "SELL") {
    return (
      <div
        className={`inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 text-red-800 font-mono font-black text-xs px-2.5 py-0.5 tracking-wider uppercase ${className || ""}`}
      >
        <ArrowDown className="h-3 w-3 stroke-[3] text-red-600" />
        <span>SELL</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-md border border-gray-200 bg-white text-black font-mono text-xs px-2.5 py-0.5 uppercase ${className || ""}`}
    >
      {direction || "UNKNOWN"}
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${className || ""}`}
      title="Simulated demo data for market telemetry visualization"
    >
      <span>SIMULATED</span>
    </span>
  );
}
