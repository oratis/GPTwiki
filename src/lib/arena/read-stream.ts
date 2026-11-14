export type BattleEvent =
  | { event: 'meta'; data: { battleId: string } }
  | { event: 'chunk'; data: { slot: 'a' | 'b'; text: string } }
  | { event: 'fail'; data: { slot: 'a' | 'b' } }
  | { event: 'done'; data: { ok: boolean } };

/** A response is usable only after the server confirms both persistence and EOF. */
export async function readBattleStream(body: ReadableStream<Uint8Array>, receive: (event: BattleEvent) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let complete = false;
  let hasId = false;
  try {
    while (!complete) {
      const { done, value } = await reader.read();
      if (done) throw new Error('BATTLE_INTERRUPTED');
      buffer += decoder.decode(value, { stream: true });
      let match: RegExpExecArray | null;
      while ((match = /\r?\n\r?\n/.exec(buffer))) {
        const frame = buffer.slice(0, match.index);
        buffer = buffer.slice(match.index + match[0].length);
        const lines = frame.split(/\r?\n/);
        const event = lines.find((line) => line.startsWith('event:'))?.slice(6).trim();
        const raw = lines.filter((line) => line.startsWith('data:')).map((line) => line.slice(5).trimStart()).join('\n');
        if (!event || !raw) continue;
        const data = JSON.parse(raw);
        if (event === 'meta' && typeof data.battleId === 'string' && data.battleId) {
          hasId = true;
          receive({ event, data });
        } else if (event === 'chunk' && (data.slot === 'a' || data.slot === 'b') && typeof data.text === 'string') {
          receive({ event, data });
        } else if (event === 'fail' && (data.slot === 'a' || data.slot === 'b')) {
          receive({ event, data });
        } else if (event === 'done' && typeof data.ok === 'boolean' && hasId) {
          complete = true;
          receive({ event, data });
          break;
        } else {
          throw new Error('INVALID_BATTLE_STREAM');
        }
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
