<div align="center">

# GPTwiki

### Turn every good AI conversation into a wiki article the next person can find — and keep asking.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/oratis/GPTwiki?style=social)](https://github.com/oratis/GPTwiki/stargazers)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Open-source, self-hostable, multi-model (Claude · GPT-4o · Gemini), 15 languages.**

[**Try it → gptwiki.net**](https://gptwiki.net) · [Quick start](#quick-start) · [How it works](#how-it-works) · [Contributing](CONTRIBUTING.md)

<!--
  DEMO GIF — drop the 15–30s recording at docs/assets/demo.gif before launch.
  Storyboard/shot-list: docs/demo-gif-shotlist.md
-->
![GPTwiki demo: ask a question, get a cited answer, publish it as a multilingual wiki article others can grow](docs/assets/demo.gif)

</div>

---

## What is this?

Wikipedia can't answer a question that isn't already written, and editing it is hard.
ChatGPT can answer anything, but the answer vanishes when the tab closes — nobody else
ever sees it. **GPTwiki closes the loop.**

- **Ask** a question in any of 15 languages — the AI answers *with citations*.
- **Publish** the conversation as a structured, searchable article with its own URL.
- **Grow** — anyone can ask a follow-up thread, and good follow-ups get merged back
  into the article. Knowledge compounds instead of disappearing.

It's an **alternative to** a wiki you can't ask questions of, and to a chatbot whose
answers nobody can find later.

> ⭐ **If the idea resonates, [star the repo](https://github.com/oratis/GPTwiki) —**
> it's the single biggest help for a young open-source project, and it takes one click.

## Quick start

```bash
git clone https://github.com/oratis/GPTwiki.git && cd GPTwiki
npm install
cp .env.example .env.local      # add at least one AI key + auth/Firebase creds
npm run dev                     # → http://localhost:3000
```

That's it. You only need an API key for the model(s) you want to enable — users can
also bring their own. See [Environment variables](#environment-variables) for the
full list, or [Deployment](#deployment) to ship it to Cloud Run.

## Screenshot

<!-- Drop a homepage/article screenshot at docs/assets/screenshot.png before launch. -->
![GPTwiki article page](docs/assets/screenshot.png)

## Why it's interesting (for developers)

- **Production-grade Next.js 16 reference** — App Router, full SSR/SSG/ISR, a
  multi-model streaming abstraction, and engineering-grade i18n SEO (hreflang
  sitemap across 15 locales + x-default, JSON-LD, canonical, dynamic OG images).
- **Self-hostable** — MIT-licensed, runs on Cloud Run + Firestore. Bring your own
  keys, or grant users a metered free tier.
- **AI-crawler friendly** — content is in the HTML (SSR), so answer engines like
  Perplexity/ChatGPT can actually read and cite it.

## Features

- **Multi-Model AI** — Claude (Anthropic), GPT-4o (OpenAI), or Gemini 2.0 Flash (Google)
- **Bring Your Own Key** — add your own keys in your profile; encrypted at rest (AES-256-GCM)
- **Controlled free tier** — optionally grant signed-in users N free platform-keyed
  messages/day, routed to the cheapest model with a global daily cost cap
  (`FREE_DAILY_MESSAGES`, off by default)
- **Citations** — generated articles include a References section
- **Conversation threads** — readers ask follow-ups that grow the article
- **Wikipedia attribution** — mirrored content carries CC BY-SA attribution + links
- **15 languages** — EN, ZH, JA, KO, ES, FR, DE, PT, RU, AR, HI, IT, TR, VI, TH (auto-detected)
- **Smart search** — full-text across published articles (Typesense, with a Firestore fallback)
- **Category browse**, **contributor leaderboard**, **OAuth login** (Google/GitHub)
- **Open source** — MIT, fully self-hostable

## How it works

1. **Ask** — choose a model and ask a question via the chat interface.
2. **Generate** — the AI streams a detailed, cited answer in real time.
3. **Discover** — similar existing articles are surfaced before you publish.
4. **Publish** — the conversation becomes an article with auto-generated title,
   summary, and tags, at its own multilingual URL.
5. **Grow** — others find it, ask follow-ups, and the best ones merge into the article.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Google Cloud Firestore |
| Auth | NextAuth.js (Google + GitHub OAuth) |
| AI | Anthropic Claude, OpenAI GPT-4o, Google Gemini 2.0 Flash |
| Search | Typesense (self-hosted), Firestore keyword fallback |
| Deployment | Google Cloud Run (Docker) |
| CI/CD | Google Cloud Build |
| Analytics | Google Analytics 4 |

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | NextAuth encryption secret (`openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Yes | Google OAuth credentials |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Yes | GitHub OAuth credentials |
| `FIREBASE_PROJECT_ID` | Yes | Google Cloud project ID |
| `FIREBASE_CLIENT_EMAIL` | Yes | Service account email |
| `FIREBASE_PRIVATE_KEY` | Yes | Service account private key |
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GOOGLE_AI_API_KEY` | Optional | Keys for the models you want to enable |
| `FREE_DAILY_MESSAGES` | Optional | Free platform-keyed messages per user/day (default 0 = BYOK-only) |
| `FREE_TIER_MODEL` | Optional | Model free-tier traffic is routed to (default `gemini`, the cheapest) |
| `FREE_GLOBAL_DAILY_MESSAGES` | Optional | Platform-wide daily cap on free messages; auto-downgrades to BYOK when hit |
| `PLATFORM_OWNER_EMAIL` | Optional | Account exempt from free-tier metering |
| `TYPESENSE_HOST` / `TYPESENSE_API_KEY` | Optional | Self-hosted Typesense (see `docs/typesense.md`); falls back to Firestore |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | Optional | PayPal donations |

You only need keys for the AI models you want to support.

## Deployment

### Google Cloud Run (recommended)

```bash
gcloud builds submit --config cloudbuild.yaml

gcloud run services update gptwiki \
  --region us-central1 \
  --set-env-vars "AUTH_SECRET=xxx,ANTHROPIC_API_KEY=xxx,..."

gcloud beta run domain-mappings create \
  --service gptwiki --domain your-domain.com --region us-central1
```

### Docker

```bash
docker build -t gptwiki .
docker run -p 3000:3000 --env-file .env.local gptwiki
```

## Project structure

```
src/
  app/            # Next.js App Router pages + API routes (chat, wiki, search, paypal)
  components/     # chat/, wiki/, layout/, profile/ UI
  lib/
    ai/           # Multi-model provider (Claude, GPT, Gemini) + free-tier metering
    i18n/         # 15-language internationalization
    auth.ts firebase.ts search.ts
  types/          # TypeScript types
content/          # Localized editorial content clusters
docs/             # Architecture, SEO, and ops docs
```

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for setup, the
PR workflow, and good first issues. Be kind; we follow a standard
[Code of Conduct](CONTRIBUTING.md#code-of-conduct).

## License

[MIT](LICENSE) · Built with [Claude Code](https://claude.ai/code)
