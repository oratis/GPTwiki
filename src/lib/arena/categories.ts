/**
 * Category assignment for battles.
 *
 * Keyword matching in plain code, not an LLM call. This is AI HOT's hard-won
 * rule applied at the cheapest possible point (see `docs/arena-research.md`
 * §3.4): the model's job is subjective judgement, and "which bucket is this
 * question in" is not that. A classifier call here would add latency and cost to
 * every battle, and — worse — make the category non-reproducible, so a
 * recomputed snapshot could silently disagree with the one before it.
 *
 * Deliberately coarse. Categories exist to slice the leaderboard later, and a
 * slice is only publishable once it has enough votes to carry an interval, so
 * more buckets than this would just produce more provisional rows.
 */

export const ARENA_CATEGORIES = [
  'coding',
  'math',
  'science',
  'writing',
  'history',
  'practical',
  'general',
] as const;

export type ArenaCategory = (typeof ARENA_CATEGORIES)[number];

export const DEFAULT_CATEGORY: ArenaCategory = 'general';

/**
 * Ordered most-specific first: `coding` before `math` so "algorithm complexity
 * in Python" lands in coding, and `general` is the fallthrough rather than a
 * keyword list.
 */
const RULES: Array<{ category: ArenaCategory; patterns: RegExp[] }> = [
  {
    category: 'coding',
    patterns: [
      /\b(code|coding|program|programming|function|debug|refactor|compile|api|regex|sql|git)\b/i,
      /\b(python|javascript|typescript|rust|golang|java|c\+\+|swift|kotlin|ruby|php|react|next\.?js)\b/i,
      /(代码|编程|函数|调试|重构|报错|接口)/,
    ],
  },
  {
    category: 'math',
    patterns: [
      /\b(prove|proof|theorem|integral|derivative|equation|matrix|probability|calculus|algebra|geometry)\b/i,
      /\b(solve for|calculate|compute the)\b/i,
      /(证明|定理|积分|导数|方程|矩阵|概率|微积分)/,
    ],
  },
  {
    category: 'science',
    patterns: [
      /\b(physics|chemistry|biology|quantum|molecule|neuron|genome|entropy|astronomy|climate|evolution)\b/i,
      /(物理|化学|生物|量子|分子|基因|天文|气候|进化)/,
    ],
  },
  {
    category: 'writing',
    patterns: [
      /\b(write|rewrite|draft|edit|essay|poem|story|translate|summari[sz]e|paraphrase|tone)\b/i,
      /(写一|改写|润色|翻译|摘要|文案|诗)/,
    ],
  },
  {
    category: 'history',
    patterns: [
      /\b(history|historical|century|dynasty|war|empire|ancient|medieval|revolution|civili[sz]ation)\b/i,
      /(历史|世纪|朝代|王朝|战争|帝国|古代|革命)/,
    ],
  },
  {
    category: 'practical',
    patterns: [
      /\b(how do i|how to|recipe|travel|budget|recommend|best way to|should i|advice|fix my)\b/i,
      /(怎么|如何|推荐|建议|攻略|食谱|预算)/,
    ],
  },
];

/** Bucket a prompt. Never throws; unmatched prompts are `general`. */
export function categorizePrompt(prompt: string): ArenaCategory {
  for (const rule of RULES) {
    if (rule.patterns.some((pattern) => pattern.test(prompt))) return rule.category;
  }
  return DEFAULT_CATEGORY;
}

export function isArenaCategory(value: string): value is ArenaCategory {
  return (ARENA_CATEGORIES as readonly string[]).includes(value);
}
