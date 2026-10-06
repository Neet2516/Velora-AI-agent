# ARCHITECTURE.md — Velora AI Website Technical Architecture

## Status Legend

- **DECIDED** — Firm decision. Do not revisit without new evidence.
- **RECOMMENDED** — Strong preference based on requirements. Can be overridden with justification.
- **UNSPECIFIED** — Not yet determined. Must be resolved before implementation begins.

---

## Core Framework

**DECIDED: Next.js (App Router)**

- Version: Latest stable (Next.js 14+)
- Router: App Router (`app/` directory)
- Rendering: Hybrid — Server Components by default, Client Components where interactivity is required
- Language: TypeScript (strict mode)

**Reason:** Next.js App Router provides the ideal blend of SSR for the landing page (SEO, initial load performance) and client-side reactivity for the live signals section.

---

## Language

**DECIDED: TypeScript**

- Strict mode enabled (`"strict": true` in `tsconfig.json`)
- No `any` types in production code without documented justification
- All signal data must be validated at runtime using Zod before use in components

---

## Styling

**DECIDED: Tailwind CSS**

- Version: Tailwind CSS v3 (v4 is available but ecosystem compatibility is uncertain for shadcn/ui)
- Custom tokens defined in `tailwind.config.ts` using the design system color palette
- No inline styles unless absolutely necessary
- `cn()` utility (clsx + tailwind-merge) for conditional class composition

---

## UI Component Library

**RECOMMENDED: shadcn/ui**

- Component primitives built on Radix UI
- Fully customizable, no runtime CSS-in-JS overhead
- Integrates with Tailwind CSS design tokens
- Components copied into the codebase (not a package dependency), allowing full control
- Accessibility built in via Radix UI primitives

---

## Animation

**RECOMMENDED: Framer Motion**

- Used for signal card entrance animations, state transition animations
- Used sparingly — no gratuitous animation
- Respect `prefers-reduced-motion`
- Keep animations under 300ms for UI feedback; entrance animations up to 500ms

---

## Data Fetching

**RECOMMENDED: TanStack Query (React Query)**

- Manages server state for signals API
- Handles caching, background refetching, loading/error states
- Polling interval configurable (default: 5–10 second refetch for live updates)
- `staleTime` and `gcTime` tuned to signal data characteristics

---

## Runtime Validation

**DECIDED: Zod**

- All API responses validated against Zod schemas before entering the component tree
- Signal schema strictly typed
- Malformed responses caught at the API layer, not silently swallowed

---

## State Management

**RECOMMENDED: React built-in state + TanStack Query**

- No Zustand or Redux unless a clear cross-component shared state problem emerges
- TanStack Query manages all server state (signals data)
- `useState` / `useReducer` / `useContext` for local UI state (filter, sort, view mode)
- Signals list state is owned by TanStack Query — the signal list is the query cache

**Reason:** The application is read-only and data flows in one direction (API → UI). Global state management libraries are unnecessary complexity at this scale.

---

## Live Update Architecture

**UNSPECIFIED: WebSocket vs SSE vs Polling**

This is the most critical architectural decision for the signals section. Three options:

| Option | Pros | Cons |
|---|---|---|
| **Polling (TanStack Query)** | Simple, works everywhere, no server config | Not true real-time; adds unnecessary requests |
| **Server-Sent Events (SSE)** | Native browser support, one-way push, HTTP-compatible | Requires SSE endpoint on backend |
| **WebSocket** | True bidirectional real-time | More complex; overhead for read-only display |

**Recommended default:** Start with **polling via TanStack Query** at a 5-second interval. This satisfies the <10s latency requirement with minimal complexity. Upgrade to SSE once the backend supports it.

> **UNSPECIFIED**: Backend team must confirm which protocol the Velora API supports. This decision must be finalized before TASK-015.

---

## API Layer Architecture

```
app/
└── lib/
    ├── api/
    │   ├── signals.ts        ← Signal API fetch functions
    │   └── client.ts         ← Base API client (base URL, headers, error handling)
    ├── schemas/
    │   └── signal.ts         ← Zod schemas for Signal validation
    └── types/
        └── signal.ts         ← TypeScript types derived from Zod schemas
```

- API base URL from environment variable: `NEXT_PUBLIC_API_URL`
- All API calls go through `client.ts` — never raw `fetch` in components
- Errors are normalized into typed error objects before reaching the UI

---

## Component Architecture

