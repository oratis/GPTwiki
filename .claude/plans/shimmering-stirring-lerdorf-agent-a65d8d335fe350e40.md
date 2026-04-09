# GPTwiki: 5 New Features Implementation Plan

## Codebase Summary

The project is a Next.js App Router application with TypeScript, Tailwind CSS, Firestore (firebase-admin), and NextAuth v5. Key conventions observed:

- All pages are `'use client'` components that fetch data from API routes
- API routes use `NextRequest`/`NextResponse` patterns, auth via `await auth()`
- Data layer functions live in `src/lib/search.ts` using the `db` Firestore proxy from `src/lib/firebase.ts`
- All user-facing strings use `useI18n()` hook with `t('key')` calls; translations defined in `src/lib/i18n/translations.ts` across 15 locales
- Components follow the pattern: `src/components/{domain}/{ComponentName}.tsx`
- Types are centralized in `src/types/index.ts`

---

## Feature 1: User Profile Page

### Overview
Add a `/profile/[id]` page showing a user's info and their published wikis. Add a clickable avatar link in the Header.

### Files to Create

1. **`src/app/profile/[id]/page.tsx`** - Profile page component
   - `'use client'` page component
   - Accept `params: Promise<{ id: string }>` (Next.js 16 pattern, matching `wiki/[id]/page.tsx`)
   - Fetch user profile from `GET /api/user/[id]`
   - Fetch user's wikis from `GET /api/wiki?userId={id}`
   - Display: avatar (large), name, provider badge, join date (using `timeAgo()`), wikisCount
   - Render wiki list using existing `WikiCard` component in the same 3-column grid
   - Show loading skeleton matching homepage pattern
   - Show "No wikis yet" empty state if user has no wikis

2. **`src/app/api/user/[id]/route.ts`** - User profile API
   - `GET` handler: read from `users` collection by doc id
   - Return `UserProfile` (id, name, email, image, provider, wikisCount, createdAt)
   - Return 404 if user not found

### Files to Modify

3. **`src/components/layout/Header.tsx`**
   - Wrap the avatar `<img>` in a `<Link href={`/profile/${session.user.id}`}>` 
   - Add a "My Profile" text link next to the avatar (visible on sm+ screens)
   - Use `t('header.myProfile')` for the link text

4. **`src/lib/search.ts`**
   - Add `getUserProfile(userId: string): Promise<UserProfile | null>` function
   - Reads from `db.collection('users').doc(userId)`

5. **`src/types/index.ts`** - No changes needed; `UserProfile` type already exists

6. **`src/lib/i18n/translations.ts`** - Add keys for all 15 locales:
   - `'header.myProfile'`
   - `'profile.title'` (e.g., "{name}'s Profile")
   - `'profile.joinedAt'`
   - `'profile.wikisCreated'`
   - `'profile.noWikis'`
   - `'profile.noWikisHint'`

### New Firestore Queries
- `db.collection('users').doc(userId).get()` - in `getUserProfile()`

### New API Routes
- `GET /api/user/[id]` - returns UserProfile

### Implementation Notes
- Reuse `WikiCard` directly from `src/components/wiki/WikiCard.tsx`
- Reuse existing `GET /api/wiki?userId=` endpoint (already exists in `src/app/api/wiki/route.ts` line 9-12)
- The `getUserWikis()` function already exists in search.ts

---

## Feature 2: Continue Conversation on Wiki Detail Page

### Overview
On the wiki detail page, allow users to continue the original AI conversation inline and optionally update the wiki with new content generated from the extended conversation.

### Files to Create

1. **`src/components/wiki/WikiContinueChat.tsx`** - Inline continuation chat
   - Props: `{ wikiId: string, originalConversation: Message[], aiModel: AIModel, isAuthor: boolean }`
   - Internal state: `followUpMessages: Message[]`, `input: string`, `loading: boolean`
   - Renders a textarea + send button below the original conversation
   - On send: calls `POST /api/chat` with `[...originalConversation, ...followUpMessages, newUserMsg]` and the wiki's `aiModel`
   - Streams response using the same pattern as `ChatInterface.tsx` (ReadableStream reader + TextDecoder)
   - Displays follow-up messages using `MessageBubble`
   - If `isAuthor` is true, shows an "Update Wiki" button after at least one follow-up exchange
   - "Update Wiki" calls `PUT /api/wiki/[id]` with the combined conversation

