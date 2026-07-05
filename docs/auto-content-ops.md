# Auto-content pipeline — operations runbook

How the unattended bilingual content pipeline works, how to run it day-to-day,
and how to set it up from scratch. For the rationale + the for/against review
that shaped it, see [auto-content-cron-plan.md](./auto-content-cron-plan.md).

## What it does

```
add a topic to content/backlog.ts (status: 'pending')
        │
        ▼  daily cron 03:17 UTC  (.github/workflows/auto-author.yml)
auto-author.ts:  English draft → zh translation → image prompt  → opens a PR (en+zh)
        │
        ▼  YOU review + merge the PR         ← the only human gate
        ▼  merge fires  .github/workflows/auto-seed.yml  (keyless, WIF)
seed-editorial.ts --apply:  publishes en + zh to Firestore, generates one shared
                            Seedream hero image per topic → GCS
mark-seeded-from-carrier.ts:  flips those topics to 'seeded' in the backlog
        │
        ▼
live on gptwiki.net (en + zh, illustrated), cron advances to the next topics
```

After setup, the only recurring human actions are: **add topics** and **merge the
daily PR**. Everything else is automatic. Publishing is deliberately gated on your
merge — nothing reaches the live, Google-indexed corpus that you didn't merge.

## Components

| File | Role |
|------|------|
| [`content/backlog.ts`](../content/backlog.ts) | Topic queue. `pending` → drafted → `seeded`. Cron drafts `pending` top-down. |
| [`scripts/auto-author.ts`](../scripts/auto-author.ts) | Per topic: generate EN (reuses `generateWikiContent`), translate to zh, attach an editorial image prompt. Quality-gates weak generations. Writes the carrier. |
| [`content/auto-draft.en.ts`](../content/auto-draft.en.ts) | Transient carrier — the `auto-draft` batch. Overwritten each run; holds en+zh. |
| [`scripts/seed-editorial.ts`](../scripts/seed-editorial.ts) | Publisher. `--batch=auto-draft --apply` seeds en+zh + one hero image per `topicKey`. `(title, language)` de-dup; idempotent GCS image path `editorial/<topicKey>.jpg`. |
| [`scripts/mark-seeded-from-carrier.ts`](../scripts/mark-seeded-from-carrier.ts) | Flips carrier topics `pending`→`seeded` in the backlog. Pure text edit. |
| [`.github/workflows/auto-author.yml`](../.github/workflows/auto-author.yml) | Daily cron + manual `workflow_dispatch`. Generates drafts, opens a PR. |
| [`.github/workflows/auto-seed.yml`](../.github/workflows/auto-seed.yml) | Seed-on-merge. Keyless (WIF). Self-skips until `GCP_WIF_PROVIDER` is set. |

One-off backfills used to bootstrap the first batch (not needed for new topics —
`auto-author` now does en+zh+image inline): `scripts/translate-live.ts`,
`scripts/backfill-editorial-images.ts`.

## Secrets & variables (on the GitHub repo)

| Name | Kind | Used by | Notes |
|------|------|---------|-------|
| `ANTHROPIC_API_KEY` | secret | auto-author | Article generation + zh translation. |
| `ARK_API_KEY` | secret | auto-seed | Seedream hero images. |
| `GCP_WIF_PROVIDER` | variable | auto-seed | WIF provider resource path (below). |
| `GCP_SEED_SA` | variable | auto-seed | Seed service-account email. |

No Firebase private key is stored — `auto-seed` authenticates via Workload
Identity Federation (short-lived OIDC → GCP credentials). Also required, one-time
in repo settings: **Actions → General → Allow GitHub Actions to create and
approve pull requests** (lets `auto-author` open its PR).

## One-time GCP setup (Workload Identity Federation)

Run authed to the **gptwiki** project with IAM admin. Reuse the app's Firebase
service account (your deployed `FIREBASE_CLIENT_EMAIL`) — it already has Firestore
write.

