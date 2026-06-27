import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

/**
 * Newsletter signup — public, no auth. Captures an email for the "weekly best
 * articles" newsletter (the RSS feed at /api/feed is the content source). Doc
 * id is the lowercased email, so re-subscribing is an idempotent no-op.
 */

// Pragmatic email shape check — deliverability is verified at send time, not here.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  // Per-IP limit: a handful of attempts a minute is plenty for a real human.
  const rl = checkRateLimit({
    key: `subscribe:${getClientId(req)}`,
    max: 5,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof email !== 'string' || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  try {
    await db.collection('subscribers').doc(normalized).set(
      {
        email: normalized,
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
