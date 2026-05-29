import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata = {
  title: 'New Conversation',
};

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  return <ChatInterface />;
}
