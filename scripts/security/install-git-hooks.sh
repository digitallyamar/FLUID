#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

mkdir -p .githooks
git config core.hooksPath .githooks

echo "Git hooks path set to .githooks"
echo "Pre-push security checks will run automatically on git push."
