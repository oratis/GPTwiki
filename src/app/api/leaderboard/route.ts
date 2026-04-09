import { NextResponse } from 'next/server';
import { getTopContributors } from '@/lib/search';

export async function GET() {
  try {
    const users = await getTopContributors(20);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
