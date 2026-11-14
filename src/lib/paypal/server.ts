type PayPalEnvironment = 'live' | 'sandbox';

export class PayPalError extends Error {
  constructor(public code: string, public status = 502, public debugId?: string) {
    super(code);
  }
}

/** Read at request time: NEXT_PUBLIC_* literals can be frozen during Docker builds. */
export function paypalConfig(env: NodeJS.ProcessEnv = process.env) {
  const environment = env.PAYPAL_ENVIRONMENT || (env.NODE_ENV === 'production' ? 'live' : 'sandbox');
  if (environment !== 'live' && environment !== 'sandbox') throw new PayPalError('PAYPAL_UNAVAILABLE', 503);
  const clientId = (env.PAYPAL_CLIENT_ID || env['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] || '').trim();
  const secret = (env.PAYPAL_CLIENT_SECRET || '').trim();
  if (!clientId || !secret) throw new PayPalError('PAYPAL_UNAVAILABLE', 503);
  return {
    clientId, secret, environment: environment as PayPalEnvironment,
    apiUrl: environment === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com',
    sdkUrl: environment === 'live' ? 'https://www.paypal.com/web-sdk/v6/core' : 'https://www.sandbox.paypal.com/web-sdk/v6/core',
  };
}

export async function paypalRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = paypalConfig();
  const tokenResponse = await fetch(`${config.apiUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  if (!tokenResponse.ok) {
    console.error('PayPal authentication failed', { status: tokenResponse.status, debugId: tokenResponse.headers.get('paypal-debug-id') });
    throw new PayPalError('PAYPAL_UNAVAILABLE', 503);
  }
  const token = await tokenResponse.json();
  if (!token.access_token) throw new PayPalError('PAYPAL_UNAVAILABLE', 503);
  const response = await fetch(`${config.apiUrl}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token.access_token}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...init.headers },
    cache: 'no-store',
    signal: AbortSignal.timeout(20000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const issue = body.details?.[0]?.issue || body.name || 'PAYPAL_REQUEST_FAILED';
    const debugId = body.debug_id || response.headers.get('paypal-debug-id') || undefined;
    console.error('PayPal request failed', { path, status: response.status, issue, debugId });
    throw new PayPalError(issue, response.status === 422 ? 422 : 502, debugId);
  }
  return body as T;
}

export interface PayPalOrder {
  id: string;
  status: string;
  purchase_units?: Array<{
    payments?: { captures?: Array<{ id: string; status: string; amount?: { value: string; currency_code: string } }> };
  }>;
}

export function settledDonation(order: PayPalOrder) {
  const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
  if (order.status !== 'COMPLETED' || capture?.status !== 'COMPLETED' || !capture.id ||
      capture.amount?.currency_code !== 'USD' || !donationValue(capture.amount.value)) return null;
  return { captureId: capture.id, amount: capture.amount.value, currency: capture.amount.currency_code };
}

function donationValue(value: string) {
  return /^\d+(?:\.\d{1,2})?$/.test(value) && Number(value) > 0;
}

export function paypalFailure(error: unknown) {
  const known = error instanceof PayPalError;
  return {
    body: { error: known ? error.code : 'PAYPAL_REQUEST_FAILED', ...(known && error.debugId ? { debugId: error.debugId } : {}) },
    status: known ? error.status : 502,
  };
}
