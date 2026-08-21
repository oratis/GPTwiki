# GPTwiki 打点建设方案（2026-08-21）

> **来源**：方法论来自 `analytics-blueprint.md`（从 Luddi 生产事故提炼的可移植手册）。
> 本文不是那份蓝图的改名版——GPTwiki 与 Luddi 在三个根本维度上不同（**匿名读者占绝对
> 多数、19M 文档里 95%+ 是镜像语料、零边际成本的 BYOK 单人项目**），因此蓝图里有整整
> 四节需要被推翻或重写。推翻的理由逐条写在 §11。
>
> 所有 `路径` 均为本仓库相对路径，行号对应 2026-08-21 的工作树，会漂移，按符号名搜索为准。
>
> 阅读顺序：赶时间读 §1（业务问题→事件映射）、§4（入口）、§6（sink 选型论证）、
> §10（落地 checklist）、§11（蓝图不适用条目）。

> ### 核实状态（2026-08-21 补记）
>
> 本文写成后，其中的关键事实断言被逐条实测核实，基线是 **`f2dfb0e`**
> （`origin/main`，2026-08-14，即 arena Phase 3 合并之后）。原文行号对应的是写作当时
> 的工作树，与该基线之间已有漂移，按符号名搜索为准。
>
> **核实后被改正的断言**（正文中已就地更新，均以 `〔2026-08-21 核实〕` 标出）：
>
> - §0.1 第 1 条的「零测试」与第 8 条的「零 CI」**已不成立**：`f2dfb0e` 上已有
>   `.github/workflows/ci.yml`（typecheck + lint + test 三道闸，PR 与 main 都跑）与
>   `scripts/run-tests.ts` 发现式测试运行器。
> - §6.2 第 2 条与 §8.3 的「`firestore.indexes.json` 现在只有 4 条（全在 `wikis` 上）」
>   **数字与范围都不准**：该基线上是 **3 条**，且其中一条在 `arenaVotes` 上。
>   论证本身（高基数事件集合会带来索引 + 部署成本）不受影响。
> - §0.2 的 **U5 已有答案**：生产**没有**配 `ORIGIN_AUTH_SECRET`，回源锁定当前未生效。
>
> **被核实证伪、因而未写进正文的一条外部说法**：曾有报告称「sitemap 生成要扫 Firestore、
> 实测约 57s」是**现状**。不成立——`7bdcf24`（2026-07-11）已把 sitemap 索引改成算术式、
> 不扫集合，且该提交早于线上修订。本文引用的 "50k 扫描 ≈ 57s" 一直是**历史测量值**
> （改造前的旧设计），正文中已就地标注，以免再被当成现状转引。
>
> **已经修掉的三条**（见 PR `fix/verified-findings-2026-08-21`）：§0.1 第 2 条的两处
> `||` 硬编码兜底、§0.1 第 14 条的建文章 400。正文中相应位置已标注。

---

## 摘要

**一句话**：给 GPTwiki 建一条**无 cookie、零 Firestore 写、零新依赖**的单向打点管线——
客户端 beacon 与服务端结构化日志都汇入唯一入口 `POST /api/analytics/e` 与 Cloud Run
stdout，经 Cloud Logging Sink 落进 BigQuery 数据集 `gptwiki_analytics`，用来回答一个
问题：**在 19M 文档、15 语种、几乎全匿名的流量里，到底哪一层内容在带来读者、有多少读者
撞死在 BYOK 登录墙上、以及"接力追问 → 合并回正文"这条护城河是不是真的在流动。**

**与蓝图的最大差异（四条，详见 §11）**：

| # | 蓝图规定 | GPTwiki 的做法 | 一句话理由 |
|---|---|---|---|
| 1 | §4.1 自铸 anon UUID 存 HttpOnly cookie | **不铸任何持久匿名 ID**，只有内存态 `session_id` + `view_id` | 九个业务问题里**没有一个**需要跨会话匿名身份；不存 = 不需要 consent = 不需要 GDPR 删除 = 不与 CDN 缓存打架 |
| 2 | §5 双 sink（仓 + 业务库热表） | **单 sink**（BigQuery）。Firestore 计数器不是 sink，是产品状态 | 热表存在的唯一理由是"和业务表 join 喂后台 /console"——GPTwiki **没有任何后台 UI** |
| 3 | §2.1 四个 emitter 值 | **两个**（`server` / `client`），并禁止双端发射 | 用命名纪律（intent 用 client 名、outcome 用 server 名）从源头消灭双发，连带干掉 §5.3 消歧与 §6.3 dedup 视图 |
| 4 | §1.1 有界 buffer + 定时 flush + SIGTERM drain 的 sink | 服务端**不做 buffer**，直接 `console.log` 结构化 JSON | Cloud Run `min-instances=0`（见 `cloudbuild.yaml`），实例随时缩容到零，buffer 是净损失；stdout 由日志代理收，不会因缩容丢 |

**不变的部分**：fire-and-forget、env 门控不配置即 no-op、单一入口 + fail-closed
allowlist、类型化 schema 单一真相源、告警先于看板、口径固化为视图、比率切 T-2。这些照抄。

**三条在读代码时才浮出来、并且改变了方案形状的产品事实**（全文见 §0.1 第 13–15 条）。
它们不是补充说明——如果不先知道这三件事，按调研的九个业务问题直接设计事件，
做出来的 Q2/Q3/Q5 三张表都会指向错误的结论：

| # | 事实 | 若不知道会怎样 | 方案里的对应物 |
|---|---|---|---|
| A | 文章页有**两道**登录墙（`WikiInteractive` 的「继续追问」+ `ThreadReplyList` 的「追问跟帖」），**两道的按钮对匿名读者根本不渲染** | `thread_created ≈ 0` 会被读成"没人想追问"，而真相可能是"没人看得见入口"——护城河命题被判死刑，判错了 | `article_continue_cta_shown` + **`thread_cta_shown`**，两条都在 Phase 0、都零 UI 改动可发 |
| B | 「继续追问」**不产生 thread**：非作者走的是 `POST /api/wiki`，本该产出一篇与原文毫无引用关系的**孤儿新文章**——而且**这条路今天是坏的**（`title: ''` 撞 `wikiCreateSchema` 的 `.min(1)`，见 §0.1 第 14 条） | 一次本该成为贡献的追问被算成"又一篇 UGC 发布"，护城河的漏水被记成增长；而在修好之前，漏水口径会**恒为 0 且看起来一切正常** | `wiki_published.origin_surface` + §7.11 的漏水口径 + §10 Phase 0 的"先修再量"顺序 |
| C | 同一个 BYOK 403，`ChatInterface` 会给出配置链接，而 `WikiContinueChat` 的三个 handler **只认 `QUOTA_EXHAUSTED`——那个在 `FREE_DAILY_MESSAGES=0` 下永远不可能发生的分支**，对每次都会发生的 `API_KEY_REQUIRED` 一律落进通用错误（§0.1 第 15 条） | 从文章页撞墙的人在结构上不可能转化，却被算进 Q5 的转化率分母——把 UI 缺陷读成"用户不愿意配 key"，进而误判 `FREE_DAILY_MESSAGES=0` 这个决策 | `ai_entitlement_denied.has_actionable_hint` |

---

## §0 前提与假设

### 0.1 调研已证实的事实（本方案的地基）

1. **现存遥测约等于零，且现存的两点都不可信。**
   - GA4 只有 pageview，全仓 `gtag`/`dataLayer` 只出现在
     `src/components/layout/GoogleAnalytics.tsx` 一个文件（实测 5 处引用，全在该文件内）。
   - `wikis.views` 是**渲染计数不是读者计数**：唯一写点
     `src/app/[locale]/wiki/[id]/page.tsx:167` 的 `void incrementWikiViews(id)` 处在
     `export const revalidate = 3600` 的 ISR 路径上，每页每小时最多 +1。
     它同时被公开展示在 JSON-LD `userInteractionCount`、`/embed/[id]`、列表卡片上。
   - 全仓 **63 处 `console.*`**，100% 非结构化字符串，无 trace id / userId / 耗时 / token。
   - 零 Sentry、零 APM、零 metric、零告警、零仪表盘。
     〔2026-08-21 核实〕**「零测试」已不成立**：arena 合并后仓内有 `scripts/test-*.ts`
     五个套件与 `scripts/run-tests.ts` 运行器（`npm test`）。其余各项仍成立。

2. **`GA_ID` 硬编码兜底 `'G-G6DSDW9X5D'`**（`GoogleAnalytics.tsx:5`）。这是本方案必须
   避开的**坏先例**：任何 fork 不设 `NEXT_PUBLIC_GA_ID` 就把数据打回原作者 property。
   **而且这个坏模式不是孤例**：`src/lib/ai/resolve-key.ts:5` 的
   `process.env.PLATFORM_OWNER_EMAIL || '<原作者个人邮箱>'` 是同一个写法——
   任何 fork 不设该变量，"谁能无限用平台 key"就默认判给上游作者的邮箱字符串。
   两处都说明"`||` 兜底"在这个仓库是习惯而不是失误，所以 §2.3 第 1 条硬规则
   （**绝不硬编码兜底值**）在这里是纪律而非洁癖。

   〔2026-08-21 核实 + 已修〕两处**都已在 PR `fix/verified-findings-2026-08-21` 中改成
   fail-closed**：`NEXT_PUBLIC_GA_ID` 未配置即完全不加载 gtag（并补上了 Dockerfile
   `--build-arg` / cloudbuild `_GA_ID` 通路，因为 `NEXT_PUBLIC_*` 是 build-time 内联的，
   只在 Cloud Run 上设环境变量没有任何效果）；`PLATFORM_OWNER_EMAIL` 未配置即无人豁免。
   核实时还发现**第三处同款写法**：arena 合并带进来的 `src/lib/arena/battle-keys.ts`
   又抄了一份同样的兜底，且其中 `email !== OWNER_EMAIL` 的反向写法在两边都为空时会
   **漏计费**，一并修掉并抽成了单一的 `src/lib/ai/platform-owner.ts`。
   这反过来加强了本条的论点：这个写法确实是习惯，会自我复制。

3. **Cloud Run 配置**（`cloudbuild.yaml`）：`--min-instances 0 --max-instances 10
   --memory 512Mi`。缩容到零是常态，实例寿命不可预期。

4. **Cloudflare Cache Rules**（`docs/cloudflare-migration.md` §3.3）第 3 条：
   `/api/*` 除 sitemap/og/feed 外一律 **Bypass cache**。所以新入口 `/api/analytics/e`
   天然不被缓存，且天然携带 CF 注入的 `X-Origin-Auth`——`src/proxy.ts` 的回源锁定
   会**放行**经 CF 的 beacon、**403** 掉绕过 CF 直连 Cloud Run 的伪造流量。这正是我们想要的。

5. **`/embed/*` 是 CF 边缘缓存 1h + ISR `revalidate=3600` + `generateStaticParams` top50**
   三重缓存。服务端在这个路径上数任何东西都是错的。

6. **身份锚点唯一且清晰**：`FirestoreAdapter` 自动 ID = `token.sub` = `session.user.id`。
   `src/lib/auth.ts` 的 `jwt` callback 注释已经写死了"必须在 jwt 而非 signIn 里写"的理由，
   而且 `if (user)` 只在真实登录/注册时进入、`!snap.exists` 恰好区分首登——
   这是 `auth_completed` 事件**唯一正确**的挂载点（见 §5.2）。

7. **匿名侧完全裸奔**：应用自建 cookie 只有 `NEXT_LOCALE`（`src/proxy.ts`）。
   `getClientId()`（`src/lib/rate-limit.ts`）里的 IP 只服务于限流，是进程内 Map、
   永不落盘、跨实例不共享，**不是身份**。

8. ~~**零 CI**~~ 〔2026-08-21 核实：**已不成立，本条作废**〕。写作时确实只有
   `auto-author` / `auto-seed` / `sitemap-shards` / `suggest-topics` 四个内容管线
   workflow。但基线 `f2dfb0e` 上已有 **`.github/workflows/ci.yml`**，在 PR 和 push
   到 main 时跑 `npm run typecheck` + `npm run lint` + `npm test` 三道闸。
   本地的 husky + lint-staged 仍然只作用于**已 stage 的文件**、且不跑 tsc，所以
   「本地闸门不够」这半句仍然成立，但「新增 `/api/analytics/e` 不会被任何自动化拦住」
   **不再成立**——打点代码进 PR 时会被 CI 检查。

9. **路由改动必须手动 `gcloud builds submit --config cloudbuild.yaml`**
   （`docs/DEPLOY.md` 明说无自动部署）。新增 `/api/analytics/e` 要走一次手动部署。

10. **命名冲突（重要）**：`wikis` 文档上已经有一个 `source` 字段，取值 `'editorial'` 等
    （`src/app/api/sitemap/route.ts:91` 用 `where('source','==','editorial')` 查询）。
    蓝图 §5.3 要求仓表每行带 `source: "client"|"server"`——**两者会撞**。
    本方案把发射侧命名为 **`emit_source`**，把内容层命名为 **`content_source`**。
    任何时候看到裸的 `source` 都要先问"哪个 source"。

11. **`wikis.source` 的真实值域是高基数的，而且不止三层**（全部实测自代码，不是推断）。
    这一条直接决定 Q1 能不能被回答，写在前面：

    | 写入点 | 写进 `source` 的值 |
    |---|---|
    | `src/app/api/seed/wikipedia/route.ts:247` | `` `wikipedia-${lang}-rich` ``（配图版）；同文件 :418–419 的统计查询同时数 `` `wikipedia-${lang}` `` 与 `` `wikipedia-${lang}-rich` `` 两族 |
    | `scripts/seed-content.ts:128` | `'wikipedia'` |
    | `scripts/seed-content.ts:223` | **`'grokipedia'`** ← 第四层内容，调研与本方案初稿都漏了 |
    | `scripts/translate-live.ts:230` / `scripts/seed-editorial.ts` | `'editorial'` |
    | `scripts/seed-drafts.ts:79`、`src/app/api/seed/route.ts:95` | `'editorial-draft'` |
    | `src/app/api/seed/route.ts:68`、`scripts/seed-inline.ts:721` | `'seed'` |
    | `scripts/seed-rich.ts:302` | `'seed-rich'` |
    | **`POST /api/wiki` → `createWiki`（`src/lib/search.ts`）** | **不写 `source`——UGC 的判据是这个字段缺失** |

    产品代码已经在做同样的归一：`src/app/[locale]/wiki/[id]/page.tsx:99-101` 的
    `isWikipediaSourced()` 用的是 `source.startsWith('wikipedia')`，正因为值是按语种分裂的。
    **推论**：`content_source` 不能把 `wikis.source` 原样塞进事件（那是 15 语种 × 2 变体
    的高基数列），必须过一个共享的归一函数（§7.3）。

12. **`wikis.views` 不只是"渲染计数"，它的初始值是随机数。** 三处 seed 写入点各自
    `Math.random()` 播种：`scripts/seed-content.ts`（`*100+10`、`*80+5`）、
    `src/app/api/seed/wikipedia/route.ts:244`（`*50+5`）、`scripts/seed-inline.ts:718`
    （`*200+20`）；而 `scripts/seed-editorial.ts:332` 写的是 **`views: 0`**。
    后果比"低估"严重得多，见 §7.1——它同时是 `getPopularWikiIds(50)` 的排序键，
    而那个函数驱动 `/wiki/[id]` 与 `/embed/[id]` 两处 `generateStaticParams`。

13. **文章页上有两道登录墙，不是一道；两道都对匿名读者完全不可见。** 这条决定了
    Q2 与 Q3 各自的分母，必须在设计事件之前钉死：

    | 墙 | 代码 | 门控写法 | 匿名读者看到的 |
    |---|---|---|---|
    | 「继续追问」按钮 | `src/components/wiki/WikiInteractive.tsx` | `{session && showConversation && !showContinueChat && (…)}` | **按钮根本不渲染** |
    | 「追问跟帖」按钮（thread compose） | `src/components/wiki/ThreadReplyList.tsx` | `{session && !showCompose && (…)}` | **按钮根本不渲染**，只看到一句 `thread.noReplies` |

    两道都是 `session && …`，不是「点了才弹登录」。**后果**：今天 `thread_created ≈ 0`
    这个事实无法区分两种完全相反的解释——「没人想追问」与「没人看得见入口」。
    Q3 被调研称作产品**唯一的护城河**，而它的供给侧入口对 95%+ 的流量是隐形的。
    所以 Q3 需要一个与 Q2 对称的 `thread_cta_shown{authed:false}`（§12 C），
    否则 merge 率的分母永远只覆盖已登录人群，得出的结论会是「护城河不存在」，
    而真相可能是「护城河的入口没画出来」。

14. **「继续追问」不产生 thread——它产生的是另一篇文章。** 这是一条极易被名字误导、
    且直接改变 Q3 结论的产品事实（实测调用链，不是推断）：

    ```
    WikiInteractive「继续追问」→ WikiContinueChat
        handleSend()          → POST /api/chat            （只是对话，不落库）
        handleUpdateWiki()    → PUT  /api/wiki/[id]       （仅 isAuthor 可见，重写正文）
        handleCreateNewWiki() → POST /api/wiki            （任何人可见，**新建一篇独立文章**）
    ```

    `WikiContinueChat.tsx` 全文**没有任何一处**打到 `/api/wiki/[id]/threads`。
    thread 只由 `ThreadReplyList.tsx` 的 compose 区产生。于是：

    - **非作者**用「继续追问」，设计上的产出是一篇**与原文没有任何引用关系的孤儿新文章**，
      而不是一条可被 merge 回正文的 thread。这是内容**分裂**，与「会生长的百科」叙事相反。
      （**实际上连这一步都到不了**，见下方的 400。）
    - `wiki_published` 如果不带来源面，chat 页发布与文章页分裂发布会混成一个数，
      Q3 就永远看不见「护城河在漏水」这个形态（口径规则见 §7.11）。

    **但还有一层——这条分裂路径今天根本走不通，它是坏的**（这条必须先于打点被认识到，
    否则会做出一个恒为 0 的指标并把它读成"没有漏水"）：

    ```
    WikiContinueChat.tsx:139        body 里写死 title: ''
    validation.ts:16                title: z.string().trim().min(1).max(200)   ← 必填
    api/wiki/route.ts:45-46         parseJsonBody 先跑，校验失败直接 400 返回
    ```

    实测 `z.string().trim().min(1).safeParse('')` → `success:false`（zod 4.3）。
    所以 `handleCreateNewWiki` 每一次都在 `parseJsonBody` 这一步吃 400，
    连 :52 的 `resolveApiKeyForUser` 都到不了，用户看到的是
    `t('errors.createWikiFailed')`。对比之下 `PublishDialog.tsx:38` 有
    `if (!title.trim()) return` 且标题是用户输入的，chat 页那条路是通的。
    路由自己第 73 行的 `title: body.title || generated.title` 说明**作者本意是允许空标题**，
    是 schema 与调用方漂移了。

    **对本方案的三个直接后果**：
    - `wiki_published{origin_surface:'article_continue'}` 在修好之前**恒为 0**。
      把它当"漏水率"读，会得到"没有漏水"这个**假绿灯**——正是 §8 存在的理由。
    - §10 Phase 0 的验收项"从文章页新建一篇文章确认 `origin_surface`"**现在必然失败**，
      所以顺序必须是**先修 schema 再验收**（一行：`title` 改成
      `z.string().trim().max(200).default('')`，与路由第 73 行的兜底对齐）。
    - 这本身就是一个"打点还没上线就已经产出结论"的例子：Q3 的漏水命题在今天的代码里
      **不是"量多量少"，而是"出口坏了"**。

    〔2026-08-21 核实 + 已修〕上述 400 已实测复现（把 `WikiContinueChat` 那个 body
    原样喂给仓内 zod 4.3.6，报 `too_small` on `title`），并已在 PR
    `fix/verified-findings-2026-08-21` 中按本条给出的一行方案修掉：
    `title` 改为 `z.string().trim().max(200).default('')`。同时加了
    `scripts/test-wiki-create-contract.ts` 把两个调用方的真实 body 钉进测试
    （已验证它在修复前会失败、修复后通过），防止 schema 与调用方再次漂移。
    **对本方案的影响**：`wiki_published{origin_surface:'article_continue'}` 的
    "先修再量" 前置条件**已满足**，§10 Phase 0 的那条验收项现在可以真的跑了——
    但要注意线上要等下一次手动部署（`gcloud builds submit`）之后才生效。

15. **文章页的「继续追问」把 403 吞掉了——而且吞的方式比"没写分支"更微妙。**
    逐个 handler 实测（`WikiContinueChat.tsx`）：

    | handler | 403 处理 | 在 `FREE_DAILY_MESSAGES=0` 下的实际表现 |
    |---|---|---|
    | `handleSend`（`POST /api/chat`）:70 | 只有 `if (!res.ok) throw new Error('Chat request failed')` | 通用 `t('chat.error')` |
    | `handleUpdateWiki`（`PUT /api/wiki/[id]`）:113 | **只认 `QUOTA_EXHAUSTED`** | 通用 `t('errors.updateWikiFailed')` |
    | `handleCreateNewWiki`（`POST /api/wiki`）:148 | **只认 `QUOTA_EXHAUSTED`** | 通用 `t('errors.createWikiFailed')` |

    关键在于：**`QUOTA_EXHAUSTED` 在当前配置下永远不可能发生。**
    `resolve-key.ts` 里 `quotaExhausted:true` 只出现在 :52，而到达 :52 必须先过
    :44 的 `if (freeDailyLimit() <= 0) return { needsConfig: true }`——
    `FREE_DAILY_MESSAGES` 默认 0（`free-quota.ts:5` 的 `DEFAULT_DAILY_LIMIT = 0`），
    所以真正会发生的那个 403 是 `API_KEY_REQUIRED`，而这三个 handler **恰好一个都不认它**。
    等于说：这三处**写了 403 分支，但写的是那个不会来的**。

    对比 `ChatInterface.tsx:60-77`（认两种、给 `[配置提示](profileUrl)` 链接）与
    `PublishDialog.tsx:59/63`、`ThreadReplyList.tsx:82/86/117/121`（认两种、只弹 toast）。

    后果对 Q5 很具体：**从文章页撞 BYOK 墙的人，连"去配 key"这句提示都收不到**，
    所以这一路的 `ai_entitlement_denied` 在结构上不可能有下游转化。
    分析时必须按 `surface` 拆开，否则会把一个 UI 缺陷读成"用户不愿意配 key"（§12 D）。
    **附带的一条运维含义**：哪天真把 `FREE_DAILY_MESSAGES` 调成正数，
    这三处的分支会突然"活过来"，Q5 的 `has_actionable_hint` 分布会跳变——
    口径文档里要把这个 env 的改动日期记为一次分段点（蓝图案例 B 的同名不同物）。

