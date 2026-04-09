import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const BASE_URL = 'https://gptwiki.net';
const BATCH_SIZE = 5000;

/**
 * GET /api/sitemap — returns sitemap index
 * GET /api/sitemap?page=0 — returns sitemap for page 0 (first 5000 wikis)
 * GET /api/sitemap?page=1 — returns sitemap for page 1 (next 5000)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');

  if (page !== null) {
    return generateSitemapPage(parseInt(page, 10));
  }

  return generateSitemapIndex();
}

async function generateSitemapIndex() {
  // Count total wikis
  const countSnap = await db.collection('wikis').count().get();
  const total = countSnap.data().count;
  const pages = Math.ceil(total / BATCH_SIZE);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static sitemap
  xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=static</loc></sitemap>\n`;

  // Wiki sitemaps
  for (let i = 0; i < pages; i++) {
    xml += `  <sitemap><loc>${BASE_URL}/api/sitemap?page=${i}</loc></sitemap>\n`;
  }

  xml += '</sitemapindex>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

async function generateSitemapPage(page: number) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  if (isNaN(page)) {
    // Static pages
    xml += url(BASE_URL, 'daily', 1.0);
    xml += url(`${BASE_URL}/wiki`, 'daily', 0.9);
    xml += url(`${BASE_URL}/browse`, 'daily', 0.8);
    xml += url(`${BASE_URL}/donate`, 'monthly', 0.3);
    xml += url(`${BASE_URL}/api/feed`, 'daily', 0.3);

    // Category pages (tag-based browse URLs)
    const tags = ['science', 'technology', 'history', 'geography', 'arts', 'medicine',
      'sports', 'politics', 'nature', 'philosophy', 'economics', 'engineering',
      'mathematics', 'en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'it', 'ar', 'hi', 'tr', 'vi', 'th'];
    for (const tag of tags) {
      xml += url(`${BASE_URL}/browse?tag=${encodeURIComponent(tag)}`, 'weekly', 0.6);
    }
  } else {
    // Wiki pages — paginated query
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
      xml += `  <url><loc>${BASE_URL}/wiki/${doc.id}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    }
  }

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function url(loc: string, freq: string, priority: number) {
  return `  <url><loc>${loc}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>\n`;
}
