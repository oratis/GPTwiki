import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { follow, unfollow, isFollowing } from '@/lib/follows';
import { parseJsonBody, parseSearchParams } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

const followBodySchema = z.object({
  followeeId: z.string().trim().min(1).max(128),
});

const followQuerySchema = z.object({
  followeeId: z.string().trim().min(1).max(128),
});

/** GET /api/follow?followeeId=X — am I following X? */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ isFollowing: false });
  }
  const parsed = parseSearchParams(new URL(req.url), followQuerySchema);
  if (parsed.error) return parsed.error;
  const yes = await isFollowing(session.user.id, parsed.data.followeeId);
  return NextResponse.json({ isFollowing: yes });
}

/** POST /api/follow { followeeId } */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rl = checkRateLimit({
    key: `follow:${getClientId(req, session.user.id)}`,
    max: 30,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, followBodySchema);
  if (parsed.error) return parsed.error;

  if (parsed.data.followeeId === session.user.id) {
    return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
  }
  try {
    await follow(session.user.id, parsed.data.followeeId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Follow error:', e);
    return NextResponse.json({ error: 'Failed to follow' }, { status: 500 });
  }
}

/** DELETE /api/follow { followeeId } */
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rl = checkRateLimit({
    key: `follow:${getClientId(req, session.user.id)}`,
    max: 30,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = await parseJsonBody(req, followBodySchema);
  if (parsed.error) return parsed.error;
  try {
    await unfollow(session.user.id, parsed.data.followeeId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Unfollow error:', e);
    return NextResponse.json({ error: 'Failed to unfollow' }, { status: 500 });
  }
}
