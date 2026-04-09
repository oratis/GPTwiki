#!/usr/bin/env python3
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
    with urllib.request.urlopen(req) as res:
        return json.load(res).get("code", -1)

def t(s, bold=False, link=None):
    style = {}
    if bold: style["bold"] = True
    if link: style["link"] = {"url": link}
    return {"text_run": {"content": s, "text_element_style": style}}

def p(els): return {"block_type": 2, "text": {"elements": els, "style": {}}}
def h2(s): return {"block_type": 4, "heading2": {"elements": [t(s, bold=True)], "style": {}}}
def h3(s): return {"block_type": 5, "heading3": {"elements": [t(s, bold=True)], "style": {}}}
def ol(els): return {"block_type": 13, "ordered": {"elements": els, "style": {}}}
def bl(els): return {"block_type": 12, "bullet": {"elements": els, "style": {}}}
def div(): return {"block_type": 22, "divider": {}}
def blank(): return p([t("")])

token = get_token()

batches = [
    # Header
    [
        blank(), div(),
        h2("@Oratis 一键操作清单 — 免费推广提交"),
        p([t("以下所有平台都需要注册账号才能提交。每个平台约 2 分钟。建议统一用 wangharp@gmail.com 注册。")]),
        p([t("统一信息（直接复制粘贴）：", bold=True)]),
        bl([t("产品名：GPTwiki")]),
        bl([t("网址：https://gptwiki.net")]),
        bl([t("GitHub：https://github.com/oratis/GPTwiki")]),
        bl([t("一句话描述：AI-powered collaborative wiki. Ask Claude, GPT-4o, or Gemini any question — the answer becomes a permanent wiki article. 100K+ articles, 15 languages, open source.")]),
        bl([t("分类标签：AI, Wiki, Knowledge Base, Open Source, Education, Productivity")]),
    ],
    # Platform 1-3
    [
        blank(),
        h3("1. BetaList（早期产品发现平台）"),
        ol([t("打开 "), t("https://betalist.com/sign_up", link="https://betalist.com/sign_up")]),
        ol([t("注册账号（用户名 gptwiki / 邮箱 wangharp@gmail.com）")]),
        ol([t("登录后点右上角 \"Submit Startup\"")]),
        ol([t("填写产品信息，提交")]),
        blank(),
        h3("2. AlternativeTo（替代品发现平台）"),
        ol([t("打开 "), t("https://alternativeto.net", link="https://alternativeto.net")]),
        ol([t("右上角 Sign In → 用 Google 登录")]),
        ol([t("点右上角头像菜单 → \"Submit New App\"")]),
        ol([t("作为 Wikipedia / Perplexity 的 Alternative 提交")]),
    ],
    # Platform 4-6
    [
        blank(),
        h3("3. Hacker News — Show HN"),
        ol([t("打开 "), t("https://news.ycombinator.com/submit", link="https://news.ycombinator.com/submit")]),
        ol([t("如无账号先注册："), t("https://news.ycombinator.com/login", link="https://news.ycombinator.com/login")]),
        ol([t("Title: Show HN: GPTwiki - Open-source AI wiki where questions become articles (100K+ articles)")]),
        ol([t("URL: https://gptwiki.net")]),
        ol([t("提交后立即在评论区发 First Comment（文案见上方 Product Hunt First Comment，可复用）")]),
        blank(),
        h3("4. Reddit"),
        ol([t("打开 "), t("https://www.reddit.com/r/artificial/submit", link="https://www.reddit.com/r/artificial/submit")]),
        ol([t("如无账号先注册或用 Google 登录")]),
        ol([t("选 \"Link\" 类型")]),
        ol([t("Title: I built GPTwiki - an open-source AI wiki where every question becomes an article (Claude/GPT-4o/Gemini, 100K+ articles, 15 languages)")]),
        ol([t("URL: https://gptwiki.net")]),
        ol([t("也可发到 r/ChatGPT 和 r/SideProject")]),
    ],
    # Platform 7-9
    [
        blank(),
        h3("5. V2EX"),
        ol([t("打开 "), t("https://v2ex.com/new", link="https://v2ex.com/new")]),
        ol([t("节点选 \"分享创造\"")]),
        ol([t("标题：GPTwiki - 开源 AI 百科全书，对话即创建知识（Claude/GPT-4o/Gemini）")]),
        ol([t("内容使用飞书文档中已准备的 V2EX 文案")]),
        blank(),
        h3("6. 少数派"),
        ol([t("打开 "), t("https://sspai.com/post/create", link="https://sspai.com/post/create")]),
        ol([t("发布文章，使用飞书文档中已准备的少数派文案")]),
        blank(),
        h3("7. Google Search Console"),
        ol([t("打开 "), t("https://search.google.com/search-console", link="https://search.google.com/search-console")]),
        ol([t("添加资源 → URL 前缀 → 输入 https://gptwiki.net")]),
        ol([t("验证方式选 HTML 标记或 DNS")]),
        ol([t("验证后 → 左侧 Sitemap → 提交 https://gptwiki.net/sitemap.xml")]),
    ],
    # Free directory sites + Newsletter
    [
        blank(),
        h3("8. 免费 AI 导航站（不需要账号或仅需邮箱）"),
        bl([t("Submit AI Tools: "), t("https://submitaitools.org/submit-your-ai-tool/", link="https://submitaitools.org/submit-your-ai-tool/")]),
        bl([t("Dofollow.Tools: "), t("https://dofollow.tools/submit/", link="https://dofollow.tools/submit/")]),
        bl([t("OpenHunts: "), t("https://openhunts.com/submit", link="https://openhunts.com/submit")]),
        bl([t("SaaS Hub: "), t("https://www.saashub.com/submit", link="https://www.saashub.com/submit")]),
        blank(),
        h3("9. Newsletter 投稿"),
        bl([t("Ben's Bites: "), t("https://news.bensbites.com/submit", link="https://news.bensbites.com/submit"), t(" （填表即可）")]),
        blank(),
        h3("10. Discord 社区"),
        ol([t("打开 "), t("https://discord.com/channels/@me", link="https://discord.com/channels/@me")]),
        ol([t("左侧 + 号 → \"创建服务器\" → \"为社区创建\"")]),
        ol([t("名称：GPTwiki Community")]),
        ol([t("创建频道：#general #feature-requests #bug-reports #showcase")]),
        blank(),
        p([t("完成以上步骤后告诉我，我会在飞书文档中更新状态。", bold=True)]),
        blank(), div(),
    ],
]

for i, batch in enumerate(batches):
    code = add(token, batch)
    print(f"Batch {i+1}/{len(batches)}: {'OK' if code == 0 else f'FAIL({code})'}")
    time.sleep(0.5)

print("Done!")
