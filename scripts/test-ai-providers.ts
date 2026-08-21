/**
 * Tests for the provider adapters.
 *
 * These make no network call and need no API key. What they pin is the shape of
 * the request we hand to a vendor SDK — which is exactly where this repo lost
 * an entire model.
 *
 * Every Gemini call on the site returned `400 Invalid value at
 * 'system_instruction'` for an unknown length of time: chat, wiki threads and
 * arena battles alike. The cause was a vendor type that lies. `StartChatParams`
 * declares `systemInstruction?: string | Part | Content`, but only the
 * `GenerativeModel` constructor runs `formatSystemInstruction` over it;
 * `startChat` spreads the caller's params over the formatted value without
 * touching them, so a string passed there reaches the API unwrapped. TypeScript
 * cannot catch that, and it went unnoticed because nothing exercised Gemini to
 * completion.
 *
 * So the assertion below is deliberately about the SDK's *behaviour*, not ours:
 * if a future SDK version starts (or stops) normalising in a given place, this
 * fails and someone reads the comment instead of shipping a silently dead model.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Resolved from this file, not the working directory, so the suite behaves the
// same however the runner is invoked.
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

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

// Constructing a client performs no I/O, so this key is never used for anything.
const client = new GoogleGenerativeAI('not-a-key-no-request-is-made');
const INSTRUCTION = 'You are a knowledgeable assistant.';

/** The SDK does not expose `params`, but the request it will send lives there. */
function chatSystemInstruction(chat: unknown): unknown {
  return (chat as { params?: { systemInstruction?: unknown } }).params?.systemInstruction;
}

console.log('\nai providers: gemini system instruction');

test('a string on getGenerativeModel is normalised into a Content', () => {
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: INSTRUCTION,
  });
  assert.deepEqual(model.systemInstruction, {
    role: 'system',
    parts: [{ text: INSTRUCTION }],
  });
});

test('that normalised value survives into the chat session', () => {
  // This is the request the API actually receives.
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: INSTRUCTION,
  });
  const chat = model.startChat({ history: [] });
  assert.deepEqual(chatSystemInstruction(chat), {
    role: 'system',
    parts: [{ text: INSTRUCTION }],
  });
});

test('a string on startChat is NOT normalised — the bug this file exists for', () => {
  // Documented as a fact about the SDK, so that if a future version fixes it
  // this test fails loudly rather than leaving the workaround unexplained.
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const chat = model.startChat({ history: [], systemInstruction: INSTRUCTION });
  assert.equal(
    chatSystemInstruction(chat),
    INSTRUCTION,
    'SDK behaviour changed — startChat now formats the string, so the note in gemini.ts is stale'
  );
  assert.equal(model.systemInstruction, undefined);
});

test('our adapter sends a Content, not a bare string', () => {
  // Guards the actual regression: whatever else changes, the value handed to
  // the API must not be a string. Read from the module rather than restated, so
  // editing the prompt cannot make this test pass against different text.
  const source = readFileSync(join(REPO_ROOT, 'src/lib/ai/gemini.ts'), 'utf8');
  assert.ok(
    /getGenerativeModel\(\{[\s\S]*?systemInstruction:/.test(source),
    'systemInstruction must be passed to getGenerativeModel'
  );
  assert.ok(
    !/startChat\(\{[\s\S]*?systemInstruction:/.test(source),
    'systemInstruction must NOT be passed to startChat — it arrives unformatted'
  );
});

console.log(`\n${run - failures}/${run} passed`);
if (failures > 0) process.exit(1);
