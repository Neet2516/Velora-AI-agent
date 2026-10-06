import React from "react";
import { Badge } from "@/components/ui/badge";
import { Send, Server, LayoutDashboard, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Send,
      title: "Telegram Signal Dispatch",
      subtitle: "Source Event",
      description:
        "The automated intelligence engine identifies an actionable market setup and dispatches the raw signal message to the Telegram channel with entry, target, and stop parameters.",
    },
    {
      number: "02",
      icon: Server,
      title: "Backend Ingestion & Parsing",
      subtitle: "Data Pipeline",
      description:
        "The Velora ingestion pipeline validates signal fields into structured schemas, tracks lifecycle transitions (TP hits, SL triggers), and publishes updates to the API.",
    },
    {
      number: "03",
      icon: LayoutDashboard,
      title: "Live Dashboard Telemetry",
      subtitle: "Real-Time UI",
      description:
        "Signals and status progressions are rendered onto this dashboard within 10 seconds. In-place card updates ensure zero duplicate cards and instantaneous verification.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 border-t border-border/60 bg-background/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Pipeline Architecture
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            A three-stage streaming pipeline connecting Telegram intelligence directly to your browser.
          </p>
        </div>

        {/* 3-Step Process Flow */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative rounded-xl border border-border/70 bg-card/70 p-6 md:p-8 flex flex-col justify-between group hover:border-primary/40 transition-colors"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-extrabold text-primary/80 group-hover:text-primary transition-colors">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border text-foreground">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.subtitle}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Flow indicator between steps on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-muted-foreground shadow-sm">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
