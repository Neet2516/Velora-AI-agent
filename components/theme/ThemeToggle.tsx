"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-18 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode (currently ${theme})`}
      className={`relative inline-flex h-9 w-18 items-center rounded-full border-2 border-black dark:border-[#263B70] bg-white dark:bg-[#081331] p-1 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7CFF] select-none ${className}`}
    >
      {/* Sliding indicator pill */}
      <span
        className={`absolute top-0.5 bottom-0.5 w-[32px] rounded-full transition-transform duration-250 ease-out flex items-center justify-center ${
          isDark
            ? "translate-x-[32px] bg-[#101D42] border border-[#263B70] shadow-[0_0_10px_rgba(111,148,255,0.3)]"
            : "translate-x-0 bg-black/5 border border-black/10"
        }`}
      />

      {/* Sun icon */}
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
          !isDark ? "text-[#5B7CFF]" : "text-[#AAB7D4] hover:text-white"
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </span>

      {/* Moon icon */}
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
          isDark ? "text-[#6F94FF]" : "text-[#4B5563] hover:text-black"
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}
