import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Activity, Send, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer id="footer" className="w-full border-t border-border bg-card/60 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 text-primary">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                VELORA<span className="text-primary font-mono ml-0.5">AI</span>
              </span>
              <Badge variant="beta">BETA</Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Real-time trading signal telemetry mirrored directly from our private Telegram
              and algorithmic backend pipeline. Transparent, instantaneous, and strictly read-only.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#hero" className="hover:text-foreground transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  Pipeline Architecture
                </a>
              </li>
              <li>
                <a href="#live-signals" className="hover:text-foreground transition-colors">
                  Live Signals Feed
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-foreground transition-colors">
                  Risk Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Community
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://t.me/VeloraAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                >
                  <Send className="h-3.5 w-3.5 text-primary" />
                  <span>Join Telegram</span>
                  <ArrowUpRight className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li className="text-xs text-muted-foreground/80 pt-2 leading-relaxed font-mono">
                Telemetry feed updates continuously. All signal transmissions subject to market latency.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>
            &copy; {currentYear} Velora AI. All rights reserved. Beta Phase.
          </div>
          <div className="flex items-center gap-4">
            <span>Read-Only Public Dashboard</span>
            <span className="text-border">•</span>
            <span className="text-emerald-400">System Status: Normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
