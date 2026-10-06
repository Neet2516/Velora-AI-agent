# DECISIONS.md — Architecture Decision Records

## Format

```
Decision:   Short imperative statement of what was decided
Context:    Why this decision needed to be made
Options:    What alternatives were considered
Chosen:     The option selected
Reason:     Why this option was chosen
Trade-offs: What was accepted by making this choice
Date:       YYYY-MM-DD
Status:     DECIDED | SUPERSEDED | UNDER REVIEW
```

---

## ADR-001: Framework Selection — Next.js App Router

```
Decision:   Use Next.js 14+ with App Router as the primary framework
Context:    A modern React framework is needed. The site has a static landing page
            (benefits from SSR/SSG) and a dynamic live signals section (benefits
            from client-side reactivity). A hybrid rendering model is ideal.
Options:
  A. Next.js with App Router (hybrid SSR + client)
  B. Vite + React (pure client-side SPA)
  C. Remix (server-first, similar to Next.js)
  D. Astro (static-first, islands architecture)
Chosen:     A — Next.js with App Router
Reason:     Best fit for hybrid rendering. Static landing sections are Server
            Components (SEO, performance). Live Signals is a Client Component
            (interactivity). Wide ecosystem, shadcn/ui targets Next.js. Strong
            TypeScript support. Vercel deployment is trivial.
Trade-offs: App Router has steeper learning curve than Pages Router.
            Bundle size is larger than pure Astro. Overkill if site never adds
            dynamic server-rendered pages.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-002: Styling — Tailwind CSS

```
Decision:   Use Tailwind CSS v3 for all styling
Context:    A utility-first CSS approach is needed that integrates well with
            shadcn/ui and supports custom design tokens.
Options:
  A. Tailwind CSS v3
  B. Tailwind CSS v4 (alpha/beta)
  C. CSS Modules
  D. Styled Components / Emotion
  E. Vanilla CSS
Chosen:     A — Tailwind CSS v3
Reason:     shadcn/ui is built for Tailwind v3. v4 has breaking changes and
            the shadcn/ui ecosystem compatibility is uncertain. Utility-first
            approach minimizes CSS file growth. Design tokens map cleanly to
            Tailwind extend config. The cn() utility with tailwind-merge handles
            conditional class composition elegantly.
Trade-offs: Class verbosity in JSX. v3 is not the latest version of Tailwind.
            Cannot use Tailwind v4 features.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-003: UI Components — shadcn/ui

```
Decision:   Use shadcn/ui for accessible UI component primitives
Context:    Need accessible, customizable components (Badge, Button, Card,
            Skeleton, Tooltip) that integrate with our design tokens.
Options:
  A. shadcn/ui (copy-in, Radix UI based)
  B. Radix UI directly (no pre-styled primitives)
  C. Headless UI
  D. Build from scratch
  E. Chakra UI / MUI (opinionated design systems)
Chosen:     A — shadcn/ui
Reason:     Components are copied into the codebase (full control). Built on
            Radix UI (accessibility first). Works with our Tailwind design
            tokens. No runtime CSS-in-JS overhead. Large ecosystem, well
            documented. Avoids the opinionated styling of Chakra/MUI.
Trade-offs: Components must be individually installed. Upgrading means
            re-installing. Larger initial setup than a drop-in library.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-004: Server State — TanStack Query

```
Decision:   Use TanStack Query (React Query) for signals API data fetching
Context:    The signals section needs data fetching with caching, background
            refetching, loading/error states, and polling capability.
