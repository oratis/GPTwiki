import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { parseJsonBody, subscribeSchema } from '@/lib/validation';

/**
 * Newsletter signup — public, no auth. Captures an email for the "weekly best
 * articles" newsletter (the RSS feed at /api/feed is the content source).
 *
 * The doc id is the normalized email, so re-subscribing is an idempotent
 * no-op rather than a duplicate. Nothing sends from this collection yet;
 * capture is deliberately ahead of delivery.
 */
export async function POST(req: NextRequest) {
  // Per-IP limit: a handful of attempts a minute is plenty for a real human.
  // Per-instance like every limiter here (rate-limit.ts), so treat it as a
  // brake on one client, not a global bound.
  const rl = checkRateLimit({
    key: `subscribe:${getClientId(req)}`,
    max: 5,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  const { data, error } = await parseJsonBody(req, subscribeSchema);
  if (error) return error;

  try {
    await db.collection('subscribers').doc(data.email).set(
      {
        email: data.email,
        createdAt: Date.now(),
        source: 'site',
      },
      { merge: true }
    );
    return NextResponse.json({ subscribed: true });
  } catch (e) {
    console.error('Newsletter subscribe failed:', e);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
