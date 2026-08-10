import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getBattle } from '@/lib/arena/store';
import { db } from '@/lib/firebase';
import { createWiki, getUserProfile } from '@/lib/search';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { arenaPublishSchema, parseJsonBody } from '@/lib/validation';
import type { AIModel, Message } from '@/types';

/**
 * Publish the winning answer of a battle as a wiki article.
 *
 * This is the mechanic that makes GPTwiki's arena different from the ones it was
 * modelled on: arena.ai discards the conversation once the vote is counted,
 * while this project exists on the premise that a good answer should not vanish.
 * The battle becomes a citable article, and the vote becomes its provenance.
 *
 * Deliberately makes no AI call. The winning answer already exists — running it
 * back through `generateWikiContent` to reword it would spend tokens to make the
 * published article differ from the text the voter actually judged.
 */

/** Longest prompt we'll use verbatim as a title before truncating. */
const MAX_TITLE = 120;
const MAX_SUMMARY = 300;

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rl = checkRateLimit({
    key: `arena-publish:${getClientId(req, userId)}`,
    max: 10,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, arenaPublishSchema);
  if (parsed.error) return parsed.error;
  const { battleId } = parsed.data;

  try {
    const battle = await getBattle(battleId);
    if (!battle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    // Only the voter may publish, and only after voting. Without this the
    // endpoint would be a way to read a battle's winning side — and therefore
    // its model identity — without ever casting the vote that reveals it.
    const voteSnap = await db.collection('arenaVotes').doc(`${battleId}_${userId}`).get();
    if (!voteSnap.exists) {
      return NextResponse.json(
        { error: 'VOTE_REQUIRED', message: 'Vote on this battle before publishing it.' },
        { status: 403 }
      );
    }

    const outcome = voteSnap.get('outcome') as string;
    if (outcome !== 'a' && outcome !== 'b') {
      return NextResponse.json(
        {
          error: 'NO_WINNER',
          message: 'A tie or a "both bad" vote has no winning answer to publish.',
        },
        { status: 409 }
      );
    }

    const winner = outcome === 'a'
      ? { model: battle.modelA, answer: battle.answerA }
      : { model: battle.modelB, answer: battle.answerB };
    if (!winner.answer?.trim()) {
      return NextResponse.json({ error: 'Battle is incomplete' }, { status: 409 });
    }

    const profile = await getUserProfile(userId).catch(() => null);
    const question = battle.prompt.trim();
    const title = question.length > MAX_TITLE ? `${question.slice(0, MAX_TITLE - 1)}…` : question;

    const conversation: Message[] = [
      { id: `${battleId}-q`, role: 'user', content: question, timestamp: battle.createdAt },
      {
        id: `${battleId}-a`,
        role: 'assistant',
        content: winner.answer,
        timestamp: battle.answersReadyAt ?? battle.createdAt,
      },
    ];

    const tags = [battle.category, battle.locale].filter(
      (tag): tag is string => Boolean(tag)
    );

    const wikiId = await createWiki({
      title,
      question,
      content: winner.answer,
      summary: winner.answer.slice(0, MAX_SUMMARY),
      tags,
      authorId: userId,
      authorName: profile?.name ?? session.user?.name ?? 'Anonymous',
      authorImage: profile?.image ?? session.user?.image ?? undefined,
      aiModel: winner.model as AIModel,
      conversation,
      language: battle.locale,
      // Traceable provenance, and the hot list ranks it as community content.
      source: 'arena',
    });

    return NextResponse.json({ wikiId, model: winner.model });
  } catch (error) {
    console.error('Arena publish error:', error);
    return NextResponse.json({ error: 'Failed to publish' }, { status: 500 });
  }
}
