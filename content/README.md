# Editorial draft articles

Hand-authored, original encyclopedia-style articles for GPTwiki, ready to review and publish.

- **All prose is original** — written from general knowledge, not copied from Wikipedia or any source.
- Each entry matches the seed/`Wiki` schema (`title`, `question`, `content` markdown, `summary`, `tags`, `language`).
- Articles are English (`language: 'en'`), so they slot into the per-locale category/recent filtering.

## Batches

| File | Theme | Articles |
|------|-------|----------|
| `science-and-nature.ts` | Biology, earth science, physics phenomena | 8 |
| `history-and-society.ts` | History, economics, civilization | 8 |
| `technology-and-math.ts` | Tech concepts, mathematics | 8 |
| `mind-health-everyday.ts` | Neuroscience, medicine, everyday science | 8 |
| `space-and-astronomy.ts` | Moon, stars, cosmology, the solar system | 8 |
| `arts-language-culture.ts` | Color, music, typography, language, story | 8 |
| `how-things-work.ts` | Everyday technology explainers (high-SEO "how X works") | 8 |
| **Total** | | **56** |

`index.ts` re-exports everything as `allDrafts`.

## Quality-tier batches (editorial v2)

Newer clusters answer practical decision/how-to questions, ship with a
Seedream-generated hero image per topic, and are written natively in
multiple languages (not translated). They are **not** registered in
`allDrafts` — the legacy seeders de-dup by reading every existing title,
which is unusable at the current corpus size.

All eight clusters are at **all 15 supported locales** (en, zh, ja, ko, es, fr,
de, pt, it, ru, ar, hi, tr, vi, th).

| Cluster | Topics | Docs (×15) |
|------|-------|------|
| `ai-in-practice` | 10 | 150 |
| `personal-finance` | 12 | 180 |
| `digital-buying` | 10 | 150 |
| `digital-security` | 9 | 135 |
| `health-basics` | 9 | 135 |
| `dev-practices` | 9 | 135 |
| `learning-productivity` | 10 | 150 |
| `careers-work` | 10 | 150 |
| `everyday-science` | 10 | en/zh (2) | 20 |
| **Total** | **89** | **1,205 docs** |

Each `<name>.<lang>.ts` file holds one language's variants; `<name>.ts` is the
barrel that spreads all 15 and registers in the `BATCHES` map of
`scripts/seed-editorial.ts`. Every variant shares the per-`topicKey` hero image
via the `promptOf()` helper, so the whole matrix cost ~one image generation per
topic (59 images), reused across all 885 docs.

**Adding more locales** (the matrix is full for the current 15, but the recipe
is reusable): create `content/<name>.<lang>.ts` (mirror an existing variant;
`personal-finance`/`health-basics` append a localized `NOTE` disclaimer),
append it to the `<name>.ts` barrel, run full `tsc`, then
`--batch=<name> --apply` (existing locales are skipped by the
`(title, language)` de-dup, and cached heroes mean zero image cost).

Parallel-localization recipe (used for the wave-2 expansion): spawn one
general-purpose agent per locale, each given `<name>.en.ts` (source) +
an existing `<name>.<lang>.ts` (format template), instructed to self-validate
with `npx tsc --noEmit | grep <file>`. Watch-outs: summaries must stay ≤320
chars (Romance/German/Turkish run long — agents trim); French/Italian/Turkish
need the typographic apostrophe ’ in single-quoted fields; Arabic is RTL
natural text (the app handles direction); keep inline-code backticks escaped.

Parallel-localization recipe (used for the wave-2 expansion): spawn one
general-purpose agent per locale, each given `<name>.en.ts` (source) +
an existing `<name>.<lang>.ts` (format template), instructed to self-validate
with `npx tsc --noEmit | grep <file>`. Watch-outs: summaries must stay ≤320
chars (Romance/German/Turkish run long — agents trim); French/Italian/Turkish
need the typographic apostrophe ’ in single-quoted fields; Arabic is RTL
natural text (the app handles direction); keep inline-code backticks escaped.

Shared bits: `editorial-style.ts` holds the one Seedream visual style every
batch appends to its per-topic image prompt. Each batch's `*.ts` barrel
(`personal-finance.ts` etc.) re-exports `[...En, ...Zh]` and registers in the
`BATCHES` map of `scripts/seed-editorial.ts`.

Seed them with `scripts/seed-editorial.ts` (per-draft `(title, language)`
point-query de-dup, hero generation idempotent per `topicKey`, Typesense
upsert at write time):

```bash
npx tsx scripts/seed-editorial.ts --batch=personal-finance           # dry-run
npx tsx scripts/seed-editorial.ts --batch=personal-finance --apply   # write
npx tsx scripts/seed-editorial.ts --apply --only=mcp-explained       # one topic
```

Adding a new cluster: create `content/<name>.{en,zh}.ts` (zh imports the en
image prompts via a `promptOf` helper so a topic's hero is shared across
languages), a `content/<name>.ts` barrel, and one line in the `BATCHES` map.

Requires `ARK_API_KEY` (Seedream via Volcengine Ark) plus the usual
Firebase/GCS creds in `.env.local`. Published articles are attributed to
the dedicated **`gptwiki-editorial`** identity (`authorName: 'GPTwiki
Editorial'`), `source: 'editorial'`, with `imageUrl/imageWidth/imageHeight`
set and the hero injected into the markdown after the title.

## Publishing them (legacy batches)

A ready-to-run seeder lives at `scripts/seed-drafts.ts`. It de-dupes by title (skips any title already in `wikis`).

```bash
# 1. Make sure .env.local has the Firebase admin creds (same as other seed scripts)
# 2. Preview what would be written (no DB changes):
npx tsx scripts/seed-drafts.ts

# 3. Actually write them:
npx tsx scripts/seed-drafts.ts --apply
```

Published articles are attributed to **GPTwiki Editorial** (`authorId: 'system'`), `aiModel: 'claude'`, `source: 'editorial-draft'`, `views: 0`.

## Reviewing before publishing

These are drafts: please skim each for accuracy and house style before `--apply`. They cover well-established, evergreen topics chosen to be low-risk and high-value for search, and to broaden coverage beyond the existing physics/CS-heavy seed set.
