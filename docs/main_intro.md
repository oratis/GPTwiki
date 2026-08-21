# GPTwiki — AI-Powered Collaborative Wiki

## Project Overview

GPTwiki is an AI-powered collaborative wiki platform where users ask questions to Claude, GPT-4o, or Gemini, and the AI responses become permanent, searchable wiki articles. The platform supports 15 languages with 280,000+ pre-seeded articles from Wikipedia.

* **Website:** <https://gptwiki.net>

* **GitHub:** <https://github.com/oratis/GPTwiki>

* **License:** MIT

***

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript)                      |
| Styling    | Tailwind CSS 4                                           |
| Database   | Google Cloud Firestore                                   |
| Auth       | NextAuth.js (Google + GitHub OAuth)                      |
| AI Models  | Anthropic Claude, OpenAI GPT-4o, Google Gemini 2.0 Flash |
| Deployment | Google Cloud Run (Docker, Cloud Build)                   |
| Analytics  | Google Analytics 4 (G-G6DSDW9X5D)                        |
| Payments   | PayPal SDK v6 (Live)                                     |
| i18n       | 15 languages (auto-detect + manual switch)               |

***

## Project Structure

```
GPTwiki/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes (20 endpoints)
│   │   │   ├── auth/[...nextauth]/   # OAuth handler
│   │   │   ├── chat/                 # POST - Stream AI responses
│   │   │   ├── feed/                 # GET - RSS feed
│   │   │   ├── leaderboard/          # GET - Top contributors
│   │   │   ├── og/                   # GET - OG image generation
│   │   │   ├── paypal/               # PayPal payment (config/create/capture)
│   │   │   ├── search/               # GET - Wiki search
│   │   │   ├── seed/                 # Database seeding
│   │   │   │   └── wikipedia/        # Wikipedia bulk import
│   │   │   ├── sitemap/              # GET - XML sitemap (paginated)
│   │   │   ├── tags/                 # GET - All tags
│   │   │   ├── user/                 # User profile & API keys
│   │   │   └── wiki/                 # Wiki CRUD + by-tag + recent
│   │   ├── browse/                   # Category browsing page
│   │   ├── chat/                     # Chat page (requires auth)
│   │   ├── donate/                   # PayPal donation page
│   │   ├── login/                    # OAuth login page
│   │   ├── profile/[id]/            # User profile page
│   │   ├── wiki/                     # Wiki list page
│   │   │   └── [id]/                # Wiki detail page
│   │   ├── layout.tsx               # Root layout (metadata, GA, JSON-LD)
│   │   ├── page.tsx                 # Home page (hero + search + leaderboard)
│   │   └── robots.ts               # robots.txt config
│   │
│   ├── components/                   # React Components
│   │   ├── chat/                    # Chat interface
│   │   │   ├── ChatInterface.tsx    # Main chat UI
│   │   │   ├── MessageBubble.tsx    # Message with markdown rendering
│   │   │   ├── ModelSelector.tsx    # AI model picker
│   │   │   └── PublishDialog.tsx    # Publish chat as wiki
│   │   ├── layout/                  # Layout components
│   │   │   ├── GoogleAnalytics.tsx  # GA4 tracking
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── LanguageSwitcher.tsx # Language selector
│   │   │   └── Providers.tsx        # Auth + i18n context
│   │   ├── profile/
│   │   │   └── ApiKeyManager.tsx    # User API key management
│   │   └── wiki/                    # Wiki components
│   │       ├── LeaderboardSection.tsx
│   │       ├── RecentWikisSection.tsx
│   │       ├── ShareButtons.tsx     # Social share (Twitter/FB/LinkedIn/Reddit)
│   │       ├── WikiCard.tsx
│   │       ├── WikiContent.tsx
│   │       ├── WikiContinueChat.tsx # Follow-up + append/create new wiki
│   │       └── WikiSearch.tsx
│   │
│   ├── lib/                          # Core Libraries
│   │   ├── ai/                      # AI Provider Integration
│   │   │   ├── claude.ts            # Anthropic Claude streaming
│   │   │   ├── openai.ts            # OpenAI GPT-4o streaming
│   │   │   ├── gemini.ts            # Google Gemini streaming
│   │   │   ├── provider.ts          # Model dispatcher + wiki generation
│   │   │   └── resolve-key.ts       # API key resolution (user → system)
│   │   ├── i18n/                    # Internationalization
│   │   │   ├── context.tsx          # i18n React context
│   │   │   ├── locales.ts           # 15 supported languages
│   │   │   └── translations.ts     # All translation strings
│   │   ├── auth.ts                  # NextAuth config
│   │   ├── firebase.ts             # Firestore lazy singleton
│   │   ├── models.ts               # Model display names
│   │   ├── rate-limit.ts           # In-memory rate limiter
│   │   ├── search.ts               # Firestore queries
│   │   ├── utils.ts                # Utility functions
│   │   └── validation.ts           # Zod input validation
│   │
│   └── types/
│       └── index.ts                 # TypeScript type definitions
│
├── scripts/                          # Seeding & utility scripts
│   ├── seed-100k.sh                 # Bulk Wikipedia seeding
│   ├── seed-bulk.sh
│   ├── seed-local.sh
│   ├── write-feishu-v2.py          # Feishu document writer
│   └── write-*.py                   # Various promotion scripts
│
├── docs/                             # Documentation
│   ├── main_intro.md               # This file
│   └── gptwiki-promotion-plan.md   # Marketing plan
│
├── Dockerfile                        # Multi-stage Docker build
├── cloudbuild.yaml                   # GCP Cloud Build CI/CD
├── next.config.ts                    # Next.js config (standalone)
├── tsconfig.json                     # TypeScript config (ES2022, strict)
├── package.json                      # Dependencies & scripts
├── .gcloudignore                     # Cloud Build exclusions
├── .dockerignore                     # Docker exclusions
├── LICENSE                           # MIT License
└── README.md                         # Project README
```

