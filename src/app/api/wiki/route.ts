import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createWiki, getRecentWikis, getUserWikis } from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import {
  parseJsonBody,
  parseSearchParams,
  wikiCreateSchema,
  wikiListQuerySchema,
} from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const parsed = parseSearchParams(new URL(req.url), wikiListQuerySchema);
  if (parsed.error) return parsed.error;

  try {
    const wikis = parsed.data.userId
      ? await getUserWikis(parsed.data.userId)
      : await getRecentWikis(20);
    return NextResponse.json({ wikis });
  } catch (error) {
    console.error('Wiki GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch wikis' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit: 10 wiki creations per 5 minutes per user
  const rl = checkRateLimit({
    key: `wiki-create:${getClientId(req, session.user.id)}`,
    max: 10,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, wikiCreateSchema);
  if (parsed.error) return parsed.error;
  const body = parsed.data;

  try {
    let wikiData = body;
    if (!body.content && body.conversation.length > 0) {
      const { apiKey } = await resolveApiKeyForUser(body.aiModel, session.user.id!);
      const generated = await generateWikiContent(body.aiModel, body.conversation, apiKey || undefined);
      wikiData = {
        ...body,
        title: body.title || generated.title,
        content: generated.content,
        summary: generated.summary,
        tags: generated.tags,
      };
    }

    const id = await createWiki({
      ...wikiData,
      authorId: session.user.id!,
      authorName: session.user.name || 'Anonymous',
      authorImage: session.user.image || undefined,
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Wiki POST error:', error);
    return NextResponse.json({ error: 'Failed to create wiki' }, { status: 500 });
  }
}
