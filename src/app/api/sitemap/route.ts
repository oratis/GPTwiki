import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { supportedLocales, defaultLocale } from '@/lib/i18n/server';
import { ARENA_LOCALES } from '@/lib/arena/locales';

const BASE_URL = 'https://gptwiki.net';
const BATCH_SIZE = 2000;
const DAY_MS = 24 * 60 * 60 * 1000;
const RECENT_DAYS = 60;       // recent content is sharded into this many daily buckets
const EDITORIAL_CAP = 20000;  // all original (source: 'editorial') docs in one shard

/**
 * Sitemap index + per-page sitemaps, built to scale to ~19M docs.
 *
 * The old design streamed EVERY wiki id to precompute pagination cursors — an
 * O(N) walk that, at 19M docs, streams for minutes and times out the request
 * (even a 50k-capped scan measured ~57s). So the index NEVER scans the
 * collection now. It is computed arithmetically and lists:
 *   - static  → home / list / browse / tag pages
 *   - editorial → ALL original ('editorial') docs (the rankable content,
 *                 including the auto-content pipeline) — guaranteed coverage
 *                 regardless of age, via a bounded where(source) query.
 *   - recent-<dayStartMs> × RECENT_DAYS → each a bounded createdAt-range query
 *                 for one UTC day of freshly created/updated docs.
 *
 * Every sub-page is a single bounded query (≤ BATCH_SIZE, or ≤ EDITORIAL_CAP),
 * so nothing in the request path is O(collection). The ~19M Wikipedia-mirror
 * long-tail beyond the recent window is intentionally not enumerated here (it's
 * duplicate-of-Wikipedia content, and a 19M-URL sitemap is an anti-pattern);
 * add a precomputed-shard job if full long-tail coverage is ever wanted.
 *
 * Legacy `?page=<docId>` requests still work via a __name__-cursor fallback.
 *
 *   GET /api/sitemap                      → sitemap index
 *   GET /api/sitemap?page=static          → static + tag pages
 *   GET /api/sitemap?page=editorial       → all original docs
 *   GET /api/sitemap?page=recent-<ms>     → one UTC day of docs by createdAt
 *   GET /api/sitemap?page=<docId|0>       → legacy __name__-cursor page
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  if (page !== null) return generateSitemapPage(page);
  return generateSitemapIndex();
}

// ─── Index (arithmetic + a small meta-doc read for the long-tail) ───────────

async function generateSitemapIndex() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const shard = (page: string) => {
    xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=${page}</loc></sitemap>\n`;
  };
  shard('static');
  shard('editorial');
  // One shard per recent UTC day, newest first.
  const todayStart = Math.floor(Date.now() / DAY_MS) * DAY_MS;
  for (let i = 0; i < RECENT_DAYS; i++) {
    shard(`recent-${todayStart - i * DAY_MS}`);
  }
  // Full long-tail (optional): if scripts/build-sitemap-shards.ts has
  // precomputed cursors, enumerate the whole corpus via legacy __name__ pages.
  // Absent → index stays static+editorial+recent. Either way, no
  // full-collection scan happens in the request.
  try {
    const meta = await db.doc('_meta/sitemap_shards').get();
    if (meta.exists) {
      const cps = (meta.data()?.checkpoints as string[] | undefined) ?? [];
      shard('0');
      for (const id of cps) shard(encodeURIComponent(id));
    }
  } catch (err) {
    console.error('sitemap shards read failed:', (err as Error).message);
  }
  xml += '</sitemapindex>';
  return xmlResponse(xml);
}

// ─── Sub-pages ──────────────────────────────────────────────────────────────

async function generateSitemapPage(pageKey: string) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  try {
    if (pageKey === 'static') {
      xml += staticUrls();
    } else if (pageKey === 'editorial') {
      const snap = await db
        .collection('wikis')
        .where('source', '==', 'editorial')
        .limit(EDITORIAL_CAP)
        .select('createdAt', 'updatedAt')
        .get();
      xml += wikiUrls(snap);
    } else if (pageKey.startsWith('recent-')) {
      const start = Number(pageKey.slice('recent-'.length));
      if (!Number.isFinite(start)) {
        return new NextResponse('Bad recent bucket', { status: 400 });
      }
      const snap = await db
        .collection('wikis')
        .where('createdAt', '>=', start)
        .where('createdAt', '<', start + DAY_MS)
        .orderBy('createdAt', 'desc')
        .limit(BATCH_SIZE)
        .select('createdAt', 'updatedAt')
        .get();
      xml += wikiUrls(snap);
    } else {
      // Legacy __name__-cursor page (keeps previously-submitted URLs working).
      let q = db.collection('wikis').orderBy('__name__');
      if (pageKey !== '0') q = q.startAfter(pageKey);
      const snap = await q.limit(BATCH_SIZE).select('createdAt', 'updatedAt').get();
      xml += wikiUrls(snap);
    }
  } catch (err) {
    console.error('Sitemap page query failed:', { pageKey, err: (err as Error).message });
    return new NextResponse('Sitemap page generation failed', { status: 500 });
  }

  xml += '</urlset>';
  return xmlResponse(xml);
}

function staticUrls(): string {
  let xml = '';
  // `locales` narrows the hreflang cluster for a path. Only the arena needs it:
  // its copy is authored in en+zh only, so listing the other 13 would present
  // duplicate English pages to crawlers as translations.
  const staticPaths: Array<{
    path: string;
    freq: string;
    prio: number;
    locales?: readonly string[];
  }> = [
    { path: '', freq: 'daily', prio: 1.0 },
    { path: '/wiki', freq: 'daily', prio: 0.9 },
    { path: '/browse', freq: 'daily', prio: 0.8 },
    // Arena: only the hub, the board, and the published methodology. Battle
    // permalinks (/arena/b/<id>) are noindex and deliberately never listed —
    // two AI answers to one prompt is thin, near-duplicate, mass-producible
    // content, and letting it into a hreflang sitemap is the scaled-content
    // signal that would put the existing corpus at risk.
    { path: '/arena', freq: 'daily', prio: 0.7, locales: ARENA_LOCALES },
    { path: '/arena/leaderboard', freq: 'daily', prio: 0.7, locales: ARENA_LOCALES },
    { path: '/arena/rules', freq: 'monthly', prio: 0.5, locales: ARENA_LOCALES },
    { path: '/arena/contributors', freq: 'weekly', prio: 0.4, locales: ARENA_LOCALES },
    { path: '/donate', freq: 'monthly', prio: 0.3 },
  ];
  for (const { path, freq, prio, locales } of staticPaths) {
    xml += urlWithAlternates(path, freq, prio, undefined, locales);
  }
  xml += urlNoLocale(`${BASE_URL}/api/feed`, 'daily', 0.3);
  const tags = [
    'science', 'technology', 'history', 'geography', 'arts', 'medicine',
    'sports', 'politics', 'nature', 'philosophy', 'economics', 'engineering',
    'mathematics', 'literature', 'culture', 'religion', 'biology', 'physics',
    'art', 'biography', 'architecture', 'design', 'music', 'astronomy',
  ];
  for (const tag of tags) xml += urlWithAlternates(`/tags/${encodeURIComponent(tag)}`, 'weekly', 0.6);
  return xml;
}

function wikiUrls(snap: FirebaseFirestore.QuerySnapshot): string {
  let xml = '';
  for (const doc of snap.docs) {
    const data = doc.data() as { createdAt?: number; updatedAt?: number };
    const ts = data.updatedAt ?? data.createdAt;
    const lastmod = ts ? new Date(ts).toISOString() : undefined;
    xml += urlWithAlternates(`/wiki/${doc.id}`, 'weekly', 0.7, lastmod);
  }
  return xml;
}

// ─── XML helpers ───────────────────────────────────────────────────────────

/**
 * Emit a single `<url>` for `path`, using the default locale as the loc and
 * attaching xhtml:link alternates + x-default. This is Google's documented
 * format and yields 15× less XML than the one-url-per-locale pattern.
 *
 * `locales` defaults to every supported locale. Pass a narrower set for paths
 * that are not actually translated across all of them — an alternate is a claim
 * that the URL is that language's version of the page, so listing a locale that
 * serves fallback English asserts something untrue.
 */
function urlWithAlternates(
  path: string,
  freq: string,
  prio: number,
  lastmod?: string,
  locales: readonly string[] = supportedLocales
): string {
  const normalized = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonical = `${BASE_URL}/${defaultLocale}${normalized}`;
  let block = `  <url>\n    <loc>${escapeXml(canonical)}</loc>\n`;
  if (lastmod) block += `    <lastmod>${lastmod}</lastmod>\n`;
  block += `    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n`;
  for (const alt of locales) {
    const altUrl = `${BASE_URL}/${alt}${normalized}`;
    block += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(altUrl)}"/>\n`;
  }
  block += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(canonical)}"/>\n`;
  block += `  </url>\n`;
  return block;
}

function urlNoLocale(loc: string, freq: string, prio: number): string {
  return `  <url><loc>${escapeXml(loc)}</loc><changefreq>${freq}</changefreq><priority>${prio}</priority></url>\n`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function xmlResponse(xml: string) {
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
