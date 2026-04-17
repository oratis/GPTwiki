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
