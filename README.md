# GPTwiki

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Run-4285F4)](https://cloud.google.com/run)

GPTwiki turns AI conversations into public articles. A reader can inspect an answer and its sources, ask a follow-up, and publish what they learned. Article authors can merge useful replies into the text and keep an edit history.

Read a worked example about choosing between REST and GraphQL. The English and Chinese editions have separate article URLs and can be shared directly. [English edition](https://gptwiki.net/en/wiki/rUv7kEjhIVeGvMG4Bghc) · [中文版本](https://gptwiki.net/zh/wiki/O4IfXD0pIhjXgZzFUJPM)

- Ask your own question after signing in. A deployment can fund a daily allowance or let you use your own provider key. [Start a conversation](https://gptwiki.net/en/chat)
- Compare two anonymous model answers and vote before seeing the model names. The Arena explains which votes qualify for its rankings. [Try the Arena](https://gptwiki.net/en/arena/battle) · [Voting rules](https://gptwiki.net/en/arena/rules)
- Contribute a correction, a source or a translation. Editorial batches receive human review before publication. [Contribution guide](CONTRIBUTING.md) · [Open editorial reviews](https://github.com/oratis/GPTwiki/pulls?q=is%3Apr+is%3Aopen+head%3Aauto-draft%2F)

## Features

- **Multi-Model AI** - Choose between Claude (Anthropic), GPT-4o (OpenAI), or Gemini 3.6 Flash (Google)
- **Bring Your Own Key** - Add your own API keys in your profile; they're encrypted at rest (AES-256-GCM)
- **Optional Free Tier** - Self-hosters can grant users free platform-keyed messages per day (`FREE_DAILY_MESSAGES`, off by default)
- **Citations** - AI-generated articles include a References section with supporting sources
- **Conversation Threads** - Every article carries its conversation; readers ask follow-ups that grow the article
- **Wikipedia Attribution** - Mirrored Wikipedia content carries CC BY-SA attribution and links to the original
- **Conversation to Wiki** - Publish AI conversations as structured, searchable wiki articles
- **15 Languages** - Built-in i18n with auto browser detection: EN, ZH, JA, KO, ES, FR, DE, PT, RU, AR, HI, IT, TR, VI, TH
- **Content sources** - The hosted corpus consists mainly of attributed Wikipedia imports, alongside editorial editions and user-published conversations. An article can be read through any interface locale.
- **Search** - Optional Typesense full-text indexing with a Firestore keyword and tag fallback.
- **Category Browse** - Explore articles organized by topic: science, history, technology, arts, and more
- **Contributor Leaderboard** - Track top contributors and their impact
- **OAuth Login** - Sign in with Google or GitHub
- **Open Source** - MIT license, fully self-hostable
- **PayPal Donations** - Support the project directly

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Database | Google Cloud Firestore |
| Auth | NextAuth.js (Google + GitHub OAuth) |
| AI | Anthropic Claude, OpenAI GPT-4o, Google Gemini 3.6 Flash |
| Deployment | Google Cloud Run (Docker) |
| CI/CD | Google Cloud Build |
| Analytics | Google Analytics 4 |
| Payments | PayPal SDK v6 |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/oratis/GPTwiki.git
cd GPTwiki

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | Yes | NextAuth encryption secret (`openssl rand -base64 32`) |
| `AUTH_GOOGLE_ID` | Yes | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Yes | Google OAuth Client Secret |
| `AUTH_GITHUB_ID` | Yes | GitHub OAuth Client ID |
| `AUTH_GITHUB_SECRET` | Yes | GitHub OAuth Client Secret |
| `FIREBASE_PROJECT_ID` | Yes | Google Cloud project ID |
| `FIREBASE_CLIENT_EMAIL` | Yes | Service account email |
| `FIREBASE_PRIVATE_KEY` | Yes | Service account private key |
| `ANTHROPIC_API_KEY` | Optional | Anthropic API key (Claude) |
| `OPENAI_API_KEY` | Optional | OpenAI API key (GPT-4o) |
| `GOOGLE_AI_API_KEY` | Optional | Google AI API key (Gemini) |
| `FREE_DAILY_MESSAGES` | Optional | Free platform-keyed messages per user per day (default 0 = BYOK-only) |
| `PLATFORM_OWNER_EMAIL` | Optional | Account exempt from the free-tier metering. No default: when unset, nobody is exempt |
| `TYPESENSE_HOST` / `TYPESENSE_API_KEY` | Optional | Self-hosted Typesense search backend (see `docs/typesense.md`); falls back to Firestore keyword search when unset |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 measurement id (`G-…`). **Build-time only** — Next inlines `NEXT_PUBLIC_*` during `next build`, so it must be passed as a Docker build arg (`--build-arg NEXT_PUBLIC_GA_ID=…`, or `--substitutions=_GA_ID=…` via `cloudbuild.yaml`); setting it on the running service has no effect. No default: when unset, Google Analytics is not loaded at all |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Optional | PayPal Client ID for donations |
| `PAYPAL_CLIENT_SECRET` | Optional | PayPal Client Secret |

You only need API keys for the AI models you want to support. Users can also bring their own keys.

## Deployment

### Google Cloud Run (Recommended)

```bash
# Build and deploy via Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Set environment variables
gcloud run services update gptwiki \
  --region us-central1 \
  --set-env-vars "AUTH_SECRET=xxx,ANTHROPIC_API_KEY=xxx,..."

# Map custom domain
gcloud beta run domain-mappings create \
  --service gptwiki \
  --domain your-domain.com \
  --region us-central1
```

### Docker

```bash
docker build -t gptwiki .
docker run -p 3000:3000 --env-file .env.local gptwiki
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    api/                  # API routes (chat, wiki, search, seed, paypal)
    browse/               # Category browsing page
    chat/                 # AI conversation page
    donate/               # PayPal donation page
    wiki/                 # Wiki list and detail pages
    login/                # OAuth login page
    profile/              # User profile with API key management
  components/
    chat/                 # Chat UI (messages, model selector, publish)
    wiki/                 # Wiki UI (cards, content, search, suggestions)
    layout/               # Header, providers, language switcher, analytics
    profile/              # API key management component
  lib/
    ai/                   # Multi-model AI provider (Claude, GPT, Gemini)
    i18n/                 # 15-language internationalization system
    auth.ts               # NextAuth configuration
    firebase.ts           # Firestore client
    search.ts             # Search and CRUD operations
  types/                  # TypeScript type definitions
```

## How It Works

1. **Ask** - User asks a question via the chat interface, choosing an AI model
2. **Generate** - AI responds with a detailed answer in real-time (streaming)
3. **Discover** - Existing wikis are suggested if similar content already exists
4. **Publish** - User publishes the conversation as a wiki with auto-generated title, summary, and tags
5. **Grow** - Future users find the article, continue the conversation, and enrich the content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

---

Built with [Claude Code](https://claude.ai/code)
