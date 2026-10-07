import React from "react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      subtitle: "MULTI-AGENT CONSENSUS",
      title: "Agent Swarm Market Analysis",
      description:
        "The autonomous multi-agent intelligence engine identifies actionable market setups, cross-verifies risk-reward metrics, and dispatches structured telemetry with entry, target, and stop parameters.",
    },
    {
      number: "02",
      subtitle: "PARSING & STATE MACHINE",
      title: "Multi-Agent State Machine",
      description:
        "The Velora validation pipeline validates multi-agent setup schemas, tracks lifecycle transitions (TP hits, SL triggers), and publishes updates to the live streaming API.",
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
    <section id="how-it-works" className="py-14 sm:py-16 md:py-24 border-b border-gray-200/80 bg-transparent relative transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-tight">
            HOW THE PIPELINE OPERATES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 font-medium max-w-2xl leading-relaxed">
            A three-stage streaming pipeline connecting autonomous multi-agent intelligence directly to your browser without human intervention.
          </p>
        </div>

        {/* 3-Step Process Flow in Clean Light Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 sm:p-9 flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all duration-200"
            >
              <div>
                {/* Number & Phase Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
                  <span className="font-mono text-4xl font-black text-[#5B7CFF]">
                    {step.number}
                  </span>
                  <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-gray-100 text-gray-800 px-2.5 py-1 rounded-md border border-gray-200">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-black uppercase leading-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Connection */}
              <div className="pt-8 flex items-center justify-between border-t border-gray-100 text-xs font-mono font-bold text-black">
                <span>STAGE 0{index + 1} / 03</span>
                <span className="text-[#5B7CFF]">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
