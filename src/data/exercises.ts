export interface ExercisePage {
  slug: string
  title: string
  description: string
  legacyRoute: string
  feature: 'none' | 'crud'
}

export const portfolioExercises: ExercisePage[] = [
  {
    slug: 'index',
    title: 'Übungen — Übersicht',
    description: 'Pomodoro-Timer, Links zu allen Übungsseiten',
    legacyRoute: 'exer/index',
    feature: 'none',
  },
  {
    slug: 'buecheranzeige',
    title: 'Bücheranzeige',
    description: 'Datenbank: Bücher anzeigen',
    legacyRoute: 'exer/buecheranzeige',
    feature: 'crud',
  },
  {
    slug: 'buechererfassung',
    title: 'Büchererfassung',
    description: 'Datenbank: Bücher erfassen',
    legacyRoute: 'exer/buechererfassung',
    feature: 'crud',
  },
  {
    slug: 'pdotest',
    title: 'PDO Test',
    description: 'Datenbankzugriff mit PDO',
    legacyRoute: 'exer/pdotest',
    feature: 'crud',
  },
  {
    slug: 'exer-11',
    title: 'Übung 11',
    description: 'Übungssammlung 11',
    legacyRoute: 'exer/exer_11/index',
    feature: 'crud',
  },
  {
    slug: 'galerie',
    title: 'Bildergalerie',
    description: 'Galerie mit Upload',
    legacyRoute: 'exer/galerie/index',
    feature: 'crud',
  },
  {
    slug: 'galerie-upload',
    title: 'Galerie Upload',
    description: 'Bilder hochladen',
    legacyRoute: 'exer/galerie/upload',
    feature: 'crud',
  },
  {
    slug: 'news-test',
    title: 'News Test',
    description: 'Newsdatenbank Test',
    legacyRoute: 'exer/news/test',
    feature: 'crud',
  },
]

export function getExercise(slug: string) {
  return portfolioExercises.find((e) => e.slug === slug)
}
