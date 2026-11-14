'use client';

import { useState, useEffect, useRef } from 'react';
import Link from '@/components/LocaleLink';
import { Heart, Coffee, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { donationAmount } from '@/lib/paypal/amount';
import { loadPayPalSdk, paymentErrorKey } from '@/lib/paypal/browser';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];
const PENDING_PAYMENT_KEY = 'gptwiki:paypal-pending';

function rememberPayment(orderId: string | null) {
  try {
    if (orderId) sessionStorage.setItem(PENDING_PAYMENT_KEY, orderId);
    else sessionStorage.removeItem(PENDING_PAYMENT_KEY);
  } catch { /* Private browsing can disable storage; in-memory recovery still works. */ }
}

declare global {
  interface Window {
    paypal?: {
      createInstance: (config: {
        clientId: string;
        components: string[];
      }) => Promise<{
        findEligibleMethods: (opts?: { currencyCode: string }) => Promise<{
          isEligible: (method: string) => boolean;
        }>;
        createPayPalOneTimePaymentSession: (opts: {
          onApprove: (data: { orderId: string }) => void;
          onCancel: (data: unknown) => void;
          onError: (error: unknown) => void;
        }) => Promise<{
          start: (
            opts: { presentationMode: string },
            orderPromise: Promise<{ orderId: string }>
          ) => Promise<void>;
        }>;
      }>;
    };
  }
}

