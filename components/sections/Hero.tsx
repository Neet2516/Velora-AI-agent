import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Send, ArrowDown, ShieldCheck, Zap, Radio, Download, FileText } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 border-b-2 border-black bg-white"
    >
      {/* Subtle Technical Background Grid 24px */}
      <div
        className="pointer-events-none absolute inset-0 z-0 pattern-grid-24 opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 sm:mb-8 flex-wrap">
          <span className="font-mono text-sm font-black text-[#FF3000]">01</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            / OVERVIEW
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black" />
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-2 py-0.5 text-[10px] sm:text-[11px] font-bold font-mono uppercase">
            <span className="h-2 w-2 bg-[#FF3000]" />
            <span>NEAR REAL-TIME TELEMETRY</span>
          </div>
        </div>

        {/* Asymmetric 8:4 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Headline & Description (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black uppercase leading-[0.95] text-left break-words">
              AUTOMATED <br />
              TRADING SIGNALS. <br />
              <span className="text-[#FF3000]">DELIVERED LIVE.</span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-black font-medium leading-relaxed text-left pt-1">
              Velora AI continuously mirrors algorithmic market signals from our private
              Telegram and backend intelligence pipeline into a live, transparent dashboard.
              Zero execution latency delay, strictly read-only for public verification.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#live-signals" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2.5">
                  <Activity className="h-4 w-4" />
                  <span>VIEW LIVE SIGNALS</span>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </a>
              <a href="#pipeline-spec" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 border-black"
                >
                  <FileText className="h-4 w-4 text-[#FF3000]" />
                  <span>READ SPEC DECK</span>
                </Button>
              </a>
              <a
                href="https://t.me/VeloraAI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5"
                >
                  <Send className="h-4 w-4" />
                  <span>JOIN TELEGRAM</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Spec Box (4 columns) */}
          <div className="lg:col-span-4 border-2 border-black bg-white divide-y-2 divide-black shadow-[4px_4px_0px_0px_#000000]">
            <div className="p-4 bg-black text-white flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                SYSTEM TELEMETRY SPEC
              </span>
              <span className="font-mono text-xs text-[#FF3000] font-black">2026</span>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                01 / LATENCY TARGET
              </div>
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight">
                &lt; 10 SECONDS
              </div>
              <p className="text-xs text-[#555555] font-medium pt-1">
                Sub-second webhook ingestion from Telegram Bot API with instant client propagation.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                02 / PIPELINE ARCHITECTURE
              </div>
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight">
                BOT TO WEB STREAM
              </div>
              <p className="text-xs text-[#555555] font-medium pt-1">
                Automated parsing of canonical trading setups with stateful lifecycle progression.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                03 / ACCESS PERMISSIONS
              </div>
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight">
                READ-ONLY TELEMETRY
              </div>
              <p className="text-xs text-[#555555] font-medium pt-1">
                Public read-only inspection feed. Zero visitor authentication required.
              </p>
            </div>

            {/* Spec Deck Download Callout */}
            <div className="p-4 bg-[#F2F2F2] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#FF3000]" />
                <span className="font-mono text-[11px] font-black uppercase text-black">
                  PIPELINE SPEC DECK
                </span>
              </div>
              <a
                href="/Velora_AI_Agent_Pipeline_Beta.pdf"
                download="Velora_AI_Agent_Pipeline_Beta.pdf"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-black text-[#FF3000] hover:text-black hover:underline"
                title="Download 10-slide PDF"
              >
                <Download className="h-3 w-3" />
                <span>PDF (1.8MB)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
