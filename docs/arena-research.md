# 竞品调研：arena.ai 与 AI HOT（aihot.virxact.com）

> 调研日期：2026-08-10 · 数据截止：arena.ai Agent 榜 2026-08-06 快照
> 配套方案见 [gptwiki-arena-plan.md](./gptwiki-arena-plan.md)

两个站点被放在一起调研，是因为它们代表**排行榜产品的两种正交解法**：

| | arena.ai | AI HOT |
|---|---|---|
| 排名信号来自 | **人**（匿名投票） | **机器**（LLM 打分 + 代码加权） |
| 被排名的对象 | 模型 | 信息条目（新闻/动态） |
| 权威性来源 | 样本量 + 统计口径 | 信源分级 + 规则透明 |
| 最贵的资产 | 投票流量 | 168 个精选信源 |
| 可被抄的部分 | 统计与反作弊口径 | 「LLM 只出分项、代码算总分」的架构纪律 |

对 GPTwiki 有价值的不是任何一边的页面长相，而是这张表最后一行。

---

## 一、调研方法与可达性说明（先说清楚）

**arena.ai：完整可达。** 直接抓取了首页、`/faq`、`/leaderboard/text`、`/leaderboard/agent`、`/blog/leaderboard-changelog`，下文数字均来自这些页面。

**aihot.virxact.com：站点在本机与抓取器均不可达。** 用户指定的 `https://aihot.virxact.com/leaderboard/rules` 这一页**没有拿到原文**：

- DNS 被本机解析到 `198.18.0.110`（保留段，说明有本地代理/VPN 在劫持解析），TLS 握手 `SSL_ERROR_SYSCALL`；
- 抓取器侧返回 `Socket is closed`；HTTP 明文请求 `Empty reply from server`；
- 用户本机 Chrome 打开该 URL 同样是错误页。

因此本文中 AI HOT 的规则部分是**重建的**，来源是三类一手材料而非该页原文：

1. 作者（数字生命卡兹克）本人的长文复盘，**详细披露了整条打分流水线**——这是本文 AI HOT 部分的主要依据；
2. 官方 `khazix-skills/aihot/SKILL.md`（开源仓库），给出了公开 API 的端点、字段与授权边界；
3. 第三方产品收录页给出的信源构成与选中率等量化数据。

**结论可信度**：流水线结构（预筛 → 5 维打分 → 代码算总分 → 分级阈值 → 聚类 → 日报）有作者原文支撑，可信。**具体 5 个维度的名称、权重系数、阈值数值属作者明确声明不公开的部分**，本文不做猜测。`/leaderboard/rules` 页若含额外规则（例如「低粉爆文」入榜条件的具体数值），未被覆盖——需要时请把该页文本贴进来，我补进本文。

---

## 二、arena.ai（LMArena）

### 2.1 产品形态

三种交互模式，**只有一种进榜**：

| 模式 | 是否匿名 | 是否进公开榜 | 用途 |
|---|---|---|---|
| **Battle** | 是（Model A / Model B，投票后才揭示） | **是** | 官方排名的主要票源 |
| Side by Side | 否（用户自选具名模型） | 否 | 仅作研究，理解人类偏好 |
| Direct | 否（单模型对话） | 否（无投票） | prompt 采集 |

「**只有匿名状态下投的票算进官方排名**」是原文表述。这一句话本身就是最强的反作弊设计——你无法定向给自己家模型刷票，因为投票时你不知道哪个是它。

投票选项为四选一：A 更好 / B 更好 / 平局 / 两个都差。模型池 50+，含商业与开源模型。首页主打 Battle Mode 的实用场景（落地页、仪表盘、浏览器小游戏、设计稿转代码、全栈模板、电商店面），即「体验前沿」而非「看表格」。

预发布模型以**代号**出现；只有同时通过厂商自身发布标准与 arena 的政策要求后，才以真名进入公开排名。

### 2.2 排名口径：Bradley-Terry，不是 Elo

早期用经典 Elo，**2023 年底起迁移到 Bradley-Terry (BT) 模型**。原文给出的迁移理由值得注意：BT 是为成对比较实验设计的统计模型，评分由**全部票**共同拟合（而非 Elo 的在线逐次更新），且**易于扩展以纳入额外特征——他们正是用这一点做 style control**。

这句话是整份调研里最有工程价值的一句：把「回答风格/长度/格式讨喜」当成 BT 的一个协变量回归掉，而不是靠 prompt 规则去压制。同一手法可以推广到位置偏差、机构偏差。

### 2.3 榜单矩阵

