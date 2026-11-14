# 读懂数据：原创双语图文内容包

状态：**8 篇文章已正式上线，16 张正文图表与 4 张共享封面已通过在线验收。** 核验日期：2026-11-14。

已按「先部署图表资产、再发布内容」的顺序完成发布：生产版本
`gptwiki-release-d91a29df55b0` 承载全部流量；[PR #188](https://github.com/oratis/GPTwiki/pull/188)
合并后，[auto-seed](https://github.com/oratis/GPTwiki/actions/runs/43564821502)
于 2026-11-14 14:10（Asia/Shanghai）成功完成，`created=8`、`images=4/4`，无跳过项。
逐项 HTTP 与资源哈希结果见 [publication.json](publication.json)。

| 主题 | 中文 | English |
| --- | --- | --- |
| 坐标轴与尺度 | [中文文章](https://gptwiki.net/zh/wiki/editorial-reading-chart-scales-zh) | [English article](https://gptwiki.net/en/wiki/editorial-reading-chart-scales-en) |
| 均值与中位数 | [中文文章](https://gptwiki.net/zh/wiki/editorial-mean-median-outliers-zh) | [English article](https://gptwiki.net/en/wiki/editorial-mean-median-outliers-en) |
| 准确率与基准率 | [中文文章](https://gptwiki.net/zh/wiki/editorial-classifier-base-rates-zh) | [English article](https://gptwiki.net/en/wiki/editorial-classifier-base-rates-en) |
| 问卷与抽样偏差 | [中文文章](https://gptwiki.net/zh/wiki/editorial-sampling-bias-large-surveys-zh) | [English article](https://gptwiki.net/en/wiki/editorial-sampling-bias-large-surveys-en) |

本批次有 4 个主题、8 篇完整文章、16 张原创 SVG 图表。英文每篇约
900–1,000 个空白分隔词项（包含图注和表格），中文每篇约 2,300–2,900
字符（包含 Markdown 和链接）。每篇有两张本语言图表、图注、完整算例、
自测题、文内来源和结构化参考资料。

## 阅读与编辑

直接在浏览器打开 [review.html](review.html) 可阅读全部图文；点击图片
打开原始矢量图。该文件使用仓库现有的 `react-markdown` 与 `remark-gfm`
渲染，无外部脚本、字体或图片依赖。它是本地审阅页面，不是新的产品路由。

| 主题 | 中文标题 | 英文标题 | 两张配图说明 |
| --- | --- | --- | --- |
| `reading-chart-scales` | 读图先看坐标轴：别让尺度替你下结论 | How to Read Chart Scales Without Being Misled | 零基线与截断基线；线性与对数增长 |
| `mean-median-outliers` | 均值与中位数：一个“平均数”藏起了什么 | Mean vs Median: What an Average Leaves Out | 极端延迟对均值的影响；相同中心、不同分散程度 |
| `classifier-base-rates` | 99% 准确率为什么还可能漏掉所有问题 | Why 99% Accuracy Can Hide a Useless Classifier | 混淆矩阵；基准率与告警组成 |
| `sampling-bias-large-surveys` | 问卷收得越多，为什么答案仍可能越偏 | Why a Bigger Survey Can Still Give the Wrong Answer | 总体与回答者构成；总体权重与问卷权重 |

正文源文件是 [英文](../data-literacy.en.ts)、[中文](../data-literacy.zh.ts)，
[barrel](../data-literacy.ts) 汇总两种语言。
[release 快照](../releases/20261114-120000.json) 完全符合现有 `DraftArticle`
和双语 release schema，不需要改动 `src/`、发布脚本或依赖。

## 内容与图片来源

所有正文、场景、算例和图表均为本批次原创。图中的数字均明确标为教学假设，
没有冒充实测、调查或产品性能。图表不复制来源机构的插图，不使用外部图库素材。
理论方法引用来源机构，不暗示机构为本批稿件或示例背书。

- 16 张图位于 [`public/editorial/data-literacy/`](../../public/editorial/data-literacy/)，
  每张 1440 × 810，符合现有 WikiContent 的 16:9 展示比例。
- [build-figures.mjs](build-figures.mjs) 生成全部图表；[figures.json](figures.json)
  记录文件名、语言、尺寸、标题和替代说明。
- SVG 保留文字、`title` 和 `desc`；没有脚本、外部资源或嵌入 HTML。
  关键区别同时用数字和文字表达，不只依赖颜色。
- [preview.png](preview.png) 是第一张中文图的便览，不是额外的数据来源。
- `image.prompt` / `image.alt` 遵循现有编辑 schema 的封面规范。正式发布流程已通过
  Seedream 按每个 `topicKey` 生成一张共享概念封面，共 4 张；中英共享 prompt，图注本地化。
  这些概念插画不承载算例数据，16 张正文教学图仍为本地原创 SVG。

## 来源核验与适用范围

已阅读以下来源的相关内容，并对照正文中的方法性断言。来源不负责本文虚构场景
中的数值；这些数字另行用 Python 的 `fractions` 和 `statistics` 复算。

| 来源 | 支持的内容 | 2026-11-14 链接检查 |
| --- | --- | --- |
| [ONS：坐标轴与网格](https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines) | 柱图基线、线图缩放、刻度选择 | live |
| [ONS：百分比与百分点](https://service-manual.ons.gov.uk/content/numbers/percentages) | 百分点与相对变化的区别 | live |
| [ONS：柱状图](https://service-manual.ons.gov.uk/data-visualisation/chart-types/bar-charts) | 柱长与零基线 | live |
| [NIST：位置指标](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm) | 均值、中位数、极端值 | live |
| [NIST：离散指标](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm) | 极差、标准差、四分位距 | live |
| [Google：分类指标](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall) | 准确率、精确率、召回率、假正例率的分母 | live |
| [Google：阈值与混淆矩阵](https://developers.google.com/machine-learning/crash-course/classification/thresholding) | 四类计数、阈值取舍 | live |
| [Google：指标词汇表](https://developers.google.com/machine-learning/glossary/metrics) | 类别不平衡与指标定义 | live |
| [Google：划分数据集](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets) | 独立且有代表性的测试集 | live |
| [Statistics Canada：样本选择](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/sample-echantillon/5214900-eng.htm) | 目标总体、设计与样本量 | live |
| [Statistics Canada：概率抽样](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/prob/5214899-eng.htm) | 随机选择、可计算的入样概率 | live |
| [Statistics Canada：非概率抽样](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-eng.htm) | 自愿回答与推广到总体所需的假设 | live |
| [U.S. Census Bureau：非抽样误差](https://www.census.gov/programs-surveys/sipp/methodology/nonsampling-error.html) | 无应答、覆盖不足和权重的局限 | live |
| [Penn State STAT 100：置信区间](https://online.stat.psu.edu/stat100/Lesson09) | 比例的正态近似误差范围、1.96 系数 | blocked；搜索索引提供课程相关段落，直接抓取超时 |

`live` / `blocked` 是现有 `scripts/lib/source-health.ts` 的结果，不能替代
对“链接是否支持断言”的编辑核验。最后一个课程页未被判断为失效；本文也没有把
简单随机样本的误差公式套到自愿问卷上。整批无 404/410 来源，每篇至少两个 live 来源。

## 去重与验证

- 对本批之外的 211 个 `content/` 下 TypeScript / JSON 文件做了精确
  `topicKey` 和标题检查：无冲突；另对现有英文选题及 backlog 做了主题检查。
- 这次没有扫描生产库中数百万百科镜像，也不声称新概念从未被其他文章提到。
  新稿的独立价值在于一组连续的、有原创算例和可复算配图的数据阅读教程。
- 新增英文模块会被现有 `editorialTopicCatalog()` 自动发现，供后续选题去重；
  无须把这些手写题目再加入自动生成队列。
- 8 篇文章均通过现有 `validateDraft`、`releaseKeys`、`readRelease`；
  摘要 ≤320 字符，标签 1–8 个，每个 topic 恰好 en/zh 各一篇。
- 每篇 2 个本语言图片链接，16 张图片路径全部存在；文内来源均登记在 `sources`。
- release 与 TypeScript 正文逐字段一致。独立复算了正文及练习中的均值、
  分类计数、精确率、加权支持率和误差范围。
- 全仓 `npx tsc --noEmit --incremental false` 通过；新增文件 ESLint 通过；
  `scripts/test-editorial-release.ts` 通过。
- 16 张 SVG 均完成栅格渲染目检；浏览器中的完整审阅页能显示中文、表格、图注和图片。
  预览不存在残留的 Markdown 加粗分隔符或页面级水平溢出。
- 现有 seeder 的无写入演练输出 `would create=8`，没有数据库写入或付费图像调用。
- 正式发布后，8 个文章 URL 均返回 HTTP 200，标题、语言、canonical、作者、
  两张正文图和全部参考来源均匹配发布稿；无残留 Markdown 加粗分隔符。
- 16 张生产 SVG 均返回 HTTP 200，内容与本地审阅文件逐字节相同；4 张封面的
  Next.js 图片地址均返回 HTTP 200。浏览器逐篇检查 1280 × 720 桌面视口，
  正文、表格、图注、图表和封面正常显示，无页面级水平溢出。

从仓库根目录复现本地打包检查：

```bash
node content/data-literacy/build-figures.mjs
npx tsx content/data-literacy/prepare.ts
npx tsx scripts/test-editorial-release.ts
npx eslint content/data-literacy.en.ts content/data-literacy.zh.ts content/data-literacy.ts content/data-literacy/build-figures.mjs content/data-literacy/prepare.ts
npx tsc --noEmit --incremental false
```

`prepare.ts` 只做本地验证和审阅页生成。`--write-release` 只允许新建快照，
或验证现有快照完全一致；不会悄悄覆盖已审阅数据。本批快照已正式发布，不要改写。

## 发布衔接

以下为本批已执行的发布顺序；应用与静态资源部署由主会话完成，内容由既有 auto-seed 入库。

1. 先部署包含 `public/editorial/data-literacy/` 的应用版本，确认文中图表 URL
   可访问。**内容入库和静态资源部署是两件独立的事。**
2. 按既有审阅流程发布 `content/releases/20261114-120000.json`。
   该文件合入 `main` 会触发既有 `auto-seed`；它不会替你部署 `public/`。
3. 发布器按 topicKey 为 en/zh 生成共享概念封面，并注入正文；原有两张教学图仍保留。
   若选择 `--no-images`，它只跳过生成封面，正文里的 16 张已完成图表仍需部署。

本地无写入演练（已执行）：

```bash
npx tsx scripts/seed-editorial.ts --release=content/releases/20261114-120000.json --no-images
```

既有流程使用的完整发布命令（本次由 auto-seed 执行，无须再次手动发布）：

```bash
npx tsx scripts/seed-editorial.ts --release=content/releases/20261114-120000.json --apply
```

`--release` 会直接读取快照；日志中的默认 `batch=ai-in-practice` 不代表内容选错。
不需要新增 `BATCHES` 注册，也不需要覆盖自动生成器使用的 `auto-draft.en.ts`。

可供后续工具改进的建议：让 release 发布步骤先检查正文中的本地图片 URL 是否已在线，
或支持把审核过的本地教学图上传到已有图片存储。当前批次不修改发布工具，以免与主会话冲突。
