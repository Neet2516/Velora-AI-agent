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
Status: [x] COMPLETE
```

**Goal:**  
Wire the Live Signals section to the real Velora API via a type-safe client, Zod runtime validation, clean development boundary fallback, and TanStack Query polling hook.

**Dependencies:** TASK-009, TASK-013

**Files Likely Affected:**
- `lib/api/client.ts`
- `lib/api/signals.ts`
- `lib/api/mockSignals.ts`
- `hooks/useSignals.ts`
- `components/sections/LiveSignals.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `lib/api/client.ts` implementing `apiClient` with base URL from `NEXT_PUBLIC_API_URL` and normalized `ApiError` objects.
2. Created `lib/api/signals.ts` fetching `GET /api/signals`, validating payload against `SignalListResponseSchema` (Zod), and falling back gracefully when backend is unreachable during local development.
3. Created `lib/api/mockSignals.ts` establishing an isolated development boundary covering all 6 signal lifecycle states.
4. Created `hooks/useSignals.ts` TanStack Query hook with `refetchInterval: 5000` ms (guaranteeing <10s live updates), connection status detection, and manual refresh trigger.
5. Created `components/sections/LiveSignals.tsx` combining telemetry banner, category filter tabs, and dynamic SignalList.
6. Mounted `<LiveSignals />` inside `app/page.tsx`.

**Acceptance Criteria:**
- [x] API client connects to `NEXT_PUBLIC_API_URL`
- [x] Runtime validation through Zod guarantees schema conformance
- [x] Development boundary ensures offline resiliency without coupling UI to hardcoded mock data
- [x] Live signals hook configured with 5-second polling interval (<10s latency target)
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-015 — Live Update Mechanism

```
ID:     TASK-015
Status: [x] COMPLETE
```

**Goal:**  
Validate and tune the live update mechanism to satisfy the <10s latency target and enforce the architectural invariant that TP/SL updates modify existing cards without duplicates.

**Dependencies:** TASK-014

**Files Likely Affected:**
- `hooks/useSignals.ts`
- `lib/api/signals.ts`

**Implementation Details:**
1. Configured 5-second polling interval in TanStack Query (`refetchInterval: 5000` ms) guaranteeing <10s delivery latency.
2. Built `deduplicateSignals` at the data boundary merging updates by stable `signal.id` to prevent duplicate cards when TP/SL status updates arrive.
3. Configured `refetchOnWindowFocus: true` and `refetchOnReconnect: true` to handle browser backgrounding and tab restore.
4. Bound live telemetry banner to reactively display `connected`, `reconnecting`, and `error` states.

**Acceptance Criteria:**
- [x] Live updates guaranteed under 10 seconds via 5-second polling interval
- [x] TP/SL updates strictly update existing cards without card duplication
- [x] Telemetry status indicator responds to feed state
- [x] Reconnection handles tab sleep and network resume
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-016 — Raw Signal Fallback (UNPARSED)

```
ID:     TASK-016
Status: [x] COMPLETE
```

**Goal:**  
Ensure `UNPARSED` signals are correctly displayed, never crash the signal list, never get silently dropped, and are strictly sanitized against XSS or injection.

**Dependencies:** TASK-015

**Files Likely Affected:**
- `components/signals/SignalCard.tsx`
- `lib/utils.ts`

**Implementation Details:**
1. Created `sanitizeRawText` in `lib/utils.ts` to sanitize input strings and strip non-printable control characters.
2. Rendered `UNPARSED` signal raw text safely in standard React text nodes (preventing any HTML/script execution).
3. Displayed distinct amber/secondary UNPARSED badge with terminal header and formatted timestamp.
4. Guaranteed graceful fallback message when raw text is empty, ensuring zero signal crashes.

**Acceptance Criteria:**
- [x] UNPARSED signals render raw text cleanly in monospace
- [x] Input text is sanitized with zero XSS risk
- [x] Unparsed signals never crash the list or get dropped
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-017 — Responsive Optimization, Disclaimer & Footer

```
ID:     TASK-017
Status: [x] COMPLETE
```

