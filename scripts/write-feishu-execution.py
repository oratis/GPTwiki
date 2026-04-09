#!/usr/bin/env python3
"""Write promotion execution log to Feishu document."""
import json, urllib.request, time

APP_ID = "cli_a94eb8811578dcd4"
APP_SECRET = "jWUn9OhMASaHXOSYkqgWKbpCdyNKueci"
DOC_ID = "Ol55dr3fCoNYcHxPCL9ck5MQnzb"  # Same doc as promotion plan

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
            return json.load(res).get("code", -1)
    except Exception as e:
        print(f"  ERR: {e}")
        return -1

def t(s, bold=False, link=None):
    style = {}
    if bold: style["bold"] = True
    if link: style["link"] = {"url": link}
    return {"text_run": {"content": s, "text_element_style": style}}

def h2(s): return {"block_type": 4, "heading2": {"elements": [t(s, bold=True)], "style": {}}}
def h3(s): return {"block_type": 5, "heading3": {"elements": [t(s, bold=True)], "style": {}}}
def h4(s): return {"block_type": 6, "heading4": {"elements": [t(s, bold=True)], "style": {}}}
def p(els): return {"block_type": 2, "text": {"elements": els, "style": {}}}
def bl(els): return {"block_type": 12, "bullet": {"elements": els, "style": {}}}
def ol_item(els): return {"block_type": 13, "ordered": {"elements": els, "style": {}}}
def div(): return {"block_type": 22, "divider": {}}
def blank(): return p([t("")])
def checkbox(text, checked=False):
    # Feishu doesn't have native checkbox in docx API, use emoji
    prefix = "[x] " if checked else "[ ] "
    return bl([t(prefix + text)])

token = get_token()
batches = []

# === Execution Log Section ===
batches.append([
    blank(),
    div(),
    blank(),
    h2("推广执行记录"),
    p([t("执行日期：2026年4月1日", bold=True)]),
    blank(),
])

# === Completed: SEO ===
batches.append([
    h3("[已完成] SEO 优化"),
    p([t("状态：已部署到生产环境", bold=True)]),
    blank(),
    bl([t("[x] robots.txt", bold=True), t(" — 已创建，允许搜索引擎爬取所有公开页面，屏蔽 /api/ 和 /login")]),
    bl([t("[x] sitemap.xml", bold=True), t(" — 动态生成，覆盖最近 5,000 篇 Wiki，自动更新")]),
    bl([t("[x] 结构化数据（Schema.org）", bold=True), t(" — 每篇 Wiki 页面自动注入 JSON-LD Article 结构化数据")]),
    bl([t("[x] Open Graph + Twitter Cards", bold=True), t(" — 全局 OG 标签 + 每篇 Wiki 动态 metadata")]),
    bl([t("[x] Meta Keywords", bold=True), t(" — 添加 AI wiki、collaborative wiki 等核心关键词")]),
    bl([t("[x] Google Analytics", bold=True), t(" — G-G6DSDW9X5D 已接入全站")]),
    blank(),
    p([t("验证链接：")]),
    bl([t("https://gptwiki.net/robots.txt", link="https://gptwiki.net/robots.txt")]),
    bl([t("https://gptwiki.net/sitemap.xml", link="https://gptwiki.net/sitemap.xml")]),
    blank(),
])

# === Completed: README ===
batches.append([
    h3("[已完成] GitHub 仓库优化"),
    p([t("状态：已更新", bold=True)]),
    blank(),
    bl([t("[x] 添加 MIT / Next.js / TypeScript / Google Cloud badges")]),
    bl([t("[x] 重写产品描述突出核心价值")]),
    bl([t("[x] 完善功能列表（100K+文章、15语言、BYOK等）")]),
    bl([t("[x] 详细技术栈表格")]),
    bl([t("[x] Quick Start 和部署指南")]),
    bl([t("[x] 项目结构说明")]),
    bl([t("[x] 贡献指南")]),
    blank(),
])

