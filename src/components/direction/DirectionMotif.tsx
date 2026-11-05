/** Subtle DNA / molecular motif for Direction slides. Decorative only. */
export function DirectionMotif({ tone, id }: { tone: 'dark' | 'light'; id: string }) {
  const stroke = tone === 'dark' ? 'rgba(244,123,32,0.16)' : 'rgba(6,61,50,0.10)'
  const fill = tone === 'dark' ? 'rgba(244,123,32,0.08)' : 'rgba(6,61,50,0.06)'
  const grid = tone === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(6,61,50,0.05)'
  const patternId = `dir-grid-${id}`

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id={patternId} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke={grid} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />

      {/* DNA suggestion, top-right */}
      <g transform="translate(1180 40)" opacity="0.9">
        <path
          d="M40 20 C 90 60, 90 120, 40 160 S -10 260, 40 300 S 90 420, 40 460"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
        />
        <path
          d="M40 20 C -10 60, -10 120, 40 160 S 90 260, 40 300 S -10 420, 40 460"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
        />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={i} x1={18} y1={40 + i * 50} x2={62} y2={40 + i * 50} stroke={stroke} strokeWidth="1.2" />
        ))}
      </g>

      {/* Molecular clusters */}
      <g transform="translate(80 620)" opacity="0.85">
        <circle cx="40" cy="40" r="7" fill={fill} stroke={stroke} />
        <circle cx="88" cy="18" r="5" fill={fill} stroke={stroke} />
        <circle cx="96" cy="68" r="6" fill={fill} stroke={stroke} />
        <circle cx="140" cy="40" r="4.5" fill={fill} stroke={stroke} />
        <line x1="46" y1="36" x2="82" y2="22" stroke={stroke} />
        <line x1="48" y1="46" x2="90" y2="64" stroke={stroke} />
        <line x1="94" y1="24" x2="100" y2="62" stroke={stroke} />
        <line x1="102" y1="64" x2="134" y2="44" stroke={stroke} />
      </g>
      <g transform="translate(1380 680)" opacity="0.7">
        <circle cx="24" cy="24" r="5" fill={fill} stroke={stroke} />
        <circle cx="64" cy="48" r="7" fill={fill} stroke={stroke} />
        <circle cx="18" cy="70" r="4" fill={fill} stroke={stroke} />
        <line x1="28" y1="28" x2="58" y2="44" stroke={stroke} />
        <line x1="24" y1="30" x2="20" y2="64" stroke={stroke} />
      </g>
    </svg>
  )
}