```bash
PROJECT=gptwiki
REPO=oratis/GPTwiki
POOL=github-pool
PROVIDER=github-provider
SA=<your-firebase-sa>@gptwiki.iam.gserviceaccount.com   # = FIREBASE_CLIENT_EMAIL
PNUM=$(gcloud projects describe $PROJECT --format='value(projectNumber)')

# 1. SA can write Firestore + the image bucket
gcloud projects add-iam-policy-binding $PROJECT \
  --member="serviceAccount:$SA" --role="roles/datastore.user"
gcloud storage buckets add-iam-policy-binding gs://gptwiki-images \
  --member="serviceAccount:$SA" --role="roles/storage.objectAdmin"

# 2. WIF pool + GitHub OIDC provider, locked to the repo
gcloud iam workload-identity-pools create $POOL \
  --project=$PROJECT --location=global --display-name="GitHub Actions"
gcloud iam workload-identity-pools providers create-oidc $PROVIDER \
  --project=$PROJECT --location=global --workload-identity-pool=$POOL \
  --display-name="GitHub OIDC" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='$REPO'"

# 3. Only this repo may impersonate the SA
gcloud iam service-accounts add-iam-policy-binding $SA --project=$PROJECT \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PNUM/locations/global/workloadIdentityPools/$POOL/attribute.repository/$REPO"

# 4. Point the workflow at it (repo variables — not secrets)
gh variable set GCP_WIF_PROVIDER --repo $REPO \
  --body "projects/$PNUM/locations/global/workloadIdentityPools/$POOL/providers/$PROVIDER"
gh variable set GCP_SEED_SA --repo $REPO --body "$SA"
```

## Daily operation

1. **Add topics** to `content/backlog.ts` under the pending section:
   ```ts
   { topicKey: 'my-slug', question: 'A specific decision/how-to question?', cluster: 'digital-buying', locales: ['en', 'zh'], status: 'pending' },
   ```
   Keep questions specific and decision/how-to shaped. Order = priority (cron picks top-down).
2. **Merge the daily PR.** Review facts + sources first — this merge is the only
   gate before content goes live and into the sitemap. On merge, `auto-seed`
   publishes en+zh+images and marks the topics seeded.

That's the whole loop. With 0 pending topics the cron runs and produces nothing
(idle) — add topics to restart it. Scheduled runs use the default limit (3);
manual runs cap at 5 (`HARD_CAP` in `auto-author.ts`).

## Manual / local operation (fallback)

Everything the workflows do can be run locally with `.env.local` holding
`ANTHROPIC_API_KEY` + `ARK_API_KEY` (Firestore/GCS via `gcloud` ADC):

```bash
npx tsx scripts/auto-author.ts --apply --limit=3          # generate en+zh+image drafts
# review content/auto-draft.en.ts, then:
npx tsx scripts/seed-editorial.ts --batch=auto-draft --apply   # publish en+zh+images
npx tsx scripts/mark-seeded-from-carrier.ts               # advance the backlog
```
Dry-run (omit `--apply`) previews without writing. `--only=slug1,slug2` scopes.

## Guardrails & cost

- **De-dup**: `seed-editorial` skips any `(title, language)` already in Firestore.
- **Cost cap**: `HARD_CAP=5` topics/run; scheduled cron uses 3. Each topic ≈ 2
  Claude calls (generate + translate) + 1 Seedream image (cached per `topicKey`).
- **Quality gate**: weak/garbage generations are skipped, never written. zh is
  best-effort — the English draft still ships if translation fails.
- **SEO**: only merged content is seeded; the merge is the review. Don't
  rubber-stamp. (Fully-unattended auto-publish is intentionally NOT built — it
  would need a sitemap `status`/`source` filter first; see the plan doc.)

## Troubleshooting

| Symptom | Cause / fix |
|---------|-------------|
| `auto-seed` run is green but did nothing | WIF not configured — set `GCP_WIF_PROVIDER` + `GCP_SEED_SA` (the guard self-skips otherwise). |
| `auto-seed` fails at the seed step | SA lacks Firestore (`roles/datastore.user`) or bucket (`roles/storage.objectAdmin`) access, or the WIF binding/`attribute-condition` doesn't match `oratis/GPTwiki`. |
| Images missing on seeded docs | `ARK_API_KEY` unset/invalid, or SA can't write `gptwiki-images`. seed-editorial skips imageless drafts for a later retry. |
| `auto-author` drafts 0 topics | Backlog has 0 `pending` — add topics. |
| Cron re-drafts already-live topics | A topic stayed `pending` after seeding — `mark-seeded-from-carrier` (run by `auto-seed`) normally prevents this; mark it `seeded` by hand. |
| Model 404 (`not_found_error`) | A retired model id in `src/lib/ai/*.ts`; update to a current one (see the `claude-api` reference). |
| `auto-author` can't open a PR | Enable “Allow GitHub Actions to create and approve pull requests” in repo Actions settings. |
