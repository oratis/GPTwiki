# P0 — Feishu app secret: rotate + scrub from history

**Status: OPEN — the secret has been public since 2026-04-09 and has not been
rotated.** Merging this runbook fixes nothing by itself; step 1 below is an owner
action in the Feishu console and is the only step that neutralizes the leak.

## What leaked

The Feishu (Lark) app `APP_SECRET` was hardcoded in nine operational scripts that
were committed to this **public** repo:

```
scripts/write-action-list.py      scripts/write-feishu-v2.py     scripts/write-kol.py
scripts/write-directories.py      scripts/write-feishu.py        scripts/write-ph-thread.py
scripts/write-feishu-execution.py scripts/write-feishu-new.py    scripts/write-progress.py
```

The files were later deleted from `main`, **but the secret is still recoverable**:

- It lives in the **history of `main`**: added in `00c5244` (v0.0.2, 2026-04-09),
  untracked in `8524697` (2026-06-10). Anyone can `git log -p` it back.
- It is still in the **tree of two remote branches** that forked from `main` at
  `0dfb5ef` (2026-05-26), *before* the untrack commit, so they never lost the files:
  `claude/strange-villani-530b4a` (PR #1, merged) and `wip/proxy-docs-recovery`
  (PR #115, merged; pushed 2026-08-08). Both are stale and deletable once rotated.
  The `pr/1`…`pr/42` branches this runbook originally named are gone.
- `.gitignore:57` (`/scripts/write-*.py`) only stops *new* adds; it does not untrack
  a file already in a branch's index, which is why those two branches still carry it.

Re-verified 2026-08-21: repo is still public, `main`'s tree is clean, the two
branches above are the only refs that still match. **Rotation has not happened.**

With this secret + the public `APP_ID`, anyone can mint a `tenant_access_token` and
read/write the Feishu docs the app can reach. **Treat it as compromised.**

## Fix — three steps, in order

### 1. Rotate (owner, Feishu console) — do this FIRST

This is the only step that actually neutralizes the leak. The history scrub is
hygiene; rotation is the fix.

1. Feishu Open Platform → your app → **Credentials & Basic Info**.
2. **Reset `App Secret`**. Copy the new value.
3. Update the secret wherever it's actually used now (deployment env / secret
   manager — **never** a tracked file). Confirm the old secret no longer works:
   ```bash
   # Expect a non-2xx / invalid_app_secret once rotated:
   curl -s -X POST https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal \
     -H 'Content-Type: application/json' \
     -d '{"app_id":"<APP_ID>","app_secret":"<OLD_SECRET>"}'
   ```
4. Revoke any long-lived tokens the app issued, if the console exposes that.

Once rotated, the exposed string is worthless and the launch is unblocked on this
item. Steps 2–3 remove the dead secret so scanners stop flagging the repo.

### 2. Scrub history (owner — rewrites history, force-push)

Use the helper script, which never writes the secret to a tracked file (it reads
it from your shell and feeds `git filter-repo` a local, gitignored replacements
file):

```bash
# from a FRESH, full clone you can afford to rewrite:
export FEISHU_OLD_SECRET='the-old-leaked-secret'   # the rotated-out value
./scripts/scrub-feishu-secret.sh                    # rewrites all refs locally
# review, then publish the rewrite:
git push --force --all
git push --force --tags
```

`git filter-repo` is required (`pip install git-filter-repo` or `brew install git-filter-repo`).
The script aborts if it isn't installed or if `FEISHU_OLD_SECRET` is unset.

### 3. Close the exposed PR branches (owner)

History rewriting `main` does **not** rewrite other branches that still carry the
secret. As of 2026-08-21 that is exactly two, both with already-merged PRs:

- `claude/strange-villani-530b4a` — **delete** (`git push origin --delete claude/strange-villani-530b4a`)
- `wip/proxy-docs-recovery` — **delete** (`git push origin --delete wip/proxy-docs-recovery`)

If a future branch you still need carries it, **rebase it onto the scrubbed `main`
and force-push** instead of deleting.

List the branches still carrying it after rotation:

```bash
git fetch --all
for r in $(git for-each-ref --format='%(refname)' refs/remotes/origin); do
  git grep -q -- "$FEISHU_OLD_SECRET" "$r" 2>/dev/null && echo "EXPOSED: $r"
done
```

## Prevent recurrence

- **Operational scripts don't belong in the product repo.** Move `scripts/write-*.py`
  (Feishu doc automation) to a private ops repo. They are not part of GPTwiki.
- **Done (2026-08-21):** `npm run check:secrets` runs in CI on every PR and on
  `main` (`scripts/check-no-secrets.ts`). It fails the build if `scripts/write-*.py`
  is tracked again, or if a credential-shaped literal is assigned to a
  secret-named constant. Verified against the real historical file: both rules
  fire on `scripts/write-feishu.py` as it exists on the branches below.
  It scans `git ls-files`, not the working tree, because the recurrence path is
  a file re-entering the index — not a file appearing on disk. It is a targeted
  guard, not a general scanner: a wide entropy scan over a 15-language content
  repo would produce false positives until someone turned it off.
- Secrets only ever come from env / a secret manager — see `.env.example`.

## Done when

- [ ] New secret issued; old secret returns `invalid_app_secret`.
- [ ] `git log -p` on the rewritten `main` contains no occurrence of the old secret.
- [ ] No `EXPOSED:` lines from the branch scan above.
- [ ] `scripts/write-*.py` removed from this repo (tracked here only as a pointer).
- [x] Secret scanner wired into CI / pre-commit — `npm run check:secrets`, 2026-08-21.
