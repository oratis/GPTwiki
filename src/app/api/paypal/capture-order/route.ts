import { after, NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';
import { PayPalError, paypalFailure, paypalRequest, settledDonation, type PayPalOrder } from '@/lib/paypal/server';

export async function POST(req: NextRequest) {
  const rl = checkRateLimit({ key: `paypal-capture:${getClientId(req)}`, max: 20, windowSec: 60 });
  if (!rl.ok) return rateLimited(rl);
  const body = await req.json().catch(() => null);
  const orderId = body?.orderId;
  if (typeof orderId !== 'string' || !/^[A-Z0-9]{10,32}$/.test(orderId)) {
    return NextResponse.json({ error: 'INVALID_ORDER' }, { status: 400 });
  }

  try {
    let order: PayPalOrder;
    try {
      order = await paypalRequest<PayPalOrder>(`/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        // Reuse on retries after a timeout: the donor must never pay twice.
        headers: { 'PayPal-Request-Id': `capture-${orderId}` },
        body: '{}',
      });
    } catch (error) {
      if (!(error instanceof PayPalError) || error.code !== 'ORDER_ALREADY_CAPTURED') throw error;
      order = await paypalRequest<PayPalOrder>(`/v2/checkout/orders/${orderId}`);
    }
    const settled = settledDonation(order);
    if (!settled) {
      return NextResponse.json({ error: 'PAYMENT_NOT_COMPLETED', status: order.status }, { status: 402 });
    }

    // Register background work with Next rather than abandoning a floating promise
    // when Cloud Run finishes the request. PayPal's settled amount is authoritative.
    after(async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await db.collection('donations').doc(orderId).create({
            orderId, ...settled, status: order.status, createdAt: Date.now(),
          });
          return;
        } catch (error) {
          if ((error as { code?: number }).code === 6) return;
          console.error('Donation ledger write failed', { orderId, attempt });
          if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
        }
      }
    });
    return NextResponse.json({ id: order.id, status: order.status, ...settled });
  } catch (error) {
    const failure = paypalFailure(error);
    return NextResponse.json(failure.body, { status: failure.status });
  }
}
