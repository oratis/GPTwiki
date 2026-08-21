# 外部榜单接入方案：让 `/arena/leaderboard` 不再是空页

> 调研日期：2026-08-21 · 数据实测截止：LMArena 榜单发布日 2026-08-19，Epoch 数据包 2026-08-21 06:15 UTC
> 上游方案见 [gptwiki-arena-plan.md](./gptwiki-arena-plan.md) · 竞品调研见 [arena-research.md](./arena-research.md)

## 0. 一句话方案

抓 **LMArena 官方发布的 CC-BY-4.0 榜单数据集**，作为一块**独立署名的「外部参考榜」**放进 arena，**绝不与 GPTwiki 自己的 BT 榜混排**。前者解决「页面是空的」，后者继续等自己的票——两块板子在数据、文档、组件、视觉上全程分离。

---

## 1. 需求与它自带的风险

需求很直接：`/arena/leaderboard` 自上线起就是空的（`0 votes, 0 battles`，见上游 §9），一个空榜单页对 SEO 和对读者都是负资产。先抓别家的榜占位。

风险同样直接，而且比需求更值得先说清楚：

> `/arena/rules` 已经公开承诺了这块板子是什么——「**Bradley-Terry ratings from anonymous head-to-head votes**」「本榜排的是 GPTwiki 所服务的三个模型」。把外部数字填进同一张表，等于把一句已公开的方法论声明变成假话。

上游方案 §4 反方第 1 点的原话是「**承诺了做不到的严谨，比不做榜伤害更大**」。往自家 BT 榜里灌外部数据，是这句话最直接的违反形式——比公布样本量不足的数字更糟，因为那至少还是自己的票。

所以本方案的第一条设计约束不是技术性的：

**外部数据永不进入 `arenaRatings/{scope}`，永不经过 `LeaderboardTable`，永不出现在没有署名的地方。**

---

## 2. 候选源调研

六个候选，实测逐一验证了可达性与授权边界。

| 源 | 数据性质 | 授权 | 机器可读 | 裁决 |
|---|---|---|---|---|
| **LMArena `leaderboard-dataset`** | BT 评分 + CI + 票数 + 排名 | **CC-BY-4.0** | HF datasets-server JSON，**免鉴权** | ✅ **选定** |
| **Epoch AI Benchmarking Hub** | 基准测试正确率 + stderr | **CC-BY-4.0**（两个子集为 Apache-2.0） | CSV（zip），固定 URL | ✅ 可用，本期不做（§7） |
| Artificial Analysis | 智能指数 + 速度 + 价格 | 免费层**仅限内部使用**，再分发需付费商业授权 | REST API，需 key | ❌ 否决 |
| OpenRouter Rankings | **token 用量**排名 | 需 API key；ToS 授予的是 OpenRouter 自己的权利，不是给我们的再分发许可 | REST，需 key | ❌ 否决 |
| HF Open LLM Leaderboard | 开源模型基准分 | 开放 | 已归档 | ❌ 否决 |
| AI HOT | 热点条目 | `/terms` 要求**书面授权** | 站点不可达 | ❌ 上游 §8 已裁定不接 |

三条否决理由值得记下来，避免以后重复调研：

1. **Artificial Analysis** 的免费 API 明确要求署名**且仅限内部使用**；面向用户的产品、出版物与数据流需要付费商业授权。放在公开页面上就是越权，无论署名做得多好。
2. **OpenRouter Rankings** 排的是**用量**不是**质量**。就算授权没问题，把「最多人调用」摆在一个叫 leaderboard 的页面上，读者会读成「最好」。这是一个比缺数据更坏的误导。何况它需要 API key，与本仓库「批处理任务保持 keyless」的既有姿态冲突。
3. **Open LLM Leaderboard** 2025 年起转为静态归档快照，且只收开源模型——GPTwiki 服务的三个全是闭源，一条都不会出现。

---

## 3. 选定源的实测细节（LMArena）

### 3.1 数据集

`huggingface.co/datasets/lmarena-ai/leaderboard-dataset` —— **LMArena 官方自己发布的**榜单数据集，不是第三方抓取。

