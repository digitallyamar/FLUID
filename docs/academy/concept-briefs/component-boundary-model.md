# component boundary model

## Purpose
Define where behavior ends and presentation begins in FLUID so components stay predictable and easy to evolve.

## Boundary Rules
- `headless` modules own interaction state, keyboard handling, aria wiring, and events.
- `styled` modules own class names, visual variants, and composition of headless hooks into rendered elements.
- `tokens` modules own theming contract shape and validation.
- Cross-layer imports are one-directional: styled can consume headless and tokens; headless must not depend on styled.

## Why It Matters
This separation lets us test behavior independent of visuals and adjust style systems without rewriting interaction logic.
