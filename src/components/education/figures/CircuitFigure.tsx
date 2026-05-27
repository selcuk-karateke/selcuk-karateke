const STROKE = 'currentColor'
const FILL = 'color-mix(in srgb, currentColor 12%, transparent)'

export default function CircuitFigure({ variant }: { variant: 'series' | 'parallel' | 'ohm' }) {
  if (variant === 'ohm') {
    return (
      <svg viewBox="0 0 220 100" className="w-full max-w-md mx-auto" role="img" aria-label="Ohmsches Gesetz">
        <rect x={20} y={35} width={50} height={30} rx={4} fill={FILL} stroke={STROKE} strokeWidth={2} />
        <text x={45} y={54} textAnchor="middle" className="fill-current text-xs" fontSize={12}>R</text>
        <line x1={70} y1={50} x2={150} y2={50} stroke={STROKE} strokeWidth={2} />
        <text x={110} y={40} textAnchor="middle" className="fill-current text-xs opacity-80" fontSize={11}>
          U = R · I
        </text>
        <circle cx={165} cy={50} r={14} fill={FILL} stroke={STROKE} strokeWidth={2} />
        <text x={165} y={54} textAnchor="middle" className="fill-current text-xs" fontSize={11}>I</text>
      </svg>
    )
  }

  if (variant === 'parallel') {
    return (
      <svg viewBox="0 0 220 140" className="w-full max-w-md mx-auto" role="img" aria-label="Parallelschaltung">
        <line x1={30} y1={20} x2={30} y2={120} stroke={STROKE} strokeWidth={2} />
        <line x1={190} y1={20} x2={190} y2={120} stroke={STROKE} strokeWidth={2} />
        <rect x={55} y={25} width={40} height={24} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
        <text x={75} y={41} textAnchor="middle" className="fill-current text-xs" fontSize={11}>R₁</text>
        <rect x={55} y={85} width={40} height={24} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
        <text x={75} y={101} textAnchor="middle" className="fill-current text-xs" fontSize={11}>R₂</text>
        <line x1={30} y1={37} x2={55} y2={37} stroke={STROKE} strokeWidth={1.5} />
        <line x1={95} y1={37} x2={190} y2={37} stroke={STROKE} strokeWidth={1.5} />
        <line x1={30} y1={97} x2={55} y2={97} stroke={STROKE} strokeWidth={1.5} />
        <line x1={95} y1={97} x2={190} y2={97} stroke={STROKE} strokeWidth={1.5} />
        <text x={110} y={132} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={10}>
          U gleich, I teilt sich
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 220 80" className="w-full max-w-md mx-auto" role="img" aria-label="Reihenschaltung">
      <line x1={20} y1={40} x2={200} y2={40} stroke={STROKE} strokeWidth={2} />
      <rect x={50} y={28} width={36} height={24} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
      <text x={68} y={44} textAnchor="middle" className="fill-current text-xs" fontSize={11}>R₁</text>
      <rect x={110} y={28} width={36} height={24} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
      <text x={128} y={44} textAnchor="middle" className="fill-current text-xs" fontSize={11}>R₂</text>
      <text x={110} y={68} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={10}>
        I überall gleich
      </text>
    </svg>
  )
}