export default function DonatePage() {
  const { t } = useI18n();
  const [amount, setAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [pendingOrder, setPendingOrder] = useState<string | null>(null);
  const busyRef = useRef(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const sessionRef = useRef<{
    start: (
      opts: { presentationMode: string },
      orderPromise: Promise<{ orderId: string }>
    ) => Promise<void>;
  } | null>(null);

  const activeAmount = customAmount || amount;

  async function captureOrder(orderId: string) {
    setPendingOrder(orderId);
    rememberPayment(orderId);
    try {
      const res = await fetch('/api/paypal/capture-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
        signal: AbortSignal.timeout(45000),
      });
      const result = await res.json();
      if (!res.ok || result.status !== 'COMPLETED') {
        if (result.error === 'INSTRUMENT_DECLINED') { setPendingOrder(null); rememberPayment(null); }
        throw new Error(result.error || 'PAYMENT_NOT_COMPLETED');
      }
      setSuccess(true);
      setPendingOrder(null);
      rememberPayment(null);
    } catch (error) {
      setError(t(paymentErrorKey((error as Error).message)));
    } finally {
      busyRef.current = false;
      setProcessing(false);
    }
  }
  const captureRef = useRef(captureOrder);
  useEffect(() => { captureRef.current = captureOrder; });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    async function initPayPal() {
      setSdkReady(false);
      setSdkFailed(false);
      setError('');
      try {
        const pending = sessionStorage.getItem(PENDING_PAYMENT_KEY);
        if (pending && /^[A-Z0-9]{10,32}$/.test(pending)) setPendingOrder(pending);
      } catch { /* Storage is optional. */ }
      try {
        const configRes = await fetch('/api/paypal/config', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]) });
        const config = await configRes.json();
        if (!configRes.ok || !config.clientId) throw new Error('PAYPAL_UNAVAILABLE');
        await loadPayPalSdk(config.sdkUrl);
        if (cancelled) return;
        if (!window.paypal) throw new Error('SDK_UNAVAILABLE');
        const sdkInstance = await window.paypal.createInstance({ clientId: config.clientId, components: ['paypal-payments'] });
        const methods = await sdkInstance.findEligibleMethods({ currencyCode: 'USD' });
        if (!methods.isEligible('paypal')) throw new Error('PAYPAL_UNAVAILABLE');
        const paymentSession = await sdkInstance.createPayPalOneTimePaymentSession({
          onApprove: async ({ orderId }) => { if (!cancelled) await captureRef.current(orderId); },
          onCancel: () => { if (!cancelled) { busyRef.current = false; setProcessing(false); } },
          onError: () => {
            if (!cancelled) { setError(t('donate.error')); busyRef.current = false; setProcessing(false); }
          },
        });
        if (!cancelled) { sessionRef.current = paymentSession; setSdkReady(true); }
      } catch (error) {
        if (!cancelled) {
          setSdkFailed(true);
          setError(t((error as Error).message === 'PAYPAL_UNAVAILABLE' ? 'donate.unavailable' : 'errors.paypalLoad'));
        }
      }
    }
    void initPayPal();
    return () => { cancelled = true; controller.abort(); sessionRef.current = null; };
  }, [t, retry]);

  async function handleDonate() {
    if (busyRef.current) return;
    if (pendingOrder) {
      busyRef.current = true;
      setProcessing(true);
      setError('');
      await captureOrder(pendingOrder);
      return;
    }
    if (!sessionRef.current) return;
    const value = donationAmount(activeAmount);
    if (!value) { setError(t('donate.invalidAmount')); return; }
    busyRef.current = true;
    setProcessing(true);
    setError('');
    try {
      const orderPromise = fetch('/api/paypal/create-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value }), signal: AbortSignal.timeout(45000),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.id) throw new Error(data.error || 'PAYPAL_REQUEST_FAILED');
        return { orderId: data.id as string };
      });
      // Attach a rejection handler immediately even if SDK.start fails synchronously.
      void orderPromise.catch((error: Error) => setError(t(paymentErrorKey(error.message))));
      await sessionRef.current.start({ presentationMode: 'auto' }, orderPromise);
    } catch (error) {
      setError(t(paymentErrorKey((error as Error).message)));
      busyRef.current = false;
      setProcessing(false);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">{t('donate.thankYou')}</h1>
          <p className="mb-6 text-gray-600">{t('donate.thankYouMsg')}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            {t('common.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
            <Heart className="h-8 w-8 text-pink-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{t('donate.title')}</h1>
          <p className="text-gray-600">{t('donate.subtitle')}</p>
        </div>

        {/* Donation card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Preset amounts */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              {t('donate.selectAmount')}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  disabled={processing || Boolean(pendingOrder)}
                  aria-pressed={activeAmount === String(preset) && !customAmount}
                  onClick={() => {
                    setAmount(String(preset));
                    setCustomAmount('');
                  }}
                  className={`rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                    activeAmount === String(preset) && !customAmount
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="mb-6">
            <label htmlFor="donation-amount" className="mb-2 block text-sm font-medium text-gray-700">
              {t('donate.customAmount')}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="donation-amount"
                disabled={processing || Boolean(pendingOrder)}
                type="number"
                min="1"
                max="10000"
                step="0.01"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={t('donate.enterAmount')}
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-lg font-medium text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {sdkFailed && !pendingOrder && (
            <button onClick={() => setRetry((value) => value + 1)} className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
              {t('donate.retry')}
            </button>
          )}
          {/* Donate button */}
          <button
            onClick={handleDonate}
            disabled={processing || (!pendingOrder && (!sdkReady || !activeAmount))}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('donate.processing')}
              </>
            ) : pendingOrder ? (
              t('donate.confirmPayment')
            ) : sdkFailed ? (
              t('donate.unavailableShort')
            ) : !sdkReady ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('donate.loading')}
              </>
            ) : (
              <>
                <Coffee className="h-5 w-5" />
                {t('donate.donateBtn', { amount: activeAmount })}
              </>
            )}
          </button>

          {/* PayPal badge */}
          <p className="mt-4 text-center text-xs text-gray-400">
            {t('donate.poweredBy')}
          </p>
        </div>

        {/* Why donate */}
        <div className="mt-8 rounded-2xl bg-gray-50 p-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">{t('donate.whyTitle')}</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">&#10003;</span>
              {t('donate.reason1')}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">&#10003;</span>
              {t('donate.reason2')}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-500">&#10003;</span>
              {t('donate.reason3')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
