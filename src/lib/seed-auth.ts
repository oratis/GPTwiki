import { timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

// Dedicated secret for the (admin-only) seed endpoints. Falls back to
// AUTH_SECRET so existing deploys keep working until SEED_SECRET is set, but
// configuring a distinct SEED_SECRET avoids overloading the NextAuth signing
// key for API auth.
const SEED_SECRET = process.env.SEED_SECRET || process.env.AUTH_SECRET;

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  // timingSafeEqual throws on length mismatch; compare lengths first.
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * Authorize a seed request. Prefers the secret in the `Authorization: Bearer`
 * or `x-seed-secret` header (keeps it out of URLs and access logs); still
 * accepts the legacy `?secret=` query param for backward compatibility.
 * Uses a constant-time comparison and fails closed when unconfigured.
 */
export function isAuthorizedSeedRequest(req: NextRequest): boolean {
  if (!SEED_SECRET) return false;

  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const headerSecret = bearer ?? req.headers.get('x-seed-secret');
  const querySecret = new URL(req.url).searchParams.get('secret');
  const provided = headerSecret ?? querySecret;

  if (!provided) return false;
  return safeEqual(provided, SEED_SECRET);
}
