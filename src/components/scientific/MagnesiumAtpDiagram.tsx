import { ArrowDefs, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

/**
 * Mg-ATP: Mg²⁺ bridges the β and γ phosphates; kinases use Mg-ATP as substrate.
 * Ref: de Baaij et al. 2015; NIH ODS.
 * Steps: 0 ATP · 1 Mg²⁺ binding · 2 kinase phosphoryl transfer · 3 >300 enzyme systems
 */
export function MagnesiumAtpDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = '#16222f'
  const muted = '#5a6675'
  const mg = '#1b6fa8'
  const p = '#e3862b'

  const phosphates = [
    { x: 330, label: 'α' },
    { x: 420, label: 'β' },
    { x: 510, label: 'γ' },
  ]

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Complexe magnésium-ATP', 'Magnesium-ATP complex')} style={FONT}>
      <ArrowDefs prefix="mgatp" colors={{ ink, mg, p }} />
      <defs>
        <radialGradient id="mg-sphere" cx="0.35" cy="0.3">
          <stop offset="0" stopColor="#bfe0f5" />
          <stop offset="0.55" stopColor="#4c9bd0" />
          <stop offset="1" stopColor="#14507c" />
        </radialGradient>
      </defs>

      {/* Step 2 — kinase pocket drawn behind the molecule */}
      <Step at={2} step={step}>
        <path
          d="M 300 120 C 360 60, 620 50, 690 120 C 760 190, 740 300, 660 320 C 600 335, 560 290, 520 300 C 470 312, 440 340, 380 330 C 300 318, 250 190, 300 120 Z"
          fill="#e6efe7"
          stroke="#2f8a57"
          strokeWidth="2"
          strokeDasharray="5 6"
        />
        <text x="680" y="98" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1d5a39">
          {tr('Kinase', 'Kinase')}
        </text>
      </Step>

      {/* Step 0 — ATP: adenine + ribose + 3 phosphates */}
      <Step at={0} step={step}>
        {/* adenine (6+5 ring) */}
        <g transform="translate(110 200)" stroke={ink} strokeWidth="2.5" fill="#fffdf8">
          <polygon points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17" />
          <polygon points="29,-17 60,-26 72,4 52,26 29,17" />
        </g>
        <text x="110" y="268" textAnchor="middle" fontSize="15" fill={muted}>
          {tr('Adénine', 'Adenine')}
        </text>
        {/* ribose */}
        <g transform="translate(225 205)" stroke={ink} strokeWidth="2.5" fill="#fffdf8">
          <polygon points="0,-30 29,-9 18,25 -18,25 -29,-9" />
        </g>
        <text x="225" y="268" textAnchor="middle" fontSize="15" fill={muted}>
          {tr('Ribose', 'Ribose')}
        </text>
        <line x1="182" y1="200" x2="196" y2="200" stroke={ink} strokeWidth="2.5" />
        <line x1="254" y1="200" x2="300" y2="200" stroke={ink} strokeWidth="2.5" />
        {phosphates.map(({ x, label }, i) => (
          <g key={label}>
            {i > 0 && <line x1={x - 60} y1="200" x2={x - 30} y2="200" stroke={ink} strokeWidth="2.5" />}
            <circle cx={x} cy="200" r="30" fill={p} />
            <text x={x} y="207" textAnchor="middle" fontSize="21" fontWeight="700" fill="white">
              P
            </text>
            <text x={x} y="152" textAnchor="middle" fontSize="17" fontWeight="600" fill={muted}>
              {label}
            </text>
            {/* negatively charged oxygens */}
            <text x={x} y="258" textAnchor="middle" fontSize="15" fill={p} fontWeight="600">
              O⁻
            </text>
          </g>
        ))}
        <text x="420" y="118" textAnchor="middle" fontSize="19" fontWeight="700" fill={ink}>
          ATP
        </text>
      </Step>

      {/* Step 1 — Mg²⁺ bridging β and γ */}
      <Step at={1} step={step}>
        <line x1="438" y1="250" x2="455" y2="296" stroke={mg} strokeWidth="2.5" strokeDasharray="5 5" />
        <line x1="492" y1="250" x2="475" y2="296" stroke={mg} strokeWidth="2.5" strokeDasharray="5 5" />
        <circle cx="465" cy="320" r="30" fill="url(#mg-sphere)" />
        <text x="465" y="327" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">
          Mg²⁺
        </text>
        <rect x="395" y="368" width="140" height="34" rx="17" fill={mg} />
        <text x="465" y="391" textAnchor="middle" fontSize="17" fontWeight="700" fill="white">
          Mg-ATP
        </text>
      </Step>

      {/* Step 2 — phosphoryl transfer to substrate */}
      <Step at={2} step={step}>
        <path d="M 540 190 C 580 170, 610 175, 632 190" stroke={p} strokeWidth="3" fill="none" markerEnd="url(#mgatp-arrow-p)" />
        <rect x="636" y="180" width="70" height="40" rx="10" fill="white" stroke="#2f8a57" strokeWidth="2" />
        <text x="671" y="206" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          R–OH
        </text>
        <text x="671" y="250" textAnchor="middle" fontSize="15" fill={muted}>
          {tr('substrat', 'substrate')}
        </text>
        <text x="671" y="275" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1d5a39">
          → R–O–PO₃²⁻ + ADP
        </text>
      </Step>

      {/* Step 3 — breadth of magnesium-dependent processes */}
      <Step at={3} step={step}>
        {[
          { x: 120, label: tr('Métabolisme énergétique', 'Energy metabolism') },
          { x: 320, label: tr('Synthèse protéique', 'Protein synthesis') },
          { x: 520, label: tr('Transmission neuromusculaire', 'Neuromuscular transmission') },
          { x: 700, label: tr('Équilibre électrolytique', 'Electrolyte balance') },
        ].map(({ x, label }) => (
          <g key={label}>
            <rect x={x - 92} y="420" width="184" height="36" rx="18" fill="#e3f0f8" stroke={mg} strokeOpacity="0.3" />
            <text x={x} y="443" textAnchor="middle" fontSize="15" fontWeight="600" fill={mg}>
              {label}
            </text>
          </g>
        ))}
        <text x="40" y="36" fontSize="16" fontWeight="600" fill={ink}>
          {tr('Cofacteur de plus de 300 systèmes enzymatiques', 'Cofactor in more than 300 enzyme systems')}
        </text>
      </Step>
    </svg>
  )
}
