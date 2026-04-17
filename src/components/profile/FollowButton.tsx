'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';

interface Props {
  userId: string;
  initialFollowersCount?: number;
}

/**
 * Follow / Unfollow button. Optimistically updates the visible follower
 * count so the click feels instant, and falls back to the server truth
 * on error.
 */
export default function FollowButton({ userId, initialFollowersCount = 0 }: Props) {
  const { data: session, status } = useSession();
  const [following, setFollowing] = useState<boolean | null>(null);
  const [count, setCount] = useState(initialFollowersCount);
  const [pending, setPending] = useState(false);

  const isOwnProfile = session?.user?.id === userId;

  useEffect(() => {
    if (!session?.user?.id || isOwnProfile) {
      setFollowing(false);
      return;
    }
    let cancelled = false;
    fetch(`/api/follow?followeeId=${encodeURIComponent(userId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setFollowing(Boolean(d.isFollowing));
      })
      .catch(() => !cancelled && setFollowing(false));
    return () => {
      cancelled = true;
    };
  }, [userId, session?.user?.id, isOwnProfile]);

  if (isOwnProfile) return null;

  const toggle = async () => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }
    if (following === null || pending) return;
    setPending(true);
    const next = !following;
    // optimistic
    setFollowing(next);
    setCount((c) => c + (next ? 1 : -1));
    try {
      const res = await fetch('/api/follow', {
        method: next ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ followeeId: userId }),
      });
      if (!res.ok) throw new Error('Request failed');
    } catch {
      // Roll back optimistic update.
      setFollowing(!next);
      setCount((c) => c + (next ? -1 : 1));
    } finally {
      setPending(false);
    }
  };

  const label = following ? 'Following' : 'Follow';
  const Icon = following ? UserCheck : UserPlus;

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending || following === null}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
        following
          ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      <span>{label}</span>
      <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs">
        {count.toLocaleString()}
      </span>
    </button>
  );
}
