import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Send, ArrowDown, ShieldCheck, Zap, Radio } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-36"
    >
      {/* Subtle Technical Background Grid & Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[600px] rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Beta Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1 text-xs text-muted-foreground backdrop-blur-md mb-8">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-foreground font-medium">BETA PIPELINE</span>
          <span className="text-border">|</span>
          <span>Near Real-Time Telemetry</span>
        </div>

        {/* Main Product Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Automated Trading Signals,{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-300 to-primary-hover bg-clip-text text-transparent">
            Delivered Live
          </span>
        </h1>

        {/* Value Proposition Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
          Velora AI continuously mirrors algorithmic market signals from our private
          Telegram and backend pipeline into a live, transparent dashboard.
          Zero execution latency delay, strictly read-only for public verification.
        </p>

        {/* Dual CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#live-signals" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-sm md:text-base font-semibold shadow-lg shadow-primary/20">
              <Activity className="h-4 w-4" />
              <span>View Live Signals</span>
              <ArrowDown className="h-4 w-4" />
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
              className="w-full sm:w-auto gap-2 text-sm md:text-base border-border"
            >
              <Send className="h-4 w-4 text-primary" />
              <span>Join Telegram Channel</span>
            </Button>
          </a>
        </div>

        {/* Technical Specification Badges */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10 border-t border-border/60">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-card/40 border border-border/40">
            <Zap className="h-4 w-4 text-warning" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Latency Target</div>
              <div className="text-sm font-semibold text-foreground">&lt; 10 Seconds</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-card/40 border border-border/40">
            <Radio className="h-4 w-4 text-primary" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Data Pipeline</div>
              <div className="text-sm font-semibold text-foreground">Telegram to Web</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-lg bg-card/40 border border-border/40">
            <ShieldCheck className="h-4 w-4 text-success" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Visitor Access</div>
              <div className="text-sm font-semibold text-foreground">Read-Only Telemetry</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
