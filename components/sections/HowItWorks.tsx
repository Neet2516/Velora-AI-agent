import React from "react";
import { Badge } from "@/components/ui/badge";
import { Send, Server, LayoutDashboard, ArrowRight } from "lucide-react";

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
    <section id="how-it-works" className="py-14 sm:py-16 md:py-24 border-b-2 border-black bg-[#F2F2F2] relative">
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-2 xs:gap-3 mb-6 flex-wrap">
          <span className="font-mono text-sm font-black text-[#FF3000]">03</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            / ARCHITECTURE
          </span>
          <div className="h-0.5 w-8 sm:w-12 bg-black" />
        </div>

        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-tight">
            HOW THE PIPELINE OPERATES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#555555] font-medium max-w-2xl leading-relaxed">
            A three-stage streaming pipeline connecting Telegram intelligence directly to your browser without human intervention.
          </p>
        </div>

        {/* 3-Step Process Flow in Architectural Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border-2 border-black bg-white p-8 flex flex-col justify-between relative"
            >
              <div>
                {/* Number & Phase Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-black">
                  <span className="font-mono text-4xl font-black text-[#FF3000]">
                    {step.number}
                  </span>
                  <span className="font-mono text-[10px] font-extrabold tracking-widest uppercase bg-black text-white px-2.5 py-1">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-black tracking-tight text-black uppercase leading-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#555555] font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Connection */}
              <div className="pt-8 flex items-center justify-between border-t border-black/20 text-xs font-mono font-bold text-black">
                <span>STAGE 0{index + 1} / 03</span>
                <span>VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
