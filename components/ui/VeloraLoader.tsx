"use client";

import React, { useEffect, useRef, useState } from "react";

// Continuous cursive stroke path for "Velora" matching the reference design
const VELORA_PATH =
  "M 380 238 C 383 234 388 234 391 240 C 394 248 397 266 403 278 C 407 286 410 291 414 291 C 418 290 422 281 426 265 C 429 252 432 243 434 245 C 436 248 434 262 432 268 C 431 273 434 276 438 274 C 443 270 448 261 447 253 C 446 247 441 247 437 251 C 434 254 433 260 434 266 C 436 272 443 274 450 273 C 458 272 468 259 474 242 C 481 228 488 223 491 224 C 494 225 496 230 494 238 C 492 249 489 265 487 274 C 486 277 489 279 494 277 C 499 273 505 264 509 257 C 506 263 503 271 505 276 C 508 280 514 280 520 275 C 525 269 527 260 525 255 C 523 252 518 253 516 256 C 515 258 521 259 527 257 C 532 254 536 254 538 255 C 541 256 544 255 547 253 C 549 262 551 272 555 277 C 558 278 563 273 567 265 C 570 259 572 257 573 257 C 568 262 562 268 564 275 C 566 279 572 279 576 274 C 579 268 580 260 578 256 C 576 254 573 256 572 260 C 571 266 575 274 579 276 C 582 278 586 274 588 268 C 592 272 599 277 608 278 C 618 279 628 276 641 271";

// Constellation node dots along key cursive peaks
const GLOW_NODES = [
  { cx: 380, cy: 238, r: 2.2 }, // Start of V
  { cx: 491, cy: 224, r: 2.2 }, // Top crest of l
  { cx: 525, cy: 255, r: 1.8 }, // Peak of o
  { cx: 538, cy: 255, r: 1.8 }, // Shoulder of r
  { cx: 573, cy: 257, r: 2.0 }, // Peak of a
  { cx: 641, cy: 271, r: 2.4 }, // Terminal flourish
];

const PATH_TOTAL = 1000;

/**
 * VeloraLoader Component
 *
 * Appears exclusively on fresh page initialization / refresh / hard reload.
 * Animates a glowing handwriting script of "Velora" in icy blue and electric glow
 * against a deep midnight navy backdrop.
 */