### 0.2 未确认项（不要在这些上面建结论）

| # | 未确认的事 | 为什么重要 | 怎么确认 |
|---|---|---|---|
| U1 | **当前真实日流量量级**（pageview/日、分 locale 分布） | §7.1 的 ingestion floor 阈值、§6 的成本估算、§8.4 的最小可监控事件量全依赖它 | 打开 GA4 property `G-G6DSDW9X5D` 看过去 28 天 Reports → Engagement → Pages；同时 CF Analytics 看请求量与 bot 占比 |
| U2 | **GA4 是否已开通 BigQuery Export** | 决定 §8.3 的交叉对账能不能做；也决定 GA4 数据能不能进同一个库 | GA4 Admin → Product Links → BigQuery Links。未开通就先开（免费档每日批量导出即可） |
| U3 | **各 `source` 值的文档数分布**（注意：**值域本身已经确定，见 §0.1 第 11 条**，不必再查） | 归一后的五层（editorial / wikipedia / grokipedia / seed / ugc）各占多少，决定 Q1 的分母是否可比 | **大部分答案已经有一个现成的只读端点，不用写任何脚本**：`GET /api/seed/wikipedia`（`src/app/api/seed/wikipedia/route.ts:431-440`，Bearer `SEED_SECRET`）返回 `total`、每个语种的 `wikipedia-<lang>` 与 `-rich`、`seed`，以及 `user-created`（`where('authorId','!=','system').count()`）。全部是 `.count()` 聚合，**不按文档计费**。<br>**两处必须自己补的坑**：① `user-created` **不等于 UGC**——编辑部文档的 `authorId` 是 `EDITORIAL_ID` 不是 `'system'`（`scripts/seed-editorial.ts:324`、`scripts/translate-live.ts:219`），所以 `UGC ≈ user-created − 编辑部篇数(U4)`；② 该端点**没数** `grokipedia` / `editorial-draft` / `seed-rich`，这三个要另外各跑一次同款 `.count()`。<br>**绝不要**用 `where('source','==',null)` 或 `!=`（Firestore 查不出缺失字段，见 §8.3）。**上线后这两处近似都应该被废掉**：Phase 0 让 `createWiki` 显式写 `source:'ugc'`（理由与索引代价见 §8.3 对账 B），此后 UGC 直接 count |
| U4 | **编辑部原创篇数真实值** | Q9（管线 ROI）的分母 | **已有现成答案与命令**：`docs/DEPLOY.md:24` 写着 `curl -s "https://gptwiki.net/api/sitemap?page=editorial" \| grep -c "<url>"   # ~1,685 original docs`。跑一次确认它没漂移即可（该分片有 `EDITORIAL_CAP = 20000` 上界，是有界的） |
| ~~U5~~ **已确认** | **`ORIGIN_AUTH_SECRET` 在生产是否真的配了** → 〔2026-08-21 核实〕**没配**。`gcloud run services describe` 的 env 清单里没有该变量，且直连 Cloud Run URL 实测返回 **200**（锁定生效应为 403）。`src/proxy.ts:79` 的 `if (ORIGIN_AUTH_SECRET)` 整段被跳过 | 结论：**直连 Cloud Run 伪造事件的口子当前是开的**。§4.2 把「回源锁定」当作新入口 `/api/analytics/e` 的第一道闸，该前提**目前不成立**——上线 beacon 入口前必须先配上这个变量，否则 CF 那层的 WAF/限流/缓存规则可被整体绕过（应用侧限流是进程内 Map，跨实例不共享，挡不住） | 纯控制台/部署动作，不在代码 PR 范围内 |
| U6 | **`/embed` 页能拿到 embedder host 的比例** | Q8（embed 是不是分发渠道）的答案质量完全取决于它。`document.referrer` 会被 embedder 的 `Referrer-Policy` 掐掉，`ancestorOrigins` 只有 Chromium 系有 | 上线 `embed_impression` 后第一周直接看 `embed_host IS NULL` 的占比。**先测再决定要不要加别的信号** |
| U7 | **GCP 项目是否在用赠金/credits** | 决定 §8.5 的账单预算必须显式 `EXCLUDE_ALL_CREDITS`（蓝图 §7.6 踩过的坑：默认 INCLUDE 时有赠金就永不触发） | Billing → 账户页看 credits 余额 |
| U8 | **`users.createdAt` 的覆盖率** | `days_since_signup_bucket` 这个维度（Q5 的关键）依赖它。`auth.ts` 只给新用户写，老用户是否被 `scripts/backfill-users.ts` 补过未知 | 抽查若干 `users` 文档看有没有 `createdAt` |
| U9 | **响应完成之后写的 stdout 会不会被吞** | 决定 §2.1 里"服务端事件必须在响应前写完 stdout"这条约束有多硬 | **先看代码再实测**：`cloudbuild.yaml` 的 deploy 参数里**没有** `--no-cpu-throttling`，所以这个服务是默认的"请求期间才分配 CPU"。推论有两层：(a) `ai_stream_completed` 的 `flush()` 发生在**流关闭那一刻**，而响应在流关闭前不算完成——它落在 CPU 分配窗口**之内**，风险比初稿假设的低；(b) 真正会被吞的是任何 `return` 之后才排队的写（例如 `void somePromise.then(() => trackServer(...))`），**这种写法一律禁止**。实测方法：在一个路由里 `console.log` 后 `setTimeout(..., 2000)` 再 log，看第二条会不会丢 |
| U10 | **`users.apiKeys` 的 provider 覆盖分布**（Q5 分子的基线） | `api_key_saved` 只能看到**上线之后**新配的 key。上线前已经配了 key 的存量用户不会产生任何事件，Q5 的转化率会因此被系统性低估 | 上线前跑一次有界统计：`users` 集合里 `apiKeys` 非空的文档数（用 `.count()` + 字段存在性过滤，或在 `scripts/backfill-users.ts` 旁边加一个只读脚本）。把这个数作为 Q5 的**存量基线**记进口径文档，**不要**混进转化率的分子 |

### 0.3 明确的非目标

- **不做实时**。Cloud Logging → BigQuery 的 sink 有分钟级延迟，GA4 导出是天级。
  任何需要秒级反馈的需求（比如实时大盘）不在本方案范围内，也不该在这个量级上做。
- **不做跨会话匿名留存分析**（见 §5.3 的取舍与重估触发条件）。
- **不做用户级的 GA4 ↔ BigQuery join**。GA4 的 `_ga` 是它自己的 cookie，应用侧拿不到；
  想拿就要把 client id 回传，那是一次实打实的 consent 升级。**本方案明确拒绝。**
  两边只在 `日期 × page_path × locale` 粒度上对齐（§8.3）。
  > 这条是对调研输入的一次修正：调研结论里写"两个 sink 能落在同一个库里做 join，这正是
  > 双 sink 的价值"。落在同一个 GCP 项目里是对的，但**能 join 的粒度只有天级聚合**，
  > 不是行级。别按行级 join 去设计报表。

---

## §1 业务问题 → 指标 → 事件

调研列了九个业务问题。逐条映射，**每条都必须落到具体事件**，落不到的就明说落不到。

| # | 业务问题 | 核心指标（口径） | 支撑事件 | 备注 |
|---|---|---|---|---|
| Q1 | 19M 语料里哪一层真正带来自然进站（编辑部 / Wikipedia 镜像 / UGC），分语种 | `article_viewed` 按 `content_source × content_language × entry='organic'` 计数；配一个质量分母：`article_read_depth` 的 `max_scroll_pct ≥ 50` 占比 | `article_viewed`、`article_read_depth` | **`content_source` 必须随事件走、且必须先归一成五值**（`wikis.source` 原文是 `wikipedia-<lang>[-rich]` 这样的高基数值，还有一层初稿漏掉的 `grokipedia`——见 §0.1 第 11 条与 §7.3）。read_depth 是 scaled-content 风险的早期哨兵：镜像层如果"进站多但秒退"，那就是 Google 开始惩罚前的苗头。**读结论前先读 §7.1 的偏置警告**：预渲染 top50 与首页热门都按随机播种的 `views` 排序，本身就偏向镜像层 |
| Q2 | 匿名读者从搜索落地 → 看对话 → 撞登录墙的流失 | 漏斗（分母是**会话数不是人数**，§7.8）：`article_viewed` → `article_conversation_toggled{opened:true}` → `article_continue_cta_shown{authed:false}` → `login_wall_hit` → `auth_completed` | `article_viewed`、`article_conversation_toggled`、`article_continue_cta_shown`、`article_continue_cta_clicked`、`login_wall_hit`、`auth_started`、`auth_completed` | **Phase 0 可零 UI 改动测出"不可见人群有多大"**：`WikiInteractive.tsx:50` 的条件是 `session && showConversation && !showContinueChat`，所以可以在 `showConversation && !session` 时照发 `article_continue_cta_shown{authed:false}`。Phase 2 再补一个登出态 CTA，漏斗才完整（§10）。**分母陷阱见 §7.10**：镜像文章上的"展开对话"和编辑部文章上的不是同一件事，漏斗必须按 `content_source` 分开报 |
| Q3 | 哪些文章长出 thread、多少被 merge 回正文（护城河真实度量） | 每篇 merge 率 = `thread_merged` / `thread_created`（按 `wiki_id` 聚合）；护城河流速 = `thread_merged.thread_age_ms` 的中位数；**漏水率 = `wiki_published{origin_surface:'article_continue'}` / `thread_created`** | `thread_cta_shown`、`thread_submitted`、`thread_created`、`thread_merge_clicked`、`thread_merged`、`thread_merge_failed`、`wiki_published` | `thread_created` / `thread_merged` 都是 server 权威。`thread_merge_failed{reason:'ALREADY_MERGED'}` 单独看——它是 UI 竞态而不是产品失败。**两条本方案独有的必读前提**：① 供给侧入口对匿名读者不可见（§0.1 第 13 条），所以必须先用 `thread_cta_shown{authed:false}` 量出"看不见入口的人有多少"，再谈 merge 率——否则 `thread_created ≈ 0` 会被误读成"没人想追问"；② 「继续追问」不产生 thread 而是**新建一篇孤儿文章**（§0.1 第 14 条），这条分裂路径必须靠 `wiki_published.origin_surface` 单独计量，它是护城河的**漏水口径**，见 §7.11。**注意这条今天被一个 400 挡死了**（`title: ''` × `title` 必填），所以漏水率在修好 `wikiCreateSchema` 之前**恒为 0 且看起来正常**——Phase 0 必须先修再量 |
| Q4 | 读者问了但语料答不上来的问题（内容缺口清单） | `search_performed WHERE result_count = 0` 按 `q_text` 分组 Top-N，分 `caller` 与 `locale` | `search_performed`、`search_result_clicked`、`search_backend_degraded` | **不设 `search_zero_result` 与 `suggestions_empty` 两个独立事件**——它们是 `result_count=0` 的谓词，加事件只会膨胀集合（§3.4）。但需要一处代码改动：`WikiSuggestions.tsx` 的 fetch 要带上 `caller=chat`，否则 chat 侧的搜索会污染搜索页的量（§7.6） |
| Q5 | BYOK 墙掐死了多少漏斗、掐在哪一步 | 转化链：`ai_entitlement_denied` → {`api_key_page_viewed{from:'wall'}` → `api_key_saved`} \| `waitlist_joined` \| 无后续。按 `days_since_signup_bucket` 拆 | `ai_entitlement_denied`、`api_key_page_viewed`、`api_key_saved`、`waitlist_joined`、`auth_completed` | `ai_entitlement_denied` **只在一个地方发**：`src/lib/ai/resolve-key.ts` 的 `resolveApiKeyForUser`，加一个 `route` 入参，**三个拒绝分支各发一次**（§4.4）。这一个调用点覆盖 chat / wiki POST / wiki PUT / threads / merge **五条**路由的 403。**`reason` 必须把 `BYOK_ONLY` 与 `NO_PLATFORM_KEY` 分开**，否则回答不了"要不要推翻 `FREE_DAILY_MESSAGES=0`"这个真正的问题。<br>**一条代码给出的强假设，值得当第一个要验证的猜想**：`login/page.tsx:27` 的 `callbackUrl` 写死 `/${locale}/chat`，所以**每个刚注册完的人都被直接送到聊天页**，而 `FREE_DAILY_MESSAGES=0` 意味着他发第一条消息就撞墙。用 `auth_completed{is_new_user:true}` → 首个 `ai_entitlement_denied` 的**时间差分布**去验它：如果中位数是秒级，那 Q5 的答案就是"墙掐在注册后的第一分钟"。<br>**另一个必须写进口径的偏置见 U10**：上线前已配 key 的存量用户不产生 `api_key_saved`，转化率会被系统性低估 |
| Q6 | 按模型 × 语种拆的回答质量 | 中途放弃率 = `chat_stream_abandoned` / `ai_stream_started`；改写率 = `chat_message_rephrased` 占比；发布率 = `wiki_published` / 会话；追问率 = `thread_created` / `article_viewed` | `chat_message_sent`、`ai_stream_started`、`ai_stream_completed`、`ai_stream_failed`、`chat_stream_abandoned`、`chat_message_rephrased` | 延迟/长度必须**包住流的结束**而不是 handler 返回（§4.5）。`chat_stream_abandoned` 是**服务端物理上看不到**的事件——client 只是停止 read，没有任何信号到达服务端。**"×语种"那一半有个陷阱**：`/api/chat` 在 `src/proxy.ts` 的 bypass 名单里，URL 上没有 locale，服务端事件的 `locale` 必须从同源 `Referer` 的路径首段取（`NEXT_LOCALE` cookie 只是第二顺位，它只在用户手动切过语言时才存在），拿不到就留 null（§6.5），**回落到默认 en 会把这一半分析变成噪声** |
| Q7 | 15 语种里哪些是真实受众、哪些是死翻译 | 分 `locale`：`article_viewed` 量、`article_conversation_toggled` 率、`wiki_published` 率；成本侧从内容管线单独算 | 同 Q1 + `wiki_published` | **`locale`（URL 里的）和 `content_language`（文章的）必须同时带**，两者会分叉（§7.2） |
| Q8 | `/embed/[id]` 到底算不算分发渠道 | 曝光 = `embed_impression` 按 `embed_host` 聚合；回流 = `embed_click_through` / `embed_impression`；供给侧 = `embed_code_copied` | `embed_impression`、`embed_click_through`、`embed_code_copied`、`share_clicked` | 无 cookie、无 session、纯聚合（§5.4）。`embed_host` 有相当比例会是 `null`（U6），报表上必须显式留一个 unknown 桶而不是丢掉 |
| Q9 | 每日自动内容管线值不值得跑 | 每个 `topicKey`：上线后 30/60 天的 `article_viewed` 累计 / 单位成本（约 2 次 Claude 调用 + 1 张 Seedream 图） | `article_viewed` + 维表 `dim_editorial_articles` | **不给 GitHub Actions 里的脚本加打点**（§11 第 5 条）。改为一个夜间作业把 `where source=='editorial'` 的有界查询结果（≈ U4 量级，非 19M）落成 BQ 维表，与事件按 `wiki_id` join |

**没有事件能回答的**：单位成本的**分子**（每次 auto-author 实际烧了多少 token / 多少钱）。
三家 SDK 的调用都在 `scripts/auto-author.ts` 里、跑在 GitHub Actions、且 provider 计费
按账单出。建议在 workflow 里把 usage 打进 job summary，人工按月对一次账——
**不要**为了这个数字去给脚本接打点管线（收益远小于复杂度）。

---

## §2 设计不变量在 GPTwiki 的形态

蓝图 §1 的三条不变量全部保留，但**实现形态**跟着 Cloud Run + 无后台的现实变。

### 2.1 打点永不阻塞业务

**规则不变**：入口函数同步签名、返回 `void`、永不 throw。

**GPTwiki 的具体形态**：

```
// src/lib/analytics/server.ts
export function trackServer<N extends ServerEventName>(
  name: N, props: EventProps<N>, ctx: ServerCtx
): void {
  try {
    if (!analyticsEnabled()) return;      // ← 短路只在这一层，且这一层就是 sink 本身
    process.stdout.write(JSON.stringify(buildRow(name, props, ctx)) + '\n');
  } catch { /* 打点失败绝不影响业务 */ }
}
```

**为什么服务端不做 buffer——这是对蓝图 §1.1 的一次实质偏离**：

- Luddi 的 buffer 是为了摊薄 BigQuery streaming insert 的 API 调用成本。GPTwiki 不调
  BigQuery API，写的是 stdout，**没有可摊薄的成本**。
- `cloudbuild.yaml` 是 `--min-instances 0`：实例在空闲后随时被回收。任何 buffer 都在赌
  "SIGTERM 会跑赢回收"，而蓝图 §7.3 已经承认"SIGTERM 跑赢 drain"是**不产生任何错误日志**
  的静默丢数据形态。在一个会缩容到零的服务上主动引入这个赌局是净亏。
- 代价要认：**每个事件一次 `stdout.write` 系统调用**。在 GPTwiki 的服务端量级（server 事件
  只在 chat / publish / thread / merge / auth 这些低频动作上发，不在读路径上发）这是可忽略的。
  **红线**：一旦有人想在读路径（`article_viewed` 之类）上发服务端事件，这个假设就崩了——
  而读路径本来就必须走客户端（§7.1），所以红线和口径规则是同一条。
- **硬约束（U9 已从代码收窄）**：`cloudbuild.yaml` 的 deploy 参数里**没有**
  `--no-cpu-throttling`，所以这是默认的"请求期间才分配 CPU"的服务——**响应完成之后
  CPU 就被节流，排在 `return Response` 之后的任何异步回调都可能永远不执行，
  而且不产生任何错误日志。** 于是规则不是"待确认"而是直接钉死：
  **所有服务端事件必须在 `return Response` 之前同步写完 stdout。**
  唯一例外是 `ai_stream_completed`——它被 TransformStream 的 `flush()` 拉进了
  "流还没关闭 = 响应还没完成"的窗口里，见 §4.5。
  U9 剩下要实测的只是这个例外的实际到达率。

**踩坑（照抄蓝图，因为它在这里同样成立）**：
- **不要在业务入口处统一短路**。`if (!process.env.ANALYTICS_ENABLED) return` 这句话
  只能出现在 `src/lib/analytics/server.ts` 和 `src/lib/analytics/client.ts` 内部，
  绝不能出现在调用点。这个仓库已经有一个正面榜样可以照抄：
  `src/lib/typesense.ts` 的 `config() → null` + `isTypesenseEnabled()`，
  未配置时 `src/lib/search.ts:50` 干净地走 Firestore 回落。**照它的样子写。**
- 不要 `await trackServer(...)`。

### 2.2 sink 解耦

GPTwiki **只有一个** sink（§6 论证），所以蓝图 §1.2 的"双 sink 互不影响"退化为一条更弱
但仍然重要的规则：**GA4 与新管线必须互不知情**。

- 不允许新的 `track()` 内部去调 `gtag()`，也不允许 `GoogleAnalytics.tsx` 去 import
  新的 analytics 模块。它们是两条独立的腿，一条断了另一条照走。
- 这不是洁癖：蓝图案例 A 的根因就是 web helper 既直接 `posthog.capture()` 又 POST 内部
  proxy、proxy 再 `serverCapture()` 回 PostHog，**所有 client 事件被双计 ~2 倍**。
  在 GPTwiki 里"给 track() 顺手加一句 gtag" 是最容易犯的同款错误。

### 2.3 env 开关——不配置即 no-op

这一条在 GPTwiki 比在 Luddi **更重要**，因为自部署是被 README 公开宣传的卖点，
而且仓库里已经有一个反面教材（`GA_ID` 硬编码兜底）。

| env | 默认 | 作用 | 放在哪 |
|---|---|---|---|
| `NEXT_PUBLIC_ANALYTICS_ENDPOINT` | **未设 = 客户端完全 no-op** | 客户端总开关兼上报地址。典型值 `/api/analytics/e` | `.env.example` |
| `ANALYTICS_ENABLED` | **未设 = 服务端完全 no-op，入口路由直接 204 不落行** | 服务端总开关 | `.env.example` |
| `ANALYTICS_LOG_MARKER` | `gptwiki_analytics` | 结构化日志的顶层布尔字段名，Log Sink 的 filter 认它 | `.env.example` |
| `ANALYTICS_MAX_BATCH` | `50` | 入口单批事件数上限。**必须 ≥ 客户端 flush 阈值的 2 倍**（蓝图 §3.1；客户端定量 flush 是 20 条，见 §10）——初稿写 20 是错的：`pagehide` 时要一次排空最多 200 条的队列，20 的上限会让整批被拒。客户端在 flush 时**必须按 `MAX_BATCH` 切块**，不能指望一次发完 | 代码常量 + env override |
| `ANALYTICS_MAX_PROPS_BYTES` | `8192` | 单事件 properties 序列化上限，**真的实现**（§4.6） | 代码常量 + env override |
| `ANALYTICS_CAPTURE_SEARCH_TEXT` | **未设 = 不采集查询原文**，只采 hash | Q4 的内容缺口清单需要原文，这是一次显式的数据处理决定（§9.4） | `.env.example` |
| `NEXT_PUBLIC_BUILD_SHA` | 未设 = `'unknown'` | 事件上的构建版本，用于"改了埋点之后数据变了吗" | `cloudbuild.yaml` + `Dockerfile`，**但不能写成 `$COMMIT_SHA`，见下** |

