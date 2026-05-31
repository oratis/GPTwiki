import type { DraftArticle } from '../types';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { pt } from './pt';
import { ru } from './ru';
import { ar } from './ar';

// Aggregated translations across all languages completed so far. Append new
// per-language arrays here as each language file is built out. The seeder
// (scripts/seed-drafts.ts) ingests these alongside the English originals;
// translated titles are language-specific, so title-based de-dup is safe.
export const allTranslations: DraftArticle[] = [
  ...zh,
  ...ja,
  ...ko,
  ...es,
  ...fr,
  ...de,
  ...pt,
  ...ru,
  ...ar,
];

export { zh, ja, ko, es, fr, de, pt, ru, ar };
