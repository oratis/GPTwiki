# GPTwiki 自动内容增长（Auto-Content Cron）建设计划

> 起草日期：2026-07-04 · 状态：待评审（含正反辩论）

## 1. 现状：目前没有任何 cron 在增长内容

所有可能藏调度的层都查过，均为空：

| 层 | 检查方式 | 结果 |
|---|---|---|
| 会话内 cron | `CronList` | 无 |
| 持久化定时任务 | `.claude/scheduled_tasks.json` | 文件不存在 |
| GitHub Actions | `.github/workflows/` | 目录不存在 |
| Cloud Scheduler / Cloud Run Job | `cloudbuild*.yaml` + 全仓 grep | 无任何调度配置 |

内容现在**纯手动**增长：每个 cluster 是一次 PR（见 `git log`：`Add 12th cluster: travel-smart`、`cooking-science → all 15 locales`），流程为「手写 `content/<cluster>.<lang>.ts` → typecheck → 本地 `npx tsx scripts/seed-editorial.ts --batch=<name> --apply`」。全靠人触发。

## 2. 核心洞察：7 步流水线已有 4 步现成

| # | 阶段 | 状态 | 承载物 |
|---|---|---|---|
| 1 | scheduler（定时触发） | **新建** | GitHub Actions / Cloud Scheduler |
| 2 | topic backlog（选什么题） | **新建** | `content/backlog.ts` 或 Firestore |
| 3 | generate draft（生成正文） | 现成 | `generateWikiContent()` @ `src/lib/ai/provider.ts:41` |
| 4 | validate + dedup（校验去重） | 现成 | `validateDraft()` / `slotTaken()` @ `scripts/seed-editorial.ts` |
| 5 | hero image（配图） | 现成 | Seedream → GCS，按 `topicKey` 幂等缓存 |
| 6 | write store（落库） | 现成 | Firestore `wikis` + Typesense |
| 7 | review gate（质量闸门） | **新建** | PR 审核 / `status:'pending'` |

缺的只有 **① 定时器 ② 选题队列 ③ 审核闸门**。生成与落库两半都已经存在且幂等。

## 3. 分阶段实施

### Phase 0 — 选题队列（半天）
新建 `content/backlog.ts`：`{ cluster, topicKey, question, locales, status }[]`。这是「写什么」的唯一来源，避免跑偏与撞题。先手工塞 30–50 个待写选题。

### Phase 1 — 定时生成 + PR 闸门（推荐先做，1–2 天）
新建 `scripts/auto-author.ts`：
1. 从 backlog 取 N 个 `status:pending` 选题；
2. 调 `generateWikiContent('claude', …)` 生成正文，套 `DraftArticle` 结构；
3. 复用 `validateDraft` 规则自检（summary ≤320、正文以 `# ` 开头、tags 1–8）；
4. 写成 `content/<cluster>.en.ts` 并 `gh pr create`，选题置 `drafted`。

**人工 review + merge 后**再跑现成的 `seed-editorial.ts` 落库。保留人工闸门是本阶段重点——自动写、人工放行，风险最低，完全复用现有质量规范。

调度用 **GitHub Actions `schedule:`**（零新基建，密钥进 GH Secrets，产物天然是 PR）：
```yaml
on:
  schedule:
    - cron: '17 3 * * *'   # 每天 03:17 UTC，避开整点高峰
```

### Phase 2 — 全自动（信任生成质量后再上）
把 `auto-author.ts` 打包为 **Cloud Run Job**，**Cloud Scheduler** 触发（与 app 同栈，零新基建），直接写 Firestore，但打 `source:'auto'` + `status:'pending'`；前端默认不展示 pending，后台批量放行。这才是真正「不断增长」的 cron。

## 4. 护栏（两阶段都要）
- **去重**：复用 `slotTaken()` 的 `(title, language)` 点查，绝不重复写。
- **成本封顶**：`MAX_TOPICS_PER_RUN`（3–5 题）+ 每日上限；图片按 `topicKey` 缓存，扩语种时零图片成本。
- **质量闸门**：Phase 1 = PR review；Phase 2 = `status:'pending'` + 人工放行。
- **可观测**：每次跑 `log` 出「生成/跳过/失败」计数，失败选题留待下次重试（seed 脚本已有此语义）。

## 5. 调度方案选型

| 方案 | 新基建 | 审核闸门 | 适合 |
|---|---|---|---|
| **GitHub Actions cron**（推荐起步） | 无 | PR 天然 | Phase 1 |
| Cloud Run Job + Cloud Scheduler | 无（同栈） | `pending` 标志 | Phase 2 全自动 |
| Claude Code routine（`/schedule`） | 无 | PR | 想让 Claude 亲写整个 cluster，质量最高、更耗 token |
| 持久化 `CronCreate` | 无 | 自定义 | 本机会话内、7 天实验 |

