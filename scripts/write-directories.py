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
        h2("AI 工具导航站提交清单"),
        p([t("以下是所有主流 AI 工具导航站的提交入口。建议按优先级从上到下逐一提交。", bold=False)]),
        blank(),
        h3("Tier 1: 顶级流量导航站（优先提交）"),
        blank(),
    ],
    # Tier 1
    [
        ol([t("There's An AI For That", bold=True)]),
        bl([t("提交入口："), t("https://theresanaiforthat.com/submit/", link="https://theresanaiforthat.com/submit/")]),
        bl([t("月访问量：500万+ | 免费提交 | AI 工具搜索量最大的导航站")]),
        blank(),
        ol([t("Futurepedia", bold=True)]),
        bl([t("提交入口："), t("https://www.futurepedia.io/submit-tool", link="https://www.futurepedia.io/submit-tool")]),
        bl([t("月访问量：300万+ | 免费提交 | 提交后可获 Verified 认证标志")]),
        blank(),
        ol([t("Toolify.ai", bold=True)]),
        bl([t("提交入口："), t("https://www.toolify.ai/submit", link="https://www.toolify.ai/submit")]),
        bl([t("月访问量：200万+ | 免费提交 | 7500+ 工具收录，220+ 分类")]),
        blank(),
        ol([t("Future Tools", bold=True)]),
        bl([t("提交入口："), t("https://futuretools.io/submit-a-tool", link="https://futuretools.io/submit-a-tool")]),
        bl([t("月访问量：150万+ | 免费提交 | AI 工具数据库")]),
    ],
    # Tier 2
    [
        blank(),
        h3("Tier 2: 主流导航站（建议提交）"),
        blank(),
        ol([t("AI Tools Directory", bold=True)]),
        bl([t("提交入口："), t("https://aitoolsdirectory.com/submit-tool", link="https://aitoolsdirectory.com/submit-tool")]),
        bl([t("免费提交 | 审核后收录")]),
        blank(),
        ol([t("AITopTools", bold=True)]),
        bl([t("提交入口："), t("https://aitoptools.com/submit-tool", link="https://aitoptools.com/submit-tool")]),
        bl([t("10,000+ 工具收录 | 免费提交")]),
        blank(),
        ol([t("OpenTools.ai", bold=True)]),
        bl([t("提交入口："), t("https://opentools.ai/submit", link="https://opentools.ai/submit")]),
        bl([t("免费提交 | 热门 AI 工具列表")]),
        blank(),
        ol([t("AIxploria", bold=True)]),
        bl([t("提交入口："), t("https://www.aixploria.com/en/add-tool/", link="https://www.aixploria.com/en/add-tool/")]),
        bl([t("免费提交 | 分类清晰")]),
        blank(),
        ol([t("PoweredByAI", bold=True)]),
        bl([t("提交入口："), t("https://poweredbyai.app/submit", link="https://poweredbyai.app/submit")]),
        bl([t("年访问量 10万+ | 免费提交")]),
        blank(),
        ol([t("The AI Surf", bold=True)]),
        bl([t("提交入口："), t("https://theaisurf.com/submit-tool/", link="https://theaisurf.com/submit-tool/")]),
        bl([t("免费提交 | AI 工具精选目录")]),
    ],
    # Tier 3
    [
        blank(),
        h3("Tier 3: 新兴/垂直导航站（有时间可提交）"),
        blank(),
        ol([t("AI Tools Directory (.com)", bold=True)]),
        bl([t("提交入口："), t("https://www.aitools-directory.com/submit", link="https://www.aitools-directory.com/submit")]),
        blank(),
        ol([t("AIToolboard", bold=True)]),
        bl([t("提交入口："), t("https://aitoolboard.com/submit-tool", link="https://aitoolboard.com/submit-tool")]),
        blank(),
        ol([t("Submit AI Tools", bold=True)]),
        bl([t("提交入口："), t("https://submitaitools.org/submit-your-ai-tool/", link="https://submitaitools.org/submit-your-ai-tool/")]),
        blank(),
        ol([t("Dofollow.Tools", bold=True)]),
        bl([t("提交入口："), t("https://dofollow.tools/submit/", link="https://dofollow.tools/submit/")]),
        bl([t("获得 dofollow 反向链接，有利于 SEO")]),
        blank(),
        ol([t("NextGen Tools", bold=True)]),
        bl([t("提交入口："), t("https://www.nxgntools.com/submit", link="https://www.nxgntools.com/submit")]),
        blank(),
        ol([t("OpenHunts", bold=True)]),
        bl([t("提交入口："), t("https://openhunts.com/submit", link="https://openhunts.com/submit")]),
        blank(),
        ol([t("THANK JOHN", bold=True)]),
        bl([t("提交入口："), t("https://www.thankjohn.com/submit", link="https://www.thankjohn.com/submit")]),
        bl([t("免费提交")]),
    ],
    # Non-AI but useful + tips
    [
        blank(),
        h3("Tier 4: 综合产品目录（非 AI 专属，但有价值）"),
        blank(),
        ol([t("Product Hunt", bold=True), t(" — 已设置 ✅")]),
        ol([t("Hacker News (Show HN)", bold=True), t(" — 文案已准备")]),
        ol([t("BetaList", bold=True)]),
        bl([t("提交入口："), t("https://betalist.com/submit", link="https://betalist.com/submit")]),
        bl([t("早期产品发现平台")]),
        blank(),
        ol([t("SaaS Hub", bold=True)]),
        bl([t("提交入口："), t("https://www.saashub.com/submit", link="https://www.saashub.com/submit")]),
        blank(),
        ol([t("AlternativeTo", bold=True)]),
        bl([t("提交入口："), t("https://alternativeto.net/manage/add-application/", link="https://alternativeto.net/manage/add-application/")]),
        bl([t("作为 Wikipedia 的替代品提交")]),
        blank(),
        h3("提交建议"),
        bl([t("统一描述", bold=True), t("：GPTwiki - AI-powered collaborative wiki. Ask Claude, GPT-4o, or Gemini any question. The answer becomes a permanent wiki article. 100K+ articles, 15 languages, open source.")]),
        bl([t("分类标签", bold=True), t("：AI, Wiki, Knowledge Base, Open Source, Education, Productivity")]),
        bl([t("截图", bold=True), t("：准备 3-4 张产品截图（首页、Wiki 详情、聊天、浏览页面）")]),
        bl([t("链接", bold=True), t("：gptwiki.net + github.com/oratis/GPTwiki")]),
        blank(), div(),
    ],
]

for i, batch in enumerate(batches):
    code = add(token, batch)
    print(f"Batch {i+1}/{len(batches)}: {'OK' if code == 0 else f'FAIL({code})'}")
    time.sleep(0.5)

print("Done!")
