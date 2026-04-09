/**
 * Cold-start content seeder with inline content
 * Writes pre-defined wiki entries directly to Firestore
 * Usage: npx tsx scripts/seed-inline.ts
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';

config({ path: '.env.local' });

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

interface SeedEntry {
  title: string;
  question: string;
  content: string;
  summary: string;
  tags: string[];
}

const entries: SeedEntry[] = [
  {
    title: 'JavaScript',
    question: 'What is JavaScript?',
    content: `# JavaScript

JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is one of the core technologies of the World Wide Web, alongside HTML and CSS.

## Overview

JavaScript enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.

## Key Features

- **Dynamic typing** - Variables are not bound to a specific data type
- **First-class functions** - Functions can be assigned to variables, passed as arguments, and returned from other functions
- **Prototype-based OOP** - Objects can inherit directly from other objects
- **Event-driven** - Code execution can be triggered by events like user clicks or data loading
- **Asynchronous programming** - Promises and async/await for non-blocking operations

## Modern JavaScript (ES6+)

Modern JavaScript introduced many features:
- Arrow functions (\`=>\`)
- Template literals
- Destructuring assignment
- Modules (\`import\`/\`export\`)
- Classes
- \`let\` and \`const\` declarations
- Spread/rest operators

## Runtime Environments

- **Browser** - Built-in JavaScript engines (V8 in Chrome, SpiderMonkey in Firefox)
- **Node.js** - Server-side JavaScript runtime built on V8
- **Deno** - Modern runtime with TypeScript support
- **Bun** - Fast all-in-one JavaScript runtime`,
    summary: 'JavaScript is a high-level, interpreted programming language and one of the core technologies of the World Wide Web.',
    tags: ['javascript', 'programming', 'web development'],
  },
  {
    title: 'Python',
    question: 'What is Python?',
    content: `# Python

Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.

## Overview

Python supports multiple programming paradigms, including structured, object-oriented, and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.

## Key Features

- **Clean syntax** - Uses indentation for code blocks, reducing visual clutter
- **Dynamic typing** - Type checking happens at runtime
- **Garbage collection** - Automatic memory management
- **Large standard library** - Extensive built-in modules for common tasks
- **Cross-platform** - Runs on Windows, macOS, Linux, and more

## Common Use Cases

- **Web Development** - Django, Flask, FastAPI
- **Data Science** - NumPy, Pandas, Matplotlib
- **Machine Learning** - TensorFlow, PyTorch, scikit-learn
- **Automation** - Scripting, DevOps, testing
- **Scientific Computing** - SciPy, Jupyter notebooks

## Python 3

Python 3 is the current major version, with Python 2 having reached end-of-life in 2020. Key Python 3 features include f-strings, type hints, async/await, and improved Unicode support.`,
    summary: 'Python is a high-level, general-purpose programming language emphasizing code readability and a comprehensive standard library.',
    tags: ['python', 'programming', 'machine learning'],
  },
  {
    title: 'Docker',
    question: 'What is Docker?',
    content: `# Docker

Docker is a platform for developing, shipping, and running applications in containers. It enables developers to package applications with all their dependencies into standardized units called containers.

## How Docker Works

Docker uses OS-level virtualization to deliver software in containers. Containers are isolated from each other and bundle their own software, libraries, and configuration files.

## Key Concepts

- **Image** - A read-only template with instructions for creating a Docker container
- **Container** - A runnable instance of an image
- **Dockerfile** - A text file with instructions to build an image
- **Docker Hub** - A registry for sharing Docker images
- **Docker Compose** - A tool for defining multi-container applications

## Benefits

- **Consistency** - Same environment across development, testing, and production
- **Isolation** - Applications run independently without conflicts
- **Portability** - Containers run anywhere Docker is installed
- **Efficiency** - Lightweight compared to virtual machines
- **Scalability** - Easy to scale horizontally

## Basic Commands

\`\`\`bash
docker build -t myapp .        # Build an image
docker run -p 3000:3000 myapp  # Run a container
docker ps                       # List running containers
docker compose up               # Start multi-container app
\`\`\``,
    summary: 'Docker is a platform for developing, shipping, and running applications in containers, enabling consistent environments across development and production.',
    tags: ['docker', 'devops', 'containers'],
  },
  {
    title: 'React',
    question: 'What is React?',
    content: `# React

React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.

## Core Concepts

- **Components** - Reusable, self-contained pieces of UI
- **JSX** - A syntax extension that allows writing HTML-like code in JavaScript
- **Virtual DOM** - An in-memory representation of the real DOM for efficient updates
- **State** - Data that changes over time and triggers re-renders
- **Props** - Data passed from parent to child components

## React Hooks

Hooks allow function components to use state and other React features:
- \`useState\` - Manage local state
- \`useEffect\` - Handle side effects
- \`useContext\` - Access context values
- \`useRef\` - Reference DOM elements
- \`useMemo\` / \`useCallback\` - Performance optimization

## React Ecosystem

- **Next.js** - Full-stack React framework with SSR/SSG
- **React Router** - Client-side routing
- **Redux / Zustand** - State management
- **React Query** - Server state management
- **React Native** - Mobile app development`,
    summary: 'React is an open-source JavaScript library for building user interfaces based on components, maintained by Meta.',
    tags: ['react', 'javascript', 'web development', 'frontend'],
  },
  {
    title: 'Machine Learning',
    question: 'What is Machine Learning?',
    content: `# Machine Learning

Machine learning (ML) is a subset of artificial intelligence that focuses on building systems that learn from data to improve their performance on specific tasks without being explicitly programmed.

## Types of Machine Learning

### Supervised Learning
The algorithm learns from labeled training data. Examples include classification and regression.

### Unsupervised Learning
The algorithm finds patterns in unlabeled data. Examples include clustering and dimensionality reduction.

### Reinforcement Learning
An agent learns by interacting with an environment, receiving rewards or penalties for its actions.

## Common Algorithms

- **Linear/Logistic Regression** - Simple predictive models
- **Decision Trees / Random Forests** - Tree-based classification
- **Neural Networks** - Deep learning models with multiple layers
- **Support Vector Machines** - Classification with optimal hyperplanes
- **K-Means** - Clustering algorithm

## Deep Learning

Deep learning uses neural networks with many layers to learn hierarchical representations of data. Key architectures include:
- **CNNs** - Convolutional Neural Networks for image processing
- **RNNs** - Recurrent Neural Networks for sequential data
- **Transformers** - Attention-based models for NLP (GPT, BERT)
- **GANs** - Generative Adversarial Networks for content generation

## Popular Frameworks

- TensorFlow, PyTorch, scikit-learn, Keras, JAX`,
    summary: 'Machine learning is a subset of AI that builds systems learning from data to improve performance on tasks without explicit programming.',
    tags: ['machine learning', 'ai', 'data science'],
  },
  {
    title: 'DNS (Domain Name System)',
    question: 'How does DNS work?',
    content: `# DNS (Domain Name System)

The Domain Name System (DNS) is the phonebook of the Internet. It translates human-readable domain names (like google.com) into IP addresses (like 142.250.80.46) that computers use to communicate.

## How DNS Resolution Works

1. **User enters URL** - Browser checks its cache for the IP
2. **Recursive resolver** - ISP's DNS server receives the query
3. **Root nameserver** - Points to the TLD nameserver (.com, .org, etc.)
4. **TLD nameserver** - Points to the authoritative nameserver
5. **Authoritative nameserver** - Returns the actual IP address
6. **Response cached** - Result is cached at multiple levels

## DNS Record Types

- **A** - Maps domain to IPv4 address
- **AAAA** - Maps domain to IPv6 address
- **CNAME** - Alias for another domain name
- **MX** - Mail exchange server
- **TXT** - Text records (SPF, DKIM, verification)
- **NS** - Nameserver delegation
- **SOA** - Start of authority

## DNS Caching

DNS responses are cached at multiple levels with TTL (Time to Live) values:
- Browser cache
- Operating system cache
- Router cache
- ISP recursive resolver cache

## DNS Security

- **DNSSEC** - Cryptographic signing of DNS records
- **DNS over HTTPS (DoH)** - Encrypts DNS queries via HTTPS
- **DNS over TLS (DoT)** - Encrypts DNS queries via TLS`,
    summary: 'DNS translates human-readable domain names into IP addresses, acting as the phonebook of the Internet.',
    tags: ['dns', 'networking', 'internet'],
  },
  {
    title: 'Kubernetes',
    question: 'What is Kubernetes?',
    content: `# Kubernetes

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.

## Core Concepts

- **Pod** - Smallest deployable unit, wraps one or more containers
- **Service** - Stable network endpoint for accessing pods
- **Deployment** - Manages replica sets and rolling updates
- **Namespace** - Virtual cluster for resource isolation
- **ConfigMap / Secret** - Configuration and sensitive data management

## Architecture

### Control Plane
- **API Server** - Entry point for all REST commands
- **etcd** - Distributed key-value store for cluster state
- **Scheduler** - Assigns pods to nodes
- **Controller Manager** - Runs background controllers

### Worker Nodes
- **kubelet** - Agent that ensures containers are running
- **kube-proxy** - Network proxy for service communication
- **Container runtime** - Docker, containerd, or CRI-O

## Key Features

- Automatic scaling (HPA/VPA)
- Self-healing (restarts failed containers)
- Load balancing and service discovery
- Rolling updates and rollbacks
- Secret and configuration management
- Storage orchestration`,
    summary: 'Kubernetes is an open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
    tags: ['kubernetes', 'devops', 'containers', 'cloud'],
  },
  {
    title: 'Large Language Models (LLMs)',
    question: 'What are Large Language Models?',
    content: `# Large Language Models (LLMs)

Large Language Models are AI systems trained on vast amounts of text data to understand and generate human-like text. They are based on the Transformer architecture and contain billions of parameters.

## How LLMs Work

LLMs use self-attention mechanisms to process and generate text. They are pre-trained on large text corpora using next-token prediction, then can be fine-tuned for specific tasks.

## Key Concepts

- **Tokens** - The basic units of text the model processes
- **Context window** - Maximum number of tokens the model can process at once
- **Temperature** - Controls randomness in generation
- **Prompt engineering** - Crafting inputs to get desired outputs
- **Fine-tuning** - Adapting a pre-trained model for specific tasks
- **RLHF** - Reinforcement Learning from Human Feedback

## Notable LLMs

- **GPT-4** (OpenAI) - Multimodal large language model
- **Claude** (Anthropic) - Constitutional AI approach
- **Gemini** (Google) - Multimodal AI model family
- **LLaMA** (Meta) - Open-source model family
- **Mistral** - European open-source models

## Applications

- Chatbots and virtual assistants
- Code generation and review
- Content creation and summarization
- Translation and language tasks
- Research and analysis`,
    summary: 'Large Language Models are AI systems trained on vast text data to understand and generate human-like text, based on the Transformer architecture.',
    tags: ['llm', 'ai', 'machine learning', 'nlp'],
  },
  {
    title: 'TypeScript',
    question: 'What is TypeScript?',
    content: `# TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript. Developed by Microsoft, it adds static type definitions to JavaScript, enabling better tooling and error detection at compile time.

## Key Features

- **Static typing** - Catch errors before runtime
- **Type inference** - Automatic type detection when possible
- **Interfaces** - Define contracts for object shapes
- **Generics** - Write reusable, type-safe code
- **Enums** - Define named constants
- **Decorators** - Metadata annotations for classes

## Type System

\`\`\`typescript
// Basic types
let name: string = "Alice";
let age: number = 30;
let active: boolean = true;

// Interfaces
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

// Generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
\`\`\`

## Why TypeScript?

- Better IDE support (autocomplete, refactoring)
- Catches bugs at compile time
- Self-documenting code via types
- Easier collaboration on large codebases
- Gradually adoptable (valid JS is valid TS)`,
    summary: 'TypeScript is a strongly typed programming language that builds on JavaScript, adding static type definitions for better tooling and error detection.',
    tags: ['typescript', 'javascript', 'programming'],
  },
  {
    title: 'Node.js',
    question: 'What is Node.js?',
    content: `# Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Chrome's V8 engine, it enables server-side JavaScript development.

## Key Features

- **Event-driven architecture** - Non-blocking I/O model
- **npm** - World's largest software registry
- **Single-threaded** - Uses event loop for concurrency
- **Cross-platform** - Runs on Windows, macOS, Linux
- **Fast execution** - V8 engine compiles JS to machine code

## Common Use Cases

- REST APIs and microservices
- Real-time applications (WebSocket)
- Server-side rendering (Next.js, Nuxt)
- CLI tools
- Build tools (webpack, Vite)

## Core Modules

- \`http\` / \`https\` - HTTP server and client
- \`fs\` - File system operations
- \`path\` - File path utilities
- \`stream\` - Streaming data handling
- \`crypto\` - Cryptographic functions

## Popular Frameworks

- **Express** - Minimalist web framework
- **Fastify** - High-performance framework
- **NestJS** - Enterprise-grade framework
- **Hono** - Ultrafast web framework`,
    summary: 'Node.js is an open-source JavaScript runtime built on V8 that enables server-side JavaScript development with event-driven, non-blocking I/O.',
    tags: ['nodejs', 'javascript', 'backend', 'web development'],
  },
  {
    title: 'Git Version Control',
    question: 'What is Git?',
    content: `# Git

Git is a distributed version control system for tracking changes in source code during software development. Created by Linus Torvalds in 2005, it is the most widely used version control system.

## Core Concepts

- **Repository** - A project's folder tracked by Git
- **Commit** - A snapshot of changes
- **Branch** - An independent line of development
- **Merge** - Combining branches together
- **Remote** - A shared repository (GitHub, GitLab)

## Essential Commands

\`\`\`bash
git init                    # Initialize repository
git clone <url>             # Clone remote repo
git add .                   # Stage changes
git commit -m "message"     # Commit staged changes
git push origin main        # Push to remote
git pull                    # Fetch and merge remote changes
git branch feature          # Create new branch
git checkout feature        # Switch to branch
git merge feature           # Merge branch into current
\`\`\`

## Git Workflow

1. Create a branch for your feature
2. Make changes and commit regularly
3. Push branch to remote
4. Open a Pull Request for review
5. Merge after approval

## Platforms

- **GitHub** - Largest code hosting platform
- **GitLab** - DevOps platform with CI/CD
- **Bitbucket** - Atlassian's Git solution`,
    summary: 'Git is a distributed version control system for tracking source code changes, created by Linus Torvalds and the most widely used VCS.',
    tags: ['git', 'version control', 'devops'],
  },
  {
    title: 'REST API',
    question: 'What is a REST API?',
    content: `# REST API

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform operations on resources.

## REST Principles

- **Stateless** - Each request contains all information needed
- **Client-Server** - Separation of concerns
- **Uniform Interface** - Consistent resource addressing
- **Cacheable** - Responses can be cached
- **Layered System** - Multiple layers between client and server

## HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Read resource | GET /users/1 |
| POST | Create resource | POST /users |
| PUT | Update resource (full) | PUT /users/1 |
| PATCH | Update resource (partial) | PATCH /users/1 |
| DELETE | Remove resource | DELETE /users/1 |

## Status Codes

- **200** OK - Successful request
- **201** Created - Resource created
- **400** Bad Request - Invalid input
- **401** Unauthorized - Authentication required
- **404** Not Found - Resource doesn't exist
- **500** Internal Server Error

## Best Practices

- Use nouns for endpoints (/users, not /getUsers)
- Version your API (/api/v1/users)
- Return appropriate status codes
- Support filtering, sorting, and pagination
- Use HTTPS for all endpoints`,
    summary: 'REST is an architectural style for designing networked applications using HTTP methods to perform operations on resources.',
    tags: ['rest', 'api', 'web development', 'backend'],
  },
  {
    title: 'SQL',
    question: 'What is SQL?',
    content: `# SQL (Structured Query Language)

SQL is a programming language designed for managing and manipulating relational databases. It is the standard language for interacting with database management systems (DBMS).

## Core Operations (CRUD)

\`\`\`sql
-- Create
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');

-- Read
SELECT * FROM users WHERE age > 18 ORDER BY name;

-- Update
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;
\`\`\`

## Key Concepts

- **Tables** - Structured collections of rows and columns
- **Primary Key** - Unique identifier for each row
- **Foreign Key** - Reference to another table's primary key
- **Indexes** - Speed up query performance
- **Joins** - Combine data from multiple tables
- **Transactions** - Group operations that succeed or fail together

## Types of Joins

- **INNER JOIN** - Matching rows from both tables
- **LEFT JOIN** - All rows from left table + matches from right
- **RIGHT JOIN** - All rows from right table + matches from left
- **FULL JOIN** - All rows from both tables

## Popular Databases

- PostgreSQL, MySQL, SQLite, SQL Server, Oracle`,
    summary: 'SQL is a programming language for managing and manipulating relational databases, the standard for interacting with DBMS.',
    tags: ['sql', 'database', 'programming'],
  },
  {
    title: 'Cloud Computing',
    question: 'What is Cloud Computing?',
    content: `# Cloud Computing

Cloud computing is the delivery of computing services over the Internet, including servers, storage, databases, networking, software, and analytics.

## Service Models

### IaaS (Infrastructure as a Service)
Virtual machines, storage, networking. Example: AWS EC2, Google Compute Engine.

### PaaS (Platform as a Service)
Development platforms and tools. Example: Google App Engine, Heroku.

### SaaS (Software as a Service)
Ready-to-use applications. Example: Gmail, Salesforce, Slack.

## Major Cloud Providers

- **AWS** (Amazon Web Services) - Largest market share
- **Google Cloud Platform** - Strong in data/ML
- **Microsoft Azure** - Enterprise integration
- **Alibaba Cloud** - Asia-Pacific leader

## Key Benefits

- **Scalability** - Scale resources up or down on demand
- **Cost efficiency** - Pay only for what you use
- **Reliability** - Built-in redundancy and failover
- **Global reach** - Deploy worldwide instantly
- **Security** - Enterprise-grade protection

## Common Services

- Compute (VMs, containers, serverless)
- Storage (object, block, file)
- Databases (SQL, NoSQL, caching)
- AI/ML platforms
- CDN and networking`,
    summary: 'Cloud computing delivers computing services over the Internet, offering scalability, cost efficiency, and global reach.',
    tags: ['cloud', 'infrastructure', 'devops'],
  },
  {
    title: 'GraphQL',
    question: 'What is GraphQL?',
    content: `# GraphQL

GraphQL is a query language for APIs and a runtime for executing those queries. Developed by Facebook in 2012 and open-sourced in 2015, it provides a more efficient alternative to REST APIs.

## Key Features

- **Ask for exactly what you need** - No over-fetching or under-fetching
- **Single endpoint** - All queries go to one URL
- **Strongly typed schema** - Self-documenting API
- **Real-time subscriptions** - Live data updates via WebSocket

## Query Example

\`\`\`graphql
query {
  user(id: "1") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}
\`\`\`

## Schema Definition

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String
  posts: [Post!]!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}
\`\`\`

## GraphQL vs REST

| Feature | GraphQL | REST |
|---------|---------|------|
| Endpoints | Single | Multiple |
| Data fetching | Client specifies | Server decides |
| Over-fetching | No | Common |
| Versioning | Not needed | Often required |`,
    summary: 'GraphQL is a query language for APIs that lets clients request exactly the data they need through a single endpoint.',
    tags: ['graphql', 'api', 'web development'],
  },
  {
    title: 'Blockchain',
    question: 'What is Blockchain?',
    content: `# Blockchain

A blockchain is a distributed, immutable ledger that records transactions across a network of computers. Each block contains a list of transactions and is cryptographically linked to the previous block.

## How It Works

1. A transaction is requested
2. The transaction is broadcast to a peer-to-peer network
3. Validators verify the transaction using consensus algorithms
4. The verified transaction is combined with others into a block
5. The new block is added to the existing chain permanently

## Key Properties

- **Decentralization** - No single point of control
- **Immutability** - Records cannot be altered retroactively
- **Transparency** - All transactions are publicly verifiable
- **Security** - Cryptographic hashing protects data integrity

## Consensus Mechanisms

- **Proof of Work (PoW)** - Mining (Bitcoin)
- **Proof of Stake (PoS)** - Staking (Ethereum 2.0)
- **Delegated PoS** - Elected validators
- **Proof of Authority** - Approved validators

## Applications

- Cryptocurrencies (Bitcoin, Ethereum)
- Smart contracts and DeFi
- Supply chain tracking
- Digital identity verification
- NFTs and digital ownership`,
    summary: 'A blockchain is a distributed, immutable ledger recording transactions across a network, using cryptographic linking between blocks.',
    tags: ['blockchain', 'cryptocurrency', 'decentralized'],
  },
];

async function main() {
  console.log(`Seeding ${entries.length} wiki articles to Firestore...\n`);

  const now = Date.now();

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const ref = db.collection('wikis').doc();

    await ref.set({
      title: entry.title,
      question: entry.question,
      content: entry.content,
      summary: entry.summary,
      tags: entry.tags,
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

    console.log(`  [${i + 1}/${entries.length}] ${entry.title}`);
  }

  console.log(`\nDone! Seeded ${entries.length} wiki articles.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
