import type { DraftArticle } from './types';
import { EDITORIAL_STYLE } from './editorial-style';

// Batch: AI in Practice (English originals). Quality-tier editorial articles
// answering real decision/how-to questions that Wikipedia-style reference
// content can't. Seeded via scripts/seed-editorial.ts (NOT the legacy
// full-title-scan seeders) under the `gptwiki-editorial` identity with
// Seedream-generated hero images (one per topicKey, shared with the zh
// variants in ai-in-practice.zh.ts).

/** Shared visual style so all editorial batches read as one series. */
const STYLE = EDITORIAL_STYLE;

export const aiInPracticeEn: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG vs Fine-Tuning: Which Should You Choose?',
    question: 'Should I use RAG or fine-tuning to adapt an LLM to my data?',
    summary:
      'RAG injects fresh, verifiable knowledge at query time, while fine-tuning changes how a model behaves. Most teams should start with RAG and add fine-tuning only for style, format, or latency goals.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'machine learning'],
    language: 'en',
    image: {
      prompt:
        'Two contrasting pathways flowing into a glowing neural sphere: the left path streams luminous documents through a funnel of glass panels (retrieval), the right path reshapes the sphere internal lattice with threads of light (fine-tuning). ' +
        STYLE,
      alt: 'Retrieval pipeline and fine-tuned model lattice feeding one neural core',
    },
    sources: [
      { title: 'Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., "LoRA: Low-Rank Adaptation of Large Language Models" (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., "Retrieval-Augmented Generation for Large Language Models: A Survey" (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG vs Fine-Tuning: Which Should You Choose?

Short answer: if your problem is **what the model knows**, use retrieval-augmented generation (RAG); if your problem is **how the model behaves**, use fine-tuning. The two are not rivals — mature systems often use both — but as a first investment, RAG is cheaper to build, easier to update, and easier to audit.

## What each technique actually does

**RAG** keeps the model frozen and changes its *input*. At query time, a retriever searches your documents (usually via embeddings in a vector index), and the most relevant passages are pasted into the prompt so the model answers from them. Knowledge lives in a database you can edit at any moment.

**Fine-tuning** changes the model's *weights*. You train on example input–output pairs so the model internalizes a tone, a format, a policy, or domain phrasing. With parameter-efficient methods like LoRA, this no longer requires huge hardware — but the result is baked in until you retrain.

## Decision table

| Your situation | Better fit | Why |
| --- | --- | --- |
| Facts change weekly (prices, policies, docs) | RAG | Update the index, not the model |
| Answers must cite sources | RAG | Retrieved passages double as citations |
| Private corpus too large to memorize | RAG | Retrieval scales with storage, not parameters |
| Output must follow a strict house style or schema | Fine-tuning | Style is behavior, not knowledge |
| You need a small, fast, cheap specialist model | Fine-tuning | Distill the task into fewer parameters |
| Prompts have grown huge with instructions and examples | Fine-tuning | Move recurring instructions into weights |
| Model misunderstands domain jargon | Both | Retrieval supplies context; tuning fixes interpretation |

## When RAG is the right first move

- **Freshness**: your knowledge changes faster than you would ever retrain.
- **Traceability**: regulated and customer-facing answers need "according to document X" grounding, which also measurably reduces hallucination.
- **Iteration speed**: a working prototype is a few days of engineering; no GPUs, no training data labeling.
- **Per-tenant isolation**: each customer's data stays in its own index instead of leaking into shared weights.

The cost is an extra moving part: chunking, embeddings, index quality, and retrieval evaluation become part of your product. Bad retrieval, not the model, is the most common failure point of RAG systems.

## When fine-tuning earns its keep

- **Format compliance**: always-valid JSON, a fixed report skeleton, your support team's tone.
- **Latency and token cost**: a tuned model can drop few-shot examples and long instructions from every call.
- **Capability transfer to small models**: fine-tuning a compact open-weight model on a narrow task can match a much larger general model at a fraction of the serving cost.
- **Implicit skills**: classification, extraction, and routing tasks with thousands of labeled examples often beat prompting.

The cost is operational: curating training data, re-running evaluations on every base-model upgrade, and accepting that fixing one bad behavior means another training cycle.

## Using both

A common production pattern: fine-tune a model so it *follows your format and refusal policy reliably*, and use RAG to *feed it current facts*. The tuning makes behavior predictable; the retrieval keeps content true and current.

## FAQ

**Does fine-tuning teach the model new facts?**
Poorly. Weight updates can memorize some facts, but recall is unreliable and updates require retraining. Retrieval is the dependable way to add knowledge.

**Is RAG always cheaper?**
To build, almost always. At very high query volume, long retrieved contexts inflate per-call token costs, and a tuned short-prompt model can become cheaper. Measure at your traffic level.

**Can I skip both and just use a long context window?**
For small, stable corpora — yes, stuffing documents into the prompt (possibly with prompt caching) is the simplest option. Past a few hundred pages or with frequent updates, retrieval wins on cost and answer quality.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'A Practical Guide to Prompt Engineering',
    question: 'How do I write effective prompts for large language models?',
    summary:
      'Most prompt quality comes from five levers: clear instructions, context, examples, explicit output format, and room to reason. This guide covers the techniques that survive contact with real work.',
    tags: ['ai', 'llm', 'prompt engineering', 'productivity'],
    language: 'en',
    image: {
      prompt:
        'A luminous control panel of floating glass sliders, dials and prisms shaping a wide beam of light into a precise structured pattern of geometric shapes on the other side. ' +
        STYLE,
      alt: 'Glass control panel shaping a beam of light into structured output',
    },
    sources: [
      { title: 'Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., "Self-Consistency Improves Chain of Thought Reasoning" (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# A Practical Guide to Prompt Engineering

A prompt is a specification, not a magic spell. Models do badly with vague requests for the same reason contractors do: the requirements were never stated. Five levers account for most of the quality you can get — instructions, context, examples, output format, and room to reason.

## The five levers

**1. State the task like a work order.** Include the goal, the audience, constraints, and what "done" looks like. "Summarize this contract's termination clauses for a non-lawyer, under 150 words, flag anything unusual" beats "summarize this."

**2. Provide the context the model cannot guess.** Paste the relevant document, the schema, the error log, the style guide. Separate it from instructions with clear delimiters (XML-style tags or fenced blocks) so data is never confused with directions.

**3. Show, don't only tell (few-shot).** Two or three input → output examples define a task more precisely than paragraphs of description, and they pin down edge cases: include one tricky example, not just easy ones.

**4. Fix the output format.** Ask for a specific structure — a JSON object with named fields, a markdown table, "exactly three bullet points." Structured output is easier to validate, parse, and diff. If your platform supports schema-enforced output, use it.

**5. Give reasoning room.** For analysis, math, or multi-step decisions, ask the model to work through the problem before answering (chain-of-thought). Research and practice agree this materially improves accuracy on reasoning tasks; for high-stakes answers, sample several reasoning paths and take the majority (self-consistency).

## Technique → when to reach for it

| Technique | Use when |
| --- | --- |
| Role/persona ("You are a senior SRE") | Vocabulary and judgment should match a profession |
| Delimiters around inputs | Any pasted data, always |
| Few-shot examples | Format or judgment is hard to describe abstractly |
| Chain-of-thought | Math, logic, multi-constraint decisions |
| Decomposition (multiple calls) | Tasks with distinct phases — extract, then judge, then write |
| Self-consistency (vote over samples) | High-stakes single answers worth extra cost |
| "Say 'unknown' if unsure" | Factual queries where a wrong answer is worse than none |

## Common failure patterns

- **The kitchen-sink prompt**: twenty rules, half contradictory. Models follow the last and loudest; trim ruthlessly.
- **Hidden questions**: asking two things in one sentence and getting an answer to one.
- **Implicit context**: referring to "the file" or "our usual format" the model has never seen.
- **Overfitted examples**: three near-identical few-shot samples teach the surface pattern, not the rule.
- **No iteration loop**: prompts are code. Keep a small test set of real inputs, run it after every edit, and version your prompts.

## Treat prompts as engineering artifacts

Once a prompt matters in production: version-control it, attach a regression test set of representative inputs with expected properties, and re-run on every model upgrade. Model-version changes silently shift behavior; your tests catch it before your users do.

## FAQ

**Do magic phrases like "take a deep breath" really help?**
Occasionally, marginally, and unreliably across models. Structure, context, and examples dwarf incantations.

**Long prompts cost more — is the spend worth it?**
Usually yes for quality-critical tasks, but cut dead weight: redundant rules and stale examples add cost without accuracy. Prompt caching makes long static prefixes cheap on most platforms.

**How is prompting different for reasoning-focused models?**
Models that reason internally before answering need less hand-holding on *how* to think — keep instructions about the goal and constraints, and drop step-by-step micromanagement unless output quality says otherwise.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'What Is an AI Agent — and When Do You Actually Need One?',
    question: 'What is an AI agent, and when does my use case actually need one?',
    summary:
      'An AI agent is an LLM running in a loop with tools and a goal, deciding its own next step. Powerful for open-ended tasks, overkill for anything a fixed workflow can do — this article explains the difference.',
    tags: ['ai', 'llm', 'agents', 'automation', 'software architecture'],
    language: 'en',
    image: {
      prompt:
        'A small glowing neural orb at the center of an isometric scene, orbited by translucent glass tools — a magnifying lens, a gear, a document, a terminal window — connected by threads of light to a branching path of stepping-stone platforms ahead. ' +
        STYLE,
      alt: 'A neural core with orbiting tools choosing its path across branching platforms',
    },
    sources: [
      { title: 'Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models" (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, "Building Effective Agents"', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., "Toolformer: Language Models Can Teach Themselves to Use Tools" (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# What Is an AI Agent — and When Do You Actually Need One?

An AI agent is a language model running in a loop: it has a goal, a set of tools, and the freedom to decide its own next action based on what the last action returned. That last clause is the defining one. A script that calls an LLM three times in a fixed order is a **workflow**; a system where the model itself chooses what to do next is an **agent**.

## The anatomy of an agent

Every practical agent is four pieces:

- **A model** capable of multi-step reasoning and reliable tool calling.
- **Tools** — functions the model may invoke: search, code execution, file edits, API calls, database queries.
- **Context/memory** — the running transcript of actions and observations (plus, sometimes, external notes that survive the session).
- **The loop** — model acts → environment responds → result is appended → model acts again, until it declares the goal met or hits a stop condition.

The pattern of interleaving reasoning with tool use was popularized in research as ReAct, and is now the backbone of coding assistants, research agents, and computer-use systems.

## Agent vs workflow vs single call

| Approach | Control flow decided by | Best for | Failure mode |
| --- | --- | --- | --- |
| Single LLM call | You | Classification, drafting, extraction | Limited scope |
| Workflow (chained calls) | You | Known, repeatable multi-step processes | Rigid when inputs vary |
| Agent (loop + tools) | The model | Open-ended tasks where the path is unknown upfront | Cost and error compounding |

## When an agent is genuinely the right call

- **The path is unknowable in advance.** Debugging a failing build, researching a vague question, operating a browser — each next step depends on what the previous one revealed.
- **The environment gives feedback.** Compilers, test suites, and search results let the agent check its own work and self-correct. Agents thrive exactly where verification is cheap.
- **The task tolerates variable cost and latency.** An agent might take five steps or fifty.

## When it's overkill

If a human can write down the steps, write them down — a fixed workflow is cheaper, faster, debuggable, and predictable. Form filling, document pipelines, scheduled reports, and standard ETL almost never need an agent. The honest engineering rule from practitioners is: **use the simplest pattern that works, and add autonomy only when the task demands it.**

## What goes wrong

- **Error compounding**: a 95%-reliable step has roughly a 60% chance of surviving ten steps untouched. Long loops need checkpoints, verification steps, or human review gates.
- **Runaway cost**: every loop iteration re-reads a growing transcript. Set budgets and step caps.
- **Ambiguous goals**: an agent told "improve the codebase" will do *something*; whether you wanted it is another matter. Define done.
- **Security surface**: tools that can write files, spend money, or send messages need permission boundaries and audit logs.

## FAQ

**Are "multi-agent systems" better than one good agent?**
Sometimes — parallel research with a synthesizer is a proven pattern. But coordination adds its own failure modes; multi-agent is an optimization, not a starting point.

**Do agents need special models?**
They need strong tool-calling reliability and long-horizon coherence. Frontier general models are currently the safest choice; small models work for narrow, well-instrumented loops.

**How do I evaluate an agent?**
On outcomes, not steps: define a set of representative tasks with checkable end states, run repeatedly (agents are nondeterministic), and track success rate, cost, and steps-to-completion.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'What Hardware Do You Need to Run an LLM Locally?',
    question: 'What hardware do I need to run a large language model on my own machine?',
    summary:
      'Memory, not compute, decides what you can run: a quantized 8B model fits in 8 GB, a 32B needs about 24 GB, and 70B-class models want 48 GB or more. Here are the real numbers and the software to use.',
    tags: ['ai', 'llm', 'local llm', 'hardware', 'gpu'],
    language: 'en',
    image: {
      prompt:
        'An isometric desktop computer tower with its glass side panel open, revealing a radiant cube of neural lattice hovering above a graphics card, with translucent cooling fans and soft light rays. ' +
        STYLE,
      alt: 'A glowing neural lattice cube seated on a graphics card inside an open PC tower',
    },
    sources: [
      { title: 'llama.cpp — LLM inference in C/C++ (GGUF, quantization)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — run open LLMs locally', url: 'https://ollama.com' },
      { title: 'vLLM — high-throughput LLM serving', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# What Hardware Do You Need to Run an LLM Locally?

The binding constraint is **memory, not speed**. A model's weights must fit in your GPU's VRAM (or Apple unified memory) for usable performance, and the math is simple: at 4-bit quantization, a model needs roughly **0.5–0.7 GB per billion parameters**, plus 1–4 GB of headroom for the context cache.

## The quick sizing table

| Model class | 4-bit weights | Comfortable setup | Examples of what runs |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Any modern laptop, 8 GB RAM | Small assistants, autocomplete |
| 7–9B | ~4–6 GB | 8 GB GPU or 16 GB Mac | Llama/Qwen/Mistral small models |
| 13–14B | ~8–10 GB | 12–16 GB GPU or 24 GB Mac | Mid-size chat and coding models |
| 30–34B | ~18–22 GB | 24 GB GPU (e.g. RTX 3090/4090) or 36–48 GB Mac | Strong local generalists |
| 70–72B | ~40–48 GB | 2×24 GB GPUs or 64 GB+ Mac Studio | Near-frontier open models |
| Mixture-of-experts large | varies widely | Workstation/server class | Check per-model docs |

Two notes on reading it: quantization (GGUF 4-bit and similar) trades a small, usually acceptable quality loss for a 4× memory cut versus 16-bit; and long contexts grow the KV cache — chatting at 32k context can add several GB on top of the weights.

## GPU, Mac, or CPU?

- **NVIDIA GPU**: best throughput and ecosystem support. VRAM size matters more than GPU generation — a used 24 GB RTX 3090 remains a beloved budget pick for 30B-class models.
- **Apple Silicon**: unified memory makes Macs quietly excellent — a 64 GB M-series machine runs 70B-class quantized models, slower than a dual-GPU rig but silent and simple. Buy RAM, not cores.
- **CPU only**: works via llama.cpp, but expect a few tokens per second on small models — fine for batch jobs, painful for chat.

## Software stack

- **Ollama** — the easiest start: one command to pull and run a model, with an OpenAI-compatible local API.
- **llama.cpp** — the engine underneath much of the ecosystem; maximum control over quantization and offloading.
- **LM Studio** — GUI for browsing, downloading, and chatting.
- **vLLM** — when you're serving many concurrent users from a real GPU server rather than one desktop.

## What to expect honestly

A well-chosen 8–14B quantized model handles summarization, drafting, extraction, and decent coding help. 30B–70B-class open models are genuinely strong but still trail frontier hosted models on hard reasoning. The reasons to go local are **privacy, offline use, unlimited tokens at fixed cost, and tinkering freedom** — not beating the cloud on raw quality.

## FAQ

**Does running locally save money?**
Only at sustained heavy usage. Hardware pays for itself if you'd otherwise burn through API tokens daily; for occasional use, APIs are cheaper.

**Can I run models bigger than my VRAM?**
Yes — layers can spill to system RAM at a steep speed cost. A model 20% over VRAM is often fine; 2× over is misery.

**What about fine-tuning locally?**
Parameter-efficient methods (LoRA/QLoRA) make small-model fine-tuning feasible on a 24 GB GPU. Full fine-tuning of large models remains datacenter territory.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'What Is MCP (Model Context Protocol)?',
    question: 'What is the Model Context Protocol and what problem does it solve?',
    summary:
      'MCP is an open standard that lets any AI application connect to any tool or data source through one protocol — replacing per-app, per-tool custom integrations. Think USB-C for AI context.',
    tags: ['ai', 'mcp', 'llm', 'integrations', 'open standards'],
    language: 'en',
    image: {
      prompt:
        'A central crystalline hub with one universal glowing port, and several translucent cables snapping in from different directions, each cable carrying a differently colored stream of light particles, all unifying inside the hub. ' +
        STYLE,
      alt: 'Differently colored data cables converging into one universal crystalline port',
    },
    sources: [
      { title: 'Model Context Protocol — official site and specification', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, "Introducing the Model Context Protocol"', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# What Is MCP (Model Context Protocol)?

The Model Context Protocol (MCP) is an open standard for connecting AI applications to external tools and data. Before it, every AI app had to build a custom integration for every tool — N apps × M tools meant N×M adapters. MCP collapses that into N + M: an app implements the protocol once as a *client*, a tool exposes it once as a *server*, and any client can talk to any server. The standard analogy has stuck because it's accurate: **USB-C for AI**.

## Why it exists

LLMs are only as useful as the context they can reach. Your assistant becomes dramatically more capable when it can read your files, query your database, search your tickets, or send a message — but wiring those up ad hoc produced fragile, non-portable, single-vendor integrations. MCP, introduced by Anthropic in late 2024 and since adopted broadly across the industry, standardizes that wiring. As of 2026 the ecosystem counts thousands of community and vendor servers for everything from GitHub and Slack to databases and browsers.

## How it works

MCP has three roles:

- **Host** — the AI application the user faces (a chat app, an IDE, an agent runtime).
- **Client** — the protocol connection the host opens, one per server.
- **Server** — a (usually small) program exposing capabilities over the protocol, either locally via stdio or remotely over HTTP.

A server can offer three kinds of capabilities:

| Primitive | What it is | Example |
| --- | --- | --- |
| **Tools** | Functions the model may call | \`create_issue\`, \`query_database\` |
| **Resources** | Data the host can read into context | A file, a schema, a dashboard |
| **Prompts** | Reusable parameterized templates | "Review this PR with our checklist" |

The host's model sees tool definitions, decides when to call them, and the server executes and returns results — the protocol handles discovery, invocation, and transport uniformly.

## MCP vs plain function calling

Function calling is how a *model* invokes a function its developer registered in that one application. MCP standardizes the layer around it: where tools come from, how they're discovered, authenticated, and transported — so the same server works in any MCP-capable app without code changes. They compose: under the hood, an MCP tool call still reaches the model as function calling.

## Getting started

The practical on-ramp is using existing servers, not writing one: most major AI clients let you add an MCP server with a few lines of configuration, and official SDKs (TypeScript, Python, and others) make writing your own server an afternoon project — define a few typed functions, and every MCP client can use them.

## FAQ

**Is MCP tied to one model vendor?**
No. It started at Anthropic but is an open specification with multi-vendor adoption and an open governance process; clients and servers exist across all major ecosystems.

**Is it safe to connect arbitrary servers?**
Treat MCP servers like browser extensions: they run with real permissions. Use trusted sources, review what tools a server exposes, and prefer hosts that require explicit user approval per sensitive action.

**When should I write my own server?**
When your team has an internal API or dataset that several AI tools should reach — one server makes it available to every MCP-capable client your company uses.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'What Is a Vector Database — and When Do You Need One?',
    question: 'What is a vector database and when do I actually need one?',
    summary:
      'Vector databases store embeddings and find "nearest meaning" instead of exact matches, powering semantic search and RAG. Below ~1M vectors, simpler tools like pgvector usually suffice.',
    tags: ['ai', 'vector database', 'embeddings', 'search', 'rag'],
    language: 'en',
    image: {
      prompt:
        'A vast three-dimensional constellation of small glowing dots clustered by color inside a transparent glass space, with one bright query dot emitting a soft ripple that highlights its nearest neighboring dots with connecting light lines. ' +
        STYLE,
      alt: 'A query point rippling through clustered constellations of embedding vectors',
    },
    sources: [
      { title: 'Malkov & Yashunin, "Efficient and Robust ANN Search Using HNSW Graphs" (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — library for efficient similarity search', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — vector similarity for Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# What Is a Vector Database — and When Do You Need One?

A vector database stores **embeddings** — lists of numbers that represent the meaning of text, images, or audio — and answers one query extremely well: *"find the items most similar to this one."* That's the operation behind semantic search, RAG retrieval, recommendations, and duplicate detection. Whether you need a dedicated one depends almost entirely on scale.

## Embeddings in one minute

An embedding model maps content into a point in high-dimensional space (commonly 256–3072 dimensions) such that similar meanings land near each other. "How do I reset my password" and "I'm locked out of my account" share little vocabulary but sit close together as vectors. Similarity is measured geometrically — usually cosine similarity — so search becomes: embed the query, find the nearest stored points.

## What makes it a *database* problem

Comparing a query against every stored vector (brute force) is exact but linear — fine for thousands of items, slow for millions. Vector databases use **approximate nearest neighbor (ANN)** indexes, most famously HNSW graphs, that find ~99% of the true neighbors in a tiny fraction of the time. Around that core they add the usual database amenities: metadata filtering ("only this tenant's documents"), updates and deletes, persistence, and horizontal scaling.

## When you need one — honestly

| Corpus size | Reasonable choice |
| --- | --- |
| Up to ~100k vectors | An array in memory, FAISS, or SQLite extensions — brute force is fine |
| ~100k–a few million | **pgvector in the Postgres you already run** — the pragmatic default |
| Many millions, high QPS, multi-tenant | Dedicated engine: Qdrant, Milvus, Weaviate, or managed services like Pinecone |

The most common architecture mistake is adding a new piece of infrastructure for 50,000 chunks. If you already run Postgres, pgvector keeps vectors next to your relational data, transactional and joinable. Reach for a dedicated engine when you have real scale, strict latency targets, or heavy filtered search.

## Quality levers that matter more than the database

- **Chunking**: how you split documents affects retrieval more than which engine you pick. Chunks should be self-contained thoughts, often 200–800 tokens with overlap.
- **Embedding model choice**: newer multilingual models materially beat older ones; re-embedding a corpus is annoying, so choose deliberately.
- **Hybrid search**: combining vector similarity with classic keyword scoring (BM25) catches names, codes, and rare terms that embeddings blur.
- **Reranking**: retrieving 50 candidates cheaply and re-scoring the top with a cross-encoder usually lifts answer quality more than tuning the index.

## FAQ

**Do embeddings leak my data to the embedding provider?**
The text goes to whoever computes the embedding. With hosted APIs, that's the provider (check retention terms); open-weight embedding models run fully local.

**Can vectors be updated when documents change?**
Yes — but it's your pipeline's job to re-chunk and re-embed changed documents. Stale vectors silently serving old content is the classic production bug.

**Is a bigger embedding dimension better?**
Not automatically. Higher dimensions cost storage and latency; many modern models offer truncatable dimensions where 512–1024 retains nearly all quality. Benchmark on your own retrieval set.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'How to Get Real Value from AI Coding Assistants',
    question: 'How do I use AI coding assistants effectively without hurting code quality?',
    summary:
      'AI coding tools deliver their biggest wins on boilerplate, tests, and unfamiliar territory — if you give them context and review their output. Practices that work, risks to manage, and where the time actually goes.',
    tags: ['ai', 'programming', 'coding assistants', 'developer tools', 'productivity'],
    language: 'en',
    image: {
      prompt:
        'An isometric translucent code editor window made of glass panels, with a robotic hand of light and a human hand together placing glowing geometric blocks to complete a bridge of code across a gap. ' +
        STYLE,
      alt: 'Human and AI hands building one bridge of code blocks together',
    },
    sources: [
      { title: 'Peng et al., "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — benchmarking LLMs on real GitHub issues', url: 'https://www.swebench.com' },
    ],
    content: `# How to Get Real Value from AI Coding Assistants

AI coding assistants are genuinely productive — controlled studies have shown large speedups on self-contained tasks, and by 2026 agentic tools that run tests and edit multiple files have moved well beyond autocomplete. But the gains are uneven, and they're conditional on two habits: **giving the tool real context** and **reviewing what it writes**. Teams that skip either tend to ship subtle bugs faster.

## Where the wins concentrate

- **Boilerplate and glue**: CRUD endpoints, config, serialization, API client wrappers.
- **Tests**: generating thorough unit-test suites from existing code is one of the highest value-per-minute uses.
- **Unfamiliar territory**: a new language, framework, or API — the assistant compresses documentation-reading hours into minutes.
- **Mechanical refactors**: renames, signature changes, applying a known pattern across files.
- **Explaining code**: onboarding into a legacy module by asking questions about it.

Where wins shrink: deep domain logic, performance-critical kernels, large architectural decisions, and code where being wrong is expensive. There, the assistant is a sparring partner, not an author.

## Practices that separate good from bad outcomes

**Scope the ask.** "Add pagination to this endpoint, matching how \`listUsers\` does it" beats "improve this API." Small, verifiable increments compound; thousand-line generations are review nightmares.

**Feed context deliberately.** Point the tool at the relevant files, the error message, the schema, the team conventions. Modern agentic assistants can find context themselves — but naming the right starting files still halves their wandering.

**Let it run the tests.** The single biggest reliability upgrade is a feedback loop: an assistant that can execute the test suite catches its own mistakes instead of shipping them to you.

**Review like it's a confident junior's PR.** The code reads plausibly; that's exactly why skimming is dangerous. Check edge cases, error handling, and security-sensitive surfaces (input validation, auth, queries) with full attention.

**Keep tests and types as guardrails.** Strong typing and good coverage convert "the AI broke something" from a production incident into a red CI run.

## Task type → realistic expectation

| Task | Expectation |
| --- | --- |
| Unit tests for existing code | Large speedup, high reliability |
| Boilerplate/scaffolding | Large speedup |
| Bug fix with reproducible test | Good — agentic tools often nail these |
| Feature in unfamiliar framework | Big learning-curve compression |
| Subtle concurrency/perf work | Modest help; verify rigorously |
| System design | Useful discussion partner, not an oracle |

## Team-level guardrails

Adopt explicitly, not by stealth: agree where assistants are encouraged, require the same review bar for generated code, watch for license-sensitive verbatim output in regulated codebases, and keep CI authoritative. And guard the learning loop — juniors who paste without reading plateau; juniors who interrogate the assistant learn faster than any previous generation.

## FAQ

**Will assistants make me a worse engineer?**
They erode skills you stop practicing and amplify skills you direct. Engineers who can specify, decompose, and verify get more leverage every year; pure typing speed stops mattering.

**Why does the assistant confidently produce code that doesn't compile?**
It predicts plausible code, and sometimes hallucinates APIs. Treat compilation and tests as the arbiter — and prefer tools that compile/run code before showing it to you.

**Agent or autocomplete?**
Both, for different work: inline completion for flow while you write; agentic mode for self-contained tasks you can describe and verify, like "make these tests pass."`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Why Do Large Language Models Hallucinate?',
    question: 'Why do large language models make things up, and how can hallucinations be reduced?',
    summary:
      'LLMs are trained to produce plausible text, not verified truth — when knowledge runs out, fluent guessing fills the gap. Why it happens, when it gets worse, and the mitigations that actually work.',
    tags: ['ai', 'llm', 'hallucination', 'reliability', 'machine learning'],
    language: 'en',
    image: {
      prompt:
        'A glowing neural sphere projecting a wide beam of light that splits in two: one half of the beam renders crisp solid geometric structures, the other half dissolves into scattered drifting fragments and soft mist. ' +
        STYLE,
      alt: 'One beam from a neural core rendering solid structure and dissolving mist',
    },
    sources: [
      { title: 'Huang et al., "A Survey on Hallucination in Large Language Models" (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., "TruthfulQA: Measuring How Models Mimic Human Falsehoods" (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., "Lost in the Middle: How Language Models Use Long Contexts" (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Why Do Large Language Models Hallucinate?

A language model is trained to do one thing: predict text that plausibly continues what came before. Truth and plausibility usually coincide — that's why models are useful — but when the model lacks the fact you asked for, the training objective still demands fluent output. The result is a confident, well-formed, wrong answer. Hallucination isn't a glitch bolted onto LLMs; it's the default behavior of plausibility-maximizing systems at the edge of their knowledge.

## The mechanics

- **Lossy compression.** Training squeezes terabytes of text into a fixed set of weights. Common knowledge survives with high fidelity; rare facts — small-town details, minor papers, niche product specs — get blurred or lost, and the model can't reliably tell which.
- **No lookup step.** A plain model doesn't consult a database before answering; it generates from statistical memory. There's no internal flag that says "this is retrieved fact" vs "this is pattern-completion."
- **Training rewards answering.** Models tuned on human preferences learn that helpful, confident, complete answers are rated highly — historically, benchmarks and raters penalized "I don't know," teaching models to guess.
- **Error compounding.** Generation is sequential; one wrong early token (a fabricated name, a wrong year) gets elaborated into a coherent false paragraph.

## Where it gets worse, predictably

Citations and references (the format is easy to imitate, the contents aren't memorized), precise numbers and dates, rare entities, long documents (models attend less reliably to the middle of long contexts), arithmetic done in-text, and any question premised on a falsehood the model politely accepts.

## Mitigations that work

| Mitigation | What it addresses |
| --- | --- |
| RAG / grounding in retrieved documents | Replaces memory with provided facts; enables citations |
| Tool use (calculator, code, search) | Outsources what models compute worst |
| "Answer only from the context; say unknown otherwise" | Gives permission to refuse |
| Lower temperature for factual tasks | Trims creative-but-wrong sampling |
| Self-verification / second-pass checking | Catches inconsistencies the first pass missed |
| Citations required + spot-check workflow | Makes errors detectable by humans |
| Reasoning models on hard problems | Working through steps reduces unforced errors |

Grounding is the heavyweight: when the right passage is in context, the model's job shifts from *recalling* to *reading*, which it does far more reliably. That's why RAG remains the standard architecture for factual products.

## Can it be fully solved?

Not with current architectures — a system that must always produce text will sometimes produce unsupported text. Research keeps reducing rates (better calibration, training models to abstain, verification layers), and reasoning-capable models hallucinate less on multi-step problems. The engineering posture, as of 2026: design **assuming** residual hallucination — ground answers, require citations for claims that matter, keep humans in the loop where errors are costly.

## FAQ

**Why does the model sound MORE confident when it's wrong?**
Fluency and confidence are stylistic patterns learned from text, uncorrelated with internal certainty. Don't use tone as a truth signal.

**Does asking "are you sure?" help?**
It sometimes triggers useful self-review, sometimes sycophantic agreement with your implied doubt. Independent verification beats interrogation.

**Are bigger models more truthful?**
Generally yes on broad factuality, but no size eliminates fabrication — and confident style scales too. Scale shrinks the problem; grounding and verification manage what remains.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'Open-Source vs Closed-Source LLMs: How to Choose',
    question: 'Should I build on open-source or closed-source large language models?',
    summary:
      'Closed APIs buy frontier capability with zero ops; open-weight models buy control, privacy, and cheap scale. The deciding factors are data sensitivity, volume economics, and how much capability your task truly needs.',
    tags: ['ai', 'llm', 'open source', 'strategy', 'infrastructure'],
    language: 'en',
    image: {
      prompt:
        'Two neural cores side by side on glass pedestals: the left one inside an open transparent case with its lattice exposed and small modular pieces being attached, the right one sealed inside a smooth opaque polished shell with a single elegant access port. ' +
        STYLE,
      alt: 'An open lattice core beside a sealed polished core with one port',
    },
    sources: [
      { title: 'LMArena — community leaderboard comparing open and closed models', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — open model hub', url: 'https://huggingface.co/models' },
    ],
    content: `# Open-Source vs Closed-Source LLMs: How to Choose

"Open vs closed" is less an ideology question than a procurement question: **who runs the model, who sees your data, and who absorbs the operational burden.** Closed models (served by API — the GPT, Claude, and Gemini families) sell frontier capability with zero infrastructure. Open-weight models (the Llama, Qwen, DeepSeek, Mistral families and many others) hand you the weights and with them control, privacy, and the bill for serving.

A terminology note that matters in contracts: most "open-source" models are precisely **open-weight** — you can download and run them, but training data isn't published and licenses may carry usage restrictions. Read the license, not the marketing.

## The trade-off table

| Dimension | Closed (API) | Open-weight (self-hosted) |
| --- | --- | --- |
| Peak capability | Frontier; strongest on hard reasoning | Top open models close, and lead on cost-per-quality |
| Cost shape | Per-token, scales with usage | Fixed infra + ops, scales with capacity |
| Data control | Data transits the provider (check retention/training terms) | Never leaves your network |
| Customization | Prompting, some hosted fine-tuning | Full fine-tuning, quantization, surgery |
| Ops burden | None | GPUs, serving stack, upgrades, on-call |
| Stability | Models deprecate on the vendor's schedule | The weights are yours forever |
| Compliance | Vendor certifications | Easiest story for strict data-residency rules |

## When closed wins

You need the strongest available reasoning; your volume is modest or spiky; you have no GPU/ML ops capacity; you want capability gains delivered to you continuously. For most product teams' first year, a frontier API is the fastest path to finding out whether the product works at all — optimize after it does.

## When open wins

Data cannot leave (healthcare, defense, strict residency); sustained high volume makes per-token pricing dominate your margins; you need deep customization or a small fast specialist distilled for one task; you're embedding a model in hardware or air-gapped environments; or vendor lock-in is a strategic risk you're paid to avoid.

## The pattern most mature teams land on

**Route, don't pledge allegiance.** A capable closed model handles the hard, low-volume tail; a tuned open model handles the high-volume, well-understood core; sensitive workloads stay on-prem. Abstraction layers and OpenAI-compatible serving stacks make multi-model routing cheap to build, and the gap between tiers gets re-measured every quarter — because as of 2026 it keeps moving.

## FAQ

**Are open models "a generation behind"?**
The gap at the frontier persists but has narrowed dramatically, and for many concrete tasks (extraction, summarization, routine coding) strong open models are simply sufficient. Benchmark your task, not the headlines.

**Is self-hosting actually cheaper?**
Only with utilization. A GPU serving at 5% capacity is the most expensive token factory on earth; managed open-model APIs are the middle path — open weights, someone else's GPUs.

**Can I switch later?**
Prompt-level behavior transfers imperfectly between models. Keep an evaluation suite from day one; migration cost is mostly re-validation, and evals turn that from weeks of vibes into days of diffs.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'What Are Tokens, and How Does LLM Pricing Work?',
    question: 'What exactly is a token, and how do LLM providers charge for usage?',
    summary:
      'Tokens are the subword chunks models read and write — roughly ¾ of an English word each. API pricing is per million tokens, with output costing several times input, and caching/batching as the big levers.',
    tags: ['ai', 'llm', 'tokens', 'pricing', 'api'],
    language: 'en',
    image: {
      prompt:
        'A flowing ribbon of soft light passing through a triangular glass prism and being sliced into small uniform glowing square tiles, which stream onto one pan of an elegant balance scale, with small discs of light stacked on the other pan. ' +
        STYLE,
      alt: 'A prism slicing a ribbon of text-light into tokens weighed on a balance scale',
    },
    sources: [
      { title: 'tiktoken — fast BPE tokenizer used by OpenAI models', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., "Neural Machine Translation of Rare Words with Subword Units" (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# What Are Tokens, and How Does LLM Pricing Work?

Models don't read characters or words — they read **tokens**: subword chunks produced by a tokenizer. "Understanding" might be one token; "unconstitutionally" might be four; a rare emoji might be three. Every capability limit (context window) and every API invoice is denominated in these units, so a rough feel for them pays for itself quickly.

## Rules of thumb

- **English**: 1 token ≈ 4 characters ≈ ¾ of a word. A 1,000-word document ≈ 1,300–1,500 tokens.
- **Code**: denser in tokens than prose — punctuation, indentation, and identifiers all cost.
- **Chinese/Japanese/Korean**: roughly 1–2 characters per token on modern tokenizers; per *information conveyed*, CJK text is often comparable to or slightly costlier than English.
- **Numbers and URLs**: surprisingly expensive; long IDs shred into many tokens.

Tokenizers are built by byte-pair encoding (BPE): starting from bytes and repeatedly merging the most frequent pairs, so common strings become single tokens. Each model family has its own tokenizer — counts differ between providers, which is why cost comparisons should be run on *your* actual traffic.

## How the meter runs

API pricing has a standard shape across providers:

| Meter | What counts | Typical relation |
| --- | --- | --- |
| **Input tokens** | Everything you send: system prompt, history, retrieved docs, the question | Baseline rate |
| **Output tokens** | Everything the model generates, including hidden reasoning on some reasoning models | Commonly ~3–5× the input rate |
| **Cached input** | Repeated stable prefixes (system prompts, long documents) | Often ~10× cheaper than fresh input |
| **Batch/async** | Non-urgent jobs submitted in bulk | Commonly ~half price |

Two structural facts follow. First, **conversation history is resent on every turn** — a chat's cost grows quadratically with its length unless you truncate, summarize, or rely on caching. Second, **output dominates** when you generate long text, so "be concise" instructions and output caps are real cost controls, not just style preferences.

## Estimating a workload

The arithmetic is always the same: (requests per day) × (average input tokens × input rate + average output tokens × output rate). Worked example with placeholder rates — say input costs $3 and output $15 per million tokens: a support bot answering 10,000 queries/day with 2,000-token prompts (instructions + retrieved context) and 300-token answers costs 10,000 × (2,000×$3 + 300×$15)/1M ≈ **$105/day**, two-thirds of it input. That ratio is typical for RAG apps — which is why prompt caching and context trimming usually save more than switching models.

## The big levers, ranked

1. **Cache stable prefixes** — near-free wins for any app with a long fixed system prompt or shared documents.
2. **Right-size the model** — route easy traffic to a cheaper tier; reserve frontier models for the hard tail.
3. **Trim context** — retrieve fewer, better chunks; summarize old chat turns; deduplicate boilerplate.
4. **Cap and shape output** — set max lengths; prefer structured short answers where possible.
5. **Batch the non-urgent** — overnight classification and backfills shouldn't pay interactive prices.

## FAQ

**Why was I billed more tokens than my text length suggests?**
System prompts, tool definitions, message formatting, and (on reasoning models) thinking tokens all count, and non-English or code-heavy text tokenizes denser than the English rule of thumb.

**Do context windows change pricing?**
The window is a capacity limit, not a price — but filling it is. Some providers also charge premium rates above certain context sizes, so giant-context calls deserve scrutiny.

**How do I count tokens before sending?**
Use the provider's tokenizer library or token-counting endpoint (for OpenAI-family tokenizers, tiktoken runs locally). For budgeting, the ≈4-characters heuristic is usually within 20%.`,
  },
];
