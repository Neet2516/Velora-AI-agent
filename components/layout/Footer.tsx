import React from "react";
import { VeloraLogo } from "@/components/ui/VeloraLogo";
import { Activity, ArrowUpRight, FileText } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer id="footer" className="relative z-10 w-full border-t border-gray-200 bg-white/95 text-black pt-12 sm:pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-gray-200">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <VeloraLogo />
            <p className="text-sm text-black max-w-md font-semibold leading-relaxed">
              Real-time trading signal telemetry mirrored directly from our autonomous multi-agent
              intelligence pipeline. Transparent, instantaneous, and strictly read-only.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest !text-black dark:!text-white">
              INDEX
            </h4>
            <ul className="space-y-2 text-xs font-mono font-black !text-black dark:!text-white uppercase">
              <li>
                <a href="#hero" className="!text-black dark:!text-white hover:text-[#FF4B2B] dark:hover:text-[#FF4B2B] transition-colors duration-150">
                  01 / OVERVIEW
                </a>
              </li>
              <li>
                <a href="#features" className="!text-black dark:!text-white hover:text-[#FF4B2B] dark:hover:text-[#FF4B2B] transition-colors duration-150">
                  02 / CAPABILITIES
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="!text-black dark:!text-white hover:text-[#FF4B2B] dark:hover:text-[#FF4B2B] transition-colors duration-150">
                  03 / ARCHITECTURE
                </a>
              </li>
              <li>
                <a href="#pipeline-spec" className="!text-black dark:!text-white hover:text-[#FF4B2B] dark:hover:text-[#FF4B2B] transition-colors duration-150">
                  04 / SPEC DECK (10 SLIDES)
                </a>
              </li>
              <li>
                <a href="#live-signals" className="!text-black dark:!text-white hover:text-[#FF4B2B] dark:hover:text-[#FF4B2B] transition-colors duration-150">
                  05 / LIVE SIGNALS
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Architecture & Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest !text-black dark:!text-white">
              INTELLIGENCE & SPEC
            </h4>
            <ul className="space-y-3 text-xs !text-black dark:!text-white">
              <li>
                <a
                  href="#pipeline-spec"
                  className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] !text-black dark:!text-white hover:bg-black hover:!text-white dark:hover:bg-[#101D42] px-3 py-1.5 font-mono text-xs font-black uppercase transition-colors duration-150 w-full justify-between shadow-[2px_2px_0px_0px_#000000] dark:shadow-none"
                  title="View interactive Velora Pipeline Specification Deck"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span className="!text-black dark:!text-white group-hover:!text-white">VIEW SPEC DECK</span>
                  </span>
                  <span className="text-[10px] bg-black dark:bg-[#101D42] text-white px-1.5 py-0.5 border border-transparent dark:border-[#263B70]">10 SLIDES</span>
                </a>
              </li>
              <li>
                <a
                  href="#live-signals"
                  className="inline-flex items-center gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] !text-black dark:!text-white hover:bg-black hover:!text-white dark:hover:bg-[#101D42] px-3 py-1.5 font-mono text-xs font-black uppercase transition-colors duration-150 w-full justify-between shadow-[2px_2px_0px_0px_#000000] dark:shadow-none"
                >
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-[#FF4B2B]" />
                    <span className="!text-black dark:!text-white group-hover:!text-white">MULTI-AGENT STREAM</span>
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li className="text-xs !text-black dark:!text-gray-200 font-mono font-bold leading-relaxed pt-1">
                Telemetry feed updates continuously. Multi-agent consensus transmissions subject to live market latency.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs !text-black dark:!text-white font-mono font-black">
          <div>
            &copy; {currentYear} VELORA AI. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 !text-black dark:!text-white">
              <span className="h-2 w-2 bg-[#FF4B2B]" />
              <span>SYSTEM STATUS: ONLINE</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
