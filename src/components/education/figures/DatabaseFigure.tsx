const STROKE = 'currentColor'
const FILL = 'color-mix(in srgb, currentColor 12%, transparent)'

export default function DatabaseFigure() {
  return (
    <svg viewBox="0 0 240 120" className="w-full max-w-md mx-auto" role="img" aria-label="Relationale Tabelle">
      <rect x={20} y={20} width={200} height={80} rx={6} fill={FILL} stroke={STROKE} strokeWidth={2} />
      <line x1={20} y1={45} x2={220} y2={45} stroke={STROKE} strokeWidth={1.5} />
      <line x1={80} y1={20} x2={80} y2={100} stroke={STROKE} strokeWidth={1} />
      <line x1={140} y1={20} x2={140} y2={100} stroke={STROKE} strokeWidth={1} />
      <text x={50} y={38} textAnchor="middle" className="fill-current text-xs font-semibold" fontSize={11}>
        id
      </text>
      <text x={110} y={38} textAnchor="middle" className="fill-current text-xs font-semibold" fontSize={11}>
        title
      </text>
      <text x={180} y={38} textAnchor="middle" className="fill-current text-xs font-semibold" fontSize={11}>
        price
      </text>
      <text x={50} y={68} textAnchor="middle" className="fill-current text-xs" fontSize={10}>
        1
      </text>
      <text x={110} y={68} textAnchor="middle" className="fill-current text-xs" fontSize={10}>
        SQL
      </text>
      <text x={180} y={68} textAnchor="middle" className="fill-current text-xs" fontSize={10}>
        19
      </text>
      <text x={120} y={112} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={10}>
        Zeile = Tupel, Spalte = Attribut
      </text>
    </svg>
  )
}
