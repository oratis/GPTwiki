import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getBattle, getRecentPromptHashes, writeVote } from '@/lib/arena/store';
import { evaluateVote } from '@/lib/arena/vote-filters';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { arenaVoteSchema, parseJsonBody } from '@/lib/validation';

/**
 * Record a vote and reveal the models.
 *
 * The reveal happens here and only here: identities are withheld until the vote
 * is in, which is the entire anti-gaming design. A vote is always recorded, but
 * the filters in `vote-filters.ts` decide whether it carries weight — the
 * response says which, so the exclusion is visible to the voter rather than
 * silent.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rl = checkRateLimit({
    key: `arena-vote:${getClientId(req, userId)}`,
    max: 30,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, arenaVoteSchema);
  if (parsed.error) return parsed.error;
  const { battleId, outcome } = parsed.data;

  try {
    const battle = await getBattle(battleId);
    if (!battle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }
    // A battle is only written once both answers landed, so this should not
    // happen — but voting on half a battle would corrupt the fit, so check.
    if (!battle.answerA?.trim() || !battle.answerB?.trim()) {
      return NextResponse.json({ error: 'Battle is incomplete' }, { status: 409 });
    }

    const now = Date.now();
    const recentPromptHashes = await getRecentPromptHashes(userId, now);

    const { weight, flags } = evaluateVote({
      signedIn: true,
      promptHash: battle.promptHash,
      recentPromptHashes,
      // Server-set, so the reading-time check cannot be forged by a client.
      answersReadyAt: battle.answersReadyAt ?? battle.createdAt,
      votedAt: now,
      answerA: battle.answerA,
      answerB: battle.answerB,
    });

    const recorded = await writeVote({
      battleId,
      promptHash: battle.promptHash,
      outcome,
      voterId: userId,
      weight,
      flags,
    });
    if (!recorded) {
      return NextResponse.json({ error: 'Already voted on this battle' }, { status: 409 });
    }

    return NextResponse.json({
      modelA: battle.modelA,
      modelB: battle.modelB,
      outcome,
      counted: weight === 1,
      flags,
    });
  } catch (error) {
    console.error('Arena vote error:', error);
    return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
  }
}
