import { NextRequest, NextResponse } from 'next/server';
import { searchWikis, getPopularWikis } from '@/lib/search';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  try {
    const wikis = q ? await searchWikis(q) : await getPopularWikis();
    return NextResponse.json({ wikis });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
