# SSR/hydration constraints for interactive components

Interactive FLUID components must preserve DOM structure and key attributes between server render and client hydration.

## Constraints
- Initial markup must not depend on browser-only state before hydration.
- IDs and aria relationships must be deterministic across server/client passes.
- Event-only behavior can attach on hydration, but semantic structure must already be valid.

## FLUID Implications
- Headless hooks should avoid side effects during initial render.
- Styled wrappers should emit stable element trees and roles.
- Docs examples should demonstrate accessible defaults that remain valid before JavaScript boots.

## Verification Strategy
Use docs smoke and component tests to catch structure or behavior drift that would create hydration mismatches.
