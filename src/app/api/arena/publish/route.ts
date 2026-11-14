import { after, NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getBattle, publishBattleArticle } from '@/lib/arena/store';
import { isTypesenseEnabled, toTypesenseDoc, upsertWikiToTypesense } from '@/lib/typesense';
import { db } from '@/lib/firebase';
import { getUserProfile } from '@/lib/search';
import { anonVoterId, readAnonToken } from '@/lib/arena/anon';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { arenaPublishSchema, parseJsonBody, wikiCreateSchema } from '@/lib/validation';
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
 *
 * Signing in is still required here, unlike battling and voting: an article
 * needs an author, and a byline is not something an anonymous session can
 * supply. But the *vote* that authorises the publish may be an anonymous one —
 * a reader can battle signed out, vote, then sign in to keep the answer. Without
 * that, signing in would silently orphan the vote they just cast, and every
 * anonymous battle would be a dead end at exactly the moment the reader decided
 * the result was worth keeping.
 */

/** Longest prompt we'll use verbatim as a title before truncating. */
const MAX_TITLE = 120;
const MAX_SUMMARY = 300;
/**
 * A battle prompt may be 2000 characters, but `wikiCreateSchema` caps
 * `question` at 500. Writing the untruncated prompt would put documents in the
 * corpus that `POST /api/wiki` would refuse, so the two paths are held to the
 * same limit.
 */
const MAX_QUESTION = 500;

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
    //
    // Two identities can satisfy that: the signed-in account, or the anonymous
    // token this same browser voted with before signing in. The cookie is proof
    // the vote came from here, which is exactly what the rule is checking; the
    // byline still comes from the account either way.
    const anonToken = readAnonToken(req);
    const voterIds = [userId, ...(anonToken ? [anonVoterId(anonToken)] : [])];
    let voterId: string | null = null;
    let voteSnap = null;
    for (const candidate of voterIds) {
      const snap = await db.collection('arenaVotes').doc(`${battleId}_${candidate}`).get();
      if (snap.exists) {
        voterId = candidate;
        voteSnap = snap;
        break;
      }
    }
    if (!voteSnap || !voterId) {
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
    const rawQuestion = battle.prompt.trim();
    const question =
      rawQuestion.length > MAX_QUESTION
        ? `${rawQuestion.slice(0, MAX_QUESTION - 1)}…`
        : rawQuestion;
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

    const draft = {
      title,
      question,
      content: winner.answer,
      summary: winner.answer.slice(0, MAX_SUMMARY),
      tags,
      aiModel: winner.model as AIModel,
      conversation,
    };

    // Held to the same schema as POST /api/wiki. This path writes through
    // `createWiki` directly, so without an explicit check it could produce
    // documents the normal endpoint would reject.
    const validated = wikiCreateSchema.safeParse(draft);
    if (!validated.success) {
      console.error('Arena publish produced an invalid wiki:', validated.error.issues);
      return NextResponse.json({ error: 'Could not build a valid article' }, { status: 422 });
    }

    const authorImage = profile?.image ?? session.user?.image;
    const article = {
      ...validated.data,
      authorId: userId,
      authorName: profile?.name ?? session.user?.name ?? 'Anonymous',
      ...(authorImage ? { authorImage } : {}),
      language: battle.locale,
      source: 'arena',
    };
    const published = await publishBattleArticle(battleId, voterId, article);
    if (!published.alreadyPublished && isTypesenseEnabled()) {
      after(async () => {
        try {
          await upsertWikiToTypesense(toTypesenseDoc(published.wikiId, { ...article, views: 0, createdAt: Date.now() }));
        } catch (error) { console.error('Arena search indexing failed:', error); }
      });
    }
    return NextResponse.json({ ...published, model: winner.model });
  } catch (error) {
    console.error('Arena publish error:', error);
    return NextResponse.json({ error: 'Failed to publish' }, { status: 500 });
  }
}
