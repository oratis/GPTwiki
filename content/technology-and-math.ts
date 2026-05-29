import type { DraftArticle } from './types';

// Batch: Technology & Mathematics. Original encyclopedic drafts for GPTwiki.
export const technologyAndMath: DraftArticle[] = [
  {
    title: 'How GPS Works',
    question: 'How does GPS know exactly where you are?',
    summary:
      'GPS determines location by measuring the travel time of signals from multiple satellites and using trilateration; precise atomic clocks and relativity corrections make it accurate to a few meters.',
    tags: ['technology', 'navigation', 'satellites', 'physics', 'engineering'],
    language: 'en',
    content: `# How GPS Works

The Global Positioning System (GPS) lets a receiver — in your phone, car, or watch — work out where it is anywhere on Earth, usually within a few meters. It relies on a constellation of satellites and some clever physics.

## Satellites and signals

GPS uses around 30 satellites orbiting about 20,000 km up, arranged so that several are always visible from any point on the planet. Each continuously broadcasts a radio signal carrying the exact **time** it was sent and the satellite's **position**.

## Trilateration

A receiver measures how long each signal took to arrive. Because radio waves travel at the speed of light, travel time reveals **distance** to that satellite. Knowing the distance to one satellite places you somewhere on a sphere around it; combining distances to several satellites narrows your position to a single point. This geometric technique is called **trilateration**. Signals from at least four satellites are needed — three to fix position and a fourth to solve for the receiver's clock error.

## Why clocks and relativity matter

Timing must be extraordinarily precise: an error of a millionth of a second would throw off the position by hundreds of meters. Satellites carry **atomic clocks**, and the system even corrects for **Einstein's relativity** — the satellites' speed and weaker gravity make their clocks tick at a slightly different rate than clocks on the ground. Without these corrections, GPS would drift by kilometers per day.

## Beyond positioning

The same precise timing underpins financial networks, power grids, and telecommunications, making GPS a quiet backbone of modern infrastructure.`,
  },
  {
    title: 'Public-Key Cryptography',
    question: 'How can two strangers communicate securely over the open internet?',
    summary:
      'Public-key cryptography uses mathematically linked key pairs — one public, one private — so people can encrypt messages and verify identities without ever sharing a secret in advance.',
    tags: ['technology', 'cryptography', 'security', 'mathematics', 'internet'],
    language: 'en',
    content: `# Public-Key Cryptography

Public-key cryptography is the breakthrough that makes secure communication possible between people who have never met. It underpins HTTPS, secure messaging, digital signatures, and cryptocurrencies.

## The key-pair idea

Traditional ("symmetric") encryption uses a single shared secret key to lock and unlock a message — which raises a problem: how do you share the key safely in the first place? Public-key (or **asymmetric**) cryptography solves this with a **pair** of keys:

- A **public key**, which anyone can see.
- A **private key**, which the owner keeps secret.

The two are mathematically linked so that what one key locks, only the other can unlock — but knowing the public key does not let you compute the private key.

## Two main uses

- **Encryption.** To send someone a confidential message, you encrypt it with *their public key*; only their private key can decrypt it.
- **Digital signatures.** To prove a message is genuinely from you, you sign it with *your private key*; anyone can verify it with your public key, confirming authenticity and that it wasn't altered.

## The math behind it

Security rests on problems that are easy to compute one way but extremely hard to reverse — such as **factoring** huge numbers (RSA) or solving discrete logarithms on **elliptic curves**. Reversing them would take impractical amounts of computing time.

## In everyday life

When your browser shows a padlock, it has used public-key cryptography to verify the website and to set up a fast shared key for the rest of the session.`,
  },
  {
    title: 'The Fibonacci Sequence',
    question: 'What is the Fibonacci sequence and why does it appear in nature?',
    summary:
      'The Fibonacci sequence is a series where each number is the sum of the two before it; it relates to the golden ratio and appears in patterns such as flower petals and spiral shells.',
    tags: ['mathematics', 'patterns', 'nature', 'geometry', 'science'],
    language: 'en',
    content: `# The Fibonacci Sequence

The Fibonacci sequence is one of the most famous patterns in mathematics: a simple rule that produces surprising connections to geometry and the natural world.

## The rule

Start with 0 and 1, then make each new number the **sum of the previous two**:

\`\`\`
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
\`\`\`

The sequence is named after the Italian mathematician **Leonardo of Pisa** (Fibonacci), who introduced it to Europe in 1202 through a puzzle about breeding rabbits, though it was known earlier in Indian mathematics.

## Link to the golden ratio

Divide any Fibonacci number by the one before it, and the result gets closer and closer to about **1.618** — the **golden ratio** (often written φ). The farther along the sequence you go, the more exact the approximation becomes.

## Why it shows up in nature

Fibonacci numbers appear in the count of petals on many flowers, the arrangement of seeds in a sunflower, and the branching of plants. The deeper reason is **efficient packing**: arranging leaves or seeds at angles related to the golden ratio lets a plant capture sunlight or fit seeds with minimal overlap. So the pattern is less a mystical signature than a natural consequence of optimization.

## Beyond biology

The sequence also turns up in computer algorithms, financial analysis, and art, where the golden ratio has long been associated with pleasing proportions.`,
  },
  {
    title: 'Prime Numbers',
    question: 'What are prime numbers and why are they important?',
    summary:
      'Prime numbers are whole numbers greater than one with no divisors other than one and themselves; they are the building blocks of arithmetic and the basis of modern encryption.',
    tags: ['mathematics', 'numbers', 'cryptography', 'theory', 'science'],
    language: 'en',
    content: `# Prime Numbers

A prime number is a whole number greater than 1 that can be divided evenly only by 1 and itself. The first few primes are 2, 3, 5, 7, 11, and 13. Numbers that have additional divisors, like 6 (= 2 × 3), are called **composite**.

## The atoms of arithmetic

Primes are fundamental because of the **Fundamental Theorem of Arithmetic**: every whole number greater than 1 can be written as a product of primes in exactly one way (ignoring order). For example, 60 = 2 × 2 × 3 × 5. In this sense, primes are the indivisible "atoms" from which all other numbers are built.

## Infinitely many

The ancient Greek mathematician **Euclid** proved more than two thousand years ago that there is no largest prime — the list goes on forever. Yet primes thin out as numbers grow, and predicting exactly where they fall is a deep, still-unsolved area of mathematics connected to the famous **Riemann hypothesis**.

## Why they matter today

Primes power modern **cryptography**. Methods like RSA rely on a practical asymmetry: multiplying two large primes is easy, but taking the resulting huge number and recovering the original primes (**factoring**) is extraordinarily hard with current computers. That difficulty keeps online banking, messaging, and commerce secure.

## A continuing hunt

Mathematicians and volunteers using networked computers keep searching for ever-larger primes. The largest known primes now have tens of millions of digits.`,
  },
  {
    title: 'Compound Interest',
    question: 'Why is compound interest so powerful over time?',
    summary:
      'Compound interest is interest earned on both the original principal and on previously accumulated interest, producing exponential growth that rewards early, long-term saving.',
    tags: ['finance', 'economics', 'mathematics', 'money', 'personal finance'],
    language: 'en',
    content: `# Compound Interest

Compound interest is often called the most powerful force in finance. It is the process of earning interest not only on the money you originally invest, but also on the interest that money has already earned.

## Simple vs. compound

With **simple interest**, you earn a fixed amount each period based only on the original sum (the **principal**). With **compound interest**, each period's interest is added to the balance, so the next period's interest is calculated on a larger amount. Growth therefore accelerates over time — it is **exponential** rather than linear.

## A quick example

Invest 1,000 at 7% per year:

- After 1 year: 1,070
- After 10 years: about 1,967
- After 30 years: about 7,612

The money roughly **doubles** every decade without adding a cent — and the longer it runs, the more dramatic the effect becomes.

## The rule of 72

A handy shortcut, the **Rule of 72**, estimates how long an investment takes to double: divide 72 by the annual percentage rate. At 8%, money doubles in roughly 9 years (72 ÷ 8).

## Why time matters most

Because compounding builds on itself, **starting early** often matters more than investing large amounts later. The same logic works in reverse for debt: unpaid balances on high-interest loans or credit cards compound against the borrower, which is why such debt can grow alarmingly fast.`,
  },
  {
    title: 'Hash Functions',
    question: 'What is a hash function and where is it used?',
    summary:
      'A hash function maps data of any size to a fixed-size string of characters; good cryptographic hashes are fast, deterministic, and practically impossible to reverse or to forge collisions for.',
    tags: ['technology', 'computer science', 'cryptography', 'security', 'data'],
    language: 'en',
    content: `# Hash Functions

A hash function is a small but essential tool in computing. It takes an input of any length — a word, a file, an entire database — and produces a fixed-length output called a **hash** or **digest**.

## Key properties

A useful hash function is:

- **Deterministic.** The same input always produces the same hash.
- **Fast** to compute.
- **Fixed-size.** A one-character message and a one-gigabyte file both yield, say, a 256-bit result.

A *cryptographic* hash adds stronger guarantees:

- **One-way.** Given a hash, you cannot feasibly recover the original input.
- **Collision-resistant.** It is practically impossible to find two different inputs with the same hash.
- **Avalanche effect.** Changing a single character of the input completely scrambles the output.

## Everyday uses

- **Password storage.** Systems store the hash of a password, not the password itself, so a database breach does not directly reveal users' secrets.
- **Integrity checks.** Downloads often publish a hash so you can verify a file arrived intact and untampered.
- **Data structures.** **Hash tables** use hashing to find items almost instantly, regardless of how much data is stored.
- **Blockchains.** Cryptocurrencies chain blocks together using hashes, making the ledger tamper-evident.

## Common algorithms

Modern systems favor strong functions such as **SHA-256**. Older ones like MD5 and SHA-1 are now considered broken for security because researchers found ways to create collisions, and they should not be used to protect sensitive data.`,
  },
  {
    title: 'The Turing Machine',
    question: 'What is a Turing machine and why is it foundational to computing?',
    summary:
      'A Turing machine is a simple mathematical model of computation, devised by Alan Turing in 1936, that defines what it means for a problem to be computable and underpins all of computer science.',
    tags: ['computer science', 'mathematics', 'theory', 'history', 'technology'],
    language: 'en',
    content: `# The Turing Machine

The Turing machine is not a physical device but a thought experiment — a mathematical model that captures the very idea of computation. Proposed by **Alan Turing** in 1936, it remains the theoretical foundation of computer science.

## A deceptively simple design

A Turing machine consists of:

- An infinite **tape** divided into cells, each holding a symbol.
- A **head** that can read and write the symbol under it and move left or right.
- A set of **states** and a table of **rules** telling the machine what to do based on its current state and the symbol it reads.

From these minimal parts, the machine can carry out any step-by-step procedure. Turing's insight was that this simple system is powerful enough to perform **any** calculation that can be described by an algorithm.

## Universality

Turing also described a **universal** machine that can read a description of any other Turing machine and then imitate it. This is the theoretical ancestor of the modern programmable computer: one machine that runs different software rather than a separate device for each task.

## The limits of computation

The model also revealed limits. Turing proved that some problems are **undecidable** — no algorithm can solve them. The most famous is the **halting problem**: there is no general method to determine, for every program and input, whether the program will eventually stop or run forever.

## Lasting influence

Anything a real computer can compute, a Turing machine can compute too (given enough time and tape). That equivalence is why the model still defines the boundaries of what computers can — and cannot — do.`,
  },
  {
    title: 'Bandwidth and Latency',
    question: 'What is the difference between bandwidth and latency?',
    summary:
      'Bandwidth is how much data a connection can carry per second, while latency is the delay before data starts arriving; both shape how fast a network feels, but they are not the same thing.',
    tags: ['technology', 'networking', 'internet', 'computer science', 'engineering'],
    language: 'en',
    content: `# Bandwidth and Latency

People often say a connection is "fast," but speed actually has two distinct dimensions: **bandwidth** and **latency**. Confusing them is a common source of frustration with networks.

## Bandwidth: how much

**Bandwidth** is the maximum amount of data a connection can transfer in a given time, usually measured in megabits or gigabits per second. A useful analogy is the width of a pipe: a wider pipe lets more water through at once. High bandwidth helps most when moving **large** amounts of data — streaming high-resolution video, downloading big files, or backing up to the cloud.

## Latency: how soon

**Latency** is the delay between sending a request and receiving the first response, measured in milliseconds. In the pipe analogy, it is how long it takes water to travel from one end to the other. Latency is governed by distance (signals can't beat the speed of light), the number of network hops, and processing delays. Low latency matters most for **interactive** tasks — video calls, online gaming, and quick web requests.

## Why the difference matters

A connection can have high bandwidth but high latency, or the reverse. A satellite link might carry plenty of data yet feel sluggish because each signal travels tens of thousands of kilometers. This is why a video might stream smoothly (bandwidth) while a game still feels laggy (latency).

## Related terms

**Throughput** is the data rate actually achieved in practice, which is usually lower than the theoretical bandwidth. **Jitter** is variation in latency over time, which can disrupt voice and video even when average latency is low.`,
  },
];
