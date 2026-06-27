import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

/**
 * Counts an embed-card impression. The embed page is a third-party iframe, so
 * we deliberately do NOT load the GA browser script into it (that would inject
 * Google's tag onto every host site). Instead a tiny client beacon hits this
 * endpoint, which forwards an `embed_impression` event to GA4 server-side via
 * the Measurement Protocol.
 *
 * No-ops (204) unless both GA_API_SECRET and a measurement id are configured,
 * so it's safe to ship without analytics set up.
 */

const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

export async function POST(req: NextRequest) {
  // Generous per-IP cap: enough for real multi-embed pages, blocks spam.
  const rl = checkRateLimit({
    key: `embed-impression:${getClientId(req)}`,
    max: 60,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  let wikiId: unknown;
  try {
    ({ wikiId } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  if (typeof wikiId !== 'string' || !wikiId || wikiId.length > 128) {
    return NextResponse.json({ error: 'INVALID_WIKI_ID' }, { status: 400 });
  }

  const measurementId = process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA_API_SECRET;
  // Not configured → accept the beacon but do nothing (no analytics backend).
  if (!measurementId || !apiSecret) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    // Abort quickly: the beacon is fire-and-forget; never hang the request.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);
    await fetch(
      `${GA_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        signal: controller.signal,
        body: JSON.stringify({
          // One impression per view; a fresh client_id per beacon is fine for
          // counting an event we don't need to tie to a user session.
          client_id: randomUUID(),
          events: [{ name: 'embed_impression', params: { wiki_id: wikiId } }],
        }),
      }
    ).finally(() => clearTimeout(timeout));
  } catch {
    // Swallow — a dropped impression beacon must never surface to the embedder.
  }
  return new NextResponse(null, { status: 204 });
}
