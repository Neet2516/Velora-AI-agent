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
Status: [ ] TODO
```

**Goal:**  
Build the Hero section — the first impression of the product. Bold headline, subheadline, CTA, and visual element.

**Dependencies:** TASK-002, TASK-003, TASK-004

**Files Likely Affected:**
- `components/sections/Hero.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Full viewport height on desktop (`min-h-screen`), auto on mobile
2. Centered content (both axes on desktop, top-aligned on mobile)
3. Headline: display-size, bold, white — communicates core value proposition
4. Subheadline: muted-foreground, body size
5. CTA: Primary button + secondary "View Signals" anchor link
6. Visual: Subtle background treatment (noise texture or dot grid — no heavy gradients)
7. Subtle animated gradient orb or glow in background (very subtle, behind content)
8. Server Component (no client hooks needed)

> **UNSPECIFIED**: Exact headline and subheadline copy. Use high-quality placeholder copy that represents the product accurately until confirmed.

**Acceptance Criteria:**
- [ ] Hero renders full-height on desktop
- [ ] Headline is legible and prominent
- [ ] CTA button works and is correctly styled
- [ ] Background is subtle, not distracting
- [ ] Mobile layout looks correct at 375px
- [ ] No hydration errors

**Validation Method:**
Visual inspection on mobile and desktop viewports.

---

## TASK-007 — "What Velora AI Does" Section

```
ID:     TASK-007
Status: [ ] TODO
```

**Goal:**  
Build the features/value proposition section explaining what the product does.

**Dependencies:** TASK-002, TASK-003

