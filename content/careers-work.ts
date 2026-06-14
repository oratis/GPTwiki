import type { DraftArticle } from './types';
import { careersWorkEn } from './careers-work.en';
import { careersWorkZh } from './careers-work.zh';

// Batch: Careers & Job-Hunting — quality-tier editorial cluster (10 topics × en/zh).
// Not in content/index.ts `allDrafts`; seed with
// scripts/seed-editorial.ts --batch=careers-work.
export const careersWork: DraftArticle[] = [...careersWorkEn, ...careersWorkZh];

export { careersWorkEn, careersWorkZh };
