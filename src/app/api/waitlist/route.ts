import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

/**
 * Pro-plan waitlist: a zero-cost willingness-to-pay probe (product decision
 * 2026-06). Signed-in users join with one click; we already know their email.
 * Doc id = userId, so joining twice is a no-op.
 */

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ joined: false });
  }
  const doc = await db.collection('waitlist').doc(session.user.id).get();
  return NextResponse.json({ joined: doc.exists });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rl = checkRateLimit({
    key: `waitlist:${getClientId(req, session.user.id)}`,
    max: 5,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  try {
    await db.collection('waitlist').doc(session.user.id).set(
      {
        userId: session.user.id,
        email: session.user.email ?? null,
        name: session.user.name ?? null,
        createdAt: Date.now(),
      },
      { merge: true }
    );
    return NextResponse.json({ joined: true });
  } catch (e) {
    console.error('Waitlist join failed:', e);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}
