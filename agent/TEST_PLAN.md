# TEST_PLAN.md — Testing Strategy & Acceptance Criteria

## Testing Philosophy

- Tests are **verification tools**, not afterthoughts.
- Every task has acceptance criteria that function as informal test cases.
- Formal tests are implemented in TASK-020 but informed throughout.
- The goal is confidence, not coverage metrics.
- Test the things that can break; don't test implementation details.

---

## Test Framework

| Tool | Purpose |
|---|---|
| **Vitest** | Unit and component tests (faster than Jest, ESM-native) |
| **React Testing Library** | Component testing (user-centric, not implementation) |
| **MSW (Mock Service Worker)** | API mocking for integration tests |
| **Playwright** (optional) | End-to-end testing for critical flows |

> **DECIDED**: Use Vitest over Jest for better performance and ESM compatibility with Next.js 14.

---

## Test Categories

### 1. Unit Tests

**Target:** Pure functions, utilities, Zod schemas

#### 1.1 — `lib/utils.ts` (cn utility)

| Test | Expected Result |
|---|---|
| `cn("foo", "bar")` | Returns `"foo bar"` |
| `cn("foo", undefined, "bar")` | Returns `"foo bar"` |
| `cn("px-4", "px-2")` | Returns `"px-2"` (tailwind-merge deduplication) |

#### 1.2 — `lib/schemas/signal.ts` (Zod validation)

| Test | Expected Result |
|---|---|
| Parse a valid `ACTIVE` signal object | Returns typed Signal, no error |
| Parse a valid `UNPARSED` signal (null numeric fields) | Returns typed Signal, no error |
| Parse signal with missing required `id` | Throws ZodError |
| Parse signal with missing `status` | Throws ZodError |
| Parse signal with invalid `status` value | Throws ZodError |
| Parse signal with invalid `direction` value | Throws ZodError |
| Parse signal with `tp2: null` | Returns Signal with `tp2: null` |
| Parse signal with non-ISO `created_at` | Throws ZodError |
| Parse `SignalListResponseSchema` with valid array | Returns typed list |
| Parse `SignalListResponseSchema` with empty array | Returns empty list |
| Parse `SignalListResponseSchema` with one invalid signal | Throws ZodError |

#### 1.3 — `lib/api/client.ts`

| Test | Expected Result |
|---|---|
| Network error | Returns typed `ApiError` |
| 401 response | Returns `UNAUTHORIZED` error |
| 500 response | Returns `INTERNAL_SERVER_ERROR` error |
| Successful 200 | Returns response body |

---

### 2. Component Tests (React Testing Library)

**Target:** UI components in isolation with mock props

#### 2.1 — `SignalCard` — All 6 States

| State | Tests |
|---|---|
| `ACTIVE` | Renders asset name, entry price, all TPs, SL. Shows "ACTIVE" badge. Shows pulsing dot. |
| `TP1_HIT` | TP1 row is visually marked. "TP1 HIT" badge shown. TP2/TP3/SL rows normal. |
| `TP2_HIT` | TP1 and TP2 rows marked. "TP2 HIT" badge shown. |
| `TP3_HIT` | All TP rows marked. "TP3 HIT" badge shown. |
| `SL_HIT` | SL row marked. "SL HIT" badge shown. |
| `UNPARSED` | raw_text rendered in fallback block. No structured fields. "UNPARSED" badge shown. |

Additional SignalCard tests:

| Test | Expected Result |
|---|---|
| LONG direction | Direction badge has success/green styling |
| SHORT direction | Direction badge has destructive/red styling |
| `created_at` in past | Relative time shown (e.g., "2 hours ago") |
| UNPARSED with null raw_text | Fallback text "Message could not be parsed" shown |
| UNPARSED with XSS in raw_text | Script tag rendered as text, not executed |

#### 2.2 — `SignalBadge`

| Test | Expected Result |
|---|---|
| Status ACTIVE | Renders amber badge |
| Status TP1_HIT | Renders emerald badge |
| Status SL_HIT | Renders red badge |
| Status UNPARSED | Renders muted badge |

#### 2.3 — `SignalCardSkeleton`

| Test | Expected Result |
|---|---|
| Renders without props | Shows shimmer skeleton matching card dimensions |
| No text content | No readable content visible |

#### 2.4 — `SignalList`