**三条硬规则**：

1. **绝不硬编码兜底值。** 上面每一个 env 未配置时都必须是"这条链路静默消失"，不是
   "退回某个默认值"。`GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-G6DSDW9X5D'` 是本仓库
   已经存在的**数据完整性 bug**：每一个不设该变量的 fork 都在往原作者的 property 打数据。
   建议在 Phase 0 顺手把它改成 `process.env.NEXT_PUBLIC_GA_ID`（不带 `||`），
   `if (!GA_ID) return null` 的分支本来就已经写好了。
2. **没有分析后端时应用必须完整可用**，且 `npm run build` 不得因缺配置失败。
   客户端 helper 在 `NEXT_PUBLIC_ANALYTICS_ENDPOINT` 未设时连事件对象都不构造。
3. **`ANALYTICS_LOG_MARKER` 一旦被 logs-based metric 与 Log Sink filter 匹配，改它就等于
   同步改两处云端配置。** 在 `src/lib/analytics/server.ts` 的文件头注释里写死这句话
   （蓝图 §7.3 的 `outcome:"mismatch"` 踩坑同款）。

**关于 `NEXT_PUBLIC_BUILD_SHA` 的一处必须绕开的坑**（初稿写错了，照着做会静默拿到 `'unknown'`）：

- `NEXT_PUBLIC_*` 是**构建期**内联进 JS bundle 的，不是运行期读的。而 `next build` 发生在
  `Dockerfile` 的 `docker build` 里（`cloudbuild.yaml` 第一步），**不在** `gcloud run deploy`
  那一步——所以往 Cloud Run 的 env vars 里加它毫无作用，必须走 `--build-arg` + `ARG`/`ENV`。
- `$COMMIT_SHA` 只有**触发器发起的构建**才有值。而 `docs/DEPLOY.md:18` 的部署方式是
  **手动 `gcloud builds submit --config cloudbuild.yaml`**，这种方式下 `$COMMIT_SHA`
  是空的（`cloudbuild.yaml` 现在也没有 `substitutions:` 块）。
- **做法**：在 `cloudbuild.yaml` 顶部加
  `substitutions: { _BUILD_SHA: 'dev' }`，docker build 步骤加
  `'--build-arg', 'NEXT_PUBLIC_BUILD_SHA=${_BUILD_SHA}'`，部署时用
  `gcloud builds submit --substitutions=_BUILD_SHA=$(git rev-parse --short HEAD)`，
  并把这条写进 `docs/DEPLOY.md`。**同时把镜像 tag 从写死的 `:latest` 换成带 sha 的**，
  否则事件里的 build_sha 与实际跑着的镜像仍然对不上。
- 拿不准时**宁可让它是 `'unknown'`**：一个诚实的 `'unknown'` 比一个永远等于 `'dev'`
  的假版本号强——后者会让"上次改埋点之后数据变了吗"这个问题永远得到"没变"的答案。

---

## §3 事件 schema 与类型化治理

### 3.1 上几层？——五层裁成四层半

蓝图五层挡五种漂移。GPTwiki 是**单仓、单语言、无 monorepo、事件量在几十这个数量级、零测试基建**，
逐层裁决：

| 层 | 上不上 | 理由 |
|---|---|---|
| L1 schema 单一真相源（union + `EVENT_EMITTERS`） | **上** | 成本最低、收益最高。全部事件在一个文件里，client 与 server 都 import（**具体多少个不写在这里，跑 `scripts/analytics-event-counts.ts`，§3.5**） |
| L2 chokepoint helper | **上，但只两端** | 没有 mobile。`src/lib/analytics/client.ts` + `src/lib/analytics/server.ts` 两个文件 |
| L3 ESLint 禁裸调 | **上** | 本仓已有 husky + lint-staged 跑 `eslint --fix`，加规则几乎零成本 |
| L4 CI schema↔调用点审计 | **上，并且这会是本仓第一个 CI gate** | 仓库现在**没有任何** test/lint CI workflow。顺手把 `typecheck` + `lint` 也挂上——零测试的仓库更需要这道闸 |
| L5 敏感命名单测 | **上，但不引入测试框架** | `package.json` 里没有 vitest/jest。为一个断言引入测试框架不划算。**把 L5 的断言写进 L4 的脚本**（用 `tsx` 跑，零新依赖），失败 `exit 1`。防线等价，成本为零 |

裁剪后的产物清单：

```
src/lib/analytics/schema.ts     # L1：union + EVENT_EMITTERS + 派生集合
src/lib/analytics/client.ts     # L2：客户端 chokepoint
src/lib/analytics/server.ts     # L2：服务端 chokepoint
src/lib/analytics/context.ts    # 信封组装（locale / country / ua / build sha）
src/lib/analytics/content-source.ts  # normalizeContentSource()，client+server 共用（§7.3）
src/lib/analytics/stream.ts     # TransformStream 计时包装（§4.5）
src/app/api/analytics/e/route.ts# §4 单一入口
src/components/layout/AnalyticsProvider.tsx  # 挂 session_id / view_id / page_viewed / pagehide flush
src/components/embed/EmbedBeacon.tsx         # embed 专用极小客户端组件，无 i18n/session 依赖（§12 H）
scripts/audit-analytics-events.ts   # L4 + L5
scripts/analytics-event-counts.ts   # §3.5 的实测脚本
.github/workflows/ci.yml            # 本仓第一个 CI
```

**为什么 `content-source.ts` 单独成文件而不是塞进 `context.ts`**：它是
**client 与 server 都要 import 的纯函数**（文章页服务端渲染时把归一值传进 props，
`article_viewed` 在客户端发；`thread_created` 在服务端发）。两份实现漂移 =
Q1 的两半数据不可比，而这正是本方案唯一一个"分组维度错了就全错"的字段。

### 3.2 emitter 只有两个值——这是对蓝图 §2.1 的实质偏离

蓝图钉死四个值（`server` / `client` / `both` / `both_server_authoritative`），
理由是"把后两者合并会重新打开五个伪造口子"。

**GPTwiki 用另一个办法达到同样的安全性：从命名上消灭双端发射。**

规则：**意图（intent）用 client 名，结果（outcome）用 server 名，永不复用同一个名字。**

| 意图（client） | 结果（server） |
|---|---|
| `thread_submitted` | `thread_created` |
| `thread_merge_clicked` | `thread_merged` |
| `publish_dialog_opened` | `wiki_published` |
| `chat_message_sent` | `ai_stream_started` / `ai_stream_completed` |
| `auth_started` | `auth_completed` |

于是 `EVENT_EMITTERS` 的值域是 `'server' | 'client'`，`CLIENT_EMITTABLE_EVENTS` =
`filter(EVENT_EMITTERS[n] === 'client')`，入口 allowlist 就是它。**没有任何事件既能被
client 发又能被 server 发**，所以：

- 蓝图 §5.3 的 `source` 消歧、§6.3 的 `v_dual_emit_dedup` 视图 **在 GPTwiki 不存在**。
- 蓝图 §2.1 那个"声明 `both_server_authoritative` 前必须先用数据验证 server 副本在生产
  路径上真的在落行"的踩坑（`ai_generate_started` 事故）**在 GPTwiki 不可能发生**。

**但这条纪律必须被强制，否则安全性就退化了。** 在 `scripts/audit-analytics-events.ts` 里
加一条断言：**任何一个事件名在 client 与 server 两侧的调用点扫描结果里同时出现 → exit 1**。
并在 `schema.ts` 头部写清楚：

> 这里刻意只有两个 emitter 值。前提是"intent/outcome 分名"的纪律。
> 如果哪天真的出现一个必须双端发射的事件（例如需要 client 副本携带 server 看不到的信号），
> **必须先把蓝图 §2.1 的四值 emitter 表整套搬回来**，包括
> `both_server_authoritative` 在入口被拒的行为，以及 §6.3 的 dedup 视图。
> 不要偷懒把它标成 `client` 了事。

### 3.3 `EVENT_EMITTERS` 的 fail-closed 机制（照抄，一字不改）

```ts
export type AnalyticsEvent =
  | { name: 'article_viewed'; properties: { wiki_id: string; content_source: ContentSource; /* ... */ } }
  | { name: 'thread_created'; properties: { wiki_id: string; thread_id: string; /* ... */ } }
  | /* ... */;

export type AnalyticsEventName = AnalyticsEvent['name'];

// Record 作用在字符串字面量 union 上时，每个成员都是必填 key。
// 往 union 里加事件而不声明 emitter → 这个初始化器直接 TS2739 编译失败。
// 没有默认值、没有 index signature：「忘了声明」这个状态在类型上不存在。
export const EVENT_EMITTERS: Readonly<Record<AnalyticsEventName, 'server' | 'client'>> = {
  article_viewed: 'client',
  thread_created: 'server',
  /* ... */
};

export const CLIENT_EMITTABLE_EVENTS: ReadonlySet<AnalyticsEventName> = new Set(
  (Object.keys(EVENT_EMITTERS) as AnalyticsEventName[]).filter((n) => EVENT_EMITTERS[n] === 'client')
);
```

**方向必须是"新事件默认什么都不是，必须显式声明"**，不能是"默认 client 可发，
维护一份 server-only 手工名单"（蓝图 §2.1 踩坑一：fail-open 推导让任何 HTTP 客户端
都能伪造支付/积分事件）。

在 GPTwiki，被伪造会真正造成伤害的是这五个：
`auth_completed`、`wiki_published`、`thread_created`、`thread_merged`、`ai_entitlement_denied`
——它们全部是 `server`，入口对它们一律 400/丢弃。理由：这五个是"内容在生长"和"BYOK 墙有多
致命"两个叙事的**唯一证据**，被灌水就等于产品叙事被灌水。

### 3.4 事件集合的克制

**能用谓词表达的，不新增事件名。** 已经据此砍掉三个候选：

- ~~`search_zero_result`~~ → `search_performed WHERE result_count = 0`
- ~~`suggestions_empty`~~ → `search_performed WHERE caller='chat' AND result_count = 0`
- ~~`article_bounced`~~ → `article_viewed` 无后继事件 / `article_read_depth.max_scroll_pct < 25`

理由：事件名是**永久契约**（要进 emitter 表、进 allowlist、进下游过滤器），
而谓词是**查询时的自由**。蓝图案例 B 的次生灾害（`feed → home_foryou` 改名导致下游
硬编码过滤器静默漏计三周）就是"事件名是永久契约"的代价证明。

### 3.5 永远不把集合大小写进 prose

本文**刻意不写**"共 N 个事件"。要数就跑：

```bash
npx tsx scripts/analytics-event-counts.ts
```

脚本带 partition 断言：`serverOnly + clientEmittable === 全量`，破了 `exit 1`。
（蓝图 §2.6：Luddi 修这条时发现**五处** prose 数字全部过时。）

例外：`scripts/audit-analytics-events.ts` 里 pin 死的数字（如"权威事件恰好 5 个"）可以有
——那是防线，变了本来就该有人看一眼。

---

## §4 数据入口

### 4.1 chokepoint 在哪

GPTwiki 有**两个** chokepoint，不是一个：

| 通道 | chokepoint | 到仓的路径 |
|---|---|---|
| 客户端事件 | `POST /api/analytics/e`（`src/app/api/analytics/e/route.ts`） | 路由 handler → `console.log` 结构化 JSON → Cloud Logging → Sink → BigQuery |
| 服务端事件 | `trackServer()`（`src/lib/analytics/server.ts`） | 同上，直接 stdout |

两条通道**在 stdout 这一层汇合**，写出完全相同的行结构（只有 `emit_source` 不同）。
这意味着：**仓表只有一张，schema 只有一份，加字段只改一处。**

### 4.2 为什么入口放在本站域名下（以及回源锁定不是问题）

- CF Cache Rule 第 3 条已经把 `/api/*`（除 sitemap/og/feed）设为 Bypass cache → beacon 直达源站。
- CF Transform Rule 会给经 CF 的请求注入 `X-Origin-Auth` → `src/proxy.ts` 的回源锁定**放行**。
- 绕过 CF 直连 Cloud Run 的伪造 beacon → **403**。

调研把回源锁定列为"会拦截自建采集端点"的约束。**结论相反：它是这个入口最好的第一道闸**，
前提是 U5 确认 `ORIGIN_AUTH_SECRET` 真的配了。唯一要注意的是本地开发：该 env 未设时检查
被跳过（`proxy.ts` 已经这么写了），所以 `npm run dev` 不受影响。

### 4.3 协议

```
POST /api/analytics/e
Content-Type: application/json

{ "events": [ { "name": "article_viewed", "ts": 1755734400000, "properties": {...} }, ... ] }

→ 204 No Content（永远。除非整批被拒才 400）
```

Zod schema 加进 `src/lib/validation.ts`（跟着仓库现有约定走，用现成的
`parseJsonBody` helper）：

```ts
export const analyticsEventSchema = z.object({
  name: z.string().min(1).max(64),
  ts: z.number().int().nonnegative().optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});
export const analyticsBatchSchema = z.object({
  events: z.array(analyticsEventSchema).min(1).max(50),   // = ANALYTICS_MAX_BATCH（§2.3）
});
```

五道闸，顺序固定：

1. **总开关**：`ANALYTICS_ENABLED` 未设 → 直接 204，不解析 body。
2. **限流**：复用 `checkRateLimit`（`src/lib/rate-limit.ts`），
   `key: 'analytics:' + getClientId(req)`，**120 次/分/IP**。
   > **本项目特有的坑**：这个限流器是**进程内 Map**，而 `--max-instances 10`。
   > 实际生效上限最坏是 10 × 120 = 1200/分/IP。这个余量是给**运营商 NAT 共享出口 IP**的
   > （蓝图 §3.4：Luddi 被 carrier NAT 逼着从 120 提到 240），不是给单用户的。
   > 不要为了打点去把限流器换成 Redis——那是给一个免费项目加一个付费依赖。
3. **fail-closed allowlist**：名字不在 `CLIENT_EMITTABLE_EVENTS` 里 → **静默丢弃该条**，
   同批合法的照收并 204。整批全非法才 400。
   （蓝图 §3.2：一个旧客户端里混着一个已退役事件，不该拖死同批其余事件。）
4. **时钟 clamp**：客户端自报 `ts` 只在 `[now − 24h, now + 60s]` 内被采信；
   窗口外**丢弃 ts、改用服务端到达时间**（不是 clamp 到边界值）。
   > GPTwiki 的代价比 Luddi 小：没有移动端离线 outbox，超 24h 的迟到几乎只可能是坏时钟。
   > 但**代价仍要写进口径**：被重打时间戳的行会落到"送达日"的分区里。
5. **properties 大小上限**：序列化后 > `ANALYTICS_MAX_PROPS_BYTES`（8 KB）→ 丢弃该条并
   把 `outcome:'props_too_large'` 记进日志（这条日志喂 §8.2 的告警）。

### 4.4 服务端事件的调用点纪律

**规则：一个业务事实只在一个地方发。** GPTwiki 有三处特别值得设计成"一个调用点覆盖多条路由"：

1. **`ai_entitlement_denied` 发在 `resolveApiKeyForUser` 里，不发在五条路由里。**
   `src/lib/ai/resolve-key.ts` 是 `API_KEY_REQUIRED` / `QUOTA_EXHAUSTED` 两种拒绝的
   **唯一真相源**；`src/app/api/chat/route.ts:27`、`src/app/api/wiki/route.ts:52`、
   `src/app/api/wiki/[id]/route.ts:64`、`src/app/api/wiki/[id]/threads/route.ts:69`、
   `src/app/api/wiki/[id]/merge/route.ts:74` 五条路由只是把它的返回值翻译成 403（已逐条核实）。
   给 `resolveApiKeyForUser(model, userId, route)` 加第三个参数。

   **但拒绝分支是三个不是两个，而且其中两个的业务含义完全不同**（读一遍 `resolve-key.ts`
   就能看出来，初稿把它们合并了，那会直接毁掉 Q5 的结论）：

   | 代码位置 | 条件 | 路由翻译成 | **必须区分的 `reason`** | 业务含义 |
   |---|---|---|---|---|
   | `resolve-key.ts:45` | 有平台 key，但 `freeDailyLimit() <= 0` | `API_KEY_REQUIRED` | `BYOK_ONLY` | **这才是 2026-06 那个 `FREE_DAILY_MESSAGES=0` 决策掐死的人** |
   | `resolve-key.ts:56` | 这个 model 压根没有平台 key | `API_KEY_REQUIRED` | `NO_PLATFORM_KEY` | 运维没配 env，与产品决策无关 |
   | `resolve-key.ts:52` | 有平台 key、有免费额度、但今天用完了 | `QUOTA_EXHAUSTED` | `QUOTA_EXHAUSTED` | 只有在 `FREE_DAILY_MESSAGES > 0` 时才可能出现 |

   把前两者都记成 `API_KEY_REQUIRED`，等于把"要不要推翻 BYOK-only 决策"这个问题
   （Q5 的全部意义）和"某个 provider 的 env key 忘了配"混成一个数。**一个调用点，
   五条路由全覆盖，而且以后新增路由自动覆盖——前提是三个分支各发一次。**

   **配套的一处必要改动**：`ResolvedKey` 目前是
   `{ apiKey, needsConfig, quotaExhausted }`（`resolve-key.ts:7-13`），
   **拿不到"这个 key 是用户自己的还是平台的"**。§12 的 `ai_stream_started.byok`
   依赖这个信息，所以要给 `ResolvedKey` 加一个 `keyOrigin: 'user' | 'platform'`
   字段（`resolve-key.ts` 的三个成功分支 :32/:39/:50 各自填），并在 `/api/chat` 等处
   透传给事件。不加这个字段，`byok` 就只能靠猜。

2. **`search_performed` 发在 `src/app/api/search/route.ts`**，它是搜索页和
   `WikiSuggestions.tsx` 的共同出口。需要配套改动：`WikiSuggestions.tsx` 的
   `fetch('/api/search?q=...')` 加上 `&caller=chat`，`searchQuerySchema` 加一个
   `caller: z.enum(['search','chat']).default('search')`。不加这个参数，两种语义完全不同的
   搜索会混成一个数（§7.6）。
3. **`auth_completed` 发在 `src/lib/auth.ts` 的 `jwt` callback 里**，
   在 `if (user)` 分支内、`snap.exists` 判断处：
   ```
   is_new_user: !snap.exists
   ```
   **为什么必须是这里**：文件里已有的注释解释了 `signIn` callback 拿到的 `user.id` 对
   OAuth 首登是随机 UUID，产品侧 `users/{id}` 的镜像写入才被放在 `jwt` 里。
   打点的锚点必须和产品的锚点一致，否则 `auth_completed.user_id` 会指向一个全站没人读的孤儿 key。
   **另一个坑**：`jwt` callback 在每次 token 刷新时都会跑，只有 `user` 存在时才是真实登录
   ——注释里写明了这一点，所以事件必须在 `if (user)` **内部**发。发在外面会让注册数虚高一到两个数量级。

### 4.5 流式响应的计时——本项目最容易打错的一处

`src/app/api/chat/route.ts` 里 `getAIStream()` 是**立即返回**的
（`src/lib/ai/provider.ts` 只是 switch 到三个 `stream*` 函数）。
`return new Response(stream, ...)` 也立即返回。**在 handler 里测耗时，测到的是零。**

必须把流包起来：

```ts
// 概念示意，落地时放在 src/lib/analytics/stream.ts
const t0 = Date.now();
let firstChunkAt = 0, bytes = 0, chunks = 0;
const instrumented = stream.pipeThrough(new TransformStream({
  transform(chunk, ctrl) {
    if (!firstChunkAt) firstChunkAt = Date.now();
    chunks++; bytes += chunk.byteLength ?? 0;   // chunk 是 Uint8Array（TextEncoder 入队）
    ctrl.enqueue(chunk);
  },
  flush() {
    trackServer('ai_stream_completed', {
      model, route, ttfb_ms: firstChunkAt - t0, total_ms: Date.now() - t0, bytes_out: bytes, chunks,
    }, ctx);
  },
}));
return new Response(instrumented, { headers: { ... } });
```

三个必须写进代码注释的注意点：

- **`flush()` 在客户端中途断开时不一定被调用**。所以"流开始了但没有结束事件"是
  `chat_stream_abandoned` 的**服务端侧影**，而不是数据丢失。分析时用
  `ai_stream_started − ai_stream_completed − ai_stream_failed` 的差额去和客户端的
  `chat_stream_abandoned` 对照（**三项都要减**，否则 provider 故障会被误记成用户放弃），
  两者不会精确相等（客户端事件本身会丢），只该在同一量级。
- **U9 的风险点就在这里，但比初稿假设的小**：`flush()` 是在**流关闭那一刻**触发的，
  而 HTTP 响应在流关闭之前不算完成——所以这条 `console.log` 落在 CPU 分配窗口**之内**
  （`cloudbuild.yaml` 没开 `--no-cpu-throttling`，CPU 在**响应完成后**才被节流）。
  它仍然是本方案里唯一一个不在 `return Response` 之前落地的服务端事件，
  上线第一周仍要实测它相对 `ai_stream_started` 的到达率——但预期缺口的主因是
  **客户端中途断开导致 `flush()` 根本没被调用**（上一条），不是实例回收。
- **反过来，真正被这条约束禁掉的写法是这个**：任何
  `void doSomething().then(() => trackServer(...))` 形式的、排在 `return Response` 之后
  的打点。响应一完成 CPU 就被节流，这类回调可能永远不执行且**不产生任何错误日志**。
  本方案的所有服务端事件都在 `return` 之前同步写完，`ai_stream_completed` 是被
  TransformStream 天然拉进响应窗口的例外。这条要写进 `src/lib/analytics/server.ts` 的头注释。
