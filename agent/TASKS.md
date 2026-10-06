# TASKS.md — Sequential Implementation Roadmap

## Status Legend

```
[ ] TODO
[~] IN PROGRESS
[x] COMPLETE
[!] BLOCKED
```

## Dependency Graph (Visual)

```
TASK-001
   └── TASK-002
           ├── TASK-003
           │       ├── TASK-005
           │       ├── TASK-006
           │       ├── TASK-007
           │       ├── TASK-008
           │       └── TASK-010 ──┐
           │                      │
           └── TASK-004           │
                   ├── TASK-005   │
                   ├── TASK-006   │
                   ├── TASK-007   │
                   └── TASK-008   │
                                  │
TASK-009 ─────────────────────────┤
   └── TASK-010                   │
           └── TASK-011           │
                   └── TASK-012   │
                           └── TASK-013
                                   └── TASK-014
                                           └── TASK-015
                                                   └── TASK-016
                                                           └── TASK-017
                                                                   └── TASK-018
                                                                           └── TASK-019
                                                                                   └── TASK-020
                                                                                           └── TASK-021
```

---

## TASK-001 — Project Initialization

```
ID:     TASK-001
Status: [x] COMPLETE
```

**Goal:**  
Bootstrap the Next.js 14+ project with TypeScript, Tailwind CSS, and the required tooling. Establish the project scaffold from which all other tasks build.

**Dependencies:** None

**Files Likely Affected:**
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `.env.example`
- `.gitignore`
- `lib/utils.ts`
- `README.md` (project root)

**Implementation Details:**
1. Scaffolded Next.js App Router with TypeScript, Tailwind CSS, and ESLint.
2. Verified App Router structure (`app/` directory).
3. Installed `lucide-react`, `clsx`, `tailwind-merge`, `framer-motion`, `@tanstack/react-query`, `zod`.
4. Created `lib/utils.ts` with `cn()` helper function.
5. Created `.env.example` and local development environment config.
6. Verified `npm run build` runs clean with 0 TypeScript/compilation errors.

**Acceptance Criteria:**
- [x] App Router directory structure exists (`app/`)
- [x] TypeScript strict mode enabled in `tsconfig.json`
- [x] Tailwind CSS configured
- [x] `.env.example` committed with required variables
- [x] `.gitignore` configured to ignore `.env.local` while tracking `.env.example`
- [x] `lib/utils.ts` exists with `cn()` helper function
- [x] Production build passes with 0 errors

**Validation Method:**
Ran `npm run build` successfully. Production build passed with 0 errors and static routes generated.

---

## TASK-002 — Design Token Integration

```
ID:     TASK-002
Status: [x] COMPLETE
```

**Goal:**  
Implement the full design system into the project — CSS custom properties, Tailwind config extensions, font loading. This task makes the design system real and usable by all components.

**Dependencies:** TASK-001

**Files Likely Affected:**
- `app/globals.css`
- `app/layout.tsx`

**Implementation Details:**
1. Configured CSS custom properties for all canonical tokens: `--background` (`#09090b`), `--card` (`#121215`), `--muted` (`#1e1e24`), `--border` (`#27272a`), `--primary` (`#6366f1`), `--success` (`#10b981`), `--warning` (`#f59e0b`), `--destructive` (`#ef4444`), `--foreground` (`#fafafa`), `--muted-foreground` (`#a1a1aa`), and alpha-variant overlays.
2. Mapped tokens into `@theme inline` in `app/globals.css`.
3. Configured `Geist Sans` and `Geist Mono` typography variables with fallback stacks.
4. Styled body with dark-theme baseline background, foreground, and smooth scrollbars.
5. Exported separate metadata and viewport configurations.

**Acceptance Criteria:**
- [x] All color tokens from `DESIGN_SYSTEM.md` are defined as CSS custom properties
- [x] All tokens are available as Tailwind utilities (`bg-card`, `text-primary`, `border-border`, etc.)
- [x] Fonts load correctly via `next/font`
- [x] `body` uses the correct background and foreground colors
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-003 — Application Shell

