# SIGNAL_STATE_MACHINE.md — Signal Lifecycle & State Transitions

## Overview

A Signal represents a single trading signal that originates from Telegram, is parsed by the backend, stored in the database, and served to the frontend via the Velora API.

Each signal has a `status` field that changes over the lifetime of the trade. The frontend must handle all states correctly — rendering the right visual treatment and, critically, **updating existing cards rather than creating new ones**.

---

## States

```
┌─────────────────────────────────────────────────────────┐
│                    SIGNAL STATES                         │
├──────────────┬──────────────────────────────────────────┤
│ ACTIVE       │ Signal is live. No targets hit yet.       │
│ TP1_HIT      │ First take profit level was reached.      │
│ TP2_HIT      │ Second take profit level was reached.     │
│ TP3_HIT      │ Third take profit level was reached.      │
│ SL_HIT       │ Stop loss was hit. Trade closed at loss.  │
│ UNPARSED     │ Message could not be parsed. Raw fallback.│
└──────────────┴──────────────────────────────────────────┘
```

---

## State Transition Diagram

```
                    ┌─────────────────────────────┐
                    │         NEW MESSAGE          │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │  Can backend parse message?  │
                    └──────────┬─────────┬─────────┘
                              YES        NO
                               │          │
                    ┌──────────▼──┐   ┌───▼──────────┐
                    │   ACTIVE    │   │   UNPARSED   │
                    └──────┬──────┘   └──────────────┘
                           │           (terminal state)
                 ┌─────────┴──────────┐
                 │ Status update msg  │
                 └─────────┬──────────┘
                      ┌────┴────┐
                      │         │
               ┌──────▼──┐  ┌───▼──────┐
               │  TP hit  │  │  SL hit  │
               └──────┬──┘  └───┬──────┘
                      │         │
          ┌───────────▼──┐  ┌───▼────────┐
          │  TP1_HIT      │  │  SL_HIT    │ (terminal state)
          └───────────┬──┘  └────────────┘
                      │
          ┌───────────▼──┐
          │  TP2_HIT      │
          └───────────┬──┘
                      │
          ┌───────────▼──┐
          │  TP3_HIT      │ (effectively terminal — all TPs hit)
          └──────────────┘
```

---

## Allowed Transitions

| From | To | Trigger | Notes |
|---|---|---|---|
| *(new)* | `ACTIVE` | New parsed signal | Standard new signal |
| *(new)* | `UNPARSED` | New unparseable message | Fallback state |
| `ACTIVE` | `TP1_HIT` | TP1 level reached | Updates existing card |
| `ACTIVE` | `SL_HIT` | Stop loss triggered | Updates existing card |
| `TP1_HIT` | `TP2_HIT` | TP2 level reached | Updates existing card |
| `TP1_HIT` | `SL_HIT` | Stop loss after TP1 | Rare but valid |
| `TP2_HIT` | `TP3_HIT` | TP3 level reached | Updates existing card |
| `TP2_HIT` | `SL_HIT` | Stop loss after TP2 | Rare but valid |
| `TP3_HIT` | *(none)* | Terminal state | All targets hit |
| `SL_HIT` | *(none)* | Terminal state | Trade closed |
| `UNPARSED` | *(none)* | Terminal state | No re-parsing |

### Forbidden Transitions

| From | To | Reason |
|---|---|---|
| `SL_HIT` | Any TP | Stop loss is terminal |
| `TP3_HIT` | Any | All TPs hit is terminal |
| `UNPARSED` | `ACTIVE` | Backend does not re-parse |
| Any | `ACTIVE` | Signals don't go backwards |
| `TP2_HIT` | `TP1_HIT` | States don't go backwards |

---

## Critical Rule: No Duplicate Cards

**The most important rule for signal state management:**

When a TP or SL update message arrives, the backend sends a **signal update** — not a new signal. The updated Signal object will have the **same `id`** as the original signal, but with a new `status` and updated `updated_at`.