- **`ai_stream_failed` 在这段代码里发不出来——`flush()` 不是错误路径。** 三家 provider 的
  失败形态都是 `controller.error(error)`（`src/lib/ai/claude.ts:29`，openai / gemini 同构），
  错误沿 `pipeThrough` 传到 readable 侧，**`TransformStream` 的 transformer 没有 abort 回调，
  `flush()` 一次都不会跑**。照上面的示意写，一次 provider 500 会同时丢掉
  `ai_stream_completed` 和 `ai_stream_failed` 两条，表现为"started 有、后续什么都没有"，
  和客户端中途断开**完全无法区分**。<br>
  **做法**：不要用 TransformStream，改成自己读源流的包装 ReadableStream，
  把 `reader.read()` 循环整个套进 `try/catch/finally`——`catch` 里发
  `ai_stream_failed{phase:'stream', provider_error_class, ms}` 并 `controller.error(e)`
  透传给客户端，正常结束发 `ai_stream_completed`，两条互斥且必有其一。
  （等价写法：`stream.pipeTo(new WritableStream({ write, close, abort }))`，
  `abort(reason)` 就是错误钩子。选哪个都行，**但一定要有一个错误钩子**。）
- **`/api/chat` 上 `phase:'connect'` 是不可达的**，别为它设阈值或告警。
  provider 客户端的构造与首个网络请求都发生在 `ReadableStream` 的 `start()` 内部
  （`claude.ts:8-19`），`getAIStream()` 本身只是 `switch`（`provider.ts:20-31`），
  handler 的 `try/catch`（`api/chat/route.ts:50`）只可能接住"不支持的 model"这种
  已被 zod 挡在门外的情况。**`/api/chat` 的失败 100% 是 `phase:'stream'`。**
  `phase:'connect'` 只在 drain 型路径（下一条）上才有意义。
- **`src/app/api/wiki/[id]/threads/route.ts:91-99` 是另一条路径**：它把同一个流在服务端
  `drain` 掉（`while(true) reader.read()`），是**非流式**的等待。那条路径直接在循环
  前后取时间戳即可，不要套 TransformStream。`generateWikiContent`
  （`src/lib/ai/provider.ts:121` 的 `collectStream`）同理——`wiki_published.gen_latency_ms`
  和 `thread_merged.latency_ms` 都走这个简单形态。
- **chunk 是 `Uint8Array` 不是字符串**（三家 provider 的 `stream*` 都用
  `TextEncoder().encode()` 入队，见 `src/lib/ai/claude.ts:5,23`），所以上面
  `chunk.byteLength` 是对的；`chars_out` 实际是**字节数**，多字节语种（中/日/阿）会被高估。
  字段名要么改成 `bytes_out`，要么在口径文档里写明它是字节——**这个产品有 15 个语种，
  含 RTL 阿拉伯语，把字节当字符会让"分语种比较产出长度"直接失真。**

### 4.6 properties 上限要**真的实现**

蓝图 §3.5 记录了 Luddi 的教训：注释里写着 "Properties cap = 32 KB"，**代码里从未实现**。

GPTwiki 有一个额外的、硬性的理由必须实现它：**Cloud Logging 单条日志条目有大小上限
（约 256 KB），超限会被截断或丢弃。** 一个失控的调用点不只是撑爆仓表行，是直接把
**整条管线**在日志层弄坏。所以上限是 8 KB（远低于日志上限，留足信封空间），
并且在 `scripts/audit-analytics-events.ts` 里加一条断言：
**任何事件的 properties 类型中不得出现 `string` 类型的自由文本字段，除非在书面例外名单里**
（当前例外只有 `search_gap.q_text` 一项，见 §9.4）。

---

## §5 身份模型

### 5.1 锚点：登录态是 `session.user.id`，匿名态**没有锚点**

```
user_id   = session.user.id  (= FirestoreAdapter 自动 ID = token.sub)  | null
session_id = 内存态 UUID v4，页面生命周期内有效                          | null (server-only 事件)
view_id    = 每次页面加载一个 UUID v4                                   | null (server-only 事件)
```

登录态部分照抄蓝图 §4.2：`user_id` 是**唯一权威 ID**，全站的 `authorId` /
`contributorIds` / `freeQuota` / `waitlist` 文档 id 都是它，打点不引入任何别名。

### 5.2 匿名态：**不铸持久 ID**——对蓝图 §4.1 的整节推翻

蓝图 §4.1 的规则是"匿名身份必须是自己铸造、自己存储的 UUID v4，web 用 HttpOnly cookie"。
**GPTwiki 不这么做。** 论证：

**第一步：先看九个业务问题真的需要什么身份粒度。**

| 业务问题 | 需要的最小身份粒度 |
|---|---|
| Q1 哪层内容带流量 | **无身份**（纯计数 × 维度） |
| Q2 登录墙漏斗 | **单次会话内**：落地 → 展开对话 → 撞墙，全发生在一个页面生命周期里 |
| Q4 搜索缺口 | **无身份**（query 级聚合） |
| Q6 模型质量 | **单次会话内**（放弃率、改写率、发布率） |
| Q7 语种价值 | **无身份** |
| Q8 embed | **无身份**（聚合曝光/回流） |
| Q9 管线 ROI | **无身份** |
| Q3 thread/merge | `user_id`（写路径必登录） |
| Q5 BYOK 墙 | `user_id`（写路径必登录） |

**九个问题里没有一个需要跨会话的匿名身份。** 这不是巧合——GPTwiki 的匿名侧是纯读，
所有需要追踪"同一个人的多次回访"的问题（留存、cohort、LTV）在这个产品阶段根本没被提出。

**第二步：铸持久 ID 的成本在 GPTwiki 特别高。**

- **合规**：在设备上写一个持久标识符，在 EU/UK 属于 ePrivacy 第 5(3) 条管辖，需要事先同意。
  站点覆盖 15 个 locale 含 EU 语种，**目前没有 consent 横幅、没有隐私政策页**
  （`src/app/[locale]/` 下确实没有 `privacy` 路由）。铸 ID = 必须先建整套 consent 基建。
- **CDN/缓存**：在 `src/proxy.ts` 里种 cookie 意味着给每个响应挂 `Set-Cookie`。
  当前 CF 没有缓存 HTML（Cache Rules 里没有 HTML 规则），所以暂时无害；
  但这会**永久堵死"以后给文章页加边缘缓存"这条路**——而文章页是这个产品的全部流量基础。
  为一个没人问的问题，抵押掉最重要的性能杠杆，不划算。
- **`/embed/[id]` 上根本拿不到**：embed 跑在第三方站点的 iframe 里，顶级站点是别人的域名，
  cookie 在浏览器的分区/拦截策略下要么读不到要么被分区。
- **数据质量本来就烂**：蓝图 §4.3 踩坑记录 Luddi 实测 **93% 的匿名身份只有一个事件**，
  且一次冷启动可能裂出 6 个 anon id。GPTwiki 的匿名侧是搜索一次性流量，只会更糟。

**第三步：结论与替代方案。**

- **`session_id`：模块作用域内存变量，UUID v4，不写任何存储**（不用 cookie、不用
  localStorage、不用 sessionStorage）。App Router 的客户端软导航（`<Link>` 跳转）
  保持同一个值；硬导航（首次落地、跳去 OAuth）重置。
- **`view_id`：每次页面加载一个 UUID v4。**
- 由此产生的性质：**没有任何东西被存到或读自用户设备** → ePrivacy 第 5(3) 条的适用面
  大幅缩小 → 读路径的打点不依赖 consent 横幅就能上线（GA4 的既存问题另论，§9.1）。

**必须诚实承认的损失**：

| 损失 | 影响 | 缓解 |
|---|---|---|
| 无法算匿名回访率 / 跨会话留存 | Q1~Q9 都不需要，但以后可能需要 | GA4 已经在提供聚合层的回访估计（带它自己的 consent 问题） |
| 硬导航会重置 `session_id` | 匿名读者"首页 → 文章 → 另一篇文章"的路径会断成多段 | 用 `referrer_host` + `entry` 维度做聚合层的路径推断，够用；不要在断裂的 session 上算"人均浏览篇数" |
| `login_wall_hit → auth_completed` 跨了 OAuth 的硬导航 | 漏斗断在最关键的一步 | **已核实：今天补不了，必须先改产品。** `src/app/[locale]/login/page.tsx:27` 的 `callbackUrl` 是**写死的 `/${locale}/chat`**，三个 provider 的 `signIn()` 调用（:34/:110/:135）全用它，来源信息在跳去 OAuth 的那一刻就丢了。所以 `auth_completed.from_surface` 在 Phase 0 只能是 `null`。Phase 2 的改法：登录页读 `?next=`/`?from=` 并拼进 `callbackUrl`，`auth_completed` 再从 `callbackUrl` 解析（**解析时必须只取路径首段并对着白名单校验**，绝不把外部 URL 原样入库） |

**重估触发条件**（蓝图 §8.2 的纪律：没有触发条件的例外决定会变成永久盲区）。
出现下列任一情况，就回来重新评估"要不要铸持久匿名 ID"：

1. 出现了一个真正需要跨会话匿名度量的业务问题（匿名留存、多次访问后转化、内容推荐个性化）。
2. 站点上线了 consent 横幅 + 隐私政策页（届时铸 ID 的合规成本降到接近零）。
3. 决定给文章页加 CF HTML 缓存（届时必须重新核算 `Set-Cookie` 的代价，结论可能是**更加**不该种 cookie）。
4. 匿名漏斗的断裂被证明导致了错误结论。

**同时作废的蓝图条目**：§4.3 的 `AnonIdentityLink` 桥接**整节不适用**——没有持久匿名 ID，
就没有可以桥接的东西。§4.5 的 `identity_grade` 三级可信度也不适用：GPTwiki 只有两级
（有 JWT / 没有），没有 Luddi 那种"移动端冷启动读不到 JWT 于是用 `X-Distinct-Id` 自报"
的中间态。

### 5.3 多租户：不适用，但"内容分区轴"必须带

GPTwiki 没有 org / workspace / tenant，任何集合上都没有 `tenantId`。
蓝图里凡涉及租户维度的部分整体不适用。

**但有一个必须带的双轴**，而且极易搞错（§7.2 详述）：

```
locale            ← URL 里的 /{locale}/，由 src/proxy.ts 的 cookie → Accept-Language → default 决定
content_language  ← wiki 文档自己的 language 字段
```

两者会分叉（zh 读者可以打开 en 文章）。**每个与文章相关的事件都必须同时带这两个字段。**
混为一谈会毁掉 Q1 和 Q7 的全部分析。

MIT 自部署确实会产生"别的部署"，但那是各自独立的 Firebase 项目 + 各自独立的
`ANALYTICS_ENABLED`，不是同一实例的租户。**这正是 §2.3 第 1 条硬规则存在的原因。**

### 5.4 `/embed/[id]`：完全无身份

embed 页的事件**不带** `session_id`、**不带** `view_id`、**不带** `user_id`。
只带：`wiki_id`、`embed_host`（`document.referrer` 的 eTLD+1，或
`location.ancestorOrigins[0]` 的 host，都拿不到就是 `null`）、`lang_param`、`content_language`。

推论（必须写进口径）：**embed 曝光是"渲染次数"，不是"读者数"，永远不能和
`article_viewed` 相加**。这是蓝图 §6.2 那条"网格每卡计一次 vs 全屏每屏计一次，
两者相加得到的是布局的函数不是兴趣的函数"规则在 GPTwiki 的实例化。

---

## §6 存储与 sink 选型

### 6.1 结论

| 角色 | 选型 | 装什么 |
|---|---|---|
| **仓（唯一分析 sink）** | **BigQuery**，数据集 `gptwiki_analytics`，经 **Cloud Logging Sink** 灌入 | 全量事件 |
| 采集通道 | Cloud Run stdout → Cloud Logging | 不是存储，是运输 |
| 产品状态（**不是 sink**） | Firestore 现有计数器：`wikis.views`、`wikis.threadCount`、`users.wikisCount/followersCount/followingCount`、`users.freeQuota` | 只保留必须在请求路径里回读并展示给用户的量 |
| 外部获取度量（**独立的腿**） | GA4 property `G-G6DSDW9X5D`（+ 其 BigQuery Export，U2） | 渠道 / 落地页 / 地理 / 设备 |

### 6.2 为什么仓是 BigQuery 而不是 Firestore

调研已经给出了正确方向，这里补齐论证并加上本仓库的具体证据：

1. **Firestore 没有聚合能力**。没有 `GROUP BY`、没有分析型扫描，每次计数都是按文档计费的读。
   Q1 那种"按 `content_source × content_language × 日` 分组数 `article_viewed`"在 Firestore
   里要么不可能，要么就是全表扫。
2. **复合索引必须提前声明**。`firestore.indexes.json` 现在只有 **3 条**
   〔2026-08-21 核实：原文写「4 条（全在 `wikis` 上）」，基线 `f2dfb0e` 上实为 3 条，
   且其中一条在 `arenaVotes` 上，不全在 `wikis`〕。
   一个高基数事件集合意味着每来一个新的分析角度就要加一条索引 + 一次部署。
   （数字变了不影响这条论证——重点是「每个新分析角度 = 一条新索引 + 一次部署」这个
   斜率，不是当前的绝对条数。）
3. **规模已经证明了扫描不可行**。`src/app/api/sitemap/route.ts` 的头注释白纸黑字：
   "even a 50k-capped scan measured ~57s"，整个 sitemap 索引被重写成**算术式、绝不扫集合**
   就是为了躲开这一点。往同一个数据库里再塞一个高频写入的事件集合是反向操作。
   〔2026-08-21 核实〕这个 57s 是 **`7bdcf24`（2026-07-11）改造之前**旧设计的历史测量值，
   **不是现状**——现在的 sitemap 索引只做算术 + 一次单文档读，子页全部是有界查询。
   引用它时务必带上「改造前」这个限定：已经出现过把它转引成「sitemap 现在还在扫库、
   要 57 秒」的例子。
4. **成本红线**。平台被刻意设计成零边际成本（BYOK-only、`FREE_DAILY_MESSAGES=0`、
   靠 PayPal 捐赠维持）。**打点绝不能给每个请求增加一次付费写。**

### 6.3 为什么运输层是 Cloud Logging Sink 而不是 BigQuery 流式插入

这是本方案对蓝图 §1.1 / §5.4 的第二处实质偏离，理由是 GPTwiki 特有的：

| 维度 | Logging Sink（选它） | BQ Storage Write / streaming insert（Luddi 的做法） |
|---|---|---|
| 新增 npm 依赖 | **零**（`package.json` 里没有 `@google-cloud/bigquery`，也不需要加） | 需要加 SDK，增加镜像体积与供应链面 |
| 新增 IAM 权限 | **零**（Cloud Run 服务账号本来就能写日志） | 需要给服务账号 BQ dataEditor |
| 缩容到零的丢数据风险 | **无**（写完 stdout 就归日志代理管） | 有（buffer + SIGTERM 赛跑，`--min-instances 0`） |
| 需要 buffer / flush / drain 代码 | **不需要** | 需要，且是最容易写错的一段 |
| 延迟 | 分钟级 | 秒级 |
| 成本 | Sink 本身免费；Logging 摄入有 **50 GiB/项目/月免费额度** | streaming insert 约 $0.05/GB，量小时也近乎为零 |
| 失败可观测性 | 有现成 metric `logging.googleapis.com/exports/error_count` | 要自己打 `insert_failed` 日志 |

**结论**：在"零依赖、零权限变更、随时缩容到零、分钟级延迟完全够用"的组合下，
Logging Sink 是严格占优的。Luddi 之所以用流式插入，是因为它有常驻实例、有 monorepo
里现成的 BQ 基建、且需要更低延迟——这两条前提 GPTwiki 都不成立。

**切换触发条件**（写下来，别等到出事才想）：

- Logging 摄入量逼近 50 GiB/月（≈ 1.6 GB/天 ≈ 300 万事件/天）→ 换成 BQ Storage Write API。
- 出现了真正需要亚分钟延迟的场景 → 同上。

### 6.4 落地细节（三条会咬人的）

1. **`properties` 必须序列化成 JSON 字符串列，不能是嵌套对象。**
   Log Sink 写 BigQuery 时会把 `jsonPayload` 的字段**自动推断成列**，schema 随新字段
   自动演化，字段名里的点会被改写成下划线，同名不同类型的字段会被加后缀。
   把自由形状的 properties 直接摊平进 `jsonPayload` 会造成**列爆炸 + 类型漂移**。
   做法：**高价值维度提升为顶层扁平标量列**（类型固定，见 §6.5），
   剩下的塞进一个 `properties_json STRING`，查询时用 `JSON_VALUE()`。
   > 这和蓝图 §5.1 的"enrich 字段提升为真实列"是同一个动作，但理由不同：
   > Luddi 是为了查询性能，GPTwiki 是为了躲开 log-sink 的 schema 自动演化。
2. **给 `_Default` 日志桶加排除过滤器**：`jsonPayload.gptwiki_analytics=true`。
   Sink 路由发生在日志桶存储**之前**，所以排除掉不会影响 BigQuery 那条路，
   但能省下 50 GiB 摄入额度给真正的服务日志，顺便让 Cloud Run 的日志视图不被事件刷屏。
3. **保留期只信 `bq show`，不信文档**（蓝图 §5.1 踩坑：Luddi 一度文档写"永久保留"，
   实测 `expirationMs=63072000000`）。设置数据集默认分区过期
   **400 天**（= 365 + 一个月对齐余量，够做同比；SEO 产品的季节性必须能看 YoY），
   然后用 `bq show --format=prettyjson gptwiki_analytics.<table>` 亲眼确认一次。
   > **这是对蓝图的一处有意下调**：蓝图 §5.1 给"仓"定的是 **730 天**（真相源），400 天是
   > 它给热表的数。这里取 400 的理由是 GPTwiki 只有一个 sink 且它**同时**扮演真相源与
   > 热表两个角色，而 400 已经覆盖了唯一需要长窗口的分析（YoY 季节性）。
   > **代价要认**：24 个月的长周期对比做不了。改主意时**只能向前填**（延长过期不会找回
   > 已删分区），所以如果对 730 有一丝犹豫，**第一天就设 730**——存储成本按 §6.6 是每月几美分，
   > 这是本方案里最便宜的一个可逆性。

### 6.5 仓表的顶层列（提升出来的维度）

```
event_id STRING            -- UUID v4；重放/去重用
event_name STRING
event_ts TIMESTAMP         -- 已 clamp
ingest_ts TIMESTAMP        -- 服务端到达时间
emit_source STRING         -- 'client' | 'server'   ← 注意不叫 source（§0.1 第 10 条）
schema_version INT64
build_sha STRING
user_id STRING             -- nullable
session_id STRING          -- nullable（server 事件与 embed 事件为 null）
view_id STRING             -- nullable
locale STRING              -- URL 的 /{locale}/
content_language STRING    -- wiki.language；无关事件为 null
content_source STRING      -- 归一后的五值：'editorial'|'wikipedia'|'grokipedia'|'seed'|'ugc'
                           --   由 normalizeContentSource() 产出（§7.3），无关事件为 null
                           --   原文保留在 properties_json.content_source_raw
wiki_id STRING             -- nullable
surface STRING             -- 'home'|'list'|'search'|'browse'|'tag'|'article'|'chat'|'profile'|'login'|'donate'|'embed'|'api'
model STRING               -- 'claude'|'gpt'|'gemini'|null
country STRING             -- CF 注入的 cf-ipcountry，国家级；**永不存 IP**
is_bot BOOL                -- UA 判定（§7.4）
referrer_host STRING       -- eTLD+1，**只存 host，永不存完整 URL 或 query**
properties_json STRING     -- 其余一切
```

分区：`DATE(event_ts)`。聚簇：`(event_name, content_source, locale)`
——这三个是 Q1/Q7 最常用的过滤组合。

**`locale` 在服务端事件上从哪来——这一格不填清楚，Q6/Q7 的"×语种"那一半会整体为 null。**
所有 `/api/*` 路由都在 `src/proxy.ts` 的 `BYPASS_PREFIXES` 里（第 7 行），
**URL 上根本没有 `/{locale}/` 前缀**。所以服务端信封的取值顺序必须显式定成：

1. **`Referer` 头的路径首段**（用 `hasLocale()` 校验，`src/lib/i18n/server.ts:9`）。
   所有会发服务端事件的 `/api/*` 调用都是**同源 `fetch`**，默认 referrer policy
   （`strict-origin-when-cross-origin`）对同源请求会带**完整路径**，所以
   `/{locale}/chat`、`/{locale}/wiki/{id}` 都拿得到；
2. `request.cookies.get('NEXT_LOCALE')` —— 与 `src/proxy.ts:92` 读的是同一个 cookie；
3. `null`。**不要**回落到 `defaultLocale`——那会把"不知道"伪装成"英语读者"，
   直接毁掉 Q7"哪些语种是死翻译"的结论。

> **这个顺序是初稿的一处反了，必须改**：初稿把 `NEXT_LOCALE` 排第一并称它"命中率最高"。
> 实测全仓只有**一个**地方写这个 cookie——`src/lib/i18n/context.tsx:42`，即用户
> **手动点了语言切换器**之后。而 `src/proxy.ts` 的重定向路径只**读**它、从不种它。
> 也就是说对绝大多数"搜索进来、从没换过语言"的访客，这个 cookie **根本不存在**，
> 把它排第一会让服务端事件的 `locale` 大面积为 `null`。
> 顺带一个红利：§12 D 的 `has_actionable_hint` 本来就要解析同一个 Referer 首段
> （`/{locale}/chat` vs `/{locale}/wiki/{id}`），两件事共用一次解析。

`content_language` 走另一条路：它永远来自 `wiki.language` 字段，
在 `thread_created` / `thread_merged` / `wiki_published` 这些手里有 wiki 文档的
服务端事件上直接读；拿不到 wiki 文档的事件（`ai_entitlement_denied`、`auth_completed`）
就是 `null`，**不猜**。

### 6.6 成本量级估算