***

## API Endpoints

### Authentication

| Method | Route                     | Description            |
| ------ | ------------------------- | ---------------------- |
| \*     | `/api/auth/[...nextauth]` | NextAuth OAuth handler |

### Chat

| Method | Route       | Description        | Rate Limit  |
| ------ | ----------- | ------------------ | ----------- |
| POST   | `/api/chat` | Stream AI response | 20/min/user |

### Wiki

| Method | Route              | Description               | Rate Limit   |
| ------ | ------------------ | ------------------------- | ------------ |
| GET    | `/api/wiki`        | List wikis                | -            |
| POST   | `/api/wiki`        | Create wiki               | 10/5min/user |
| GET    | `/api/wiki/[id]`   | Get wiki by ID            | -            |
| PUT    | `/api/wiki/[id]`   | Update wiki (author only) | -            |
| GET    | `/api/wiki/by-tag` | Wikis by tag              | -            |
| GET    | `/api/wiki/recent` | Recent wikis              | -            |

### Search & Browse

| Method | Route              | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/api/search`      | Full-text wiki search |
| GET    | `/api/tags`        | All tag categories    |
| GET    | `/api/leaderboard` | Top contributors      |

### User

| Method  | Route                | Description     |
| ------- | -------------------- | --------------- |
| GET     | `/api/user/[id]`     | User profile    |
| GET/PUT | `/api/user/api-keys` | Manage API keys |

### SEO & Feed

| Method | Route          | Description                          |
| ------ | -------------- | ------------------------------------ |
| GET    | `/api/sitemap` | Sitemap index (paginated, 5000/page) |
| GET    | `/api/feed`    | RSS 2.0 feed (latest 50 articles)    |
| GET    | `/api/og`      | Dynamic OG image generation          |

### Payments

| Method | Route                       | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/paypal/config`        | PayPal client config |
| POST   | `/api/paypal/create-order`  | Create payment order |
| POST   | `/api/paypal/capture-order` | Capture payment      |

### Admin

| Method | Route                 | Description                           |
| ------ | --------------------- | ------------------------------------- |
| POST   | `/api/seed/wikipedia` | Wikipedia bulk import (auth required) |

***

## Pages

| Route           | Auth     | Description                                               |
| --------------- | -------- | --------------------------------------------------------- |
| `/`             | Public   | Home: hero section + search + popular wikis + leaderboard |
| `/wiki`         | Public   | Browse all wikis                                          |
| `/wiki/[id]`    | Public   | Wiki article detail + share buttons                       |
| `/browse`       | Public   | Category browsing (auto-select first tag)                 |
| `/chat`         | Required | Create new wiki via AI conversation                       |
| `/login`        | Public   | Google / GitHub OAuth login                               |
| `/profile/[id]` | Public   | User profile + created wikis + API key management         |
| `/donate`       | Public   | PayPal donation (preset amounts)                          |

***

## Database Schema (Firestore)

### Collection: `wikis`

```typescript
{
  id: string;              // Firestore document ID
  title: string;           // Article title
  question: string;        // Original question
  content: string;         // Markdown content
  summary: string;         // First 300 chars
  tags: string[];          // Category tags + language code
  authorId: string;        // User ID or 'system'
  authorName: string;      // Display name
  authorImage?: string;    // Avatar URL
  aiModel: 'claude' | 'gpt' | 'gemini';
  conversation: Message[]; // Full chat history
  views: number;           // View count
  createdAt: number;       // Unix timestamp
  updatedAt: number;       // Unix timestamp
  source?: string;         // 'wikipedia-en', 'seed', etc.
  language?: string;       // Language code
}
```

