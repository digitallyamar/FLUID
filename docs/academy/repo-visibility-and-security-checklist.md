# Repo Visibility and Security Checklist

Use this checklist before making the repo public and before pushing significant changes.

## Pre-Public Checklist

1. Run `npm run prepush:security`.
2. Confirm no credentials are committed in history:
   - `git rev-list --all | wc -l`
   - `git grep -nE "(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN PRIVATE KEY-----|sk-[A-Za-z0-9]{20,})" $(git rev-list --all)`
3. Check repo files for high-risk secret file names:
   - `.env*`, `.npmrc`, `*.pem`, `*.p12`, `*.key`, `id_rsa`, `id_ed25519`, `credentials*`, `secrets*`
4. Confirm GitHub Actions secrets are expected only:
   - `NPM_TOKEN` (needed for release publish)
   - other values only if intentionally used
5. Review open/closed PR comments and issues for pasted credentials.

## Pre-Push Checklist

1. Run:
   - `npm run prepush:security`
   - `npm run lint`
   - `npm run typecheck`
2. If release-impacting changes:
   - `npm run build`
   - `npm run test:artifacts`
   - `npm run test:e2e -- tests/e2e/docs-smoke.spec.ts`

## Automation in This Repo

- Local script:
  - `scripts/security/prepush-security.sh`
- NPM command:
  - `npm run prepush:security`
- CI enforcement:
  - `.github/workflows/ci.yml` includes a `Security sweep` step on push/PR.

## Optional: Enforce Local Git Hook

To run the security sweep automatically on every local push:

```bash
mkdir -p .githooks
cat > .githooks/pre-push <<'EOF'
#!/usr/bin/env bash
npm run prepush:security
EOF
chmod +x .githooks/pre-push
git config core.hooksPath .githooks
```
