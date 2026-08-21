export type AIModel = 'claude' | 'gpt' | 'gemini';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  messages: Message[];
  model: AIModel;
}

/** A cited reference attached to a wiki article. */
export interface WikiSource {
  title: string;
  url: string;
}

/** A user credited for content merged into a wiki (denormalised for display). */
export interface WikiContributor {
  id: string;
  name: string;
  image?: string;
}

/**
 * Snapshot of a wiki's previous content, written to the `revisions`
 * subcollection before each merge/update (capped at the last 20).
 */
export interface WikiRevision {
  id: string;
  title: string;
  content: string;
  summary: string;
  /** updatedAt of the snapshotted version (when that version was written). */
  updatedAt: number;
  /** User who performed the edit that superseded this version. */
  editorId: string;
  editorName: string;
}

export interface Wiki {
  id: string;
  title: string;
  question: string;
  content: string;
  summary: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorImage?: string;
  aiModel: AIModel;
  conversation: Message[];
  views: number;
  createdAt: number;
  updatedAt: number;
  threadCount?: number;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  originalImageUrl?: string;
  /**
   * `imageUrl` denormalised to a boolean so the popular-wikis query can
   * filter on an index instead of scanning. Every writer keeps it in sync;
   * see src/lib/header-image.ts.
   */
  hasHeaderImage?: boolean;
  /** ISO 639-1 code of the article's content language (e.g. "en", "zh"). */
  language?: string;
  /**
   * Where the article came from: "user" (default), "seed",
   * "editorial-draft", or "wikipedia-{lang}-dump" / "wikipedia-{lang}-rich"
   * for mirrored Wikipedia content (which must show CC BY-SA attribution).
   */
  source?: string;
  /** References cited by the article, rendered as a References section. */
  sources?: WikiSource[];
  /** Users whose thread questions were merged into the article (canonical ids). */
  contributorIds?: string[];
  /** Denormalised contributor display data, kept in sync with contributorIds. */
  contributors?: WikiContributor[];
}

export interface ThreadReply {
  id: string;
  question: string;
  answer: string;
  aiModel: AIModel;
  authorId: string;
  authorName: string;
  authorImage?: string;
  conversation: Message[];
  createdAt: number;
  /** Set when the wiki author merged this thread into the article. */
  mergedAt?: number;
  mergedBy?: string;
}

export interface ThreadReplyCreateInput {
  question: string;
  aiModel: AIModel;
}

export interface WikiCreateInput {
  title: string;
  question: string;
  content: string;
  summary: string;
  tags: string[];
  aiModel: AIModel;
  conversation: Message[];
}

export interface SearchResult {
  wikis: Wiki[];
  total: number;
}

export interface UserApiKeys {
  anthropic?: string;
  openai?: string;
  google?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: string;
  wikisCount: number;
  createdAt: number;
  apiKeys?: UserApiKeys;
  // Denormalised counters maintained by the follow API. Showing a count
  // per profile is cheaper than loading the whole follows collection.
  followersCount?: number;
  followingCount?: number;
  // Opt out of email notifications. Defaults to "send".
  emailNotificationsDisabled?: boolean;
}

// Safe-to-expose subset of UserProfile. Anything sent to an unauthenticated
// client (e.g. /api/user/[id], /api/leaderboard) must go through this so that
// email, apiKeys, and notification prefs never leak.
export type PublicUserProfile = Pick<
  UserProfile,
  'id' | 'name' | 'image' | 'provider' | 'wikisCount' | 'createdAt' | 'followersCount' | 'followingCount'
>;

export interface Follow {
  id: string;          // `${followerId}_${followeeId}`
  followerId: string;
  followeeId: string;
  createdAt: number;
}

export interface ChatRequest {
  messages: Message[];
  model: AIModel;
}

export interface ChatResponse {
  content: string;
  model: AIModel;
}