### Files to Modify

2. **`src/app/wiki/[id]/page.tsx`**
   - Import `WikiContinueChat` and `useSession` from next-auth
   - After the conversation section (line 108-126), render `<WikiContinueChat>` when conversation is shown
   - Pass `isAuthor={session?.user?.id === wiki.authorId}`
   - The component only appears after the user clicks "Show Original Conversation"

3. **`src/app/api/wiki/[id]/route.ts`**
   - Add `PUT` handler:
     - Authenticate with `await auth()`; return 401 if not authenticated
     - Verify `session.user.id === wiki.authorId`; return 403 if not author
     - Accept body: `{ conversation: Message[] }` (the full combined conversation)
     - Call `generateWikiContent(wiki.aiModel, conversation)` from `src/lib/ai/provider.ts`
     - Update Firestore doc: `db.collection('wikis').doc(id).update({ content, summary, tags, conversation, updatedAt: Date.now() })`
     - Return updated wiki

4. **`src/lib/search.ts`**
   - Add `updateWiki(id: string, data: Partial<Wiki>): Promise<void>` function
   - Wraps `db.collection('wikis').doc(id).update({ ...data, updatedAt: Date.now() })`

5. **`src/lib/i18n/translations.ts`** - Add keys:
   - `'wiki.continueAsking'` ("Continue asking")
   - `'wiki.followUpPlaceholder'` ("Ask a follow-up question...")
   - `'wiki.updateWiki'` ("Update Wiki")
   - `'wiki.updating'` ("Updating...")
   - `'wiki.updated'` ("Wiki updated successfully!")
   - `'wiki.onlyAuthorCanUpdate'` ("Only the author can update this wiki")

### New Firestore Queries
- `db.collection('wikis').doc(id).update(...)` - in `updateWiki()`

### New API Routes
- `PUT /api/wiki/[id]` - updates wiki content from extended conversation

### Implementation Notes
- Reuse `MessageBubble` for rendering follow-up messages
- Reuse streaming pattern from `ChatInterface.tsx` (lines 51-78)
- Reuse `generateWikiContent()` from `src/lib/ai/provider.ts`
- The existing `POST /api/chat` route handles the chat streaming; no changes needed there
- Author check: compare `session.user.id` with `wiki.authorId`

---

## Feature 3: Homepage Recent Wikis with Infinite Scroll

### Overview
Add a "Recent Wikis" section below the "Popular Wikis" section on the homepage with cursor-based infinite scroll pagination.

### Files to Create

1. **`src/app/api/wiki/recent/route.ts`** - Paginated recent wikis API
   - `GET` handler with query params: `cursor` (timestamp, optional), `limit` (default 12)
   - Firestore query: `db.collection('wikis').orderBy('createdAt', 'desc').startAfter(cursor).limit(limit).get()`
   - If no cursor, just `.orderBy('createdAt', 'desc').limit(limit)`
   - Return `{ wikis: Wiki[], nextCursor: number | null }` where `nextCursor` is the `createdAt` of the last wiki, or null if fewer than `limit` results

2. **`src/components/wiki/RecentWikisSection.tsx`** - Infinite scroll section
   - Internal state: `wikis: Wiki[]`, `nextCursor: number | null`, `loading: boolean`, `hasMore: boolean`
   - Initial fetch on mount: `GET /api/wiki/recent?limit=12`
   - Uses `IntersectionObserver` on a sentinel div at the bottom
   - When sentinel enters viewport and `hasMore` is true, fetch next page with `cursor=nextCursor`
   - Appends new wikis to existing list
   - Shows loading spinner at bottom while fetching
   - Renders wikis in same 3-column grid using `WikiCard`
   - Section header: Clock icon + `t('home.recentWikis')` (matching the `TrendingUp` pattern for popular)

