import assert from 'node:assert/strict';
import { readBattleStream, type BattleEvent } from '../src/lib/arena/read-stream';

function stream(text: string, split = false) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({ start(controller) {
    if (split) for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
    else controller.enqueue(bytes);
    controller.close();
  } });
}
async function main() {
  const events: BattleEvent[] = [];
  await readBattleStream(stream('event: meta\r\ndata: {"battleId":"battle"}\r\n\r\nevent: chunk\r\ndata: {"slot":"b","text":"你好"}\r\n\r\nevent: done\r\ndata: {"ok":true}\r\n\r\n', true), (event) => events.push(event));
  assert.deepEqual(events[1], { event: 'chunk', data: { slot: 'b', text: '你好' } });
  assert.deepEqual(events[2], { event: 'done', data: { ok: true } });
  await assert.rejects(readBattleStream(stream('event: meta\ndata: {"battleId":"b"}\n\n'), () => {}), /INTERRUPTED/);
  await assert.rejects(readBattleStream(stream('event: done\ndata: {"ok":true}\n\n'), () => {}), /INVALID/);
  await assert.rejects(readBattleStream(stream('event: chunk\ndata: {"slot":"x","text":"bad"}\n\n'), () => {}), /INVALID/);
  console.log('Arena client stream: split UTF-8/CRLF frames, truncated streams and invalid events passed');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
