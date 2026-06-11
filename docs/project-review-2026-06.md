# GPTwiki 项目全面 Review 报告（2026-06-10）

> 基于 `main` HEAD `1ccba60`，四个领域（前端 / 后端 / 数据管线 / i18n·SEO·基础设施）并行深度审查，关键结论经人工复核。

## 一、项目现状综述

**定位**：AI 驱动的协作百科——用户和 Claude/GPT-4o/Gemini 对话，将对话发布为持久化 wiki 文章，社区可继续对话和完善内容。15 种语言，Firestore + Next.js 16 + Cloud Run，已上线 gptwiki.net。

**规模**（来自代码与运营脚本推断）：约 80K–130K 篇文章，其中绝大部分来自 Wikipedia dump 导入，编辑部原创 56 篇英文 + 784 篇人工翻译，少量用户 UGC。

**整体评价**：工程基础扎实——i18n（2273 个 key × 15 语言全覆盖、RTL 支持）、SEO（hreflang sitemap、JSON-LD、游标分页）、安全（API key AES-256-GCM 加密、SSRF 防护、限流、常数时间比较的 seed 鉴权）均超出独立项目平均水平。主要风险集中在：一个真实的凭证泄漏事故、内容合规、产品漏斗设计、零测试覆盖。

## 二、功能清单盘点

### 前端（15 个路由）

| 功能 | 状态 |
|---|---|
| 首页（热门/最新、无限滚动、搜索岛） | ✅ 完整，SSR + 60s 缓存 |
| Chat（流式、模型切换、发布对话框、相似 wiki 推荐） | ✅ 完整 |
| Wiki 详情（Markdown、对话回放、继续对话、Thread 跟帖、分享/嵌入/关注） | ✅ 完整 |
| 浏览/标签/搜索/排行榜/Feed | ✅ 完整 |
| 登录（Google/GitHub OAuth + Resend 魔法链接） | ✅ 完整 |
| 个人主页（关注、API key 管理） | ✅ 完整 |
| 捐赠（PayPal） | ✅ 完整 |
| Embed 嵌入卡片（iframe、noindex、CSP 放行） | ✅ 完整，但元数据硬编码英文 |

### 后端（约 25 个 API 端点）

鉴权、限流、zod 校验在绝大多数端点齐备；AI 层三 provider 统一抽象 + 流式；数据模型 denormalize 合理（followersCount、wikisCount、threadCount）。

### 数据管线

Wikipedia dump 导入（可断点续传、防 OOM 分块）、Wikipedia API 增量抓取、编辑部语料 + 14 语种翻译树、图片回填并镜像至 GCS（带 SSRF 防护）、Seedream 图文混排生成。管线工程能力强，但仓库卫生差（见下）。

## 三、问题清单（按严重度）

### 🔴 P0 — 立即处理

1. **飞书凭证已泄漏在公开仓库**（已复核确认）：`scripts/write-*.py` 共 9 个已被 git 追踪的脚本硬编码了飞书 `APP_ID`/`APP_SECRET`，而 `github.com/oratis/GPTwiki` 是 PUBLIC 仓库。任何人可用该 secret 获取 tenant token 读写飞书文档。→ 必须立刻在飞书后台轮换 secret；用 `git filter-repo` 清除历史；运营脚本移出产品仓库。
2. **`PUT /api/wiki/[id]` 缺少输入校验**：`src/app/api/wiki/[id]/route.ts:48` 直接 `req.json()` 强转 `Message[]`，是全站唯一没过 zod 的可写端点；同文件 :56 更新时硬编码 `'claude'`，无视文章原本的 `aiModel`。
3. **Wikipedia 内容缺少 CC-BY-SA 署名（法律合规）**：dump 导入的文章带 `source` 字段但 UI 无任何 Wikipedia 署名与许可展示。CC-BY-SA 3.0 强制要求署名；对以 SEO 为增长引擎的站点，这同时是被 Google 判定抄袭内容的风险。

### 🟡 P1 — 真实缺陷

