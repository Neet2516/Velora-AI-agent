import React from "react";
import { Signal, getSignalSymbol } from "@/lib/types/signal";
import { Card } from "@/components/ui/card";
import { StatusBadge, DirectionBadge } from "./SignalBadge";
import { Check, X, Clock, Terminal } from "lucide-react";

interface SignalCardProps {
  signal: Signal;
  className?: string;
}

/**
 * Format relative time or fallback cleanly
 */
function formatSignalTime(timestampStr: string): string {
  try {
    const date = new Date(timestampStr);
    if (isNaN(date.getTime())) return timestampStr;
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return "Just now";
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return `${Math.floor(diffSeconds / 86400)}d ago`;
  } catch {
    return timestampStr;
  }
}

/**
 * Format numerical prices with consistent separators
 */
function formatPrice(value?: number | null): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  }).format(value);
}

export function SignalCard({ signal, className }: SignalCardProps) {
  const isUnparsed = signal.status === "UNPARSED";
  const symbol = getSignalSymbol(signal);
  const formattedTime = formatSignalTime(signal.created_at);

  const tp1Hit =
    signal.status === "TP1_HIT" ||
    signal.status === "TP2_HIT" ||
    signal.status === "TP3_HIT";
  const tp2Hit = signal.status === "TP2_HIT" || signal.status === "TP3_HIT";
  const tp3Hit = signal.status === "TP3_HIT";
  const slHit = signal.status === "SL_HIT";

  return (
    <Card
      className={`relative overflow-hidden border-border/80 bg-card/80 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-md ${
        signal.status === "ACTIVE" ? "ring-1 ring-warning/20" : ""
      } ${className || ""}`}
    >
      {/* Top Banner Accent */}
      <div
        className={`h-1 w-full ${
          signal.status === "ACTIVE"
            ? "bg-warning"
            : tp3Hit
            ? "bg-emerald-400"
            : tp1Hit
            ? "bg-success"
            : slHit
            ? "bg-destructive"
            : "bg-border"
        }`}
      />

      <div className="p-5 sm:p-6">
        {/* Header: Symbol + Badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {isUnparsed ? "MESSAGE ENTRY" : symbol}
              </span>
              {!isUnparsed && signal.direction && (
                <DirectionBadge direction={signal.direction} />
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground font-mono">
              <Clock className="h-3 w-3" />
              <span>{formattedTime}</span>
              <span className="text-border">•</span>
              <span className="truncate max-w-[120px] text-muted-foreground/70">
                #{signal.id.slice(0, 8)}
              </span>
            </div>
          </div>

          <StatusBadge status={signal.status} />
        </div>

        {/* Content Body: Structured Data OR Unparsed Fallback */}
        {isUnparsed ? (
          /* UNPARSED RAW MESSAGE FALLBACK */
          <div className="mt-4 rounded-lg border border-border/70 bg-background/80 p-3.5">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-medium text-muted-foreground">
              <Terminal className="h-3.5 w-3.5 text-warning" />
              <span>Raw Telegram Transmission</span>
            </div>
            <pre className="font-mono text-xs text-foreground/90 whitespace-pre-wrap break-words leading-relaxed select-text">
              {signal.raw_text || "Malformed signal received. Structured parameters unavailable."}
            </pre>
          </div>
        ) : (
          /* STRUCTURED SIGNAL LEVELS */
          <div className="mt-4 space-y-2 text-xs sm:text-sm">
            {/* Entry Price */}
            <div className="flex items-center justify-between py-1 px-2 rounded-md bg-muted/30">
              <span className="text-muted-foreground font-medium">Entry</span>
              <span className="font-mono font-semibold text-foreground">
                {formatPrice(signal.entry)}
              </span>
            </div>

            {/* Stop Loss (SL) */}
            <div
              className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors ${
                slHit
                  ? "bg-destructive-10 text-destructive border border-destructive/20 font-bold"
                  : "bg-muted/10 text-destructive/90"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Stop Loss (SL)</span>
                {slHit && <X className="h-3 w-3 text-destructive stroke-[3]" />}
              </div>
              <span className="font-mono font-bold text-destructive">
                {formatPrice(signal.sl)}
              </span>
            </div>

            {/* Take Profit 1 (TP1) */}
            <div
              className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors ${
                tp1Hit
                  ? "bg-success-10 text-success border border-success/20 font-bold"
                  : "bg-muted/10 text-success/90"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Take Profit 1</span>
                {tp1Hit && <Check className="h-3 w-3 text-success stroke-[3]" />}
              </div>
              <span className="font-mono font-bold text-success">
                {formatPrice(signal.tp1)}
              </span>
            </div>

            {/* Take Profit 2 (Optional) */}
            {signal.tp2 !== null && signal.tp2 !== undefined && (
              <div
                className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors ${
                  tp2Hit
                    ? "bg-success-10 text-success border border-success/20 font-bold"
                    : "bg-muted/10 text-success/90"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Take Profit 2</span>
                  {tp2Hit && <Check className="h-3 w-3 text-success stroke-[3]" />}
                </div>
                <span className="font-mono font-bold text-success">
                  {formatPrice(signal.tp2)}
                </span>
              </div>
            )}

            {/* Take Profit 3 (Optional) */}
            {signal.tp3 !== null && signal.tp3 !== undefined && (
              <div
                className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors ${
                  tp3Hit
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                    : "bg-muted/10 text-success/90"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">Take Profit 3</span>
                  {tp3Hit && <Check className="h-3 w-3 text-emerald-400 stroke-[3]" />}
                </div>
                <span className="font-mono font-bold text-success">
                  {formatPrice(signal.tp3)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
