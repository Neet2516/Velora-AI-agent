# PROJECT_CONTEXT.md — Velora AI Website

## Product Overview

**Product Name:** Velora AI  
**Product Type:** Beta website — public-facing, read-only  
**Current Status:** Beta (pre-launch / early access phase)  
**Audience:** Prospective users, crypto/trading signal consumers  

---

## Product Purpose

Velora AI is an AI-powered trading signal service that delivers signals via Telegram. The website serves two primary purposes:

1. **Marketing / Landing Page** — Communicates what Velora AI is, who it is for, how it works, and invites users to join the Beta.
2. **Live Signals Dashboard** — Displays real-time trading signals that originate from the Velora Telegram/backend pipeline, visible on the website without page refresh.

The website is **read-only for visitors**. No user authentication, trading, or order placement occurs on the website.

---

## Target User Experience

- A prospective user lands on the page and immediately understands what Velora AI does.
- They scroll through a clean, premium, dark-themed landing page.
- They see a live signals section showing real trading signals as they arrive.
- The experience is trustworthy, minimal, technical, and professional.
- The experience works seamlessly on mobile and desktop.
- The user can join the Beta (CTA).

---

## Beta Status Implications

- The product is in Beta — the UI must communicate this clearly (badge, messaging).
- Feature scope is intentionally limited.
- Rough edges are acceptable but must not undermine trust.
- Performance and reliability matter even in Beta.

---

## Landing Page Structure

The following sections are required. Internal copy and exact content are `UNSPECIFIED` until design/copy is provided.

| # | Section | Notes |
|---|---|---|
| 1 | Navbar | Logo, Beta badge, primary CTA |
| 2 | Hero | Headline, subheadline, CTA, visual element |
| 3 | What Velora AI Does | Feature description / value proposition |
| 4 | How It Works | Step-by-step flow (Telegram → signal → website) |
| 5 | Live Signals | Live signal cards, real-time updates |
| 6 | Footer | Links, legal, social |

> **UNSPECIFIED**: Exact section copy, marketing messaging, CTA text, and footer links have not been provided. These will be drafted during implementation and require approval.

---

## Live Signals Functionality

### Behavior
- The Live Signals section displays trading signals in near real-time.
- New signals appear **without a page refresh**.
- The target latency between signal creation and display on the website is **under 10 seconds**.
- Signals are displayed as cards.
- The most recent signals appear first (newest-first ordering).

### Signal Fields

The following fields are expected on a signal. Fields marked `UNSPECIFIED` are inferred or partially defined.

| Field | Type | Notes |
|---|---|---|
| `id` | string / uuid | Unique signal identifier |
| `asset` | string | Trading pair or asset symbol (e.g., BTC/USDT) |
| `direction` | string | `LONG` or `SHORT` |
| `entry` | number | Entry price |
| `tp1` | number | Take Profit 1 price |
| `tp2` | number \| null | Take Profit 2 price (optional) |
| `tp3` | number \| null | Take Profit 3 price (optional) |
| `sl` | number | Stop Loss price |
| `status` | enum | `ACTIVE`, `TP1_HIT`, `TP2_HIT`, `TP3_HIT`, `SL_HIT`, `UNPARSED` |
| `raw_text` | string \| null | Original Telegram message (used when parsing fails) |
| `created_at` | ISO 8601 string | When the signal was first received |
| `updated_at` | ISO 8601 string | Last status update timestamp |
| `source` | string | `UNSPECIFIED` — may indicate signal source/channel |
| `confidence` | number \| null | `UNSPECIFIED` — AI confidence score if applicable |

> **UNSPECIFIED**: The exact field set has not been confirmed by a backend API contract. The above is inferred from the product description and must be validated when the API is available.

---

## Signal States

| State | Meaning | Display Behavior |
|---|---|---|
| `ACTIVE` | Signal is live, no targets hit | Normal card, active indicator |
| `TP1_HIT` | First take profit level reached | Card updated, TP1 marked |
| `TP2_HIT` | Second take profit level reached | Card updated, TP2 marked |
| `TP3_HIT` | Third take profit level reached | Card updated, TP3 marked |
| `SL_HIT` | Stop loss hit, trade closed at loss | Card updated, loss indicator |
| `UNPARSED` | Message could not be parsed into structured data | Raw text fallback display |

**Critical rule**: TP1/TP2/TP3/SL_HIT updates must modify the **existing** signal card. They must **never** create a new duplicate card.

---

## Telegram / Backend Flow

```
Telegram Message
      ↓
Backend Receiver (parses Telegram webhook/bot message)
      ↓
Database (stores structured signal + raw text)
      ↓
Velora API (REST or WebSocket, serves signals to frontend)
      ↓
Website (fetches / subscribes to signals)
      ↓
Live Signal Cards (rendered in browser)
```

- The website does **not** connect directly to Telegram.
- The website does **not** contain Telegram bot tokens.
- All Telegram credentials remain on the backend.
- The website only communicates with the Velora API.

---

## Raw Message Fallback

When the backend cannot parse a Telegram message into a structured signal:
- A signal with `status: UNPARSED` is created.
- The `raw_text` field contains the original message.
- The frontend must display this in a readable fallback format.
- Malformed messages must **not** be silently dropped.

---

## Important Constraints

| Constraint | Detail |
|---|---|
| Mobile-first | Design and implementation must prioritize mobile |
| Read-only | No user login, no user-generated content |
| No Telegram credentials in frontend | Backend-only concern |
| No silent failures | Malformed signals must be displayed in fallback mode |
| No duplicate cards | Status updates update existing cards only |
| Live updates < 10s | Target latency from signal creation to display |
| Beta branding | UI must clearly communicate Beta status |

---

## Security Requirements

| Requirement | Detail |
|---|---|
| No secret exposure | No API keys, tokens, or credentials in frontend code or repo |
| HTTPS only | Website must be served over HTTPS in production |
| Input sanitization | `raw_text` from Telegram must be sanitized before rendering |
| No server-side logic | Frontend is a static/SSR display layer only |
| API authentication | `UNSPECIFIED` — whether the Velora API requires auth headers |
| CORS | `UNSPECIFIED` — backend must configure appropriate CORS |

---

## Non-Goals (Explicitly Out of Scope for Beta)

- User authentication or accounts
- Signal subscription management
- Push notifications to users
- Telegram bot interaction from the website
- Portfolio tracking
- Backtesting or performance history charts
- Social features (comments, likes)
- Multi-language support
- Admin dashboard
- Payment processing

---

## Open Questions / Unspecified Items

| # | Item | Status |
|---|---|---|
| 1 | Exact copy/content for all landing page sections | UNSPECIFIED |
| 2 | API base URL and authentication mechanism | UNSPECIFIED |
| 3 | Whether API uses REST polling, SSE, or WebSocket for live updates | UNSPECIFIED |
| 4 | Exact signal field set (confirmed by backend) | UNSPECIFIED |
| 5 | Whether confidence scores are included | UNSPECIFIED |
| 6 | Footer links and legal text | UNSPECIFIED |
| 7 | Social media links | UNSPECIFIED |
| 8 | CTA destination (Telegram group link?) | UNSPECIFIED |
| 9 | Pagination / max signals to display | UNSPECIFIED |
| 10 | Error handling behavior when API is unreachable | UNSPECIFIED |

---

*Last updated: Initial planning phase — pre-TASK-001.*
