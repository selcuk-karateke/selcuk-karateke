const STROKE = 'currentColor'
const FILL = 'color-mix(in srgb, currentColor 12%, transparent)'

export function OrgMatrixFigure() {
  return (
    <svg viewBox="0 0 200 140" className="w-full max-w-xs mx-auto" role="img" aria-label="Matrixorganisation">
      <rect x={70} y={8} width={60} height={24} rx={4} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
      <text x={100} y={24} textAnchor="middle" className="fill-current text-[10px]">Geschäftsführung</text>
      {[30, 100, 170].map((x, i) => (
        <g key={i}>
          <line x1={100} y1={32} x2={x} y2={48} stroke={STROKE} strokeWidth={1} />
          <rect x={x - 28} y={48} width={56} height={22} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
          <text x={x} y={62} textAnchor="middle" className="fill-current text-[9px]">
            Linie {i + 1}
          </text>
        </g>
      ))}
      {[50, 100, 150].map((x, i) => (
        <g key={`p${i}`}>
          <rect x={x - 24} y={88} width={48} height={20} rx={3} fill={FILL} stroke={STROKE} strokeWidth={1} strokeDasharray="3 2" />
          <text x={x} y={101} textAnchor="middle" className="fill-current text-[9px]">
            Projekt {String.fromCharCode(65 + i)}
          </text>
          <line x1={x} y1={88} x2={[30, 100, 170][i]} y2={70} stroke={STROKE} strokeWidth={0.8} strokeDasharray="2 2" />
        </g>
      ))}
    </svg>
  )
}

export function FlowProcessFigure() {
  return (
    <svg viewBox="0 0 220 80" className="w-full max-w-md mx-auto" role="img" aria-label="Prozessablauf">
      {[
        [30, 30, 'Start'],
        [90, 30, 'Schritt'],
        [150, 30, 'Prüfung?'],
        [190, 50, 'Ende'],
      ].map(([x, y, label], i) => (
        <g key={i}>
          {i < 3 && (
            <line
              x1={(x as number) + 40}
              y1={y as number}
              x2={(x as number) + 20}
              y2={y as number}
              stroke={STROKE}
              strokeWidth={1.5}
            />
          )}
          <rect
            x={(x as number) - 22}
            y={(y as number) - 14}
            width={44}
            height={28}
            rx={i === 2 ? 14 : 4}
            fill={FILL}
            stroke={STROKE}
            strokeWidth={1.5}
          />
          <text x={x as number} y={(y as number) + 4} textAnchor="middle" className="fill-current text-[9px]">
            {label as string}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function OsiStackFigure() {
  const layers = ['Anwendung', 'Darstellung', 'Sitzung', 'Transport', 'Netzwerk', 'Sicherung', 'Bit']
  return (
    <svg viewBox="0 0 120 200" className="w-full max-w-[140px] mx-auto" role="img" aria-label="OSI-Modell">
      {layers.map((name, i) => (
        <g key={name}>
          <rect
            x={10}
            y={10 + i * 26}
            width={100}
            height={22}
            fill={FILL}
            stroke={STROKE}
            strokeWidth={1.5}
          />
          <text x={60} y={24 + i * 26} textAnchor="middle" className="fill-current text-[8px]">
            {7 - i}. {name}
          </text>
        </g>
      ))}
    </svg>
  )
}
