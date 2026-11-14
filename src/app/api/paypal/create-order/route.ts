import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { donationAmount } from '@/lib/paypal/amount';
import { paypalRequest, paypalFailure, type PayPalOrder } from '@/lib/paypal/server';

export async function POST(req: NextRequest) {
  const rl = checkRateLimit({ key: `paypal-create:${getClientId(req)}`, max: 10, windowSec: 60 });
  if (!rl.ok) return rateLimited(rl);
  const body = await req.json().catch(() => null);
  const amount = donationAmount(body?.amount);
  if (!amount) return NextResponse.json({ error: 'INVALID_AMOUNT' }, { status: 400 });

  try {
    const order = await paypalRequest<PayPalOrder>('/v2/checkout/orders', {
      method: 'POST',
      headers: { 'PayPal-Request-Id': randomUUID() },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'USD', value: amount }, description: 'Donation to GPTwiki' }],
        payment_source: {
          paypal: { experience_context: { brand_name: 'GPTwiki', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' } },
        },
      }),
    });
    if (!order.id) throw new Error('PayPal returned no order id');
    return NextResponse.json({ id: order.id });
  } catch (error) {
    const failure = paypalFailure(error);
    return NextResponse.json(failure.body, { status: failure.status });
  }
}
