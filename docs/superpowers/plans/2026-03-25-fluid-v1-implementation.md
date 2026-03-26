# FLUID V1 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and release FLUID V1 P0 as a production-usable React component package (`@fluid-ui/react`) with tiered components, docs, tests, and dual styling consumption (Tailwind + prebuilt CSS).

**Architecture:** Use a single-package repo with strict internal boundaries: `headless` behavior, `styled` presentation, `tokens` contract, and build artifacts (`fluid.css`, tailwind preset). Ship a thin vertical slice first, then expand Tier A/B/C with explicit quality gates and release automation.

**Tech Stack:** React 19, TypeScript 5.6, Vite 5, Tailwind CSS 4, Vitest, React Testing Library, Playwright, Next.js 15 (docs app).

## Status Sync (2026-03-26)

- `feature/fluid-v1-implementation` was merged into `main` via `eff1558`.
- Task 8, Task 9, and Task 10 Step 4/5/6 are complete.
- Final verification gate command groups were run successfully before merge.
- The optional "release candidate commit" step was intentionally skipped in favor of direct merge to `main`.

---

## Scope Guard

This plan implements **P0 only** from the spec at `/home/amar/dev/FLUID/docs/superpowers/specs/2026-03-25-fluid-v1-design.md`.

Out of scope for this plan:
- AI style preset generation engine
- Publicly hosted lab product
- Non-React runtime support

## File Structure Map

Planned top-level structure and responsibilities:

- `package.json`: workspace scripts, toolchain commands, release scripts.
- `packages/fluid-react/package.json`: publish surface for `@fluid-ui/react`.
- `packages/fluid-react/src/headless/*`: behavior primitives only.
- `packages/fluid-react/src/styled/*`: Tailwind-based visual layer.
- `packages/fluid-react/src/tokens/*`: token contract, validators, presets.
- `packages/fluid-react/src/styles/tailwind/*`: Tailwind source and preset bridge.
- `packages/fluid-react/src/styles/dist/fluid.css`: emitted CSS artifact.
- `packages/fluid-react/src/index.ts`: root exports only.
- `packages/fluid-react/src/headless/index.ts`: headless exports only.
- `packages/fluid-react/src/tokens/index.ts`: token exports only.
- `packages/fluid-react/src/tailwind-preset.ts`: preset export only.
- `apps/docs/*`: component docs, examples, and a11y demos.
- `tests/unit/*`: unit + interaction tests.
- `tests/e2e/*`: docs smoke tests.
- `docs/academy/*`: concept briefs, decision logs, and deep dives.

Use @test-driven-development for every implementation task and @verification-before-completion before each commit.

## Chunk 1: Foundation and First Vertical Slice

### Task 1: Bootstrap Repo and Lock Versions

**Files:**
- Create: `/home/amar/dev/FLUID/package.json`
- Create: `/home/amar/dev/FLUID/tsconfig.base.json`
- Create: `/home/amar/dev/FLUID/.gitignore`
- Create: `/home/amar/dev/FLUID/pnpm-workspace.yaml`

- [ ] **Step 1: Write failing workspace smoke test**

```ts
// /home/amar/dev/FLUID/tests/unit/workspace-smoke.test.ts
import { describe, expect, it } from "vitest";
import pkg from "../../package.json";

describe("workspace metadata", () => {
  it("locks React 19 and TypeScript 5.6 ranges", () => {
    expect(pkg.devDependencies.react).toBe("^19.0.0");
    expect(pkg.devDependencies.typescript).toBe("^5.6.0");
  });
});
```

- [ ] **Step 2: Run test to confirm failure**

Run: `npm run test:unit -- tests/unit/workspace-smoke.test.ts`
Expected: FAIL because workspace files/scripts are missing.

- [ ] **Step 3: Add minimal workspace config**

