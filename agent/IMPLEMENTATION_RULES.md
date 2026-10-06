# IMPLEMENTATION_RULES.md — Coding Agent Rules

## Purpose

These rules govern every implementation decision made by the coding agent. They are non-negotiable unless explicitly overridden by the project owner with a documented reason in `DECISIONS.md`.

Violation of any rule must be documented, justified, and approved before proceeding.

---

## Rule Index

| # | Category | Rule |
|---|---|---|
| R-001 | Scope | Never modify unrelated files |
| R-002 | Scope | Never rewrite existing functionality without reason |
| R-003 | Dependencies | Never install a dependency without checking alternatives |
| R-004 | Security | Never expose secrets |
| R-005 | Security | Never place Telegram tokens in frontend code |
| R-006 | API | Never invent API behavior |
| R-007 | Signals | Never silently discard malformed signals |
| R-008 | Signals | Never duplicate signal cards on status updates |
| R-009 | Architecture | Prefer simple over abstracted |
| R-010 | Conventions | Follow existing project conventions |
| R-011 | Components | Keep components focused |
| R-012 | Quality | Validate each task before marking complete |
| R-013 | Documentation | Update /agent after important changes |
| R-014 | Quality | Never mark a task complete without satisfying acceptance criteria |
| R-015 | Process | Do not start multiple unrelated implementation tasks simultaneously |
| R-016 | TypeScript | Never use `any` without documented justification |
| R-017 | Rendering | Never use `"use client"` without necessity |
| R-018 | Performance | Never fetch data in leaf components |
| R-019 | Accessibility | Never use color as the sole communicator |
| R-020 | Testing | Never invent test expectations — test real behavior |

---

## Rules — Detailed

---

### R-001 — Never Modify Unrelated Files

When executing a task, only modify files listed in that task's "Files likely affected" section. If you discover that an unlisted file must be changed, document the reason before making the change.

**Violation example:** Modifying `Hero.tsx` while working on `SignalCard.tsx`.

**Correct approach:** Complete the current task scope. Open a separate task for Hero changes if needed.

---

### R-002 — Never Rewrite Existing Functionality Without Reason

If a component or function already exists and works correctly, do not rewrite it. Improve, extend, or fix it. A full rewrite requires:
1. Documentation of why the rewrite is necessary
2. Confirmation that the rewrite does not break existing behavior
3. All prior acceptance criteria must still pass after the rewrite

---

### R-003 — Never Install a Dependency Without Checking Alternatives

Before adding any npm package, verify:
1. Does an already-installed package solve the problem?
2. Can it be solved with native browser/Node APIs?
3. Is the package actively maintained? (check last publish date, stars, issues)
4. What is its bundle size impact? (check bundlephobia.com)

If installing: document the decision in `DECISIONS.md` with the alternatives considered.

**Examples of unnecessary installations:**
- Installing `moment.js` when `Intl.RelativeTimeFormat` or `date-fns` already satisfies the need
- Installing a full charting library for a simple display
- Installing a UUID library when `crypto.randomUUID()` exists natively

---

### R-004 — Never Expose Secrets

The following must NEVER appear in:
- Any `.ts` / `.tsx` / `.js` / `.jsx` file committed to the repository
- Any `.env` file that is not git-ignored
- Any `NEXT_PUBLIC_` prefixed env var (if the value is secret)
- Any client-side JavaScript bundle
- Any HTML, CSS, or static file
- Any `console.log` output in production

Secret types: API keys, private keys, JWT secrets, database credentials, Telegram bot tokens, webhook secrets.

**If an API key is required for the Velora API:**
- If the key is public (read-only, rate-limited, intentionally exposed) → `NEXT_PUBLIC_API_KEY` is acceptable
- If the key is private → it must be server-only and accessed only via Next.js Route Handler proxy

---

### R-005 — Never Place Telegram Tokens in Frontend Code

The Telegram bot token is a backend secret. The frontend never needs it. If you find yourself writing any Telegram-related credentials in frontend code, stop immediately.

The frontend only communicates with the Velora API. The Velora API communicates with Telegram infrastructure. These are strictly separated.

---

### R-006 — Never Invent API Behavior

If the `API_CONTRACT.md` does not specify a behavior, do not invent it. Options:
1. Mark the implementation as provisional and document the assumption
2. Request clarification from the backend team
3. Build a mock that makes the assumption explicit and easily swappable

**Prohibited pattern:** Guessing what the API returns and hardcoding behavior based on that guess without documentation.

---

### R-007 — Never Silently Discard Malformed Signals

If a signal fails Zod validation:
- Log the error with the raw response data
- Propagate an error state to the UI (or gracefully degrade)
- Never `try/catch` and swallow the error silently

If a signal has `status: UNPARSED`:
- Render the `raw_text` fallback card
- Never skip or filter out UNPARSED signals
- Never display an empty card for an UNPARSED signal

---

### R-008 — Never Duplicate Signal Cards on Status Updates

When the signals query refetches and returns a signal with an updated status:
- The existing card must update in place
- No new card must appear for the same signal ID
- The list must have exactly one card per unique signal ID

**Implementation guarantee:** Always use `key={signal.id}` on `<SignalCard>` components. Never use `key={index}`.

**Test before marking TASK-011 complete:** Visually verify with React DevTools that a status update does not unmount/remount the card.

---

### R-009 — Prefer Simple Architecture Over Unnecessary Abstraction