## 6. 成本量级
一天 3 题 × en：每题几千 token + 一次 Seedream 生图；扩 15 语种时图片走缓存，只花文本 token。**日成本几美分级**。

## 7. 正反辩论与结论

两位独立评审（读过 `provider.ts` / `claude.ts` / `seed-editorial.ts` / `content/types.ts` / sitemap 路由）的核心论点：

### 正方（值得做，且 Phase 1 先上）
1. 增长的边际成本目前全是人力，且是**错配的**人力——选题/查证是有价值的判断，「取题→调生成→写文件→开 PR」是纯体力。自动化只吃体力，判断仍留人。
2. 「复用 4、造 3」正确：被复用的 4 步（`validateDraft`、`slotTaken` 点查去重、按 `topicKey` 缓存图、Firestore+Typesense 写入）是**已在生产验证、难做对的关键不变量**；新造的只有调度/backlog/闸门，都不碰正确性代码。
3. Phase 1（GH Actions→PR→人工 merge）让「AI 内容质量」反对意见**在构造上失效**：没有人点 merge，任何东西都进不了 Firestore/读者视野；审一份 diff 比手写更省力，质量反而可能上升；且零新基建、删两个文件即可回滚。
4. SEO 顾虑被闸门（而非无视）化解：人工 merge + `source:'editorial'` + 强制真实来源 prompt + 量产上限，是「编辑在环」而非内容农场。

### 反方（先别造 cron）
1. **`generateWikiContent` 产出 ≠ `DraftArticle`（已核实）**：它只回 `{title,content,summary,tags,sources}`，缺 `question`/`topicKey`/`image`/`language`，且 `summary` 上限 1000 字符（超 320 上限 3 倍），`content` 不保证以 `# ` 开头，也不产 15 语种原生变体。直接接上会**过不了 `validateDraft`**。
2. **失败路径是信誉地雷（已核实）**：`provider.ts:75-83` 在 JSON 解析失败时把**模型原始输出**塞进 `content`、拿用户问题前 100 字当标题。无人值守时这会进 PR，甚至（Phase 2）直入 Firestore+sitemap。
3. **量产 AI 页面 = Google「scaled content abuse」的教科书信号（已核实）**：sitemap 路由把 `wikis` 里**每一条**文档（无 status 过滤）即时推入带 hreflang 的索引地图；一旦被判定，受损的是**存量 10 万+ 人工页面**，与增长目标相反。
4. **每日多语种 PR → 审核疲劳 → 橡皮图章**：让人逐条核对泰/阿/印地语事实不可持续，闸门名存实亡。
5. 承诺的护栏（`MAX_TOPICS_PER_RUN`、`backlog.ts`、`status:'pending'`）**目前代码里都还不存在**；「4/7 已建」实为约 3.5/7。

### 裁决
反方赢下了**设计**，正方赢下了**方向**。所以：**做，但按反方的发现重塑，且默认手动触发、English-first，绝不自动写库。**

| 争点 | 裁决 |
|---|---|
| 生成器缺口 | `auto-author.ts` 做**适配层**：从 backlog 补 `question`/`topicKey`、置 `language:'en'`、`content` 缺 `# ` 则补、`summary` 裁到 ≤320、`tags` 裁到 ≤8。**文本优先**（`--no-images`，seed 脚本已支持），首版不生成配图。 |
| 垃圾产出 | 生成后过**质量闸**：无 markdown 标题 / 标题≈问题前缀 / 内容过短 → **硬跳过并记录**，绝不落盘。 |
| 15 语种审核疲劳 | Phase 1 **只产 en**、`MAX_TOPICS_PER_RUN` 取 2–3；语种扩展仍走既有人工 translate 流程。 |
| SEO 站点级风险 | Phase 1 不自动写库，人工 merge 兜住。**Phase 2 明确阻塞**，直到 (a) Phase 1 建立信任且 (b) sitemap 增加 `status`/`source` 过滤，把 `pending`/`auto` 文档排除出索引地图（当前无此过滤——硬前置条件）。 |
| 要不要每日 cron | 调度**默认 `workflow_dispatch`（手动）**；`schedule:` 保留但注释，观察数轮产出可信后再有意识开启。 |

### 本次落地范围（Phase 1，安全核心）
- `content/backlog.ts`：类型化选题队列 + 初始选题。
- `scripts/auto-author.ts`：适配层工具，复用 `generateWikiContent`，只产 en，含质量闸 + 摘要裁剪 + 上限；**只写 `content/*.ts` 草稿，不碰 Firestore**。
- `content/auto-draft.en.ts`：草稿载体（初始空）。
- `.github/workflows/auto-author.yml`：`workflow_dispatch` 手动触发（`schedule:` 注释待启）。
- `scripts/seed-editorial.ts`：注册 `auto-draft` 批次，人工 merge 后 `--batch=auto-draft --no-images --apply` 落库。
