import { ArrowDefs, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

function Pathogen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * Math.PI) / 5
        return <line key={i} x1={Math.cos(a) * 9} y1={Math.sin(a) * 9} x2={Math.cos(a) * 15} y2={Math.sin(a) * 15} stroke="#c4525f" strokeWidth="2.5" strokeLinecap="round" />
      })}
      <circle r="10" fill="#c4525f" />
    </g>
  )
}

/**
 * Respiratory epithelium, innate immunity, and where zinc and vitamin D act.
 * Refs: NIH ODS zinc & vitamin D fact sheets.
 * Steps: 0 barrier · 1 pathogen · 2 immune cells (zinc) · 3 VDR (vitamin D)
 */
export function ImmuneBarrierDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = '#16222f'
  const muted = '#5a6675'
  const plum = '#6a3d8f'
  const zinc = '#6a7fa8'
  const d = '#c98a12'
  const cells = Array.from({ length: 12 }, (_, i) => 50 + i * 63)

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Barrière respiratoire', 'Respiratory barrier')} style={FONT}>
      <ArrowDefs prefix="imm" colors={{ ink, plum }} />

      {/* Step 0 — airway lumen, mucus, ciliated epithelium */}
      <Step at={0} step={step}>
        <rect x="0" y="0" width="800" height="120" rx="16" fill="#f4f7fb" />
        <text x="20" y="28" fontSize="15" fontWeight="600" fill={muted} letterSpacing="1">
          {tr('VOIES RESPIRATOIRES', 'AIRWAY')}
        </text>
        <path d="M 0 120 Q 60 104 120 120 T 240 120 T 360 120 T 480 120 T 600 120 T 720 120 T 840 120 L 840 160 L 0 160 Z" fill="#e8e0f1" />
        <text x="780" y="148" textAnchor="end" fontSize="14" fill={muted}>
          {tr('Mucus', 'Mucus')}
        </text>
        {cells.map((x, i) => (
          <g key={x}>
            {i % 4 === 2 ? (
              <>
                <rect x={x - 28} y="170" width="56" height="110" rx="10" fill="#efe7f5" stroke="#b8a3cc" />
                <ellipse cx={x} cy="198" rx="18" ry="20" fill="#e2d5ee" />
              </>
            ) : (
              <>
                <rect x={x - 28} y="170" width="56" height="110" rx="10" fill="#f7efe3" stroke="#c9b79a" />
                {Array.from({ length: 6 }, (_, j) => (
                  <line key={j} x1={x - 20 + j * 8} y1="170" x2={x - 22 + j * 8} y2="156" stroke="#b8a3cc" strokeWidth="2" strokeLinecap="round" />
                ))}
              </>
            )}
            <ellipse cx={x} cy="246" rx="10" ry="12" fill="#a98bd6" opacity="0.6" />
          </g>
        ))}
        <text x="20" y="306" fontSize="14" fill={muted}>
          {tr('Épithélium cilié + cellules caliciformes', 'Ciliated epithelium + goblet cells')}
        </text>
        <rect x="0" y="320" width="800" height="150" rx="16" fill="#faf5fc" />
      </Step>

      {/* Step 1 — pathogens */}
      <Step at={1} step={step}>
        <Pathogen x={180} y={70} />
        <Pathogen x={420} y={50} />
        <Pathogen x={610} y={80} />
        <Pathogen x={365} y={140} />
        <path d="M 365 158 L 365 300" stroke="#c4525f" strokeWidth="2" strokeDasharray="4 5" />
        <text x="440" y="96" fontSize="15" fill={muted}>
          {tr('agents pathogènes', 'pathogens')}
        </text>
      </Step>

      {/* Step 2 — innate immune cell; zinc */}
      <Step at={2} step={step}>
        <path d="M 330 370 C 330 330, 410 320, 430 350 C 455 340, 470 380, 450 400 C 450 440, 370 445, 345 420 C 315 415, 312 385, 330 370 Z" fill="#d9c8ea" stroke={plum} strokeWidth="2.5" />
        <ellipse cx="390" cy="390" rx="20" ry="16" fill={plum} opacity="0.6" />
        <text x="390" y="460" textAnchor="middle" fontSize="15" fontWeight="600" fill={ink}>
          {tr('Cellule immunitaire innée', 'Innate immune cell')}
        </text>
        <rect x="490" y="360" width="190" height="56" rx="14" fill="white" stroke={zinc} strokeOpacity="0.5" />
        <circle cx="514" cy="388" r="12" fill={zinc} />
        <text x="514" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
          Zn
        </text>
        <text x="534" y="384" fontSize="14" fontWeight="700" fill={ink}>
          Zinc
        </text>
        <text x="534" y="402" fontSize="14" fill={muted}>
          {tr('développement & fonction', 'development & function')}
        </text>
        <path d="M 488 388 L 462 388" stroke={zinc} strokeWidth="2" />
      </Step>

      {/* Step 3 — vitamin D receptor */}
      <Step at={3} step={step}>
        <g transform="translate(332 364)">
          <path d="M -8 0 L 0 -12 L 8 0 Z" fill={d} />
        </g>
        <rect x="110" y="360" width="190" height="56" rx="14" fill="white" stroke={d} strokeOpacity="0.5" />
        <circle cx="134" cy="388" r="12" fill={d} />
        <text x="134" y="392" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
          D
        </text>
        <text x="154" y="384" fontSize="14" fontWeight="700" fill={ink}>
          {tr('Vitamine D → VDR', 'Vitamin D → VDR')}
        </text>
        <text x="154" y="402" fontSize="14" fill={muted}>
          {tr('module la réponse', 'modulates the response')}
        </text>
        <path d="M 302 388 L 322 378" stroke={d} strokeWidth="2" />
      </Step>
    </svg>
  )
}
