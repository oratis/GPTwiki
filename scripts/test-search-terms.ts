import assert from 'node:assert/strict';
import { searchQueryTerms } from '../src/lib/search-keywords';

const title = '简历长度：一页还是多页？';
const { keywords, indexTokens } = searchQueryTerms(title);
assert.deepEqual(keywords, ['简历', '历长', '长度', '一页', '页还', '还是', '是多', '多页']);
assert.deepEqual(keywords, indexTokens);
assert.deepEqual(searchQueryTerms('RSU 与期权').keywords, ['rsu', '与期', '期权']);
assert.deepEqual(searchQueryTerms('the solar panel').keywords, ['solar', 'panel']);
assert.deepEqual(searchQueryTerms('the').keywords, ['the']);
assert.deepEqual(searchQueryTerms('光').keywords, ['光']);
assert.deepEqual(searchQueryTerms('——').keywords, []);