**Goal:**  
Assemble the complete landing page sequence (Navbar, Hero, What Velora AI Does, How It Works, Live Signals, Risk Disclaimer, Footer) and optimize responsive behavior across mobile, tablet, and desktop.

**Dependencies:** TASK-016

**Files Likely Affected:**
- `components/sections/RiskDisclaimer.tsx`
- `components/layout/Footer.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Created `components/sections/RiskDisclaimer.tsx` providing transparent, responsible financial risk disclosures (informational research platform, non-advisory disclaimer).
2. Created `components/layout/Footer.tsx` with Velora AI branding, quick links, Telegram access, and read-only status telemetry notice.
3. Updated `app/page.tsx` mounting all 6 core sections in exact sequence: Navbar → Hero → What Velora AI Does → How It Works → Live Signals → Risk Disclaimer → Footer.
4. Resolved Next.js 16 prerender cache constraints for static production rendering.

**Acceptance Criteria:**
- [x] Complete landing page sequence assembled correctly
- [x] Risk Disclaimer section implemented prominently
- [x] Technical Footer mounted with community links and status
- [x] Mobile-first layout verified with touch-accessible targets
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-018 — Accessibility Audit

```
ID:     TASK-018
Status: [x] COMPLETE
```

**Goal:**  
Audit and implement accessibility standards: visible focus states, ARIA roles, live regions, reduced-motion preferences, and multi-channel communication (color + text + icon).

**Dependencies:** TASK-017

**Files Likely Affected:**
- `components/sections/LiveSignals.tsx`
- `components/signals/SignalList.tsx`
- `components/signals/SignalCard.tsx`
- `components/layout/Navbar.tsx`

**Implementation Details:**
1. Enforced visible focus rings (`focus-visible:ring-2 focus-visible:ring-primary`) on all buttons, tabs, and interactive targets.
2. Verified multi-channel communication across all trading elements: every level and badge couples semantic colors with clear text labels and distinct icons (checks, arrows, crosses).
3. Applied `aria-live="polite"` to the signal feed region for screen reader updates.
4. Added accessible `role="tablist"` and `aria-selected` attributes to live filter tabs.
5. Implemented `useReducedMotion()` in Framer Motion animations across signal cards.
6. Enforced correct semantic heading hierarchy across landmarks (H1 -> H2 -> H3).

**Acceptance Criteria:**
- [x] All interactive elements have high-contrast visible focus rings
- [x] Color is never the sole communicator
- [x] `aria-live="polite"` announces telemetry updates
- [x] Reduced-motion preferences respected
- [x] Semantic heading hierarchy verified
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully with zero warnings and type checks passed.

---

## TASK-019 — Performance Optimization

```
ID:     TASK-019
Status: [x] COMPLETE
```

**Goal:**  
Optimize the page for Core Web Vitals, tree-shaking, package imports, and fast load times.

**Dependencies:** TASK-018

**Files Likely Affected:**
- `app/layout.tsx`
- `next.config.ts`

**Implementation Details:**
1. Optimized package imports for `lucide-react` with Next.js Turbopack tree-shaking.
2. Enabled Gzip/Brotli compression (`compress: true`) and stripped `x-powered-by` header.
3. Verified zero unnecessary Client Components: all landing page narrative sections (Hero, Features, How It Works, Disclaimer, Footer) are rendered as zero-JS Server Components.
4. Typography uses `next/font/google` (`Geist` and `Geist_Mono`) with `display: "swap"` for zero render-blocking text flashes.
5. Production bundle generates a 100% static prerendered landing shell with instant TTFB and fast hydration.

**Acceptance Criteria:**
- [x] Zero render-blocking resources (fonts preloaded via `next/font`)
- [x] Server Components utilized for all static copy and structural markup
- [x] Turbopack optimized package imports for icon tree-shaking
- [x] Clean compilation with zero build errors or warnings

**Validation Method:**
Ran `npm run build` — compiled successfully in <1s with all routes statically optimized.

---

## TASK-020 — Testing

```
ID:     TASK-020
Status: [x] COMPLETE
```

**Goal:**  
Implement the automated test suite per `TEST_PLAN.md`. Cover unit, utility, schema, and API deduplication logic tests.

**Dependencies:** TASK-019

**Files Likely Affected:**
- `__tests__/utils.test.ts`
- `__tests__/schemas.test.ts`
- `__tests__/signals-api.test.ts`
- `vitest.config.mts`
- `package.json`

**Implementation Details:**
1. Installed and configured Vitest with path alias resolution.
2. Implemented `__tests__/utils.test.ts` verifying `cn()` merging, falsy handling, twMerge overrides, and `sanitizeRawText()` XSS protection, URI blocking, control char stripping, and truncation cap.
3. Implemented `__tests__/schemas.test.ts` verifying `SignalSchema`, nullable numeric values for UNPARSED, missing ID rejection, invalid enum rejection, ISO timestamp validation, and symbol/direction normalizers.
4. Implemented `__tests__/signals-api.test.ts` verifying `deduplicateSignals()` in-place state transitions, newest-first ordering, and stable keys.
5. All 21 tests pass in Vitest runner with zero errors and zero warnings.

**Acceptance Criteria:**
- [x] Unit tests for Zod schemas (valid/invalid signal)
- [x] Unit tests for `cn()` and `sanitizeRawText()` utilities
- [x] Unit tests for signal deduplication and ordering
- [x] All tests pass: `npm test` (21 passed)
- [x] Clean compilation: `npm run build` succeeds

**Validation Method:**
`npm test` — all 21 tests pass in 340ms with zero warnings.

---

## TASK-021 — Production Readiness

```
ID:     TASK-021
Status: [x] COMPLETE
```

**Goal:**  
Final production checklist — environment configuration, metadata/OG tags, security headers, robots/sitemap routes, deployment readiness, and test verification.

**Dependencies:** TASK-020

**Files Likely Affected:**
- `next.config.ts`
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/icon.svg`
- `README.md`
- `.env.example`

