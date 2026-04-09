import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';

const SEED_SECRET = process.env.AUTH_SECRET;

const entries = [
  { title: 'JavaScript', question: 'What is JavaScript?', content: '# JavaScript\n\nJavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is one of the core technologies of the World Wide Web.\n\n## Key Features\n\n- **Dynamic typing** - Variables are not bound to a specific data type\n- **First-class functions** - Functions can be assigned to variables, passed as arguments\n- **Prototype-based OOP** - Objects can inherit directly from other objects\n- **Event-driven** - Code execution triggered by events\n- **Asynchronous programming** - Promises and async/await\n\n## Modern JavaScript (ES6+)\n\n- Arrow functions, template literals, destructuring\n- Modules (import/export), classes\n- let/const, spread/rest operators\n\n## Runtimes\n\n- Browser (V8, SpiderMonkey), Node.js, Deno, Bun', summary: 'JavaScript is a high-level programming language and one of the core technologies of the World Wide Web.', tags: ['javascript', 'programming', 'web development'] },
  { title: 'Python', question: 'What is Python?', content: '# Python\n\nPython is a high-level, general-purpose programming language emphasizing code readability with significant indentation.\n\n## Key Features\n\n- Clean syntax with indentation-based blocks\n- Dynamic typing and garbage collection\n- Comprehensive standard library\n- Cross-platform support\n\n## Use Cases\n\n- Web Development (Django, Flask, FastAPI)\n- Data Science (NumPy, Pandas)\n- Machine Learning (TensorFlow, PyTorch)\n- Automation and scripting\n- Scientific computing', summary: 'Python is a high-level, general-purpose programming language emphasizing code readability.', tags: ['python', 'programming', 'data science'] },
  { title: 'Docker', question: 'What is Docker?', content: '# Docker\n\nDocker is a platform for developing, shipping, and running applications in containers.\n\n## Key Concepts\n\n- **Image** - Read-only template for creating containers\n- **Container** - Runnable instance of an image\n- **Dockerfile** - Instructions to build an image\n- **Docker Compose** - Multi-container applications\n\n## Benefits\n\n- Consistency across environments\n- Isolation and portability\n- Lightweight vs VMs\n- Easy horizontal scaling', summary: 'Docker is a platform for developing, shipping, and running applications in containers.', tags: ['docker', 'devops', 'containers'] },
  { title: 'React', question: 'What is React?', content: '# React\n\nReact is an open-source JavaScript library for building user interfaces based on components, maintained by Meta.\n\n## Core Concepts\n\n- Components, JSX, Virtual DOM\n- State and Props\n- Hooks (useState, useEffect, useContext)\n\n## Ecosystem\n\n- Next.js, React Router, Redux/Zustand\n- React Query, React Native', summary: 'React is an open-source JavaScript library for building user interfaces based on components.', tags: ['react', 'javascript', 'frontend'] },
  { title: 'Machine Learning', question: 'What is Machine Learning?', content: '# Machine Learning\n\nMachine learning is a subset of AI that builds systems learning from data to improve performance without explicit programming.\n\n## Types\n\n- **Supervised Learning** - Labeled data (classification, regression)\n- **Unsupervised Learning** - Unlabeled data (clustering)\n- **Reinforcement Learning** - Agent learns via rewards\n\n## Deep Learning\n\n- CNNs for images, RNNs for sequences\n- Transformers for NLP (GPT, BERT)\n- GANs for generation\n\n## Frameworks\n\nTensorFlow, PyTorch, scikit-learn, Keras, JAX', summary: 'Machine learning is a subset of AI that builds systems learning from data.', tags: ['machine learning', 'ai', 'data science'] },
  { title: 'DNS (Domain Name System)', question: 'How does DNS work?', content: '# DNS\n\nDNS translates domain names into IP addresses - the phonebook of the Internet.\n\n## Resolution Process\n\n1. Browser cache check\n2. Recursive resolver query\n3. Root nameserver → TLD nameserver → Authoritative nameserver\n4. IP returned and cached\n\n## Record Types\n\n- A (IPv4), AAAA (IPv6), CNAME (alias)\n- MX (mail), TXT (verification), NS (delegation)\n\n## Security\n\n- DNSSEC, DNS over HTTPS, DNS over TLS', summary: 'DNS translates domain names into IP addresses, acting as the phonebook of the Internet.', tags: ['dns', 'networking', 'internet'] },
  { title: 'Kubernetes', question: 'What is Kubernetes?', content: '# Kubernetes\n\nKubernetes (K8s) is an open-source container orchestration platform.\n\n## Core Concepts\n\n- Pod, Service, Deployment, Namespace\n- ConfigMap/Secret for configuration\n\n## Architecture\n\n- Control Plane: API Server, etcd, Scheduler\n- Worker Nodes: kubelet, kube-proxy\n\n## Features\n\n- Auto-scaling, self-healing, load balancing\n- Rolling updates, secret management', summary: 'Kubernetes is an open-source container orchestration platform for automating deployment and scaling.', tags: ['kubernetes', 'devops', 'cloud'] },
  { title: 'Large Language Models', question: 'What are Large Language Models?', content: '# Large Language Models\n\nLLMs are AI systems trained on vast text data using the Transformer architecture.\n\n## Key Concepts\n\n- Tokens, context window, temperature\n- Prompt engineering, fine-tuning, RLHF\n\n## Notable Models\n\n- GPT-4 (OpenAI), Claude (Anthropic)\n- Gemini (Google), LLaMA (Meta)\n\n## Applications\n\n- Chatbots, code generation, content creation\n- Translation, research, analysis', summary: 'LLMs are AI systems trained on vast text data to understand and generate human-like text.', tags: ['llm', 'ai', 'nlp'] },
  { title: 'TypeScript', question: 'What is TypeScript?', content: '# TypeScript\n\nTypeScript adds static types to JavaScript, enabling better tooling and error detection.\n\n## Features\n\n- Static typing, type inference\n- Interfaces, generics, enums\n- Better IDE support and refactoring\n\n## Benefits\n\n- Catch bugs at compile time\n- Self-documenting code\n- Gradually adoptable', summary: 'TypeScript is a strongly typed language that builds on JavaScript with static type definitions.', tags: ['typescript', 'javascript', 'programming'] },
  { title: 'Node.js', question: 'What is Node.js?', content: '# Node.js\n\nNode.js is a JavaScript runtime built on V8 for server-side development.\n\n## Features\n\n- Event-driven, non-blocking I/O\n- npm package ecosystem\n- Cross-platform\n\n## Frameworks\n\n- Express, Fastify, NestJS, Hono', summary: 'Node.js is an open-source JavaScript runtime for server-side development.', tags: ['nodejs', 'javascript', 'backend'] },
  { title: 'Git', question: 'What is Git?', content: '# Git\n\nGit is a distributed version control system for tracking source code changes.\n\n## Concepts\n\n- Repository, commit, branch, merge, remote\n\n## Workflow\n\n1. Branch → 2. Commit → 3. Push → 4. Pull Request → 5. Merge\n\n## Platforms\n\nGitHub, GitLab, Bitbucket', summary: 'Git is a distributed version control system created by Linus Torvalds.', tags: ['git', 'version control', 'devops'] },
  { title: 'REST API', question: 'What is REST?', content: '# REST API\n\nREST is an architectural style for APIs using HTTP methods on resources.\n\n## Principles\n\n- Stateless, client-server, cacheable\n- Uniform interface, layered system\n\n## HTTP Methods\n\nGET (read), POST (create), PUT (update), DELETE (remove)\n\n## Status Codes\n\n200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Error', summary: 'REST is an architectural style for APIs using HTTP methods to operate on resources.', tags: ['rest', 'api', 'web development'] },
  { title: 'SQL', question: 'What is SQL?', content: '# SQL\n\nSQL is the standard language for managing relational databases.\n\n## Operations\n\nSELECT, INSERT, UPDATE, DELETE\n\n## Concepts\n\n- Tables, primary/foreign keys, indexes\n- Joins (INNER, LEFT, RIGHT, FULL)\n- Transactions\n\n## Databases\n\nPostgreSQL, MySQL, SQLite, SQL Server', summary: 'SQL is the standard language for managing and querying relational databases.', tags: ['sql', 'database', 'programming'] },
  { title: 'Cloud Computing', question: 'What is Cloud Computing?', content: '# Cloud Computing\n\nCloud computing delivers computing services over the Internet.\n\n## Service Models\n\n- IaaS (VMs, storage), PaaS (platforms), SaaS (applications)\n\n## Providers\n\nAWS, Google Cloud, Azure, Alibaba Cloud\n\n## Benefits\n\nScalability, cost efficiency, reliability, global reach', summary: 'Cloud computing delivers computing services over the Internet with scalability and cost efficiency.', tags: ['cloud', 'infrastructure', 'devops'] },
  { title: 'GraphQL', question: 'What is GraphQL?', content: '# GraphQL\n\nGraphQL is a query language for APIs - ask for exactly what you need.\n\n## Features\n\n- Single endpoint, strongly typed schema\n- No over/under-fetching\n- Real-time subscriptions\n\n## vs REST\n\nSingle endpoint vs multiple, client-specified data vs server-decided', summary: 'GraphQL is a query language for APIs that lets clients request exactly the data they need.', tags: ['graphql', 'api', 'web development'] },
  { title: 'Blockchain', question: 'What is Blockchain?', content: '# Blockchain\n\nA distributed, immutable ledger recording transactions across a network.\n\n## How It Works\n\nTransaction → Broadcast → Verify → Block → Chain\n\n## Consensus\n\nProof of Work, Proof of Stake\n\n## Applications\n\nCryptocurrency, smart contracts, DeFi, NFTs', summary: 'Blockchain is a distributed, immutable ledger for recording transactions across a network.', tags: ['blockchain', 'cryptocurrency', 'decentralized'] },
];

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  let count = 0;

  for (const entry of entries) {
    // Check if already exists
    const existing = await db.collection('wikis').where('title', '==', entry.title).limit(1).get();
    if (!existing.empty) continue;

    await db.collection('wikis').add({
      ...entry,
      authorId: 'system',
      authorName: 'GPTwiki Bot',
      authorImage: '',
      aiModel: 'claude',
      conversation: [
        { id: 'q1', role: 'user', content: entry.question, timestamp: now },
        { id: 'a1', role: 'assistant', content: entry.summary, timestamp: now },
      ],
      views: Math.floor(Math.random() * 200) + 20,
      createdAt: now - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000),
      updatedAt: now,
      source: 'seed',
    });
    count++;
  }

  return NextResponse.json({ success: true, seeded: count, total: entries.length });
}
