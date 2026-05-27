export type ExerciseFeature = 'none' | 'crud'

export interface ExerciseCatalogItem {
  slug: string
  title: string
  description: string
  source: 'portfolio' | 'own_website'
  /** Pfad ohne .php, z. B. exer/nettoBrutto */
  legacyRoute: string
  feature: ExerciseFeature
}

function pf(
  slug: string,
  legacyRoute: string,
  title: string,
  description = title,
  feature: ExerciseFeature = 'none'
): ExerciseCatalogItem {
  return { slug, title, description, source: 'portfolio', legacyRoute, feature }
}

function ow(
  slug: string,
  legacyRoute: string,
  title: string,
  description = title,
  feature: ExerciseFeature = 'none'
): ExerciseCatalogItem {
  return { slug, title, description, source: 'own_website', legacyRoute, feature }
}

/** Alle importierbaren Übungsseiten — Portfolio zuerst, Website nur wo kein Duplikat. */
export const exerciseCatalog: ExerciseCatalogItem[] = [
  pf('index', 'exer/index', 'Übungen — Übersicht', 'Pomodoro-Timer und Linkliste'),
  pf('netto-brutto', 'exer/nettoBrutto', 'Netto-/Bruttorechner'),
  pf('asso-array', 'exer/assoArray', 'Assoziatives Array'),
  pf('elementeanzahl', 'exer/elementeanzahl', 'Anzahl Elemente (FOR vs. FOREACH)'),
  pf('erase', 'exer/erase', 'Erase'),
  pf('json-uebungen', 'exer/exer/index', 'JSON, SOAP, XML und CSV'),
  pf('multiplikationsfunktion', 'exer/multiplikationsfunktion', 'Multiplikation'),
  pf('multiplikation-umleitung', 'exer/multiplikationstabelleumleiten', 'Multiplikationstabelle (Umleitung)'),
  pf('multiplikation', 'exer/exer_19/index', 'Multiplikationstabelle'),
  pf('oop', 'exer/OOP', 'Klasse Person / Wohnort (OOP)'),
  pf('menue', 'exer/menue', 'Auswahl der Lieblingsspeise'),
  pf('pdotest', 'exer/pdotest', 'PDO Test — Bücher-Tabelle', 'Datenbankzugriff mit PDO', 'crud'),
  pf('buecheranzeige', 'exer/buecheranzeige', 'Bücheranzeige', 'Datenbank: Bücher anzeigen', 'crud'),
  pf('buechererfassung', 'exer/buechererfassung', 'Büchererfassung', 'Datenbank: Bücher erfassen', 'crud'),
  pf('testentity', 'exer/testentity', 'Entity'),
  pf('galerie', 'exer/galerie/index', 'Bildergalerie', 'Galerie anzeigen', 'crud'),
  pf('galerie-upload', 'exer/galerie/upload', 'Galerie Upload', 'Bilder hochladen', 'crud'),
  pf('galerie-sql', 'exer/galerie/SQL-Anweisungen', 'Galerie DB Setup', 'Tabellen Besucher, Bilder, Bewertungen', 'crud'),
  pf('galerie-reset', 'exer/galerie/reset', 'Galerie Reset', 'Galerie zurücksetzen', 'crud'),
  pf('news-test', 'exer/news/test', 'News Test', 'Newsdatenbank Test', 'crud'),
  pf('news-newdb', 'exer/news/newdb', 'News DB anlegen', 'Newsdatenbank erstellen', 'crud'),
  pf('news-sql', 'exer/news/sql', 'News SQL Reset', 'SQL-Anweisungen (Reset!)', 'crud'),
  pf('news-kategorien', 'exer/news/kategorien', 'News Kategorien', 'Kategorien verwalten', 'crud'),
  pf('news-ereignisse', 'exer/news/ereignisse', 'News Ereignisse', 'Ereignisse verwalten', 'crud'),
  pf('news-bilder', 'exer/news/bilder', 'News Bilder', 'Bilder verwalten', 'crud'),
  ...([11, 12, 13, 14, 15, 16, 17, 18] as const).map((n) =>
    pf(`exer-${n}`, `exer/exer_${n}/index`, `Übung ${n}`)
  ),
  // Website-only (kein Portfolio-Duplikat oder nur dort)
  ow('farbcode', 'exercise/farbcode', 'Farbtabelle'),
  ow('fileupload', 'exercise/fileupload', 'Fileupload', 'Datei hochladen', 'crud'),
  ow('getpostrequest', 'exercise/getpostrequest', 'GET / POST Request'),
  ow('nutzerprofil', 'exercise/nutzerprofil', 'Nutzerprofil', 'Profil in Textdatei speichern'),
  ow('obstgemuese', 'exercise/obstgemuese', 'Obst / Gemüse'),
  ow('obstgemuese-abfr', 'exercise/obstgemuese_abfr', 'Obst / Gemüse Abfrage'),
  ow('phpinfo', 'exercise/phpinfo', 'PHPInfo'),
  ow('server', 'exercise/server', 'Server'),
  ow('multiplikationstabelle-ow', 'exercise/multiplikationstabelle', 'Multiplikationstabelle (Website)'),
]

export function getExercise(slug: string): ExerciseCatalogItem | undefined {
  return exerciseCatalog.find((e) => e.slug === slug)
}

/** Legacy exer/buecheranzeige → Slug */
export function legacyExerciseToSlug(
  source: 'portfolio' | 'own_website',
  route: string
): string | undefined {
  const item = exerciseCatalog.find((e) => e.source === source && e.legacyRoute === route)
  return item?.slug
}

/** Für extract/import als LegacyRoute-ähnliche Objekte */
export function exerciseCatalogAsLegacyRoutes() {
  return exerciseCatalog.map((ex) => ({
    id: `ex-${ex.source}-${ex.slug}`,
    source: ex.source,
    route: ex.legacyRoute,
    sourcePath: `l:/repos/${ex.source === 'portfolio' ? 'portfolio' : 'own_website'}/${ex.legacyRoute}.php`,
    title: ex.title,
    feature: ex.feature,
  }))
}

/** @deprecated Alias */
export const portfolioExercises = exerciseCatalog
