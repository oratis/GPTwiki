import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { supportedLocales } from '@/lib/i18n/server';
import {
  getWikiById,
  getThreadReply,
  updateWiki,
  pushWikiRevision,
  recordThreadMerge,
} from '@/lib/search';
import { generateWikiContent } from '@/lib/ai/provider';
import { resolveApiKeyForUser } from '@/lib/ai/resolve-key';
import { parseJsonBody, threadMergeSchema } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { generateId } from '@/lib/utils';

/**
 * POST /api/wiki/[id]/merge
 * Merge a thread reply's Q&A into the article (wiki author only).
 * Body: { threadId: string }
 *
 * Regenerates the article from the original conversation plus the thread
 * Q&A, snapshots the previous version into the `revisions` subcollection,
 * and credits the thread author as a contributor.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Same budget as wiki updates — each merge is a full article regeneration.
  const rl = checkRateLimit({
    key: `wiki-merge:${getClientId(req, session.user.id)}`,
    max: 10,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, threadMergeSchema);
  if (parsed.error) return parsed.error;
  const { threadId } = parsed.data;

  try {
    const { id } = await params;
    const wiki = await getWikiById(id);

    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }

    if (wiki.authorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Only the author can merge threads into this wiki' },
        { status: 403 }
      );
    }

    const thread = await getThreadReply(id, threadId);
    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }
    if (thread.mergedAt) {
      return NextResponse.json(
        { error: 'ALREADY_MERGED', message: 'This thread was already merged into the article.' },
        { status: 409 }
      );
    }

    const { apiKey, model: resolvedModel, needsConfig, quotaExhausted } = await resolveApiKeyForUser(
      wiki.aiModel,
      session.user.id!
    );
    if (quotaExhausted) {
      return NextResponse.json(
        { error: 'QUOTA_EXHAUSTED', message: "You've used all of today's free messages. Add your own API key to keep going, or join the Pro waitlist." },
        { status: 403 }
      );
    }
    if (needsConfig) {
      return NextResponse.json(
        { error: 'API_KEY_REQUIRED', message: 'Please configure your API key in Profile settings.' },
        { status: 403 }
      );
    }

    // Append the thread Q&A to the wiki's conversation and regenerate.
    // Older thread docs may predate the stored conversation pair — rebuild
    // it from question/answer in that case.
    const threadMessages =
      thread.conversation?.length > 0
        ? thread.conversation
        : [
            { id: generateId(), role: 'user' as const, content: thread.question, timestamp: thread.createdAt },
            { id: generateId(), role: 'assistant' as const, content: thread.answer, timestamp: thread.createdAt },
          ];
    const conversation = [...wiki.conversation, ...threadMessages];

    const generated = await generateWikiContent(resolvedModel, conversation, apiKey || undefined);

    // Snapshot the outgoing version before overwriting it.
    await pushWikiRevision(id, session.user.id!, session.user.name || 'Anonymous');

    await updateWiki(id, {
      title: generated.title || wiki.title,
      content: generated.content,
      summary: generated.summary,
      tags: generated.tags.length > 0 ? generated.tags : wiki.tags,
      sources: generated.sources.length > 0 ? generated.sources : wiki.sources ?? [],
      conversation,
    });

    const alreadyCredited =
      thread.authorId === wiki.authorId ||
      (wiki.contributorIds ?? []).includes(thread.authorId);
    await recordThreadMerge(
      id,
      threadId,
      session.user.id!,
      alreadyCredited
        ? null
        : { id: thread.authorId, name: thread.authorName, image: thread.authorImage }
    );

    // Drop the ISR cache for this wiki in every locale so other visitors see
    // the merged article on their next visit instead of up to an hour later.
    for (const loc of supportedLocales) revalidatePath(`/${loc}/wiki/${id}`);

    return NextResponse.json({ success: true, threadId });
  } catch (error) {
    console.error('Thread merge error:', error);
    return NextResponse.json({ error: 'Failed to merge thread' }, { status: 500 });
  }
}