13 个并列榜：Overall、Agent、Text、WebDev、Image-to-WebDev、Text to Image、Image Edit、Text to Video、Image to Video、Video Edit、Vision、Document、Search。顶层导航为 New Chat / Leaderboard / Search，榜内二级切换 Overview / Agent / Chat / Code / Image / Video。

以 Text 榜为例的页面结构（值得逐条对照抄）：

- **视图切换**：Ranking / Pareto（后者把分数与价格/延迟画成前沿曲线——这是「便宜且够好」用户的真实决策视图）
- **分类**：29 个，含 🏆Overall、🤓Expert、职业细分、数学、指令遵循、多轮对话、创意写作、编码、hard prompts (English)
- **筛选**：Style Control（factuality 档位）、License（全部/闭源/开源）、分数区间（952–1508）、输入/输出价格阈值、上下文长度（2K–2.1M）
- **表列**：Rank（**带 spread**）、模型 + 机构、Score **± 置信区间**、票数、输入/输出价格、上下文长度
- **并列处理**：分数相同显式并列，并高亮置信区间

注意 Rank 列带 spread、Score 列带 ±CI：**排名被明确表达为一个区间而非一个整数**。这是把统计诚实做进 UI 的关键细节。

### 2.4 Agent Arena：不靠投票的另一条路（2026-06-04 上线）

定位是「模型编排工具完成真实 agent 任务的动态排名」。截至 2026-08-06：**46 个模型、1,665,514 个 session**。

指标全部**从会话行为中推导，不来自打分投票**：

| 指标 | 定义（原文口径） |
|---|---|
| Net Improvement | 净提升，带误差范围 |
| Confirmed Success | 模型多久能让用户确认「任务完成了」 |
| Praise vs Complaint | 明确正面反馈多于负面反馈的频率 |
| Steerability | 用户反驳时，模型接住纠正的能力 |
| Bash Recovery | 命令执行失败后恢复的速度 |
| Tool Hallucination | 幻想出自己没有的工具的程度 |
| Sessions | 会话量 |

这是很聪明的一步：agent 任务的好坏**用户自己会在对话里说出来**（「对了」「不是这样」「还是不行」），所以不必再让人额外投票。榜单摆脱了对投票流量的依赖，成本转移到会话日志挖掘上。榜首由 Anthropic 模型占据，Claude Opus 5 系列占据 1/2/3 位。

### 2.5 Changelog 里的数据卫生工程（最值钱的部分）

`/blog/leaderboard-changelog` 暴露了他们花了一年在修什么——这些坑不必再踩一遍：

| 日期 | 变更 | 为什么重要 |
|---|---|---|
| 2025-07-14 | 加强去重（**过滤掉约 10% 的票**）；身份泄露检测（过滤 <4%） | 「模型在回答里自我介绍」会直接毁掉匿名性；重复票占比高达一成 |
| 2025-07-23 | 置信区间从 **bootstrap 改为闭式解**（基于 M-estimator 的中心极限定理），结果等价但计算量大降 | bootstrap 在每小时重算的场景下贵得离谱；闭式解让 CI 成为「顺手就算」的东西 |
| 2025-07-23 | **反比重加权**平衡不同票量模型间的对战数 | 新模型和已弃用模型不会被票多的老模型淹没 |
| 2025-09-17 | 过滤**统计异常投票模式** | 刷票的行为特征在分布上是可见的 |
| 2026-05-12 | 纳入 direct-chat 对战票；在 BT 拟合中**同时校正位置偏差与机构偏差** | 位置偏差（偏爱左侧）与机构偏差是系统性的，得进模型而不是靠 UI 随机化了事 |

分类演化同样有信息量：2025-11-05 上线 Arena Expert（职业维度切分）、2026-01-23 Image Edit 拆单图/多图、2026-02-09 文生图按 prompt 类别拆榜、2026-02-26 Code Arena WebDev 拆 HTML/React、2026-03-03 Document Arena、2026-06-04 Agent Arena。期间新增 100+ 模型，并对命名做过多轮澄清（如 Kimi K3 → Kimi K3 (Max) 以反映推理档位）。

**规律**：榜单不是一次设计成的，是「先做一个总榜，再按用户实际提问的分布不断拆分」。拆分的触发点是流量足够支撑子榜的置信区间。

---

## 三、AI HOT（aihot.virxact.com）

### 3.1 产品形态

作者是自媒体「数字生命卡兹克」，把自己三年 AI 自媒体的选题经验封装成了一个**全自动 AI 热点监控与分发平台**，免费、无需登录。核心诉求原文表述是「保护我们有限的注意力」。