The frontend must:
1. Identify the existing signal in the list by `id`
2. Replace the data for that signal in-place
3. Animate the status change on the existing card
4. **Never** create a new card for the updated signal

**React implementation:** This is guaranteed by using `key={signal.id}` on all `<SignalCard>` components. When the query refetches and returns the updated signal with the same `id`, React reconciles the update to the existing DOM node — it does not unmount and remount the card.

---

## Handling Duplicate Updates

The backend may occasionally send the same update twice (at-least-once delivery). The frontend handles this gracefully because:

1. TanStack Query deduplicates by returning the latest response
2. React reconciliation by `key={signal.id}` ensures no visual duplication
3. If a signal with the same `id` and `status` arrives, the card simply re-renders with identical content (no visual change)

The frontend **does not** need to implement deduplication logic explicitly.

---

## UI Representation per State

### ACTIVE
```
┌─────────────────────────────────────┐
│ ● ACTIVE         [LONG] [BTC/USDT]  │  ← pulsing amber dot
│                                     │
│ Entry:    $65,000.00                │
│ TP1:      $67,000.00                │
│ TP2:      $69,000.00                │
│ TP3:      $72,000.00                │
│ SL:       $63,000.00                │
│ ─────────────────────────────────── │
│ 2 minutes ago                       │
└─────────────────────────────────────┘
```
- Status badge: amber background, amber text, pulsing dot animation
- All targets: normal text, no highlight
- Border: standard `--border` color

### TP1_HIT
```
┌─────────────────────────────────────┐
│ ✓ TP1 HIT        [LONG] [BTC/USDT]  │
│                                     │
│ Entry:    $65,000.00                │
│ TP1:      $67,000.00  ✓             │  ← green highlight row
│ TP2:      $69,000.00                │
│ TP3:      $72,000.00                │
│ SL:       $63,000.00                │
│ ─────────────────────────────────── │
│ 1 hour ago                          │
└─────────────────────────────────────┘
```
- Status badge: emerald background, emerald text
- TP1 row: subtle `--success-10` background, checkmark icon, green text
- Border: standard

### TP2_HIT
- Same as TP1_HIT but TP1 and TP2 rows are both highlighted
- Status badge: "TP2 HIT"

### TP3_HIT
- All TP rows highlighted
- Status badge: "TP3 HIT" (all targets hit)

### SL_HIT
```
┌─────────────────────────────────────┐
│ ✗ SL HIT         [LONG] [BTC/USDT]  │
│                                     │
│ Entry:    $65,000.00                │
│ TP1:      $67,000.00                │
│ TP2:      $69,000.00                │
│ TP3:      $72,000.00                │
│ SL:       $63,000.00  ✗             │  ← red highlight row
│ ─────────────────────────────────── │
│ 3 hours ago                         │
└─────────────────────────────────────┘
```
- Status badge: red background, red text
- SL row: subtle `--destructive-10` background, X icon, red text
- Card overall: slightly dimmed (reduced opacity or muted border)

### UNPARSED
```
┌─────────────────────────────────────┐
│ ? UNPARSED                          │
│                                     │
│ Raw message:                        │
│ ┌─────────────────────────────────┐ │
│ │ 🚀 BTC looking bullish, entering│ │  ← monospace, sanitized
│ │ here. SL below 60k. TP open.   │ │
│ └─────────────────────────────────┘ │
│ ─────────────────────────────────── │
│ 5 hours ago                         │
└─────────────────────────────────────┘
```
- Status badge: muted zinc background, muted text
- No structured fields shown
- Raw text in monospace block (sanitized before render)
- If `raw_text` is null: "Message could not be parsed."
- Card is visually distinct but not alarming

---

## State Change Animation Spec

When a signal card's status changes (polling picks up an update):

