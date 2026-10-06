"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Send, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "01 / OVERVIEW", href: "#hero" },
    { label: "02 / CAPABILITIES", href: "#features" },
    { label: "03 / ARCHITECTURE", href: "#how-it-works" },
    { label: "04 / LIVE SIGNALS", href: "#live-signals" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-black bg-white transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Velora AI Homepage"
          >
            {/* Swiss Geometric Mark */}
            <div className="flex h-7 w-7 items-center justify-center bg-black text-white group-hover:bg-[#FF3000] transition-colors duration-150">
              <span className="font-mono text-xs font-black">V</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black tracking-tighter text-black uppercase">
                VELORA <span className="text-[#FF3000]">AI</span>
              </span>
            </div>
          </Link>
          <Badge variant="beta" className="hidden xs:inline-flex">
            BETA
          </Badge>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-black transition-colors duration-150 hover:text-[#FF3000] focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#live-signals">
            <Button variant="secondary" size="sm">
              Signals Feed
            </Button>
          </a>
          <a
            href="https://t.me/VeloraAI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Velora Telegram Channel (opens in new tab)"
          >
            <Button size="sm" className="gap-2">
              <Send className="h-3.5 w-3.5" />
              <span>Telegram</span>
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://t.me/VeloraAI"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden"
          >
            <Button size="sm" className="h-9 px-3 text-[11px] gap-1">
              <Send className="h-3 w-3" />
              <span>Telegram</span>
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-none border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#FF3000]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b-2 border-black bg-white px-4 pt-3 pb-5 md:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t-2 border-black flex flex-col gap-2">
              <a
                href="#live-signals"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  Signals Feed
                </Button>
              </a>
              <a
                href="https://t.me/VeloraAI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button size="sm" className="w-full justify-center gap-2">
                  <Send className="h-3.5 w-3.5" />
                  <span>Join Telegram</span>
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
