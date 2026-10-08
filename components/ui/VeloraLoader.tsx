"use client";

import React, { useEffect, useState } from "react";

const WORD = "VELORA";
const CHARS = WORD.split("");

/**
 * VeloraLoader Component
 *
 * Full-screen initial loader featuring the word "VELORA".
 * - Clean off-white/white background matching the main website.
 * - Subtle technical blueprint grid texture & soft radial electric-blue aura.
 * - Smooth typewriter reveal with a continuous glowing laser line & cursor tracer.
 * - Subtle electric-blue luminous glow per character as it strikes, settling into sharp black.
 * - Holds cleanly for ~500ms once complete.
 * - Smooth subtle zoom (1.00 -> 1.03 scale) with buttery cubic easing.
 * - Continuous, seamless transition/expansion into the live website with zero flicker.
 * - Automatically unmounts after completion (~2.2s total duration).
 * - Fully respects prefers-reduced-motion.
 */
export function VeloraLoader() {
  const [isRendered, setIsRendered] = useState(true);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock document scroll while loader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      // Immediate clean reveal without fast motion
      setRevealedCount(CHARS.length);
      setIsCompleted(true);
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsRendered(false);
          document.body.style.overflow = originalOverflow;
        }, 250);
      }, 400);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }

    let animationFrameId: number;
    const startTime = performance.now();

    // Timeline Configuration (Total ~2.2s):
    // 0ms - 250ms    : Clean white staging canvas
    // 250ms - 1250ms : Character reveal ("V-E-L-O-R-A", ~165ms per character)
    // 1250ms - 1750ms: Complete hold (~500ms) with gentle zoom-in (1.00 -> 1.03)
    // 1750ms - 2150ms: Smooth seamless exit fade & expand (400ms)
    // 2150ms         : Complete and unmount from DOM
    const T_TYPE_START = 250;
    const T_TYPE_END = 1250;
    const T_HOLD_END = 1750;
    const T_COMPLETE = 2150;

    const typeDuration = T_TYPE_END - T_TYPE_START;
    const charDuration = typeDuration / CHARS.length; // ~166.7ms per char

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < T_TYPE_START) {
        // Initial staging
        setRevealedCount(0);
        setActiveCharIndex(null);
      } else if (elapsed < T_TYPE_END) {
        // Typing phase
        const typingElapsed = elapsed - T_TYPE_START;
        const currentCount = Math.min(
          Math.floor(typingElapsed / charDuration) + 1,
          CHARS.length
        );

        setRevealedCount(currentCount);
        setActiveCharIndex(currentCount - 1);
      } else if (elapsed < T_HOLD_END) {
        // Hold phase (~500ms)
        setRevealedCount(CHARS.length);
        setActiveCharIndex(null);
        setIsCompleted(true);
      } else if (elapsed < T_COMPLETE) {
        // Seamless exit transition
        setRevealedCount(CHARS.length);
        setIsCompleted(true);
        setIsExiting(true);
      } else {
        // Finish & unmount
        setIsRendered(false);
        document.body.style.overflow = originalOverflow;
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none pointer-events-auto overflow-hidden"
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.04)" : "scale(1)",
        transition:
          "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Central Staging Container with Subtle Zoom */}
      <div
        className="relative z-10 flex flex-col items-center justify-center px-4"
        style={{
          transform: isCompleted ? "scale(1.025)" : "scale(1)",
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >

        {/* The Word "VELORA" in Heavy Geometric Sans */}
        <div className="relative flex items-center justify-center select-none">
          <div className="flex items-center tracking-tight sm:tracking-normal">
            {CHARS.map((char, index) => {
              const isRevealed = index < revealedCount;
              const isCurrent = activeCharIndex === index;

              return (
                <div key={index} className="relative inline-flex items-center justify-center">
                  <span
                    className="relative inline-block font-sans font-black uppercase text-7xl xs:text-8xl sm:text-9xl md:text-[120px] lg:text-[144px] xl:text-[168px] 2xl:text-[188px] leading-none select-none transition-all duration-200"
                    style={{
                      color: isRevealed ? "#000000" : "transparent",
                      textShadow: isCurrent
                        ? "0 0 24px rgba(91, 124, 255, 0.9), 0 0 45px rgba(0, 210, 255, 0.6)"
                        : "none",
                      transform: isRevealed
                        ? isCurrent
                          ? "translateY(0) scale(1.02)"
                          : "translateY(0) scale(1)"
                        : "translateY(4px) scale(0.96)",
                      opacity: isRevealed ? 1 : 0,
                      transition:
                        "opacity 120ms ease-out, transform 120ms ease-out, color 200ms ease-out, text-shadow 250ms ease-out",
                    }}
                  >
                    {char}

                    {/* Active character electric blue highlight flare */}
                    {isCurrent && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none select-none text-[#5B7CFF] opacity-90 blur-[1.5px] animate-pulse"
                      >
                        {char}
                      </span>
                    )}
                  </span>

                  {/* Sleek active electric-blue typewriter cursor attached right after active character */}
                  {isCurrent && !isCompleted && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-1 sm:-right-2 md:-right-2.5 lg:-right-3 top-[8%] bottom-[8%] w-[3px] sm:w-[4px] md:w-[5px] lg:w-[6px] bg-[#5B7CFF] rounded-full shadow-[0_0_14px_#5B7CFF,0_0_28px_#00D2FF] pointer-events-none z-20"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
