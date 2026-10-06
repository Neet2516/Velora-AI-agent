import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhatVeloraAIDoes } from "@/components/sections/WhatVeloraAIDoes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LiveSignals } from "@/components/sections/LiveSignals";
import { RiskDisclaimer } from "@/components/sections/RiskDisclaimer";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/25 selection:text-foreground">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Landing Page Landmark Structure in exact specified sequence */}
      <main id="main-content" className="flex-1 flex flex-col w-full">
        {/* 1. Hero */}
        <Hero />

        {/* 2. What Velora AI Does */}
        <WhatVeloraAIDoes />

        {/* 3. How It Works */}
        <HowItWorks />

        {/* 4. Live Signals */}
        <LiveSignals />

        {/* 5. Risk Disclaimer */}
        <RiskDisclaimer />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
