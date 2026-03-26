# React render and event model in FLUID components

FLUID styled components are thin wrappers that pass behavior and accessibility wiring from headless hooks into native elements.

## Render Pattern
- Hooks compute state and event handlers.
- Styled wrappers map that state to class names and DOM attributes.
- Props flow top-down; event callbacks bubble back through React's synthetic event system.

## Event Pattern
- Keyboard and pointer interactions are normalized in headless hooks.
- Styled layers do not re-implement interaction semantics.
- Consumer callbacks are merged so internal safety checks still run before external handlers.

## Practical Outcome
Rendering stays predictable under React 19 updates, while interaction behavior remains reusable across visual variants.
