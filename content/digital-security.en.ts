import type { DraftArticle } from './types';
import { EDITORIAL_STYLE as STYLE } from './editorial-style';

// Batch: Digital Privacy & Security (English originals). Quality-tier editorial
// cluster giving non-experts the mental models behind everyday security
// decisions — what actually protects them and what's theater. Seeded via
// scripts/seed-editorial.ts; zh variants in digital-security.zh.ts share heroes.

export const digitalSecurityEn: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Why You Should Use a Password Manager',
    question: 'What is a password manager, and is it really safer than remembering my passwords?',
    summary:
      'A password manager generates and stores a unique strong password for every account behind one master password, so a breach of one site can\'t unlock the rest. It is the single highest-impact security habit for most people.',
    tags: ['security', 'privacy', 'passwords', 'digital safety'],
    language: 'en',
    image: {
      prompt:
        'A single glowing master key of light unlocking a translucent glass vault that holds hundreds of small, all-different uniquely-shaped luminous keys neatly organized in rows, soft secure glow. ' +
        STYLE,
      alt: 'One master key opening a vault of hundreds of unique keys',
    },
    sources: [
      { title: 'NIST — Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — Use Strong Passwords / password managers', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Why You Should Use a Password Manager

The core problem a password manager solves is **reuse**. No human can remember a hundred different strong passwords, so people reuse a handful — which means the moment any one site is breached, attackers take that email-and-password pair and try it on your bank, your email, and everywhere else. This automated attack (called credential stuffing) is one of the most common ways accounts get taken over. A password manager kills it at the root by giving every single account its own unique, random password.

## How it works

A password manager is an encrypted vault. You remember exactly **one** strong master password; it remembers everything else:

- **Generates** long random passwords (e.g. \`v8#mQ2!pLx9$\`) you never have to type or recall.
- **Stores** them encrypted, locked by your master password.
- **Autofills** the right credential on the right site — which, as a bonus, resists phishing, because it won't fill your real bank password into a look-alike fake domain.

The vault is encrypted so that even the company providing the manager can't read your passwords — a property called zero-knowledge. Your master password never leaves your device in usable form.

## The objection, answered

The instinctive worry is "isn't putting all my passwords in one place dangerous?" It feels risky, but the math runs the other way:

| Without a manager | With a manager |
| --- | --- |
| Few passwords, heavily reused | Unique password per site |
| One breach → many accounts fall | One breach → one account, contained |
| Weak, memorable choices | Long, random, uncrackable choices |
| Passwords typed into phishing sites | Autofill refuses wrong domains |

Yes, the master password is a single point of failure — so you protect *it* well (long passphrase, plus two-factor on the manager itself) and accept that defending one secret fiercely beats defending a hundred badly.

## Choosing and starting

Reputable managers — both well-reviewed cloud services and respected offline/open-source options — are all dramatically better than reuse. Practical guidance:

- **Master password**: make it a long passphrase of random words, unique, never used anywhere else. This is the one you actually memorize.
- **Turn on two-factor** for the manager account itself.
- **Migrate gradually**: let it import existing passwords, then change the reused ones on important accounts first (email, banking, primary shopping).
- **Even the browser's built-in one** beats reuse — the key behavior is unique passwords everywhere, not the specific brand.

## FAQ

**What if I forget my master password?**
With true zero-knowledge encryption, the provider usually can't recover it — that's the point. Set up the manager's recovery options (emergency kit, recovery code) when you start, and store that offline.

**Is the cloud sync safe?**
The vault syncs already encrypted, so the sync server only ever holds an unreadable blob. The encryption, not the network, is what protects it.

**Are browser-saved passwords good enough?**
They're far better than reuse and fine for many people. Dedicated managers add cross-browser use, secure sharing, breach alerts, and stronger isolation — worth it as your account list grows.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Two-Factor Authentication: Which Type Is Actually Safe?',
    question: 'What is two-factor authentication, and why is SMS the weakest version?',
    summary:
      'Two-factor authentication adds a second proof beyond your password, so a stolen password alone isn\'t enough. But the types aren\'t equal: SMS codes can be intercepted or SIM-swapped, while authenticator apps and hardware keys are far stronger.',
    tags: ['security', 'two-factor', 'authentication', 'digital safety'],
    language: 'en',
    image: {
      prompt:
        'A glass doorway guarded by two sequential glowing checkpoints: the first a key of light, the second a separate floating token emitting a rotating code-like pattern of light, both required to pass through into a calm secure space. ' +
        STYLE,
      alt: 'A doorway requiring both a key and a separate rotating token of light',
    },
    sources: [
      { title: 'NIST — Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA — More Than a Password (multi-factor authentication)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Two-Factor Authentication: Which Type Is Actually Safe?

Two-factor authentication (2FA, or more broadly MFA) means logging in requires **two different kinds of proof**: something you *know* (your password) plus something you *have* (a code, an app, a physical key). The point is resilience — even if an attacker steals your password through a breach or phishing, they still can't get in without the second factor. Turning it on is one of the most effective things you can do. But the second factor comes in several forms, and they are very much not equal in strength.

## The ladder, weakest to strongest

| Method | How it works | Weakness |
| --- | --- | --- |
| **SMS code** | A code texted to your phone | SIM-swap, network interception, phishable |
| **Authenticator app** | App generates a 6-digit code that rotates every 30s | Phishable if you type it into a fake site |
| **Push approval** | "Approve this login?" prompt on your phone | "Fatigue" attacks — spamming until you tap yes |
| **Hardware security key / passkey** | A physical key or device-bound credential, cryptographically tied to the real site | Resists phishing by design |

Everything on this list beats password-only. But the rungs matter.

## Why SMS is the weak rung

Texted codes were the first mass-market 2FA and remain common, but they have real, exploited weaknesses:

- **SIM swapping**: an attacker convinces (or bribes) your mobile carrier to move your number to their SIM, and your codes now arrive on *their* phone. This is a documented, repeated way high-value accounts get drained.
- **Interception**: the underlying phone-network signaling has known flaws that can divert texts.
- **Still phishable**: a fake login page can simply ask you for the SMS code and relay it in real time.

The honest verdict: **SMS 2FA is much better than nothing** — keep it where it's the only option — but move important accounts (email, finance, primary identity) up the ladder.

## What to actually use

- **Default to an authenticator app** (rotating codes) — free, easy, immune to SIM-swaps, and supported almost everywhere.
- **For your most critical accounts, use a hardware key or passkey** — these are *phishing-resistant*: the credential is cryptographically bound to the genuine website, so it simply won't authenticate to a look-alike, defeating the attack that beats every code-based method.
- **Protect your email first.** It's the master key — password resets for everything else flow through it, so it deserves your strongest factor.

## FAQ

**Is any 2FA better than none?**
Yes, decisively. Even SMS blocks the overwhelming majority of automated attacks. Don't let "SMS is weak" talk you out of enabling it where it's all that's offered.

**What happens if I lose my phone / key?**
Save the backup/recovery codes each service offers when you enroll, and register a second factor (a backup key, or the app on a second device). Store recovery codes offline.

**Are push "approve" prompts safe?**
Good, but vulnerable to fatigue attacks — endless prompts hoping you tap "approve" to make it stop. Never approve a login you didn't start; prefer number-matching prompts where offered.`,
  },
  {
    topicKey: 'passkeys',
    title: 'What Are Passkeys, and Are They Replacing Passwords?',
    question: 'What is a passkey, and how is it different from a password?',
    summary:
      'A passkey replaces the password with a cryptographic key pair split between the website and your device — nothing secret is typed or shared, so there is nothing to phish, reuse, or steal in a breach. It is the industry\'s designated successor to passwords.',
    tags: ['security', 'passkeys', 'authentication', 'passwords'],
    language: 'en',
    image: {
      prompt:
        'Two interlocking halves of a glowing geometric key floating apart: one half resting inside a personal glass device, the other inside a distant server orb, a beam of light proving they match without the halves ever touching or merging. ' +
        STYLE,
      alt: 'Two matching key halves proving they fit without ever touching',
    },
    sources: [
      { title: 'FIDO Alliance — Passkeys overview', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST — Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# What Are Passkeys, and Are They Replacing Passwords?

A passkey is a login credential designed to fix the password's two original sins: passwords are **shared secrets** (you and the site both know the same string, so it can be stolen from either side) and they are **typed** (so they can be phished or reused). A passkey is neither shared nor typed. It's built on public-key cryptography, and once you understand the split, the security benefits are obvious.

## The key-pair idea, in plain terms

When you create a passkey, your device generates a **pair** of mathematically linked keys:

- A **private key** that never leaves your device (phone, laptop, or security key), protected by your fingerprint, face, or device PIN.
- A **public key** that is handed to the website.

The public key isn't a secret — it can't be used to impersonate you. To log in, the site sends a challenge; your device proves it holds the matching private key *without ever revealing it*. Nothing secret crosses the network, and nothing reusable is ever stored on the server.

## Why this defeats the common attacks

| Attack | Against passwords | Against passkeys |
| --- | --- | --- |
| Database breach | Steals (hashed) passwords | Steals only public keys — useless to attackers |
| Phishing | Fake site captures what you type | Nothing to type; key is bound to the real domain |
| Reuse | One leak unlocks many sites | Each passkey is unique and site-specific by design |
| Credential stuffing | Works en masse | Nothing to stuff |

The phishing resistance is the headline. A passkey is cryptographically tied to the genuine website's identity, so a look-alike domain literally cannot trigger it — closing the gap that even authenticator-app codes leave open.

## Using them today

In practice, a passkey usually feels like **unlocking your phone**: a prompt appears, you confirm with fingerprint or face, you're in — no password, no code to copy. Passkeys typically sync through your device ecosystem (so a new phone keeps them) or live on a hardware security key for the highest assurance. Adoption is broad and growing across major platforms and large websites, though it's mid-transition: most sites that offer passkeys still keep passwords as a fallback.

## FAQ

**What if I lose my device?**
Synced passkeys are recoverable through your platform account on a new device (protected by its own strong security). For device-bound keys, register a second passkey or keep a backup method — same discipline as 2FA recovery.

**Can a company with a breach leak my passkey?**
No — the server only holds your public key, which is not a secret and can't log in as you. This is the structural advantage over password databases.

**Do I still need a password manager?**
For now, yes — passkeys are rolling out gradually, so you'll have a mix for years. Many password managers already store passkeys too, becoming a unified vault for both.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'How to Recognize Phishing and Online Scams',
    question: 'How can I recognize a phishing email or scam message before it tricks me?',
    summary:
      'Phishing manufactures urgency to make you act before you think — a fake alert, a too-good offer, a "verify now" link. The defenses are habits, not gadgets: slow down, check the real sender and link, and never enter credentials from a message\'s link.',
    tags: ['security', 'phishing', 'scams', 'digital safety'],
    language: 'en',
    image: {
      prompt:
        'A glowing fishing hook disguised as a friendly glass envelope drifting through dark water toward a calm bright fish of light that pauses, illuminated by a protective ring, choosing not to bite. ' +
        STYLE,
      alt: 'A disguised hook approaching a fish that pauses within a protective ring',
    },
    sources: [
      { title: 'CISA — Recognize and report phishing', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC — How to recognize and avoid phishing scams', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# How to Recognize Phishing and Online Scams

Phishing is a confidence trick wearing a technical costume. The attacker doesn't break your encryption — they get *you* to hand over a password, a code, or money, by impersonating someone you trust and engineering a moment where you act on emotion instead of judgment. Because it targets human reflexes, the defense is also human: a few habits that reliably break the trick. The single most useful one is recognizing the emotion being manufactured.

## The universal tell: manufactured urgency

Almost every scam needs you to act *fast*, before the thinking part of your brain catches up. The emotional levers are a short list:

- **Fear**: "Your account will be suspended," "suspicious login detected," "unpaid tax — act now."
- **Greed**: "You've won," "claim your refund," "investment doubling weekly."
- **Authority**: a message "from" your bank, boss, a delivery company, or the government.
- **Curiosity/helpfulness**: "Is this you in this photo?", "I need a quick favor."

When a message makes your heart rate rise and pushes you to click, pay, or share *immediately*, that pressure itself is the warning sign — legitimate organizations don't operate on "respond in the next 10 minutes or else."

## The concrete checks

| Check | What to look for |
| --- | --- |
| **Sender address** | Hover/expand it — \`service@paypa1.com\` ≠ \`paypal.com\`. Display names lie. |
| **The actual link** | Hover (don't click) to see the real destination; look for look-alike domains |
| **Generic greeting** | "Dear customer" from a company that knows your name |
| **Unexpected attachments** | Invoices/receipts you didn't expect — a classic malware delivery |
| **Requests for secrets** | Real institutions never ask for your password, full PIN, or a 2FA code |
| **Pressure + secrecy** | "Don't tell anyone," "urgent wire," gift-card payment — all huge red flags |

## The two rules that prevent most losses

1. **Never log in through a link in a message.** If an email says there's a problem with an account, don't click — open a new tab and type the address yourself (or use your bookmark/app). This single habit defeats most credential phishing, because the fake site never gets a chance.

2. **Verify out-of-band for anything involving money or secrets.** "Boss" asking for a wire or gift cards, "bank" asking you to "move money to a safe account," a relative in sudden trouble — stop and confirm through a *separate, known* channel (call the official number, not the one in the message). Urgency plus an unusual payment method is the signature of a scam.

## FAQ

**The message looks perfect — logo, formatting, my name. Is it still safe to doubt?**
Yes. Convincing visuals are trivial to copy, and personal details leak from breaches. Judge by the *request* (urgency, secrets, payment) and verify independently, not by how polished it looks.

**I clicked a link / entered my password. What now?**
Act fast: change that password (and anywhere it was reused) from a known-good device, enable 2FA, watch for unauthorized activity, and contact the real institution. Speed limits the damage.

**Are phone calls and texts phishing too?**
Yes — "vishing" (voice) and "smishing" (SMS) use the same playbook, and AI voice cloning makes calls more convincing. The same rule holds: hang up and call back on an official number you looked up yourself.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'What a VPN Actually Does (and Doesn\'t Do)',
    question: 'What does a VPN really protect, and do I actually need one?',
    summary:
      'A VPN encrypts your traffic to a server that hides your IP address and shields you on untrusted networks. It is not blanket anonymity or security — HTTPS already protects most data, and a VPN moves your trust to the VPN provider rather than removing it.',
    tags: ['security', 'privacy', 'vpn', 'networking'],
    language: 'en',
    image: {
      prompt:
        'A glowing stream of light traveling from a glass device through a sealed translucent protective tube that hides its color and origin, emerging from a distant relay orb recolored and anonymized, while the outside world sees only the opaque tube. ' +
        STYLE,
      alt: 'Data traveling through a sealed tube that hides its origin until a distant relay',
    },
    sources: [
      { title: 'EFF — Surveillance Self-Defense: VPNs', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA — guidance on secure connections', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# What a VPN Actually Does (and Doesn't Do)

A VPN (virtual private network) builds an encrypted tunnel from your device to a server run by the VPN provider; your traffic exits to the internet from *there*, wearing that server's IP address instead of yours. That's the whole mechanism — and from it follow both the genuine benefits and a pile of marketing overclaims. The most useful thing to understand is that a VPN **relocates your trust**; it doesn't eliminate the need for it.

## What it genuinely does

- **Hides your IP address** from the websites you visit — they see the VPN server's location, not your home or city. Useful for reducing one form of tracking and for not exposing your network identity.
- **Encrypts traffic on the local network** — on sketchy public WiFi, the café, airport, or hotel network (and anyone snooping it) sees only an encrypted tunnel, not what you're doing.
- **Hides your activity from your internet provider** — your ISP sees that you're connected to a VPN, but not which sites you visit.
- **Changes your apparent location** — which is why people use them to access region-locked content (subject to each service's terms).

## What it does NOT do

This is where the marketing oversells:

| Myth | Reality |
| --- | --- |
| "A VPN makes you anonymous" | Far from it — logins, cookies, browser fingerprinting, and accounts identify you regardless |
| "A VPN keeps you safe from viruses/hacking" | It doesn't — it's a tunnel, not antivirus or a firewall against malware |
| "A VPN encrypts everything you do" | Most sites are already HTTPS-encrypted end-to-end; the VPN mainly protects the *local* hop |
| "A VPN hides you from everyone" | Your VPN provider can see your traffic — you've shifted trust to them |

That last point is the crucial one. Without a VPN, your local network and ISP can observe your connections. *With* one, the VPN company occupies that position instead — so a VPN is only as trustworthy as its operator. A free VPN that monetizes by logging and selling your activity can be worse than none.

## Do you need one?

| Situation | Verdict |
| --- | --- |
| Frequently on public/untrusted WiFi | Reasonable — adds a real layer (though HTTPS already covers a lot) |
| Want to hide browsing from your ISP | Yes, that's a core use |
| Accessing region-locked content | Common use (mind the terms of service) |
| Seeking true anonymity | A VPN alone won't deliver it |
| Already only on trusted networks, using HTTPS | Optional — the benefit is smaller than ads imply |

If you do use one, choose a reputable paid provider with a clear, ideally audited no-logs policy — you are trusting them with everything your ISP used to see.

## FAQ

**Does a VPN stop websites from tracking me?**
Only the IP-based part. Cookies, logins, and browser fingerprinting still identify you. Anti-tracking needs browser settings/extensions, not a VPN.

**Is a free VPN fine?**
Be wary — running servers costs money, and some free VPNs recoup it by logging and selling your data, the opposite of the goal. Reputable free tiers exist, but read the privacy policy.

**Do I need a VPN if sites use HTTPS?**
HTTPS already encrypts the content of your traffic end-to-end. A VPN adds IP-hiding and protects metadata on the local network, but it's a smaller upgrade than the ads suggest when you're already on HTTPS.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'What Is End-to-End Encryption?',
    question: 'What does end-to-end encryption mean, and why does it matter for messaging?',
    summary:
      'End-to-end encryption locks a message so only the sender and recipient can read it — not the network, not even the company running the service. It is the difference between a sealed letter and a postcard everyone in transit can read.',
    tags: ['security', 'privacy', 'encryption', 'messaging'],
    language: 'en',
    image: {
      prompt:
        'A glowing message sealed inside a translucent capsule at one glass device, traveling across a landscape of watching eyes that see only an opaque shape, and opening into readable light only when it reaches the matching device at the far end. ' +
        STYLE,
      alt: 'A sealed message capsule unreadable in transit, opening only at the far device',
    },
    sources: [
      { title: 'EFF — Surveillance Self-Defense: What is encryption?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST — Cryptographic standards and guidelines', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# What Is End-to-End Encryption?

End-to-end encryption (E2EE) means a message is scrambled on the sender's device and can only be unscrambled on the recipient's device — so at no point in between can anyone else read it. Crucially, "anyone else" includes the company operating the service. The classic analogy: a normal message is a **postcard** that every handler along the way can read; an end-to-end-encrypted message is a **sealed letter** that only the recipient can open. The difference is who *can* read your conversations, not just who *promises* not to.

## The distinction that actually matters

Most online services encrypt data "in transit" (between you and their servers) and "at rest" (in their storage). That's good, but in both cases **the company can still read your content** — they hold the keys. End-to-end encryption is stronger: only the endpoints hold the keys, so the provider is structurally unable to read your messages even if it wanted to, was hacked, or was ordered to hand them over.

| | Transit/at-rest encryption | End-to-end encryption |
| --- | --- | --- |
| Protected from outside snoops | Yes | Yes |
| Readable by the service provider | **Yes** | **No** |
| Exposed in a provider data breach | Potentially | Content stays unreadable |
| Handed over on a legal demand | Possible | Provider has nothing readable to give |

## How it works, briefly

E2EE uses the same public-key idea behind passkeys and HTTPS. Each user has a public key (shared freely) and a private key (never shared). To message you, the sender encrypts with *your* public key; only *your* private key can decrypt it. The keys live on the devices, not the server — which is exactly why the server can't read the contents. Good messaging apps add "forward secrecy," rotating keys so that even a future key compromise can't unlock past messages.

## Where you rely on it

- **Messaging**: some apps are end-to-end encrypted by default; others only in an optional mode, or not at all. If privacy matters, check which.
- **Calls**: many voice/video apps now offer E2EE.
- **Backups and clouds**: a subtle gap — a chat can be E2EE while its *cloud backup* is not, quietly making messages readable again. Check backup settings.
- **The web**: HTTPS is end-to-end between your browser and the website (though the website itself, as an endpoint, reads what you send it).

## FAQ

**If even the company can't read it, who can?**
Only the people holding the devices at each end. That also means *device* security matters — E2EE protects messages in transit, not a phone someone unlocks. And metadata (who you talked to, when) may still be visible even when content isn't.

**Does E2EE help criminals?**
It's the same encryption that protects your banking, medical records, journalists, and ordinary private conversations — a general-purpose protection. The mainstream security consensus is that weakening it for everyone (a "backdoor") makes everyone less safe, since a backdoor can't be limited to the "good guys."

**How do I know an app really uses it?**
Look for "end-to-end encrypted" explicitly (not just "encrypted"), prefer apps using well-reviewed open protocols, and check whether it's on by default or only in a special mode.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'Is Public WiFi Actually Dangerous?',
    question: 'Is it safe to use public WiFi at cafes and airports, and what should I avoid?',
    summary:
      'Public WiFi is far safer than it used to be because nearly all websites now use HTTPS, which encrypts your data regardless of the network. The real residual risks are fake hotspots and unencrypted connections — manageable with a few habits.',
    tags: ['security', 'privacy', 'wifi', 'digital safety'],
    language: 'en',
    image: {
      prompt:
        'A glass laptop connected to a glowing public WiFi orb in an open airy space, its data already wrapped in individual sealed capsules of light before leaving the device, while a faint suspicious duplicate hotspot lurks dimly to one side. ' +
        STYLE,
      alt: 'A laptop sending pre-sealed data over public WiFi beside a lurking fake hotspot',
    },
    sources: [
      { title: 'FTC — Are public WiFi networks safe?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF — HTTPS and Surveillance Self-Defense', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# Is Public WiFi Actually Dangerous?

Public WiFi has a scary reputation that is mostly **out of date**. The old warnings come from an era when websites sent data in the clear, so anyone on the same café network could "sniff" your passwords out of the air. That era largely ended: today the overwhelming majority of websites use **HTTPS**, which encrypts your connection end-to-end between your browser and the site — on any network, trusted or not. The lock in your address bar is doing most of the protective work the breathless warnings credit to a VPN.

## Why HTTPS changed the picture

When you connect to an HTTPS site, your traffic is encrypted *before* it leaves your device, so a snooper on the same WiFi sees only scrambled data and which site you're visiting — not your password, messages, or card number. Since modern browsers now flag non-HTTPS sites as "Not Secure" and most of the web has migrated, the classic "password stolen at the coffee shop" attack is far harder than it used to be.

## The risks that remain

Public WiFi isn't *zero* risk, though — the real threats shifted:

| Risk | What it is | Defense |
| --- | --- | --- |
| **Evil-twin hotspot** | A fake network named "Airport_Free_WiFi" run by an attacker | Confirm the real network name; don't auto-join unknown ones |
| **Non-HTTPS sites** | The rare site still sending data in clear text | Watch for the "Not Secure" warning; don't enter secrets there |
| **Shoulder surfing** | Someone simply watching your screen | Privacy screen, awareness |
| **Outdated device** | Unpatched bugs exploitable on shared networks | Keep your OS and apps updated |
| **Auto-connect** | Phone silently joining a malicious known-name network | Turn off auto-join for open networks |

The headline risk is the **evil twin**: a malicious hotspot with a friendly name. If you connect to it, the attacker controls your network path — but even then, HTTPS keeps your encrypted sessions unreadable; the danger is mainly any non-HTTPS traffic and being lured to fake login pages.

## Sensible habits (without paranoia)

- **Trust the HTTPS lock**, and never bypass a certificate warning on public WiFi — that warning is exactly when something's wrong.
- **Verify the network name** with staff rather than guessing; be suspicious of open networks impersonating a brand.
- **Turn off auto-connect** to open networks so your devices don't silently rejoin look-alikes.
- **A VPN adds a layer** by encrypting even the metadata and any non-HTTPS traffic — a reasonable extra on untrusted networks, but not the necessity the ads imply, given HTTPS.
- **Keep devices updated**; most remaining network attacks target known, already-patched bugs.

## FAQ

**Can someone steal my bank password on café WiFi?**
If your bank uses HTTPS (it does) and you didn't ignore a certificate warning or fall for a fake login page, your credentials are encrypted on the wire. The bigger danger is phishing, not sniffing.

**Do I really need a VPN for public WiFi?**
It's a reasonable extra layer, but HTTPS already protects the content of your traffic. A VPN mainly helps with non-HTTPS traffic and hiding which sites you visit from the local network.

**Is my phone's mobile data safer than public WiFi?**
Generally yes — cellular is encrypted and you're not sharing a local network with strangers. For sensitive tasks on an unknown network, switching to mobile data is a simple, solid choice.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'How Online Tracking Works (Cookies, Pixels, and Fingerprints)',
    question: 'How do companies track me across the web, and can I actually stop it?',
    summary:
      'Trackers follow you with cookies, invisible tracking pixels, and browser fingerprinting to build a profile across sites. You can\'t become invisible, but a few browser choices dramatically cut how much is collected.',
    tags: ['privacy', 'tracking', 'cookies', 'web'],
    language: 'en',
    image: {
      prompt:
        'A glass figure of light walking across a series of connected platforms, leaving faint glowing footprints that distant watching lenses stitch together into a partial portrait, while a protective translucent cloak dims and scatters many of the footprints. ' +
        STYLE,
      alt: 'A figure leaving footprints that watchers stitch together, partly scattered by a cloak',
    },
    sources: [
      { title: 'EFF — Cover Your Tracks (browser fingerprinting test)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC — Protecting your privacy online', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# How Online Tracking Works (Cookies, Pixels, and Fingerprints)

Most of the "free" web is paid for by advertising, and targeted advertising runs on knowing who you are and what you do. So an entire industry exists to follow you from site to site, stitching your activity into a profile. It works through three main techniques, each more slippery than the last — and understanding them is what makes the defenses make sense.

## The three main techniques

**1. Cookies.** A cookie is a small file a site stores in your browser. *First-party* cookies are mostly benign and useful — they keep you logged in and remember your cart. The tracking problem is *third-party* cookies: when many different sites all embed content from the same ad network, that network drops a cookie that it recognizes everywhere, letting it see that the same browser visited site A, then B, then C. That cross-site trail is the classic tracking mechanism (and the one browsers are now actively phasing out).

**2. Tracking pixels.** An invisible 1×1 image (or a snippet of code) loaded from a tracker's server. Merely loading it — in a web page *or an email* — tells the tracker you opened it, when, and details about your device. This is how marketers know you opened their email or visited a page, without any cookie.

**3. Browser fingerprinting.** The sneakiest. Instead of storing anything on your device, a site *measures* your device's unique combination of traits — screen size, fonts, operating system, browser version, time zone, graphics quirks — which together are often unique enough to re-identify you. Because it stores nothing, clearing cookies doesn't erase it.

| Technique | Stores something? | Beaten by clearing cookies? |
| --- | --- | --- |
| Third-party cookies | Yes | Yes |
| Tracking pixels | Uses cookies/server logs | Partially |
| Fingerprinting | No | **No** |

## What actually reduces tracking

You can't be invisible, but you can shrink your exposure a lot:

- **Use a privacy-respecting browser or enable tracking protection** — modern browsers block third-party cookies and known trackers by default or with one setting.
- **Add a reputable content/ad blocker** — blocks tracker scripts and pixels before they load, which also speeds up pages.
- **Block remote images in email** to defeat open-tracking pixels (most mail apps offer this).
- **Resist fingerprinting** with browsers that standardize or randomize your fingerprint; this is the hardest tracking to stop, which is why it matters who makes your browser.
- **Reduce the profile at the source**: limit ad personalization in your account settings, and be sparing with logins that tie activity to a real identity.

## FAQ

**Do those "Accept cookies" banners actually protect me?**
They're consent prompts (driven by privacy laws), not protection. "Reject non-essential" helps, but real reduction comes from browser settings and blockers, not from clicking banners.

**Does private/incognito mode stop tracking?**
Mostly no. It prevents your *browser* from saving local history and cookies after the session, but sites, trackers, and your network can still observe you during it, and fingerprinting still works.

**Is fingerprinting really unstoppable?**
Not unstoppable, but hard — the defense is using a browser that deliberately makes everyone's fingerprint look similar (so yours doesn't stand out). Test your own at the EFF's Cover Your Tracks.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'What to Do When Your Data Is in a Breach',
    question: 'A company I use had a data breach — what should I actually do about it?',
    summary:
      'When a breach exposes your data, the priority is containing reuse: change that password everywhere it was used, turn on two-factor, and watch for follow-on phishing. What to do depends on what leaked — a password, a card, or your identity details.',
    tags: ['security', 'privacy', 'data breach', 'digital safety'],
    language: 'en',
    image: {
      prompt:
        'A glass vault with a small crack leaking glowing droplets, while a calm figure of light methodically seals related vaults nearby and raises protective rings around them, containing the spread rather than panicking. ' +
        STYLE,
      alt: 'A small vault leak being methodically contained across nearby vaults',
    },
    sources: [
      { title: 'FTC — Data breach: what to do', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned — check if your accounts appeared in breaches', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# What to Do When Your Data Is in a Breach

Data breaches are now routine — if you've used the internet for years, your information has almost certainly appeared in one. That sounds alarming, but most breaches are survivable with a calm, targeted response. The key is to match your action to **what actually leaked**, because a leaked password, a leaked card number, and leaked identity details call for different moves. Panic and inaction are the two failure modes; a short checklist beats both.

## First: figure out what was exposed

Breach notifications (and services that track them) usually say what data was involved. The severity ladder, roughly:

| What leaked | Severity | Why |
| --- | --- | --- |
| Email address only | Low | Mostly means more spam/phishing |
| Password (even hashed) | High | Reuse means many accounts at risk |
| Payment card | Medium | Banks reverse fraud; cards are replaceable |
| Identity details (ID numbers, DOB, address) | High | Enables identity theft; can't be "reset" |

## The response, by what leaked

**If a password leaked** (the most common urgent case):
1. **Change it on the breached site immediately.**
2. **Change it everywhere you reused it** — this is the real danger, because attackers will try that email-password pair across banks, email, and shops (credential stuffing). A password manager makes this far less painful and prevents the next one.
3. **Turn on two-factor authentication** on that account and your important ones.

**If a payment card leaked:** watch your statements, report any unfamiliar charge (banks generally reverse fraud), and let the bank reissue the card if needed. This is the most recoverable kind of breach.

**If identity details leaked** (the hardest, since you can't change your date of birth): consider a credit freeze / fraud alert with credit bureaus where available, watch for accounts opened in your name, and be extra skeptical of contacts referencing your real details.

## Then: brace for the second wave

The underrated follow-on risk is **targeted phishing**. After a breach, criminals know which company you use and some of your real details, so they send convincing "[Company] security alert — verify your account" messages. Expect them, and apply the usual rule: never log in through a link in a message — go to the site directly. A breach makes you a marked target for a while.

## FAQ

**How do I even know if I'm in a breach?**
Companies are often legally required to notify you, but it's worth checking a reputable breach-lookup service (like Have I Been Pwned) for your email, and enabling your password manager's breach alerts.

**The breach was years ago — do I still need to act?**
If you've since made that password unique and turned on 2FA, you're largely covered. If you *still* reuse that password anywhere, change it now — old leaked passwords are tried for years.

**Should I pay for identity-protection services?**
Often the core protections (credit freeze, monitoring your own statements, unique passwords + 2FA) are free and do most of the work. Paid services can add convenience, but aren't a substitute for the basics.`,
  },
];
