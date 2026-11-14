import { NextResponse } from 'next/server';
import { paypalConfig, paypalFailure } from '@/lib/paypal/server';

export async function GET() {
  try {
    const { clientId, environment, sdkUrl } = paypalConfig();
    return NextResponse.json({ clientId, environment, sdkUrl }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const failure = paypalFailure(error);
    return NextResponse.json(failure.body, { status: failure.status, headers: { 'Cache-Control': 'no-store' } });
  }
}