```
ID:     TASK-003
Status: [x] COMPLETE
```

**Goal:**  
Build the root layout, page scaffold, and provider tree. Establish the structural shell that wraps all page content.

**Dependencies:** TASK-001, TASK-002

**Files Likely Affected:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/providers.tsx`

**Implementation Details:**
1. Created `app/providers.tsx` Client Component wrapping TanStack `QueryClientProvider` with optimized cache timings.
2. Connected `<Providers>` in `app/layout.tsx` around all application children.
3. Created semantic structural shell in `app/page.tsx` for landmark sections (Navbar, Hero, Features, How It Works, Live Signals, Disclaimer, Footer).
4. Verified compilation and SSR prerendering with zero warnings.

**Acceptance Criteria:**
- [x] `@tanstack/react-query` installed and `QueryClientProvider` wrapping the app
- [x] `app/providers.tsx` exists and is marked `"use client"`
- [x] Root metadata includes title and description
- [x] `app/page.tsx` renders without errors
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-004 — shadcn/ui Setup & Primitives

```
ID:     TASK-004
Status: [x] COMPLETE
```

**Goal:**  
Initialize and build the core UI component primitives that will be used throughout the project (Badge, Button, Card, Separator, Skeleton).

**Dependencies:** TASK-001, TASK-002, TASK-003

**Files Likely Affected:**
- `components/ui/badge.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/separator.tsx`
- `components/ui/skeleton.tsx`

**Implementation Details:**
1. Created `components/ui/badge.tsx` with semantic variants (`default`, `secondary`, `outline`, `success`, `warning`, `destructive`, `beta`).
2. Created `components/ui/button.tsx` with keyboard focus rings, touch targets, and size variants (`sm`, `default`, `lg`, `icon`).
3. Created `components/ui/card.tsx` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) with `--card` surface elevation and subtle border styling.
4. Created `components/ui/separator.tsx` for horizontal and vertical dividers.
5. Created `components/ui/skeleton.tsx` with dark pulse animations for signal card and section skeletons.
6. Verified full TypeScript type safety and zero compilation errors.

**Acceptance Criteria:**
- [x] `components/ui/badge.tsx`, `button.tsx`, `card.tsx`, `separator.tsx`, `skeleton.tsx` implemented
- [x] Components adhere strictly to design tokens from `DESIGN_SYSTEM.md`
- [x] Zero CSS conflicts or runtime overhead
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-005 — Navbar Component

```
ID:     TASK-005
Status: [x] COMPLETE
```

**Goal:**  
Build the Navbar — sticky, minimal, technical dark theme with logo wordmark, Beta badge, navigation anchors, "View Signals" action, and "Join Telegram" CTA.

**Dependencies:** TASK-002, TASK-003, TASK-004

**Files Likely Affected:**
- `components/layout/Navbar.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `components/layout/Navbar.tsx` with sticky positioning (`top: 0`, `z-50`), backdrop blur (`backdrop-blur-md`), and dark border styling.
2. Integrated Velora AI logo with animated activity indicator and `BETA` pill badge.
3. Added desktop navigation links with smooth scrolling to sections (`#live-signals`, `#features`, `#how-it-works`).
4. Added "View Signals" secondary CTA and "Join Telegram" primary CTA button.
5. Implemented responsive mobile drawer navigation with accessible hamburger button and touch-friendly targets.
6. Mounted `<Navbar />` inside `app/page.tsx`.

**Acceptance Criteria:**
- [x] Navbar is sticky and stays at top on scroll
- [x] Backdrop blur and transparency work correctly
- [x] Beta badge is visible and styled
- [x] "View Signals" and "Join Telegram" CTA buttons render and operate correctly
- [x] Responsive layout on mobile and desktop
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-006 — Hero Section

```
ID:     TASK-006
Status: [x] COMPLETE
```

**Goal:**  
Build the Hero section — the primary product introduction with clear Beta indicators, concise value proposition, View Signals CTA, and Join Telegram CTA without unsupported financial claims.

