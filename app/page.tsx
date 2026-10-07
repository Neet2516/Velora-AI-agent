import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhatVeloraAIDoes } from "@/components/sections/WhatVeloraAIDoes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PipelineDeck } from "@/components/sections/PipelineDeck";
import { LiveSignals } from "@/components/sections/LiveSignals";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-[#5B7CFF] selection:text-white transition-colors duration-300 relative">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Landing Page Landmark Structure in exact specified sequence */}
      <main id="main-content" className="relative z-10 flex-1 flex flex-col w-full overflow-x-hidden">
        {/* 1. Hero */}
        <Hero />

        {/* 2. What Velora AI Does */}
        <WhatVeloraAIDoes />

        {/* 3. How It Works */}
        <HowItWorks />

        {/* 4. AI Agent Pipeline Specification Deck & PDF */}
        <PipelineDeck />

        {/* 5. Live Signals */}
        <LiveSignals />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