| Test | Expected Result |
|---|---|
| Empty array | Shows empty state component |
| Array with 3 signals | Renders 3 SignalCard components |
| Signals are newest-first | First rendered card has latest `created_at` |

#### 2.5 — Loading / Empty / Error States

| State | Test | Expected Result |
|---|---|---|
| Loading | `isLoading: true` | Skeleton cards rendered |
| Empty | `data: []` | Empty state message visible |
| Error | `isError: true` | Error message visible; retry button present |
| Error retry | Click retry button | `refetch()` called |

#### 2.6 — Navbar

| Test | Expected Result |
|---|---|
| Renders logo | Logo text/element visible |
| Renders Beta badge | "BETA" text visible |
| Renders CTA button | Primary CTA button visible and clickable |

---

### 3. Integration Tests

**Target:** `useSignals` hook + MSW mock server

#### 3.1 — `useSignals` Hook

| Test | Expected Result |
|---|---|
| Successful fetch | Returns `Signal[]` |
| API returns 500 | Hook `isError` is true |
| API returns invalid JSON | Hook `isError` is true; no crash |
| API returns signal with wrong schema | Hook handles validation error; no crash |
| Refetch after 5s | Query fires again after 5 seconds |

#### 3.2 — Signal Update (No Duplicate Cards)

| Test | Expected Result |
|---|---|
| Signal status changes ACTIVE → TP1_HIT on refetch | Only 1 card with updated status; 0 duplicates |
| Same signal returned twice in response | Only 1 card rendered |

#### 3.3 — UNPARSED Signal Handling

| Test | Expected Result |
|---|---|
| API returns UNPARSED signal | Card renders raw_text fallback |
| UNPARSED signal with XSS raw_text | XSS is not executed |
| UNPARSED signal logged/not dropped | Signal appears in the list |

---

### 4. Responsive Testing

**Method:** Manual testing with Chrome DevTools + real device if available

| Viewport | Sections to Verify |
|---|---|
| 320px | All sections, no horizontal scroll, text legible |
| 375px | All sections, signal cards, navbar |
| 768px | Grid layouts, signal card 2-column |
| 1024px | Full desktop layout |
| 1280px | Max content width cap |
| 1440px | Layout stays centered, no stretching |

**Checklist for each breakpoint:**
- [ ] No horizontal scrollbar
- [ ] Text is legible (≥ 14px body)
- [ ] Tap targets ≥ 44px (mobile only)
- [ ] Signal cards display all information
- [ ] Navbar is usable

---

### 5. Live Update Testing

**Method:** Manual testing with real or mocked API

| Scenario | Test | Expected Result |
|---|---|---|
| New signal arrives | Add signal to API, watch browser | Signal appears ≤ 10s |
| Signal status changes | Update signal status in API | Existing card updates (no new card) |
| Multiple signals arrive | Add 3 signals in sequence | All 3 appear, newest first |
| API goes down mid-session | Kill API | Error state shown; previous signals still visible (cached) |
| API comes back up | Restart API | Signals reload automatically |

---

### 6. Malformed Message Testing

| Scenario | Expected Result |
|---|---|
| Telegram sends unparseable message | UNPARSED signal appears with raw_text |
| raw_text contains HTML | Rendered as escaped text, not HTML |
| raw_text contains `<script>` | Script not executed |
| Signal missing required fields | Zod validation error; not silently dropped |
| Signal with extra unknown fields | Parsed successfully (extra fields ignored) |

---

### 7. API Error Testing

| Scenario | Expected Result |
|---|---|
| API unreachable (network error) | Error state shown; retry button available |
| API returns 500 | Error state shown |
| API returns empty `data: []` | Empty state shown; no error |
| API returns malformed JSON | Error state shown; app does not crash |
| API returns unexpected schema | Zod catches it; error logged; degraded gracefully |

---

### 8. Accessibility Testing

**Method:** axe DevTools browser extension + manual keyboard testing

| Test | Expected Result |
|---|---|
| Run axe scan on full page | Zero critical violations |
| Keyboard: Tab through all interactive elements | All elements reachable; focus visible |
| Signals list aria-live | Screen reader announces new signals |
| Color contrast: foreground on background | ≥ 4.5:1 ratio |
| Color contrast: muted text on background | ≥ 4.5:1 ratio |
| Color contrast: badge text on badge bg | ≥ 4.5:1 ratio |
| Heading hierarchy | One h1; h2 > h3 correct order |

---

