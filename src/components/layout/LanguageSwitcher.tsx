'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { locales, type Locale } from '@/lib/i18n/locales';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const switchLocale = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    // Replace the current locale segment in the URL and navigate.
    if (pathname) {
      const segments = pathname.split('/');
      // pathname begins with a leading "/", so segments[0] is ''
      if (segments.length >= 2 && segments[1] in locales) {
        segments[1] = next;
      } else {
        segments.splice(1, 0, next);
      }
      router.push(segments.join('/') || `/${next}`);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        title={t('common.language')}
        aria-label={t('common.language')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{locales[locale]}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('common.language')}
          className="absolute right-0 top-full z-50 mt-1 max-h-80 w-40 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {(Object.entries(locales) as [Locale, string][]).map(([code, name]) => (
            <button
              key={code}
              role="option"
              aria-selected={code === locale}
              onClick={() => switchLocale(code)}
              className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${
                code === locale
                  ? 'bg-blue-50 font-medium text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
