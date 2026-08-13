import { DEFAULT_MIN_VOTES } from './scoring';
import { hasArenaCopy } from './locales';
import { SERVED_MODELS } from '@/lib/models';

/**
 * The models named in the scope disclaimer, built from the served-model table
 * rather than typed out. The disclaimer's whole job is to say exactly which
 * models this board ranks, so it must not be able to drift from the versions the
 * providers are actually called with — which is precisely how "GPT-4" survived
 * long after the call moved to `gpt-4o`.
 */
const MODEL_LIST = Object.values(SERVED_MODELS)
  .map((m) => m.displayName)
  .join(', ');

/**
 * Prose for /arena/rules.
 *
 * Authored in English and Chinese only. Every other locale falls back to
 * English through `pickRulesContent` — the same posture the auto-content plan
 * settled on, because machine-translating a methodology page into 13 more
 * languages produces text nobody can review, and a rules page nobody can
 * review is worse than one that is honestly in another language.
 */

export interface RulesSection {
  heading: string;
  /** Rendered as paragraphs. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface RulesContent {
  title: string;
  /** Shown directly under the title — the scope disclaimer. */
  scope: string;
  updated: string;
  sections: RulesSection[];
}

const en: RulesContent = {
  title: 'How the Arena leaderboard works',
  scope:
    'This board ranks the three models GPTwiki itself serves — ' +
    `${MODEL_LIST}. It is not a general-purpose model ranking, and it is not ` +
    'comparable to boards built from millions of votes across dozens of models.',
  updated: 'Last reviewed 2026-08-10',
  sections: [
    {
      heading: 'Only anonymous votes count',
      body: [
        'A battle shows you two answers to your own question, labelled A and B, with ' +
          'the model names hidden. You vote, and only then are the models revealed. ' +
          'Votes cast while the models were hidden are the only ones that reach the ' +
          'leaderboard.',
        'This is the whole anti-gaming design, and it is stronger than any filter we ' +
          'could add on top: you cannot vote for your favourite model if you do not ' +
          'know which one it is.',
      ],
    },
    {
      heading: 'Ratings come from Bradley-Terry, not Elo',
      body: [
        'Every counted vote is a paired comparison. We fit a Bradley-Terry model — the ' +
          'standard statistical model for exactly this kind of data — by maximum ' +
          'likelihood over all votes at once, rather than nudging a rating up and down ' +
          'after each battle the way chess Elo does.',
        'Scores are shown on an Elo-like scale so they read familiarly: a model of ' +
          'average strength sits at 1000, and a 400-point gap means the stronger model ' +
          'is expected to win about 10 times out of 11.',
      ],
      bullets: [
        'A tie counts as half a win for each side.',
        '"Both are bad" is not counted as a result. It tells us something about the ' +
          'question, not about which model is stronger — so it is shown as its own ' +
          'column and left out of the fit.',
      ],
    },
    {
      heading: 'Rank is a range, because a single number would be a lie',
      body: [
        'Each score carries a 95% confidence interval, computed in closed form from a ' +
          'sandwich (robust) covariance estimate. Two models are only ranked apart when ' +
          'their intervals do not overlap; otherwise they share a rank range.',
        'So a row reading "1–2" means the data genuinely cannot tell that model apart ' +
          'from the one next to it. That is not a display quirk to work around — it is ' +
          'the result.',
      ],
    },
    {
      heading: `Below ${DEFAULT_MIN_VOTES} votes, no score is published`,
      body: [
        `A model needs at least ${DEFAULT_MIN_VOTES} counted votes before it gets a ` +
          'rating. Until then its row is marked provisional and shows only raw win, ' +
          'loss and tie counts.',
        'The same rule applies whenever the statistics themselves come out ' +
          'unusable — for example if every battle in a pairing happened to be shown in ' +
          'the same order, which makes model strength and display position ' +
          'mathematically indistinguishable. In that case the row drops back to ' +
          'provisional rather than showing an interval of ±0, which would claim a ' +
          'certainty nobody has.',
      ],
    },
    {
      heading: 'Corrections applied to the fit',
      body: [
        'Two effects are corrected inside the model rather than papered over in the ' +
          'interface:',
      ],
      bullets: [
        'Display position. Which answer appears first is randomised, and the residual ' +
          'first-slot advantage is fitted as its own term, so it is subtracted from the ' +
          'models rather than credited to whichever one happened to be shown first.',
        'Pairing volume. Each pair of models is normalised to contribute equal total ' +
          'weight, so one heavily-played matchup cannot drown out the others.',
      ],
    },
    {
      heading: 'Votes that are recorded but not counted',
      body: [
        'These are stored so the exclusion is auditable, and given zero weight in the ' +
          'fit:',
      ],
      bullets: [
        'Votes from visitors who are not signed in.',
        'A repeat of a question the same voter already ran, within the deduplication ' +
          'window.',
        'Battles where an answer named its own model and broke the anonymity the vote ' +
          'depended on.',
        'Votes flagged by the voting-pattern filter.',
      ],
    },
    {
      heading: 'No model scores another model',
      body: [
        'Every number on the leaderboard is computed by ordinary deterministic code ' +
          'from stored votes. There is no language model anywhere in the ranking path — ' +
          'the models write the two answers and nothing else.',
        'Ratings are recomputed by a batch job and read from a single stored snapshot, ' +
          'so the arithmetic never runs while you are waiting for the page. The snapshot ' +
          'carries the timestamp shown on the leaderboard.',
      ],
    },
    {
      heading: 'What this board cannot tell you',
      body: [
        'It measures which answer people preferred, on the questions people happened ' +
          'to ask, in the languages they asked them in. It does not measure factual ' +
          'accuracy, safety, cost, or speed, and a preference vote will reward a ' +
          'confident wrong answer over a hedged correct one.',
        'Treat it as one signal among several, and prefer the confidence intervals over ' +
          'the ordering.',
      ],
    },
  ],
};