**Dependencies:** TASK-002, TASK-003, TASK-004

**Files Likely Affected:**
- `components/sections/Hero.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `components/sections/Hero.tsx` with a refined technical dark grid and radial glow overlay.
2. Added pulsing Beta pipeline telemetry status indicator.
3. Implemented headline and value proposition highlighting automated Telegram-to-web signal mirroring.
4. Added dual CTAs: "View Live Signals" (smooth jump to `#live-signals`) and "Join Telegram Channel" external link.
5. Added technical specification telemetry indicators (latency target, pipeline architecture, read-only mode).
6. Mounted `<Hero />` inside `app/page.tsx`.

**Acceptance Criteria:**
- [x] Hero renders responsive layout across mobile and desktop
- [x] Headline and value proposition are clear and avoid unsupported profit claims
- [x] Dual CTAs render and function correctly
- [x] Visual design adheres strictly to dark minimal design system
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-007 — "What Velora AI Does" Section

```
ID:     TASK-007
Status: [x] COMPLETE
```

**Goal:**  
Build the features section with exactly 3 concise product feature points focusing on actual product functionality (algorithmic generation, Telegram dispatch, live web verification) without extraneous claims.

**Dependencies:** TASK-002, TASK-003, TASK-004

**Files Likely Affected:**
- `components/sections/WhatVeloraAIDoes.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `components/sections/WhatVeloraAIDoes.tsx` featuring exactly 3 technical capability cards:
   - "Algorithmic Signal Generation" (volatility & technical setup monitoring with structured targets)
   - "Direct Telegram Dispatch" (immediate distribution to subscribers with zero human lag)
   - "Transparent Live Verification" (tamper-resistant public web mirroring of all setups and TP/SL hits)
2. Implemented responsive grid (1 col mobile, 3 col desktop).
3. Used semantic `Card`, `Badge`, and Lucide icons.
4. Mounted `<WhatVeloraAIDoes />` inside `app/page.tsx`.

**Acceptance Criteria:**
- [x] Section renders exactly 3 concise, product-focused feature points
- [x] Responsive layout works seamlessly across mobile and desktop
- [x] No invented or exaggerated features
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-008 — "How It Works" Section

```
ID:     TASK-008
Status: [x] COMPLETE
```

**Goal:**  
Build the step-by-step "How It Works" section with exactly 3 steps illustrating the pipeline flow: Telegram Dispatch → Backend / Processing → Live Website Dashboard.

**Dependencies:** TASK-002, TASK-003, TASK-004

**Files Likely Affected:**
- `components/sections/HowItWorks.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `components/sections/HowItWorks.tsx` with numbered step indicators (01, 02, 03) and technical process descriptions:
   - "01 — Telegram Signal Dispatch" (Source event detection and dispatch)
   - "02 — Backend Ingestion & Parsing" (Data schema validation and lifecycle state management)
   - "03 — Live Dashboard Telemetry" (Real-time card rendering and in-place updates <10s)
2. Added desktop horizontal transition flow indicators and responsive vertical stacking on mobile.
3. Mounted `<HowItWorks />` inside `app/page.tsx`.

**Acceptance Criteria:**
- [x] Exactly 3 pipeline steps communicating Telegram → Backend → Live Website
- [x] Visually clear process representation with responsive mobile layout
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-009 — Signal Data Model & Zod Schema

```
ID:     TASK-009
Status: [x] COMPLETE
```

**Goal:**  
Define the TypeScript types and Zod validation schemas for the Signal data model.

**Dependencies:** TASK-001

**Files Likely Affected:**
- `lib/schemas/signal.ts`
- `lib/types/signal.ts`

**Implementation Details:**
1. Created `lib/schemas/signal.ts` defining:
   - `SignalStatusSchema`: `ACTIVE`, `TP1_HIT`, `TP2_HIT`, `TP3_HIT`, `SL_HIT`, `UNPARSED`
   - `SignalDirectionSchema`: `BUY`, `SELL`, `LONG`, `SHORT`
   - `SignalSchema`: comprehensive object schema with `id`, `symbol`/`asset`, `direction`, `entry`, `sl`, `tp1`, `tp2`, `tp3`, `status`, `raw_text`, `created_at`, `updated_at`
   - `SignalListResponseSchema`: array wrapper with pagination metadata
   - Helper normalizers: `getSignalSymbol()` and `normalizeDirection()`
