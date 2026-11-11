#!/usr/bin/env bash
# Run in the disposable Actions checkout, while it still holds the reviewed carrier.
set -euo pipefail
state="${1:?expected pending, drafted or seeded}"
case "$state" in
  pending|drafted|seeded) ;;
  *) exit 2 ;;
esac
export BATCH_TOPIC_KEYS_FILE="$RUNNER_TEMP/batch-keys.json"
test -s "$BATCH_TOPIC_KEYS_FILE"
git config user.name gptwiki-bot
git config user.email bot@gptwiki.net
for attempt in 1 2 3; do
  git fetch origin main
  git checkout --detach FETCH_HEAD
  npx tsx scripts/mark-seeded-from-carrier.ts "--$state"
  if git diff --quiet -- content/backlog.ts; then exit 0; fi
  git add content/backlog.ts
  git commit --no-verify -m "backlog: mark $state topics [skip ci]"
  if git push origin HEAD:main; then exit 0; fi
done
exit 1