1. **Status badge** fades out → fades in with new state (150ms each)
2. **Newly hit target row** flashes its highlight color (500ms fade in, then persists)
3. No full card re-mount — animation is in-place
4. `prefers-reduced-motion`: skip animations, apply final state directly

---

## Telegram Parser Grammar & Ingestion Specification

### 1. Canonical Signal Message Syntax
The parser accepts structured Telegram text messages with the following format:
```text
NEW SIGNAL
Symbol: XAUUSD
Type: BUY
Entry: 2650.50
SL: 2645.00
TP1: 2656.00
TP2: 2661.00
TP3: 2666.00
```
- **Header:** Case-insensitive match on `NEW SIGNAL`.
- **Symbol:** Alphanumeric asset/pair (e.g. `XAUUSD`, `BTC/USDT`, `EURUSD`). Normalized to uppercase.
- **Type:** Directional action (`BUY`, `SELL`, `LONG`, `SHORT`).
- **Entry:** Floating point decimal entry price.
- **SL:** Floating point decimal Stop Loss level.
- **TP1:** Required first Take Profit level.
- **TP2:** Optional second Take Profit level.
- **TP3:** Optional third Take Profit level.
- **raw_text:** The complete verbatim string received in the Telegram update.

### 2. Follow-Up Update Trigger Syntax
When an active trade hits a milestone, a concise update is dispatched to the Telegram channel:
- `TP1 HIT` (or `[SYMBOL] TP1 HIT`)
- `TP2 HIT` (or `[SYMBOL] TP2 HIT`)
- `TP3 HIT` (or `[SYMBOL] TP3 HIT`)
- `SL HIT` (or `[SYMBOL] SL HIT`)

---

## Stable Signal Identity Strategy

To guarantee the architectural invariant **"Do NOT create duplicate cards"**, the ingestion pipeline applies the following resolution hierarchy to match an update message (`TP1 HIT` / `SL HIT`) to an existing signal:

1. **Resolution Priority 1 — Telegram Message Reply Mapping:**  
   If the update message is a Telegram reply (`reply_to_message.message_id`), match directly against the signal that was spawned from that original Telegram message ID.
2. **Resolution Priority 2 — Symbol Match on Active Signals:**  
   If the update mentions a specific symbol (e.g. `XAUUSD TP1 HIT`), locate the most recent signal with `status: ACTIVE` (or previous TP status) matching that symbol.
3. **Resolution Priority 3 — Most Recent Active Signal:**  
   If the update is a simple broadcast (e.g. `TP1 HIT` with no symbol and no reply), locate the most recent signal in the database with status `ACTIVE`.
4. **In-Place Mutation:**  
   When matched:
   - Update `signal.status` to the target state (`TP1_HIT`, `TP2_HIT`, `TP3_HIT`, or `SL_HIT`).
   - Update `signal.updated_at` to the current ISO timestamp.
   - Retain the exact same stable `signal.id`.
   - **Do NOT insert a new record or create a duplicate card.**
5. **No Match Fallback:**  
   If an update message cannot be matched to any active signal, persist it as an `UNPARSED` informational event so it is not dropped silently.

---

## UNPARSED Message Handling

If a received Telegram message does not conform to the `NEW SIGNAL` grammar or recognized update syntax:
- **Rule:** DO NOT DROP IT.
- Generate a new Signal entity:
  - `id`: Unique generated identifier (e.g. `sig-unparsed-<timestamp>`)
  - `status`: `"UNPARSED"`
  - `raw_text`: Exact verbatim Telegram message
  - `entry_price`: `null`
  - `sl`: `null`
  - `tp1`: `null`, `tp2`: `null`, `tp3`: `null`
  - `created_at`: Telegram update timestamp in ISO format
  - `source`: `"telegram"`
- The frontend renders the raw text securely inside a sanitized monospace container without throwing runtime exceptions.

---

*Last updated: Post-TASK-021 — Telegram parser grammar and Stable Identity Strategy established.*