# === Completed: Daily Seeding ===
batches.append([
    h3("[已完成] 每日内容自动增长"),
    p([t("状态：已配置定时任务", bold=True)]),
    blank(),
    bl([t("[x] 每天凌晨 3:17 自动运行")]),
    bl([t("[x] 每日新增 5,000 篇文章（15语言 x 350篇）")]),
    bl([t("[x] 使用 Wikipedia MediaWiki API 随机抓取模式")]),
    bl([t("[x] 当前总量：100,620+ 篇")]),
    blank(),
])

# === Prepared Content: Product Hunt ===
batches.append([
    div(),
    h3("[推广文案] Product Hunt 提交"),
    p([t("状态：文案已准备，待发布", bold=True)]),
    blank(),
    p([t("Tagline: ", bold=True), t("The AI-powered encyclopedia where conversations become knowledge")]),
    blank(),
    p([t("Description:", bold=True)]),
    p([t("GPTwiki is a collaborative wiki platform powered by Claude, GPT-4o, and Gemini. Ask any question in 15 languages, get an AI-generated article, and publish it as a wiki that grows with community input.")]),
    blank(),
    p([t("Key features to highlight:")]),
    bl([t("100,000+ articles in 15 languages from day one")]),
    bl([t("Choose between Claude, GPT-4o, or Gemini for each conversation")]),
    bl([t("Bring Your Own API Key support")]),
    bl([t("Fully open source (MIT) and self-hostable")]),
    bl([t("Wikipedia-seeded content with AI-powered growth")]),
    blank(),
    p([t("Recommended launch day: ", bold=True), t("Tuesday (highest traffic on Product Hunt)")]),
    blank(),
])

# === Prepared Content: Hacker News ===
batches.append([
    h3("[推广文案] Hacker News Show HN"),
    p([t("状态：文案已准备，待发布", bold=True)]),
    blank(),
    p([t("Title: ", bold=True), t("Show HN: GPTwiki - Open-source AI wiki with Claude, GPT-4o, and Gemini (100K+ articles)")]),
    blank(),
    p([t("Post body:")]),
    p([t("Hi HN, I built GPTwiki (https://gptwiki.net), an AI-powered collaborative wiki. The idea: instead of conversations with AI disappearing, they become permanent, searchable wiki articles.")]),
    blank(),
    p([t("How it works: ask any question, choose your AI model (Claude/GPT-4o/Gemini), and the answer becomes a wiki article anyone can find and build upon.")]),
    blank(),
    p([t("Tech stack: Next.js 16, Firestore, Cloud Run. Supports 15 languages with auto-detection. Pre-seeded with 100K+ Wikipedia articles. Users can bring their own API keys.")]),
    blank(),
    p([t("Fully open source under MIT. Would love your feedback.")]),
    blank(),
])

# === Prepared Content: Reddit ===
batches.append([
    h3("[推广文案] Reddit r/artificial"),
    p([t("状态：文案已准备，待发布", bold=True)]),
    blank(),
    p([t("Title: ", bold=True), t("I built an AI-powered wiki that turns ChatGPT/Claude/Gemini conversations into a permanent encyclopedia")]),
    blank(),
    p([t("Body: GPTwiki (gptwiki.net) lets you ask any AI model a question, then publish the answer as a wiki article. 100K+ articles already available in 15 languages. Open source, bring your own API keys. What would you use it for?")]),
    blank(),
    p([t("Subreddits to post: ", bold=True), t("r/artificial, r/ChatGPT, r/SideProject, r/webdev, r/opensource")]),
    blank(),
])