**输入未知（U1）**，所以给的是**换算率和盈亏平衡点**，不是一个假装精确的月账单：

以每事件约 500 B 计：

| 日事件量 | 日体积 | Logging 摄入（50 GiB/月免费） | BQ 存储（一年累计，约 $0.02/GB/月） | 结论 |
|---|---|---|---|---|
| 5 万 | 25 MB | 0.75 GB/月 → **免费** | 年末 ~9 GB → **~$0.18/月** | 总计 **< $1/月** |
| 50 万 | 250 MB | 7.5 GB/月 → **免费** | 年末 ~90 GB → ~$1.8/月 | **< $3/月** |
| 300 万 | 1.5 GB | 45 GB/月 → **踩线** | — | 该换 Storage Write API 了 |

- **Firestore 新增写入：0 次/请求。** 这是本方案最重要的成本性质。
- **查询成本**：on-demand 计价（约 $6.25/TiB 扫描），所以单次查询的封顶完全由
  `maximumBytesBilled` 决定——**这个数不能照抄蓝图的 5 GiB，见 §8.5 第 1 条**。
  参考量级：扫 1 GiB ≈ $0.006。
- **Cloud Run 增量**：一个返回 204 的路由，可忽略；但注意 `--memory 512Mi` 已经不宽裕，
  所以**入口路由不做任何缓存、不建任何模块级 Map**（§2.1 与蓝图"不得把会话/去重状态放模块作用域"）。

### 6.7 去重：单一 sink 也需要一个 `event_id`，理由和蓝图不同

蓝图 §5.4 用 `insertId = event_id` 让 BigQuery 的流式插入自己去重。
**Logging Sink 没有这个机制**——它只是把日志行原样搬进表，不做任何去重。
所以本方案里 `event_id` 是**必须的**，但它的消费者从 sink 移到了查询层。

三个在 GPTwiki 真实存在的重复来源：

1. **客户端 flush 的双发。** §10 规定 `pagehide` 用 `sendBeacon`、失败降级
   `fetch keepalive`。"失败"的判定是 `sendBeacon` 返回 `false`（队列已满），
   但浏览器在返回 `true` 之后仍可能实际未送达，反过来也有窗口——
   两条路都走一遍时同一批事件会进两次。
2. **BFCache 恢复。** `pagehide` 在进 BFCache 时触发；用户按后退键回来后
   页面继续存活，同一个 `view_id` 下的后续 flush 会带上重复的旧事件（如果队列没清干净）。
3. **用户手动刷新时的重试。**

**做法**：`event_id` 由客户端 chokepoint 在**入队那一刻**生成一次
（不是在 flush 时），随事件走完全程；`v_events_canon` 视图里做

```sql
QUALIFY ROW_NUMBER() OVER (PARTITION BY event_id ORDER BY ingest_ts) = 1
```

**代价要写明**：去重发生在查询层，意味着**仓表里真的有重复行**，
任何绕过 `v_events_canon` 直接查底表的人都会多算。这正是 §7.12
"让最省事的查询恰好就是正确的查询"存在的理由——头注释里要写死这句话。

**不做**服务端去重（进程内 Map 存已见过的 `event_id`）：那正是蓝图和调研都点名禁止的
"把会话/去重状态放模块作用域"，`src/lib/rate-limit.ts` 的注释已经说明它跨实例不共享。

---

## §7 口径规则——GPTwiki 最容易数错的十二件事

蓝图 §6.3 的核心思想照抄：**prose 无法强制执行任何口径，把容易写错的规则编进视图，
让最省事的查询恰好就是正确的查询。**

### 7.1 `wikis.views` = 随机初始值 + 渲染次数，两头都不是浏览量

**规则**：`wikis.views` 在任何分析里都必须被读作
**`seed_noise + render_count`**。它永远不得与 `article_viewed` 相加、相比、或互相校验，
**也不得当作历史浏览量的近似**。

两个毛病叠加，缺一个都不足以说明它有多不可用：

1. **增量部分是渲染计数**。唯一写点在 `src/app/[locale]/wiki/[id]/page.tsx:167`
   （`void incrementWikiViews(id)`），而该页 `revalidate = 3600`，前面还压着 CF。
   每页每小时最多 +1。
2. **初始值是随机数**（§0.1 第 12 条）。镜像与 seed 文档被播了
   `Math.random()*50+5` / `*100+10` / `*80+5` / `*200+20` 不等的假底数，
   而 `seed-editorial.ts:332` 给编辑部原创写的是 `views: 0`。

**这带来一个初稿完全漏掉的、比"数字不准"严重得多的后果**：
`getPopularWikiIds(50)` 按 `views` 排序，而它同时驱动
`src/app/[locale]/wiki/[id]/page.tsx` 与 `src/app/embed/[id]/page.tsx` 两处
`generateStaticParams`，以及首页的"热门"位。也就是说——

> **被预渲染成静态页、被摆上首页热门的那 50 篇，是按随机数选出来的镜像文档；
> 编辑部原创（`views: 0`）在结构上永远进不了这个集合。**

这不是打点问题，是产品问题，但它**会污染打点的解读**：Q1 里"镜像层进站多"有一部分
是自己制造的（预渲染 + 首页曝光都偏向它），不是 Google 的选择。
**所以 Q1 的口径视图必须能按 `entry='organic'` 把内部曝光带来的流量摘掉**，
并且在报表脚注里写明这条偏置。

其余仍然成立的约束：

- **不要删它、不要改它的语义**（它已经被公开出去：JSON-LD `userInteractionCount`、
  `/embed/[id]:78` 的卡片、列表卡片），而且它是四条 Firestore 复合索引里三条的排序键
  （`language×views`、`hasHeaderImage×views`、`language×hasHeaderImage×views`）。
- **不要把 BigQuery 的真实浏览量写回这个字段**——那会改变排序行为，且对 19M 文档是一次
  不可接受的写入。
- 可选（Phase 2）：夜间作业只对**昨天真的有流量的那几千篇**写一个**新**字段
  `views30d`。成本 = 有流量的文档数，不是 19M。要新排序就要新索引（`firestore.indexes.json` +1），
  这笔账要单独算。**这个字段真正的价值不是"更准的展示数"，而是让
  `getPopularWikiIds` 有机会换掉随机播种的排序键**——那笔收益归产品，不归打点。

### 7.2 `locale` ≠ `content_language`

- "**受众语言**"（哪些语种有真实读者，Q7）→ `GROUP BY locale`。
- "**语料覆盖**"（哪些语种的内容在被读，Q1）→ `GROUP BY content_language`。
- 二者的分叉本身就是一个指标：`locale != content_language` 的占比高，说明翻译覆盖不足
  或 hreflang 没起作用。

任何一份报表里出现"语言"两个字而没说清是哪一个，就是错的。

### 7.3 `content_source` 必须随事件走、且必须先归一

**规则一：随事件走，不靠 join。** `article_viewed` 发射时，`content_source` 已经在
properties 里。

**为什么**：另一条路是"事件只带 `wiki_id`，分析时 join 一张从 Firestore 导出的 wikis 维表"
——那张维表有 **~19M 行**。导出它、维护它的新鲜度、每次查询扫它，全是为了一个可以在渲染时
零成本读到的字段（服务端组件手里本来就有整个 `wiki` 对象）。

**这是本方案里最省钱的一个决定**，也是"19M 文档 95% 是镜像"这个资产结构直接推导出的设计。

**规则二：写进事件的是归一值，不是 `wiki.source` 原文。** §0.1 第 11 条已经实测出值域：
`wikipedia-<lang>` / `wikipedia-<lang>-rich`（15 语种 × 2 变体）、`grokipedia`、
`editorial`、`editorial-draft`、`seed`、`seed-rich`、以及**缺失（= UGC）**。
把原文塞进聚簇列会让 `content_source` 变成几十个值的高基数列，Q1 的每张表都要
先手写一堆 `LIKE 'wikipedia%'`。

落地成一个共享的纯函数，放在 `src/lib/analytics/content-source.ts`，
**client 与 server 两侧都从这里 import**：

```ts
export type ContentSource = 'editorial' | 'wikipedia' | 'grokipedia' | 'seed' | 'ugc';

// 判据全部来自实测的写入点（§0.1 第 11 条），不是猜的。
// 产品代码里已有同款前缀判定：wiki/[id]/page.tsx:99-101 的 isWikipediaSourced()。
export function normalizeContentSource(source?: string): ContentSource {
  if (!source) return 'ugc';                        // createWiki 不写 source
  if (source.startsWith('wikipedia')) return 'wikipedia';
  if (source === 'grokipedia') return 'grokipedia';
  if (source.startsWith('editorial')) return 'editorial';  // editorial + editorial-draft
  return 'seed';                                     // 'seed' | 'seed-rich' | 未来新值
}
```

三条必须写进注释的取舍：

- **`grokipedia` 单独成层，不并进 `wikipedia`。** 它来自 xAI 的 grokipedia.com
  （`scripts/seed-content.ts:223`），授权状况与 CC BY-SA 的 Wikipedia 完全不同，
  而且 Q1 问的"scaled-content 算法风险"对两者的表现可能完全不一样。
  合并 = 永远看不出差别。
- **`editorial-draft` 并进 `editorial`**，但 `properties_json` 里保留 `content_source_raw`
  原文，需要时能拆开。
- **兜底是 `'seed'` 不是 `'unknown'`。** 值域是实测出来的闭集合，出现新值意味着有人加了
  新的 seed 脚本——这时该做的是回来改这个函数，而不是让一个 `'unknown'` 桶慢慢长大。
  在 §3.1 的审计脚本里加一条：`grep -rn "source: '" src/ scripts/` 的结果若出现
  本函数未覆盖的字面量 → `exit 1`。

### 7.4 必须显式排除爬虫

**这是 GPTwiki 独有的、Luddi 完全没有的风险。** 19M 个 SEO 页面意味着爬虫流量可能
远超真人流量，而 **Googlebot 会执行 JavaScript** ——它会触发 `article_viewed`。

- 每个事件带 `is_bot BOOL`（服务端在入口按 UA 判定后写入，客户端不参与判定）。
- **所有** Q1/Q7/Q9 的口径视图默认 `WHERE NOT is_bot`。
- 上线第一周就要看 `is_bot = true` 的占比，如果它高得离谱，说明 UA 名单不够或者
  判定逻辑有问题——**不要**默认它是对的。
- GA4 自带 bot 过滤，我们的管线**没有**。这是两边数字必然对不上的已知原因之一（§8.3）。

### 7.5 embed 曝光与文章浏览不可相加

见 §5.4。`embed_impression` 是**渲染次数**（CF 边缘缓存 1h 之上的客户端渲染），
`article_viewed` 是页面加载次数。两者的计费单位不同，相加得到的是分发形态的函数，
不是读者兴趣的函数。**分开报，永远分开报。**

### 7.6 `search_performed` 天然会被 chat 侧污染

`WikiSuggestions.tsx` 在**每一次 chat 首条消息**时都会打一次 `/api/search`。
不带 `caller` 区分的话：

- "站内搜索量"会被 chat 流量抬高；
- "零结果率"会混合两种完全不同的语义（搜索框里的短查询 vs chat 里的长问句）——
  而 Q4 恰恰需要分开看这两种缺口。

**必须加 `caller` 参数**（§4.4 第 2 条）。另外注意：`WikiSuggestions.tsx` 的
`useEffect` 依赖 `[query]`，在 **dev 的 StrictMode 下会双发**，生产不会。
本地验证 §10 的验收项时别被这个吓到。

### 7.7 比率一律切 T-2，但理由和蓝图不同

蓝图案例 C 的 66% 假 CTR 源于分子分母管线到达速度不同。GPTwiki 的滞后来源是：

- 本管线：Cloud Logging → BQ 是**分钟级**。
- GA4 BigQuery Export：**天级批量**。

所以：

- **纯本管线内部的比率**（如 merge 率、放弃率）可以切 **T-1**。
- **任何跨 GA4 的比率**（如"GA4 会话数 → 我们的 article_viewed 转化率"）必须切 **T-2**。

固化成视图 `v_ratio_safe`（§7.12），视图头注释里写明这两个不同的滞后源，
免得下一个人以为可以统一放宽。

### 7.8 匿名的计数单位是"会话"，不是"人"

蓝图 §6.1 的规则是"留存/漏斗一律 `COUNT(DISTINCT userId)`，**禁止** `COUNT(DISTINCT session_id)`
当人数用"。

**在 GPTwiki 这条要改写**，因为匿名侧根本没有 user 级 ID（§5.2 的主动选择）：

| 报表类型 | 允许的单位 | 禁止 |
|---|---|---|
| 登录后的漏斗/留存 | `COUNT(DISTINCT user_id)` | 其它 |
| **匿名读者漏斗（Q2）** | `COUNT(DISTINCT session_id)`，**且指标名必须叫「会话数」** | 叫它"人数"；把它和登录侧的人数指标放进同一个比值 |
| 页面级曝光 | `COUNT(DISTINCT view_id)` | `COUNT(*)`（重复上报会虚高） |
| 动作总量 | `COUNT(*)`，**且必须显式标注"这是事件行数不是人数"** | 不标注 |

**并且要写明**：`session_id` 在硬导航时重置（§5.2），所以它是"一次连续浏览"的单位，
比真实的"人"偏多。跨 §7.7 的规则：不要用它算任何形如"人均 X"的指标。

### 7.9 ISR 会让事件属性变陈旧（但不影响事件本身）

`article_viewed` 是客户端发的，所以 ISR 不影响**是否发**。
但它的若干 properties 是从**服务端渲染的 HTML**里带下来的，而那份 HTML 最多可以是
一小时前的（`revalidate = 3600`），加上 `generateStaticParams` 预渲染的 top50 × 15 语种
可能更旧。

具体受影响的：`thread_count_at_view`、`content_source`（这个稳定，无所谓）、
文章的 `views` 展示值。

**而且 `threadCount` 的陈旧是系统性的，不是偶发**：全仓只有两处调 `revalidatePath`
——`src/app/api/wiki/[id]/route.ts:96`（作者更新正文）与
`src/app/api/wiki/[id]/merge/route.ts:131`（合并 thread），**`POST /api/wiki/[id]/threads`
不 revalidate**。也就是说"有人发了新追问"这件事**从不**主动失效文章页缓存，
`threadCount` 会一直陈旧到下一次 ISR 到期（1 小时）或下一次正文变更为止。

**规则**：`thread_count_at_view` 只能用于**分桶**（0 / 1-3 / 4+），
**不得**用作 merge 率的精确分母。精确分母来自 `thread_created` 事件本身的计数。
（同一个陈旧还有一个产品含义顺带记在这里：`ThreadReplyList.tsx:60-66` 的
`useEffect` 用 `threadCount > 0` 决定要不要去拉 thread 列表——`threadCount` 陈旧为 0 时，
**新发的追问在缓存过期前对其他读者是不可见的**。这不是打点问题，但它压低了
`thread_cta_shown` 的真实基数，报表脚注里要提一句。）

### 7.10 "展开对话"在镜像文章上量的是另一回事（Q2 的分母陷阱）

`WikiInteractive.tsx:36` 第一行就是 `if (!wiki.conversation?.length) return null;`——
**没有 conversation 的文章根本不渲染这个岛，也就永远不会有
`article_conversation_toggled`。** 而 seed 路径给镜像文档写的 conversation 是
**合成的两条**（`api/seed/wikipedia/route.ts:240`、`scripts/seed-content.ts:121-124`：
一条 `What is X?` + 一条 Wikipedia extract），不是真实的人机对话。

所以同一个事件在两层内容上量的是两件事：

| 内容层 | 展开对话看到的是 | `message_count` 典型值 |
|---|---|---|
| `wikipedia` / `grokipedia` / `seed` | 一问一答的**合成占位**，信息量约等于摘要 | 2 |
| `editorial` / `ugc` | 真实的多轮对话，是这个产品的差异化本体 | > 2 |

**规则**：

- Q2 的漏斗**必须按 `content_source` 分开报**，绝不合并成一个站级转化率。
  合并出来的数字会被 95% 的镜像层主导，而镜像层的"展开率低"根本不说明登录墙的问题
  ——它只说明没人想看一段两句话的占位对话。
- `article_conversation_toggled.message_count` 是**免费的判别器**（组件手里就有
  `wiki.conversation.length`），务必带上。`message_count = 2` 基本等价于"这是合成对话"。
- 反过来，这条也给 Q1 提供了一个意外的指标：**镜像层的展开率如果不低，
  说明读者在找的是"对话"而不是"词条"**——那是把编辑部产能往哪投的直接证据。

### 7.11 「继续追问」的产出是分裂而不是生长（Q3 的漏水口径）

**这条口径是 GPTwiki 独有的，蓝图里没有对应物，而且它决定 Q3 的答案是不是反的。**

事实见 §0.1 第 14 条：`WikiContinueChat` 从不写 thread。它的两个出口是
`PUT /api/wiki/[id]`（仅作者）与 `POST /api/wiki`（任何人）。所以**同一个按钮，
在作者手里是"生长"，在读者手里是"分裂"**：

| 谁点了「继续追问」 | 落库形态 | 对护城河叙事的意义 |
|---|---|---|
| 文章作者 | `PUT /api/wiki/[id]` → 正文被重写（`wiki_updated`），**并且写 revision 快照**（`api/wiki/[id]/route.ts:83`） | 生长 |
| 非作者 | `POST /api/wiki` → 本应是**一篇与原文毫无引用关系的新文章**（`wiki_published`）；**但今天这条路 400，见 §0.1 第 14 条** | **漏水**（修好之后才量得到；修好之前指标恒为 0） |

**三条强制口径**：

1. **`wiki_published` 必须带 `origin_surface: 'chat' | 'article_continue'`**，
   否则 chat 页的正常发布与文章页的分裂发布混成一个数，漏水量永远不可见。
   这个字段在服务端拿不到（`POST /api/wiki` 的两个调用方 body 形状几乎一样），
   必须由客户端在 body 里显式带上，服务端只做白名单校验后落进事件——
   **它是一个不影响任何业务逻辑的纯打点字段**，`wikiCreateSchema` 加一个
   `originSurface: z.enum(['chat','article_continue']).optional()` 即可。
   > 这是本方案里唯一一处「为打点动业务 schema」的地方，值得单独说明为什么划算：
   > 替代方案是靠 `question` 字段与某篇已有文章的相似度去猜，那既贵又不准。
2. **Q3 的 merge 率分母不得包含分裂出去的那部分。** merge 率只在 thread 这条链路上算；
   漏水率是**另一个独立指标**（`wiki_published{origin_surface:'article_continue'}` / `thread_created`），
   两者不能相加，也不能合并成一个「贡献转化率」。
3. **`wiki_updated` 同样带 `origin_surface`。** 关于"文章被改过几次"这个问题，
   口径文档里要写明的**不是**"PUT 不写快照"（初稿这么写，是错的：
   `pushWikiRevision` 在 `api/wiki/[id]/route.ts:83` 与 `merge/route.ts:106` **两处都调**），
   而是另一件事：**`revisions` 子集合有 `REVISION_CAP = 20` 的上界**
   （`src/lib/search.ts:584`，超出的按 `updatedAt desc` 批量删）。
   所以对被改过 20 次以上的文章，数 `revisions` 会**截断式低估**；
   要真实编辑次数就数 `wiki_updated + thread_merged` 两个事件，别数子集合。

**反过来说，这条口径也提供了一个明确的产品建议的证据基础**：如果
`wiki_published{origin_surface:'article_continue'}` 的量显著大于 `thread_created`，
那就是"读者确实想贡献，只是被引导到了错误的出口"——这比任何定性判断都硬。

### 7.12 建三个口径视图（数据集 `gptwiki_analytics`）

| 视图 | 编码的规则 | 不用它就会犯的错 |
|---|---|---|
| `v_events_canon` | ① 按 `event_id` 去重（`QUALIFY ROW_NUMBER() … = 1`，§6.7）；② `WHERE NOT is_bot`；③ 把 `properties_json` 里高频用到的字段用 `JSON_VALUE` 提成具名列 | 把 beacon 双发的行当成两次浏览（§6.7）；把 Googlebot 的渲染当读者（§7.4）；到处手写 `JSON_VALUE` 写错 key |
| `v_ratio_safe` | `WHERE DATE(event_ts) <= CURRENT_DATE() - 2`（跨 GA4）/ `- 1`（纯本管线，另开一个 `v_ratio_safe_internal`） | 在没到齐的数据上算比率（蓝图案例 C） |
| `v_article_reach` | 把 `article_viewed`（页面）与 `embed_impression`（嵌入渲染）**分成两列而不是相加**，并强制带 `content_source` × `locale` × `content_language` | 把两种计费单位相加（§7.5）；用 `locale` 冒充 `content_language`（§7.2） |

视图头部注释里**写明每条规则的出处**（哪个业务问题、哪条踩坑）——让下一个想"简化"它的人
先读完代价。视图是普通视图不物化，**日期下界仍要调用方自己加**，头注释用大写写
`KEEP A DATE PREDICATE`。

---

## §8 监控

蓝图 §7 的四件套覆盖四个盲区，"不可合并"。在 GPTwiki 有一件**不适用**、
一件**需要重新定义**，逐条给对应物。

### 8.1 Ingestion floor（入口地板）——照上

**查什么**：`POST /api/analytics/e` 的 2xx 请求量跌破地板。

**为什么在请求层**：入口在 sink 上游，将来从 Logging Sink 换成 BQ Storage Write API 时
监控不用动。

**实现**：logs-based metric（counter，filter 匹配入口路由的访问日志）→ alert policy。

**阈值**：**现在没法定**（U1）。方法：上线后跑满一周，取每小时请求量的 P5，
再打七折做地板；持续 3 小时低于地板才告警（避免深夜低谷误报）。
在 YAML 里留一条 OPS 注释提醒"这个值是回测出来的，流量结构变了要重调"。

