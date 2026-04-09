#!/usr/bin/env python3
"""Write GPTwiki promotion plan to a new Feishu document."""

import json
import urllib.request
import time

APP_ID = "cli_a94eb8811578dcd4"
APP_SECRET = "jWUn9OhMASaHXOSYkqgWKbpCdyNKueci"
DOC_ID = "HyQUdSyuao8FBBxu9t8cMBiQnBc"

def get_token():
    data = json.dumps({"app_id": APP_ID, "app_secret": APP_SECRET}).encode()
    req = urllib.request.Request(
        "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        data=data, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as res:
        return json.load(res)["tenant_access_token"]

def add_blocks(token, blocks):
    data = json.dumps({"children": blocks}).encode()
    req = urllib.request.Request(
        f"https://open.feishu.cn/open-apis/docx/v1/documents/{DOC_ID}/blocks/{DOC_ID}/children",
        data=data,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req) as res:
            result = json.load(res)
            return result.get("code", -1)
    except Exception as e:
        print(f"  Error: {e}")
        return -1

def t(content, bold=False, link=None):
    style = {}
    if bold: style["bold"] = True
    if link: style["link"] = {"url": link}
    return {"text_run": {"content": content, "text_element_style": style}}

def heading(level, text):
    return {"block_type": 3, "heading": {"elements": [t(text, bold=True)], "style": {"level": level}}}

def para(elements):
    return {"block_type": 2, "text": {"elements": elements, "style": {}}}

def bullet(elements):
    return {"block_type": 12, "bullet": {"elements": elements, "style": {}}}

def ordered(elements):
    return {"block_type": 13, "ordered": {"elements": elements, "style": {}}}

def divider():
    return {"block_type": 22}

def blank():
    return para([t("")])

# Build all sections
all_blocks = []

# === Section 1: Overview ===
s1 = [
    para([t("AI 驱动的协作式百科全书平台 | 完整市场推广计划")]),
    blank(),
    heading(2, "一、产品概述"),
    para([t("GPTwiki 是一个基于 AI 的新一代协作式百科全书平台，用户通过与 AI（Claude、GPT-4o、Gemini）对话创建和丰富知识内容。")]),
    blank(),
    heading(3, "核心优势"),
    bullet([t("AI 多模型支持", bold=True), t("：集成 Claude、GPT-4o、Gemini 2.0 Flash，用户可自由选择或使用自己的 API Key")]),
    bullet([t("对话式创建", bold=True), t("：通过自然对话创建高质量百科内容，降低内容生产门槛")]),
    bullet([t("全球化", bold=True), t("：支持15种语言自动检测和切换，内容覆盖全球主要语种")]),
    bullet([t("开源透明", bold=True), t("：MIT 协议开源，技术栈透明可信")]),
    bullet([t("社区驱动", bold=True), t("：用户排行榜、个人 Profile、内容贡献追踪")]),
    blank(),
    heading(3, "技术栈"),
    bullet([t("前端：Next.js 16 + TypeScript + Tailwind CSS")]),
    bullet([t("后端：Google Cloud Run + Firestore")]),
    bullet([t("AI：Anthropic Claude / OpenAI GPT-4o / Google Gemini")]),
    bullet([t("认证：NextAuth.js (Google + GitHub OAuth)")]),
    blank(),
    heading(3, "当前数据"),
    bullet([t("Wiki 文章数：100,000+（持续增长中）")]),
    bullet([t("支持语言：15种（英、中、日、韩、西、法、德、葡、俄、意、阿、印、土、越、泰）")]),
    bullet([t("内容来源：Wikipedia 种子内容 + 用户 AI 生成内容")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 1: Overview", s1))

# === Section 2: Target Market ===
s2 = [
    heading(2, "二、目标市场与用户画像"),
    blank(),
    heading(4, "1. 知识工作者与研究人员"),
    bullet([t("痛点：传统百科信息碎片化，需跨多个来源整合信息")]),
    bullet([t("GPTwiki 价值：AI 即时生成结构化知识摘要，一站式获取")]),
    bullet([t("规模：全球约 5000 万知识工作者")]),
    blank(),
    heading(4, "2. 学生与教育工作者"),
    bullet([t("痛点：学习资料分散，需要可靠的多语言知识源")]),
    bullet([t("GPTwiki 价值：多语言 AI 解释，对话式深入学习")]),
    bullet([t("规模：全球超 15 亿学生群体")]),
    blank(),
    heading(4, "3. 开发者与技术爱好者"),
    bullet([t("痛点：技术文档查找效率低")]),
    bullet([t("GPTwiki 价值：开源、可自部署、支持自定义 API Key")]),
    bullet([t("规模：全球约 2800 万开发者")]),
    blank(),
    heading(4, "4. 多语言内容消费者"),
    bullet([t("痛点：非英语内容匮乏或质量不高")]),
    bullet([t("GPTwiki 价值：AI 原生多语言内容生成，质量一致")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 2: Target Market", s2))

# === Section 3: Strategy ===
s3a = [
    heading(2, "三、推广策略"),
    blank(),
    heading(3, "阶段一：冷启动期（第 1-2 个月）"),
    para([t("目标：", bold=True), t("积累种子用户 1,000 人，建立产品口碑")]),
    blank(),
    heading(4, "1. 技术社区推广"),
    ordered([t("Hacker News", bold=True), t("：发布 Show HN 帖子，强调 AI+百科的创新模式和开源特性")]),
    ordered([t("Product Hunt", bold=True), t("：选择周二上线，准备精美截图和演示视频")]),
    ordered([t("Reddit", bold=True), t("：在 r/artificial、r/ChatGPT、r/SideProject 发帖")]),
    ordered([t("GitHub Trending", bold=True), t("：优化 README，添加 Star 引导，争取进入 Trending")]),
    ordered([t("V2EX / 少数派", bold=True), t("：针对中文开发者社区推广")]),
    blank(),
    heading(4, "2. 社交媒体矩阵"),
    ordered([t("Twitter/X", bold=True), t("：创建 @GPTwiki 账号，定期发布 AI 生成的趣味知识卡片")]),
    ordered([t("YouTube", bold=True), t("：录制 2-3 分钟产品演示视频和使用教程")]),
    ordered([t("微信公众号", bold=True), t("：面向中文用户发布产品介绍和使用指南")]),
    ordered([t("小红书/即刻", bold=True), t("：发布 AI 工具推荐类内容")]),
    blank(),
    heading(4, "3. 内容种子策略"),
    bullet([t("预填充 100,000+ 篇高质量 Wikipedia 文章作为基础内容")]),
    bullet([t("确保用户首次访问即有丰富内容可浏览")]),
    bullet([t("覆盖 15 种语言，吸引全球用户")]),
    blank(),
]
all_blocks.append(("Section 3a: Cold Start", s3a))

s3b = [
    heading(3, "阶段二：增长期（第 3-6 个月）"),
    para([t("目标：", bold=True), t("月活用户达到 10,000，日均新增 Wiki 100+")]),
    blank(),
    heading(4, "1. SEO 策略"),
    bullet([t("结构化数据标记（Schema.org Article）")]),
    bullet([t("自动生成 sitemap.xml，提交到 Google Search Console")]),
    bullet([t("优化每篇 Wiki 的 meta title/description")]),
    bullet([t("构建内部链接网络，提升页面权重")]),
    bullet([t("目标：3 个月内被 Google 索引 50,000+ 页面")]),
    blank(),
    heading(4, "2. 内容营销"),
    bullet([t("每周发布 2 篇博客：AI 技术趋势、知识管理方法论")]),
    bullet([t("制作 \"AI vs 人类知识创造\" 对比研究报告")]),
    bullet([t("邀请 KOL/博主试用并撰写评测")]),
    blank(),
    heading(4, "3. 社区建设"),
    bullet([t("创建 Discord 社区，设立 #feature-request、#bug-report 频道")]),
    bullet([t("每月举办 \"Wiki Marathon\"：24 小时内创建最多高质量 Wiki 的用户获奖")]),
    bullet([t("建立 Contributor 等级体系：Bronze → Silver → Gold → Platinum")]),
    blank(),
    heading(4, "4. 合作伙伴"),
    bullet([t("联系大学和在线教育平台（Coursera、edX）探索合作")]),
    bullet([t("与 AI 工具导航站（There's An AI For That、AI Tools Directory）合作收录")]),
    bullet([t("接入 Chrome 扩展生态，提供一键查询功能")]),
    blank(),
]
all_blocks.append(("Section 3b: Growth", s3b))

s3c = [
    heading(3, "阶段三：规模化（第 7-12 个月）"),
    para([t("目标：", bold=True), t("月活用户达到 100,000，成为 AI 百科领域标杆产品")]),
    blank(),
    heading(4, "1. 产品增长功能"),
    bullet([t("Wiki 嵌入功能：允许其他网站嵌入 GPTwiki 内容")]),
    bullet([t("API 开放：提供 RESTful API 让开发者集成")]),
    bullet([t("移动端 PWA：优化移动体验")]),
    bullet([t("浏览器插件：划词即查 GPTwiki")]),
    blank(),
    heading(4, "2. 国际化深耕"),
    bullet([t("针对日韩市场定制推广（Line、KakaoTalk 社群）")]),
    bullet([t("拉美市场：西班牙语/葡萄牙语社交媒体推广")]),
    bullet([t("东南亚市场：越南语/泰语内容本地化")]),
    blank(),
    heading(4, "3. 付费转化"),
    bullet([t("GPTwiki Pro：无限 AI 对话、高级模型优先使用、无广告")]),
    bullet([t("团队版：企业内部知识库搭建")]),
    bullet([t("API 调用：按量计费的 API 访问")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 3c: Scale", s3c))

# === Section 4: Budget ===
s4 = [
    heading(2, "四、推广渠道与预算"),
    blank(),
    heading(3, "免费渠道（优先执行）"),
    bullet([t("GitHub 开源推广", bold=True), t("：Star、Fork、Issue 互动 — 成本 $0")]),
    bullet([t("Hacker News / Product Hunt", bold=True), t("：首发推广 — 成本 $0")]),
    bullet([t("技术博客 & SEO", bold=True), t("：长期内容沉淀 — 成本 $0")]),
    bullet([t("社交媒体运营", bold=True), t("：Twitter/X、Reddit、V2EX — 成本 $0")]),
    bullet([t("Discord/Telegram 社群", bold=True), t("：用户运营 — 成本 $0")]),
    blank(),
    heading(3, "付费渠道（视预算启动）"),
    bullet([t("Google Ads", bold=True), t("：针对 \"AI wiki\"、\"AI encyclopedia\" 等关键词 — 预算 $500-1000/月")]),
    bullet([t("Twitter/X Ads", bold=True), t("：推广 AI 知识卡片内容 — 预算 $300-500/月")]),
    bullet([t("KOL 合作", bold=True), t("：邀请科技博主评测 — 预算 $200-500/位")]),
    bullet([t("Product Hunt 推广服务", bold=True), t("：Launch Day 冲榜支持 — 预算 $300-500")]),
    blank(),
    heading(3, "预算总览（前 6 个月）"),
    bullet([t("基础设施（Cloud Run + Firestore）：$50-200/月")]),
    bullet([t("AI API 成本：$100-500/月（视用量）")]),
    bullet([t("付费推广（可选）：$1000-2000/月")]),
    bullet([t("最低启动成本", bold=True), t("：约 $150/月（仅基础设施 + 免费推广）")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 4: Budget", s4))

# === Section 5: KPI ===
s5 = [
    heading(2, "五、关键指标（KPI）"),
    blank(),
    heading(3, "第 1 个月"),
    bullet([t("注册用户：500+")]),
    bullet([t("Wiki 总数：100,000+（含种子内容）")]),
    bullet([t("GitHub Star：200+")]),
    bullet([t("Product Hunt 排名：当日 Top 10")]),
    blank(),
    heading(3, "第 3 个月"),
    bullet([t("月活用户（MAU）：5,000+")]),
    bullet([t("用户创建 Wiki：3,000+")]),
    bullet([t("Google 索引页面：50,000+")]),
    bullet([t("日均访问：500+ UV")]),
    blank(),
    heading(3, "第 6 个月"),
    bullet([t("月活用户（MAU）：30,000+")]),
    bullet([t("用户创建 Wiki：20,000+")]),
    bullet([t("日均访问：3,000+ UV")]),
    bullet([t("社群成员：2,000+")]),
    blank(),
    heading(3, "第 12 个月"),
    bullet([t("月活用户（MAU）：100,000+")]),
    bullet([t("Wiki 总数：500,000+")]),
    bullet([t("付费转化率：2-5%")]),
    bullet([t("MRR：$5,000+")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 5: KPI", s5))

# === Section 6: Competition ===
s6 = [
    heading(2, "六、竞品分析"),
    blank(),
    heading(3, "直接竞品"),
    bullet([t("Wikipedia", bold=True), t("：最大百科全书，但无 AI 辅助创作，编辑门槛高")]),
    bullet([t("Perplexity", bold=True), t("：AI 搜索引擎，但不沉淀知识，无社区协作")]),
    bullet([t("Notion AI", bold=True), t("：团队知识库，但非公开百科，定位不同")]),
    blank(),
    heading(3, "GPTwiki 差异化"),
    bullet([t("唯一结合 \"AI 生成 + 百科沉淀 + 社区协作\" 的产品")]),
    bullet([t("多模型自由切换（非锁定单一 AI 厂商）")]),
    bullet([t("完全开源，用户可自部署")]),
    bullet([t("原生多语言支持（15种语言）")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 6: Competition", s6))

# === Section 7: Risk ===
s7 = [
    heading(2, "七、风险与应对"),
    blank(),
    bullet([t("内容质量风险", bold=True), t("：AI 生成内容可能存在错误 → 引入社区审核机制和引用标注")]),
    bullet([t("AI 成本风险", bold=True), t("：API 调用成本随用户增长上升 → 支持用户自带 API Key，梯度定价")]),
    bullet([t("版权风险", bold=True), t("：种子内容来源合规 → Wikipedia 内容基于 CC BY-SA，标注来源")]),
    bullet([t("竞争风险", bold=True), t("：大厂可能推出类似产品 → 深耕社区和开源生态，建立网络效应")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 7: Risk", s7))

# === Section 8: Timeline ===
s8 = [
    heading(2, "八、执行时间表"),
    blank(),
    heading(3, "Week 1-2：基础准备"),
    bullet([t("完善 GitHub README 和文档")]),
    bullet([t("准备 Product Hunt 上线素材（截图、视频、描述）")]),
    bullet([t("创建 Twitter/X、Discord 账号并发布首条内容")]),
    bullet([t("配置 Google Analytics 和 Search Console")]),
    blank(),
    heading(3, "Week 3-4：首发推广"),
    bullet([t("Product Hunt Launch Day")]),
    bullet([t("Hacker News Show HN 帖子")]),
    bullet([t("Reddit / V2EX / 少数派发帖")]),
    bullet([t("联系 5-10 位科技博主进行评测")]),
    blank(),
    heading(3, "Month 2-3：内容与 SEO"),
    bullet([t("启动 SEO 优化（sitemap、meta tags、结构化数据）")]),
    bullet([t("每周发布 2 篇技术博客")]),
    bullet([t("举办首次 Wiki Marathon 活动")]),
    bullet([t("收集用户反馈并迭代产品")]),
    blank(),
    heading(3, "Month 4-6：社区与增长"),
    bullet([t("推出 Contributor 等级体系")]),
    bullet([t("开放 API 和嵌入功能")]),
    bullet([t("探索付费模式（GPTwiki Pro）")]),
    bullet([t("拓展国际市场推广")]),
    blank(),
    divider(),
]
all_blocks.append(("Section 8: Timeline", s8))

# === Section 9: Summary ===
s9 = [
    heading(2, "九、总结"),
    para([t("GPTwiki 定位于 \"AI 时代的百科全书\"，通过 AI 多模型驱动 + 社区协作 + 全球化的差异化策略，有机会在知识管理领域开辟全新赛道。推广核心策略是：")]),
    blank(),
    ordered([t("以开源和技术社区为起点", bold=True), t("，获取高质量种子用户")]),
    ordered([t("以 SEO 和内容营销为引擎", bold=True), t("，实现自然增长")]),
    ordered([t("以社区运营为护城河", bold=True), t("，建立用户粘性和网络效应")]),
    ordered([t("以付费功能为商业化路径", bold=True), t("，实现可持续发展")]),
    blank(),
    para([t("访问产品："), t("https://gptwiki.net", link="https://gptwiki.net")]),
    blank(),
    para([t("— GPTwiki 团队 | 2026 年 4 月", bold=True)]),
]
all_blocks.append(("Section 9: Summary", s9))

# === Write all sections ===
token = get_token()
print(f"Writing {len(all_blocks)} sections to doc {DOC_ID}")

for name, blocks in all_blocks:
    code = add_blocks(token, blocks)
    if code == 0:
        print(f"  {name}: OK ({len(blocks)} blocks)")
    else:
        print(f"  {name}: FAILED (code={code}), trying one by one...")
        for i, block in enumerate(blocks):
            c = add_blocks(token, [block])
            if c != 0:
                print(f"    Block {i} failed (code={c})")
            time.sleep(0.2)
    time.sleep(0.5)

print("\nDone!")
print(f"Document URL: https://xinsuixing.feishu.cn/docx/{DOC_ID}")
