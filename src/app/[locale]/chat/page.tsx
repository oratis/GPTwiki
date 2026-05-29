import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import ChatInterface from '@/components/chat/ChatInterface';

export const metadata = {
  title: 'New Conversation',
};

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return <ChatInterface />;
}
