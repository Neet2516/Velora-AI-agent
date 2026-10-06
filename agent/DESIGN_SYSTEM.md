# DESIGN_SYSTEM.md — Velora AI Visual Design System

## Design Philosophy

The Velora AI website must feel:

- **Dark** — Deep, true dark backgrounds. Not gray, not charcoal. Deep near-black.
- **Premium** — Every element feels intentional. No generic UI kit aesthetics.
- **Technical** — Precision, data-density done right. Like a Bloomberg terminal meets modern SaaS.
- **Modern** — Contemporary design patterns, subtle depth, refined spacing.
- **Minimal** — Only what is necessary. White space is not wasted space.
- **Mobile-first** — Designed on a 375px canvas first, expanded to desktop second.
- **Trustworthy** — Users are trusting this with trading data. Nothing should feel cheap or fly-by-night.

### Avoid
- Generic crypto UI (moons, rockets, laser eyes)
- Gambling-like visuals (aggressive reds/greens, flashing animations)
- Excessive neon glow effects
- Rainbow gradients or gradient-heavy designs
- Excessive animation (nothing should distract from signal data)
- Generic SaaS templates (no blue-button, white-background, stock photo patterns)

---

## Color Palette

### Semantic Color Tokens

These are the canonical design tokens. All colors in the codebase must reference these tokens, never raw hex values.

```
Background:        #09090b    ← Near-black. The deepest layer.
Card:              #121215    ← Slightly elevated surface. Signal cards, content containers.
Muted:             #1e1e24    ← Muted interactive elements, hover states, secondary surfaces.
Border:            #27272a    ← Borders, dividers, subtle separators.

Primary:           #6366f1    ← Indigo. Brand accent. CTAs, active indicators, links.
Success:           #10b981    ← Emerald. LONG signals, TP hit indicators, positive states.
Warning:           #f59e0b    ← Amber. Active signal indicators, caution states.
Destructive:       #ef4444    ← Red. SHORT signals, SL hit, error states.

Foreground:        #fafafa    ← Primary text. Near-white.
Muted Foreground:  #a1a1aa    ← Secondary text, labels, metadata.
```

### CSS Custom Properties

Define all tokens as CSS custom properties in `globals.css`:

```css
:root {
  --background:        #09090b;
  --card:              #121215;
  --muted:             #1e1e24;
  --border:            #27272a;
  --primary:           #6366f1;
  --primary-hover:     #4f52d9;
  --success:           #10b981;
  --warning:           #f59e0b;
  --destructive:       #ef4444;
  --foreground:        #fafafa;
  --muted-foreground:  #a1a1aa;

  /* Derived alpha variants */
  --primary-10:        rgba(99, 102, 241, 0.10);
  --primary-20:        rgba(99, 102, 241, 0.20);
  --success-10:        rgba(16, 185, 129, 0.10);
  --success-20:        rgba(16, 185, 129, 0.20);
  --warning-10:        rgba(245, 158, 11, 0.10);
  --destructive-10:    rgba(239, 68, 68, 0.10);
}
```

### Tailwind Token Mapping

In `tailwind.config.ts`, extend the theme to use CSS variables:

```ts
colors: {
  background:   'var(--background)',
  card:         'var(--card)',
  muted:        { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
  border:       'var(--border)',
  primary:      { DEFAULT: 'var(--primary)', hover: 'var(--primary-hover)' },
  success:      'var(--success)',
  warning:      'var(--warning)',
  destructive:  'var(--destructive)',
  foreground:   'var(--foreground)',
}
```

---

## Signal Color Semantics

