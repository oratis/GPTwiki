import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { supportedLocales } from '@/lib/i18n/server';

const BASE_URL = 'https://gptwiki.net';
const BATCH_SIZE = 5000;

/**
 * Sitemap index + per-page sitemaps.
 *
 * Each wiki URL is emitted once per supported locale, with `xhtml:link`
 * alternates tying the language versions together (Google's recommended
 * format — see https://developers.google.com/search/docs/specialized/international/localized-versions#sitemap).
 *
 *   GET /api/sitemap             → sitemap index
 *   GET /api/sitemap?page=static → static pages (home, wiki list, browse, tags…)
 *   GET /api/sitemap?page=0..N   → 5000 wikis per page
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  if (page !== null) return generateSitemapPage(page);
  return generateSitemapIndex();
}

async function generateSitemapIndex() {
  const countSnap = await db.collection('wikis').count().get();
  const total = countSnap.data().count;
  const pages = Math.ceil(total / BATCH_SIZE);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=static</loc></sitemap>\n`;
  for (let i = 0; i < pages; i++) {
    xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=${i}</loc></sitemap>\n`;
  }
  xml += '</sitemapindex>';
  return xmlResponse(xml);
}

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

    // Non-localized singletons (feed, RSS)
    xml += urlNoLocale(`${BASE_URL}/api/feed`, 'daily', 0.3);

    // Tag browse pages, localized
    const tags = [
      'science', 'technology', 'history', 'geography', 'arts', 'medicine',
      'sports', 'politics', 'nature', 'philosophy', 'economics', 'engineering',
      'mathematics',
    ];
    for (const tag of tags) {
      xml += urlWithAlternates(`/browse?tag=${encodeURIComponent(tag)}`, 'weekly', 0.6);
    }
  } else {
    const page = parseInt(pageKey, 10);
    if (Number.isNaN(page)) {
      return new NextResponse('Invalid page', { status: 400 });
    }
    const offset = page * BATCH_SIZE;
    const snapshot = await db
      .collection('wikis')
      .orderBy('createdAt', 'desc')
      .offset(offset)
      .limit(BATCH_SIZE)
      .select('createdAt')
      .get();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const lastmod = new Date(data.createdAt).toISOString();
      xml += urlWithAlternates(`/wiki/${doc.id}`, 'weekly', 0.7, lastmod);
    }
  }

  xml += '</urlset>';
  return xmlResponse(xml);
}

/**
 * Emit one <url> block for each supported locale, each with xhtml:link
 * alternates pointing at every sibling locale (including x-default).
 */
function urlWithAlternates(path: string, freq: string, prio: number, lastmod?: string): string {
  let block = '';
  const normalized = path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  for (const loc of supportedLocales) {
    const loc_url = `${BASE_URL}/${loc}${normalized}`;
    block += `  <url>\n    <loc>${escapeXml(loc_url)}</loc>\n`;
    if (lastmod) block += `    <lastmod>${lastmod}</lastmod>\n`;
    block += `    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n`;
    for (const alt of supportedLocales) {
      const altUrl = `${BASE_URL}/${alt}${normalized}`;
      block += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(altUrl)}"/>\n`;
    }
    block += `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${BASE_URL}/en${normalized}`)}"/>\n`;
    block += `  </url>\n`;
  }
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
