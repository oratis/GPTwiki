#!/usr/bin/env python3
"""Write GPTwiki promotion plan to Feishu document."""

import json
import urllib.request
import time

APP_ID = "cli_a94eb8811578dcd4"
APP_SECRET = "jWUn9OhMASaHXOSYkqgWKbpCdyNKueci"
DOC_TOKEN = "D8R8d1ckboxp9wxcK0uct2SznVf"

def get_token():
    data = json.dumps({"app_id": APP_ID, "app_secret": APP_SECRET}).encode()
    req = urllib.request.Request(
        "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal",
        data=data, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as res:
        return json.load(res)["tenant_access_token"]

def add_blocks(token, parent_id, blocks, index=-1):
    """Add child blocks to a parent block."""
    payload = {"children": blocks}
    if index >= 0:
        payload["index"] = index
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        f"https://open.feishu.cn/open-apis/docx/v1/documents/{DOC_TOKEN}/blocks/{parent_id}/children",
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    )
    with urllib.request.urlopen(req) as res:
        result = json.load(res)
        if result.get("code") != 0:
            print(f"Error: {result}")
        return result

def text_el(content, bold=False, link=None):
    """Create a text element."""
    el = {"text_run": {"content": content, "text_element_style": {}}}
    if bold:
        el["text_run"]["text_element_style"]["bold"] = True
    if link:
        el["text_run"]["text_element_style"]["link"] = {"url": link}
    return el

def heading(level, text):
    return {
        "block_type": 3,  # heading
        "heading": {
            "elements": [text_el(text, bold=True)],
            "style": {"level": level}  # 1-9
        }
    }

def paragraph(elements):
    return {
        "block_type": 2,  # text
        "text": {"elements": elements, "style": {}}
    }

def bullet(elements):
    return {
        "block_type": 12,  # bullet
        "bullet": {"elements": elements, "style": {}}
    }

def ordered_item(elements):
    return {
        "block_type": 13,  # ordered
        "ordered": {"elements": elements, "style": {}}
    }

def divider():
    return {"block_type": 22}  # divider

def code_block(text, lang="plain"):
    return {
        "block_type": 14,  # code
        "code": {
            "elements": [text_el(text)],
            "style": {"language": 1}  # plain text
        }
    }

# ===== Build the promotion plan =====
sections = []

# Title section
sections.append(heading(1, "GPTwiki.net 产品推广方案"))
sections.append(paragraph([text_el("AI 驱动的协作式百科全书平台 | 完整市场推广计划")]))
sections.append(paragraph([text_el("")]))

