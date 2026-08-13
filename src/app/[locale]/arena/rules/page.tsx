import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Languages } from 'lucide-react';
import ArenaNav from '@/components/arena/ArenaNav';
import { arenaMetadata } from '@/lib/arena/metadata';
import { pickRulesContent, isRulesFallback } from '@/lib/arena/rules-content';
import { hasLocale, supportedLocales, getTranslations, type Locale } from '@/lib/i18n/server';

/** Fully static — the prose ships with the bundle and needs no data. */
export function generateStaticParams(): Array<{ locale: Locale }> {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const content = pickRulesContent(locale);
  return arenaMetadata({
    locale,
    path: '/arena/rules',
    title: content.title,
    description: content.scope,
  });
}

export default async function ArenaRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getTranslations(locale);
  const content = pickRulesContent(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <ArenaNav locale={locale} active="rules" />

        <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>

        <p className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-700">
          {content.scope}
        </p>

        {isRulesFallback(locale) && (
          <p className="mt-3 flex gap-2 text-xs text-gray-500">
            <Languages className="mt-0.5 h-4 w-4 flex-shrink-0" />
            {t('arena.rules.englishFallback')}
          </p>
        )}

        <div className="mt-8 space-y-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mb-3 text-sm leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-l-2 border-gray-200 pl-4 text-sm leading-relaxed text-gray-600"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-400">
          {content.updated}
        </p>
      </div>
    </div>
  );
}
