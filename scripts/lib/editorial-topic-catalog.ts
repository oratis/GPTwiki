import { readdirSync } from 'node:fs';
import type { DraftArticle } from '../../content/types';

/** Include the pre-automation English clusters when proposing new questions. */
export async function editorialTopicCatalog(): Promise<Map<string, string>> {
  const catalog = new Map<string, string>();
  const contentDir = new URL('../../content/', import.meta.url);
  for (const file of readdirSync(contentDir).filter(f => f.endsWith('.en.ts') && f !== 'auto-draft.en.ts')) {
    const cluster = await import(new URL(file, contentDir).href);
    for (const batch of Object.values(cluster)) {
      if (!Array.isArray(batch)) continue;
      for (const draft of batch as DraftArticle[]) {
        if (draft.topicKey) catalog.set(draft.topicKey, draft.question);
      }
    }
  }
  return catalog;
}
