# /agent — Project Development Management Directory

## What Is This Directory?

The `/agent` directory is the **single source of truth** for the development execution of the Velora AI website. It is not application code. It contains structured planning, architecture decisions, task management, and progress tracking documents that guide the agent (AI developer) through the project lifecycle.

This directory exists to enforce **deliberate, sequential, documented** software development rather than one-pass code generation.

---

## Directory Structure

```
/agent
├── README.md               ← You are here. Development workflow guide.
├── PROJECT_CONTEXT.md      ← Product requirements, goals, constraints
├── ARCHITECTURE.md         ← Technical architecture decisions
├── DESIGN_SYSTEM.md        ← Visual language, tokens, typography rules
├── TASKS.md                ← Sequential task list (the execution roadmap)
├── DECISIONS.md            ← Architecture Decision Records (ADR log)
├── PROGRESS.md             ← Live progress tracker
├── API_CONTRACT.md         ← Frontend API contract specification
├── SIGNAL_STATE_MACHINE.md ← Signal lifecycle and state transitions
├── TEST_PLAN.md            ← Testing strategy and acceptance criteria
└── IMPLEMENTATION_RULES.md ← Coding rules for the agent
```

---

## How This Directory Should Be Used

### Before Every Task
1. Open `TASKS.md` — identify the current task and verify its dependencies are `[x] COMPLETE`.
2. Read `PROGRESS.md` — confirm there are no blockers.
3. Read the relevant sections in `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, or `API_CONTRACT.md` as needed for the task.
4. Never start a task whose dependencies are incomplete or `[!] BLOCKED`.

### During Every Task
1. Work exclusively on files specified in the task's "Files likely affected" list.
2. Do not modify unrelated files.
3. Record any decisions made in `DECISIONS.md`.
4. If a blocker is encountered, update `PROGRESS.md` and mark the task `[!] BLOCKED`.

### After Every Task
1. Verify all acceptance criteria listed in the task are satisfied.
2. Update the task status in `TASKS.md` from `[~] IN PROGRESS` to `[x] COMPLETE`.
3. Update `PROGRESS.md` with the current phase, completed task, and next task.
4. If any technical debt was incurred, note it in `PROGRESS.md`.
5. If any architectural decision was made, record it in `DECISIONS.md`.

---

## Development Workflow

```
PLAN → AUDIT → DOCUMENT → SEQUENCE → IMPLEMENT → VERIFY → PROGRESS UPDATE → NEXT TASK
```

1. **PLAN**: Understand the full product context (`PROJECT_CONTEXT.md`)
2. **AUDIT**: Inspect the existing repository (structure, dependencies, config)
3. **DOCUMENT**: Populate all `/agent` files before any code is written
4. **SEQUENCE**: Confirm task ordering in `TASKS.md` respects the dependency graph
5. **IMPLEMENT**: Execute one task at a time
6. **VERIFY**: Satisfy every acceptance criterion before marking complete
7. **PROGRESS UPDATE**: Update `PROGRESS.md` and `TASKS.md`
8. **NEXT TASK**: Select the next unblocked `[ ] TODO` task

---

## Task Execution Rules

- **One task at a time.** Do not start multiple implementation tasks simultaneously.
- **Dependencies first.** Never execute a task if its listed dependencies are not `[x] COMPLETE`.
- **Acceptance criteria are mandatory.** A task is not complete until every criterion is satisfied.
- **No silent assumptions.** If a requirement is unclear, mark it `UNSPECIFIED` and ask before implementing.
- **No unilateral scope changes.** Do not add features not in the task definition without approval.
- **No dead code.** Every file created during a task must serve the task's goal.
- **No secret leakage.** Never embed credentials, tokens, or keys in frontend code.

---

## Documentation Rules

| Document | When to Update |
|---|---|
| `TASKS.md` | When task status changes (start, complete, block) |
| `PROGRESS.md` | After every completed task |
| `DECISIONS.md` | When any significant architectural decision is made |
| `API_CONTRACT.md` | When API shape is confirmed, refined, or corrected |
| `SIGNAL_STATE_MACHINE.md` | When signal lifecycle is clarified or changed |
| `DESIGN_SYSTEM.md` | When new tokens or patterns are established |
| `IMPLEMENTATION_RULES.md` | When new critical rules emerge from experience |

---

## How the Agent Determines the Next Task

1. Open `TASKS.md`.
2. Find all tasks with status `[ ] TODO`.
3. Filter for tasks whose **all dependencies** are `[x] COMPLETE`.
4. Select the task with the **lowest ID number** among eligible tasks.
5. Verify the task is not `[!] BLOCKED`.
6. Begin execution.

If no eligible task exists:
- Check for `[!] BLOCKED` tasks and resolve blockers first.
- If all tasks are complete, report to the user for new instructions.

---

## Escalation

If any of the following occur, **stop and report to the user before continuing**:
- A required dependency is undefined or unknowable
- An API shape contradicts the contract
- A design decision requires product-level input
- A security risk is identified
- A task cannot be completed without inventing undocumented behavior

---

*Last updated: Initial planning phase — TASK-001 not yet started.*