**对应的真实风险**：蓝图案例 A 的 PostHog 断供**六天无人发现**。GPTwiki 的同款风险是
"某次手动 `gcloud builds submit` 之后客户端 bundle 里的 endpoint 变量没配上"——
零测试 + 手动部署的组合下，这种静默失败的概率不低。

### 8.2 Sink 失败告警——需要重新定义

蓝图 §7.2 盯的是 `insert_failed` / `buffer_overflow` / `client_init_failed` / `row_build_failed`。
GPTwiki **没有 insert 路径、没有 buffer、没有 BQ 客户端**，所以这四种 outcome 里有三种不存在。

**替代的三个信号**：

1. **Log Sink 导出错误**：GCP 内建指标 `logging.googleapis.com/exports/error_count`
   （按 sink 名过滤）。> 0 就告警。这是"日志写出去了但没进 BQ"的唯一信号。
2. **入口 5xx 率**：`/api/analytics/e` 返回 5xx。按契约它应该永远 204，任何 5xx 都是 bug。
3. **`outcome:'props_too_large'` / `outcome:'batch_rejected'`**：入口自己打的结构化日志
   （§4.3 第 5 条），5 分钟窗口内 ≥1 就告警。
   > **改这两个字符串必须同步改 metric filter。** 在代码注释里写死这句话。

**为什么这条不能省**：fire-and-forget 的代价就是失败静默。这条告警是那个设计决定的
**对价**，两者必须同一批上线。

### 8.3 双 sink 日对账 → 改为**跨源对账**

蓝图 §7.3 对的是"仓 vs 热表"。GPTwiki 只有一个 sink（§6.1），所以**原样不适用**。

但它抓的那个形态——"管线都活着、都在忙、但数不对"——在 GPTwiki 同样存在，
而且有两个更好的对照物：

| 对账 A | `article_viewed`（本管线，`WHERE NOT is_bot`）vs GA4 BQ Export 的 `page_view`（同日、同 `page_path` 前缀 `/wiki/`） |
|---|---|
| 频率 | 每天一次，对 **T-2** 那天（GA4 是天级批量导出，§7.7） |
| 判据 | 比值落在 **[0.5, 1.5]** 之外记 mismatch。**不要求接近 1** |
| 为什么不要求接近 1 | 两边天然不同：GA4 有内建 bot 过滤我们没有（§7.4）、GA4 会被广告拦截器拦掉一部分而我们是同源 beacon 不会、GA4 的 `page_view` 含非文章页。**基线要在上线第一周实测出来再定带宽**，别拍脑袋 |
| 它能抓到什么 | 客户端 helper 整体熄火、某次部署把 endpoint 打错、Log Sink 悄悄停了——这些都不产生任何错误日志 |

| 对账 B | `wiki_published`（本管线 server 事件）vs Firestore `wikis` 当天新建的 **UGC** 文档数 |
|---|---|
| 频率 | 每天一次 |
| 判据 | 差值 > 2 或比值偏离 1 超过 15% 记 mismatch |
| 为什么值得做 | 这是**服务端 emitter 整体熄火**的唯一探针，而且分母是**权威的产品事实**（文档真的建出来了）。量小（每天个位数到两位数），所以用绝对差值而不是比率 |
| 注意 | 量 < 5 时比率无意义，只看绝对差 |

**这条对账有一个必须先解决的前置问题，否则查询根本写不出来。**
UGC 文档的判据是"`source` 字段**缺失**"（§0.1 第 11 条），而
**Firestore 查不出字段缺失的文档**：`where('source','!=','wikipedia')` 的语义是
"该字段存在且不等于"，会把所有 UGC 文档**整体排除**——按这个写法做出来的对账
永远返回 0，且看起来一切正常。这是一个会静默生效的假绿灯，正是 §8 存在的理由。

**做法（Phase 0 的一行产品改动）**：在 `createWiki`（`src/lib/search.ts`）里
显式写 `source: 'ugc'`。三条理由：

1. 让对账 B 变成一个可写的有界查询：
   `where('source','==','ugc').where('createdAt','>=',dayStart).count().get()`
   ——用 `.count()` 聚合，**不按文档计费读**（`api/seed/wikipedia/route.ts` 已经在用同款写法）。
2. 把"缺失即 UGC"这个**靠推断的判据**变成**显式事实**。推断判据的问题不是今天不准，
   而是任何一个未来的写入点忘了写 `source`，就会静默地被算成 UGC。
3. 向后兼容：存量 UGC 文档仍然缺失该字段，`normalizeContentSource(undefined) === 'ugc'`
   照样成立（§7.3），**不需要回填 19M 文档中的任何一篇**。

**代价要认**：这个查询需要一条新的复合索引
（`firestore.indexes.json` 加 `source ASC × createdAt ASC`，从 3 条变 4 条
〔2026-08-21 核实：原文写「从 4 条变 5 条」，基线上现有 3 条〕）。
这是本方案唯一一次要求新增 Firestore 索引，值得，因为它同时是对账 B 的分母和
U3（各 source 层文档数分布）的查询手段。**不要**为了省这条索引改用全表扫——
`api/sitemap/route.ts` 的头注释记着 50k 扫描 ≈ 57 秒（**改造前**的历史测量，见 §6.2 第 3 条）。

**两个照抄蓝图的实现细节**：

- mismatch 时**返回 HTTP 200**，把 `ok:false` 放在 body 里。调度器对非 2xx 会重试，
  而重试一个"正确地发现了不一致"的对账只是烧钱重放同一个发现。告警走结构化日志
  `outcome:"mismatch"` → logs-based metric → alert policy。
- **数据源不可达 ≠ mismatch**，单独计数。否则一次 GA4 导出延迟会伪装成全量事件异常。

**跑在哪**：GitHub Actions cron（仓库已有四个 workflow 的 keyless WIF 模式可以照抄），
不要为此在应用里加 admin cron 路由——那会多一条需要鉴权的 HTTP 触点。

### 8.4 Per-event 量级回归——上，但必须加最小量门槛

**查什么**：逐事件名对比近窗（24h）与基线（14 天中值），**事件量**或**去重会话数**
任一跌破基线 10% 就红。两个指标缺一不可（蓝图：Luddi 的 banner 事故里人数 63→4 崩了，
事件量还有基线的 48%，一个重度用户撑着）。

**GPTwiki 必须加的一条**：**只监控 14 天中值 ≥ 50/天的事件。**

理由：这是个小流量项目（U1 未确认，但 UGC 写入侧被 BYOK 掐得几乎归零是**已知事实**）。
`thread_merged` 这种事件一天可能就是个位数，"跌破中值 10%" 在泊松噪声下天天都会响。
一个天天响的告警等于没有告警。

低于阈值的事件进一份**"量太小，不监控"清单**，在 §8.3 的对账日志里一并打印出来
——让它**可见**，而不是假装在监控。这比一个假告警诚实。

**照抄蓝图的两个细节**：
- 基线只取**健康日**（日总量 ≥ 阈值的天）的中值。否则一次管线事故会把所有中值拖到 ~0，
  检测器在事故后最需要它的那一周里失明。
- 超过 50% 的事件同时报警时收敛成**一条**管线级 finding，不刷一墙名字。

### 8.5 成本护栏（三层，但第一层的数值不能照抄）

1. 每查询 `maximumBytesBilled`。**蓝图的 5 GiB 在 GPTwiki 是个假护栏**：按 §6.6 的换算，
   5 万事件/天时全表一年也才 ~9 GB——一个 5 GiB 的上限意味着"扫掉大半张表"仍然放行，
   它在第一年几乎不可能触发。**按表定，不按手册定**：上线一个月后跑
   `bq show` 拿到真实表体积，把上限设成**当前全表体积的 ~1/4**（下限 512 MiB），
   每季度随表增长上调一次。理由是这条护栏要抓的是"忘加日期谓词的全表扫描"——
   而全表扫描的特征恰恰是"体积接近全表"，上限必须显著小于全表才有意义。
2. 看板/对账查询加日期谓词（由 §7.12 的视图头注释强制提醒）。
3. **账单预算**兜底失控循环：**20 USD**，50/90/100% 三档。
   正常月支出是几美分（§6.6），这个预算是给"忘加日期谓词的循环查询"设的。
   > **必须显式 `EXCLUDE_ALL_CREDITS`**（蓝图 §7.6 踩坑：GCP 预算默认 `INCLUDE` credits，
   > 账户里有赠金时**永远不会触发**）。**待确认 U7**：先查这个项目是不是在烧赠金。

**关于采样**：蓝图的反面结论同样适用——**先测集中度再谈采样**。
GPTwiki 的最高单事件几乎肯定是 `page_viewed` / `article_viewed`，但在
< 300 万/天的量级上（§6.3 的切换线）采样带来的复杂度远大于收益。**Phase 0/1/2 都不采样。**

### 8.6 告警 YAML drift check——**暂不上**

蓝图 §7.5 建议把告警策略以 YAML 进仓，脚本定期与云端已部署策略对账。

GPTwiki 上线后总共 **4~5 条**告警策略。为 5 条策略写一个 drift 检查脚本 + 维护它，
成本高于收益，而且这个仓库**连基础 CI 都还没有**——优先级明显应该给 §8.1/8.2。

**替代做法**：把 YAML 放进 `docs/monitoring/`（意图留痕），在 §10 的 Phase 2
checklist 里放一条"季度性人工比对一次"。
**升级触发条件**：告警策略数量 > 8 条时，回来把 drift check 补上。

（这里刻意照抄蓝图 §2.4 的自省：**一条没人验证过的防线，比没有防线更危险，
因为它让人停止担心。** 所以宁可写"人工季度比对"，也不写一个不会跑的脚本。）

---

## §9 合规与隐私

### 9.1 既存债务必须先还，否则新 sink 只是放大暴露面

**现状**（全部经代码核实）：

- `GoogleAnalytics.tsx` 挂在 `src/app/[locale]/layout.tsx` 的 `<head>` 里，
  对 **15 个 locale 无条件加载**，含 EU/UK 语种。
- 没有 consent 横幅、没有 `anonymize_ip`、**没有隐私政策页**（`src/app/[locale]/` 下无
  `privacy` 路由）。
- `GA_ID` 硬编码兜底。

**规则：在 §10 的 Phase 0 里，隐私政策页与 GA_ID 修复是"新管线上线"的前置条件，不是后续项。**

理由不是洁癖：新增一个采集端点会让"这个站点收集什么"这个问题第一次被真正问起。
在没有隐私政策的情况下增加采集面，是把一个已经存在的问题放大到无法辩解的程度。

**本方案能提供的减压**：因为读路径**不在设备上存取任何信息**（§5.2），
新管线本身不引入 cookie/存储类的 consent 义务。GA4 的问题是**既存的、独立的**，
本方案不解决它，但也不加重它。

**给自部署者的明确姿态**（写进 `.env.example` 注释和 README）：
`ANALYTICS_ENABLED` 与 `NEXT_PUBLIC_ANALYTICS_ENDPOINT` 默认不配置 = 完全不采集。
**每个 fork 必须自己决定并自己承担 consent 责任**，上游不替它决定。

### 9.2 事件载荷的绝对禁入清单

**永不出现在任何事件、任何字段、任何日志里**：

| 禁止 | 为什么特别提 |
|---|---|
| 提问原文、回答原文、conversation 任何片段 | 核心红线。注意 `chat_message_sent` 只带 `input_len_bucket`，不带内容 |
| 用户邮箱、姓名 | `waitlist` 集合已经在存 `email + name`（`src/app/api/waitlist/route.ts:35`）——**那个集合永远不导出到 BigQuery** |
| API key，**包括密文** | `users.apiKeys` 是 AES-256-GCM 密文（`src/lib/crypto.ts`）。密文也是密文，不进事件 |
| **IP 地址** | 只存 `country`（CF 的 `cf-ipcountry`）。IP 在欧盟属于个人数据；`src/lib/rate-limit.ts` 里的 IP 只服务限流、进程内、永不落盘——**打点不得复用它做身份** |
| 完整 referrer URL / query string | 只存 eTLD+1 的 host。完整 URL 会夹带别人站点的 query 参数 |
| provider 的原始错误消息 | `ai_stream_failed` 只带 `provider_error_class`（`'rate_limit'\|'auth'\|'overloaded'\|'timeout'\|'other'`）。原始消息可能回显 prompt 片段或 key 尾部 |

在 `scripts/audit-analytics-events.ts` 里加一条**分词匹配**的断言（蓝图 §2.5：
**必须按下划线分词，不能 substring**，naive 的 `includes("key")` 会误伤 `api_key_page_viewed`）：
凡 properties 字段名分词后命中 `email` / `password` / `token` / `secret` / `content` /
`prompt` / `answer` / `ip` → `exit 1`，除非在书面例外名单里。

当前例外名单**只有一项**：`search_gap.q_text`（理由见 §9.4）。

### 9.3 GDPR 删除：诚实地说，现在做不到端到端

蓝图 §8.3 要求 `deletePerson(userId)` 同时清两个 sink + 一个 streaming-buffer 日扫。

**GPTwiki 的现实**：

- **好消息**：删除表面积极小。匿名行**根本没有 user_id**（§5.2），不在删除范围内
  （也无从关联到人）。只有登录用户产生的行需要删。
- **坏消息**：**这个应用没有账号删除功能。** `src/app/api/` 下没有任何注销/删号路由
  （只有 `follow` 和 `api-keys` 的 DELETE）。所以没有可以挂钩的触发点。

**结论与做法**：

1. **不假装有自动化。** 不写一个永远不会被触发的 sweep 作业。
2. Phase 1 交付一份**手工 runbook**：收到删除请求时执行的
   `DELETE FROM gptwiki_analytics.events WHERE user_id = @uid` + Firestore 侧的清理清单，
   并记录 subject id 作为 RTBF 审计轨（"证明你删了这个人"要有据可查）。
3. **写下前置条件**：一旦产品实现了账号删除，**同一个 PR 里**必须接上分析侧的删除，
   并补上蓝图 §8.3 的 **streaming-buffer 日扫 backstop**——
   Log Sink 写 BQ 同样经由流式路径，DML 摸不到还在缓冲区（约 90 分钟）里的行，
   注销前一小时的事件会躲过即时删除。日扫过去 48h（= 2 × 节拍）补删。

### 9.4 一次显式、留痕的数据处理决定：搜索原文入仓

蓝图 §8.4：**凡用户原始文本要进仓，必须是一条显式、留痕的决定（谁批的、为什么、
影响哪个字段），不能默认跟着事件走。**

**决定**：允许站内搜索的 query 原文进仓，**且仅在严格限定条件下**。

- **为什么必须**：Q4（"读者问了但语料答不上来的问题"）是九个业务问题里唯一一个
  **直接产出行动**的——它的输出要去喂 `content/backlog.ts` 和 `scripts/suggest-topics.ts`，
  取代现在"让 AI 自己凭空建议选题"的做法。没有原文就没有这份清单。
- **限定条件**（四条全部满足才落原文）：
  1. `ANALYTICS_CAPTURE_SEARCH_TEXT` 显式开启（默认关）。
  2. 仅当 `result_count <= 2`。结果充足的查询不需要原文。
  3. 长度上限 200 字符（对齐 `src/lib/validation.ts` 里 `searchQuerySchema` 的 `q` 上限）。
  4. **落在独立的表 `gptwiki_analytics.search_gap`，分区过期 90 天**——
     与主事件表的 400 天分开。主事件表的 `search_performed` **只带 `q_hash`，永不带原文**。
- **关于 `q_hash` 的诚实说明**：它是 normalize 后的 SHA-256 前 16 位，
  用途是**分组**，**不是匿名化手段**。搜索词空间熵很低，字典攻击可还原。
  真正的控制是"独立表 + 90 天过期 + 默认关闭 + 只在零/低结果时采"，不是那个 hash。
  不要在任何文档里把 q_hash 说成"已脱敏"。
- **明确不适用于 chat**：`WikiSuggestions` 触发的搜索（`caller='chat'`）的 q 来自
  **用户在 chat 里输入的第一条消息**，那是提问原文。**这一路的原文一律不落**，
  只落 `q_len` 与 `result_count`。Q4 的 chat 侧缺口靠"零结果的量与分布"来看，不靠原文。

  > 这条限制的代价要认：chat 侧的内容缺口只能看到"有多少"，看不到"是什么"。
  > 这是刻意的取舍——把 chat 提问原文入仓和把搜索框查询入仓，隐私预期完全不同。

---

## §10 分阶段落地 checklist

分阶段的核心逻辑照抄蓝图：**告警先于看板**（没人看的数据断了也没人知道）；
**类型闸先于事件膨胀**（事件集合长起来之后再补声明表，成本是 10 倍）。

GPTwiki 追加一条：**每个 Phase 结束都要走一次手动 `gcloud builds submit`**
（`docs/DEPLOY.md`：无自动部署）。所以 Phase 划分同时也是**部署批次**划分——
不要把半成品留在 main 上等下一批。

### Phase 0 — 地基（一次部署，不可拆）

**前置（合规债，先还）**
- [ ] 新增 `src/app/[locale]/privacy/page.tsx` 隐私政策页，15 语种至少 en/zh 有实文
- [ ] `GoogleAnalytics.tsx:5` 去掉 `|| 'G-G6DSDW9X5D'` 硬编码兜底
- [ ] `.env.example` 补齐 §2.3 全部 7 个变量，每个都写"未配置即完全不采集"。
      **顺带补两个今天完全缺席的**：`NEXT_PUBLIC_GA_ID`（去掉硬编码兜底后，
      不写进 `.env.example` 的话 fork 连"有这么个变量"都不知道）与
      `ORIGIN_AUTH_SECRET`（§4.2 的第一道闸靠它，而 U5 之所以是未确认项，
      正是因为它既不在 `.env.example` 也不在任何 checklist 里）

**代码**
- [ ] `src/lib/analytics/schema.ts`：discriminated union + `EVENT_EMITTERS`（**两个值**，§3.2）+ 派生集合
- [ ] `src/lib/analytics/client.ts`：`track<N>(name, props)`，20 条/5s flush，队列上限 200 丢最旧，**每次 flush 按 `ANALYTICS_MAX_BATCH`（50）切块**（`pagehide` 排空 200 条队列时会切成 4 批，§2.3），`pagehide` 用 `sendBeacon`（失败降级 `fetch keepalive`），本地先用 `CLIENT_EMITTABLE_EVENTS` 挡掉 server-only 名字
- [ ] `src/lib/analytics/server.ts`：`trackServer()`，同步 void，永不 throw，无 buffer（§2.1）
- [ ] `src/lib/analytics/context.ts`：信封组装（locale / country / is_bot / referrer_host / build_sha）
- [ ] `src/components/layout/AnalyticsProvider.tsx`：挂进 `src/components/layout/Providers.tsx`；铸 `session_id`（内存）+ `view_id`；发 `page_viewed`
- [ ] `src/app/api/analytics/e/route.ts`：五道闸（总开关 / 限流 / allowlist / 时钟 clamp / props 上限），永远 204
- [ ] `src/lib/validation.ts`：加 `analyticsEventSchema` / `analyticsBatchSchema`
- [ ] `cloudbuild.yaml` + `Dockerfile`：`substitutions._BUILD_SHA` → `--build-arg NEXT_PUBLIC_BUILD_SHA` → `ARG`/`ENV`（**不是 `$COMMIT_SHA`，不是 run deploy 的 env**，理由见 §2.3 末），镜像 tag 一并从 `:latest` 换成带 sha；`docs/DEPLOY.md:18` 的命令同步更新

**两处为打点服务的最小业务改动（都是一行级，理由已写在正文里，别跳过）**
- [ ] `createWiki`（`src/lib/search.ts`）显式写 `source: 'ugc'`；`firestore.indexes.json`
      加一条 `source ASC × createdAt ASC`。**不做这一步，§8.3 的对账 B 写不出来**——
      Firestore 的 `!=` 查不出字段缺失的文档，照着"`source != 'wikipedia'`"写出来的对账
      会永远返回 0 并看起来一切正常（§8.3）
- [ ] `wikiCreateSchema`（`src/lib/validation.ts:15`）加可选
      `originSurface: z.enum(['chat','article_continue'])`，`PublishDialog.tsx` 与
      `WikiContinueChat.handleCreateNewWiki` 各自带上，**并在 `api/wiki/route.ts:81` 调
      `createWiki` 前把它解构掉**（否则它会被 `...wikiData` 写进 Firestore 文档，§12 F）。
      **不做这一步，Q3 的漏水量不可见**（§7.11）
- [ ] **先修 `wikiCreateSchema.title` 再谈漏水口径**：`validation.ts:16` 的
      `title: z.string().trim().min(1)` 与 `WikiContinueChat.tsx:139` 的 `title: ''` 冲突，
      非作者的「继续追问 → 新建文章」**每次都在 `parseJsonBody` 吃 400**（§0.1 第 14 条）。
      改成 `z.string().trim().max(200).default('')`，与 `api/wiki/route.ts:73` 已有的
      `body.title || generated.title` 兜底对齐。**这是产品 bug 修复不是打点改动，
      但不修则下面那条验收必然失败、且 `origin_surface:'article_continue'` 恒为 0**

**首批事件（P0 那一档，见 §12 表）**
- [ ] `page_viewed`、`article_viewed`、`article_conversation_toggled`、`article_continue_cta_shown`
- [ ] **`thread_cta_shown`**（`ThreadReplyList.tsx`，零 UI 改动即可发 `authed:false`）——
      Q3 真正的分母，§0.1 第 13 条
- [ ] `ai_entitlement_denied`（发在 `resolve-key.ts`，§4.4）、`auth_completed`（发在 `auth.ts` 的 jwt callback，§4.4）
- [ ] `wiki_published`（含 `origin_surface`）、`thread_created`、`thread_merged`
- [ ] `search_performed`（含 `caller` 参数改动，§4.4）

