import type { AIModel, Message, UserApiKeys, WikiSource } from '@/types';
import { streamClaude } from './claude';
import { streamOpenAI } from './openai';
import { streamGemini } from './gemini';

export interface ResolvedApiKey {
  key: string | undefined;
  model: AIModel;
}

export function resolveApiKey(model: AIModel, userKeys?: UserApiKeys | null): string | undefined {
  if (!userKeys) return undefined;
  switch (model) {
    case 'claude': return userKeys.anthropic;
    case 'gpt': return userKeys.openai;
    case 'gemini': return userKeys.google;
  }
}

export function getAIStream(model: AIModel, messages: Message[], apiKey?: string): ReadableStream {
  switch (model) {
    case 'claude':
      return streamClaude(messages, apiKey);
    case 'gpt':
      return streamOpenAI(messages, apiKey);
    case 'gemini':
      return streamGemini(messages, apiKey);
    default:
      throw new Error(`Unsupported model: ${model}`);
  }
}

export interface GeneratedWiki {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  sources: WikiSource[];
}

export async function generateWikiContent(
  model: AIModel,
  conversation: Message[],
  apiKey?: string
): Promise<GeneratedWiki> {
  const systemPrompt = `Based on the following conversation, generate a wiki article.
Return a JSON object with these fields:
- title: A concise title for the wiki article
- content: The full wiki article in Markdown format, well-structured with headings
- summary: A 1-2 sentence summary
- tags: An array of 3-5 relevant tags
- sources: An array of up to 5 references that support the article's key claims,
  each as {"title": "...", "url": "..."}. Only include real, well-known sources
  you are confident exist (official docs, standards bodies, encyclopedias,
  reputable publications). If you are not confident in any, return [].

Return ONLY valid JSON, no markdown code blocks.`;

  const msgs: Message[] = [
    ...conversation,
    {
      id: 'gen',
      role: 'user' as const,
      content: systemPrompt,
      timestamp: Date.now(),
    },
  ];

  const response = await collectStream(getAIStream(model, msgs, apiKey));

  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    return sanitizeGenerated(JSON.parse(jsonMatch[0]), conversation, response);
  } catch {
    return {
      title: conversation[0]?.content.substring(0, 100) || 'Untitled',
      content: response,
      summary: conversation[0]?.content.substring(0, 200) || '',
      tags: [],
      sources: [],
    };
  }
}

// The model's JSON is untrusted: clamp every field to the expected shape so
// a malformed generation can't write garbage types into Firestore.
function sanitizeGenerated(
  raw: unknown,
  conversation: Message[],
  response: string
): GeneratedWiki {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown, max: number, fallback = ''): string =>
    typeof v === 'string' ? v.slice(0, max) : fallback;

  const tags = Array.isArray(obj.tags)
    ? obj.tags
        .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
        .map((t) => t.trim().toLowerCase().slice(0, 40))
        .slice(0, 10)
    : [];

  const sources: WikiSource[] = Array.isArray(obj.sources)
    ? obj.sources
        .filter((s): s is { title?: unknown; url?: unknown } => !!s && typeof s === 'object')
        .map((s) => ({ title: str(s.title, 200), url: str(s.url, 500) }))
        .filter((s) => s.title && /^https?:\/\//.test(s.url))
        .slice(0, 5)
    : [];

  return {
    title: str(obj.title, 200) || conversation[0]?.content.substring(0, 100) || 'Untitled',
    content: str(obj.content, 100_000) || response,
    summary: str(obj.summary, 1_000),
    tags,
    sources,
  };
}

async function collectStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  return result;
}