已知页面：精选信息流（首页）、`/all`（全部动态，可按 category/channel/page 筛）、`/daily`（AI 日报）、`/weekly`（周报）、`/topics`（主题，如 `/topics/benchmarks`）、`/about`、`/changelog`、`/agent`（Agent 接入）、`/terms`、低粉爆文、信源管理，以及用户提到的 `/leaderboard/rules`。

分类固定为五类：模型发布/更新、产品上线、行业新闻、研究论文、观点/技巧。

### 3.2 信源：168 个，三级加权

构成（第三方收录页给出的拆分）：40 官网 + 8 专家博客 + 6 机构站 + 48 X 官方账号 + 59 X 媒体与 KOL + 7 综合新闻 + 1 微信公众号 = 168。采集方式为 RSS + HTML 抓取 + 公开 API + 付费第三方数据。选源原则原文是「宁少勿多、一手优先」。

| 等级 | 内容 | 定级理由 |
|---|---|---|
| **T1** | OpenAI 博客、Anthropic 工程博客、CMU 等机构学术源 | 一手、权威 |
| **T1.5** | 大机构官方 X 账号 | 内容与官方源重合，但噪声多、边角内容多 |
| **T2** | 创始人个人号（Altman、Amodei）、KOL、媒体、聚合站 | 二手，带转述与观点 |

等级不是标签，是**下游打分的权重与阈值输入**。

### 3.3 打分流水线（本文重点）

```
采集 ~500–600 条/天
  │
  ├─ ① 预筛：DeepSeek V3.2（便宜）→ 二分类「是否与 AI 相关」+ 翻译
  │     约 50% 被丢弃
  │
  ├─ ② 打分：DeepSeek V4 Pro（世界知识强）→ 输出 5 个独立维度分
  │     prompt 约 200 行；模型【不】计算总分；维度名称不公开
  │
  ├─ ③ 总分：【代码】计算，非 AI
  │     输入 = 5 个维度分 + 信源等级权重 + 元数据（实体热度、内容类型）
  │     系数来自回测 100+ 组参数组合
  │
  ├─ ④ 闸门：【代码】按信源等级动态阈值
  │     例：OpenAI 官方 60 分即入选；独立博主需更高分
  │     最终选中 ~70–80 条/天（选中率约 14%）
  │
  ├─ ⑤ 事件聚类：embedding 语义去重
  │     一事一卡；官方源做主卡，其余变体折叠在下
  │     层级：官方渠道 → 官方社媒 → KOL 评论
  │
  └─ ⑥ 日报：北京时间每天 08:00 自动生成，耗时 <1 秒
        零 LLM 合成——分类在入库时已完成，生成只是聚合排序
```

7 天运营成本约 ¥58.90。

### 3.4 作者踩过的坑：「用脚本，不要用 Agent」

这是整个 AI HOT 调研里最有迁移价值的一条，且是**用失败换来的**：

- 最初把打分、加权、分类、选择**全部交给 LLM**，结果 V7 → V8 出现级联负优化；
- prompt 从 V1 到 V6 膨胀到 600+ 行硬编码规则（降权大 V 转发、惩罚重复报道……），**规则越加效果越差**；
- V7–V11 引入人工反馈打标，但规则继续膨胀导致模型泛化能力退化；
- 现行 V11+：**prompt 砍回 200 行，模型只输出 5 个维度分**，其余全部交给确定性代码。

得到的分工原则：**LLM 只做主观判断（打分项），确定性代码做逻辑（加权、过滤、聚合、阈值）**。调权重是改公式系数，不是改 prompt。

作者是 10 年 UX/产品背景，另外两条产品观点：「信源 > 信息量」（信息暗森林里可信度比数量重要）、公开版刻意不披露策略细节（企业/MCN 合作方拿到扩展能力）。

### 3.5 公开 API（`SKILL.md` 口径）

匿名只读，`https://aihot.virxact.com/api/v1/`：

| 端点 | 参数 |
|---|---|
| `/items` | `mode`(selected\|all)、`window`(24h\|7d)、`category`、`q`、`limit` |
| `/hot-topics` | 最多 10 条，按 `rank` 升序 |
| `/stories/{publicId}` | 事件时间线与上下文 |
| `/dailies/latest`、`/dailies/{YYYY-MM-DD}`、`/dailies` | 日报与归档索引 |

字段：`discoveredAt`、`publishedAt`、`links.{aihot,original,story}`、`summary`、`title`、`source.name`、`score`（items）、`rank`（仅 hot-topics）。

