"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { num: "01", label: "OVERVIEW", href: "#hero" },
    { num: "02", label: "CAPABILITIES", href: "#features" },
    { num: "03", label: "ARCHITECTURE", href: "#how-it-works" },
    { num: "04", label: "SPEC DECK", href: "#pipeline-spec" },
    { num: "05", label: "LIVE SIGNALS", href: "#live-signals" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-black bg-white transition-all">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Velora AI Homepage"
          >
            {/* Swiss Geometric Mark */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-black text-white group-hover:bg-[#FF3000] transition-colors duration-150">
              <span className="font-mono text-xs font-black">V</span>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="text-lg font-black tracking-tight text-black uppercase whitespace-nowrap">
                VELORA <span className="text-[#FF3000]">AI</span>
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-black bg-[#FF3000] text-white text-[10px] font-mono font-black uppercase tracking-wider shrink-0">
            BETA
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 mx-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1 text-[11px] xl:text-xs font-mono font-bold uppercase tracking-wider text-black transition-colors duration-150 hover:text-[#FF3000] whitespace-nowrap py-1"
            >
              <span className="text-[#777777] group-hover:text-[#FF3000] transition-colors duration-150">
                {link.num}/
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons: Only Signals Feed as requested */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a href="#live-signals" className="shrink-0">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 px-4 text-xs font-mono font-bold uppercase gap-2 border-2 border-black hover:border-[#FF3000] hover:text-[#FF3000] transition-colors"
            >
              <span>SIGNALS FEED</span>
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <a
            href="#live-signals"
            className="sm:hidden"
            title="Signals Feed"
          >
            <Button
              variant="secondary"
              size="sm"
              className="h-9 px-2.5 text-[11px] font-mono font-bold border-2 border-black"
            >
              <span>FEED</span>
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#FF3000] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t-2 border-black bg-white px-4 pt-3 pb-5 lg:hidden">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors duration-150"
              >
                <span className="text-[#FF3000]">{link.num}/</span>
                <span>{link.label}</span>
              </a>
            ))}
            <div className="pt-3 mt-2 border-t-2 border-black flex flex-col gap-2">

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
                <Button size="sm" className="w-full justify-center gap-2 bg-black text-white hover:bg-[#FF3000]">
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
