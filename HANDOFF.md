# Handoff — GPTwiki auto-content pipeline

Paste this whole file into the next session as the opening prompt.

---

## Context: what was wrong and what I did

The auto-content pipeline had been **silently dead for six weeks** while every
workflow reported success. Three independent breaks at once:

1. **The queue pointer never moved.** `auto-author` picks work with
   `pendingTopics(3)` but nothing wrote a status back, so the cron re-drafted the
   *same three topics* every night — 42 open PRs, byte-for-byte identical,
   ~250 wasted Claude generations, from 2026-07-11 to 2026-08-21.
2. **`suggest-topics` was a permanent no-op**, self-capping at a backlog that
   never drained because of (1).
3. **WIF was never configured** — `GCP_WIF_PROVIDER` / `GCP_SEED_SA` were unset,
   so `auto-seed` and `sitemap-shards` self-skipped on every run. Even merging a
   drafts PR would have published nothing.

Live editorial content was frozen at 1,685 docs, newest `lastmod` 2026-07-05,
and **all 60 `recent-*` sitemap buckets were empty** — zero new documents of any
kind, including user-published ones.

All three are fixed and verified end to end. The corpus is now **1,691** docs.

### Merged this session

| PR | What |
|----|------|
| #135 | "create a new article" button was 400ing 100% of the time in production |
| #136 | Firestore read amplification: cache site-wide reads, index popular-wikis sort |
| #137 | **Queue advance** — mark drafted topics, push to `main` not into the PR |
| #140 | **Citation gate** — verify sources resolve before a draft ships |
| #147 | **Bug in #140's own gate** — never trust a negative HEAD (see below) |
| #148 | Requeue closed drafts, date-label figures, node 20→22 |

Also configured (outside git): WIF pool `github-pool` + provider
`github-provider` on GCP project `gptwiki` (689500351321), SA
`gptwiki-server@gptwiki.iam.gserviceaccount.com`, and repo variables
`GCP_WIF_PROVIDER` / `GCP_SEED_SA`. Closed 41 duplicate `auto-draft/*` PRs.

### Verified working

`auto-seed` ran for the first time ever: WIF auth → 3 hero images → 6 Firestore
docs (en+zh), all live with images. A `workflow_dispatch` of `auto-author` then
picked **three new topics**, marked them `drafted`, and pushed the advance to
`main`. `suggest-topics` refilled the backlog (no longer a no-op).

---

## YOUR TASKS, in priority order

### 1. 🔴 SECURITY — a live Feishu secret is in a public repo

**This is the most urgent item and it is not mine to fix.** Verified today:

- `oratis/GPTwiki` is **PUBLIC** (`isPrivate=false`).
- A hardcoded `APP_SECRET = "..."` sits in nine `scripts/write-*.py` files on
  **two remote branches**: `origin/claude/strange-villani-530b4a` and
  `origin/wip/proxy-docs-recovery` (tip dated **2026-08-08** — this
  *re-introduced* the files six weeks after they were untracked from `main`).
- It is also reachable from history via commits `00c5244` (v0.0.2) and
  `8524697`.
- `.gitignore:57` lists `/scripts/write-*.py`, but gitignore does not untrack
  files already in the index — which is exactly how the 2026-08-08 branch
  re-added them.

**The fix is rotation, not git surgery.** Tell the user to rotate the secret in
the Feishu console first — that is an owner action, it has not happened in eight
weeks, and it does not depend on any PR. History scrubbing is secondary and
destructive; do not run `git filter-repo` or delete branches without explicit
per-action confirmation.

PR #57 adds the runbook for this. Merging it fixes nothing by itself — say so
rather than letting the merge read as the item being closed. Its §3 branch
inventory is stale: the `pr/1`…`pr/42` branches it names are all gone, and it
does not mention `wip/proxy-docs-recovery`, which is the branch that actually
matters now.

### 2. Close #138 and requeue its topics

Decided with the user, not yet executed. **Do not merge #138** — I reviewed it
against the runbook's "review facts + sources" gate and held it:

- `air-fryer-vs-convection-oven` — **no usable sources at all**. ATK, DOE and
  Cook's Illustrated all `404`; Serious Eats bot-blocked. Its "20–30% faster"
  claim is unsourced.
- `led-vs-incandescent-math` — two DOE `energy.gov/energysaver/*` URLs dead
  (DOE retired that whole section), **and** it is internally inconsistent: states
  `$0.16/kWh` but computed its table at `~$0.1333/kWh`, so every cost cell is
  ~20% below its own stated basis. Its "$55–$80 lifetime savings" is contradicted
  by its own arithmetic three lines later (~$122–$204). Quotes a superseded DOE
  forecast (348 TWh by 2027; current DOE figure is 569 TWh by 2035).
- `password-manager-worth-it` — Bitwarden whitepaper `404`; lists **Firefox
  Lockwise**, discontinued Dec 2021, as a current product; cites the withdrawn
  NIST SP 800-63-3 rather than -63-4; and reassures that encrypted vaults make a
  breach harmless in the same sentence that cites LastPass, which is the case
  that disproves it.

