# First-Principles Question Bank

Use these questions whenever you read a component, module, or feature in this repo.

## Core First-Principles Questions

1. What is this thing?
2. Why do we need it?
3. What problem does it solve?
4. What breaks if we remove it?
5. What simpler alternative exists, and why not choose it?
6. What assumptions does it rely on?
7. What are its inputs and outputs?
8. Where does state live, and who owns it?
9. What are failure modes at runtime?
10. How do we verify it works (unit/e2e/manual)?

## Web-Development Specific Questions

1. Is this browser concern, server concern, or build-time concern?
2. Which rendering stage does this affect (DOM, layout, paint, events)?
3. Does this affect accessibility semantics?
4. What is guaranteed by platform vs framework vs our code?
5. What contract does this module expose to others?
6. Is behavior coupled with styling here?
7. What will scale poorly if usage grows 10x?

## Usage Protocol For Discussions

For each new topic:

1. Pick one file or component.
2. Answer the 10 core questions first.
3. Then answer the 7 web-specific questions.
4. End with:
   - top 3 risks,
   - top 3 simplifications,
   - top 3 tests to trust behavior.

## Suggested Start Files in FLUID

1. `packages/fluid-react/src/headless/button/useButton.ts`
2. `packages/fluid-react/src/styled/button/Button.tsx`
3. `apps/docs/src/DocsApp.tsx`
4. `tests/unit/tier-a/components.test.tsx`
