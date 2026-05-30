import type { DraftArticle } from '../types';

// German (de) translations of the editorial drafts. Faithful, natural
// translations of the English originals; tags are localized. Built up batch
// by batch.
export const de: DraftArticle[] = [
  // ── Batch 1: Wissenschaft und Natur ──
  {
    title: 'Die Photosynthese',
    question: 'Wie verwandeln Pflanzen Sonnenlicht in Nahrung?',
    summary:
      'Die Photosynthese ist der Vorgang, bei dem Pflanzen, Algen und manche Bakterien Lichtenergie, Wasser und Kohlendioxid in chemische Energie umwandeln, die als Zucker gespeichert wird, wobei Sauerstoff als Nebenprodukt frei wird.',
    tags: ['Biologie', 'Pflanzen', 'Energie', 'Chemie', 'Wissenschaft'],
    language: 'de',
    content: `# Die Photosynthese

Die Photosynthese ist der biochemische Vorgang, der Pflanzen, Algen und bestimmten Bakterien erlaubt, aus Licht ihre eigene Nahrung herzustellen. Sie ist die Grundlage fast aller Nahrungsketten der Erde und die Quelle des Sauerstoffs, den wir atmen.

## Die grundlegende Reaktion

Vereinfacht verbindet die Photosynthese Kohlendioxid und Wasser unter Nutzung von Lichtenergie zu Glukose und Sauerstoff:

\`\`\`
6 CO2 + 6 H2O + Lichtenergie -> C6H12O6 + 6 O2
\`\`\`

Der Zucker (Glukose) speichert chemische Energie, die der Organismus später zum Wachstum und Stoffwechsel nutzt. Der Sauerstoff wird in die Atmosphäre abgegeben.

## Zwei Stufen

- **Lichtabhängige Reaktionen.** In den Membranen von Strukturen namens Thylakoide nimmt das grüne Pigment **Chlorophyll** Licht auf. Diese Energie spaltet Wassermoleküle, setzt Sauerstoff frei und wird in zwei Energieträgern, ATP und NADPH, gespeichert.
- **Der Calvin-Zyklus (lichtunabhängige Reaktionen).** In der umgebenden Flüssigkeit (dem Stroma) treiben ATP und NADPH eine Reihe von Reaktionen an, die Kohlendioxid zu Zucker binden.

## Warum sie wichtig ist

Die Photosynthese entzieht der Luft Kohlendioxid und schließt es in lebendem Gewebe ein, weshalb sie für den globalen Kohlenstoffkreislauf und die Klimaregulierung zentral ist. Fossile Brennstoffe sind im Grunde altes Sonnenlicht, das die Photosynthese vor Millionen Jahren eingefangen hat.

## Varianten

Pflanzen in heißen, trockenen Klimazonen nutzen oft angepasste Wege — die **C4**- und **CAM**-Photosynthese —, die den Wasserverlust verringern und die Effizienz unter Stress verbessern. Das erklärt, warum Kulturen wie Mais und Zuckerrohr unter starker Sonne gedeihen.`,
  },
  {
    title: 'Der Wasserkreislauf',
    question: 'Wie bewegt sich Wasser über den Planeten?',
    summary:
      'Der Wasserkreislauf ist die ständige Bewegung des Wassers durch Verdunstung, Kondensation, Niederschlag und Abfluss, die Süßwasser über die Erde verteilt.',
    tags: ['Geowissenschaften', 'Wasser', 'Klima', 'Geografie', 'Wissenschaft'],
    language: 'de',
    content: `# Der Wasserkreislauf

Der Wasserkreislauf, auch hydrologischer Kreislauf, beschreibt, wie Wasser unaufhörlich zwischen Ozeanen, Atmosphäre und Land zirkuliert. Die Gesamtmenge des Wassers auf der Erde bleibt ungefähr konstant; der Kreislauf verschiebt es nur zwischen verschiedenen Speichern.

## Hauptstufen

- **Verdunstung.** Die Wärme der Sonne verwandelt flüssiges Wasser — meist aus den Ozeanen — in Dampf. Pflanzen fügen durch **Transpiration** Feuchtigkeit hinzu, und beide zusammen werden manchmal *Evapotranspiration* genannt.
- **Kondensation.** Wenn der Dampf aufsteigt und sich abkühlt, kondensiert er um winzige Teilchen und bildet Wolken.
- **Niederschlag.** Werden die Tröpfchen schwer genug, fallen sie als Regen, Schnee, Graupel oder Hagel.
- **Sammlung und Abfluss.** Wasser sammelt sich in Flüssen, Seen und Ozeanen oder sickert in den Boden, um Grundwasserleiter aufzufüllen, und kehrt schließlich zum Meer zurück.

## Speicher und Verweilzeit

Wasser kann sehr unterschiedlich lange in jedem Speicher verbringen — Tage in der Atmosphäre, aber Tausende Jahre im tiefen Grundwasser oder im Polareis. Diese „Verweilzeiten“ bestimmen, wie schnell sich Folgen von Verschmutzung oder Dürre durch das System bewegen.

## Warum er wichtig ist

Der Wasserkreislauf liefert Süßwasser an Ökosysteme und Landwirtschaft, formt Wetter und Erosion und reguliert die Temperatur, indem er enorme Wärmemengen verschiebt. Menschliches Handeln — Flüsse stauen, Feuchtgebiete trockenlegen und das Klima erwärmen — kann Überschwemmungen und Dürren verstärken, indem es das Gleichgewicht des Kreislaufs stört.`,
  },
  {
    title: 'Die Plattentektonik',
    question: 'Warum bewegen sich Kontinente und entstehen Erdbeben?',
    summary:
      'Die Plattentektonik ist die Theorie, dass die äußere Hülle der Erde in bewegliche Platten gegliedert ist, deren Wechselwirkungen Gebirge und Ozeane bilden sowie Erdbeben und Vulkane auslösen.',
    tags: ['Geowissenschaften', 'Geologie', 'Erdbeben', 'Vulkane', 'Wissenschaft'],
    language: 'de',
    content: `# Die Plattentektonik

Die Plattentektonik ist die vereinheitlichende Theorie der Geologie. Sie erklärt, dass die starre Außenschicht der Erde — die **Lithosphäre** — in etwa ein Dutzend große und mehrere kleinere Platten gegliedert ist, die sich langsam über das heißere, teilweise geschmolzene Gestein darunter bewegen.

## Was die Bewegung antreibt

Die Platten ruhen auf der **Asthenosphäre**, einer duktilen Schicht des oberen Erdmantels. Wärme, die aus dem Erdinneren entweicht, treibt eine langsame Konvektion an, und Kräfte wie der Zug dichter, abtauchender Platten („Plattenzug“) bewegen die Platten einige Zentimeter pro Jahr — etwa so schnell, wie Fingernägel wachsen.

## Drei Arten von Grenzen

- **Divergente Grenzen.** Platten driften auseinander, und Magma steigt auf, um neue Kruste zu bilden — etwa entlang des Mittelatlantischen Rückens.
- **Konvergente Grenzen.** Platten stoßen zusammen. Eine kann unter die andere abtauchen (**Subduktion**) und Tiefseegräben, Vulkane und Erdbeben bilden; oder zwei Kontinente falten sich auf und heben Gebirge wie den Himalaja.
- **Transformstörungen.** Platten gleiten horizontal aneinander vorbei, wie an der San-Andreas-Verwerfung in Kalifornien, wobei sich Spannung aufbaut, die sich als Erdbeben entlädt.

## Belege

Die Theorie ging aus früheren Vorstellungen der Kontinentaldrift hervor. Zusammenpassende Küstenlinien, identische Fossilien auf heute weit entfernten Kontinenten und die streifenförmigen Magnetmuster, die im Gestein des Meeresbodens eingefroren sind, bestätigten, dass die Platten den Globus über Hunderte Millionen Jahre umgeordnet haben — und es bis heute tun.`,
  },
  {
    title: 'Das menschliche Immunsystem',
    question: 'Wie verteidigt sich der Körper gegen Krankheiten?',
    summary:
      'Das Immunsystem ist ein mehrschichtiges Netzwerk aus Zellen, Geweben und Molekülen, das Krankheitserreger erkennt und neutralisiert und dabei die körpereigenen Zellen von fremden Bedrohungen unterscheidet.',
    tags: ['Biologie', 'Medizin', 'Gesundheit', 'menschlicher Körper', 'Wissenschaft'],
    language: 'de',
    content: `# Das menschliche Immunsystem

Das Immunsystem ist das Abwehrnetzwerk des Körpers gegen Bakterien, Viren, Pilze und andere Bedrohungen. Es arbeitet in einander überlappenden Schichten, von physischen Barrieren bis zu hochspezifischen zellulären Antworten.

## Angeborene Immunität

Die erste Verteidigungslinie ist schnell, aber unspezifisch. Sie umfasst physische Barrieren wie Haut und Schleim sowie Zellen wie **Makrophagen** und **neutrophile Granulozyten**, die Eindringlinge verschlingen. Entzündung und Fieber gehören zu dieser schnellen Antwort, die Erreger bremsen und Hilfe heranführen soll.

## Adaptive Immunität

Hält die Bedrohung an, startet das **adaptive** System einen gezielten Angriff:

- **B-Zellen** bilden **Antikörper** — Proteine, die sich an bestimmte Moleküle (Antigene) eines Erregers heften und ihn zur Zerstörung markieren.
- **T-Zellen** töten infizierte Zellen direkt oder koordinieren die umfassendere Antwort.

Ein entscheidendes Merkmal ist das **Gedächtnis**: Nach einer Infektion bleiben langlebige Gedächtniszellen zurück, sodass der Körper weit schneller reagiert, wenn derselbe Erreger zurückkehrt. Das ist das Prinzip der **Impfung**, die das Immunsystem mit einer harmlosen Version oder einem Fragment eines Erregers trainiert.

## Wenn etwas schiefläuft

Das System muss „Selbst“ von „Fremd“ unterscheiden. Versagt das, kommt es zu **Autoimmunerkrankungen** (Angriff auf eigenes Gewebe), **Allergien** (Überreaktion auf harmlose Stoffe) oder **Immunschwäche** (zu schwache Antwort). Empfindlichkeit und Zurückhaltung auszubalancieren ist eine der bemerkenswertesten Leistungen der Biologie.`,
  },
  {
    title: 'Die Mitochondrien',
    question: 'Warum nennt man die Mitochondrien das Kraftwerk der Zelle?',
    summary:
      'Mitochondrien sind Organellen, die den Großteil der nutzbaren Energie einer Zelle durch Atmung erzeugen und ihre eigene DNA tragen, die von einem fernen bakteriellen Vorfahren stammt.',
    tags: ['Biologie', 'Zellen', 'Energie', 'Genetik', 'Wissenschaft'],
    language: 'de',
    content: `# Die Mitochondrien

Mitochondrien sind winzige Strukturen im Inneren der meisten unserer Zellen, berühmt als das „Kraftwerk der Zelle“, weil sie den Großteil der Energie erzeugen, die das Leben antreibt.

## Energie erzeugen

Mitochondrien führen die **aerobe Atmung** durch und wandeln Nährstoffe und Sauerstoff in **ATP** (Adenosintriphosphat) um, das Molekül, das Zellen als Energiewährung nutzen. Der Vorgang läuft an der gefalteten Innenmembran des Mitochondriums ab, deren Falten (Cristae) die für energieerzeugende Reaktionen verfügbare Oberfläche vergrößern. Eine einzige Zelle kann je nach Energiebedarf von einem bis zu Tausenden Mitochondrien enthalten; Muskel- und Herzzellen sind besonders reich daran.

## Ein bakterieller Vorfahr

Mitochondrien besitzen ihre eigene kleine DNA-Schleife und vermehren sich durch Teilung, ganz wie Bakterien. Das stützt die **Endosymbiontentheorie**: Mitochondrien stammen von frei lebenden Bakterien ab, die vor etwa zwei Milliarden Jahren von einer frühen Zelle aufgenommen wurden und zu dauerhaften Partnern wurden.

## Über die Mutter vererbt

Da Spermien kaum Mitochondrien beisteuern, wird die **mitochondriale DNA** über die mütterliche Linie nahezu unverändert weitergegeben. Genetiker nutzen sie, um Abstammung und menschliche Wanderungen weit in die Vergangenheit zu verfolgen.

## Bezüge zur Gesundheit

Defekte der Mitochondrien können verschiedene Erbkrankheiten verursachen, und der mitochondriale Verfall wird als Faktor des Alterns und bei Erkrankungen wie Parkinson erforscht.`,
  },
  {
    title: 'Meeresströmungen',
    question: 'Was lässt Meerwasser in riesigen Schleifen um die Welt fließen?',
    summary:
      'Meeresströmungen sind großräumige Bewegungen von Meerwasser, angetrieben von Wind, Temperatur und Salzgehalt; sie verteilen Wärme über den Planeten und formen regionale Klimata.',
    tags: ['Geowissenschaften', 'Ozeanografie', 'Klima', 'Geografie', 'Wissenschaft'],
    language: 'de',
    content: `# Meeresströmungen

Meeresströmungen sind kontinuierliche, gerichtete Bewegungen des Meerwassers. Sie wirken wie ein planetenweites Kreislaufsystem und transportieren Wärme, Nährstoffe und Meeresleben über Tausende Kilometer.

## Oberflächenströmungen

Nahe der Oberfläche werden Strömungen vor allem vom **Wind** angetrieben. Die Erdrotation lenkt ihre Bahnen durch den **Corioliseffekt** ab und ordnet sie zu großen rotierenden Systemen namens **Wirbel (Gyres)**. Der Golfstrom etwa führt warmes Wasser von den Tropen nach Europa und verleiht Westeuropa ein milderes Klima, als seine Breite vermuten ließe.

## Tiefenzirkulation

Unter der Oberfläche werden Strömungen von Unterschieden der **Dichte** angetrieben, die von Temperatur und Salzgehalt abhängt. Kaltes, salziges Wasser nahe den Polen sinkt ab und fließt entlang des Meeresbodens, während wärmeres Wasser andernorts aufsteigt. Diese langsame globale Schleife heißt **thermohaline Zirkulation** oder „ozeanisches Förderband“, und ein voller Umlauf kann nahezu tausend Jahre dauern.

## Warum sie wichtig sind

Strömungen mildern die globalen Temperaturen, indem sie Wärme vom Äquator zu den Polen verschieben. Sie treiben den nährstoffreichen **Auftrieb** an, der einige der ergiebigsten Fischgründe der Welt trägt, und beeinflussen Wettermuster wie El Niño. Da das Förderband davon abhängt, dass kaltes, dichtes Polarwasser absinkt, beobachten Forscher Anzeichen, dass schmelzendes Eis und sich erwärmende Meere es schwächen könnten.`,
  },
  {
    title: 'Der Treibhauseffekt',
    question: 'Wie halten Gase in der Atmosphäre die Erde warm?',
    summary:
      'Der Treibhauseffekt ist die Erwärmung, die entsteht, wenn bestimmte Atmosphärengase die von der Erdoberfläche abgestrahlte Wärme einfangen; er hält den Planeten bewohnbar, verstärkt sich aber, wenn diese Gase zunehmen.',
    tags: ['Klima', 'Geowissenschaften', 'Atmosphäre', 'Umwelt', 'Wissenschaft'],
    language: 'de',
    content: `# Der Treibhauseffekt

Der Treibhauseffekt ist der natürliche Vorgang, der die Erde warm genug hält, um Leben zu tragen. Ohne ihn läge die mittlere Oberflächentemperatur des Planeten weit unter dem Gefrierpunkt.

## Wie er funktioniert

Sonnenlicht durchdringt die Atmosphäre und erwärmt die Erdoberfläche. Die Oberfläche strahlt diese Energie dann als **Infrarotstrahlung** (Wärme) wieder nach außen ab. Bestimmte Gase — vor allem **Kohlendioxid, Methan, Wasserdampf und Lachgas** — nehmen einen Teil dieser ausgehenden Infrarotstrahlung auf und strahlen sie in alle Richtungen wieder ab, auch zurück zum Boden. Das Ergebnis: Die Wärme verweilt in der unteren Atmosphäre, statt direkt ins All zu entweichen.

Der Name stammt von einem groben Vergleich mit einem Treibhaus, obwohl sich ein echtes Treibhaus vor allem dadurch erwärmt, dass es die Luftbewegung blockiert, nicht durch das Einfangen von Infrarot.

## Das natürliche Gleichgewicht

Über den Großteil der Geschichte hielten sich die Menge der Treibhausgase und die Energie, die die Erde verlässt, ungefähr die Waage und hielten das Klima relativ stabil.

## Der menschliche Einfluss

Das Verbrennen fossiler Brennstoffe, Entwaldung und Landwirtschaft haben die Konzentrationen von Kohlendioxid und Methan auf Werte angehoben, wie es sie seit Hunderttausenden von Jahren nicht gab. Dieser **verstärkte** Treibhauseffekt kippt das Gleichgewicht und lässt den Planeten mehr Wärme speichern. Zu den Folgen zählen steigende globale Temperaturen, veränderte Wettermuster, schmelzendes Eis und steigende Meeresspiegel — der zentrale Mechanismus des modernen Klimawandels.`,
  },
  {
    title: 'Die Biolumineszenz',
    question: 'Wie und warum leuchten manche Lebewesen im Dunkeln?',
    summary:
      'Biolumineszenz ist die Erzeugung von Licht durch lebende Organismen mittels einer chemischen Reaktion, genutzt zur Kommunikation, Tarnung, zum Anlocken von Beute und zur Partnersuche.',
    tags: ['Biologie', 'Chemie', 'Ozeanografie', 'Tiere', 'Wissenschaft'],
    language: 'de',
    content: `# Die Biolumineszenz

Biolumineszenz ist die Fähigkeit lebender Organismen, ihr eigenes Licht zu erzeugen. Von Glühwürmchen, die in einer Sommernacht blinken, bis zu Wellen, die an einem dunklen Strand leuchten, tritt sie überall im Baum des Lebens auf — und ist besonders in der Tiefsee verbreitet.

## Die Chemie

Das Leuchten entsteht durch eine chemische Reaktion und nicht durch Wärme, weshalb es eine Form von „kaltem Licht“ ist, das kaum Energie verschwendet. Ein lichtaussendendes Molekül namens **Luciferin** reagiert mit Sauerstoff, unterstützt von einem Enzym namens **Luciferase**. Die Reaktion gibt Energie als sichtbares Licht ab, meist blau oder grün — die Farben, die im Meerwasser am weitesten reichen.

## Warum Organismen leuchten

Biolumineszenz erfüllt viele Zwecke:

- **Beute anlocken.** Der Anglerfisch baumelt einen leuchtenden Köder vor seinem Maul.
- **Verteidigung.** Manche Tintenfische geben leuchtende Wolken ab, um Räuber zu verwirren; andere nutzen Licht, um sich in den schwachen Schein von oben einzufügen (Gegenbeleuchtung).
- **Kommunikation und Balz.** Glühwürmchen blinken in artspezifischen Mustern, um Partner zu finden.
- **Symbiose.** Viele Tiere erzeugen selbst kein Licht, sondern beherbergen leuchtende Bakterien in speziellen Organen.

## In der Tiefsee

Das Licht verblasst einige Hundert Meter tiefer zu Dunkelheit, und darunter kann die überwältigende Mehrheit der Tiere Licht erzeugen. In dieser lichtlosen Welt ist Biolumineszenz weniger eine Kuriosität als eine Hauptsprache des Überlebens.`,
  },
  // ── Batch 2: Geschichte und Gesellschaft ──
  {
    title: 'Die Seidenstraße',
    question: 'Was war die Seidenstraße und warum war sie bedeutsam?',
    summary:
      'Die Seidenstraße war ein Netz von Handelswegen, das Ostasien über tausend Jahre lang mit dem Mittelmeerraum verband und Waren, Technologien, Religionen und Ideen zwischen Zivilisationen beförderte.',
    tags: ['Geschichte', 'Handel', 'Asien', 'Zivilisation', 'Geografie'],
    language: 'de',
    content: `# Die Seidenstraße

Die Seidenstraße war kein einzelner gepflasterter Weg, sondern ein weitläufiges Netz aus Land- und Seewegen, das China, Zentralasien, Indien, Persien und die Mittelmeerwelt verband. Aktiv von etwa dem 2. Jahrhundert v. Chr. bis ins 15. Jahrhundert, prägte sie die Entwicklung jeder Gesellschaft, die sie berührte.

## Mehr als Seide

Chinesische Seide war der Luxus, der dem Netz seinen modernen Namen gab (geprägt von einem Geografen des 19. Jahrhunderts), doch zahllose Güter zogen darüber: Gewürze, Tee, Porzellan, Glas, Edelmetalle, Pferde und Papier. Wenige Händler legten die ganze Strecke zurück; Waren wurden über eine Kette von Kaufleuten und Oasenstädten wie Samarkand und Kaschgar von Hand zu Hand gereicht.

## Eine Fernstraße für Ideen

Die tiefste Wirkung der Straße war kulturell. Der **Buddhismus** verbreitete sich auf diesen Wegen von Indien nach China, während auch Islam, Christentum und Manichäismus mit den Händlern reisten. Entscheidende Techniken — **Papier, Schwarzpulver und Kompass** — wanderten nach Westen und veränderten die Gesellschaften, die sie empfingen.

## Krankheit und Niedergang

Dieselben Verbindungen, die Handel trugen, trugen auch Krankheit; viele Historiker verbinden die Seidenstraße mit der Ausbreitung des **Schwarzen Todes** im 14. Jahrhundert. Das Netz verfiel allmählich, als Seewege billiger und sicherer wurden und Landreiche zerfielen.

## Vermächtnis

Die Seidenstraße bleibt als einer der großen Motoren des Austauschs der Geschichte in Erinnerung — ein Beleg dafür, dass ferne Zivilisationen weit früher und tiefer verbunden waren, als man einst annahm.`,
  },
  {
    title: 'Der Buchdruck',
    question: 'Wie veränderte der Buchdruck die Welt?',
    summary:
      'Der Buchdruck, um 1440 von Johannes Gutenberg verfeinert, machte Bücher billig und reichlich und beschleunigte Alphabetisierung, Wissenschaft, religiöse Reform und die Verbreitung von Ideen in Europa.',
    tags: ['Geschichte', 'Technik', 'Kommunikation', 'Kultur', 'Europa'],
    language: 'de',
    content: `# Der Buchdruck

Der Buchdruck ist eine der folgenreichsten Erfindungen der Geschichte. Indem er das Kopieren von Texten mechanisierte, verwandelte er Bücher von seltenen, handkopierten Schätzen in massenhaft gefertigte Objekte.

## Gutenbergs Durchbruch

Druck mit geschnitzten Blöcken gab es bereits in Ostasien, doch um 1440 vereinte der deutsche Goldschmied **Johannes Gutenberg** mehrere Neuerungen zu einem praktischen System: haltbare **bewegliche Metalllettern**, eine ölbasierte Tinte, die am Metall haftete, und eine von der Weinkelterung abgewandelte Schraubenpresse. Seine **42-zeilige Bibel** (um 1455) zeigte, dass die Methode der Schönheit von Handschriften zu einem Bruchteil der Kosten gleichkommen konnte.

## Eine Informationsexplosion

Vor dem Druck konnte ein Schreiber Monate brauchen, um ein einziges Buch zu kopieren. Danach konnte eine Druckwerkstatt in derselben Zeit Hunderte identischer Exemplare herstellen. Bis 1500 hatten Pressen in ganz Europa Millionen Bände produziert. Die Preise fielen, die Alphabetisierung stieg, und standardisierte Texte ließen Wissen zuverlässig anwachsen.

## Die Gesellschaft umgestalten

Die Folgen waren tiefgreifend:

- Die **Reformation** breitete sich rasch aus, weil Flugschriften und übersetzte Bibeln gewöhnliche Leser erreichten.
- Die **wissenschaftliche Revolution** hing davon ab, dass Gelehrte präzise Diagramme und Daten über Grenzen hinweg teilten.
- Der standardisierte Druck half, Nationalsprachen zu festigen und die volkssprachliche Literatur zu verbreiten.

## Vermächtnis

Oft gilt der Buchdruck als die erste Informationstechnik, die Wissen demokratisierte — Vorläufer jedes späteren Sprungs, von Zeitungen bis zum Internet.`,
  },
  {
    title: 'Die Industrielle Revolution',
    question: 'Was war die Industrielle Revolution und wie verwandelte sie die Gesellschaft?',
    summary:
      'Die Industrielle Revolution war der Übergang von der Handarbeit zur maschinellen Fertigung, der im England des 18. Jahrhunderts begann und Wirtschaft, Städte, Arbeit und Alltag weltweit umgestaltete.',
    tags: ['Geschichte', 'Wirtschaft', 'Technik', 'Gesellschaft', 'Industrie'],
    language: 'de',
    content: `# Die Industrielle Revolution

Die Industrielle Revolution war eine Zeit dramatischen Wandels, die um 1760 in Großbritannien begann und in der die Wirtschaft von Landwirtschaft und Handwerk zu mechanisierter Industrie und Fabrikproduktion überging.

## Warum Großbritannien, warum damals

Mehrere Faktoren kamen zusammen: reichlich **Kohle** als Brennstoff, Eisenvorkommen, Kapital aus dem Handel, eine vom Land abwandernde Arbeiterschaft und eine Welle praktischer Erfindungen. Die von James Watt verbesserte **Dampfmaschine** gab den Fabriken eine starke, ortsunabhängige Energiequelle. Mechanisierte Textilmaschinen vervielfachten den Ertrag eines einzelnen Arbeiters.

## Vom Hof zur Fabrik

Die Produktion zog von verstreuten Häusern in zentrale **Fabriken**, die nahe Energie und Transport errichtet wurden. Eisen und später Stahl machten Maschinen und Eisenbahnen möglich; Kanäle und dann die Eisenbahn senkten die Kosten des Warentransports drastisch. Die Städte schwollen an, als die Menschen zur Industriearbeit zogen.

## Kosten und Nutzen

Die Revolution hob schließlich Lebensstandard und Lebenserwartung und schuf ganz neue Industrien. Doch ihre frühen Jahrzehnte brachten harte Verhältnisse: lange Arbeitszeiten, Kinderarbeit, gefährliche Maschinen, überfüllte Slums und Verschmutzung. Diese Härten nährten die Arbeiterbewegungen, Reformgesetze und neue politische Ideen über die Rechte der Arbeiter.

## Ein dauerhafter Wendepunkt

Eine „Zweite Industrielle Revolution“ im späten 19. Jahrhundert fügte Elektrizität, Chemie und Massenproduktion hinzu. Zusammen legten diese Umwälzungen das Muster der modernen Industriewelt fest — und begannen den Anstieg des Verbrauchs fossiler Brennstoffe, der heute die Klimaherausforderungen antreibt.`,
  },
  {
    title: 'Die Ursprünge der Schrift',
    question: 'Wann und warum erfanden Menschen die Schrift?',
    summary:
      'Die Schrift wurde in mehreren antiken Zivilisationen unabhängig erfunden, beginnend in Mesopotamien um 3400 v. Chr., ursprünglich zum Führen wirtschaftlicher Aufzeichnungen, bevor sie sich entwickelte, um Sprache vollständig zu erfassen.',
    tags: ['Geschichte', 'Sprache', 'Zivilisation', 'Kommunikation', 'Kultur'],
    language: 'de',
    content: `# Die Ursprünge der Schrift

Die Schrift — das Festhalten von Sprache in dauerhaften, sichtbaren Zeichen — ist eine der Erfindungen, die die Menschheit definieren. Sie entstand an mindestens einigen Orten unabhängig und veränderte jedes Mal die Gesellschaften, die sie entwickelten.

## Aus der Buchhaltung geboren

Die älteste bekannte Schrift stammt aus **Mesopotamien** (dem heutigen Irak) um 3400–3200 v. Chr. Sie begann nicht als Literatur, sondern als **Buchführung**: Tempelverwalter mussten Getreide, Vieh und Handel erfassen. Einfache, in Ton gedrückte Bilder wurden allmählich zu den keilförmigen Zeichen, die als **Keilschrift** bekannt sind und mit einem Schilfrohrgriffel geschrieben wurden.

## Unabhängige Erfindungen

Schrift entstand auch eigenständig in **Ägypten** (die Hieroglyphen), in **China** (die Vorfahren der chinesischen Zeichen, für Wahrsagerei genutzt) und in **Mesoamerika** (die Maya und ihre Vorläufer). Dass sie mehr als einmal erfunden wurde, zeigt, dass sie einem tiefen Bedürfnis komplexer Gesellschaften entsprach.

## Von Bildern zu Lauten

Frühe Schriften mischten Zeichen für Dinge mit Zeichen für Laute. Ein großer Sprung war das **Alphabet** — ein kleiner Satz Zeichen, die einzelne Laute darstellen —, das auf semitischsprachige Völker um 1800 v. Chr. zurückgeht und später von Phöniziern und Griechen angepasst wurde. Alphabete machten das Lesen und Schreiben leichter erlernbar und verbreitbar.

## Warum es bedeutsam war

Schrift ließ Wissen, Gesetze, Verträge und Erzählungen ihre Schöpfer überdauern. Sie machte Reiche regierbar, ließ Wissenschaft anwachsen und verwandelte Erinnerung von einer fragilen persönlichen Handlung in eine geteilte, dauerhafte Aufzeichnung.`,
  },
  {
    title: 'Die Inflation',
    question: 'Was verursacht Inflation und warum ist sie wichtig?',
    summary:
      'Inflation ist ein anhaltender Anstieg des allgemeinen Preisniveaus, der die Kaufkraft des Geldes mindert; mäßige Inflation ist normal, doch hohe oder instabile Inflation schadet Volkswirtschaften.',
    tags: ['Wirtschaft', 'Finanzen', 'Geld', 'Politik', 'Gesellschaft'],
    language: 'de',
    content: `# Die Inflation

Inflation ist die Rate, mit der das allgemeine Preisniveau von Waren und Dienstleistungen mit der Zeit steigt. Bei Inflation kauft jede Geldeinheit etwas weniger als zuvor — Geld verliert Kaufkraft.

## Wie sie gemessen wird

Ökonomen verfolgen die Inflation mit **Preisindizes**, am häufigsten dem Verbraucherpreisindex (VPI), der die Kosten eines repräsentativen „Warenkorbs“ alltäglicher Güter und Dienstleistungen abbildet. Kostet der Korb 3 % mehr als ein Jahr zuvor, beträgt die jährliche Inflation 3 %.

## Was sie verursacht

Inflation entsteht meist aus zwei großen Kräften:

- **Nachfragesog.** Übersteigt die Nachfrage, was eine Wirtschaft produzieren kann, treiben die Käufer die Preise hoch.
- **Kostendruck.** Steigen die Kosten von Vorleistungen wie Energie oder Arbeit, geben Unternehmen sie weiter.

Unter beiden vertreten die meisten Ökonomen die Ansicht, dass anhaltende Inflation eng mit dem Wachstum der **Geldmenge** im Verhältnis zur realen Produktion verbunden ist.

## Warum sie wichtig ist

Etwas Inflation — Zentralbanken zielen oft auf rund 2 % — gilt als gesund, da sie Ausgaben und Investitionen anregt und die Gefahren fallender Preise (**Deflation**) vermeidet. Doch hohe Inflation zehrt an Ersparnissen, verzerrt Entscheidungen und kann außer Kontrolle geraten, wie bei der **Hyperinflation**, bei der sich Preise binnen Tagen verdoppeln.

## Wie sie gesteuert wird

Zentralbanken bekämpfen übermäßige Inflation vor allem durch das Anheben der **Zinsen**, was Kreditaufnahme und Ausgaben dämpft. Inflation gegen Beschäftigung und Wachstum abzuwägen ist eine der zentralen Aufgaben der Wirtschaftspolitik.`,
  },
  {
    title: 'Die wissenschaftliche Methode',
    question: 'Wie funktioniert Wissenschaft wirklich?',
    summary:
      'Die wissenschaftliche Methode ist ein systematisches Vorgehen zum Aufbau von Wissen durch Beobachtung, Hypothese, Experiment und Überarbeitung, das Belege und Prüfbarkeit über Autorität stellt.',
    tags: ['Wissenschaft', 'Philosophie', 'Methode', 'Geschichte', 'Bildung'],
    language: 'de',
    content: `# Die wissenschaftliche Methode

Die wissenschaftliche Methode ist das disziplinierte Vorgehen, mit dem die Wissenschaft die Welt erforscht. Weniger ein starres Rezept als eine Haltung, gründet sie auf dem Prüfen von Ideen an Belegen und der Bereitschaft, gescheiterte zu verwerfen.

## Der zentrale Kreislauf

Ein typischer Kreislauf durchläuft mehrere Schritte:

1. **Beobachtung.** Ein Phänomen oder Rätsel bemerken.
2. **Frage.** Etwas Konkretes dazu fragen.
3. **Hypothese.** Eine prüfbare Erklärung vorschlagen — eine Aussage, die sich im Prinzip als falsch erweisen könnte.
4. **Vorhersage.** Ableiten, was geschehen sollte, wenn die Hypothese wahr ist.
5. **Experiment.** Die Vorhersage unter kontrollierten Bedingungen prüfen, idealerweise mit nur einem variierten Faktor zugleich.
6. **Analyse und Überarbeitung.** Ergebnisse mit der Vorhersage vergleichen und die Hypothese verfeinern, verwerfen oder erweitern.

## Schlüsselprinzipien

- **Prüfbarkeit und Falsifizierbarkeit.** Eine wissenschaftliche Aussage muss Vorhersagen treffen, die scheitern könnten. Ideen, die alles erklären und nichts verbieten, sind nicht wissenschaftlich.
- **Reproduzierbarkeit.** Andere müssen ein Experiment wiederholen und dasselbe Ergebnis erhalten können.
- **Begutachtung durch Fachkollegen.** Neue Arbeiten werden von anderen Fachleuten geprüft, bevor sie weithin anerkannt werden.
- **Vorläufiges Wissen.** Selbst gut gestützte Theorien bleiben offen für Überarbeitung, wenn bessere Belege auftauchen.

## Warum sie funktioniert

Indem sie Belege fordert und Kritik einlädt, korrigiert die wissenschaftliche Methode ihre eigenen Fehler mit der Zeit. Sie verspricht keine Gewissheit, hat sich aber als außerordentlich mächtig erwiesen, um ein verlässliches, anwachsendes Verständnis der Natur hervorzubringen.`,
  },
  {
    title: 'Die athenische Demokratie',
    question: 'Wie begann die Demokratie im antiken Athen?',
    summary:
      'Die athenische Demokratie, im 5. Jahrhundert v. Chr. entwickelt, war ein frühes System direkter Selbstverwaltung der Bürger, einflussreich als Vorfahr moderner demokratischer Ideen trotz ihrer deutlichen Grenzen.',
    tags: ['Geschichte', 'Politik', 'Griechenland', 'Demokratie', 'Zivilisation'],
    language: 'de',
    content: `# Die athenische Demokratie

Das antike Athen wird oft die Wiege der Demokratie genannt. Im 5. und 4. Jahrhundert v. Chr. entwickelte es ein System, in dem gewöhnliche Bürger und nicht Könige oder eine schmale Elite die Entscheidungen des Staates trafen.

## Wie sie funktionierte

Die athenische Demokratie war **direkt**, nicht repräsentativ. Große Entscheidungen traf die **Volksversammlung (Ekklesia)**, die allen berechtigten Bürgern offenstand und persönlich über Gesetze, Krieg und Politik beriet und abstimmte. Ein per Los bestimmter **Rat der Fünfhundert** bereitete die Tagesordnung vor, und die meisten Ämter und Gerichte wurden ebenfalls durch das **Los** und nicht durch Wahl besetzt — ein bewusster Versuch, die Konzentration von Macht zu verhindern.

## Wichtige Reformer

Der Weg führte über mehrere Gestalten: **Solon** erleichterte Schulden und erweiterte die Teilhabe; **Kleisthenes** ordnete um 508 v. Chr. die Bürger in neue Gruppen, die alte Loyalitäten durchkreuzten, und gilt oft als Begründer des Systems; und **Perikles** stand seinem reifen, selbstbewussten Höhepunkt vor.

## Deutliche Grenzen

Nach modernen Maßstäben war das System eng. Das Bürgerrecht — und damit die politische Stimme — schloss **Frauen, versklavte Menschen und ortsansässige Fremde** aus, sodass nur eine Minderheit der Bevölkerung teilnehmen konnte.

## Vermächtnis

Trotz dieser Grenzen brachte die athenische Demokratie bleibende Ideen hervor: dass legitime Autorität bei den Regierten liegen kann, dass Bürger offen beraten sollen und dass niemand über dem Gesetz steht. Diese Grundsätze hallten in der Aufklärung wider und gingen in die Gestaltung moderner Demokratien ein.`,
  },
  {
    title: 'Der Goldstandard',
    question: 'Was war der Goldstandard und warum gaben die Länder ihn auf?',
    summary:
      'Der Goldstandard war ein Währungssystem, in dem der Wert einer Währung an eine bestimmte Menge Gold gebunden war; er stabilisierte die Wechselkurse, schränkte aber die Flexibilität ein und wurde im 20. Jahrhundert aufgegeben.',
    tags: ['Wirtschaft', 'Geschichte', 'Geld', 'Finanzen', 'Politik'],
    language: 'de',
    content: `# Der Goldstandard

Der Goldstandard war ein System, in dem der Wert des Geldes eines Landes unmittelbar an Gold gebunden war. Unter einem vollen Goldstandard konnte Papiergeld auf Verlangen gegen eine feste Menge des Metalls getauscht werden.

## Wie er funktionierte

Jede Geldeinheit stand für ein festgelegtes Gewicht Gold, und die Regierungen verpflichteten sich, Banknoten zu diesem Kurs in Gold umzutauschen. Da viele Länder ihre Währungen an Gold banden, waren die Wechselkurse zwischen ihnen faktisch **fest**, was Handel und Investitionen über Grenzen hinweg berechenbarer machte.

## Vorteile

Anhänger schätzten den Goldstandard für **Stabilität** und **Disziplin**. Da das Geld durch eine begrenzte physische Ware gedeckt war, konnten Regierungen nicht ohne Weiteres Geld drucken, um Ausgaben zu finanzieren, was die langfristige Inflation niedrig hielt und Vertrauen in die Währung schuf.

## Die Nachteile

Eben diese Starrheit war auch seine Schwäche. Die Geldmenge war an die Goldreserven gebunden statt an die Bedürfnisse der Wirtschaft, sodass Regierungen wenig Spielraum hatten, auf Rezessionen, Bankenkrisen oder Schocks zu reagieren. Viele Ökonomen argumentieren, der Goldstandard habe die **Große Depression** der 1930er-Jahre vertieft und verbreitet, weil die Länder an ihm festhielten, statt ihre Wirtschaft anzukurbeln.

## Das Ende des Goldes

Die Nationen lösten sich schrittweise vom Gold. Das System brach 1971 endgültig zusammen, als die Vereinigten Staaten die Umtauschbarkeit des Dollars in Gold beendeten. Heute nutzt die Welt **Fiatgeld**, dessen Wert auf der Glaubwürdigkeit von Regierungen und Zentralbanken ruht und nicht auf einer physischen Ware.`,
  },
];
