import { NL } from './stage'

/** Poster-inspired ornaments: curved emerald corners, DNA, molecular lattice. */
export function DirectionMotif({ tone, id }: { tone: 'dark' | 'light'; id: string }) {
  const dark = tone === 'dark'
  const stroke = dark ? 'rgba(244,123,32,0.22)' : 'rgba(6,61,50,0.12)'
  const fill = dark ? 'rgba(244,123,32,0.10)' : 'rgba(6,61,50,0.07)'
  const grid = dark ? 'rgba(255,255,255,0.045)' : 'rgba(6,61,50,0.055)'
  const wave = dark ? NL.emerald : 'rgba(6,61,50,0.06)'
  const patternId = `dir-grid-${id}`
  const hexId = `dir-hex-${id}`

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke={grid} strokeWidth="1" />
        </pattern>
        <pattern id={hexId} width="56" height="64" patternUnits="userSpaceOnUse">
          <path
            d="M28 4 L48 16 L48 40 L28 52 L8 40 L8 16 Z"
            fill="none"
            stroke={dark ? 'rgba(255,255,255,0.03)' : 'rgba(6,61,50,0.04)'}
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id={`glow-${id}`} cx="50%" cy="42%" r="48%">
          <stop offset="0%" stopColor={NL.orange} stopOpacity={dark ? 0.16 : 0.05} />
          <stop offset="100%" stopColor={NL.orange} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill={`url(#${patternId})`} />
      <rect width="1600" height="900" fill={`url(#${hexId})`} />
      <rect width="1600" height="900" fill={`url(#glow-${id})`} />

      {/* Poster-like emerald wave, bottom-right */}
      <path d="M1600 310 C 1320 380, 1200 560, 1188 900 L 1600 900 Z" fill={wave} opacity={dark ? 0.85 : 1} />
      <path
        d="M1600 338 C 1348 404, 1234 568, 1220 900"
        fill="none"
        stroke={NL.orange}
        strokeWidth="1.6"
        opacity={dark ? 0.55 : 0.28}
      />

      {/* Soft counter-wave, top-left */}
      <path d="M0 0 L 420 0 C 280 90, 90 170, 0 260 Z" fill={wave} opacity={dark ? 0.45 : 0.7} />
      <path d="M0 248 C 96 164, 270 88, 410 8" fill="none" stroke={NL.orange} strokeWidth="1.2" opacity={dark ? 0.4 : 0.2} />

      {/* DNA helix */}
      <g transform="translate(1488 70)" opacity="0.85">
        <path d="M18 8 C 52 40, 52 88, 18 120 S -16 200, 18 232 S 52 312, 18 344" fill="none" stroke={stroke} strokeWidth="1.5" />
        <path d="M18 8 C -16 40, -16 88, 18 120 S 52 200, 18 232 S -16 312, 18 344" fill="none" stroke={stroke} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1={4} y1={28 + i * 40} x2={32} y2={28 + i * 40} stroke={stroke} strokeWidth="1.1" />
        ))}
      </g>

      {/* Molecular cluster */}
      <g transform="translate(64 620)" opacity="0.9">
        <circle cx="36" cy="36" r="7" fill={fill} stroke={stroke} />
        <circle cx="86" cy="14" r="5" fill={fill} stroke={stroke} />
        <circle cx="98" cy="64" r="6.5" fill={fill} stroke={stroke} />
        <circle cx="146" cy="38" r="4.5" fill={fill} stroke={stroke} />
        <circle cx="70" cy="88" r="4" fill={fill} stroke={stroke} />
        <line x1="42" y1="32" x2="80" y2="18" stroke={stroke} />
        <line x1="44" y1="42" x2="92" y2="60" stroke={stroke} />
        <line x1="90" y1="20" x2="98" y2="58" stroke={stroke} />
        <line x1="104" y1="62" x2="140" y2="42" stroke={stroke} />
        <line x1="40" y1="44" x2="68" y2="82" stroke={stroke} />
      </g>
    </svg>
  )
}
