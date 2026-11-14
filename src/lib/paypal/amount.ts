/** Reject partial numbers and sub-cent rounding before asking PayPal to charge. */
export function donationAmount(value: unknown): string | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const text = String(value).trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return null;
  const amount = Number(text);
  return Number.isFinite(amount) && amount >= 1 && amount <= 10000 ? amount.toFixed(2) : null;
}
