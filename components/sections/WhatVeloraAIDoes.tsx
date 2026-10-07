import React from "react";

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
      tag: "SYNTHESIS",
      title: "Multi-Agent Swarm Intelligence",
      description:
        "Autonomous specialized intelligence agents debate, cross-validate risk parameters, and verify signals before instant real-time telemetry dispatch.",
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
    <section id="features" className="py-14 sm:py-16 md:py-24 border-b border-gray-200/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="font-mono text-sm font-black text-[#5B7CFF]">
            02
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            / CAPABILITIES
          </span>
          <div className="h-0.5 w-10 sm:w-14 bg-black" />
        </div>

        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-tight">
            WHAT VELORA AI DOES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 font-medium max-w-2xl leading-relaxed">
            A specialized pipeline engineered to capture market setups and publish them with absolute transparency.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 sm:p-9 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-200"
            >
              <div>
                {/* Structural Label */}
                <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-gray-100">
                  <span className="font-mono text-2xl font-black text-[#5B7CFF]">
                    {feature.step}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-gray-500">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-black uppercase leading-tight mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Indicator */}
              <div className="pt-8 flex items-center justify-between text-black font-mono text-xs font-bold transition-colors">
                <span>STAGE {feature.step}</span>
                <span className="text-[#5B7CFF]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
