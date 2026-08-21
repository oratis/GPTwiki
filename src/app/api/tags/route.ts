import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from '@/lib/i18n/server';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { getAllTags } from '@/lib/search';

export async function GET(req: NextRequest) {
  // Rate limit: 60/min per IP, same budget as /api/search.
  //
  // Why this endpoint needs one at all, now that getAllTags is TTL-cached:
  // a cache *miss* still costs exactly 500 Firestore reads, and the cache is
  // per-instance and per-language. A caller cycling the 15 supported locales
  // against a cold or scaled-out set of instances can still force repeated
  // misses. The TTL caps how often we pay; the limiter caps how fast someone
  // can make us pay it. Both are needed — see docs/04 §3.3 in oratisbase for
  // the incident this belongs to ($2.5K of Firestore reads over two months).
  const rl = checkRateLimit({
    key: `tags:${getClientId(req)}`,
    max: 60,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  try {
    // Only supported locales get through: getAllTags memoizes per language,
    // and an unvalidated value would let a caller mint unlimited cache keys
    // — each one a fresh 500-document read that no later request can reuse.
    const lang = new URL(req.url).searchParams.get('lang') || '';
    const tags = await getAllTags(hasLocale(lang) ? lang : undefined);
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Tags error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
