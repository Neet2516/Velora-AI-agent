"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { VeloraLogo } from "@/components/ui/VeloraLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const navLinks = [
    { num: "01", label: "OVERVIEW", href: "#hero" },
    { num: "02", label: "CAPABILITIES", href: "#features" },
    { num: "03", label: "ARCHITECTURE", href: "#how-it-works" },
    { num: "04", label: "SPEC DECK", href: "#pipeline-spec" },
    { num: "05", label: "LIVE SIGNALS", href: "#live-signals" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-black dark:border-[#263B70] bg-white/95 dark:bg-[#050A1F]/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo with Infinity Gradient Mark */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Velora AI Homepage"
          >
            <VeloraLogo />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 mx-4">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`group relative flex items-center gap-1 text-[11px] xl:text-xs font-mono font-bold uppercase tracking-wider py-1.5 transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? "text-[#5B7CFF] dark:text-[#6F94FF]"
                    : "text-foreground/80 hover:text-[#5B7CFF] dark:hover:text-[#6F94FF]"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-[#5B7CFF] dark:text-[#6F94FF]"
                      : "text-muted-foreground group-hover:text-[#5B7CFF] dark:group-hover:text-[#6F94FF] transition-colors"
                  }
                >
                  {link.num}/
                </span>
                <span>{link.label}</span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B7CFF] dark:bg-[#6F94FF] shadow-[0_0_8px_rgba(91,124,255,0.6)]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop Action Buttons: Theme Toggle & Signals Feed */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Polished Compact Theme Toggle */}
          <ThemeToggle />

          <a href="#live-signals" className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 px-4 text-xs font-mono font-bold uppercase gap-2 border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:border-[#5B7CFF] hover:text-[#5B7CFF] dark:hover:border-[#6F94FF] dark:hover:text-[#6F94FF] transition-colors"
            >
              <span>SIGNALS FEED</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#5B7CFF] dark:text-[#6F94FF]" />
            </Button>
          </a>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <ThemeToggle className="sm:hidden" />

          <a
            href="#live-signals"
            className="sm:hidden"
            title="Signals Feed"
          >
            <Button
              variant="secondary"
              size="sm"
              className="h-9 px-2.5 text-[11px] font-mono font-bold border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331]"
            >
              <span>FEED</span>
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-none border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] text-foreground hover:bg-black hover:text-white dark:hover:bg-[#101D42] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#5B7CFF] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t-2 border-black dark:border-[#263B70] bg-white dark:bg-[#050A1F] px-4 pt-3 pb-5 lg:hidden animate-in fade-in duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveSection(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-150 ${
                  activeSection === link.href
                    ? "text-[#5B7CFF] dark:text-[#6F94FF] bg-black/5 dark:bg-white/5"
                    : "text-foreground hover:bg-black hover:text-white dark:hover:bg-[#101D42]"
                }`}
              >
                <span className="text-[#5B7CFF] dark:text-[#6F94FF]">{link.num}/</span>
                <span>{link.label}</span>
              </a>
            ))}
            <div className="pt-3 mt-2 border-t-2 border-black dark:border-[#263B70] flex flex-col gap-2">
              <a
                href="#live-signals"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  Live Signals Feed
                </Button>
              </a>
              <a
                href="https://t.me/+SUyvL9H24dtmOGQ9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button size="sm" className="w-full justify-center gap-2 bg-black dark:bg-[#5B7CFF] text-white hover:bg-[#5B7CFF]">
                  <Send className="h-3.5 w-3.5" />
                  <span>Join Telegram Channel</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
