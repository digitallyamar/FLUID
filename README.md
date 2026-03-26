# FLUID

FLUID is a React component library workspace centered on `@fluid-ui/react`, with docs and verification tooling in the same repository.

## Clone and Run (Every New Clone)

Use this flow each time you clone FLUID locally:

```bash
git clone <your-repo-url>
cd FLUID
npm install
npm run setup:hooks
```

Why `npm run setup:hooks` matters:
- It configures `git` to use this repo's local hooks directory (`.githooks`).
- It enables automatic security checks on every `git push` via the `pre-push` hook.

You can verify hook setup with:

```bash
git config --get core.hooksPath
```

Expected output:

```text
.githooks
```

Run the repo locally:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run -w @fluid-ui/docs start -- --port 3000
```

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
  - On push to `main`, uses Changesets to create/update release PRs
  - npm publish runs only via manual `workflow_dispatch` with `publish=true`
  - Requires repository `NPM_TOKEN` secret only for manual publish

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
