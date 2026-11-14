'use client';

import { trackProductEvent } from '@/lib/product-events';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSession } from 'next-auth/react';
import Link from '@/components/LocaleLink';
import { AlertCircle, Info, Loader2, Send, Square, RotateCcw } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { getModelDisplayName } from '@/lib/models';
import { readBattleStream } from '@/lib/arena/read-stream';
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
  const { status, data: session } = useSession();

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
  const voteLock = useRef(false);
  const [voting, setVoting] = useState(false);
  const [accessError, setAccessError] = useState(false);
  useEffect(() => () => abortRef.current?.abort(), []);


  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('b');
    if (!id || !/^[A-Za-z0-9_-]{1,128}$/.test(id)) return;
    const controller = new AbortController();
    abortRef.current = controller;
    async function restore() {
      try {
        const response = await fetch(`/api/arena/battle/${id}`, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(20000)]), cache: 'no-store' });
        const data = await response.json();
        if (!response.ok || !data.isCreator) throw new Error('Not your battle');
        setBattleId(id);
        setPrompt(data.prompt);
        setAnswers({ a: data.answerA, b: data.answerB });
        setPhase(data.vote ? 'voted' : 'ready');
        if (data.vote) setReveal({ ...data.vote, modelA: data.modelA, modelB: data.modelB });
        if (data.publishedWikiId) { setPublishedWikiId(data.publishedWikiId); setPublishState('done'); }
      } catch {
        if (!controller.signal.aborted) setError(t('arena.battle.restoreFailed'));
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
      }
    }
    void restore();
    return () => controller.abort();
  }, [t]);

  const startBattle = useCallback(async () => {
    const question = prompt.trim();
    if (question.length < 3 || question.length > 2000 || abortRef.current || voteLock.current || publishState === 'busy') return;

    const controller = new AbortController();
    abortRef.current = controller;

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('b');
    window.history.replaceState(null, '', cleanUrl);
    setPhase('streaming');
    setAccessError(false);
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
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(135000)]),
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        const keys: Record<string, string> = {
          ARENA_ANON_DISABLED: 'arena.battle.signInRequired',
          ARENA_NEEDS_TWO_MODELS: 'arena.battle.needsKeys',
          NOT_ENOUGH_MODELS: 'arena.battle.needsKeys',
          QUOTA_EXHAUSTED: 'arena.battle.quota',
        };
        setAccessError(res.status === 403);
        setError(t(res.status === 429 ? 'arena.battle.rateLimit' : keys[detail?.error] || 'arena.battle.startFailed'));
        setPhase('idle');
        return;
      }

      if (!res.body) throw new Error('No response body');
      let currentBattleId = '';
      await readBattleStream(res.body, ({ event, data }) => {
        if (event === 'meta') { currentBattleId = data.battleId; setBattleId(data.battleId); }
        else if (event === 'chunk') setAnswers((previous) => ({ ...previous, [data.slot]: previous[data.slot] + data.text }));
        else if (event === 'fail') setFailedSlots((previous) => [...previous, data.slot]);
        else if (event === 'done') {
          if (data.ok) { const url = new URL(window.location.href); url.searchParams.set('b', currentBattleId); window.history.replaceState(null, '', url); }
          setPhase(data.ok ? 'ready' : 'idle');
          if (!data.ok) setError(t('arena.battle.incomplete'));
        }
      });
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      console.error('Arena battle error:', err);
      setError(t('arena.battle.incomplete'));
      setPhase('idle');
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [prompt, publishState, locale, t]);

  const castVote = useCallback(
    async (outcome: ArenaOutcome) => {
      if (!battleId || phase !== 'ready' || voteLock.current) return;
      voteLock.current = true;
      setVoting(true);
      setError(null);
      try {
        const res = await fetch('/api/arena/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ battleId, outcome }),
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(t('arena.battle.voteFailed'));
          return;
        }
        trackProductEvent('battle_voted', 'arena');
        setReveal(data as Reveal);
        setPhase('voted');
      } catch (err) {
        console.error('Arena vote error:', err);
        setError(t('arena.battle.voteFailed'));
      } finally {
        voteLock.current = false;
        setVoting(false);
      }
    },
    [battleId, phase, t]
  );

  const publishWinner = useCallback(async () => {
    if (!battleId || publishState !== 'idle') return;
    setPublishState('busy');
    setError(null);
    try {
      const res = await fetch('/api/arena/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ battleId }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data?.error === 'NO_WINNER'
            ? t('arena.battle.publishNoWinner')
            : t('arena.battle.publishFailed')
        );
        setPublishState('idle');
        return;
      }
      if (!data.alreadyPublished) trackProductEvent('wiki_published', 'arena');
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
    <div className="min-w-0">
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
            <Link href={`/login?callbackUrl=${encodeURIComponent(`/${locale}/arena/battle${battleId ? `?b=${battleId}` : ''}`)}`} className="font-medium underline hover:no-underline">
              {t('header.signIn')}
            </Link>
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor="arena-prompt" className="mb-2 block text-sm font-semibold text-gray-900">{t('arena.battle.promptLabel')}</label>
        <textarea
          id="arena-prompt" value={prompt} rows={3} maxLength={2000}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey) && !event.nativeEvent.isComposing) {
              event.preventDefault(); void startBattle();
            }
          }}
          disabled={streaming || voting || publishState === 'busy'}
          placeholder={t('arena.battle.placeholder')}
          className="w-full resize-y rounded-xl border border-gray-200 px-3 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-gray-500">{prompt.length.toLocaleString(locale)} / 2,000 · {t('arena.battle.shortcut')}</span>
          {streaming ? (
            <button onClick={() => { abortRef.current?.abort(); setPhase('idle'); setError(t('arena.battle.stopped')); }} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700">
              <Square className="h-4 w-4" />{t('arena.battle.stop')}
            </button>
          ) : (
            <button onClick={() => void startBattle()} disabled={voting || publishState === 'busy' || status === 'loading' || prompt.trim().length < 3}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
              {phase === 'voted' ? <RotateCcw className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {t(phase === 'voted' ? 'arena.battle.again' : 'arena.battle.start')}
            </button>
          )}
        </div>
        {phase === 'idle' && !answers.a && !answers.b && (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            {[1, 2, 3].map((number) => <button key={number} onClick={() => setPrompt(t(`arena.battle.example${number}`))} className="max-w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-start text-xs leading-5 text-slate-600 hover:border-blue-300 hover:text-blue-700">{t(`arena.battle.example${number}`)}</button>)}
          </div>
        )}
      </div>
      {streaming && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-blue-700"><Loader2 className="h-4 w-4 animate-spin" />{t('arena.battle.generating')}</p>}

      {error && (
        <div role="alert" className="mt-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div className="text-sm text-red-900"><p>{error}</p>{accessError && <Link href={signedOut ? '/login?callbackUrl=' + encodeURIComponent(`/${locale}/arena/battle`) : `/profile/${session?.user?.id}`} className="mt-2 inline-block font-medium underline">{t(signedOut ? 'header.signIn' : 'arena.battle.manageKeys')}</Link>}</div>
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
            <VoteButton disabled={voting} onClick={() => void castVote('a')} label={t('arena.battle.voteA')} />
            <VoteButton disabled={voting} onClick={() => void castVote('b')} label={t('arena.battle.voteB')} />
            <VoteButton disabled={voting} onClick={() => void castVote('tie')} label={t('arena.battle.voteTie')} muted />
            <VoteButton
              disabled={voting}
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
              : t('arena.battle.voteNotCounted', { flags: reveal.flags.map((flag) => t(`arena.battle.flag.${flag}`)).join(', ') })}
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
                  href={`/login?callbackUrl=${encodeURIComponent(`/${locale}/arena/battle${battleId ? `?b=${battleId}` : ''}`)}`}
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
      className={`min-w-0 overflow-hidden rounded-2xl border bg-white p-4 sm:p-5 ${
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
        <div className="prose prose-sm max-w-none break-words [overflow-wrap:anywhere] prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto prose-p:my-1.5 prose-headings:my-2 prose-pre:bg-gray-800 prose-pre:text-gray-100">
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
  disabled,
}: {
  onClick: () => void;
  label: string;
  muted?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-wait disabled:opacity-50 ${
        muted
          ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
      }`}
    >
      {label}
    </button>
  );
}