const zh: RulesContent = {
  title: 'Arena 榜单规则',
  scope:
    `本榜排的是 GPTwiki 自己提供的三个模型——${MODEL_LIST}。它不是通用模型排名，` +
    '也不能与那些由数十个模型、数百万张票撑起来的榜单相提并论。',
  updated: '最后审阅：2026-08-10',
  sections: [
    {
      heading: '只有匿名票算数',
      body: [
        '一场对战会针对你自己的问题给出两份回答，标为 A 和 B，模型名称隐藏。你投票之后，才揭示' +
          '各是哪个模型。只有在模型隐藏状态下投出的票会进入榜单。',
        '这就是全部的反作弊设计，而且比任何附加过滤都更强：你不知道哪个是自己偏爱的模型，就无法' +
          '给它刷票。',
      ],
    },
    {
      heading: '评分用 Bradley-Terry，不是 Elo',
      body: [
        '每一张计入的票都是一次成对比较。我们用最大似然一次性拟合全部票，采用 Bradley-Terry ' +
          '模型——它正是为这类数据设计的标准统计模型——而不是像国际象棋 Elo 那样每打完一场就上下' +
          '调一点。',
        '分数按 Elo 量纲展示，便于直觉理解：平均强度的模型位于 1000 分，相差 400 分意味着强的' +
          '一方预期约 11 场胜 10 场。',
      ],
      bullets: [
        '平局按双方各得半场胜计。',
        '「两个都差」不作为胜负结果计入。它说明的是这道题的问题，而不是哪个模型更强——因此单独' +
          '成列展示，并排除在拟合之外。',
      ],
    },
    {
      heading: '排名是一个区间，因为单个数字会撒谎',
      body: [
        '每个分数都带 95% 置信区间，用夹心（稳健）协方差的闭式解计算。只有当两个模型的区间不重' +
          '叠时，它们才被分出先后；否则共享同一个排名区间。',
        '所以一行显示「1–2」，意思是数据确实分不出它与相邻模型的高低。这不是需要绕开的显示瑕疵' +
          '——这就是结论本身。',
      ],
    },
    {
      heading: `不足 ${DEFAULT_MIN_VOTES} 票不公布分数`,
      body: [
        `一个模型至少需要 ${DEFAULT_MIN_VOTES} 张计入票才会得到评分。在此之前该行标记为「暂定」，` +
          '只显示原始的胜、负、平计数。',
        '当统计本身算不出可用结果时同样如此——例如某个对阵组合的每一场恰好都以相同顺序展示，' +
          '此时模型强弱与展示位置在数学上无法区分。这种情况下该行退回「暂定」，而不是显示 ±0 的' +
          '区间——那会宣称一种没人拥有的确定性。',
      ],
    },
    {
      heading: '拟合中做的校正',
      body: ['有两种效应是在模型内部校正的，而不是在界面上敷衍过去：'],
      bullets: [
        '展示位置：哪份回答排在前面是随机的，并且把残余的「首位优势」作为一个独立参数拟合，' +
          '因此它被从模型身上减掉，而不是记在恰好排在前面的那一方头上。',
        '对阵场次：每一对模型被归一化为贡献相同的总权重，因此单个高频对阵无法淹没其余对阵。',
      ],
    },
    {
      heading: '会被记录但不计入的票',
      body: ['这些票会存下来以便排除过程可审计，并在拟合中赋权重 0：'],
      bullets: [
        '未登录访客投出的票。',
        '同一投票者在去重窗口内重复同一道题。',
        '回答中自报模型身份、破坏了该票所依赖的匿名性的对战。',
        '被投票模式过滤器标记的票。',
      ],
    },
    {
      heading: '没有任何模型给模型打分',
      body: [
        '榜上每一个数字都由普通的确定性代码从存量票算出。排名链路里没有任何大模型参与——' +
          '模型只负责写那两份回答，仅此而已。',
        '评分由批处理任务重算，页面只读一份存好的快照，因此算术永远不会发生在你等待页面加载的时' +
          '候。快照自带的时间戳会显示在榜单上。',
      ],
    },
    {
      heading: '这个榜单说明不了什么',
      body: [
        '它衡量的是：在人们恰好问出的那些问题上、用他们提问的语言，人们更偏好哪一份回答。它不衡' +
          '量事实准确性、安全性、成本或速度；而且偏好投票会让一个自信的错误答案胜过一个谨慎的正' +
          '确答案。',
        '把它当作多个信号中的一个，并且优先看置信区间，而不是看顺序。',
      ],
    },
  ],
};

const byLocale: Record<string, RulesContent> = { en, zh };

/** Pick authored prose for a locale, falling back to English. */
export function pickRulesContent(locale: string): RulesContent {
  return byLocale[locale] ?? en;
}

/**
 * True when `locale` reads the English fallback rather than its own prose.
 *
 * Delegates to the shared authored-locale list so the reader-facing notice, the
 * hreflang alternates, and the sitemap can never disagree about which locales
 * are really translated.
 */
export function isRulesFallback(locale: string): boolean {
  return !hasArenaCopy(locale);
}
