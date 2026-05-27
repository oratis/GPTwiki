import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { supportedLocales, defaultLocale } from '@/lib/i18n/server';

const BASE_URL = 'https://gptwiki.net';
const BATCH_SIZE = 2000;

/**
 * Sitemap index + per-page wiki sitemaps.
 *
 * Why the shape it has:
 *  - Each wiki is emitted ONCE (under the default locale URL) with
 *    `xhtml:link` alternates for every supported locale. Per Google,
 *    the alternate annotation only needs to live on one `<url>`
 *    (https://developers.google.com/search/docs/specialized/international/localized-versions#sitemap).
 *    Emitting one URL per locale was multiplying output 15x and OOMing
 *    Cloud Run on every wiki sub-page (all returning 503).
 *  - Pagination uses `__name__` (Firestore document ID) cursors instead
 *    of `offset()`. `offset(N)` is O(N) in Firestore — page 79 was
 *    scanning ~395K docs before yielding anything.
 *  - The index pre-computes cursors by streaming all wiki IDs once
 *    (single-field projection, ~8 MB at 400K docs) and caches the
 *    result in-process for 1h; HTTP `s-maxage` extends that across
 *    instances via the CDN.
 *
 *   GET /api/sitemap                     → sitemap index
 *   GET /api/sitemap?page=static         → home, wiki list, browse, tag pages
 *   GET /api/sitemap?page=<docId|0>      → up to BATCH_SIZE wikis starting after cursor
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  if (page !== null) return generateSitemapPage(page);
  return generateSitemapIndex();
}

// ─── In-process cursor cache ───────────────────────────────────────────────

type Checkpoint = { startAfter: string | null };
type CursorCache = { computedAt: number; checkpoints: Checkpoint[] };

const CURSOR_TTL_MS = 60 * 60 * 1000; // 1h
let _cursorCache: CursorCache | null = null;

async function getCheckpoints(): Promise<Checkpoint[]> {
  const now = Date.now();
  if (_cursorCache && now - _cursorCache.computedAt < CURSOR_TTL_MS) {
    return _cursorCache.checkpoints;
  }

  // Stream all wiki IDs ordered by document ID, picking every BATCH_SIZE-th
  // ID as a cursor boundary. We use `select()` with no args to fetch
  // document references only (no field data).
  const checkpoints: Checkpoint[] = [{ startAfter: null }];
  const stream = db.collection('wikis').orderBy('__name__').select().stream();
  let count = 0;
  for await (const doc of stream as AsyncIterable<FirebaseFirestore.QueryDocumentSnapshot>) {
    count++;
    if (count % BATCH_SIZE === 0) {
      checkpoints.push({ startAfter: doc.id });
    }
  }
  // The last checkpoint may have nothing after it; drop it if its cursor
  // would yield zero docs (i.e., total is an exact multiple of BATCH_SIZE).
  if (count % BATCH_SIZE === 0 && checkpoints.length > 1) {
    checkpoints.pop();
  }

  _cursorCache = { computedAt: now, checkpoints };
  return checkpoints;
}

// ─── Index ─────────────────────────────────────────────────────────────────

async function generateSitemapIndex() {
  let checkpoints: Checkpoint[];
  try {
    checkpoints = await getCheckpoints();
  } catch (err) {
    console.error('Sitemap checkpoint scan failed:', err);
    // Fall back to a static-only index rather than 500 — robots still gets
    // *something* and Google will retry later.
    checkpoints = [];
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=static</loc></sitemap>\n`;
  for (const cp of checkpoints) {
    const pageKey = cp.startAfter ?? '0';
    xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=${encodeURIComponent(pageKey)}</loc></sitemap>\n`;
  }
  xml += '</sitemapindex>';
  return xmlResponse(xml);
}

// ─── Sub-pages ─────────────────────────────────────────────────────────────

async function generateSitemapPage(pageKey: string) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  if (pageKey === 'static') {
    const staticPaths: Array<{ path: string; freq: string; prio: number }> = [
      { path: '', freq: 'daily', prio: 1.0 },
      { path: '/wiki', freq: 'daily', prio: 0.9 },
      { path: '/browse', freq: 'daily', prio: 0.8 },
      { path: '/donate', freq: 'monthly', prio: 0.3 },
    ];
    for (const { path, freq, prio } of staticPaths) {
      xml += urlWithAlternates(path, freq, prio);
    }

    xml += urlNoLocale(`${BASE_URL}/api/feed`, 'daily', 0.3);

    // Tag landing pages now live at /tags/[tag] (real SSR routes) instead
    // of /browse?tag=... query shells.
    const tags = [
      'science', 'technology', 'history', 'geography', 'arts', 'medicine',
      'sports', 'politics', 'nature', 'philosophy', 'economics', 'engineering',
      'mathematics', 'literature', 'culture', 'religion', 'biology', 'physics',
      'art', 'biography', 'architecture', 'design', 'music', 'astronomy',
    ];
    for (const tag of tags) {
      xml += urlWithAlternates(`/tags/${encodeURIComponent(tag)}`, 'weekly', 0.6);
    }
  } else {
    try {
      let q = db.collection('wikis').orderBy('__name__');
      if (pageKey !== '0') {
        q = q.startAfter(pageKey);
      }
      const snapshot = await q.limit(BATCH_SIZE).select('createdAt', 'updatedAt').get();
      for (const doc of snapshot.docs) {
        const data = doc.data() as { createdAt?: number; updatedAt?: number };
        const ts = data.updatedAt ?? data.createdAt;
        const lastmod = ts ? new Date(ts).toISOString() : undefined;
        xml += urlWithAlternates(`/wiki/${doc.id}`, 'weekly', 0.7, lastmod);
      }
    } catch (err) {
      console.error('Sitemap page query failed:', { pageKey, err });
      return new NextResponse('Sitemap page generation failed', { status: 500 });
    }
  }

  xml += '</urlset>';
  return xmlResponse(xml);
}

// ─── XML helpers ───────────────────────────────────────────────────────────

/**
 * Emit a single `<url>` for `path`, using the default locale as the loc and
 * attaching xhtml:link alternates for every supported locale + x-default.
 * This is Google's documented format and yields 15× less XML than the
 * one-url-per-locale pattern.
 */
function urlWithAlternates(path: string, freq: string, prio: number, lastmod?: string): string {
  const normalized = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonical = `${BASE_URL}/${defaultLocale}${normalized}`;
  let block = `  <url>\n    <loc>${escapeXml(canonical)}</loc>\n`;
  if (lastmod) block += `    <lastmod>${lastmod}</lastmod>\n`;
  block += `    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n`;
  for (const alt of supportedLocales) {
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
