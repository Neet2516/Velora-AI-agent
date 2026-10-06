# Velora AI — Live Signal Dashboard (Beta)

Velora AI is a modern, high-performance web dashboard displaying real-time cryptocurrency and market trading signals dispatched from our Telegram and algorithmic backend pipeline.

The web application is strictly **read-only for visitors**, providing near real-time telemetry, live status updates (Take Profit / Stop Loss hit tracking), and direct links to the official Velora Telegram channel.

---

## Architecture Overview

```
Telegram Channel
       ↓
Backend Processing / Parser Pipeline
       ↓
Database & API Endpoint (`/api/signals`)
       ↓
Velora AI Web Dashboard (Next.js 16 + TanStack Query)
```

1. **Source Event:** Algorithmic signal dispatched to Telegram channel.
2. **Ingestion & Parsing:** Backend parser ingests raw text and normalizes structured levels (Asset, Direction, Entry, TP1/2/3, SL).
3. **Live Web Stream:** Next.js client polls the API with 5s intervals (target latency <10s) and deduplicates signals by stable ID in-place.

---

## Features & Tech Stack

- **Framework:** Next.js 16 (App Router with React Server Components)
- **Styling:** Tailwind CSS v4 with dark-first design tokens (`#09090b` canvas, `#121215` card)
- **Data Fetching:** `@tanstack/react-query` with automatic window-refocus revalidation and retry backoff
- **Animations:** `framer-motion` layout animations with automatic `prefers-reduced-motion` detection
- **Validation & Safety:** Runtime Zod schemas (`SignalSchema`, `SignalListResponseSchema`) and defense-in-depth HTML sanitization
- **Icons:** `lucide-react` with Turbopack import tree-shaking
- **Testing:** `vitest` unit test suite

---

## Quick Start

### 1. Prerequisites
- Node.js 20+ (tested on Node.js 24)
- npm 10+

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_ENV=development
```

> **Note:** If the backend API is unreachable during local development, the client automatically displays the development fixtures to ensure seamless offline design and UX inspection.

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Compiles production build with Turbopack and TypeScript verification |
| `npm run start` | Runs the compiled production server |
| `npm test` | Runs the full Vitest automated test suite |
| `npm run lint` | Runs ESLint syntax and code-style validation |

---

## Production Deployment

### Recommended: Vercel
1. Push repository to GitHub/GitLab.
2. Import project into [Vercel](https://vercel.com).
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` (e.g. `https://api.velora.ai`)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://velora.ai`)
   - `NEXT_PUBLIC_APP_ENV=production`
4. Deploy.

### Self-Hosted (Node / Docker)
```bash
npm run build
npm run start
```
Default port is `3000`. Set `PORT` environment variable to configure a custom port.

---

## Regulatory & Risk Disclaimer

*Trading cryptocurrencies and financial instruments involves substantial risk and may lead to the loss of invested capital. Velora AI provides algorithmic informational signals for research and educational purposes only. Content does not constitute financial, investment, or legal advice.*
