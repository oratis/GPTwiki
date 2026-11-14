import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { donationAmount } from '../src/lib/paypal/amount';
import { paymentErrorKey } from '../src/lib/paypal/browser';
import { PayPalError, paypalConfig, paypalRequest, settledDonation } from '../src/lib/paypal/server';
import { POST as createOrder } from '../src/app/api/paypal/create-order/route';

async function main() {
  for (const bad of [null, '', '1abc', 'Infinity', Infinity, NaN, -1, 0.99, '1.001', '1e2', 10001, {}, true]) {
    assert.equal(donationAmount(bad), null, String(bad));
  }
  assert.equal(donationAmount(' 5.50 '), '5.50');
  assert.equal(donationAmount(10000), '10000.00');
  const env = { NODE_ENV: 'production', PAYPAL_CLIENT_ID: 'runtime-id', NEXT_PUBLIC_PAYPAL_CLIENT_ID: 'legacy-id', PAYPAL_CLIENT_SECRET: 'test-secret', PAYPAL_ENVIRONMENT: 'sandbox' } as NodeJS.ProcessEnv;
  assert.equal(paypalConfig(env).clientId, 'runtime-id');
  assert.match(paypalConfig(env).apiUrl, /sandbox/);
  assert.match(paypalConfig(env).sdkUrl, /sandbox/);
  assert.throws(() => paypalConfig({ ...env, PAYPAL_ENVIRONMENT: 'invalid' }), PayPalError);
  assert.throws(() => paypalConfig({ ...env, PAYPAL_CLIENT_SECRET: '' }), PayPalError);
  assert.equal(paymentErrorKey('PAYEE_ACCOUNT_RESTRICTED'), 'donate.unavailable');

  const captured = { id: 'ORDER123456789', status: 'COMPLETED', purchase_units: [{ payments: { captures: [{ id: 'CAPTURE123', status: 'COMPLETED', amount: { value: '5.50', currency_code: 'USD' } }] } }] };
  assert.deepEqual(settledDonation(captured), { captureId: 'CAPTURE123', amount: '5.50', currency: 'USD' });
  assert.equal(settledDonation({ ...captured, status: 'APPROVED' }), null);
  assert.equal(settledDonation({ id: captured.id, status: 'COMPLETED' }), null);
  captured.purchase_units[0].payments.captures[0].status = 'PENDING';
  assert.equal(settledDonation(captured), null, 'An order-level COMPLETED is not a completed capture');

  const originalFetch = globalThis.fetch;
  const previousEnv = { ...process.env };
  Object.assign(process.env, env);
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  try {
    let restricted = false;
    globalThis.fetch = async (url, init) => {
      calls.push({ url: String(url), init });
      if (String(url).includes('oauth2')) return Response.json({ access_token: 'server-only-token' });
      return restricted
        ? Response.json({ name: 'UNPROCESSABLE_ENTITY', details: [{ issue: 'PAYEE_ACCOUNT_RESTRICTED' }], debug_id: 'debug-test' }, { status: 422 })
        : Response.json({ id: 'ORDER123456789', status: 'CREATED' });
    };
    const request = (body: string) => new NextRequest('http://localhost/api/paypal/create-order', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } });
    assert.equal((await createOrder(request('{'))).status, 400);
    assert.equal((await createOrder(request('{"amount":"5junk"}'))).status, 400);
    assert.equal(calls.length, 0, 'Malformed requests must not touch PayPal');
    const success = await createOrder(request('{"amount":"5.50"}'));
    assert.equal(success.status, 200);
    assert.deepEqual(await success.json(), { id: 'ORDER123456789' });
    const sent = JSON.parse(calls[1].init?.body as string);
    assert.equal(sent.purchase_units[0].amount.value, '5.50');
    assert.equal(sent.purchase_units[0].amount.currency_code, 'USD');
    assert.ok(new Headers(calls[1].init?.headers).get('PayPal-Request-Id'));
    assert.ok(calls.every((call) => call.url.startsWith('https://api-m.sandbox.paypal.com/')));
    restricted = true;
    const failed = await createOrder(request('{"amount":5}'));
    assert.equal(failed.status, 422);
    assert.deepEqual(await failed.json(), { error: 'PAYEE_ACCOUNT_RESTRICTED', debugId: 'debug-test' });
    await assert.rejects(paypalRequest('/v2/checkout/orders'), (e: unknown) => e instanceof PayPalError && e.code === 'PAYEE_ACCOUNT_RESTRICTED');
  } finally {
    globalThis.fetch = originalFetch;
    process.env = previousEnv;
  }
  console.log('PayPal: amount validation, environment consistency, capture state, order API and safe diagnostics passed');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
