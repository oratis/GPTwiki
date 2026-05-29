import type { DraftArticle } from './types';

// Batch: Arts, Language & Culture. Original encyclopedic drafts for GPTwiki.
export const artsLanguageCulture: DraftArticle[] = [
  {
    title: 'Color Theory',
    question: 'How do colors work together, and what makes some combinations pleasing?',
    summary:
      'Color theory is the study of how colors relate and combine, using tools like the color wheel and concepts such as complementary and analogous schemes to guide art and design.',
    tags: ['art', 'design', 'color', 'culture', 'visual'],
    language: 'en',
    content: `# Color Theory

Color theory is the body of practical guidance artists and designers use to combine colors effectively. It blends physics, perception, and aesthetics into simple, usable principles.

## The color wheel

The classic tool is the **color wheel**, which arranges colors in a circle:

- **Primary colors** (in traditional pigment theory: red, yellow, blue) cannot be mixed from others.
- **Secondary colors** (orange, green, purple) come from mixing two primaries.
- **Tertiary colors** fill the spaces between.

## Three properties of color

Any color can be described by:

- **Hue** — its basic identity (red, blue, etc.).
- **Saturation** — how vivid or muted it is.
- **Value** (or brightness) — how light or dark it is.

## Common color schemes

- **Complementary.** Colors opposite each other on the wheel (like blue and orange) create strong contrast and energy.
- **Analogous.** Colors next to each other (like blue, teal, green) feel harmonious and calm.
- **Triadic.** Three evenly spaced colors offer balance with vibrancy.

## Warm, cool, and meaning

Colors are often grouped as **warm** (reds, oranges, yellows) or **cool** (blues, greens, purples), which affect mood and the sense of depth. Cultures also attach meanings to colors, which designers consider when communicating.

## Light vs. pigment

A key subtlety: mixing **light** (as on screens) follows different rules than mixing **paint**. Screens combine red, green, and blue light (RGB) that add up to white, while pigments subtract light and mix toward dark.`,
  },
  {
    title: 'Linear Perspective',
    question: 'How do artists make a flat drawing look three-dimensional?',
    summary:
      'Linear perspective is a drawing technique, formalized in the Renaissance, that creates the illusion of depth by making parallel lines converge toward vanishing points on a horizon.',
    tags: ['art', 'drawing', 'history', 'design', 'visual'],
    language: 'en',
    content: `# Linear Perspective

Linear perspective is a method for representing three-dimensional space on a flat surface, creating a convincing illusion of depth. Its rules, worked out during the Italian Renaissance, revolutionized Western art.

## The core idea

In real life, objects appear smaller the farther away they are, and parallel lines — like the edges of a long road — seem to converge as they recede. Linear perspective captures this with a few simple constructs:

- A **horizon line**, representing the viewer's eye level.
- One or more **vanishing points** on that line, where receding parallel lines appear to meet.
- **Orthogonals**, the converging lines that guide the size and placement of objects.

## Types

- **One-point perspective.** A single vanishing point, ideal for scenes viewed head-on, like looking straight down a hallway.
- **Two-point perspective.** Two vanishing points, useful for objects seen at an angle, such as the corner of a building.
- **Three-point perspective.** Adds a third point above or below, suggesting extreme height or depth.

## A Renaissance breakthrough

The architect **Filippo Brunelleschi** demonstrated the geometry in the early 1400s, and it was soon codified in writing. Suddenly painters could construct rooms, streets, and landscapes with mathematical consistency, lending their work a new realism.

## Beyond geometry

Artists also use **atmospheric perspective** — making distant objects paler, bluer, and less detailed — to reinforce the sense of depth that linear perspective establishes.`,
  },
  {
    title: 'Harmony and Musical Scales',
    question: 'Why do some combinations of notes sound pleasing?',
    summary:
      'Musical harmony arises largely from simple frequency ratios between notes; scales organize pitches into patterns that cultures use to build melody and harmony.',
    tags: ['music', 'art', 'sound', 'culture', 'mathematics'],
    language: 'en',
    content: `# Harmony and Musical Scales

Why does a chord sound "right" while a random clash of notes sounds harsh? Much of the answer lies in the physics of sound and the patterns cultures build from it.

## Notes are frequencies

A musical note is a sound wave vibrating at a particular **frequency**. When two notes' frequencies relate by **simple ratios**, their waves line up often, and our ears tend to hear the result as **consonant** (pleasant). Complex, clashing ratios sound **dissonant** (tense).

## The octave and simple ratios

The most fundamental relationship is the **octave**, a frequency ratio of exactly **2:1** — the two notes sound so similar we give them the same name. Other strong consonances include the perfect fifth (about 3:2) and the perfect fourth (about 4:3). The ancient Greek thinker Pythagoras is traditionally credited with linking these pleasing intervals to simple numerical ratios.

## Scales

A **scale** is a selected set of pitches within an octave, arranged in a pattern of steps. Western music commonly uses the **major** and **minor** scales of seven notes, while many traditions use **pentatonic** (five-note) scales. The pattern of large and small steps gives each scale its characteristic mood — major scales often feel bright, minor ones more somber.

## Harmony and tuning

**Harmony** is the sounding of multiple notes together, as in chords. To let instruments play in any key, modern Western tuning slightly adjusts the pure ratios in a compromise called **equal temperament**, spacing the 12 notes of the octave evenly. It sacrifices perfect purity for flexibility — a trade-off at the heart of how pianos and guitars are tuned.`,
  },
  {
    title: 'Etymology: Where Words Come From',
    question: 'How do words originate and change meaning over time?',
    summary:
      'Etymology is the study of word origins and how their forms and meanings evolve; English in particular blends Germanic, Latin, French, and many other sources.',
    tags: ['language', 'linguistics', 'history', 'culture', 'words'],
    language: 'en',
    content: `# Etymology: Where Words Come From

Etymology is the study of the origin of words — where they came from, how their sounds and spellings shifted, and how their meanings drifted over centuries.

## Languages have families

Most European and many Asian languages descend from a reconstructed ancestor called **Proto-Indo-European**, spoken thousands of years ago. As populations spread and separated, their speech diverged into branches like Germanic, Romance (from Latin), Slavic, and Indo-Iranian. That is why "mother" resembles *Mutter* (German), *mère* (French), and *mata* (Sanskrit).

## English: a great borrower

English is famously mixed. Its core comes from **Old English** (Germanic), but the Norman Conquest of 1066 layered in vast amounts of **French and Latin** vocabulary. This is why English often has pairs with different flavors — the homely Germanic *cow*, *pig*, and *house* beside the more formal Latin-derived *bovine*, *porcine*, and *mansion*.

## How meanings change

Words rarely stand still. Common patterns include:

- **Broadening.** "Dog" once meant a specific breed; now it means any.
- **Narrowing.** "Meat" once meant food in general.
- **Semantic shift.** "Nice" once meant foolish or precise before settling on pleasant.

## Why it matters

Etymology is more than trivia. Tracing word origins reveals histories of migration, conquest, trade, and technology — each new contact leaving its mark on a language. It also helps learners decode unfamiliar words by recognizing shared roots, prefixes, and suffixes.`,
  },
  {
    title: 'The Purpose of Mythology',
    question: 'Why did nearly every culture create myths?',
    summary:
      'Myths are traditional stories that explain the world, encode values, and bind communities; though not literally true, they served vital explanatory, moral, and social functions.',
    tags: ['mythology', 'culture', 'history', 'religion', 'storytelling'],
    language: 'en',
    content: `# The Purpose of Mythology

Almost every human culture has created **myths** — traditional stories about gods, heroes, and the origins of the world. Their near-universal presence suggests they meet deep human needs.

## What myths are

A myth is not simply a false story. In its original cultural setting, a myth is a sacred or foundational narrative that explains how things came to be and why the world works as it does. The word comes from the Greek *mythos*, meaning "story" or "speech."

## What myths do

Scholars identify several overlapping functions:

- **Explanation.** Before science, myths answered big questions: Why does the sun cross the sky? Why do seasons change? The Greek myth of Persephone, for instance, explained winter's return.
- **Moral guidance.** Myths model virtues and warn against vices, dramatizing the consequences of pride, greed, or courage.
- **Social cohesion.** Shared stories bind a community with a common identity, history, and set of values.
- **Coping with mystery.** Myths give meaning to birth, death, love, and suffering — experiences that resist plain explanation.

## Common patterns

Across distant cultures, similar motifs recur: creation from chaos, great floods, a journey to the underworld, and the "hero's journey" in which a protagonist ventures out, faces trials, and returns transformed. Such recurring patterns suggest myths tap into shared aspects of human imagination.

## Myth today

Even in a scientific age, mythic storytelling persists in literature, film, and folklore — proof that the human appetite for meaningful stories has never faded.`,
  },
  {
    title: 'Typography',
    question: 'What is typography and why does it shape how we read?',
    summary:
      'Typography is the art of arranging type to make written language readable and expressive, involving typeface choice, spacing, and hierarchy that quietly guide the reader.',
    tags: ['design', 'art', 'communication', 'typography', 'visual'],
    language: 'en',
    content: `# Typography

Typography is the craft of arranging letters and text so that language is legible, clear, and visually appealing. Though often invisible when done well, it profoundly shapes how we experience the written word.

## Typefaces and fonts

A **typeface** is a design for a set of characters (such as Helvetica or Times New Roman); a **font** is a specific size and style of that typeface. Typefaces fall into broad families:

- **Serif.** Letters with small finishing strokes ("feet"), often seen as traditional and used in long printed text.
- **Sans-serif.** Clean letters without those strokes, common on screens for their simplicity.
- **Monospace, script, and display** faces serve specialized purposes.

## The building blocks

Good typography balances many small decisions:

- **Hierarchy.** Varying size, weight, and spacing signals what is a heading, a subheading, or body text, guiding the eye.
- **Spacing.** *Kerning* (space between specific letters), *tracking* (overall letter spacing), and *leading* (space between lines) all affect readability.
- **Measure.** The length of a line of text; lines too long or too short tire the reader.

## Why it matters

Typography is not mere decoration. Clear type helps readers absorb information quickly and comfortably, while poor choices cause fatigue or confusion. Type also carries **tone** — a playful display face and a sober serif send very different messages before a single word is read.

## A long tradition

The discipline stretches from the careful hands of medieval scribes through Gutenberg's metal type to today's screens, where responsive design must keep text readable across countless devices.`,
  },
  {
    title: 'Narrative Structure',
    question: 'Why do so many stories follow a similar shape?',
    summary:
      'Narrative structure is the framework that organizes a story’s events; familiar patterns like the three-act structure and story arc help build tension and deliver satisfying resolution.',
    tags: ['storytelling', 'writing', 'culture', 'literature', 'art'],
    language: 'en',
    content: `# Narrative Structure

Narrative structure is the underlying framework that organizes the events of a story. Across novels, films, plays, and folktales, certain shapes recur because they reliably hold attention and feel satisfying.

## The classic arc

Many stories follow a rising-and-falling pattern often called **Freytag's pyramid**:

1. **Exposition.** Introduce characters, setting, and the normal world.
2. **Rising action.** A conflict emerges and complications build tension.
3. **Climax.** The turning point of highest tension.
4. **Falling action.** Consequences unfold.
5. **Resolution.** The conflict is settled and a new normal is reached.

## The three-act structure

A widely used variant, especially in film, divides a story into three acts: **setup** (introduce the world and the problem), **confrontation** (the protagonist struggles, raising the stakes), and **resolution** (the climax and outcome). Clear "turning points" push the story from one act into the next.

## The hero's journey

Another influential pattern describes a hero who leaves the ordinary world, crosses into the unknown, faces trials and a deep ordeal, and returns transformed. Variations of it appear in myths and modern blockbusters alike.

## Why structure helps

Structure is not a rigid formula but a tool. It manages **tension and pacing**, ensures conflict drives the story forward, and gives audiences a satisfying sense of completion. Skilled storytellers often play *against* expected structures — withholding resolution, scrambling chronology, or subverting the climax — precisely because audiences know the familiar shape so well.`,
  },
  {
    title: 'Nonverbal Communication',
    question: 'How much do we communicate without words?',
    summary:
      'Nonverbal communication conveys meaning through body language, facial expressions, tone, gesture, and space; it often carries emotional information more powerfully than words.',
    tags: ['psychology', 'communication', 'culture', 'behavior', 'society'],
    language: 'en',
    content: `# Nonverbal Communication

Nonverbal communication is everything we convey without words — facial expressions, gestures, posture, eye contact, tone of voice, and even the distance we keep from one another. It is a constant, often unconscious layer of human interaction.

## The main channels

- **Facial expressions.** Some emotions, like happiness, fear, and disgust, are expressed through facial movements recognized across many cultures.
- **Body language.** Posture and gestures signal confidence, openness, tension, or boredom.
- **Eye contact.** Regulates conversation and conveys attention, interest, or challenge.
- **Paralanguage.** *How* we speak — pitch, pace, volume, pauses — colors the meaning of our words.
- **Proxemics.** The use of personal space, which varies by relationship and culture.

## Why it matters

Nonverbal cues are especially powerful for **emotional** messages. When someone's words and body language conflict — saying "I'm fine" through clenched teeth — listeners tend to trust the nonverbal signal. Much of rapport, trust, and persuasion rides on these unspoken channels.

## Culture shapes it

While some expressions appear widespread, many nonverbal norms are **culturally specific**. The appropriate amount of eye contact, the meaning of a particular gesture, and comfortable conversational distance all differ between societies — a frequent source of cross-cultural misunderstanding.

## In a digital age

Text-based communication strips away most nonverbal cues, which is why tone is so easily misread online. **Emoji**, punctuation, and formatting have partly evolved to fill the gap, restoring a little of the emotional signal that face-to-face contact carries naturally.`,
  },
];