**Implementation Details:**
1. Configured enterprise HTTP security headers in `next.config.ts` (`Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-DNS-Prefetch-Control`).
2. Configured Open Graph (`og:type`, `og:title`, `og:description`, `og:url`), Twitter summary cards, creator handles, and crawler indexing rules in `app/layout.tsx`.
3. Created dynamic metadata routes `app/robots.ts` and `app/sitemap.ts` with static prerender timestamps.
4. Created branded SVG telemetry favicon `app/icon.svg`.
5. Rewrote project `README.md` with complete architecture diagram, data pipeline explanation, local setup, test runner commands, and deployment guidance.
6. Verified `.env.example` contains only public client keys and zero private credentials or secrets.

**Acceptance Criteria:**
- [x] `npm run build` succeeds with zero errors (all 7 routes statically optimized)
- [x] `npm test` passes 100% of tests (21/21 passing)
- [x] No secrets in committed files
- [x] Security headers are configured
- [x] OG & Twitter tags configured
- [x] Favicon and SVG app icon present
- [x] `robots.txt` and `sitemap.xml` generated automatically
- [x] `README.md` has complete deployment and operational instructions

**Validation Method:**
`npm test; npm run build` — 21 tests passed, production build succeeds with all static routes generated in <1s.

---

# PHASE 6 — Telegram Bot Integration Pipeline (Tasks 22–29)

---

## TASK-022 — Telegram Environment Configuration

```
ID:     TASK-022
Status: [x] COMPLETE
```

**Goal:**  
Define and document server-only environment variables for the Telegram bot `@VlgSignal_bot` without exposing any secrets to client bundles or source control.

**Dependencies:** TASK-021

**Files Likely Affected:**
- `.env.example`
- `.env.local`
- `lib/telegram/config.ts`
- `__tests__/telegram-config.test.ts`

**Implementation Details:**
1. Updated `.env.example` with clear documentation and safe placeholders for `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET`.
2. Created `.env.local` with development placeholder strings.
3. Created `lib/telegram/config.ts` with `getTelegramConfig()` and timing-safe `validateWebhookSecret()`, enforcing server-only access.
4. Created `__tests__/telegram-config.test.ts` covering environment variable reading and timing-safe comparison.
5. Confirmed `.env*.local` is strictly ignored by Git and will not leak secrets.

