import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Send, CheckCircle2 } from "lucide-react";

export function WhatVeloraAIDoes() {
  const features = [
    {
      step: "01",
      tag: "ANALYSIS",
      title: "Algorithmic Signal Generation",
      description:
        "Automated intelligence monitors market volatility and price structure, issuing structured setups with clear entry, stop loss, and tiered take-profit targets.",
    },
    {
      step: "02",
      tag: "DISPATCH",
      title: "Direct Telegram Dispatch",
      description:
        "Signals originate in real time and are immediately distributed to the Velora Telegram community, minimizing communication latency for active market participants.",
    },
    {
      step: "03",
      tag: "TELEMETRY",
      title: "Transparent Live Verification",
      description:
        "Every signal status—including TP hits and Stop Loss triggers—is mirrored directly to this web dashboard for public, tamper-resistant tracking.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 border-b-2 border-black bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-sm font-black text-[#FF3000]">02</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            / CAPABILITIES
          </span>
          <div className="h-0.5 w-12 bg-black" />
        </div>

        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase">
            WHAT VELORA AI DOES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#555555] font-medium max-w-2xl leading-relaxed">
            A specialized pipeline engineered to capture market setups and publish them with absolute transparency.
          </p>
        </div>

        {/* Architectural 3-Column Grid with 2px Black Dividers */}
        <div className="border-2 border-black bg-white grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#F2F2F2] transition-colors duration-150 relative"
            >
              <div>
                {/* Structural Label */}
                <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-black/20">
                  <span className="font-mono text-2xl font-black text-[#FF3000]">
                    {feature.step}
                  </span>
                  <span className="font-mono text-xs font-extrabold tracking-widest uppercase text-black">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-black uppercase leading-tight mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#555555] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="pt-8 flex items-center justify-between text-black font-mono text-xs font-bold">
                <span>STAGE {feature.step}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
