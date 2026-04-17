'use client';

import Image from 'next/image';
import Link from '@/components/LocaleLink';
import { useSession, signIn, signOut } from 'next-auth/react';
import { BookOpen, MessageSquarePlus, LogIn, LogOut, User, Folder, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { data: session } = useSession();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">{t('header.brandName')}</span>
        </Link>

        <nav className="flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href="/wiki"
            className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors sm:block"
          >
            {t('header.browseWiki')}
          </Link>

          <Link
            href="/browse"
            className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors sm:block"
          >
            <span className="flex items-center gap-1">
              <Folder className="h-3.5 w-3.5" />
              {t('header.categories')}
            </span>
          </Link>

          <Link
            href="/donate"
            className="hidden text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors sm:block"
          >
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {t('header.donate')}
            </span>
          </Link>

          {session ? (
            <>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <MessageSquarePlus className="h-4 w-4" />
                <span className="hidden sm:inline">{t('header.newWiki')}</span>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href={`/profile/${session.user?.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-blue-300 transition-all"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="hidden text-sm font-medium text-gray-700 sm:block">
                    {session.user?.name}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title={t('header.signOut')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              {t('header.signIn')}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
