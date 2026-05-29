import { NextResponse } from 'next/server';
import { getTopContributors, toPublicUserProfile } from '@/lib/search';

export async function GET() {
  try {
    const users = (await getTopContributors(20)).map(toPublicUserProfile);
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