```json
{
  "name": "fluid",
  "private": true,
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "build": "npm run -w @fluid-ui/react build",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "lint": "eslint .",
    "typecheck": "tsc -b"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 4: Re-run workspace smoke test**

Run: `npm run test:unit -- tests/unit/workspace-smoke.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add package.json tsconfig.base.json .gitignore pnpm-workspace.yaml tests/unit/workspace-smoke.test.ts
git commit -m "chore: bootstrap workspace and lock core versions"
```

### Task 2: Create `@fluid-ui/react` Package Skeleton and Export Contracts

**Files:**
- Create: `/home/amar/dev/FLUID/packages/fluid-react/package.json`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/index.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/headless/index.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tokens/index.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tailwind-preset.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/styled/button/Button.tsx`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/styled/button/types.ts`
- Test: `/home/amar/dev/FLUID/tests/unit/entrypoints.test.ts`

- [ ] **Step 1: Write failing entrypoint test**

```ts
import { describe, expect, it } from "vitest";
import * as root from "../../packages/fluid-react/src/index";
import * as headless from "../../packages/fluid-react/src/headless";
import * as tokens from "../../packages/fluid-react/src/tokens";
import { createTailwindPreset } from "../../packages/fluid-react/src/tailwind-preset";

describe("entrypoints", () => {
  it("exposes required public entrypoints", () => {
    expect(root).toHaveProperty("Button");
    expect(headless).toHaveProperty("useButton");
    expect(tokens).toHaveProperty("createTheme");
  });

  it("exposes tailwind preset contract", () => {
    const preset = createTailwindPreset({
      color: { primary: "#111111" },
      spacing: { md: "16px" },
      radius: { md: "8px" },
      typography: { body: "16px/1.5" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,.1)" },
      motion: { fast: "120ms" }
    });
    expect(preset.theme.extend.colors.primary).toBe("#111111");
  });

  it("declares tailwind preset export map", async () => {
    const pkg = await import("../../packages/fluid-react/package.json");
    expect(pkg.default.exports["./tailwind-preset"]).toBe("./dist/tailwind-preset.js");
  });
});
```

- [ ] **Step 2: Run test to confirm failure**

Run: `npm run test:unit -- tests/unit/entrypoints.test.ts`
Expected: FAIL due to missing exports.

- [ ] **Step 3: Implement minimal export scaffolding**

`packages/fluid-react/package.json` baseline:

```json
{
  "name": "@fluid-ui/react",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./headless": "./dist/headless/index.js",
    "./tokens": "./dist/tokens/index.js",
    "./tailwind-preset": "./dist/tailwind-preset.js",
    "./styles.css": "./src/styles/dist/fluid.css"
  }
}
```

```ts
// src/index.ts
export { Button } from "./styled/button/Button";
export type { ButtonProps } from "./styled/button/types";
```

```tsx
// src/styled/button/Button.tsx
import type { ButtonProps } from "./types";

export function Button({ children }: ButtonProps) {
  return <button type="button">{children}</button>;
}
```

```ts
// src/styled/button/types.ts
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
```

```ts
// src/headless/index.ts
export { useButton } from "./button/useButton";
export type { UseButtonOptions } from "./button/types";
```

```ts
// src/tokens/index.ts
export { createTheme } from "./createTheme";
export type { ThemeContract } from "./contract";
```

```ts
// src/tailwind-preset.ts
import type { ThemeContract } from "./tokens/contract";

export function createTailwindPreset(theme: ThemeContract) {
  return {
    theme: {
      extend: {
        colors: theme.color,
        spacing: theme.spacing,
        borderRadius: theme.radius,
        boxShadow: theme.shadow
      }
    }
  };
}
```

- [ ] **Step 4: Re-run unit test**

Run: `npm run test:unit -- tests/unit/entrypoints.test.ts`
Expected: PASS.

Note:
- Public package import smoke (`@fluid-ui/react/tailwind-preset`) is verified in Task 5 after dist artifacts exist.

- [ ] **Step 5: Commit**

```bash
git add packages/fluid-react/package.json packages/fluid-react/src tests/unit/entrypoints.test.ts
git commit -m "feat: add fluid-react package skeleton and entrypoints"
```

### Task 3: Implement Token Contract and Validation

**Files:**
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tokens/contract.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tokens/createTheme.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tokens/presets/construction.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/tokens/presets/medicine.ts`
- Test: `/home/amar/dev/FLUID/tests/unit/tokens.test.ts`

- [ ] **Step 1: Write failing token tests (happy + invalid input)**

