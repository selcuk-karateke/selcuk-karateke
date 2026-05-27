import type { FloorEnrichmentConfig } from '@/data/educationEnrichment/types'

function vocabTable(rows: ReadonlyArray<readonly [en: string, de: string]>): string {
  const body = rows
    .map(
      ([en, de]) =>
        `<tr><td class="border theme-border p-2 align-top"><strong>${en}</strong></td><td class="border theme-border p-2">${de}</td></tr>`,
    )
    .join('')
  return `<table class="w-full text-sm border-collapse border theme-border"><thead><tr><th class="border theme-border p-2 text-left">Englisch</th><th class="border theme-border p-2 text-left">Deutsch</th></tr></thead><tbody>${body}</tbody></table>`
}

const itBasics: ReadonlyArray<readonly [string, string]> = [
  ['computer', 'der Computer'],
  ['hardware', 'die Hardware'],
  ['software', 'die Software'],
  ['application', 'die Anwendung / Applikation'],
  ['operating system (OS)', 'das Betriebssystem'],
  ['user', 'der Benutzer / die Benutzerin'],
  ['interface', 'die Schnittstelle / Benutzeroberfläche'],
  ['file', 'die Datei'],
  ['folder / directory', 'der Ordner / das Verzeichnis'],
  ['database', 'die Datenbank'],
  ['backup', 'die Sicherung / Backup'],
  ['update', 'das Update / Aktualisierung'],
  ['error', 'der Fehler'],
  ['debugging', 'das Debuggen / Fehlersuche'],
]

const itDevelopment: ReadonlyArray<readonly [string, string]> = [
  ['algorithm', 'der Algorithmus'],
  ['variable', 'die Variable'],
  ['function', 'die Funktion'],
  ['array', 'das Array / die Datenfeldgruppe'],
  ['loop', 'die Schleife'],
  ['condition', 'die Bedingung'],
  ['compiler', 'der Compiler'],
  ['interpreter', 'der Interpreter'],
  ['source code', 'der Quellcode'],
  ['object', 'das Objekt'],
  ['class', 'die Klasse'],
  ['inheritance', 'die Vererbung'],
  ['request', 'die Anfrage / anfordern'],
  ['response', 'die Antwort'],
  ['deploy', 'bereitstellen / ausrollen'],
  ['maintainability', 'die Wartbarkeit'],
  ['reusability', 'die Wiederverwendbarkeit'],
]

const itNetwork: ReadonlyArray<readonly [string, string]> = [
  ['network', 'das Netzwerk'],
  ['server', 'der Server'],
  ['client', 'der Client'],
  ['protocol', 'das Protokoll'],
  ['IP address', 'die IP-Adresse'],
  ['firewall', 'die Firewall'],
  ['cloud', 'die Cloud'],
  ['access violation', 'die Zugriffsverletzung'],
  ['memory consumption', 'der Speicherverbrauch'],
  ['monitoring', 'die Überwachung'],
  ['constraint', 'die Einschränkung / Bedingung'],
  ['predefined', 'vordefiniert'],
  ['fetch / retrieve', 'abrufen / holen'],
  ['password', 'das Passwort'],
  ['authentication', 'die Authentifizierung'],
]

export const vocab2ndFloorEnrichment: FloorEnrichmentConfig = {
  hiddenSectionIds: ['col1'],
  insertSections: [
    {
      beforeSectionId: 'col1',
      section: {
        id: 'vokabel-lernen',
        title: 'Vokabeln lernen',
        html: '<p>Karteikarten, laut vorlesen, kurze Beispielsätze bilden und regelmäßig wiederholen. IT-Begriffe im Kontext eines Satzes merken — nicht nur isoliert.</p>',
        practice: {
          prompt: 'Bilde einen Satz mit <strong>deploy</strong> (Software bereitstellen).',
          solution: '<em>We deploy the application to the server every Friday.</em>',
        },
      },
    },
    {
      beforeSectionId: 'col1',
      section: {
        id: 'it-vocab-basics',
        title: 'IT — Grundlagen',
        html: vocabTable(itBasics),
        practice: {
          prompt: 'Wie heißt <strong>database</strong> auf Deutsch?',
          solution: 'die Datenbank',
        },
      },
    },
    {
      beforeSectionId: 'col1',
      section: {
        id: 'it-vocab-development',
        title: 'IT — Programmierung & Entwicklung',
        html: vocabTable(itDevelopment),
        practice: {
          prompt: 'Was bedeutet <strong>inheritance</strong> in der OOP?',
          solution: 'die Vererbung — Eigenschaften einer Klasse werden an eine andere weitergegeben.',
        },
      },
    },
    {
      beforeSectionId: 'col1',
      section: {
        id: 'it-vocab-network',
        title: 'IT — Netzwerk & Sicherheit',
        html: vocabTable(itNetwork),
        practice: {
          prompt: 'Übersetze: <strong>The firewall blocks unauthorized access.</strong>',
          solution: 'Die Firewall blockiert unbefugten Zugriff.',
        },
      },
    },
  ],
}
