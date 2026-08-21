import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { anonVoterId, readAnonToken } from '@/lib/arena/anon';
import { countVotes, getBattle } from '@/lib/arena/store';

/**
 * Fetch a battle.
 *
 * Model identities are withheld until a vote exists. Without that the permalink
 * would be a side channel around the anonymity the ratings depend on: open the
 * battle in a second tab, read who is who, then go back and vote.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const battle = await getBattle(id);
    if (!battle) {
      return NextResponse.json({ error: 'Battle not found' }, { status: 404 });
    }

    const revealed = (await countVotes(id)) > 0;
    const session = await auth();
    // A battle started signed-out has an `anon:` creator id, so recognising its
    // own reader takes the cookie as well as the session — otherwise anyone who
    // battled anonymously would be a stranger to their own permalink.
    const anonToken = readAnonToken(req);
    const isCreator = Boolean(
      (session?.user?.id && session.user.id === battle.creatorId) ||
        (anonToken && anonVoterId(anonToken) === battle.creatorId)
    );

    return NextResponse.json({
      id: battle.id,
      prompt: battle.prompt,
      locale: battle.locale,
      category: battle.category,
      answerA: battle.answerA,
      answerB: battle.answerB,
      createdAt: battle.createdAt,
      revealed,
      isCreator,
      ...(revealed ? { modelA: battle.modelA, modelB: battle.modelB } : {}),
    });
  } catch (error) {
    console.error('Arena battle fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch battle' }, { status: 500 });
  }
}