2. Created `lib/types/signal.ts` re-exporting all inferred TypeScript types and validation schemas.
3. Verified strict type checks and clean compilation.

**Acceptance Criteria:**
- [x] `SignalSchema` covers all fields from product specification
- [x] Status and direction are validated enums
- [x] Nullable and optional fields correctly typed
- [x] Inferred TypeScript types exported and usable
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-010 — SignalCard Component

```
ID:     TASK-010
Status: [x] COMPLETE
```

**Goal:**  
Build the `SignalCard` component — the core UI unit for displaying a single trading signal with semantic color coding, status indicators, and raw message fallback.

**Dependencies:** TASK-002, TASK-003, TASK-004, TASK-009

**Files Likely Affected:**
- `components/signals/SignalBadge.tsx`
- `components/signals/SignalCard.tsx`

**Implementation Details:**
1. Created `components/signals/SignalBadge.tsx` handling:
   - Status badges with icons (`ACTIVE` with pulsing dot, `TP1_HIT`, `TP2_HIT`, `TP3_HIT`, `SL_HIT`, `UNPARSED`)
   - Direction badges (`BUY` / `LONG` in bold green with arrow, `SELL` / `SHORT` in bold red with arrow)
2. Created `components/signals/SignalCard.tsx`:
   - Structured level table: Entry, Stop Loss (destructive styling), Take Profit 1, optional TP2, optional TP3 (success styling)
   - Visual highlighting and checkmarks for hit target levels
   - Active status border accent and ring
   - Safe raw text block fallback for `UNPARSED` signals
   - Timestamp and short hash identifier display
3. Verified strict TypeScript type adherence and clean compilation.

**Acceptance Criteria:**
- [x] Supports all 6 signal lifecycle states cleanly
- [x] Semantic color coding applied (BUY=green, SELL=red, SL=red, TP=green)
- [x] Hit targets highlighted and marked
- [x] UNPARSED state displays raw text safely without crashing
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-011 — Signal State Rendering & Transitions

```
ID:     TASK-011
Status: [x] COMPLETE
```

**Goal:**  
Ensure SignalCard correctly handles in-place state transitions when a signal's status changes (TP hit, SL hit) without remounting the card or duplicating list items.

**Dependencies:** TASK-010

**Files Likely Affected:**
- `components/signals/SignalCard.tsx`

**Implementation Details:**
1. Enhanced `components/signals/SignalCard.tsx` with Framer Motion `motion.div` layout animations and transition states.
2. Implemented `useReducedMotion()` to respect system accessibility preferences.
3. Added animated state transitions for status badge, accent bar, and target price rows (`TP1`, `TP2`, `TP3`, `SL`).
4. Guaranteed in-place update behavior when signal properties update, preventing unmounts or card duplication.

**Acceptance Criteria:**
- [x] In-place state transitions operate without card remounting
- [x] Updated fields animate smoothly with semantic color transitions
- [x] System accessibility `prefers-reduced-motion` fully respected
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-012 — SignalList Component

```
ID:     TASK-012
Status: [x] COMPLETE
```

**Goal:**  
Build the `SignalList` component that renders the collection of signal cards in newest-first order with responsive grid layout and AnimatePresence list updates.

**Dependencies:** TASK-010, TASK-011

**Files Likely Affected:**
- `components/signals/SignalList.tsx`
- `components/signals/SignalCardSkeleton.tsx`

