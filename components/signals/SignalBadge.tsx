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
          className={`inline-flex items-center gap-1.5 rounded-none border-2 border-black dark:border-[#263B70] bg-black dark:bg-[#101D42] text-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4B2B] animate-pulse" />
          <span>ACTIVE</span>
        </div>
      );
    case "TP1_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-[#F2F4F8] dark:bg-[#081331] text-foreground px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3] text-[#5B7CFF] dark:text-[#6F94FF]" />
          <span>TP1 HIT</span>
        </div>
      );
    case "TP2_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-black dark:bg-[#0D1838] text-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3] text-[#5B7CFF] dark:text-[#6F94FF]" />
          <span>TP2 HIT</span>
        </div>
      );
    case "TP3_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-none border-2 border-[#5B7CFF] dark:border-[#6F94FF] bg-[#5B7CFF] dark:bg-[#6F94FF] text-white px-2 py-0.5 font-mono text-[10px] font-black tracking-wider uppercase shadow-[0_0_10px_rgba(91,124,255,0.4)] ${className || ""}`}
        >
          <Check className="h-3 w-3 stroke-[3]" />
          <span>TP3 HIT (ALL)</span>
        </div>
      );
    case "SL_HIT":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-black dark:bg-[#0D1838] text-white px-2 py-0.5 font-mono text-[10px] font-black tracking-wider uppercase ${className || ""}`}
        >
          <X className="h-3 w-3 text-[#FF4B2B] stroke-[3]" />
          <span>SL HIT</span>
        </div>
      );
    case "UNPARSED":
      return (
        <div
          className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-[#F2F4F8] dark:bg-[#081331] text-foreground px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
        >
          <AlertTriangle className="h-3 w-3 text-[#FF4B2B]" />
          <span>UNPARSED</span>
        </div>
      );
    default:
      return (
        <div
          className={`inline-flex items-center rounded-none border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${className || ""}`}
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
        className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-black dark:bg-[#101D42] text-white font-mono font-black text-xs px-2.5 py-0.5 tracking-wider uppercase ${className || ""}`}
      >
        <ArrowUp className="h-3 w-3 stroke-[3] text-[#5B7CFF] dark:text-[#6F94FF]" />
        <span>BUY</span>
      </div>
    );
  }

  if (normalized === "SELL") {
    return (
      <div
        className={`inline-flex items-center gap-1 rounded-none border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground font-mono font-black text-xs px-2.5 py-0.5 tracking-wider uppercase ${className || ""}`}
      >
        <ArrowDown className="h-3 w-3 stroke-[3] text-[#FF4B2B]" />
        <span>SELL</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-none border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground font-mono text-xs px-2 py-0.5 uppercase ${className || ""}`}
    >
      {direction || "UNKNOWN"}
    </div>
  );
}
