"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Signal, getSignalSymbol } from "@/lib/types/signal";
import { sanitizeRawText } from "@/lib/utils";
import { StatusBadge, DirectionBadge } from "./SignalBadge";
import {
  Check,
  X,
  Clock,
  Terminal,
  Send,
  Copy,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Target,
  ArrowRight,
} from "lucide-react";

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

/**
 * Format distance in points/ticks from entry
 */
function formatDistance(entry?: number | null, target?: number | null): string | null {
  if (entry === null || entry === undefined || target === null || target === undefined) {
    return null;
  }
  const diff = target - entry;
  const sign = diff >= 0 ? "+" : "";
  return `${sign}${diff.toFixed(2)}`;
}

export function SignalCard({ signal, className }: SignalCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

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

  // Calculate Risk-to-Reward ratio
  let rrRatio: string | null = null;
  if (signal.entry && signal.sl && signal.tp1) {
    const risk = Math.abs(signal.entry - signal.sl);
    const reward = Math.abs(signal.tp1 - signal.entry);
    if (risk > 0) {
      rrRatio = `1 : ${(reward / risk).toFixed(1)}`;
    }
  }

  // Construct raw text display if missing
  const rawTextDisplay =
    signal.raw_text ||
    `NEW SIGNAL\nSymbol: ${symbol}\nType: ${signal.direction || "BUY"}\nEntry: ${formatPrice(
      signal.entry
    )}\nSL: ${formatPrice(signal.sl)}\nTP1: ${formatPrice(signal.tp1)}${
      signal.tp2 ? `\nTP2: ${formatPrice(signal.tp2)}` : ""
    }${signal.tp3 ? `\nTP3: ${formatPrice(signal.tp3)}` : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawTextDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        className={`relative overflow-hidden rounded-none border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] dark-glow-card transition-all duration-150 ${
          signal.status === "ACTIVE" ? "ring-2 ring-black dark:ring-[var(--velora-blue)]" : ""
        } ${className || ""}`}
      >
        {/* Top Status Accent Bar */}
        <div
          className={`h-2 w-full transition-colors duration-150 ${
            signal.status === "ACTIVE"
              ? "bg-[#FF4B2B]"
              : tp3Hit || tp2Hit || tp1Hit
              ? "bg-black dark:bg-[var(--velora-blue)]"
              : slHit
              ? "bg-[#FF4B2B]"
              : "bg-black dark:bg-[#263B70]"
          }`}
        />

        {/* Card Header Bar */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#081331] border-b-2 border-black dark:border-[#263B70] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              {isUnparsed ? "TRANSMISSION" : symbol}
            </span>
            {!isUnparsed && signal.direction && (
              <DirectionBadge direction={signal.direction} />
            )}
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-black dark:border-[#263B70] bg-[#F2F2F2] dark:bg-[#0D1838] font-mono text-[10px] font-bold uppercase text-foreground">
              <Send className="h-3 w-3 text-[#FF4B2B]" />
              <span>MULTI-AGENT DISPATCH</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono font-bold">
              <Clock className="h-3 w-3" />
              <span>{formattedTime}</span>
              <span>/</span>
              <span className="truncate max-w-[100px]">#{signal.id.slice(0, 8)}</span>
            </div>
            <StatusBadge status={signal.status} />
          </div>
        </div>

        {/* Card Body: Interactive Two-Column Split Architecture */}
        {isUnparsed ? (
          /* UNPARSED RAW MESSAGE FALLBACK */
          <div className="p-5 sm:p-6 bg-[#F2F2F2] dark:bg-[#0D1838]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/20 dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-foreground">
                <Terminal className="h-3.5 w-3.5 text-[#FF4B2B]" />
                <span>RAW MULTI-AGENT PAYLOAD</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-mono font-bold uppercase text-[#FF4B2B] hover:text-foreground transition-colors cursor-pointer"
              >
                {copied ? "COPIED!" : "COPY"}
              </button>
            </div>
            <pre className="font-mono text-xs text-foreground whitespace-pre-wrap break-words leading-relaxed select-text font-medium bg-white dark:bg-[#081331] p-4 border border-black dark:border-[#263B70]">
              {sanitizeRawText(signal.raw_text)}
            </pre>
          </div>
        ) : (
          /* TWO-COLUMN LAYOUT: Column 1 (Multi-Agent Dispatch) | Column 2 (Execution Matrix) */
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black dark:divide-[#263B70]">
            {/* COLUMN 1: Multi-Agent Message Dispatch (5 Cols) */}
            <div className="lg:col-span-5 p-5 bg-[#FAFAFA] dark:bg-[#0B1536] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/20 dark:border-white/10">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-black uppercase text-foreground">
                    <Terminal className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span>01 / MULTI-AGENT DISPATCH</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#FF4B2B] hover:text-foreground transition-colors cursor-pointer"
                    title="Copy original signal payload"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "COPIED" : "COPY TEXT"}</span>
                  </button>
                </div>

                {/* Multi-Agent Console Chat Bubble */}
                <div className="border-2 border-black dark:border-[#263B70] bg-[#111111] dark:bg-[#050A1F] text-white p-4 font-mono text-xs space-y-1.5 shadow-sm select-text">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/20 text-[10px] text-white/60">
                    <span>Velora Multi-Agent Swarm</span>
                    <span className="text-[#FF4B2B] font-bold">VERIFIED</span>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-white">
                    {rawTextDisplay}
                  </pre>
                </div>
              </div>

              {/* Source Info */}
              <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-foreground font-bold">
                  <Send className="h-3 w-3 text-[#FF4B2B]" />
                  <span>Agent Consensus Feed</span>
                </span>
                <span>ENGINE: VELORA AI AGENTS</span>
              </div>
            </div>

            {/* COLUMN 2: Execution Levels & Take Profit Matrix (7 Cols) */}
            <div className="lg:col-span-7 p-5 bg-white dark:bg-[#081331] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-black/20 dark:border-white/10">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-black uppercase text-foreground">
                    <Target className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span>02 / EXECUTION LEVELS & TARGETS</span>
                  </div>
                  {rrRatio && (
                    <span className="font-mono text-[10px] font-black bg-black dark:bg-[#101D42] text-white px-2 py-0.5 uppercase border border-transparent dark:border-[#263B70]">
                      R : R = {rrRatio}
                    </span>
                  )}
                </div>

                {/* Structured Architectural Price Grid */}
                <div className="border-2 border-black dark:border-[#263B70] divide-y-2 divide-black dark:divide-[#263B70] text-xs font-mono">
                  {/* Entry Price */}
                  <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#081331]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-black dark:bg-[var(--velora-blue)]" />
                      <span className="font-bold text-muted-foreground uppercase tracking-wider">ENTRY PRICE</span>
                    </div>
                    <span className="font-black text-foreground text-sm">
                      {formatPrice(signal.entry)}
                    </span>
                  </div>

                  {/* Stop Loss (SL) */}
                  <div
                    className={`flex items-center justify-between p-2.5 transition-colors duration-150 ${
                      slHit
                        ? "bg-[#FF4B2B] text-white font-black"
                        : "bg-white dark:bg-[#081331] text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-[#FF4B2B]" />
                      <span className="font-bold uppercase tracking-wider">STOP LOSS (SL)</span>
                      {signal.entry && signal.sl && (
                        <span className="text-[10px] opacity-70">
                          ({formatDistance(signal.entry, signal.sl)} pts)
                        </span>
                      )}
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
                        ? "bg-black dark:bg-[#101D42] text-white font-black"
                        : "bg-white dark:bg-[#081331] text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-black dark:bg-[var(--velora-blue)]" />
                      <span className="font-bold uppercase tracking-wider">TARGET 01 (TP1)</span>
                      {signal.entry && signal.tp1 && (
                        <span className="text-[10px] opacity-70">
                          ({formatDistance(signal.entry, signal.tp1)} pts)
                        </span>
                      )}
                      {tp1Hit && <Check className="h-3.5 w-3.5 text-[#FF4B2B] stroke-[3]" />}
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
                          ? "bg-black dark:bg-[#101D42] text-white font-black"
                          : "bg-white dark:bg-[#081331] text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-black dark:bg-[var(--velora-blue)]" />
                        <span className="font-bold uppercase tracking-wider">TARGET 02 (TP2)</span>
                        {signal.entry && signal.tp2 && (
                          <span className="text-[10px] opacity-70">
                            ({formatDistance(signal.entry, signal.tp2)} pts)
                          </span>
                        )}
                        {tp2Hit && <Check className="h-3.5 w-3.5 text-[#FF4B2B] stroke-[3]" />}
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
                          ? "bg-[#FF4B2B] text-white font-black"
                          : "bg-white dark:bg-[#081331] text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-[#FF4B2B]" />
                        <span className="font-bold uppercase tracking-wider">TARGET 03 (TP3)</span>
                        {signal.entry && signal.tp3 && (
                          <span className="text-[10px] opacity-70">
                            ({formatDistance(signal.entry, signal.tp3)} pts)
                          </span>
                        )}
                        {tp3Hit && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-black text-sm">
                        {formatPrice(signal.tp3)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Milestone Indicator Footer */}
              <div className="p-2.5 bg-[#F2F2F2] dark:bg-[#0D1838] border border-black dark:border-[#263B70] flex items-center justify-between font-mono text-[11px]">
                <span className="text-muted-foreground font-bold">STATE TRANSITION:</span>
                <span className="font-black text-foreground">
                  {tp3Hit
                    ? "COMPLETED (TP3 HIT)"
                    : tp2Hit
                    ? "RUNNER (TP2 HIT)"
                    : tp1Hit
                    ? "SECURED (TP1 HIT)"
                    : slHit
                    ? "STOPPED OUT (SL HIT)"
                    : "ACTIVE IN RUN"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
