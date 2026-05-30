import type { DraftArticle } from '../types';
import { zh } from './zh';

// Aggregated translations across all languages completed so far. Append new
// per-language arrays here as each language file is built out. The seeder
// (scripts/seed-drafts.ts) ingests these alongside the English originals;
// translated titles are language-specific, so title-based de-dup is safe.
export const allTranslations: DraftArticle[] = [
  ...zh,
];

export { zh };
