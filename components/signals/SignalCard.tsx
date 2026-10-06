"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Signal, getSignalSymbol } from "@/lib/types/signal";
import { sanitizeRawText } from "@/lib/utils";
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
  const shouldReduceMotion = useReducedMotion();
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
    <motion.div
      layout={!shouldReduceMotion}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full"
    >
      <div
        className={`relative overflow-hidden rounded-none border-2 border-black bg-white transition-all duration-150 ${
          signal.status === "ACTIVE" ? "ring-2 ring-black" : ""
        } ${className || ""}`}
      >
        {/* Top Status Accent Bar */}
        <div
          className={`h-1.5 w-full transition-colors duration-150 ${
            signal.status === "ACTIVE"
              ? "bg-[#FF3000]"
              : tp3Hit || tp1Hit
              ? "bg-black"
              : slHit
              ? "bg-[#FF3000]"
              : "bg-black"
          }`}
        />

        <div className="p-5 sm:p-6">
          {/* Header: Symbol + Badges */}
          <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b-2 border-black">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-black">
                  {isUnparsed ? "TRANSMISSION" : symbol}
                </span>
                {!isUnparsed && signal.direction && (
                  <DirectionBadge direction={signal.direction} />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-[#555555] font-mono font-bold">
                <Clock className="h-3 w-3" />
                <span>{formattedTime}</span>
                <span>/</span>
                <span className="truncate max-w-[120px]">
                  #{signal.id.slice(0, 8)}
                </span>
              </div>
            </div>

            <StatusBadge status={signal.status} />
          </div>

          {/* Content Body: Structured Data OR Unparsed Fallback */}
          {isUnparsed ? (
            /* UNPARSED RAW MESSAGE FALLBACK */
            <div className="border-2 border-black bg-[#F2F2F2] p-4">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase text-black">
                <Terminal className="h-3.5 w-3.5 text-[#FF3000]" />
                <span>RAW TELEGRAM PAYLOAD</span>
              </div>
              <pre className="font-mono text-xs text-black whitespace-pre-wrap break-words leading-relaxed select-text font-medium">
                {sanitizeRawText(signal.raw_text)}
              </pre>
            </div>
          ) : (
            /* STRUCTURED SIGNAL LEVELS AS ARCHITECTURAL DATA TABLE */
            <div className="border-2 border-black divide-y-2 divide-black text-xs font-mono">
              {/* Entry Price */}
              <div className="flex items-center justify-between p-2.5 bg-white">
                <span className="font-bold text-[#555555] uppercase tracking-wider">ENTRY</span>
                <span className="font-black text-black text-sm">
                  {formatPrice(signal.entry)}
                </span>
              </div>

              {/* Stop Loss (SL) */}
              <div
                className={`flex items-center justify-between p-2.5 transition-colors duration-150 ${
                  slHit
                    ? "bg-[#FF3000] text-white font-black"
                    : "bg-white text-black"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold uppercase tracking-wider">STOP LOSS (SL)</span>
                  {slHit && <X className="h-3.5 w-3.5 stroke-[3]" />}
                </div>
                <span className="font-black text-sm">
                  {formatPrice(signal.sl)}
                </span>
              </div>

              {/* Take Profit 1 (TP1) */}
              <div
                className={`flex items-center justify-between p-2.5 transition-colors duration-150 ${
                  tp1Hit
                    ? "bg-black text-white font-black"
                    : "bg-white text-black"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold uppercase tracking-wider">TARGET 01 (TP1)</span>
                  {tp1Hit && <Check className="h-3.5 w-3.5 text-[#FF3000] stroke-[3]" />}
                </div>
                <span className="font-black text-sm">
                  {formatPrice(signal.tp1)}
                </span>
              </div>

              {/* Take Profit 2 (Optional) */}
              {signal.tp2 !== null && signal.tp2 !== undefined && (
                <div
                  className={`flex items-center justify-between p-2.5 transition-colors duration-150 ${
                    tp2Hit
                      ? "bg-black text-white font-black"
                      : "bg-white text-black"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold uppercase tracking-wider">TARGET 02 (TP2)</span>
                    {tp2Hit && <Check className="h-3.5 w-3.5 text-[#FF3000] stroke-[3]" />}
                  </div>
                  <span className="font-black text-sm">
                    {formatPrice(signal.tp2)}
                  </span>
                </div>
              )}

              {/* Take Profit 3 (Optional) */}
              {signal.tp3 !== null && signal.tp3 !== undefined && (
                <div
                  className={`flex items-center justify-between p-2.5 transition-colors duration-150 ${
                    tp3Hit
                      ? "bg-[#FF3000] text-white font-black"
                      : "bg-white text-black"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold uppercase tracking-wider">TARGET 03 (TP3)</span>
                    {tp3Hit && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                  <span className="font-black text-sm">
                    {formatPrice(signal.tp3)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
