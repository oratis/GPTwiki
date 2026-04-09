import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserApiKeys, updateUserApiKeys } from '@/lib/search';
import type { UserApiKeys } from '@/types';

function maskKey(key: string): string {
  if (key.length <= 8) return '****';
  return key.substring(0, 7) + '***' + key.substring(key.length - 4);
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const keys = await getUserApiKeys(session.user.id!);
    // Return masked keys
    const masked: Record<string, string | null> = {
      anthropic: keys?.anthropic ? maskKey(keys.anthropic) : null,
      openai: keys?.openai ? maskKey(keys.openai) : null,
      google: keys?.google ? maskKey(keys.google) : null,
    };
    return NextResponse.json(masked);
  } catch (error) {
    console.error('Get API keys error:', error);
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { provider, key } = body as { provider: keyof UserApiKeys; key: string | null };

    if (!['anthropic', 'openai', 'google'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    const existing = (await getUserApiKeys(session.user.id!)) || {};
    const updated: UserApiKeys = { ...existing };

    if (key) {
      updated[provider] = key;
    } else {
      delete updated[provider];
    }

    await updateUserApiKeys(session.user.id!, updated);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update API keys error:', error);
    return NextResponse.json({ error: 'Failed to update API keys' }, { status: 500 });
  }
}