Before creating:
- A new context provider → ask: can this be a simple prop?
- A new custom hook → ask: can this be a utility function?
- A new HOC or wrapper → ask: can this be a simple component?
- A new lib file → ask: is this reused in more than one place?

Abstraction is justified only when it reduces duplication that already exists in at least two places, or when it enforces a critical constraint (like Zod validation at the API boundary).

**YAGNI (You Ain't Gonna Need It):** Build for current requirements, not imagined future ones.

---

### R-010 — Follow Existing Project Conventions

Once the project is initialized (TASK-001), all subsequent code must follow the patterns established:
- Import order conventions
- Component file structure
- Named vs default exports (use named exports for all components)
- Prop interface naming (`type SignalCardProps = {...}`)
- Directory placement conventions per `ARCHITECTURE.md`

If a convention is clearly wrong or inconsistent, document the issue in `DECISIONS.md` and apply the corrected convention going forward — do not mix two styles.

---

### R-011 — Keep Components Focused

A component should do one thing. Indicators of violation:
- A component file exceeds ~200 lines
- A component handles data fetching AND rendering AND complex business logic
- A component accepts more than ~8 props

**Correct approach:**
- Extract sub-components for distinct visual regions
- Extract custom hooks for data fetching / business logic
- Extract utilities for pure transformations

---

### R-012 — Validate Each Task Before Marking Complete

Before changing a task from `[~] IN PROGRESS` to `[x] COMPLETE`:
1. Read every acceptance criterion listed in the task
2. Verify each criterion is satisfied
3. Run the specified validation method
4. Fix any failing criteria before marking complete
5. Update `PROGRESS.md`

**Do not mark complete based on** "it looks right" or "it should work". Validate explicitly.

---

### R-013 — Update /agent Documentation After Important Changes

After completing any task that involves architectural decisions, API shape discoveries, or process changes:
1. Update `DECISIONS.md` if a new decision was made
2. Update `API_CONTRACT.md` if the API shape was confirmed or corrected
3. Update `PROGRESS.md` with the completed task
4. Update `TASKS.md` task statuses

The `/agent` directory must always reflect the current state of the project, not a stale snapshot.

---

### R-014 — Never Mark a Task Complete Without Satisfying Its Acceptance Criteria

This rule has no exceptions. Every acceptance criterion listed in a task is mandatory. If a criterion cannot be satisfied:
1. Mark the task `[!] BLOCKED`
2. Document the blocker in `PROGRESS.md`
3. Report to the user

Do not declare partial completion or "mostly done." A task is either `[x] COMPLETE` or it is not.

---

### R-015 — Do Not Start Multiple Unrelated Implementation Tasks Simultaneously

Execute one task at a time. Finish, validate, and close the task before starting the next. Parallel work is only acceptable within a single task (e.g., building SignalCard and SignalBadge together as part of TASK-010).

This prevents:
- Incomplete files in the codebase
- Merge conflicts with yourself
- Partial states that break the build

---

### R-016 — Never Use `any` Without Documented Justification

TypeScript strict mode is enabled. The `any` type defeats the purpose of TypeScript.

If you encounter a situation requiring `any`:
1. Try `unknown` first — it's safe and forces type narrowing
2. Try a more specific type or generic
3. If `any` is truly unavoidable, add an `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comment with a short explanation of why

---

### R-017 — Never Use `"use client"` Without Necessity

Adding `"use client"` to a component moves all its code (and its imports) to the client bundle. This increases page weight and reduces performance.

Only add `"use client"` when the component uses:
- `useState`, `useEffect`, `useReducer`, `useContext`, `useRef`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers that need to run in the browser
- Third-party libraries that are not server-compatible (e.g., Framer Motion animations)

Landing page sections (Hero, WhatVeloraAIDoes, HowItWorks, Footer) should remain Server Components.

---

### R-018 — Never Fetch Data in Leaf Components

Data fetching belongs at the **top of the component tree** for a feature section, not deep inside individual display components.

**Wrong:**
```tsx
// Deep inside SignalCard
const { data } = useSignals() // ❌ leaf component fetching
```

**Correct:**
```tsx
// In LiveSignals (section-level)
const { data, isLoading, isError } = useSignals() // ✓

// Pass data down
<SignalList signals={data} />
  <SignalCard signal={signal} /> // receives props, no fetching
```

---

### R-019 — Never Use Color as the Sole Communicator

All color-coded information must also be communicated by:
- Text (label, badge text)
- Icon (check, X, arrow)

Example: LONG direction is not "just green." It is: green + "LONG" text + upward arrow.

This is required for:
- Color-blind users (deuteranopia, protanopia)
- Screen readers
- WCAG 2.1 Success Criterion 1.4.1

---

### R-020 — Never Invent Test Expectations

Tests must verify real, observable behavior — not implementation details and not invented expectations.

**Wrong:**
```ts
expect(component.state.internalFlag).toBe(true) // implementation detail
```

**Correct:**
```ts
expect(screen.getByText('TP1 HIT')).toBeVisible() // user-observable behavior
```

Tests should answer: "Can the user see/do what they expect?" not "Does the internal code work a certain way?"

---

## Escalation

If any rule creates an impossible constraint for a task, escalate to the project owner:
1. Document the conflict in `PROGRESS.md`
2. Mark the task `[!] BLOCKED`
3. State the rule, the conflict, and the proposed resolution
4. Wait for approval before proceeding

---

*Last updated: Initial planning phase — rules established for all implementation tasks.*
