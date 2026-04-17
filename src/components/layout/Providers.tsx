'use client';

import { SessionProvider } from 'next-auth/react';
import { I18nProvider } from '@/lib/i18n/context';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/locales';

export default function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale?: Locale;
}) {
  return (
    <SessionProvider>
      <I18nProvider initialLocale={locale}>{children}</I18nProvider>
    </SessionProvider>
  );
}