### Collection: `users`

```typescript
{
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: string;        // 'google' | 'github'
  wikisCount: number;
  createdAt: number;
  apiKeys?: {
    anthropic?: string;
    openai?: string;
    google?: string;
  }
}
```

***

## Core Workflows

### Chat → Wiki Creation

1. User logs in via Google/GitHub OAuth
2. Opens `/chat`, selects AI model (Claude/GPT-4o/Gemini)
3. Asks a question, receives streamed AI response
4. Clicks "Publish as Wiki" → dialog to edit title/tags
5. Article saved to Firestore, visible to all users

### Follow-up → Append or Create New

1. User views existing wiki article
2. Clicks "Continue Chat" to ask follow-up questions
3. After receiving answer, two options:

   * **"Append to Wiki"** (author only) — regenerates wiki content with extended conversation

   * **"Create New Wiki"** (any user) — spawns a new article from the follow-up Q\&A

### API Key Resolution

1. Check if user has their own API key for the selected model
2. If not, and `PLATFORM_OWNER_EMAIL` is configured, check whether the user's
   email matches it — that account uses the platform key unmetered. There is no
   default: when the variable is unset, nobody qualifies.
3. Otherwise fall to the free daily quota, and if that is off or spent, return
   an error prompting the user to configure their own API key

***

## SEO Infrastructure

| Feature          | Status | Details                                                 |
| ---------------- | ------ | ------------------------------------------------------- |
| Sitemap          | ✅      | `/api/sitemap` — paginated (5000 URLs/page), 280K+ URLs |
| robots.txt       | ✅      | Allow crawling, block /api/ (except sitemap/feed/og)    |
| RSS Feed         | ✅      | `/api/feed` — RSS 2.0, latest 50 articles               |
| OG Images        | ✅      | `/api/og?title=X` — dynamic 1200×630 cards              |
| JSON-LD          | ✅      | WebSite + SearchAction structured data                  |
| Meta Tags        | ✅      | Per-page OG/Twitter Card metadata                       |
| Google Analytics | ✅      | GA4 (G-G6DSDW9X5D)                                      |
| Social Share     | ✅      | Twitter/Facebook/LinkedIn/Reddit + Copy link            |

***

## i18n Support

15 languages with auto browser detection:

| Code | Language  | Code   | Language   |
| ---- | --------- | ------ | ---------- |
| en   | English   | ru     | Русский    |
| zh   | 中文        | ar     | العربية    |
| ja   | 日本語       | hi     | हिन्दी     |
| ko   | 한국어       | it     | Italiano   |
| es   | Español   | tr     | Türkçe     |
| fr   | Français  | vi     | Tiếng Việt |
| de   | Deutsch   | th     | ไทย        |
| pt   | Português | <br /> | <br />     |

***

## Deployment

### Local Development

```bash
npm install
cp .env.example .env.local  # Fill in API keys
npm run dev                  # http://localhost:3000
```

### Production (Google Cloud Run)

```bash
# Build & deploy via Cloud Build
gcloud builds submit --config=cloudbuild.yaml --project=gptwiki

# Or manual Docker
docker build -t gptwiki .
docker run -p 3000:3000 --env-file .env.local gptwiki
```

### Environment Variables

```
# Auth
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Firebase
FIREBASE_PROJECT_ID=gptwiki
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# AI (system fallback keys)
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=

# PayPal (Live)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

***

## Content Statistics (as of April 2026)

| Metric            | Value                                |
| ----------------- | ------------------------------------ |
| Total Articles    | 286,000+                             |
| Languages         | 15                                   |
| English Articles  | \~55,000                             |
| Chinese Articles  | \~25,000                             |
| Japanese Articles | \~23,000                             |
| Content Source    | Wikipedia (seed) + User AI-generated |
| Sitemap Coverage  | 280,000+ URLs                        |

***

## Security

* **Authentication:** NextAuth.js with OAuth 2.0 (Google, GitHub)

* **Authorization:** Session-based, user.id checks for wiki ownership

* **API Key Storage:** Firestore (encrypted at rest by GCP)

* **Rate Limiting:** In-memory, per-user (chat: 20/min, wiki: 10/5min)

* **Input Validation:** Zod schemas for all API inputs

* **HTTPS:** Enforced by Cloud Run / domain mapping

***

## License

MIT License — see [LICENSE](../LICENSE)
