import { NextRequest, NextResponse } from 'next/server';
import { getRecentWikisPaginated } from '@/lib/search';
import { hasLocale } from '@/lib/i18n/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor') ? Number(searchParams.get('cursor')) : undefined;
  const limit = Math.min(Number(searchParams.get('limit') || '12'), 50);
  // Optional locale filter; ignore values that aren't a supported locale to
  // avoid forwarding garbage into the Firestore query.
  const langParam = searchParams.get('lang') ?? undefined;
  const language = langParam && hasLocale(langParam) ? langParam : undefined;

  try {
    const result = await getRecentWikisPaginated(cursor, limit, language);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Recent wikis error:', error);
    return NextResponse.json({ error: 'Failed to fetch recent wikis' }, { status: 500 });
  }
}
