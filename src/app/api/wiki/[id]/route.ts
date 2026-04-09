import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getWikiById, updateWiki } from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import type { Message } from '@/types';

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

  try {
    const { id } = await params;
    const wiki = await getWikiById(id);

    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }

    if (wiki.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Only the author can update this wiki' }, { status: 403 });
    }

    const body = await req.json();
    const conversation: Message[] = body.conversation;

    if (!conversation?.length) {
      return NextResponse.json({ error: 'Missing conversation' }, { status: 400 });
    }

    // Regenerate wiki content from extended conversation
    const { apiKey } = await resolveApiKeyForUser('claude', session.user.id!);
    const generated = await generateWikiContent(wiki.aiModel, conversation, apiKey || undefined);

    await updateWiki(id, {
      title: generated.title || wiki.title,
      content: generated.content,
      summary: generated.summary,
      tags: generated.tags.length > 0 ? generated.tags : wiki.tags,
      conversation,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Wiki update error:', error);
    return NextResponse.json({ error: 'Failed to update wiki' }, { status: 500 });
  }
}