| Signal State | Color Token | Meaning |
|---|---|---|
| `ACTIVE` | `warning` (#f59e0b) | Live, monitoring |
| `TP1_HIT` | `success` (#10b981) | Partial profit |
| `TP2_HIT` | `success` (#10b981) | Better profit |
| `TP3_HIT` | `success` (#10b981) | Full profit |
| `SL_HIT` | `destructive` (#ef4444) | Loss |
| `UNPARSED` | `muted-foreground` (#a1a1aa) | Unknown / fallback |

| Direction | Color Token |
|---|---|
| `LONG` | `success` (#10b981) |
| `SHORT` | `destructive` (#ef4444) |

---

## Typography

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| Primary (UI, body, headings) | Inter or Geist Sans | system-ui, sans-serif |
| Monospace (prices, IDs, raw text) | JetBrains Mono or Geist Mono | monospace |

**Implementation:** Load via `next/font` (Google Fonts or Vercel Geist). Do not use `@import` in CSS — use Next.js font optimization.

### Type Scale

| Name | Size | Weight | Usage |
|---|---|---|---|
| `display` | 3.5rem (56px) | 700 | Hero headline |
| `h1` | 2.25rem (36px) | 700 | Section titles |
| `h2` | 1.5rem (24px) | 600 | Subsection titles |
| `h3` | 1.125rem (18px) | 600 | Card titles, signal asset |
| `body` | 1rem (16px) | 400 | Body text |
| `small` | 0.875rem (14px) | 400 | Labels, metadata |
| `xs` | 0.75rem (12px) | 500 | Badges, timestamps |
| `mono` | 0.875rem (14px) | 400 | Prices, IDs |

### Line Heights
- Headings: 1.2
- Body: 1.6
- Compact (labels, badges): 1.0

---

## Spacing System

Use Tailwind's default spacing scale. Key values:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Fine adjustments |
| `space-2` | 8px | Tight gaps |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section padding |
| `space-12` | 48px | Section separation |
| `space-16` | 64px | Large section spacing |
| `space-24` | 96px | Hero padding |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 4px | Badges, small tags |
| `rounded-md` | 6px | Buttons |
| `rounded-lg` | 8px | Input fields |
| `rounded-xl` | 12px | Cards |
| `rounded-2xl` | 16px | Large containers |
| `rounded-full` | 9999px | Pills, status dots |

---

## Elevation / Depth

Depth is created through **subtle background differences**, not heavy shadows. The layering system:

| Layer | Color | Usage |
|---|---|---|
| Layer 0 | `#09090b` | Page background |
| Layer 1 | `#121215` | Cards, panels |
| Layer 2 | `#1e1e24` | Hover states, tooltips |
| Layer 3 | `#27272a` | Borders, dividers |

**Shadow usage:** Minimal. Only for elements that need to "float" (dropdowns, modals). Use `shadow-lg` at most.

**Glassmorphism:** Use very sparingly if at all — only for the Navbar (subtle `backdrop-blur` with low opacity background). Not for signal cards.

---

## Component Design Patterns

### Signal Card
```
┌─────────────────────────────────────┐
│ [LONG/SHORT badge] [Status badge]   │
│ BTC/USDT                       $... │
│ Entry:    $XX,XXX.XX                │
│ TP1:      $XX,XXX.XX  ✓ HIT        │
│ TP2:      $XX,XXX.XX               │
│ TP3:      $XX,XXX.XX               │
│ SL:       $XX,XXX.XX               │
│ ─────────────────────────────────── │
│ 2h ago                              │
└─────────────────────────────────────┘
```

- Background: `card` (#121215)
- Border: `border` (#27272a), 1px solid
- Border radius: `rounded-xl`
- Padding: `p-6` (24px)
- Hit targets highlighted with subtle background tint of `success-10`
- Status dot with animated pulse for `ACTIVE` state

### Status Badges

| State | Style |
|---|---|
| `ACTIVE` | Amber text, amber-tinted background, pulsing dot |
| `TP1_HIT` | Emerald text, emerald-tinted background |
| `TP2_HIT` | Emerald text, emerald-tinted background |
| `TP3_HIT` | Emerald text, emerald-tinted background |
| `SL_HIT` | Red text, red-tinted background |
| `UNPARSED` | Zinc text, muted background |

### Navbar
- Sticky, top-0, full-width
- Backdrop blur: `backdrop-blur-md`
- Background: `background/80` (80% opacity near-black)
- Border bottom: 1px solid `border`
- Height: 64px (desktop), 56px (mobile)
- Logo + Beta badge on left, CTA on right

### Hero
- Full viewport height on desktop, auto on mobile
- Centered content
- Headline: `display` size, white
- Subheadline: `body` or `h3`, `muted-foreground`
- CTA button: `primary` background, rounded-md
- Subtle background: grid pattern or noise texture (very subtle) — avoid full gradient backgrounds

---

## Animation Guidelines

### Principles
- Animations serve communication, not decoration.
- All animations respect `prefers-reduced-motion`.
- Keep durations short: UI feedback ≤ 200ms, entrance ≤ 400ms.

### Patterns

| Pattern | Duration | Easing | Usage |
|---|---|---|---|
| Fade in | 300ms | ease-out | Signal card entrance |
| Slide up | 400ms | spring | New signal card arrival |
| Pulse | 2s loop | ease-in-out | Active signal indicator |
| Scale | 150ms | ease-out | Button hover |
| Shimmer | 1.5s loop | linear | Skeleton loading |

### Signal Card Entrance (New Signal)
1. Card slides in from top (or fades in from transparent)
2. Brief highlight flash on the border (primary color, fades in 500ms)
3. Settles to normal card appearance

### State Transition (TP/SL Hit)
1. Affected target row briefly highlights (`success-10` or `destructive-10` flash)
2. Status badge transitions to new state
3. No full card re-mount (in-place update only)

---

## Iconography

**RECOMMENDED:** Use `lucide-react` (already part of shadcn/ui ecosystem).

Key icons:
- Arrow up/down: direction indicators
- Check: TP hit
- X: SL hit
- Wifi/WifiOff: connection status
- TrendingUp/Down: signal direction
- Clock: timestamps
- AlertCircle: errors/warnings

---

## Responsive Breakpoints

Follow Tailwind defaults:

| Breakpoint | Width | Behavior |
|---|---|---|
| `default` (mobile) | < 640px | Single column, full width |
| `sm` | 640px | Minor adjustments |
| `md` | 768px | Two columns possible for signals |
| `lg` | 1024px | Full desktop layout |
| `xl` | 1280px | Max content width capped |

**Max content width:** `max-w-7xl` (1280px), centered.

---

## Accessibility Standards

- Color is never the sole differentiator (icons + text labels accompany all color-coded elements)
- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: visible, high-contrast ring (`ring-primary`)
- All interactive elements keyboard-accessible
- Semantic HTML structure throughout
- `aria-live` regions for live signal updates

---

*Last updated: Initial planning phase — pre-TASK-001.*
