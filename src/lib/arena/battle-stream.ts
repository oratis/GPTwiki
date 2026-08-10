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

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      send('meta', { battleId: sources.battleId });

      const answers: Record<BattleSlot, string> = { a: '', b: '' };
      const failed: BattleSlot[] = [];

      const pump = async (slot: BattleSlot, stream: ReadableStream<Uint8Array>) => {
        const reader = stream.getReader();
        // A chunk boundary can fall inside a multi-byte character, which would
        // corrupt CJK text if each chunk were decoded independently. The
        // streaming decoder holds the partial sequence until it completes.
        const decoder = new TextDecoder('utf-8');
        try {
          for (;;) {
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

      const bothUsable = failed.length === 0 && answers.a.trim() !== '' && answers.b.trim() !== '';
      if (bothUsable) {
        try {
          await sources.onComplete(answers);
        } catch (err) {
          console.error(`[arena] persisting battle ${sources.battleId} failed:`, err);
        }
      }

      send('done', { ok: bothUsable });
      controller.close();
    },
  });
}
