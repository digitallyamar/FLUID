# FLUID V1 Design Spec

## Overview

FLUID ("Front Loading UI Displays") is a React-based UI component library focused on creating production-ready components that can still adapt to unique, client-specific visual identity.

This V1 prioritizes:
- shipping a broad library quickly,
- preserving maintainability through strict architecture boundaries,
- and building the author's deep web development expertise as part of delivery.

## Goals

- Deliver a production-usable React component library for client work.
- Ship 20-30 components in clearly labeled maturity tiers.
- Support both Tailwind-native usage and prebuilt CSS usage.
- Build a repeatable path for domain-specific visual uniqueness without per-client forks.
- Embed a "learn while building" workflow so implementation also teaches frontend and JS server concepts.

## Non-Goals (V1)

- Building a full autonomous AI component generation engine.
- Supporting non-React frameworks as first-class runtime targets.
- Immediate multi-package monorepo decomposition.

## Product Scope

V1 scope is intentionally split into priority tracks so planning and delivery stay focused.

- P0 (required for V1 release):
  - single npm package (`@fluid-ui/react`)
  - headless + styled component architecture
  - token/theme system
  - Tailwind-native + prebuilt CSS consumption
  - component docs and examples
- P1 (required for team velocity, not release-blocking):
  - internal lab app for rapid local experimentation
- P2 (explicitly out of V1 release scope):
  - AI-generated style preset automation engine

FLUID V1 is a single npm package with internal layering:
- Headless behavior primitives (logic + interaction patterns)
- Styled FLUID components (Tailwind-based)
- Token/theme system for controlled uniqueness
- Precompiled CSS output for non-Tailwind consumers

## Target Stack

- Component runtime: React + TypeScript
- Library build: Vite
- Styled layer: Tailwind CSS
- Docs/demo app: Next.js
- Hosting target for docs/examples and future app integration: Vercel or Netlify

## Core Design Principle

Behavior should be stable; visual identity should be flexible.

FLUID avoids per-client component forks by keeping behavior and accessibility logic in headless units, while visual uniqueness comes from:
- tokens,
- scoped style overrides,
- and later AI-generated style presets.

## Repository Architecture (V1)

Single-repo now, future-monorepo-ready boundaries:

```text
packages/
  fluid-react/
    src/
      headless/
      styled/
      tokens/
      styles/
        tailwind/
        dist/
apps/
  docs/
  lab/
docs/
  academy/
  superpowers/specs/
```

### Boundary Rules

- `headless/` contains logic, interactions, and state behavior with no visual assumptions.
- `styled/` composes headless pieces with FLUID visual patterns.
- `tokens/` defines theme contracts, semantic scales, and per-domain style presets.
- `styles/tailwind/` is source styling infrastructure.
- `styles/dist/` is emitted CSS artifact(s) for non-Tailwind consumers.

These boundaries are mandatory to keep migration to a true monorepo mechanical later.

## Layer Interface Contracts

Public package entrypoints:
- `@fluid-ui/react`: styled components + stable public types
- `@fluid-ui/react/headless`: headless primitives + interaction hooks
- `@fluid-ui/react/tokens`: token contract, theme creator, built-in domain presets
- `@fluid-ui/react/styles.css`: prebuilt stylesheet output (`fluid.css`)
- `@fluid-ui/react/tailwind-preset`: Tailwind preset/config export

Import-direction rules (strict):
- `headless` imports from shared utilities only; never from `styled` or `tokens`.
- `tokens` imports from shared utilities only; never from `headless` or `styled`.
- `styled` may import from `headless` and `tokens`.
- public root exports are an aggregation layer and contain no behavior logic.

Token contract ownership:
- `tokens/contract.ts` is single source of truth for semantic token schema.
- Domain presets must satisfy contract through typed validation helpers.

Build responsibilities:
- `fluid.css` is produced from `styles/tailwind/` through Vite build pipeline and emitted to `styles/dist/`.
- Tailwind preset entrypoint is generated from token contract mappings and shipped as a typed export.
- Build fails if CSS artifact or preset artifact is missing.

## Distribution and Build Outputs

Initial distribution model:
- Single package: `@fluid-ui/react`
- Planned migration: multi-package monorepo after traction

Build outputs:
- ESM module output
- TypeScript type definitions
- Prebuilt stylesheet (`fluid.css`)
- Tailwind preset/config entrypoint for Tailwind consumers

Build-time acceptance:
- `npm run build` must emit JS + types + `fluid.css` + tailwind preset export in one pipeline.
- CI must verify artifact presence and importability through a smoke test project.

## Component Coverage and Maturity Model

Target component count: 24 total in V1 rollout.

Maturity tiers:
- Tier A: production-hardened
- Tier B: stable, improving
- Tier C: experimental