```
app/
├── layout.tsx              ← Root layout (fonts, metadata, providers)
├── page.tsx                ← Home page (composes all sections)
├── providers.tsx           ← Client-side providers (TanStack Query, etc.)
│
components/
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── WhatVeloraAIDoes.tsx
│   ├── HowItWorks.tsx
│   └── LiveSignals.tsx
├── signals/
│   ├── SignalCard.tsx
│   ├── SignalBadge.tsx
│   ├── SignalCardSkeleton.tsx
│   └── SignalList.tsx
└── ui/
    └── (shadcn/ui components)
```

---

## Server Components vs Client Components

| Component | Rendering | Reason |
|---|---|---|
| `layout.tsx` | Server | Static shell, SEO metadata |
| `page.tsx` | Server | Composes static sections + dynamic island |
| `Navbar.tsx` | Server | Static content |
| `Footer.tsx` | Server | Static content |
| `Hero.tsx` | Server | Static marketing content |
| `WhatVeloraAIDoes.tsx` | Server | Static content |
| `HowItWorks.tsx` | Server | Static content |
| `LiveSignals.tsx` | **Client** | Uses TanStack Query, hooks, live updates |
| `SignalList.tsx` | **Client** | Renders dynamic signal list |
| `SignalCard.tsx` | **Client** | Animated, stateful |
| `providers.tsx` | **Client** | QueryClientProvider requires client |

**Rule:** Default to Server Components. Only mark a component `"use client"` when it requires:
- Browser APIs (window, localStorage)
- React hooks (useState, useEffect, useQuery)
- Event handlers
- Third-party client libraries (Framer Motion animations)

---

## Frontend / Backend Boundaries

```
FRONTEND (this repository)
├── Next.js website
├── Static landing page sections
├── Live signals display
└── Calls: NEXT_PUBLIC_API_URL

## Telegram Ingestion Pipeline & Webhook Architecture (Case B)

```
Telegram Infrastructure (@VlgSignal_bot / Channel)
               │
               ▼
   [HTTPS POST /api/telegram]
               │
               ▼
 Next.js Server Route Handler (`app/api/telegram/route.ts`)
 ├── 1. Validate header: `x-telegram-bot-api-secret-token` == TELEGRAM_WEBHOOK_SECRET
 ├── 2. Extract Telegram update (message or channel_post)
 ├── 3. Signal Parser (`lib/telegram/parser.ts`)
 │      ├── Match canonical syntax ("NEW SIGNAL\nSymbol: XAUUSD...")
 │      ├── Match update triggers ("TP1 HIT", "SL HIT")
 │      └── Fallback: Record UNPARSED with raw_text
 ├── 4. Signal Store / Persistence (`lib/store/signals.ts`)
 │      ├── Mutate existing signals in-place on TP/SL hits
 │      └── Insert new signals or UNPARSED items
 └── 5. Acknowledge Telegram with HTTP 200 `{ ok: true }`
               │
               ▼
 Internal Store / Database
               │
               ▼
 Next.js API Route (`app/api/signals/route.ts` / GET endpoint)
               │
               ▼
 Web Client Dashboard (`hooks/useSignals.ts`)
```

**Critical Security Rules:**
- The Telegram bot token (`TELEGRAM_BOT_TOKEN`) is strictly server-side and must never be exposed.
- Never prefix bot tokens or webhook secrets with `NEXT_PUBLIC_`.
- The frontend client bundle is a **display layer only**.
- Webhook endpoint validates the shared secret token on every request.

---

## Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Client + Server | Base URL for the Velora API (e.g. `http://localhost:3000` or production URL) |
| `NEXT_PUBLIC_APP_ENV` | Client + Server | `development`, `staging`, `production` |
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Canonical URL for metadata / SEO |
| `TELEGRAM_BOT_TOKEN` | **Server-Only** | Dedicated Bot token for `@VlgSignal_bot` (API requests / webhook management) |
| `TELEGRAM_WEBHOOK_SECRET` | **Server-Only** | Webhook verification secret checked against `x-telegram-bot-api-secret-token` |
| `DATABASE_URL` | **Server-Only** | Database connection string (optional in mock/in-memory mode) |

---

## Directory Structure (Target)

```
velora-bot-website/
├── agent/                    ← Development management (NOT source code)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── layout/
│   ├── sections/
│   ├── signals/
│   └── ui/
├── lib/
│   ├── api/
│   ├── schemas/
│   ├── types/
│   └── utils.ts
├── public/
│   └── (static assets)
├── .env.local                ← Local env (git-ignored)
├── .env.example              ← Example env (committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Performance Targets

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Signal update latency | < 10s |
| Bundle size (initial JS) | < 200KB (gzipped) |
| Mobile performance (Lighthouse) | > 80 |

---

*Last updated: Initial planning phase — pre-TASK-001.*
