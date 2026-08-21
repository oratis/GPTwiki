# GPTwiki Arena 建设方案（二级页面）

> 起草日期：2026-08-10 · 最后复核：2026-08-21 · 状态：Phase 0–3 代码全部落地；快照调度与冷启动未解决（见 §5 Phase 1.5 与 §9）
> 调研依据见 [arena-research.md](./arena-research.md)

## 0. 一句话方案

在 `/[locale]/arena/*` 下建一个二级产品：**匿名双模型对战 → 投票 → 公开模型榜**，并把 arena.ai 的统计口径与 aihot 的「LLM 只打分、代码算总分」纪律一并抄进来。差异化在于——**arena.ai 的对战结束后对话就没了，GPTwiki 的对战会留下一篇可检索的百科文章**。

---

## 1. 为什么是 GPTwiki 能做这件事

三个现成条件，缺一件这方案都不成立：

| 条件 | 现状证据 |
|---|---|
| 三模型统一流式抽象 | `getAIStream(model, messages, apiKey)` @ [provider.ts:22](../src/lib/ai/provider.ts#L22)，Claude/GPT/Gemini 已归一 |
| 15 语种 + hreflang + sitemap 机器 | `supportedLocales` × `generateStaticParams`，[layout.tsx:36-39](../src/app/[locale]/layout.tsx#L36) 已自动生成 alternates |
| 「对话变文章」的发布闭环 | `generateWikiContent()` + `POST /api/wiki` 已在生产跑通 |

再加一个**已存在的缺陷**给了这个方案一个顺手的理由：

> `GET /api/leaderboard`（[route.ts](../src/app/api/leaderboard/route.ts)）**在 `src/` 里没有任何消费方**。`grep -rn "api/leaderboard" src` 只命中 `types/index.ts` 的一条注释。`docs/project-review-2026-06.md` 把「排行榜」记为「✅ 完整」，但实际上是一个上线了却没有页面的端点。i18n 里 `leaderboard.title` / `leaderboard.wikis` 两个 key 也是 15 语种全翻译好、无人使用。

Arena 给它一个家。

---

## 2. 信息架构

```
/[locale]/arena                  概览页：定位说明 + 榜单快照 + 三个入口
/[locale]/arena/battle           对战：一个问题 → 两个匿名模型 → 投票 → 揭示（Phase 1）
/[locale]/arena/leaderboard      模型榜（BT 分 ±CI、票数、Pareto 视图）
/[locale]/arena/rules            方法论公开页（可索引、可引用）
/[locale]/arena/contributors     贡献者榜（收养孤儿端点）
/[locale]/arena/b/[id]           对战永久链接（noindex，仅供分享，Phase 1）
```

> `/arena` 定为概览页而非对战页：Phase 0 不含任何 AI 调用，若把 `/arena` 留给对战，导航目标在 Phase 0 就是 404 或「敬请期待」占位。概览页本身有实质内容（定位、榜单、规则入口），对战另开 `/arena/battle`。

API：

```
POST /api/arena/battle           建对战 + 并发流式两路回答
POST /api/arena/vote             记票（a | b | tie | both_bad）
GET  /api/arena/leaderboard      读快照（不在请求路径算 BT）
GET  /api/arena/battle/[id]      揭示后的对战详情
POST /api/arena/publish          把胜方回答走既有 wiki 创建路径发布
```

Firestore：

```
arenaBattles/{id}   prompt, promptHash, locale, category, modelA, modelB,
                    answerA, answerB, order(随机), voterKey, createdAt, status
arenaVotes/{id}     battleId, winner, voterId, weight, anonymous, flags[], createdAt
arenaRatings/{scope} 聚合快照：{ models: [{model, score, ciLow, ciHigh, votes,
                    wins, losses, ties, rankLow, rankHigh, provisional}],
                    totalVotes, computedAt, method }
```

`scope` 起步只有 `overall` 一个文档。**页面永远只读一个 doc**，读放大恒定为 1。

---

## 3. 排名口径（= `/arena/rules` 页要公开的内容）

全部照抄 arena.ai 已验证的做法，理由见调研 §2.5：

1. **BT（Bradley-Terry）最大似然拟合**，不是 Elo 在线更新。平局按双方各半计入；「两个都差」**不进 BT**，单独作为一列 `bothBadRate` 展示。
2. **展示分**：`1000 + (400/ln10) × θ`，锚定到中位模型 = 1000。与 Elo 同量纲，便于直觉理解。
3. **置信区间用闭式解**（M-estimator + CLT），不用 bootstrap。arena 在 2025-07-23 做了同样的替换，结果等价而计算量大降——这直接决定了重算能否常态化。
4. **排名是区间**：显示 `rankLow–rankHigh`（统计上不能区分的模型并列），而不是把顺序当事实。
5. **入榜门槛**：单模型 < 100 张有效匿名票时标记 `provisional`，**不显示 BT 分**，只显示原始胜/负/平计数。
6. **位置偏差进模型**：A/B 顺序随机化，且在 BT 拟合里带一个位置项回归掉。
7. **反比重加权**：按模型票量反比加权，避免新模型被老模型的票量淹没。

反作弊（直接当验收清单用）：

| 措施 | 来源 |
|---|---|
| 只有**匿名**对战的票进榜（揭示后不可改票） | arena FAQ 原文规则 |
| `promptHash` 去重：同一 voter 24h 内重复同题 → 记录但 `weight: 0` | arena 2025-07-14（其去重过滤掉约 10% 的票） |
| 身份泄露过滤：回答里自我介绍（"I'm Claude…"）→ 该场作废 | arena 2025-07-14（过滤 <4%） |
| 异常投票模式降权（投票速度、单边胜率偏斜） | arena 2025-09-17 |
| 仅登录用户的票 `weight: 1`；匿名访客可对战可看揭示，票记 `weight: 0` | 本项目决定，最省事的 Sybil 防御 |

**架构纪律（来自 aihot）**：榜上每一个数字都由确定性代码从存量票算出。**LLM 在排名链路里没有任何角色**——它只负责生成那两段回答。调权重是改公式系数，不是改 prompt。

---

## 4. 正反辩论

### 正方（该做，且现在做）

1. **这是 GPTwiki 手上最高意图的 SEO 面。** 站内十万级页面全是「某事物是什么」的信息型意图；「哪个模型更适合做 X」是决策型意图，商业价值与外链吸引力高一个量级。而 `/arena/rules` 这类方法论页是天然的被引用对象，成本近乎零。
2. **15 语种是不可复制的护城河。** arena.ai 与所有同类榜单都是纯英文。GPTwiki 的 hreflang/sitemap 机器已经跑通，同一个榜单页乘以 15 是**零增量工程**——`generateStaticParams` + `localeHref` 已就位。
3. **零新基建。** 复用 `getAIStream`、`resolveApiKeyForUser`、`checkRateLimit`、`consumeFreeQuota`、Firestore、locale layout、sitemap static shard。Phase 0 更是纯只读页面。
4. **顺手修掉一个真实缺陷**：孤儿 `/api/leaderboard` + 15 语种白翻的 `leaderboard.*` key（见 §1）。
5. **机制上不是抄。** arena.ai 投完票对话即弃；GPTwiki 的立项前提就是「好对话不该消失」。「对战 → 发布成文章」是新机制，且正好复用已在生产验证的发布链路。
6. **两边调研收敛到同一条便宜的设计纪律**（LLM 出分项、代码算总分），实现面小、可测试、无歧义。

### 反方（别做，或砍到面目全非）

1. **没有投票量的投票榜，比没有榜更糟。** arena.ai 的 agent 榜有 1,665,514 个 session，文本榜单模型票数十万级。GPTwiki 的量级看 `docs/project-review-2026-06.md` 的原话：「少量用户 UGC」。在这个流量下，BT 分的 CI 会在数月内保持 ±150 量级——**页面会公开一堆统计上无意义、却摆出权威姿态的数字**。更糟的是你还专门做了一页 `/arena/rules` 承诺严谨。**承诺了做不到的严谨，比不做榜伤害更大。**
2. **BYOK 让对战对绝大多数用户结构性不可用。** `free-quota.ts` 的注释是明写的产品决定：「Off by default: the platform bears no AI cost unless the operator explicitly enables a free tier（product decision 2026-06: BYOK-only）」，`DEFAULT_DAILY_LIMIT = 0`。而一场对战需要**两个不同厂商**的 key。真实漏斗：用户想投票 → 被要求粘贴两个 API key → 离开。要么擂台是空的，要么平台吃下 2× token 成本并推翻一个有记录的产品决定。**二者都得付代价。**
3. **只有 3 个模型。** `AIModel = 'claude' | 'gpt' | 'gemini'`（[types/index.ts:1](../src/types/index.ts#L1)），而 `models.ts` 至今把 `gpt` 显示为 **"GPT-4"**——连展示名都已经漂移了。3 个模型的榜对着 arena.ai 的 50+，不是产品是脚注。而且模型每加一个，撑起有意义 CI 所需的票量就翻一档。
4. **量产 AI 页面的 SEO 风险，这个仓库已经裁过一次了。** `docs/auto-content-cron-plan.md` §7 的裁决原文：sitemap 路由把 `wikis` 里每一条文档（无 status 过滤）即时推入带 hreflang 的索引地图，一旦被判 scaled content abuse，受损的是存量十万+页面。**对战永久链接正是那个形状**：一题两段 AI 回答、薄、近重复、可无限量产。任何泄漏进 sitemap 都是重复该风险。
5. **零测试的仓库里塞统计代码。** review 报告：全仓无任何单测/E2E。BT/MLE + CI 是这个仓库里**第一段「错了也照样返回合理数字」的代码**——梯度符号写反，榜单依然长得像个榜单。在没有测试基建的地方引入统计，就是量产自信的错误排名。
6. **aihot 那一半根本迁不过来。** 它的价值是 168 个精选信源 + 回测 100+ 组参数的打分公式，那是三年自媒体运营积累出的**运营资产**，不是页面布局。抄了外壳（规则页、热榜）而没有信源管线，得到的是一个没有热点的热榜。另外，其数据的商业/镜像/再分发**需要书面授权**（`/terms`），任何「接入 AI HOT 数据」的想法在法务上先卡死。

### 裁决

**反方赢下了排名产品，正方赢下了页面与机制。** 所以：**做，但把顺序倒过来——先出透明度与产物，最后出排名；并且绝不公布数据撑不起的数字。**

| 争点 | 裁决 |
|---|---|
| 榜单要不要先上 | **不。** 先上 `/arena/rules` + `/arena` 对战。榜单页照样上线，但**默认渲染 provisional 状态**：单模型有效匿名票 < 100 时不显示 BT 分，只显示原始胜/负/平，并挂明确横幅说明「样本量不足，尚无统计意义」。**数字永不越权。** |
| BYOK vs 平台 key | 对战对**只从用户已配置 key 的厂商中抽取**；只有一个 key 的用户进**单模型模式**（仍产出文章，不产生票）。另加 `ARENA_FREE_DAILY_BATTLES`，**默认 0**，与 `FREE_DAILY_MESSAGES` 同一姿态——运营方可以选择自费开闸，但代码不推翻 BYOK 决定。 |
| 3 个模型太薄 | 接受并改口径：明确排的是**「GPTwiki 实际提供的三个模型配置」**，规则页第一句就写「本榜排的是 GPTwiki 所服务的三个模型，不是通用模型排名」。同时修掉 `models.ts` 的展示名漂移。**不假装对标 arena.ai。** |
| 对战页 SEO | `/arena/b/[id]` 强制 `robots: { index: false, follow: false }`，且**从所有 sitemap shard 排除**。硬性要求，与 §7 既有裁决一致。只有 `/arena`、`/arena/leaderboard`、`/arena/rules`、`/arena/contributors` 可索引。 |
| 无测试仓库里的统计代码 | BT/CI 代码**必须与本仓库的第一批单测一同落地**：已知答案用例（对称数据 → 同分；单边压制 → 高分；平局 → 各半；n 增大 → CI 收窄；位置项可识别）。**无测试不合并。** 用 `node:assert` + 已有的 `tsx` devDependency，**零新依赖**。 |
| BT 在哪算 | **绝不在请求路径。** `scripts/compute-arena-ratings.ts` 写快照到 `arenaRatings/{scope}`，页面读一个 doc。触发**先手动**（`workflow_dispatch`），与 auto-content 的裁决一致；观察数轮干净产出后再开 `schedule:`。 |
| aihot 管线 | **不克隆新闻管线。** 只取两条可迁移物：(a) LLM 出分项、代码算总分；(b) 公开规则页。(a) 后续用在 `/arena/hot`——排的是 **GPTwiki 自己的文章**（views / threadCount / 新鲜度 / `source` 三级权重，全是已有字段），不是外部新闻。归入 Phase 3，不阻塞。**不接入 AI HOT 任何数据**（需书面授权）。 |
| 匿名访客投票 | 登录用户 `weight: 1`；匿名访客可对战、可看揭示，票以 `weight: 0` 落库并排除出 BT。不做验证码、不做指纹。 |
| 15 语种文案 | 规则页正文只人工撰写 **en + zh**，其余语种走既有 `getTranslations` 回落到 en 的机制（[server.ts](../src/lib/i18n/server.ts) 已如此实现）。**不机器翻译一整页方法论**——`auto-content-cron-plan.md` 已裁过「多语种审核疲劳 → 橡皮图章」。已知缺口，记为后续人工翻译项。 |

---

## 5. 分阶段实施

### Phase 0 — 透明度与骨架（无 AI 成本、无滥用面）✅ 已落地

纯只读页面 + 纯函数 + 测试。**这一阶段一行 AI 调用都没有。**

| 文件 | 作用 |
|---|---|
| `src/lib/arena/scoring.ts` | BT MLE + 闭式夹心 CI + rank-with-spread + 按对归一化 + 位置项。**纯函数，零 I/O** |
| `scripts/test-arena-scoring.ts` | 本仓库第一批单测，16 例（`node:assert` + 既有 `tsx`，零新依赖，`npm test`） |
| `src/lib/arena/ratings.ts` | `arenaRatings/{scope}` 快照读写 |
| `src/lib/arena/rules-content.ts` | 规则页正文（en 撰写 + zh 撰写，其余回落 en） |
| `src/lib/arena/metadata.ts` | arena 可索引页的 canonical + 15 语种 hreflang |
| `src/types/arena.ts` | `ArenaBattle` / `ArenaVote` / `ArenaModelRating` / `ArenaRatingSnapshot` |
| `src/app/[locale]/arena/page.tsx` | 概览页 + 榜单快照 |
| `src/app/[locale]/arena/leaderboard/page.tsx` | 榜单页，读快照；无快照时诚实空状态 |
| `src/app/[locale]/arena/rules/page.tsx` | 方法论公开页（可索引、全静态） |
| `src/app/[locale]/arena/contributors/page.tsx` | 收养 `getTopContributors` 与白翻 15 语种的 `leaderboard.*` |
| `src/components/arena/{ArenaNav,LeaderboardTable}.tsx` | 二级导航 + 榜单表格 |
| sitemap `static` shard | 加入 4 个可索引 arena 路由；`/arena/b/*` 明确排除 |
| i18n keys | `arena.*` + `header.arena`，en + zh 撰写，其余回落 |
| `src/lib/models.ts` | 顺手修掉 `gpt` → `GPT-4` 的展示名漂移（改为 `GPT-4o`） |

落地过程中被测试抓到的两件事，都记在这里以免复发：

1. **构造测试数据时把「胜者」固定放在 A 位，拟合会（正确地）把整个效应算成位置偏差**，实测 δ = 5.876 而模型分被拉平。这不是 bug 而是位置项在起作用——但它说明**任何对战数据生成器都必须随机化 A/B 顺序**，否则榜单会把「先出现」当成「更强」。测试里的 `matchup()` 辅助函数因此把每一类结果都在两个位次上对半分。
2. **单一对阵 + 固定位次时，强度与位置完全共线，强度方差会因数值抵消变成非正数**。此时若照常输出，CI 宽度是 ±0——「精确到点的确定性」，是这个榜单能公布的最糟糕的数字。代码因此改为：**协方差算不出来时该行退回 provisional**，而不是显示 ±0。

### Phase 1 — 对战与投票（BYOK 闸门后）✅ 已落地

`POST /api/arena/battle` 用**单条 SSE 流**并发推送两路回答（`meta` / `chunk` / `fail` / `done`），模型对从**用户已有 key 的厂商**中随机抽取并随机化 A/B 位次；`POST /api/arena/vote` 落票并**在此刻且仅在此刻**揭示身份；`/arena/b/[id]` 永久链接（noindex）。`scripts/compute-arena-ratings.ts` 手动触发重算，同时写 `overall` / `locale:*` / `category:*` 三类 scope。

实现中做出的几个非显然决定：

| 决定 | 原因 |
|---|---|
| **不复用 `resolveApiKeyForUser`**，新写 `battle-keys.ts` | 该函数把「有没有 key」和「扣一次配额」耦合在一起。对战需要先知道能用哪些模型再选对，且必须**两边一起解析**——逐个解析会在第一个模型上扣掉配额、然后在第二个上失败，用户为一场没发生的对战付了钱。 |
| 战斗文档**只在两路都成功后写一次** | Firestore 可以先拿 id 不写盘。因此不存在「一场只有半个回答的对战」被投票的窗口。 |
| `answersReadyAt` **由服务端写入**，不接受客户端传入 | 否则「三秒阅读时间」检查一行代码就能绕过。 |
| 投票文档 id 取 `${battleId}_${voterId}` + `create()` | 一场一票靠 ALREADY_EXISTS 原子拒绝，比 read-then-write 无竞态。 |
| `promptHash` 反范式化到投票文档上 | 去重查询变成一次 `arenaVotes` 查询，而不是「查票 + 扇出查战斗」。 |
| 每场对战按**场**计一次平台配额，而非按回答计两次 | 用户问了一个问题；为他没选的那两边各扣一次，配额数字会变得没法读。 |
| **不做「谁总投同一边」的过滤** | 这种规则在某个模型确实明显更好时会惩罚诚实投票者，且无法与刷票区分。所有过滤只针对「读两份回答的人不可能做出的行为」。 |
| 分类在 Phase 1 就写入 | 代码关键词匹配（非 LLM——AI HOT 的教训），零延迟零成本，且避免 Phase 2 回填。 |

### Phase 1.5 — 上线前必须做的运维项 ⚠️ 未完成

- [ ] `firestore.indexes.json` 已加 `arenaVotes (voterId, createdAt)`，**部署前需 `firebase deploy --only firestore:indexes`**，否则去重查询会报缺索引。**截至 2026-08-21 无执行证据。**
- [x] `scripts/compute-arena-ratings.ts` 默认 dry-run；观察数轮干净输出后再考虑上 schedule。
- [x] **调度本身**。Phase 1/3 落地了两个 compute 脚本却**没有任何调用方**——`grep -rn "compute-arena"` 只命中它们自己的注释。`arenaRatings/*` 因此一个文档都没写过，榜单与热榜永久停在空状态。2026-08-21 补 `.github/workflows/arena-snapshots.yml`（`workflow_dispatch` 起步，schedule 段注释掉）。
- [ ] **WIF 仓库变量未配置**。`gh variable list` 为空 ⇒ `GCP_WIF_PROVIDER` / `GCP_SEED_SA` 都没设，所以 `auto-seed`（**从未运行过**，`gh run list` 返回 `[]`）、`sitemap-shards`（每周"成功"实为自跳过）与新加的 `arena-snapshots` **全部会自跳过**。在配好之前，两个快照只能本地用 ADC 跑。

### Phase 2 — 分类与视图 ✅ 已落地

按 arena 的演化规律：**先总榜，等票量撑得起子榜 CI 再拆**。分类在建对战时由代码按 tag 归类（不是让 LLM 分类——aihot 的教训）。加 Pareto 视图（分数 × 价格），三模型时反而好读。

落地物：`scopes.ts` / `ScopePicker.tsx` / `ParetoView.tsx` / `pricing.ts`。**遗留缺口**：Pareto 视图依赖 `ARENA_MODEL_PRICING`，该变量此前未写入 `.env.example`（2026-08-21 已补），生产未设 ⇒ 即使榜单有分，"Rating vs cost" 页签也是空的。

### Phase 3 — 闭环与文章热榜 ✅ 已落地

`POST /api/arena/publish`：胜方回答走既有 wiki 创建路径，文章上标注「产自 Arena 对战 #id」。`/arena/hot`：把 aihot 的分工原则用在 GPTwiki 自有语料上——LLM 出分项，代码用 `views` / `threadCount` / 新鲜度 / `source` 三级权重（`editorial` > 用户 UGC > `wikipedia-*`）算总分与阈值。

**热榜上线后实测抓到的三件事**（2026-08-21，全部已修）：

1. **`sourceTier()` 把站内最好的原创判成了镜像。** 语料里 34 篇 `source: 'hand-authored'` 的早期原创（浏览量全站最高，`书信` 2,210）不匹配任何已知前缀，落进 `mirror` 默认分支——0.35 权重 + 镜像门槛。`translate-live.ts` 给它们的译文打的是 `editorial`，原文却漏了。已加映射。
2. **三档门槛里有两档在数学上不可达。** 12/18/45 抄自 AI HOT 的示例数值，但那是**原始互动量**的量纲，这里的分数经过 `log1p` 压缩且**已经**被 tier 权重打过折。拿打折后的分去比更高的门槛 = 同一件事罚两遍：`mirror` 的 raw 上限（百万浏览 + 满新鲜度 + 满质量分）只有 8.34，永远够不到 45；`user` 上限 17.86 也够不到 18。**榜是被算术清空的，不是被编辑标准清空的。** 已改为门槛比 raw（权重前），并重标为 6/7/9——tier 权重继续决定**排序**，门槛只决定**准入**。
3. **默认窗口比站点自身的更新节奏还窄。** `--days=60` 对线上语料返回 0 行，因为那批最该上榜的原创最后更新在 60–90 天前。默认改为 90。

三件事**测试全绿也没抓到**：原有 fixture 用的是 `views: 4000, threadCount: 3` 这类真实语料达不到的数字，且只断言**相对排序**，从不断言门槛**是否够得到**。已补 `assertThresholdsReachable()` + 五条用例（可达性、准入不重复罚 provenance、纯新鲜度不得上榜、门槛换算成浏览量后必须可信）。这类失败是无声的：够不到的门槛不会抛错，只会返回空列表，而空列表和"今天没热点"长得一模一样。

---

## 6. 成本

| 项 | 量级 |
|---|---|
| Phase 0 | **$0**。纯静态页 + 一个 Firestore doc 读 |
| Phase 1 对战 | 2× 单次生成。默认 BYOK ⇒ **平台成本 0**；`ARENA_FREE_DAILY_BATTLES` 默认 0 |
| 重算 BT | 闭式 CI，三模型量级下毫秒级；Cloud Run Job 每次 < 1 分钱 |
| Firestore | 每场对战 1 写 + 1 票写；页面读恒定 1 doc |

**默认配置下这个二级产品的平台边际成本是零**——这一条是它值得做的核心财务前提。

---

## 7. 验收标准

Phase 0 实测结果：

- [x] `npm run typecheck` 干净；`npm run lint` 仅剩 1 条既有告警（`donate/page.tsx`，与本次无关）
- [x] `npm test` 16/16 通过
- [x] `/arena/leaderboard` 在**无任何数据**时渲染诚实空状态（本地无 Firestore 凭据，实测走的正是这条路径）
- [x] 任一模型票数 < 100，或协方差算不出时，该行显示 `provisional` 且无 BT 分
- [x] 四个可索引 arena 路由出现在 `/api/sitemap?page=static`，各带 16 条 alternates（15 语种 + `x-default`），与既有 `/browse` 一致
- [x] `/arena/b/*` 不出现在任何 sitemap shard
- [x] `/zh/arena/rules` 渲染中文正文；`/ja/arena/rules` 回落英文并显示回落提示
- [x] 规则页第一段声明排名范围为「GPTwiki 所服务的三个模型」
- [x] 排名链路中没有任何 LLM 调用

Phase 1 追加（2026-08-21 复核，三项代码里均已实现）：

- [x] `/arena/b/[id]` 响应 meta 含 `noindex, nofollow` — [page.tsx:35](../src/app/[locale]/arena/b/[id]/page.tsx#L35) `robots: { index: false, follow: false, nocache: true }`
- [x] 对战 API 随机化 A/B 位次（见 §5 Phase 0 教训 1）— [pairing.ts:33](../src/lib/arena/pairing.ts#L33) 抛硬币定 slot
- [x] 去重 / 身份泄露 / 异常降权三道过滤在写票时执行 — [vote/route.ts:49](../src/app/api/arena/vote/route.ts#L49) 调 `evaluateVote`；每小时上限规则因需要完整历史，放在重算脚本里（`flagAnomalousVoters`）

Phase 2/3 追加：

- [x] `npm test` 5 个套件全绿（热榜套件 2026-08-21 由 16 例扩到 24 例）
- [x] 六个可索引 arena 路由进 `/api/sitemap?page=static`，alternates 收窄到 `ARENA_LOCALES`（en + zh），不把 13 个英文副本谎报成译文
- [x] `/arena/hot` 在真实语料上产出**非空**列表（47 行，全部为站内原创；实测见 §5 Phase 3）
- [ ] Pareto 视图有数据 — 阻塞于生产未设 `ARENA_MODEL_PRICING`
- [ ] 榜单有数据 — 阻塞于零对战、零投票（见 §9）

---

## 8. 明确不做

- 不做 13 个并列榜、29 个分类（票量不支持）
- 不做 agent 行为指标（GPTwiki 不跑 agent 任务，无信号源）
- 不接入 / 不镜像 AI HOT 数据（其 `/terms` 要求书面授权）
- 不建外部信源采集管线
- 不把对战永久链接送进索引
- 不机器翻译方法论页到 15 语种

---

## 9. 冷启动：这个方案没有回答的问题

计划全文没有任何一节说明**第一批 100 张票从哪来**，而 §3.5 的门槛是每模型 100 张有效匿名票。2026-08-21 实测：`arenaBattles` 与 `arenaVotes` 均为空集合，`/arena/leaderboard` 自上线起从未离开空状态。

反方第 2 点预言过这件事。裁决用「只从用户已有 key 的厂商中抽取」化解了它——但那只解决了**报错**，没有解决**没人能对战**：一场对战仍需登录 + 两个不同厂商的 key，而 `ARENA_FREE_DAILY_BATTLES` 默认 0。三个模型都过 100 票需要约 150 场来自**不同用户**的对战。

已知的三条路，都要付代价，尚未裁决：

1. **自费开闸**：设 `ARENA_FREE_DAILY_BATTLES` 为正数。代价是推翻 2026-06 的 BYOK-only 产品决定，且成本随流量线性增长（每场 2× 生成）。
2. **降低 `DEFAULT_MIN_VOTES`**。代价最大：`/arena/rules` 已公开承诺了这个门槛，降门槛等于公布统计上撑不起的数字——正是反方第 1 点说的「承诺了做不到的严谨」。
3. **接受榜单长期 provisional**，把重心放在 `/arena/hot`、`/arena/rules`、`/arena/contributors` 这三个**不依赖投票**的面上。代价是模型榜作为产品长期不成立，但零成本、零失信。

注意**不能**靠 owner 账号自己刷票：[battle-keys.ts:31](../src/lib/arena/battle-keys.ts#L31) 确实让 owner 免费使用平台 key，但一人投满 100 票恰恰是 `/arena/rules` 向读者承诺要防的事。那条路只适合验证链路通不通。
