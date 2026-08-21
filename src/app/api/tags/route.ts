import { NextRequest, NextResponse } from 'next/server';
import { hasLocale } from '@/lib/i18n/server';
import { getAllTags } from '@/lib/search';

export async function GET(req: NextRequest) {
  try {
    // Only supported locales get through: getAllTags memoizes per language,
    // and an unvalidated value would let a caller mint unlimited cache keys
    // — each one a fresh 500-document read that no later request can reuse.
    const lang = new URL(req.url).searchParams.get('lang') || '';
    const tags = await getAllTags(hasLocale(lang) ? lang : undefined);
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Tags error:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
