import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getWikiById, updateWiki } from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import { parseJsonBody, wikiUpdateSchema } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const wiki = await getWikiById(id);

    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }

    return NextResponse.json(wiki);
  } catch (error) {
    console.error('Wiki detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch wiki' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rl = checkRateLimit({
    key: `wiki-update:${getClientId(req, session.user.id)}`,
    max: 10,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  try {
    const { id } = await params;
    const wiki = await getWikiById(id);

    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }

    if (wiki.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Only the author can update this wiki' }, { status: 403 });
    }

    const parsed = await parseJsonBody(req, wikiUpdateSchema);
    if (parsed.error) return parsed.error;
    const { conversation } = parsed.data;

    // Regenerate wiki content from extended conversation, with the key for
    // the wiki's own model — not hardcoded to claude.
    const { apiKey, needsConfig, quotaExhausted } = await resolveApiKeyForUser(
      wiki.aiModel,
      session.user.id!
    );
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
    const generated = await generateWikiContent(wiki.aiModel, conversation, apiKey || undefined);

    await updateWiki(id, {
      title: generated.title || wiki.title,
      content: generated.content,
      summary: generated.summary,
      tags: generated.tags.length > 0 ? generated.tags : wiki.tags,
      sources: generated.sources.length > 0 ? generated.sources : wiki.sources ?? [],
      conversation,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Wiki update error:', error);
    return NextResponse.json({ error: 'Failed to update wiki' }, { status: 500 });
  }
}
