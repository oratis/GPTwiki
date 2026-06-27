# Launch flood-resistance audit

Prep for the launch spike (GTM plan §2.3). An HN front-page placement is
≈ 50 UV/minute, bursting higher. The risk is an uncached page re-reading
Firestore (cost + latency) or shipping a multi-MB payload on every request — a
known failure mode (one 8 MB page on a viral spike billed \$110 / 233 GB).

## Caching posture by route (current)

| Route | Render | Firestore on every hit? | Verdict |
|-------|--------|--------------------------|---------|
| `wiki/[id]` (article) | ISR `revalidate=3600` + top-50×15-locale prerender | No — served from ISR cache | ✅ good |
| `embed/[id]` | ISR `revalidate=3600` | No | ✅ good |
| `/[locale]` (home) | `force-dynamic` | **Was: yes** → now **60s data cache** (`unstable_cache`) | ✅ fixed in this PR |
| `wiki` (list / search) | `force-dynamic` | Yes | 🟡 see below |
| `browse`, `tags/[tag]` | `force-dynamic` | Yes | 🟡 see below |

### What this PR changes
The **home page** — the single biggest HN landing target — kept `force-dynamic`
(so a credential-less Docker build can't bake in an empty "no wikis" state) but
re-read Firestore on *every* request. Its `getPopularWikis` + `getRecentWikis`
reads are now wrapped in `unstable_cache` with a **60s TTL per locale**, so a
flood is served from the data cache. Hot articles were already on ISR, so the
two highest-traffic surfaces are now both cache-fronted.

### Still `force-dynamic` (follow-ups, lower risk)
`wiki` (browse list), `browse`, and `tags/[tag]` still read Firestore per
request. They're less likely than home/article pages to be the viral entry
point, but if a category or the browse list is the shared link, apply the same
`unstable_cache` (60s) treatment to their queries. Search results (`wiki?q=`)
should stay uncached (and are already `noindex`).

## Page weight

`next.config.ts` is already well-tuned: AVIF/WebP, `minimumCacheTTL` 31 days,
single quality (75), `next/image` for all remote images. The 2K hero images are
the main weight; `next/image` serves resized/AVIF variants, not the originals.

**Verify after deploy** (target < 1–2 MB/page, transferred):

```bash
# Total transferred bytes for a hot article and the home page:
for url in \
  "https://gptwiki.net/en" \
  "https://gptwiki.net/en/wiki/<HOT_ID>"; do
  echo "$url"
  curl -s -L -o /dev/null -w "  html: %{size_download} bytes\n" "$url"
done
# Or Lighthouse / WebPageTest for the full transferred weight incl. images+JS.
```

If a page exceeds ~2 MB: check that hero images go through `next/image` (not a
raw `<img>` to the 2K original), and that no unexpectedly large client bundle is
imported into a hot route.

## Load-test runbook (owner, against staging)

Confirm cache hits and that origin Firestore reads stay flat under load.

```bash
# 1. Warm the cache, then hit the home page hard for 30s and watch latency/errors.
npx autocannon -d 30 -c 50 https://staging.gptwiki.net/en
npx autocannon -d 30 -c 50 https://staging.gptwiki.net/en/wiki/<HOT_ID>

# 2. While it runs, watch Firestore read ops in the GCP console
#    (Firestore → Usage). With the 60s cache, reads should stay ~flat, NOT
#    scale linearly with request count.

# 3. Confirm CDN/cache headers on the article + embed routes:
curl -sI https://staging.gptwiki.net/en/wiki/<HOT_ID> | grep -iE 'cache|age|x-nextjs'
```

Pass criteria:
- p99 latency stays low and error rate ~0 under 50 concurrent for 30s.
- Firestore read ops do **not** scale linearly with request volume (cache working).
- Hot article + home transferred weight < 1–2 MB.

## Pre-launch checklist

- [ ] Home + hot article load-tested at ≥50 concurrent; latency/error OK.
- [ ] Firestore reads stay flat under load (cache confirmed).
- [ ] Hot pages < 1–2 MB transferred.
- [ ] Cloud Run min-instances ≥ 1 (avoid cold starts at the worst moment) and
      max-instances set high enough for the spike.
- [ ] If browse/tags are likely share targets, cache their queries too.