export function VeloraLoader() {
  const [isRendered, setIsRendered] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [strokeOffset, setStrokeOffset] = useState(PATH_TOTAL);
  const [tipPos, setTipPos] = useState({ x: 380, y: 238 });
  const [tipVisible, setTipVisible] = useState(false);
  const [settledGlow, setSettledGlow] = useState(false);
  const [activeX, setActiveX] = useState(380);

  const measurePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock document scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      // For reduced motion users: render logo immediately and fade out cleanly
      setStrokeOffset(0);
      setSettledGlow(true);
      const timer = setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          setIsRendered(false);
          document.body.style.overflow = originalOverflow;
        }, 300);
      }, 900);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    }

    let animationFrameId: number;

    const startTime = performance.now();

    // Timeline milestones in milliseconds:
    // 0.0s – 0.3s (0-300ms)    : Dark background
    // 0.3s        (300ms)     : Glowing point appears at start
    // 0.4s – 2.8s (400-2800ms): Stroke is progressively handwritten
    // 2.8s – 3.2s (2800-3200ms): Final stroke settles
    // 3.2s – 4.2s (3200-4200ms): Logo held cleanly in view
    // 4.2s – 4.8s (4200-4800ms): Smooth cinematic fade out
    // 4.8s        (4800ms)    : Complete & unmount
    const T_TIP_APPEAR = 300;
    const T_WRITE_START = 400;
    const T_WRITE_END = 2800;
    const T_SETTLE_END = 3200;
    const T_FADE_START = 4200;
    const T_FADE_END = 4800;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      if (elapsed < T_TIP_APPEAR) {
        // 0.0s - 0.3s: Clean dark background
        setStrokeOffset(PATH_TOTAL);
        setTipVisible(false);
      } else if (elapsed < T_WRITE_START) {
        // 0.3s - 0.4s: Writing tip appears at start coordinate with soft pulse
        setTipVisible(true);
        setTipPos({ x: 380, y: 238 });
        setActiveX(380);
        setStrokeOffset(PATH_TOTAL);
      } else if (elapsed < T_WRITE_END) {
        // 0.4s - 2.8s: Progressively draw "Velora" from left to right
        setTipVisible(true);
        const writeDuration = T_WRITE_END - T_WRITE_START;
        const rawProgress = (elapsed - T_WRITE_START) / writeDuration;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        // Smooth cubic ease-in-out curve
        const ease =
          clampedProgress < 0.5
            ? 4 * clampedProgress * clampedProgress * clampedProgress
            : 1 - Math.pow(-2 * clampedProgress + 2, 3) / 2;

        const currentOffset = PATH_TOTAL * (1 - ease);
        setStrokeOffset(currentOffset);

        if (measurePathRef.current) {
          const actualLen = measurePathRef.current.getTotalLength();
          if (actualLen > 0) {
            const pt = measurePathRef.current.getPointAtLength(ease * actualLen);
            setTipPos({ x: pt.x, y: pt.y });
            setActiveX(pt.x);
          }
        }
      } else if (elapsed < T_SETTLE_END) {
        // 2.8s - 3.2s: Stroke complete, final stroke settles
        setStrokeOffset(0);
        setTipVisible(false);
        setSettledGlow(true);
        setActiveX(700);
      } else if (elapsed < T_FADE_START) {
        // 3.2s - 4.2s: Hold completed logo cleanly in view
        setStrokeOffset(0);
        setTipVisible(false);
        setSettledGlow(true);
        setActiveX(700);
      } else if (elapsed < T_FADE_END) {
        // 4.2s - 4.8s: Cinematic fade out
        setStrokeOffset(0);
        setTipVisible(false);
        const fadeProgress = (elapsed - T_FADE_START) / (T_FADE_END - T_FADE_START);
        setOpacity(Math.max(0, 1 - fadeProgress));
      } else {
        // Complete sequence
        setOpacity(0);
        setIsRendered(false);
        document.body.style.overflow = originalOverflow;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      aria-hidden="true"
      style={{ opacity, transition: "opacity 0.25s ease-out" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#030718] select-none pointer-events-auto"
    >
      {/* Subtle Radial Blue Center Glow */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(28, 58, 140, 0.35) 0%, rgba(12, 26, 70, 0.18) 35%, rgba(3, 7, 24, 0.95) 70%, #030718 100%)",
        }}
      >
        <div
          className={`w-[540px] h-[380px] rounded-full bg-[#1e40af]/25 blur-[95px] transition-all duration-1000 ${
            settledGlow ? "opacity-95 scale-105" : "opacity-60 scale-100"
          }`}
        />
      </div>

      {/* SVG Canvas for Velora Script */}
      <div className="relative z-10 w-[300px] xs:w-[380px] sm:w-[460px] md:w-[540px] max-w-[90vw] aspect-[295/90] flex items-center justify-center">
        <svg
          viewBox="360 210 295 90"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Deep Glow Filter */}
            <filter id="velora-ambient-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur" />
            </filter>

            {/* Electric Blue Core Glow Filter */}
            <filter id="velora-electric-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            </filter>

            {/* Writing Tip Intense Sparkle Filter */}
            <filter id="velora-tip-sparkle" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Hidden measurement path */}
          <path
            ref={measurePathRef}
            d={VELORA_PATH}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {/* LAYER 1: Deep Ambient Blue Glow */}
          <path
            d={VELORA_PATH}
            fill="none"
            stroke="#2563eb"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={PATH_TOTAL}
            strokeDasharray={PATH_TOTAL}
            strokeDashoffset={strokeOffset}
            opacity="0.5"
            filter="url(#velora-ambient-glow)"
          />

          {/* LAYER 2: Soft Electric Blue Stroke */}
          <path
            d={VELORA_PATH}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={PATH_TOTAL}
            strokeDasharray={PATH_TOTAL}
            strokeDashoffset={strokeOffset}
            opacity="0.9"
            filter="url(#velora-electric-glow)"
          />

          {/* LAYER 3: Crisp Icy Blue/White Highlight Core */}
          <path
            d={VELORA_PATH}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={PATH_TOTAL}
            strokeDasharray={PATH_TOTAL}
            strokeDashoffset={strokeOffset}
            opacity="0.98"
          />

          {/* Key Constellation Node Dots matching reference design */}
          {GLOW_NODES.map((node, idx) => {
            const isPassed = activeX >= node.cx - 5 || settledGlow;
            return (
              <g
                key={idx}
                className="transition-opacity duration-300"
                style={{ opacity: isPassed ? 1 : 0.2 }}
              >
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * 2.2}
                  fill="#38bdf8"
                  opacity={isPassed ? 0.6 : 0.15}
                  filter="url(#velora-electric-glow)"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="#ffffff"
                  opacity={isPassed ? 0.95 : 0.3}
                />
              </g>
            );
          })}

          {/* ACTIVE WRITING HEAD: Brighter glowing point leading the stroke */}
          {tipVisible && (
            <g transform={`translate(${tipPos.x}, ${tipPos.y})`} filter="url(#velora-tip-sparkle)">
              {/* Outer Cyan Glow Halo */}
              <circle r="7.5" fill="#38bdf8" opacity="0.75" />
              {/* Mid Intense Electric Flare */}
              <circle r="4.5" fill="#93c5fd" opacity="0.95" />
              {/* Core Pure White Point */}
              <circle r="2.4" fill="#ffffff" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
