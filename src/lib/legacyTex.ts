/**
 * Wandelt Pseudo-TeX aus dem Portfolio (Backticks + K_(NAME), lg, root(n)(…))
 * in gültiges LaTeX für MathJax um.
 */
export function convertLegacyTexToLatex(tex: string): string {
  let s = tex.trim().replace(/&middot;/g, '\\cdot ')

  // K_(VERZINST) → K_{\text{VERZINST}}
  s = s.replace(/_\(([^)]+)\)/g, '_{\\text{$1}}')

  // Dekadischer Logarithmus (lg = log₁₀, nicht l·g als Variablen)
  s = s.replace(/\blg\b/g, '\\log_{10}')

  // root(n)(inner) mit doppelter Klammer: root(n)((expr))
  s = s.replace(/root\(([^)]+)\)\(\(([^)]+)\)\)/g, '\\sqrt[$1]{$2}')
  // root(n)(expr)
  s = s.replace(/root\(([^)]+)\)\(([^)]+)\)/g, '\\sqrt[$1]{$2}')
  s = s.replace(/\broot\(([^)]+)\)/g, '\\sqrt{$1}')

  // sqrt(2) aus Flächenberechnung
  s = s.replace(/\bsqrt\(([^)]+)\)/g, '\\sqrt{$1}')

  return s
}
