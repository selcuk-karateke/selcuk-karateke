import type { PracticeTask } from '@/types/education'

/** Korrekturen & Ergänzungen für Mathe 1. Stock (unabhängig vom Re-Import). */
export const MATH_1_HIDDEN_ENTRY_IDS = new Set(['test'])

export const MATH_1_SECTION_INTROS: Record<string, string> = {
  Dreisatz:
    '<p>Grundformel: `a/b = c/x` — umstellen: `x = (c * b) / a`</p><p>Proportional: Größen wachsen gemeinsam. Antiproportional: die eine wächst, die andere sinkt.</p>',
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
  pzahlen: {
    practice: {
      prompt: 'Ist 91 eine Primzahl? Begründe kurz.',
      hint: 'Teile durch kleine Primzahlen (7, 11, 13 …).',
      solution:
        'Nein: `91 = 7 * 13` — also keine Primzahl.',
    },
  },
  quadrat: {
    question: 'Wie groß ist der Flächeninhalt eines Quadrats mit der Seitenlänge `a = 4 m`?',
    calculation:
      '<pre>a · a = a²\n4 m · 4 m = 16 m²</pre>',
    answer: 'Die Fläche beträgt 16 m².',
    practice: {
      prompt:
        'Ein Quadrat hat die Diagonale `d = 5 m`. Wie lang ist die Seite `a` und wie groß ist die Fläche?',
      solution:
        'Pythagoras: `a = d / sqrt(2) ≈ 3,54 m`. Fläche: `A = a² ≈ 12,5 m²`.',
    },
  },
  rechteck: {
    formula: '`A = a * b`<br>`U = 2a + 2b`',
    question:
      'Ein Rechteck ist `6 m` lang und `2,5 m` breit. Berechne Fläche und Umfang.',
    calculation: '<pre>A = 6 · 2,5 = 15 m²\nU = 2·6 + 2·2,5 = 17 m</pre>',
    answer: 'A = 15 m², U = 17 m.',
    practice: {
      prompt: 'Fläche 24 m², eine Seite `a = 6 m`. Wie lang ist `b`?',
      solution: '`b = A / a = 24 / 6 = 4 m`.',
    },
  },
  parallelogramm: {
    practice: {
      prompt:
        'Parallelogramm: Grundseite `g = 8 cm`, Höhe `h = 5 cm`. Berechne `A`.',
      solution: '`A = g · h = 8 · 5 = 40 cm²`.',
    },
  },
  dreieck: {
    practice: {
      prompt: 'Dreieck: `c = 10 cm`, Höhe `h_c = 4 cm`. Berechne die Fläche.',
      solution: '`A = 1/2 · c · h_c = 0,5 · 10 · 4 = 20 cm²`.',
    },
  },
  'glschenk-dreieck': {
    practice: {
      prompt: 'Gleichschenklig: `a = 6 cm`, `s = 5 cm`. Berechne `h` und `A`.',
      solution:
        '`h = sqrt(s² - (a/2)²) = sqrt(25 - 9) = 4 cm`. `A = a·h/2 = 12 cm²`.',
    },
  },
  'glseit-dreieck': {
    formula:
      '`h = a * sqrt(3) / 2`<br>`A = a * h / 2 = a² * sqrt(3) / 4`<br>`U = 3a`',
    practice: {
      prompt: 'Gleichseitiges Dreieck, Seite `a = 4 cm`. Berechne `h` und `A`.',
      solution:
        '`h = 4 * sqrt(3) / 2 ≈ 3,46 cm`. `A ≈ 6,93 cm²`.',
    },
  },
  trapez: {
    practice: {
      prompt:
        'Trapez: Parallelseiten `a = 5 m`, `c = 9 m`, Höhe `h = 4 m`. Berechne `A`.',
      solution: '`A = (a + c) · h / 2 = 14 · 4 / 2 = 28 m²`.',
    },
  },
  'glschenk-trapez': {
    practice: {
      prompt:
        'Gleichschenkliges Trapez: `a = 4 m`, `c = 10 m`, `h = 3 m`. Berechne `A` und die Schenkel `b`.',
      solution:
        '`A = (4 + 10) · 3 / 2 = 21 m²`. `b = sqrt(h² + ((a-c)/2)²) = sqrt(9 + 9) ≈ 4,24 m`.',
    },
  },
  kreis: {
    formula:
      '`r = d/2` bzw. `d = 2 * r`<br>`U = 2 * pi * r = pi * d`<br>`A = pi * r^2` oder `A = pi * d^2 / 4`',
    practice: {
      prompt: 'Kreis mit Radius `r = 3 m`. Berechne Umfang und Fläche (`pi ≈ 3,14`).',
      solution: '`U ≈ 18,84 m`, `A ≈ 28,26 m²`.',
    },
  },
  kreisring: {
    subtitle: 'Kreisring',
    formula:
      'Äußerer Radius `R`, innerer Radius `r` (`R &gt; r`):<br>`A = pi * (R^2 - r^2)`',
    practice: {
      prompt:
        'Kreisring: `R = 5 cm`, `r = 3 cm`. Berechne die ringförmige Fläche (`pi ≈ 3,14`).',
      solution: '`A = pi * (25 - 9) = pi * 16 ≈ 50,27 cm²`.',
    },
  },
  kreisausschnitt: {
    subtitle: 'Kreisausschnitt (Sektor)',
    formula:
      'Bogenlänge `b` (auch `s`): `b = r * pi * alpha / 180°`<br>`A = r^2 * pi * alpha / 360°`<br>Alternativ: `A = b * r / 2`',
    practice: {
      prompt:
        'Sektor: `r = 6 cm`, Zentriwinkel `alpha = 60°`. Berechne `A` (`pi ≈ 3,14`).',
      solution: '`A = 36 * pi * 60 / 360 = 6 * pi ≈ 18,85 cm²`.',
    },
  },
  proportional: {
    practice: {
      prompt:
        '5 kg Äpfel kosten 8,50 €. Wie viel kosten 12 kg (proportional)?',
      solution: '`x = 8,50 * 12 / 5 = 20,40 €`.',
    },
  },
  antiproportional: {
    practice: {
      prompt:
        '4 Maschinen fertigen ein Werkstück in 9 Stunden. Wie lange brauchen 6 Maschinen?',
      solution: '`t = 9 * 4 / 6 = 6 Stunden`.',
    },
  },
  'grund-prozentwert': {
    practice: {
      prompt: 'Grundwert `G = 200`, Prozentsatz `p = 15%`. Berechne den Prozentwert `W`.',
      solution: '`W = p * G / 100 = 15 * 200 / 100 = 30`.',
    },
  },
  prozentsatz: {
    practice: {
      prompt:
        'Preis steigt von 80 € auf 92 €. Wie viel Prozent Erhöhung?',
      solution: '`W = 12`, `p = 100 * 12 / 80 = 15%`.',
    },
  },
  jahreszins: {
    formula: '<p>`Z = K * p / 100`</p>',
  },
  monatszins: {
    formula: '<p>`Z = K * p * m / (100 * 12)`</p>',
  },
  tageszins: {
    formula: '<p>`Z = K * p * t / (100 * 360)`</p>',
  },
  'zz-zinssatz': {
    formula: '<p>`p = 100 * (root(n)((K_(VERZINST) / K_(ANFANG))) - 1)`</p>',
  },
  anfangskapital: {
    calculation:
      '<pre>K_a = K_v / (1 + p / 100)^n\nK_a = 8000 Euro / (1,03)^4\nK_a = 8000 Euro / 1,1255\nK_a ≈ 7107,90 Euro</pre>',
  },
  endkapital: {
    practice: {
      prompt:
        'Kapital `K = 1000 €`, Zinssatz `p = 3%`, Laufzeit `n = 2 Jahre`. Endkapital?',
      solution: '`K_(VERZINST) = 1000 * (1,03)^2 ≈ 1060,90 €`.',
    },
  },
}

