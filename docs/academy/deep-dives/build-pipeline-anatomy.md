# build pipeline anatomy (Vite + CSS artifact emission)

## High-Level Steps
1. Typecheck gates package and docs correctness.
2. Package build compiles TypeScript entrypoints into `dist`.
3. CSS emission copies the canonical Tailwind source into `src/styles/dist/fluid.css`.
4. Docs build validates catalog routes and markdown imports.
5. Smoke consumer build validates external bundler import resolution.

## Why This Layout
The pipeline isolates contract checks:
- type-level correctness
- artifact presence
- runtime docs behavior
- downstream consumption viability

## Failure Isolation
When one stage fails, the failing interface boundary is clear (types, artifacts, docs, or consumer integration).
