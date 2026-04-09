import { NextRequest, NextResponse } from 'next/server';
import { searchWikis, getPopularWikis } from '@/lib/search';
import { parseSearchParams, searchQuerySchema } from '@/lib/validation';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  // Rate limit: 60 searches per minute per IP (anonymous allowed)
  const rl = checkRateLimit({
    key: `search:${getClientId(req)}`,
    max: 60,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  const parsed = parseSearchParams(new URL(req.url), searchQuerySchema);
  if (parsed.error) return parsed.error;

  try {
    const wikis = parsed.data.q ? await searchWikis(parsed.data.q) : await getPopularWikis();
    return NextResponse.json({ wikis });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