Release strategy:
- Ship breadth, but with explicit tier labeling in docs and metadata.
- Fixed initial split:
  - Tier A: 10 components
  - Tier B: 10 components
  - Tier C: 4 components

Initial component inventory:
- Tier A (10):
  - Button
  - IconButton
  - Input
  - Textarea
  - Select
  - Checkbox
  - RadioGroup
  - Switch
  - Card
  - Modal
- Tier B (10):
  - Tabs
  - Accordion
  - Tooltip
  - Popover
  - DropdownMenu
  - Toast
  - Badge
  - Avatar
  - Pagination
  - Breadcrumb
- Tier C (4):
  - DataTable
  - DatePicker
  - CommandPalette
  - Combobox

## Quality Gates

User-selected priority for gating: visual polish + basic tests.

Operational gates by tier:
- Tier A:
  - visual polish,
  - robust interaction tests,
  - complete docs/examples,
  - keyboard interaction support verified,
  - automated accessibility checks passing.
- Tier B:
  - visual polish,
  - basic tests,
  - docs/examples,
  - automated accessibility checks passing.
- Tier C:
  - marked experimental with explicit caveats.
  
Tier promotion criteria:
- B -> A requires:
  - no open critical defects for 2 releases,
  - full keyboard path coverage in tests,
  - docs include at least 3 usage patterns and 1 theming example,
  - accessibility checks passing in CI.
- C -> B requires:
  - stable API for 1 release cycle,
  - basic interaction tests,
  - docs page with usage and caveats.

## Component Delivery Pipeline

For each component:
1. Define API contract and behavior expectations.
2. Implement headless behavior.
3. Implement styled FLUID variant.
4. Add docs/playground examples (usage + theming).
5. Add tests according to target tier.
6. Label tier and publish notes.

## Customization Model

The FLUID uniqueness model is:
- common behavior runtime,
- token-driven visual customization,
- scoped style override points,
- future AI-generated style presets.

This allows domain-specific looks (construction, medicine, education, hospitality, robotics, etc.) without behavior duplication.

## Learning-Integrated Development (FLUID Academy Mode)

This project includes explicit learning deliverables in parallel with implementation.

For each feature/task:
1. Before code: short concept brief (`what` + `why` + alternative considered).
2. During code: decision log entry (choice, rationale, rejected options, revisit triggers).
3. After code: deep-dive on runtime/build concepts touched.

Always-on question protocol for explanations:
- Mental model
- How it works
- Why this choice
- Failure mode
- Production rule of thumb

Progressive mastery path:
- Phase 1: React + TypeScript component foundations
- Phase 2: Next.js app architecture and data strategy
- Phase 3: full-stack production patterns (APIs, auth/session, caching, observability, deployment)

Delivery rule for scope control:
- Learning artifacts are required for each implemented feature but do not block package release if component acceptance criteria are met.

## Error Handling and Risk Controls

Primary risks:
- Scope creep from mixing library + AI generation platform in one milestone
- Maintainability loss from uncontrolled customization paths
- Quality dilution from shipping too many components without tier transparency

Controls:
- Keep V1 focused on production component library scope
- Enforce layer boundaries
- Use explicit tier labels and release notes
- Keep AI-generation as staged follow-on track, not V1 blocking dependency

Operational edge-case handling requirements:
- Invalid theme/token payload:
  - reject at theme creation with typed runtime validation and actionable errors.
- Unsupported environment:
  - provide documented fallback to prebuilt CSS and no-op optional Tailwind integration.
- SSR/hydration mismatch:
  - styled components must avoid non-deterministic render output; hydration tests required for Tier A interactive components.
- Accessibility regressions:
  - CI includes automated a11y checks on docs examples for Tier A/B.
- Packaging/build failures:
  - release pipeline blocks publish if required artifacts are missing or entrypoints fail smoke imports.

## Rollout Plan (High-Level)

1. Establish package skeleton and boundary enforcement.
2. Build and publish first Tier A slice (core foundation components).
3. Expand to Tier B breadth with daily iteration.
4. Harden Tier A and promote selected Tier B components.
5. Introduce initial style preset automation hooks (pre-AI full generator).

## Locked Planning Assumptions

These decisions are fixed for initial implementation planning:
- Test stack:
  - unit/integration: Vitest + React Testing Library
  - accessibility automation: axe-based checks in component tests and docs smoke checks
  - docs/app e2e smoke: Playwright
- Release approach:
  - semantic versioning with automated changelog generation per release
- Docs hosting:
  - Next.js docs app deployable to Vercel and Netlify; Vercel is default primary target
- Token schema:
  - semantic token layers: color, spacing, typography, radius, shadow, motion
- Docs matrix minimum per Tier A/B component:
  - default usage
  - variants
  - disabled/error state
  - theming example
  - accessibility notes
