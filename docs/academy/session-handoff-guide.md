# Session Handoff Guide

## Purpose

Use this guide to start a new chat/session and continue FLUID development without losing context.

## Current Working Location

- Repo root: `/home/amar/dev/FLUID`
- Active implementation worktree: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation`
- Active branch: `feature/fluid-v1-implementation`

## Current Project Artifacts

- Idea: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/IDEA.md`
- Design spec: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/docs/superpowers/specs/2026-03-25-fluid-v1-design.md`
- Implementation plan: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/docs/superpowers/plans/2026-03-25-fluid-v1-implementation.md`
- Learning doc: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/docs/academy/first-principles-web-fundamentals.md`

Note:
- `IDEA.md` and the implementation plan are now committed and pushed to origin for long-term reference.

## Progress Snapshot

Latest important commits on `feature/fluid-v1-implementation`:

- `71e4c3a` feat: add academy index route with note links
- `b410d45` docs: add first-principles academy page in docs app
- `a101d75` fix: differentiate modal docs states
- `99ff936` fix: improve button interaction feedback and card section differentiation
- `97adc0e` feat: add interactive docs sections and component catalog navigation
- `3a6aaf4` feat: add docs catalog and apply FLUID component styles
- `1037341` feat: render real FLUID components in docs app
- `a779a05` feat: deliver remaining tier-a component set

Remote status:
- `feature/fluid-v1-implementation` has been pushed to `origin`.

## Uncommitted Items At Handoff

At the time this guide was written, this branch also had local uncommitted files:

- Modified: `docs/superpowers/specs/2026-03-25-fluid-v1-design.md`
- Untracked: `IDEA.md`
- Untracked dir: `docs/superpowers/plans/`

Before continuing, always run:

```bash
cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation
git status --short
```

## How To Start A New Session

1. Open a new chat/session.
2. Paste the starter prompt below.
3. Let the agent read the referenced files first.
4. Continue from the last unfinished plan task.

### New Session Starter Prompt

```text
We are continuing FLUID development from an existing worktree.

Use this exact working directory:
/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation

Please read these first before making any change:
1) docs/superpowers/specs/2026-03-25-fluid-v1-design.md
2) docs/superpowers/plans/2026-03-25-fluid-v1-implementation.md
3) docs/academy/first-principles-web-fundamentals.md
4) docs/academy/session-handoff-guide.md

Then run:
git status --short
git branch --show-current
git log --oneline -n 20

After that, summarize:
- what is already done,
- what is left in the implementation plan,
- any uncommitted changes that need handling.

Do not reset or discard any local changes.
```

## Local Run / Verification Commands

```bash
cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation
npm install
npm run -w @fluid-ui/react build
npm run test:unit
npm run test:e2e -- tests/e2e/button-docs.spec.ts tests/e2e/docs-catalog.spec.ts tests/e2e/tier-a-a11y.spec.ts tests/e2e/docs-academy.spec.ts
npm run -w @fluid-ui/docs start -- --port 3000
```

Useful URLs:

- `http://localhost:3000/`
- `http://localhost:3000/components`
- `http://localhost:3000/academy`
- `http://localhost:3000/academy/first-principles`
- `http://localhost:3000/academy/session-handoff`

## Git Safety Notes

- Work is happening in a git worktree branch, not `main`.
- `.worktrees/` is ignored at parent workspace level, but files inside this worktree are tracked normally in this branch.
- This branch is already pushed:

```bash
cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation
git push -u origin feature/fluid-v1-implementation
```

To push newer commits made after this checkpoint:

```bash
cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation
git push
```
