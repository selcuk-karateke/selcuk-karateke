const STROKE = 'currentColor'
const FILL = 'color-mix(in srgb, currentColor 12%, transparent)'

function Node({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={8} fill={FILL} stroke={STROKE} strokeWidth={2} />
}

export default function TopologyFigure({ variant }: { variant: 'bus' | 'star' | 'ring' }) {
  if (variant === 'star') {
    return (
      <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="Stern-Topologie">
        <circle cx={100} cy={80} r={14} fill={FILL} stroke={STROKE} strokeWidth={2} />
        <text x={100} y={84} textAnchor="middle" className="fill-current text-[10px]">Switch</text>
        {[
          [100, 25],
          [160, 55],
          [160, 105],
          [100, 135],
          [40, 105],
          [40, 55],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={100} y1={80} x2={x} y2={y} stroke={STROKE} strokeWidth={1.5} />
            <Node x={x} y={y} />
          </g>
        ))}
      </svg>
    )
  }

  if (variant === 'ring') {
    return (
      <svg viewBox="0 0 200 160" className="w-full max-w-xs mx-auto" role="img" aria-label="Ring-Topologie">
        <circle cx={100} cy={80} r={50} fill="none" stroke={STROKE} strokeWidth={2} />
        {[
          [100, 30],
          [150, 55],
          [150, 105],
          [100, 130],
          [50, 105],
          [50, 55],
        ].map(([x, y], i) => (
          <Node key={i} x={x} y={y} />
        ))}
        <polygon points="145,52 155,48 150,58" fill={STROKE} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 100" className="w-full max-w-md mx-auto" role="img" aria-label="Bus-Topologie">
      <line x1={20} y1={50} x2={180} y2={50} stroke={STROKE} strokeWidth={3} />
      {[40, 80, 120, 160].map((x) => (
        <g key={x}>
          <line x1={x} y1={50} x2={x} y2={30} stroke={STROKE} strokeWidth={1.5} />
          <Node x={x} y={25} />
        </g>
      ))}
      <text x={100} y={85} textAnchor="middle" className="fill-current text-xs opacity-70" fontSize={10}>
        gemeinsames Medium
      </text>
    </svg>
  )
}