Options:
  A. TanStack Query with polling (refetchInterval)
  B. SWR (similar, Vercel's library)
  C. Raw useEffect + fetch
  D. Next.js Server Actions / Route Handlers with streaming
Chosen:     A — TanStack Query
Reason:     Best-in-class server state management. Built-in polling, caching,
            background refetch, stale-while-revalidate. Better DevTools than
            SWR. More powerful than raw useEffect. The query cache serves as
            the signals state — no separate state manager needed.
Trade-offs: Adds ~13KB to bundle. Configuration required for optimal cache
            settings. Overkill for a single query — but future-proof if more
            API endpoints are added.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-005: Live Update Strategy — Polling (Initial)

```
Decision:   Implement live updates via TanStack Query polling (refetchInterval: 5s)
            as the initial strategy. Upgrade to SSE when backend supports it.
Context:    Signals must appear within 10 seconds. The backend's real-time
            capability (SSE or WebSocket) is UNSPECIFIED. An implementation
            decision is needed to start building.
Options:
  A. Polling via TanStack Query (refetchInterval)
  B. Server-Sent Events (SSE) via EventSource
  C. WebSocket via native API or socket.io
  D. Next.js Route Handler with streaming
Chosen:     A — Polling initially, with clear upgrade path to B (SSE)
Reason:     Polling satisfies the <10s requirement with 5s interval. Requires
            zero backend changes beyond the existing REST endpoint. Zero
            complexity. The upgrade to SSE is well-defined and isolated to
            the useSignals hook. WebSocket adds bidirectional complexity that
            is unnecessary for a read-only display.
Trade-offs: Polling creates unnecessary requests when no new signals exist.
            Not true real-time (up to 5s delay). Network overhead.
            Upgrade to SSE will require backend work.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-006: Client State — No Global State Manager

```
Decision:   Do not install Zustand, Redux, or any global state library
Context:    The application is read-only. Data flows one direction: API → UI.
            The question is whether a global state manager is needed.
Options:
  A. No global state manager (React built-ins + TanStack Query)
  B. Zustand (lightweight)
  C. Redux Toolkit
  D. Jotai / Recoil
Chosen:     A — No global state manager
Reason:     TanStack Query owns server state (signals). React useState/useContext
            handles all UI state (filters, view modes). There is no cross-component
            shared client state that would require a global store. Adding Zustand
            would be premature abstraction. Revisit if requirements grow.
Trade-offs: If requirements evolve to need complex cross-component state,
            adding Zustand later requires migration. Acceptable risk given
            current Beta scope.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-007: Runtime Validation — Zod

```
Decision:   Use Zod for all API response validation
Context:    API responses from the Velora backend must be validated before
            use in the UI. TypeScript types are compile-time only — runtime
            validation is needed to catch backend changes and malformed data.
Options:
  A. Zod
  B. Yup
  C. io-ts
  D. Manual type guards
  E. No runtime validation
Chosen:     A — Zod
Reason:     Best TypeScript integration (infer types from schema). Simple API.
            Excellent error messages. Widely used, well maintained. Works
            with shadcn/ui form patterns if forms are ever added. Eliminates
            the risk of silently displaying malformed signal data.
Trade-offs: Small bundle size (~8KB). Schema must be kept in sync with
            actual API — but this is a feature, not a bug.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-008: Animation — Framer Motion

```
Decision:   Use Framer Motion for signal card animations and state transitions
Context:    Signal cards need entrance animations and in-place state change
            animations. CSS transitions alone are insufficient for complex
            list animations (AnimatePresence for enter/exit).
Options:
  A. Framer Motion
  B. CSS transitions + keyframes only
  C. React Spring
  D. GSAP
Chosen:     A — Framer Motion
Reason:     AnimatePresence enables enter/exit animations for signal list items
            without complex manual DOM manipulation. Excellent React integration.
            Layout animations are trivial. Respects prefers-reduced-motion.
            Most popular animation library in the React ecosystem.
Trade-offs: ~40KB added to bundle. Must be used only in Client Components.
            Requires discipline to avoid over-animating (addressed in rules).
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-009: Rendering Strategy — Server Components by Default

```
Decision:   All components are Server Components by default; only mark
            'use client' when strictly necessary
Context:    Next.js App Router allows granular control over rendering.
            The landing page sections are static. Only the signals section
            requires client-side interactivity.
Options:
  A. Server Components by default, client only where needed
  B. All Client Components ("use client" everywhere)
  C. All Server Components with no interactivity
Chosen:     A
Reason:     Server Components reduce client bundle size (no JS shipped for
            static sections). Better SEO and initial load performance.
            Only Navbar (if sticky scroll needed), LiveSignals, SignalList,
            and SignalCard need to be client components.
Trade-offs: Requires careful thinking about the server/client boundary.
            Third-party libraries must be used in client components.
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-010: Signal Card Key Strategy — Stable ID-based Keys

```
Decision:   Signal cards are always keyed by signal.id, never by array index
Context:    The signals list updates frequently. React must be able to reconcile
            list updates without remounting cards. Array index keys cause
            incorrect reconciliation and potential duplicate card bugs.
Options:
  A. key={signal.id}
  B. key={index} (array index)
  C. key={signal.asset + signal.created_at}
Chosen:     A — key={signal.id}
Reason:     Stable, unique, and semantically correct. Guarantees React can
            match existing DOM nodes to updated data. Prevents the critical
            bug of status updates creating duplicate cards. The signal.id must
            be guaranteed unique by the backend.
Trade-offs: Requires backend to provide stable, unique IDs per signal.
            (This is a standard requirement — no real trade-off.)
Date:       2026-10-06
Status:     DECIDED
```

---

## ADR-011: Telegram Integration Architecture — CASE B (Telegram Webhook Ingestion)

```
Decision:   Adopt CASE B (Telegram Webhook Ingestion Pipeline) with support for external/channel dispatch.
Context:    Velora AI has created a dedicated Telegram bot (@VlgSignal_bot). We must determine
            whether the bot is a direct signal-producer dispatching outward (Case A) or a webhook listener
            receiving messages from a Telegram channel/group and parsing them into signals (Case B).
Options:
  A. CASE A: Signal Generator directly produces canonical signals, writing simultaneously to database
     and broadcasting outward to Telegram.
  B. CASE B: Telegram is the transmission medium where signals and updates are posted; the Telegram bot
     receives channel posts/messages via server-side webhook, parses raw text, and writes to the database.
Chosen:     B — CASE B (Telegram Webhook Ingestion & Parser Pipeline)
Reason:     The entire existing repository architecture is specifically built around Case B:
            1. PROJECT_CONTEXT.md explicitly diagrams: Telegram Message -> Backend Receiver -> Database -> API.
            2. The product requirements mandate an UNPARSED state with raw_text preservation when a Telegram
               message fails parsing, which only occurs if human/bot text is received from Telegram.
            3. The user specification defines canonical message syntax ("NEW SIGNAL\nSymbol: XAUUSD..."),
               update triggers ("TP1 HIT", "SL HIT"), and a webhook endpoint (POST /api/telegram).
            4. If Velora's internal signal engine produces signals, it publishes them to the Telegram channel,
               where @VlgSignal_bot ingests them via webhook for the website, ensuring Telegram remains the
               public source of truth for channel subscribers while the web mirrors it in near real time.
Security:   1. TELEGRAM_BOT_TOKEN must ONLY exist as a server-side environment variable.
            2. Webhook endpoint POST /api/telegram validates secret via TELEGRAM_WEBHOOK_SECRET.
            3. Neither token nor secret shall ever be exposed to the browser, NEXT_PUBLIC_*, logs, or Git.
Date:       2026-10-06
Status:     DECIDED
```

---

*Last updated: Post-TASK-021 — Telegram bot @VlgSignal_bot integrated into execution architecture.*

