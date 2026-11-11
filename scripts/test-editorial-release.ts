import assert from 'node:assert/strict';
import type { DraftArticle } from '../content/types';
import { releaseKeys } from './lib/editorial-release';

const en = { topicKey: 'solar-panels', language: 'en' } as DraftArticle;
const zh = { ...en, language: 'zh' } as DraftArticle;
assert.deepEqual(releaseKeys([zh, en]), ['solar-panels']);
assert.throws(() => releaseKeys([en, en]), /Duplicate/);
assert.throws(() => releaseKeys([en]), /Incomplete/);
assert.throws(() => releaseKeys([]), /Empty/);
