import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhatVeloraAIDoes } from "@/components/sections/WhatVeloraAIDoes";
import { HowItWorks } from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Landing Page Landmark Structure */}
      <main id="main-content" className="flex-1 flex flex-col w-full">
        <Hero />
        <WhatVeloraAIDoes />
        <HowItWorks />
        <section id="live-signals" aria-label="Live Trading Signals" />
        <section id="disclaimer" aria-label="Risk Disclaimer" />
      </main>

      {/* Footer Landmark */}
      <footer id="footer" className="w-full border-t border-border" />
    </div>
  );
}