**Implementation Details:**
1. Created `components/signals/SignalCardSkeleton.tsx` for loading state placeholders.
2. Created `components/signals/SignalList.tsx` with:
   - Dynamic descending sort by `created_at` guaranteeing newest-first ordering
   - Strict `key={signal.id}` assignment preventing duplication during status updates
   - Framer Motion `<AnimatePresence>` for smooth list item insertions
   - Responsive multi-column grid (1 col mobile, 2 col md, 3 col lg)
   - Screen-reader accessible `aria-live="polite"` region
3. Verified clean TypeScript compilation and zero build errors.

**Acceptance Criteria:**
- [x] Signals render in strict newest-first order
- [x] Stable `key={signal.id}` prevents duplicate cards
- [x] Skeleton placeholders display during loading
- [x] Responsive grid works cleanly across all device widths
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-013 — Loading / Empty / Error States

```
ID:     TASK-013
Status: [x] COMPLETE
```

**Goal:**  
Build all fallback states for the Live Signals section: loading skeleton, empty state ("No signals right now."), error state with retry, and live reconnecting status banner.

**Dependencies:** TASK-012

**Files Likely Affected:**
- `components/signals/SignalCardSkeleton.tsx`
- `components/signals/SignalListEmpty.tsx`
- `components/signals/SignalListError.tsx`
- `components/signals/SignalStatusBanner.tsx`
- `components/signals/SignalList.tsx`

**Implementation Details:**
1. Created `components/signals/SignalListEmpty.tsx` rendering exact required empty state: "No signals right now." with technical subtext and radar iconography.
2. Created `components/signals/SignalListError.tsx` rendering pipeline interruption state with retry trigger button.
3. Created `components/signals/SignalStatusBanner.tsx` showing active telemetry status (`connected`, `reconnecting`, `error`), signal counter, and manual sync action.
4. Integrated `SignalListEmpty` directly into `SignalList` fallback handling.
5. Verified TypeScript strict compliance and build output.

**Acceptance Criteria:**
- [x] Skeleton animation matching design system
- [x] Empty state displays exact text "No signals right now."
- [x] Error state displays message and retry action
- [x] Reconnecting status banner supported
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-014 — API Integration

```
ID:     TASK-014
Status: [ ] TODO
```

**Goal:**  
Wire the Live Signals section to the real Velora API. Implement the API client, fetch function, Zod validation, and TanStack Query hook.

**Dependencies:** TASK-009, TASK-013

**Files Likely Affected:**
- `lib/api/client.ts`
- `lib/api/signals.ts`
- `hooks/useSignals.ts`
- `components/sections/LiveSignals.tsx`

**Implementation Details:**
1. Create `lib/api/client.ts` — base fetch wrapper with base URL from `NEXT_PUBLIC_API_URL`, error normalization
2. Create `lib/api/signals.ts` — `fetchSignals()` function calling `GET /api/signals`
3. Validate API response against `SignalListResponseSchema` (Zod)
4. If validation fails, log error and return empty array with an error flag (do NOT silently swallow)
5. Create `hooks/useSignals.ts` — TanStack Query `useQuery` hook, `refetchInterval: 5000` (5 seconds)
6. Connect `LiveSignals.tsx` to use `useSignals()` hook
7. Handle `isLoading`, `isError`, `data` states from the query

> **BLOCKED CONDITION**: This task requires `NEXT_PUBLIC_API_URL` to point to a working API. If the API is not yet available, use mock data mode with an environment flag.

**Acceptance Criteria:**
- [ ] `fetchSignals()` calls the correct endpoint
- [ ] Response is validated through Zod before use
- [ ] Invalid responses log an error and degrade gracefully
- [ ] `useSignals` hook returns typed `Signal[]`
- [ ] Query refetches every 5 seconds
- [ ] Loading/error/empty states are wired correctly
- [ ] `NEXT_PUBLIC_API_URL` is the only source of the base URL

**Validation Method:**
Point at a real or mock API — confirm signals load, display correctly, and refetch every 5 seconds (check Network tab).

---

## TASK-015 — Live Update Mechanism

```
ID:     TASK-015
Status: [ ] TODO
```

**Goal:**  
Validate and tune the live update mechanism. Confirm <10s latency from signal creation to display. Optionally upgrade from polling to SSE if backend supports it.

