/**
 * Tests for `cachedForTTL`, the process-local memo behind every whole-site
 * Firestore read (popular wikis, the tag cloud, recent wikis, tag pages).
 *
 * The three properties below are the ones the callers actually depend on and
 * the ones a reimplementation would most easily lose:
 *
 *  - concurrent misses share ONE load. A cold instance under a crawler burst
 *    is exactly when these queries are most expensive, and it is the reason
 *    the map stores the in-flight promise rather than the resolved value.
 *  - a rejection is NOT retained. An earlier version of this idea cached the
 *    `.catch(() => [])` result, which pinned an empty list for the whole
 *    window — and a tag page that renders `notFound()` on an empty list then
 *    404s a real tag for a full minute off one transient error.
 *  - entries expire. Without a clock injection point this is asserted with a
 *    0ms TTL, which is the boundary case (`expiresAt > now` is strict).
 *
 * Run with `npm test`.
 */
import assert from "node:assert/strict";
import { cachedForTTL } from "../src/lib/ttl-cache";

let failures = 0;
let run = 0;

async function test(
  name: string,
  fn: () => Promise<void> | void,
): Promise<void> {
  run++;
  try {
    await fn();
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL  ${name}`);
    console.error(
      `      ${(err as Error).message.split("\n").join("\n      ")}`,
    );
  }
}

let keySeq = 0;
const freshKey = () => `test-key-${keySeq++}`;

async function main(): Promise<void> {
  console.log("\nttl cache");

  await test("a hit inside the window does not re-run the loader", async () => {
    const key = freshKey();
    let loads = 0;
    const load = async () => {
      loads++;
      return "value";
    };
    assert.equal(await cachedForTTL(key, 60_000, load), "value");
    assert.equal(await cachedForTTL(key, 60_000, load), "value");
    assert.equal(loads, 1);
  });

  await test("concurrent misses share a single in-flight load", async () => {
    const key = freshKey();
    let loads = 0;
    let release!: (v: string) => void;
    const gate = new Promise<string>((resolve) => {
      release = resolve;
    });
    const load = () => {
      loads++;
      return gate;
    };

    const all = Promise.all([
      cachedForTTL(key, 60_000, load),
      cachedForTTL(key, 60_000, load),
      cachedForTTL(key, 60_000, load),
    ]);
    release("shared");
    assert.deepEqual(await all, ["shared", "shared", "shared"]);
    assert.equal(loads, 1);
  });

  await test("distinct keys are memoized independently", async () => {
    const a = freshKey();
    const b = freshKey();
    assert.equal(await cachedForTTL(a, 60_000, async () => "a"), "a");
    assert.equal(await cachedForTTL(b, 60_000, async () => "b"), "b");
    assert.equal(await cachedForTTL(a, 60_000, async () => "unused"), "a");
  });

  await test("a rejection is evicted, not cached for the window", async () => {
    const key = freshKey();
    let loads = 0;
    const load = async () => {
      loads++;
      if (loads === 1) throw new Error("transient firestore error");
      return "recovered";
    };

    await assert.rejects(() => cachedForTTL(key, 60_000, load), /transient/);
    // The next caller must reach the loader rather than inherit the failure.
    assert.equal(await cachedForTTL(key, 60_000, load), "recovered");
    assert.equal(loads, 2);
  });

  await test("an expired entry is reloaded", async () => {
    const key = freshKey();
    let loads = 0;
    const load = async () => `load-${++loads}`;
    assert.equal(await cachedForTTL(key, 0, load), "load-1");
    assert.equal(await cachedForTTL(key, 0, load), "load-2");
  });

  console.log(`\n${run - failures}/${run} passed`);
  if (failures) process.exit(1);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
