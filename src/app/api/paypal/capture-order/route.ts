import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { checkRateLimit, getClientId, rateLimited } from '@/lib/rate-limit';

const PAYPAL_API = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Pull the captured amount PayPal actually settled from the capture response.
function extractCapturedAmount(
  capture: Record<string, unknown>
): { value: string; currency: string } | null {
  const units = (capture.purchase_units as Array<Record<string, unknown>> | undefined) ?? [];
  const payments = units[0]?.payments as Record<string, unknown> | undefined;
  const captures = payments?.captures as Array<Record<string, unknown>> | undefined;
  const amount = captures?.[0]?.amount as { value?: string; currency_code?: string } | undefined;
  if (!amount?.value || !amount?.currency_code) return null;
  return { value: amount.value, currency: amount.currency_code };
}

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('Failed to get PayPal access token');
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  const rl = checkRateLimit({
    key: `paypal-capture:${getClientId(req)}`,
    max: 20,
    windowSec: 60,
  });
  if (!rl.ok) return rateLimited(rl);

  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId || typeof orderId !== 'string' || orderId.length > 64) {
      return NextResponse.json({ error: 'Missing or invalid orderId' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('PayPal capture error:', err);
      return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
    }

    const capture = await res.json();

    // Only treat a fully completed capture as success — don't report a
    // PENDING/DECLINED capture back to the client as if it paid.
    if (capture.status !== 'COMPLETED') {
      console.error('PayPal capture not completed:', orderId, capture.status);
      return NextResponse.json(
        { error: 'Payment not completed', status: capture.status },
        { status: 402 }
      );
    }

    const amount = extractCapturedAmount(capture);

    // Fire-and-forget donation ledger entry from PayPal's settled amount
    // (source of truth). Retried so a transient Firestore hiccup doesn't lose
    // the record, but never breaks the donor's confirmation. PayPal reports
    // remain the recovery path if all attempts fail.
    (async () => {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await db.collection('donations').doc(orderId).set({
            orderId,
            captureId: capture.id ?? null,
            amount: amount?.value ?? null,
            currency: amount?.currency ?? null,
            status: capture.status,
            createdAt: Date.now(),
          });
          return;
        } catch (e) {
          console.error(`Failed to record donation ledger (attempt ${attempt}/3):`, e);
          if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
        }
      }
    })();

    return NextResponse.json({
      id: capture.id,
      status: capture.status,
      amount: amount?.value ?? null,
      currency: amount?.currency ?? null,
    });
  } catch (error) {
    console.error('Capture order error:', error);
    return NextResponse.json({ error: 'Failed to capture order' }, { status: 500 });
  }
}
