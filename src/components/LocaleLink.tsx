'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { localeHref } from '@/lib/i18n/links';

/**
 * Drop-in replacement for next/link that auto-prefixes `href` with the
 * current locale. Use in client components to keep navigation within the
 * user's selected language.
 */
type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function LocaleLink({ href, ...rest }: Props) {
  const { locale } = useI18n();
  return <Link href={localeHref(locale, href)} {...rest} />;
}
