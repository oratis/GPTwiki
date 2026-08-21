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

Default sitemap = static + all original + last 60 days (fast, no scan). To also
enumerate the full ~19M mirror corpus:

```bash
gh workflow run sitemap-shards.yml     # populates _meta/sitemap_shards
```
Caveat: the ~19M stream can take ~5h off-region; if the job nears its timeout,
move it to a Cloud Run Job in the Firestore region (`Dockerfile.backfill`
pattern) + Cloud Scheduler.

---

## Steady state (after the above)

Your only recurring action is **merging the daily content PR** (the review gate).
Topics auto-fill, drafts auto-generate (en+zh+image), merge auto-publishes.

Workflows: `suggest-topics` (daily 03:07) · `auto-author` (daily 03:17) ·
`auto-seed` (on merge) · `sitemap-shards` (Sun 04:23).
