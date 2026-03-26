# FLUID Decision Log

## React 19/TS 5.6 lock
- Decision: pin React 19 and TypeScript 5.6 ranges in workspace metadata.
- Why: keep API assumptions and type behavior consistent across package, docs, and tests.
- Tradeoff: upgrades are deliberate instead of automatic.

## headless + styled split
- Decision: keep behavior hooks and visual wrappers in separate modules.
- Why: enables isolated behavior tests and safer style refactors.
- Tradeoff: slightly more files and import boundaries to maintain.

## Tailwind + prebuilt CSS dual path
- Decision: ship both Tailwind preset and prebuilt stylesheet entrypoint.
- Why: supports teams with different styling stacks without forking component logic.
- Tradeoff: artifact verification needs to guard two consumption paths.
