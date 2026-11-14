import assert from 'node:assert/strict';
import { battleVoterId } from '../src/lib/arena/access';
import { arenaPublishSchema, arenaVoteSchema } from '../src/lib/validation';

assert.equal(battleVoterId('creator', 'stranger', null), null, 'Reading a revealed permalink cannot grant a counted vote');
assert.equal(battleVoterId('creator', null, 'anon:other'), null);
assert.equal(battleVoterId('creator', 'creator', null), 'creator');
assert.equal(battleVoterId('anon:original', null, 'anon:original'), 'anon:original');
assert.equal(battleVoterId('anon:original', 'signed-in-later', 'anon:original'), 'anon:original', 'Signing in cannot create a second vote identity');
assert.equal(battleVoterId(undefined, 'creator', null), null);
for (const battleId of ['../other', 'battle/votes/other', '', 'a'.repeat(129)]) {
  assert.equal(arenaVoteSchema.safeParse({ battleId, outcome: 'a' }).success, false);
  assert.equal(arenaPublishSchema.safeParse({ battleId }).success, false);
}
assert.equal(arenaVoteSchema.safeParse({ battleId: 'aValidBattle123', outcome: 'tie' }).success, true);
console.log('Arena access: owner-only voting, sign-in identity continuity and document path validation passed');
