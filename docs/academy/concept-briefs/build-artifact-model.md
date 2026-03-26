# build artifact model

## Purpose
Describe the artifacts FLUID must publish so downstream consumers can use either utility-first or prebuilt styles.

## Required Artifacts
- `dist/index.js` and `dist/index.d.ts` for package root exports.
- `dist/tailwind-preset.js` for Tailwind integration.
- `src/styles/dist/fluid.css` for prebuilt stylesheet consumption.

## Build Pipeline
- TypeScript compilation emits JS and declaration files.
- CSS copy step emits `fluid.css` from the Tailwind source contract.
- Export map ensures `@fluid-ui/react`, `@fluid-ui/react/tailwind-preset`, and `@fluid-ui/react/styles.css` resolve in consumer builds.

## Verification
Build artifact tests and smoke package-consumer builds prove published entrypoints stay valid.