**Files Likely Affected:**
- `components/sections/WhatVeloraAIDoes.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Section title: "What Velora AI Does" (or approved copy)
2. 3–4 feature cards (icon + title + short description)
3. Feature ideas (placeholder until copy confirmed): AI-powered signals, Real-time delivery, Transparent tracking, Beta access
4. Use `lucide-react` icons
5. Card grid: 1 col mobile, 2 col tablet, 3–4 col desktop
6. Server Component

> **UNSPECIFIED**: Exact feature copy and final icon choices require product approval.

**Acceptance Criteria:**
- [ ] Section renders with 3–4 feature cards
- [ ] Icons are appropriate and visible
- [ ] Grid is responsive across breakpoints
- [ ] Typography matches design system

**Validation Method:**
Visual inspection across breakpoints.

---

## TASK-008 — "How It Works" Section

```
ID:     TASK-008
Status: [ ] TODO
```

**Goal:**  
Build the step-by-step "How It Works" section illustrating the Telegram → signal → website flow.

**Dependencies:** TASK-002, TASK-003

**Files Likely Affected:**
- `components/sections/HowItWorks.tsx`
- `app/page.tsx`

**Implementation Details:**
1. Numbered steps showing the signal pipeline
2. Steps: Signal Generated → AI Processes → Delivered to Website → You Act
3. Connector lines or arrows between steps (decorative)
4. Mobile: vertical stack; Desktop: horizontal flow
5. Server Component

> **UNSPECIFIED**: Exact step copy requires product approval.

**Acceptance Criteria:**
- [ ] All pipeline steps are represented
- [ ] Layout works on mobile (vertical) and desktop (horizontal)
- [ ] Step connectors are visible and clear

**Validation Method:**
Visual inspection.

---

## TASK-009 — Signal Data Model & Zod Schema

```
ID:     TASK-009
Status: [ ] TODO
```

**Goal:**  
Define the TypeScript types and Zod validation schemas for the Signal data model. This is the foundational contract that all signal-related code depends on.

**Dependencies:** TASK-001

**Files Likely Affected:**
- `lib/schemas/signal.ts`
- `lib/types/signal.ts`

**Implementation Details:**
1. Install `zod`
2. Define `SignalStatusSchema` enum: `ACTIVE | TP1_HIT | TP2_HIT | TP3_HIT | SL_HIT | UNPARSED`
3. Define `SignalDirectionSchema` enum: `LONG | SHORT`
4. Define `SignalSchema` with all fields per `PROJECT_CONTEXT.md`
5. Export `Signal` type derived from `z.infer<typeof SignalSchema>`
6. Define `SignalListResponseSchema` (array wrapper with optional pagination metadata)
7. Write inline comments explaining each field
8. Handle nullable/optional fields correctly (`tp2`, `tp3`, `confidence`, `raw_text`)

**Acceptance Criteria:**
- [ ] `SignalSchema` covers all fields from `PROJECT_CONTEXT.md`
- [ ] Status and direction are typed as enums, not plain strings
- [ ] Nullable fields are correctly typed
- [ ] `Signal` TypeScript type is exported and usable
- [ ] `SignalListResponseSchema` validates an array of signals
- [ ] Zod parse throws on missing required fields
- [ ] Zod parse accepts valid signal objects

**Validation Method:**
Write a quick inline test with mock data — parse a valid and invalid object, confirm behavior.

---

## TASK-010 — SignalCard Component

```
ID:     TASK-010
Status: [ ] TODO
```

**Goal:**  
Build the `SignalCard` component — the core UI unit for displaying a single trading signal.

**Dependencies:** TASK-002, TASK-003, TASK-004, TASK-009

**Files Likely Affected:**
- `components/signals/SignalCard.tsx`
- `components/signals/SignalBadge.tsx`

**Implementation Details:**
1. Accepts a `Signal` prop (typed from `lib/types/signal.ts`)
2. Displays: asset, direction badge, status badge, entry, TP1/2/3, SL, timestamp
3. Direction badge: LONG = green, SHORT = red
4. Status badge: per `DESIGN_SYSTEM.md` signal color semantics
5. Hit targets visually distinguished (subtle background highlight, checkmark icon)
6. Active signal: pulsing dot indicator
7. Timestamps: relative format ("2h ago") using `date-fns` or `Intl.RelativeTimeFormat`
8. `UNPARSED` state: show `raw_text` in monospace fallback block instead of structured fields
9. Framer Motion entrance animation: slide up + fade in
10. Client Component (`"use client"`)

**Acceptance Criteria:**
- [ ] Renders correctly for all 6 signal states
- [ ] LONG direction is green, SHORT is red
- [ ] Hit targets are visually marked
- [ ] UNPARSED state shows raw text fallback, not empty card
- [ ] Active state shows pulsing indicator
- [ ] Timestamp is human-readable and relative
- [ ] Entrance animation plays on mount
- [ ] Respects `prefers-reduced-motion`
- [ ] No TypeScript errors

**Validation Method:**
Render the card with mock data for each of the 6 states and visually inspect each.

---

## TASK-011 — Signal State Rendering & Transitions

```
ID:     TASK-011
Status: [ ] TODO
```

**Goal:**  
Ensure SignalCard correctly handles in-place state transitions when a signal's status changes (TP hit, SL hit) without remounting the card.

**Dependencies:** TASK-010

**Files Likely Affected:**
- `components/signals/SignalCard.tsx`
- `components/signals/SignalList.tsx` (key prop management)

**Implementation Details:**
1. Signal cards must be keyed by `signal.id` — never by array index
2. When status changes, the existing card updates in place (React reconciliation handles this automatically if keys are stable)
3. Add a subtle flash animation on the updated field when status changes (use `useEffect` + Framer Motion `animate` prop)
4. Test the transition: ACTIVE → TP1_HIT → TP2_HIT and ACTIVE → SL_HIT
5. Confirm no duplicate cards appear when a status update arrives

**Acceptance Criteria:**
- [ ] Status change does NOT cause card remount (verify with React DevTools)
- [ ] Updated fields animate subtly on change
- [ ] No duplicate cards created by status updates
- [ ] `key` prop uses `signal.id` throughout signal list

**Validation Method:**
Simulate a status change in mock data — confirm React DevTools shows component update, not unmount/remount.

---

## TASK-012 — SignalList Component

```
ID:     TASK-012
Status: [ ] TODO
```

**Goal:**  
Build the `SignalList` component that renders the collection of signal cards in newest-first order.

**Dependencies:** TASK-010, TASK-011

**Files Likely Affected:**
- `components/signals/SignalList.tsx`
- `components/signals/SignalCardSkeleton.tsx`

**Implementation Details:**
1. Accepts `signals: Signal[]` prop
2. Sorts signals by `created_at` descending (newest first)
3. Renders `<SignalCard>` for each signal, keyed by `signal.id`
4. Renders `<SignalCardSkeleton>` when loading (2–3 skeleton placeholders)
5. Responsive grid: 1 col mobile, 2 col tablet/desktop
6. New signals animate in from top using `AnimatePresence` (Framer Motion)
7. Client Component

**Acceptance Criteria:**
- [ ] Signals appear newest-first
- [ ] Each card has stable `key={signal.id}`
- [ ] Skeleton renders during loading state
- [ ] New signal slides in from top without disrupting existing cards
- [ ] Grid is responsive

**Validation Method:**
Test with mock data array, confirm ordering. Simulate adding a new signal to the array and confirm it slides in at the top.

---

## TASK-013 — Loading / Empty / Error States

```
ID:     TASK-013
Status: [ ] TODO
```

**Goal:**  
Build all fallback states for the Live Signals section: loading skeleton, empty state, and API error state.

**Dependencies:** TASK-012

**Files Likely Affected:**
- `components/signals/SignalCardSkeleton.tsx`
- `components/signals/SignalListEmpty.tsx`
- `components/signals/SignalListError.tsx`
- `components/sections/LiveSignals.tsx`

**Implementation Details:**
1. **Skeleton:** Animated shimmer card matching SignalCard dimensions
2. **Empty state:** Friendly message "No signals yet. Stay tuned." with icon
3. **Error state:** Error message with retry button (calls `refetch()`)
4. Error state must NOT show a blank screen
5. All states must be visually consistent with the design system

**Acceptance Criteria:**
- [ ] Skeleton animation matches shimmer pattern from `DESIGN_SYSTEM.md`
- [ ] Empty state has an icon, message, and clear visual treatment
- [ ] Error state has a message and a working retry button
- [ ] No blank screen under any data condition

**Validation Method:**
Force each state by mocking the API response (null, error, empty array) and visually inspect.

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
