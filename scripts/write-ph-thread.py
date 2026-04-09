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
        r = json.load(res)
        return r.get("code", -1)

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
    # Batch 1: Header
    [
        blank(), div(),
        h2("Product Hunt Discussion Thread"),
        p([t("Title: Create Knowledge, not Data", bold=True)]),
        blank(),
        h3("Thread Body"),
        blank(),
        p([t("Every day, millions of people ask AI the same questions.")]),
        blank(),
        p([t('"What causes aurora borealis?"')]),
        p([t('"How does mRNA vaccine work?"')]),
        p([t('"What is the history of the Silk Road?"')]),
    ],
    # Batch 2: Problem statement
    [
        blank(),
        p([t("Each answer is brilliant. And each answer disappears the moment the chat window closes.")]),
        blank(),
        p([t("We are generating more knowledge than any civilization in history — and losing almost all of it.")]),
        blank(),
        p([t("Think about it: ChatGPT processes 1 billion+ queries per week. Claude, Gemini, Perplexity — billions more. The collective intelligence flowing through these conversations could fill libraries. Instead, it evaporates.")]),
        blank(),
        p([t("Wikipedia took 25 years to build 60 million articles with human editors. AI generates that volume of knowledge-grade content in days. But there is no place for it to land, accumulate, and grow.")]),
        blank(),
        p([t("This is the problem we are solving with "), t("GPTwiki", bold=True), t(".")]),
    ],
    # Batch 3: The idea
    [
        blank(),
        h3("The idea is simple"),
        blank(),
        p([t("Ask any question. Get an AI-powered answer. That answer becomes a permanent, searchable wiki article — not a disposable chat message.")]),
        blank(),
        p([t("But here is what makes it different:")]),
        blank(),
        bl([t("Multi-model freedom", bold=True), t(" — Choose Claude, GPT-4o, or Gemini. Bring your own API key. No vendor lock-in.")]),
        bl([t("Conversations that compound", bold=True), t(" — Anyone can ask follow-up questions. Each answer enriches the article or spawns a new one.")]),
        bl([t("15 languages, day one", bold=True), t(" — Not translated. Natively generated. A Japanese user and a Brazilian user both get first-class content.")]),
        bl([t("100% open source", bold=True), t(" — MIT license. Self-host it. Fork it. Make it yours.")]),
    ],
    # Batch 4: Why now
    [
        blank(),
        p([t("We have already seeded 100,000+ articles from Wikipedia across 15 languages to make sure the experience is rich from the first visit.")]),
        blank(),
        h3("Why now?"),
        blank(),
        p([t("The cost of generating high-quality knowledge just dropped to near zero. But the infrastructure to preserve and organize it has not caught up. Wikipedia is incredible but was designed for a pre-AI world — manual edits, lengthy review cycles, high contributor barriers.")]),
        blank(),
        p([t("We need a knowledge platform that is native to the AI era:")]),
        bl([t("Instant creation through conversation")]),
        bl([t("Community curation, not gatekeeping")]),
        bl([t("Multi-model, multi-language by default")]),
        bl([t("Open and self-hostable")]),
    ],
    # Batch 5: CTA
    [
        blank(),
        h3("What we are looking for"),
        blank(),
        p([t("We are launching on Product Hunt soon and would love your support:")]),
        blank(),
        bl([t("Makers", bold=True), t(" — What features would you want in an AI-native encyclopedia? We are building in public and shipping fast.")]),
        bl([t("Hunters", bold=True), t(" — If this resonates with you, we would be honored to have you hunt us on launch day.")]),
        bl([t("Everyone", bold=True), t(" — Try it at "), t("gptwiki.net", link="https://gptwiki.net"), t(", break things, and tell us what you think.")]),
        blank(),
        p([t("The source code is at "), t("github.com/oratis/GPTwiki", link="https://github.com/oratis/GPTwiki"), t(" — stars are appreciated but honest feedback is worth more.")]),
        blank(),
        p([t("Let us stop letting knowledge evaporate. Let us build the encyclopedia the AI era deserves.", bold=True)]),
        blank(),
        p([t("What do you think? Would you use something like this? What is missing?")]),
        blank(), div(),
    ],
]

for i, batch in enumerate(batches):
    code = add(token, batch)
    print(f"Batch {i+1}/{len(batches)}: {'OK' if code == 0 else f'FAIL({code})'}")
    time.sleep(0.5)

print("Done!")
