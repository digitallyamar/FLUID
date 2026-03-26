#!/usr/bin/env bash
set -euo pipefail

if ! command -v rg >/dev/null 2>&1; then
  echo "error: ripgrep (rg) is required for prepush security scan."
  exit 2
fi

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

echo "Running pre-push security sweep..."

WORKTREE_PATTERN='(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|-----BEGIN (RSA|OPENSSH|EC|PGP )?PRIVATE KEY-----|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35}|npm_[A-Za-z0-9]{30,})'
HISTORY_PATTERN='(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|BEGIN (RSA|OPENSSH|EC|PGP) PRIVATE KEY|-----BEGIN PRIVATE KEY-----|sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35}|npm_[A-Za-z0-9]{30,})'

echo "1/3 scanning working tree for high-confidence secret signatures..."
if rg -n --hidden \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  --glob '!tests/smoke/package-consumer/node_modules/**' \
  --glob '!package-lock.json' \
  --glob '!scripts/security/prepush-security.sh' \
  --glob '!docs/academy/repo-visibility-and-security-checklist.md' \
  "$WORKTREE_PATTERN" .; then
  echo
  echo "error: potential secret(s) found in working tree. Remove/rotate before push."
  exit 1
fi

echo "2/3 scanning tracked file names for common secret file types..."
if rg --files --hidden \
  --glob '!.git/**' \
  --glob '!node_modules/**' \
  --glob '!tests/smoke/package-consumer/node_modules/**' \
  | rg -n '(^|/)(\.env(\..*)?$|\.npmrc$|id_rsa$|id_ed25519$|.*\.(pem|p12|key)$|credentials(\.json)?$|secrets?\.(json|ya?ml|txt)$)'; then
  echo
  echo "error: high-risk secret file pattern found in repo paths."
  exit 1
fi

echo "3/3 scanning git history for high-confidence leaked credential signatures..."
if git grep -nE "$HISTORY_PATTERN" "$(git rev-list --all)" -- . \
  ":(exclude)scripts/security/prepush-security.sh" \
  ":(exclude)docs/academy/repo-visibility-and-security-checklist.md" \
  >/tmp/fluid-secret-history-scan.out 2>/dev/null; then
  cat /tmp/fluid-secret-history-scan.out
  echo
  echo "error: potential secret signature found in git history."
  exit 1
fi

rm -f /tmp/fluid-secret-history-scan.out
echo "Security sweep passed."