### Files to Modify

3. **`src/app/page.tsx`**
   - Import and render `<RecentWikisSection />` after the popular wikis `</section>` (line 131)
   - Only show when not in search mode (`searchResults === null`)

4. **`src/lib/search.ts`**
   - Add `getRecentWikisPaginated(cursor?: number, limit = 12): Promise<{ wikis: Wiki[], nextCursor: number | null }>`
   - Uses Firestore `startAfter()` for cursor-based pagination

5. **`src/lib/i18n/translations.ts`** - Add keys:
   - `'home.recentWikis'` ("Recent Wikis")
   - `'home.loadingMore'` ("Loading more...")
   - `'home.noMoreWikis'` ("No more wikis to load")

### New Firestore Queries
- `db.collection('wikis').orderBy('createdAt', 'desc').startAfter(cursorTimestamp).limit(limit).get()`

### New API Routes
- `GET /api/wiki/recent?cursor=&limit=` - cursor-paginated recent wikis

### Implementation Notes
- `IntersectionObserver` is the standard approach for infinite scroll; no external library needed
- The sentinel div pattern: render an empty div after the wiki grid, observe it
- Must handle race conditions: ignore stale fetches if user scrolls fast
- `startAfter()` in Firestore requires the cursor value to match the orderBy field (createdAt, a number timestamp)

---

## Feature 4: User Leaderboard

### Overview
Display top wiki creators ranked by wikisCount, either as a section on the homepage or as a standalone page.

### Files to Create

1. **`src/app/api/leaderboard/route.ts`** - Leaderboard API
   - `GET` handler with optional `limit` param (default 20)
   - Firestore query: `db.collection('users').orderBy('wikisCount', 'desc').limit(limit).get()`
   - Return `{ users: UserProfile[] }` (only users with wikisCount > 0)
   - Filter out users with wikisCount === 0 in the query or post-processing

2. **`src/components/leaderboard/LeaderboardSection.tsx`** - Leaderboard display
   - Props: none (self-fetching) or `{ users: UserProfile[] }` (passed from parent)
   - Self-fetching approach preferred (matches existing WikiCard pattern)
   - Fetch from `GET /api/leaderboard?limit=10`
   - Render as a ranked list or card layout
   - Each entry: rank number (with gold/silver/bronze styling for top 3), avatar image, user name, wiki count, link to `/profile/[id]`
   - Loading skeleton state
   - Section header: Trophy icon + `t('leaderboard.title')`

### Files to Modify

3. **`src/app/page.tsx`**
   - Import and render `<LeaderboardSection />` on the homepage
   - Place it between Popular Wikis and Recent Wikis, or in a sidebar layout
   - Recommended: render as a compact sidebar-style card within the popular wikis section, or as a separate section below

4. **`src/lib/search.ts`**
   - Add `getTopCreators(limit = 20): Promise<UserProfile[]>`
   - Firestore query: `db.collection('users').orderBy('wikisCount', 'desc').where('wikisCount', '>', 0).limit(limit).get()`
   - Note: Firestore requires a composite index for `where` + `orderBy` on different fields. Alternative: just `orderBy('wikisCount', 'desc').limit(limit)` and filter in code.

5. **`src/lib/i18n/translations.ts`** - Add keys:
   - `'leaderboard.title'` ("Top Contributors")
   - `'leaderboard.rank'` ("Rank")
   - `'leaderboard.wikisCreated'` ("{count} wikis")
   - `'leaderboard.viewProfile'` ("View Profile")
   - `'leaderboard.empty'` ("No contributors yet")

### New Firestore Queries
- `db.collection('users').orderBy('wikisCount', 'desc').limit(limit).get()`

### Firestore Index Requirements
- If using `.where('wikisCount', '>', 0).orderBy('wikisCount', 'desc')`, a composite index is needed on `users` collection: `wikisCount ASC, wikisCount DESC`. Simpler approach: just use `orderBy` and filter `wikisCount > 0` in application code.