# 1. 产品概述
sections.append(heading(2, "一、产品概述"))
sections.append(paragraph([text_el("GPTwiki 是一个基于 AI 的新一代协作式百科全书平台，用户通过与 AI（Claude、GPT-4o、Gemini）对话创建和丰富知识内容。")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "核心优势"))
sections.append(bullet([text_el("AI 多模型支持", bold=True), text_el("：集成 Claude、GPT-4o、Gemini 2.0 Flash，用户可自由选择或使用自己的 API Key")]))
sections.append(bullet([text_el("对话式创建", bold=True), text_el("：通过自然对话创建高质量百科内容，降低内容生产门槛")]))
sections.append(bullet([text_el("全球化", bold=True), text_el("：支持15种语言自动检测和切换，内容覆盖全球主要语种")]))
sections.append(bullet([text_el("开源透明", bold=True), text_el("：MIT 协议开源，技术栈透明可信")]))
sections.append(bullet([text_el("社区驱动", bold=True), text_el("：用户排行榜、个人 Profile、内容贡献追踪")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "技术栈"))
sections.append(bullet([text_el("前端：Next.js 16 + TypeScript + Tailwind CSS")]))
sections.append(bullet([text_el("后端：Google Cloud Run + Firestore")]))
sections.append(bullet([text_el("AI：Anthropic Claude / OpenAI GPT-4o / Google Gemini")]))
sections.append(bullet([text_el("认证：NextAuth.js (Google + GitHub OAuth)")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "当前数据"))
sections.append(bullet([text_el("Wiki 文章数：80,000+（持续增长中）")]))
sections.append(bullet([text_el("支持语言：15种（英、中、日、韩、西、法、德、葡、俄、意、阿、印、土、越、泰）")]))
sections.append(bullet([text_el("内容来源：Wikipedia 种子内容 + 用户 AI 生成内容")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 2. 目标市场
sections.append(heading(2, "二、目标市场与用户画像"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "目标用户群体"))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "1. 知识工作者与研究人员"))
sections.append(bullet([text_el("痛点：传统百科信息碎片化，需跨多个来源整合信息")]))
sections.append(bullet([text_el("GPTwiki 价值：AI 即时生成结构化知识摘要，一站式获取")]))
sections.append(bullet([text_el("规模：全球约 5000 万知识工作者")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "2. 学生与教育工作者"))
sections.append(bullet([text_el("痛点：学习资料分散，需要可靠的多语言知识源")]))
sections.append(bullet([text_el("GPTwiki 价值：多语言 AI 解释，对话式深入学习")]))
sections.append(bullet([text_el("规模：全球超 15 亿学生群体")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "3. 开发者与技术爱好者"))
sections.append(bullet([text_el("痛点：技术文档查找效率低")]))
sections.append(bullet([text_el("GPTwiki 价值：开源、可自部署、支持自定义 API Key")]))
sections.append(bullet([text_el("规模：全球约 2800 万开发者")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "4. 多语言内容消费者"))
sections.append(bullet([text_el("痛点：非英语内容匮乏或质量不高")]))
sections.append(bullet([text_el("GPTwiki 价值：AI 原生多语言内容生成，质量一致")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 3. 推广策略
sections.append(heading(2, "三、推广策略"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "阶段一：冷启动期（第 1-2 个月）"))
sections.append(paragraph([text_el("目标：", bold=True), text_el("积累种子用户 1,000 人，建立产品口碑")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "1. 技术社区推广"))
sections.append(ordered_item([text_el("Hacker News", bold=True), text_el("：发布 Show HN 帖子，强调 AI+百科的创新模式和开源特性")]))
sections.append(ordered_item([text_el("Product Hunt", bold=True), text_el("：选择周二上线，准备精美截图和演示视频")]))
sections.append(ordered_item([text_el("Reddit", bold=True), text_el("：在 r/artificial、r/ChatGPT、r/SideProject 发帖")]))
sections.append(ordered_item([text_el("GitHub Trending", bold=True), text_el("：优化 README，添加 Star 引导，争取进入 Trending")]))
sections.append(ordered_item([text_el("V2EX / 少数派", bold=True), text_el("：针对中文开发者社区推广")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "2. 社交媒体矩阵"))
sections.append(ordered_item([text_el("Twitter/X", bold=True), text_el("：创建 @GPTwiki 账号，定期发布 AI 生成的趣味知识卡片")]))
sections.append(ordered_item([text_el("YouTube", bold=True), text_el("：录制 2-3 分钟产品演示视频和使用教程")]))
sections.append(ordered_item([text_el("微信公众号", bold=True), text_el("：面向中文用户发布产品介绍和使用指南")]))
sections.append(ordered_item([text_el("小红书/即刻", bold=True), text_el("：发布 AI 工具推荐类内容")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "3. 内容种子策略"))
sections.append(bullet([text_el("预填充 100,000+ 篇高质量 Wikipedia 文章作为基础内容")]))
sections.append(bullet([text_el("确保用户首次访问即有丰富内容可浏览")]))
sections.append(bullet([text_el("覆盖 15 种语言，吸引全球用户")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "阶段二：增长期（第 3-6 个月）"))
sections.append(paragraph([text_el("目标：", bold=True), text_el("月活用户达到 10,000，日均新增 Wiki 100+")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "1. SEO 策略"))
sections.append(bullet([text_el("结构化数据标记（Schema.org Article）")]))
sections.append(bullet([text_el("自动生成 sitemap.xml，提交到 Google Search Console")]))
sections.append(bullet([text_el("优化每篇 Wiki 的 meta title/description")]))
sections.append(bullet([text_el("构建内部链接网络，提升页面权重")]))
sections.append(bullet([text_el("目标：3 个月内被 Google 索引 50,000+ 页面")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "2. 内容营销"))
sections.append(bullet([text_el("每周发布 2 篇博客：AI 技术趋势、知识管理方法论")]))
sections.append(bullet([text_el("制作 \"AI vs 人类知识创造\" 对比研究报告")]))
sections.append(bullet([text_el("邀请 KOL/博主试用并撰写评测")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "3. 社区建设"))
sections.append(bullet([text_el("创建 Discord 社区，设立 #feature-request、#bug-report 频道")]))
sections.append(bullet([text_el("每月举办 \"Wiki Marathon\"：24 小时内创建最多高质量 Wiki 的用户获奖")]))
sections.append(bullet([text_el("建立 Contributor 等级体系：Bronze → Silver → Gold → Platinum")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "4. 合作伙伴"))
sections.append(bullet([text_el("联系大学和在线教育平台（Coursera、edX）探索合作")]))
sections.append(bullet([text_el("与 AI 工具导航站（There's An AI For That、AI Tools Directory）合作收录")]))
sections.append(bullet([text_el("接入 Chrome 扩展生态，提供一键查询功能")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "阶段三：规模化（第 7-12 个月）"))
sections.append(paragraph([text_el("目标：", bold=True), text_el("月活用户达到 100,000，成为 AI 百科领域标杆产品")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "1. 产品增长功能"))
sections.append(bullet([text_el("Wiki 嵌入功能：允许其他网站嵌入 GPTwiki 内容")]))
sections.append(bullet([text_el("API 开放：提供 RESTful API 让开发者集成")]))
sections.append(bullet([text_el("移动端 PWA：优化移动体验")]))
sections.append(bullet([text_el("浏览器插件：划词即查 GPTwiki")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "2. 国际化深耕"))
sections.append(bullet([text_el("针对日韩市场定制推广（Line、KakaoTalk 社群）")]))
sections.append(bullet([text_el("拉美市场：西班牙语/葡萄牙语社交媒体推广")]))
sections.append(bullet([text_el("东南亚市场：越南语/泰语内容本地化")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(4, "3. 付费转化"))
sections.append(bullet([text_el("GPTwiki Pro：无限 AI 对话、高级模型优先使用、无广告")]))
sections.append(bullet([text_el("团队版：企业内部知识库搭建")]))
sections.append(bullet([text_el("API 调用：按量计费的 API 访问")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 4. 渠道与预算
sections.append(heading(2, "四、推广渠道与预算"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "免费渠道（优先执行）"))

sections.append(bullet([text_el("GitHub 开源推广", bold=True), text_el("：Star、Fork、Issue 互动 —— 成本 $0")]))
sections.append(bullet([text_el("Hacker News / Product Hunt", bold=True), text_el("：首发推广 —— 成本 $0")]))
sections.append(bullet([text_el("技术博客 & SEO", bold=True), text_el("：长期内容沉淀 —— 成本 $0")]))
sections.append(bullet([text_el("社交媒体运营", bold=True), text_el("：Twitter/X、Reddit、V2EX —— 成本 $0")]))
sections.append(bullet([text_el("Discord/Telegram 社群", bold=True), text_el("：用户运营 —— 成本 $0")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "付费渠道（视预算启动）"))

sections.append(bullet([text_el("Google Ads", bold=True), text_el("：针对 \"AI wiki\"、\"AI encyclopedia\" 等关键词 —— 预算 $500-1000/月")]))
sections.append(bullet([text_el("Twitter/X Ads", bold=True), text_el("：推广 AI 知识卡片内容 —— 预算 $300-500/月")]))
sections.append(bullet([text_el("KOL 合作", bold=True), text_el("：邀请科技博主评测 —— 预算 $200-500/位")]))
sections.append(bullet([text_el("Product Hunt 推广服务", bold=True), text_el("：Launch Day 冲榜支持 —— 预算 $300-500")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "预算总览（前 6 个月）"))
sections.append(bullet([text_el("基础设施（Cloud Run + Firestore）：$50-200/月")]))
sections.append(bullet([text_el("AI API 成本：$100-500/月（视用量）")]))
sections.append(bullet([text_el("付费推广（可选）：$1000-2000/月")]))
sections.append(bullet([text_el("最低启动成本", bold=True), text_el("：约 $150/月（仅基础设施 + 免费推广）")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 5. KPI
sections.append(heading(2, "五、关键指标（KPI）"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "第 1 个月"))
sections.append(bullet([text_el("注册用户：500+")]))
sections.append(bullet([text_el("Wiki 总数：100,000+（含种子内容）")]))
sections.append(bullet([text_el("GitHub Star：200+")]))
sections.append(bullet([text_el("Product Hunt 排名：当日 Top 10")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "第 3 个月"))
sections.append(bullet([text_el("月活用户（MAU）：5,000+")]))
sections.append(bullet([text_el("用户创建 Wiki：3,000+")]))
sections.append(bullet([text_el("Google 索引页面：50,000+")]))
sections.append(bullet([text_el("日均访问：500+ UV")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "第 6 个月"))
sections.append(bullet([text_el("月活用户（MAU）：30,000+")]))
sections.append(bullet([text_el("用户创建 Wiki：20,000+")]))
sections.append(bullet([text_el("日均访问：3,000+ UV")]))
sections.append(bullet([text_el("社群成员：2,000+")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "第 12 个月"))
sections.append(bullet([text_el("月活用户（MAU）：100,000+")]))
sections.append(bullet([text_el("Wiki 总数：500,000+")]))
sections.append(bullet([text_el("付费转化率：2-5%")]))
sections.append(bullet([text_el("MRR：$5,000+")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 6. 竞品分析
sections.append(heading(2, "六、竞品分析"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "直接竞品"))
sections.append(paragraph([text_el("")]))

sections.append(bullet([text_el("Wikipedia", bold=True), text_el("：最大百科全书，但无 AI 辅助创作，编辑门槛高")]))
sections.append(bullet([text_el("Perplexity", bold=True), text_el("：AI 搜索引擎，但不沉淀知识，无社区协作")]))
sections.append(bullet([text_el("Notion AI", bold=True), text_el("：团队知识库，但非公开百科，定位不同")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "GPTwiki 差异化"))
sections.append(bullet([text_el("唯一结合 \"AI 生成 + 百科沉淀 + 社区协作\" 的产品")]))
sections.append(bullet([text_el("多模型自由切换（非锁定单一 AI 厂商）")]))
sections.append(bullet([text_el("完全开源，用户可自部署")]))
sections.append(bullet([text_el("原生多语言支持（15种语言）")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 7. 风险与应对
sections.append(heading(2, "七、风险与应对"))
sections.append(paragraph([text_el("")]))

sections.append(bullet([text_el("内容质量风险", bold=True), text_el("：AI 生成内容可能存在错误 → 引入社区审核机制和引用标注")]))
sections.append(bullet([text_el("AI 成本风险", bold=True), text_el("：API 调用成本随用户增长上升 → 支持用户自带 API Key，梯度定价")]))
sections.append(bullet([text_el("版权风险", bold=True), text_el("：种子内容来源合规 → Wikipedia 内容基于 CC BY-SA，标注来源")]))
sections.append(bullet([text_el("竞争风险", bold=True), text_el("：大厂可能推出类似产品 → 深耕社区和开源生态，建立网络效应")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 8. 执行时间表
sections.append(heading(2, "八、执行时间表"))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "Week 1-2：基础准备"))
sections.append(bullet([text_el("完善 GitHub README 和文档")]))
sections.append(bullet([text_el("准备 Product Hunt 上线素材（截图、视频、描述）")]))
sections.append(bullet([text_el("创建 Twitter/X、Discord 账号并发布首条内容")]))
sections.append(bullet([text_el("配置 Google Analytics 和 Search Console")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "Week 3-4：首发推广"))
sections.append(bullet([text_el("Product Hunt Launch Day")]))
sections.append(bullet([text_el("Hacker News Show HN 帖子")]))
sections.append(bullet([text_el("Reddit / V2EX / 少数派发帖")]))
sections.append(bullet([text_el("联系 5-10 位科技博主进行评测")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "Month 2-3：内容与 SEO"))
sections.append(bullet([text_el("启动 SEO 优化（sitemap、meta tags、结构化数据）")]))
sections.append(bullet([text_el("每周发布 2 篇技术博客")]))
sections.append(bullet([text_el("举办首次 Wiki Marathon 活动")]))
sections.append(bullet([text_el("收集用户反馈并迭代产品")]))
sections.append(paragraph([text_el("")]))

sections.append(heading(3, "Month 4-6：社区与增长"))
sections.append(bullet([text_el("推出 Contributor 等级体系")]))
sections.append(bullet([text_el("开放 API 和嵌入功能")]))
sections.append(bullet([text_el("探索付费模式（GPTwiki Pro）")]))
sections.append(bullet([text_el("拓展国际市场推广")]))
sections.append(paragraph([text_el("")]))
sections.append(divider())

# 结尾
sections.append(heading(2, "九、总结"))
sections.append(paragraph([text_el("GPTwiki 定位于 \"AI 时代的百科全书\"，通过 AI 多模型驱动 + 社区协作 + 全球化的差异化策略，有机会在知识管理领域开辟全新赛道。推广核心策略是：")]))
sections.append(paragraph([text_el("")]))
sections.append(ordered_item([text_el("以开源和技术社区为起点", bold=True), text_el("，获取高质量种子用户")]))
sections.append(ordered_item([text_el("以 SEO 和内容营销为引擎", bold=True), text_el("，实现自然增长")]))
sections.append(ordered_item([text_el("以社区运营为护城河", bold=True), text_el("，建立用户粘性和网络效应")]))
sections.append(ordered_item([text_el("以付费功能为商业化路径", bold=True), text_el("，实现可持续发展")]))
sections.append(paragraph([text_el("")]))
sections.append(paragraph([text_el("访问产品："), text_el("https://gptwiki.net", link="https://gptwiki.net")]))
sections.append(paragraph([text_el("GitHub 仓库："), text_el("https://github.com/[repo]", link="https://github.com")]))
sections.append(paragraph([text_el("")]))
sections.append(paragraph([text_el("— GPTwiki 团队 | 2026 年 4 月", bold=True)]))

# ===== Write to Feishu =====
token = get_token()
print(f"Total blocks to write: {len(sections)}")

# Feishu API限制每次最多50个blocks
batch_size = 50
for i in range(0, len(sections), batch_size):
    batch = sections[i:i+batch_size]
    print(f"Writing blocks {i+1}-{i+len(batch)}...")
    result = add_blocks(token, DOC_TOKEN, batch)
    code = result.get("code", -1)
    if code != 0:
        print(f"  Failed! code={code} msg={result.get('msg')}")
        # Try smaller batches
        for j, block in enumerate(batch):
            result2 = add_blocks(token, DOC_TOKEN, [block])
            if result2.get("code") != 0:
                print(f"  Block {i+j+1} failed: {result2.get('msg')}")
            time.sleep(0.1)
    else:
        print(f"  OK")
    time.sleep(0.3)

print("Done!")
