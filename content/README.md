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
| `technology-and-math.ts` | Tech concepts, mathematics, how-things-work | 8 |
| `mind-health-everyday.ts` | Neuroscience, medicine, everyday science | 8 |
| **Total** | | **32** |

`index.ts` re-exports everything as `allDrafts`.

## Publishing them

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
