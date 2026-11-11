import assert from 'node:assert/strict';
import { editorialTopicCatalog } from './lib/editorial-topic-catalog';

async function main() {
  const catalog = await editorialTopicCatalog();
  assert.match(catalog.get('rest-vs-graphql') ?? '', /GraphQL/i);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
