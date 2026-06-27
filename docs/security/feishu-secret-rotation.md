# P0 — Feishu app secret: rotate + scrub from history

**Status: BLOCKS LAUNCH.** Publishing the repo (Show HN) pushes it to the HN front
page and dramatically widens the attack surface on a credential that is already
public. Do this before any launch push.

## What leaked

The Feishu (Lark) app `APP_SECRET` was hardcoded in nine operational scripts that
were committed to this **public** repo:

```
scripts/write-action-list.py      scripts/write-feishu-v2.py     scripts/write-kol.py
scripts/write-directories.py      scripts/write-feishu.py        scripts/write-ph-thread.py
scripts/write-feishu-execution.py scripts/write-feishu-new.py    scripts/write-progress.py
```

The files were later deleted from `main`, **but the secret is still recoverable**:

- It lives in **2 commits in the git history** of `main` (anyone can `git log -p`).
- It is still present in the **working tree of ~30+ open PR branches** (`pr/1`…`pr/42`)
  and `claude/strange-villani-530b4a`. Deleting it from `main` did nothing for those.

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

History rewriting `main` does **not** rewrite the ~30+ open PR branches that still
carry the secret. For each, either:

- **close + delete the branch** if it's stale (most `pr/1…42` likely are), or
- if you need the PR, **rebase it onto the scrubbed `main` and force-push** so its
  copy of the secret is dropped too.

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
- Add a secret scanner to CI / pre-commit (e.g. `gitleaks`) so a hardcoded
  credential fails the build instead of shipping.
- Secrets only ever come from env / a secret manager — see `.env.example`.

## Done when

- [ ] New secret issued; old secret returns `invalid_app_secret`.
- [ ] `git log -p` on the rewritten `main` contains no occurrence of the old secret.
- [ ] No `EXPOSED:` lines from the branch scan above.
- [ ] `scripts/write-*.py` removed from this repo (tracked here only as a pointer).
- [ ] Secret scanner wired into CI / pre-commit.
