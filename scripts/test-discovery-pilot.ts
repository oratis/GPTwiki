import assert from 'node:assert/strict';
import { findPilotEdition, pilotEditions } from '../src/lib/discovery-pilot';

assert.equal(new Set(pilotEditions.map(e => e.id)).size, pilotEditions.length);
for (const edition of pilotEditions) {
  assert.equal(findPilotEdition(edition), edition);
  assert.equal(findPilotEdition({ ...edition, title: 'Different article' }), undefined);
  assert.equal(new URL(edition.reference.url).protocol, 'https:');
}
