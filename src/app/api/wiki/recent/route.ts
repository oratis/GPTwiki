import { NextRequest, NextResponse } from 'next/server';
import { getRecentWikisPaginated } from '@/lib/search';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor') ? Number(searchParams.get('cursor')) : undefined;
  const limit = Math.min(Number(searchParams.get('limit') || '12'), 50);

  try {
    const result = await getRecentWikisPaginated(cursor, limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Recent wikis error:', error);
    return NextResponse.json({ error: 'Failed to fetch recent wikis' }, { status: 500 });
  }
}