```ts
import { describe, expect, it } from "vitest";
import {
  constructionPreset,
  createTheme,
  medicinePreset
} from "../../packages/fluid-react/src/tokens";

describe("createTheme", () => {
  it("returns validated theme", () => {
    const theme = createTheme({
      color: { primary: "#0f172a", surface: "#ffffff" },
      spacing: { sm: "8px", md: "16px" },
      radius: { md: "8px" },
      typography: { body: "16px/1.5" },
      shadow: { sm: "0 1px 2px rgba(0,0,0,0.1)" },
      motion: { fast: "120ms" }
    });
    expect(theme.color.primary).toBe("#0f172a");
  });

  it("throws on invalid token shape", () => {
    expect(() => createTheme({ color: {} } as never)).toThrow(/missing/i);
  });

  it("exports built-in domain presets", () => {
    for (const preset of [constructionPreset, medicinePreset]) {
      expect(preset.color.primary).toBeTruthy();
      expect(preset.spacing.md).toBeTruthy();
      expect(preset.radius.md).toBeTruthy();
      expect(preset.typography.body).toBeTruthy();
      expect(preset.shadow.sm).toBeTruthy();
      expect(preset.motion.fast).toBeTruthy();
    }
  });
});
```

- [ ] **Step 2: Run tests to confirm failure**

Run: `npm run test:unit -- tests/unit/tokens.test.ts`
Expected: FAIL (functions not implemented).

- [ ] **Step 3: Implement contract + validator**

```ts
export type ThemeContract = {
  color: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  typography: Record<string, string>;
  shadow: Record<string, string>;
  motion: Record<string, string>;
};

export function createTheme(input: Partial<ThemeContract>): ThemeContract {
  const required = ["color", "spacing", "radius", "typography", "shadow", "motion"] as const;
  for (const key of required) {
    if (!input[key] || Object.keys(input[key] as object).length === 0) {
      throw new Error(`missing token group: ${key}`);
    }
  }
  return input as ThemeContract;
}
```

```ts
// src/tokens/index.ts
export { createTheme } from "./createTheme";
export type { ThemeContract } from "./contract";
export { constructionPreset } from "./presets/construction";
export { medicinePreset } from "./presets/medicine";
```

```ts
// src/tokens/presets/construction.ts
import { createTheme } from "../createTheme";

export const constructionPreset = createTheme({
  color: { primary: "#1f2937", surface: "#ffffff" },
  spacing: { sm: "8px", md: "16px" },
  radius: { md: "6px" },
  typography: { body: "16px/1.5" },
  shadow: { sm: "0 1px 2px rgba(0,0,0,.12)" },
  motion: { fast: "120ms" }
});
```

```ts
// src/tokens/presets/medicine.ts
import { createTheme } from "../createTheme";

export const medicinePreset = createTheme({
  color: { primary: "#0f766e", surface: "#ffffff" },
  spacing: { sm: "8px", md: "16px" },
  radius: { md: "8px" },
  typography: { body: "16px/1.5" },
  shadow: { sm: "0 1px 2px rgba(15,118,110,.2)" },
  motion: { fast: "120ms" }
});
```

- [ ] **Step 4: Re-run tests**

Run: `npm run test:unit -- tests/unit/tokens.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/fluid-react/src/tokens tests/unit/tokens.test.ts
git commit -m "feat: add token contract and validation"
```

### Task 4: Build First Tier A Component (Button) End-to-End

**Files:**
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/headless/button/useButton.ts`
- Modify: `/home/amar/dev/FLUID/packages/fluid-react/src/styled/button/Button.tsx`
- Modify: `/home/amar/dev/FLUID/packages/fluid-react/src/styled/button/types.ts`
- Create: `/home/amar/dev/FLUID/apps/docs/app/components/button/page.tsx`
- Test: `/home/amar/dev/FLUID/tests/unit/button.test.tsx`
- Test: `/home/amar/dev/FLUID/tests/e2e/button-docs.spec.ts`

- [ ] **Step 1: Write failing behavior + accessibility tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../packages/fluid-react/src";

describe("Button", () => {
  it("fires click and supports keyboard activation", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("forwards native props", () => {
    render(<Button aria-label="save-btn" data-testid="save-btn">Save</Button>);
    expect(screen.getByTestId("save-btn")).toHaveAttribute("aria-label", "save-btn");
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm run test:unit -- tests/unit/button.test.tsx`
Expected: FAIL (missing component/hook).

