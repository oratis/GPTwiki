import type { AIModel, Message, UserApiKeys } from '@/types';
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

export async function generateWikiContent(
  model: AIModel,
  conversation: Message[],
  apiKey?: string
): Promise<{
  title: string;
  content: string;
  summary: string;
  tags: string[];
}> {
  const systemPrompt = `Based on the following conversation, generate a wiki article.
Return a JSON object with these fields:
- title: A concise title for the wiki article
- content: The full wiki article in Markdown format, well-structured with headings
- summary: A 1-2 sentence summary
- tags: An array of 3-5 relevant tags

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
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {
      title: conversation[0]?.content.substring(0, 100) || 'Untitled',
      content: response,
      summary: conversation[0]?.content.substring(0, 200) || '',
      tags: [],
    };
  }
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
