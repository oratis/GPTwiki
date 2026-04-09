'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, BookOpen, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import type { UserProfile } from '@/types';

function getRankColor(rank: number): string | undefined {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  return undefined;
}

export default function LeaderboardSection() {
  const { t } = useI18n();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        setUsers(data.users ?? []);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-900">{t('leaderboard.title')}</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => {
            const rank = index + 1;
            const rankColor = getRankColor(rank);

            return (
              <li key={user.id}>
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
                >
                  <span
                    className="w-6 text-center text-sm font-bold"
                    style={rankColor ? { color: rankColor } : undefined}
                  >
                    {rank}
                  </span>

                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                      {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                  )}

                  <span className="flex-1 truncate text-sm font-medium text-gray-800">
                    {user.name}
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    <BookOpen className="h-3 w-3" />
                    {user.wikisCount ?? 0}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
