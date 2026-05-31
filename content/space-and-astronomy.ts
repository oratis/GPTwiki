import type { DraftArticle } from './types';

// Batch: Space & Astronomy. Original encyclopedic drafts for GPTwiki.
export const spaceAndAstronomy: DraftArticle[] = [
  {
    title: 'The Phases of the Moon',
    question: 'Why does the Moon change shape through the month?',
    summary:
      'The Moon’s phases are caused by the changing angle at which we see its sunlit half as it orbits Earth; the Moon does not change, only how much of its lit side faces us.',
    tags: ['astronomy', 'moon', 'space', 'earth science', 'science'],
    language: 'en',
    content: `# The Phases of the Moon

The Moon appears to change shape over about a month, cycling from a thin crescent to a full disk and back. The Moon itself does not change — what changes is how much of its sunlit half we can see from Earth.

## Why phases happen

The Sun always lights up half of the Moon, just as it lights half of Earth. As the Moon orbits Earth roughly every 29.5 days, the angle between the Sun, Moon, and Earth shifts, so we see different fractions of that lit half.

## The main phases

- **New Moon.** The Moon sits between Earth and the Sun, so its lit side faces away from us and it is nearly invisible.
- **Waxing crescent → first quarter → waxing gibbous.** More of the lit side comes into view each night.
- **Full Moon.** Earth is between the Sun and Moon, so we see the entire lit face.
- **Waning gibbous → last quarter → waning crescent.** The lit portion shrinks back toward the next New Moon.

"Waxing" means growing; "waning" means shrinking.

## The same face, always

The Moon is **tidally locked** to Earth, rotating once per orbit, so it always shows us the same side. Phases are not the "dark side" of the Moon coming into view — they are simply the day/night line (the **terminator**) sweeping across the face we always see.

## Not the same as an eclipse

Phases are an everyday result of orbital geometry. **Eclipses** are rarer events that require the three bodies to line up almost exactly.`,
  },
  {
    title: 'Comets',
    question: 'What are comets and why do they grow tails?',
    summary:
      'Comets are icy bodies from the outer solar system that, when they near the Sun, release gas and dust to form a glowing coma and long tails that always point away from the Sun.',
    tags: ['astronomy', 'comets', 'solar system', 'space', 'science'],
    language: 'en',
    content: `# Comets

Comets are often called "dirty snowballs" — small bodies of ice, dust, and rock left over from the formation of the solar system. For most of their lives they are dark and invisible, but a trip near the Sun can transform them into some of the sky's most dramatic sights.

## Where they come from

Comets originate in the cold outer reaches of the solar system: the **Kuiper Belt** beyond Neptune, and the much more distant **Oort Cloud**, a vast shell thought to surround the Sun. Gravitational nudges occasionally send one falling inward.

## Anatomy of a comet

- **Nucleus.** The solid core of ice and dust, typically only a few kilometers across.
- **Coma.** As the comet approaches the Sun, ice vaporizes (going straight from solid to gas), surrounding the nucleus in a glowing cloud of gas and dust.
- **Tails.** Comets often grow two: a **dust tail** that curves along the comet's path, and a straight, bluish **ion tail** of charged gas pushed directly away by the solar wind.

## Tails point away from the Sun

A common surprise is that a comet's tail does not trail behind it like smoke. **Solar radiation and the solar wind** blow the released material outward, so the tail always points roughly **away from the Sun** — even as the comet heads back out into space.

## Predictable visitors

Some comets orbit on regular schedules. The most famous, **Halley's Comet**, returns about every 76 years and has been recorded for over two thousand years.`,
  },
  {
    title: 'The Life Cycle of a Star',
    question: 'How are stars born, and how do they die?',
    summary:
      'Stars form from collapsing clouds of gas, shine by fusing hydrogen for most of their lives, and end as white dwarfs, neutron stars, or black holes depending on their mass.',
    tags: ['astronomy', 'stars', 'space', 'physics', 'science'],
    language: 'en',
    content: `# The Life Cycle of a Star

Stars are not eternal. They are born, live for millions to billions of years, and die in ways that depend almost entirely on how much mass they start with.

## Birth

Stars form inside vast clouds of gas and dust called **nebulae**. When part of a cloud grows dense enough, gravity pulls it together into a hot, spinning ball. Once the core becomes hot and dense enough, **nuclear fusion** ignites — hydrogen atoms fuse into helium, releasing enormous energy. A star is born.

## The main sequence

For most of its life, a star is in a long, stable phase called the **main sequence**, balancing the inward pull of gravity against the outward push of fusion energy. Our Sun is roughly halfway through its ~10-billion-year main-sequence life.

## Death depends on mass

When a star exhausts its hydrogen, its fate splits by mass:

- **Sun-like stars** swell into **red giants**, then shed their outer layers, leaving a dense, cooling core called a **white dwarf**.
- **Massive stars** burn through their fuel quickly and end in a colossal explosion — a **supernova** — that briefly outshines a galaxy. The leftover core becomes either an ultra-dense **neutron star** or, if massive enough, a **black hole**.

## Cosmic recycling

Supernovae forge and scatter heavy elements like iron, carbon, and gold across space. These enrich new nebulae, which form new stars and planets. In a real sense, the atoms in our bodies were made inside stars that died long ago.`,
  },
  {
    title: 'Auroras',
    question: 'What causes the northern and southern lights?',
    summary:
      'Auroras are glowing curtains of light produced when charged particles from the Sun are funneled by Earth’s magnetic field into the upper atmosphere, where they excite gas molecules.',
    tags: ['astronomy', 'atmosphere', 'space weather', 'physics', 'science'],
    language: 'en',
    content: `# Auroras

Auroras — the northern lights (*aurora borealis*) and southern lights (*aurora australis*) — are shimmering displays of color in the night sky near Earth's poles. They are the visible result of a connection between the Sun and Earth's magnetic field.

## The solar source

The Sun constantly streams out charged particles called the **solar wind**, and bursts of activity like solar flares can send especially strong gusts. When these particles reach Earth, most are deflected by the planet's **magnetic field**.

## Funneled to the poles

The magnetic field channels some particles toward the **magnetic poles**, which is why auroras are usually seen at high latitudes. As the particles plunge into the upper atmosphere, they collide with gas molecules.

## Why the colors

Each collision energizes a gas molecule, which then releases that energy as light:

- **Green**, the most common color, comes from oxygen at moderate altitudes.
- **Red** comes from oxygen very high up.
- **Blue and purple** come from nitrogen.

The result is rippling curtains, arcs, and spirals that shift as the particle streams change.

## Space weather

Strong solar storms can push auroras toward lower latitudes and, more importantly, can disrupt satellites, radio communication, and power grids. Studying auroras is therefore part of monitoring "**space weather**" — and other planets with magnetic fields, like Jupiter and Saturn, have spectacular auroras of their own.`,
  },
  {
    title: 'Light-Years and Cosmic Distance',
    question: 'What is a light-year, and how do we measure distance in space?',
    summary:
      'A light-year is the distance light travels in a year; because cosmic distances are vast, astronomers use light-travel time and clever geometric and brightness-based methods to measure them.',
    tags: ['astronomy', 'space', 'physics', 'measurement', 'science'],
    language: 'en',
    content: `# Light-Years and Cosmic Distance

Space is so vast that ordinary units like kilometers become unwieldy. To handle these scales, astronomers measure distance using the speed of light.

## What a light-year is

A **light-year** is the distance light travels in one year — about 9.5 trillion kilometers. Despite the name, it measures *distance*, not time. Light is the fastest thing in the universe, so a light-year represents an enormous span.

## Looking back in time

Because light takes time to travel, seeing a distant object means seeing it as it *was* when the light left. The Sun's light is about 8 minutes old when it reaches us; the nearest star system, Alpha Centauri, is about 4 light-years away, so we see it as it was 4 years ago. The most distant galaxies are billions of light-years away — windows into the early universe.

## How distances are measured

Astronomers build a "**cosmic distance ladder**," using methods that reach progressively farther:

- **Parallax.** For nearby stars, astronomers measure the tiny shift in a star's apparent position as Earth orbits the Sun — the same effect you see when a nearby object shifts against the background as you move your head.
- **Standard candles.** Certain stars and exploding stars (like type Ia supernovae) have known true brightness. By comparing how bright they *look* to how bright they truly *are*, astronomers calculate distance.
- **Redshift.** For the most distant galaxies, the stretching of their light reveals how fast they are receding, which relates to distance in an expanding universe.

Each rung is calibrated against the one below it, letting astronomers map the cosmos out to its visible edge.`,
  },
  {
    title: 'Exoplanets',
    question: 'How do astronomers find planets around other stars?',
    summary:
      'Exoplanets are planets orbiting stars other than the Sun; astronomers detect them mainly by the tiny dimming of starlight as a planet transits, or by the star’s slight wobble.',
    tags: ['astronomy', 'exoplanets', 'space', 'science', 'discovery'],
    language: 'en',
    content: `# Exoplanets

An exoplanet is a planet that orbits a star other than our Sun. The first confirmed exoplanets around a Sun-like star were found in the 1990s; since then, thousands have been discovered, transforming our view of the galaxy.

## Why they are hard to see

Planets do not produce their own light and are tiny next to their dazzling host stars — like spotting a firefly beside a searchlight from far away. So astronomers usually detect exoplanets **indirectly**, by their effects on the star.

## The main detection methods

- **The transit method.** If a planet's orbit passes between us and its star, it blocks a tiny fraction of the starlight, causing a small, regular dip in brightness. Measuring these dips reveals the planet's size and orbit. NASA's Kepler telescope used this to find thousands of planets.
- **The radial velocity method.** A planet's gravity tugs on its star, making the star wobble slightly. This wobble shifts the star's light (via the Doppler effect), revealing the planet's mass and orbit.

Other methods include **direct imaging** of large, distant planets and **gravitational microlensing**.

## What we've learned

Exoplanets are astonishingly diverse: scorching "hot Jupiters" orbiting in days, "super-Earths" larger than ours, and worlds in the **habitable zone**, where temperatures could allow liquid water. The discoveries suggest that planets are common — most stars likely host them — sharpening the search for worlds that might support life.`,
  },
  {
    title: 'The Big Bang',
    question: 'What is the Big Bang theory and what evidence supports it?',
    summary:
      'The Big Bang theory holds that the universe began about 13.8 billion years ago from an extremely hot, dense state and has been expanding ever since, supported by multiple lines of evidence.',
    tags: ['astronomy', 'cosmology', 'physics', 'universe', 'science'],
    language: 'en',
    content: `# The Big Bang

The Big Bang theory is the leading scientific explanation for how the universe began. It states that around **13.8 billion years ago**, the universe started in an extraordinarily hot, dense state and has been expanding and cooling ever since.

## A common misconception

The Big Bang was not an explosion *into* empty space. Rather, space itself began expanding everywhere at once. There is no single "center" of the universe; every region is moving away from every other, like dots on the surface of an inflating balloon.

## The evidence

Three major observations support the theory:

- **The expanding universe.** In the 1920s, Edwin Hubble found that distant galaxies are moving away from us, and faster the farther they are. Rewinding this expansion points to a dense beginning.
- **The cosmic microwave background (CMB).** A faint glow of microwave radiation fills the entire sky — the cooled afterglow of the hot early universe, predicted before it was found in 1965.
- **The abundance of light elements.** The theory accurately predicts the proportions of hydrogen, helium, and lithium that formed in the universe's first few minutes.

## What it does and doesn't say

The Big Bang describes the *evolution* of the universe from a tiny fraction of a second onward — not the ultimate "why" or what, if anything, came "before." Open questions remain, including the nature of **dark matter** and **dark energy**, which together make up most of the universe's content and govern its ongoing expansion.`,
  },
  {
    title: 'Eclipses',
    question: 'What is the difference between a solar and a lunar eclipse?',
    summary:
      'Eclipses occur when the Sun, Earth, and Moon align: a solar eclipse happens when the Moon blocks the Sun, and a lunar eclipse when Earth’s shadow falls on the Moon.',
    tags: ['astronomy', 'moon', 'sun', 'space', 'science'],
    language: 'en',
    content: `# Eclipses

An eclipse occurs when the Sun, Earth, and Moon line up so that one casts a shadow on, or blocks the view of, another. There are two main kinds, and they are easy to mix up.

## Solar eclipse

A **solar eclipse** happens during a New Moon, when the **Moon passes between the Sun and Earth**, blocking the Sun's light. Because the Moon's shadow is small, only people in a narrow path on Earth see it.

- In a **total** solar eclipse, the Moon completely covers the Sun, briefly revealing the Sun's wispy outer atmosphere (the corona) and turning day to twilight.
- A remarkable coincidence makes this possible: the Sun is about 400 times wider than the Moon but also about 400 times farther away, so the two appear nearly the same size in our sky.

⚠️ Looking directly at a solar eclipse without proper filters can damage the eyes.

## Lunar eclipse

A **lunar eclipse** happens during a Full Moon, when **Earth passes between the Sun and Moon**, casting its shadow on the Moon. It is visible from anywhere on the night side of Earth and is completely safe to watch.

During a total lunar eclipse, the Moon often glows a coppery red — a "**blood Moon**" — because some sunlight bends through Earth's atmosphere and falls on the Moon, filtered to red the same way sunsets are.

## Why not every month

The Moon's orbit is tilted about 5° relative to Earth's orbit around the Sun, so the three bodies usually don't line up precisely. That tilt is why eclipses happen only a few times a year rather than every month.`,
  },
];