| 项 | 实测值 |
|---|---|
| 授权 | `cc-by-4.0`（HF 元数据 `license` 字段） |
| 规模 | 2,197,233 行 / 109 MB / 44 个 split |
| 最后更新 | 2026-08-20T03:04:38Z（**每日维护**） |
| config | 22 个：`text` / `vision` / `search` / `document` / `webdev` / `agent` / `text_to_image` / … 及各自的 `style_control` 变体 |
| split | `latest`（最新一期）与 `full`（全部历史快照） |

`text/latest` 一个 split 就有 10,359 行（全部分类 × 全部模型），其中 `category='overall'` 有 **393 行**，榜单发布日 **2026-08-19**。

### 3.2 schema 与我们自己的 `ArenaModelRating` 几乎同构

```
model_name  organization  license  rating  rating_lower  rating_upper
variance    vote_count    rank     category  leaderboard_publish_date
```

实测第一行：

```json
{ "model_name": "claude-opus-5-high", "organization": "anthropic",
  "license": "Proprietary", "rating": 1505.097, "rating_lower": 1500.185,
  "rating_upper": 1510.010, "vote_count": 25628, "rank": 1,
  "category": "overall", "leaderboard_publish_date": "2026-08-19" }
```

对照 [types/arena.ts](../src/types/arena.ts) 的 `ArenaModelRating`：`rating→score`、`rating_lower→ciLow`、`rating_upper→ciHigh`、`vote_count→votes`、`rank→rankLow/rankHigh`。**同构不是巧合**——上游方案 §3 就是照抄 LMArena 的统计口径设计的，所以两块板子读起来是同一种语言，只是票源不同。

这一点有个副作用值得警惕：**正因为长得像，混排的诱惑才大，误导才严重。** §4 的分离约束因此不是洁癖。

### 3.3 取数方式：零新依赖

HF 的 **datasets-server** 提供 JSON 行接口，免鉴权：

```
GET https://datasets-server.huggingface.co/rows
      ?dataset=lmarena-ai%2Fleaderboard-dataset
      &config=text&split=latest&offset=0&length=100
```

实测要点：

- **单次上限 100 行**，靠 `offset` 翻页。`overall` 393 行 ⇒ 4 次请求足够，我们只取前 100 名 ⇒ **1 次请求**。
- 行序已按 `category` 分组、组内按 `rank` 升序，`overall` 在最前，**无需自己排序**。
- `/filter` 端点对该数据集返回 `{"error":"Unexpected error."}`，**不可用**——必须走 `/rows` + 客户端过滤。这条是实测踩出来的，别再试 `/filter`。
- 直接读 parquet 需要新依赖；datasets-server 走 JSON，**`fetch` 即可，零新依赖**，与仓库既有纪律一致。

### 3.4 我们服务的三个模型，只有一个在榜上

拿 [models.ts](../src/lib/models.ts) 的 `SERVED_MODELS` 去比对 `overall` 393 行：

| GPTwiki 服务的 | LMArena `overall` |
|---|---|
| `claude-sonnet-4-6` | ✅ **精确命中** |
| `gpt-4o` | ⚠️ 无精确匹配，只有 `gpt-4o-2024-05-13` / `chatgpt-4o-latest-20250326` 等版本变体 |
| `gemini-2.0-flash` | ❌ **完全不在榜上** |

这条实测结果本身就是本方案最有力的论据：**外部榜排的是另一批模型，不是我们这三个。** 任何「拿外部分数当我们模型的分数」的写法都会立刻撞上 `gemini-2.0-flash` 这个洞。

处理方式：外部榜**照原样呈现它自己的模型**，并对能对上的行做标注（「GPTwiki 也提供这个模型」）；对不上的**明确写出来**，而不是悄悄留白。

---

## 4. 设计裁决