4. **站内搜索召回率极低**：`src/lib/search.ts` 只扫"标签命中 + 最近 150 篇"，对 10 万级语料基本搜不到老内容。
5. **Seed 与 PayPal 端点无限流**。
6. **捐赠台账 fire-and-forget**：PayPal 已扣款但 Firestore 写失败仅 console.error，无重试。
7. **零测试**：全仓库无任何单测/E2E；`npm run typecheck` 有 5 个错误（均在 `scripts/dump-import.ts`，缺 sax 类型）。
8. **UX 细节**：发布/跟帖/继续对话用浏览器 `alert()` 报错；ThreadReplyList 加载失败静默吞掉；个别字符串未走 i18n；Embed 卡片链接硬编码 `/en/`。
9. **分页游标用 `createdAt` 无 id tiebreaker**，时间戳相同会跳/重。

### 🟢 P2 — 仓库卫生

- 根目录散落 `shard0.json`/`shard2.json`（各 540KB）、`_gap.ts`、`.img-pipeline.log`（1.6MB）、`.tmpwork/`、各类 `_img-*`/`_wave-*` 断点脚本——均未 .gitignore。
- `translations/`（830 个文件）建议移出主仓库。
- README 的 clone 地址写错（`anthropics/gptwiki` → 实际 `oratis/GPTwiki`）。

### ✅ 已排除的误报（审查过程中人工复核推翻）

- ~~"proxy.ts 未接入 middleware"~~：Next.js 16 中 `proxy.ts` 就是 middleware 的新文件约定，`src/proxy.ts` 自动加载，locale 路由工作正常。
- ~~"魔法链接登录流程坏了"~~：`redirect: false` + "查收邮件"是 email provider 的标准正确流程。
- ~~"WikiContinueChat 高危状态污染"~~：流式更新的常见写法，每 chunk spread 新副本，仅轻微反模式。

## 四、产品定位分析

### 核心矛盾：宣传的产品和拥有的资产不一致

README 宣称 "AI-powered collaborative encyclopedia, 100K+ articles"，但其中 95%+ 是 Wikipedia 正文的截断复制。三重问题：

1. **SEO 定时炸弹**：大规模复制 Wikipedia 是 Google "scaled content abuse" 打击的典型形态，靠它撑起的收录量随时可能被算法清零。
2. **没有差异化**：复制的 Wikipedia 打不过 Wikipedia，也打不过 Grokipedia 等竞品。
3. **掩盖真正的宝藏**：项目独有的资产是「提问 → AI 对话 → 沉淀为文章 → 任何人继续追问」闭环（conversation 附着在 wiki、threads、continue-chat、嵌入卡片）。Wikipedia 不能对话，ChatGPT 不沉淀不共享，Perplexity 不可协作生长。

### 第二个矛盾：BYOK-only 杀死漏斗

`src/lib/ai/resolve-key.ts` 中平台环境变量 key 只对所有者一个账号生效——任何普通用户注册后必须自己提供 API key 才能使用核心功能。README 宣传的 "use the platform's shared keys" 实际不存在。这解释了 UGC 占比低的原因。

### 建议的定位重述

> **从"另一个百科"转向「会生长的问答知识库」（Living Q&A Encyclopedia）**——每一次好的 AI 对话都不该消失，它应该变成下一个人搜索时的答案，并且下一个人可以接着问。

Wikipedia 复制内容降级为"冷启动脚手架"，把"对话沉淀 + 接力追问"做成产品叙事的全部。

## 五、改进方案（按优先级）

### 第一阶段：止血 + 合规（1 周内）

1. 轮换飞书 secret、filter-repo 清历史、运营脚本移出仓库。
2. `PUT /api/wiki/[id]` 补 zod schema + 用原 `aiModel`；seed/PayPal 加限流。
3. Wikipedia 署名：详情页对 `source: wikipedia-*` 文章渲染 "内容源自 Wikipedia, CC BY-SA" 徽标 + 原文链接。
4. 修 README clone 地址；补 `.gitignore`。

