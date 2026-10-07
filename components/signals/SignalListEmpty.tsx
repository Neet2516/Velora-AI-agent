"use client";

import React, { useState } from "react";
import { Send, Copy, Check, Radio, Terminal, Sparkles, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignalListEmpty() {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const sampleFormat = `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650.50\nSL: 2645.00\nTP1: 2656.00\nTP2: 2661.00\nTP3: 2666.00`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleFormat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = async () => {
    try {
      setIsSimulating(true);
      const res = await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "simulate_xauusd" }),
      });
      if (res.ok) {
        // Trigger page refresh of signals
        window.location.reload();
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="w-full border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000] overflow-hidden">
      {/* Top Banner Status Bar */}
      <div className="p-3 sm:p-4 bg-black text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3000] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF3000]" />
          </span>
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider">
            TELEGRAM RADAR ACTIVE: WAITING FOR TELEGRAM MESSAGE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://t.me/+SUyvL9H24dtmOGQ9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-[#FF3000] text-white text-[11px] font-mono font-bold uppercase transition-colors"
          >
            <Send className="h-3 w-3" />
            <span>t.me/+SUyvL9H24dtmOGQ9</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black">
        {/* Left Column: Waiting Status & Explanation (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-black bg-[#F2F2F2] font-mono text-[11px] font-black uppercase text-black">
              <Radio className="h-3.5 w-3.5 text-[#FF3000]" />
              <span>LIVE TELEGRAM INGESTION PIPELINE</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight leading-tight">
              AWAITING TRADE SIGNAL <br />
              <span className="text-[#FF3000]">FROM TELEGRAM CHANNEL</span>
            </h3>

            <p className="text-sm text-[#555555] font-medium leading-relaxed">
              The webhook listener is connected to the channel. Jab bhi koi naya trade signal
              (jaise <strong>XAUUSD BUY</strong>) channel me aayega, wo automatically yahan parse
              hokar <strong>two-column format</strong> me live stream ho jaayega:
            </p>

            <ul className="space-y-2 font-mono text-xs text-black font-bold">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#FF3000]" />
                <span>Column 1: Raw Telegram Message & Chat Dispatch</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#FF3000]" />
                <span>Column 2: Trade Entry, Stop Loss & TP1-TP3 Matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#FF3000]" />
                <span>Sub-10s automated latency update without page refresh</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://t.me/+SUyvL9H24dtmOGQ9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button size="sm" className="w-full gap-2 justify-center bg-black hover:bg-[#FF3000]">
                <Send className="h-3.5 w-3.5" />
                <span>Open Telegram Channel</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>

            <button
              type="button"
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              title="Simulate an incoming XAUUSD signal instantly to preview the column layout"
            >
              <Zap className="h-3.5 w-3.5 text-[#FF3000]" />
              <span>{isSimulating ? "Streaming..." : "Test XAUUSD Signal"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Telegram Signal Format Preview & Quick Copy (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-[#F9F9F9] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-black/20">
              <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-[#FF3000]" />
                <span>EXPECTED TELEGRAM MESSAGE FORMAT</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-[#FF3000] hover:text-black transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "COPIED!" : "COPY FORMAT"}</span>
              </button>
            </div>

            <div className="p-4 bg-[#111111] text-white border-2 border-black font-mono text-xs space-y-1 select-text">
              <div className="text-[#FF3000] font-black">NEW SIGNAL</div>
              <div className="text-white"><span className="text-[#888888]">Symbol:</span> XAUUSD</div>
              <div className="text-white"><span className="text-[#888888]">Type:</span> BUY</div>
              <div className="text-white"><span className="text-[#888888]">Entry:</span> 2650.50</div>
              <div className="text-white"><span className="text-[#888888]">SL:</span> 2645.00</div>
              <div className="text-white"><span className="text-[#888888]">TP1:</span> 2656.00</div>
              <div className="text-white"><span className="text-[#888888]">TP2:</span> 2661.00</div>
              <div className="text-white"><span className="text-[#888888]">TP3:</span> 2666.00</div>
            </div>

            <p className="text-xs text-[#555555] font-mono leading-relaxed pt-1">
              💡 Tip: Is format ko copy karke Telegram channel me post karein. Webhook use parse karke
              turant yahan column view me render karega.
            </p>
          </div>

          <div className="p-3 bg-white border border-black flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#555555]">CONNECTED BOT:</span>
            <span className="font-bold text-black">@VlgSignal_bot (Signal Terminal)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
