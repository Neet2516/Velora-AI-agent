"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Send, Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Live Signals", href: "#live-signals" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            aria-label="Velora AI Homepage"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/25 text-primary shadow-sm">
              <Activity className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-foreground">
                VELORA<span className="text-primary font-mono ml-0.5">AI</span>
              </span>
            </div>
          </Link>
          <Badge variant="beta" className="hidden xs:inline-flex">
            BETA
          </Badge>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a href="#live-signals">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View Signals
            </Button>
          </a>
          <a
            href="https://t.me/VeloraAI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Velora Telegram Channel (opens in new tab)"
          >
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Send className="h-3.5 w-3.5" />
              <span>Join Telegram</span>
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
            <Button size="sm" className="h-8 px-2.5 text-xs gap-1">
              <Send className="h-3 w-3" />
              <span>Telegram</span>
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card/95 px-4 pt-3 pb-5 backdrop-blur-lg md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
              <a
                href="#live-signals"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="outline" size="sm" className="w-full justify-center">
                  View Signals
                </Button>
              </a>
              <a
                href="https://t.me/VeloraAI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button size="sm" className="w-full justify-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  <span>Join Telegram</span>
                  <ArrowUpRight className="h-3 w-3 opacity-70" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
