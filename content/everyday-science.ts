import type { DraftArticle } from './types';
import { everydayScienceEn } from './everyday-science.en';
import { everydayScienceZh } from './everyday-science.zh';

// Batch: Everyday Science — quality-tier editorial cluster (10 topics × en/zh).
// Curiosity-driven "why/how" science. Not in content/index.ts `allDrafts`;
// seed with scripts/seed-editorial.ts --batch=everyday-science.
export const everydayScience: DraftArticle[] = [...everydayScienceEn, ...everydayScienceZh];

export { everydayScienceEn, everydayScienceZh };