**关键设计**：`rank` 对外，**热度值本身对内不公开**（原文：热度值仅内部使用）。给序不给分——这样既可用，又不暴露可被反推的打分函数。

**授权边界**：个人、非营利、组织内部使用免费；商业对外产品、客户交付、转售、镜像、公开再分发需书面授权（`wzglyay@virxact.com`，见 `/terms`）。**这一条对 GPTwiki 有直接约束——任何形式的转载/镜像/接入其数据都需先取得书面授权。**

内部路线图（作者提及、未公开上线）：趋势预测（早期加速度识别）、30 天关联回溯、AIHOT 热度指数。

---

## 四、对 GPTwiki 的可迁移性判定

逐条给结论，不含糊：

| 元素 | 来源 | 判定 | 理由 |
|---|---|---|---|
| 匿名对战 → 投票 → 公开榜 | arena | ✅ **抄机制** | GPTwiki 已有三模型流式抽象（`getAIStream`），对战只是并发两路 |
| 「只有匿名票算数」 | arena | ✅ **抄成硬规则** | 零成本反作弊，比任何风控都强 |
| BT 拟合 + 闭式 CI + rank-with-spread | arena | ✅ **抄口径** | 闭式 CI 让每小时重算变得便宜；区间展示是统计诚实的底线 |
| 位置/机构偏差进模型、反比重加权、去重与身份泄露过滤 | arena | ✅ **抄清单** | 别人用一年踩出来的坑，直接当验收项 |
| Pareto 视图（分数 × 价格） | arena | ✅ 值得抄 | 三模型时反而更好看——决策矩阵小 |
| 29 个分类 / 13 个榜 | arena | ❌ **不抄** | 拆榜的前提是流量够撑起子榜 CI；GPTwiki 起步只该有一个总榜 |
| Agent 行为指标（Steerability / Bash Recovery 等） | arena | ⏸ 暂不 | GPTwiki 不跑 agent 任务，无对应信号 |
| 「LLM 出分项、代码算总分」 | aihot | ✅ **抄架构纪律** | 迁移价值最高的一条，且适用于文章热度榜 |
| 信源分级加权 + 动态阈值 | aihot | ◐ **改造后可用** | GPTwiki 没有外部信源，但有 `source` 字段（`editorial` / `wikipedia-*` / 用户 UGC）——天然的三级 |
| 公开规则页 | aihot | ✅ **抄形态** | 便宜、可被引用、15 语种是 GPTwiki 的独有优势 |
| 168 信源采集管线 | aihot | ❌ **不抄** | 那是三年自媒体积累的运营资产，不是可复制的代码 |
| 给序不给分（rank 对外、热度对内） | aihot | ✅ 抄 | 防反推打分函数 |
| 新闻日报/周报 | aihot | ❌ **不抄** | GPTwiki 的语料是百科文章不是新闻；且其数据受书面授权约束 |

**一句话总结**：从 arena 抄**统计与反作弊口径**，从 aihot 抄**「AI 只打分、代码算总分」的架构纪律**，两边的内容管线都不抄。

---

## 五、参考来源

arena.ai：
- [Arena AI 首页](https://arena.ai/)
- [Arena FAQ](https://arena.ai/faq) — 三种模式、BT 模型、榜单清单、预发布模型政策
- [Text 榜](https://arena.ai/leaderboard/text) — 筛选项、表列、29 分类
- [Agent 榜](https://arena.ai/leaderboard/agent) — 46 模型 / 1,665,514 sessions / 六项行为指标
- [Leaderboard Changelog](https://arena.ai/blog/leaderboard-changelog) — 去重比例、闭式 CI、偏差校正、拆榜时间线
- [Chatbot Arena Leaderboard (HF Space)](https://huggingface.co/spaces/lmarena-ai/chatbot-arena-leaderboard)
- [Agent Arena (UC Berkeley Gorilla)](https://gorilla.cs.berkeley.edu/blogs/14_agent_arena.html)

AI HOT：
- [khazix-skills/aihot/SKILL.md](https://github.com/KKKKhazix/khazix-skills/blob/main/aihot/SKILL.md) — 官方 API 与授权边界
- [作者长文复盘（腾讯新闻转载）](https://news.qq.com/rain/a/20260507A02TFV00) — 信源分级、双模型流水线、prompt 版本演进、「用脚本不用 Agent」
- [AIHOT 产品收录页（AI 工具集）](https://ai-bot.cn/aihot/) — 168 信源构成、选中率、运营成本
- [AI HOT 站点（不可达，见 §1）](https://aihot.virxact.com/leaderboard/rules)
