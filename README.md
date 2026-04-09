# GPTwiki

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Run-4285F4)](https://cloud.google.com/run)

**The AI-powered collaborative encyclopedia.** Create wiki articles through conversations with Claude, GPT-4o, and Gemini. 100,000+ articles in 15 languages.

**[gptwiki.net](https://gptwiki.net)**

## Why GPTwiki?

Wikipedia requires expert editors. ChatGPT answers vanish after each session. GPTwiki bridges the gap: **ask AI a question, get a wiki article that persists and grows**.

- Ask a question in any of 15 languages
- AI generates a structured, citable article
- The community can continue the conversation and improve the content
- Knowledge compounds over time instead of disappearing

## Features

- **Multi-Model AI** - Choose between Claude (Anthropic), GPT-4o (OpenAI), or Gemini 2.0 Flash (Google)
- **Bring Your Own Key** - Use your own API keys, or use the platform's shared keys
- **Conversation to Wiki** - Publish AI conversations as structured, searchable wiki articles
- **15 Languages** - Built-in i18n with auto browser detection: EN, ZH, JA, KO, ES, FR, DE, PT, RU, AR, HI, IT, TR, VI, TH
- **100K+ Articles** - Pre-seeded with Wikipedia content across all supported languages
- **Smart Search** - Full-text search across all published wiki articles by keywords and tags
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
| AI | Anthropic Claude, OpenAI GPT-4o, Google Gemini 2.0 Flash |
| Deployment | Google Cloud Run (Docker) |
| CI/CD | Google Cloud Build |
| Analytics | Google Analytics 4 |
| Payments | PayPal SDK v6 |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/anthropics/gptwiki.git
cd gptwiki

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
