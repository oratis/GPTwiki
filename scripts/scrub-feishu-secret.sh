#!/usr/bin/env bash
#
# Scrub the leaked Feishu APP_SECRET from the entire git history.
#
# This is step 2 of docs/security/feishu-secret-rotation.md. ROTATE THE SECRET
# IN THE FEISHU CONSOLE FIRST (step 1) — rewriting history is hygiene, not the
# fix. Rotation is the fix.
#
# The secret is read from the FEISHU_OLD_SECRET environment variable and written
# only to a local, .gitignored replacements file — it is never committed.
#
# Usage:
#   export FEISHU_OLD_SECRET='the-old-leaked-secret'
#   ./scripts/scrub-feishu-secret.sh
#   # review the rewrite, then:
#   git push --force --all && git push --force --tags
#
set -euo pipefail

if ! command -v git-filter-repo >/dev/null 2>&1 && ! git filter-repo --version >/dev/null 2>&1; then
  echo "error: git-filter-repo is not installed." >&2
  echo "       pip install git-filter-repo   (or)   brew install git-filter-repo" >&2
  exit 1
fi

if [[ -z "${FEISHU_OLD_SECRET:-}" ]]; then
  echo "error: FEISHU_OLD_SECRET is not set." >&2
  echo "       export FEISHU_OLD_SECRET='the-old-leaked-secret' first." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "error: working tree is not clean. Run this on a fresh clone with no local changes." >&2
  exit 1
fi

# git filter-repo refuses to run on a non-fresh clone unless --force is passed,
# to make accidental rewrites harder. Require an explicit opt-in here too.
if [[ "${ALLOW_HISTORY_REWRITE:-}" != "1" ]]; then
  echo "This will REWRITE GIT HISTORY across all branches and tags." >&2
  echo "Make sure you are on a clone you can afford to rewrite and that the" >&2
  echo "secret has already been rotated in the Feishu console." >&2
  echo "Re-run with ALLOW_HISTORY_REWRITE=1 to proceed." >&2
  exit 1
fi

workdir="$(mktemp -d)"
replacements="$workdir/replacements.txt"
trap 'rm -rf "$workdir"' EXIT

# filter-repo replace-text format: one rule per line. `literal:` matches the raw
# string; everything after `==>` is the replacement.
printf 'literal:%s==>***REMOVED-FEISHU-SECRET***\n' "$FEISHU_OLD_SECRET" > "$replacements"

echo "Rewriting history to remove the leaked secret from all refs..."
git filter-repo --force --replace-text "$replacements"

echo
echo "Done. History rewritten locally. Verify no occurrences remain:"
echo "  git log --all -p -S \"\$FEISHU_OLD_SECRET\" | grep -c \"\$FEISHU_OLD_SECRET\"   # expect 0"
echo
echo "Then publish the rewrite (DESTRUCTIVE — coordinate with collaborators):"
echo "  git push --force --all"
echo "  git push --force --tags"
echo
echo "filter-repo removed the 'origin' remote as a safety measure; re-add it before pushing:"
echo "  git remote add origin https://github.com/oratis/GPTwiki"
