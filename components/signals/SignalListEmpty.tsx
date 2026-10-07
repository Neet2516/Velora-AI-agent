"use client";

import React, { useState } from "react";
import { Send, Zap, Radio, Terminal, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignalListEmptyProps {
  onSimulate?: () => void;
}

export function SignalListEmpty({ onSimulate }: SignalListEmptyProps) {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const sampleFormat = `NEW SIGNAL
Symbol: XAUUSD
Type: BUY
Entry: 4112.50
SL: 4103.50
TP1: 4121.50
TP2: 4130.50
TP3: 4139.50`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleFormat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "simulate_xauusd" }),
      });
      if (onSimulate) onSimulate();
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-colors duration-300">
      {/* Top Banner Status Bar */}
      <div className="p-3 sm:p-4 bg-gray-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B2B] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4B2B]" />
          </span>
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            MULTI-AGENT RADAR ACTIVE: AWAITING NEXT SIGNAL TRANSMISSION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-white text-[11px] font-mono font-bold uppercase rounded-md">
            <Radio className="h-3 w-3 text-[#5B7CFF]" />
            <span>AUTONOMOUS AGENT PIPELINE</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        {/* Left Column: Waiting Status & Explanation (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-gray-200 bg-gray-50 font-mono text-[11px] font-black uppercase text-gray-800 rounded-md">
              <Radio className="h-3.5 w-3.5 text-[#5B7CFF]" />
              <span>LIVE MULTI-AGENT INGESTION PIPELINE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-tight">
              AWAITING TRADE SIGNAL <br />
              <span className="text-[#5B7CFF]">FROM MULTI-AGENT SWARM</span>
            </h3>

            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              The autonomous multi-agent pipeline is actively listening for market setup consensus.
              Once market conditions align, verified trading setups (such as <strong>XAUUSD BUY</strong>)
              stream live directly into this structured two-column telemetry view:
            </p>

            <ul className="space-y-2 font-mono text-xs text-black font-bold">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                <span>Column 1: Raw Agent Transmission & Intelligence Dispatch</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                <span>Column 2: Trade Entry, Stop Loss & TP1-TP3 Matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B7CFF]" />
                <span>Sub-10s automated latency update without page refresh</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#pipeline-spec" className="flex-1">
              <Button size="sm" className="w-full gap-2 justify-center bg-black hover:bg-gray-800 text-white">
                <Radio className="h-3.5 w-3.5" />
                <span>View Agent Architecture</span>
              </Button>
            </a>

            <button
              type="button"
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer text-black"
              title="Simulate an incoming XAUUSD signal instantly to preview the column layout"
            >
              <Zap className="h-3.5 w-3.5 text-[#5B7CFF]" />
              <span>{isSimulating ? "Streaming..." : "Test XAUUSD Signal"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Signal Format Preview & Quick Copy (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-gray-50/70 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-[#5B7CFF]" />
                <span>CANONICAL MULTI-AGENT PAYLOAD FORMAT</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#5B7CFF] hover:underline transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "COPIED!" : "COPY FORMAT"}</span>
              </button>
            </div>

            <div className="p-4 bg-[#111827] text-white rounded-lg border border-gray-800 font-mono text-xs space-y-1 select-text">
              <div className="text-[#5B7CFF] font-black">NEW SIGNAL</div>
              <div className="text-white"><span className="text-[#888888]">Symbol:</span> XAUUSD</div>
              <div className="text-white"><span className="text-[#888888]">Type:</span> BUY</div>
              <div className="text-white"><span className="text-[#888888]">Entry:</span> 4112.50</div>
              <div className="text-white"><span className="text-[#888888]">SL:</span> 4103.50</div>
              <div className="text-white"><span className="text-[#888888]">TP1:</span> 4121.50</div>
              <div className="text-white"><span className="text-[#888888]">TP2:</span> 4130.50</div>
              <div className="text-white"><span className="text-[#888888]">TP3:</span> 4139.50</div>
            </div>

            <p className="text-xs text-gray-500 font-mono leading-relaxed pt-1">
              💡 Pipeline Spec: Multi-agent engines emit this verified canonical format, ingested with sub-10s telemetry into this feed.
            </p>
          </div>

          <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between font-mono text-[11px]">
            <span className="text-gray-500">INTELLIGENCE ENGINE:</span>
            <span className="font-bold text-black">Velora Multi-Agent Swarm (Autonomous)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
