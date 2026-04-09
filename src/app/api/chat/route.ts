import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { getAIStream } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import { parseJsonBody, chatRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Rate limit: 20 chat messages per minute per user
  const rl = checkRateLimit({
    key: `chat:${getClientId(req, session.user.id)}`,
    max: 20,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, chatRequestSchema);
  if (parsed.error) return parsed.error;
  const { messages, model } = parsed.data;

  try {
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
