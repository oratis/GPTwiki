import { createHash } from 'crypto';
import type { ArenaVoteFlag } from '@/types/arena';

/**
 * Which votes count, and why.
 *
 * Pure functions over already-loaded data, so every exclusion rule is testable
 * without Firestore. The rules mirror the filters arena.ai added over 2025 (see
 * `docs/arena-research.md` §2.5) — their dedup pass alone removed about 10% of
 * votes and their identity-leak pass under 4%, which is the scale of noise to
 * expect.
 *
 * A deliberate omission: there is no filter that judges *which* model a voter
 * prefers. A rule like "flag anyone voting one way 98% of the time" punishes an
 * honest voter whenever one model genuinely is much better, and cannot tell that
 * case apart from abuse. Everything here keys on behaviour that is implausible
 * for a human reading two answers, not on the answer they chose.
 */

/** A voter's repeat of the same question inside this window carries no weight. */
export const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

/** Voting faster than this after both answers finished is not reading them. */
export const MIN_READ_MS = 3_000;

/** No human sustains this many battles an hour; past it, the votes are noise. */
export const MAX_VOTES_PER_HOUR = 60;

/** Volume below which the rate rule stays silent, to avoid punishing bursts. */
const RATE_RULE_MIN_VOTES = 10;

/**
 * Collapse a prompt to its dedup identity: case-folded, whitespace-normalised,
 * trailing punctuation dropped. Catches "What is Rust?" vs "what is rust"
 * without needing to catch genuine rephrasings.
 */
export function normalizePrompt(prompt: string): string {
  return prompt
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[\s.!?。！？，,;；:：]+$/u, '');
}

/** Stable hash of the normalised prompt. Not a secret — just a dedup key. */
export function hashPrompt(prompt: string): string {
  return createHash('sha256').update(normalizePrompt(prompt)).digest('hex').slice(0, 32);
}

/**
 * First-person self-identification patterns only.
 *
 * Third-person mentions are explicitly not matched: this site is an
 * encyclopedia, so "Claude is a family of models developed by Anthropic" is
 * ordinary article text and must not void a battle. What breaks anonymity is an
 * answer saying who *it* is.
 */
const IDENTITY_LEAK_PATTERNS: RegExp[] = [
  /\bI(?:'m|’m| am)\s+(?:Claude|ChatGPT|GPT-?4o?|Gemini|Bard)\b/i,
  /\bmy name is\s+(?:Claude|ChatGPT|GPT-?4o?|Gemini|Bard)\b/i,
  /\bI\s+was\s+(?:built|made|created|developed|trained)\s+by\s+(?:Anthropic|OpenAI|Google)\b/i,
  /\bI(?:'m|’m| am)\s+an?\s+(?:AI\s+|language\s+)*(?:model|assistant)\s+(?:built|made|created|developed|trained)\s+by\s+(?:Anthropic|OpenAI|Google)\b/i,
  /\bAs\s+(?:Claude|ChatGPT|Gemini|Bard)\s*[,，]/i,
  /我(?:是|叫)\s*(?:Claude|ChatGPT|GPT-?4o?|Gemini|Bard)/i,
  /我(?:是|由)\s*(?:Anthropic|OpenAI|Google|谷歌)\s*(?:开发|训练|创建|研发)/i,
];

/** True when an answer named itself and broke the anonymity the vote needs. */
export function detectIdentityLeak(text: string): boolean {
  return IDENTITY_LEAK_PATTERNS.some((pattern) => pattern.test(text));
}

export interface VoteContext {
  /** Only signed-in voters produce a counted vote. */
  signedIn: boolean;
  /** Hash of this battle's prompt. */
  promptHash: string;
  /** Prompt hashes this voter already used inside `DEDUP_WINDOW_MS`. */
  recentPromptHashes: readonly string[];
  /** When both answers finished rendering. */
  answersReadyAt: number;
  /** When the vote arrived. */
  votedAt: number;
  answerA: string;
  answerB: string;
}

export interface VoteEvaluation {
  /** 1 counts toward rankings; 0 is recorded only. Nothing in between today. */
  weight: 0 | 1;
  flags: ArenaVoteFlag[];
}

/**
 * Decide whether a vote counts. Flags accumulate — a vote can be excluded for
 * several reasons at once, and storing all of them keeps the exclusion
 * auditable rather than just "dropped".
 */
export function evaluateVote(ctx: VoteContext): VoteEvaluation {
  const flags: ArenaVoteFlag[] = [];

  if (!ctx.signedIn) flags.push('anonymous');
  if (ctx.recentPromptHashes.includes(ctx.promptHash)) flags.push('duplicate');
  if (detectIdentityLeak(ctx.answerA) || detectIdentityLeak(ctx.answerB)) {
    flags.push('identity_leak');
  }
  if (ctx.votedAt - ctx.answersReadyAt < MIN_READ_MS) flags.push('anomalous');

  return { weight: flags.length === 0 ? 1 : 0, flags };
}

/**
 * Voters whose sustained rate is not humanly achievable, found by sliding a
 * one-hour window over each voter's timestamps.
 *
 * This runs in the batch job rather than at vote time because it needs a
 * voter's whole history — the same reason arena.ai's anomaly filter is a
 * pipeline stage and not a request-time check.
 */
export function flagAnomalousVoters(
  votes: readonly { voterId: string; createdAt: number }[]
): Set<string> {
  const byVoter = new Map<string, number[]>();
  for (const vote of votes) {
    const list = byVoter.get(vote.voterId);
    if (list) list.push(vote.createdAt);
    else byVoter.set(vote.voterId, [vote.createdAt]);
  }

  const flagged = new Set<string>();
  for (const [voterId, times] of byVoter) {
    if (times.length < RATE_RULE_MIN_VOTES) continue;
    times.sort((a, b) => a - b);
    // times[i] and times[i + MAX] bracket MAX_VOTES_PER_HOUR + 1 votes; if that
    // span is under an hour the voter exceeded the ceiling somewhere.
    for (let i = 0; i + MAX_VOTES_PER_HOUR < times.length; i++) {
      if (times[i + MAX_VOTES_PER_HOUR] - times[i] < 60 * 60 * 1000) {
        flagged.add(voterId);
        break;
      }
    }
  }
  return flagged;
}
