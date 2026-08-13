/**
 * Tests for the battle SSE merge, focused on what happens when a battle does
 * NOT go well.
 *
 * The happy path is the easy half. These cases pin the disconnect and failure
 * behaviour, because that is where the original implementation went wrong in
 * three separate ways at once: it threw from inside its own error handler, it
 * left both provider streams generating on the user's API keys, and it silently
 * dropped the battle. All three are invisible from a successful battle.
 */
import assert from 'node:assert/strict';
import { mergeBattleStreams } from '../src/lib/arena/battle-stream';

let failures = 0;
let run = 0;

function test(name: string, fn: () => Promise<void>): Promise<void> {
  run++;
  return fn().then(
    () => console.log(`  ok  ${name}`),
    (err: Error) => {
      failures++;
      console.error(`FAIL  ${name}`);
      console.error(`      ${err.message.split('\n').join('\n      ')}`);
    }
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** A model stream that emits `n` chunks slowly and reports if it was cancelled. */
function modelStream(label: string, n: number, state: { cancelled: boolean }, gapMs = 10) {
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      for (let i = 0; i < n; i++) {
        await wait(gapMs);
        try {
          controller.enqueue(encoder.encode(`${label}${i} `));
        } catch {
          return; // consumer went away
        }
      }
      controller.close();
    },
    cancel() {
      state.cancelled = true;
    },
  });
}

function failingStream(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(new Error('provider exploded'));
    },
  });
}

/** Drain an SSE body into its decoded event list. */
async function drain(body: ReadableStream<Uint8Array>) {
  const events: Array<{ event: string; data: Record<string, unknown> }> = [];
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let i = buffer.indexOf('\n\n');
    while (i !== -1) {
      const frame = buffer.slice(0, i);
      buffer = buffer.slice(i + 2);
      i = buffer.indexOf('\n\n');
      const ev = frame.split('\n').find((l) => l.startsWith('event: '))?.slice(7).trim();
      const dt = frame.split('\n').find((l) => l.startsWith('data: '))?.slice(6);
      if (ev && dt) events.push({ event: ev, data: JSON.parse(dt) });
    }
  }
  return events;
}

