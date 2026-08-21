/**
 * Contract tests for `wikiCreateSchema` — the request bodies its real callers
 * actually send.
 *
 * These exist because of a bug that lived in `main` and in production: the
 * article page's "continue → create a new article" button posts `title: ''`
 * (WikiContinueChat.tsx, `handleCreateNewWiki`), while the schema required
 * `title` to be `min(1)`. Every click 400'd at `parseJsonBody` before any route
 * logic ran, and the 400 branch logs nothing server-side, so the failure was
 * invisible in Cloud Logging — the user just saw a generic toast.
 *
 * Both files typechecked and linted cleanly on their own: `''` is a perfectly
 * good `string`. Only a test that puts the caller's body through the schema can
 * catch this class of drift, so that is exactly what these cases do. When you
 * change either side, change the literals here to match.
 *
 * Run with `npm test`.
 */
import assert from 'node:assert/strict';
import { wikiCreateSchema } from '../src/lib/validation';

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

/** One turn of conversation, shaped like `messageSchema` wants it. */
function message(role: 'user' | 'assistant', content: string) {
  return { id: `${role}-1`, role, content, timestamp: 1_700_000_000_000 };
}

console.log('\nwiki create contract');

test("WikiContinueChat's create-new-article body is accepted", () => {
  // Mirrors WikiContinueChat.tsx `handleCreateNewWiki` field for field. The
  // button only renders once `newMessages.length >= 2`, so the conversation
  // always holds at least a user turn and an assistant turn.
  const newMessages = [message('user', 'What about the tides?'), message('assistant', 'They...')];
  const result = wikiCreateSchema.safeParse({
    conversation: newMessages,
    aiModel: 'claude',
    title: '',
    question: newMessages[0]?.content || '',
    content: '',
    tags: [],
  });

  assert.equal(
    result.success,
    true,
    `expected the button's body to validate, got: ${JSON.stringify(
      result.success ? [] : result.error.issues,
      null,
      2
    )}`
  );
});

test("an empty title survives parsing as '' so the route's `||` picks the AI title", () => {
  // `POST /api/wiki` does `title: body.title || generated.title`. That fallback
  // is only reachable if an empty title parses to a falsy value rather than
  // being rejected or defaulted to something truthy.
  const parsed = wikiCreateSchema.parse({
    conversation: [message('user', 'q'), message('assistant', 'a')],
    aiModel: 'gpt',
    title: '',
    question: 'q',
    content: '',
    tags: [],
  });

  assert.equal(parsed.title, '');
  assert.equal(Boolean(parsed.title), false);
});

test('an omitted title is allowed and defaults to the empty string', () => {
  const parsed = wikiCreateSchema.parse({
    conversation: [message('user', 'q'), message('assistant', 'a')],
    aiModel: 'gemini',
    question: 'q',
  });

  assert.equal(parsed.title, '');
});

test("PublishDialog's body — a user-supplied title — still round-trips", () => {
  // The other caller. PublishDialog guards with `if (!title.trim()) return;`
  // and posts the trimmed title, so it must keep working unchanged.
  const parsed = wikiCreateSchema.parse({
    conversation: [message('user', 'q'), message('assistant', 'a')],
    aiModel: 'claude',
    title: 'How tides work',
    question: 'How do tides work?',
    content: '',
    tags: ['ocean'],
  });

  assert.equal(parsed.title, 'How tides work');
});

test('the title is still bounded — 201 characters is rejected', () => {
  // Relaxing `min(1)` must not relax the upper bound: that one is a real
  // storage/display constraint rather than a caller mismatch.
  const result = wikiCreateSchema.safeParse({
    conversation: [message('user', 'q'), message('assistant', 'a')],
    aiModel: 'claude',
    title: 'x'.repeat(201),
    question: 'q',
  });

  assert.equal(result.success, false);
});

test('question is still required — it is the one field the route cannot invent', () => {
  const result = wikiCreateSchema.safeParse({
    conversation: [message('user', 'q'), message('assistant', 'a')],
    aiModel: 'claude',
    title: '',
    question: '',
  });

  assert.equal(result.success, false);
});

console.log(`\n${run - failures}/${run} passed`);
process.exit(failures > 0 ? 1 : 0);
