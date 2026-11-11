import { readFileSync } from 'node:fs';
import type { DraftArticle, DraftLanguage } from '../../content/types';

const LANGS = new Set<DraftLanguage>([
  'en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar', 'hi', 'it', 'tr', 'vi', 'th',
]);

export function validateDraft(d: DraftArticle, i: number): string[] {
  const errs: string[] = [];
  const at = `[${i}] "${d.title ?? '?'}"`;
  for (const f of ['title', 'question', 'content', 'summary'] as const) {
    if (!d[f] || typeof d[f] !== 'string') errs.push(`${at}: missing ${f}`);
  }
  if (!Array.isArray(d.tags) || d.tags.length < 1 || d.tags.length > 8) {
    errs.push(`${at}: tags must have 1–8 entries`);
  }
  if (!LANGS.has(d.language)) errs.push(`${at}: bad language "${d.language}"`);
  if (d.content && !d.content.startsWith('# ')) errs.push(`${at}: content must start with "# Title"`);
  if (d.summary && d.summary.length > 320) errs.push(`${at}: summary too long (${d.summary.length})`);
  if (d.image && !d.topicKey) errs.push(`${at}: image requires topicKey`);
  if (d.image && (!d.image.prompt || !d.image.alt)) errs.push(`${at}: image needs prompt + alt`);
  for (const s of d.sources ?? []) {
    if (!s.title || !/^https:\/\//.test(s.url)) errs.push(`${at}: bad source ${s.url}`);
  }
  return errs;
}

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
  const errors = drafts.flatMap(validateDraft);
  if (errors.length) throw new Error(errors.join('\n'));
  return drafts;
}