export const MATH_1_PROSE_HTML_PATCHES: Record<string, string> = {
  rechteck: '`A = a * b`<br>`U = 2a + 2b`',
  'glseit-dreieck':
    '`h = a * sqrt(3) / 2`<br>`A = a * h / 2`<br>`U = 3a`',
  kreis:
    '`r = d/2` bzw. `d = 2 * r`<br>`U = 2 * pi * r = pi * d`<br>`A = pi * r^2` oder `A = pi * d^2 / 4`',
  kreisring:
    'Kreisring (`R` außen, `r` innen): `A = pi * (R^2 - r^2)`',
  kreisausschnitt:
    'Sektor: `b = r * pi * alpha / 180°`, `A = r^2 * pi * alpha / 360°`, alternativ `A = b * r / 2`',
}

export const MATH_1_PROSE_PRACTICE: Record<string, PracticeTask> = {
  'dreisatz-grund': {
    prompt:
      'Mit 3 Arbeitern dauert eine Aufgabe 8 h. Wie lange brauchen 6 Arbeiter (antiproportional)?',
    solution: '`t = 8 * 3 / 6 = 4 Stunden`.',
  },
  quadrat: MATH_1_ENTRY_PATCHES.quadrat.practice!,
  rechteck: MATH_1_ENTRY_PATCHES.rechteck.practice!,
  kreis: MATH_1_ENTRY_PATCHES.kreis.practice!,
}
