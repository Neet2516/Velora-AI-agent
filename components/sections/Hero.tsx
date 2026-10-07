import React from "react";
import { Button } from "@/components/ui/button";
import { Activity, Send, ArrowDown, FileText } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 border-b-2 border-black dark:border-[#263B70] transition-colors duration-300"
    >
      {/* Subtle Technical Background Grid 24px */}
      <div
        className="pointer-events-none absolute inset-0 z-0 pattern-grid-24 opacity-60 dark:opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 sm:mb-8 flex-wrap">
          <span className="font-mono text-sm font-black text-[#5B7CFF] dark:text-[#6F94FF]">
            01
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            / OVERVIEW
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black dark:bg-[#263B70]" />
          <div className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold font-mono uppercase">
            <span className="h-2 w-2 bg-[#5B7CFF] dark:bg-[#6F94FF]" />
            <span>NEAR REAL-TIME TELEMETRY</span>
          </div>
        </div>

        {/* Asymmetric 8:4 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Headline & Description (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.95] text-left break-words">
              AUTOMATED <br />
              TRADING <br />
              SIGNALS. <br />
              DELIVERED{" "}
              <span className="bg-gradient-to-r from-[#4F75FF] via-[#7B5CFF] to-[#EC4899] bg-clip-text text-transparent">
                LIVE.
              </span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-foreground/90 font-medium leading-relaxed text-left pt-1">
              Velora AI continuously mirrors algorithmic market signals from our autonomous
              multi-agent intelligence pipeline into a live, transparent dashboard.
              Zero execution latency delay, strictly read-only for public verification.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#live-signals" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 bg-black dark:bg-[#5B7CFF] hover:bg-[#5B7CFF] dark:hover:bg-[#4A6FE8] text-white border-2 border-black dark:border-[#6F94FF] dark:shadow-[0_0_15px_rgba(91,124,255,0.3)] transition-colors"
                >
                  <Activity className="h-4 w-4" />
                  <span>VIEW LIVE SIGNALS</span>
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </a>
              <a href="#pipeline-spec" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto gap-2.5 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:border-[#5B7CFF] dark:hover:border-[#6F94FF] transition-colors"
                >
                  <FileText className="h-4 w-4 text-[#5B7CFF] dark:text-[#6F94FF]" />
                  <span>READ SPEC DECK</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Telemetry Spec Box (4 columns) */}
          <div className="lg:col-span-4 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] divide-y-2 divide-black dark:divide-[#182A52] shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#040817] dark-glow-card transition-colors duration-300">
            <div className="p-4 bg-black dark:bg-[#0D1838] text-white flex items-center justify-between border-b-2 border-black dark:border-[#263B70]">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/90">
                SYSTEM TELEMETRY SPEC
              </span>
              <span className="font-mono text-xs text-[#5B7CFF] dark:text-[#6F94FF] font-black">
                2026
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                01 / LATENCY TARGET
              </div>
              <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                &lt; 10 SECONDS
              </div>
              <p className="text-xs text-muted-foreground font-medium pt-1">
                Sub-second multi-agent signal ingestion and consensus synthesis with instant client propagation.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                02 / PIPELINE ARCHITECTURE
              </div>
              <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                MULTI-AGENT SWARM STREAM
              </div>
              <p className="text-xs text-muted-foreground font-medium pt-1">
                Autonomous multi-agent consensus parsing of canonical trading setups with stateful lifecycle progression.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                03 / ACCESS PERMISSIONS
              </div>
              <div className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                READ-ONLY TELEMETRY
              </div>
              <p className="text-xs text-muted-foreground font-medium pt-1">
                Public read-only inspection feed. Zero visitor authentication required.
              </p>
            </div>

            {/* Spec Deck View Callout */}
            <div className="p-4 bg-[#F2F2F2] dark:bg-[#0D1838] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#5B7CFF] dark:text-[#6F94FF]" />
                <span className="font-mono text-[11px] font-black uppercase text-foreground">
                  PIPELINE SPEC DECK
                </span>
              </div>
              <a
                href="#pipeline-spec"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-black text-[#5B7CFF] dark:text-[#6F94FF] hover:underline"
                title="View interactive 9-slide architecture specification"
              >
                <span>VIEW SLIDES (9) →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
