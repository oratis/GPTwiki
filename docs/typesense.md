# Typesense search

Site search runs on a self-hosted [Typesense](https://typesense.org/) instance
(product decision #5, 2026-06-11). The per-doc Firestore `keywords` index
(`src/lib/search-keywords.ts`) remains the automatic fallback: if the
`TYPESENSE_*` env vars are unset, the server is down, or a query errors,
`searchWikis()` silently degrades to the Firestore flow.

## Current deployment

- GCE VM `typesense-1` (e2-small, us-central1-a, project `gptwiki`),
  container `typesense/typesense:27.1`, data on the host at `/var/typesense`.
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

```bash
gcloud compute addresses create typesense-ip --region us-central1 --project gptwiki
gcloud compute instances create-with-container typesense-1 \
  --project gptwiki --zone us-central1-a --machine-type e2-small \
  --boot-disk-size 20GB --address typesense-ip --tags typesense \
  --container-image typesense/typesense:27.1 \
  --container-arg="--data-dir=/data" --container-arg="--api-key=<KEY>" \
  --container-mount-host-path=mount-path=/data,host-path=/var/typesense,mode=rw
gcloud compute firewall-rules create allow-typesense --project gptwiki \
  --allow tcp:8108 --target-tags typesense --source-ranges 0.0.0.0/0
curl http://<IP>:8108/health   # → {"ok":true}
```

## Notes

- The collection schema lives in `src/lib/typesense.ts` (`COLLECTION_SCHEMA`);
  content is truncated to ~2000 chars per doc to keep the index lean.
- CJK/Thai queries: Typesense's default tokenizer is weaker for unsegmented
  scripts; the Firestore fallback (character bigrams) covers the gap when
  Typesense returns zero hits.