### 第二阶段：打通漏斗（2–4 周）—— 最高 ROI

5. **免费额度模式**：登录用户每日 N 次免费对话走平台 key，超出后提示 BYOK 或订阅。没有这一条，"协作百科"无从谈起。
6. **真·全文搜索**：接 Typesense/Algolia，或先落地关键词倒排字段方案；站内搜索质量直接决定"先看已有文章再提问"的去重闭环。
7. 错误提示体系化：alert() → toast；补齐空态/错误态。

### 第三阶段：构筑护城河（1–3 个月）

8. **引用/来源（Citations）**：让 AI 生成时输出来源、文中渲染脚注。可信度是百科类产品的生死线。
9. **接力追问 → 增长循环**：thread 好问答一键"合并进正文"（带版本记录），贡献者留名激励回流。
10. **Embed 卡片武器化**：locale 感知 + 主题定制，每张卡片都是反向链接和拉新入口。
11. **内容分层与瘦身**：1 万篇高质量页 > 100 万篇复制页；纯复制页考虑 `noindex` 或渐进淘汰，把 SEO 权重集中到差异化内容。

### 商业化路径

当前仅 PayPal 捐赠。免费额度模式天然导向 freemium 订阅（更高额度 + 更强模型）；中期可做知识库 API / 嵌入式问答组件。捐赠保留为开源社区善意通道。

## 六、一句话总结

工程质量配得上一个认真生意，但先在 24 小时内处理飞书 secret 泄漏；然后把产品重心从"复制出来的 10 万篇"挪到"独有的对话→文章→追问闭环"上，用免费额度打开漏斗——否则这是一个没人能用核心功能的协作产品。

---

## 附录：实施状态（2026-06-10，分支 `review-improvements`）

### 已完成

| 项 | 提交 | 说明 |
|---|---|---|
| 仓库止血 | `8524697` | write-*.py 移出 git 追踪并 ignore；pipeline 断点/日志/shard/translations 全部 .gitignore；README clone 地址修正 |
| 端点加固 | `995ee13` | PUT /api/wiki/[id] 过 zod + 限流 + 用原 aiModel 的 key（原先 GPT/Gemini 文章更新会错拿 Anthropic key）；seed/PayPal 限流；捐赠台账 3 次重试；typecheck 全仓库归零（sax 类型） |
| 免费额度 | `c25cfc4` | FREE_DAILY_MESSAGES（默认 10/天）平台 key 免费层，用户文档 `freeQuota` 字段事务计量；chat/threads/wiki 创建/更新四条路径统一走授权检查（原先发布/更新会静默烧平台 key）；15 语言 QUOTA_EXHAUSTED 提示 |
| 引用来源 | `c25cfc4` | 生成时请求 sources[]，消毒后入库，详情页渲染 References 区 |
| Wikipedia 署名 | `c25cfc4` | wikipedia-* 来源文章渲染 CC BY-SA 署名 + 原文链接；JSON-LD 加 license/isBasedOn |
| 搜索 v2 | `c25cfc4` | 每篇文档 keywords 倒排字段（拉丁词 + CJK/泰文 bigram），全集合召回；scripts/backfill-keywords.ts 回填存量（dry-run 默认、可断点续传）|
| UX | `c25cfc4` | alert() → Toast 组件；讨论加载失败可重试；发布标题必填；embed 卡片 locale 感知 |

### 待用户操作（无法代劳）

1. **轮换飞书 APP_SECRET**（飞书开放平台后台）——secret 仍在公开 git 历史里。
2. 轮换后（可选）`git filter-repo` 清历史 + force push。
3. 部署后跑一次 `npx tsx scripts/backfill-keywords.ts --apply` 回填搜索索引。

### 已规划未实施

- Thread 合并进正文 + 版本历史（已建独立任务）
- Typesense/Algolia 全文搜索（关键词字段为过渡方案）
- 纯 Wikipedia 复制页 noindex / 内容分层（重大 SEO 决策，需拍板）
- Freemium 订阅（免费额度是其地基）
