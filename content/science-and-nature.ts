import type { DraftArticle } from './types';

// Batch: Science & Nature. Original encyclopedic drafts for GPTwiki.
export const scienceAndNature: DraftArticle[] = [
  {
    title: 'Photosynthesis',
    question: 'How do plants turn sunlight into food?',
    summary:
      'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy, water, and carbon dioxide into chemical energy stored as sugars, releasing oxygen as a by-product.',
    tags: ['biology', 'plants', 'energy', 'chemistry', 'science'],
    language: 'en',
    content: `# Photosynthesis

Photosynthesis is the biochemical process that lets plants, algae, and certain bacteria build their own food from light. It is the foundation of almost every food chain on Earth and the source of the oxygen we breathe.

## The basic reaction

In simplified terms, photosynthesis combines carbon dioxide and water, using light energy, to produce glucose and oxygen:

\`\`\`
6 CO2 + 6 H2O + light energy -> C6H12O6 + 6 O2
\`\`\`

The sugar (glucose) stores chemical energy that the organism later uses for growth and metabolism. The oxygen is released into the atmosphere.

## Two stages

- **Light-dependent reactions.** In the membranes of structures called thylakoids, the green pigment **chlorophyll** absorbs light. That energy splits water molecules, releases oxygen, and is captured in two energy carriers, ATP and NADPH.
- **The Calvin cycle (light-independent reactions).** In the surrounding fluid (the stroma), the ATP and NADPH power a series of reactions that fix carbon dioxide into sugar.

## Why it matters

Photosynthesis removes carbon dioxide from the air and locks it into living tissue, making it central to the global carbon cycle and to climate regulation. Fossil fuels are, in effect, ancient sunlight captured by photosynthesis millions of years ago.

## Variations

Plants in hot, dry climates often use adapted pathways — known as **C4** and **CAM** photosynthesis — that reduce water loss and improve efficiency under stress. These adaptations explain why crops like maize and sugarcane thrive in intense sunlight.`,
  },
  {
    title: 'The Water Cycle',
    question: 'How does water move around the planet?',
    summary:
      'The water cycle is the continuous movement of water through evaporation, condensation, precipitation, and runoff, redistributing fresh water across the Earth.',
    tags: ['earth science', 'water', 'climate', 'geography', 'science'],
    language: 'en',
    content: `# The Water Cycle

The water cycle, or hydrologic cycle, describes how water continuously circulates between the oceans, atmosphere, and land. The total amount of water on Earth stays roughly constant; the cycle simply moves it between different reservoirs.

## Key stages

- **Evaporation.** Heat from the Sun turns liquid water — mostly from oceans — into vapor. Plants add moisture through **transpiration**, and the two together are sometimes called *evapotranspiration*.
- **Condensation.** As vapor rises and cools, it condenses around tiny particles to form clouds.
- **Precipitation.** When droplets grow heavy enough, they fall as rain, snow, sleet, or hail.
- **Collection and runoff.** Water gathers in rivers, lakes, and oceans, or soaks into the ground to recharge aquifers, eventually returning to the sea.

## Reservoirs and residence time

Water can spend very different amounts of time in each reservoir — days in the atmosphere, but thousands of years in deep groundwater or polar ice. These "residence times" shape how quickly pollution or drought effects move through the system.

## Why it matters

The water cycle delivers fresh water to ecosystems and agriculture, shapes weather and erosion, and regulates temperature by moving enormous amounts of heat. Human activity — damming rivers, draining wetlands, and warming the climate — can intensify floods and droughts by altering the cycle's balance.`,
  },
  {
    title: 'Plate Tectonics',
    question: 'Why do continents move and earthquakes happen?',
    summary:
      "Plate tectonics is the theory that Earth's outer shell is broken into moving plates whose interactions build mountains, open oceans, and trigger earthquakes and volcanoes.",
    tags: ['earth science', 'geology', 'earthquakes', 'volcanoes', 'science'],
    language: 'en',
    content: `# Plate Tectonics

Plate tectonics is the unifying theory of geology. It explains that Earth's rigid outer layer — the **lithosphere** — is divided into about a dozen large plates and several smaller ones that slowly move over the hotter, partially molten rock beneath.

## What drives the motion

The plates ride on the **asthenosphere**, a ductile layer of the upper mantle. Heat escaping from Earth's interior drives slow convection, and forces such as the pull of dense, sinking slabs ("slab pull") move the plates a few centimeters per year — about as fast as fingernails grow.

## Three kinds of boundaries

- **Divergent.** Plates pull apart, and magma rises to form new crust — for example along the Mid-Atlantic Ridge.
- **Convergent.** Plates collide. One may dive beneath another (**subduction**), forming deep trenches, volcanoes, and earthquakes; or two continents may crumple together to raise mountains like the Himalayas.
- **Transform.** Plates slide past each other horizontally, as along California's San Andreas Fault, building stress that releases as earthquakes.

## Evidence

The theory grew from earlier ideas about continental drift. Matching coastlines, identical fossils on now-distant continents, and the striped magnetic patterns frozen into seafloor rock all confirmed that the plates have rearranged the globe over hundreds of millions of years — and continue to do so today.`,
  },
  {
    title: 'The Human Immune System',
    question: 'How does the body defend itself against disease?',
    summary:
      'The immune system is a layered network of cells, tissues, and molecules that detects and neutralizes pathogens while distinguishing the body’s own cells from foreign threats.',
    tags: ['biology', 'medicine', 'health', 'human body', 'science'],
    language: 'en',
    content: `# The Human Immune System

The immune system is the body's defense network against bacteria, viruses, fungi, and other threats. It works in overlapping layers, from physical barriers to highly specific cellular responses.

## Innate immunity

The first line of defense is fast but general. It includes physical barriers like skin and mucus, plus cells such as **macrophages** and **neutrophils** that engulf invaders. Inflammation and fever are part of this rapid response, designed to slow pathogens and recruit help.

## Adaptive immunity

If a threat persists, the **adaptive** system mounts a targeted attack:

- **B cells** produce **antibodies** — proteins that lock onto specific molecules (antigens) on a pathogen and mark it for destruction.
- **T cells** kill infected cells directly or coordinate the wider response.

A crucial feature is **memory**: after an infection, long-lived memory cells remain, so the body responds far faster if the same pathogen returns. This is the principle behind **vaccination**, which trains the immune system using a harmless version or fragment of a pathogen.

## When it goes wrong

The system must distinguish "self" from "non-self." Failures lead to **autoimmune diseases** (attacking the body's own tissue), **allergies** (overreacting to harmless substances), or **immunodeficiency** (too weak a response). Balancing sensitivity and restraint is one of biology's most remarkable achievements.`,
  },
  {
    title: 'Mitochondria',
    question: 'Why are mitochondria called the powerhouse of the cell?',
    summary:
      'Mitochondria are organelles that generate most of a cell’s usable energy through respiration, and carry their own DNA inherited from a distant bacterial ancestor.',
    tags: ['biology', 'cells', 'energy', 'genetics', 'science'],
    language: 'en',
    content: `# Mitochondria

Mitochondria are tiny structures inside most of our cells, famous as the "powerhouse of the cell" because they produce the majority of the energy that powers life.

## Making energy

Mitochondria carry out **aerobic respiration**, converting nutrients and oxygen into **ATP** (adenosine triphosphate), the molecule cells use as energy currency. The process happens across the mitochondrion's folded inner membrane, whose folds (cristae) increase the surface area available for energy-producing reactions. A single cell may hold from one to thousands of mitochondria depending on its energy needs — muscle and heart cells are especially rich in them.

## A bacterial ancestor

Mitochondria have their own small loop of DNA and reproduce by dividing, much like bacteria. This supports the **endosymbiotic theory**: that mitochondria descend from free-living bacteria that were engulfed by an early cell roughly two billion years ago and became permanent partners.

## Inherited through the mother

Because sperm contribute almost no mitochondria, **mitochondrial DNA** is passed down the maternal line largely unchanged. Geneticists use it to trace ancestry and human migration deep into the past.

## Health connections

Defects in mitochondria can cause a range of inherited disorders, and mitochondrial decline is studied as a factor in aging and in diseases such as Parkinson's.`,
  },
  {
    title: 'Ocean Currents',
    question: 'What makes ocean water move in giant loops around the world?',
    summary:
      'Ocean currents are large-scale flows of seawater driven by wind, temperature, and salinity differences; they redistribute heat around the planet and shape regional climates.',
    tags: ['earth science', 'oceanography', 'climate', 'geography', 'science'],
    language: 'en',
    content: `# Ocean Currents

Ocean currents are continuous, directed movements of seawater. They act like a planet-wide circulatory system, carrying heat, nutrients, and marine life across thousands of kilometers.

## Surface currents

Near the surface, currents are driven mainly by **wind**. The Earth's rotation bends their paths through the **Coriolis effect**, organizing them into large rotating systems called **gyres**. The Gulf Stream, for instance, carries warm water from the tropics toward Europe, giving Western Europe a milder climate than its latitude would suggest.

## Deep circulation

Below the surface, currents are driven by differences in water **density**, which depends on temperature and saltiness. Cold, salty water near the poles sinks and flows along the ocean floor, while warmer water rises elsewhere. This slow, global loop is called the **thermohaline circulation** or "ocean conveyor belt," and a full circuit can take roughly a thousand years.

## Why they matter

Currents moderate global temperatures by moving heat from the equator toward the poles. They drive nutrient **upwelling** that supports some of the world's richest fisheries, and they influence weather patterns like El Niño. Because the conveyor belt depends on cold, dense polar water sinking, scientists watch closely for signs that melting ice and warming seas could weaken it.`,
  },
  {
    title: 'The Greenhouse Effect',
    question: 'How do gases in the atmosphere keep the Earth warm?',
    summary:
      'The greenhouse effect is the warming that occurs when certain atmospheric gases trap heat radiating from the Earth’s surface, keeping the planet habitable but intensifying as those gases increase.',
    tags: ['climate', 'earth science', 'atmosphere', 'environment', 'science'],
    language: 'en',
    content: `# The Greenhouse Effect

The greenhouse effect is the natural process that keeps Earth warm enough to support life. Without it, the planet's average surface temperature would be well below freezing.

## How it works

Sunlight passes through the atmosphere and warms the Earth's surface. The surface then radiates that energy back outward as **infrared** (heat) radiation. Certain gases — chiefly **carbon dioxide, methane, water vapor, and nitrous oxide** — absorb part of this outgoing infrared and re-emit it in all directions, including back toward the ground. The result is that heat lingers in the lower atmosphere instead of escaping straight to space.

The name comes from a loose analogy to a greenhouse, though a real greenhouse warms mainly by blocking air movement rather than by trapping infrared.

## The natural balance

For most of history, the amount of greenhouse gas and the energy leaving Earth stayed in rough balance, keeping the climate relatively stable.

## The human influence

Burning fossil fuels, deforestation, and agriculture have raised concentrations of carbon dioxide and methane to levels not seen for hundreds of thousands of years. This **enhanced** greenhouse effect tips the balance, causing the planet to retain more heat. The consequences include rising global temperatures, shifting weather patterns, melting ice, and higher sea levels — the core mechanism behind modern climate change.`,
  },
  {
    title: 'Bioluminescence',
    question: 'How and why do some living things glow in the dark?',
    summary:
      'Bioluminescence is the production of light by living organisms through a chemical reaction, used for communication, camouflage, attracting prey, and finding mates.',
    tags: ['biology', 'chemistry', 'oceanography', 'animals', 'science'],
    language: 'en',
    content: `# Bioluminescence

Bioluminescence is the ability of living organisms to produce their own light. From fireflies blinking on a summer night to glowing waves on a dark beach, it appears across the tree of life — and is especially common in the deep sea.

## The chemistry

The glow comes from a chemical reaction rather than from heat, making it a form of "cold light" that wastes almost no energy. A light-emitting molecule called **luciferin** reacts with oxygen, helped by an enzyme called **luciferase**. The reaction releases energy as visible light, usually blue or green — colors that travel farthest through seawater.

## Why organisms glow

Bioluminescence serves many purposes:

- **Attracting prey.** The anglerfish dangles a glowing lure in front of its mouth.
- **Defense.** Some squid release glowing clouds to confuse predators; others use light to blend into the faint glow from above (counter-illumination).
- **Communication and mating.** Fireflies flash species-specific patterns to find partners.
- **Symbiosis.** Many animals don't make light themselves but host glowing bacteria in special organs.

## In the deep ocean

Sunlight fades to darkness a few hundred meters down, and below that, the vast majority of animals can produce light. In this lightless world, bioluminescence is less a curiosity than a primary language of survival.`,
  },
];
