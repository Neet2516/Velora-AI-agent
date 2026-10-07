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
    <section id="features" className="py-14 sm:py-16 md:py-24 border-b-2 border-black dark:border-[#263B70] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 flex-wrap">
          <span className="font-mono text-sm font-black text-[#5B7CFF] dark:text-[#6F94FF]">
            02
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            / CAPABILITIES
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black dark:bg-[#263B70]" />
        </div>

        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-tight">
            WHAT VELORA AI DOES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
            A specialized pipeline engineered to capture market setups and publish them with absolute transparency.
          </p>
        </div>

        {/* Architectural 3-Column Grid with Dividers */}
        <div className="border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black dark:divide-[#263B70] dark-glow-card transition-colors duration-300">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 flex flex-col justify-between group hover:bg-[#F2F4F8] dark:hover:bg-[#0D1838] transition-colors duration-150 relative"
            >
              <div>
                {/* Structural Label */}
                <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-black/20 dark:border-white/10">
                  <span className="font-mono text-2xl font-black text-[#5B7CFF] dark:text-[#6F94FF]">
                    {feature.step}
                  </span>
                  <span className="font-mono text-xs font-extrabold tracking-widest uppercase text-foreground">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-foreground uppercase leading-tight mb-4">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="pt-8 flex items-center justify-between text-foreground group-hover:text-[#5B7CFF] dark:group-hover:text-[#6F94FF] font-mono text-xs font-bold transition-colors">
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
