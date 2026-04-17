import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getWikiById, createThreadReply, getThreadReplies } from '@/lib/search';
import { getAIStream } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import { parseJsonBody, threadCreateSchema, parseSearchParams, threadListQuerySchema } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { generateId } from '@/lib/utils';

/**
 * GET /api/wiki/[id]/threads?cursor=&limit=
 * List thread replies for a wiki (paginated, public)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const parsed = parseSearchParams(new URL(req.url), threadListQuerySchema);
  if (parsed.error) return parsed.error;
  const { cursor, limit } = parsed.data;

  try {
    const result = await getThreadReplies(id, cursor, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Thread list error:', error);
    return NextResponse.json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
}

/**
 * POST /api/wiki/[id]/threads
 * Create a thread reply (auth required)
 * Body: { question: string, aiModel: AIModel }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: wikiId } = await params;

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: 10 thread replies per 5 minutes
  const rl = checkRateLimit({
    key: `thread:${getClientId(req, session.user.id)}`,
    max: 10,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, threadCreateSchema);
  if (parsed.error) return parsed.error;
  const { question, aiModel } = parsed.data;

  try {
    // Get parent wiki for AI context
    const wiki = await getWikiById(wikiId);
    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }

    // Resolve API key
    const { apiKey, needsConfig } = await resolveApiKeyForUser(aiModel, session.user.id!);
    if (needsConfig) {
      return NextResponse.json(
        { error: 'API_KEY_REQUIRED', message: 'Please configure your API key in Profile settings.' },
        { status: 403 }
      );
    }

    // Build AI context: original wiki conversation + new question
    const contextMessages = [
      ...wiki.conversation,
      { id: generateId(), role: 'user' as const, content: question, timestamp: Date.now() },
    ];

    // Get AI response (non-streaming for thread replies)
    const stream = getAIStream(aiModel, contextMessages, apiKey || undefined);
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let answer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      answer += decoder.decode(value, { stream: true });
    }

    if (!answer) {
      return NextResponse.json({ error: 'AI failed to generate answer' }, { status: 500 });
    }

    const now = Date.now();
    const conversation = [
      { id: generateId(), role: 'user' as const, content: question, timestamp: now },
      { id: generateId(), role: 'assistant' as const, content: answer, timestamp: now },
    ];

    // Create thread reply
    const threadId = await createThreadReply(wikiId, {
      question,
      answer,
      aiModel,
      authorId: session.user.id!,
      authorName: session.user.name || 'Anonymous',
      authorImage: session.user.image || undefined,
      conversation,
    });

    return NextResponse.json({
      id: threadId,
      thread: {
        id: threadId,
        question,
        answer,
        aiModel,
        authorId: session.user.id,
        authorName: session.user.name || 'Anonymous',
        authorImage: session.user.image,
        conversation,
        createdAt: now,
      },
    });
  } catch (error) {
    console.error('Thread create error:', error);
    return NextResponse.json({ error: 'Failed to create thread reply' }, { status: 500 });
  }
}
