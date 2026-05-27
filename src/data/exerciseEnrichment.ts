import type { PracticeTask, ProseEducationFloor } from '@/types/education'

export interface ExerciseEnrichment {
  sections?: Array<{
    id: string
    title: string
    html: string
    practice?: PracticeTask
    figureId?: string
  }>
  sectionPractice?: Record<string, PracticeTask>
}

export const exerciseEnrichment: Record<string, ExerciseEnrichment> = {
  index: {
    sections: [
      {
        id: 'pomodoro',
        title: 'Pomodoro-Technik',
        html: '<p>25 Minuten fokussiert arbeiten, 5 Minuten Pause — nach 4 Zyklen eine längere Pause.</p>',
        practice: {
          prompt: 'Plane deine nächste Lern-Session: Thema, Dauer, konkretes Ziel.',
          solution: 'Beispiel: 25 min — SQL SELECT mit WHERE üben, 3 Aufgaben lösen.',
        },
      },
    ],
  },
  buecheranzeige: {
    sections: [
      {
        id: 'sql-select',
        title: 'Aufgabe: Bücher anzeigen',
        html: '<p>Erstelle eine Abfrage, die alle Bücher aus der Tabelle <code>books</code> anzeigt, sortiert nach Titel.</p>',
        figureId: 'db-relation',
        practice: {
          prompt: 'Schreibe das SQL-Statement für alle Spalten, sortiert nach <code>title</code>.',
          solution: '`SELECT * FROM books ORDER BY title;`',
        },
      },
    ],
  },
  buechererfassung: {
    sections: [
      {
        id: 'sql-insert',
        title: 'Aufgabe: Buch erfassen',
        html: '<p>Füge ein neues Buch ein: Titel „Datenbanken“, Preis 29,90 €.</p>',
        figureId: 'db-relation',
        practice: {
          prompt: 'Schreibe ein <code>INSERT</code> (Tabelle <code>books(title, price)</code>).',
          solution:
            '`INSERT INTO books (title, price) VALUES (\'Datenbanken\', 29.90);`',
        },
      },
    ],
  },
  pdotest: {
    sections: [
      {
        id: 'pdo-aufgabe',
        title: 'PDO — Verbindung & Abfrage',
        html: '<p>Verbinde dich per PDO mit MySQL und führe ein prepared Statement mit Platzhalter aus.</p>',
        practice: {
          prompt: 'Warum sind Prepared Statements sicherer als String-Konkatenation?',
          solution:
            'Parameter werden getrennt vom SQL übergeben — Schutz vor SQL-Injection.',
        },
      },
    ],
  },
  'exer-11': {
    sections: [
      {
        id: 'php-io',
        title: 'PHP Input / Output',
        html: '<p>Übung zu Formularen: Daten mit <code>$_POST</code> lesen, validieren und ausgeben.</p>',
        practice: {
          prompt: 'Welche Superglobale enthält POST-Daten eines Formulars?',
          solution: '`$_POST` — assoziatives Array der gesendeten Felder.',
        },
      },
    ],
  },
  galerie: {
    sections: [
      {
        id: 'upload-konzept',
        title: 'Galerie — Upload',
        html: '<p>Datei-Upload: Typ prüfen, Größe begrenzen, sicheren Dateinamen speichern.</p>',
        practice: {
          prompt: 'Nenne zwei Checks vor dem Speichern einer Bilddatei.',
          solution: 'MIME/Extension prüfen, Maximalgröße, Zielpfad außerhalb Webroot wenn nötig.',
        },
      },
    ],
  },
  'galerie-upload': {
    sectionPractice: {
      'upload-form': {
        prompt: 'Was macht das Attribut <code>enctype="multipart/form-data"</code>?',
        solution: 'Ermöglicht Upload von Binärdateien im HTML-Formular.',
      },
    },
  },
  'news-test': {
    sections: [
      {
        id: 'news-crud',
        title: 'News — Datenbank',
        html: '<p>CRUD für Newseinträge: anlegen, lesen, aktualisieren, löschen.</p>',
        figureId: 'db-relation',
        practice: {
          prompt: 'Schreibe SQL: alle News der letzten 7 Tage (Spalte <code>created_at</code>).',
          solution:
            '`SELECT * FROM news WHERE created_at &gt;= DATE_SUB(NOW(), INTERVAL 7 DAY);`',
        },
      },
    ],
  },
}

export function enrichExercise(
  data: ProseEducationFloor,
  slug: string
): ProseEducationFloor {
  const config = exerciseEnrichment[slug]
  if (!config) return data

  let sections = [...data.sections]

  if (config.sections && sections.length === 0) {
    sections = config.sections
  } else if (config.sections) {
    for (const s of config.sections) {
      if (!sections.some((x) => x.id === s.id)) sections.push(s)
    }
  }

  if (config.sectionPractice) {
    sections = sections.map((s) => ({
      ...s,
      practice: config.sectionPractice![s.id] ?? s.practice,
    }))
  }

  return { ...data, sections }
}