- [ ] **Step 3: Implement minimal headless + styled button**

```ts
// useButton.ts
export function useButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return {
    type: props.type ?? "button",
    disabled: props.disabled ?? false,
    onClick: props.onClick
  };
}
```

```tsx
// Button.tsx
import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    const behavior = useButton(props);
    return (
      <button ref={ref} {...props} {...behavior} className={`fluid-btn ${className}`.trim()}>
        {children}
      </button>
    );
  }
);
```

- [ ] **Step 4: Add docs page with usage + theming examples**

Run and implement in `apps/docs/app/components/button/page.tsx` with:
- default
- variants
- disabled state
- token-themed example
- accessibility notes

- [ ] **Step 5: Re-run tests**

Run: `npm run test:unit -- tests/unit/button.test.tsx`
Expected: PASS.

- [ ] **Step 6: Verify docs page route renders**

Run: `npm run test:e2e -- tests/e2e/button-docs.spec.ts`
Expected: PASS with:
- visible sections: `Default`, `Variants`, `Disabled`, `Theming`, `Accessibility`
- automated accessibility assertion: no critical violations via axe check on `/components/button`

- [ ] **Step 7: Commit**

```bash
git add packages/fluid-react/src/headless/button packages/fluid-react/src/styled/button apps/docs/app/components/button/page.tsx tests/unit/button.test.tsx tests/e2e/button-docs.spec.ts
git commit -m "feat: deliver tier-a button vertical slice"
```

### Task 4A: Chunk 1 Academy Deliverables

**Files:**
- Create: `/home/amar/dev/FLUID/docs/academy/concept-briefs/chunk-1-foundation.md`
- Modify: `/home/amar/dev/FLUID/docs/academy/decision-log.md`
- Create: `/home/amar/dev/FLUID/docs/academy/deep-dives/chunk-1-react-and-build-basics.md`

- [ ] **Step 1: Add concept brief for foundation choices**

Document:
- why React 19 + TS 5.6 were locked
- why headless/styled/tokens boundaries are enforced
- why tailwind preset is exported as a package contract

- [ ] **Step 2: Add decision log entries for Task 1-4**

Include:
- chosen option
- rejected alternatives
- revisit trigger

- [ ] **Step 3: Add post-code deep dive**

Cover:
- React event handling and keyboard activation for Button
- token validation runtime model
- build entrypoint/public contract model

- [ ] **Step 4: Verify academy docs existence**

Run: `rg -n "Why React 19 and TypeScript 5.6|Boundary Model: headless/styled/tokens|## Decision|## Revisit Trigger|React Keyboard Activation Model|Build Contract Surface" docs/academy/concept-briefs/chunk-1-foundation.md docs/academy/decision-log.md docs/academy/deep-dives/chunk-1-react-and-build-basics.md`
Expected: PASS with concrete headings and content markers:
- `## Why React 19 and TypeScript 5.6`
- `## Boundary Model: headless/styled/tokens`
- `## Decision` and `## Revisit Trigger`
- `## React Keyboard Activation Model`
- `## Build Contract Surface`

- [ ] **Step 5: Commit**

```bash
git add docs/academy/concept-briefs/chunk-1-foundation.md docs/academy/decision-log.md docs/academy/deep-dives/chunk-1-react-and-build-basics.md
git commit -m "docs: add chunk-1 academy learning artifacts"
```

## Chunk 2: Build System, Tier Coverage, and Release Readiness

### Task 5: Add CSS Build and Tailwind Preset Artifacts

**Files:**
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/styles/tailwind/index.css`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/src/styles/tailwind/preset.ts`
- Create: `/home/amar/dev/FLUID/packages/fluid-react/vite.config.ts`
- Modify: `/home/amar/dev/FLUID/packages/fluid-react/package.json`
- Test: `/home/amar/dev/FLUID/tests/unit/build-artifacts.test.ts`

- [ ] **Step 1: Write failing build artifact test**

