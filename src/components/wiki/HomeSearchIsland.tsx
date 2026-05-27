'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { localeHref } from '@/lib/i18n/links';
import type { Locale } from '@/lib/i18n/locales';

/**
 * Client-side search input that navigates to `/{locale}/wiki?q=...` on
 * submit. We use a real URL (not local state) so search results pages are
 * crawlable, shareable, and don't depend on JS to be reachable.
 */
export default function HomeSearchIsland({
  locale,
  placeholder,
}: {
  locale: Locale;
  placeholder: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    const target = q
      ? localeHref(locale, `/wiki?q=${encodeURIComponent(q)}`)
      : localeHref(locale, '/wiki');
    router.push(target);
  };

  return (
    <form onSubmit={submit} className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm text-blue-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </form>
  );
}
