import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Send, CheckCircle2 } from "lucide-react";

export function WhatVeloraAIDoes() {
  const features = [
    {
      icon: Cpu,
      title: "Algorithmic Signal Generation",
      tag: "ANALYSIS",
      description:
        "Automated intelligence monitors market volatility and price structure, issuing structured setups with clear entry, stop loss, and tiered take-profit targets.",
    },
    {
      icon: Send,
      title: "Direct Telegram Dispatch",
      tag: "DISPATCH",
      description:
        "Signals originate in real time and are immediately distributed to the Velora Telegram community, minimizing communication latency for active market participants.",
    },
    {
      icon: CheckCircle2,
      title: "Transparent Live Verification",
      tag: "TELEMETRY",
      description:
        "Every signal status—including TP hits and Stop Loss triggers—is mirrored directly to this web dashboard for public, tamper-resistant tracking.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Core Capabilities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Velora AI Does
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            A specialized pipeline engineered to capture market setups and publish them with absolute transparency.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="relative overflow-hidden border-border/80 bg-card/60 hover:bg-card/90 transition-colors group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground/70">
                      {feature.tag}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
