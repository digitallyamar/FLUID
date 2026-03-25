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

FLUID V1 is a single npm package with internal layering:
- Headless behavior primitives (logic + interaction patterns)
- Styled FLUID components (Tailwind-based)
- Token/theme system for controlled uniqueness
- Precompiled CSS output for non-Tailwind consumers

Companion apps in-repo:
- Docs/playground app for usage and validation
- Internal lab app for fast iteration

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

## Distribution and Build Outputs

Initial distribution model:
- Single package: `@fluid-ui/react`
- Planned migration: multi-package monorepo after traction

Build outputs:
- ESM module output
- TypeScript type definitions
- Prebuilt stylesheet (`fluid.css`)
- Tailwind preset/config entrypoint for Tailwind consumers

## Component Coverage and Maturity Model

Target component count: 20-30 total in V1 rollout.

Maturity tiers:
- Tier A: production-hardened
- Tier B: stable, improving
- Tier C: experimental

Release strategy:
- Ship breadth, but with explicit tier labeling in docs and metadata.
- Expected initial split:
  - Tier A: 10-12 components
  - Tier B: 10-15 components
  - Tier C: optional small set

## Quality Gates

User-selected priority for gating: visual polish + basic tests.

Operational gates by tier:
- Tier A:
  - visual polish,
  - robust interaction tests,
  - complete docs/examples.
- Tier B:
  - visual polish,
  - basic tests,
  - docs/examples.
- Tier C:
  - marked experimental with explicit caveats.

Advisory (recommended by design process):
- Add automated accessibility checks in CI early, even if not initially a hard release blocker.

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

## Rollout Plan (High-Level)

1. Establish package skeleton and boundary enforcement.
2. Build and publish first Tier A slice (core foundation components).
3. Expand to Tier B breadth with daily iteration.
4. Harden Tier A and promote selected Tier B components.
5. Introduce initial style preset automation hooks (pre-AI full generator).

## Open Decisions Deferred to Implementation Planning

- Exact V1 component list and ordering
- Testing stack specifics and thresholds
- Release automation details
- Token schema details and preset format
- Docs information architecture and example matrix

These are intentionally deferred to the implementation planning phase.
