import type { DraftArticle } from './types';
import { personalFinanceEn } from './personal-finance.en';

// Batch: Personal Finance (deutsche Originalfassung). Gleiche Titel und
// gleiche topicKeys wie personal-finance.en.ts; Inhalte sind für deutsche
// Leser muttersprachlich verfasst (Beispiele in Euro, institutionelle
// Konzepte bleiben allgemein und an kein nationales Steuer-/Rentensystem
// gebunden). Hero-Bilder werden geteilt.

const promptOf = (key: string): string => {
  const hit = personalFinanceEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

const NOTE =
  '\n\n*Dieser Artikel vermittelt allgemeines Finanzwissen und ist keine personalisierte Anlageberatung.*';

export const personalFinanceDe: DraftArticle[] = [
  {
    topicKey: 'compound-interest',
    title: 'Wie der Zinseszins wirklich funktioniert',
    question: 'Wie funktioniert der Zinseszins, und warum gilt er als so mächtig?',
    summary:
      'Zinseszins bedeutet Rendite auf die Rendite: Geld wächst exponentiell statt linear. Wichtiger als der Zinssatz ist die Zeit – die Kurve bleibt lange flach und wird dann steil. Genau deshalb gewinnt, wer früh anfängt.',
    tags: ['finanzen', 'geldanlage', 'zinseszins', 'sparen'],
    language: 'de',
    image: {
      prompt: promptOf('compound-interest'),
      alt: 'Ein Lichtsamen, der zu einem exponentiell verzweigten Lichtbaum heranwächst',
    },
    sources: [
      { title: 'Investor.gov (US-SEC) – Compound Interest Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads-Wiki – Anlagephilosophie und Kernkonzepte', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Wie der Zinseszins wirklich funktioniert

Zinseszins heißt: Du verdienst nicht nur auf das eingezahlte Kapital, sondern auch auf die **Erträge, die es bereits erwirtschaftet hat**. Einfache Zinsen wachsen in einer geraden Linie; der Zinseszins folgt einer Kurve, die flach beginnt und steil endet. Der größte Teil der Magie spielt sich in den späten Jahren ab – deshalb zählt der Zeitpunkt des Anfangens mehr als fast alles andere.

## Der Mechanismus an einem Beispiel

Lege 10.000 € in eine Anlage mit 7 % Rendite pro Jahr:

- **Jahr 1**: Du verdienst 700 € (auf deine 10.000 €).
- **Jahr 2**: Du verdienst 749 € – 700 € auf das ursprüngliche Kapital plus 49 € auf den Gewinn des Vorjahres.
- **Jahr 10**: Das Vermögen beträgt rund 19.700 €; allein dieses Jahr bringt etwa 1.290 €.
- **Jahr 30**: Das Vermögen liegt bei rund 76.000 €; ein einziges Jahr bringt nun etwa 5.000 € – die Hälfte deines ursprünglichen Einsatzes, jedes Jahr, ohne dass du etwas tust.

Die Formel lautet A = K × (1 + r)^t, aber die Intuition ist einfacher: Wachstum nährt sich von vorherigem Wachstum, also beschleunigen sich die Gewinne.

## Die 72er-Regel

Teile 72 durch deine Jahresrendite, um abzuschätzen, in wie vielen Jahren sich das Geld verdoppelt:

| Jahresrendite | Verdopplung etwa alle |
| --- | --- |
| 3 % | 24 Jahre |
| 6 % | 12 Jahre |
| 7 % | ~10 Jahre |
| 10 % | ~7 Jahre |

Verdopplungen stapeln sich: Bei 7 % sind dreißig Jahre etwa drei Verdopplungen – aus dem 1-Fachen wird das ~8-Fache. Dieselbe Arithmetik läuft auch gegen dich: Schulden zu 18 % verdoppeln sich in etwa vier Jahren, und eine Inflation von 3 % halbiert die Kaufkraft in etwa 24 Jahren.

## Warum Zeit den Zinssatz schlägt

Monatlich 500 € bei 7 %:

- Über **30 Jahre**: ~610.000 € (180.000 € eingezahlt).
- Über **40 Jahre**: ~1.310.000 € (240.000 € eingezahlt).

Zehn zusätzliche frühe Jahre – nur 60.000 € mehr eingezahlt – bringen rund 700.000 € zusätzlich, weil das früheste Geld am längsten verzinst wird. Einem zusätzlichen Renditeprozent hinterherzujagen ist weit unzuverlässiger, als sich durch sofortiges Anfangen zusätzliche Jahre zu kaufen.

## Was im echten Leben verzinst wird

Sparkonten verzinsen sich buchstäblich; Aktiendepots verzinsen sich statistisch (die Renditen schwanken von Jahr zu Jahr, aber wieder angelegte Gewinne bauen aufeinander auf); Dividenden verzinsen sich, wenn sie reinvestiert werden. **Auch Gebühren verzinsen sich – nur rückwärts**: Eine jährliche Gebühr von 1 % bei einer Bruttorendite von 7 % verschlingt über 40 Jahre rund ein Viertel deines Endvermögens.

## Häufige Fragen

**Spielt die Zinsperiode (täglich vs. monatlich) eine große Rolle?**
Viel weniger, als man annimmt – bei 5 % unterscheiden sich tägliche und jährliche Verzinsung um etwa 0,13 Prozentpunkte effektiver Rendite. Zinssatz und Zeit dominieren.

**Woher stammen die oft zitierten 7 %?**
Das ist ungefähr die langfristige, inflationsbereinigte historische Rendite breiter US-Aktienindizes. Es ist ein Durchschnitt über sehr holprige Jahre, kein Versprechen.

**Ist Zinseszins wirklich „das achte Weltwunder" (Einstein)?**
Das Zitat ist mit ziemlicher Sicherheit erfunden – die Mathematik ist Wunder genug, auch ohne prominente Schützenhilfe.${NOTE}`,
  },
  {
    topicKey: 'index-funds',
    title: 'Was ist ein Indexfonds – und warum empfehlen Fachleute ihn immer wieder?',
    question: 'Was ist ein Indexfonds, und warum wird er gewöhnlichen Anlegern so oft empfohlen?',
    summary:
      'Ein Indexfonds kauft automatisch jede Aktie eines Marktindex und verlangt nahezu keine Gebühren. Jahrzehnte an Daten zeigen: Die große Mehrheit der Profis schlägt ihn langfristig nicht – das ist das ganze Argument.',
    tags: ['finanzen', 'geldanlage', 'indexfonds', 'passives investieren'],
    language: 'de',
    image: {
      prompt: promptOf('index-funds'),
      alt: 'Hunderte winziger leuchtender Würfel, als ein Korb getragen',
    },
    sources: [
      { title: 'SPIVA – S&P „Active vs. Index"-Scorecards', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Bogleheads-Wiki – Drei-Fonds-Portfolio', url: 'https://www.bogleheads.org/wiki/Three-fund_portfolio' },
      { title: 'Investor.gov (US-SEC) – Grundlagen zu Fonds und ETFs', url: 'https://www.investor.gov' },
    ],
    content: `# Was ist ein Indexfonds – und warum empfehlen Fachleute ihn immer wieder?

Ein Indexfonds ist ein Fonds, der gar nicht erst versucht, Gewinner herauszupicken. Er kauft einfach jedes Wertpapier eines Marktindex – alle ~500 Unternehmen des S&P 500 oder Tausende Aktien eines Gesamtmarktindex – im Verhältnis zu ihrer Größe und hält sie. Keine Analysten, keine Prognosen, kein Handelstisch, der sein Geld verdienen muss. Das klingt nach Aufgeben; die Daten sagen das Gegenteil.

## Das Argument in drei Fakten

**1. Der Markt ist schwer zu schlagen.** Die seit über zwei Jahrzehnten veröffentlichten SPIVA-Scorecards finden immer wieder, dass über 15-Jahres-Zeiträume die große Mehrheit – oft 80–90 % – der aktiv gemanagten Fonds ihren Vergleichsindex in den großen Märkten unterbietet. Profis mit Vollzeit-Teams schaffen es im Schnitt nicht, den Index zu schlagen, an dem sie gemessen werden.

**2. Die Gewinner sind im Voraus nicht erkennbar.** Manche Fonds schlagen den Markt – doch Sieger halten ihre Form selten, und die vergangene Wertentwicklung ist ein notorisch schlechter Auswahlfilter. Den Gewinnerfonds des nächsten Jahrzehnts zu finden, ist dasselbe Problem wie die Gewinneraktie des nächsten Jahrzehnts zu finden, nur eine Etage höher.

**3. Kosten wirken gegen dich – mit Zinseszins.** Indexfonds verlangen Kostenquoten von nur 0,03–0,2 % pro Jahr; aktive Fonds verlangen häufig 0,5–1,5 % plus höhere interne Handelskosten. Ein jährlicher Abrieb von 1 %, über 40 Jahre verzinst, verschlingt rund ein Viertel des Endvermögens. Der Indexfonds gewinnt zum Teil schlicht, weil er sich weigert, dein Geld auszugeben.

## Was du tatsächlich bekommst

| Eigenschaft | Indexfonds | Typischer aktiver Fonds |
| --- | --- | --- |
| Ziel | Den Markt abbilden | Den Markt schlagen |
| Jahresgebühr | ~0,03–0,2 % | ~0,5–1,5 %+ |
| Streuung | Hunderte bis Tausende Titel | Auswahl des Managers |
| Schlüsselpersonen-Risiko | Keines | Abgang des Managers zählt |
| Vorhersehbarkeit | Du bekommst die Marktrendite, abzüglich ~nichts | Breite Streuung um den Index |

Ehrlich formuliert: Ein Indexfonds garantiert dir, dass du den Markt **nie schlagen** wirst – und macht es dir im Gegenzug statistisch sehr wahrscheinlich, die meisten zu schlagen, die es versuchen.

## Was Indexfonds nicht lösen

Sie beseitigen das Marktrisiko nicht: Ein Gesamtmarktfonds fiel 2008/09 um rund die Hälfte und erholte sich mit dem Markt. Sie nehmen dir die Asset-Allocation nicht ab – wie viel Aktien gegenüber Anleihen bleibt deine Entscheidung (und zählt mehr als die Fondsauswahl). Und ein enger Index (eine Branche, ein Thema) ist keine Streuung; empfohlen werden **breite** Marktindizes.

## Häufige Fragen

**Würden Märkte zusammenbrechen, wenn alle indexieren?**
An einem theoretischen Extrem würde die Preisbildung schwächer – doch der aktive Handel dominiert weiterhin das Tagesvolumen, und jede dabei entstehende Ineffizienz würde Stockpicker zurücklocken. Von dieser Grenze sind wir weit entfernt.

**Indexfonds oder ETF?**
Beide können denselben Index abbilden; der Unterschied ist die Handelshülle. Für langfristige Sparer ist beides in Ordnung – Gebühren und der abgebildete Index zählen mehr.

**Heißt Indexieren, sich mit dem Durchschnitt zufriedenzugeben?**
Man gibt sich mit der Rendite des *Marktes* zufrieden, die nach Kosten historisch über den Ergebnissen der meisten Profis lag. Durchschnittlicher Preis, überdurchschnittliches Ergebnis.${NOTE}`,
  },
  {
    topicKey: 'inflation-purchasing-power',
    title: 'Wie die Inflation deine Kaufkraft leise auffrisst',
    question: 'Wie höhlt die Inflation Ersparnisse und Kaufkraft im Lauf der Zeit tatsächlich aus?',
    summary:
      'Inflation ist eine langsame Zinseszins-Steuer auf liegendes Bargeld: Bei 3 % pro Jahr verliert Geld in etwa 24 Jahren die Hälfte seiner Kaufkraft. Den Unterschied zwischen nominaler und realer Rendite zu verstehen, trennt Sparen vom Bewahren.',
    tags: ['finanzen', 'inflation', 'volkswirtschaft', 'sparen'],
    language: 'de',
    image: {
      prompt: promptOf('inflation-purchasing-power'),
      alt: 'Eine schrumpfende Münze in einer Sanduhr, während Gegenstände ringsum wachsen',
    },
    sources: [
      { title: 'US-Arbeitsstatistikamt (BLS) – Verbraucherpreisindex (CPI)', url: 'https://www.bls.gov/cpi/' },
      { title: 'FRED (Fed St. Louis) – Inflationsdatenreihen', url: 'https://fred.stlouisfed.org' },
    ],
    content: `# Wie die Inflation deine Kaufkraft leise auffrisst

Inflation ist die Rate, mit der die Preise allgemein steigen – gleichbedeutend mit der Rate, mit der jede Geldeinheit weniger kauft. Sie funktioniert genau wie der Zinseszins, nur gegen dich: kleine jährliche Prozentsätze, die still anwachsen, bis der kumulierte Effekt gewaltig ist. Bargeld unter der Matratze ist nicht „sicher"; es schrumpft mit Sicherheit.

## Die Verlust-Arithmetik des Zinseszinses

Wende die 72er-Regel rückwärts an – 72 geteilt durch die Inflationsrate ergibt die Jahre, bis sich die Kaufkraft halbiert:

| Durchschnittliche Inflation | Kaufkraft halbiert sich in |
| --- | --- |
| 2 % | ~36 Jahre |
| 3 % | ~24 Jahre |
| 5 % | ~14 Jahre |
| 8 % | ~9 Jahre |

Bei bescheidenen 3 % werden aus den 100 € in deiner Schublade kaufkraftbereinigt nach zehn Jahren etwa 74 €, nach zwanzig 55 € und nach vierundzwanzig 48 €. Niemand hat etwas gestohlen; alles ist nur teurer geworden.

## Nominal vs. real: die einzige Unterscheidung, die zählt

Ein Sparkonto mit 2 % Zinsen bei 3 % Inflation hat eine **reale Rendite von rund −1 %** – du verlierst Kaufkraft, während der Saldo wächst. Ziehe immer die Inflation ab:

reale Rendite ≈ nominale Rendite − Inflationsrate

Diese eine Subtraktion stellt die meisten Geldentscheidungen auf den Kopf. „Meine Einlage bringt 4 %" bedeutet nichts, solange du nicht weißt, ob die Preise um 2 % oder 6 % steigen. Historisch haben breite Aktienindizes positive langfristige Realrenditen geliefert (in den USA über sehr lange Zeiträume rund 6–7 % real), während Bargeld und kurzfristige Einlagen real nahe null verharrten – manchmal darunter.

## Wem die Inflation schadet und wem sie hilft

- **Schadet**: Haltern von Bargeld und festen Zahlungen – Sparern auf niedrig verzinsten Konten, allen mit fester Rente, Kreditgebern, die niedrige Zinsen festgeschrieben haben.
- **Hilft**: Schuldnern mit festverzinsten Krediten (sie zahlen mit billigerem Geld zurück) und Besitzern von Sachwerten – Unternehmen, Immobilien, Aktien –, deren Preise und Gewinne mit dem Preisniveau tendenziell mitsteigen.

Diese Asymmetrie erklärt, warum „jahrzehntelange Ersparnisse komplett in Bargeld halten" historisch eine der zuverlässigsten Verluststrategien ist, obwohl sie sich am sichersten anfühlt.

## Gemessene Inflation vs. deine Inflation

Der offizielle CPI verfolgt einen nationalen Durchschnittskorb. Deine persönliche Rate weicht je nach Lebenslage ab: Mieter in teuren Städten, Eltern mit Studiengebühren oder Vielreisende erleben oft eine Inflation deutlich über der Schlagzeile; ein sesshafter Eigenheimbesitzer vielleicht weniger. Beurteile deine Finanzen an **deinem Korb**, nicht nur an der Schlagzeile.

## Häufige Fragen

**Ist etwas Inflation gut?**
Die meisten Zentralbanken zielen bewusst auf ~2 % – milde Inflation schmiert Lohnanpassungen und entmutigt das Horten von Bargeld, während Deflation (fallende Preise) tendenziell mit wirtschaftlicher Stagnation einhergeht und Schulden schwerer macht.

**Heißt Inflation, dass ich jegliches Bargeld meiden sollte?**
Nein – die Aufgabe eines Notgroschens ist Verfügbarkeit, nicht Wachstum, und seine Inflationskosten sind der Preis, den du für Sicherheit zahlst. Der Fehler ist, Geld mit *Jahrzehnte-Horizont* in bar zu halten.

**Was schützt vor Inflation?**
Auf lange Sicht: produktive Sachwerte (breite Aktien, Immobilien) und inflationsindexierte Anleihen. Auf kurze Sicht ist nichts perfekt – weshalb es zählt, Anlagen an den Zeithorizont anzupassen.${NOTE}`,
  },
  {
    topicKey: 'emergency-fund',
    title: 'Wie groß sollte dein Notgroschen sein?',
    question: 'Wie viele Monatsausgaben sollte ich als Notgroschen halten, und wo?',
    summary:
      'Die Standardantwort: 3–6 Monate notwendiger Ausgaben, sofort verfügbar und risikofrei – mehr, wenn das Einkommen schwankt. Seine Aufgabe ist Versicherung, nicht Rendite: Er verhindert, dass Pech zu Schulden wird.',
    tags: ['finanzen', 'sparen', 'notgroschen', 'budget'],
    language: 'de',
    image: {
      prompt: promptOf('emergency-fund'),
      alt: 'Eine gepolsterte Kugel in einem Glastresor, die Sturmsplitter abwehrt',
    },
    sources: [
      { title: 'US-Verbraucherschutzbehörde (CFPB) – Leitfäden zum Notgroschen', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Wie groß sollte dein Notgroschen sein?

Ein Notgroschen ist Geld, dessen einzige Aufgabe es ist, Schocks abzufedern – Jobverlust, Arztrechnungen, das Auto, das in derselben Woche stirbt wie der Warmwasserboiler. Die übliche Empfehlung lautet **3–6 Monate notwendiger Ausgaben**, geparkt an einem langweiligen, liquiden, risikofreien Ort. Er bringt absichtlich wenig: Du kaufst eine Versicherung, und die entgangene Rendite ist die Prämie.

## Die Höhe ehrlich bemessen

Zähle die **notwendigen** Monatsausgaben – Wohnen, Essen, Nebenkosten, Versicherungen, Verkehr, Mindestraten für Schulden – nicht deinen gesamten Lebensstil. Skaliere dann nach der Anfälligkeit deines Einkommens:

| Situation | Sinnvolles Ziel |
| --- | --- |
| Zwei stabile Gehälter im Haushalt | 3 Monate Notwendiges |
| Ein stabiles Gehalt | 4–6 Monate |
| Freiberuflich / Provision / saisonal | 6–12 Monate |
| Ein Einkommen + Angehörige + schwacher Arbeitsmarkt | Richtung 12 Monate |
| Bekanntes Risiko steht bevor (angekündigte Entlassungen, auslaufender Vertrag) | so viel wie möglich, jetzt |

Das Muster: Der Notgroschen deckt die realistische Lücke zwischen dem Verlust des Einkommens und seinem Ersatz, plus die Schocks in Höhe einer Selbstbeteiligung unterwegs.

## Wo du ihn aufbewahrst

Drei Anforderungen: **in Tagen verfügbar, nicht in Wochen; kein nomineller Wertverlust; getrennt vom Alltagsgeld.** Das bedeutet Tagesgeld, Geldmarktfonds oder kurzfristige Einlagen mit straffreiem Zugriff. Es schließt Aktien aus (die in dem Monat, in dem du sie brauchst, 30 % im Minus sein können), lange Bindungen und alles, bei dessen Verkauf du zögern würdest. Ihn bei einer anderen Bank als dem Girokonto zu halten, schafft nützliche Reibung gegen das „Ausleihen" daraus.

## Warum ihn nicht stattdessen anlegen?

Weil Notfälle mit Abschwüngen korrelieren. Das klassische Versagensmuster: Eine Rezession schlägt zu, du verlierst deinen Job *und* der Aktienmarkt steht 35 % tiefer, sodass dein „Notgroschen in Indexfonds" genau dann auszahlt, wenn er am kleinsten ist. Sein Wert liegt darin, dass er **unkorreliert mit deinem Glück** ist. Ja, die Inflation knabbert an ihm – das ist der Preis der Versicherung, und er ist günstiger, als Anlagen am Tiefpunkt zu liquidieren oder Kreditkartenschulden zu 20 % effektivem Jahreszins zu tragen.

## Von null aufbauen

Eine nützliche Reihenfolge: erst einen Monat Vorsprung erreichen (das beseitigt den meisten Von-Gehalt-zu-Gehalt-Stress), dann auf drei Monate hinarbeiten und dabei mindestens die Mindestraten aller Schulden bedienen, dann neu abwägen, ob hochverzinste Schulden oder der Rest des Notgroschens Vorrang verdienen – rechnerisch ist die Tilgung einer Karte zu 20 % effektivem Jahreszins eine unschlagbare „Rendite", weshalb viele bei einem Monat parken, die toxischen Schulden räumen und dann den Notgroschen vollenden.

## Häufige Fragen

**Ist eine Kreditkarte ein akzeptabler Notgroschen?**
Sie ist eine Notfall-*Brücke*, kein Notgroschen – in Ordnung für die 48 Stunden, bis die Ersparnisse ankommen, schrecklich als Plan, denn die wichtigsten Notfälle (Jobverlust) sind genau die Momente, in denen Schulden zu 20 % effektivem Jahreszins am meisten wehtun.

**Sollte der Notgroschen mit meinem Einkommen wachsen?**
Er sollte mit deinen *Ausgaben und Verpflichtungen* wachsen. Eine Gehaltserhöhung, die du sparst, erfordert keinen größeren Notgroschen; ein Immobilienkredit und zwei Kinder schon.

**Was zählt als Notfall?**
Unerwartet, notwendig, dringend – such dir alle drei aus. Ein Flugschnäppchen scheitert an allen dreien; ein kaputtes Getriebe, das du für die Arbeit brauchst, besteht alle drei.${NOTE}`,
  },
  {
    topicKey: 'stocks-vs-bonds',
    title: 'Aktien vs. Anleihen: Wo liegt der tatsächliche Unterschied?',
    question: 'Worin besteht der echte Unterschied zwischen Aktien und Anleihen, und wie verhalten sie sich unterschiedlich?',
    summary:
      'Eine Aktie ist Eigentum – deine Rendite hängt vom Erfolg des Unternehmens ab. Eine Anleihe ist ein Kredit – deine Rendite steht im Vertrag. Dieser eine Unterschied erklärt, warum Aktien im Schnitt mehr bringen und Anleihen ein Depot beruhigen.',
    tags: ['finanzen', 'geldanlage', 'aktien', 'anleihen'],
    language: 'de',
    image: {
      prompt: promptOf('stocks-vs-bonds'),
      alt: 'Ein zerklüfteter aufsteigender Bergkamm neben einer sanften, gleichmäßigen Lichttreppe',
    },
    sources: [
      { title: 'Investor.gov (US-SEC) – Einführung in Aktien und Anleihen', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) – historische Renditedaten', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Aktien vs. Anleihen: Wo liegt der tatsächliche Unterschied?

Eine **Aktie** macht dich zum Miteigentümer eines Unternehmens: Du teilst seine Gewinne (Dividenden, Wachstum) und seine Misserfolge, ohne jedes Versprechen. Eine **Anleihe** macht dich zum Kreditgeber eines Unternehmens oder Staates: Man schuldet dir feste Zinsen und dein Geld zu einem Termin zurück, per Vertrag. Alles Weitere – der Renditeabstand, der Risikoabstand, die Art, wie Depots beides mischen – folgt aus Eigentum gegenüber Kredit.

## Was jede Seite dir bietet

| | Aktie (Eigentum) | Anleihe (Kredit) |
| --- | --- | --- |
| Deine Rendite | Was übrig bleibt, nachdem alle bezahlt sind – unbegrenztes Aufwärtspotenzial | Feste Kupons + Rückzahlung – gedeckeltes Potenzial |
| Wenn das Unternehmen floriert | Du fängst das Wachstum ein | Du bekommst weiterhin dieselben Kupons |
| Wenn es scheitert | Du stehst ganz hinten, oft ausgelöscht | Gläubiger werden vor Eigentümern bezahlt |
| Hauptrisiken | Geschäftsergebnis, Marktstimmung | Ausfall, Inflation, steigende Zinsen |
| Historische langfristige Realrendite (USA, sehr lange Zeiträume) | ~6–7 % pro Jahr | ~1–3 % pro Jahr |
| Typisches schlechtes Jahr | −20 % bis −50 % | −5 % bis −15 % (Zinsschocks) |

Die höhere Durchschnittsrendite von Aktien ist kein Bonus; sie ist die **Bezahlung** dafür, dass du Unsicherheit und den letzten Platz in der Reihe akzeptierst. Die Finanzwelt nennt das Eigenkapital-Risikoprämie.

## Was Anleihekurse bewegt

Anleihen sind nicht statisch: Gehandelte Anleihekurse bewegen sich **gegenläufig zu den Zinsen**. Wenn du eine Anleihe mit 2 % Kupon hältst und neue Anleihen 5 % zahlen, kauft dir niemand deine zum Nennwert ab – ihr Kurs fällt, bis die Renditen übereinstimmen. Länger laufende Anleihen schwanken stärker. Deshalb hatten selbst „sichere" Anleihefonds ein historisch schlechtes Jahr, als die Zinsen sprangen, und deshalb senken Anleihen das Risiko, beseitigen es aber nicht.

## Warum Depots beides mischen

Aktien und Anleihen zacken oft (nicht immer) zu verschiedenen Zeiten: Rezessionen, die Aktien zermalmen, bringen meist Zinssenkungen, die hochwertige Anleihen heben. Eine klassische 60/40-Mischung fing historisch den größten Teil des Aktienwachstums ein, bei deutlich kleineren Einbrüchen. Die Mischung ist ein Regler:

- **Mehr Aktien** → höheres erwartetes Wachstum, größere und längere Einbrüche. Passt zu langen Horizonten.
- **Mehr Anleihen** → ruhigere Fahrt, geringeres erwartetes Wachstum. Passt zu kurzfristigem Bedarf und schwachen Nerven.

Die richtige Einstellung hängt davon ab, wann du das Geld brauchst und wie du dich im Crash verhältst – Aktien in Panik zu verkaufen kostet mehr als jeder Allokationsfehler.

## Häufige Fragen

**Sind Anleihen „sicher"?**
Sicherer als Aktien gegen Unternehmenspleiten; nicht sicher gegen Inflation oder Zinsbewegungen. Eine bis zur Fälligkeit gehaltene Staatsanleihe zahlt ihr versprochenes Geld – das die Inflation still entwerten kann.

**Brauche ich einzelne Anleihen oder einen Anleihefonds?**
Fonds bieten einfache Streuung und Liquidität; einzelne Anleihen bieten einen bekannten Auszahlungstermin. Für die meisten Sparer ist ein breiter, hochwertiger Anleihefonds das einfachere Werkzeug.

**Warum nicht 100 % Aktien, wenn ich jung bin?**
Mathematisch vertretbar bei Jahrzehnten Horizont und eiserner Disziplin. Das ehrliche Risiko ist das Verhalten: Ein Einbruch von 45 % prüft die Disziplin auf eine Weise, die Tabellen nicht erfassen.${NOTE}`,
  },
  {
    topicKey: 'dollar-cost-averaging',
    title: 'Was ist der Cost-Average-Effekt – und wann ergibt er Sinn?',
    question: 'Was ist der Cost-Average-Effekt, und ist er besser als eine Einmalanlage?',
    summary:
      'Der Cost-Average-Effekt investiert feste Beträge nach festem Plan und kauft bei niedrigen Kursen mehr Anteile. Für Gehaltssparer passiert das von selbst; bei einer Einmalsumme gewinnt die Sofortanlage meist mathematisch – das Sparen in Raten gewinnt psychologisch.',
    tags: ['finanzen', 'geldanlage', 'sparplan', 'strategie'],
    language: 'de',
    image: {
      prompt: promptOf('dollar-cost-averaging'),
      alt: 'Gleichmäßig fallende Tropfen, die sich unter einer wogenden Fläche zu einem ruhigen Becken sammeln',
    },
    sources: [
      { title: 'Bogleheads-Wiki – Dollar cost averaging', url: 'https://www.bogleheads.org/wiki/Dollar_cost_averaging' },
      { title: 'Investor.gov (US-SEC) – Grundlagen der Geldanlage', url: 'https://www.investor.gov' },
    ],
    content: `# Was ist der Cost-Average-Effekt – und wann ergibt er Sinn?

Der Cost-Average-Effekt (Durchschnittskosten-Methode) bedeutet, in regelmäßigen Abständen denselben Geldbetrag zu investieren – sagen wir 500 € am Ersten jedes Monats – unabhängig davon, was der Markt gerade tut. Der feste Betrag kauft mehr Anteile, wenn die Kurse niedrig sind, und weniger, wenn sie hoch sind, und er nimmt die schlimmste Frage des Investierens („Ist jetzt ein guter Zeitpunkt?") aus dem Spiel, indem er das Timing zur Nicht-Entscheidung macht.

## Die Arithmetik

Investiere 300 € pro Monat in einen Fonds, dessen Kurs schwankt:

| Monat | Kurs | Gekaufte Anteile |
| --- | --- | --- |
| Jan | 30 | 10,0 |
| Feb | 20 | 15,0 |
| Mär | 25 | 12,0 |
| Apr | 30 | 10,0 |

Du hast 1.200 € für 47 Anteile ausgegeben – ein Durchschnittskosten von ~25,5 € pro Anteil, *unter* dem einfachen Durchschnittskurs (26,25 €), weil das feste Budget den günstigen Monat automatisch übergewichtet hat. Das ist der mechanische Vorteil: diszipliniertes Kaufen der Tiefs, ohne irgendetwas vorherzusagen.

## Zwei sehr unterschiedliche Situationen

**1. Aus dem Gehalt investieren (die meisten Menschen).** Hier ist der Cost-Average-Effekt keine Strategiewahl – er ist die einzige Option, da das Geld monatlich eintrifft. Ihn zu automatisieren ist reiner Gewinn: keine Entscheidungen, kein Zögern bei beängstigenden Schlagzeilen, jahrzehntelange erzwungene Disziplin.

**2. Eine Einmalsumme investieren (Bonus, Erbe, Verkauf).** Hier *könntest* du alles heute investieren oder über ein Jahr verteilen. Mathematisch hat die Einmalanlage das Verteilen historisch in rund zwei von drei Fällen geschlagen, einfach weil Märkte öfter steigen als fallen und der Sparplan Geld an der Seitenlinie hält. Doch im einen Drittel, in dem sie verliert, verliert sie im psychologisch schlimmsten Moment – direkt nachdem du alles investiert hast.

| | Einmalanlage | Sparplan über ~12 Monate |
| --- | --- | --- |
| Erwartetes Ergebnis | Höher (mehr Zeit im Markt) | Etwas niedriger |
| Gefühl im schlimmsten Fall | Brutal (voll investiert vor dem Crash) | Abgefedert |
| Risiko, nie zu investieren | Gering, sobald erledigt | „Pausieren" mitten im Plan ist häufig |

Die pragmatische Antwort: Wenn ein schlechter Monat dich den Plan abbrechen lassen oder um den Schlaf bringen würde, verteile die Einmalsumme über 6–12 Monate nach einem schriftlichen Plan – ein kleiner erwarteter Preis für eine große Verhaltensgarantie. Wenn du Schwankungen wirklich mit den Schultern zucken kannst, investiere sie und mach weiter.

## Wo der Cost-Average-Effekt leise versagt

Ein Sparplan auf eine **einzelne Aktie** mittelt sich in etwas hinein, das sich vielleicht nie erholt – der Mechanismus „kauft das Tief" nur dann nützlich, wenn der Wert breit gestreut und langfristig aufwärtsgeneigt ist. Und das Aussetzen der Raten während Crashs löscht den ganzen Sinn: Die billigen Anteile sind genau die, für deren Kauf die Strategie existiert.

## Häufige Fragen

**Garantiert der Cost-Average-Effekt einen Gewinn?**
Nein – er formt, *wann* du kaufst, nicht, ob der Wert steigt. Ein fallender Wert verliert weiterhin Geld, nur von niedrigeren Durchschnittskosten aus.

**Wöchentlich oder monatlich?**
Über Jahre praktisch identisch. Richte ihn nach deinem Gehaltseingang aus und vergiss ihn; die Frequenz ist Erbsenzählerei.

**Sollte ich den Sparplan aussetzen, wenn Märkte teuer wirken?**
Das ist Market-Timing in Verkleidung. Der Wert der Strategie besteht gerade darin, dass sie deine Gefühle zu Bewertungen ignoriert.${NOTE}`,
  },
  {
    topicKey: 'asset-allocation',
    title: 'Asset-Allocation und Rebalancing, einfach erklärt',
    question: 'Was ist Asset-Allocation, und wie funktioniert Rebalancing tatsächlich?',
    summary:
      'Die Asset-Allocation – deine Aufteilung auf Aktien, Anleihen und Bargeld – bestimmt den größten Teil von Risiko und Langzeitverhalten, weit mehr als die Fondsauswahl. Rebalancing hält die Aufteilung am Ziel, indem es Gewinner stutzt und Verlierer aufstockt.',
    tags: ['finanzen', 'geldanlage', 'asset-allocation', 'portfolio'],
    language: 'de',
    image: {
      prompt: promptOf('asset-allocation'),
      alt: 'Ein dreiteiliges leuchtendes Tortendiagramm, das auf einer Waage im Gleichgewicht gehalten wird',
    },
    sources: [
      { title: 'Bogleheads-Wiki – Asset Allocation', url: 'https://www.bogleheads.org/wiki/Asset_allocation' },
      { title: 'Investor.gov (US-SEC) – Grundlagen der Asset-Allocation', url: 'https://www.investor.gov' },
    ],
    content: `# Asset-Allocation und Rebalancing, einfach erklärt

Asset-Allocation ist die prozentuale Aufteilung deines Portfolios auf Anlageklassen – typischerweise Aktien fürs Wachstum, Anleihen für Stabilität, Bargeld für sofortige Verfügbarkeit. Sie ist die eine Entscheidung, die das Verhalten deines Portfolios dominiert: Forschung über Jahrzehnte schreibt den größten Teil der *Schwankung* eines gestreuten Portfolios der Allocation zu, nicht den konkreten Fonds oder Aktien, die die Töpfe füllen.

## Warum die Aufteilung mehr zählt als die Auswahl

Zwei Anleger, die beide hervorragende kostengünstige Fonds halten, machen völlig verschiedene Erfahrungen, wenn der eine zu 90 % in Aktien steckt und der andere zu 30 %. Der 90/10-Anleger sollte etwa das doppelte Langzeitwachstum erwarten – und Einbrüche nahe −45 % in schlimmen Crashs. Der 30/70-Anleger gibt viel Wachstum auf für Rückgänge, die selten −15 % überschreiten. Keiner liegt falsch; sie beantworten verschiedene Fragen: *Wann wird das Geld gebraucht, und was kann diese Person durchhalten, ohne in Panik zu geraten?*

Eine grobe Landkarte:

| Geld gebraucht in… | Übliche Allocation-Form |
| --- | --- |
| < 3 Jahren | Vor allem Bargeld und kurze Anleihen |
| 3–10 Jahren | Ausgewogen, z. B. 40–60 % Aktien |
| 10–30+ Jahren | Aktienlastig, z. B. 70–90 % Aktien |

Faustregeln wie „110 minus dein Alter in Aktien" sind grobe Startpunkte – nützlich zum Verankern, keine Gesetze. Risiko*tragfähigkeit* (Zeithorizont, Einkommensstabilität) und Risiko*toleranz* (was du durchschlafen kannst) zählen beide, und der niedrigere der beiden sollte gewinnen.

## Was Rebalancing ist

Märkte bewegen sich; deine Aufteilung driftet. Nach einem starken Aktienjahr könnte ein 60/40-Portfolio bei 70/30 liegen – still riskanter, als du gewählt hast. Rebalancing verkauft etwas von dem, was gewachsen ist, und kauft, was zurückblieb, und stellt das Ziel wieder her. Es ist **Risikopflege**, kein Renditejagen: Du nimmst systematisch Gewinne von der teuren Seite und stockst die billige Seite auf, nach Plan, ohne Prognose.

Zwei praktikable Auslöser – wähle einen und automatisiere ihn:

- **Kalender**: ein- oder zweimal im Jahr, dasselbe Datum.
- **Schwelle**: rebalancieren, sobald eine Anlage mehr als ~5 Prozentpunkte vom Ziel abweicht.

Für laufende Sparer ist die günstigste Methode das **Rebalancing über Einzahlungen**: Lenke frisches Geld auf das, was unter Ziel liegt, und vermeide Verkäufe (samt Steuern oder Gebühren) ganz.

## Die Disziplin, die es erzwingt

Die stille Superkraft des Rebalancing ist verhaltensbezogen: Es zwingt dich, Aktien nach Crashs zu kaufen (wenn dein Ziel sagt, du bist untergewichtet) und sie nach Euphorie zu stutzen – genau die Trades, denen sich Emotionen widersetzen. Anleger, die 2008/09 durchrebalancierten, kauften mechanisch nahe dem Tief, ohne Mut zu brauchen, nur eine Regel.

## Häufige Fragen

**Erhöht Rebalancing die Rendite?**
Manchmal leicht (zwischen Anlagen ähnlicher Rendite), manchmal kostet es ein wenig (das Stutzen einer langen Hausse). Sein echtes Produkt ist, das Risiko auf dem von dir gewählten Niveau zu halten.

**Wie präzise sollten die Ziele sein?**
Ganze Zahlen, breite Bänder. 58/42 gegenüber 60/40 ist Rauschen; die Allocation in ständiges Herumbasteln zu verwandeln, untergräbt das Design.

**Wo passen andere Anlagen hin – Immobilien, Gold, Krypto?**
Als bewusste, gedeckelte Scheiben (häufig je ≤5–10 %), zur Streuung hinzugefügt – so bemessen, dass es dein Leben nicht ändert, wenn du dich völlig in ihnen irrst.${NOTE}`,
  },
  {
    topicKey: 'market-timing',
    title: 'Warum Market-Timing so schwer ist (selbst für Profis)',
    question: 'Warum gilt Market-Timing als nahezu unmöglich, selbst für Profis?',
    summary:
      'Market-Timing verlangt, zweimal richtig zu liegen – vor Stürzen zu verkaufen und vor Anstiegen zu kaufen – gegen schnelle Kurse, die Erwartungen längst enthalten. Schon die wenigen besten Tage zu verpassen, die in Crashs gehäuft auftreten, zerstört Jahrzehnte an Rendite.',
    tags: ['finanzen', 'geldanlage', 'market-timing', 'anlegerverhalten'],
    language: 'de',
    image: {
      prompt: promptOf('market-timing'),
      alt: 'Pfeile, die versuchen, auf den Spitzen und Tälern einer Welle zu landen, und knapp verfehlen',
    },
    sources: [
      { title: 'SPIVA – Scorecards zu Beständigkeit und aktivem Management', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
      { title: 'Aswath Damodaran (NYU Stern) – Marktdaten und Analysen', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Warum Market-Timing so schwer ist (selbst für Profis)

Market-Timing – vor Rückgängen aussteigen und vor Erholungen zurückkehren – scheitert nicht, weil die Leute dumm sind, sondern weil das Spiel strukturell gegen den Spieler manipuliert ist. Du musst **zweimal** richtig liegen, beim **Wann**, gegen **Kurse, die den Konsens bereits enthalten**, während sich die ertragreichen Tage **in den beängstigendsten Wochen verstecken**. Jede Hürde allein ist schwer; miteinander multipliziert erklären sie, warum Timing-Strategien in Geschichten großartig und in geprüften Ergebnissen mager aussehen.

## Die vier strukturellen Probleme

**1. Zwei richtige Entscheidungen, sich vervielfachender Fehler.** Richtig auszusteigen ist wertlos, solange du nicht auch richtig wieder einsteigst. Wer pro Entscheidung zu 70 % richtig liegt – weit besser, als die Belege hergeben – liegt bei der Hin- und Rückreise nur zu ~49 % richtig, vor Kosten.

**2. Kurse bewegen sich zuerst.** Märkte blicken nach vorn: Wenn die Rezession in den Nachrichten ist, fielen die Kurse schon vor Monaten; Erholungen beginnen ebenso inmitten schrecklicher Schlagzeilen, wenn Kaufen wahnsinnig wirkt. Auf das sichtbar Geschehende zu handeln bedeutet, mit Informationen zu handeln, die bereits im Kurs stecken.

**3. Die besten Tage drängen sich in den schlimmsten Phasen.** Langzeitstudien zeigen immer wieder, dass das Verpassen von nur 10–20 der einzelnen besten Tage aus *Jahrzehnten* das Endvermögen drastisch schmälert – häufig um die Hälfte oder mehr – und diese Tage treten überwältigend während Crashs und ihrer unmittelbaren Erholungen auf, genau dann, wenn ein Timer in Bargeld sitzt und „auf Klarheit wartet".

**4. Die Grundwahrscheinlichkeit bestraft Abwesenheit.** Aktien steigen in den meisten Jahren; Bargeld an der Seitenlinie zahlt standardmäßig Opportunitätskosten. Ein Timer muss nicht nur richtig liegen – er muss um *mehr* richtig liegen als die Aufwärtsdrift des Marktes plus Steuern und Handelskosten.

## Was die Bilanz der Profis zeigt

Jahrzehnte an SPIVA-Scorecards zeigen, dass die meisten Profifonds – einschließlich taktischer und flexibler Allokationsfonds, deren ganzer Auftrag Timing ist – einfache Vergleichsindizes über lange Zeiträume verfehlen, und die wenigen Sieger wiederholen sich selten. Befragte Prognosen, „wo der Index in einem Jahr steht", liegen routinemäßig weit daneben. Das ist die stärkste empirische Tatsache im Privatanleger-Bereich, und sie ist der Grund, warum langweiliger Rat dominiert.

## Was stattdessen funktioniert

Keine Vorhersage – *Vorab-Festlegung*:

| Statt… | Tu… |
| --- | --- |
| „Ich steige vor dem nächsten Crash aus" | Halte eine Allocation, deren schlimmsten Fall du überlebst |
| „Ich kaufe am Tiefpunkt zurück" | Automatisiere Einzahlungen, die jeden Monat kaufen, auch in den schrecklichen |
| „Bargeld, bis es klarer wird" | Akzeptiere, dass Klarheit und niedrige Kurse nie zusammen auftreten |
| Auf Schlagzeilen reagieren | Rebalancing nach Kalender-/Schwellenregeln |

Das verwandelt Timing von einem Prognoseproblem (nicht gewinnbar) in ein Designproblem (sehr gewinnbar).

## Häufige Fragen

**Ist „das Tief kaufen" Market-Timing?**
Bargeld zu halten und *auf* Tiefs zu warten ist es – und unterbietet historisch das schlichte Investiertbleiben. Geplantes frisches Geld während Tiefs einzusetzen, ist nur Einzahlungsdisziplin.

**Haben nicht einige berühmt die großen Crashs vorausgesagt?**
Irgendwer tut es immer – jedes Mal andere Leute. Weitsicht von einer großen Menge lauter Vermutungen zu unterscheiden, ist im Nachhinein nahezu unmöglich; deine Ersparnisse darauf zu setzen, das im Voraus zu erkennen, ist der teure Weg, Statistik zu lernen.

**Sind Kurse also nie vorhersehbar?**
Kurzfristige Richtung: praktisch nein. Langfristige erwartete Renditen hängen lose mit Bewertungen zusammen – nützlich, um Erwartungen zu setzen, nutzlos als Ausstiegssignal.${NOTE}`,
  },
  {
    topicKey: 'etf-vs-mutual-fund',
    title: 'ETF vs. Investmentfonds: Welche Hülle solltest du nutzen?',
    question: 'Was ist der Unterschied zwischen einem ETF und einem Investmentfonds, und welchen sollte ich wählen?',
    summary:
      'ETFs und Investmentfonds sind Hüllen um dieselbe Idee – gebündeltes, gestreutes Investieren. ETFs handeln wie Aktien den ganzen Tag, meist günstiger; Investmentfonds bewerten einmal täglich und automatisieren Einzahlungen reibungsloser. Die Strategie zählt mehr als die Hülle.',
    tags: ['finanzen', 'geldanlage', 'etf', 'fonds'],
    language: 'de',
    image: {
      prompt: promptOf('etf-vs-mutual-fund'),
      alt: 'Ein Würfelkorb auf einem schnellen Förderband, ein versiegelter Korb ruhig auf einer Waage',
    },
    sources: [
      { title: 'Investor.gov (US-SEC) – Investmentfonds und ETFs', url: 'https://www.investor.gov' },
      { title: 'Morningstar – Fonds- und ETF-Research', url: 'https://www.morningstar.com' },
    ],
    content: `# ETF vs. Investmentfonds: Welche Hülle solltest du nutzen?

Ein ETF (börsengehandelter Fonds) und ein Investmentfonds können *exakt dasselbe Portfolio* halten – denselben Index, dieselben Aktien. Der Unterschied ist die Hülle: wie du kaufst, wann die Kurse festgelegt werden, was es kostet und wie Steuern abgerechnet werden. Die Wahl der Hülle ist eine Logistikentscheidung, keine Strategieentscheidung – und Logistik summiert sich über Jahrzehnte trotzdem.

## Die mechanischen Unterschiede

| | ETF | Investmentfonds |
| --- | --- | --- |
| Handel | Ganztägig an der Börse, wie eine Aktie | Einmal täglich zum Schluss-NAV |
| Mindestanlage | Ein Anteil (oder ein Bruchteil, je nach Broker) | Oft feste Mindestbeträge (variiert) |
| Typische Kosten | Meist die niedrigsten Kostenquoten; Geld-Brief-Spanne beim Handel | Niedrig bei Indexvarianten; manche tragen Ausgabeaufschläge/Vertriebsgebühren – vermeidbar |
| Automatisches Investieren | Broker-abhängig, zunehmend unterstützt | Nativ und nahtlos |
| Steuereffizienz (USA) | Sachgebundene Schöpfung/Rücknahme minimiert meist Kapitalgewinn-Ausschüttungen | Schüttet eher steuerpflichtige Gewinne aus (länderabhängig) |
| Verhaltensrisiko | Handelbarkeit lädt zum Herumbasteln ein | Tägliche Bewertung bremst Daytrading |

## Wann welche Hülle besser passt

**ETFs glänzen, wenn** du die niedrigsten laufenden Gebühren willst, über ein modernes Brokerage investierst, Wert auf untertägige Kontrolle oder Transparenz der Bestände legst oder (in manchen Ländern, vor allem den USA) weniger überraschende steuerpflichtige Ausschüttungen in einem steuerpflichtigen Konto möchtest.

**Investmentfonds glänzen, wenn** die Priorität reibungslose Automatisierung ist – feste Monatsbeträge, eurogenaue Käufe, Wiederanlage von Dividenden, gehaltsgekoppelte Altersvorsorgepläne –, wo „einrichten und nie hinschauen" der ganze Sinn ist und wo Indexvarianten praktisch dasselbe kosten wie gleichwertige ETFs.

## Die Fallen, die wirklich zählen

Die Hüllen-Debatte lenkt von den Fehlern ab, die wirklich Geld kosten:

- **Teure Fonds in jeder Hülle** – eine Kostenquote von 1 %+ für indexnahe Anlage ist das, wovor man flieht, nicht die Hülle.
- **Ausgabeaufschläge und Bestandsprovisionen** bei manchen Investmentfonds – nie wert, sie für Standardanlage zu zahlen.
- **Handelsversuchung bei ETFs** – die Möglichkeit, um 10:43 Uhr bei einer beängstigenden Schlagzeile zu verkaufen, ist ein Feature für Trader und ein Bug für Sparer.
- **Dünn gehandelte Nischen-ETFs** – breite Spannen besteuern still jede Transaktion; breite Mainstream-Fonds haben dieses Problem nicht.

## Häufige Fragen

**Ist einer sicherer als der andere?**
Identische Bestände tragen identisches Marktrisiko. Beide Hüllen sind streng reguliert; keine schützt dich vor einem fallenden Markt.

**Warum gewinnen ETFs in den USA meist bei den Steuern?**
Ihre Anteilsschöpfung/-rücknahme erfolgt „sachgebunden" mit Market Makern, sodass der Fonds aufgewertete Positionen abstoßen kann, ohne zu verkaufen – also treffen Halter weniger Kapitalgewinn-Ausschüttungen. Der Vorteil schrumpft in steuerbegünstigten Konten und unterscheidet sich je nach Land.

**Kann ich einfach nach der Kostenquote auswählen?**
Fast: gleicher Index, dann niedrigste Gesamtkosten (Kostenquote + typische Spanne), dann die Hülle, die deinen Einzahlungs-Workflow am besten automatisiert. Strategie, Sparquote und Allocation stellen all das immer noch in den Schatten.${NOTE}`,
  },
  {
    topicKey: 'risk-and-return',
    title: 'Risiko und Rendite: Der Tausch hinter jeder Geldanlage',
    question: 'Wie hängen Risiko und Rendite zusammen, und was bedeutet „höheres Risiko, höhere Rendite" wirklich?',
    summary:
      '„Höheres Risiko, höhere Rendite" heißt wirklich: höhere *erwartete* Rendite als Bezahlung dafür, breitere Ergebnisse zu akzeptieren – auch schlechte. Volatilität, Drawdowns und das Gratisessen der Streuung zu verstehen, macht aus der Floskel ein Werkzeug.',
    tags: ['finanzen', 'geldanlage', 'risiko', 'grundlagen'],
    language: 'de',
    image: {
      prompt: promptOf('risk-and-return'),
      alt: 'Eine helle, unruhige Kugel und eine ruhige, stetige Kugel auf einer Wippe im Gleichgewicht',
    },
    sources: [
      { title: 'Investor.gov (US-SEC) – Grundlagen zum Risiko', url: 'https://www.investor.gov' },
      { title: 'Aswath Damodaran (NYU Stern) – Risikoprämien und Renditen', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    ],
    content: `# Risiko und Rendite: Der Tausch hinter jeder Geldanlage

„Höheres Risiko, höhere Rendite" ist der meistfehlzitierte Satz der Finanzwelt. Die präzise Version: Anlagen mit breiteren, beängstigenderen Ergebnisspannen müssen höhere **erwartete** Renditen bieten, sonst würde sie niemand halten. Die Mehrrendite ist *Entschädigung*, im Durchschnitt und über die Zeit gezahlt – keine Belohnung, die jedem Risikonehmer zugestellt wird. Jede Menge Risiken zahlen nichts; die Kunst ist zu wissen, welche Risiken eine Prämie tragen.

## Was „Risiko" hier eigentlich bedeutet

Mehrere verschiedene Dinge reisen unter einem Wort:

- **Volatilität** – wie stark der Wert von Jahr zu Jahr hin- und herspringt. Lästig, überlebbar.
- **Drawdown** – Verlust vom Hoch zum Tief. Breite Aktienmärkte sind wiederholt um 30–50 % gefallen; das ist kein Tail-Szenario, es ist der Eintrittspreis.
- **Dauerhafter Verlust** – der einzige tödliche: eine Firma, die pleitegeht, eine konzentrierte Wette, die implodiert, oder *du*, der am Tiefpunkt verkauft und einen vorübergehenden Drawdown in einen dauerhaften Verlust verwandelt.
- **Shortfall-Risiko** – das stille: so vorsichtig anzulegen, dass das Geld nicht genug für seinen Zweck wächst. „Sichere" Entscheidungen tragen es im Großhandel.

Die Volatilität eines gestreuten Aktiendepots ist meist vorübergehend; der Kollaps einer einzelnen Aktie ist oft dauerhaft. Dieselbe Anlageklasse, grundlegend verschiedenes Risiko.

## Welche Risiken eine Prämie zahlen – und welche nicht

| Risiko | Entschädigt? | Warum |
| --- | --- | --- |
| Breites Aktienmarktrisiko | Ja – die Aktienprämie | Nicht wegdiversifizierbar; jemand muss es tragen |
| Länger / an schwächere Schuldner verleihen | Ja – Laufzeit- und Kreditprämien | Echte Verlust-/Erosionschance |
| Eine Aktie statt vieler halten | **Nein** | Diversifizierbar – der Markt zahlt nicht für Risiken, die du gratis entfernen könntest |
| Lotterieartige Spekulation | Im Schnitt negativ | Du zahlst für den Traum |

Die wertvollste Zeile der Tabelle ist die dritte: **Streuung entfernt unentschädigtes Risiko zu null Kosten** – das Nächste an einem Gratisessen in der Finanzwelt. Konzentration ist nur rational, wenn du echten Vorsprung oder Insider-Überzeugung hast; sonst ist sie unbezahltes Risiko.

## Risiko auf den Zweck ausrichten

Die Risikotragfähigkeit wird durch die *Zeit* gesetzt: Geld, das nächstes Jahr gebraucht wird, kann einen Einbruch von 40 % nicht aussitzen; Geld, das 2050 gebraucht wird, kann ein Dutzend davon ignorieren. Die Risikotoleranz wird durch das *Temperament* gesetzt: Die Allocation, die du in Panik aufgibst, war nie richtig, egal was die Tabelle sagte. Praktische Regel – nimm dein maximal *nützliches* Risiko mit langfristigem Geld, und kein Risiko, für das du nicht bezahlt wirst, bei keinem Horizont.

## Häufige Fragen

**Wenn Aktien riskanter sind, warum stecken Berater Rentner überhaupt in Aktien?**
Weil der Ruhestand Jahrzehnte dauert und auch Inflation ein Risiko ist. Eine kleine bis mäßige Aktienscheibe bekämpft das Shortfall-Risiko, während Anleihen die nahen Jahre abdecken.

**Ist Volatilität das richtige Maß für Risiko?**
Sie ist der messbare Stellvertreter, nicht die Wahrheit. Für einen langfristigen Anleger sind die echten Risiken dauerhafter Verlust und das Ziel zu verfehlen – Volatilität zählt nur, wenn sie dich zum Verkauf zwingt oder erschreckt.

**Kann ich hohe Renditen bei niedrigem Risiko bekommen?**
Wer diese Kombination anbietet, irrt sich oder verkauft etwas. Echte Chancen mit niedrigem Risiko und hoher Rendite werden in Minuten wegarbitragiert – sie erreichen keine Verkaufsprospekte.${NOTE}`,
  },
  {
    topicKey: 'credit-card-interest',
    title: 'Wie Kreditkartenzinsen wirklich funktionieren (und warum sie sich auftürmen)',
    question: 'Wie funktionieren Kreditkartenzinsen tatsächlich, und warum wachsen die Schulden so schnell?',
    summary:
      'Kreditkarten verlangen mit die höchsten Zinsen im regulären Finanzwesen – oft 15–25 % effektiv, mit täglicher Verzinsung, sobald du einen Saldo trägst. Mindestzahlungen sind darauf ausgelegt, Schulden über Jahre zu strecken; die Mechanik zu verstehen ist der Ausweg.',
    tags: ['finanzen', 'kreditkarten', 'schulden', 'zinsen'],
    language: 'de',
    image: {
      prompt: promptOf('credit-card-interest'),
      alt: 'Eine Schuldentreppe, die sich von einer Karte hinaufwindet, mit einer wachsenden Schneekugel',
    },
    sources: [
      { title: 'US-Verbraucherschutzbehörde (CFPB) – Kreditkarten-Ressourcen', url: 'https://www.consumerfinance.gov' },
    ],
    content: `# Wie Kreditkartenzinsen wirklich funktionieren (und warum sie sich auftürmen)

Eine Kreditkarte ist zwei Produkte in einem Umschlag: ein wunderbares Zahlungsmittel, wenn du den Saldo monatlich ausgleichst, und einer der teuersten Kredite im regulären Finanzwesen, wenn nicht – häufig 15–25 % effektiver Jahreszins, mit Zinsen, die sich aufzinsen. Der Schneeball-Effekt ist keine Metapher; er ist die Arithmetik hoher Zinsen, täglich auf einen Saldo angewandt, an dem Mindestzahlungen kaum kratzen.

## Die Mechanik, Schritt für Schritt

- **Die zinsfreie Frist.** Zahle den *vollen Abrechnungssaldo* bis zum Fälligkeitstag, und Einkäufe kosten dich keine Zinsen. Das ist der einzige Modus, in dem eine Karte kostenloses Geldmanagement ist.
- **Sie verlieren.** Trägst du irgendeinen Saldo über den Fälligkeitstag hinaus, fallen ab dann typischerweise Zinsen auf Einkäufe ab dem ersten Tag an – die zinsfreie Frist ist weg, bis du den Saldo wieder voll ausgleichst.
- **Tägliche Verzinsung.** Die meisten Karten berechnen Zinsen täglich: 20 % effektiv sind ~0,0548 % pro Tag, angewandt auf deinen durchschnittlichen Tagessaldo. Zinsen fallen auf zuvor aufgelaufene Zinsen an – Zinseszins, der mit einer Rate gegen dich arbeitet, von der Aktien nur träumen.
- **Die Mindestzahlungs-Falle.** Mindestzahlungen liegen häufig bei ~1–3 % des Saldos. Bei 5.000 € zu 20 % effektiv betragen die Zinsen allein im ersten Jahr rund 1.000 € – eine 2-%-Mindestzahlung (100 €/Monat) läuft den Zinsen kaum davon, streckt die Tilgung Richtung eines Jahrzehnts und vervielfacht die wahren Kosten dessen, was du gekauft hast.

## Warum diese Schuld fast alles übertrifft

Einen Saldo zu 20 % effektiv zu tilgen, ist risikofrei eine „Rendite von 20 %" – besser, als irgendeine seriöse Anlage zuverlässig bietet. Die praktische Rangfolge ist deutlich:

| Verfügbares Geld | Beste Verwendung, meist |
| --- | --- |
| Kartenschuld zu 15–25 % | Tilge sie, bevor du über einen etwaigen Arbeitgeberzuschuss hinaus investierst |
| Welche Karte zuerst tilgen | Höchster Zins zuerst („Lawine") – mathematisch optimal |
| Motivation ist der Engpass | Kleinster Saldo zuerst („Schneeball") – psychologisch tragfähig |

Beide Reihenfolgen schlagen „überall nur das Minimum zahlen" um Jahre und Tausende.

## Konkret herauskommen

Hör auf, draufzulegen (stell beim Abbezahlen die Alltagsausgaben auf die Debitkarte um); zahle einen *festen* aggressiven Betrag statt der schrumpfenden Mindestrate; erwäge eine Saldenübertragung auf eine 0-%-Aktionskarte *nur* mit schriftlichem Plan, sie innerhalb des Aktionsfensters zu räumen (Übertragungsgebühren ~3–5 %, und die Zinsen nach der Aktion kehren zu brutalen Sätzen zurück); und behandle eine Ratenkredit-Konsolidierung als Zinssenkung, nicht als Absolution – das Ausgabeverhalten, das den Saldo aufbaute, muss enden, sonst baut er sich wieder auf.

## Häufige Fragen

**Schützt das Zahlen der Mindestrate meine Bonität?**
Es vermeidet Verzugsvermerke, ja – aber eine hohe Auslastung (Saldo ÷ Limit) drückt die Bonität trotzdem. Für die Bonität wie für den Geldbeutel lautet die Antwort gleich: Bring den Saldo runter.

**Lohnt es sich, einen kleinen Saldo „für die Bonität" zu halten?**
Ein hartnäckiger Mythos. Volle Tilgung baut dieselbe Zahlungshistorie auf und kostet null Zinsen; einen Saldo zu tragen bereichert nur den Herausgeber.

**Haben Bargeldvorschüsse denselben Zins?**
Meist schlechter: höherer Zins, eine Vorab-Gebühr und **keine zinsfreie Frist** – die Zinsen starten in dem Moment, in dem das Bargeld den Automaten verlässt. Sie sind der teuerste Knopf auf der Karte.${NOTE}`,
  },
  {
    topicKey: 'retirement-start-early',
    title: 'Warum früh mit der Altersvorsorge zu beginnen besser ist als später mehr zu sparen',
    question: 'Wie früh sollte ich für den Ruhestand sparen, und wie viel macht das Startalter aus?',
    summary:
      'Dank Zinseszins verdoppelt jedes Jahrzehnt Aufschub ungefähr den nötigen Monatsbeitrag für denselben Topf. Mit 25 statt 35 zu beginnen – gleicher Monatsbetrag – kann mit rund doppelt so viel Geld enden.',
    tags: ['finanzen', 'altersvorsorge', 'sparen', 'zinseszins'],
    language: 'de',
    image: {
      prompt: promptOf('retirement-start-early'),
      alt: 'Ein früh startender Lichtfaden, der zu einem Strom anschwillt, neben einem späten schmalen Rinnsal',
    },
    sources: [
      { title: 'Investor.gov (US-SEC) – Compound Interest Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
      { title: 'Bogleheads-Wiki – Startpunkte der Ruhestandsplanung', url: 'https://www.bogleheads.org/wiki/Main_Page' },
    ],
    content: `# Warum früh mit der Altersvorsorge zu beginnen besser ist als später mehr zu sparen

Die Altersvorsorge hat eine überragende Stellgröße, und es ist nicht das Einkommen, die Fondswahl oder auch nur die Sparquote – es ist, **wie viele Jahre sich das Geld verzinst**. Jedes Jahrzehnt Aufschub verdoppelt ungefähr, was du monatlich sparen musst, um am selben Punkt anzukommen. Die frühen Jahre fühlen sich sinnlos an (die Salden sind klein, das Wachstum unsichtbar) und sind mathematisch die wertvollsten Jahre, die du je haben wirst.

## Die Zwillings-Zeitleiste

Dieselben 500 €/Monat, dieselbe durchschnittliche Jahresrendite von 7 %, Renteneintritt mit 65:

| Startalter | Investierte Jahre | Gesamt eingezahlt | Endtopf (ca.) |
| --- | --- | --- | --- |
| 25 | 40 | 240.000 € | ~1.310.000 € |
| 35 | 30 | 180.000 € | ~610.000 € |
| 45 | 20 | 120.000 € | ~260.000 € |

Der 25-Jährige zahlt nur 60.000 € mehr ein als der 35-Jährige und endet mit rund **700.000 € mehr**. Andersherum: Um den Topf des Frühstarters einzuholen, muss der 35-Jährige rund 1.100 €/Monat sparen und der 45-Jährige rund 2.500 € – die Kosten des Aufschubs, monatlich in Rechnung gestellt.

## Warum das frühe Geld besonders ist

Ein mit 25 eingezahlter Betrag verzinst sich 40 Jahre – bei 7 % vervielfacht er sich ~15-fach. Derselbe Betrag mit 55 vervielfacht sich ~2-fach. Dein letztes Jahrzehnt vor dem Ruhestand *verdient* meist mehr, als du in ihm *einzahlst*, aber nur, wenn frühere Jahrzehnte die Basis aufgebaut haben, aus der es wächst. Zinseszins ist ein Schneeball: Der erste Schub zählt am meisten.

## Unperfekt anzufangen schlägt, später anzufangen

Die Reihenfolge, die den meisten Menschen dient:

1. **Jeden Arbeitgeberzuschuss voll mitnehmen** – das ist eine sofortige Rendite von 50–100 %; keine Anlage hält da mit.
2. **Einen Prozentsatz automatisieren, keinen Betrag** – schon 5–10 % des Einkommens mit 25 schlagen 20 % mit 40. Erhöhe ihn mit jeder Gehaltserhöhung um einen Punkt.
3. **Standardmäßig in breite, kostengünstige Indexfonds** innerhalb des steuerbegünstigten Kontos, das dein Land bietet – Jahrzehnte Horizont sind genau das, wofür aktienlastige Allocations da sind.
4. **Nicht auf den „richtigen Zeitpunkt" warten** – bei einem 40-Jahres-Horizont schlug jeder historische Startpunkt, auch der Vorabend von Crashs, das jahrelange Warten auf Klarheit.

## Wenn du spät anfängst

Die Mathematik ist härter, nicht hoffnungslos: Die Sparquote wird zum Hebel (der Zinseszins hat weniger Anlauf, also tragen die Beiträge mehr Last), schon 2–3 Jahre länger zu arbeiten hilft doppelt (mehr Beiträge, weniger Entnahmejahre), und die schlechteste Reaktion ist, nach Anlagen mit Lotterie-Chancen zu greifen, um „aufzuholen" – das Sequenzrisiko bestraft genau das.

## Häufige Fragen

**Soll ich für den Ruhestand sparen, während ich Schulden tilge?**
Nimm den Arbeitgeberzuschuss auch dann mit (er übertrifft jeden normalen Zinssatz); jenseits des Zuschusses verdienen hochverzinste Schulden meist Vorrang, niedrig verzinste meist nicht.

**Sind 7 % eine sichere Annahme?**
Es ist ein langfristiger historischer Aktienindex-Durchschnitt, keine Garantie – echte Pläne sollten auch 4–6 % testen. Beachte, dass sich die Schlussfolgerung nicht ändert: Jeder angenommene Zins belohnt den Frühstarter.

**Wie viel werde ich insgesamt brauchen?**
Ein grober Planungsanker: jährliche Ausgaben × 25 (die umgekehrte „4-%-Regel") – später verfeinert durch die Rentenlandschaft deines Landes. Mit 25 zählt die Zahl weniger als die Gewohnheit; Präzision kann warten, der Zinseszins nicht.${NOTE}`,
  },
];