**Dependencies:** TASK-014

**Files Likely Affected:**
- `hooks/useSignals.ts`
- `hooks/useSignalStream.ts` (if SSE is implemented)
- `lib/api/signals.ts`

**Implementation Details:**
1. With polling: verify `refetchInterval: 5000` is working, signal appears within ~5s of API update
2. If SSE endpoint is available: implement `useSignalStream` using `EventSource` API, replace polling
3. If SSE: handle connection, reconnection, and fallback to polling on error
4. Add connection status indicator (small "LIVE" badge when connected)
5. Test that status updates (TP/SL hit) update existing cards, not create new ones

> **UNSPECIFIED**: Whether the backend will provide an SSE endpoint. Start with polling. Upgrade to SSE when backend confirms support.

**Acceptance Criteria:**
- [ ] New signals appear on the website within 10 seconds of API availability
- [ ] TP/SL updates modify existing cards (no duplicates)
- [ ] Connection status indicator is visible
- [ ] Reconnection works after browser tab sleep/wake
- [ ] No memory leaks (event listeners are cleaned up on unmount)

**Validation Method:**
Manually add a signal to the API while watching the browser — confirm it appears within 10 seconds. Check browser memory over time.

---

## TASK-016 — Raw Signal Fallback (UNPARSED)

```
ID:     TASK-016
Status: [ ] TODO
```

**Goal:**  
Ensure `UNPARSED` signals are correctly displayed and never silently dropped.

**Dependencies:** TASK-015

**Files Likely Affected:**
- `components/signals/SignalCard.tsx`
- `lib/schemas/signal.ts`

**Implementation Details:**
1. When `status === UNPARSED`, the card must render `raw_text` in a monospace block
2. `raw_text` must be sanitized before rendering (no XSS risk from Telegram content)
3. The card still shows the signal `id` and `created_at` timestamp
4. The card clearly indicates it's an unparsed message (badge or label)
5. If `raw_text` is also null/empty, render "Message could not be parsed" placeholder

**Acceptance Criteria:**
- [ ] UNPARSED signals render the raw text in monospace
- [ ] raw_text is sanitized (no HTML injection possible)
- [ ] Card has "UNPARSED" label
- [ ] If raw_text is null, a fallback message is shown
- [ ] UNPARSED signal is never silently dropped

**Validation Method:**
Inject a mock UNPARSED signal with raw_text containing `<script>alert('xss')</script>` — confirm it renders as text, not executes.

---

## TASK-017 — Responsive Optimization

```
ID:     TASK-017
Status: [ ] TODO
```

**Goal:**  
Audit and optimize all components for mobile-first responsiveness. Ensure the complete page looks correct from 320px to 1440px.

**Dependencies:** TASK-016

**Files Likely Affected:**
- All section components
- `components/signals/SignalCard.tsx`
- `components/signals/SignalList.tsx`
- `components/layout/Navbar.tsx`

**Implementation Details:**
1. Test every section at: 320px, 375px, 768px, 1024px, 1280px, 1440px
2. Fix any overflow issues, text truncation, or layout breakage
3. Ensure signal cards are readable on 375px without horizontal scroll
4. Ensure tap targets are minimum 44x44px on mobile
5. Check font sizes are legible on mobile (minimum 14px for body)

**Acceptance Criteria:**
- [ ] No horizontal scroll at any breakpoint
- [ ] All text is legible at 375px
- [ ] Tap targets ≥ 44px on mobile
- [ ] Signal cards fully readable on mobile
- [ ] Desktop layout uses full width appropriately

**Validation Method:**
Chrome DevTools device emulation at all listed widths. Also test on a real mobile device if available.

---

## TASK-018 — Accessibility Audit

```
ID:     TASK-018
Status: [ ] TODO
```

**Goal:**  
Audit and fix accessibility issues. Ensure the site is keyboard navigable, screen reader compatible, and meets WCAG 2.1 AA.

**Dependencies:** TASK-017

**Files Likely Affected:**
- All components

