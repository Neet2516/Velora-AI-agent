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

## Backend Delivery Notes

The backend is responsible for:
- Ensuring each signal has a stable, unique `id` that never changes
- Sending TP/SL updates as modifications to the original signal record (same `id`)
- Not sending duplicate signals (same `id` twice in the same response)
- Populating `raw_text` for UNPARSED signals
- Setting `updated_at` correctly on every status change

The frontend **trusts** the backend to follow these rules. The frontend validates the shape of data (Zod) but cannot validate semantic correctness (e.g., whether a signal ID is truly stable).

---

*Last updated: Initial planning phase — pre-implementation.*
