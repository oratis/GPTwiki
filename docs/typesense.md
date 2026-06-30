# Typesense search

Site search runs on a self-hosted [Typesense](https://typesense.org/) instance
(product decision #5, 2026-06-11). The per-doc Firestore `keywords` index
(`src/lib/search-keywords.ts`) remains the automatic fallback: if the
`TYPESENSE_*` env vars are unset, the server is down, or a query errors,
`searchWikis()` silently degrades to the Firestore flow.

## Current deployment

- GCE VM `typesense-1` (e2-small, us-central1-a, project `gptwiki`),
  container `typesense/typesense:27.1`, data on the host at `/var/typesense`,
  run via cloud-init ([`deploy/typesense-cloud-init.yaml`](../deploy/typesense-cloud-init.yaml)).
  ⚠️ The live VM was created with the deprecated `create-with-container` agent
  and must be migrated before **2026-07-31** (see the migration section below).
- Static IP `typesense-ip` (us-central1), port 8108 open via firewall rule
  `allow-typesense`; requests authenticate with `X-TYPESENSE-API-KEY`.
- Future hardening: move traffic onto the VPC (Serverless VPC Access
  connector) and/or terminate TLS in front of the container.

## Environment variables

| Variable | Example | Notes |
|---|---|---|
| `TYPESENSE_HOST` | `136.113.189.29` | required to enable |
| `TYPESENSE_PORT` | `8108` | default `8108` |
| `TYPESENSE_PROTOCOL` | `http` | default `http` |
| `TYPESENSE_API_KEY` | *(secret)* | required to enable |

Set these on the Cloud Run service **and** in `.env.local` for scripts.

## Bootstrap / resync

```bash
# count what would be imported
npx tsx scripts/sync-typesense.ts

# full sync (idempotent upserts; resumable via START_AFTER=<docId>)
npx tsx scripts/sync-typesense.ts --apply
```

New and updated wikis are indexed automatically at write time
(`createWiki`/`updateWiki` in `src/lib/search.ts`, fire-and-forget).

## Re-provisioning from scratch

The container runs as a systemd unit defined in
[`deploy/typesense-cloud-init.yaml`](../deploy/typesense-cloud-init.yaml) —
**not** `create-with-container`, whose `gce-container-declaration` agent Google
retires on 2026-07-31 (see the migration section below).

```bash
KEY=<api-key>   # same value as TYPESENSE_API_KEY

# substitute the key into the cloud-init (never commit the real key)
sed "s/__TYPESENSE_API_KEY__/$KEY/" deploy/typesense-cloud-init.yaml > /tmp/typesense-user-data.yaml

gcloud compute addresses create typesense-ip --region us-central1 --project gptwiki

gcloud compute instances create typesense-1 \
  --project gptwiki --zone us-central1-a --machine-type e2-small \
  --image-family cos-stable --image-project cos-cloud \
  --boot-disk-size 20GB --address typesense-ip --tags typesense \
  --metadata-from-file user-data=/tmp/typesense-user-data.yaml

gcloud compute firewall-rules create allow-typesense --project gptwiki \
  --allow tcp:8108 --target-tags typesense --source-ranges 0.0.0.0/0

curl http://<IP>:8108/health   # → {"ok":true}  (allow ~30s for the pull/start)
```

## Migrating the live VM off the deprecated container agent (before 2026-07-31)

`typesense-1` was created with `gcloud compute instances create-with-container`,
so it carries the deprecated `gce-container-declaration` metadata. Google
disables the Container Startup Agent on **2026-07-31**; migrate before then.
(The Cloud Run app and backfill jobs are unaffected — this VM is the only
impacted resource in the `gptwiki` project.)

Safety net: site search falls back to Firestore whenever Typesense is
unreachable (see the top of this doc), and the index rebuilds from Firestore
via `scripts/sync-typesense.ts`. Firestore is the source of truth, so the
cutover risks no permanent data loss and search keeps serving (degraded)
throughout.

Recommended cutover — recreate in place, keeping the same name + static IP so
no env vars change:

```bash
KEY=<api-key>   # current TYPESENSE_API_KEY
sed "s/__TYPESENSE_API_KEY__/$KEY/" deploy/typesense-cloud-init.yaml > /tmp/typesense-user-data.yaml

# (optional rollback safety) snapshot the old data disk first
gcloud compute disks snapshot typesense-1 --zone us-central1-a --project gptwiki \
  --snapshot-names typesense-1-predeprecation

# 1. Delete the deprecated VM — releases typesense-ip; search falls back to
#    Firestore from here until step 3 finishes.
gcloud compute instances delete typesense-1 --zone us-central1-a --project gptwiki

# 2. Recreate with the same name + static IP, now driven by cloud-init.
gcloud compute instances create typesense-1 \
  --project gptwiki --zone us-central1-a --machine-type e2-small \
  --image-family cos-stable --image-project cos-cloud \
  --boot-disk-size 20GB --address typesense-ip --tags typesense \
  --metadata-from-file user-data=/tmp/typesense-user-data.yaml

# 3. Rebuild the index from Firestore (IP unchanged, so prod picks it back up).
TYPESENSE_HOST=<typesense-ip> TYPESENSE_API_KEY=$KEY \
  npx tsx scripts/sync-typesense.ts --apply
curl http://<typesense-ip>:8108/health   # → {"ok":true}

# 4. Confirm the new VM carries no deprecated metadata.
gcloud compute instances describe typesense-1 --zone us-central1-a --project gptwiki \
  --format='value(metadata.items)' | grep gce-container-declaration || echo "clean ✓"
```

Want zero search degradation instead? Bring up a second VM on an ephemeral IP
with the same cloud-init, sync and verify it, then move `typesense-ip` over and
delete the old VM.

### Prevent regressions (optional, org-level)

After the VM is migrated, enforce the Organization Policy from the deprecation
notice so the deprecated agent can't be reintroduced. The cloud-init VM above
does not use the agent, so this is safe to enable post-cutover (requires
`orgpolicy.policyAdmin`):

```bash
gcloud resource-manager org-policies enable-enforce \
  compute.managed.disableVmsWithContainerStartupAgent --project gptwiki
```

## Notes

- The collection schema lives in `src/lib/typesense.ts` (`COLLECTION_SCHEMA`);
  content is truncated to ~2000 chars per doc to keep the index lean.
- CJK/Thai queries: Typesense's default tokenizer is weaker for unsegmented
  scripts; the Firestore fallback (character bigrams) covers the gap when
  Typesense returns zero hits.
