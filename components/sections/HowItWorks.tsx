import React from "react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      subtitle: "INGESTION PHASE",
      title: "Telegram Signal Dispatch",
      description:
        "The automated intelligence engine identifies an actionable market setup and dispatches the raw signal message to the Telegram channel with entry, target, and stop parameters.",
    },
    {
      number: "02",
      subtitle: "PARSING & STATE MACHINE",
      title: "Backend Validation Pipeline",
      description:
        "The Velora ingestion pipeline validates signal fields into structured schemas, tracks lifecycle transitions (TP hits, SL triggers), and publishes updates to the API.",
    },
    {
      number: "03",
      subtitle: "LIVE STREAMING",
      title: "Live Dashboard Telemetry",
      description:
        "Signals and status progressions are rendered onto this dashboard within 10 seconds. In-place card updates ensure zero duplicate cards and instantaneous verification.",
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-16 md:py-24 border-b-2 border-black dark:border-[#263B70] bg-[#F2F4F8] dark:bg-[#050A1F] relative transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 flex-wrap">
          <span className="font-mono text-sm font-black text-[#5B7CFF] dark:text-[#6F94FF]">
            03
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            / ARCHITECTURE
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black dark:bg-[#263B70]" />
        </div>

        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-tight">
            HOW THE PIPELINE OPERATES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
            A three-stage streaming pipeline connecting Telegram intelligence directly to your browser without human intervention.
          </p>
        </div>

        {/* 3-Step Process Flow in Architectural Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] p-8 flex flex-col justify-between relative dark-glow-card transition-colors duration-300"
            >
              <div>
                {/* Number & Phase Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-black dark:border-[#263B70]">
                  <span className="font-mono text-4xl font-black text-[#5B7CFF] dark:text-[#6F94FF]">
                    {step.number}
                  </span>
                  <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-black dark:bg-[#101D42] text-white dark:text-[#AAB7D4] px-2.5 py-1 border border-transparent dark:border-[#263B70]">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-foreground uppercase leading-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Connection */}
              <div className="pt-8 flex items-center justify-between border-t border-black/20 dark:border-white/10 text-xs font-mono font-bold text-foreground">
                <span>STAGE 0{index + 1} / 03</span>
                <span className="text-[#5B7CFF] dark:text-[#6F94FF]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
