import type { DraftArticle } from './types';
import { aiInPracticeEn } from './ai-in-practice.en';

// Batch: AI in Practice (deutschsprachige Muttersprachler-Fassung / Pilot der
// Phase-2-Sprachexpansion). Teilt sich dieselben topicKeys mit en/zh; die
// Hero-Bilder werden pro topicKey aus dem bereits in GCS gecachten Bestand
// wiederverwendet (keine zusätzlichen Bildgenerierungskosten). Die Texte sind
// keine maschinelle Übersetzung, sondern für deutschsprachige Leser
// ausformuliert.

const promptOf = (key: string): string => {
  const hit = aiInPracticeEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const aiInPracticeDe: DraftArticle[] = [
  {
    topicKey: 'rag-vs-fine-tuning',
    title: 'RAG oder Fine-Tuning: Was solltest du wählen?',
    question: 'Sollte ich RAG oder Fine-Tuning nutzen, um ein LLM an meine Daten anzupassen?',
    summary:
      'RAG speist zur Abfragezeit aktuelles, überprüfbares Wissen ein, während Fine-Tuning das Verhalten eines Modells verändert. Die meisten Teams sollten mit RAG beginnen und Fine-Tuning nur für Stil, Format oder Latenzziele ergänzen.',
    tags: ['ai', 'llm', 'rag', 'fine-tuning', 'maschinelles lernen'],
    language: 'de',
    image: { prompt: promptOf('rag-vs-fine-tuning'), alt: 'Abrufpipeline und feinjustiertes Gitter speisen einen einzigen neuronalen Kern' },
    sources: [
      { title: 'Lewis et al., „Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (2020)', url: 'https://arxiv.org/abs/2005.11401' },
      { title: 'Hu et al., „LoRA: Low-Rank Adaptation of Large Language Models" (2021)', url: 'https://arxiv.org/abs/2106.09685' },
      { title: 'Gao et al., „Retrieval-Augmented Generation for Large Language Models: A Survey" (2023)', url: 'https://arxiv.org/abs/2312.10997' },
    ],
    content: `# RAG oder Fine-Tuning: Was solltest du wählen?

Kurz gesagt: Wenn dein Problem ist, **was das Modell weiß**, nutze Retrieval-Augmented Generation (RAG); wenn dein Problem ist, **wie sich das Modell verhält**, nutze Fine-Tuning. Die beiden sind keine Rivalen — ausgereifte Systeme setzen oft beides ein — aber als erste Investition ist RAG günstiger zu bauen, leichter zu aktualisieren und leichter zu prüfen.

## Was jede Technik tatsächlich tut

**RAG** lässt das Modell eingefroren und verändert seine *Eingabe*. Zur Abfragezeit durchsucht ein Retriever deine Dokumente (meist über Embeddings in einem Vektorindex), und die relevantesten Passagen werden in den Prompt eingefügt, damit das Modell aus ihnen antwortet. Das Wissen liegt in einer Datenbank, die du jederzeit bearbeiten kannst.

**Fine-Tuning** verändert die *Gewichte* des Modells. Du trainierst auf Beispielpaaren aus Eingabe und Ausgabe, sodass das Modell einen Ton, ein Format, eine Richtlinie oder Fachsprache verinnerlicht. Mit parametereffizienten Methoden wie LoRA braucht das keine riesige Hardware mehr — aber das Ergebnis ist eingebrannt, bis du erneut trainierst.

## Entscheidungstabelle

| Deine Situation | Bessere Wahl | Warum |
| --- | --- | --- |
| Fakten ändern sich wöchentlich (Preise, Richtlinien, Doku) | RAG | Aktualisiere den Index, nicht das Modell |
| Antworten müssen Quellen zitieren | RAG | Abgerufene Passagen dienen zugleich als Belege |
| Privater Korpus zu groß zum Auswendiglernen | RAG | Retrieval skaliert mit Speicher, nicht mit Parametern |
| Ausgabe muss einem strikten Hausstil oder Schema folgen | Fine-Tuning | Stil ist Verhalten, kein Wissen |
| Du brauchst ein kleines, schnelles, günstiges Spezialmodell | Fine-Tuning | Destilliere die Aufgabe in weniger Parameter |
| Prompts sind durch Anweisungen und Beispiele riesig geworden | Fine-Tuning | Verlagere wiederkehrende Anweisungen in die Gewichte |
| Modell missversteht Fachjargon | Beides | Retrieval liefert Kontext; Tuning korrigiert die Deutung |

## Wann RAG der richtige erste Schritt ist

- **Aktualität**: Dein Wissen ändert sich schneller, als du je neu trainieren würdest.
- **Nachvollziehbarkeit**: Regulierte und kundennahe Antworten brauchen eine „laut Dokument X"-Verankerung, die zudem messbar Halluzinationen verringert.
- **Iterationsgeschwindigkeit**: Ein funktionierender Prototyp ist ein paar Tage Engineering; keine GPUs, kein Labeln von Trainingsdaten.
- **Mandantentrennung**: Die Daten jedes Kunden bleiben in ihrem eigenen Index, statt in gemeinsame Gewichte zu sickern.

Der Preis ist ein zusätzliches bewegliches Teil: Chunking, Embeddings, Indexqualität und Retrieval-Bewertung werden Teil deines Produkts. Schlechtes Retrieval, nicht das Modell, ist der häufigste Fehlerpunkt von RAG-Systemen.

## Wann sich Fine-Tuning auszahlt

- **Formattreue**: stets gültiges JSON, ein festes Berichtsgerüst, der Ton deines Support-Teams.
- **Latenz und Token-Kosten**: Ein getuntes Modell kann Few-Shot-Beispiele und lange Anweisungen bei jedem Aufruf weglassen.
- **Fähigkeitstransfer auf kleine Modelle**: Ein kompaktes Open-Weight-Modell auf eine enge Aufgabe feinzujustieren kann ein viel größeres Allzweckmodell erreichen — zu einem Bruchteil der Servingkosten.
- **Implizite Fähigkeiten**: Klassifikations-, Extraktions- und Routing-Aufgaben mit Tausenden gelabelter Beispiele schlagen oft das Prompting.

Der Preis ist betrieblicher Natur: das Kuratieren von Trainingsdaten, das erneute Durchlaufen von Bewertungen bei jedem Update des Basismodells und die Einsicht, dass das Beheben eines schlechten Verhaltens einen weiteren Trainingszyklus bedeutet.

## Beides nutzen

Ein verbreitetes Produktionsmuster: Feinjustiere ein Modell, sodass es *dein Format und deine Verweigerungsrichtlinie zuverlässig befolgt*, und nutze RAG, um es *mit aktuellen Fakten zu versorgen*. Das Tuning macht das Verhalten vorhersehbar; das Retrieval hält den Inhalt wahr und aktuell.

## FAQ

**Bringt Fine-Tuning dem Modell neue Fakten bei?**
Nur schlecht. Gewichtsupdates können einige Fakten speichern, aber der Abruf ist unzuverlässig und Aktualisierungen erfordern erneutes Training. Retrieval ist der verlässliche Weg, Wissen hinzuzufügen.

**Ist RAG immer günstiger?**
Beim Bauen fast immer. Bei sehr hohem Abfragevolumen blähen lange abgerufene Kontexte die Token-Kosten pro Aufruf auf, und ein getuntes Modell mit kurzem Prompt kann günstiger werden. Miss es auf deinem Traffic-Niveau.

**Kann ich beides überspringen und einfach ein langes Kontextfenster nutzen?**
Für kleine, stabile Korpora — ja, Dokumente in den Prompt zu stopfen (eventuell mit Prompt-Caching) ist die einfachste Option. Jenseits einiger hundert Seiten oder bei häufigen Aktualisierungen gewinnt Retrieval bei Kosten und Antwortqualität.`,
  },
  {
    topicKey: 'prompt-engineering',
    title: 'Ein praktischer Leitfaden zum Prompt Engineering',
    question: 'Wie schreibe ich wirksame Prompts für große Sprachmodelle?',
    summary:
      'Der Großteil der Prompt-Qualität entsteht aus fünf Hebeln: klare Anweisungen, Kontext, Beispiele, explizites Ausgabeformat und Raum zum Nachdenken. Dieser Leitfaden behandelt die Techniken, die den Kontakt mit echter Arbeit überstehen.',
    tags: ['ai', 'llm', 'prompt engineering', 'produktivität'],
    language: 'de',
    image: { prompt: promptOf('prompt-engineering'), alt: 'Gläsernes Bedienpult formt einen Lichtstrahl in strukturierte Ausgabe' },
    sources: [
      { title: 'Wei et al., „Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)', url: 'https://arxiv.org/abs/2201.11903' },
      { title: 'Wang et al., „Self-Consistency Improves Chain of Thought Reasoning" (2022)', url: 'https://arxiv.org/abs/2203.11171' },
      { title: 'Prompt Engineering Guide (DAIR.AI)', url: 'https://www.promptingguide.ai' },
    ],
    content: `# Ein praktischer Leitfaden zum Prompt Engineering

Ein Prompt ist eine Spezifikation, kein Zauberspruch. Modelle scheitern an vagen Aufträgen aus demselben Grund wie Handwerker: Die Anforderungen wurden nie genannt. Fünf Hebel machen den Großteil der Qualität aus, die du erreichen kannst — Anweisungen, Kontext, Beispiele, Ausgabeformat und Raum zum Nachdenken.

## Die fünf Hebel

**1. Formuliere die Aufgabe wie einen Arbeitsauftrag.** Nenne das Ziel, die Zielgruppe, die Einschränkungen und wie „fertig" aussieht. „Fasse die Kündigungsklauseln dieses Vertrags für einen Nicht-Juristen zusammen, unter 150 Wörter, markiere alles Ungewöhnliche" schlägt „fasse das zusammen".

**2. Liefere den Kontext, den das Modell nicht erraten kann.** Füge das relevante Dokument, das Schema, das Fehlerprotokoll, den Styleguide ein. Trenne es mit klaren Begrenzern (XML-artige Tags oder abgegrenzte Blöcke) von den Anweisungen, damit Daten nie mit Anweisungen verwechselt werden.

**3. Zeigen, nicht nur erzählen (Few-Shot).** Zwei oder drei Beispiele aus Eingabe → Ausgabe definieren eine Aufgabe präziser als Absätze voller Beschreibung, und sie legen Randfälle fest: Nimm ein kniffliges Beispiel hinzu, nicht nur einfache.

**4. Lege das Ausgabeformat fest.** Verlange eine bestimmte Struktur — ein JSON-Objekt mit benannten Feldern, eine Markdown-Tabelle, „genau drei Stichpunkte". Strukturierte Ausgabe lässt sich leichter validieren, parsen und vergleichen. Wenn deine Plattform schemaerzwungene Ausgabe unterstützt, nutze sie.

**5. Gib Raum zum Nachdenken.** Bei Analyse, Mathematik oder mehrstufigen Entscheidungen lass das Modell das Problem durcharbeiten, bevor es antwortet (Chain-of-Thought). Forschung und Praxis sind sich einig, dass dies die Genauigkeit bei Schlussfolgerungsaufgaben spürbar verbessert; bei besonders wichtigen Antworten ziehe mehrere Denkpfade und nimm die Mehrheit (Self-Consistency).

## Technik → wann du sie einsetzt

| Technik | Einsatz, wenn |
| --- | --- |
| Rolle/Persona („Du bist ein erfahrener SRE") | Wortschatz und Urteilsvermögen sollen zu einem Beruf passen |
| Begrenzer um Eingaben | Bei jeglichen eingefügten Daten, immer |
| Few-Shot-Beispiele | Format oder Urteil ist abstrakt schwer zu beschreiben |
| Chain-of-Thought | Mathematik, Logik, Entscheidungen mit vielen Bedingungen |
| Zerlegung (mehrere Aufrufe) | Aufgaben mit klaren Phasen — extrahieren, dann beurteilen, dann schreiben |
| Self-Consistency (Abstimmung über Stichproben) | Besonders wichtige Einzelantworten, die zusätzliche Kosten wert sind |
| „Sage 'unbekannt', wenn unsicher" | Faktenfragen, bei denen eine falsche Antwort schlimmer ist als keine |

## Häufige Fehlermuster

- **Der Bauchladen-Prompt**: zwanzig Regeln, halb widersprüchlich. Modelle folgen der letzten und lautesten; kürze gnadenlos.
- **Versteckte Fragen**: zwei Dinge in einem Satz fragen und nur auf eines eine Antwort bekommen.
- **Impliziter Kontext**: auf „die Datei" oder „unser übliches Format" verweisen, das das Modell nie gesehen hat.
- **Überangepasste Beispiele**: drei nahezu identische Few-Shot-Beispiele lehren das Oberflächenmuster, nicht die Regel.
- **Keine Iterationsschleife**: Prompts sind Code. Halte ein kleines Testset echter Eingaben bereit, lass es nach jeder Änderung laufen und versioniere deine Prompts.

## Behandle Prompts als technische Artefakte

Sobald ein Prompt in der Produktion zählt: stelle ihn unter Versionskontrolle, hänge ein Regressions-Testset repräsentativer Eingaben mit erwarteten Eigenschaften an und lass es bei jedem Modell-Update neu laufen. Änderungen der Modellversion verschieben das Verhalten unbemerkt; deine Tests fangen es ab, bevor es deine Nutzer tun.

## FAQ

**Helfen Zauberphrasen wie „atme tief durch" wirklich?**
Gelegentlich, geringfügig und über Modelle hinweg unzuverlässig. Struktur, Kontext und Beispiele stellen Beschwörungen in den Schatten.

**Lange Prompts kosten mehr — lohnt sich die Ausgabe?**
Bei qualitätskritischen Aufgaben meist ja, aber schneide totes Gewicht ab: überflüssige Regeln und veraltete Beispiele verursachen Kosten ohne Genauigkeit. Prompt-Caching macht lange statische Präfixe auf den meisten Plattformen günstig.

**Wie unterscheidet sich das Prompting bei auf Schlussfolgern ausgelegten Modellen?**
Modelle, die intern nachdenken, bevor sie antworten, brauchen weniger Anleitung dazu, *wie* sie denken sollen — behalte Anweisungen zu Ziel und Einschränkungen bei und lass das Schritt-für-Schritt-Mikromanagement weg, es sei denn, die Ausgabequalität verlangt etwas anderes.`,
  },
  {
    topicKey: 'ai-agents',
    title: 'Was ist ein KI-Agent — und wann brauchst du wirklich einen?',
    question: 'Was ist ein KI-Agent, und wann braucht mein Anwendungsfall tatsächlich einen?',
    summary:
      'Ein KI-Agent ist ein LLM, das in einer Schleife mit Werkzeugen und einem Ziel läuft und seinen nächsten Schritt selbst entscheidet. Mächtig für offene Aufgaben, übertrieben für alles, was ein fester Ablauf erledigen kann — dieser Artikel erklärt den Unterschied.',
    tags: ['ai', 'llm', 'agenten', 'automatisierung', 'softwarearchitektur'],
    language: 'de',
    image: { prompt: promptOf('ai-agents'), alt: 'Ein von Werkzeugen umkreister neuronaler Kern wählt seinen Pfad über verzweigte Plattformen' },
    sources: [
      { title: 'Yao et al., „ReAct: Synergizing Reasoning and Acting in Language Models" (2022)', url: 'https://arxiv.org/abs/2210.03629' },
      { title: 'Anthropic Engineering, „Building Effective Agents"', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
      { title: 'Schick et al., „Toolformer: Language Models Can Teach Themselves to Use Tools" (2023)', url: 'https://arxiv.org/abs/2302.04761' },
    ],
    content: `# Was ist ein KI-Agent — und wann brauchst du wirklich einen?

Ein KI-Agent ist ein Sprachmodell, das in einer Schleife läuft: Es hat ein Ziel, eine Reihe von Werkzeugen und die Freiheit, seine nächste Aktion auf Basis dessen zu entscheiden, was die letzte Aktion zurückgegeben hat. Dieser letzte Halbsatz ist der entscheidende. Ein Skript, das ein LLM dreimal in fester Reihenfolge aufruft, ist ein **Workflow**; ein System, in dem das Modell selbst wählt, was als Nächstes zu tun ist, ist ein **Agent**.

## Die Anatomie eines Agenten

Jeder praktische Agent besteht aus vier Teilen:

- **Ein Modell**, das zu mehrstufigem Schlussfolgern und zuverlässigem Werkzeugaufruf fähig ist.
- **Werkzeuge** — Funktionen, die das Modell aufrufen darf: Suche, Codeausführung, Dateiänderungen, API-Aufrufe, Datenbankabfragen.
- **Kontext/Gedächtnis** — das laufende Protokoll aus Aktionen und Beobachtungen (plus mitunter externe Notizen, die die Sitzung überdauern).
- **Die Schleife** — Modell handelt → Umgebung antwortet → Ergebnis wird angehängt → Modell handelt erneut, bis es das Ziel als erreicht erklärt oder eine Abbruchbedingung erreicht.

Das Muster, Schlussfolgern und Werkzeugnutzung zu verschränken, wurde in der Forschung als ReAct populär und ist heute das Rückgrat von Coding-Assistenten, Recherche-Agenten und Computer-Use-Systemen.

## Agent vs. Workflow vs. Einzelaufruf

| Ansatz | Steuerungsfluss bestimmt durch | Am besten für | Fehlermodus |
| --- | --- | --- | --- |
| Einzelner LLM-Aufruf | Dich | Klassifikation, Entwürfe, Extraktion | Begrenzter Umfang |
| Workflow (verkettete Aufrufe) | Dich | Bekannte, wiederholbare mehrstufige Prozesse | Starr, wenn Eingaben variieren |
| Agent (Schleife + Werkzeuge) | Das Modell | Offene Aufgaben, deren Pfad vorab unbekannt ist | Kosten und Fehlerakkumulation |

## Wann ein Agent wirklich die richtige Wahl ist

- **Der Pfad ist vorab nicht erkennbar.** Einen fehlschlagenden Build debuggen, eine vage Frage recherchieren, einen Browser bedienen — jeder nächste Schritt hängt davon ab, was der vorige enthüllt hat.
- **Die Umgebung gibt Rückmeldung.** Compiler, Testsuiten und Suchergebnisse lassen den Agenten seine eigene Arbeit prüfen und sich selbst korrigieren. Agenten gedeihen genau dort, wo Verifikation günstig ist.
- **Die Aufgabe verträgt variable Kosten und Latenz.** Ein Agent braucht vielleicht fünf Schritte oder fünfzig.

## Wann es übertrieben ist

Wenn ein Mensch die Schritte aufschreiben kann, schreib sie auf — ein fester Workflow ist günstiger, schneller, debugbar und vorhersehbar. Formularausfüllen, Dokumentpipelines, geplante Berichte und Standard-ETL brauchen fast nie einen Agenten. Die ehrliche Engineering-Regel aus der Praxis lautet: **Nutze das einfachste Muster, das funktioniert, und füge Autonomie nur hinzu, wenn die Aufgabe es verlangt.**

## Was schiefgeht

- **Fehlerakkumulation**: Ein zu 95 % zuverlässiger Schritt hat etwa eine 60-%-Chance, zehn Schritte unbeschadet zu überstehen. Lange Schleifen brauchen Prüfpunkte, Verifikationsschritte oder menschliche Review-Tore.
- **Außer Kontrolle geratende Kosten**: Jede Schleifeniteration liest ein wachsendes Protokoll erneut. Setze Budgets und Schrittobergrenzen.
- **Mehrdeutige Ziele**: Ein Agent, dem man sagt „verbessere die Codebasis", wird *irgendetwas* tun; ob du es wolltest, ist eine andere Frage. Definiere „fertig".
- **Angriffsfläche**: Werkzeuge, die Dateien schreiben, Geld ausgeben oder Nachrichten senden können, brauchen Berechtigungsgrenzen und Prüfprotokolle.

## FAQ

**Sind „Multi-Agenten-Systeme" besser als ein guter Agent?**
Manchmal — parallele Recherche mit einem Synthesizer ist ein bewährtes Muster. Aber Koordination bringt eigene Fehlermodi mit; Multi-Agent ist eine Optimierung, kein Startpunkt.

**Brauchen Agenten besondere Modelle?**
Sie brauchen starke Zuverlässigkeit beim Werkzeugaufruf und Kohärenz über lange Horizonte. Führende Allzweckmodelle sind derzeit die sicherste Wahl; kleine Modelle taugen für enge, gut instrumentierte Schleifen.

**Wie bewerte ich einen Agenten?**
An Ergebnissen, nicht an Schritten: Definiere eine Reihe repräsentativer Aufgaben mit überprüfbaren Endzuständen, lass sie wiederholt laufen (Agenten sind nicht-deterministisch) und verfolge Erfolgsquote, Kosten und Schritte bis zur Fertigstellung.`,
  },
  {
    topicKey: 'local-llm-hardware',
    title: 'Welche Hardware brauchst du, um ein LLM lokal zu betreiben?',
    question: 'Welche Hardware brauche ich, um ein großes Sprachmodell auf meinem eigenen Rechner laufen zu lassen?',
    summary:
      'Nicht die Rechenleistung, sondern der Speicher entscheidet, was du betreiben kannst: Ein quantisiertes 8B-Modell passt in 8 GB, ein 32B braucht etwa 24 GB, und Modelle der 70B-Klasse wollen 48 GB oder mehr. Hier sind die echten Zahlen und die passende Software.',
    tags: ['ai', 'llm', 'lokales llm', 'hardware', 'gpu'],
    language: 'de',
    image: { prompt: promptOf('local-llm-hardware'), alt: 'Ein leuchtender neuronaler Gitterwürfel sitzt auf einer Grafikkarte in einem offenen PC-Tower' },
    sources: [
      { title: 'llama.cpp — LLM-Inferenz in C/C++ (GGUF, Quantisierung)', url: 'https://github.com/ggml-org/llama.cpp' },
      { title: 'Ollama — offene LLMs lokal betreiben', url: 'https://ollama.com' },
      { title: 'vLLM — LLM-Serving mit hohem Durchsatz', url: 'https://github.com/vllm-project/vllm' },
    ],
    content: `# Welche Hardware brauchst du, um ein LLM lokal zu betreiben?

Die bindende Beschränkung ist **Speicher, nicht Geschwindigkeit**. Die Gewichte eines Modells müssen für brauchbare Leistung in den VRAM deiner GPU (oder in den Unified Memory von Apple) passen, und die Rechnung ist einfach: Bei 4-Bit-Quantisierung braucht ein Modell rund **0,5–0,7 GB pro Milliarde Parameter**, plus 1–4 GB Spielraum für den Kontext-Cache.

## Die schnelle Dimensionierungstabelle

| Modellklasse | 4-Bit-Gewichte | Komfortables Setup | Beispiele, was läuft |
| --- | --- | --- | --- |
| 3–4B | ~2–3 GB | Jeder moderne Laptop, 8 GB RAM | Kleine Assistenten, Autovervollständigung |
| 7–9B | ~4–6 GB | 8-GB-GPU oder 16-GB-Mac | Kleine Llama-/Qwen-/Mistral-Modelle |
| 13–14B | ~8–10 GB | 12–16-GB-GPU oder 24-GB-Mac | Mittelgroße Chat- und Coding-Modelle |
| 30–34B | ~18–22 GB | 24-GB-GPU (z. B. RTX 3090/4090) oder 36–48-GB-Mac | Starke lokale Allrounder |
| 70–72B | ~40–48 GB | 2×24-GB-GPUs oder Mac Studio mit 64 GB+ | Open-Modelle nahe der Spitzenklasse |
| Großes Mixture-of-Experts | stark variabel | Workstation-/Server-Klasse | Doku des jeweiligen Modells prüfen |

Zwei Hinweise zum Lesen: Quantisierung (GGUF 4-Bit und ähnlich) tauscht einen kleinen, meist akzeptablen Qualitätsverlust gegen eine 4-fache Speicherersparnis gegenüber 16-Bit; und lange Kontexte vergrößern den KV-Cache — ein Chat mit 32k Kontext kann mehrere GB über die Gewichte hinaus hinzufügen.

## GPU, Mac oder CPU?

- **NVIDIA-GPU**: bester Durchsatz und beste Ökosystem-Unterstützung. Die VRAM-Größe zählt mehr als die GPU-Generation — eine gebrauchte 24-GB-RTX-3090 bleibt eine beliebte Budget-Wahl für Modelle der 30B-Klasse.
- **Apple Silicon**: Unified Memory macht Macs still hervorragend — eine M-Serie-Maschine mit 64 GB betreibt quantisierte Modelle der 70B-Klasse, langsamer als ein Dual-GPU-Aufbau, aber lautlos und unkompliziert. Kaufe RAM, nicht Kerne.
- **Nur CPU**: funktioniert via llama.cpp, aber rechne mit ein paar Token pro Sekunde bei kleinen Modellen — gut für Batch-Jobs, schmerzhaft für Chat.

## Software-Stack

- **Ollama** — der einfachste Einstieg: ein Befehl, um ein Modell zu laden und auszuführen, mit einer OpenAI-kompatiblen lokalen API.
- **llama.cpp** — die Engine unter weiten Teilen des Ökosystems; maximale Kontrolle über Quantisierung und Offloading.
- **LM Studio** — GUI zum Stöbern, Herunterladen und Chatten.
- **vLLM** — wenn du viele gleichzeitige Nutzer von einem echten GPU-Server bedienst statt von einem einzelnen Desktop.

## Was du ehrlicherweise erwarten kannst

Ein gut gewähltes quantisiertes Modell mit 8–14B bewältigt Zusammenfassungen, Entwürfe, Extraktion und ordentliche Coding-Hilfe. Open-Modelle der 30B–70B-Klasse sind wirklich stark, hinken aber bei schwierigem Schlussfolgern noch hinter den gehosteten Spitzenmodellen her. Die Gründe, lokal zu gehen, sind **Privatsphäre, Offline-Nutzung, unbegrenzte Token zu festen Kosten und Bastelfreiheit** — nicht, die Cloud bei der reinen Qualität zu schlagen.

## FAQ

**Spart der lokale Betrieb Geld?**
Nur bei dauerhaft hoher Nutzung. Hardware amortisiert sich, wenn du sonst täglich API-Token verfeuern würdest; für gelegentliche Nutzung sind APIs günstiger.

**Kann ich Modelle betreiben, die größer als mein VRAM sind?**
Ja — Schichten können in den System-RAM ausgelagert werden, zu hohen Geschwindigkeitskosten. Ein Modell, das 20 % über dem VRAM liegt, ist oft in Ordnung; 2-fach darüber ist eine Qual.

**Und Fine-Tuning lokal?**
Parametereffiziente Methoden (LoRA/QLoRA) machen das Feinjustieren kleiner Modelle auf einer 24-GB-GPU machbar. Vollständiges Fine-Tuning großer Modelle bleibt Rechenzentrumsterrain.`,
  },
  {
    topicKey: 'mcp-explained',
    title: 'Was ist MCP (Model Context Protocol)?',
    question: 'Was ist das Model Context Protocol und welches Problem löst es?',
    summary:
      'MCP ist ein offener Standard, der es jeder KI-Anwendung erlaubt, über ein einziges Protokoll mit jedem Werkzeug oder jeder Datenquelle zu verbinden — er ersetzt maßgeschneiderte Integrationen pro App und pro Werkzeug. Man kann es sich als USB-C für KI-Kontext vorstellen.',
    tags: ['ai', 'mcp', 'llm', 'integrationen', 'offene standards'],
    language: 'de',
    image: { prompt: promptOf('mcp-explained'), alt: 'Verschiedenfarbige Datenkabel laufen in einem einzigen universellen Kristallport zusammen' },
    sources: [
      { title: 'Model Context Protocol — offizielle Website und Spezifikation', url: 'https://modelcontextprotocol.io' },
      { title: 'Anthropic, „Introducing the Model Context Protocol"', url: 'https://www.anthropic.com/news/model-context-protocol' },
    ],
    content: `# Was ist MCP (Model Context Protocol)?

Das Model Context Protocol (MCP) ist ein offener Standard, um KI-Anwendungen mit externen Werkzeugen und Daten zu verbinden. Davor musste jede KI-App für jedes Werkzeug eine maßgeschneiderte Integration bauen — N Apps × M Werkzeuge bedeuteten N×M Adapter. MCP faltet das in N + M zusammen: Eine App implementiert das Protokoll einmal als *Client*, ein Werkzeug stellt es einmal als *Server* bereit, und jeder Client kann mit jedem Server sprechen. Der gängige Vergleich hat sich durchgesetzt, weil er zutrifft: **USB-C für KI**.

## Warum es existiert

LLMs sind nur so nützlich wie der Kontext, den sie erreichen können. Dein Assistent wird dramatisch fähiger, wenn er deine Dateien lesen, deine Datenbank abfragen, deine Tickets durchsuchen oder eine Nachricht senden kann — aber das ad hoc zu verdrahten führte zu fragilen, nicht portierbaren Integrationen mit nur einem Anbieter. MCP, Ende 2024 von Anthropic eingeführt und seither branchenweit breit übernommen, standardisiert diese Verdrahtung. Stand 2026 zählt das Ökosystem Tausende von Community- und Anbieter-Servern für alles von GitHub und Slack bis zu Datenbanken und Browsern.

## Wie es funktioniert

MCP hat drei Rollen:

- **Host** — die KI-Anwendung, der der Nutzer gegenübersteht (eine Chat-App, eine IDE, eine Agenten-Laufzeitumgebung).
- **Client** — die Protokollverbindung, die der Host öffnet, eine pro Server.
- **Server** — ein (meist kleines) Programm, das Fähigkeiten über das Protokoll bereitstellt, entweder lokal über stdio oder remote über HTTP.

Ein Server kann drei Arten von Fähigkeiten anbieten:

| Primitiv | Was es ist | Beispiel |
| --- | --- | --- |
| **Tools** | Funktionen, die das Modell aufrufen darf | \`create_issue\`, \`query_database\` |
| **Resources** | Daten, die der Host in den Kontext lesen kann | Eine Datei, ein Schema, ein Dashboard |
| **Prompts** | Wiederverwendbare parametrisierte Vorlagen | „Prüfe diesen PR mit unserer Checkliste" |

Das Modell des Hosts sieht Tool-Definitionen, entscheidet, wann es sie aufruft, und der Server führt aus und liefert Ergebnisse zurück — das Protokoll regelt Auffinden, Aufruf und Transport einheitlich.

## MCP vs. einfaches Function Calling

Function Calling ist, wie ein *Modell* eine Funktion aufruft, die ihr Entwickler in genau dieser einen Anwendung registriert hat. MCP standardisiert die Schicht darum herum: woher die Werkzeuge kommen, wie sie aufgefunden, authentifiziert und transportiert werden — sodass derselbe Server ohne Codeänderungen in jeder MCP-fähigen App funktioniert. Sie ergänzen sich: Unter der Haube erreicht ein MCP-Tool-Aufruf das Modell weiterhin als Function Calling.

## Erste Schritte

Der praktische Einstieg ist die Nutzung bestehender Server, nicht das Schreiben eines eigenen: Die meisten großen KI-Clients erlauben es, einen MCP-Server mit ein paar Zeilen Konfiguration hinzuzufügen, und offizielle SDKs (TypeScript, Python und andere) machen das Schreiben eines eigenen Servers zu einem Nachmittagsprojekt — definiere ein paar typisierte Funktionen, und jeder MCP-Client kann sie nutzen.

## FAQ

**Ist MCP an einen Modellanbieter gebunden?**
Nein. Es begann bei Anthropic, ist aber eine offene Spezifikation mit Mehr-Anbieter-Übernahme und einem offenen Governance-Prozess; Clients und Server existieren in allen großen Ökosystemen.

**Ist es sicher, beliebige Server zu verbinden?**
Behandle MCP-Server wie Browsererweiterungen: Sie laufen mit echten Berechtigungen. Nutze vertrauenswürdige Quellen, prüfe, welche Werkzeuge ein Server bereitstellt, und bevorzuge Hosts, die für jede sensible Aktion eine ausdrückliche Nutzerfreigabe verlangen.

**Wann sollte ich einen eigenen Server schreiben?**
Wenn dein Team eine interne API oder einen Datensatz hat, den mehrere KI-Werkzeuge erreichen sollen — ein Server macht ihn für jeden MCP-fähigen Client verfügbar, den dein Unternehmen nutzt.`,
  },
  {
    topicKey: 'vector-databases',
    title: 'Was ist eine Vektordatenbank — und wann brauchst du eine?',
    question: 'Was ist eine Vektordatenbank und wann brauche ich tatsächlich eine?',
    summary:
      'Vektordatenbanken speichern Embeddings und finden die „nächste Bedeutung" statt exakter Treffer und treiben so semantische Suche und RAG an. Unterhalb von ~1 Mio. Vektoren genügen meist einfachere Werkzeuge wie pgvector.',
    tags: ['ai', 'vektordatenbank', 'embeddings', 'suche', 'rag'],
    language: 'de',
    image: { prompt: promptOf('vector-databases'), alt: 'Ein Abfragepunkt sendet Wellen durch geclusterte Konstellationen von Embedding-Vektoren' },
    sources: [
      { title: 'Malkov & Yashunin, „Efficient and Robust ANN Search Using HNSW Graphs" (2016)', url: 'https://arxiv.org/abs/1603.09320' },
      { title: 'FAISS — Bibliothek für effiziente Ähnlichkeitssuche', url: 'https://github.com/facebookresearch/faiss' },
      { title: 'pgvector — Vektorähnlichkeit für Postgres', url: 'https://github.com/pgvector/pgvector' },
    ],
    content: `# Was ist eine Vektordatenbank — und wann brauchst du eine?

Eine Vektordatenbank speichert **Embeddings** — Zahlenlisten, die die Bedeutung von Text, Bildern oder Audio repräsentieren — und beantwortet eine Abfrage extrem gut: *„finde die Elemente, die diesem hier am ähnlichsten sind."* Das ist die Operation hinter semantischer Suche, RAG-Retrieval, Empfehlungen und Duplikaterkennung. Ob du eine dedizierte brauchst, hängt fast vollständig vom Maßstab ab.

## Embeddings in einer Minute

Ein Embedding-Modell bildet Inhalte auf einen Punkt in einem hochdimensionalen Raum ab (üblich sind 256–3072 Dimensionen), sodass ähnliche Bedeutungen nahe beieinander landen. „Wie setze ich mein Passwort zurück" und „Ich bin aus meinem Konto ausgesperrt" teilen kaum Wortschatz, liegen als Vektoren aber dicht beieinander. Ähnlichkeit wird geometrisch gemessen — meist als Kosinus-Ähnlichkeit — sodass die Suche zu Folgendem wird: die Abfrage einbetten, die nächstgelegenen gespeicherten Punkte finden.

## Was es zu einem *Datenbank*-Problem macht

Eine Abfrage gegen jeden gespeicherten Vektor zu vergleichen (Brute Force) ist exakt, aber linear — gut für Tausende von Elementen, langsam für Millionen. Vektordatenbanken nutzen Indizes für die **approximative Nächste-Nachbarn-Suche (ANN)**, am bekanntesten HNSW-Graphen, die ~99 % der echten Nachbarn in einem winzigen Bruchteil der Zeit finden. Um diesen Kern herum fügen sie die üblichen Datenbank-Annehmlichkeiten hinzu: Metadaten-Filterung („nur die Dokumente dieses Mandanten"), Aktualisierungen und Löschungen, Persistenz und horizontale Skalierung.

## Wann du eine brauchst — ehrlich

| Korpusgröße | Sinnvolle Wahl |
| --- | --- |
| Bis ~100k Vektoren | Ein Array im Speicher, FAISS oder SQLite-Erweiterungen — Brute Force genügt |
| ~100k–einige Millionen | **pgvector im Postgres, das du ohnehin betreibst** — die pragmatische Standardwahl |
| Viele Millionen, hohe QPS, mandantenfähig | Dedizierte Engine: Qdrant, Milvus, Weaviate oder verwaltete Dienste wie Pinecone |

Der häufigste Architekturfehler ist, für 50.000 Chunks ein neues Stück Infrastruktur hinzuzufügen. Wenn du bereits Postgres betreibst, hält pgvector die Vektoren neben deinen relationalen Daten, transaktional und verknüpfbar. Greife zu einer dedizierten Engine, wenn du echte Größe, strikte Latenzziele oder schwere gefilterte Suche hast.

## Qualitätshebel, die mehr zählen als die Datenbank

- **Chunking**: Wie du Dokumente aufteilst, beeinflusst das Retrieval stärker als die Wahl der Engine. Chunks sollten in sich geschlossene Gedanken sein, oft 200–800 Token mit Überlappung.
- **Wahl des Embedding-Modells**: Neuere mehrsprachige Modelle schlagen ältere deutlich; ein Korpus neu einzubetten ist lästig, also wähle bewusst.
- **Hybride Suche**: Vektorähnlichkeit mit klassischem Schlagwort-Scoring (BM25) zu kombinieren fängt Namen, Codes und seltene Begriffe ein, die Embeddings verwischen.
- **Reranking**: 50 Kandidaten günstig abzurufen und die besten mit einem Cross-Encoder neu zu bewerten hebt die Antwortqualität meist stärker als das Tunen des Index.

## FAQ

**Verraten Embeddings meine Daten an den Embedding-Anbieter?**
Der Text geht an denjenigen, der das Embedding berechnet. Bei gehosteten APIs ist das der Anbieter (prüfe die Aufbewahrungsbedingungen); Open-Weight-Embedding-Modelle laufen vollständig lokal.

**Können Vektoren aktualisiert werden, wenn sich Dokumente ändern?**
Ja — aber es ist die Aufgabe deiner Pipeline, geänderte Dokumente neu zu chunken und neu einzubetten. Veraltete Vektoren, die still alten Inhalt ausliefern, sind der klassische Produktionsfehler.

**Ist eine größere Embedding-Dimension besser?**
Nicht automatisch. Höhere Dimensionen kosten Speicher und Latenz; viele moderne Modelle bieten kürzbare Dimensionen, bei denen 512–1024 nahezu die gesamte Qualität bewahren. Benchmarke auf deinem eigenen Retrieval-Set.`,
  },
  {
    topicKey: 'ai-coding-assistants',
    title: 'Wie du echten Nutzen aus KI-Coding-Assistenten ziehst',
    question: 'Wie nutze ich KI-Coding-Assistenten effektiv, ohne die Codequalität zu beschädigen?',
    summary:
      'KI-Coding-Werkzeuge bringen ihre größten Gewinne bei Boilerplate, Tests und unbekanntem Terrain — sofern du ihnen Kontext gibst und ihre Ausgabe überprüfst. Praktiken, die funktionieren, Risiken, die zu managen sind, und wohin die Zeit tatsächlich fließt.',
    tags: ['ai', 'programmierung', 'coding-assistenten', 'entwicklerwerkzeuge', 'produktivität'],
    language: 'de',
    image: { prompt: promptOf('ai-coding-assistants'), alt: 'Menschliche und KI-Hände bauen gemeinsam eine Brücke aus Code-Blöcken' },
    sources: [
      { title: 'Peng et al., „The Impact of AI on Developer Productivity: Evidence from GitHub Copilot" (2023)', url: 'https://arxiv.org/abs/2302.06590' },
      { title: 'SWE-bench — Benchmarking von LLMs an echten GitHub-Issues', url: 'https://www.swebench.com' },
    ],
    content: `# Wie du echten Nutzen aus KI-Coding-Assistenten ziehst

KI-Coding-Assistenten sind wirklich produktiv — kontrollierte Studien haben bei in sich geschlossenen Aufgaben große Beschleunigungen gezeigt, und bis 2026 sind agentische Werkzeuge, die Tests ausführen und mehrere Dateien bearbeiten, weit über die Autovervollständigung hinausgewachsen. Doch die Gewinne sind ungleich verteilt, und sie hängen an zwei Gewohnheiten: **dem Werkzeug echten Kontext geben** und **prüfen, was es schreibt**. Teams, die eines davon auslassen, neigen dazu, subtile Fehler schneller auszuliefern.

## Wo sich die Gewinne konzentrieren

- **Boilerplate und Klebecode**: CRUD-Endpunkte, Konfiguration, Serialisierung, API-Client-Wrapper.
- **Tests**: gründliche Unit-Test-Suiten aus bestehendem Code zu generieren ist einer der Anwendungsfälle mit dem höchsten Wert pro Minute.
- **Unbekanntes Terrain**: eine neue Sprache, ein neues Framework oder eine neue API — der Assistent komprimiert Stunden des Doku-Lesens auf Minuten.
- **Mechanische Refactorings**: Umbenennungen, Signaturänderungen, das Anwenden eines bekannten Musters über Dateien hinweg.
- **Code erklären**: sich in ein Legacy-Modul einarbeiten, indem man Fragen dazu stellt.

Wo die Gewinne schrumpfen: tiefe Domänenlogik, performancekritische Kernels, große Architekturentscheidungen und Code, bei dem ein Irrtum teuer ist. Dort ist der Assistent ein Sparringspartner, kein Autor.

## Praktiken, die gute von schlechten Ergebnissen trennen

**Grenze die Anfrage ein.** „Füge diesem Endpunkt Paginierung hinzu, so wie \`listUsers\` es macht" schlägt „verbessere diese API". Kleine, überprüfbare Inkremente summieren sich; tausendzeilige Generierungen sind Review-Albträume.

**Speise Kontext bewusst ein.** Weise das Werkzeug auf die relevanten Dateien, die Fehlermeldung, das Schema, die Team-Konventionen hin. Moderne agentische Assistenten können Kontext selbst finden — aber die richtigen Startdateien zu benennen halbiert dennoch ihr Umherirren.

**Lass es die Tests ausführen.** Das größte einzelne Zuverlässigkeits-Upgrade ist eine Rückkopplungsschleife: Ein Assistent, der die Testsuite ausführen kann, fängt seine eigenen Fehler ab, statt sie an dich auszuliefern.

**Prüfe es wie den PR eines selbstbewussten Junioren.** Der Code liest sich plausibel; genau deshalb ist Überfliegen gefährlich. Prüfe Randfälle, Fehlerbehandlung und sicherheitsrelevante Bereiche (Eingabevalidierung, Authentifizierung, Abfragen) mit voller Aufmerksamkeit.

**Behalte Tests und Typen als Leitplanken.** Starke Typisierung und gute Abdeckung verwandeln „die KI hat etwas kaputtgemacht" von einem Produktionsvorfall in einen roten CI-Lauf.

## Aufgabentyp → realistische Erwartung

| Aufgabe | Erwartung |
| --- | --- |
| Unit-Tests für bestehenden Code | Große Beschleunigung, hohe Zuverlässigkeit |
| Boilerplate/Gerüstbau | Große Beschleunigung |
| Fehlerbehebung mit reproduzierbarem Test | Gut — agentische Werkzeuge treffen diese oft punktgenau |
| Feature in unbekanntem Framework | Große Stauchung der Lernkurve |
| Subtile Nebenläufigkeits-/Performance-Arbeit | Mäßige Hilfe; rigoros verifizieren |
| Systemdesign | Nützlicher Gesprächspartner, kein Orakel |

## Leitplanken auf Teamebene

Führe sie ausdrücklich ein, nicht heimlich: Einigt euch darauf, wo Assistenten erwünscht sind, verlangt für generierten Code dieselbe Review-Latte, achtet in regulierten Codebasen auf lizenzsensible wörtliche Ausgaben und haltet CI maßgeblich. Und schützt die Lernschleife — Junioren, die ohne zu lesen einfügen, stagnieren; Junioren, die den Assistenten ausfragen, lernen schneller als jede frühere Generation.

## FAQ

**Machen Assistenten mich zu einem schlechteren Entwickler?**
Sie erodieren Fähigkeiten, die du nicht mehr übst, und verstärken Fähigkeiten, die du anleitest. Ingenieure, die spezifizieren, zerlegen und verifizieren können, gewinnen Jahr für Jahr mehr Hebel; reine Tippgeschwindigkeit hört auf, eine Rolle zu spielen.

**Warum produziert der Assistent selbstbewusst Code, der nicht kompiliert?**
Er sagt plausiblen Code voraus und halluziniert manchmal APIs. Behandle Kompilierung und Tests als Schiedsrichter — und bevorzuge Werkzeuge, die Code kompilieren/ausführen, bevor sie ihn dir zeigen.

**Agent oder Autovervollständigung?**
Beides, für verschiedene Arbeit: Inline-Vervollständigung für den Fluss beim Schreiben; Agentenmodus für in sich geschlossene Aufgaben, die du beschreiben und verifizieren kannst, etwa „bring diese Tests zum Bestehen".`,
  },
  {
    topicKey: 'llm-hallucinations',
    title: 'Warum halluzinieren große Sprachmodelle?',
    question: 'Warum erfinden große Sprachmodelle Dinge, und wie lassen sich Halluzinationen verringern?',
    summary:
      'LLMs sind darauf trainiert, plausiblen Text zu erzeugen, nicht überprüfte Wahrheit — wenn das Wissen ausgeht, füllt flüssiges Raten die Lücke. Warum es passiert, wann es schlimmer wird und welche Gegenmaßnahmen tatsächlich wirken.',
    tags: ['ai', 'llm', 'halluzination', 'zuverlässigkeit', 'maschinelles lernen'],
    language: 'de',
    image: { prompt: promptOf('llm-hallucinations'), alt: 'Ein Strahl aus einem neuronalen Kern rendert feste Struktur und zerfließenden Nebel' },
    sources: [
      { title: 'Huang et al., „A Survey on Hallucination in Large Language Models" (2023)', url: 'https://arxiv.org/abs/2311.05232' },
      { title: 'Lin et al., „TruthfulQA: Measuring How Models Mimic Human Falsehoods" (2021)', url: 'https://arxiv.org/abs/2109.07958' },
      { title: 'Liu et al., „Lost in the Middle: How Language Models Use Long Contexts" (2023)', url: 'https://arxiv.org/abs/2307.03172' },
    ],
    content: `# Warum halluzinieren große Sprachmodelle?

Ein Sprachmodell ist darauf trainiert, eine Sache zu tun: Text vorherzusagen, der das Vorhergehende plausibel fortsetzt. Wahrheit und Plausibilität fallen meist zusammen — deshalb sind Modelle nützlich — aber wenn dem Modell der Fakt fehlt, nach dem du gefragt hast, verlangt das Trainingsziel weiterhin eine flüssige Ausgabe. Das Ergebnis ist eine selbstbewusste, wohlgeformte, falsche Antwort. Halluzination ist kein Fehler, der den LLMs angeschraubt wurde; sie ist das **Standardverhalten** plausibilitätsmaximierender Systeme am Rand ihres Wissens.

## Die Mechanik

- **Verlustbehaftete Kompression.** Das Training presst Terabyte an Text in eine feste Menge von Gewichten. Allgemeinwissen überlebt mit hoher Treue; seltene Fakten — Details einer Kleinstadt, kleinere Aufsätze, Nischen-Produktspezifikationen — werden verwischt oder gehen verloren, und das Modell kann nicht zuverlässig sagen, welche.
- **Kein Nachschlageschritt.** Ein einfaches Modell konsultiert vor dem Antworten keine Datenbank; es generiert aus dem statistischen Gedächtnis. Es gibt kein internes Signal, das „dies ist ein abgerufener Fakt" gegen „dies ist Mustervervollständigung" unterscheidet.
- **Training belohnt das Antworten.** Auf menschliche Präferenzen abgestimmte Modelle lernen, dass hilfreiche, selbstbewusste, vollständige Antworten hoch bewertet werden — historisch bestraften Benchmarks und Bewerter ein „Ich weiß es nicht" und brachten Modellen so das Raten bei.
- **Fehlerakkumulation.** Generierung ist sequenziell; ein falsches frühes Token (ein erfundener Name, ein falsches Jahr) wird zu einem kohärenten falschen Absatz ausgeschmückt.

## Wo es vorhersehbar schlimmer wird

Zitate und Quellenangaben (das Format ist leicht nachzuahmen, die Inhalte sind nicht gespeichert), präzise Zahlen und Daten, seltene Entitäten, lange Dokumente (Modelle achten weniger zuverlässig auf die Mitte langer Kontexte), im Text durchgeführte Arithmetik und jede Frage, die auf einer Unwahrheit fußt, die das Modell höflich akzeptiert.

## Gegenmaßnahmen, die wirken

| Gegenmaßnahme | Wogegen sie hilft |
| --- | --- |
| RAG / Verankerung in abgerufenen Dokumenten | Ersetzt Gedächtnis durch bereitgestellte Fakten; ermöglicht Zitate |
| Werkzeugnutzung (Taschenrechner, Code, Suche) | Lagert aus, was Modelle am schlechtesten berechnen |
| „Antworte nur aus dem Kontext; sonst sage unbekannt" | Gibt die Erlaubnis, sich zu verweigern |
| Niedrigere Temperatur bei Faktenaufgaben | Stutzt kreatives, aber falsches Sampling |
| Selbstverifikation / Prüfung in zweitem Durchgang | Fängt Widersprüche, die der erste Durchgang verpasst hat |
| Zitate vorgeschrieben + Stichproben-Workflow | Macht Fehler für Menschen auffindbar |
| Reasoning-Modelle bei schwierigen Problemen | Das Durcharbeiten von Schritten verringert unerzwungene Fehler |

Verankerung ist das Schwergewicht: Wenn die richtige Passage im Kontext steht, verschiebt sich die Aufgabe des Modells vom *Erinnern* zum *Lesen*, was es weit zuverlässiger tut. Deshalb bleibt RAG die Standardarchitektur für faktenorientierte Produkte.

## Lässt es sich vollständig lösen?

Nicht mit den derzeitigen Architekturen — ein System, das stets Text produzieren muss, wird mitunter ungestützten Text produzieren. Die Forschung senkt die Raten weiter (bessere Kalibrierung, das Training von Modellen zum Verzichten, Verifikationsschichten), und schlussfolgerungsfähige Modelle halluzinieren bei mehrstufigen Problemen weniger. Die Engineering-Haltung Stand 2026: Entwirf **unter der Annahme** verbleibender Halluzination — verankere Antworten, verlange Zitate für Behauptungen, die zählen, und behalte Menschen in der Schleife, wo Fehler teuer sind.

## FAQ

**Warum klingt das Modell SELBSTBEWUSSTER, wenn es falsch liegt?**
Flüssigkeit und Selbstbewusstsein sind stilistische Muster, die aus Text gelernt wurden, ohne Korrelation zur inneren Gewissheit. Nutze den Ton nicht als Wahrheitssignal.

**Hilft die Frage „bist du sicher?"**
Sie löst manchmal nützliche Selbstprüfung aus, manchmal eine unterwürfige Zustimmung zu deinem angedeuteten Zweifel. Unabhängige Verifikation schlägt das Ausfragen.

**Sind größere Modelle wahrheitstreuer?**
Bei breiter Faktentreue im Allgemeinen ja, aber keine Größe beseitigt das Erfinden — und der selbstbewusste Stil skaliert mit. Skalierung verkleinert das Problem; Verankerung und Verifikation managen den Rest.`,
  },
  {
    topicKey: 'open-vs-closed-llms',
    title: 'Open-Source- vs. Closed-Source-LLMs: Wie man wählt',
    question: 'Sollte ich auf Open-Source- oder Closed-Source-Sprachmodellen aufbauen?',
    summary:
      'Geschlossene APIs erkaufen Spitzenfähigkeit ohne jeden Betriebsaufwand; Open-Weight-Modelle erkaufen Kontrolle, Privatsphäre und günstige Skalierung. Die entscheidenden Faktoren sind Datensensibilität, Volumenökonomie und wie viel Leistung deine Aufgabe wirklich braucht.',
    tags: ['ai', 'llm', 'open source', 'strategie', 'infrastruktur'],
    language: 'de',
    image: { prompt: promptOf('open-vs-closed-llms'), alt: 'Ein offener Gitterkern neben einem versiegelten, polierten Kern mit einem Port' },
    sources: [
      { title: 'LMArena — Community-Rangliste zum Vergleich offener und geschlossener Modelle', url: 'https://lmarena.ai' },
      { title: 'Hugging Face — Hub für offene Modelle', url: 'https://huggingface.co/models' },
    ],
    content: `# Open-Source- vs. Closed-Source-LLMs: Wie man wählt

„Offen vs. geschlossen" ist weniger eine ideologische Frage als eine Beschaffungsfrage: **Wer betreibt das Modell, wer sieht deine Daten und wer trägt die betriebliche Last.** Geschlossene Modelle (per API ausgeliefert — die Familien GPT, Claude und Gemini) verkaufen Spitzenfähigkeit ohne jede Infrastruktur. Open-Weight-Modelle (die Familien Llama, Qwen, DeepSeek, Mistral und viele andere) übergeben dir die Gewichte und mit ihnen Kontrolle, Privatsphäre und die Rechnung fürs Serving.

Eine terminologische Anmerkung, die in Verträgen zählt: Die meisten „Open-Source"-Modelle sind genau genommen **Open-Weight** — du kannst sie herunterladen und betreiben, aber die Trainingsdaten sind nicht veröffentlicht und die Lizenzen können Nutzungsbeschränkungen enthalten. Lies die Lizenz, nicht das Marketing.

## Die Abwägungstabelle

| Dimension | Geschlossen (API) | Open-Weight (selbst gehostet) |
| --- | --- | --- |
| Spitzenfähigkeit | Spitzenklasse; am stärksten bei schwierigem Schlussfolgern | Top-Open-Modelle holen auf und führen bei Kosten pro Qualität |
| Kostenform | Pro Token, skaliert mit der Nutzung | Feste Infrastruktur + Betrieb, skaliert mit der Kapazität |
| Datenkontrolle | Daten durchlaufen den Anbieter (Aufbewahrungs-/Trainingsbedingungen prüfen) | Verlassen nie dein Netzwerk |
| Anpassung | Prompting, etwas gehostetes Fine-Tuning | Vollständiges Fine-Tuning, Quantisierung, Eingriffe |
| Betriebslast | Keine | GPUs, Serving-Stack, Upgrades, Rufbereitschaft |
| Stabilität | Modelle werden nach dem Zeitplan des Anbieters eingestellt | Die Gewichte gehören für immer dir |
| Compliance | Anbieterzertifizierungen | Einfachste Story für strikte Daten-Residenz-Regeln |

## Wann Geschlossenes gewinnt

Du brauchst das stärkste verfügbare Schlussfolgern; dein Volumen ist moderat oder schwankend; du hast keine GPU-/ML-Betriebskapazität; du willst, dass dir Fähigkeitszuwächse laufend geliefert werden. Für das erste Jahr der meisten Produktteams ist eine Spitzen-API der schnellste Weg herauszufinden, ob das Produkt überhaupt funktioniert — optimiere danach.

## Wann Offenes gewinnt

Daten dürfen nicht hinaus (Gesundheitswesen, Verteidigung, strikte Residenz); anhaltend hohes Volumen lässt die Pro-Token-Preise deine Margen dominieren; du brauchst tiefe Anpassung oder ein kleines, schnelles Spezialmodell, das für eine Aufgabe destilliert ist; du bettest ein Modell in Hardware oder Air-Gapped-Umgebungen ein; oder Anbieter-Lock-in ist ein strategisches Risiko, das zu vermeiden deine Aufgabe ist.

## Das Muster, bei dem die meisten reifen Teams landen

**Route, schwöre keine Treue.** Ein leistungsfähiges geschlossenes Modell bewältigt den schwierigen, volumenarmen Ausläufer; ein getuntes offenes Modell bewältigt den hochvolumigen, gut verstandenen Kern; sensible Workloads bleiben on-prem. Abstraktionsschichten und OpenAI-kompatible Serving-Stacks machen das Routing über mehrere Modelle günstig zu bauen, und der Abstand zwischen den Stufen wird jedes Quartal neu vermessen — denn Stand 2026 bewegt er sich weiter.

## FAQ

**Sind offene Modelle „eine Generation hinterher"?**
Der Abstand an der Spitze bleibt, hat sich aber dramatisch verringert, und für viele konkrete Aufgaben (Extraktion, Zusammenfassung, Routine-Coding) sind starke offene Modelle schlicht ausreichend. Benchmarke deine Aufgabe, nicht die Schlagzeilen.

**Ist Selbst-Hosting tatsächlich günstiger?**
Nur mit Auslastung. Eine GPU, die bei 5 % Kapazität bedient, ist die teuerste Token-Fabrik der Welt; verwaltete Open-Modell-APIs sind der Mittelweg — offene Gewichte, fremde GPUs.

**Kann ich später wechseln?**
Verhalten auf Prompt-Ebene überträgt sich unvollkommen zwischen Modellen. Pflege vom ersten Tag an eine Bewertungs-Suite; die Migrationskosten bestehen größtenteils aus erneuter Validierung, und Evaluierungen machen daraus statt Wochen des Bauchgefühls Tage des Diff-Vergleichs.`,
  },
  {
    topicKey: 'llm-tokens-pricing',
    title: 'Was sind Token, und wie funktioniert die LLM-Preisgestaltung?',
    question: 'Was genau ist ein Token, und wie berechnen LLM-Anbieter die Nutzung?',
    summary:
      'Token sind die Teilwort-Stücke, die Modelle lesen und schreiben — grob ¾ eines englischen Wortes je Stück. Die API-Preisgestaltung erfolgt pro Million Token, wobei Ausgabe ein Mehrfaches der Eingabe kostet und Caching/Batching die großen Hebel sind.',
    tags: ['ai', 'llm', 'token', 'preisgestaltung', 'api'],
    language: 'de',
    image: { prompt: promptOf('llm-tokens-pricing'), alt: 'Ein Prisma zerteilt ein Band aus Text-Licht in Token, die auf einer Waage gewogen werden' },
    sources: [
      { title: 'tiktoken — schneller BPE-Tokenizer, den OpenAI-Modelle nutzen', url: 'https://github.com/openai/tiktoken' },
      { title: 'Sennrich et al., „Neural Machine Translation of Rare Words with Subword Units" (BPE, 2015)', url: 'https://arxiv.org/abs/1508.07909' },
    ],
    content: `# Was sind Token, und wie funktioniert die LLM-Preisgestaltung?

Modelle lesen weder Zeichen noch Wörter — sie lesen **Token**: Teilwort-Stücke, die ein Tokenizer erzeugt. „Understanding" mag ein Token sein; „unconstitutionally" mag vier sein; ein seltenes Emoji mag drei sein. Jede Fähigkeitsgrenze (Kontextfenster) und jede API-Rechnung ist in diesen Einheiten ausgedrückt, daher zahlt sich ein grobes Gefühl dafür schnell aus.

## Faustregeln

- **Englisch**: 1 Token ≈ 4 Zeichen ≈ ¾ eines Wortes. Ein Dokument mit 1.000 Wörtern ≈ 1.300–1.500 Token.
- **Code**: dichter an Token als Prosa — Satzzeichen, Einrückung und Bezeichner kosten alle.
- **Chinesisch/Japanisch/Koreanisch**: bei modernen Tokenizern grob 1–2 Zeichen pro Token; pro *vermittelter Information* ist CJK-Text oft vergleichbar mit oder leicht teurer als Englisch.
- **Zahlen und URLs**: überraschend teuer; lange IDs zerfasern in viele Token.

Tokenizer werden per Byte-Pair-Encoding (BPE) gebaut: ausgehend von Bytes und wiederholtem Verschmelzen der häufigsten Paare, sodass häufige Zeichenketten zu einzelnen Token werden. Jede Modellfamilie hat ihren eigenen Tokenizer — die Zählungen unterscheiden sich zwischen Anbietern, weshalb Kostenvergleiche auf *deinem* tatsächlichen Traffic laufen sollten.

## Wie der Zähler läuft

Die API-Preisgestaltung hat anbieterübergreifend eine standardisierte Form:

| Zähler | Was zählt | Typisches Verhältnis |
| --- | --- | --- |
| **Eingabe-Token** | Alles, was du sendest: System-Prompt, Verlauf, abgerufene Dokumente, die Frage | Basistarif |
| **Ausgabe-Token** | Alles, was das Modell generiert, einschließlich verstecktem Schlussfolgern bei manchen Reasoning-Modellen | Üblich ~3–5× des Eingabetarifs |
| **Gecachte Eingabe** | Wiederholte stabile Präfixe (System-Prompts, lange Dokumente) | Oft ~10× günstiger als frische Eingabe |
| **Batch/Async** | Nicht dringende Aufträge, gebündelt eingereicht | Üblich ~halber Preis |

Zwei strukturelle Tatsachen folgen daraus. Erstens wird **der Gesprächsverlauf bei jedem Zug erneut gesendet** — die Kosten eines Chats wachsen quadratisch mit seiner Länge, sofern du nicht kürzt, zusammenfasst oder auf Caching baust. Zweitens **dominiert die Ausgabe**, wenn du langen Text generierst, sodass „fasse dich kurz"-Anweisungen und Ausgabeobergrenzen echte Kostensteuerungen sind, nicht bloß Stilvorlieben.

## Eine Auslastung abschätzen

Die Rechnung ist immer dieselbe: (Anfragen pro Tag) × (durchschnittliche Eingabe-Token × Eingabetarif + durchschnittliche Ausgabe-Token × Ausgabetarif). Durchgerechnetes Beispiel mit Platzhaltertarifen — sagen wir, Eingabe kostet 3 $ und Ausgabe 15 $ pro Million Token: Ein Support-Bot, der 10.000 Anfragen/Tag mit 2.000-Token-Prompts (Anweisungen + abgerufener Kontext) und 300-Token-Antworten beantwortet, kostet 10.000 × (2.000×3 $ + 300×15 $)/1 Mio. ≈ **105 $/Tag**, zwei Drittel davon Eingabe. Dieses Verhältnis ist typisch für RAG-Apps — weshalb Prompt-Caching und Kontextstutzung meist mehr sparen als ein Modellwechsel.

## Die großen Hebel, geordnet

1. **Stabile Präfixe cachen** — nahezu kostenlose Gewinne für jede App mit einem langen festen System-Prompt oder geteilten Dokumenten.
2. **Modell richtig dimensionieren** — leite einfachen Traffic an eine günstigere Stufe; reserviere Spitzenmodelle für den schwierigen Ausläufer.
3. **Kontext stutzen** — rufe weniger, bessere Chunks ab; fasse alte Chat-Züge zusammen; entdupliziere Boilerplate.
4. **Ausgabe begrenzen und formen** — setze Maximallängen; bevorzuge nach Möglichkeit strukturierte kurze Antworten.
5. **Nicht Dringendes batchen** — nächtliche Klassifikation und Backfills sollten keine interaktiven Preise zahlen.

## FAQ

**Warum wurden mir mehr Token berechnet, als meine Textlänge vermuten lässt?**
System-Prompts, Tool-Definitionen, Nachrichtenformatierung und (bei Reasoning-Modellen) Denk-Token zählen alle, und nicht-englischer oder codelastiger Text wird dichter tokenisiert als die englische Faustregel.

**Verändern Kontextfenster die Preisgestaltung?**
Das Fenster ist eine Kapazitätsgrenze, kein Preis — aber es zu füllen schon. Manche Anbieter berechnen zudem Aufschläge oberhalb bestimmter Kontextgrößen, daher verdienen Aufrufe mit riesigem Kontext eine genaue Prüfung.

**Wie zähle ich Token vor dem Senden?**
Nutze die Tokenizer-Bibliothek oder den Token-Zähl-Endpunkt des Anbieters (für Tokenizer der OpenAI-Familie läuft tiktoken lokal). Für die Budgetierung liegt die ≈4-Zeichen-Heuristik meist innerhalb von 20 %.`,
  },
];
