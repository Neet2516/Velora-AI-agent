import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VeloraLogo } from "@/components/ui/VeloraLogo";
import { Activity, Send, ArrowUpRight, FileText } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer id="footer" className="w-full border-t-4 border-black dark:border-[#263B70] bg-white dark:bg-[#050A1F] pt-12 sm:pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b-2 border-black dark:border-[#263B70]">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <VeloraLogo />
            <p className="text-sm text-muted-foreground max-w-md font-medium leading-relaxed">
              Real-time trading signal telemetry mirrored directly from our private Telegram
              and algorithmic backend pipeline. Transparent, instantaneous, and strictly read-only.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-foreground">
              INDEX
            </h4>
            <ul className="space-y-2 text-xs font-mono font-bold text-foreground uppercase">
              <li>
                <a href="#hero" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  01 / OVERVIEW
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  02 / CAPABILITIES
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  03 / ARCHITECTURE
                </a>
              </li>
              <li>
                <a href="#pipeline-spec" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  04 / SPEC DECK (10 SLIDES)
                </a>
              </li>
              <li>
                <a href="#live-signals" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  05 / LIVE SIGNALS
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-[#FF4B2B] transition-colors duration-150">
                  06 / RISK DISCLOSURE
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-foreground">
              RESOURCES & DISPATCH
            </h4>
            <ul className="space-y-3 text-xs text-foreground">
              <li>
                <a
                  href="#pipeline-spec"
                  className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:bg-black hover:text-white dark:hover:bg-[#101D42] px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors duration-150 w-full justify-between"
                  title="View interactive Velora Pipeline Specification Deck"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span>VIEW SPEC DECK</span>
                  </span>
                  <span className="text-[10px] bg-black dark:bg-[#101D42] text-white px-1.5 py-0.5 border border-transparent dark:border-[#263B70]">10 SLIDES</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/+SUyvL9H24dtmOGQ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:bg-black hover:text-white dark:hover:bg-[#101D42] px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors duration-150 w-full justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span>JOIN TELEGRAM CHANNEL</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/VlgSignal_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:bg-black hover:text-white dark:hover:bg-[#101D42] px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors duration-150 w-full justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    <span>TELEGRAM BOT (@VlgSignal_bot)</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li className="text-xs text-muted-foreground font-mono leading-relaxed pt-1">
                Telemetry feed updates continuously. All signal transmissions subject to market latency.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-foreground font-mono font-bold">
          <div>
            &copy; {currentYear} VELORA AI. ALL RIGHTS RESERVED. SWISS TYPOGRAPHIC EDITION.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span>PUBLIC READ-ONLY DASHBOARD</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 bg-[#FF4B2B]" />
              <span>SYSTEM STATUS: NORMAL</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
