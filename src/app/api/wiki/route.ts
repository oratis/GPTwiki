import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createWiki, getRecentWikis, getUserWikis, getWikiById, getUserProfile } from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import { notifyFollowersOfNewWiki } from '@/lib/notifications';
import {
  parseJsonBody,
  parseSearchParams,
  wikiCreateSchema,
  wikiListQuerySchema,
} from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import type { WikiSource } from '@/types';

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
    let wikiData: typeof body & { sources?: WikiSource[] } = body;
    if (!body.content && body.conversation.length > 0) {
      const { apiKey, needsConfig, quotaExhausted } = await resolveApiKeyForUser(
        body.aiModel,
        session.user.id!
      );
      // Without an entitled key, don't fall through to the provider's silent
      // env-key default — that would bypass the free-tier metering entirely.
      if (quotaExhausted) {
        return NextResponse.json(
          { error: 'QUOTA_EXHAUSTED', message: 'Daily free message quota used up. Add your own API key to continue.' },
          { status: 403 }
        );
      }
      if (needsConfig) {
        return NextResponse.json(
          { error: 'API_KEY_REQUIRED', message: 'Please configure your API key in Profile settings.' },
          { status: 403 }
        );
      }
      const generated = await generateWikiContent(body.aiModel, body.conversation, apiKey || undefined);
      wikiData = {
        ...body,
        title: body.title || generated.title,
        content: generated.content,
        summary: generated.summary,
        tags: generated.tags,
        sources: generated.sources,
      };
    }

    const id = await createWiki({
      ...wikiData,
      authorId: session.user.id!,
      authorName: session.user.name || 'Anonymous',
      authorImage: session.user.image || undefined,
    });

    // Fire-and-forget follower notification. Wrapped so a Resend hiccup
    // never bubbles up and breaks the publish flow for the author.
    (async () => {
      try {
        const [wiki, author] = await Promise.all([
          getWikiById(id),
          getUserProfile(session.user!.id!),
        ]);
        if (wiki && author) await notifyFollowersOfNewWiki(author, wiki);
      } catch (e) {
        console.error('Follower notification failed:', e);
      }
    })();

    return NextResponse.json({ id });
  } catch (error) {
    console.error('Wiki POST error:', error);
    return NextResponse.json({ error: 'Failed to create wiki' }, { status: 500 });
  }
}
