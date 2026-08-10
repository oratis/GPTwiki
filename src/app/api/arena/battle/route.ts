import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAIStream } from '@/lib/ai/provider';
import { getBattleAvailability, resolveBattleKeys } from '@/lib/arena/battle-keys';
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
 * Signing in is required. That is not a gate for its own sake — a battle is two
 * generations, and with the default BYOK posture the keys that pay for them are
 * the user's own.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Tighter than /api/chat's 20/min: each battle is two generations, and a
  // human cannot read two answers faster than this anyway.
  const rl = checkRateLimit({
    key: `arena-battle:${getClientId(req, userId)}`,
    max: 10,
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
    const availability = await getBattleAvailability(userId);
    const pair = pickModelPair(availability.models);
    if (!pair) {
      return NextResponse.json(
        {
          error: 'ARENA_NEEDS_TWO_MODELS',
          message:
            'A battle compares two providers, so it needs API keys for two of them. Add a second key in your profile.',
          available: availability.models,
        },
        { status: 403 }
      );
    }

    const keys = await resolveBattleKeys(userId, pair);
    if (!keys.ok) {
      const quota = keys.reason === 'QUOTA_EXHAUSTED';
      return NextResponse.json(
        {
          error: keys.reason,
          message: quota
            ? "Today's free battles are used up. Add your own API keys to keep going, or come back tomorrow."
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
          creatorId: userId,
          answersReadyAt: Date.now(),
        });
      },
    });

    return new Response(body, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Arena battle error:', error);
    return NextResponse.json({ error: 'Failed to start battle' }, { status: 500 });
  }
}
