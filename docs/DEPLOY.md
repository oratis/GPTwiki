# Go-live checklist — auto-content pipeline + sitemap

One-time steps to make everything in the auto-content system live in production.
Day-to-day operation and architecture are in
[auto-content-ops.md](./auto-content-ops.md).

Prereqs: `gcloud` authed to the **gptwiki** project with IAM admin; `gh` authed
to `oratis/GPTwiki`.

---

## 1. Deploy the app  ← makes the sitemap fix live

Route changes (the sitemap scale fix + long-tail hook) only take effect after a
deploy — the repo has no auto-deploy.

```bash
gcloud builds submit --config cloudbuild.yaml
```

Verify:
```bash
curl -sI https://gptwiki.net/api/sitemap                     # 200, fast (was 25s+ timeout)
curl -s "https://gptwiki.net/api/sitemap?page=editorial" | grep -c "<url>"   # ~1,685 original docs
```

## 2. Secrets & repo settings  (mostly done)

| Item | Status |
|---|---|
| Repo secret `ANTHROPIC_API_KEY` | ✅ set |
| Repo secret `ARK_API_KEY` (Seedream images) | ✅ set |
| Actions → General → "Allow GitHub Actions to create and approve pull requests" | ✅ enabled |

## 3. One-time WIF  ← activates auto-seed + sitemap-shards (keyless)

Run authed to **gptwiki** with IAM admin. Reuse the app's Firebase service
account (your deployed `FIREBASE_CLIENT_EMAIL`).

```bash
PROJECT=gptwiki
REPO=oratis/GPTwiki
POOL=github-pool
PROVIDER=github-provider
SA=<your-firebase-sa>@gptwiki.iam.gserviceaccount.com
PNUM=$(gcloud projects describe $PROJECT --format='value(projectNumber)')

gcloud projects add-iam-policy-binding $PROJECT \
  --member="serviceAccount:$SA" --role="roles/datastore.user"
gcloud storage buckets add-iam-policy-binding gs://gptwiki-images \
  --member="serviceAccount:$SA" --role="roles/storage.objectAdmin"

gcloud iam workload-identity-pools create $POOL --project=$PROJECT --location=global --display-name="GitHub Actions"
gcloud iam workload-identity-pools providers create-oidc $PROVIDER \
  --project=$PROJECT --location=global --workload-identity-pool=$POOL \
  --display-name="GitHub OIDC" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='$REPO'"

gcloud iam service-accounts add-iam-policy-binding $SA --project=$PROJECT \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PNUM/locations/global/workloadIdentityPools/$POOL/attribute.repository/$REPO"

gh variable set GCP_WIF_PROVIDER --repo $REPO \
  --body "projects/$PNUM/locations/global/workloadIdentityPools/$POOL/providers/$PROVIDER"
gh variable set GCP_SEED_SA --repo $REPO --body "$SA"
```

Verify: `gh variable list --repo oratis/GPTwiki` shows `GCP_WIF_PROVIDER` + `GCP_SEED_SA`.

## 4. Confirm the loop

- **Publishing**: merge a daily content PR (from `auto-author`) → `auto-seed`
  auto-publishes en+zh+images and marks the backlog. Before WIF, publish with the
  local fallback: `npx tsx scripts/seed-editorial.ts --batch=auto-draft --apply`.
- **Backlog**: `suggest-topics` already tops it up daily — nothing to do.

## 5. (Optional) Full sitemap long-tail

Default sitemap = static + all original + last 60 days (fast, no scan). The
~19M mirror long-tail is **off by design and has never been enabled**: one run
reads every document (~19M reads, ~$11), and the index it publishes is itself a
read amplifier — 9,485 sub-pages x 2,000 docs, so a crawler working through the
whole thing costs another full corpus of reads. Arming it is a cost decision:

```bash
gh variable set SITEMAP_SHARDS_ENABLED --body true   # accept the cost; without it the job self-skips
gh workflow run sitemap-shards.yml                   # populates _meta/sitemap_shards
```

A dispatch with the variable unset fails loudly rather than skipping green.

The scan is paged into bounded 100k-doc queries and takes ~23 min on a GitHub
runner at the throughput measured before the fix. Do **not** respond to a
deadline error by raising `timeout-minutes` or by moving the job to a Cloud Run
Job — earlier advice here said exactly that, and it was wrong. The 600s budget
that killed the old unbounded scan is the Firestore SDK's own per-`.stream()`
retry timeout, so it travels with the code; lower `PAGE_SIZE` instead. See
`docs/auto-content-ops.md`.

---

## Steady state (after the above)

Your only recurring action is **merging the daily content PR** (the review gate).
Topics auto-fill, drafts auto-generate (en+zh+image), merge auto-publishes.

Workflows: `suggest-topics` (daily 03:07) · `auto-author` (daily 03:17) ·
`auto-seed` (on merge) · `sitemap-shards` (Sun 04:23).
