import { NextRequest, NextResponse } from 'next/server';
import { getAllTags } from '@/lib/search';

export async function GET(req: NextRequest) {
  try {
    const lang = new URL(req.url).searchParams.get('lang') || undefined;
    const tags = await getAllTags(lang);
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Tags error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
