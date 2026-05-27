import type { PracticeTask } from '@/types/education'
import type { EducationSubEntry } from '@/types/education'
import { fixZinsFormelTex, splitLegacyEducationFields } from '@/lib/splitLegacyEducationFields'

/** Korrekturen & Ergänzungen für Mathe 1. Stock (unabhängig vom Re-Import). */
export const MATH_1_HIDDEN_ENTRY_IDS = new Set([
  'test',
  'col15Content',
  'col16Content',
  'col17Content',
  'col18Content',
  'col21Content',
  'col22Content',
  'col23Content',
  'col24Content',
  'col37Content',
  'col38Content',
  'col39Content',
  'col40Content',
])

export const MATH_1_SECTION_INTROS: Record<string, string> = {
  Dreisatz:
    '<p>Grundformel: `a/b = c/x` — umstellen: `x = (c * b) / a`</p><p>Proportional: Größen wachsen gemeinsam. Antiproportional: die eine wächst, die andere sinkt.</p>',
  Zinsrechnung:
    '<p><strong>Merke:</strong> Kapital = K, Zinssatz = p, Zinsen = Z. Deutsche Banken: Jahr = 360 Tage, Monat = 30 Tage.</p>',
}

export const MATH_1_ENTRY_PATCHES: Record<
  string,
  {
    subtitle?: string
    formula?: string
    supplement?: string
    question?: string
    calculation?: string
    answer?: string
    description?: string
    practice?: PracticeTask
  }
> = {
  rechteck: {
    formula: '`A = a * b`<br>`U = 2a + 2b`',
  },
  'glseit-dreieck': {
    formula:
      '`h = a * sqrt(3) / 2`<br>`A = a * h / 2 = a^2 * sqrt(3) / 4`<br>`U = 3a`',
  },
  kreis: {
    formula:
      '`r = d/2` bzw. `d = 2 * r`<br>`U = 2 * pi * r = pi * d`<br>`A = pi * r^2` oder `A = pi * d^2 / 4`',
  },
  kreisring: {
    subtitle: 'Kreisring',
    formula:
      'Äußerer Radius `R`, innerer Radius `r` (`R &gt; r`):<br>`A = pi * (R^2 - r^2)`',
  },
  kreisausschnitt: {
    subtitle: 'Kreisausschnitt (Sektor)',
    formula:
      'Bogenlänge `b`: `b = r * pi * alpha / 180°`<br>`A = r^2 * pi * alpha / 360°`<br>Alternativ: `A = b * r / 2`',
  },
  quadrat: {
    question: 'Wie groß ist der Flächeninhalt eines Quadrats mit der Seitenlänge `a = 4 m`?',
    calculation: '<pre>a · a = a²\n4 m · 4 m = 16 m²</pre>',
    answer: 'Die Fläche beträgt 16 m².',
  },
  anfangskapital: {
    calculation:
      '<pre>K_a = K_v / (1 + p / 100)^n\nK_a = 8000 Euro / (1,03)^4\nK_a = 8000 Euro / 1,1255\nK_a ≈ 7107,90 Euro</pre>',
  },
  /** Nur Formel-Karten ohne Legacy-Beispiel — echte Zusatzübungen */
  zinssatz: {
    practice: {
      prompt:
        'Nach einem Jahr sind auf einem Konto 50 € Zinsen bei 1000 € Kapital angefallen. Wie hoch war der Zinssatz `p`?',
      solution: '`p = Z * 100 / K = 50 * 100 / 1000 = 5%`.',
    },
  },
  kapital: {
    practice: {
      prompt:
        'Welches Kapital `K` ergibt bei 8 % und 200 € Zinsen nach einem Jahr?',
      solution: '`K = Z * 100 / p = 200 * 100 / 8 = 2500 Euro`.',
    },
  },
  zeit: {
    practice: {
      prompt:
        '120 € Zinsen bei K = 9000 € und p = 4 % — wie viele Monate `m`?',
      solution: '`m = Z * 1200 / (K * p) = 120 * 1200 / (9000 * 4) = 4 Monate`.',
    },
  },
}

export const MATH_1_PROSE_HTML_PATCHES: Record<string, string> = {
  rechteck: '`A = a * b`<br>`U = 2a + 2b`',
  'glseit-dreieck': '`h = a * sqrt(3) / 2`<br>`A = a * h / 2`<br>`U = 3a`',
  kreis:
    '`r = d/2` bzw. `d = 2 * r`<br>`U = 2 * pi * r = pi * d`<br>`A = pi * r^2`',
  kreisring: 'Kreisring (`R` außen, `r` innen): `A = pi * (R^2 - r^2)`',
  kreisausschnitt:
    'Sektor: `b = r * pi * alpha / 180°`, `A = r^2 * pi * alpha / 360°`',
}

export function patchMath1Entry(entry: EducationSubEntry): EducationSubEntry {
  let next = splitLegacyEducationFields({ ...entry })

  if (next.id === 'pzahlen' && next.description) {
    next.description = next.description
      .replace(/2; 3; 5; 7; 9; 11/, '2; 3; 5; 7; 11')
      .replace(
        /= alle Zahlen, die nur durch sich selbst teilbar sind/,
        '= alle Zahlen &gt; 1, die nur durch 1 und sich selbst teilbar sind'
      )
  }

  if (next.formula) {
    next = { ...next, formula: fixZinsFormelTex(next.formula) }
  }
  if (next.calculation) {
    next = { ...next, calculation: fixZinsFormelTex(next.calculation) }
  }

  const patch = MATH_1_ENTRY_PATCHES[next.id]
  if (!patch) return next

  const merged = { ...next, ...patch }
  if (patch.formula && next.question) {
    merged.formula = patch.formula
    merged.question = next.question
    merged.calculation = next.calculation ?? patch.calculation
    merged.answer = next.answer ?? patch.answer
  }
  return merged
}