**基建**
- [ ] BigQuery 数据集 `gptwiki_analytics`（us-central1，与 Cloud Run / Firestore 同区），默认分区过期 400 天
- [ ] Cloud Logging Sink → BQ，filter `jsonPayload.gptwiki_analytics=true`
- [ ] `_Default` 桶排除同一 filter（§6.4 第 2 条）
- [ ] **ingestion floor 告警**（§8.1，阈值先留 placeholder + OPS 注释）
- [ ] **sink 失败告警**（§8.2 三个信号）
- [ ] 账单预算 20 USD，**`EXCLUDE_ALL_CREDITS`**（§8.5，先查 U7）

**Phase 0 验收（每条都要真的执行一次）**
- [ ] `curl -X POST https://gptwiki.net/api/analytics/e -d '{"events":[{"name":"wiki_published"}]}'` → **400**（server-only 名字被拒）
- [ ] 同上但混一个合法名字 → **204**，且 BQ 里只出现合法那条
- [ ] 在 `schema.ts` 里加一个 union arm 但不写 `EVENT_EMITTERS` → `npm run typecheck` **红**
- [ ] 发一个 51 条的批 → 400（= `ANALYTICS_MAX_BATCH` + 1，§2.3）；
      再造一个队列里攒了 60 条的页面并触发 `pagehide` → **客户端切成两批发出、全部落行**
      （验的是"客户端按 MAX_BATCH 切块"这条，初稿把 flush 阈值与批上限都写成 20，会在这里翻车）
- [ ] 发一个 properties > 8 KB 的事件 → 该条被丢弃且 `props_too_large` 告警响
- [ ] `ts` 设成 3 天前 → 行落在**今天**的分区（不是三天前）
- [ ] 把 `ANALYTICS_ENABLED` 取消 → 全站功能正常，BQ 零新行，无任何报错
- [ ] 删掉 Log Sink 的目标数据集 → **业务接口不受影响**，`exports/error_count` 告警响
- [ ] `bq show --format=prettyjson gptwiki_analytics.<table>` 亲眼确认分区过期真的是 400 天（§6.4 第 3 条）
- [ ] **同一批事件连发两次（同 `event_id`）→ 底表两行、`v_events_canon` 一行**（§6.7 的去重真的生效）
- [ ] **打开一篇 `source` 以 `wikipedia-` 开头的镜像文章、一篇 `editorial`、一篇 UGC，
      确认三条 `article_viewed` 的 `content_source` 分别是 `wikipedia`/`editorial`/`ugc`**
      ——这是 Q1 唯一的分组维度，错一个值整个结论作废（§7.3）
- [ ] **用一个从没点过语言切换器的无痕窗口**（这样 `NEXT_LOCALE` 一定不存在），
      在 `/zh/chat` 上发一次消息，确认服务端事件信封里的 `locale === 'zh'`
      ——不是 null、也不是被伪造成 `'en'`。这一项验的是 §6.5 的取值顺序
      （Referer 优先于 cookie）；按初稿的 cookie-first 顺序，这里会拿到 null
- [ ] **登出状态打开一篇有 conversation 的文章，确认收到
      `article_continue_cta_shown{authed:false}` 与 `thread_cta_shown{authed:false}` 两条**
      ——这两条是 Q2/Q3 全部结论的分母，而它们对应的按钮在页面上**根本不存在**（§0.1 第 13 条），
      所以这一项必须真的用无痕窗口验一次，不能靠读代码确认
- [ ] **发一篇新 UGC 文章，确认 Firestore 文档上真的有 `source: 'ugc'`，
      且 `where('source','==','ugc').where('createdAt','>=',今天).count()` 数得到它**
      ——对账 B 的分母就是这条查询，索引没建好会直接 `FAILED_PRECONDITION`
- [ ] **从文章页的「继续追问」新建一篇文章，确认 `wiki_published.origin_surface === 'article_continue'`**，
      与 chat 页发布的 `'chat'` 分得开（§7.11）。
      **前置**：必须先做上面那条 `wikiCreateSchema.title` 的修复——不修的话这一步会得到 400，
      而**打点侧看到的现象是"什么都没发生"**（事件不会落行），极易被当成打点没接上
- [ ] **确认新建的那篇 Firestore 文档上没有 `originSurface` 字段**（§12 F 的解构那一步真的做了）

### Phase 1 — 补齐九个业务问题（第二次部署）

- [ ] 补齐 §12 表里标 **P1** 的事件（流式计时 §4.5、embed §5.4、BYOK 链路后半段、发布/搜索漏斗）
- [ ] **三处"今天没有挂点"的 UI 改动**（初稿默认它们存在，实际都要新写）：
      ① `src/components/embed/EmbedBeacon.tsx` —— embed 页今天零客户端 JS，
      新建一个只做 `sendBeacon` 的组件挂进 `src/app/embed/[id]/layout.tsx`；
      ② `ShareButtons.tsx:75-87` 的 `shareLinks.map()` 里给那个裸 `<a>` 加**一个** `onClick`
      （四个渠道共用同一处 JSX，渠道名从 `link.name` 取）；
      ③ `ChatInterface.tsx:63` 的 `profileUrl` 加 `?from=wall`
      （`PublishDialog.tsx` 没有链接可改，见 §12 D 备注）
- [ ] 上线一周后看 `ai_entitlement_denied` 里 `has_actionable_hint=false` 的占比。
      **如果它显著（比如 > 30%），那 Q5 的答案就不是"用户不愿意配 key"而是"我们没告诉他去哪配"**
      ——届时优先级应该从"要不要推翻 `FREE_DAILY_MESSAGES=0`"转向
      "给 `WikiContinueChat.handleSend` 补上 403 分支"（§0.1 第 15 条）。
      这是一个**打点先于产品决策**的具体例子，不要跳过就去改 env
- [ ] `scripts/audit-analytics-events.ts`：missing → exit 1；**并把 L5 的敏感命名断言写进去**（§3.1、§9.2）；**并加双端发射禁令断言**（§3.2）
- [ ] `scripts/analytics-event-counts.ts`（partition 断言，§3.5）
- [ ] **`.github/workflows/ci.yml`（本仓第一个 CI）**：`typecheck` + `lint` + `audit-analytics-events`。**在写完脚本的同一个 PR 里挂上，别留在 backlog**（蓝图 §2.4 的教训：Luddi 的审计脚本存在了数月却从未接进 CI，而规则文件里一直写着 "also runs in CI"）
- [ ] `eslint.config.mjs` 加 `no-restricted-syntax`：禁裸 `fetch('/api/analytics/e')` 与 `navigator.sendBeacon`，豁免 `src/lib/analytics/**`；禁在 analytics 模块外 import `gtag` 相关
- [ ] **故意写一个违规调用，确认 lint 真的会红**（蓝图 §2.3 踩坑：flat config 没挂 TS parser 时规则一次都没真正执行过，而 CI 是绿的。本仓 `eslint-config-next/typescript` 应该已经提供了 parser，但**仍然要验证**）
- [ ] **故意在 `schema.ts` 里加一个未使用的事件，确认 CI 真的会报 unused**
- [ ] 三个口径视图（§7.12）
- [ ] **per-event 量级回归**（§8.4，健康日中值 + 双指标 + **最小量门槛 50/天**）
- [ ] **跨源对账 A / B**（§8.3），跑在 GitHub Actions cron
- [ ] **故意用一个无效的 BYOK key 发一条 chat 消息，确认收到 `ai_stream_failed{phase:'stream'}`**
      ——provider 的失败是 `controller.error()`，`TransformStream.flush()` 在这条路上**不会跑**，
      不验这一项就会带着一个永远发不出的事件上线（§4.5）
- [ ] 上线一周后：用真实流量回测并重设 ingestion floor 阈值；实测 `is_bot` 占比（§7.4）；实测 `embed_host IS NULL` 占比（U6）；实测 `(ai_stream_completed + ai_stream_failed) / ai_stream_started` 的到达率（§4.5 / U9）——**分母减去两个分子的余额就是客户端中途断开的量**，它应与客户端 `chat_stream_abandoned` 同量级

### Phase 2 — 产品改动 + 长尾

- [ ] **给登出态读者渲染两处 CTA**（两道墙都要，§0.1 第 13 条）：
      ① `src/components/wiki/WikiInteractive.tsx` 的「继续追问」；
      ② `src/components/wiki/ThreadReplyList.tsx` 的「追问跟帖」。
      这是产品改动，但它是 Q2/Q3 漏斗补完的前提，也是本身就该做的转化优化。
      **优先级由 Phase 0 的数据决定**：先看 `*_cta_shown{authed:false}` 的绝对量，
      量大才值得改——这正是"先量后改"的意义
- [ ] 补 `article_continue_cta_clicked{authed:false}`、`thread_cta_clicked{authed:false}` 与 `login_wall_hit`
- [ ] **给 `WikiContinueChat.handleSend` 补 403 分支**（对齐 `ChatInterface.tsx:60-77` 的写法），
      并让 `has_actionable_hint` 在这一路变成 `true`——改完之后 Q5 的转化率分母才是可比的，
      **口径文档里要标注改动日期，改动前后的数据不得混算**（蓝图案例 B 的教训：
      同名不同物的语义漂移必须分段读）
- [ ] **让 `callbackUrl` 带上来源**（`src/app/[locale]/login/page.tsx:27` 现在写死
      `/${locale}/chat`）：登录页读 `?from=`，拼进三处 `signIn()`（:34/:110/:135）的
      `callbackUrl`；`auth_completed` 再从中解析 `from_surface`（只取路径首段 + 白名单校验）。
      **不做这一步，Q2 漏斗的最后一跳永远是断的**（§5.2 损失表第 3 行）
- [ ] `dim_editorial_articles` 维表夜间作业（有界查询 `where source=='editorial'`，§1 的 Q9）
- [ ] GDPR 手工 runbook（§9.3）；若产品实现了账号删除，**同 PR** 接上分析侧删除 + streaming-buffer 日扫
- [ ] 可选：`views30d` 字段回填（只写有流量的文档，§7.1）+ 对应 Firestore 索引的成本核算
- [ ] 季度性人工比对告警 YAML 与云端策略（§8.6）

### 长期纪律（没有完成态）

- 新事件两件套：union arm + emitter 声明。（Luddi 是三件套，GPTwiki 少一件是因为
  emitter 只有两个值——**如果哪天变回四个值，这条也要变回三件套**。）
- **任何时候有人想引入一个双端发射的事件**，先回来读 §3.2，把蓝图 §2.1 的四值 emitter
  表整套搬回来，别标成 `client` 了事。
- 改任何被 logs-based metric 匹配的字符串（`gptwiki_analytics` 标记、`outcome:'mismatch'`、
  `outcome:'props_too_large'`）之前，先搜 `docs/monitoring/`。
- 每次事件改名 = 一次全仓下游过滤器搜索 + 一次 BQ 视图搜索（蓝图案例 B：
  `feed → home_foryou` 改名导致下游硬编码过滤器静默漏计三周）。
- 每次改 `src/proxy.ts` 或 CF Cache Rules，回来确认 §4.2 的三个前提还成立。

---

## §11 蓝图中不适用于 GPTwiki 的条目及理由

这一节是本文最该被认真读的部分。**照抄适用的部分很容易，认出不适用的部分才是工作。**

| # | 蓝图条目 | 判定 | 理由 | 替代做法 |
|---|---|---|---|---|
| 1 | **§4.1 自持 anon ID（web cookie / mobile 安全存储）** | **整节推翻** | 九个业务问题里没有一个需要跨会话匿名身份（§5.2 逐条核对过）。而铸 ID 的代价在 GPTwiki 特别高：需要先建 consent 基建（15 locale 含 EU、目前连隐私政策页都没有）、会给每个响应挂 `Set-Cookie` 从而永久堵死给文章页加边缘缓存这条路、在 `/embed` 的第三方 iframe 里根本拿不到。蓝图自己也承认匿名口径天生脆（Luddi 实测 93% 的匿名身份只有一个事件） | 内存态 `session_id` + 每次加载的 `view_id`，**不写任何设备存储**。附四条重估触发条件（§5.2） |
| 2 | **§4.3 AnonIdentityLink 桥接** | **整节不适用** | 没有持久匿名 ID，就没有可以桥接的两端。这不是"暂时不做"，是逻辑上不存在 | 登录墙漏斗的断点用 `auth_completed` 从 `callbackUrl` 解析 `from_surface` 补（§5.2） |
| 3 | **§4.5 identity_grade 三级可信度** | **不适用** | Luddi 的第三级来自"移动端冷启动 SecureStore 读不到 JWT 于是用 `X-Distinct-Id` 自报"。GPTwiki 没有移动端，身份只有两态：有 JWT / 没有 | 无 |
| 4 | **§5 双 sink 分工（仓 + 业务库热表）** | **降为单 sink** | 热表存在的**唯一**理由是"和业务表 join 喂后台 /console"。GPTwiki **没有任何后台管理 UI**（调研已确认：无后台，管理靠共享密钥 Bearer 打 `/api/seed`）。为一个不存在的消费者维护第二个 sink + 白名单 + 保留期 cron 是纯负债。而且 Firestore 是 OLTP 且已有 19M 文档，蓝图自己的红线就是"热表永远不当归档用，它和 OLTP 同实例，膨胀会伤业务库" | 单 sink（BigQuery）。Firestore 只保留必须在请求路径回读并展示给用户的计数器，**并明确它们不是 sink 是产品状态**（§6.1） |
| 5 | **§5.3 `source` 列消歧 + §6.3 `v_dual_emit_dedup` 视图** | **不适用（被设计消灭）** | 用"intent 用 client 名 / outcome 用 server 名"的命名纪律，让双端发射在 GPTwiki 不存在（§3.2）。另外 `source` 这个列名在本仓已被 `wikis.source` 占用，硬用会撞名 | emitter 只有两个值；发射侧列名改为 `emit_source`，内容层列名为 `content_source`；在审计脚本里加"同名事件不得双端出现"的断言 |
| 6 | **§2.1 四个 emitter 值 / `both_server_authoritative`** | **裁成两个** | 见上。连带作废蓝图 §2.1 的第二个踩坑（`ai_generate_started` 那个"声明前必须验证 server 副本在生产路径上"的验尸）——在两值模型下不可能发生 | 两值 + 一条"想加第三个值就必须把四值表整套搬回来"的书面规则（§3.2） |
| 7 | **§1.1 有界 buffer + 定时 flush + SIGTERM drain** | **服务端不做** | `cloudbuild.yaml` 是 `--min-instances 0`。buffer 是在赌 SIGTERM 跑赢缩容，而蓝图 §7.3 自己承认这是**不产生任何错误日志**的静默丢数据形态。GPTwiki 写 stdout 无成本可摊，赌局是纯亏 | 服务端直写 stdout。**客户端仍然有 buffer**（20 条/5s + pagehide sendBeacon）——那里的理由（省请求数、页面随时会关）依然成立 |
| 8 | **§7.2 sink 失败告警的四种 outcome** | **重新定义** | `insert_failed` / `buffer_overflow` / `client_init_failed` 三种在无 buffer、无 BQ 客户端的架构下不存在 | 换成：Log Sink `exports/error_count`、入口 5xx、`props_too_large` / `batch_rejected`（§8.2）。**这条告警本身不能省**——它是 fire-and-forget 的对价 |
| 9 | **§7.3 双 sink 日对账** | **改为跨源对账** | 只有一个 sink，无从互对。但它抓的形态（"都活着、都在忙、但数不对"）真实存在 | 对账 A：本管线 vs GA4 BQ Export（**判据是宽带宽 [0.5,1.5]，不是接近 1**，因为 bot 过滤与广告拦截在两边表现不同）；对账 B：`wiki_published` vs Firestore 当天新建文档数（§8.3） |
| 10 | **§7.5 告警 YAML drift check** | **暂不上** | 上线后只有 4~5 条策略，而这个仓库连基础 CI 都还没有。为 5 条策略维护一个可能不跑的脚本，正好犯蓝图 §2.4 自己批评的病 | YAML 进 `docs/monitoring/` 留痕 + 季度人工比对；策略数 > 8 条时回来补脚本（§8.6） |
| 11 | **§2.5 敏感命名单测（独立测试文件）** | **合并进审计脚本** | `package.json` 里没有任何测试框架。为一个断言引入 vitest/jest 不划算 | 断言写进 `scripts/audit-analytics-events.ts`（`tsx` 跑，零新依赖），失败 exit 1。**分词匹配的要求照抄**（§9.2） |
| 12 | **§6.1 "禁止 `COUNT(DISTINCT session_id)` 当人数用"** | **改写而非照抄** | 在 GPTwiki，匿名侧**只有** `session_id` 可用（这是 §5.2 的主动选择）。原规则会让 Q2 无法回答 | 改成：匿名漏斗**允许**用 `session_id`，但**指标名必须叫"会话数"**，且不得与登录侧人数指标放进同一个比值（§7.8） |
| 13 | **§8.1 区域化 consent gate（fail-closed + 服务端复查）** | **降级** | 本方案的读路径**不在设备上存取任何信息**（§5.2），cookie/存储类的 consent 义务不成立。为一个不种 cookie 的管线建区域化 gate 是过度工程 | 靠"不存储"这个架构性质来降低义务，而不是靠 gate。**但 GA4 的既存 consent 问题不因此消失**，它是独立的一笔债（§9.1）。若将来铸持久 ID（触发条件见 §5.2），蓝图 §8.1 整节要原样搬回来 |
| 14 | **§8.3 GDPR 双 sink 删除 + streaming-buffer 日扫** | **部分不适用 + 部分推迟** | 单 sink 所以"双"不适用；匿名行没有 `user_id` 所以不在删除范围；**而且这个应用根本没有账号删除功能**，日扫没有触发点 | Phase 1 只给手工 runbook + RTBF 审计轨。**写下前置条件**：产品实现账号删除时同 PR 接上，届时日扫（48h 窗口）必须补（§9.3） |
| 15 | **§3.1 "同时接受 legacy 单事件体"** | **不适用** | 那条规则的理由是"已安装的旧移动端客户端会继续用老形状发很久，移动端入口协议只能加不能破"。GPTwiki 是纯 web，客户端代码随每次部署整体替换，不存在版本滞留 | 只接受 batch envelope。省掉一个 sniff 分支 |
| 16 | **§7.6 采样** | **明确不做**（这条是照抄蓝图的**反面结论**） | 蓝图的规则是"先测集中度再谈采样，多数体量下答案是不采"。GPTwiki 在 < 300 万事件/天时（§6.3 的切换线）采样的复杂度远大于收益 | Phase 0/1/2 都不采样。到达 §6.3 的切换线时一并重新评估 |
| 17 | **§3.6 入口的身份边界校验（anonId UUID v4 正则，非法值收敛为 null）** | **不适用** | 校验的对象是"客户端自报的持久匿名 ID"。§5.2 决定不铸这个 ID，客户端在入口上**不自报任何身份**：`user_id` 由服务端从 JWT 读、`session_id`/`view_id` 是纯客户端生成且**不做任何跨请求信任**（它们只用于把同一次浏览的事件串起来，不参与任何权限或身份判断） | 入口不接受任何身份 header。但**"非法值收敛为 null 而不是拒绝请求"这条精神照抄**：`session_id`/`view_id` 不是 UUID v4 形状时把该字段置 null，**不丢事件**（§4.3 的五道闸里没有身份闸，是刻意的） |
| 18 | **§4.4 platform 归类信号优先级（`X-App-OS` → UA → null）** | **不适用（退化成常量）** | 蓝图这条存在的前提是 web + mobile 双端。GPTwiki 无移动端、无桌面端（调研已确认），`platform` 恒为 `'web'`——一个恒定列不值得占一个顶层槽位 | 不设 `platform` 列。但**UA 解析这件事本身没有消失，它换了个用途**：同一份 UA 判定被用来产出 `is_bot`（§7.4），而那才是这个产品真正需要从 UA 里读出来的东西。"解析失败返回 null 而不是抛错"照抄 |
| 19 | **§5.4 幂等与背压（`insertId = event_id` + `skipInvalidRows`）** | **搬到查询层** | 这两个机制都是 BigQuery **流式插入 API** 的参数。本方案走 Logging Sink（§6.3），日志行原样落表，**sink 层没有任何去重与坏行容忍**。但重复本身是真实存在的（beacon 双发 / BFCache / 刷新，见 §6.7） | `event_id` 仍然必发，去重下沉到 `v_events_canon` 的 `QUALIFY ROW_NUMBER()`（§6.7）。坏行容忍由 Logging Sink 的 schema 自动演化天然提供，代价是列爆炸——用 §6.4 第 1 条的 `properties_json` 单列兜住 |
| 20 | **§8.2 平台 consent 差异成文 + 重估触发条件** | **前半不适用，后半升级成通用纪律** | GPTwiki 只有 web 一端（无移动端、无桌面端），不存在"两端 consent 姿势不同"这件事，所以"差异成文"没有对象 | 但那条纪律的内核——**没有触发条件的例外决定会变成永久盲区**——在本方案里被用了四次，且每次都写了触发条件：不铸匿名 ID（§5.2 四条）、单 sink / Logging Sink（§6.3 两条）、不上 YAML drift check（§8.6 一条）、不采样（§11 第 16 条）。**新增任何"暂不做"的决定时，必须照这个格式补触发条件** |

**反过来，蓝图里有一条在 GPTwiki 比在 Luddi 更重要**：

> **§1.3 "sink 开关 env 化——不配置即 no-op"**。Luddi 是闭源单部署，这条主要是为了本地
> 开发和 CI 干净。GPTwiki 是 **MIT 开源 + 自部署被公开宣传的卖点 + 已有凭证泄漏前科**
> （`docs/project-review-2026-06.md` 的 P0：飞书 APP_ID/SECRET 被提交进公开仓库，
> 且决策 #6 拍板不清洗 git 历史）。在这里，"不配置即 no-op" 不是开发体验问题，
> 是**每个 fork 都不会把数据打回上游**的正确性问题——而这个仓库已经有一个反例
> （`GA_ID` 硬编码兜底）证明这不是假想风险。

---

## §12 首批事件清单

**约定**：
- **emitter** 只有 `server` / `client` 两值（§3.2）。`client` = 入口 allowlist 放行；`server` = 入口一律拒。
- 表里**不写** properties 的信封字段（`event_id` / `user_id` / `session_id` / `locale` /
  `country` / `is_bot` / `build_sha` 等），它们由 chokepoint 自动附加（§6.5）。
