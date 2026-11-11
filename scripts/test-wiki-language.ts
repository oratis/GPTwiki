import assert from 'node:assert/strict';
import { articleLocale, articleUrl, editionLinks } from '../src/lib/wiki-language';

assert.equal(articleLocale(undefined, 'wikipedia-zh-dump'), 'zh');
assert.equal(articleLocale('pt-BR'), 'pt');
assert.equal(articleLocale('__proto__'), 'en');
assert.deepEqual(editionLinks('cn', 'zh', []), { zh: articleUrl('cn', 'zh') });
assert.deepEqual(editionLinks('cn', 'zh', [
  { id: 'us', language: 'en' }, { id: 'cn', language: 'zh' },
  { id: 'fr1', language: 'fr' }, { id: 'fr2', language: 'fr' },
]), { en: articleUrl('us', 'en'), zh: articleUrl('cn', 'zh') });
