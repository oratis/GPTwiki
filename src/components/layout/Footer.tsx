'use client';

import { BookOpen } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import EmailSubscribe from './EmailSubscribe';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">{t('header.brandName')}</span>
            </div>
            <p className="max-w-xs text-sm text-gray-500">
              {t('footer.description')}
            </p>
          </div>
          <EmailSubscribe />
        </div>
      </div>
    </footer>
  );
}
