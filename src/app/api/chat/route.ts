import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getAIStream } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import type { AIModel, Message } from '@/types';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { messages, model } = body as { messages: Message[]; model: AIModel };

    if (!messages || !model) {
      return new Response('Missing messages or model', { status: 400 });
    }

    const { apiKey, needsConfig } = await resolveApiKeyForUser(model, session.user.id!);

    if (needsConfig) {
      return new Response(
        JSON.stringify({ error: 'API_KEY_REQUIRED', message: 'Please configure your API key in Profile settings.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stream = getAIStream(model, messages, apiKey || undefined);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
