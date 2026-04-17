import Link from 'next/link';
import { Eye, Tag } from 'lucide-react';
import { getWikisByTag } from '@/lib/search';
import { localeHref } from '@/lib/i18n/links';
import { defaultLocale, type Locale } from '@/lib/i18n/locales';
import type { Wiki } from '@/types';

interface Props {
  currentWikiId: string;
  tags: string[];
  locale?: Locale;
}

/**
 * Server-component "Related wikis" module. Fetches up to ~12 wikis sharing
 * any of the current article's tags, de-duplicates, and renders a compact grid.
 * Runs at build-time for ISR pages so it ships as pre-rendered HTML — pure
 * SEO fuel for internal linking.
 */
export default async function RelatedWikis({ currentWikiId, tags, locale = defaultLocale }: Props) {
  if (!tags?.length) return null;

  // Pull wikis for up to 3 tags in parallel, then merge.
  const pickTags = tags.slice(0, 3);
  const bucketArrays = await Promise.all(pickTags.map((t) => getWikisByTag(t, 8)));
  const seen = new Set<string>([currentWikiId]);
  const related: Wiki[] = [];
  for (const bucket of bucketArrays) {
    for (const w of bucket) {
      if (seen.has(w.id)) continue;
      seen.add(w.id);
      related.push(w);
      if (related.length >= 6) break;
    }
    if (related.length >= 6) break;
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Related wikis</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((w) => (
          <Link
            key={w.id}
            href={localeHref(locale, `/wiki/${w.id}`)}
            className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-blue-600">
              {w.title}
            </h3>
            {w.summary && (
              <p className="mb-3 line-clamp-2 text-sm text-gray-600">{w.summary}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {w.views}
              </span>
              {w.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
