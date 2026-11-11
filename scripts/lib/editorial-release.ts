import { readFileSync } from 'node:fs';
import type { DraftArticle } from '../../content/types';

export function releaseKeys(drafts: DraftArticle[]) {
  if (!Array.isArray(drafts) || !drafts.length) throw new Error('Empty editorial release');
  const editions = new Map<string, Set<string>>();
  for (const { topicKey, language } of drafts) {
    if (!topicKey || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topicKey)) throw new Error('Invalid topic key');
    const langs = editions.get(topicKey) ?? new Set();
    if (langs.has(language)) throw new Error(`Duplicate ${language} edition for ${topicKey}`);
    langs.add(language);
    editions.set(topicKey, langs);
  }
  for (const [key, langs] of editions) {
    if (langs.size !== 2 || !langs.has('en') || !langs.has('zh')) {
      throw new Error(`Incomplete bilingual release: ${key}`);
    }
  }
  return [...editions.keys()];
}

export function readRelease(file: string): DraftArticle[] {
  if (!/^content\/releases\/\d{8}-\d{6}\.json$/.test(file)) throw new Error('Invalid release path');
  const drafts: DraftArticle[] = JSON.parse(readFileSync(file, 'utf8'));
  releaseKeys(drafts);
  return drafts;
}