| 争点 | 裁决 | 理由 |
|---|---|---|
| 外部数据放哪 | **独立文档 `arenaRatings/reference`**，独立组件，独立页面 `/arena/reference` | 与 `arenaRatings/{scope}` 物理隔离。[ratings.ts](../src/lib/arena/ratings.ts) 的 `isRatingSnapshot()` 形状守卫已经会拒绝异形文档，`normalizeScope()` 对 `reference` 也回落到 `overall`——两道既有防线免费复用 |
| 要不要混排进 BT 榜 | **绝不。** 两张表、两个标题、两套署名 | §1。且 §3.4 证明它们排的根本不是同一批模型 |
| 空态怎么办 | `/arena/leaderboard` 的诚实空态**保留原文**，其下增加一块明确标注的外部榜摘要 + 指向 `/arena/reference` 的链接 | 空态是承诺的一部分，不能因为有了别人的数据就改口说自己有数据 |
| 署名做到什么程度 | 每一个渲染外部数据的地方都带：源名、源链接、授权名 + 授权链接、**榜单发布日**、抓取时间 | CC-BY-4.0 的硬要求。发布日单列是因为它和我们的 `computedAt` 是两个时间，混淆会让读者以为数据是我们算的 |
| 取多少行 | `overall` 前 **100** 名 | 一次请求拿完；100 名之后对读者无信息量 |
| 更新频率 | 与 `arena-snapshots.yml` 同一 workflow，手动触发起步 | 上游 §5 Phase 1.5 的既有姿态。LMArena 每日更新，我们不必更快 |
| 分类切片要不要抄 | **不。** 只取 `overall` | 我们自己的 scope 分类（coding/math/…）与 LMArena 的分类命名不一致，映射是猜测。猜出来的对应关系摆在署名数据旁边尤其糟 |
| 能不能索引 | `/arena/reference` **可索引**，进 sitemap static shard，alternates 收窄到 `ARENA_LOCALES` | 它是有实质内容、有署名、有出处的页面，不是薄内容。与既有四个可索引 arena 路由同规格 |
| LLM 参与吗 | **零参与**，与上游 §3 的架构纪律一致 | 抓取 → 校验 → 落库全是确定性代码 |

---

## 5. 数据模型

```
arenaRatings/reference   {
  sourceId:        'lmarena'
  sourceName:      'LMArena'
  sourceUrl:       'https://lmarena.ai/'
  datasetUrl:      'https://huggingface.co/datasets/lmarena-ai/leaderboard-dataset'
  license:         'CC BY 4.0'
  licenseUrl:      'https://creativecommons.org/licenses/by/4.0/'
  board:           'text · overall'
  publishedAt:     '2026-08-19'      // 榜单自己的发布日，非我们的抓取日
  fetchedAt:       <unix ms>
  rows: [{ rank, modelName, organization, modelLicense,
           rating, ratingLow, ratingHigh, votes, served }]
}
```

`served` 是布尔量，标记该行是否对应 GPTwiki 实际提供的模型（§3.4 的精确匹配）。**只做精确匹配**——`gpt-4o` 对上 `gpt-4o-2024-05-13` 是版本猜测，署名数据旁边不做猜测。

页面读**一个文档**，与既有 arena 页面读放大恒定为 1 的设计一致。

---

## 6. 合规

CC-BY-4.0 允许商业使用与再分发，**要求署名**。落实到代码里的三条硬性要求：

1. 每个渲染外部数据的组件都必须显示源名 + 源链接 + 授权名 + 授权链接。**署名不是脚注里的一行小字，是组件的必需 props**，缺了 TypeScript 就不给过。
2. 榜单发布日与我们的抓取时间**分开显示**，不合并成一个「更新时间」。
3. 数据**不改写**：不重标定分数、不重新排名、不换量纲。原样呈现 + 署名，是 CC-BY 下最没有争议的用法；一旦开始「归一化到我们的量纲」，就变成了衍生作品，署名义务与解释义务都会变重。

Epoch AI 若接入，署名文案用其 README 指定的原文：
`Epoch AI, 'AI Benchmarking Hub'. Published online at epoch.ai.`

---

## 7. 分期

### 本期（Phase R1）——LMArena 外部参考榜

| 文件 | 作用 |
|---|---|
| `src/types/arena.ts` | 加 `ArenaReferenceRow` / `ArenaReferenceBoard` |
| `src/lib/arena/reference.ts` | 纯函数：HF 行 → 我们的行，含校验与 `served` 标记 |
| `scripts/test-arena-reference.ts` | 单测：字段映射、脏数据拒绝、`served` 只精确匹配、排序稳定 |
| `src/lib/arena/ratings.ts` | `getReferenceBoard()` / `writeReferenceBoard()` |
| `scripts/compute-arena-reference.ts` | 抓取 + 落库，默认 dry-run |
| `src/components/arena/ReferenceBoard.tsx` | 带强制署名 props 的表格组件 |
| `src/app/[locale]/arena/reference/page.tsx` | 可索引页面 |
| `src/app/[locale]/arena/leaderboard/page.tsx` | 空态下方挂外部榜摘要 |
| `ArenaNav` / sitemap / i18n | 新增 tab、进 static shard、en + zh 文案 |
| `.github/workflows/arena-snapshots.yml` | 加一步 |

