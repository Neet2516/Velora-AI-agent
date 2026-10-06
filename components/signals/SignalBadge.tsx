import React from "react";
import { Badge } from "@/components/ui/badge";
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
        <Badge
          variant="warning"
          className={`gap-1.5 font-mono text-[11px] font-semibold ${className}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-warning animate-ping" />
          <span>ACTIVE</span>
        </Badge>
      );
    case "TP1_HIT":
      return (
        <Badge
          variant="success"
          className={`gap-1 font-mono text-[11px] font-semibold ${className}`}
        >
          <Check className="h-3 w-3" />
          <span>TP1 HIT</span>
        </Badge>
      );
    case "TP2_HIT":
      return (
        <Badge
          variant="success"
          className={`gap-1 font-mono text-[11px] font-semibold ${className}`}
        >
          <Check className="h-3 w-3" />
          <span>TP2 HIT</span>
        </Badge>
      );
    case "TP3_HIT":
      return (
        <Badge
          variant="success"
          className={`gap-1 font-mono text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ${className}`}
        >
          <Check className="h-3 w-3" />
          <span>TP3 HIT (ALL)</span>
        </Badge>
      );
    case "SL_HIT":
      return (
        <Badge
          variant="destructive"
          className={`gap-1 font-mono text-[11px] font-semibold ${className}`}
        >
          <X className="h-3 w-3" />
          <span>SL HIT</span>
        </Badge>
      );
    case "UNPARSED":
      return (
        <Badge
          variant="secondary"
          className={`gap-1 font-mono text-[11px] font-semibold text-muted-foreground ${className}`}
        >
          <AlertTriangle className="h-3 w-3 text-warning" />
          <span>UNPARSED</span>
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className={`font-mono text-[11px] ${className}`}>
          {status}
        </Badge>
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
      <Badge
        variant="success"
        className={`gap-1 font-mono font-bold tracking-wider text-xs px-2.5 py-0.5 ${className}`}
      >
        <ArrowUp className="h-3 w-3 stroke-[3]" />
        <span>BUY</span>
      </Badge>
    );
  }

  if (normalized === "SELL") {
    return (
      <Badge
        variant="destructive"
        className={`gap-1 font-mono font-bold tracking-wider text-xs px-2.5 py-0.5 ${className}`}
      >
        <ArrowDown className="h-3 w-3 stroke-[3]" />
        <span>SELL</span>
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`font-mono text-xs ${className}`}>
      {direction || "UNKNOWN"}
    </Badge>
  );
}
