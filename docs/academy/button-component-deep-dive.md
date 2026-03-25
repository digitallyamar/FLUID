# Button Component Deep Dive

## Scope

This note explains all code currently associated with FLUID's `Button` component and how those pieces connect.

---

## 1) Where The Button Code Lives

Primary files:

1. `packages/fluid-react/src/headless/button/useButton.ts`
2. `packages/fluid-react/src/styled/button/types.ts`
3. `packages/fluid-react/src/styled/button/Button.tsx`
4. `packages/fluid-react/src/index.ts`
5. `apps/docs/src/DocsApp.tsx` (usage examples)
6. `tests/unit/button.test.tsx` (unit behavior checks)
7. `tests/e2e/button-docs.spec.ts` (browser-level checks)

---

## 2) First-Principles Purpose Of Each File

## Beginner Line-by-Line Notes (`useButton.ts`)

### Line 1

Code:
- `import type { ButtonHTMLAttributes } from "react";`

Layman explanation:
- We are importing a TypeScript "rulebook" for HTML `<button>` props.
- This rulebook says which fields are valid for a button, like `onClick`, `disabled`, `type`, and `aria-label`.
- These rules come from React's TypeScript definitions (which mirror browser button attributes).
- `import type` means this import is only for code checking and autocomplete during development.
- It is removed from the final JavaScript bundle, so it does not run in the browser.

## `useButton.ts` (headless behavior)

What it does:
- Produces basic behavior props (`type`, `disabled`, `onClick`) from incoming button props.

Why it exists:
- Keeps behavioral defaults in a reusable layer separate from visual rendering.

Key idea:
- Behavior is independent of how the button looks.

## `types.ts` (styled button type contract)

What it does:
- Defines `ButtonProps` currently based on native HTML button attributes.

Why it exists:
- Gives typed boundary for styled component API.

## `Button.tsx` (styled rendering)

What it does:
- Renders actual `<button>`.
- Uses `React.forwardRef`.
- Composes incoming props + `useButton` behavior + FLUID CSS classes.

Why it exists:
- This is the visual/public component implementation consumers use.

## `src/index.ts` (public export)

What it does:
- Re-exports `Button` and `ButtonProps` for package consumers.

Why it exists:
- Stable public API surface.

## `DocsApp.tsx` (docs examples)

What it does:
- Creates sectioned examples for `Default`, `Variants`, `Disabled`, `Theming`, `Accessibility`.
- Tracks click counters for visual interaction confirmation.

Why it exists:
- Makes behavior and visual states easy to inspect manually in browser.

## tests

`tests/unit/button.test.tsx`:
- Verifies click + keyboard activation + native prop forwarding.

`tests/e2e/button-docs.spec.ts`:
- Verifies docs route sections and rendered button presence/style expectations.

---

## 3) Execution Flow (Runtime)

When docs page renders a Button:

1. `DocsApp.tsx` creates `<Button ...>`.
2. `Button.tsx` receives props and calls `useButton(props)`.
3. `useButton` returns normalized behavior fields.
4. `Button.tsx` renders `<button>` with classes (e.g., `fluid-btn`).
5. CSS from `fluid.css` gives visual style and press animation.
6. User click triggers onClick -> docs state updates counter.

---

## 4) Styling Path For Button

Source styles:
- `packages/fluid-react/src/styles/tailwind/index.css`

Build artifact:
- `packages/fluid-react/src/styles/dist/fluid.css`

Docs import:
- `apps/docs/src/main.tsx` imports FLUID CSS.

Important:
- If button looks bare, check CSS import and rebuild (`npm run -w @fluid-ui/react build`).

---

## 5) Current Button Behavior Guarantees

From current tests and implementation, we guarantee:

1. Button defaults to native button behavior with explicit `type` fallback.
2. Click handler works.
3. Keyboard activation (`Enter` on focused button) works in tests.
4. Native attributes like `aria-label` pass through.
5. Disabled state does not show active/hover animation.

---

## 6) Known Limitations / Future Hardening

Possible future improvements:

1. More explicit variant API (`variant="primary|secondary|..."`) instead of class-based examples.
2. Better separation of docs-demo state from component internals.
3. Add accessibility assertions for disabled semantics in unit tests.
4. Add visual regression snapshots for button states.

---

## 7) Review Checklist For Any Button Change

Before finalizing a button change:

1. Does it alter behavior layer (`useButton`) or styling layer (`Button.tsx`/CSS)?
2. Are public exports still stable in `src/index.ts`?
3. Do unit tests still pass (`tests/unit/button.test.tsx`)?
4. Does docs route still show all sections properly?
5. Does e2e still pass (`tests/e2e/button-docs.spec.ts`)?
