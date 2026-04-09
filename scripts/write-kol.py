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
    # Header
    [
        blank(), div(),
        h2("KOL / 科技博主评测联系清单"),
        p([t("以下是专注 AI 工具评测的 KOL 和科技博主，按影响力分层。建议优先联系 Tier 1-2。")]),
        blank(),
        h3("Tier 1: 英文 AI 工具头部 KOL"),
        blank(),
    ],
    # Tier 1 English
    [
        p([t("1. Matt Wolfe（Future Tools）", bold=True)]),
        bl([t("YouTube: 900K+ 订阅 | 专注 AI 工具评测和新闻")]),
        bl([t("Twitter: "), t("@mreflow", link="https://x.com/mreflow")]),
        bl([t("商务合作表单: "), t("https://tally.so/r/nrBVlp", link="https://tally.so/r/nrBVlp")]),
        bl([t("官网: "), t("mattwolfe.com", link="https://mattwolfe.com")]),
        bl([t("也可通过 FutureTools.io 提交工具，获得评测机会")]),
        blank(),
        p([t("2. MattVidPro AI", bold=True)]),
        bl([t("YouTube: 400K+ 订阅 | AI 工具深度评测")]),
        bl([t("Twitter: "), t("@MattVidPro", link="https://x.com/MattVidPro")]),
        bl([t("联系: YouTube 频道关于页面的商务邮箱")]),
        blank(),
        p([t("3. All About AI", bold=True)]),
        bl([t("YouTube: 300K+ 订阅 | AI 教程和工具评测")]),
        bl([t("Twitter: "), t("@AllAboutAI", link="https://x.com/AllAboutAI")]),
        bl([t("联系: YouTube 频道关于页面的商务邮箱")]),
    ],
    # More English + Dev-focused
    [
        blank(),
        p([t("4. Fireship", bold=True)]),
        bl([t("YouTube: 3M+ 订阅 | 开发者向，100 Seconds 系列")]),
        bl([t("Twitter: "), t("@firaborrego", link="https://x.com/fireship_dev")]),
        bl([t("联系: fireship.io 官网")]),
        bl([t("适合推广 GPTwiki 的开源和技术特性")]),
        blank(),
        p([t("5. Wes Roth", bold=True)]),
        bl([t("YouTube: 300K+ 订阅 | AI 新闻和工具评测")]),
        bl([t("Twitter: "), t("@WesRothMoney", link="https://x.com/WesRothMoney")]),
        bl([t("联系: YouTube 商务邮箱")]),
        blank(),
        p([t("6. WorldofAI", bold=True)]),
        bl([t("YouTube: 350K+ 订阅 | AI 工具教程和评测")]),
        bl([t("联系: YouTube 频道关于页面")]),
        blank(),
        h3("Tier 2: 中文科技 KOL"),
        blank(),
    ],
    # Chinese KOL
    [
        p([t("7. 阑夕", bold=True)]),
        bl([t("微博/公众号: 100万+ 粉丝 | 科技评论人")]),
        bl([t("Twitter: "), t("@foxshuo", link="https://x.com/foxshuo")]),
        bl([t("联系: 微博私信或公众号后台")]),
        blank(),
        p([t("8. 差评", bold=True)]),
        bl([t("公众号/B站: 500万+ 粉丝 | 科技媒体")]),
        bl([t("联系: 公众号后台商务合作")]),
        blank(),
        p([t("9. 量子位（QbitAI）", bold=True)]),
        bl([t("公众号/知乎: 100万+ 粉丝 | AI 行业媒体")]),
        bl([t("Twitter: "), t("@QbitAI", link="https://x.com/QbitAI")]),
        bl([t("联系: "), t("qbitai.com", link="https://www.qbitai.com"), t(" 官网投稿")]),
        blank(),
        p([t("10. 小众软件 / AppSo", bold=True)]),
        bl([t("公众号: 200万+ 粉丝 | 效率工具推荐")]),
        bl([t("联系: 公众号后台投稿")]),
        bl([t("适合推广 GPTwiki 的多语言和开源特性")]),
    ],
    # Indie/Newsletter + approach tips
    [
        blank(),
        h3("Tier 3: 独立博主 / Newsletter 作者"),
        blank(),
        p([t("11. Ben's Bites", bold=True)]),
        bl([t("Newsletter: 100K+ 订阅 | AI 行业日报")]),
        bl([t("提交入口: "), t("https://news.bensbites.com/submit", link="https://news.bensbites.com/submit")]),
        blank(),
        p([t("12. The Neuron", bold=True)]),
        bl([t("Newsletter: 500K+ 订阅 | AI 新闻简报")]),
        bl([t("联系: "), t("https://www.theneurondaily.com/", link="https://www.theneurondaily.com/")]),
        blank(),
        p([t("13. TLDR Newsletter", bold=True)]),
        bl([t("Newsletter: 1.2M+ 订阅 | 科技日报")]),
        bl([t("广告/推荐: "), t("https://tldr.tech/advertise", link="https://tldr.tech/advertise")]),
        blank(),
        p([t("14. Hacker Newsletter", bold=True)]),
        bl([t("Newsletter: 60K+ 订阅 | HN 精选")]),
        bl([t("联系: "), t("https://hackernewsletter.com/", link="https://hackernewsletter.com/")]),
        blank(),
        h3("联系话术模板"),
        p([t("Subject: GPTwiki — Open-source AI-powered wiki (100K+ articles, 15 languages)", bold=True)]),
        blank(),
        p([t("Hi [Name],")]),
        blank(),
        p([t("I built GPTwiki, an open-source AI encyclopedia where questions become permanent wiki articles. Users can choose between Claude, GPT-4o, or Gemini, and every answer grows into a searchable knowledge base.")]),
        blank(),
        p([t("Key stats: 100K+ articles, 15 languages, MIT licensed, deployed on Google Cloud.")]),
        blank(),
        p([t("Would you be interested in checking it out? Happy to give you a walkthrough or provide any info you need.")]),
        blank(),
        p([t("gptwiki.net | github.com/oratis/GPTwiki")]),
        blank(),
        p([t("Best, [Your Name]")]),
        blank(), div(),
    ],
]

for i, batch in enumerate(batches):
    code = add(token, batch)
    print(f"Batch {i+1}/{len(batches)}: {'OK' if code == 0 else f'FAIL({code})'}")
    time.sleep(0.5)

print("Done!")