Steps:

```bash
gh pr close 138 --delete-branch
npx tsx scripts/requeue-drafted.ts --apply   # drafted → pending, else stranded
```

Then commit `content/backlog.ts` **directly to main** (that path is in no
workflow's trigger paths, so it loops nothing) and let the daily cron redraft
them with the citation gate and date directives now in place. Expect
`air-fryer-vs-convection-oven` to be skipped repeatedly if the model still can't
find real sources — that is the gate working, not a bug. If it keeps failing,
reword or drop the topic.

### 3. Do NOT blind-apply the corpus citation sweep

`scripts/backfill-source-health.ts` exists and works, dry-run by default. A
40-doc dry run found 9 docs with dead links — **several would drop to zero
sources**. Whether an uncited article beats one with a dead citation is an
editorial call. Get an explicit decision before `--apply`.

### 4. Stale June PRs #55–#64 — triaged, awaiting decisions

Assessed against current `main`. Verdicts: 2 merge-soon, 7 needs-rework, 1
superseded.

| PR | Verdict | Note |
|----|---------|------|
| #57 | merge-soon | Security runbook — see task 1. Merge ≠ fixed. |
| #64 | merge-soon | Typesense VM: the live cutover **already happened** 2026-06-30 using this PR's own runbook. Merge as a record so the repo matches reality — but rewrite the future-tense "must migrate before 2026-07-31" framing first, or it tells someone to recreate a correct VM. Also: its `sed` is unanchored and substituted the API key into a YAML *comment*, so the live VM metadata carries the key twice. |
| #60 | needs-rework | **Highest value.** SEO FAQPage + BreadcrumbList; verified it auto-merges clean and typechecks. Nothing on main emits either. |
| #56 | needs-rework | Global AI spend cap — still unimplemented on main, still a real exposure. |
| #59 | needs-rework | Split it: newsletter capture is good; the GA4 half conflicts with the analytics architecture main adopted later. |
| #62 | needs-rework | Goal survives, implementation doesn't; pages are still `force-dynamic`. |
| #55, #58, #63 | needs-rework | Low value; premises now stale. |
| #61 | superseded | Home-page caching already done by #136. |

### 5. Lower priority

- **`sitemap-shards`** is unblocked by WIF and runs Sundays 04:23 UTC. It streams
  ~19M docs and may approach its 330-min timeout — if so, move it to a Cloud Run
  Job in the Firestore region (`Dockerfile.backfill` is the pattern).
- **CI never runs on `auto-draft/*` PRs.** GitHub suppresses workflows on PRs
  authored by `GITHUB_TOKEN` — runs land `action_required` and never execute.
  That is why 42 PRs sat with zero checks. Worked around by running the gates
  *inside* the drafting job. To get real PR checks, create the PR with a PAT or
  GitHub App token instead.

---

## Things that will bite you

**Never conclude a URL is dead from `curl`.** I did, and reported a false
finding to the user. FDA's WAF serves a hard `404` to curl for a URL a normal
client fetches fine (verified `200`, 59KB, correct title). Conversely
`cloud.google.com/learn/containers-vs-vms` answers `404` to **HEAD** and `200`
with 40KB to GET — that one was a real bug in my own gate (#147), which would
have deleted a live citation from a published article. Use
`scripts/lib/source-health.ts`; it handles both directions and has 16 tests.

**Green workflows ≠ published content.** Every break above was invisible from
the Actions tab. The health signal is the live corpus:

```bash
curl -s "https://gptwiki.net/api/sitemap?page=editorial" | grep -oE '<lastmod>[^<]+' | sort | tail -1
```

If that is more than a few days old, the pipeline is stalled regardless of run
status. Note it is cached 1 hour — fetch a doc URL directly to confirm a fresh
publish.

**`content/backlog.ts` is edited as source text**, by a shared regex
(`setTopicStatus`) that assumes one single-line entry per topic. Reformatting
that array silently stalls the queue. `scripts/test-backlog-pointer.ts` pins it.

**The backlog's own comment line contains the literal `status: 'pending'`**, so
naive greps overcount by one. Count `topicKey:` lines instead.

**The editorial gate is a human one.** The citation gate checks that a URL
*resolves*, not that it *supports the claim*, and nothing checks arithmetic. The
#138 problems above were found by reading the articles. Do not rubber-stamp a
drafts PR because CI is green.

---

## Current state

- `main` @ `ff76a55`, CI green, **11/11 test suites pass**
- Live editorial corpus **1,691** docs, newest `2026-08-21T06:12:19Z`
- Backlog: **18 seeded / 3 drafted (#138, to be requeued) / 12 pending**
- Open PRs: **11** — #138 plus the ten June ones
- Working dir: `/Users/oratis/Documents/Claude/GPTwiki/.claude/worktrees/busy-kilby-a1b195`
- Runbook: `docs/auto-content-ops.md` (updated; WIF section marked done)
