export type BattleSlot = 'a' | 'b';

export interface BattleStreamSources {
  battleId: string;
  a: ReadableStream<Uint8Array>;
  b: ReadableStream<Uint8Array>;
  /**
   * Called once, after both sides finish, with the accumulated answers. Only
   * invoked when both succeeded — a half-finished battle must never become
   * votable. Errors thrown here are logged, not surfaced to the client, since
   * the answers have already been delivered.
   */
  onComplete: (answers: Record<BattleSlot, string>) => Promise<void> | void;
  /**
   * Called instead of `onComplete` when the battle produced nothing usable —
   * a model errored, or the client went away mid-generation. Lets the caller
   * undo work it did up front, such as refunding a metered battle.
   */
  onAbandon?: (reason: 'failed' | 'disconnected') => Promise<void> | void;
}

/**
 * Interleave two model streams into one SSE response.
 *
 * One request rather than three (create, then stream each side) keeps the battle
 * atomic: the document is written once, complete, after both sides finish, so
 * there is no window where a battle exists with one answer in it.
 *
 * Events:
 *   meta   {"battleId":"..."}          once, first
 *   chunk  {"slot":"a","text":"..."}   interleaved as the models produce text
 *   fail   {"slot":"b"}                that side errored; the battle is unvotable
 *   done   {"ok":true}                 both sides finished and were persisted
 */
export function mergeBattleStreams(sources: BattleStreamSources): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  // Set when the consumer goes away. Two things depend on it: `send` stops
  // touching a dead controller, and both pumps stop reading their model.
  let clientGone = false;
  const readers: Array<ReadableStreamDefaultReader<Uint8Array>> = [];

  /**
   * Mark the consumer gone and cancel both models.
   *
   * Reached two ways — the stream's own `cancel()`, and an `enqueue` that threw
   * because the controller had already closed. Both must cancel upstream, or an
   * abandoned battle keeps generating on the user's API keys. Cancelling an
   * already-released reader is a no-op that rejects, hence the swallow.
   */
  const abandon = () => {
    if (clientGone) return;
    clientGone = true;
    for (const reader of readers) {
      try {
        reader.cancel().catch(() => {});
      } catch {
        /* reader already released */
      }
    }
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      /**
       * Enqueue an SSE frame, or do nothing once the client has disconnected.
       *
       * The guard is load-bearing, not defensive dressing. `enqueue` on a closed
       * controller throws `ERR_INVALID_STATE`, and without this the throw landed
       * in `pump`'s catch, whose own `send('fail', …)` threw the *same* error
       * again — so the error path was itself unsafe and the rejection escaped
       * into `Promise.all`.
       */
      const send = (event: string, data: unknown) => {
        if (clientGone) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          abandon();
        }
      };

      send('meta', { battleId: sources.battleId });

      const answers: Record<BattleSlot, string> = { a: '', b: '' };
      const failed: BattleSlot[] = [];

      const pump = async (slot: BattleSlot, stream: ReadableStream<Uint8Array>) => {
        const reader = stream.getReader();
        readers.push(reader);
        // A chunk boundary can fall inside a multi-byte character, which would
        // corrupt CJK text if each chunk were decoded independently. The
        // streaming decoder holds the partial sequence until it completes.
        const decoder = new TextDecoder('utf-8');
        try {
          for (;;) {
            // Stop pulling from the model the moment nobody is listening —
            // otherwise an abandoned battle keeps generating, and the user
            // keeps paying for tokens they will never see.
            if (clientGone) break;
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value, { stream: true });
            if (!text) continue;
            answers[slot] += text;
            send('chunk', { slot, text });
          }
          const tail = decoder.decode();
          if (tail) {
            answers[slot] += tail;
            send('chunk', { slot, text: tail });
          }
        } catch (err) {
          console.error(`[arena] battle ${sources.battleId} slot ${slot} failed:`, err);
          failed.push(slot);
          send('fail', { slot });
        } finally {
          reader.releaseLock();
        }
      };

      // Both sides run concurrently; one failing must not stop the other, so
      // neither pump rejects.
      await Promise.all([pump('a', sources.a), pump('b', sources.b)]);

      const bothUsable =
        !clientGone && failed.length === 0 && answers.a.trim() !== '' && answers.b.trim() !== '';

      try {
        if (bothUsable) {
          await sources.onComplete(answers);
        } else {
          await sources.onAbandon?.(clientGone ? 'disconnected' : 'failed');
        }
      } catch (err) {
        console.error(`[arena] finalising battle ${sources.battleId} failed:`, err);
      }

      send('done', { ok: bothUsable });
      if (!clientGone) controller.close();
    },

    /**
     * The consumer went away. Cancelling the model streams here is what stops
     * an abandoned battle from running to completion on the user's API keys.
     */
    cancel() {
      abandon();
    },
  });
}
