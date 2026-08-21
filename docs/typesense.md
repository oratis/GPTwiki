# Typesense search

Site search runs on a self-hosted [Typesense](https://typesense.org/) instance
(product decision #5, 2026-06-11). The per-doc Firestore `keywords` index
(`src/lib/search-keywords.ts`) remains the automatic fallback: if the
`TYPESENSE_*` env vars are unset, the server is down, or a query errors,
`searchWikis()` silently degrades to the Firestore flow.

## Current deployment

- GCE VM `typesense-1` (e2-small, us-central1-a, project `gptwiki`),
  container `typesense/typesense:27.1`, data on the host at `/var/typesense`,
  run via cloud-init ([`deploy/typesense-cloud-init.yaml`](../deploy/typesense-cloud-init.yaml))
  on Container-Optimized OS. Recreated **2026-06-30** off the deprecated
  `create-with-container` agent (see the migration record below); its metadata
  carries only `user-data` + `google-logging-enabled`, no `gce-container-declaration`.
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
retired on 2026-07-31 (see the migration record below).

```bash
KEY=<api-key>   # same value as TYPESENSE_API_KEY

# substitute the key into the cloud-init (never commit the real key).
# Anchored to the --api-key= line: an unanchored sed also rewrites any line
# that mentions the placeholder, and the key ends up in a YAML comment too.
sed "/--api-key=/s/__TYPESENSE_API_KEY__/$KEY/" deploy/typesense-cloud-init.yaml > /tmp/typesense-user-data.yaml
grep -c "$KEY" /tmp/typesense-user-data.yaml   # → 1, exactly

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

## Migration record — off the deprecated container agent (done 2026-06-30)

`typesense-1` was originally created with `gcloud compute instances
create-with-container`, which carried the deprecated `gce-container-declaration`
metadata that Google's Container Startup Agent stopped honouring on 2026-07-31.
It was recreated in place on **2026-06-30** using the procedure below, one month
ahead of the deadline. Nothing else in the `gptwiki` project used the agent.

**This section is a record, not a to-do.** The live VM is already the cloud-init
one; re-running the steps would only delete and recreate a correct VM. Keep it
for the next forced recreation (image rotation, zone move, disk resize).

Known wart from the 2026-06-30 run: the `sed` used then was unanchored, so the
live VM's `user-data` contains the API key twice — once on `--api-key=` and once
in the header comment. It is the same metadata blob with the same readers, so it
widens nothing, but the anchored `sed` above fixes it on the next recreation.

Safety net: site search falls back to Firestore whenever Typesense is
unreachable (see the top of this doc), and the index rebuilds from Firestore
via `scripts/sync-typesense.ts`. Firestore is the source of truth, so the
cutover risks no permanent data loss and search keeps serving (degraded)
throughout.

Procedure used — recreate in place, keeping the same name + static IP so no
env vars change:

```bash
KEY=<api-key>   # current TYPESENSE_API_KEY
sed "/--api-key=/s/__TYPESENSE_API_KEY__/$KEY/" deploy/typesense-cloud-init.yaml > /tmp/typesense-user-data.yaml

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

For zero search degradation next time: bring up a second VM on an ephemeral IP
with the same cloud-init, sync and verify it, then move `typesense-ip` over and
delete the old VM.

### Prevent regressions (optional, org-level, not yet enabled)

Enforcing the Organization Policy from the deprecation notice stops the
deprecated agent being reintroduced. The cloud-init VM does not use the agent,
so this is safe to enable (requires `orgpolicy.policyAdmin`):

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