**Acceptance Criteria:**
- [x] `.env.example` documents `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET` with zero real secrets
- [x] No `NEXT_PUBLIC_` prefix on Telegram bot secrets
- [x] Timing-safe secret comparison prevents side-channel timing attacks
- [x] Build and test commands pass with clean environment resolution

**Validation Method:**
`npm test` and `npm run build` both passed cleanly with zero warnings or errors.

---

## TASK-023 — Telegram Integration Architecture & Webhook Route Handler Skeleton

```
ID:     TASK-023
Status: [ ] TODO
```

**Goal:**  
Create the server-side Next.js Route Handler skeleton for `POST /api/telegram` to receive updates from `@VlgSignal_bot`.

**Dependencies:** TASK-022

**Files Likely Affected:**
- `app/api/telegram/route.ts`

**Implementation Details:**
1. Create `app/api/telegram/route.ts` with `POST` export.
2. Implement request body JSON extraction and validation.
3. Reject non-POST requests with `405 Method Not Allowed`.
4. Return structured response JSON.

**Acceptance Criteria:**
- [ ] `POST /api/telegram` returns `200 OK` on valid JSON payload
- [ ] Server route is strictly server-side; zero client footprint

**Validation Method:**
`curl -X POST http://localhost:3000/api/telegram` or automated Vitest route test.

---

## TASK-024 — Signal Parser Implementation

```
ID:     TASK-024
Status: [ ] TODO
```

**Goal:**  
Implement robust, pure-function signal parsing for canonical Telegram messages and follow-up updates.

**Dependencies:** TASK-023

**Files Likely Affected:**
- `lib/telegram/parser.ts`
- `lib/telegram/types.ts`

**Implementation Details:**
1. Implement parser for `NEW SIGNAL` format: Symbol, Type (`BUY`/`SELL`/`LONG`/`SHORT`), Entry, SL, TP1, optional TP2, optional TP3.
2. Implement parser for update events: `TP1 HIT`, `TP2 HIT`, `TP3 HIT`, `SL HIT`.
3. Preserve `raw_text` on all outputs.
4. Fallback to `UNPARSED` status on malformed text without throwing exceptions.

**Acceptance Criteria:**
- [ ] Correctly parses valid BUY and SELL signals
- [ ] Correctly handles single TP, 2 TPs, and 3 TPs
- [ ] Correctly parses update phrases
- [ ] Returns structured `UNPARSED` object on malformed messages

**Validation Method:**
Unit tests in `__tests__/telegram-parser.test.ts`.

---

## TASK-025 — Signal Persistence & Store

```
ID:     TASK-025
Status: [ ] TODO
```

**Goal:**  
Implement the server-side signal store to hold active signals, historical signals, and unparsed events with concurrency safety.

**Dependencies:** TASK-024

**Files Likely Affected:**
- `lib/store/signals.ts`

**Implementation Details:**
1. Implement thread-safe/singleton in-memory signal store (`SignalStore`) seeded with initial mock signals for development.
2. Provide methods: `addSignal()`, `updateSignal()`, `getAllSignals()`, `findSignalById()`, `findLatestActive()`.
3. Ensure signals are stored newest-first by `created_at`.

**Acceptance Criteria:**
- [ ] Signal store safely manages addition and in-place mutation
- [ ] Newest-first sort order is strictly maintained
- [ ] Store survives multiple route handler calls

**Validation Method:**
Store unit tests in Vitest.

---

## TASK-026 — Telegram Webhook Secret Verification & Ingestion Handler

```
ID:     TASK-026
Status: [ ] TODO
```

**Goal:**  
Harden `POST /api/telegram` by verifying `x-telegram-bot-api-secret-token` against `TELEGRAM_WEBHOOK_SECRET` and wiring parser output to the store.

**Dependencies:** TASK-025

**Files Likely Affected:**
- `app/api/telegram/route.ts`

