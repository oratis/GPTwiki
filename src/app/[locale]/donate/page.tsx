'use client';

import { useState, useEffect, useRef } from 'react';
import Link from '@/components/LocaleLink';
import { Heart, Coffee, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

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

  useEffect(() => {
    // Load PayPal SDK v6
    if (document.querySelector('script[src*="paypal.com/web-sdk"]')) {
      initPayPal();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/web-sdk/v6/core';
    script.async = true;
    script.onload = () => initPayPal();
    script.onerror = () => setError('Failed to load PayPal SDK');
    document.body.appendChild(script);
  }, []);

  async function initPayPal() {
    try {
      if (!window.paypal) return;

      // Fetch client ID at runtime (NEXT_PUBLIC_ vars aren't available at Cloud Build time)
      const configRes = await fetch('/api/paypal/config');
      if (!configRes.ok) return;
      const { clientId } = await configRes.json();
      if (!clientId) return;

      const sdkInstance = await window.paypal.createInstance({
        clientId,
        components: ['paypal-payments'],
      });

      const methods = await sdkInstance.findEligibleMethods({ currencyCode: 'USD' });

      if (methods.isEligible('paypal')) {
        const paymentSession = await sdkInstance.createPayPalOneTimePaymentSession({
          onApprove: async (data) => {
            try {
              const res = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderId }),
              });
              if (!res.ok) throw new Error('Capture failed');
              setSuccess(true);
              setProcessing(false);
            } catch {
              setError(t('donate.error'));
              setProcessing(false);
            }
          },
          onCancel: () => {
            setProcessing(false);
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            setError(t('donate.error'));
            setProcessing(false);
          },
        });

        sessionRef.current = paymentSession;
        setSdkReady(true);
      }
    } catch (err) {
      console.error('PayPal init error:', err);
      setError('Failed to initialize PayPal');
    }
  }

  async function handleDonate() {
    if (!sessionRef.current || processing) return;

    const donateAmount = parseFloat(activeAmount);
    if (!donateAmount || donateAmount < 1) {
      setError(t('donate.minAmount'));
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const orderPromise = fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donateAmount.toFixed(2) }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to create order');
          return res.json();
        })
        .then((data) => ({ orderId: data.id }));

      await sessionRef.current.start(
        { presentationMode: 'auto' },
        orderPromise
      );
    } catch (err) {
      console.error('Donate error:', err);
      setError(t('donate.error'));
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
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('donate.customAmount')}
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
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
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Donate button */}
          <button
            onClick={handleDonate}
            disabled={!sdkReady || processing || !activeAmount}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('donate.processing')}
              </>
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
