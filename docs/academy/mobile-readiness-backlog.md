# Mobile Readiness Backlog

## Current Status

FLUID components are **partially mobile-friendly by default** because they use native HTML controls, but we do **not** yet have a formal mobile compatibility guarantee.

## What Works Today

- Native controls render on mobile browsers.
- Docs app uses viewport meta tag.
- Basic interactions (tap/type/select) are available.

## Gaps To Close

1. No formal responsive layout strategy across component docs/examples.
2. No automated mobile viewport tests in e2e.
3. No touch-target size audit (minimum tap area).
4. No mobile keyboard overlap checks for form-heavy components.
5. No orientation-change behavior checks.
6. No slow-network/mobile-performance checks.
7. No explicit “mobile supported browsers” policy documented.

## Backlog Tasks

### Phase 1: Baseline Verification

- [ ] Add Playwright mobile projects (e.g., iPhone/Android viewport profiles).
- [ ] Run existing Tier A e2e tests in mobile profiles.
- [ ] Document failures per component route.

### Phase 2: Component UX Hardening

- [ ] Enforce minimum touch-target size for interactive controls.
- [ ] Validate spacing/stacking behavior on small widths.
- [ ] Ensure disabled/variant/themed states remain visually distinguishable on small screens.
- [ ] Check keyboard/focus usability with mobile virtual keyboard.

### Phase 3: Quality Gate

- [ ] Add mobile e2e suite to CI pipeline.
- [ ] Define supported mobile browser/version matrix.
- [ ] Add “Mobile Compatibility” section per component docs page.

## Exit Criteria (Definition of Done)

We can claim “mobile-ready” only when:

1. Tier A component routes pass e2e on at least one iOS and one Android profile.
2. Interactive elements meet touch-target and accessibility basics.
3. CI includes mobile checks (not manual-only).
4. Supported mobile environments are documented publicly.