### New API Routes
- `GET /api/leaderboard?limit=` - top creators

### Implementation Notes
- The `UserProfile` type already has `wikisCount` and `id` fields
- Link each user entry to `/profile/[id]` (depends on Feature 1)
- Consider caching: leaderboard data changes slowly, could add `Cache-Control` headers or use `revalidate`

---

## Feature 5: Browse by Category Page

### Overview
A dedicated `/browse` page that shows all tags as a navigable grid, with the ability to filter wikis by clicking a tag.

### Files to Create

1. **`src/app/browse/page.tsx`** - Browse by category page
   - `'use client'` component
   - Two-phase UI: (1) tag cloud/grid view, (2) filtered wiki list when a tag is selected
   - State: `selectedTag: string | null`, `tags: TagInfo[]`, `filteredWikis: Wiki[]`
   - On mount: fetch `GET /api/tags` to get all tags with counts
   - On tag click: fetch `GET /api/search?tag={tag}` or `GET /api/wiki/by-tag?tag={tag}`
   - Display tags as clickable pills/cards with wiki count badges
   - When a tag is selected, show breadcrumb-style nav (All Categories > Selected Tag) and wiki grid using `WikiCard`

2. **`src/app/api/tags/route.ts`** - Tags aggregation API
   - `GET` handler
   - Strategy A (predefined categories): define a mapping of category names in code and query by each
   - Strategy B (dynamic aggregation): query all wikis, aggregate tags from `tags[]` arrays, count occurrences
   - Recommended: Strategy B with caching. Fetch recent wikis (e.g., last 500), aggregate tags, sort by count descending
   - Return `{ tags: Array<{ name: string, count: number }> }`

3. **`src/app/api/wiki/by-tag/route.ts`** - Wikis filtered by tag
   - `GET` handler with query param `tag`
   - Firestore query: `db.collection('wikis').where('tags', 'array-contains', tag).orderBy('createdAt', 'desc').limit(24).get()`
   - Return `{ wikis: Wiki[] }`

4. **`src/components/browse/TagGrid.tsx`** - Tag cloud/grid component
   - Props: `{ tags: Array<{ name: string, count: number }>, selectedTag: string | null, onSelectTag: (tag: string | null) => void }`
   - Renders tags as styled pills/cards in a flex-wrap layout
   - Each tag shows name and count
   - Selected tag gets highlighted styling (blue background)
   - Include an "All" button to clear selection

### Files to Modify

5. **`src/components/layout/Header.tsx`**
   - Add a "Browse" link next to the existing "Browse Wiki" link, or rename the existing link
   - Actually, the existing "Browse Wiki" link goes to `/wiki`. Consider changing it to `/browse` or adding a separate link
   - Recommended: add a new nav link `t('header.browseCategories')` pointing to `/browse`

6. **`src/lib/search.ts`**
   - Add `getWikisByTag(tag: string, limit = 24): Promise<Wiki[]>`
   - Firestore query: `db.collection('wikis').where('tags', 'array-contains', tag).orderBy('createdAt', 'desc').limit(limit).get()`
   - Add `getAllTags(): Promise<Array<{ name: string, count: number }>>`
   - Fetches up to 500 recent wikis, aggregates tags, returns sorted by count

7. **`src/lib/i18n/translations.ts`** - Add keys:
   - `'header.browseCategories'` ("Categories")
   - `'browse.title'` ("Browse by Category")
   - `'browse.allCategories'` ("All Categories")
   - `'browse.wikisTagged'` ("Wikis tagged with")
   - `'browse.noWikisInCategory'` ("No wikis in this category yet")
   - `'browse.wikiCount'` ("{count} wikis")

### New Firestore Queries
- `db.collection('wikis').where('tags', 'array-contains', tag).orderBy('createdAt', 'desc').limit(limit).get()` - requires composite index on `tags` + `createdAt`
- `db.collection('wikis').orderBy('createdAt', 'desc').limit(500).get()` - for tag aggregation

### Firestore Index Requirements
- Composite index on `wikis` collection: `tags (Arrays) + createdAt DESC`

