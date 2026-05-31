import type { DraftArticle } from './types';

// Batch: Mind, Health & Everyday Science. Original encyclopedic drafts.
export const mindHealthEveryday: DraftArticle[] = [
  {
    title: 'The Placebo Effect',
    question: 'Why can a fake treatment sometimes make people feel better?',
    summary:
      'The placebo effect is a real improvement in symptoms produced by a person’s expectations and beliefs about a treatment, rather than by any active ingredient.',
    tags: ['medicine', 'psychology', 'health', 'science', 'mind'],
    language: 'en',
    content: `# The Placebo Effect

The placebo effect occurs when a person's health genuinely improves after receiving a treatment that has no active therapeutic ingredient — such as a sugar pill or a saline injection. The improvement comes from the mind and body's response to *expecting* to get better.

## A real, measurable response

Placebos are not "all in the head" in a dismissive sense. Expectation can trigger real physiological changes: the brain may release its own pain-relieving chemicals (such as endorphins), and stress responses can shift. The effect is strongest for symptoms shaped by perception, like **pain, nausea, fatigue, and anxiety**, and weakest for objective disease processes — a placebo will not shrink a tumor or cure an infection.

## Why it matters for science

Because expectation alone can change how people feel, medical trials use **placebo controls**. Patients are randomly given either the real drug or a placebo, and ideally neither they nor the researchers know who got which (a **double-blind** design). A new treatment must outperform the placebo to be considered effective.

## The nocebo effect

The flip side is the **nocebo effect**: negative expectations can produce real negative symptoms. Simply being warned about a drug's possible side effects can make some people experience them.

## Ethics and use

Deliberately deceiving patients raises ethical problems, so doctors rarely prescribe pure placebos. But understanding the effect helps explain why a caring, confident clinical setting itself contributes to healing.`,
  },
  {
    title: 'Why We Sleep',
    question: 'Why do humans need to sleep?',
    summary:
      'Sleep is a vital, active state in which the brain and body carry out repair, memory consolidation, and waste clearance; chronic sleep loss harms health, mood, and cognition.',
    tags: ['biology', 'health', 'neuroscience', 'psychology', 'science'],
    language: 'en',
    content: `# Why We Sleep

Sleep takes up roughly a third of human life, yet it is anything but idle. It is an active, carefully regulated state essential to physical and mental health.

## Stages of sleep

A night of sleep cycles through stages roughly every 90 minutes:

- **Non-REM sleep**, including deep "slow-wave" sleep, when the body repairs tissue, builds bone and muscle, and strengthens the immune system.
- **REM (rapid eye movement) sleep**, when most vivid dreaming occurs and the brain is highly active.

## What sleep does

Research points to several core functions:

- **Memory consolidation.** The brain replays and reorganizes the day's experiences, moving information into long-term storage and strengthening learning.
- **Waste clearance.** During sleep the brain flushes out metabolic by-products, including proteins linked to neurodegenerative disease.
- **Restoration.** Hormones that regulate growth, appetite, and stress are rebalanced.

## The cost of too little

Chronic sleep deprivation is linked to impaired attention and judgment, weakened immunity, weight gain, and higher risk of heart disease, diabetes, and mood disorders. Even modest, sustained shortfalls measurably reduce mental performance.

## The body clock

Sleep is governed by the **circadian rhythm**, an internal ~24-hour clock synchronized largely by light. Disrupting it — through shift work, jet lag, or late-night screens — can throw off sleep quality even when total hours seem adequate.`,
  },
  {
    title: 'Caffeine and the Brain',
    question: 'How does caffeine keep you awake?',
    summary:
      'Caffeine fights drowsiness by blocking adenosine, a brain chemical that builds up during the day and promotes sleep, temporarily masking fatigue rather than removing it.',
    tags: ['biology', 'neuroscience', 'health', 'chemistry', 'mind'],
    language: 'en',
    content: `# Caffeine and the Brain

Caffeine is the world's most widely used psychoactive substance, found in coffee, tea, chocolate, and many soft drinks. It works by interfering with one of the brain's natural sleep signals.

## Blocking the "tiredness" signal

As you stay awake, a molecule called **adenosine** gradually accumulates in the brain. When adenosine binds to its receptors, it slows nerve activity and makes you feel drowsy. Caffeine has a similar shape to adenosine, so it slips into those same receptors and blocks them — without activating them. The brain stops receiving the "you're tired" message, and alertness rises.

## Knock-on effects

With adenosine blocked, the brain's natural stimulants, such as dopamine and adrenaline, act more freely. This is why caffeine can sharpen focus, lift mood, and raise heart rate.

## It masks, not erases, fatigue

Crucially, caffeine does not remove the underlying need for sleep. Adenosine keeps building up behind the blockade; when the caffeine wears off, it can flood the now-available receptors, sometimes producing a "crash."

## Tolerance and withdrawal

With regular use, the brain grows more receptors, so more caffeine is needed for the same effect — **tolerance**. Suddenly stopping can cause **withdrawal** symptoms like headaches and irritability for a few days. Effects also fade slowly: caffeine has a half-life of several hours, so an afternoon coffee can still disrupt that night's sleep.`,
  },
  {
    title: 'The Doppler Effect',
    question: 'Why does a siren change pitch as it passes you?',
    summary:
      'The Doppler effect is the change in a wave’s observed frequency when the source and observer move relative to each other, explaining shifting siren pitch and the redshift of distant galaxies.',
    tags: ['physics', 'waves', 'sound', 'astronomy', 'science'],
    language: 'en',
    content: `# The Doppler Effect

The Doppler effect is the change in the frequency of a wave as its source moves toward or away from an observer. It is most familiar with sound, but it applies to all waves, including light.

## The everyday example

When an ambulance approaches, its siren sounds higher in pitch; as it passes and recedes, the pitch drops. The siren itself never changes. What changes is how the sound waves reach you:

- As the source **approaches**, each wave is emitted a little closer than the last, so the waves bunch up — shorter wavelength, **higher** frequency (higher pitch).
- As it **recedes**, the waves stretch out — longer wavelength, **lower** frequency (lower pitch).

## Why it happens

The effect arises purely from relative motion compressing or stretching the spacing between successive wave crests. The faster the relative motion, the larger the shift.

## Doppler effect with light

Light shifts too. Motion away from us stretches light toward longer, redder wavelengths (**redshift**); motion toward us shifts it bluer (**blueshift**). This is a cornerstone of astronomy: the redshift of distant galaxies revealed that the universe is **expanding**, and Doppler shifts let astronomers measure how stars and galaxies move.

## Practical uses

The principle powers **radar** speed guns, weather radar that tracks storm motion, and medical **Doppler ultrasound**, which measures blood flow by bouncing sound off moving cells.`,
  },
  {
    title: 'Why the Sky Is Blue',
    question: 'Why is the sky blue during the day and red at sunset?',
    summary:
      'The sky is blue because air molecules scatter short-wavelength blue light far more than other colors; at sunset, light travels through more atmosphere, scattering blue away and leaving reds.',
    tags: ['physics', 'light', 'atmosphere', 'optics', 'science'],
    language: 'en',
    content: `# Why the Sky Is Blue

The blue color of the daytime sky and the fiery colors of sunset come from the same physics: the scattering of sunlight by the atmosphere.

## Sunlight is a mix of colors

Although it looks white, sunlight contains all the colors of the rainbow, each with a different **wavelength** — blue and violet are short, red and orange are long.

## Rayleigh scattering

As sunlight passes through the air, it collides with gas molecules much smaller than its wavelength. These tiny molecules scatter **short** wavelengths far more strongly than long ones — an effect called **Rayleigh scattering**, where scattering increases sharply as wavelength decreases. Blue light is scattered roughly ten times more than red.

## Why blue, not violet

Violet is scattered even more than blue, so why isn't the sky violet? Two reasons: the Sun emits less violet than blue, and human eyes are more sensitive to blue. The combination makes the sky look blue to us.

## Sunrise and sunset

When the Sun is low on the horizon, its light passes through a much thicker slice of atmosphere. By the time it reaches you, most of the blue has been scattered away in other directions, leaving the longer-wavelength **reds and oranges** to dominate. Dust and pollution can deepen these colors further.

## On other worlds

The color of a sky depends on its atmosphere. Mars, with its thin, dusty air, can show a butterscotch daytime sky and bluish sunsets — the reverse of Earth.`,
  },
  {
    title: 'Antibiotic Resistance',
    question: 'Why are antibiotics becoming less effective?',
    summary:
      'Antibiotic resistance arises when bacteria evolve to survive drugs that once killed them; overuse and misuse accelerate this process, threatening to make common infections dangerous again.',
    tags: ['medicine', 'biology', 'health', 'evolution', 'science'],
    language: 'en',
    content: `# Antibiotic Resistance

Antibiotic resistance is one of the most serious threats in modern medicine. It occurs when bacteria change so that the drugs designed to kill them no longer work.

## Evolution in fast-forward

Antibiotics kill or stop bacteria, but in any large population a few microbes may carry random mutations that help them survive. When antibiotics wipe out the vulnerable bacteria, these resistant survivors multiply and pass on their resistance. Bacteria can also **swap resistance genes** directly with one another, spreading the trait quickly. This is **natural selection** happening over days, not millennia.

## What drives it

The process is accelerated by human behavior:

- **Overuse** — prescribing antibiotics for viral illnesses like colds, which they cannot treat.
- **Incomplete courses** — stopping early, leaving the hardier bacteria alive.
- **Heavy use in agriculture** — routinely dosing healthy livestock.

## Why it is dangerous

As resistance spreads, once-routine infections, surgeries, and treatments like chemotherapy become riskier. "Superbugs" resistant to multiple drugs already cause many deaths each year, and the pipeline of genuinely new antibiotics has been thin.

## What helps

Slowing resistance means using antibiotics only when needed, completing prescribed courses, improving hygiene and vaccination to prevent infections in the first place, and investing in research for new treatments. It is a shared responsibility spanning patients, doctors, farmers, and governments.`,
  },
  {
    title: 'The Nitrogen Cycle',
    question: 'How does nitrogen move between the air, soil, and living things?',
    summary:
      'The nitrogen cycle is the set of processes that convert nitrogen between its inert atmospheric form and compounds usable by life, essential for proteins and DNA and central to agriculture.',
    tags: ['biology', 'earth science', 'agriculture', 'chemistry', 'environment'],
    language: 'en',
    content: `# The Nitrogen Cycle

Nitrogen is essential to all life — it forms part of proteins and DNA. Although the air is about 78% nitrogen gas, most organisms cannot use it directly. The nitrogen cycle is the series of natural processes that converts nitrogen into usable forms and back again.

## The problem with N2

Atmospheric nitrogen exists as **N2**, two atoms bound by an exceptionally strong triple bond. Breaking that bond takes a lot of energy, so plants and animals cannot tap the vast supply in the air on their own.

## Key steps

- **Nitrogen fixation.** Specialized **bacteria** — many living in the roots of legumes like beans and clover — convert N2 into ammonia. Lightning and industrial processes fix nitrogen too.
- **Nitrification.** Other bacteria convert ammonia into **nitrites** and then **nitrates**, the form most plants absorb through their roots.
- **Assimilation.** Plants take up nitrates to build proteins; animals get their nitrogen by eating plants or other animals.
- **Decomposition and ammonification.** When organisms die or excrete waste, decomposers return nitrogen to the soil as ammonia.
- **Denitrification.** Finally, certain bacteria convert nitrates back into N2 gas, completing the cycle.

## The human impact

The invention of the **Haber–Bosch process**, which fixes nitrogen industrially to make fertilizer, hugely increased food production and now supports much of the world's population. But excess fertilizer runoff overloads rivers and seas, causing **algal blooms** and oxygen-starved "dead zones," making the nitrogen cycle a key environmental concern.`,
  },
  {
    title: 'How Memory Works',
    question: 'How does the brain store and recall memories?',
    summary:
      'Memory is the brain’s ability to encode, store, and retrieve information through changing connections between neurons; it comes in several types and is reconstructive rather than perfect.',
    tags: ['neuroscience', 'psychology', 'biology', 'mind', 'science'],
    language: 'en',
    content: `# How Memory Works

Memory lets us learn from the past and make sense of the present. Rather than a single filing cabinet, it is a set of related systems distributed across the brain.

## Three basic processes

- **Encoding.** Turning an experience into a form the brain can store, helped by attention and meaning.
- **Storage.** Holding that information over time.
- **Retrieval.** Bringing it back when needed.

## Types of memory

- **Sensory memory** holds raw impressions for a fraction of a second.
- **Short-term (working) memory** keeps a small amount of information active for seconds — enough to dial a phone number.
- **Long-term memory** can store vast amounts for years. It includes **explicit** memory (facts and events you can describe) and **implicit** memory (skills like riding a bike).

## The biology

Memories are thought to be stored as patterns of strengthened connections between neurons — a principle often summarized as "neurons that fire together, wire together." The **hippocampus** is crucial for forming new long-term memories, while older, well-established memories rely more on the cortex. **Sleep** plays a key role in consolidating the day's learning.

## Memory is reconstructive

Recall is not like replaying a recording. Each time you remember something, the brain rebuilds it, and details can shift or blend with other information. This is why eyewitness memories can be confidently wrong, and why repeated recall can subtly rewrite the original.`,
  },
];
