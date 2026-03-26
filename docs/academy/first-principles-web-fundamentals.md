# First-Principles Web Development Notes

## Why This Document Exists

Goal: build deep, first-principles understanding of web development while building FLUID.

Method:
- Start from physics-level constraints (network, browser runtime, rendering).
- Build upward to abstractions (React, build tools, component libraries).
- Always map theory to concrete files in this repo.

---

## 1) The Smallest Mental Model of the Web

A web app exists because four systems cooperate:

1. Client machine (browser runtime)
2. Network (HTTP request/response)
3. Server (returns HTML/CSS/JS/data)
4. Storage/services (database, cache, auth, APIs)

If any one fails, app behavior fails.

First principle:
- A web page is not magic; it is just bytes sent over a network and interpreted by a browser.

---

## 2) Browser: What It Actually Does

Given HTML, CSS, and JS, browser does:

1. Parse HTML -> DOM tree
2. Parse CSS -> CSSOM
3. Combine DOM + CSSOM -> Render Tree
4. Layout -> compute geometry
5. Paint -> draw pixels
6. Composite -> put layers on screen

JS can mutate DOM/CSSOM and trigger new layout/paint cycles.

First principle:
- UI performance and correctness are constrained by this pipeline.
- Frameworks do not replace it; they orchestrate it.

---

## 3) JavaScript Runtime Basics

In browser:
- Single main thread for most UI work
- Event loop schedules tasks
- Async APIs (fetch, timers) enqueue callbacks/promises

In Node.js:
- Also event-loop based, but without browser rendering pipeline
- Used for tooling, servers, build systems, scripts

First principle:
- “Frontend” and “backend” JS share language, but run in different environments with different APIs and constraints.

---

## 4) Why React Exists

Without React:
- You manually mutate DOM and state wiring becomes hard at scale.

React model:
- UI = f(state)
- You describe desired UI for current state.
- React computes minimal DOM updates after state changes.

Key ideas:
- Components: reusable UI units
- Props: input to components
- State: local mutable data that triggers re-render
- Events: user/system actions updating state

First principle:
- React is a deterministic state-to-UI mapping system with update scheduling.

---

## 5) Why We Split Headless vs Styled Components

In FLUID:
- `headless/`: behavior and semantics
- `styled/`: visual presentation and theme classes

Why:
- Behavior stability + visual flexibility
- Easier testing of logic
- Easier theming for different client domains

First principle:
- Separate “what it does” from “how it looks” to reduce coupling and improve reuse.

---

## 6) How Styling Works in This Repo

Source of styles:
- `packages/fluid-react/src/styles/tailwind/index.css`

Build output:
- `packages/fluid-react/src/styles/dist/fluid.css`

Docs app imports CSS here:
- `apps/docs/src/main.tsx`

If you see bare HTML look, check:
1. Was `@fluid-ui/react` rebuilt?
2. Is `fluid.css` imported in docs app?
3. Is browser cache stale?

---

## 7) How Docs Rendering Works in This Repo

Current docs runtime:
- Vite + React app in `apps/docs`
- Routing is currently pathname-switch logic in:
  - `apps/docs/src/DocsApp.tsx`

Important:
- This is a minimal educational docs runtime, not a final production docs architecture yet.

First principle:
- Any docs page is “just another React app route” that composes components.

---

## 8) Testing Model We Use Right Now

Unit tests (logic/component behavior):
- Vitest in `tests/unit`

E2E tests (browser behavior):
- Playwright in `tests/e2e`

Why both:
- Unit tests are fast and localize logic failures.
- E2E tests verify real browser/runtime integration.

First principle:
- Confidence requires multiple test layers because failures happen at different boundaries.

---

## 9) Practical “Start Here” Learning Path (This Week)

1. Read:
- `packages/fluid-react/src/styled/button/Button.tsx`
- `packages/fluid-react/src/headless/button/useButton.ts`
- `apps/docs/src/DocsApp.tsx`

2. Run and inspect:
- `npm run -w @fluid-ui/react build`
- `npm run -w @fluid-ui/docs start -- --port 3000`
- open `http://localhost:3000/components/button`

3. Verify behavior:
- `npm run test:unit`
- `npm run test:e2e -- tests/e2e/button-docs.spec.ts`

4. Ask one “why” question per file:
- “Why does this file exist?”
- “What boundary does it enforce?”
- “What breaks if I remove it?”

---

## 10) Your Question Protocol (Use This Anytime)

When you ask questions, use this format:

1. What is this thing?
2. Why do we need it?
3. What problem does it solve?
4. What fails without it?
5. What simpler alternative exists and why not choose it?

I will answer in same structured form for each topic.

---

## Next Chapters (To Expand)

- HTTP from first principles (methods, headers, caching, cookies)
- Browser storage and auth/session model
- SSR vs CSR vs hydration
- Bundlers/transpilers/module resolution
- API design and backend integration patterns
- Database and consistency basics for web apps
