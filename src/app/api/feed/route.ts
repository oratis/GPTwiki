import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const BASE_URL = 'https://gptwiki.net';

export async function GET() {
  try {
    const snapshot = await db
      .collection('wikis')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .select('title', 'summary', 'content', 'authorName', 'createdAt', 'tags', 'language')
      .get();

    const now = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>GPTwiki - AI-Powered Collaborative Wiki</title>
  <link>${BASE_URL}</link>
  <description>Latest wiki articles created through AI conversations on GPTwiki. Powered by Claude, GPT-4o, and Gemini.</description>
  <language>en</language>
  <lastBuildDate>${now}</lastBuildDate>
  <atom:link href="${BASE_URL}/api/feed" rel="self" type="application/rss+xml"/>
  <image>
    <url>${BASE_URL}/icon.png</url>
    <title>GPTwiki</title>
    <link>${BASE_URL}</link>
  </image>
`;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const title = escapeXml(data.title || 'Untitled');
      const summary = escapeXml((data.summary || data.content || '').substring(0, 500));
      const link = `${BASE_URL}/wiki/${doc.id}`;
      const pubDate = new Date(data.createdAt).toUTCString();
      const author = escapeXml(data.authorName || 'GPTwiki Bot');
      const categories = (data.tags || []).map((t: string) => `    <category>${escapeXml(t)}</category>`).join('\n');

      rss += `  <item>
    <title>${title}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <description>${summary}</description>
    <author>${author}</author>
    <pubDate>${pubDate}</pubDate>
${categories}
  </item>
`;
    }

    rss += `</channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('RSS feed error:', error);
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
