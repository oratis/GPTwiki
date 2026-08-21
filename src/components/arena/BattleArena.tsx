'use client';

import { useCallback, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSession } from 'next-auth/react';
import Link from '@/components/LocaleLink';
import { AlertCircle, Info, Loader2, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { getModelDisplayName } from '@/lib/models';
import type { AIModel } from '@/types';
import type { ArenaOutcome, ArenaVoteFlag } from '@/types/arena';

type Phase = 'idle' | 'streaming' | 'ready' | 'voted';

interface Reveal {
  modelA: AIModel;
  modelB: AIModel;
  outcome: ArenaOutcome;
  counted: boolean;
  flags: ArenaVoteFlag[];
}

/**
 * The battle surface: one prompt, two anonymous answers, one vote.
 *
 * Model names are not in the client's hands until the vote has been recorded —
 * the reveal arrives in the vote response, not with the battle. Sending them
 * earlier and merely hiding them in the UI would put the answer in devtools and
 * quietly void the anonymity the ratings rest on.
 */
export default function BattleArena() {
  const { t, locale } = useI18n();
  const { status } = useSession();

  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [battleId, setBattleId] = useState<string | null>(null);
  const [answers, setAnswers] = useState({ a: '', b: '' });
  const [failedSlots, setFailedSlots] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [publishState, setPublishState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [publishedWikiId, setPublishedWikiId] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startBattle = useCallback(async () => {
    const question = prompt.trim();
    if (question.length < 3 || phase === 'streaming') return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setPhase('streaming');
    setAnswers({ a: '', b: '' });
    setFailedSlots([]);
    setReveal(null);
    setError(null);
    setBattleId(null);
    setPublishState('idle');
    setPublishedWikiId(null);

    try {
      const res = await fetch('/api/arena/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question, locale }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        setError(detail?.message || t('arena.battle.startFailed'));
        setPhase('idle');
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');
      const decoder = new TextDecoder();

      // SSE frames are separated by a blank line and can be split across reads,
      // so hold the tail until a full frame has arrived.
      let buffer = '';
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let boundary = buffer.indexOf('\n\n');
        while (boundary !== -1) {
          const frame = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          boundary = buffer.indexOf('\n\n');

          const eventLine = frame.split('\n').find((l) => l.startsWith('event: '));
          const dataLine = frame.split('\n').find((l) => l.startsWith('data: '));
          if (!eventLine || !dataLine) continue;

          const event = eventLine.slice(7).trim();
          let data: Record<string, unknown>;
          try {
            data = JSON.parse(dataLine.slice(6));
          } catch {
            continue;
          }

          if (event === 'meta') {
            setBattleId(String(data.battleId));
          } else if (event === 'chunk') {
            const slot = data.slot === 'b' ? 'b' : 'a';
            const text = String(data.text ?? '');
            setAnswers((prev) => ({ ...prev, [slot]: prev[slot] + text }));
          } else if (event === 'fail') {
            setFailedSlots((prev) => [...prev, String(data.slot)]);
          } else if (event === 'done') {
            setPhase(data.ok ? 'ready' : 'idle');
            if (!data.ok) setError(t('arena.battle.incomplete'));
            finished = true;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      console.error('Arena battle error:', err);
      setError(t('arena.battle.startFailed'));
      setPhase('idle');
    }
  }, [prompt, phase, locale, t]);

  const castVote = useCallback(
    async (outcome: ArenaOutcome) => {
      if (!battleId || phase !== 'ready') return;
      try {
        const res = await fetch('/api/arena/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ battleId, outcome }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || t('arena.battle.voteFailed'));
          return;
        }
        setReveal(data as Reveal);
        setPhase('voted');
      } catch (err) {
        console.error('Arena vote error:', err);
        setError(t('arena.battle.voteFailed'));
      }
    },
    [battleId, phase, t]
  );

  const publishWinner = useCallback(async () => {
    if (!battleId || publishState !== 'idle') return;
    setPublishState('busy');
    try {
      const res = await fetch('/api/arena/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ battleId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data?.error === 'NO_WINNER'
            ? t('arena.battle.publishNoWinner')
            : data?.message || t('arena.battle.publishFailed')
        );
        setPublishState('idle');
        return;
      }
      setPublishedWikiId(data.wikiId as string);
      setPublishState('done');
    } catch (err) {
      console.error('Arena publish error:', err);
      setError(t('arena.battle.publishFailed'));
      setPublishState('idle');
    }
  }, [battleId, publishState, t]);

  const streaming = phase === 'streaming';
  const votable = phase === 'ready';
  const signedOut = status === 'unauthenticated';

  return (
    <div>
      {/*
        A notice, not a gate. Signed-out readers can battle and vote; what they
        cannot do is move the leaderboard, so that is the one thing said up
        front — before they spend time on an answer, not after they vote.
      */}
      {signedOut && (
        <div className="mb-4 flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
          <p className="text-xs text-blue-900">
            {t('arena.battle.anonNotice')}{' '}
            <Link href="/login" className="font-medium underline hover:no-underline">
              {t('header.signIn')}
            </Link>
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void startBattle();
            }
          }}
          disabled={streaming}
          placeholder={t('arena.battle.placeholder')}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none disabled:bg-gray-50"
        />
        <button
          onClick={() => void startBattle()}
          disabled={streaming || prompt.trim().length < 3}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {streaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {t('arena.battle.start')}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-sm text-red-900">{error}</p>
        </div>
      )}

      {(streaming || answers.a || answers.b) && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(['a', 'b'] as const).map((slot) => (
            <AnswerColumn
              key={slot}
              slot={slot}
              text={answers[slot]}
              failed={failedSlots.includes(slot)}
              streaming={streaming}
              revealedModel={reveal ? (slot === 'a' ? reveal.modelA : reveal.modelB) : null}
              won={
                reveal
                  ? reveal.outcome === slot
                  : false
              }
              anonLabel={t(slot === 'a' ? 'arena.battle.modelA' : 'arena.battle.modelB')}
              streamingLabel={t('arena.battle.thinking')}
              failedLabel={t('arena.battle.slotFailed')}
            />
          ))}
        </div>
      )}

      {votable && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">{t('arena.battle.votePrompt')}</p>
          <div className="flex flex-wrap gap-2">
            <VoteButton onClick={() => void castVote('a')} label={t('arena.battle.voteA')} />
            <VoteButton onClick={() => void castVote('b')} label={t('arena.battle.voteB')} />
            <VoteButton onClick={() => void castVote('tie')} label={t('arena.battle.voteTie')} muted />
            <VoteButton
              onClick={() => void castVote('both_bad')}
              label={t('arena.battle.voteBothBad')}
              muted
            />
          </div>
        </div>
      )}

      {reveal && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-900">
            {t('arena.battle.revealed', {
              modelA: getModelDisplayName(reveal.modelA),
              modelB: getModelDisplayName(reveal.modelB),
            })}
          </p>
          <p className={`mt-2 flex gap-2 text-xs ${reveal.counted ? 'text-gray-500' : 'text-amber-700'}`}>
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
            {reveal.counted
              ? t('arena.battle.voteCounted')
              : t('arena.battle.voteNotCounted', { flags: reveal.flags.join(', ') })}
          </p>
          {/* Publish is offered only when a single answer actually won — a tie
              or "both bad" has no winner, and the API rejects it anyway. */}
          {(reveal.outcome === 'a' || reveal.outcome === 'b') && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              {publishState === 'done' && publishedWikiId ? (
                <Link
                  href={`/wiki/${publishedWikiId}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {t('arena.battle.published')} →
                </Link>
              ) : signedOut ? (
                /* Publishing needs a byline, so this is the one step that still
                   requires an account. The vote already cast stays valid — the
                   API accepts the anonymous cookie as proof of it — so signing
                   in here continues the flow rather than restarting it. */
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {t('arena.battle.publishSignIn')}
                </Link>
              ) : (
                <button
                  onClick={() => void publishWinner()}
                  disabled={publishState === 'busy'}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {publishState === 'busy' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {publishState === 'busy'
                    ? t('arena.battle.publishing')
                    : t('arena.battle.publish')}
                </button>
              )}
              <p className="mt-2 max-w-lg text-xs text-gray-500">
                {t('arena.battle.publishHint')}
              </p>
            </div>
          )}

          {battleId && (
            <Link
              href={`/arena/b/${battleId}`}
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {t('arena.battle.permalink')} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function AnswerColumn({
  slot,
  text,
  failed,
  streaming,
  revealedModel,
  won,
  anonLabel,
  streamingLabel,
  failedLabel,
}: {
  slot: 'a' | 'b';
  text: string;
  failed: boolean;
  streaming: boolean;
  revealedModel: AIModel | null;
  won: boolean;
  anonLabel: string;
  streamingLabel: string;
  failedLabel: string;
}) {
  return (
    <div
      className={`rounded-lg border bg-white p-4 ${
        won ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {revealedModel ? getModelDisplayName(revealedModel) : anonLabel}
        </span>
        {streaming && !text && !failed && (
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            {streamingLabel}
          </span>
        )}
      </div>

      {failed ? (
        <p className="text-sm text-red-700">{failedLabel}</p>
      ) : (
        <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-pre:bg-gray-800 prose-pre:text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      )}
      <span className="sr-only">{slot}</span>
    </div>
  );
}

function VoteButton({
  onClick,
  label,
  muted,
}: {
  onClick: () => void;
  label: string;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        muted
          ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
      }`}
    >
      {label}
    </button>
  );
}