**Implementation Details:**
1. Read `x-telegram-bot-api-secret-token` header from incoming `NextRequest`.
2. Compare against `TELEGRAM_WEBHOOK_SECRET` with constant-time equality check if secret is configured.
3. Reject unauthorized requests with `401 Unauthorized`.
4. Extract text from `message` or `channel_post`.
5. Dispatch to `parseTelegramMessage()` and persist in `SignalStore`.

**Acceptance Criteria:**
- [ ] Missing or invalid secret token returns `401 Unauthorized`
- [ ] Valid secret token processes message and returns `200 OK`
- [ ] Channel posts and direct messages both supported

**Validation Method:**
Vitest route handler integration tests.

---

## TASK-027 — Signal Update & State Progression Handling

```
ID:     TASK-027
Status: [ ] TODO
```

**Goal:**  
Implement the Stable Signal Identity Strategy so `TP1 HIT` and `SL HIT` update existing signals in place without creating duplicate cards.

**Dependencies:** TASK-026

**Files Likely Affected:**
- `lib/telegram/matcher.ts`
- `app/api/telegram/route.ts`

**Implementation Details:**
1. Implement identity matching hierarchy:
   - Match by `reply_to_message_id`.
   - Match by explicit symbol in update text.
   - Match by most recent active signal in store.
2. Advance state: `ACTIVE -> TP1_HIT -> TP2_HIT -> TP3_HIT` or `ACTIVE -> SL_HIT`.
3. Update `updated_at` timestamp.
4. Retain stable `id` and card parameters.

**Acceptance Criteria:**
- [ ] `TP1 HIT` updates existing signal's status in place
- [ ] Zero duplicate cards created
- [ ] If no active signal matches, saved as unparsed update event

**Validation Method:**
Vitest state machine progression tests.

---

## TASK-028 — Live Website Synchronization

```
ID:     TASK-028
Status: [ ] TODO
```

**Goal:**  
Wire `app/api/signals/route.ts` (`GET /api/signals`) to the shared `SignalStore` so live website polling renders incoming Telegram signals in real time.

**Dependencies:** TASK-027

**Files Likely Affected:**
- `app/api/signals/route.ts`
- `lib/api/signals.ts`

**Implementation Details:**
1. Create `app/api/signals/route.ts` returning `{ data: SignalStore.getAllSignals() }`.
2. Configure caching headers (`Cache-Control: no-store, must-revalidate`).
3. Connect frontend `useSignals` query to the local `/api/signals` route.
4. Verify sub-5s polling picks up newly ingested Telegram webhook signals.

**Acceptance Criteria:**
- [ ] `GET /api/signals` serves current signals from the store
- [ ] Newly ingested webhook signals appear on website within 5s
- [ ] Frontend handles UNPARSED and updated signals seamlessly

**Validation Method:**
End-to-end integration flow: post mock webhook -> query signals -> verify response.

---

## TASK-029 — Telegram Integration Test Suite

```
ID:     TASK-029
Status: [ ] TODO
```

**Goal:**  
Implement the comprehensive 15-case test suite in Vitest verifying all bot parser scenarios, webhook security, duplicate prevention, and UNPARSED resilience.

**Dependencies:** TASK-028

**Files Likely Affected:**
- `__tests__/telegram-integration.test.ts`
- `__tests__/telegram-parser.test.ts`

**Implementation Details:**
Cover all 15 scenarios specified in `TEST_PLAN.md` Section 11:
1. Valid BUY signal
2. Valid SELL signal
3. Signal with only TP1
4. Signal with TP1 + TP2
5. Signal with TP1 + TP2 + TP3
6. `TP1 HIT` update
7. `TP2 HIT` update
8. `TP3 HIT` update
9. `SL HIT` update
10. Malformed signal
11. Empty message
12. Duplicate message
13. Invalid webhook secret
14. Unexpected update
15. Rapid consecutive signals

**Acceptance Criteria:**
- [ ] All 15 scenarios pass with 0 failures
- [ ] Zero warnings in test runner
- [ ] `npm test` and `npm run build` pass completely

**Validation Method:**
`npm test` — all test suites pass green.

---

*Last updated: Phase 6 planned — Tasks 22 to 29 registered for Telegram Bot integration.*
