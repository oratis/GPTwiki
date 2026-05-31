import type { DraftArticle } from './types';

// Batch: Everyday Technology — "How Things Work". Original encyclopedic drafts.
export const howThingsWork: DraftArticle[] = [
  {
    title: 'How Wi-Fi Works',
    question: 'How does Wi-Fi send internet through the air?',
    summary:
      'Wi-Fi uses radio waves to carry data between devices and a router, encoding digital information onto specific frequency bands over short ranges without cables.',
    tags: ['technology', 'networking', 'wireless', 'internet', 'engineering'],
    language: 'en',
    content: `# How Wi-Fi Works

Wi-Fi lets devices connect to a network and the internet without cables, using **radio waves** to carry data through the air over short distances.

## Radio waves carrying data

At its core, Wi-Fi is two-way radio. A **router** is connected to the internet (often by a physical cable) and also contains a radio transmitter and receiver. Your phone or laptop has the same. They exchange data by encoding digital 1s and 0s onto radio waves — rapidly varying the wave's properties to represent information, a process called **modulation**.

## Frequency bands and channels

Wi-Fi mainly uses two frequency bands: around **2.4 GHz** and **5 GHz** (newer standards add 6 GHz).

- **2.4 GHz** travels farther and through walls better but is slower and more crowded (it shares space with microwaves and other devices).
- **5 GHz** is faster and less congested but has shorter range.

Each band is divided into **channels** so nearby networks can avoid interfering with one another.

## Translating to the internet

The router acts as a translator and traffic controller. It receives wireless data from your devices, then sends it onward over the wired internet connection, and routes incoming data back to the right device. Each device is identified by a unique hardware (MAC) address and assigned a local network address.

## Security

Because radio waves spread in all directions, anyone nearby could in principle listen in. Wi-Fi therefore **encrypts** the traffic — modern networks use the WPA2 or WPA3 standards — so that data is scrambled and a password is required to join.`,
  },
  {
    title: 'How Batteries Store Energy',
    question: 'How does a battery store and release electricity?',
    summary:
      'Batteries store energy chemically and release it as electricity through reactions that push electrons from one electrode to another; rechargeable types reverse the reaction.',
    tags: ['technology', 'chemistry', 'energy', 'engineering', 'science'],
    language: 'en',
    content: `# How Batteries Store Energy

A battery stores energy as chemical potential and converts it into electricity on demand. It is essentially a controlled chemical reaction harnessed to push electrons through a circuit.

## The basic parts

Every battery cell has three key components:

- A **negative electrode (anode)**.
- A **positive electrode (cathode)**.
- An **electrolyte**, a substance between them that allows charged ions to move but not electrons.

## How current flows

Inside the battery, a chemical reaction at the anode releases **electrons**. Because the electrolyte blocks electrons from crossing directly, they are forced to travel through the external circuit — your device — to reach the cathode. That flow of electrons *is* the electric current that powers the device. Meanwhile, charged **ions** move through the electrolyte to keep the chemistry balanced.

## Voltage and capacity

The choice of materials sets the **voltage** (the "push" behind the current), while the amount of active material sets the **capacity** (how long it lasts, measured in ampere-hours). This is why different chemistries suit different jobs.

## Rechargeable batteries

In a **rechargeable** battery, such as the **lithium-ion** cells in phones and electric cars, the reaction is reversible. Applying external electricity drives the chemistry backward, moving ions back to their starting electrode and restoring the stored energy. Over many cycles the materials slowly degrade, which is why batteries hold less charge as they age.

## A note on safety

Because they pack a lot of energy into a small space, damaged or overheated batteries — especially lithium-ion — can fail dangerously, which is why they include protective circuitry.`,
  },
  {
    title: 'How Touchscreens Work',
    question: 'How does a touchscreen know where your finger is?',
    summary:
      'Most modern touchscreens are capacitive: they sense the tiny change in an electric field your conductive finger causes, pinpointing touch location on a grid of electrodes.',
    tags: ['technology', 'electronics', 'engineering', 'devices', 'physics'],
    language: 'en',
    content: `# How Touchscreens Work

Touchscreens let us control devices by tapping the display directly. The most common type in phones and tablets is the **capacitive** touchscreen, which senses the electrical properties of your finger.

## Capacitive sensing

The screen is coated with a transparent conductive layer carrying a small, uniform **electric field**. The human body conducts electricity, so when your finger touches the glass, it draws off a tiny amount of charge, disturbing the field at that point.

Beneath the surface, a grid of electrodes (often arranged in rows and columns) detects exactly *where* the field changed. The device's controller reads these coordinates many times per second and reports them to the software as a touch.

## Multi-touch

Because the grid can detect changes at several points at once, capacitive screens support **multi-touch** — recognizing gestures like pinch-to-zoom and two-finger scroll. This is a big reason capacitive screens displaced older designs.

## Why gloves often fail

Since the technology relies on your finger being **conductive**, ordinary gloves block the effect — which is why touchscreen-friendly gloves use conductive thread in the fingertips. A plastic stylus won't work either, unless it is specially designed to mimic a finger's conductivity.

## Other types

Older or specialized screens use different methods. **Resistive** touchscreens, still found in some industrial and budget devices, have two flexible layers that physically press together when you push — these work with any object, including a gloved finger or plain stylus, but lack multi-touch and feel less responsive.`,
  },
  {
    title: 'How Refrigeration Works',
    question: 'How does a fridge make things cold?',
    summary:
      'Refrigerators move heat out of their interior using a refrigerant that absorbs heat as it evaporates and releases it as it condenses, driven in a continuous cycle by a compressor.',
    tags: ['technology', 'physics', 'engineering', 'thermodynamics', 'science'],
    language: 'en',
    content: `# How Refrigeration Works

A refrigerator does not "create cold" — it **moves heat** from inside the cabinet to the room outside. It does this using a clever cycle and a working fluid called a **refrigerant**.

## The key principle

When a liquid evaporates into a gas, it **absorbs heat** from its surroundings (think of how sweat cooling your skin). When a gas condenses back into a liquid, it **releases heat**. A fridge exploits this by making a refrigerant evaporate inside the cold compartment and condense outside.

## The refrigeration cycle

The refrigerant loops continuously through four stages:

1. **Compressor.** Squeezes the refrigerant gas, raising its pressure and temperature.
2. **Condenser coils** (on the back or bottom). The hot, high-pressure gas releases heat to the room and condenses into a liquid.
3. **Expansion valve.** The liquid passes through a narrow valve, dropping sharply in pressure and temperature.
4. **Evaporator coils** (inside the fridge). The cold liquid evaporates, absorbing heat from the food compartment and cooling it.

The gas then returns to the compressor, and the cycle repeats.

## Why the back is warm

The heat removed from inside has to go somewhere — it is dumped into the room through the condenser coils, which is why the back or sides of a fridge feel warm.

## The same idea, everywhere

Air conditioners and heat pumps use the identical cycle. A heat pump can even run it in reverse to *warm* a home, moving heat from the cold outdoors inside — an efficient form of heating.`,
  },
  {
    title: 'How Noise-Cancelling Headphones Work',
    question: 'How do headphones cancel out background noise?',
    summary:
      'Active noise-cancelling headphones use microphones to detect ambient sound and generate an opposite sound wave that destructively interferes with it, reducing steady background noise.',
    tags: ['technology', 'sound', 'physics', 'engineering', 'audio'],
    language: 'en',
    content: `# How Noise-Cancelling Headphones Work

Noise-cancelling headphones reduce unwanted background sound, making travel and noisy environments more bearable. The advanced versions do it with a neat trick of physics called **destructive interference**.

## Sound is waves

Sound travels as waves of pressure in the air. When two waves meet, they combine. If the peak of one wave lines up with the trough of another — they are "out of phase" — the waves cancel out, producing silence. This is **destructive interference**.

## Active noise cancellation

Active noise-cancelling (ANC) headphones use this principle:

1. Tiny **microphones** on the headphones constantly sample the surrounding noise.
2. A processor instantly calculates a sound wave that is the exact **opposite** (inverted) of that noise.
3. The headphone speakers play this "anti-noise" alongside your music.

When the anti-noise meets the incoming noise, the two waves cancel, and you hear much less of the background.

## What it does well — and not

ANC works best on **steady, low-frequency** sounds like the constant drone of an airplane engine or air conditioning, because those are predictable enough to cancel. It struggles with **sudden, sharp, high-pitched** sounds like nearby speech, which change too quickly.

## Passive vs. active

There is also **passive** noise isolation — simply using padding and a tight seal to physically block sound, like earplugs. Many headphones combine both: passive isolation blocks high frequencies while active cancellation handles the low rumble.`,
  },
  {
    title: 'How LEDs Produce Light',
    question: 'Why are LED lights so efficient?',
    summary:
      'LEDs produce light when electrons move through a semiconductor and release energy directly as photons, wasting little heat — making them far more efficient than older bulbs.',
    tags: ['technology', 'electronics', 'physics', 'energy', 'engineering'],
    language: 'en',
    content: `# How LEDs Produce Light

An LED — **light-emitting diode** — turns electricity into light directly and efficiently. LEDs now dominate everything from phone screens to household bulbs because they use a fraction of the energy of older lighting.

## Light from a semiconductor

An LED is built from a **semiconductor**, a material whose ability to conduct electricity can be precisely engineered. It is made of two regions: one with extra electrons (n-type) and one with "holes" where electrons are missing (p-type).

When voltage is applied, electrons flow across the junction between the regions and fall into the holes. Each time an electron drops into a lower-energy hole, it releases a packet of energy as a **photon** — a particle of light. This process is called **electroluminescence**.

## Why the color is fixed

The energy of each photon — and therefore the **color** of the light — depends on the semiconductor material. Different compounds emit red, green, or blue light. White LEDs are usually blue LEDs coated with a phosphor that converts some of the blue into other colors, blending to white.

## Why they are efficient

Older **incandescent** bulbs make light by heating a wire until it glows, wasting roughly 90% of the energy as heat. LEDs convert electricity to light far more directly, producing much more light per watt and staying cool. They also last for tens of thousands of hours and switch on instantly.

## Everywhere you look

The same technology, scaled down and packed by the millions, forms the pixels of LED and OLED screens, and powers indicators, traffic lights, and displays across modern life.`,
  },
  {
    title: 'How Solar Panels Work',
    question: 'How do solar panels turn sunlight into electricity?',
    summary:
      'Solar panels use the photovoltaic effect: photons of sunlight knock electrons loose in semiconductor cells, and a built-in electric field channels them into a usable current.',
    tags: ['technology', 'energy', 'physics', 'renewable', 'engineering'],
    language: 'en',
    content: `# How Solar Panels Work

Solar panels convert sunlight directly into electricity using the **photovoltaic effect**. With no moving parts, they quietly generate power whenever the Sun shines.

## The photovoltaic cell

A solar panel is made of many **photovoltaic (PV) cells**, usually built from **silicon**, a semiconductor. Each cell has two layers of silicon treated to give one a slight surplus of electrons and the other a slight deficit. Where the layers meet, this creates a built-in **electric field**.

## From light to current

Sunlight arrives as packets of energy called **photons**. When a photon strikes the cell with enough energy, it knocks an electron loose from a silicon atom. The built-in electric field pushes these freed electrons in a single direction, and metal contacts collect them. That directed flow of electrons is an electric **current** — usable electricity.

## DC to AC

PV cells produce **direct current (DC)**. Homes and the grid use **alternating current (AC)**, so a device called an **inverter** converts the panel's DC output into AC. Excess power can be stored in batteries or fed back into the grid.

## What affects output

A panel's output depends on sunlight intensity, angle, temperature, and shading — even partial shade on one cell can disproportionately cut a panel's output. Efficiency (the share of sunlight converted to electricity) for typical commercial silicon panels is around 20%.

## Why it matters

Because sunlight is abundant and free, solar power is a cornerstone of **renewable energy**. Falling costs have made it one of the cheapest sources of new electricity in much of the world, central to efforts to cut fossil-fuel emissions.`,
  },
  {
    title: 'How Microwave Ovens Heat Food',
    question: 'How does a microwave oven cook food so quickly?',
    summary:
      'Microwave ovens emit radio waves tuned to make water molecules in food rotate rapidly, generating heat throughout the food rather than just at the surface.',
    tags: ['technology', 'physics', 'engineering', 'food', 'science'],
    language: 'en',
    content: `# How Microwave Ovens Heat Food

A microwave oven heats food fast by targeting the **water molecules** inside it with a specific kind of radio wave, generating warmth from within rather than from an external flame or element.

## Microwaves and water

A component called a **magnetron** produces **microwaves** — a form of electromagnetic radiation — typically at a frequency of about 2.45 gigahertz. Water molecules are **polar**, meaning they have slightly positive and negative ends. The microwaves' rapidly alternating electric field makes these molecules flip back and forth billions of times per second. This frantic jostling is **friction at the molecular level**, and friction produces heat.

## Heating from the inside

Because the waves penetrate a few centimeters into the food, they heat a volume of it at once, rather than slowly conducting heat inward from the surface as a conventional oven does. That is why microwaves are so quick — though the very center of a thick item still relies partly on heat spreading inward, which is why "let it stand" instructions exist.

## Why some things behave oddly

- **Uneven heating** occurs because waves form hot and cold spots; a **turntable** rotates food to even this out.
- **Metal** can reflect the waves and cause sparks, which is why most metal containers are unsafe.
- Foods with little water, like dry bread, heat poorly, while water-rich foods heat fast.

## Is it safe?

Microwaves are **non-ionizing** radiation — they lack the energy to alter atoms or make food radioactive. A metal mesh in the door reflects the waves back inside, keeping them contained. The food is simply heated; it is not chemically transformed by the radiation itself.`,
  },
];
