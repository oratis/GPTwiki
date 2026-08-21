import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EyeOff } from 'lucide-react';
import ArenaNav from '@/components/arena/ArenaNav';
import { countVotes, getBattle } from '@/lib/arena/store';
import { hasLocale, getTranslations } from '@/lib/i18n/server';
import { getModelDisplayName } from '@/lib/models';
import type { AIModel } from '@/types';

// See note in [locale]/page.tsx — the Docker build has no Firestore creds.
export const dynamic = 'force-dynamic';

/**
 * A single battle, shareable by link.
 *
 * `noindex, nofollow`, and absent from every sitemap shard — deliberately, and
 * this is the one rule in the arena that must not be relaxed. A page holding two
 * AI answers to one prompt is thin, near-duplicate, and producible without
 * limit, which is exactly the "scaled content abuse" shape
 * `docs/auto-content-cron-plan.md` §7 already blocked Phase 2 over. The risk is
 * not to this page; it is to the 100k+ existing articles that share the domain.
 * Content earns indexing by going through the normal wiki publish path.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = hasLocale(locale) ? getTranslations(locale)('arena.permalink.title') : 'Battle';
  return {
    title,
    robots: { index: false, follow: false, nocache: true },
    // No canonical and no hreflang alternates: this page is not a destination
    // search engines should hold an address for.
    alternates: {},
  };
}

export default async function ArenaBattlePermalink({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);

  const battle = await getBattle(id).catch(() => null);
  if (!battle) notFound();

  // Identities stay hidden until a vote exists, so the permalink cannot be used
  // as a side channel to look up who is who before voting.
  const revealed = (await countVotes(id).catch(() => 0)) > 0;

  const columns: Array<{ slot: 'a' | 'b'; text: string; model?: string }> = [
    { slot: 'a', text: battle.answerA, model: revealed ? battle.modelA : undefined },
    { slot: 'b', text: battle.answerB, model: revealed ? battle.modelB : undefined },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="battle" />

        <h2 className="text-xl font-semibold text-gray-900">{battle.prompt}</h2>
        <p className="mt-1 mb-6 flex items-center gap-2 text-xs text-gray-400">
          <EyeOff className="h-3.5 w-3.5" />
          {t('arena.permalink.noindexNote')}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {columns.map((col) => (
            <div key={col.slot} className="rounded-lg border border-gray-200 bg-white p-4">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                {col.model
                  ? getModelDisplayName(col.model as AIModel)
                  : t(col.slot === 'a' ? 'arena.battle.modelA' : 'arena.battle.modelB')}
              </span>
              <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-pre:bg-gray-800 prose-pre:text-gray-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{col.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {!revealed && (
          <p className="mt-4 text-xs text-gray-500">{t('arena.permalink.notRevealed')}</p>
        )}
      </div>
    </div>
  );
}
