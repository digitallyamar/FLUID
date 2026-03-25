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
- Button deep dive doc: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/docs/academy/button-component-deep-dive.md`
- Package usage tutorial: `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/docs/academy/fluid-package-usage-tutorial.md`

Note:
- `IDEA.md` and the implementation plan are now committed and pushed to origin for long-term reference.

## Progress Snapshot

Latest important commits on `feature/fluid-v1-implementation`:

- `3aee4e2` feat: add tier-b and tier-c components with maturity metadata
- `6309e67` docs: add academy tutorial for package usage in sample app
- `b17bc69` docs: expand button deep dive with guided learning notes
- `e292757` docs: add button deep dive and refresh handoff prompt
- `25bf0d6` docs: add academy structure map and mobile backlog notes
- `8b85fd5` docs: pin backlog index as first academy backlog entry
- `89c4baf` docs: add academy backlog subsection and index
- `f3f2a02` docs: enforce academy index coverage for all notes

Remote status:
- `feature/fluid-v1-implementation` has been pushed to `origin`.

## Uncommitted Items At Handoff

Uncommitted items are session-dependent. Do not trust old snapshots in this guide.

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
We are continuing FLUID development + guided learning from an existing worktree.

Use this exact working directory:
/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation

Please read these first before making any change:
1) docs/superpowers/specs/2026-03-25-fluid-v1-design.md
2) docs/superpowers/plans/2026-03-25-fluid-v1-implementation.md
3) docs/academy/first-principles-web-fundamentals.md
4) docs/academy/session-handoff-guide.md
5) docs/academy/button-component-deep-dive.md

Project rule (must enforce every session):
- Any new file under `docs/academy/` MUST be added to the `/academy` route index in `apps/docs/src/DocsApp.tsx`.
- Any backlog-type academy note MUST also be listed in `docs/academy/backlog-index.md` and surfaced under the Academy Backlogs section (`/academy`).

Learning-mode rule for this session:
- Explain code in short, layman terms, interactively, one line at a time.
- After each confirmed explanation, append that understanding into `docs/academy/button-component-deep-dive.md`.
- Do not create notes for blank lines; any skipped/missing line numbers in the deep-dive notes are implicitly blank lines.
- Current thread to resume: `packages/fluid-react/src/headless/button/useButton.ts`, line 1 explained; continue from line 2.

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
npm run test:e2e -- tests/e2e/button-docs.spec.ts tests/e2e/docs-catalog.spec.ts tests/e2e/tier-a-a11y.spec.ts tests/e2e/tier-b-a11y.spec.ts tests/e2e/docs-academy.spec.ts
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
