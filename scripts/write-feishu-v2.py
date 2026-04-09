#!/usr/bin/env python3
"""Write GPTwiki promotion plan to Feishu - correct API format."""
import json, urllib.request, time

APP_ID = "cli_a94eb8811578dcd4"
APP_SECRET = "jWUn9OhMASaHXOSYkqgWKbpCdyNKueci"
DOC_ID = "Ol55dr3fCoNYcHxPCL9ck5MQnzb"

def get_token():
    data = json.dumps({"app_id": APP_ID, "app_secret": APP_SECRET}).encode()
    req = urllib.request.Request("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as res:
        return json.load(res)["tenant_access_token"]

def add(token, blocks):
    data = json.dumps({"children": blocks}).encode()
    req = urllib.request.Request(
        f"https://open.feishu.cn/open-apis/docx/v1/documents/{DOC_ID}/blocks/{DOC_ID}/children",
        data=data, headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as res:
            r = json.load(res)
            return r.get("code", -1)
    except Exception as e:
        print(f"    ERR: {e}")
        return -1

def t(s, bold=False, link=None):
    style = {}
    if bold: style["bold"] = True
    if link: style["link"] = {"url": link}
    return {"text_run": {"content": s, "text_element_style": style}}

# Correct Feishu heading format: block_type 3=h1, 4=h2, 5=h3, 6=h4...
def h1(s): return {"block_type": 3, "heading1": {"elements": [t(s, bold=True)], "style": {}}}
def h2(s): return {"block_type": 4, "heading2": {"elements": [t(s, bold=True)], "style": {}}}
def h3(s): return {"block_type": 5, "heading3": {"elements": [t(s, bold=True)], "style": {}}}
def h4(s): return {"block_type": 6, "heading4": {"elements": [t(s, bold=True)], "style": {}}}
def p(els): return {"block_type": 2, "text": {"elements": els, "style": {}}}
def bl(els): return {"block_type": 12, "bullet": {"elements": els, "style": {}}}
def ol(els): return {"block_type": 13, "ordered": {"elements": els, "style": {}}}
def div(): return {"block_type": 22, "divider": {}}
def blank(): return p([t("")])

token = get_token()
print(f"Doc: {DOC_ID}")

batches = []

# S1: Overview
batches.append([
    p([t("AI 驱动的协作式百科全书平台 | 完整市场推广计划")]),
    blank(),
    h2("一、产品概述"),
    p([t("GPTwiki 是一个基于 AI 的新一代协作式百科全书平台，用户通过与 AI（Claude、GPT-4o、Gemini）对话创建和丰富知识内容。")]),
    blank(),
    h3("核心优势"),
    bl([t("AI 多模型支持", bold=True), t("：集成 Claude、GPT-4o、Gemini 2.0 Flash，用户可自由选择或使用自己的 API Key")]),
    bl([t("对话式创建", bold=True), t("：通过自然对话创建高质量百科内容，降低内容生产门槛")]),
    bl([t("全球化", bold=True), t("：支持15种语言自动检测和切换，内容覆盖全球主要语种")]),
    bl([t("开源透明", bold=True), t("：MIT 协议开源，技术栈透明可信")]),
    bl([t("社区驱动", bold=True), t("：用户排行榜、个人 Profile、内容贡献追踪")]),
])

batches.append([
    blank(),
    h3("技术栈"),
    bl([t("前端：Next.js 16 + TypeScript + Tailwind CSS")]),
    bl([t("后端：Google Cloud Run + Firestore")]),
    bl([t("AI：Anthropic Claude / OpenAI GPT-4o / Google Gemini")]),
    bl([t("认证：NextAuth.js (Google + GitHub OAuth)")]),
    blank(),
    h3("当前数据"),
    bl([t("Wiki 文章数：100,000+（持续增长中）")]),
    bl([t("支持语言：15种（英、中、日、韩、西、法、德、葡、俄、意、阿、印、土、越、泰）")]),
    bl([t("内容来源：Wikipedia 种子内容 + 用户 AI 生成内容")]),
    blank(),
    div(),
])

# S2: Target Market
batches.append([
    h2("二、目标市场与用户画像"),
    blank(),
    h4("1. 知识工作者与研究人员"),
    bl([t("痛点：传统百科信息碎片化，需跨多个来源整合信息")]),
    bl([t("GPTwiki 价值：AI 即时生成结构化知识摘要，一站式获取")]),
    bl([t("规模：全球约 5000 万知识工作者")]),
    blank(),
    h4("2. 学生与教育工作者"),
    bl([t("痛点：学习资料分散，需要可靠的多语言知识源")]),
    bl([t("GPTwiki 价值：多语言 AI 解释，对话式深入学习")]),
    bl([t("规模：全球超 15 亿学生群体")]),
])

batches.append([
    blank(),
    h4("3. 开发者与技术爱好者"),
    bl([t("痛点：技术文档查找效率低")]),
    bl([t("GPTwiki 价值：开源、可自部署、支持自定义 API Key")]),
    bl([t("规模：全球约 2800 万开发者")]),
    blank(),
    h4("4. 多语言内容消费者"),
    bl([t("痛点：非英语内容匮乏或质量不高")]),
    bl([t("GPTwiki 价值：AI 原生多语言内容生成，质量一致")]),
    blank(),
    div(),
])

# S3: Strategy Phase 1
batches.append([
    h2("三、推广策略"),
    blank(),
    h3("阶段一：冷启动期（第 1-2 个月）"),
    p([t("目标：", bold=True), t("积累种子用户 1,000 人，建立产品口碑")]),
    blank(),
    h4("1. 技术社区推广"),
    ol([t("Hacker News", bold=True), t("：发布 Show HN 帖子，强调 AI+百科的创新模式和开源特性")]),
    ol([t("Product Hunt", bold=True), t("：选择周二上线，准备精美截图和演示视频")]),
    ol([t("Reddit", bold=True), t("：在 r/artificial、r/ChatGPT、r/SideProject 发帖")]),
    ol([t("GitHub Trending", bold=True), t("：优化 README，添加 Star 引导，争取进入 Trending")]),
    ol([t("V2EX / 少数派", bold=True), t("：针对中文开发者社区推广")]),
])

batches.append([
    blank(),
    h4("2. 社交媒体矩阵"),
    ol([t("Twitter/X", bold=True), t("：创建 @GPTwiki 账号，定期发布 AI 生成的趣味知识卡片")]),
    ol([t("YouTube", bold=True), t("：录制 2-3 分钟产品演示视频和使用教程")]),
    ol([t("微信公众号", bold=True), t("：面向中文用户发布产品介绍和使用指南")]),
    ol([t("小红书/即刻", bold=True), t("：发布 AI 工具推荐类内容")]),
    blank(),
    h4("3. 内容种子策略"),
    bl([t("预填充 100,000+ 篇高质量 Wikipedia 文章作为基础内容")]),
    bl([t("确保用户首次访问即有丰富内容可浏览")]),
    bl([t("覆盖 15 种语言，吸引全球用户")]),
    blank(),
])

# S3: Phase 2
batches.append([
    h3("阶段二：增长期（第 3-6 个月）"),
    p([t("目标：", bold=True), t("月活用户达到 10,000，日均新增 Wiki 100+")]),
    blank(),
    h4("1. SEO 策略"),
    bl([t("结构化数据标记（Schema.org Article）")]),
    bl([t("自动生成 sitemap.xml，提交到 Google Search Console")]),
    bl([t("优化每篇 Wiki 的 meta title/description")]),
    bl([t("构建内部链接网络，提升页面权重")]),
    bl([t("目标：3 个月内被 Google 索引 50,000+ 页面")]),
])

batches.append([
    blank(),
    h4("2. 内容营销"),
    bl([t("每周发布 2 篇博客：AI 技术趋势、知识管理方法论")]),
    bl([t("制作 \"AI vs 人类知识创造\" 对比研究报告")]),
    bl([t("邀请 KOL/博主试用并撰写评测")]),
    blank(),
    h4("3. 社区建设"),
    bl([t("创建 Discord 社区，设立 #feature-request、#bug-report 频道")]),
    bl([t("每月举办 \"Wiki Marathon\"：24小时内创建最多高质量 Wiki 的用户获奖")]),
    bl([t("建立 Contributor 等级体系：Bronze → Silver → Gold → Platinum")]),
    blank(),
    h4("4. 合作伙伴"),
    bl([t("联系大学和在线教育平台（Coursera、edX）探索合作")]),
    bl([t("与 AI 工具导航站合作收录")]),
    bl([t("接入 Chrome 扩展生态，提供一键查询功能")]),
    blank(),
])

# S3: Phase 3
batches.append([
    h3("阶段三：规模化（第 7-12 个月）"),
    p([t("目标：", bold=True), t("月活用户达到 100,000，成为 AI 百科领域标杆产品")]),
    blank(),
    h4("1. 产品增长功能"),
    bl([t("Wiki 嵌入功能：允许其他网站嵌入 GPTwiki 内容")]),
    bl([t("API 开放：提供 RESTful API 让开发者集成")]),
    bl([t("移动端 PWA：优化移动体验")]),
    bl([t("浏览器插件：划词即查 GPTwiki")]),
    blank(),
    h4("2. 国际化深耕"),
    bl([t("针对日韩市场定制推广（Line、KakaoTalk 社群）")]),
    bl([t("拉美市场：西班牙语/葡萄牙语社交媒体推广")]),
    bl([t("东南亚市场：越南语/泰语内容本地化")]),
    blank(),
    h4("3. 付费转化"),
    bl([t("GPTwiki Pro：无限 AI 对话、高级模型优先使用、无广告")]),
    bl([t("团队版：企业内部知识库搭建")]),
    bl([t("API 调用：按量计费的 API 访问")]),
    blank(),
    div(),
])

# S4: Budget
batches.append([
    h2("四、推广渠道与预算"),
    blank(),
    h3("免费渠道（优先执行）"),
    bl([t("GitHub 开源推广", bold=True), t("：Star、Fork、Issue 互动 — 成本 $0")]),
    bl([t("Hacker News / Product Hunt", bold=True), t("：首发推广 — 成本 $0")]),
    bl([t("技术博客 & SEO", bold=True), t("：长期内容沉淀 — 成本 $0")]),
    bl([t("社交媒体运营", bold=True), t("：Twitter/X、Reddit、V2EX — 成本 $0")]),
    bl([t("Discord/Telegram 社群", bold=True), t("：用户运营 — 成本 $0")]),
])

batches.append([
    blank(),
    h3("付费渠道（视预算启动）"),
    bl([t("Google Ads", bold=True), t("：针对 \"AI wiki\" 等关键词 — 预算 $500-1000/月")]),
    bl([t("Twitter/X Ads", bold=True), t("：推广 AI 知识卡片内容 — 预算 $300-500/月")]),
    bl([t("KOL 合作", bold=True), t("：邀请科技博主评测 — 预算 $200-500/位")]),
    bl([t("Product Hunt 推广服务", bold=True), t("：Launch Day 冲榜支持 — 预算 $300-500")]),
    blank(),
    h3("预算总览（前 6 个月）"),
    bl([t("基础设施（Cloud Run + Firestore）：$50-200/月")]),
    bl([t("AI API 成本：$100-500/月（视用量）")]),
    bl([t("付费推广（可选）：$1000-2000/月")]),
    bl([t("最低启动成本", bold=True), t("：约 $150/月（仅基础设施 + 免费推广）")]),
    blank(),
    div(),
])

# S5: KPI
batches.append([
    h2("五、关键指标（KPI）"),
    blank(),
    h3("第 1 个月"),
    bl([t("注册用户：500+")]),
    bl([t("Wiki 总数：100,000+（含种子内容）")]),
    bl([t("GitHub Star：200+")]),
    bl([t("Product Hunt 排名：当日 Top 10")]),
    blank(),
    h3("第 3 个月"),
    bl([t("月活用户（MAU）：5,000+")]),
    bl([t("用户创建 Wiki：3,000+")]),
    bl([t("Google 索引页面：50,000+")]),
    bl([t("日均访问：500+ UV")]),
])

batches.append([
    blank(),
    h3("第 6 个月"),
    bl([t("月活用户（MAU）：30,000+")]),
    bl([t("用户创建 Wiki：20,000+")]),
    bl([t("日均访问：3,000+ UV")]),
    bl([t("社群成员：2,000+")]),
    blank(),
    h3("第 12 个月"),
    bl([t("月活用户（MAU）：100,000+")]),
    bl([t("Wiki 总数：500,000+")]),
    bl([t("付费转化率：2-5%")]),
    bl([t("MRR：$5,000+")]),
    blank(),
    div(),
])

# S6: Competition
batches.append([
    h2("六、竞品分析"),
    blank(),
    h3("直接竞品"),
    bl([t("Wikipedia", bold=True), t("：最大百科全书，但无 AI 辅助创作，编辑门槛高")]),
    bl([t("Perplexity", bold=True), t("：AI 搜索引擎，但不沉淀知识，无社区协作")]),
    bl([t("Notion AI", bold=True), t("：团队知识库，但非公开百科，定位不同")]),
    blank(),
    h3("GPTwiki 差异化"),
    bl([t("唯一结合 \"AI 生成 + 百科沉淀 + 社区协作\" 的产品")]),
    bl([t("多模型自由切换（非锁定单一 AI 厂商）")]),
    bl([t("完全开源，用户可自部署")]),
    bl([t("原生多语言支持（15种语言）")]),
    blank(),
    div(),
])

# S7: Risk
batches.append([
    h2("七、风险与应对"),
    blank(),
    bl([t("内容质量风险", bold=True), t("：AI 生成内容可能存在错误 → 引入社区审核机制和引用标注")]),
    bl([t("AI 成本风险", bold=True), t("：API 调用成本随用户增长上升 → 支持用户自带 API Key，梯度定价")]),
    bl([t("版权风险", bold=True), t("：种子内容来源合规 → Wikipedia 内容基于 CC BY-SA，标注来源")]),
    bl([t("竞争风险", bold=True), t("：大厂可能推出类似产品 → 深耕社区和开源生态，建立网络效应")]),
    blank(),
    div(),
])

# S8: Timeline
batches.append([
    h2("八、执行时间表"),
    blank(),
    h3("Week 1-2：基础准备"),
    bl([t("完善 GitHub README 和文档")]),
    bl([t("准备 Product Hunt 上线素材（截图、视频、描述）")]),
    bl([t("创建 Twitter/X、Discord 账号并发布首条内容")]),
    bl([t("配置 Google Analytics 和 Search Console")]),
    blank(),
    h3("Week 3-4：首发推广"),
    bl([t("Product Hunt Launch Day")]),
    bl([t("Hacker News Show HN 帖子")]),
    bl([t("Reddit / V2EX / 少数派发帖")]),
    bl([t("联系 5-10 位科技博主进行评测")]),
])

batches.append([
    blank(),
    h3("Month 2-3：内容与 SEO"),
    bl([t("启动 SEO 优化（sitemap、meta tags、结构化数据）")]),
    bl([t("每周发布 2 篇技术博客")]),
    bl([t("举办首次 Wiki Marathon 活动")]),
    bl([t("收集用户反馈并迭代产品")]),
    blank(),
    h3("Month 4-6：社区与增长"),
    bl([t("推出 Contributor 等级体系")]),
    bl([t("开放 API 和嵌入功能")]),
    bl([t("探索付费模式（GPTwiki Pro）")]),
    bl([t("拓展国际市场推广")]),
    blank(),
    div(),
])

# S9: Summary
batches.append([
    h2("九、总结"),
    p([t("GPTwiki 定位于 \"AI 时代的百科全书\"，通过 AI 多模型驱动 + 社区协作 + 全球化的差异化策略，有机会在知识管理领域开辟全新赛道。推广核心策略是：")]),
    blank(),
    ol([t("以开源和技术社区为起点", bold=True), t("，获取高质量种子用户")]),
    ol([t("以 SEO 和内容营销为引擎", bold=True), t("，实现自然增长")]),
    ol([t("以社区运营为护城河", bold=True), t("，建立用户粘性和网络效应")]),
    ol([t("以付费功能为商业化路径", bold=True), t("，实现可持续发展")]),
    blank(),
    p([t("访问产品："), t("https://gptwiki.net", link="https://gptwiki.net")]),
    blank(),
    p([t("— GPTwiki 团队 | 2026 年 4 月", bold=True)]),
])

for i, batch in enumerate(batches):
    code = add(token, batch)
    status = "OK" if code == 0 else f"FAIL({code})"
    print(f"  Batch {i+1}/{len(batches)}: {status} ({len(batch)} blocks)")
    time.sleep(0.5)

print(f"\nDone! URL: https://xinsuixing.feishu.cn/docx/{DOC_ID}")