### 下一期（Phase R2）——Epoch AI 基准分，本期不做

调研已完成，可直接开工，但**本期刻意不做**，三条理由：

1. **数据形状不同**。Epoch 是「模型 × 基准 × 正确率 ± stderr」，不是「模型 × 评分 ± CI」。它需要第二套数据模型与第二个 UI，而本期的目标是让页面不空——一个源已经完全达成。
2. **打包方式带来真实成本**。只提供 `https://epoch.ai/data/benchmark_data.zip`（实测 454 KB，约 22 个 CSV：`gpqa_diamond` / `math_level_5` / `swe_bench_verified` / `frontiermath` / `simpleqa_verified` / `aider_polyglot_external` / …）。Node 无内置解压，要么加依赖，要么在脚本里外挂 `unzip`——两条都与本仓库的既有纪律有摩擦，值得单独决策而不是顺手塞进本期。
3. **它回答的是另一个问题**。LMArena 答「人更喜欢哪个」，Epoch 答「哪个做对的题多」。两者并列有价值，但那是一个产品决定，不是占位需求的一部分。

实测已确认可用的信息记在这里，下期直接取用：授权 CC-BY-4.0（`aider_polyglot` 与 `terminal-bench` 衍生数据为 Apache-2.0），列为 `Model version, mean_score, Best score (across scorers), Release date, Organization, Country, Training compute (FLOP), stderr, …`，包内 `README.md` 自带署名与 BibTeX 原文。

---

## 8. 验收标准

2026-08-21 实测结果：

- [x] 外部数据不出现在 `arenaRatings/{overall,locale:*,category:*}` 任一文档——写入目标固定为 `arenaRatings/reference`
- [x] `LeaderboardTable` 的 props 类型不接受外部行：`ArenaReferenceRow` 与 `ArenaModelRating` 是两个独立类型，互传编译不过
- [x] `?scope=reference` 回落到 `overall`（`test-arena-views.ts` 新增用例，连 `category:reference` / `locale:reference` 一并覆盖）
- [x] `/arena/reference` 可见完整署名：`Data by LMArena · dataset · CC BY 4.0`，三个链接分别指向 lmarena.ai / HF 数据集 / CC 授权原文
- [x] 榜单发布日与抓取时间分两处显示：`Published by source: 2026-08-19 · Retrieved: 2026-08-21 06:28 UTC`
- [x] `/arena/leaderboard` 空态原文**逐字未改**，外部榜在其下方，带独立标题「In the meantime, a board that does have votes」
- [x] `gpt-4o` 与 `gemini-2.0-flash` 不在外部榜上这一事实被显式呈现（实测文案：「LMArena does not rank these models that GPTwiki serves: gpt-4o, gemini-2.0-flash」）
- [x] `/arena/reference` 进 `/api/sitemap?page=static`，实测 3 条 alternates（en / zh / x-default），`/arena/b/*` 仍不在任何 shard
- [x] 抓取链路零 LLM 调用
- [x] `npm test` 6 套件 102 例全绿；`typecheck` 干净；`lint` 仅剩 `donate/page.tsx` 那条既有告警

实测中被测试抓到的一件事，记在这里以免复发：

> **`Number(null)` 是 `0`，而 `0` 是有限数。** 第一版的数值转换用 `Number(value)` + `Number.isFinite()`，于是源站省略了 `rating` 的行不会被拒绝，而是以**评分 0** 落库——一个我们凭空造出来、却挂在 LMArena 名下的数字。这正是「转载」这件事最不能犯的错。改为只接受真正的 `number` 或非空数字字符串；`null` / `''` / `false` / `true` 一律拒绝。测试用例 `a row missing any load-bearing number is dropped, not repaired` 就是为此存在的。

---

## 9. 明确不做

- 不把外部分数当作 GPTwiki 三个模型的分数
- 不做版本模糊匹配（`gpt-4o` ≠ `gpt-4o-2024-05-13`）
- 不重标定、不重排、不换量纲——原样 + 署名
- 不抄 LMArena 的分类切片去对应我们的 scope（映射是猜测）
- 不接需付费商业授权才能再分发的源（Artificial Analysis）
- 不把用量榜当质量榜（OpenRouter）
- 不在请求路径抓取任何外部站点
