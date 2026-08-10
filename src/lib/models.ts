import type { AIModel } from '@/types';

export function getModelDisplayName(model: AIModel): string {
  switch (model) {
    case 'claude': return 'Claude';
    case 'gpt': return 'GPT-4o';
    case 'gemini': return 'Gemini';
  }
}
