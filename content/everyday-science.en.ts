import type { DraftArticle } from './types';
import { EDITORIAL_STYLE as STYLE } from './editorial-style';

// Batch: Everyday Science (English originals). Quality-tier editorial cluster
// answering the curiosity-driven "why/how" questions people genuinely wonder
// about — the science behind ordinary things. Seeded via
// scripts/seed-editorial.ts; zh variants share heroes by topicKey.

export const everydayScienceEn: DraftArticle[] = [
  {
    topicKey: 'why-sky-is-blue',
    title: 'Why Is the Sky Blue?',
    question: 'Why is the sky blue during the day and red at sunset?',
    summary:
      'Sunlight is white — a mix of all colors — but air scatters its shorter blue wavelengths far more than red, painting the whole sky blue. At sunset, light travels through more air, the blue is scattered away, and the leftover reds and oranges reach your eyes.',
    tags: ['science', 'physics', 'light', 'nature'],
    language: 'en',
    image: {
      prompt:
        'A beam of white light entering a translucent glass atmosphere and splitting, the shorter blue rays bouncing and scattering outward in all directions to fill the space with soft blue glow, while the red rays pass mostly straight through. ' +
        STYLE,
      alt: 'White light scattering its blue rays outward through a glass atmosphere',
    },
    sources: [
      { title: 'NASA Science — Why Is the Sky Blue?', url: 'https://spaceplace.nasa.gov/blue-sky/en/' },
      { title: 'NOAA — Light scattering and atmospheric optics', url: 'https://www.noaa.gov/' },
    ],
    content: `# Why Is the Sky Blue?

The sky is blue because of a tug-of-war between sunlight and air. Sunlight looks white, but it's actually a blend of every color of the rainbow mixed together. As that light pours through the atmosphere, the gas molecules in the air **scatter** it — knock it off in new directions — and here's the key fact: they scatter the short, blue wavelengths far more strongly than the long, red ones. So blue light gets flung all across the sky, and when you look up, blue is coming at you from every direction. The whole dome glows blue.

## The physics, gently

Light travels as waves, and the colors differ by **wavelength**: red light has long waves, blue and violet have short ones. When light hits something much smaller than its wavelength — like a single molecule of nitrogen or oxygen — it scatters in a way that strongly favors the shortest wavelengths. The effect (named Rayleigh scattering after the physicist who explained it) is dramatic: blue light scatters several times more than red. The sky is essentially blue light that has been bounced around the atmosphere countless times before reaching your eye.

## Two natural follow-up questions

**If blue scatters most, why isn't the sky violet?** Violet has an even shorter wavelength and scatters even more — but there's less violet in sunlight to begin with, and your eyes are more sensitive to blue than violet. The mix your brain perceives lands on blue.

**Why is the sun itself yellowish?** Because the blue has been scattered *away* from the direct beam. The light coming straight from the sun has lost some of its blue to the sky, leaving the disc looking yellow-white.

## Why sunsets turn red

At sunset the sun is low, so its light skims through a much **thicker slab of atmosphere** to reach you. Over that long path, essentially all the blue (and much of the green) gets scattered out of the beam before it arrives. What's left to reach your eyes are the long wavelengths — reds and oranges — which is why the setting sun and the clouds around it blaze warm colors. The same scattering that makes midday blue makes sunset red; only the path length changed.

## FAQ

**Why is the sky black in space?**
Because there's no air to scatter the sunlight. Astronauts see the sun and stars against pure black, even in daylight — no atmosphere, no blue.

**Does this explain why the ocean is blue?**
Partly different. The sky's blue reflects on water, but deep water also *absorbs* red light and scatters blue on its own, so the ocean is blue for overlapping reasons.

**Why are clouds white, not blue?**
Cloud droplets are much larger than air molecules, so they scatter *all* colors roughly equally. All colors mixed back together looks white.`,
  },
  {
    topicKey: 'how-vaccines-work',
    title: 'How Do Vaccines Actually Work?',
    question: 'How do vaccines train the immune system to protect us?',
    summary:
      'A vaccine shows your immune system a harmless preview of a germ so it can learn to recognize it in advance. Then it builds memory cells that remember the threat for years, so a real infection is defeated fast — often before you ever feel sick.',
    tags: ['science', 'biology', 'immune system', 'health'],
    language: 'en',
    image: {
      prompt:
        'A glass training-ground where a harmless glowing replica of a germ is shown to alert immune-cell sentinels, who study its shape and then form a row of bright memory badges stored on a shelf for future recognition. ' +
        STYLE,
      alt: 'Immune sentinels studying a harmless germ replica and storing memory badges',
    },
    sources: [
      { title: 'CDC — Understanding How Vaccines Work', url: 'https://www.cdc.gov/vaccines/hcp/conversations/understanding-vacc-work.html' },
      { title: 'WHO — How do vaccines work?', url: 'https://www.who.int/news-room/feature-stories/detail/how-do-vaccines-work' },
    ],
    content: `# How Do Vaccines Actually Work?

A vaccine works by **teaching your immune system to recognize a germ before you ever meet the real one.** Your immune system is already brilliant at fighting infections — but the first time it meets a new germ, it's slow, learning on the job while you get sick. A vaccine skips that dangerous first lesson: it shows your body a safe preview of the threat, so that if the real germ ever shows up, your defenses already know exactly what to do and crush it fast.

## What's actually in the preview

A vaccine contains something that *looks* like a specific germ to your immune system but **can't make you sick.** Depending on the vaccine, that might be:

- A weakened or inactivated version of the germ,
- Just a harmless piece of it (a surface protein), or
- Instructions (like mRNA) that tell your own cells to briefly make one harmless piece of the germ for your immune system to study.

In every case the principle is identical: present the immune system with the germ's recognizable "shape" (an antigen) without the danger.

## Recognize, respond, remember

When your immune system sees this antigen, it does three things:

1. **Recognizes** it as foreign.
2. **Responds** by producing antibodies — proteins tailored to latch onto that specific germ — and activating cells that destroy infected cells.
3. **Remembers** it, by creating long-lived **memory cells**.

That third step is the whole point. Those memory cells can persist for years or decades. If the real germ ever invades, they recognize it instantly and trigger a fast, massive response — often defeating the infection before you notice any symptoms at all. You got the immunity without having to survive the disease first.

## Why it sometimes takes more than one dose, and why a sore arm is normal

Some vaccines need multiple doses or boosters because immune memory can be built up stronger with repeated exposure, or can fade over time and need topping up. And the mild soreness, tiredness, or low fever some people feel afterward isn't the germ — it's your immune system *doing its job*, ramping up its response to the preview. A reaction is a sign the training is working, not that you're sick.

## FAQ

**Can a vaccine give me the disease it prevents?**
Standard vaccines can't cause the disease — they contain no live, capable germ (or only a weakened form that can't cause illness in healthy people). What you may feel is the immune response, not an infection.

**What is "herd immunity"?**
When enough people in a community are immune, the germ struggles to find new hosts and spread, which indirectly protects those who can't be vaccinated (newborns, people with certain illnesses). Protection becomes collective.

**Why do some vaccines last a lifetime and others need boosters?**
It depends on the germ and how durable the memory response is, and on whether the germ mutates (like flu) enough that last year's training no longer fits this year's version. Some threats are stable; others keep changing.`,
  },
  {
    topicKey: 'why-seasons-happen',
    title: 'What Actually Causes the Seasons?',
    question: 'What causes the seasons — is the Earth closer to the sun in summer?',
    summary:
      'Seasons are not caused by distance from the sun — a common myth. They happen because Earth is tilted on its axis, so each hemisphere leans toward the sun for half the year (summer) and away for the other half (winter), changing how directly sunlight hits the ground.',
    tags: ['science', 'astronomy', 'earth', 'nature'],
    language: 'en',
    image: {
      prompt:
        'A glowing glass globe visibly tilted on its axis orbiting a bright sun, sunlight striking the top hemisphere directly and spread thin across the bottom hemisphere at a shallow angle, the tilt clearly the cause. ' +
        STYLE,
      alt: 'A tilted globe with sunlight hitting one hemisphere directly and the other at a shallow angle',
    },
    sources: [
      { title: 'NASA Science — What Causes the Seasons?', url: 'https://spaceplace.nasa.gov/seasons/en/' },
      { title: 'NOAA — Earth\'s tilt and the seasons', url: 'https://www.noaa.gov/' },
    ],
    content: `# What Actually Causes the Seasons?

Let's clear up the most common science misconception right away: **the seasons are not caused by Earth getting closer to or farther from the sun.** In fact, Earth is slightly *closer* to the sun in January — during the Northern Hemisphere's winter. If distance were the cause, the whole planet would have summer and winter at the same time. It doesn't: when it's summer in Australia, it's winter in Canada. The real cause is the **tilt** of the Earth.

## The tilt is everything

Earth spins on an axis that is tilted about 23.5 degrees relative to its orbit around the sun. That tilt stays pointed in the same direction in space all year as Earth circles the sun. So for half the orbit, the Northern Hemisphere leans *toward* the sun, and for the other half it leans *away* — and the Southern Hemisphere does the opposite. That single fact produces everything we call the seasons.

## Why the tilt makes it warmer or colder

Leaning toward the sun changes the weather in two reinforcing ways:

- **Directness of sunlight.** When your hemisphere tilts toward the sun, sunlight strikes the ground more **directly** — concentrated, like a flashlight pointed straight down. When it tilts away, the same light hits at a **shallow angle**, spread thinly over more area, so each patch of ground gets less energy. Direct light heats far more effectively than slanted light.
- **Length of day.** The tilt also means the sun is above the horizon **longer** in summer, so there are more hours of heating and fewer hours of nighttime cooling.

More concentrated light, for more hours each day, adds up to summer. Slanted light for fewer hours adds up to winter.

## Why this explains everything else

- **Opposite hemispheres, opposite seasons:** when the north leans toward the sun, the south leans away — so their seasons are always reversed.
- **The equator barely has seasons:** it stays roughly side-on to the sun all year, so sunlight is always fairly direct — hence consistent warmth.
- **The poles get months of daylight or darkness:** the extreme tilt means in summer the sun never fully sets, and in winter it never fully rises.

## FAQ

**So Earth's distance from the sun does nothing?**
Its orbit is only slightly oval, so the distance change is small and is overwhelmed by the tilt effect. It's not zero, but it's a minor influence compared to the angle of sunlight.

**Why is the hottest weather usually after the longest day?**
This "seasonal lag" happens because land and oceans take weeks to absorb heat and warm up. The peak of incoming sunlight is the solstice, but the peak of accumulated warmth comes a month or two later.

**What is a solstice or equinox?**
Solstices are the two moments of maximum tilt toward or away from the sun (longest and shortest days); equinoxes are the two in-between moments when the tilt is sideways and day and night are nearly equal everywhere.`,
  },
  {
    topicKey: 'why-we-dream',
    title: 'Why Do We Dream?',
    question: 'Why do we dream, and do dreams actually mean anything?',
    summary:
      'Nobody knows the full answer, but the leading science suggests dreams aren\'t random: they appear to help the brain consolidate memories, process emotions, and rehearse situations. Most vivid dreaming happens during REM sleep, when the brain is almost as active as when awake.',
    tags: ['science', 'neuroscience', 'sleep', 'brain'],
    language: 'en',
    image: {
      prompt:
        'A sleeping glass head at night with the brain inside glowing busily, threads of light replaying and reorganizing scattered memory-fragments into ordered patterns, some fragments tagged with soft emotional colors being sorted and filed. ' +
        STYLE,
      alt: 'A sleeping brain glowing as it replays and files memory fragments by emotion',
    },
    sources: [
      { title: 'National Institute of Neurological Disorders and Stroke — Brain Basics: Sleep', url: 'https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-understanding-sleep' },
      { title: 'Sleep Foundation — Why Do We Dream?', url: 'https://www.sleepfoundation.org/dreams' },
    ],
    content: `# Why Do We Dream?

Honest answer first: **science doesn't fully know why we dream** — it's one of the genuine open questions about the brain. But "we don't know everything" doesn't mean "we know nothing." Researchers have strong, evidence-backed theories, and they point in a consistent direction: dreams probably aren't meaningless noise. They seem to be a byproduct — or even a function — of the essential overnight maintenance your brain performs while you sleep.

## When dreaming happens

Sleep cycles through stages, and the most vivid, story-like dreams cluster in a stage called **REM** (rapid eye movement) sleep, when — strangely — your brain is almost as active as when you're awake, even though your body is temporarily paralyzed (which conveniently stops you from acting dreams out). You cycle through REM several times a night, with REM periods getting longer toward morning, which is why you often wake mid-dream. You dream in lighter non-REM stages too, but those dreams tend to be vaguer.

## The leading theories

No single theory has won, and they may all be partly right:

| Theory | The idea |
| --- | --- |
| **Memory consolidation** | Dreaming helps sort the day's experiences, strengthening important memories and pruning the rest |
| **Emotional processing** | Dreams let you re-experience and defuse emotional events in a safe, offline state |
| **Threat/social rehearsal** | Dreaming simulates challenges (dangers, social situations) so you're better prepared for real ones |
| **The brain making sense of noise** | During REM the brain fires semi-randomly, and dreams are its attempt to weave a story from that activity |

Notice these overlap rather than compete: the brain could be filing memories, processing feelings, *and* spinning a narrative from the activity, all at once.

## Do dreams "mean" something?

Not in the fortune-telling sense — there's no evidence that dreams predict the future or carry universal hidden symbols. But they're not random either: dream content draws heavily on your recent experiences, worries, and emotions, so a dream can genuinely reflect what's on your mind. The meaning, when there is one, is personal and emotional, not a code to be decoded from a dream dictionary.

## FAQ

**Why do I forget my dreams so fast?**
The brain doesn't prioritize storing dreams into long-term memory, and the chemistry of REM sleep isn't ideal for memory formation. Dreams fade within minutes of waking unless you immediately rehearse them — which is why keeping a notepad by the bed "works."

**Does everyone dream?**
Almost certainly yes — people who say they never dream are thought to simply not remember them. Sleep studies show REM activity even in people who report no dreams.

**What are nightmares for?**
They may be the emotional-processing or threat-rehearsal system in overdrive, often triggered by stress or trauma. Occasional nightmares are normal; frequent, distressing ones can be worth addressing with a professional.`,
  },
  {
    topicKey: 'how-planes-fly',
    title: 'How Do Planes Actually Stay in the Air?',
    question: 'How do heavy airplanes generate enough lift to fly?',
    summary:
      'A wing generates lift by deflecting air downward — by Newton\'s third law, pushing air down pushes the wing up. Its shape and tilt make the air above flow faster at lower pressure too. Together these create enough upward force to hold tons of metal aloft.',
    tags: ['science', 'physics', 'flight', 'how things work'],
    language: 'en',
    image: {
      prompt:
        'A glass wing cross-section slicing through streamlines of glowing air, the air clearly bending downward off the trailing edge while an upward force-arrow lifts the wing, pressure shown lower above the wing and higher below. ' +
        STYLE,
      alt: 'A wing deflecting glowing airflow downward while an upward lift force rises',
    },
    sources: [
      { title: 'NASA Glenn — How Wings Lift the Plane / Dynamics of Flight', url: 'https://www.grc.nasa.gov/www/k-12/airplane/lift1.html' },
      { title: 'NASA — Four Forces of Flight', url: 'https://www.nasa.gov/audience/foreducators/k-4/features/F_Four_Forces_of_Flight.html' },
    ],
    content: `# How Do Planes Actually Stay in the Air?

It feels almost unbelievable that something as heavy as a loaded airliner can float on thin air — but the principle is solid physics. A wing's job is to generate **lift**, an upward force big enough to overcome the plane's weight, and it does this by one fundamental trick: **it pushes air downward.** By Newton's third law — every action has an equal and opposite reaction — pushing a huge amount of air *down* makes the air push the wing *up*. Hold that idea and the rest is detail.

## Two ways to describe the same lift

Physicists explain a wing's lift from two angles that ultimately agree:

- **Newton's view (air gets deflected down).** A wing is tilted slightly and shaped so that air flowing past it is bent **downward** as it leaves the trailing edge. The wing throws a continuous stream of air downward; the reaction force pushes the wing up. More air deflected, or deflected harder, means more lift.
- **Pressure view (faster air, lower pressure).** Because of the wing's shape and angle, air flows **faster over the top** than underneath. Faster-moving air has *lower pressure* (Bernoulli's principle), so there's higher pressure pushing up from below than pushing down from above — a net upward force.

These aren't rival explanations; they're two consistent descriptions of one phenomenon. Both are happening, and both produce the same lift.

## What controls how much lift

Three levers, all of which pilots and designers use:

- **Speed:** faster airflow over the wing means much more lift — which is why planes must accelerate down a long runway before they can leave the ground, and why they land slowly with extra help.
- **Wing area and shape:** bigger wings move more air; the curved profile is tuned to deflect air efficiently.
- **Angle of attack:** tilting the wing's nose up into the airflow increases lift — up to a point. Tilt too steeply and the smooth airflow breaks away, lift collapses, and the wing "stalls."

This is also why you see flaps extend from the wings during takeoff and landing: they temporarily enlarge and re-curve the wing to squeeze out extra lift at low speeds.

## FAQ

**Was the old "the top is longer so air must speed up to keep up" explanation wrong?**
That popular story (the "equal transit time" idea) is a flawed oversimplification — air over the top really does go faster, but not for that reason, and wings even fly upside down. The reliable core is: wings deflect air down, and pressure is lower on top.

**What keeps a plane moving forward?**
Engines provide **thrust**, overcoming **drag** (air resistance). Lift fights weight; thrust fights drag. Flight is the balance of those four forces.

**How do gliders fly with no engine?**
They trade altitude for speed, gently descending through the air so airflow keeps producing lift — and ride rising air currents to regain height. No engine needed, just air movement.`,
  },
  {
    topicKey: 'why-ice-floats',
    title: 'Why Does Ice Float (When Almost Everything Else Sinks)?',
    question: 'Why does ice float on water when most solids sink in their own liquid?',
    summary:
      'Water is strange: it expands when it freezes. Its molecules lock into an open, spacious crystal held by hydrogen bonds, making ice about 9% less dense than liquid water — so ice floats. This quirk lets lakes freeze top-down and life survive winter beneath.',
    tags: ['science', 'chemistry', 'water', 'nature'],
    language: 'en',
    image: {
      prompt:
        'A glass cross-section of water where liquid molecules tumble close together below, and frozen molecules above lock into an open hexagonal lattice with visible gaps, the spacious ice structure floating buoyantly on the denser liquid. ' +
        STYLE,
      alt: 'An open hexagonal ice lattice floating on densely packed liquid water molecules',
    },
    sources: [
      { title: 'USGS — Water Density and ice', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-density' },
      { title: 'Royal Society of Chemistry — Hydrogen bonding in water', url: 'https://edu.rsc.org/' },
    ],
    content: `# Why Does Ice Float (When Almost Everything Else Sinks)?

Ice floating in your drink is so familiar that it's easy to miss how *weird* it is. For almost every other substance on Earth, the solid form is **denser** than the liquid — drop solid wax into melted wax and it sinks. Water breaks this rule: solid water (ice) is **less** dense than liquid water, so it floats. The reason is a peculiar property of the water molecule, and that peculiarity turns out to be one of the reasons life on Earth survives winter.

## Density, in one sentence

Whether something floats comes down to **density** — how much mass is packed into a given space. Float if you're less dense than the liquid around you; sink if you're more dense. So the real question is: why does freezing make water *expand* and become less dense, when freezing makes most things contract?

## The open architecture of ice

Water molecules are slightly lopsided in charge, which lets them grip each other with weak attractions called **hydrogen bonds.** In liquid water, molecules are constantly jostling, sliding, and packing in fairly close. But when water freezes, those hydrogen bonds lock the molecules into a rigid, highly **ordered crystal** — and crucially, that crystal is *spacious*. To satisfy all their bonds, the molecules arrange into an open, hexagonal lattice with gaps built into the structure. The molecules in ice are actually held *farther apart* on average than in liquid water.

More space between the same molecules means less mass per volume — ice is about **9% less dense** than liquid water. That's exactly why an ice cube floats with about a tenth of itself above the surface, and why the same volume of water expands and can crack pipes when it freezes.

## Why this quirk matters for life

Because ice floats, water freezes from the **top down**. A pond ices over on the surface first, and that floating ice layer acts as an insulating blanket, slowing further freezing and keeping the water beneath liquid. Fish, plants, and other life survive the winter in that liquid layer below. If ice sank, lakes and even oceans would freeze solid from the bottom up, and aquatic life as we know it might never have made it through cold seasons. A small molecular accident has very large consequences.

## FAQ

**Is water densest at freezing point?**
No — and that's another oddity. Water is densest at about 4°C, slightly *above* freezing. As it cools past that toward 0°C it actually expands a little before turning to ice, which is why the coldest water in a lake sits at the top.

**Does salt water freeze and float the same way?**
Sea ice still floats (it's less dense than seawater), but salt lowers water's freezing point and changes the details. Pure ice that forms largely excludes the salt.

**Why does adding ice cool a drink so well?**
Beyond being cold, melting ice *absorbs* a lot of heat from the liquid to break those hydrogen bonds as it turns to water — pulling energy out of your drink in the process.`,
  },
  {
    topicKey: 'how-soap-works',
    title: 'How Does Soap Actually Clean?',
    question: 'How does soap remove grease and germs that water alone can\'t?',
    summary:
      'Soap molecules have a split personality: one end loves water, the other clings to grease and oil. They surround greasy dirt and germs, lift them off surfaces, and let water rinse everything away — which is also why soap is so effective against many viruses.',
    tags: ['science', 'chemistry', 'hygiene', 'how things work'],
    language: 'en',
    image: {
      prompt:
        'Glowing two-ended soap molecules surrounding a droplet of greasy dirt, their water-loving heads pointing outward into the water and grease-loving tails buried in the droplet, lifting it off a surface into a tidy sphere ready to rinse away. ' +
        STYLE,
      alt: 'Two-ended soap molecules encasing a grease droplet to lift it into water',
    },
    sources: [
      { title: 'Royal Society of Chemistry — How soap works (surfactants)', url: 'https://edu.rsc.org/' },
      { title: 'CDC — Show Me the Science: Why Wash Your Hands?', url: 'https://www.cdc.gov/handwashing/why-handwashing.html' },
    ],
    content: `# How Does Soap Actually Clean?

You already know the problem soap solves: water alone is hopeless against grease. Rinse a greasy pan under the tap and the oil just beads up and stays put. That's because grease and water famously don't mix. Soap works by being a clever **molecular matchmaker** — it bridges the gap between water and grease, so the water can finally carry the grease (and the germs riding in it) away.

## The two-faced molecule

The secret is the shape of a soap molecule. Each one is like a tiny tadpole with two very different ends:

- A **head** that is *hydrophilic* — "water-loving." It happily bonds with water.
- A long **tail** that is *hydrophobic* — "water-fearing" — but loves to cling to oil and grease.

This split personality is the whole trick. When you work up a lather on a greasy surface, the soap molecules arrange themselves with their grease-loving tails burrowing into the oil and their water-loving heads pointing outward toward the water.

## Surround, lift, and rinse

Thousands of soap molecules swarm a droplet of grease, tails in, heads out, until the greasy blob is completely wrapped in a ball with a water-friendly outer surface. These little spheres are called **micelles.** Now the once-repellent grease has a water-loving shell — so when you rinse, the running water grabs those micelles and washes the whole package, grease and trapped dirt and all, down the drain. Soap didn't dissolve the grease; it *packaged* it so water could carry it.

## Why this also destroys many germs

The same property makes soap a quiet hero of hygiene. Many germs — including coronaviruses and other enveloped viruses — are wrapped in an outer **fatty membrane.** Soap's grease-loving tails pry into and rip apart that fatty coat, tearing the germ to pieces, while the micelles also lift germs off your skin to be rinsed away. This is why **20 seconds of scrubbing with plain soap** is so effective: you're not just rinsing germs off, you're chemically dismantling many of them. The mechanical action of rubbing matters too — it dislodges what's stuck.

## FAQ

**Does the water need to be hot?**
Not really — warm water can help dissolve some greases faster and is more comfortable, but soap does the chemical work at any reasonable temperature. Thorough scrubbing time matters more than heat.

**Is antibacterial soap better than plain soap?**
For everyday handwashing, plain soap works just as well for removing and destroying germs, and health agencies generally don't find routine antibacterial soaps more effective. The soap-and-scrub mechanism is the key part.

**How is detergent different from soap?**
Detergents work on the exact same two-ended principle (they're "surfactants" too) but are synthesized to perform better in hard water and at various temperatures. Same idea, engineered for tougher conditions.`,
  },
  {
    topicKey: 'what-causes-rainbows',
    title: 'What Causes a Rainbow?',
    question: 'How do rainbows form, and why are the colors always in the same order?',
    summary:
      'A rainbow is sunlight bent and split inside raindrops. Each drop acts like a tiny prism, separating white light into its colors and reflecting them back to you. The geometry fixes the color order and bends the whole thing into an arc centered opposite the sun.',
    tags: ['science', 'physics', 'light', 'weather'],
    language: 'en',
    image: {
      prompt:
        'A single magnified glass raindrop with a ray of white light entering, bending, reflecting off the back interior, and exiting split into an ordered fan of spectral colors, with a faint full arc of color implied in the misty background. ' +
        STYLE,
      alt: 'White light entering a raindrop and exiting split into ordered spectral colors',
    },
    sources: [
      { title: 'NOAA SciJinks — How do rainbows form?', url: 'https://scijinks.gov/rainbow/' },
      { title: 'NASA Science — Light and the electromagnetic spectrum', url: 'https://science.nasa.gov/ems/' },
    ],
    content: `# What Causes a Rainbow?

A rainbow is a trick of light and water — specifically, **sunlight being bent, split, and bounced back to you by millions of raindrops.** It's not an object in a location you can walk to; it's an optical effect that depends entirely on where the sun, the rain, and *your eyes* are. That's why you can never reach the end of a rainbow, and why the person standing next to you sees a slightly different one: each rainbow is built just for the viewer.

## What happens inside a single raindrop

Follow one ray of sunlight into one spherical raindrop:

1. **It bends on entering.** Light slows and changes direction as it passes from air into water (refraction). Crucially, different colors bend by slightly different amounts — violet bends most, red least.
2. **It reflects off the back.** The ray travels to the far inside surface of the drop and bounces back.
3. **It bends again on exiting** — and by now the colors, each bent twice, have fanned out into the full spectrum.

So each raindrop takes in white sunlight and sends out a little spray of separated colors. A rainbow is what you see when millions of drops do this at once, each contributing one color to your eye depending on its position in the sky.

## Why the colors are always in the same order

Because the amount of bending is fixed by physics, **red always ends up on the outer edge of the arc and violet on the inner edge**, with orange, yellow, green, and blue in between — every single time. The order never scrambles because it's set by how much each wavelength refracts. The familiar sequence (red, orange, yellow, green, blue, violet) is simply the spectrum, sorted by wavelength.

## Why it's an arc, and always opposite the sun

The geometry only works at a specific angle — light comes back to your eye most strongly at about **42 degrees** from the point directly opposite the sun. All the directions at that same angle trace out a circle, which you see as the familiar arc (the ground usually hides the lower half). This is also why a rainbow is always in the part of the sky *opposite* the sun: you have to face away from the sun, with the rain in front of you, for the angles to line up.

## FAQ

**Why do double rainbows happen?**
Sometimes light reflects **twice** inside the drops before exiting. That second, fainter bow appears higher, and its colors are **reversed** (red on the inside) because the extra bounce flips the order.

**Can you ever reach the end of a rainbow?**
No — it's not a physical place. Move toward it and the geometry shifts with you, so the rainbow moves too. It exists only relative to your viewpoint.

**Do you need rain to see one?**
You need water droplets and sunlight at the right angle — so you also see rainbows in waterfall mist, garden sprinklers, and sea spray. The drops, not the rain cloud, are what matter.`,
  },
  {
    topicKey: 'why-we-age',
    title: 'Why Do We Age?',
    question: 'What actually causes our bodies to age over time?',
    summary:
      'Aging is the gradual accumulation of damage in our cells faster than the body can repair it — from worn chromosome tips and DNA errors to malfunctioning cells and rising inflammation. It\'s many overlapping processes, not one clock, which is why aging is so complex.',
    tags: ['science', 'biology', 'aging', 'health'],
    language: 'en',
    image: {
      prompt:
        'A row of glass cells over time, the early ones bright with neat coiled threads and crisp protective caps, the later ones accumulating faint cracks, frayed thread-tips, and small disordered fragments, repair-sparks slowing but still working. ' +
        STYLE,
      alt: 'Cells accumulating frayed thread-tips and small damage over time as repair slows',
    },
    sources: [
      { title: 'National Institute on Aging (NIH) — What Do We Know About Healthy Aging?', url: 'https://www.nia.nih.gov/health/what-do-we-know-about-healthy-aging' },
      { title: 'López-Otín et al., "The Hallmarks of Aging" (2013)', url: 'https://pubmed.ncbi.nlm.nih.gov/23746838/' },
    ],
    content: `# Why Do We Age?

Aging can feel like a single mysterious clock ticking down, but biologically it's better understood as **the slow accumulation of damage** — wear and tear at the level of cells and molecules that, over decades, the body becomes less and less able to repair. When you're young, repair keeps pace with damage. Over time, damage starts to win. There isn't one cause of aging; there are many overlapping ones, which is exactly why aging is so hard to stop and why no single "cure" exists.

## The main drivers of aging

Scientists have identified a set of interlocking processes — often called the "hallmarks of aging" — that together drive the decline. A few of the most important:

| Process | What goes wrong |
| --- | --- |
| **Telomere shortening** | Protective caps on the ends of chromosomes shorten each time a cell divides, eventually limiting division |
| **DNA damage** | Errors and damage accumulate in our genetic code faster than they're fixed |
| **Worn-out cells (senescence)** | Damaged cells stop dividing but linger, leaking signals that harm neighbors |
| **Protein problems** | Cells get worse at clearing damaged, misfolded proteins, which build up |
| **Failing power plants** | Mitochondria (cells' energy generators) become less efficient |
| **Chronic inflammation** | A low-grade, body-wide inflammation ("inflammaging") rises with age |

No single one of these *is* aging. They reinforce each other — damaged DNA creates worn-out cells, worn-out cells stoke inflammation, inflammation causes more damage — so the decline compounds.

## Why we age at all (the deeper question)

Evolution offers a reason aging exists in the first place: natural selection works hardest on keeping us healthy through our reproductive years, and its grip weakens afterward. Genes and trade-offs that benefit youth can carry costs that only show up later, when evolutionary pressure to fix them is weak. In short, bodies are tuned to get their genes into the next generation, not to last forever — so maintenance is "good enough," not perfect.

## Can anything slow it?

Aging itself can't be stopped today, but the **rate** of damage is partly influenced by how we live. Not smoking, regular physical activity, decent sleep, a reasonable diet, and managing chronic stress are repeatedly linked to slower decline and longer healthy lifespan — not magic, but the difference between aging well and aging hard. Research into the underlying mechanisms is active, but the proven levers remain unglamorously practical.

## FAQ

**Is there a maximum human lifespan?**
There appears to be a rough ceiling — even with perfect health, very few people pass ~115 years, suggesting accumulated damage eventually overwhelms repair. The current verified record is 122.

**Do bigger or smaller animals age faster?**
Generally smaller animals live shorter lives, but there are striking exceptions (some small bats and naked mole-rats live far longer than their size predicts), which is exactly why researchers study them.

**Will science ever "cure" aging?**
No one knows. Researchers are targeting individual hallmarks (clearing worn-out cells, protecting DNA), and some slow aging in lab animals — but translating that into safely extending healthy human life is unproven and likely far off.`,
  },
  {
    topicKey: 'what-is-electricity',
    title: 'What Is Electricity, Really?',
    question: 'What is electricity actually, and how does it power our devices?',
    summary:
      'Electricity is the flow of electric charge — usually electrons drifting through a wire, pushed by voltage. Power plants don\'t make electrons; they supply the "push" that moves the ones already in the wires, and that organized motion carries energy to your devices.',
    tags: ['science', 'physics', 'electricity', 'how things work'],
    language: 'en',
    image: {
      prompt:
        'A glass wire cross-section filled with countless tiny glowing charge-particles, a voltage source at one end creating a clear pressure that sets them all drifting in the same direction, their organized flow lighting a small device at the far end. ' +
        STYLE,
      alt: 'Glowing charges in a wire drifting together under voltage to light a device',
    },
    sources: [
      { title: 'U.S. Energy Information Administration — Electricity explained', url: 'https://www.eia.gov/energyexplained/electricity/' },
      { title: 'NASA — Electricity and magnetism basics', url: 'https://science.nasa.gov/' },
    ],
    content: `# What Is Electricity, Really?

We use the word "electricity" loosely, but at its core it means one thing: **the flow of electric charge.** Everything is made of atoms, and atoms contain charged particles — notably **electrons**, which carry a tiny negative charge. In certain materials, especially metals, some electrons are free to move around. When huge numbers of those electrons drift in the same direction through a wire, that organized flow *is* an electric current. Electricity is, quite literally, charge on the move.

## Three words that demystify it

A simple plumbing analogy makes the key terms click — picture water in pipes:

- **Voltage** is the *push* — like water pressure. It's the force that drives charges through a circuit. No pressure, no flow.
- **Current** is the *flow rate* — how much charge actually moves past a point each second (measured in amps).
- **Resistance** is how much the material *opposes* the flow — a narrow, obstructed pipe versus a wide open one.

More voltage pushes more current; more resistance allows less. That relationship (Ohm's law) governs nearly every circuit. And a current needs a complete **circuit** — an unbroken loop from source, through the device, and back — which is why flipping a switch (breaking the loop) instantly stops everything.

## A crucial misconception: the power plant doesn't send you electrons

Here's what surprises most people. The power station isn't shipping electrons to your house like water in a tanker. **The electrons are already in the wires.** What the power plant supplies is the *push* — the voltage that sets those already-present electrons jiggling and drifting. In the alternating current (AC) that flows from most outlets, the electrons don't even travel to you at all; they slosh back and forth in place, many times a second. What actually travels to your device, fast, is the **energy** carried by that coordinated motion — not the electrons themselves.

## How that becomes useful

When the flowing charge meets a device, the device forces it to do work on the way through: a heating element turns the flow into heat, a motor turns it into motion, an LED turns it into light, a chip uses tiny switched currents to compute. In every case, the moving charge delivers energy, and the device converts that energy into whatever you wanted.

## FAQ

**Is lightning the same electricity as in my wall?**
Same underlying phenomenon — a flow of charge — but lightning is an enormous, brief discharge equalizing built-up charge between cloud and ground, at vastly higher voltage than household power.

**What's the difference between AC and DC?**
In direct current (DC, like a battery) charge flows steadily one way; in alternating current (AC, from the grid) it rapidly reverses back and forth. AC is used for the grid because it's easy to step its voltage up and down for efficient long-distance transmission.

**Why are metals good conductors?**
Their atoms share a "sea" of loosely held electrons free to move, so charge flows easily. Insulators (rubber, glass) hold their electrons tightly, so charge can't flow — which is why wires are copper inside and plastic outside.`,
  },
];