**Implementation Details:**
1. Audit color contrast for all text/background combinations (must meet 4.5:1)
2. Ensure all interactive elements have visible focus rings
3. Add `aria-label` to icon-only buttons
4. Add `aria-live="polite"` to the signals list region for screen reader announcements
5. Ensure heading hierarchy is correct (one `h1`, logical h2/h3/h4 order)
6. Test keyboard navigation: Tab through all interactive elements
7. Add `alt` text to all images

**Acceptance Criteria:**
- [ ] All text passes 4.5:1 contrast ratio
- [ ] Keyboard navigation works through all interactive elements
- [ ] Signals list region has `aria-live` attribute
- [ ] No accessibility errors in axe DevTools scan
- [ ] Heading hierarchy is semantically correct

**Validation Method:**
Run axe DevTools browser extension. Tab through all interactive elements manually.

---

## TASK-019 — Performance Optimization

```
ID:     TASK-019
Status: [ ] TODO
```

**Goal:**  
Optimize the page for Core Web Vitals and fast load times.

**Dependencies:** TASK-018

**Files Likely Affected:**
- `app/layout.tsx`
- `next.config.ts`
- Image components

**Implementation Details:**
1. Use `next/image` for all images
2. Ensure fonts are loaded with `next/font` (no render-blocking)
3. Audit bundle size (`npm run build` — check build output)
4. Ensure static sections are Server Components (no unnecessary client JS)
5. Add `loading="lazy"` to below-the-fold images
6. Verify no unused CSS (Tailwind purges by default)
7. Add `<link rel="preconnect">` for API domain in layout

**Acceptance Criteria:**
- [ ] Lighthouse performance score ≥ 80 (mobile)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No render-blocking resources
- [ ] All images use `next/image`

**Validation Method:**
Run Lighthouse in Chrome DevTools (mobile preset). Check build output for bundle sizes.

---

## TASK-020 — Testing

```
ID:     TASK-020
Status: [ ] TODO
```

**Goal:**  
Implement the test suite per `TEST_PLAN.md`. Cover unit, component, and integration tests.

**Dependencies:** TASK-019

**Files Likely Affected:**
- `__tests__/` or `*.test.tsx` alongside components
- `jest.config.ts` or `vitest.config.ts`
- `package.json` (test scripts)

**Implementation Details:**
Per `TEST_PLAN.md` — see that document for full test specifications.

**Acceptance Criteria:**
- [ ] Unit tests for Zod schemas (valid/invalid signal)
- [ ] Unit tests for `cn()` utility
- [ ] Component tests for `SignalCard` (all 6 states)
- [ ] Component tests for loading/empty/error states
- [ ] Integration test for `useSignals` hook with mock server
- [ ] All tests pass: `npm test`

**Validation Method:**
`npm test` — all tests must pass with zero failures.

---

## TASK-021 — Production Readiness

```
ID:     TASK-021
Status: [ ] TODO
```

**Goal:**  
Final production checklist — environment setup, error monitoring, meta tags, security headers, deployment readiness.

**Dependencies:** TASK-020

**Files Likely Affected:**
- `next.config.ts`
- `app/layout.tsx`
- `.env.example`

**Implementation Details:**
1. Add security headers in `next.config.ts` (`Content-Security-Policy`, `X-Frame-Options`, etc.)
2. Verify no secrets in any committed file
3. Add Open Graph and Twitter card meta tags
4. Add `robots.txt` and `sitemap.xml`
5. Add favicon and web app manifest
6. Confirm `npm run build` succeeds with no errors or warnings
7. Document deployment steps in project `README.md`

**Acceptance Criteria:**
- [ ] `npm run build` succeeds with zero errors
- [ ] No secrets in committed files
- [ ] Security headers are configured
- [ ] OG tags render correctly (test with og:debugger)
- [ ] favicon is present
- [ ] `README.md` has deployment instructions

**Validation Method:**
`npm run build && npm run start` — confirm production build runs correctly.

---

*Last updated: Initial planning phase — all tasks at [ ] TODO.*
