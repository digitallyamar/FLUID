# FLUID

FLUID is a React component library workspace centered on `@fluid-ui/react`, with docs and verification tooling in the same repository.

## Workspace Verification

Run the local verification suite:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e -- tests/e2e/docs-smoke.spec.ts
npm --prefix tests/smoke/package-consumer install
npm --prefix tests/smoke/package-consumer run build
```

## CI and Release Automation

- CI workflow: `.github/workflows/ci.yml`
  - Security sweep (`npm run prepush:security`)
  - Lint, typecheck, unit tests, package build
  - Docs build + Playwright docs smoke
  - Downstream consumer smoke install/build
- Release workflow: `.github/workflows/release.yml`
  - Uses Changesets to create version PRs and publish `@fluid-ui/react`
  - Requires repository `NPM_TOKEN` secret for publish step

## Changesets

Changeset configuration lives at `.changeset/config.json`.

Typical release flow:

```bash
npm run changeset
npm run version-packages
npm run release
```

## Security Checklist

- See `docs/academy/repo-visibility-and-security-checklist.md`.
- Run `npm run prepush:security` before pushing.
- Run `npm run setup:hooks` once per clone to auto-run security sweep on every `git push`.
