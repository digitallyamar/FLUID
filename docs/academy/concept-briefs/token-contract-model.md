# token contract model

## Purpose
Explain how FLUID theme primitives are validated and transformed into runtime CSS variables and Tailwind extensions.

## Contract Shape
A valid theme includes:
- `color`
- `spacing`
- `radius`
- `typography`
- `shadow`
- `motion`

## Model Flow
1. Call `createTheme` to validate token completeness.
2. Use token output in `createTailwindPreset` for build-time utility generation.
3. Convert token output to CSS variables for runtime theming in docs and app surfaces.

## Design Benefit
A strict contract prevents drift between component styling, Tailwind consumption, and runtime overrides.