- **Phase** 列即 §10 的落地批次。
- `*_bucket` 一律是预分桶的字符串（如 `'0-200'|'200-1000'|'1000+'`），**不落原始数值**——
  避免自由文本/高基数（§9.2）。

### A. SEO / 内容层价值（Q1、Q7、Q9）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `page_viewed` | client | `{ path_kind: 'home'\|'list'\|'search'\|'browse'\|'tag'\|'profile'\|'article'\|'chat'\|'login'\|'donate'\|'other', entry: 'organic'\|'internal'\|'social'\|'direct'\|'unknown' }` | 全站基线；ingestion floor 的主力 | P0 |
| `article_viewed` | client | `{ wiki_id, content_source, content_language, has_header_image: bool, thread_count_bucket, is_author: bool, entry }` | **Q1 主指标**、Q7 | P0 |
| `article_read_depth` | client | `{ wiki_id, content_source, max_scroll_pct: 25\|50\|75\|100, dwell_ms_bucket }` | Q1 的质量分母：镜像层"进站多但秒退"= scaled-content 惩罚的早期哨兵 | P1 |
| `article_reference_clicked` | client | `{ wiki_id, ref_host, ref_index }` | 引用是否被信任/使用；低优先 | P2 |

### B. 登录墙漏斗（Q2）——本方案的头号目标

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `article_conversation_toggled` | client | `{ wiki_id, opened: bool, message_count, content_source }` | Q2 第 2 步。**`message_count` 不是装饰**：镜像层的 conversation 是合成的两条占位，`= 2` 基本等价于"这不是真对话"，Q2 漏斗必须按 `content_source` 分开报（§7.10）。发射点在 `WikiInteractive.tsx:42` 的 `setShowConversation` 里，`wiki.conversation.length` 现成 | P0 |
| `article_continue_cta_shown` | client | `{ wiki_id, authed: bool }` | **Q2 的关键**：`authed:false` 那一支度量的正是今天完全不可见的流失人群。**Phase 0 零 UI 改动即可发**：`WikiInteractive.tsx:50` 的渲染条件是 `session && showConversation && !showContinueChat`，在组件里加一个 `useEffect(..., [showConversation])`，`showConversation` 变 true 时发一条带 `authed: !!session` 的事件即可——页面上什么都不变，但两支人群第一次同时可见 | P0 |
| `article_continue_cta_clicked` | client | `{ wiki_id, authed: bool }` | Q2 第 3 步；`authed:false` 需要 Phase 2 的登出态 CTA | P0 / P2 |
| `login_wall_hit` | client | `{ from_surface, reason: 'continue_ask'\|'chat'\|'follow'\|'waitlist', wiki_id? }` | Q2 第 4 步 | P2 |
| `auth_started` | client | `{ provider: 'google'\|'github'\|'resend', from_surface }` | 登录方式分布 | P1 |
| `auth_completed` | **server** | `{ provider, is_new_user: bool, from_surface }` | **Q2 终点**。发在 `src/lib/auth.ts:73-88` 的 `jwt` callback、`if (user)` 内、`is_new_user = !snap.exists`（§4.4）。`provider` 用同一处已有的 `account?.provider \|\| 'resend'`（:83）。**`from_surface` 在 Phase 0 恒为 `null`**——`login/page.tsx:27` 的 `callbackUrl` 写死 `/${locale}/chat`，来源信息在跳去 OAuth 时就丢了，要它得先改产品（§5.2 损失表） | P0 |

### C. Thread / merge — 护城河（Q3）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `thread_cta_shown` | client | `{ wiki_id, authed: bool, content_source, thread_count_bucket }` | **Q3 真正的分母，也是本方案对调研的一处实质补充。** 供给侧入口在 `ThreadReplyList.tsx` 里被 `{session && !showCompose && …}` 门控，匿名读者**根本看不到**「追问跟帖」按钮（§0.1 第 13 条）。不发这个事件，`thread_created ≈ 0` 就无法区分"没人想追问"和"没人看得见入口"——而这正是护城河命题的全部争议所在。**Phase 0 零 UI 改动即可发**：组件在 `session` 为空时照样渲染整个 section（`hasLoaded` 之后），在那里发 `authed:false` 即可 | P0 |
| `thread_submitted` | client | `{ wiki_id, model, question_len_bucket }` | 意图侧；与 `thread_created` 的差 = 失败/放弃 | P1 |
| `thread_created` | **server** | `{ wiki_id, thread_id, model, content_source, is_wiki_author: bool, latency_ms, answer_len_bucket }` | **Q3 分母**。发在 `src/app/api/wiki/[id]/threads/route.ts`（drain 循环前后取时间，§4.5） | P0 |
| `thread_cta_clicked` | client | `{ wiki_id, authed: bool }` | 与 `thread_cta_shown` 配对，量出供给侧入口的点击率。`authed:false` 那一支要等 Phase 2 的登出态 CTA 才有值 | P1 / P2 |
| `thread_merge_clicked` | client | `{ wiki_id, thread_id }` | 作者意图 | P2 |
| `thread_merged` | **server** | `{ wiki_id, thread_id, model, latency_ms, thread_age_ms, contributor_credited: bool }` | **Q3 分子 + 护城河流速**。`thread_age_ms = Date.now() - thread.createdAt`，回答"追问多久被采纳"；`contributor_credited` 直接用 `merge/route.ts:118-120` 已算好的 `alreadyCredited` 取反。**初稿的 `revision_count` 已删**：`pushWikiRevision`（`src/lib/search.ts:591`）返回 `void`，要拿这个数就得为一个打点字段多做一次 Firestore 读——它在 Q3 里也不承担任何问题，不值 | P0 |
| `thread_merge_failed` | **server** | `{ wiki_id, reason: 'ALREADY_MERGED'\|'not_author'\|'quota'\|'needs_key'\|'ai_error'\|'not_found' }` | 区分"产品失败"与"UI 竞态"（`ALREADY_MERGED` 是后者） | P1 |

### D. BYOK 墙（Q5）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `ai_entitlement_denied` | **server** | `{ reason: 'BYOK_ONLY'\|'NO_PLATFORM_KEY'\|'QUOTA_EXHAUSTED', route: 'chat'\|'wiki_create'\|'wiki_update'\|'thread'\|'merge', model, days_since_signup_bucket, has_actionable_hint: bool }` | **Q5 的分母**。发在 `src/lib/ai/resolve-key.ts` 的 `resolveApiKeyForUser` 内，**三个拒绝分支各一次**，一个调用点覆盖五条路由。`BYOK_ONLY`（:45）与 `NO_PLATFORM_KEY`（:56）在路由层都翻译成 `API_KEY_REQUIRED`，**但只有前者是那个产品决策造成的**——合并它们等于取消 Q5（§4.4）。<br>**`has_actionable_hint` 是本方案对调研的另一处补充**：同一个 403，不同调用方给用户的东西完全不同——`ChatInterface.tsx` 会渲染一条带 `[配置提示](profileUrl)` 链接的助手消息；`PublishDialog.tsx:59/63` / `ThreadReplyList.tsx:82/86` 只弹一句 toast（无链接）；而 `WikiContinueChat.tsx` 的三个 handler **只认 `QUOTA_EXHAUSTED`（:113/:148）或什么都不认（:70）——而 `QUOTA_EXHAUSTED` 在 `FREE_DAILY_MESSAGES=0` 下永远不会发生**，所以文章页撞墙的人 100% 只看到通用错误文案（§0.1 第 15 条）。**从最后这一路撞墙的人在结构上不可能转化**，把它和 chat 页的撞墙混在一起算转化率，会把一个 UI 缺陷读成"用户不愿意配 key"。**怎么在服务端知道调用面**——这一格必须写清楚，否则会写出一个填不出来的字段：`/api/chat` 的两个调用方（`ChatInterface` 与 `WikiContinueChat`）body 形状完全一样，**服务端分不开**。两条路：<br>① **Referer 路径首段**（同源 `fetch` 默认发完整 Referer）：`/{locale}/chat` → 有提示，`/{locale}/wiki/{id}` → 无提示。零改动，但 Referer 可能被隐私设置/扩展掐掉，拿不到就填 `null`（**不猜**）。<br>② 更稳的做法是让 `chatRequestSchema` 加一个可选 `surface` 枚举，与 §7.11 给 `wikiCreateSchema` 加 `originSurface` 是同一个模式。<br>**Phase 0 用 ①，若 `null` 占比高于 20% 再上 ②**——先测再改代码，别反过来 | P0 |
| `api_key_page_viewed` | client | `{ from: 'wall'\|'nav'\|'direct' }` | Q5 中段。配套改动只有**一处**：`ChatInterface.tsx:63` 把 `profileUrl` 改成带 `?from=wall`（该处已经在往消息里塞 `[配置提示](${profileUrl})` 链接）。**`PublishDialog.tsx` 没有 profile 链接**（:59/:63 只弹 toast），初稿写它要改是错的——要么先给它加链接，要么承认发布侧撞墙的人只能在 `ai_entitlement_denied` 里看到、看不到后续 | P1 |
| `api_key_saved` | **server** | `{ provider: 'anthropic'\|'openai'\|'google', action: 'set'\|'cleared', is_first_key: bool }` | **Q5 的分子**。发在 `src/app/api/user/api-keys/route.ts` 的 PUT。**注意该端点一次只处理一个 provider**（body 是 `{ provider, key }`，`key: null` 表示删除，见 :40/:49-53）——初稿的 `providers_set: string[]` 是照着一个不存在的批量接口写的。`is_first_key` 由 PUT 里已经读到的 `existing`（:46）判定。**只发 provider 名，永不发 key 本身或密文**（§9.2）。**存量偏置见 U10** | P1 |
| `waitlist_joined` | **server** | `{ from_surface, days_since_signup_bucket }` | Q5 的另一条出口：撞墙的人是去配 key 还是去排队买。**不带 email/name**——虽然那个集合在存（§9.2） | P1 |

### E. 对话质量：模型 × 语种（Q6）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `chat_message_sent` | client | `{ model, turn_index, surface: 'chat'\|'article_continue', input_len_bucket }` | Q6 分母 | P1 |
| `ai_stream_started` | **server** | `{ model, route, turn_count, byok: bool }` | Q6；`byok` 区分自带 key 与平台 key | P1 |
| `ai_stream_completed` | **server** | `{ model, route, ttfb_ms, total_ms, bytes_out, chunks }` | Q6 的延迟/产出权威值。**必须用 TransformStream 包住流，不能在 handler 里计时**（§4.5）。字段叫 `bytes_out` 不叫 `chars_out`——流里是 `TextEncoder` 编码后的 `Uint8Array`，中日阿语种按字符读会被高估 2~3 倍 | P1 |
| `ai_stream_failed` | **server** | `{ model, route, phase: 'connect'\|'stream', provider_error_class, ms }` | 三家 provider 的可靠性差异。**只带错误分类，永不带原始消息**（§9.2）。**发射点不能是 `TransformStream.flush()`**——provider 失败走 `controller.error()`（`claude.ts:29`），`flush` 不会跑；必须用带 `catch` 的读循环包装或 `pipeTo(new WritableStream({ abort }))`（§4.5）。**`phase:'connect'` 在 `/api/chat` 上不可达**（客户端构造在 `start()` 内），只有 drain 型路径（threads / `generateWikiContent`）才可能出现 | P1 |
| `chat_stream_abandoned` | client | `{ model, ms_before_abandon, chars_received, turn_index }` | **Q6 核心**。服务端物理上看不到这个事实——client 只是停止 read。这是"client 是唯一可能来源"的事件 | P1 |
| `chat_message_rephrased` | client | `{ model, ms_since_prev, prev_turn_index }` | Q6 的"立刻重问/改写率"。**这是启发式判定**（下一条用户消息在 N 秒内到达），口径文档必须标注它是估计值 | P2 |

### F. 发布漏斗

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `publish_dialog_opened` | client | `{ model, message_count, surface }` | 发布意图 | P1 |
| `wiki_published` | **server** | `{ wiki_id, model, message_count, gen_latency_ms, tags_count, sources_count, title_from: 'user'\|'generated', content_language, origin_surface: 'chat'\|'article_continue' }` | 产品核心动作；Q6 的"发布率"分子；§8.3 对账 B 的一端。**`origin_surface` 不是装饰**：`POST /api/wiki` 有两个调用方——`PublishDialog.tsx`（chat 页正常发布）与 `WikiContinueChat.handleCreateNewWiki`（文章页非作者追问后**新建一篇孤儿文章**）。两者在服务端 body 形状几乎一样，分不开就看不见护城河的漏水量（§0.1 第 14 条、§7.11）。落地：`wikiCreateSchema` 加一个可选 `originSurface` 枚举，纯打点字段，不参与任何业务逻辑。<br>**落地时有一个会静默出事的细节**：`api/wiki/route.ts:81` 是 `createWiki({ ...wikiData, authorId, … })`，而 `wikiData` 就是 zod 解析后的整个 body——加进 schema 的字段会**被原样写进 Firestore 文档**（并经 `toTypesenseDoc` 进搜索索引）。TS 不会报错（变量展开不触发 excess property check）。所以**必须在调用 `createWiki` 前把它解构出去**（`const { originSurface, ...wikiInput } = body`），否则等于给一个 19M 量级的集合上的每篇新文档加一个永久垃圾字段。<br>**另外：`article_continue` 这一支在 §0.1 第 14 条那个 400 修好之前恒为 0**，别把它读成"没有漏水" | P0 |
| `wiki_publish_failed` | **server** | `{ reason: 'quota'\|'needs_key'\|'ai_error'\|'validation'\|'unknown', model }` | 发布漏斗的漏点 | P1 |
| `wiki_updated` | **server** | `{ wiki_id, by_author: bool, model, latency_ms, origin_surface: 'article_continue' }` | 作者维护行为（`PUT /api/wiki/[id]`）。**口径提醒**：这条路径**会**写 revision 快照（`api/wiki/[id]/route.ts:83`，与 merge 同款），但子集合有 `REVISION_CAP = 20` 的截断，所以"文章被改过几次"要数 `wiki_updated + thread_merged` 两个事件，不要数 `revisions`（§7.11 第 3 条）。`by_author` 恒为 true——路由第 54 行就把非作者 403 掉了，这个字段留着只是为了将来放开协作编辑时不用改 schema | P1 |
| `follow_toggled` | **server** | `{ target_user_id, following: bool }` | 社交图是否在长；`notifyFollowersOfNewWiki` 的分发面 | P2 |

### G. 搜索与内容缺口（Q4）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `search_performed` | **server** | `{ q_hash, q_len, caller: 'search'\|'chat', result_count, backend: 'typesense'\|'firestore', latency_ms }` | **Q4 的主力**。零结果 = `result_count = 0` 的谓词，**不另设事件**（§3.4）。需配套改动：`WikiSuggestions.tsx` 加 `caller=chat`（§4.4） | P0 |
| `search_result_clicked` | client | `{ q_hash, position, wiki_id, result_count }` | Q4 的"低质结果"侧：结果不为零但没人点/点很深 | P1 |
| `search_backend_degraded` | **server** | `{ reason: 'error'\|'zero_hits', latency_ms }` | Typesense 降级到 Firestore 的频率。发在 `src/lib/search.ts:64` 那个今天只有 `console.error` 的 catch 里 | P1 |
| *（独立表）* `search_gap` | **server** | `{ q_text, q_lang_guess, result_count, caller: 'search' }` | Q4 的可行动清单。**四条限定条件全满足才写**：env 开启 + `result_count<=2` + ≤200 字符 + `caller='search'`（chat 侧原文一律不落）。**独立表，90 天过期**（§9.4） | P1 |

### H. 站外分发（Q8）

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `embed_impression` | client | `{ wiki_id, embed_host, lang_param, content_language }` | **Q8 分母**。无 `session_id` / `view_id` / `user_id`（§5.4）。`embed_host` 有相当比例是 `null`（U6），报表必须留 unknown 桶。**代价先认**：`src/app/embed/[id]/page.tsx` 今天是纯服务端组件、**一行客户端 JS 都不发**，加这个事件等于给一张被别人 iframe 进去的卡片首次引入 React 水合。必须写成一个只做 `sendBeacon` 的极小 `'use client'` 组件（不 import i18n / SessionProvider），挂在 `src/app/embed/[id]/layout.tsx` 那个独立 root layout 里 | P1 |
| `embed_click_through` | client | `{ wiki_id, embed_host, target_locale }` | **Q8 分子**：嵌入是不是真的在回流。整张卡片就是一个 `<a target="_blank">`（`src/app/embed/[id]/page.tsx:49`），所以要在同一个客户端组件里挂事件委托，**必须用 `sendBeacon`**——`target="_blank"` 下页面不卸载，但第三方 iframe 环境里 `fetch` 更容易被打断 | P1 |
| `embed_code_copied` | client | `{ wiki_id }` | Q8 的供给侧。`EmbedCodeButton.tsx:39` 的 `copy()` 里已有现成挂点，snippet 本身带 `?lang=${locale}`（:31），与 `embed_impression.lang_param` 对得上 | P1 |
| `share_clicked` | client | `{ wiki_id, channel: 'twitter'\|'facebook'\|'linkedin'\|'reddit'\|'copy' }` | 分享渠道分布。`ShareButtons.tsx:75-87` 的四个渠道是**没有任何 handler 的裸 `<a>`**，但它们由**同一个 `shareLinks.map()` 渲染**——所以这里要加的是**一个** `onClick={() => track('share_clicked', { wiki_id, channel: link.name.toLowerCase() })}`，不是四个（初稿写"逐个加"会让人以为要改四处）。`copy` 走 :62 的 `handleCopy`。渠道名取 `shareLinks[].name`（Twitter/Facebook/LinkedIn/Reddit）并**统一 lowercase** | P1 |

### I. 变现探针

| 事件名 | emitter | properties | 回答 | Phase |
|---|---|---|---|---|
| `donation_completed` | **server** | `{ amount_bucket, currency }` | 唯一的真实收入信号。发在 `src/app/api/paypal/capture-order/route.ts` 写台账处。**不带 PayPal orderId / payer 信息** | P2 |

### 刻意不设的事件（谓词即可，§3.4）

`search_zero_result`（= `search_performed WHERE result_count=0`）、
`suggestions_empty`（= `... AND caller='chat'`）、
`article_bounced`（= `article_viewed` 无后继 / `max_scroll_pct < 25`）、
`login_required`（= `ai_entitlement_denied` 的 401 兄弟，但 401 只发生在未登录直接打 API，
是攻击面不是漏斗）。

---

## 附：一手材料索引（本仓库）

| 主题 | 路径 |
|---|---|
| 方法论来源 | `../analytics-blueprint.md`（仓库外：`/Users/oratis/Documents/Claude/analytics-blueprint.md`） |
| 现存唯一遥测 | `src/components/layout/GoogleAnalytics.tsx` |
| 坏掉的浏览计数 | `src/lib/search.ts` 的 `incrementWikiViews`；调用点 `src/app/[locale]/wiki/[id]/page.tsx` |
| 回源锁定与 locale 重定向 | `src/proxy.ts` |
| 限流（进程内、跨实例不共享） | `src/lib/rate-limit.ts` |
| BYOK 拒绝的唯一真相源 | `src/lib/ai/resolve-key.ts`、`src/lib/ai/free-quota.ts` |
| 流式响应（计时陷阱） | `src/app/api/chat/route.ts`、`src/lib/ai/provider.ts` |
| 服务端 drain 流（另一条路径） | `src/app/api/wiki/[id]/threads/route.ts` |
| 身份锚点与 jwt callback | `src/lib/auth.ts` |
| 两道不可见的登录墙 | `src/components/wiki/WikiInteractive.tsx`（`session &&` 门控「继续追问」）、`src/components/wiki/ThreadReplyList.tsx`（`session &&` 门控「追问跟帖」） |
| 「继续追问」的真实出口（**不是 thread**） | `src/components/wiki/WikiContinueChat.tsx` → `PUT /api/wiki/[id]` \| `POST /api/wiki` |
| 403 处理的三种不同待遇 | `src/components/chat/ChatInterface.tsx`（认两种、给配置链接）、`src/components/chat/PublishDialog.tsx` 与 `ThreadReplyList.tsx`（认两种、只弹 toast）、`WikiContinueChat.tsx`（**只认 `QUOTA_EXHAUSTED`——即那个在 `FREE_DAILY_MESSAGES=0` 下不可能发生的分支**，§0.1 第 15 条） |
| 「继续追问 → 新建文章」今天是坏的 | `src/components/wiki/WikiContinueChat.tsx:139`（`title: ''`）× `src/lib/validation.ts:16`（`title` 必填）→ `src/app/api/wiki/route.ts:45` 处 400，§0.1 第 14 条 |
| source 分布的现成普查端点 | `GET /api/seed/wikipedia`（`src/app/api/seed/wikipedia/route.ts:431-440`，`.count()` 聚合，U3） |
| UGC 判据（`source` 缺失）与拟议的 `source:'ugc'` | `src/lib/search.ts` 的 `createWiki`、`src/lib/validation.ts` 的 `wikiCreateSchema` |
| 搜索双调用方 | `src/app/api/search/route.ts`、`src/components/wiki/WikiSuggestions.tsx` |
| Typesense 降级点 | `src/lib/search.ts`（`searchWikis` 的 catch）、`src/lib/typesense.ts`（env 门控范本） |
| 第三方嵌入触点 | `src/app/embed/[id]/page.tsx`、`next.config.ts` 的 headers |
| 19M 规模的证据 | `src/app/api/sitemap/route.ts` 头注释、`docs/auto-content-ops.md` |
| 缓存规则 | `docs/cloudflare-migration.md` §3.3 |
| 部署（无自动化） | `docs/DEPLOY.md`、`cloudbuild.yaml` |
| 产品决策记录 | `docs/project-review-2026-06.md` |