# === Prepared Content: V2EX ===
batches.append([
    h3("[推广文案] V2EX 发帖"),
    p([t("状态：文案已准备，待发布", bold=True)]),
    blank(),
    p([t("标题：", bold=True), t("开源项目 GPTwiki - AI 驱动的协作式百科全书，支持 Claude/GPT-4o/Gemini")]),
    blank(),
    p([t("正文：做了一个开源的 AI 百科全书平台 gptwiki.net，通过和 AI 对话来创建百科文章。")]),
    p([t("特点：")]),
    bl([t("支持 Claude / GPT-4o / Gemini 三大模型自由切换")]),
    bl([t("15 种语言自动检测和切换")]),
    bl([t("已有 10 万+ 篇 Wikipedia 种子文章")]),
    bl([t("支持用户使用自己的 API Key")]),
    bl([t("完全开源，MIT 协议")]),
    bl([t("技术栈：Next.js 16 + TypeScript + Firestore + Cloud Run")]),
    p([t("欢迎体验和反馈！")]),
    blank(),
    p([t("发布节点：", bold=True), t("/t/share 或 /t/programmer")]),
    blank(),
])

# === Prepared Content: Twitter ===
batches.append([
    h3("[推广文案] Twitter/X 首条推文"),
    p([t("状态：文案已准备，需创建账号", bold=True)]),
    blank(),
    p([t("Tweet 1 (Launch):")]),
    p([t("Introducing GPTwiki - the AI-powered encyclopedia")]),
    p([t("Ask Claude, GPT-4o, or Gemini any question. The answer becomes a wiki article that grows.")]),
    p([t("100K+ articles | 15 languages | Open source")]),
    p([t("https://gptwiki.net")]),
    blank(),
    p([t("Tweet 2 (Tech):")]),
    p([t("Built with Next.js 16, Firestore, Cloud Run. Supports BYOK (Bring Your Own API Key). Fully open source under MIT.")]),
    blank(),
])

# === Prepared Content: 少数派 ===
batches.append([
    h3("[推广文案] 少数派文章"),
    p([t("状态：文案已准备，待发布", bold=True)]),
    blank(),
    p([t("标题：", bold=True), t("GPTwiki：用 AI 对话构建百科全书的开源平台")]),
    p([t("摘要：介绍一个将 AI 对话转化为永久百科知识的开源项目，支持 Claude、GPT-4o 和 Gemini 三大模型，15 种语言，已收录 10 万+ 篇文章。")]),
    blank(),
])

# === Action Items for @Oratis ===
batches.append([
    div(),
    h2("@Oratis 待办事项"),
    p([t("以下任务需要你手动执行：", bold=True)]),
    blank(),
    h3("优先级 P0（本周完成）"),
    bl([t("[ ] 将代码推送到 GitHub 公开仓库（git push）")]),
    bl([t("[ ] 注册 Google Search Console，添加 gptwiki.net 并提交 sitemap.xml")]),
    bl([t("[ ] 注册 Twitter/X 账号 @GPTwiki，发布首条推文（文案见上方）")]),
    bl([t("[ ] 在 Product Hunt 提交产品（选择周二上线，文案见上方）")]),
    blank(),
    h3("优先级 P1（两周内完成）"),
    bl([t("[ ] 发布 Hacker News Show HN 帖子（文案见上方）")]),
    bl([t("[ ] 在 Reddit r/artificial、r/ChatGPT、r/SideProject 发帖")]),
    bl([t("[ ] 在 V2EX /t/share 发帖（文案见上方）")]),
    bl([t("[ ] 在少数派发布文章（文案见上方）")]),
    blank(),
    h3("优先级 P2（一个月内完成）"),
    bl([t("[ ] 创建 Discord 服务器（设立 #general、#feature-request、#bug-report 频道）")]),
    bl([t("[ ] 提交到 AI 工具导航站：There's An AI For That、AI Tools Directory、Futurepedia")]),
    bl([t("[ ] 在 Twitter/X 定期发布 AI 知识卡片内容（每周 2-3 条）")]),
    bl([t("[ ] 联系 3-5 位科技博主/KOL 进行产品评测")]),
    blank(),
])

print(f"Writing {len(batches)} batches to doc {DOC_ID}")
for i, batch in enumerate(batches):
    code = add(token, batch)
    status = "OK" if code == 0 else f"FAIL({code})"
    print(f"  Batch {i+1}/{len(batches)}: {status}")
    time.sleep(0.5)

print(f"\nDone! URL: https://xinsuixing.feishu.cn/docx/{DOC_ID}")
