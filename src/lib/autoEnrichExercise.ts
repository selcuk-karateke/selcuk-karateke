import type { PracticeTask, ProseEducationFloor } from '@/types/education'

function autoPractice(slug: string, title: string): PracticeTask {
  return {
    prompt: `Übung zu „${title}“: Wende das Gelernte praktisch an oder notiere die wichtigsten Schritte.`,
    solution: `Lösungsskizze für „${title}“ — siehe Abschnittstext und interaktive Demo auf dieser Seite.`,
  }
}

export function applyAutoExerciseEnrichment(
  data: ProseEducationFloor,
  slug: string
): ProseEducationFloor {
  const dbSlug = /buch|pdo|news|sql/i.test(slug)
  let sections = data.sections.map((s) => ({
    ...s,
    practice: s.practice ?? autoPractice(slug, s.title),
    figureId: s.figureId ?? (dbSlug ? 'db-relation' : undefined),
  }))

  if (sections.length === 0) {
    sections = [
      {
        id: 'uebung-einstieg',
        title: 'Aufgabe',
        html: '<p>Bearbeite die praktische Aufgabe zu dieser Übung. Nutze ggf. die interaktive Demo unten.</p>',
        practice: autoPractice(slug, 'Praktische Übung'),
        figureId: dbSlug ? 'db-relation' : undefined,
      },
    ]
  }

  return { ...data, sections }
}