### 9. Mobile Testing

| Test | Device/Method | Expected Result |
|---|---|---|
| Full page scroll | 375px emulator | Smooth, no jank |
| Signal card readability | 375px | All fields visible, legible |
| CTA button tap | 375px | Button triggers correctly |
| Navbar interaction | 375px | Beta badge and CTA visible |
| Long raw_text wrapping | 375px | Text wraps, no overflow |

---

### 10. Desktop Testing

| Test | Viewport | Expected Result |
|---|---|---|
| Signal grid layout | 1280px | 2-column grid |
| Hero section height | 1280px | Full viewport height |
| Max content width | 1440px | Content centered, max 1280px |
| Hover states | Desktop | Visible hover effects on interactive elements |

---

---

### 11. Telegram Bot & Webhook Ingestion Testing (`TASK-029`)

**Target:** Webhook secret validation, parser grammar, signal updates, and UNPARSED resilience.

| # | Test Scenario | Input / Action | Expected Result |
|---|---|---|---|
| 1 | Valid BUY signal | `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650.50\nSL: 2645.00\nTP1: 2656.00\nTP2: 2661.00\nTP3: 2666.00` | Parses into `ACTIVE` BUY Signal object with all fields populated |
| 2 | Valid SELL signal | `NEW SIGNAL\nSymbol: BTCUSDT\nType: SELL\nEntry: 98000\nSL: 99000\nTP1: 97000` | Parses into `ACTIVE` SELL Signal with entry and TP1 |
| 3 | Signal with only TP1 | Signal text omitting TP2 and TP3 | `tp1` is number; `tp2` and `tp3` are `null`; status `ACTIVE` |
| 4 | Signal with TP1 + TP2 | Signal text with TP1 and TP2 | `tp1`, `tp2` are numbers; `tp3` is `null` |
| 5 | Signal with TP1 + TP2 + TP3 | Full multi-target text | All three TPs populated |
| 6 | TP1 HIT update | Message `TP1 HIT` following active signal | Existing signal status mutated to `TP1_HIT`; zero duplicate cards |
| 7 | TP2 HIT update | Message `TP2 HIT` | Existing signal status mutated to `TP2_HIT` |
| 8 | TP3 HIT update | Message `TP3 HIT` | Existing signal status mutated to `TP3_HIT` |
| 9 | SL HIT update | Message `SL HIT` | Existing signal status mutated to `SL_HIT` |
| 10 | Malformed signal | Unrecognized message (e.g. `Join VIP group for 50% discount`) | Stored as `UNPARSED` with preserved `raw_text`; does not crash |
| 11 | Empty Telegram message | Update with empty text or whitespace | Stored as `UNPARSED` with fallback text |
| 12 | Duplicate message | Same `update_id` or same Telegram message sent twice | Idempotent handling; no duplicate entries |
| 13 | Invalid webhook secret | `POST /api/telegram` with invalid or missing secret header | Returns HTTP `401 Unauthorized`; update rejected |
| 14 | Unexpected Telegram update | Update with `inline_query`, `callback_query`, etc. | Handled gracefully without error; returns HTTP 200 `{ ok: true, status: "ignored" }` |
| 15 | Rapid consecutive signals | Multiple signals arriving in sub-second succession | In-order processing; distinct stable IDs; newest-first ordering maintained |

---

## Critical Acceptance Criteria (Product Level)

These are the non-negotiable product requirements that tests must verify:

| # | Requirement | Test Method |
|---|---|---|
| 1 | Latest signals appear correctly | Visual inspection + component test |
| 2 | New signals appear without page refresh | Live update test |
| 3 | Live update latency < 10 seconds | Timed live update test |
| 4 | TP/SL updates modify existing signals | Duplicate card integration test |
| 5 | Malformed messages are not silently dropped | UNPARSED signal test |
| 6 | Mobile works correctly (375px) | Responsive + mobile test |
| 7 | Desktop works correctly (1280px) | Responsive + desktop test |
| 8 | No XSS via raw_text | XSS injection test |
| 9 | No secrets in frontend code | Code review + `git grep` |
| 10 | App is accessible (WCAG 2.1 AA) | axe scan + keyboard test |
| 11 | Telegram webhook verifies secret token | Webhook security test |
| 12 | Telegram bot token is server-only | Environment audit |

---

*Last updated: Post-TASK-021 — Telegram Bot testing suite added.*

