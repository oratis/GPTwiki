import { NextRequest, NextResponse } from 'next/server';
import { getWikisByTag } from '@/lib/search';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get('tag');
  if (!tag) return NextResponse.json({ error: 'Missing tag' }, { status: 400 });

  try {
    const wikis = await getWikisByTag(tag);
    return NextResponse.json({ wikis });
  } catch (error) {
    console.error('Wikis by tag error:', error);
    return NextResponse.json({ error: 'Failed to fetch wikis' }, { status: 500 });
  }
}
