# FLUID Library Structure Map

## Short Answer: Do token changes apply across components?

Yes, if components consume those token values.  
Tokens are shared design variables, so changing them is intended to affect the whole design system consistently.

## Directory Responsibilities

`packages/fluid-react/src/headless/`
- Behavior logic and interaction rules.
- Example: `useButton.ts`
- Goal: stable, reusable behavior independent of appearance.

`packages/fluid-react/src/styled/`
- Visual rendering and class-level styling hooks.
- Example: `Button.tsx`
- Goal: map behavior + style classes into real UI.

`packages/fluid-react/src/tokens/`
- Design-system configuration layer.
- Holds:
  - token schema (`contract.ts`)
  - validators/builders (`createTheme.ts`)
  - presets (`presets/*.ts`)
- Goal: centralized, scalable customization.

`packages/fluid-react/src/styles/`
- CSS source and generated CSS output.
- `tailwind/index.css` is source styles.
- `dist/fluid.css` is build artifact consumed by docs/apps.

`packages/fluid-react/src/index.ts`
- Public API entrypoint for consumers.
- Controls what users can import directly.

## What Changes Are Global vs Local?

Usually global:
- Token schema/presets
- Base style classes in shared CSS
- Public API exports

Usually local:
- One component implementation detail
- One component docs example
- One test file

## Consumer Impact Checklist

Before changing a file, ask:
1. Is this used by many components?
2. Is this a public export?
3. Is this token/schema level?
4. Will this break visual consistency?
5. Do tests/docs need updates?

If answer is yes to 1-3, treat it as a system-wide change.
