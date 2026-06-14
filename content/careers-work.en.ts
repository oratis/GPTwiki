import type { DraftArticle } from './types';
import { EDITORIAL_STYLE as STYLE } from './editorial-style';

// Batch: Careers & Job-Hunting (English originals). Quality-tier editorial
// cluster on the practical decisions of getting hired and growing at work —
// resumes, interviews, salary negotiation, remote work, networking, burnout.
// Seeded via scripts/seed-editorial.ts; zh variants share heroes by topicKey.

export const careersWorkEn: DraftArticle[] = [
  {
    topicKey: 'resume-that-works',
    title: 'How to Write a Resume That Actually Gets Read',
    question: 'What makes a resume effective, and how do I get past the initial screen?',
    summary:
      'A resume is a marketing document with one job: earn a 30-second yes. The ones that work lead with quantified achievements, mirror the job description\'s language, stay clean enough for automated screens to parse, and cut everything that isn\'t evidence you can do the role.',
    tags: ['careers', 'job hunting', 'resume', 'work'],
    language: 'en',
    image: {
      prompt:
        'A single clean glass document floating upright, a bright beam of light scanning down it and highlighting a few glowing quantified achievement bars, while cluttered grey lines around them fade away leaving only the luminous essentials. ' +
        STYLE,
      alt: 'A scanning beam highlighting a few quantified achievements on a clean document',
    },
    sources: [
      { title: 'Harvard Office of Career Services — Resumes & Cover Letters guide', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/' },
      { title: 'U.S. Bureau of Labor Statistics — Occupational Outlook Handbook', url: 'https://www.bls.gov/ooh/' },
    ],
    content: `# How to Write a Resume That Actually Gets Read

A resume is not your autobiography — it's a **marketing document with a single goal: get you to the interview.** The recruiter glancing at it gives roughly a few seconds to decide "maybe" or "no." Everything about an effective resume follows from that brutal economy of attention: lead with your strongest evidence, make it skimmable, and cut anything that isn't proof you can do *this* job.

## Lead with achievements, not duties

The most common resume mistake is listing responsibilities — what you were *supposed* to do — instead of accomplishments — what you actually *achieved*. Compare:

| Weak (duty) | Strong (achievement) |
| --- | --- |
| "Responsible for managing social media" | "Grew Instagram following 40% in 6 months, driving 1,200 leads" |
| "Handled customer support tickets" | "Resolved 50+ tickets/day at 95% satisfaction, cutting response time 30%" |
| "Worked on the checkout system" | "Rebuilt checkout flow, reducing cart abandonment 18%" |

The pattern is **action verb + what you did + quantified result.** Numbers are the single biggest upgrade most resumes can make: they turn vague claims into evidence. Even rough figures ("~15%", "dozens", "doubled") beat none, because they show you think in terms of impact.

## Tailor it to the job — and the screening software

Generic resumes lose to tailored ones. Read the job description, identify the skills and keywords it emphasizes, and make sure your resume reflects the ones you genuinely have — in the description's own words. This matters twice over: a human sees an obvious match, and many companies run resumes through automated screening (applicant tracking systems) that look for relevant terms. To survive the automated pass, keep formatting simple — standard section headings, no text buried in images, tables, or columns the parser may scramble. Clever design can literally make your experience invisible to the software.

## Cut ruthlessly

- **Length:** one page early-career, two pages with substantial experience. Longer signals an inability to prioritize.
- **The objective statement:** dated and space-wasting. A short summary of what you offer is fine; "seeking a challenging role" is not.
- **Ancient and irrelevant history:** the part-time job from 15 years ago rarely earns its space.
- **Obvious filler:** "hardworking team player," "proficient in Microsoft Word." Show, don't assert.

Every line should answer "does this make me more hireable for *this* role?" If not, it's diluting the lines that do.

## FAQ

**Do I need a different resume for every application?**
Not from scratch — keep a master version, then tailor the top third (summary, skills, lead bullets) to each role. The targeting is what converts; an hour of tailoring beats fifty generic sends.

**Should I include a photo, age, or marital status?**
In the US/UK/Canada, no — it invites bias and wastes space (norms differ by country; some regions expect a photo). When in doubt, lead with the work.

**How do I handle employment gaps?**
Don't hide them clumsily. Brief, honest framing (caregiving, study, a planned break, job searching) plus a focus on skills kept current is far better than suspicious date games. Most employers care more about what you can do now than a clean unbroken timeline.`,
  },
  {
    topicKey: 'job-interview-prep',
    title: 'How to Prepare for a Job Interview',
    question: 'How should I prepare for a job interview to actually perform well?',
    summary:
      'Interview success comes from preparation, not charisma: research the company, prepare stories that prove your skills using a structure like STAR, rehearse out loud, and treat it as a two-way conversation where you\'re also evaluating them.',
    tags: ['careers', 'job hunting', 'interviews', 'work'],
    language: 'en',
    image: {
      prompt:
        'Two glass chairs facing each other as equals across a calm glowing table, a balanced beam of light flowing both directions between them, a few prepared story-cards of light hovering ready beside one chair. ' +
        STYLE,
      alt: 'Two equal chairs with light flowing both ways and prepared story-cards waiting',
    },
    sources: [
      { title: 'U.S. Dept. of Labor CareerOneStop — Interview preparation', url: 'https://www.careeronestop.org/JobSearch/Interview/interview-preparation.aspx' },
      { title: 'MIT Career Advising — Behavioral interviews & STAR', url: 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/' },
    ],
    content: `# How to Prepare for a Job Interview

Interviews reward preparation far more than natural charm. The candidate who seems "naturally good" in the room is almost always the one who did invisible work beforehand: researched the company, mapped their own stories to the role, and rehearsed until the answers felt natural. You can't control the questions, but you can control how ready you are for the predictable ones — which is most of them.

## Research like you already work there

Before the interview, learn enough about the company to speak about it specifically: what it does, who its customers are, recent news, and how the role you're applying for fits. This pays off in two places — you'll answer "why do you want to work here?" with substance instead of flattery, and you'll ask sharper questions of your own. Generic enthusiasm reads as "I'll take any job"; specific knowledge reads as "I want *this* one."

## Prepare stories, not adjectives

Most interviews lean on **behavioral questions** — "tell me about a time you…" — because past behavior predicts future behavior better than self-description. The mistake is answering with traits ("I'm a great problem-solver"). Answer with a *story*, structured so it lands:

**STAR** keeps stories tight and complete:
- **Situation** — the context, briefly.
- **Task** — what you needed to achieve.
- **Action** — what *you* specifically did (not "we").
- **Result** — the outcome, quantified if possible.

Prepare 6–8 flexible stories from your experience covering common themes: a conflict, a failure and what you learned, a leadership moment, a tight deadline, a time you influenced without authority. Most behavioral questions are variations on these, so a handful of well-built stories covers a surprising range.

## Rehearse out loud — and prepare your own questions

Reading answers in your head is not rehearsal; saying them aloud is. Practicing out loud (to a friend, a camera, or an empty room) exposes the rambling and the gaps that silent review hides, and it makes the real thing feel familiar. Also prepare the standards — "tell me about yourself," "why this role," "your biggest weakness" — and a strong close: thoughtful questions for *them*. Asking about the team, the challenges, or what success looks like signals genuine interest and gives you the information to decide if you even want the job.

## FAQ

**How do I answer "what's your biggest weakness"?**
Pick a real but non-disqualifying weakness and, crucially, what you're doing about it. The point isn't the flaw — it's whether you have honest self-awareness and the drive to improve. Avoid the fake "I work too hard" answer; it fools no one.

**What if I don't know the answer to a technical question?**
Think out loud and show your reasoning rather than freezing or bluffing. Interviewers often care more about how you approach an unknown than whether you instantly know it. "I'm not sure, but here's how I'd figure it out" is a strong answer.

**It's an interview, but I'm also evaluating them — really?**
Yes, and the mindset helps you. Treating it as mutual — you're deciding whether this job suits you — reduces desperation, improves your questions, and reads as confidence. The best outcomes come from fit, not from "winning" a role that's wrong for you.`,
  },
  {
    topicKey: 'salary-negotiation',
    title: 'How to Negotiate Your Salary (Without Losing the Offer)',
    question: 'How do I negotiate salary effectively, and is it risky to ask for more?',
    summary:
      'Negotiating is expected, rarely costs you the offer, and compounds for your whole career. The keys: know your market rate, let the employer name a number first when you can, anchor with a researched range, and negotiate the whole package — not just base pay.',
    tags: ['careers', 'salary negotiation', 'money', 'work'],
    language: 'en',
    image: {
      prompt:
        'A balanced glass scale where one side holds a glowing figure representing value and skills, the other a stack of luminous coins, the two sides settling into equilibrium with a soft confident glow, room to add more coins visible. ' +
        STYLE,
      alt: 'A balance scale settling skills against coins with room to add more',
    },
    sources: [
      { title: 'U.S. Bureau of Labor Statistics — wage data by occupation', url: 'https://www.bls.gov/oes/' },
      { title: 'Harvard Program on Negotiation — salary negotiation research', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
    ],
    content: `# How to Negotiate Your Salary (Without Losing the Offer)

Most people accept the first number they're offered — and quietly leave money on the table for years, because raises and future offers often build on that starting figure. Negotiating feels risky and awkward, but the reality is reassuring: **employers expect it, an offer is very rarely rescinded over a polite, reasonable counter, and the upside compounds across your entire career.** A few thousand more at the start, grown over decades, is worth far more than the discomfort of one conversation.

## Know your number before you talk

The negotiator who's done their homework has quiet power. Before any discussion, research the **market rate** for the role — by title, location, industry, and your experience level — using salary data sites, public salary ranges, and people in your network. This gives you a defensible range instead of a hopeful guess, and it stops you from either lowballing yourself or naming something so far off it reads as naïve. Know three numbers: your realistic target, your "great outcome," and your walk-away floor.

## Let them go first — then anchor

When you can, **avoid being the first to name a number.** If asked your expectations early, it's fine to deflect: "I'd like to understand the role and the full package first — what range do you have budgeted?" The first concrete number anchors the negotiation, and you'd rather it be theirs. When you do name a figure, give a **researched range** with your target near the bottom of where you'd be happy, and tie it to value: "Based on my experience with X and the market for this role, I'm targeting Y."

## Negotiate the whole package, and stay collaborative

Base salary is the headline, but it's not the only lever — and sometimes not the most flexible one:

| Lever | When it helps |
| --- | --- |
| Signing bonus | Bridges a gap when base is capped |
| Equity / stock | Significant upside at startups and big tech |
| Vacation / flexibility | High personal value, low employer cost |
| Title / start date / review timing | Can be worth more than a small raise |
| Learning budget, remote allowance | Easy yeses that add real value |

Throughout, keep the tone **collaborative, not adversarial.** You're not fighting them; you're solving "how do we make this work?" together. A warm, specific, well-researched ask ("I'm excited about this role — can we get the base to Y?") almost never offends, and it signals exactly the kind of confidence employers want in the people they hire.

## FAQ

**Could asking for more cost me the offer?**
Very rarely, if you're polite and reasonable. Employers expect negotiation and have margin built in. A respectful counter on a real offer essentially never gets it pulled; the horror stories almost always involve aggressive ultimatums, not normal asks.

**What if they ask my current salary?**
In many places you can decline (and in some it's illegal for them to ask). Redirect to your target based on the role and market: "I'd rather focus on the value I'd bring to this position." Your old salary shouldn't cap your new one.

**Should I negotiate even if the offer is good?**
Usually worth a try — a single polite counter often yields more, and a "no" just lands you back at the original offer. The asymmetry favors asking. But once you've agreed, honor it; don't reopen a settled deal.`,
  },
  {
    topicKey: 'remote-work-effectively',
    title: 'How to Work Remotely Without Burning Out or Stalling Your Career',
    question: 'How do I stay productive, visible, and sane while working remotely?',
    summary:
      'Remote work trades commute and office friction for two new challenges: protecting the boundary between work and home, and staying visible when no one sees you working. Winning at it means deliberate communication, a hard stop to the day, and proactively surfacing your work.',
    tags: ['careers', 'remote work', 'productivity', 'work'],
    language: 'en',
    image: {
      prompt:
        'A calm glass home-desk island glowing warmly, connected by clear bright threads of light to several distant floating nodes representing teammates, a soft boundary line separating the lit work zone from a restful living zone. ' +
        STYLE,
      alt: 'A home-desk island linked by light to distant teammates, with a work/rest boundary',
    },
    sources: [
      { title: 'Stanford — Nicholas Bloom\'s research on remote work productivity', url: 'https://www.gsb.stanford.edu/faculty-research/working-papers' },
      { title: 'CDC / NIOSH — Work-life balance and remote work wellbeing', url: 'https://www.cdc.gov/niosh/index.html' },
    ],
    content: `# How to Work Remotely Without Burning Out or Stalling Your Career

Remote work removes obvious costs — commuting, office noise, constant interruptions — and quietly adds two subtler ones. First, the boundary between work and life dissolves when your office is your home, so the risk isn't slacking off; it's **never switching off.** Second, when no one physically sees you working, the natural visibility of an office disappears, and good work can go unnoticed. Thriving remotely means deliberately managing both.

## Protect the boundary

In an office, the commute and the act of leaving create a natural end to the workday. At home, that ritual is gone, and "just one more thing" can stretch the day indefinitely until weeknights and weekends blur into work. Rebuild the boundary on purpose:

- **A hard stop.** Decide when work ends and act it out — close the laptop, change clothes, leave the room. A small ritual signals "done" to your brain.
- **A dedicated space**, even a corner. Working from bed or the couch trains your brain to never fully rest *or* fully focus.
- **Real breaks.** Without colleagues pulling you to lunch, you'll skip breaks unless you schedule them. Step outside; move.

The counterintuitive truth: remote workers tend to *overwork*, not underwork. Guarding your off-hours isn't slacking — it's what keeps you productive across months instead of burning out in one.

## Communicate deliberately and stay visible

Offices communicate by osmosis — overheard context, hallway chats, visible busyness. Remote work has none of that, so you have to make communication **explicit**:

- **Over-communicate status.** Share what you're working on, what's blocked, and what you finished. Silence from a remote worker reads as absence, even when you're heads-down delivering.
- **Default to async and written.** Clear written updates beat hoping people noticed your work; they also create a record and respect people across time zones.
- **Make your impact legible.** This isn't bragging — it's replacing the visibility the office used to provide for free. Summarize outcomes, demo what you built, speak up in meetings. Out of sight quietly becomes out of mind at promotion time if you let it.

## Fight isolation

Remote work can be lonely, and loneliness erodes both wellbeing and motivation. Keep deliberate human contact: occasional video calls with no agenda, a virtual coffee, an in-person meetup when possible. Connection is a real input to sustainable remote work, not a nicety.

## FAQ

**Am I less likely to get promoted working remotely?**
There's a real risk of "proximity bias" — managers favoring people they see. You counter it by making your work and outcomes highly visible, building relationships intentionally, and having direct career conversations with your manager rather than assuming good work speaks for itself.

**How do I stop working all the time?**
Set a hard stop and enforce it with a ritual and physical separation (shut the laptop, leave the room, turn off notifications). Treat your end-of-day as non-negotiable as a meeting. The boundary won't appear on its own.

**Is remote work actually as productive?**
Research generally finds remote and hybrid workers are at least as productive on focused work, with hybrid arrangements often scoring highest on satisfaction and retention. The productivity question is usually less about location than about communication norms and management.`,
  },
  {
    topicKey: 'career-networking',
    title: 'Networking for People Who Hate Networking',
    question: 'How do I network effectively if I find traditional networking awkward?',
    summary:
      'Most jobs and opportunities flow through relationships, not applications — but effective networking isn\'t schmoozing. It\'s building genuine connections by being useful and curious, staying loosely in touch, and remembering that "weak ties" (acquaintances) open the most doors.',
    tags: ['careers', 'networking', 'job hunting', 'work'],
    language: 'en',
    image: {
      prompt:
        'A warm web of glass nodes connected by gentle threads of light, one node reaching out a soft helpful beam to another rather than pulling, the whole network glowing brighter where connections are reciprocal and genuine. ' +
        STYLE,
      alt: 'A warm web of nodes glowing brighter where connections are genuine and reciprocal',
    },
    sources: [
      { title: 'Mark Granovetter, "The Strength of Weak Ties" (1973)', url: 'https://www.jstor.org/stable/2776392' },
      { title: 'U.S. Dept. of Labor CareerOneStop — Networking', url: 'https://www.careeronestop.org/JobSearch/Network/network-with-people.aspx' },
    ],
    content: `# Networking for People Who Hate Networking

If "networking" makes you picture forced small talk and handing out business cards to strangers, you've been sold the worst version of a genuinely valuable thing. Here's the reframe: **networking is just building and maintaining real relationships** — and most opportunities (jobs, clients, collaborations, advice) travel through people who know you, not through cold applications. You don't have to become an extrovert. You have to become useful and reachable.

## Why acquaintances matter more than friends

One of sociology's most famous findings, Mark Granovetter's "strength of weak ties," explains why: your close friends mostly know the same people and opportunities you already know about. Your **weak ties** — former colleagues, classmates, acquaintances — move in different circles, so they're the ones who surface jobs and information you'd never otherwise hear about. This is liberating for the networking-averse: you don't need to forge deep bonds with everyone. A wide, lightly-maintained web of acquaintances is exactly what opens doors.

## Give before you ask

The networking that feels gross is transactional — only reaching out when you need something. The networking that works is the opposite: **be useful first.** Share an article someone would value, make an introduction, offer help, congratulate a win, answer a question in your area. These small, genuine acts build goodwill with no agenda, so that when you *do* need something later, you're a real contact rather than a stranger with a request. Generosity, not charm, is the engine.

Curiosity carries the rest. The anxiety of networking usually comes from feeling you have to impress; replace it with genuine interest in the other person — what they work on, what they're figuring out. People remember those who were interested in *them*, and curiosity is far easier to sustain than performance.

## Stay loosely in touch (the part everyone skips)

Most people network only when job-hunting, which is the worst time — desperate and one-directional. The durable approach is **light, ongoing contact**: a message every few months, a comment on someone's work, the occasional catch-up. It costs little and means that when you need a referral or advice, you're reaching out to a warm relationship, not resurrecting a cold one. A two-line "saw this and thought of you" keeps a connection alive for years.

## FAQ

**I'm introverted — am I just bad at this?**
No. Introverts often network *better* one-on-one, where depth and listening beat working a room. Skip the big mixers if you hate them; build a smaller number of real relationships through coffee chats, online communities, and shared interests. Quality beats volume.

**How do I ask for help without feeling like I'm using people?**
Be specific, make it easy to say no, and respect their time ("Could I ask two questions about X? Totally fine if you're swamped"). Specific, modest, opt-out-friendly requests feel like a compliment, not an imposition — and most people genuinely like to help when asked well.

**Does online networking count?**
Absolutely — thoughtful participation in professional communities, sharing useful work, and genuine comments build real relationships and reach. For many people it's less draining and more effective than in-person events.`,
  },
  {
    topicKey: 'changing-careers',
    title: 'How to Change Careers (Without Starting From Zero)',
    question: 'How do I switch to a new career field, and will I have to start over?',
    summary:
      'Career changes rarely mean starting from scratch — most of your skills transfer. The path is to identify those transferable skills, close specific gaps deliberately, build proof through projects, and tell a clear story about why the switch makes sense.',
    tags: ['careers', 'career change', 'skills', 'work'],
    language: 'en',
    image: {
      prompt:
        'A figure of light crossing a glowing bridge between two islands, carrying a bundle of bright transferable-skill shapes, the bridge built from those same glowing shapes, the destination island lighting up as they approach. ' +
        STYLE,
      alt: 'A figure crossing a bridge built from transferable skills toward a new island',
    },
    sources: [
      { title: 'U.S. Bureau of Labor Statistics — Occupational Outlook Handbook (transferable skills, outlook)', url: 'https://www.bls.gov/ooh/' },
      { title: 'CareerOneStop — Skills assessment and career change tools', url: 'https://www.careeronestop.org/' },
    ],
    content: `# How to Change Careers (Without Starting From Zero)

The fear that stops most career changers is "I'll have to start over at the bottom." It's usually false. Unless you're switching into something highly technical and credential-gated (like medicine or law), **most of what you've built transfers** — the trick is recognizing it, framing it, and filling only the specific gaps that remain. A career change is a bridge, not a cliff.

## Inventory your transferable skills

Skills come in two kinds. **Domain skills** are field-specific (knowing tax law, writing Python). **Transferable skills** travel anywhere: communication, project management, analysis, leadership, problem-solving, working with customers, managing budgets. Most of your value lives in the transferable pile, and it follows you into a new field. A teacher moving into corporate training carries presentation skills, curriculum design, and managing a room; a journalist moving into marketing carries research, writing, and hitting deadlines. Before anything else, list what you actually do well independent of your current title — that's your starting capital.

## Close the gap deliberately, then prove it

Once you know the target role, identify the **specific** skills or knowledge it requires that you don't yet have — not "everything," just the genuine gaps. Then close them on purpose: a focused course, a certification where it genuinely matters, or learning by doing. Crucially, **build proof.** In most fields, demonstrated ability beats credentials: a portfolio piece, a freelance project, a volunteer role, a side project, or a contribution to an open community shows you can do the new work, not just claim interest in it. Proof is what converts a hopeful applicant into a credible one.

## Tell a coherent story

Career changers lose interviews not on capability but on a confusing narrative. Employers worry: "Why the switch? Will they stick? Can they really do this?" Pre-empt it with a clear story that frames the change as logical progression, not flight: what drew you to the new field, what connects it to your past, and why your unusual background is an *asset*, not a liability. "My years in sales taught me exactly what customers struggle with, which is why I moved into product" beats an apologetic "I just wanted something different." Your mixed background is a feature — frame it as one.

## FAQ

**Will I have to take a pay cut?**
Sometimes, especially moving into an entirely new field at a more junior level — but not always, and rarely back to zero. Strong transferable skills, proof of ability, and good negotiation limit the dip, and the long-term trajectory in work you're better suited to often more than recovers it.

**Am I too old to change careers?**
People change careers successfully at every age. Experience and maturity are assets employers value; your transferable skills and track record of getting things done don't expire. The bigger risk is usually staying somewhere that's wrong for you out of fear.

**Do I need to go back to school?**
Often no. Formal re-education matters for licensed fields (healthcare, law, engineering), but for many roles, targeted courses plus a portfolio of real work get you there faster and cheaper. Reach for a degree only when the field genuinely gates on it.`,
  },
  {
    topicKey: 'work-burnout',
    title: 'Burnout: What It Really Is and How to Recover',
    question: 'What is burnout, how is it different from ordinary stress, and how do I recover?',
    summary:
      'Burnout is chronic workplace stress that has overwhelmed your ability to cope — marked by exhaustion, cynicism, and reduced effectiveness. It\'s a systemic problem, not personal weakness, and recovering usually requires changing conditions, not just resting harder.',
    tags: ['work', 'burnout', 'mental health', 'wellbeing'],
    language: 'en',
    image: {
      prompt:
        'A glass lantern whose flame has burned low and guttering, being gently restored not by forcing it brighter but by removing heavy weights pressing on it and opening vents for air, the flame steadying into a warm calm glow. ' +
        STYLE,
      alt: 'A guttering lantern restored by removing weights and letting air in, not by forcing it',
    },
    sources: [
      { title: 'World Health Organization — Burn-out as an occupational phenomenon (ICD-11)', url: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases' },
      { title: 'Maslach & Leiter — research on burnout dimensions', url: 'https://www.apa.org/monitor/2022/01/special-burnout-stress' },
    ],
    content: `# Burnout: What It Really Is and How to Recover

Burnout is more than "I'm tired" or "this week was rough." The World Health Organization defines it specifically as a syndrome resulting from **chronic workplace stress that has not been successfully managed.** It has three signatures: deep **exhaustion** (physical and emotional depletion), **cynicism** (growing detachment or negativity toward your job), and a sense of **reduced effectiveness** (feeling you're no longer doing good work, however hard you try). If that triad sounds familiar, it's worth taking seriously — and worth knowing it's a recognized occupational phenomenon, not a character flaw.

## Stress vs burnout — an important difference

Ordinary stress is "too much" — too many demands, but you can still imagine relief on the other side. Burnout is "empty" — you're depleted, disengaged, and a weekend off no longer recharges you. Stress feels like drowning in responsibilities; burnout feels like being dried up and beyond caring. The distinction matters because the fixes differ: stress may ease with better time management or a break, while genuine burnout usually requires changing the **conditions** that caused it, not just resting harder and returning to the same grind.

## It's usually the situation, not you

The most important reframe: burnout is largely driven by **the work environment**, not personal weakness. Research consistently links it to specific conditions:

| Driver | What it looks like |
| --- | --- |
| Unsustainable workload | Chronic overload with no recovery |
| Lack of control | No say over how or when you work |
| Insufficient reward | Effort unrecognized, underpaid, unseen |
| Unfairness | Favoritism, broken trust, inconsistency |
| Values conflict | Being asked to act against your principles |
| Breakdown of community | Isolation, conflict, no support |

Notice these are mostly *organizational*, not individual. That's why "just do yoga and sleep more" so often fails as a cure — self-care can help you cope, but it can't fix a fundamentally unsustainable job. Recovering frequently means renegotiating workload, boundaries, role, or sometimes the job itself.

## Recovering

Real recovery tends to combine the personal and the structural: genuine rest and disconnection to refill the tank; reasserting boundaries (saying no, protecting off-hours); reconnecting to what gave the work meaning; and — often the decisive step — **changing the conditions**, whether by talking to your manager about workload and control, restructuring your role, or moving on. Support matters too: burnout thrives in isolation, and talking to people (including a professional if it's severe) is part of the way out, not an admission of failure.

## FAQ

**Can I recover from burnout without quitting my job?**
Often yes — if the underlying drivers can change. Renegotiating workload, gaining more control, setting firmer boundaries, and shifting your role can be enough. But if the conditions are fixed and toxic, sometimes leaving is the healthiest and most rational choice, not a defeat.

**Is burnout the same as depression?**
They overlap and can co-occur, but burnout is specifically tied to work, while depression is broader and pervades all of life. Persistent low mood, hopelessness, or thoughts of self-harm go beyond burnout and warrant professional help promptly.

**Will a vacation fix it?**
A break can relieve acute exhaustion, but if you return to the exact conditions that drained you, burnout usually returns within weeks. Rest treats the symptom; changing the conditions treats the cause.`,
  },
  {
    topicKey: 'cover-letter',
    title: 'Do Cover Letters Still Matter — and How to Write a Good One?',
    question: 'Are cover letters still worth writing, and what should one actually say?',
    summary:
      'Cover letters are often optional now but still tip close decisions when done well. A good one isn\'t a resume in prose — it makes a specific case for why you and this role fit, shows you understand the company, and adds context the resume can\'t.',
    tags: ['careers', 'job hunting', 'cover letter', 'work'],
    language: 'en',
    image: {
      prompt:
        'A glass letter unfolding to reveal a single focused bright beam connecting a glowing person-shape on one side to a glowing company-emblem on the other, a clear specific link rather than a wall of text. ' +
        STYLE,
      alt: 'A letter unfolding into one focused beam linking a person to a company',
    },
    sources: [
      { title: 'Harvard Office of Career Services — Cover letters guide', url: 'https://careerservices.fas.harvard.edu/resources/create-a-strong-cover-letter/' },
      { title: 'CareerOneStop — Cover letter basics', url: 'https://www.careeronestop.org/JobSearch/Resumes/cover-letters.aspx' },
    ],
    content: `# Do Cover Letters Still Matter — and How to Write a Good One?

The honest answer on whether cover letters still matter: **it depends, and they're optional more often than they used to be** — but a strong one still tips close calls in your favor, and a weak or absent one can cost you when a hiring manager is deciding between similar candidates. Treat the cover letter as a high-leverage option: skip it where it's genuinely unwanted, invest in it where it can differentiate you.

## What a cover letter is actually for

The biggest mistake is writing a cover letter that just restates the resume in paragraphs. The resume already lists *what* you've done; the cover letter's job is to make the **argument** the resume can't — specifically, *why you and this role are a strong match.* A good one does three things the resume doesn't:

- **Shows you understand the company and role** — specific, not generic flattery — proving you actually want *this* job.
- **Connects your experience to their needs** — "you need X; here's the time I delivered exactly that."
- **Adds context** the resume can't carry — a career change explained, a gap addressed, unusual enthusiasm for a specific mission.

## A simple, effective structure

| Part | Job |
| --- | --- |
| **Opening** | Hook them — why this role/company specifically, not "I am writing to apply for…" |
| **Middle (1–2 paragraphs)** | Your strongest, most relevant evidence tied to *their* needs, with a concrete example |
| **Close** | Reaffirm fit, brief and confident, with a clear next step |

Keep it to **one page, three or four tight paragraphs.** Address a real person if you can find one. Lead with something specific and energetic; the generic "I am writing to express my interest in the position" opening wastes your single best line. And tailor every letter — a recycled, find-and-replace letter is often worse than none, because the seams show.

## When to bother (and when not to)

Write a genuine cover letter when: the application asks for one, you're a career changer or have a gap to explain, you're especially passionate about that specific company, or it's a competitive role where any edge helps. Skip or minimize it when the form makes it clearly optional and you have nothing to add beyond the resume — a phoned-in letter adds nothing and can subtract. The rule: write one when you have a *real, specific case* to make; don't pad when you don't.

## FAQ

**Should I use AI to write my cover letter?**
As a drafting aid, fine — but generic AI output reads as generic, which is exactly the failure mode to avoid. Use it to start, then make it specific: real details about the company, real examples from your life, your actual voice. The specificity is the whole point, and only you have it.

**How formal should it be?**
Match the company's culture — a polished tone for a law firm, a warmer one for a casual startup — but always professional and error-free. A single typo in a short, deliberate document stands out badly.

**What if I can't find the hiring manager's name?**
"Dear Hiring Team" or "Dear [Department] Team" is fine. Avoid the dated "To Whom It May Concern." A little research (the company site, LinkedIn) sometimes surfaces a name and the small effort can show.`,
  },
  {
    topicKey: 'asking-for-raise',
    title: 'How to Ask for a Raise (and Actually Get One)',
    question: 'How do I ask for a raise, and what gives me the best chance of getting yes?',
    summary:
      'Getting a raise is a case you build, not a favor you request. Document your impact, research your market value, time the ask well, and frame it around the value you deliver — then ask directly and specifically rather than hoping it\'s noticed.',
    tags: ['careers', 'salary', 'raise', 'work'],
    language: 'en',
    image: {
      prompt:
        'A glowing bar chart of accumulated achievement blocks stacking steadily higher, a hand of light placing one more block on top while a value-arrow rises alongside, confident upward momentum on a clean background. ' +
        STYLE,
      alt: 'Stacked achievement blocks rising with a value-arrow as one more is added',
    },
    sources: [
      { title: 'Harvard Program on Negotiation — asking for a raise', url: 'https://www.pon.harvard.edu/category/daily/salary-negotiations/' },
      { title: 'U.S. Bureau of Labor Statistics — wage and earnings data', url: 'https://www.bls.gov/bls/wages.htm' },
    ],
    content: `# How to Ask for a Raise (and Actually Get One)

Waiting quietly to be rewarded for good work is the most common raise strategy, and one of the worst. Managers are busy, budgets are finite, and the squeaky-but-reasonable wheel gets the grease. The reframe that changes everything: **a raise is a business case you build and present, not a personal favor you ask for.** Your job is to make saying yes easy and well-justified for your manager — and that takes preparation, not nerve alone.

## Build the case: document your impact

Long before the conversation, keep a running record of your **accomplishments and impact** — projects delivered, problems solved, revenue influenced, costs cut, responsibilities grown beyond your original role. Specifics with numbers are your evidence: "I led the project that brought in X" or "I took on the duties of the departed senior role for six months." Memory is unreliable and self-serving recollection is unconvincing; a concrete record lets you walk in with proof rather than feelings. The strongest case shows you're already operating above your current pay.

## Know your market value and time it well

Pair your internal case with **external data**: what does this role pay elsewhere, for your experience and location? If you're being paid below market for what you deliver, that's a powerful, objective argument. On **timing**, your odds rise at natural moments — after a clear win, at a review cycle, when you've taken on more, or when the company is doing well. Avoid asking right after the team missed targets, during a hiring freeze, or when your manager is visibly underwater. Reading the moment is part of the ask.

## Make the ask: direct, specific, value-framed

When the moment comes, be **direct and specific.** Don't hint or hope it's inferred — clearly state that you'd like to discuss your compensation, present your case (impact + market data), and name a specific number or range. Frame it around **value, not need**: "Based on my contributions and the market for this role, I'd like to bring my salary to Y," not "I have rising expenses." Then stop talking and let them respond. If the answer is "not now," turn it into progress: ask exactly what would need to be true to earn it, and by when — converting a no into a concrete roadmap.

## FAQ

**What if they say no?**
Don't treat it as the end. Ask what specific results or timeline would make a yes possible, and get it in writing if you can. A clear path ("hit these targets, revisit in six months") is a win. If the honest answer is "never," that's important information about whether to stay.

**Should I mention a competing offer?**
Only if it's real and you'd genuinely consider taking it — bluffing can backfire badly. A real offer is leverage, but using it can also shift the relationship, and some managers will let you walk. Weigh it carefully rather than wielding it casually.

**Is it better to switch jobs for a raise?**
Often external moves yield bigger jumps than internal raises, which is worth knowing — but switching has costs (risk, ramp-up, lost tenure). Use the knowledge to value yourself accurately; let it inform your internal ask before you decide leaving is the only path.`,
  },
  {
    topicKey: 'imposter-syndrome',
    title: 'Imposter Syndrome: Why Capable People Feel Like Frauds',
    question: 'What is imposter syndrome, why is it so common, and how do I deal with it?',
    summary:
      'Imposter syndrome is the persistent feeling of being a fraud despite real competence, common precisely among capable people. It feeds on attributing success to luck and fearing exposure — and it eases when you collect evidence, normalize it, and act despite the doubt.',
    tags: ['work', 'imposter syndrome', 'confidence', 'wellbeing'],
    language: 'en',
    image: {
      prompt:
        'A capable figure of light casting a small distorted shadow of a tiny fraudulent figure, while a gentle mirror nearby reflects their true bright accomplished form, the real and the feared self shown side by side. ' +
        STYLE,
      alt: 'A capable figure with a shrunken distorted shadow beside a mirror showing their true form',
    },
    sources: [
      { title: 'Clance & Imes, "The Imposter Phenomenon in High Achieving Women" (1978)', url: 'https://psycnet.apa.org/record/1979-26502-001' },
      { title: 'American Psychological Association — Imposter phenomenon overview', url: 'https://www.apa.org/monitor/2021/06/cover-impostor-phenomenon' },
    ],
    content: `# Imposter Syndrome: Why Capable People Feel Like Frauds

Imposter syndrome is the persistent, nagging sense that you're a fraud who's fooled everyone — that you don't really deserve your role, and any moment now you'll be "found out" — *despite* clear evidence of your competence. The cruelest part is the paradox: it strikes capable, accomplished people most, because feeling like an imposter requires having achieved enough to feel you might not deserve. First described in 1978 (originally studying high-achieving women, though it's now known to affect people of every kind), it's extraordinarily common — most people feel it at some point, especially when stretching into something new.

## Why it persists: the thinking traps

Imposter feelings run on a few self-defeating mental habits:

- **Discounting success.** When things go well, you credit luck, timing, or "they just like me" — anything but your own ability. Wins never update your self-image.
- **Owning failure.** When things go badly, *that* you attribute squarely to yourself. So evidence only ever flows one way: toward "I'm not good enough."
- **Comparing your inside to others' outside.** You measure your private doubts against everyone else's polished surface, never seeing that they're often faking confidence too.
- **Moving the goalposts.** Each achievement is redefined as "not really that hard" the moment you reach it, so you never feel you've genuinely succeeded.

Together these create a closed loop where no amount of accomplishment ever feels like enough — which is why high achievers can feel it most acutely.

## What actually helps

You rarely *think* your way out of imposter feelings, but you can loosen their grip:

| Approach | Why it works |
| --- | --- |
| Keep an evidence file (wins, praise, results) | Counters the brain's habit of discounting success |
| Name it and talk about it | Discovering peers feel the same breaks the isolation |
| Separate feelings from facts | "I feel like a fraud" is not "I am a fraud" |
| Reframe doubt as growth | Feeling stretched usually means you're learning, not failing |
| Act despite the feeling | Confidence often follows action; waiting to feel ready rarely works |

The single most freeing reframe: **the feeling is not evidence.** Feeling like a fraud says nothing about whether you actually are one — and the fact that you worry about being good enough is itself a sign of conscientiousness, not fraudulence. (Genuine frauds, notably, rarely worry about it.)

## FAQ

**Does imposter syndrome ever fully go away?**
For most people it recurs, especially with each new challenge or level — which is normal and even a sign you're growing. The goal isn't to eliminate it but to stop letting it run the show: feel the doubt, and proceed anyway.

**Is some self-doubt actually healthy?**
Yes. A little humility keeps you learning, open to feedback, and free of arrogance. The problem is only when doubt becomes chronic and paralyzing — holding you back from opportunities, speaking up, or asking for what you've earned.

**How do I support someone with imposter syndrome?**
Be specific in your appreciation — "your analysis caught a real problem" lands better than "you're great." Normalize it by sharing your own doubts, and gently challenge their discounting of their wins. Knowing a respected colleague feels it too is often the most reassuring thing of all.`,
  },
];
