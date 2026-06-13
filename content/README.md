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

| File | Theme | Articles |
|------|-------|----------|
| `ai-in-practice.{en,zh,ja,ko,es,fr,de}.ts` | AI decision/how-to: RAG vs fine-tuning, agents, MCP, local LLMs, tokens… | 10 topics × 7 langs = 70 |
| `personal-finance.{en,zh,ja,ko,es,fr,de}.ts` | Money basics: compound interest, index funds, inflation, DCA, risk… | 12 topics × 7 langs = 84 |
| `digital-security.{en,zh,ja,ko,es,fr,de}.ts` | Privacy & security: password managers, 2FA, passkeys, phishing, VPN, E2EE… | 9 topics × 7 langs = 63 |
| `digital-buying.{en,zh}.ts` | Gadget tech explained: OLED vs LCD, ANC, SSD, megapixels, USB-C… | 10 topics × en/zh = 20 |
| `health-basics.{en,zh}.ts` | Health/nutrition myths: caffeine, sleep, protein, metabolism, hydration… | 9 topics × en/zh = 18 |
| `dev-practices.{en,zh}.ts` | Dev concepts: rebase vs merge, REST vs GraphQL, SQL vs NoSQL, HTTPS, Docker, Big-O… | 9 topics × en/zh = 18 |
| **Total** | | **50 topics, 273 docs** |

**Phase 2 (language expansion)** is underway. Because heroes are cached per
`topicKey`, adding a language variant reuses the existing image at **zero**
generation cost. To expand a cluster to a new locale: add a
`content/<name>.<lang>.ts` (mirror an existing variant — `promptOf()` shares
the en image prompts; finance/health also append a localized `NOTE`
disclaimer), append it to the `<name>.ts` barrel, and re-run
`--batch=<name> --apply` (existing locales are skipped by the
`(title, language)` de-dup). The 3 lead clusters above are at 7 languages;
`digital-buying`/`health-basics`/`dev-practices` and locales beyond
en/zh/ja/ko/es/fr/de remain.

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