### New API Routes
- `GET /api/tags` - aggregated tag list with counts
- `GET /api/wiki/by-tag?tag=` - wikis filtered by a single tag

---

## Implementation Order and Dependencies

### Phase 1: Foundation (No cross-feature dependencies)
1. **Feature 1: User Profile Page** - standalone, creates the `/profile/[id]` route that Feature 4 links to
2. **Feature 3: Recent Wikis with Infinite Scroll** - standalone, extends homepage

### Phase 2: Depends on Phase 1
3. **Feature 4: User Leaderboard** - links to `/profile/[id]` from Feature 1
4. **Feature 5: Browse by Category** - standalone but benefits from having more content from Features 1-3

### Phase 3: Most complex
5. **Feature 2: Continue Conversation** - most complex feature, involves API changes to wiki/[id], AI streaming, and wiki regeneration. No dependencies on other features but is the riskiest.

### Recommended Sequencing Within Each Feature

For each feature, follow this order:
1. Add types to `src/types/index.ts` (if needed)
2. Add data layer functions to `src/lib/search.ts`
3. Create API route(s)
4. Create new components
5. Modify existing pages/components to integrate
6. Add i18n keys to `src/lib/i18n/translations.ts` (all 15 locales)
7. Test

---

## Summary of All New Files

| File | Feature |
|------|---------|
| `src/app/profile/[id]/page.tsx` | F1 |
| `src/app/api/user/[id]/route.ts` | F1 |
| `src/components/wiki/WikiContinueChat.tsx` | F2 |
| `src/app/api/wiki/recent/route.ts` | F3 |
| `src/components/wiki/RecentWikisSection.tsx` | F3 |
| `src/app/api/leaderboard/route.ts` | F4 |
| `src/components/leaderboard/LeaderboardSection.tsx` | F4 |
| `src/app/browse/page.tsx` | F5 |
| `src/app/api/tags/route.ts` | F5 |
| `src/app/api/wiki/by-tag/route.ts` | F5 |
| `src/components/browse/TagGrid.tsx` | F5 |

## Summary of All Modified Files

| File | Features |
|------|----------|
| `src/components/layout/Header.tsx` | F1, F5 |
| `src/lib/search.ts` | F1, F2, F3, F4, F5 |
| `src/app/page.tsx` | F3, F4 |
| `src/app/wiki/[id]/page.tsx` | F2 |
| `src/app/api/wiki/[id]/route.ts` | F2 |
| `src/lib/i18n/translations.ts` | F1, F2, F3, F4, F5 |

## New i18n Keys (All Features Combined - English)

```
# Feature 1
header.myProfile = "My Profile"
profile.title = "{name}'s Profile"
profile.joinedAt = "Joined {date}"
profile.wikisCreated = "{count} wikis created"
profile.noWikis = "No wikis yet"
profile.noWikisHint = "This user hasn't created any wikis yet."

# Feature 2
wiki.continueAsking = "Continue asking"
wiki.followUpPlaceholder = "Ask a follow-up question..."
wiki.updateWiki = "Update Wiki"
wiki.updating = "Updating..."
wiki.updated = "Wiki updated successfully!"
wiki.onlyAuthorCanUpdate = "Only the author can update this wiki"

# Feature 3
home.recentWikis = "Recent Wikis"
home.loadingMore = "Loading more..."
home.noMoreWikis = "No more wikis to load"

# Feature 4
leaderboard.title = "Top Contributors"
leaderboard.rank = "Rank"
leaderboard.wikisCreated = "{count} wikis"
leaderboard.viewProfile = "View Profile"
leaderboard.empty = "No contributors yet"

# Feature 5
header.browseCategories = "Categories"
browse.title = "Browse by Category"
browse.allCategories = "All Categories"
browse.wikisTagged = "Wikis tagged with"
browse.noWikisInCategory = "No wikis in this category yet"
browse.wikiCount = "{count} wikis"
```

These keys must be translated into all 15 locales defined in `src/lib/i18n/locales.ts`.