```ts
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("build artifacts", () => {
  it("produces fluid.css and tailwind preset export", () => {
    expect(existsSync("packages/fluid-react/dist/index.js")).toBe(true);
    expect(existsSync("packages/fluid-react/dist/index.d.ts")).toBe(true);
    expect(existsSync("packages/fluid-react/src/styles/dist/fluid.css")).toBe(true);
    expect(existsSync("packages/fluid-react/dist/tailwind-preset.js")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test and confirm failure**

Run: `npm run test:unit -- tests/unit/build-artifacts.test.ts`
Expected: FAIL (no artifacts yet).

- [ ] **Step 3: Implement build pipeline**

Add Vite config to emit:
- JS entrypoints
- d.ts files
- copied/generated `src/styles/dist/fluid.css`
- `dist/tailwind-preset.js` export

- [ ] **Step 4: Build package and re-run test**

Run:
- `npm run -w @fluid-ui/react build`
- `npm run test:unit -- tests/unit/build-artifacts.test.ts`
- `node -e "import('./packages/fluid-react/dist/index.js').then(()=>console.log('root-ok'))"`
- `node -e "import('./packages/fluid-react/dist/tailwind-preset.js').then(()=>console.log('preset-ok'))"`

Expected: all PASS (`root-ok` and `preset-ok` printed).

- [ ] **Step 5: Commit**

```bash
git add packages/fluid-react/vite.config.ts packages/fluid-react/src/styles packages/fluid-react/package.json tests/unit/build-artifacts.test.ts
git commit -m "feat: add css and tailwind preset build artifacts"
```

### Task 6: Deliver Remaining Tier A Components

**Files:**
- Create/Modify under `/home/amar/dev/FLUID/packages/fluid-react/src/headless/*`
- Create/Modify under `/home/amar/dev/FLUID/packages/fluid-react/src/styled/*`
- Create docs pages under `/home/amar/dev/FLUID/apps/docs/app/components/*`
- Test: `/home/amar/dev/FLUID/tests/unit/tier-a/*.test.tsx`
- Test: `/home/amar/dev/FLUID/tests/e2e/tier-a-a11y.spec.ts`

Tier A target set:
- IconButton, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Card, Modal

- [ ] **Step 1: Add failing tests for each Tier A component**

Test matrix per component:
- render contract
- primary interaction
- disabled/error state
- keyboard path (where interactive)
- hydration safety test (no SSR hydration mismatch for interactive components)

- [ ] **Step 2: Run tests to verify failures**

Run: `npm run test:unit -- tests/unit/tier-a`
Expected: FAIL due to missing implementations.

- [ ] **Step 3: Implement components headless-first, then styled wrappers**

For each component:
- add headless behavior module
- add styled wrapper
- export from entrypoints

- [ ] **Step 4: Add docs matrix pages**

Each Tier A docs page must include:
- default usage
- variants
- disabled/error state
- theming example
- accessibility notes

- [ ] **Step 4A: Run automated accessibility checks for Tier A routes**

Run: `npm run test:e2e -- tests/e2e/tier-a-a11y.spec.ts`
Expected: PASS with no critical axe violations for all Tier A component routes.

- [ ] **Step 5: Re-run tests**

Run: `npm run test:unit -- tests/unit/tier-a`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/fluid-react/src apps/docs/app/components tests/unit/tier-a tests/e2e/tier-a-a11y.spec.ts
git commit -m "feat: deliver remaining tier-a component set"
```

### Task 7: Deliver Tier B and Tier C Components with Labels

**Files:**
- Create/Modify component modules in `packages/fluid-react/src/*`
- Create/Modify docs pages in `apps/docs/app/components/*`
- Create: `/home/amar/dev/FLUID/apps/docs/content/maturity.json`
- Test: `/home/amar/dev/FLUID/tests/unit/tier-b/*.test.tsx`
- Test: `/home/amar/dev/FLUID/tests/unit/tier-c/*.test.tsx`
- Test: `/home/amar/dev/FLUID/tests/e2e/tier-b-a11y.spec.ts`

Tier B:
- Tabs, Accordion, Tooltip, Popover, DropdownMenu, Toast, Badge, Avatar, Pagination, Breadcrumb

Tier C:
- DataTable, DatePicker, CommandPalette, Combobox

- [ ] **Step 1: Write failing tests for Tier B/C behavior baseline**

Include for every component:
- render and primary interaction
- explicit maturity metadata presence

- [ ] **Step 2: Run tests to verify failure**

Run:
- `npm run test:unit -- tests/unit/tier-b`
- `npm run test:unit -- tests/unit/tier-c`

Expected: FAIL.

- [ ] **Step 3: Implement components + docs + maturity labels**

Add maturity metadata map:
```json
{
  "Tabs": "B",
  "Accordion": "B",
  "Tooltip": "B",
  "Popover": "B",
  "DropdownMenu": "B",
  "Toast": "B",
  "Badge": "B",
  "Avatar": "B",
  "Pagination": "B",
  "Breadcrumb": "B",
  "DataTable": "C",
  "DatePicker": "C",
  "CommandPalette": "C",
  "Combobox": "C"
}
```

This map is exhaustive for all Tier B and Tier C components in V1.

Tier A components remain labeled `A` in docs metadata:
```json
{
  "Button": "A",
  "IconButton": "A",
  "Input": "A",
  "Textarea": "A",
  "Select": "A",
  "Checkbox": "A",
  "RadioGroup": "A",
  "Switch": "A",
  "Card": "A",
  "Modal": "A"
}
```

Tier C docs requirement:
- every Tier C component page must include `Experimental` badge and a `Caveats` section listing known limits.

- [ ] **Step 4: Re-run tests**

Run:
- `npm run test:unit -- tests/unit/tier-b`
- `npm run test:unit -- tests/unit/tier-c`

Expected: PASS.

- [ ] **Step 4A: Run automated accessibility checks for Tier B routes**

Run: `npm run test:e2e -- tests/e2e/tier-b-a11y.spec.ts`
Expected: PASS with no critical axe violations for all Tier B component routes.

- [ ] **Step 5: Commit**

```bash
git add packages/fluid-react/src apps/docs tests/unit/tier-b tests/unit/tier-c tests/e2e/tier-b-a11y.spec.ts
git commit -m "feat: add tier-b and tier-c components with maturity metadata"
```

### Task 8: CI, Verification, and Release Automation

**Files:**
- Create: `/home/amar/dev/FLUID/.github/workflows/ci.yml`
- Create: `/home/amar/dev/FLUID/.github/workflows/release.yml`
- Create: `/home/amar/dev/FLUID/.changeset/config.json`
- Create: `/home/amar/dev/FLUID/README.md`
- Create: `/home/amar/dev/FLUID/apps/docs/package.json`
- Test: `/home/amar/dev/FLUID/tests/e2e/docs-smoke.spec.ts`

- [x] **Step 1: Write failing e2e docs smoke test**

```ts
import { test, expect } from "@playwright/test";

test("docs renders component catalog and maturity tags", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Components")).toBeVisible();
  await expect(page.getByText("Tier A")).toBeVisible();
});
```

- [x] **Step 2: Run e2e to verify failure**

Run: `npm run test:e2e -- tests/e2e/docs-smoke.spec.ts`
Expected: FAIL (docs app not wired in CI path yet).

- [x] **Step 3: Implement CI and release workflows**

CI (`ci.yml`) stages:
- install
- lint
- typecheck
- unit
- build
- e2e smoke
- smoke consumer install/build

CI docs smoke command details:
- `npm run -w apps/docs build`
- `npm run -w apps/docs start -- --port 3000`
- run Playwright after docs server is reachable

`apps/docs/package.json` must define:
- name: `@fluid-ui/docs`
- scripts:
  - `build`: `next build`
  - `start`: `next start`

Release (`release.yml`) stages:
- versioning/changelog
- publish package

Also create smoke test project:
- `/home/amar/dev/FLUID/tests/smoke/package-consumer/package.json`
- `/home/amar/dev/FLUID/tests/smoke/package-consumer/index.mjs`
- `/home/amar/dev/FLUID/tests/smoke/package-consumer/vite.config.ts`

`index.mjs` must import:
- `@fluid-ui/react`
- `@fluid-ui/react/tailwind-preset`
- `@fluid-ui/react/styles.css`

`package.json` must define:
- name: `@fluid-ui/smoke-consumer`
- script: `build` -> `vite build`
- devDependencies: include `vite` in the smoke project package manifest

`vite.config.ts` must define:
- library-mode build with `entry: "./index.mjs"` and deterministic output dir `./dist`
- no minification required for smoke check

Example:
```ts
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: { entry: "./index.mjs", formats: ["es"], fileName: "bundle" },
    outDir: "./dist",
    minify: false
  }
});
```

- [x] **Step 4: Re-run verification suite**

Run:
- `npm run lint`
- `npm run typecheck`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`
- `node -e "Promise.all([import('@fluid-ui/react'), import('@fluid-ui/react/tailwind-preset')]).then(() => console.log('ok'))"`
- `npm --prefix tests/smoke/package-consumer install`
- `npm --prefix tests/smoke/package-consumer run build`

Expected: all PASS.

- [x] **Step 5: Commit**

```bash
git add .github/workflows .changeset README.md apps/docs/package.json tests/e2e/docs-smoke.spec.ts tests/smoke/package-consumer
git commit -m "chore: add ci verification and release automation"
```

### Task 9: FLUID Academy Artifacts for Each Implemented Slice

**Files:**
- Create: `/home/amar/dev/FLUID/docs/academy/concept-briefs/*.md`
- Create: `/home/amar/dev/FLUID/docs/academy/decision-log.md`
- Create: `/home/amar/dev/FLUID/docs/academy/deep-dives/*.md`

- [x] **Step 1: Add concept briefs for core slices**

Required briefs:
- component boundary model
- token contract model
- build artifact model

- [x] **Step 2: Add decision log entries**

Minimum entries:
- React 19/TS 5.6 lock
- headless + styled split
- Tailwind + prebuilt CSS dual path

- [x] **Step 3: Add deep dives**

Minimum topics:
- React render and event model in FLUID components
- build pipeline anatomy (Vite + CSS artifact emission)
- SSR/hydration constraints for interactive components

- [x] **Step 4: Verify docs presence**

Run: `rg -n "component boundary model|token contract model|build artifact model|React 19/TS 5.6 lock|headless \\+ styled split|Tailwind \\+ prebuilt CSS dual path|React render and event model|build pipeline anatomy|SSR/hydration constraints" docs/academy`
Expected: PASS with required academy topic markers present.

- [x] **Step 5: Commit**

```bash
git add docs/academy
git commit -m "docs: add academy learning artifacts for v1 implementation"
```

## Next Milestone: Centralized Theme Tokenization (Dashboard-Ready Foundation)

Goal:
- Make global color updates possible from a single source and prepare for future end-user theme dashboard controls.

### Task 10: Replace Hardcoded Component Colors With Central Tokens

**Files:**
- Modify: `/home/amar/dev/FLUID/packages/fluid-react/src/styles/tailwind/index.css`
- Modify: `/home/amar/dev/FLUID/apps/docs/src/DocsApp.tsx`
- Modify component wrappers in `/home/amar/dev/FLUID/packages/fluid-react/src/styled/*` as needed for component-specific variant/themed class hooks
- Test: `/home/amar/dev/FLUID/tests/unit/*`
- Test: `/home/amar/dev/FLUID/tests/e2e/*`

- [x] **Step 1: Introduce centralized CSS variables (`:root`)**
- [x] **Step 2: Replace hardcoded color literals in component classes with token variables**
- [x] **Step 3: Standardize docs route examples so each component shows meaningful `default` / `variants` / `theming` visual differences**
- [x] **Step 4: Add runtime token override contract (e.g., data-theme / inline style variable injection API)**
- [x] **Step 5: Add persisted theme profile schema for future dashboard integration**
- [x] **Step 6: Commit**

## Final Verification Gate

- [x] Run full local gate:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run -w @fluid-ui/docs build
npm run -w @fluid-ui/docs start -- --port 3000 >/tmp/fluid-docs.log 2>&1 &
until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done
npm run test:e2e
```

Expected: all PASS with no skipped required checks.

- [x] Run package smoke import check:

```bash
node -e "Promise.all([import('@fluid-ui/react'), import('@fluid-ui/react/tailwind-preset')]).then(() => console.log('ok'))"
npm --prefix tests/smoke/package-consumer install
npm --prefix tests/smoke/package-consumer run build
```

Expected: prints `ok` and smoke consumer build succeeds (proving CSS entrypoint resolves via bundler).

- [ ] Prepare release candidate commit:

```bash
git add .
git commit -m "release: prepare FLUID v1 p0 candidate"
```
