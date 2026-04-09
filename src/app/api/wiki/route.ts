import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createWiki, getRecentWikis, getUserWikis } from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import type { WikiCreateInput } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const wikis = userId ? await getUserWikis(userId) : await getRecentWikis(20);
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

  try {
    const body: WikiCreateInput = await req.json();

    // If no content provided, generate from conversation
    let wikiData = body;
    if (!body.content && body.conversation.length > 0) {
      const { apiKey } = await resolveApiKeyForUser('claude', session.user.id!);
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
