import React from "react";
import { Activity, ArrowRight, FileText, Send } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 flex-wrap">
          <span className="font-mono text-xs font-bold text-gray-900 tracking-wider">
            01 / OVERVIEW
          </span>
          <div className="h-0.5 w-10 sm:w-14 bg-gray-900" />
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono font-bold text-gray-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#00D2FF]" />
            <span>NEAR REAL-TIME TELEMETRY</span>
          </div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Headline & Description (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-black uppercase leading-[0.96]">
                AUTOMATED <br />
                TRADING <br />
                SIGNALS. <br />
                DELIVERED{" "}
                <span className="bg-gradient-to-r from-[#00D2FF] via-[#5B7CFF] to-[#FF4B8B] bg-clip-text text-transparent">
                  LIVE.
                </span>
                <span className="inline-flex items-center gap-1.5 ml-3 align-middle px-2.5 py-0.5 rounded-full border border-pink-200 bg-white/95 text-[11px] font-mono font-bold text-[#FF3366] shadow-sm -translate-y-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF3366] animate-pulse" />
                  <span>LIVE</span>
                </span>
              </h1>
            </div>

            <p className="max-w-xl text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed pt-1">
              Velora AI continuously mirrors algorithmic market signals from our private
              Telegram and backend intelligence pipeline into a live, transparent dashboard.
              Zero execution latency delay, strictly read-only for public verification.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="#live-signals" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#0B0F19] hover:bg-[#161D2F] text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(255,75,139,0.35)] hover:shadow-[0_10px_30px_rgba(255,75,139,0.5)] transition-all">
                  <Activity className="h-4 w-4 text-[#A855F7]" />
                  <span>VIEW LIVE SIGNALS</span>
                  <ArrowRight className="h-4 w-4 text-[#FF4B8B]" />
                </button>
              </a>
              <a href="#pipeline-spec" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-12 px-5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all">
                  <FileText className="h-4 w-4 text-[#3B82F6]" />
                  <span>READ SPEC DECK</span>
                </button>
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto h-12 px-5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all">
                  <Send className="h-4 w-4 text-[#3B82F6]" />
                  <span>JOIN TELEGRAM BOT</span>
                </button>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Spec Box (4 columns) */}
          <div className="lg:col-span-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-1 border-b border-gray-100">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-900">
                SYSTEM TELEMETRY SPEC
              </span>
              <span className="font-mono text-sm font-bold text-[#3B82F6]">
                2026
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  01 / LATENCY TARGET
                </span>
                <span className="h-2 w-2 rounded-full bg-[#FF4B8B]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                &lt; 10 SECONDS
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Sub-second webhook ingestion from Telegram Bot API with instant client propagation.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  02 / PIPELINE ARCHITECTURE
                </span>
                <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                BOT TO WEB STREAM
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Automated parsing of canonical trading setups with stateful lifecycle progression.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  03 / ACCESS PERMISSIONS
                </span>
                <span className="h-2 w-2 rounded-full bg-[#A855F7]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                READ-ONLY TELEMETRY
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Public read-only inspection feed. Zero visitor authentication required.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#3B82F6]" />
                <span className="font-mono text-[11px] font-bold uppercase text-gray-900">
                  PIPELINE SPEC DECK
                </span>
              </div>
              <a
                href="#pipeline-spec"
                className="font-mono text-[11px] font-bold text-[#6366F1] hover:text-[#4F46E5] flex items-center gap-1 transition-colors"
                title="View interactive slides"
              >
                <span>VIEW SLIDES (9)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Metric Row */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">50K+</div>
            <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-gray-500 tracking-wider mt-0.5">
              SIGNALS PROCESSED
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">&lt; 10s</div>
            <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-gray-500 tracking-wider mt-0.5">
              AVG LATENCY
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">99.9%</div>
            <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-gray-500 tracking-wider mt-0.5">
              PIPELINE UPTIME
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">0</div>
            <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-gray-500 tracking-wider mt-0.5">
              EXECUTION ACCESS
            </div>
          </div>
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-center lg:justify-end gap-2.5 text-gray-400">
            <svg
              className="w-14 h-5 text-[#5B7CFF]/60 shrink-0"
              viewBox="0 0 100 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M0 12 Q 25 2, 50 12 T 100 12"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
              REAL-TIME MARKET TELEMETRY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
