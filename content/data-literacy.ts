import type { DraftArticle } from './types';
import { dataLiteracyEn } from './data-literacy.en';
import { dataLiteracyZh } from './data-literacy.zh';

// 4 topics × 2 locales. The dated release uses the existing --release path.
export const dataLiteracy: DraftArticle[] = [...dataLiteracyEn, ...dataLiteracyZh];
export { dataLiteracyEn, dataLiteracyZh };
