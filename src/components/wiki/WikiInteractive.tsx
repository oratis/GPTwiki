'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MessageSquare, MessageCirclePlus } from 'lucide-react';
import WikiContinueChat from './WikiContinueChat';
import MessageBubble from '@/components/chat/MessageBubble';
import { useI18n } from '@/lib/i18n/context';
import type { Wiki } from '@/types';

interface Props {
  wiki: Wiki;
}

/**
 * Interactive island for the wiki detail page.
 * Wraps the conversation toggle and continue-chat flow so the rest of the
 * page can render as a server component (enables ISR + SEO).
 */
export default function WikiInteractive({ wiki }: Props) {
  const { t } = useI18n();
  const { data: session } = useSession();
  const router = useRouter();
  const [showConversation, setShowConversation] = useState(false);
  const [showContinueChat, setShowContinueChat] = useState(false);

  const isAuthor = session?.user?.id === wiki.authorId;

  const handleWikiUpdated = () => {
    setShowContinueChat(false);
    // Invalidate server-rendered page so the updated content is fetched
    router.refresh();
  };

  if (!wiki.conversation?.length) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowConversation(!showConversation)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <MessageSquare className="h-4 w-4" />
          {showConversation ? t('wiki.hideConversation') : t('wiki.showConversation')} (
          {wiki.conversation.length} {t('wiki.messages')})
        </button>

        {session && showConversation && !showContinueChat && (
          <button
            onClick={() => setShowContinueChat(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <MessageCirclePlus className="h-4 w-4" />
            {t('wiki.continueAsk')}
          </button>
        )}
      </div>

      {showConversation && (
        <div className="mt-4 space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
          {wiki.conversation.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {showContinueChat && (
            <WikiContinueChat
              wikiId={wiki.id}
              initialConversation={wiki.conversation}
              aiModel={wiki.aiModel}
              isAuthor={isAuthor}
              onWikiUpdated={handleWikiUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
}
