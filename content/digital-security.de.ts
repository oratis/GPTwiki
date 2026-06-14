import type { DraftArticle } from './types';
import { digitalSecurityEn } from './digital-security.en';

// Batch: Digital Privacy & Security (deutsche Originalfassung). Gleiche Titel
// und gleiche topicKeys wie digital-security.en.ts; Inhalte sind für deutsche
// Leser muttersprachlich verfasst (Beispiele und Formulierungen an den
// hiesigen Alltag angepasst). Hero-Bilder werden geteilt.

const promptOf = (key: string): string => {
  const hit = digitalSecurityEn.find((d) => d.topicKey === key)?.image?.prompt;
  if (!hit) throw new Error(`no en image prompt for topicKey: ${key}`);
  return hit;
};

export const digitalSecurityDe: DraftArticle[] = [
  {
    topicKey: 'password-managers',
    title: 'Warum du einen Passwort-Manager nutzen solltest',
    question: 'Was ist ein Passwort-Manager, und ist er wirklich sicherer, als sich Passwörter zu merken?',
    summary:
      'Ein Passwort-Manager erzeugt und speichert hinter einem Master-Passwort für jedes Konto ein eigenes starkes Passwort – wird eine Seite gehackt, bleiben die übrigen Konten unberührt. Für die meisten ist das die wirksamste Sicherheitsgewohnheit überhaupt.',
    tags: ['sicherheit', 'datenschutz', 'passwörter', 'digitale sicherheit'],
    language: 'de',
    image: {
      prompt: promptOf('password-managers'),
      alt: 'Ein Hauptschlüssel öffnet einen Tresor voller hunderter einzigartiger Schlüssel',
    },
    sources: [
      { title: 'NIST – Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA – Starke Passwörter und Passwort-Manager', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Warum du einen Passwort-Manager nutzen solltest

Das Kernproblem, das ein Passwort-Manager löst, heißt **Wiederverwendung**. Kein Mensch kann sich hundert verschiedene starke Passwörter merken, also nutzt man immer dieselbe Handvoll – und das bedeutet: Sobald irgendeine Seite gehackt wird, nehmen Angreifer dieses Paar aus E-Mail und Passwort und probieren es bei deiner Bank, deinem Postfach und überall sonst durch. Dieser automatisierte Angriff (genannt Credential Stuffing) gehört zu den häufigsten Wegen, über die Konten übernommen werden. Ein Passwort-Manager zieht ihm die Wurzel: Er gibt jedem einzelnen Konto sein eigenes, einzigartiges Zufallspasswort.

## Wie es funktioniert

Ein Passwort-Manager ist ein verschlüsselter Tresor. Du merkst dir genau **ein** starkes Master-Passwort; alles andere merkt er sich:

- **Erzeugt** lange Zufallspasswörter (z. B. \`v8#mQ2!pLx9$\`), die du nie tippen oder behalten musst.
- **Speichert** sie verschlüsselt, abgeschlossen durch dein Master-Passwort.
- **Füllt** auf der richtigen Seite die richtigen Zugangsdaten automatisch aus – was nebenbei vor Phishing schützt, denn er trägt dein echtes Bankpasswort nicht in eine täuschend ähnliche Fake-Domain ein.

Der Tresor ist so verschlüsselt, dass selbst das Unternehmen hinter dem Manager deine Passwörter nicht lesen kann – eine Eigenschaft, die man Zero-Knowledge nennt. Dein Master-Passwort verlässt dein Gerät nie in nutzbarer Form.

## Der Einwand, beantwortet

Die instinktive Sorge lautet: „Ist es nicht gefährlich, alle Passwörter an einen Ort zu legen?" Es fühlt sich riskant an, aber die Rechnung geht andersherum auf:

| Ohne Manager | Mit Manager |
| --- | --- |
| Wenige, stark wiederverwendete Passwörter | Pro Seite ein eigenes Passwort |
| Ein Leak → viele Konten fallen | Ein Leak → ein Konto, eingedämmt |
| Schwache, leicht merkbare Wahl | Lang, zufällig, nicht knackbar |
| Passwörter in Phishing-Seiten getippt | Auto-Ausfüllen verweigert falsche Domains |

Ja, das Master-Passwort ist ein zentraler Schwachpunkt – also schützt du *es* gut (eine lange Passphrase aus zufälligen Wörtern, plus Zwei-Faktor für den Manager selbst) und akzeptierst: Ein Geheimnis erbittert zu verteidigen schlägt es, hundert schlecht zu verteidigen.

## Auswählen und anfangen

Seriöse Manager – gut bewertete Cloud-Dienste ebenso wie angesehene Offline-/Open-Source-Lösungen – sind allesamt drastisch besser als Wiederverwendung. Praktische Hinweise:

- **Master-Passwort**: eine lange Passphrase aus zufälligen Wörtern, einzigartig, nirgendwo sonst verwendet. Das ist das eine, das du dir wirklich merkst.
- **Schalte Zwei-Faktor** für das Konto des Managers selbst ein.
- **Migriere schrittweise**: lass ihn vorhandene Passwörter importieren und ändere dann zuerst die wiederverwendeten bei wichtigen Konten (E-Mail, Bank, Haupt-Shop).
- **Selbst der eingebaute Manager des Browsers** schlägt Wiederverwendung – entscheidend ist das Verhalten „überall eigene Passwörter", nicht die konkrete Marke.

## FAQ

**Was, wenn ich mein Master-Passwort vergesse?**
Bei echter Zero-Knowledge-Verschlüsselung kann es der Anbieter meist nicht wiederherstellen – genau das ist der Sinn. Richte gleich zu Beginn die Wiederherstellungsoptionen ein (Notfall-Kit, Wiederherstellungscode) und bewahre sie offline auf.

**Ist die Cloud-Synchronisation sicher?**
Der Tresor wird bereits verschlüsselt synchronisiert, der Sync-Server hält also stets nur einen unlesbaren Datenklumpen. Was ihn schützt, ist die Verschlüsselung, nicht das Netzwerk.

**Reichen die im Browser gespeicherten Passwörter?**
Sie sind weit besser als Wiederverwendung und für viele völlig ausreichend. Eigene Manager bieten zusätzlich browserübergreifende Nutzung, sicheres Teilen, Leak-Warnungen und stärkere Trennung – lohnend, je länger deine Kontoliste wird.`,
  },
  {
    topicKey: 'two-factor-auth',
    title: 'Zwei-Faktor-Authentifizierung: Welche Art ist wirklich sicher?',
    question: 'Was ist Zwei-Faktor-Authentifizierung, und warum ist SMS die schwächste Variante?',
    summary:
      'Zwei-Faktor-Authentifizierung fügt neben dem Passwort einen zweiten Nachweis hinzu, sodass ein gestohlenes Passwort allein nicht reicht. Doch die Arten sind ungleich: SMS-Codes lassen sich abfangen oder per SIM-Swap kapern, Authenticator-Apps und Hardware-Schlüssel sind weit stärker.',
    tags: ['sicherheit', 'zwei-faktor', 'authentifizierung', 'digitale sicherheit'],
    language: 'de',
    image: {
      prompt: promptOf('two-factor-auth'),
      alt: 'Eine Tür, die zugleich einen Schlüssel und ein separates rotierendes Token verlangt',
    },
    sources: [
      { title: 'NIST – Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
      { title: 'CISA – Mehr als ein Passwort (Multi-Faktor-Authentifizierung)', url: 'https://www.cisa.gov/MFA' },
    ],
    content: `# Zwei-Faktor-Authentifizierung: Welche Art ist wirklich sicher?

Zwei-Faktor-Authentifizierung (2FA, weiter gefasst MFA) bedeutet, dass der Login **zwei verschiedene Arten von Nachweis** verlangt: etwas, das du *weißt* (dein Passwort), plus etwas, das du *hast* (einen Code, eine App, einen physischen Schlüssel). Der Sinn ist Widerstandsfähigkeit – selbst wenn ein Angreifer dein Passwort über ein Leak oder Phishing erbeutet, kommt er ohne den zweiten Faktor nicht hinein. Sie einzuschalten gehört zum Wirksamsten, was du tun kannst. Doch den zweiten Faktor gibt es in mehreren Formen, und die sind in ihrer Stärke alles andere als gleich.

## Die Leiter, von schwach nach stark

| Methode | Wie sie funktioniert | Schwäche |
| --- | --- | --- |
| **SMS-Code** | Ein Code wird aufs Handy geschickt | SIM-Swap, Netzabfang, phishbar |
| **Authenticator-App** | App erzeugt einen 6-stelligen Code, der alle 30 Sek. wechselt | Phishbar, wenn du ihn auf einer Fake-Seite eintippst |
| **Push-Bestätigung** | „Diesen Login bestätigen?"-Hinweis auf dem Handy | „Fatigue"-Angriffe – Spam, bis du auf Ja tippst |
| **Hardware-Sicherheitsschlüssel / Passkey** | Ein physischer Schlüssel oder geräte­gebundener Berechtigungsnachweis, kryptografisch an die echte Seite gekoppelt | Phishing-resistent per Design |

Alles auf dieser Liste schlägt reines Passwort. Aber die Sprossen machen den Unterschied.

## Warum SMS die schwache Sprosse ist

Per SMS verschickte Codes waren die erste 2FA für die breite Masse und sind weiterhin verbreitet, doch sie haben reale, ausgenutzte Schwächen:

- **SIM-Swapping**: Ein Angreifer überredet (oder besticht) deinen Mobilfunkanbieter, deine Nummer auf seine SIM zu übertragen, und deine Codes landen nun auf *seinem* Handy. Das ist ein dokumentierter, wiederkehrender Weg, über den hochwertige Konten leergeräumt werden.
- **Abfangen**: Die zugrunde liegende Signalisierung der Mobilfunknetze hat bekannte Schwachstellen, mit denen sich SMS umleiten lassen.
- **Trotzdem phishbar**: Eine gefälschte Login-Seite kann dich schlicht nach dem SMS-Code fragen und ihn in Echtzeit weiterreichen.

Das ehrliche Fazit: **SMS-2FA ist viel besser als nichts** – behalte sie, wo sie die einzige Option ist – aber rücke wichtige Konten (E-Mail, Finanzen, Hauptidentität) auf der Leiter nach oben.

## Was du tatsächlich nutzen solltest

- **Standardmäßig eine Authenticator-App** (rotierende Codes) – kostenlos, einfach, immun gegen SIM-Swaps und fast überall unterstützt.
- **Für deine kritischsten Konten einen Hardware-Schlüssel oder Passkey** – diese sind *phishing-resistent*: Der Berechtigungsnachweis ist kryptografisch an die echte Website gebunden, authentifiziert sich also schlicht nicht gegenüber einer Nachahmung und besiegt damit den Angriff, der jede code-basierte Methode aushebelt.
- **Schütze zuerst deine E-Mail.** Sie ist der Hauptschlüssel – die Passwort-Resets für alles andere laufen über sie, also verdient sie deinen stärksten Faktor.

## FAQ

**Ist irgendeine 2FA besser als keine?**
Ja, eindeutig. Selbst SMS blockt die überwältigende Mehrheit automatisierter Angriffe. Lass dir von „SMS ist schwach" nicht ausreden, sie dort zu aktivieren, wo sie das Einzige ist.

**Was passiert, wenn ich mein Handy / meinen Schlüssel verliere?**
Sichere die Backup-/Wiederherstellungscodes, die jeder Dienst bei der Einrichtung anbietet, und registriere einen zweiten Faktor (einen Ersatzschlüssel oder die App auf einem zweiten Gerät). Wiederherstellungscodes offline aufbewahren.

**Sind Push-„Bestätigen"-Hinweise sicher?**
Gut, aber anfällig für Fatigue-Angriffe – endlose Hinweise in der Hoffnung, dass du „bestätigen" tippst, damit sie aufhören. Bestätige nie einen Login, den du nicht selbst gestartet hast; bevorzuge, wo angeboten, Hinweise mit Zahlenabgleich.`,
  },
  {
    topicKey: 'passkeys',
    title: 'Was sind Passkeys, und lösen sie Passwörter ab?',
    question: 'Was ist ein Passkey, und worin unterscheidet er sich von einem Passwort?',
    summary:
      'Ein Passkey ersetzt das Passwort durch ein kryptografisches Schlüsselpaar, das zwischen Website und Gerät aufgeteilt ist – nichts Geheimes wird getippt oder geteilt, also gibt es nichts zu phishen, wiederzuverwenden oder bei einem Leak zu stehlen. Er ist der designierte Nachfolger des Passworts.',
    tags: ['sicherheit', 'passkeys', 'authentifizierung', 'passwörter'],
    language: 'de',
    image: {
      prompt: promptOf('passkeys'),
      alt: 'Zwei zueinander passende Schlüsselhälften beweisen, dass sie passen, ohne sich je zu berühren',
    },
    sources: [
      { title: 'FIDO Alliance – Passkeys im Überblick', url: 'https://fidoalliance.org/passkeys/' },
      { title: 'NIST – Digital Identity Guidelines (SP 800-63B)', url: 'https://pages.nist.gov/800-63-3/sp800-63b.html' },
    ],
    content: `# Was sind Passkeys, und lösen sie Passwörter ab?

Ein Passkey ist ein Anmeldenachweis, der die zwei Erbsünden des Passworts beheben soll: Passwörter sind **geteilte Geheimnisse** (du und die Seite kennen dieselbe Zeichenfolge, also lässt sie sich von beiden Seiten stehlen) und sie werden **getippt** (also lassen sie sich phishen oder wiederverwenden). Ein Passkey ist weder geteilt noch getippt. Er beruht auf Public-Key-Kryptografie, und sobald du die Aufteilung verstehst, liegen die Sicherheitsvorteile auf der Hand.

## Die Idee des Schlüsselpaars, in einfachen Worten

Wenn du einen Passkey erstellst, erzeugt dein Gerät ein **Paar** mathematisch verknüpfter Schlüssel:

- Einen **privaten Schlüssel**, der dein Gerät (Handy, Laptop oder Sicherheitsschlüssel) nie verlässt, geschützt durch deinen Fingerabdruck, dein Gesicht oder die Geräte-PIN.
- Einen **öffentlichen Schlüssel**, der an die Website übergeben wird.

Der öffentliche Schlüssel ist kein Geheimnis – mit ihm kann sich niemand als du ausgeben. Zum Anmelden schickt die Seite eine Aufgabe (Challenge); dein Gerät beweist, dass es den passenden privaten Schlüssel besitzt, *ohne ihn je preiszugeben*. Nichts Geheimes überquert das Netzwerk, und nichts Wiederverwendbares wird je auf dem Server gespeichert.

## Warum das die gängigen Angriffe aushebelt

| Angriff | Gegen Passwörter | Gegen Passkeys |
| --- | --- | --- |
| Datenbank-Leak | Stiehlt (gehashte) Passwörter | Stiehlt nur öffentliche Schlüssel – für Angreifer nutzlos |
| Phishing | Fake-Seite erfasst, was du tippst | Nichts zu tippen; Schlüssel an echte Domain gebunden |
| Wiederverwendung | Ein Leak öffnet viele Seiten | Jeder Passkey ist per Design einzigartig und seitenspezifisch |
| Credential Stuffing | Funktioniert massenhaft | Nichts zum Durchprobieren |

Die Phishing-Resistenz ist der Aufmacher. Ein Passkey ist kryptografisch an die Identität der echten Website gekoppelt, eine täuschend ähnliche Domain kann ihn also schlicht nicht auslösen – das schließt die Lücke, die selbst Codes aus Authenticator-Apps offenlassen.

## Heute schon nutzen

In der Praxis fühlt sich ein Passkey meist an wie das **Entsperren des Handys**: Ein Hinweis erscheint, du bestätigst per Fingerabdruck oder Gesicht, und du bist drin – kein Passwort, kein Code zum Abtippen. Passkeys synchronisieren sich typischerweise über dein Geräte-Ökosystem (ein neues Handy behält sie also) oder liegen für die höchste Sicherheit auf einem Hardware-Sicherheitsschlüssel. Die Unterstützung ist breit und wächst über große Plattformen und Websites hinweg, befindet sich aber mitten im Übergang: Die meisten Seiten, die Passkeys anbieten, behalten Passwörter weiterhin als Rückfalloption.

## FAQ

**Was, wenn ich mein Gerät verliere?**
Synchronisierte Passkeys lassen sich über dein Plattformkonto auf einem neuen Gerät wiederherstellen (geschützt durch dessen eigene starke Sicherheit). Bei gerätegebundenen Schlüsseln registrierst du einen zweiten Passkey oder behältst eine Backup-Methode – dieselbe Disziplin wie bei der 2FA-Wiederherstellung.

**Kann ein Unternehmen bei einem Leak meinen Passkey preisgeben?**
Nein – der Server hält nur deinen öffentlichen Schlüssel, der kein Geheimnis ist und sich nicht als du anmelden kann. Das ist der strukturelle Vorteil gegenüber Passwort-Datenbanken.

**Brauche ich trotzdem noch einen Passwort-Manager?**
Vorerst ja – Passkeys werden schrittweise ausgerollt, du wirst also über Jahre einen Mix haben. Viele Passwort-Manager speichern bereits auch Passkeys und werden so zum gemeinsamen Tresor für beides.`,
  },
  {
    topicKey: 'phishing-scams',
    title: 'Wie du Phishing und Online-Betrug erkennst',
    question: 'Wie erkenne ich eine Phishing-Mail oder Betrugsnachricht, bevor sie mich austrickst?',
    summary:
      'Phishing erzeugt Dringlichkeit, damit du handelst, bevor du nachdenkst – ein falscher Alarm, ein zu gutes Angebot, ein „jetzt verifizieren"-Link. Die Abwehr sind Gewohnheiten, keine Geräte: langsamer werden, echten Absender und Link prüfen und nie über einen Link aus einer Nachricht anmelden.',
    tags: ['sicherheit', 'phishing', 'betrug', 'digitale sicherheit'],
    language: 'de',
    image: {
      prompt: promptOf('phishing-scams'),
      alt: 'Ein als Briefumschlag getarnter Haken nähert sich einem Fisch, der in einem Schutzring innehält',
    },
    sources: [
      { title: 'CISA – Phishing erkennen und melden', url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing' },
      { title: 'FTC – Phishing-Betrug erkennen und vermeiden', url: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams' },
    ],
    content: `# Wie du Phishing und Online-Betrug erkennst

Phishing ist ein Vertrauenstrick im technischen Kostüm. Der Angreifer knackt nicht deine Verschlüsselung – er bringt *dich* dazu, ein Passwort, einen Code oder Geld herauszugeben, indem er sich als jemand ausgibt, dem du vertraust, und einen Moment herstellt, in dem du aus Emotion statt aus Urteilsvermögen handelst. Weil es auf menschliche Reflexe zielt, ist auch die Abwehr menschlich: ein paar Gewohnheiten, die den Trick zuverlässig durchbrechen. Die nützlichste davon ist, die hergestellte Emotion zu erkennen.

## Das universelle Erkennungszeichen: hergestellte Dringlichkeit

Fast jeder Betrug braucht dich *schnell*, bevor der denkende Teil deines Gehirns aufholt. Die emotionalen Hebel sind eine kurze Liste:

- **Angst**: „Ihr Konto wird gesperrt", „verdächtiger Login erkannt", „offene Steuern – jetzt handeln".
- **Gier**: „Sie haben gewonnen", „fordern Sie Ihre Rückerstattung an", „Investment, das sich wöchentlich verdoppelt".
- **Autorität**: eine Nachricht „von" deiner Bank, deinem Chef, einem Paketdienst oder einer Behörde.
- **Neugier/Hilfsbereitschaft**: „Bist du das auf diesem Foto?", „Ich brauche schnell einen Gefallen."

Wenn eine Nachricht deinen Puls in die Höhe treibt und dich drängt, *sofort* zu klicken, zu zahlen oder zu teilen, ist dieser Druck selbst das Warnsignal – seriöse Organisationen arbeiten nicht nach dem Muster „in den nächsten 10 Minuten antworten, sonst".

## Die konkreten Prüfungen

| Prüfung | Worauf achten |
| --- | --- |
| **Absenderadresse** | Aufklappen/ansehen – \`service@paypa1.com\` ≠ \`paypal.com\`. Anzeigenamen lügen. |
| **Der tatsächliche Link** | Schweben (nicht klicken), um das echte Ziel zu sehen; auf täuschend ähnliche Domains achten |
| **Allgemeine Anrede** | „Sehr geehrter Kunde" von einem Unternehmen, das deinen Namen kennt |
| **Unerwartete Anhänge** | Rechnungen/Belege, die du nicht erwartet hast – klassischer Schadsoftware-Versand |
| **Aufforderung zu Geheimnissen** | Echte Institutionen fragen nie nach Passwort, vollständiger PIN oder 2FA-Code |
| **Druck + Geheimhaltung** | „Sag es niemandem", „dringende Überweisung", Zahlung per Gutschein – alles riesige Warnzeichen |

## Die zwei Regeln, die die meisten Verluste verhindern

1. **Melde dich nie über einen Link in einer Nachricht an.** Wenn eine E-Mail behauptet, es gebe ein Problem mit einem Konto, klick nicht – öffne einen neuen Tab und tippe die Adresse selbst (oder nutze Lesezeichen/App). Diese eine Gewohnheit besiegt das meiste Zugangsdaten-Phishing, weil die Fake-Seite gar nicht erst zum Zug kommt.

2. **Bestätige außerhalb des Kanals bei allem, was Geld oder Geheimnisse betrifft.** Der „Chef", der eine Überweisung oder Gutscheine will, die „Bank", die dich bittet, „Geld auf ein sicheres Konto zu verschieben", ein Verwandter in plötzlicher Not – halt inne und bestätige über einen *separaten, bekannten* Kanal (ruf die offizielle Nummer an, nicht die aus der Nachricht). Dringlichkeit plus eine ungewöhnliche Zahlungsmethode ist die Signatur eines Betrugs.

## FAQ

**Die Nachricht sieht perfekt aus – Logo, Formatierung, mein Name. Ist Zweifel da noch berechtigt?**
Ja. Überzeugende Optik ist trivial zu kopieren, und persönliche Details sickern aus Leaks. Urteile nach der *Aufforderung* (Dringlichkeit, Geheimnisse, Zahlung) und prüfe unabhängig nach – nicht danach, wie poliert es aussieht.

**Ich habe einen Link geklickt / mein Passwort eingegeben. Was nun?**
Schnell handeln: Ändere dieses Passwort (und überall, wo es wiederverwendet wurde) von einem als sicher bekannten Gerät aus, aktiviere 2FA, achte auf unbefugte Aktivität und kontaktiere die echte Institution. Tempo begrenzt den Schaden.

**Sind Anrufe und SMS auch Phishing?**
Ja – „Vishing" (Sprache) und „Smishing" (SMS) nutzen dasselbe Drehbuch, und KI-Stimmklone machen Anrufe überzeugender. Dieselbe Regel gilt: auflegen und auf einer offiziellen Nummer zurückrufen, die du selbst herausgesucht hast.`,
  },
  {
    topicKey: 'vpn-explained',
    title: 'Was ein VPN wirklich tut (und was nicht)',
    question: 'Was schützt ein VPN tatsächlich, und brauche ich überhaupt eins?',
    summary:
      'Ein VPN verschlüsselt deinen Verkehr zu einem Server, der deine IP-Adresse verbirgt und dich in unsicheren Netzen schützt. Es bringt aber weder pauschale Anonymität noch Sicherheit – HTTPS schützt die meisten Daten bereits, und ein VPN verlagert das Vertrauen nur zum Anbieter, statt es zu tilgen.',
    tags: ['sicherheit', 'datenschutz', 'vpn', 'netzwerk'],
    language: 'de',
    image: {
      prompt: promptOf('vpn-explained'),
      alt: 'Daten reisen durch eine versiegelte Röhre, die ihren Ursprung bis zu einem fernen Relais verbirgt',
    },
    sources: [
      { title: 'EFF – Surveillance Self-Defense: VPNs', url: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you' },
      { title: 'CISA – Hinweise zu sicheren Verbindungen', url: 'https://www.cisa.gov/secure-our-world' },
    ],
    content: `# Was ein VPN wirklich tut (und was nicht)

Ein VPN (virtuelles privates Netzwerk) baut einen verschlüsselten Tunnel von deinem Gerät zu einem Server des VPN-Anbieters; dein Verkehr tritt von *dort* ins Internet aus und trägt die IP-Adresse jenes Servers statt deiner eigenen. Das ist der ganze Mechanismus – und daraus folgen sowohl die echten Vorteile als auch ein Haufen Marketing-Übertreibungen. Am wichtigsten zu verstehen ist, dass ein VPN dein Vertrauen **verlagert**; es macht das Vertrauen nicht überflüssig.

## Was es tatsächlich tut

- **Verbirgt deine IP-Adresse** vor den Websites, die du besuchst – sie sehen den Standort des VPN-Servers, nicht dein Zuhause oder deine Stadt. Nützlich, um eine Form von Tracking zu verringern und deine Netzwerkidentität nicht preiszugeben.
- **Verschlüsselt den Verkehr im lokalen Netz** – im zwielichtigen öffentlichen WLAN (Café, Flughafen, Hotel und jeder, der dort schnüffelt) ist nur ein verschlüsselter Tunnel zu sehen, nicht, was du tust.
- **Verbirgt deine Aktivität vor deinem Internetanbieter** – dein Provider sieht, dass du mit einem VPN verbunden bist, aber nicht, welche Seiten du besuchst.
- **Ändert deinen scheinbaren Standort** – weshalb manche es nutzen, um regional gesperrte Inhalte zu erreichen (vorbehaltlich der jeweiligen Nutzungsbedingungen).

## Was es NICHT tut

Hier verkauft das Marketing zu viel:

| Mythos | Realität |
| --- | --- |
| „Ein VPN macht dich anonym" | Weit gefehlt – Logins, Cookies, Browser-Fingerprinting und Konten identifizieren dich trotzdem |
| „Ein VPN schützt vor Viren/Hacking" | Tut es nicht – es ist ein Tunnel, kein Virenschutz und keine Firewall gegen Schadsoftware |
| „Ein VPN verschlüsselt alles, was du tust" | Die meisten Seiten sind bereits Ende-zu-Ende per HTTPS verschlüsselt; das VPN schützt vor allem den *lokalen* Abschnitt |
| „Ein VPN verbirgt dich vor jedem" | Dein VPN-Anbieter kann deinen Verkehr sehen – du hast das Vertrauen nur zu ihm verlagert |

Dieser letzte Punkt ist der entscheidende. Ohne VPN können dein lokales Netz und dein Provider deine Verbindungen beobachten. *Mit* VPN nimmt stattdessen das VPN-Unternehmen diese Position ein – ein VPN ist also nur so vertrauenswürdig wie sein Betreiber. Ein kostenloses VPN, das sich durch Protokollieren und Verkaufen deiner Aktivität finanziert, kann schlimmer sein als keines.

## Brauchst du eins?

| Situation | Fazit |
| --- | --- |
| Häufig in öffentlichem/unsicherem WLAN | Sinnvoll – fügt eine echte Schicht hinzu (HTTPS deckt aber schon vieles ab) |
| Browsing vor dem Provider verbergen | Ja, das ist ein Kernnutzen |
| Regional gesperrte Inhalte erreichen | Verbreiteter Zweck (Nutzungsbedingungen beachten) |
| Echte Anonymität anstreben | Ein VPN allein liefert sie nicht |
| Ohnehin nur in vertrauten Netzen, mit HTTPS | Optional – der Nutzen ist kleiner, als die Werbung suggeriert |

Wenn du eins nutzt, wähle einen seriösen, kostenpflichtigen Anbieter mit klarer, idealerweise auditierter No-Logs-Richtlinie – du vertraust ihm alles an, was zuvor dein Provider sehen konnte.

## FAQ

**Hindert ein VPN Websites daran, mich zu tracken?**
Nur den IP-basierten Teil. Cookies, Logins und Browser-Fingerprinting identifizieren dich weiterhin. Anti-Tracking braucht Browser-Einstellungen/-Erweiterungen, kein VPN.

**Ist ein kostenloses VPN in Ordnung?**
Sei vorsichtig – Server zu betreiben kostet Geld, und manche kostenlosen VPNs holen es sich zurück, indem sie deine Daten protokollieren und verkaufen, das Gegenteil des Ziels. Seriöse Gratis-Tarife gibt es, aber lies die Datenschutzerklärung.

**Brauche ich ein VPN, wenn Seiten HTTPS nutzen?**
HTTPS verschlüsselt den Inhalt deines Verkehrs bereits Ende-zu-Ende. Ein VPN ergänzt das Verbergen der IP und schützt Metadaten im lokalen Netz, ist aber ein kleineres Upgrade, als die Werbung nahelegt, wenn du ohnehin auf HTTPS bist.`,
  },
  {
    topicKey: 'end-to-end-encryption',
    title: 'Was ist Ende-zu-Ende-Verschlüsselung?',
    question: 'Was bedeutet Ende-zu-Ende-Verschlüsselung, und warum ist sie für Messenger wichtig?',
    summary:
      'Ende-zu-Ende-Verschlüsselung sperrt eine Nachricht so, dass nur Absender und Empfänger sie lesen können – nicht das Netzwerk, nicht einmal das Unternehmen hinter dem Dienst. Es ist der Unterschied zwischen einem versiegelten Brief und einer Postkarte, die jeder unterwegs mitliest.',
    tags: ['sicherheit', 'datenschutz', 'verschlüsselung', 'messenger'],
    language: 'de',
    image: {
      prompt: promptOf('end-to-end-encryption'),
      alt: 'Eine versiegelte Nachrichtenkapsel, unterwegs unlesbar, öffnet sich erst am fernen Gerät',
    },
    sources: [
      { title: 'EFF – Surveillance Self-Defense: Was ist Verschlüsselung?', url: 'https://ssd.eff.org/module/what-encryption' },
      { title: 'NIST – Kryptografische Standards und Leitlinien', url: 'https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines' },
    ],
    content: `# Was ist Ende-zu-Ende-Verschlüsselung?

Ende-zu-Ende-Verschlüsselung (E2EE) bedeutet, dass eine Nachricht auf dem Gerät des Absenders verschlüsselt wird und nur auf dem Gerät des Empfängers wieder entschlüsselt werden kann – an keiner Stelle dazwischen kann sie also jemand anderes lesen. Entscheidend: „jemand anderes" schließt das Unternehmen ein, das den Dienst betreibt. Der klassische Vergleich: Eine normale Nachricht ist eine **Postkarte**, die jeder Bearbeiter unterwegs lesen kann; eine Ende-zu-Ende-verschlüsselte Nachricht ist ein **versiegelter Brief**, den nur der Empfänger öffnen kann. Der Unterschied liegt darin, wer deine Gespräche lesen *kann*, nicht nur, wer es zu unterlassen *verspricht*.

## Der Unterschied, auf den es wirklich ankommt

Die meisten Online-Dienste verschlüsseln Daten „bei der Übertragung" (zwischen dir und ihren Servern) und „im Ruhezustand" (in ihrem Speicher). Das ist gut, aber in beiden Fällen **kann das Unternehmen deine Inhalte trotzdem lesen** – es hält die Schlüssel. Ende-zu-Ende-Verschlüsselung ist stärker: Nur die Endpunkte halten die Schlüssel, also ist der Anbieter strukturell außerstande, deine Nachrichten zu lesen, selbst wenn er wollte, gehackt würde oder zur Herausgabe verpflichtet wäre.

| | Übertragungs-/Ruhezustand-Verschlüsselung | Ende-zu-Ende-Verschlüsselung |
| --- | --- | --- |
| Geschützt vor externen Schnüfflern | Ja | Ja |
| Lesbar durch den Diensteanbieter | **Ja** | **Nein** |
| Bei einem Daten-Leak des Anbieters offengelegt | Möglicherweise | Inhalt bleibt unlesbar |
| Auf richterliche Anordnung herausgegeben | Möglich | Anbieter hat nichts Lesbares zu geben |

## Wie es kurz gesagt funktioniert

E2EE nutzt dieselbe Public-Key-Idee, die hinter Passkeys und HTTPS steckt. Jeder Nutzer hat einen öffentlichen Schlüssel (frei geteilt) und einen privaten Schlüssel (nie geteilt). Um dir zu schreiben, verschlüsselt der Absender mit *deinem* öffentlichen Schlüssel; nur *dein* privater Schlüssel kann es entschlüsseln. Die Schlüssel liegen auf den Geräten, nicht auf dem Server – genau deshalb kann der Server die Inhalte nicht lesen. Gute Messenger ergänzen „Forward Secrecy" und rotieren Schlüssel, sodass selbst ein künftig kompromittierter Schlüssel vergangene Nachrichten nicht öffnen kann.

## Wo du darauf angewiesen bist

- **Messenger**: Manche Apps sind standardmäßig Ende-zu-Ende-verschlüsselt, andere nur in einem optionalen Modus oder gar nicht. Wenn Privatsphäre zählt, prüfe, welche.
- **Anrufe**: Viele Sprach-/Video-Apps bieten inzwischen E2EE.
- **Backups und Clouds**: eine subtile Lücke – ein Chat kann E2EE sein, sein *Cloud-Backup* aber nicht, was Nachrichten klammheimlich wieder lesbar macht. Prüfe die Backup-Einstellungen.
- **Das Web**: HTTPS ist Ende-zu-Ende zwischen deinem Browser und der Website (wobei die Website selbst, als Endpunkt, liest, was du ihr sendest).

## FAQ

**Wenn nicht einmal das Unternehmen es lesen kann, wer dann?**
Nur die Personen, die an jedem Ende die Geräte halten. Das heißt auch: *Geräte*-Sicherheit zählt – E2EE schützt Nachrichten unterwegs, nicht ein Handy, das jemand entsperrt. Und Metadaten (mit wem du gesprochen hast, wann) können sichtbar bleiben, selbst wenn der Inhalt es nicht ist.

**Hilft E2EE Kriminellen?**
Es ist dieselbe Verschlüsselung, die dein Online-Banking, deine Gesundheitsakten, Journalisten und ganz gewöhnliche private Gespräche schützt – ein Allzweckschutz. Der gängige Sicherheitskonsens lautet: Sie für alle zu schwächen (eine „Hintertür") macht alle unsicherer, denn eine Hintertür lässt sich nicht auf die „Guten" beschränken.

**Woran erkenne ich, dass eine App sie wirklich nutzt?**
Achte ausdrücklich auf „Ende-zu-Ende-verschlüsselt" (nicht nur „verschlüsselt"), bevorzuge Apps mit gut geprüften offenen Protokollen und prüfe, ob es standardmäßig aktiv ist oder nur in einem speziellen Modus.`,
  },
  {
    topicKey: 'public-wifi-safety',
    title: 'Ist öffentliches WLAN wirklich gefährlich?',
    question: 'Ist es sicher, öffentliches WLAN in Cafés und an Flughäfen zu nutzen, und was sollte ich meiden?',
    summary:
      'Öffentliches WLAN ist weit sicherer als früher, weil heute nahezu alle Websites HTTPS nutzen, das deine Daten unabhängig vom Netz verschlüsselt. Die echten verbleibenden Risiken sind gefälschte Hotspots und unverschlüsselte Verbindungen – mit ein paar Gewohnheiten beherrschbar.',
    tags: ['sicherheit', 'datenschutz', 'wlan', 'digitale sicherheit'],
    language: 'de',
    image: {
      prompt: promptOf('public-wifi-safety'),
      alt: 'Ein Laptop sendet vorab versiegelte Daten über öffentliches WLAN, daneben lauert ein gefälschter Hotspot',
    },
    sources: [
      { title: 'FTC – Sind öffentliche WLAN-Netze sicher?', url: 'https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-not-always' },
      { title: 'EFF – HTTPS und Surveillance Self-Defense', url: 'https://ssd.eff.org/module/what-should-i-know-about-encryption' },
    ],
    content: `# Ist öffentliches WLAN wirklich gefährlich?

Öffentliches WLAN hat einen furchterregenden Ruf, der größtenteils **veraltet** ist. Die alten Warnungen stammen aus einer Zeit, als Websites Daten im Klartext sendeten, sodass jeder im selben Café-Netz deine Passwörter aus der Luft „mitschneiden" konnte. Diese Zeit ist weitgehend vorbei: Heute nutzt die überwältigende Mehrheit der Websites **HTTPS**, das deine Verbindung Ende-zu-Ende zwischen deinem Browser und der Seite verschlüsselt – in jedem Netz, vertraut oder nicht. Das Schloss in deiner Adressleiste leistet den Großteil der Schutzarbeit, die die reißerischen Warnungen einem VPN zuschreiben.

## Warum HTTPS das Bild verändert hat

Wenn du dich mit einer HTTPS-Seite verbindest, wird dein Verkehr verschlüsselt, *bevor* er dein Gerät verlässt, sodass ein Schnüffler im selben WLAN nur verwürfelte Daten sieht und welche Seite du besuchst – nicht dein Passwort, deine Nachrichten oder deine Kartennummer. Da moderne Browser Nicht-HTTPS-Seiten nun als „Nicht sicher" kennzeichnen und der Großteil des Webs umgestiegen ist, ist der klassische „Passwort im Café gestohlen"-Angriff weit schwieriger als früher.

## Die verbleibenden Risiken

Öffentliches WLAN ist trotzdem nicht *ganz* risikofrei – die echten Bedrohungen haben sich verschoben:

| Risiko | Was es ist | Abwehr |
| --- | --- | --- |
| **Evil-Twin-Hotspot** | Ein gefälschtes Netz namens „Airport_Free_WiFi", betrieben von einem Angreifer | Den echten Netznamen bestätigen; unbekannten nicht automatisch beitreten |
| **Nicht-HTTPS-Seiten** | Die seltene Seite, die noch Daten im Klartext sendet | Auf die „Nicht sicher"-Warnung achten; dort keine Geheimnisse eingeben |
| **Schulterblick** | Jemand schaut schlicht auf deinen Bildschirm | Blickschutzfolie, Aufmerksamkeit |
| **Veraltetes Gerät** | Ungepatchte Lücken, in gemeinsam genutzten Netzen ausnutzbar | Betriebssystem und Apps aktuell halten |
| **Auto-Verbinden** | Handy tritt still einem bösartigen Netz mit bekanntem Namen bei | Auto-Beitritt für offene Netze ausschalten |

Das Hauptrisiko ist der **Evil Twin**: ein bösartiger Hotspot mit freundlichem Namen. Verbindest du dich mit ihm, kontrolliert der Angreifer deinen Netzwerkweg – aber selbst dann hält HTTPS deine verschlüsselten Sitzungen unlesbar; die Gefahr liegt vor allem in jeglichem Nicht-HTTPS-Verkehr und darin, auf gefälschte Login-Seiten gelockt zu werden.

## Vernünftige Gewohnheiten (ohne Paranoia)

- **Vertraue dem HTTPS-Schloss** und umgehe im öffentlichen WLAN nie eine Zertifikatswarnung – diese Warnung erscheint genau dann, wenn etwas nicht stimmt.
- **Prüfe den Netznamen** beim Personal, statt zu raten; sei misstrauisch bei offenen Netzen, die eine Marke nachahmen.
- **Schalte Auto-Verbinden** für offene Netze aus, damit deine Geräte nicht still wieder Nachahmungen beitreten.
- **Ein VPN fügt eine Schicht hinzu**, indem es selbst die Metadaten und jeglichen Nicht-HTTPS-Verkehr verschlüsselt – eine sinnvolle Ergänzung in unsicheren Netzen, aber dank HTTPS nicht die Notwendigkeit, die die Werbung suggeriert.
- **Halte Geräte aktuell**; die meisten verbleibenden Netzwerkangriffe zielen auf bekannte, längst gepatchte Lücken.

## FAQ

**Kann jemand mein Bankpasswort im Café-WLAN stehlen?**
Wenn deine Bank HTTPS nutzt (das tut sie) und du keine Zertifikatswarnung ignoriert oder auf eine gefälschte Login-Seite hereingefallen bist, sind deine Zugangsdaten auf der Leitung verschlüsselt. Die größere Gefahr ist Phishing, nicht das Mitschneiden.

**Brauche ich für öffentliches WLAN wirklich ein VPN?**
Es ist eine sinnvolle zusätzliche Schicht, aber HTTPS schützt den Inhalt deines Verkehrs bereits. Ein VPN hilft vor allem bei Nicht-HTTPS-Verkehr und dabei, vor dem lokalen Netz zu verbergen, welche Seiten du besuchst.

**Ist die mobile Datenverbindung meines Handys sicherer als öffentliches WLAN?**
Im Allgemeinen ja – Mobilfunk ist verschlüsselt und du teilst dir kein lokales Netz mit Fremden. Für sensible Aufgaben in einem unbekannten Netz ist der Wechsel auf mobile Daten eine einfache, solide Wahl.`,
  },
  {
    topicKey: 'online-tracking',
    title: 'Wie Online-Tracking funktioniert (Cookies, Pixel und Fingerprints)',
    question: 'Wie verfolgen mich Unternehmen quer durchs Web, und kann ich das wirklich stoppen?',
    summary:
      'Tracker verfolgen dich mit Cookies, unsichtbaren Tracking-Pixeln und Browser-Fingerprinting, um über Seiten hinweg ein Profil zu bauen. Unsichtbar wirst du nicht, aber ein paar Browser-Entscheidungen verringern drastisch, wie viel gesammelt wird.',
    tags: ['datenschutz', 'tracking', 'cookies', 'web'],
    language: 'de',
    image: {
      prompt: promptOf('online-tracking'),
      alt: 'Eine Gestalt hinterlässt Spuren, die Beobachter zusammensetzen, teils von einem Umhang zerstreut',
    },
    sources: [
      { title: 'EFF – Cover Your Tracks (Test auf Browser-Fingerprinting)', url: 'https://coveryourtracks.eff.org/' },
      { title: 'FTC – Deine Privatsphäre online schützen', url: 'https://consumer.ftc.gov/articles/protecting-your-privacy-online' },
    ],
    content: `# Wie Online-Tracking funktioniert (Cookies, Pixel und Fingerprints)

Das „kostenlose" Web wird größtenteils durch Werbung bezahlt, und zielgerichtete Werbung lebt davon, zu wissen, wer du bist und was du tust. Also existiert eine ganze Branche, die dich von Seite zu Seite verfolgt und deine Aktivität zu einem Profil zusammennäht. Sie arbeitet mit drei Haupttechniken, eine glitschiger als die andere – und sie zu verstehen ist es, was die Abwehrmaßnahmen einleuchten lässt.

## Die drei Haupttechniken

**1. Cookies.** Ein Cookie ist eine kleine Datei, die eine Seite in deinem Browser ablegt. *Erstanbieter*-Cookies sind meist harmlos und nützlich – sie halten dich eingeloggt und merken sich deinen Warenkorb. Das Tracking-Problem sind *Drittanbieter*-Cookies: Wenn viele verschiedene Seiten alle Inhalte desselben Werbenetzwerks einbinden, legt dieses Netzwerk ein Cookie ab, das es überall wiedererkennt, und sieht so, dass derselbe Browser erst Seite A, dann B, dann C besucht hat. Diese seitenübergreifende Spur ist der klassische Tracking-Mechanismus (und genau der, den Browser nun aktiv ausmustern).

**2. Tracking-Pixel.** Ein unsichtbares 1×1-Bild (oder ein Codeschnipsel), geladen vom Server eines Trackers. Allein das Laden – in einer Webseite *oder einer E-Mail* – verrät dem Tracker, dass du sie geöffnet hast, wann und Details über dein Gerät. So wissen Marketer, dass du ihre E-Mail geöffnet oder eine Seite besucht hast, ganz ohne Cookie.

**3. Browser-Fingerprinting.** Die hinterhältigste. Statt etwas auf deinem Gerät zu speichern, *misst* eine Seite die einzigartige Kombination der Merkmale deines Geräts – Bildschirmgröße, Schriftarten, Betriebssystem, Browserversion, Zeitzone, Grafik-Eigenheiten – die zusammen oft einzigartig genug sind, um dich wiederzuerkennen. Weil nichts gespeichert wird, löscht das Leeren der Cookies es nicht.

| Technik | Speichert etwas? | Durch Cookie-Löschen besiegt? |
| --- | --- | --- |
| Drittanbieter-Cookies | Ja | Ja |
| Tracking-Pixel | Nutzt Cookies/Server-Logs | Teilweise |
| Fingerprinting | Nein | **Nein** |

## Was Tracking tatsächlich verringert

Unsichtbar wirst du nicht, aber du kannst deine Angriffsfläche stark verkleinern:

- **Nutze einen datenschutzfreundlichen Browser oder aktiviere Tracking-Schutz** – moderne Browser blockieren Drittanbieter-Cookies und bekannte Tracker standardmäßig oder per Einstellung.
- **Füge einen seriösen Inhalts-/Werbeblocker hinzu** – blockt Tracker-Skripte und Pixel, bevor sie laden, was nebenbei Seiten beschleunigt.
- **Blockiere entfernte Bilder in E-Mails**, um Öffnungs-Tracking-Pixel auszuhebeln (die meisten Mail-Apps bieten das).
- **Wehre Fingerprinting ab** mit Browsern, die deinen Fingerabdruck vereinheitlichen oder zufällig verändern; dies ist das am schwersten zu stoppende Tracking, weshalb es wichtig ist, wer deinen Browser macht.
- **Verringere das Profil an der Quelle**: schränke die Werbepersonalisierung in deinen Kontoeinstellungen ein und gehe sparsam mit Logins um, die Aktivität an eine echte Identität binden.

## FAQ

**Schützen mich diese „Cookies akzeptieren"-Banner wirklich?**
Sie sind Einwilligungsabfragen (von Datenschutzgesetzen getrieben), kein Schutz. „Nicht-notwendige ablehnen" hilft, aber echte Reduktion kommt von Browser-Einstellungen und Blockern, nicht vom Klicken auf Banner.

**Stoppt der Privat-/Inkognito-Modus Tracking?**
Größtenteils nein. Er verhindert, dass *dein Browser* nach der Sitzung lokale Verlaufsdaten und Cookies speichert, aber Seiten, Tracker und dein Netzwerk können dich während der Sitzung weiterhin beobachten, und Fingerprinting funktioniert trotzdem.

**Ist Fingerprinting wirklich nicht zu stoppen?**
Nicht unmöglich, aber schwer – die Abwehr besteht darin, einen Browser zu nutzen, der bewusst alle Fingerabdrücke ähnlich aussehen lässt (damit deiner nicht heraussticht). Teste deinen eigenen bei EFF Cover Your Tracks.`,
  },
  {
    topicKey: 'data-breach-response',
    title: 'Was zu tun ist, wenn deine Daten in einem Leak stecken',
    question: 'Ein Unternehmen, das ich nutze, hatte ein Daten-Leak – was sollte ich tatsächlich tun?',
    summary:
      'Wenn ein Leak deine Daten offenlegt, hat das Eindämmen der Wiederverwendung Priorität: Ändere dieses Passwort überall, wo es genutzt wurde, schalte Zwei-Faktor ein und achte auf nachfolgendes Phishing. Was zu tun ist, hängt davon ab, was abfloss – ein Passwort, eine Karte oder deine Identitätsdaten.',
    tags: ['sicherheit', 'datenschutz', 'datenleck', 'digitale sicherheit'],
    language: 'de',
    image: {
      prompt: promptOf('data-breach-response'),
      alt: 'Ein kleines Tresorleck wird methodisch über benachbarte Tresore hinweg eingedämmt',
    },
    sources: [
      { title: 'FTC – Daten-Leak: was zu tun ist', url: 'https://www.identitytheft.gov/databreach' },
      { title: 'Have I Been Pwned – prüfen, ob deine Konten in Leaks auftauchten', url: 'https://haveibeenpwned.com/' },
    ],
    content: `# Was zu tun ist, wenn deine Daten in einem Leak stecken

Daten-Leaks sind heute Routine – wer seit Jahren das Internet nutzt, dessen Informationen sind mit ziemlicher Sicherheit schon in einem aufgetaucht. Das klingt alarmierend, aber die meisten Leaks lassen sich mit einer ruhigen, gezielten Reaktion überstehen. Der Schlüssel ist, deine Handlung daran auszurichten, **was tatsächlich abgeflossen ist**, denn ein geleaktes Passwort, eine geleakte Kartennummer und geleakte Identitätsdaten verlangen unterschiedliche Schritte. Panik und Untätigkeit sind die zwei Versagensmuster; eine kurze Checkliste schlägt beide.

## Zuerst: herausfinden, was offengelegt wurde

Leak-Benachrichtigungen (und Dienste, die sie verfolgen) nennen meist, welche Daten betroffen waren. Die Schweregrad-Leiter, grob:

| Was abfloss | Schweregrad | Warum |
| --- | --- | --- |
| Nur E-Mail-Adresse | Niedrig | Bedeutet meist mehr Spam/Phishing |
| Passwort (auch gehasht) | Hoch | Wiederverwendung gefährdet viele Konten |
| Zahlungskarte | Mittel | Banken machen Betrug rückgängig; Karten sind ersetzbar |
| Identitätsdaten (Ausweisnummern, Geburtsdatum, Adresse) | Hoch | Ermöglicht Identitätsdiebstahl; lässt sich nicht „zurücksetzen" |

## Die Reaktion, je nachdem was abfloss

**Wenn ein Passwort abfloss** (der häufigste dringende Fall):
1. **Ändere es sofort auf der betroffenen Seite.**
2. **Ändere es überall, wo du es wiederverwendet hast** – das ist die eigentliche Gefahr, denn Angreifer probieren dieses Paar aus E-Mail und Passwort bei Banken, Postfächern und Shops durch (Credential Stuffing). Ein Passwort-Manager macht das weit weniger mühsam und verhindert das nächste Mal.
3. **Schalte Zwei-Faktor-Authentifizierung** für dieses Konto und deine wichtigen Konten ein.

**Wenn eine Zahlungskarte abfloss:** behalte deine Abrechnungen im Blick, melde jede unbekannte Abbuchung (Banken machen Betrug in der Regel rückgängig) und lass die Bank die Karte bei Bedarf neu ausstellen. Das ist die am besten wiederherstellbare Art von Leak.

**Wenn Identitätsdaten abflossen** (das Schwierigste, da du dein Geburtsdatum nicht ändern kannst): erwäge dort, wo möglich, eine Kreditsperre / Betrugswarnung bei Auskunfteien, achte auf Konten, die in deinem Namen eröffnet werden, und sei besonders skeptisch bei Kontakten, die deine echten Daten anführen.

## Dann: für die zweite Welle wappnen

Das unterschätzte Folgerisiko ist **gezieltes Phishing**. Nach einem Leak wissen Kriminelle, welches Unternehmen du nutzt, und kennen einige deiner echten Daten, also schicken sie überzeugende „[Unternehmen]-Sicherheitswarnung – verifizieren Sie Ihr Konto"-Nachrichten. Rechne damit und wende die übliche Regel an: melde dich nie über einen Link in einer Nachricht an – geh direkt auf die Seite. Ein Leak macht dich eine Weile zum markierten Ziel.

## FAQ

**Wie erfahre ich überhaupt, dass ich in einem Leak bin?**
Unternehmen sind oft gesetzlich verpflichtet, dich zu benachrichtigen, aber es lohnt sich, einen seriösen Leak-Suchdienst (wie Have I Been Pwned) für deine E-Mail zu prüfen und die Leak-Warnungen deines Passwort-Managers zu aktivieren.

**Das Leak war vor Jahren – muss ich trotzdem handeln?**
Wenn du dieses Passwort seitdem einzigartig gemacht und 2FA eingeschaltet hast, bist du weitgehend abgedeckt. Wenn du dieses Passwort *noch* irgendwo wiederverwendest, ändere es jetzt – alte geleakte Passwörter werden jahrelang durchprobiert.

**Sollte ich für Identitätsschutz-Dienste zahlen?**
Oft sind die zentralen Schutzmaßnahmen (Kreditsperre, eigene Abrechnungen prüfen, einzigartige Passwörter + 2FA) kostenlos und erledigen den Großteil der Arbeit. Bezahldienste können Komfort hinzufügen, ersetzen aber nicht die Grundlagen.`,
  },
];
