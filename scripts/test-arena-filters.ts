/**
 * Tests for battle pairing and vote filtering.
 *
 * Same zero-dependency harness as `test-arena-scoring.ts`: `node:assert` plus
 * the existing `tsx` devDependency. Run via `npm test`.
 *
 * The cases that matter most here are the *negatives* — a filter that voids
 * honest battles is worse than no filter, because it silently shrinks the
 * sample the ratings depend on while looking like it is working.
 */
import assert from 'node:assert/strict';
import { ARENA_CATEGORIES, categorizePrompt } from '../src/lib/arena/categories';
import { pickModelPair } from '../src/lib/arena/pairing';
import {
  DEDUP_WINDOW_MS,
  MAX_VOTES_PER_HOUR,
  MIN_READ_MS,
  detectIdentityLeak,
  evaluateVote,
  flagAnomalousVoters,
  hashPrompt,
  normalizePrompt,
  type VoteContext,
} from '../src/lib/arena/vote-filters';
import type { AIModel } from '../src/types';

let failures = 0;
let run = 0;

function test(name: string, fn: () => void): void {
  run++;
  try {
    fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}`);
    console.error(`      ${(err as Error).message.split('\n').join('\n      ')}`);
  }
}

/** Deterministic stand-in for Math.random, cycling through fixed draws. */
function sequence(values: number[]): () => number {
  let i = 0;
  return () => values[i++ % values.length];
}

const ALL: AIModel[] = ['claude', 'gpt', 'gemini'];

console.log('\narena pairing');

test('fewer than two models cannot make a battle', () => {
  assert.equal(pickModelPair([]), null);
  assert.equal(pickModelPair(['claude']), null);
  assert.equal(pickModelPair(['claude', 'claude']), null, 'duplicates are not two models');
});

test('a pair is always two distinct models drawn from the pool', () => {
  for (let seed = 0; seed < 60; seed++) {
    const random = sequence([(seed % 7) / 7, (seed % 5) / 5, (seed % 3) / 3]);
    const pair = pickModelPair(ALL, random);
    assert.ok(pair, 'expected a pair');
    assert.notEqual(pair.modelA, pair.modelB);
    assert.ok(ALL.includes(pair.modelA) && ALL.includes(pair.modelB));
  }
});

test('slot assignment flips on the coin, so neither model is always first', () => {
  // Same two draws for the models, opposite draws for the coin.
  const first = pickModelPair(ALL, sequence([0, 0, 0.1]));
  const second = pickModelPair(ALL, sequence([0, 0, 0.9]));
  assert.ok(first && second);
  assert.equal(first.modelA, second.modelB, 'the coin must swap the slots');
  assert.equal(first.modelB, second.modelA);
});

test('a two-model pool still yields both slot orders', () => {
  const pool: AIModel[] = ['claude', 'gpt'];
  const orders = new Set<string>();
  for (const coin of [0.1, 0.9]) {
    const pair = pickModelPair(pool, sequence([0, 0, coin]));
    orders.add(`${pair!.modelA}>${pair!.modelB}`);
  }
  assert.equal(orders.size, 2, `expected both orders, got ${[...orders].join(', ')}`);
});

test('a random draw of exactly 1 does not index past the pool', () => {
  const pair = pickModelPair(ALL, () => 1);
  assert.ok(pair, 'random() === 1 must not produce undefined models');
  assert.notEqual(pair.modelA, pair.modelB);
});

console.log('\narena prompt normalisation');

test('normalisation folds case, whitespace and trailing punctuation', () => {
  assert.equal(normalizePrompt('  What   is  Rust? '), 'what is rust');
  assert.equal(normalizePrompt('What is Rust'), 'what is rust');
  assert.equal(normalizePrompt('什么是 Rust？'), '什么是 rust');
});

test('the same question in different shapes hashes identically', () => {
  assert.equal(hashPrompt('What is Rust?'), hashPrompt('what   is rust'));
  assert.notEqual(hashPrompt('What is Rust?'), hashPrompt('What is Go?'));
});

console.log('\narena identity-leak detection');

test('first-person self-identification is caught', () => {
  const leaks = [
    "I'm Claude, an AI assistant made by Anthropic.",
    'I am ChatGPT and I can help with that.',
    'My name is Gemini.',
    'I was trained by OpenAI on a large corpus.',
    'I am a language model developed by Google.',
    'As Claude, I would approach this differently.',
    '我是 Claude，很高兴帮你。',
    '我由 OpenAI 训练而成。',
  ];
  for (const text of leaks) {
    assert.ok(detectIdentityLeak(text), `should flag: ${text}`);
  }
});

test('third-person mentions of the same names are NOT flagged', () => {
  // This is an encyclopedia — these sentences are ordinary article text, and
  // voiding battles over them would quietly destroy the sample.
  const clean = [
    'Claude is a family of large language models developed by Anthropic.',
    'Gemini is Google\'s multimodal model line, announced in 2023.',
    'In astronomy, Gemini is a constellation of the zodiac.',
    'ChatGPT was released in November 2022 and reached a million users quickly.',
    'The differences between GPT-4o and Gemini are mostly in latency.',
    'Anthropic, OpenAI and Google all publish model cards.',
    'Claude 由 Anthropic 开发，是一系列大语言模型。',
    'I am not going to guess who built this software.',
  ];
  for (const text of clean) {
    assert.ok(!detectIdentityLeak(text), `should NOT flag: ${text}`);
  }
});

console.log('\narena vote evaluation');

const baseCtx: VoteContext = {
  signedIn: true,
  promptHash: 'abc',
  recentPromptHashes: [],
  answersReadyAt: 1_000_000,
  votedAt: 1_000_000 + 20_000,
  answerA: 'Rust is a systems programming language.',
  answerB: 'Rust emphasises memory safety without a garbage collector.',
};

test('a clean signed-in vote counts', () => {
  const result = evaluateVote(baseCtx);
  assert.deepEqual(result, { weight: 1, flags: [] });
});

test('an anonymous vote is recorded with zero weight', () => {
  const result = evaluateVote({ ...baseCtx, signedIn: false });
  assert.equal(result.weight, 0);
  assert.deepEqual(result.flags, ['anonymous']);
});

test('a repeat of the same question is deduplicated', () => {
  const result = evaluateVote({ ...baseCtx, recentPromptHashes: ['xyz', 'abc'] });
  assert.equal(result.weight, 0);
  assert.deepEqual(result.flags, ['duplicate']);
});

test('a battle whose answer named itself is voided', () => {
  const result = evaluateVote({ ...baseCtx, answerB: "Sure! I'm Claude, happy to help." });
  assert.equal(result.weight, 0);
  assert.deepEqual(result.flags, ['identity_leak']);
});

test('a vote faster than a human could read is flagged', () => {
  const result = evaluateVote({
    ...baseCtx,
    votedAt: baseCtx.answersReadyAt + MIN_READ_MS - 1,
  });
  assert.equal(result.weight, 0);
  assert.deepEqual(result.flags, ['anomalous']);
});

test('a vote at exactly the reading threshold counts', () => {
  const result = evaluateVote({ ...baseCtx, votedAt: baseCtx.answersReadyAt + MIN_READ_MS });
  assert.equal(result.weight, 1);
});

test('several reasons accumulate rather than short-circuiting', () => {
  const result = evaluateVote({
    ...baseCtx,
    signedIn: false,
    recentPromptHashes: ['abc'],
    answerA: 'I am Gemini.',
    votedAt: baseCtx.answersReadyAt,
  });
  assert.equal(result.weight, 0);
  assert.deepEqual(result.flags, ['anonymous', 'duplicate', 'identity_leak', 'anomalous']);
});

console.log('\narena voter rate filter');

test('a normal voter is not flagged', () => {
  const votes = Array.from({ length: 40 }, (_unused, i) => ({
    voterId: 'human',
    // One vote every five minutes for over three hours.
    createdAt: i * 5 * 60 * 1000,
  }));
  assert.equal(flagAnomalousVoters(votes).size, 0);
});

test('a voter exceeding the hourly ceiling is flagged', () => {
  const votes = Array.from({ length: MAX_VOTES_PER_HOUR + 1 }, (_unused, i) => ({
    voterId: 'bot',
    createdAt: i * 1_000, // one a second
  }));
  assert.deepEqual([...flagAnomalousVoters(votes)], ['bot']);
});

test('a low-volume burst is left alone', () => {
  // Nine votes in nine seconds: fast, but too few to conclude anything, and the
  // per-vote reading-time rule already handles individually rushed votes.
  const votes = Array.from({ length: 9 }, (_unused, i) => ({
    voterId: 'eager',
    createdAt: i * 1_000,
  }));
  assert.equal(flagAnomalousVoters(votes).size, 0);
});

test('one abusive voter does not implicate the others', () => {
  const votes = [
    ...Array.from({ length: MAX_VOTES_PER_HOUR + 1 }, (_unused, i) => ({
      voterId: 'bot',
      createdAt: i * 1_000,
    })),
    ...Array.from({ length: 30 }, (_unused, i) => ({
      voterId: 'human',
      createdAt: i * 10 * 60 * 1000,
    })),
  ];
  assert.deepEqual([...flagAnomalousVoters(votes)], ['bot']);
});

test('the dedup window is a day, as documented on the rules page', () => {
  assert.equal(DEDUP_WINDOW_MS, 86_400_000);
});

console.log('\narena categorisation');

test('prompts land in the expected buckets', () => {
  const cases: Array<[string, string]> = [
    ['Refactor this Python function to avoid the nested loop', 'coding'],
    ['帮我调试一下这段代码的报错', 'coding'],
    ['Prove that the square root of two is irrational', 'math'],
    ['证明勾股定理', 'math'],
    ['How does quantum entanglement actually work?', 'science'],
    ['Write a short poem about the sea', 'writing'],
    ['把这段翻译成英文', 'writing'],
    ['What caused the fall of the Western Roman Empire?', 'history'],
    ['How do I descale a kettle?', 'practical'],
    ['Tell me about the colour blue', 'general'],
  ];
  for (const [prompt, expected] of cases) {
    assert.equal(categorizePrompt(prompt), expected, `"${prompt}"`);
  }
});

test('coding wins over math when a prompt mentions both', () => {
  // Ordering in the rule table is load-bearing, so pin it.
  assert.equal(
    categorizePrompt('Calculate the time complexity of this sorting function in Python'),
    'coding'
  );
});

test('every bucket produced is a declared category', () => {
  const prompts = ['abc', '', 'hello world', '???', '你好'];
  for (const prompt of prompts) {
    assert.ok(
      (ARENA_CATEGORIES as readonly string[]).includes(categorizePrompt(prompt)),
      `"${prompt}" produced an undeclared category`
    );
  }
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
