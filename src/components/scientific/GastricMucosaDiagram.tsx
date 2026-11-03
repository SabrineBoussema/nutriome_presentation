import { ArrowDefs, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

/**
 * Gastric mucosa and zinc-L-carnosine (proposed local action). Refs: Efthymakis & Neri 2022; Mahmood et al. 2007.
 * Steps: 0 layers · 1 injury · 2 adhesion of the complex · 3 local release / repair
 */
export function GastricMucosaDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = '#16222f'
  const muted = '#5a6675'
  const green = '#1d5a39'
  const zinc = '#6a7fa8'
  const injured = step >= 1
  const repaired = step >= 3
  const cells = Array.from({ length: 13 }, (_, i) => 40 + i * 56)
  const lesion = (i: number) => i >= 5 && i <= 7

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Muqueuse gastrique', 'Gastric mucosa')} style={FONT}>
      <ArrowDefs prefix="gast" colors={{ ink, green }} />

      {/* Lumen */}
      <rect x="0" y="0" width="800" height="150" rx="16" fill="#fff6e8" />
      <text x="20" y="28" fontSize="15" fontWeight="600" fill={muted} letterSpacing="1">
        {tr('LUMIÈRE GASTRIQUE', 'GASTRIC LUMEN')}
      </text>
      {[[120, 70], [210, 110], [300, 60], [520, 90], [610, 55], [700, 115], [420, 120]].map(([x, y]) => (
        <text key={`${x}`} x={x} y={y} fontSize="15" fontWeight="700" fill="#c4525f" opacity="0.7">
          H⁺
        </text>
      ))}

      {/* Mucus layer */}
      <path d="M 0 150 Q 50 135 100 150 T 200 150 T 300 150 T 400 150 T 500 150 T 600 150 T 700 150 T 800 150 L 800 200 L 0 200 Z" fill="#dfeee6" />
      <text x="780" y="186" textAnchor="end" fontSize="14" fill={muted}>
        {tr('Mucus', 'Mucus')}
      </text>

      {/* Epithelium */}
      {cells.map((x, i) => {
        const hurt = injured && !repaired && lesion(i)
        const healing = repaired && lesion(i)
        return (
          <g key={x} opacity={hurt ? 0.55 : 1}>
            <rect
              x={x - 25}
              y={hurt ? 214 : 200}
              width="50"
              height={hurt ? 86 : 100}
              rx="8"
              fill={hurt ? '#f3d1d4' : healing ? '#d7ead9' : '#f7efe3'}
              stroke={hurt ? '#c4525f' : '#c9b79a'}
              strokeWidth="1.5"
              strokeDasharray={hurt ? '4 4' : undefined}
            />
            <ellipse cx={x} cy={hurt ? 268 : 262} rx="10" ry="12" fill={hurt ? '#d98a92' : '#a98bd6'} opacity="0.7" />
          </g>
        )
      })}
      <text x="20" y="225" fontSize="14" fill={muted}>
        {tr('Épithélium', 'Epithelium')}
      </text>

      {/* Lamina propria with capillary */}
      <rect x="0" y="300" width="800" height="170" rx="16" fill="#fbeff0" />
      <path d="M 0 380 C 150 340, 300 420, 450 375 S 700 350, 800 390" stroke="#c4525f" strokeWidth="14" fill="none" opacity="0.35" strokeLinecap="round" />
      <text x="20" y="455" fontSize="15" fontWeight="600" fill={muted} letterSpacing="1">
        {tr('CHORION VASCULARISÉ', 'LAMINA PROPRIA')}
      </text>

      {/* Step 1 — aggressors */}
      <Step at={1} step={step}>
        <rect x="300" y="36" width="200" height="34" rx="17" fill="#c4525f" />
        <text x="400" y="58" textAnchor="middle" fontSize="15" fontWeight="600" fill="white">
          {tr('Acidité · AINS · alcool', 'Acid · NSAIDs · alcohol')}
        </text>
        <path d="M 400 72 L 400 140" stroke="#c4525f" strokeWidth="2.5" strokeDasharray="5 5" />
      </Step>

      {/* Step 2 — zinc–carnosine complexes adhere to the lesion */}
      <Step at={2} step={step}>
        {[320, 360, 400, 440, 480].map((x, i) => (
          <g key={x} transform={`translate(${x} ${180 + (i % 2) * 14})`}>
            <circle cx="-7" cy="0" r="8" fill={zinc} />
            <circle cx="8" cy="0" r="8" fill={green} />
            <line x1="-1" y1="0" x2="2" y2="0" stroke="white" strokeWidth="2" />
          </g>
        ))}
        <rect x="560" y="84" width="210" height="48" rx="12" fill="white" stroke={green} strokeOpacity="0.4" />
        <circle cx="584" cy="108" r="8" fill={zinc} />
        <circle cx="600" cy="108" r="8" fill={green} />
        <text x="616" y="104" fontSize="15" fontWeight="700" fill={ink}>
          Zinc-L-carnosine
        </text>
        <text x="616" y="121" fontSize="14" fill={muted}>
          {tr('adhère à la zone lésée', 'adheres to injured area')}
        </text>
      </Step>

      {/* Step 3 — local release and repair */}
      <Step at={3} step={step}>
        {[[330, 232], [370, 250], [420, 236], [455, 256], [395, 270]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={i % 2 ? green : zinc} />
          </g>
        ))}
        <text x="400" y="330" textAnchor="middle" fontSize="15" fontWeight="600" fill={green}>
          {tr('Zn²⁺ + L-carnosine libérés localement', 'Zn²⁺ + L-carnosine released locally')}
        </text>
        <text x="400" y="350" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('réparation épithéliale (modèles expérimentaux)', 'epithelial repair (experimental models)')}
        </text>
      </Step>
    </svg>
  )
}