async function main() {
  console.log('\narena battle stream');

  await test('a clean battle persists both answers and reports ok', async () => {
    const a = { cancelled: false };
    const b = { cancelled: false };
    let persisted: Record<string, string> | null = null;
    let abandoned: string | null = null;

    const events = await drain(
      mergeBattleStreams({
        battleId: 'ok',
        a: modelStream('a', 3, a),
        b: modelStream('b', 3, b),
        onComplete: (answers) => {
          persisted = { ...answers };
        },
        onAbandon: (reason) => {
          abandoned = reason;
        },
      })
    );

    assert.equal(events[0].event, 'meta');
    assert.deepEqual(events.at(-1), { event: 'done', data: { ok: true } });
    assert.equal(abandoned, null, 'a good battle must not report abandonment');
    const answers = persisted as Record<string, string> | null;
    assert.ok(answers, 'onComplete must fire');
    assert.equal(answers.a, 'a0 a1 a2 ');
    assert.equal(answers.b, 'b0 b1 b2 ');
  });

  await test('a disconnect cancels both models instead of letting them run on', async () => {
    // This is the money case: without cancellation the user keeps paying for a
    // battle they walked away from.
    const a = { cancelled: false };
    const b = { cancelled: false };
    let persisted = false;
    let abandonReason: string | null = null;

    const body = mergeBattleStreams({
      battleId: 'gone',
      a: modelStream('a', 200, a),
      b: modelStream('b', 200, b),
      onComplete: () => {
        persisted = true;
      },
      onAbandon: (reason) => {
        abandonReason = reason;
      },
    });

    const reader = body.getReader();
    await reader.read();
    await wait(40);
    await reader.cancel('client gone');
    await wait(150);

    assert.equal(a.cancelled, true, 'slot A model must be cancelled');
    assert.equal(b.cancelled, true, 'slot B model must be cancelled');
    assert.equal(persisted, false, 'a half-read battle must not become votable');
    assert.equal(abandonReason, 'disconnected', 'the caller must be told, so it can refund');
  });

  await test('a disconnect raises nothing — the error path must not throw', async () => {
    // The original code threw ERR_INVALID_STATE from `send`, caught it, then
    // threw the same error again from `send('fail')` inside the catch.
    const rejections: unknown[] = [];
    const onRejection = (e: unknown) => rejections.push(e);
    process.on('unhandledRejection', onRejection);

    try {
      const body = mergeBattleStreams({
        battleId: 'quiet',
        a: modelStream('a', 200, { cancelled: false }),
        b: modelStream('b', 200, { cancelled: false }),
        onComplete: () => {},
      });
      const reader = body.getReader();
      await reader.read();
      await wait(30);
      await reader.cancel('client gone');
      await wait(200);
    } finally {
      process.off('unhandledRejection', onRejection);
    }

    assert.deepEqual(rejections, [], 'disconnect must not produce an unhandled rejection');
  });

  await test('one model failing marks the battle unusable and abandons it', async () => {
    const b = { cancelled: false };
    let persisted = false;
    let abandonReason: string | null = null;

    const events = await drain(
      mergeBattleStreams({
        battleId: 'half',
        a: failingStream(),
        b: modelStream('b', 2, b),
        onComplete: () => {
          persisted = true;
        },
        onAbandon: (reason) => {
          abandonReason = reason;
        },
      })
    );

    assert.ok(events.some((e) => e.event === 'fail' && e.data.slot === 'a'));
    assert.deepEqual(events.at(-1), { event: 'done', data: { ok: false } });
    assert.equal(persisted, false, 'a battle with one answer must never be votable');
    assert.equal(abandonReason, 'failed');
  });

  await test('the surviving side still streams when its partner fails', async () => {
    // One model erroring must not silence the other — otherwise a single
    // provider hiccup looks to the user like a total outage.
    const events = await drain(
      mergeBattleStreams({
        battleId: 'partial',
        a: failingStream(),
        b: modelStream('b', 3, { cancelled: false }),
        onComplete: () => {},
      })
    );
    const bChunks = events.filter((e) => e.event === 'chunk' && e.data.slot === 'b');
    assert.equal(bChunks.length, 3);
  });

  await test('an empty answer is treated as unusable, not as a valid battle', async () => {
    let persisted = false;
    const events = await drain(
      mergeBattleStreams({
        battleId: 'empty',
        a: modelStream('a', 0, { cancelled: false }),
        b: modelStream('b', 2, { cancelled: false }),
        onComplete: () => {
          persisted = true;
        },
      })
    );
    assert.deepEqual(events.at(-1), { event: 'done', data: { ok: false } });
    assert.equal(persisted, false, 'a blank answer cannot be voted on');
  });

  await test('multi-byte characters survive a chunk boundary', async () => {
    // A naive per-chunk decode corrupts CJK, which matters on a site serving
    // Chinese. Split "热榜" across two reads at the byte level.
    const bytes = new TextEncoder().encode('热榜');
    const split = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, 2));
        controller.enqueue(bytes.slice(2));
        controller.close();
      },
    });
    let persisted: Record<string, string> | null = null;
    await drain(
      mergeBattleStreams({
        battleId: 'cjk',
        a: split,
        b: modelStream('b', 1, { cancelled: false }),
        onComplete: (answers) => {
          persisted = { ...answers };
        },
      })
    );
    const cjk = persisted as Record<string, string> | null;
    assert.equal(cjk?.a, '热榜', 'decoder must hold the partial sequence');
  });

  console.log(`\n${run - failures}/${run} passed`);
  if (failures > 0) process.exit(1);
}

main();
