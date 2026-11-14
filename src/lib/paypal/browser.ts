/** One shared load per SDK URL; React remounts must not strand load listeners. */
const loads = new Map<string, Promise<void>>();

export function loadPayPalSdk(src: string): Promise<void> {
  if (!['https://www.paypal.com/web-sdk/v6/core', 'https://www.sandbox.paypal.com/web-sdk/v6/core'].includes(src)) {
    return Promise.reject(new Error('Invalid PayPal SDK URL'));
  }
  const existing = loads.get(src);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    const timer = setTimeout(() => fail(), 20000);
    function fail() {
      clearTimeout(timer);
      script.remove();
      loads.delete(src);
      reject(new Error('PayPal SDK unavailable'));
    }
    script.src = src;
    script.async = true;
    script.onload = () => { clearTimeout(timer); resolve(); };
    script.onerror = fail;
    document.body.appendChild(script);
  });
  loads.set(src, promise);
  return promise;
}

export function paymentErrorKey(code?: string): string {
  if (['PAYEE_ACCOUNT_RESTRICTED', 'PAYEE_ACCOUNT_LOCKED_OR_CLOSED', 'PAYEE_ACCOUNT_NOT_VERIFIED', 'PAYPAL_UNAVAILABLE'].includes(code || '')) return 'donate.unavailable';
  if (code === 'INVALID_AMOUNT') return 'donate.invalidAmount';
  if (code === 'INSTRUMENT_DECLINED') return 'donate.declined';
  if (code === 'PAYMENT_NOT_COMPLETED') return 'donate.pending';
  return 'donate.error';
}
