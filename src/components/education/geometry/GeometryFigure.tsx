/** Parametrische SVG-Skizzen zu den Flächenformeln (Mathe 1. Stock). */

const STROKE = 'currentColor'
const FILL = 'color-mix(in srgb, currentColor 12%, transparent)'

function Label({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-current text-sm font-medium"
      fontSize={14}
    >
      {children}
    </text>
  )
}

function parseExampleSide(question?: string): number | null {
  if (!question) return null
  const m = question.match(/a\s*=\s*([\d,]+)/i)
  if (!m) return null
  const n = parseFloat(m[1].replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

function SquareFigure({ exampleA }: { exampleA: number | null }) {
  const s = exampleA ? Math.min(80, 40 + exampleA * 8) : 72
  const x = 100 - s / 2
  const y = 70 - s / 2
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Quadrat">
      <rect x={x} y={y} width={s} height={s} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <Label x={100} y={y - 10}>{exampleA ? `a = ${exampleA}` : 'a'}</Label>
      <Label x={x + s + 14} y={70}>a</Label>
      <text x={100} y={135} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = a² · U = 4a
      </text>
    </svg>
  )
}

function RectangleFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Rechteck">
      <rect x={45} y={35} width={110} height={70} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <Label x={100} y={22}>b</Label>
      <Label x={168} y={70}>a</Label>
      <text x={100} y={135} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = a · b
      </text>
    </svg>
  )
}

function TriangleFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Dreieck">
      <polygon points="40,110 160,110 130,40" fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={130} y1={40} x2={130} y2={110} stroke={STROKE} strokeWidth={1} strokeDasharray="4 3" />
      <Label x={100} y={122}>c</Label>
      <Label x={142} y={72}>h₍c₎</Label>
      <text x={100} y={18} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = ½ · c · hᶜ
      </text>
    </svg>
  )
}

function ParallelogramFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Parallelogramm">
      <polygon points="55,100 155,100 175,50 75,50" fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={75} y1={50} x2={75} y2={100} stroke={STROKE} strokeWidth={1} strokeDasharray="4 3" />
      <Label x={105} y={112}>g</Label>
      <Label x={62} y={72}>h</Label>
      <text x={100} y={18} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = g · h
      </text>
    </svg>
  )
}

function TrapezFigure({ isosceles }: { isosceles?: boolean }) {
  const top = isosceles ? 70 : 60
  const bottom = 140
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Trapez">
      <polygon points={`${top},45 ${200 - top},45 ${bottom},105 40,105`} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={top + 20} y1={45} x2={top + 20} y2={105} stroke={STROKE} strokeWidth={1} strokeDasharray="4 3" />
      <Label x={100} y={32}>c</Label>
      <Label x={100} y={118}>a</Label>
      <Label x={top + 8} y={72}>h</Label>
      <text x={100} y={140} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = ½(a + c) · h
      </text>
    </svg>
  )
}

function IsoscelesTriangleFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Gleichschenkliges Dreieck">
      <polygon points="100,35 165,110 35,110" fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={100} y1={35} x2={100} y2={110} stroke={STROKE} strokeWidth={1} strokeDasharray="4 3" />
      <Label x={100} y={118}>a</Label>
      <Label x={108} y={68}>h</Label>
      <Label x={52} y={72}>s</Label>
      <Label x={148} y={72}>s</Label>
      <text x={100} y={18} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = a · h / 2
      </text>
    </svg>
  )
}

function EquilateralTriangleFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Gleichseitiges Dreieck">
      <polygon points="100,32 168,118 32,118" fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={100} y1={32} x2={100} y2={118} stroke={STROKE} strokeWidth={1} strokeDasharray="4 3" />
      <Label x={100} y={128}>a</Label>
      <Label x={108} y={72}>h</Label>
      <text x={100} y={18} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = a · h / 2 · U = 3a
      </text>
    </svg>
  )
}

function CircleFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Kreis">
      <circle cx={100} cy={75} r={48} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={100} y1={75} x2={148} y2={75} stroke={STROKE} strokeWidth={1.5} />
      <Label x={122} y={68}>r</Label>
      <line x1={52} y1={75} x2={148} y2={75} stroke={STROKE} strokeWidth={1} strokeDasharray="3 3" />
      <Label x={100} y={62}>d</Label>
      <text x={100} y={140} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = πr² · U = 2πr
      </text>
    </svg>
  )
}

function RingFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Kreisring">
      <circle cx={100} cy={75} r={50} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <circle cx={100} cy={75} r={28} fill="var(--background, #fff)" stroke={STROKE} strokeWidth={2} className="dark:fill-zinc-900" />
      <line x1={100} y1={75} x2={150} y2={75} stroke={STROKE} strokeWidth={1.5} />
      <Label x={128} y={68}>R</Label>
      <line x1={100} y1={75} x2={128} y2={75} stroke={STROKE} strokeWidth={1} strokeDasharray="3 3" />
      <Label x={118} y={62}>r</Label>
      <text x={100} y={140} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = π(R² − r²)
      </text>
    </svg>
  )
}

function SectorFigure() {
  return (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto" role="img" aria-label="Kreisausschnitt">
      <path
        d="M 100 75 L 148 75 A 48 48 0 0 0 124 35 Z"
        fill={FILL}
        stroke={STROKE}
        strokeWidth={2}
      />
      <line x1={100} y1={75} x2={148} y2={75} stroke={STROKE} strokeWidth={1.5} />
      <Label x={128} y={80}>r</Label>
      <path d="M 100 75 A 48 48 0 0 0 124 35" fill="none" stroke={STROKE} strokeWidth={1.5} strokeDasharray="4 3" />
      <Label x={118} y={48}>α</Label>
      <text x={100} y={140} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={11}>
        A = r²πα/360°
      </text>
    </svg>
  )
}

const SHAPE_IDS = new Set([
  'quadrat',
  'rechteck',
  'parallelogramm',
  'dreieck',
  'glschenk-dreieck',
  'glseit-dreieck',
  'trapez',
  'glschenk-trapez',
  'kreis',
  'kreisring',
  'kreisausschnitt',
])

export function hasGeometryFigure(shapeId: string): boolean {
  return SHAPE_IDS.has(shapeId)
}

export default function GeometryFigure({
  shapeId,
  question,
}: {
  shapeId: string
  question?: string
}) {
  const exampleA = parseExampleSide(question)

  switch (shapeId) {
    case 'quadrat':
      return <SquareFigure exampleA={exampleA} />
    case 'rechteck':
      return <RectangleFigure />
    case 'dreieck':
      return <TriangleFigure />
    case 'parallelogramm':
      return <ParallelogramFigure />
    case 'glschenk-dreieck':
      return <IsoscelesTriangleFigure />
    case 'glseit-dreieck':
      return <EquilateralTriangleFigure />
    case 'trapez':
      return <TrapezFigure />
    case 'glschenk-trapez':
      return <TrapezFigure isosceles />
    case 'kreis':
      return <CircleFigure />
    case 'kreisring':
      return <RingFigure />
    case 'kreisausschnitt':
      return <SectorFigure />
    default:
      return null
  }
}
