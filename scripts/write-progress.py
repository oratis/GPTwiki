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
def bl(els): return {"block_type": 12, "bullet": {"elements": els, "style": {}}}
def div(): return {"block_type": 22, "divider": {}}
def blank(): return p([t("")])

token = get_token()

batches = [
    [
        blank(), div(),
        h2("推广执行进度总览（截至 2026-04-03）"),
        blank(),
        h3("已完成 ✅"),
        bl([t("SEO 基础设施", bold=True), t("：robots.txt + sitemap.xml + OG Tags + Schema.org 结构化数据 + Google Analytics")]),
        bl([t("Twitter/X 首发推文", bold=True), t("：@Breakingnerd 已发布，链接 x.com/Breakingnerd/status/2039365186793218089")]),
        bl([t("GitHub 开源", bold=True), t("：MIT 协议，README 已优化")]),
        bl([t("飞书推广文档", bold=True), t("：所有文案（PH/HN/Reddit/V2EX/Twitter/少数派）+ First Comment + Discussion Thread 已准备")]),
        bl([t("内容填充", bold=True), t("：104,871 篇文章，15 种语言，持续增长中（目标 130K）")]),
        bl([t("PayPal 捐赠", bold=True), t("：Live 环境已上线")]),
        bl([t("Wiki 功能增强", bold=True), t("：Follow-up 追问后可选补充当前 Wiki 或新建 Wiki")]),
    ],
    [
        blank(),
        h3("进行中 🔄"),
        bl([t("内容抓取", bold=True), t("：104,871 → 130,000 目标，自动定时任务持续运行")]),
        bl([t("Sitemap 优化", bold=True), t("：修复 Firestore 查询超时问题，确保 2000+ wiki URL 被索引")]),
        blank(),
        h3("待执行（需 @Oratis 操作）"),
        blank(),
        p([t("P0 — 本周必须完成：", bold=True)]),
        bl([t("1. Google Search Console", bold=True), t("：验证网站所有权 → 提交 sitemap.xml → 等待索引")]),
        bl([t("   入口："), t("https://search.google.com/search-console", link="https://search.google.com/search-console")]),
        bl([t("2. Product Hunt 正式 Launch", bold=True), t("：选周二 PST 00:01 上线")]),
        bl([t("   Discussion Thread（Create Knowledge, not Data）已准备，First Comment 已准备")]),
        bl([t("3. Hacker News Show HN", bold=True), t("：发帖文案已准备在飞书文档中")]),
    ],
    [
        blank(),
        p([t("P1 — 两周内完成：", bold=True)]),
        bl([t("4. Reddit 发帖", bold=True), t("：r/artificial + r/ChatGPT + r/SideProject，文案已准备")]),
        bl([t("5. V2EX 发帖", bold=True), t("：文案已准备")]),
        bl([t("6. 少数派文章", bold=True), t("：文案已准备")]),
        bl([t("7. AI 导航站提交（20+ 站点）", bold=True), t("：完整提交入口列表已准备在飞书文档中")]),
        bl([t("   建议优先：There's An AI For That → Futurepedia → Toolify → Future Tools")]),
        blank(),
        p([t("P2 — 一个月内完成：", bold=True)]),
        bl([t("8. 创建 Discord 社区", bold=True)]),
        bl([t("9. 创建独立 @GPTwiki Twitter 账号", bold=True), t("（用于长期运营）")]),
        bl([t("10. 联系 KOL 评测", bold=True), t("：联系清单 + 话术模板已准备在飞书文档中")]),
        bl([t("11. Newsletter 投稿", bold=True), t("：Ben's Bites / The Neuron / TLDR，入口已准备")]),
        bl([t("12. BetaList / SaaS Hub / AlternativeTo 提交", bold=True), t("：入口已准备")]),
        blank(), div(),
    ],
]

for i, batch in enumerate(batches):
    code = add(token, batch)
    print(f"Batch {i+1}/{len(batches)}: {'OK' if code == 0 else f'FAIL({code})'}")
    time.sleep(0.5)

print("Done!")
