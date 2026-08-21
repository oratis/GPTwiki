import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAIStream } from '@/lib/ai/provider';
import {
  getAnonBattleAvailability,
  getBattleAvailability,
  refundAnonBattle,
  refundBattle,
  resolveAnonBattleKeys,
  resolveBattleKeys,
} from '@/lib/arena/battle-keys';
import {
  anonCookieHeader,
  anonVoterId,
  clientIpKey,
  issueAnonToken,
  readAnonToken,
} from '@/lib/arena/anon';
import { mergeBattleStreams } from '@/lib/arena/battle-stream';
import { categorizePrompt } from '@/lib/arena/categories';
import { pickModelPair } from '@/lib/arena/pairing';
import { reserveBattleId, writeBattle } from '@/lib/arena/store';
import { hashPrompt } from '@/lib/arena/vote-filters';
import { hasLocale, defaultLocale } from '@/lib/i18n/server';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { arenaBattleSchema, parseJsonBody } from '@/lib/validation';
import type { Message } from '@/types';

/**
 * Start a battle: one prompt, two anonymous models, streamed side by side.
 *
 * Open to visitors who are not signed in, which is what
 * `docs/gptwiki-arena-plan.md` §4 ruled and Phase 1 did not implement. The
 * comment that used to sit here justified a hard 401 with "with the default
 * BYOK posture the keys that pay for them are the user's own" — but this
 * deployment funds battles from platform keys, so that premise was false, and
 * §9 measured what the gate cost: three registered accounts and zero battles in
 * the feature's entire life.
 *
 * Anonymous battles are still gated, just on something other than identity:
 * `ARENA_ANON_DAILY_BATTLES` must be set, and spend is metered per client
 * address rather than per account. Their votes are recorded at `weight: 0` and
 * never reach the ratings — see `evaluateVote`.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  // For signed-out visitors the address is both the rate-limit key and the
  // spend meter, so it is resolved before anything expensive happens.
  const ipKey = userId ? null : clientIpKey(req);
  const existingToken = userId ? null : readAnonToken(req);
  const anonToken = userId ? null : existingToken ?? issueAnonToken();

  // Tighter than /api/chat's 20/min: each battle is two generations, and a
  // human cannot read two answers faster than this anyway. Signed-out traffic
  // gets a lower ceiling — it is spending the platform's keys with no account
  // behind it, and the in-memory limiter is only per-instance, so the Firestore
  // meter below is what actually bounds the bill.
  const rl = checkRateLimit({
    key: `arena-battle:${getClientId(req, userId)}`,
    max: userId ? 10 : 4,
    windowSec: 300,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, arenaBattleSchema);
  if (parsed.error) return parsed.error;
  const { prompt } = parsed.data;
  const locale = parsed.data.locale && hasLocale(parsed.data.locale)
    ? parsed.data.locale
    : defaultLocale;

  try {
    // Signed-in visitors may draw on their own keys; signed-out ones can only
    // ever use the platform's, and only if the operator opened that door.
    const availability = userId
      ? await getBattleAvailability(userId)
      : getAnonBattleAvailability();
    const pair = pickModelPair(availability.models);
    if (!pair) {
      return NextResponse.json(
        {
          error: userId ? 'ARENA_NEEDS_TWO_MODELS' : 'ARENA_ANON_DISABLED',
          message: userId
            ? 'A battle compares two providers, so it needs API keys for two of them. Add a second key in your profile.'
            : 'Battles are not open to signed-out visitors on this deployment. Sign in to battle.',
          available: availability.models,
        },
        { status: 403 }
      );
    }

    // Reuses the availability already computed above rather than re-reading
    // the user document.
    const keys = userId
      ? await resolveBattleKeys(userId, pair, availability)
      : await resolveAnonBattleKeys(ipKey!, pair);
    if (!keys.ok) {
      const quota = keys.reason === 'QUOTA_EXHAUSTED';
      return NextResponse.json(
        {
          error: keys.reason,
          message: quota
            ? userId
              ? "Today's free battles are used up. Add your own API keys to keep going, or come back tomorrow."
              : "Today's free battles for this network are used up. Sign in to keep going, or come back tomorrow."
            : 'A battle compares two providers, so it needs API keys for two of them.',
        },
        { status: 403 }
      );
    }

    const battleId = reserveBattleId();
    const messages: Message[] = [
      { id: battleId, role: 'user', content: prompt, timestamp: Date.now() },
    ];

    const body = mergeBattleStreams({
      battleId,
      a: getAIStream(pair.modelA, messages, keys.keyA),
      b: getAIStream(pair.modelB, messages, keys.keyB),
      // Written once, complete, only if both sides succeeded — so a battle can
      // never be voted on with half an answer in it.
      // A battle that produced nothing gives the metered unit back — the debit
      // happens before generation, so without this a failed or abandoned battle
      // costs the user a free battle and leaves no article or vote behind.
      onAbandon: async (reason) => {
        console.warn(`[arena] battle ${battleId} abandoned (${reason})`);
        // Refund whichever meter was actually charged. Crossing these would
        // credit a stranger's allowance and silently leak the real one.
        await (userId
          ? refundBattle(userId, keys.metered)
          : refundAnonBattle(ipKey!, keys.metered));
      },
      onComplete: async (answers) => {
        await writeBattle({
          id: battleId,
          prompt,
          promptHash: hashPrompt(prompt),
          locale,
          category: categorizePrompt(prompt),
          modelA: pair.modelA,
          modelB: pair.modelB,
          answerA: answers.a,
          answerB: answers.b,
          // The anonymous token, not the address: `creatorId` is compared
          // against a voter id, and the address hash is a spend key that must
          // never become an identity anyone can be recognised by.
          creatorId: userId ?? anonVoterId(anonToken!),
          answersReadyAt: Date.now(),
        });
      },
    });

    const headers = new Headers({
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    });
    // Issue the voter token on the response that starts the battle, so the
    // vote that follows can be attributed to the same reader. Only when it is
    // new — re-sending an unchanged cookie on every battle is pure noise.
    if (anonToken && !existingToken) {
      headers.set('Set-Cookie', anonCookieHeader(anonToken));
    }
    return new Response(body, { headers });
  } catch (error) {
    console.error('Arena battle error:', error);
    return NextResponse.json({ error: 'Failed to start battle' }, { status: 500 });
  }
}
