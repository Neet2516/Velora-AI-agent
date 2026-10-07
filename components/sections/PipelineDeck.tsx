"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PIPELINE_SLIDES, PipelineSlide } from "@/lib/constants/pipelineSlides";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  FileText,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function PipelineDeck() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"takeaways" | "details">("takeaways");
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const totalSlides = PIPELINE_SLIDES.length;
  const currentSlide = PIPELINE_SLIDES[currentIdx];

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIdx) return;
      setDirection(index > currentIdx ? 1 : -1);
      setCurrentIdx(index);
    },
    [currentIdx]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[currentIdx] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIdx]);

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        // Swipe left -> Next
        nextSlide();
      } else if (diff < -50) {
        // Swipe right -> Prev
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="pipeline-spec"
      className="py-16 md:py-24 border-b-2 border-black bg-white relative"
      aria-label="Velora AI Pipeline Specification Deck"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-sm font-black text-[#FF3000]">04</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">
            / PIPELINE SPECIFICATION
          </span>
          <div className="h-0.5 w-12 bg-black" />
          <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-2.5 py-0.5 text-[11px] font-bold font-mono uppercase">
            <span className="h-2 w-2 bg-[#FF3000]" />
            <span>OFFICIAL BETA DECK</span>
          </div>
        </div>

        {/* Section Header & Primary Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b-2 border-black">
          <div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-[1.05]">
              AI AGENT PIPELINE <br />
              <span className="text-[#FF3000]">SPECIFICATION DECK</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#555555] font-medium max-w-2xl leading-relaxed">
              Explore the complete 10-slide architectural whitepaper on how the Velora multi-agent
              signal engine collects, debates, and risk-verifies market setups. Available to view
              interactively or download as PDF.
            </p>
          </div>

          {/* Action CTAs: Direct PDF Download & View Options */}
          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-3">
            <a
              href="/Velora_AI_Agent_Pipeline_Beta.pdf"
              download="Velora_AI_Agent_Pipeline_Beta.pdf"
              className="w-full xs:w-auto"
              title="Download Velora AI Agent Pipeline PDF (1.8 MB)"
            >
              <Button size="lg" className="w-full gap-2.5 bg-black hover:bg-[#FF3000]">
                <Download className="h-4 w-4" />
                <span>DOWNLOAD PDF</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/20">1.8 MB</span>
              </Button>
            </a>

            <a
              href="/Velora_AI_Agent_Pipeline_Beta.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full xs:w-auto"
              title="Open full PDF in a new browser tab"
            >
              <Button variant="secondary" size="lg" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                <span>OPEN IN TAB</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Presentation Main Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Slide Showcase (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Slide Frame with Swiss Top Bar */}
            <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_#000000]">
              {/* Header Bar of Slide Frame */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-black text-white border-b-2 border-black">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#FF3000] font-black">
                    SLIDE {String(currentSlide.id).padStart(2, "0")}
                  </span>
                  <span>/</span>
                  <span className="text-white/70">{String(totalSlides).padStart(2, "0")}</span>
                  <span className="hidden sm:inline-block text-white/40">|</span>
                  <span className="hidden sm:inline-block truncate max-w-[240px] text-white/90">
                    {currentSlide.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Autoplay Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title={isPlaying ? "Pause autoplay" : "Start autoplay slideshow (6s)"}
                    aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  >
                    {isPlaying ? (
                      <Pause className="h-3.5 w-3.5 text-[#FF3000]" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Fullscreen Modal Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="p-1.5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title="View slide in fullscreen modal"
                    aria-label="View slide in fullscreen"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Slide Image Presentation Container (16:9 ratio) */}
              <div
                className="relative aspect-[16/9] w-full bg-[#111111] overflow-hidden group cursor-pointer select-none"
                onClick={() => setIsFullscreen(true)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                title="Click to view in fullscreen"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center bg-black"
                  >
                    <Image
                      src={currentSlide.imageSrc}
                      alt={`Velora AI Pipeline - Slide ${currentSlide.id}: ${currentSlide.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                      className="object-contain"
                      priority={currentSlide.id <= 2}
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Left / Right Overlay Controls */}
                <div
                  className="absolute inset-y-0 left-0 flex items-center px-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="h-10 w-10 sm:h-12 sm:w-12 bg-black/85 hover:bg-[#FF3000] text-white flex items-center justify-center transition-colors border border-white/20 sm:opacity-85 sm:group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
                  </button>
                </div>

                <div
                  className="absolute inset-y-0 right-0 flex items-center px-2 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="h-10 w-10 sm:h-12 sm:w-12 bg-black/85 hover:bg-[#FF3000] text-white flex items-center justify-center transition-colors border border-white/20 sm:opacity-85 sm:group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-6 w-6 stroke-[2.5]" />
                  </button>
                </div>

                {/* Mobile Tap to Expand Hint */}
                <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
                  <span className="bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 border border-white/20">
                    CLICK TO ENLARGE
                  </span>
                </div>
              </div>

              {/* Slide Scrubber & Controls Toolbar */}
              <div className="p-3 sm:p-4 bg-[#F2F2F2] border-t-2 border-black flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Navigation Buttons with Keyboard Indicators */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>PREV</span>
                    <span className="hidden md:inline text-[10px] text-[#555555]">[←]</span>
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    <span>NEXT</span>
                    <span className="hidden md:inline text-[10px] text-[#555555]">[→]</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Center: Slide Progress Bar */}
                <div className="flex-1 sm:mx-4 flex items-center gap-2">
                  <div className="h-2 w-full bg-white border border-black overflow-hidden">
                    <div
                      className="h-full bg-[#FF3000] transition-all duration-200"
                      style={{ width: `${((currentIdx + 1) / totalSlides) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs font-bold text-black min-w-[36px] text-right">
                    {Math.round(((currentIdx + 1) / totalSlides) * 100)}%
                  </span>
                </div>

                {/* Right: Quick Jump Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="slide-jump-select" className="sr-only">
                    Jump to slide
                  </label>
                  <select
                    id="slide-jump-select"
                    value={currentIdx}
                    onChange={(e) => goToSlide(Number(e.target.value))}
                    className="w-full sm:w-auto px-2.5 py-1.5 border-2 border-black bg-white text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#FF3000] cursor-pointer"
                  >
                    {PIPELINE_SLIDES.map((slide, idx) => (
                      <option key={slide.id} value={idx}>
                        {slide.id}. {slide.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Slide Thumbnails Ribbon (Horizontal Scrollable Strip) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase">
                <span className="text-black">SLIDE DECK THUMBNAILS (10 SLIDES)</span>
                <span className="text-[#555555]">SCROLL OR TAP TO SELECT</span>
              </div>

              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin max-w-full"
                role="tablist"
                aria-label="Slide thumbnail selector"
              >
                {PIPELINE_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <button
                      key={slide.id}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      className={`shrink-0 w-28 sm:w-32 text-left border-2 transition-all cursor-pointer ${
                        isActive
                          ? "border-black bg-black text-white shadow-[2px_2px_0px_0px_#FF3000]"
                          : "border-black/40 bg-white text-black hover:border-black hover:bg-[#F2F2F2]"
                      }`}
                      title={`Go to Slide ${slide.id}: ${slide.title}`}
                    >
                      <div className="relative aspect-[16/9] w-full bg-black border-b border-black/20 overflow-hidden">
                        <Image
                          src={slide.imageSrc}
                          alt={slide.title}
                          fill
                          sizes="128px"
                          className="object-cover"
                          unoptimized
                        />
                        {isActive && (
                          <div className="absolute top-1 left-1 bg-[#FF3000] text-white font-mono text-[9px] font-black px-1">
                            ACTIVE
                          </div>
                        )}
                      </div>
                      <div className="p-1.5">
                        <div className="font-mono text-[10px] font-black">
                          {String(slide.id).padStart(2, "0")}
                        </div>
                        <div className="text-[11px] font-bold leading-tight truncate">
                          {slide.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Slide Architecture Deep-Dive & Takeaways (4 Cols on Desktop) */}
          <div className="lg:col-span-4 border-2 border-black bg-white divide-y-2 divide-black shadow-[4px_4px_0px_0px_#000000]">
            {/* Box Header */}
            <div className="p-4 bg-black text-white flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-[#FF3000] font-black uppercase tracking-widest block">
                  ARCHITECTURE SPEC SHEET
                </span>
                <span className="font-mono text-sm font-bold uppercase tracking-wider">
                  SLIDE {String(currentSlide.id).padStart(2, "0")} INTEL
                </span>
              </div>
              <Badge variant="beta">{currentSlide.badge}</Badge>
            </div>

            {/* Slide Title & Subtitle */}
            <div className="p-5 space-y-2 bg-white">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#FF3000]">
                TOPIC FOCUS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight uppercase leading-tight">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-[#555555] font-mono font-bold uppercase">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Core Slide Summary */}
            <div className="p-5 space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                {currentSlide.summary}
              </p>
            </div>

            {/* Architectural Bullet Points */}
            <div className="p-5 space-y-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                SYSTEM SPECIFICATIONS
              </span>
              <ul className="space-y-2.5">
                {currentSlide.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-black font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#FF3000] shrink-0 mt-0.5" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags / Keywords */}
            <div className="p-4 bg-[#F2F2F2] flex flex-wrap gap-1.5">
              {currentSlide.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-bold bg-white text-black border border-black px-2 py-0.5 uppercase"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Bottom Download Bar in Spec Sheet */}
            <div className="p-4 bg-white flex flex-col gap-2">
              <a
                href="/Velora_AI_Agent_Pipeline_Beta.pdf"
                download="Velora_AI_Agent_Pipeline_Beta.pdf"
                className="w-full"
              >
                <Button size="sm" className="w-full gap-2 justify-center">
                  <Download className="h-3.5 w-3.5" />
                  <span>DOWNLOAD FULL 10-PAGE SPEC (PDF)</span>
                </Button>
              </a>
              <div className="text-[10px] font-mono text-[#555555] text-center">
                PDF SIZE: 1.8 MB • BETA ARCHITECTURE EDITION
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Presentation Modal */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Slide ${currentSlide.id} fullscreen`}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between text-white border-b border-white/20 pb-3 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm sm:text-base font-black text-[#FF3000]">
                SLIDE {String(currentSlide.id).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline font-mono text-sm text-white/80">
                — {currentSlide.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/Velora_AI_Agent_Pipeline_Beta.pdf"
                download="Velora_AI_Agent_Pipeline_Beta.pdf"
                className="hidden xs:inline-flex"
              >
                <Button size="sm" variant="secondary" className="gap-2">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </Button>
              </a>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 border border-white/30 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Close fullscreen modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Slide Image */}
          <div
            className="flex-1 relative flex items-center justify-center my-2 max-h-[82vh]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[16/9] w-full max-w-6xl max-h-full border-2 border-white/30 bg-black">
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                unoptimized
              />
            </div>

            {/* Navigation Overlay Inside Modal */}
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/80 hover:bg-[#FF3000] text-white flex items-center justify-center border border-white/30 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/80 hover:bg-[#FF3000] text-white flex items-center justify-center border border-white/30 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>

          {/* Modal Footer Controls */}
          <div
            className="flex items-center justify-between text-white border-t border-white/20 pt-3 text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/60">USE ARROW KEYS OR SWIPE TO NAVIGATE • PRESS ESC TO EXIT</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="px-3 py-1 border border-white/30 hover:bg-white hover:text-black transition-colors"
              >
                PREV
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="px-3 py-1 border border-white/30 hover:bg-white hover:text-black transition-colors"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
