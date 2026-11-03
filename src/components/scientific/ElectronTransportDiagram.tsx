import { ArrowDefs, DrawPath, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

/**
 * Mitochondrial electron transport chain (complexes I–V) with CoQ10 as the mobile
 * carrier between complexes I/II and III. Ref: Rich & Maréchal 2010.
 * Steps: 0 membrane · 1 complex I → Q · 2 complex II → Q · 3 Q → III → cyt c → IV → O₂
 *        4 proton pumping · 5 ATP synthase
 */
export function ElectronTransportDiagram({ step, dark = false, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = dark ? '#e9eef5' : '#16222f'
  const muted = dark ? 'rgb(233 238 245 / 0.6)' : '#5a6675'
  const gold = '#d9a93b'
  const e = '#2f8a57'
  const proton = '#c4525f'

  const yTop = 200
  const yBot = 280
  const heads = Array.from({ length: 58 }, (_, i) => 14 + i * 13.6)

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Chaîne respiratoire mitochondriale', 'Mitochondrial respiratory chain')} style={FONT}>
      <ArrowDefs prefix="etc" colors={{ e, proton, ink, gold }} />
      <defs>
        <linearGradient id="etc-ims" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark ? '#3a1f2b' : '#fbe9ec'} />
          <stop offset="1" stopColor={dark ? '#2a2030' : '#fdf3f4'} />
        </linearGradient>
        <linearGradient id="etc-matrix" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={dark ? '#13283c' : '#eef6fb'} />
          <stop offset="1" stopColor={dark ? '#0f2033' : '#e3f0f8'} />
        </linearGradient>
        <radialGradient id="etc-q" cx="0.4" cy="0.35">
          <stop offset="0" stopColor="#ffe9a8" />
          <stop offset="1" stopColor={gold} />
        </radialGradient>
      </defs>

      {/* Compartments */}
      <rect x="0" y="0" width="800" height={yTop} rx="18" fill="url(#etc-ims)" />
      <rect x="0" y={yBot} width="800" height={470 - yBot} rx="18" fill="url(#etc-matrix)" />
      <text x="20" y="30" fontSize="16" fontWeight="600" fill={muted} letterSpacing="1.5">
        {tr('ESPACE INTERMEMBRANAIRE', 'INTERMEMBRANE SPACE')}
      </text>
      <text x="20" y="455" fontSize="16" fontWeight="600" fill={muted} letterSpacing="1.5">
        {tr('MATRICE', 'MATRIX')}
      </text>

      {/* Lipid bilayer */}
      <rect x="0" y={yTop} width="800" height={yBot - yTop} fill={dark ? '#3b3a2e' : '#f6ecd0'} />
      {heads.map((x) => (
        <g key={x}>
          <circle cx={x} cy={yTop + 6} r="6" fill={dark ? '#7d8fa6' : '#9fc1dc'} />
          <circle cx={x} cy={yBot - 6} r="6" fill={dark ? '#7d8fa6' : '#9fc1dc'} />
        </g>
      ))}
      <text x="792" y={yTop + 46} fontSize="14" textAnchor="end" fill={muted}>
        {tr('membrane interne', 'inner membrane')}
      </text>

      {/* Complexes */}
      <Step at={0} step={step}>
        <Complex x={70} y={150} w={90} h={170} color="#e8828c" label="I" />
        <Complex x={176} y={235} w={70} h={80} color="#a98bd6" label="II" />
        <Complex x={380} y={160} w={84} h={155} color="#6fa8dc" label="III" />
        <Complex x={560} y={160} w={84} h={155} color="#b07cc6" label="IV" />
        {/* ATP synthase: membrane rotor + stalk + F1 head */}
        <rect x="680" y={yTop - 6} width="70" height={yBot - yTop + 12} rx="14" fill="#e3b440" />
        <rect x="707" y={yBot} width="16" height="40" fill="#e3b440" />
        <ellipse cx="715" cy={yBot + 72} rx="44" ry="36" fill="#f0c95a" />
        <text x="715" y={yBot + 78} textAnchor="middle" fontSize="19" fontWeight="700" fill="#16222f">
          V
        </text>
        {/* cytochrome c on the IMS face */}
        <circle cx="510" cy="168" r="22" fill="#7cc58f" />
        <text x="510" y="173" textAnchor="middle" fontSize="15" fontWeight="600" fill="#0e3b22">
          cyt c
        </text>
        {/* CoQ10 pool, inside the bilayer */}
        <ellipse cx="312" cy="240" rx="44" ry="26" fill="url(#etc-q)" stroke="#a87b16" strokeWidth="1.5" />
        <text x="312" y="238" textAnchor="middle" fontSize="16" fontWeight="700" fill="#4a3304">
          CoQ10
        </text>
        <text x="312" y="254" textAnchor="middle" fontSize="14" fill="#4a3304">
          Q / QH₂
        </text>
      </Step>

      {/* Step 1 — NADH → complex I → Q */}
      <Step at={1} step={step}>
        <text x="100" y="372" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          NADH → NAD⁺
        </text>
        <path d="M 115 352 L 115 328" stroke={ink} strokeWidth="2" markerEnd="url(#etc-arrow-ink)" />
      </Step>
      <DrawPath at={1} step={step} d="M 160 236 C 200 205, 240 212, 266 232" stroke={e} strokeWidth={3.5} strokeDasharray="6 6" markerEnd="url(#etc-arrow-e)" flow />

      {/* Step 2 — succinate → complex II → Q */}
      <Step at={2} step={step}>
        <text x="222" y="410" textAnchor="middle" fontSize="15" fontWeight="600" fill={ink}>
          {tr('Succinate → Fumarate', 'Succinate → Fumarate')}
        </text>
        <text x="222" y="428" textAnchor="middle" fontSize="14" fill={muted}>
          (FADH₂)
        </text>
        <path d="M 211 390 L 211 322" stroke={ink} strokeWidth="2" markerEnd="url(#etc-arrow-ink)" />
      </Step>
      <DrawPath at={2} step={step} d="M 246 262 C 256 264, 264 260, 270 254" stroke={e} strokeWidth={3.5} strokeDasharray="6 6" markerEnd="url(#etc-arrow-e)" flow />

      {/* Step 3 — Q → III → cyt c → IV → O₂ */}
      <DrawPath at={3} step={step} d="M 356 240 L 380 240" stroke={e} strokeWidth={3.5} strokeDasharray="6 6" markerEnd="url(#etc-arrow-e)" flow />
      <DrawPath at={3} step={step} d="M 440 180 C 460 160, 475 158, 488 162" stroke={e} strokeWidth={3.5} strokeDasharray="6 6" markerEnd="url(#etc-arrow-e)" flow />
      <DrawPath at={3} step={step} d="M 532 162 C 548 158, 560 166, 568 180" stroke={e} strokeWidth={3.5} strokeDasharray="6 6" markerEnd="url(#etc-arrow-e)" flow />
      <Step at={3} step={step}>
        <text x="602" y="372" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          ½ O₂ + 2 H⁺ → H₂O
        </text>
        <path d="M 602 330 L 602 352" stroke={ink} strokeWidth="2" markerEnd="url(#etc-arrow-ink)" />
        <text x="312" y="300" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('e⁻ transportés par la CoQ10', 'e⁻ carried by CoQ10')}
        </text>
      </Step>

      {/* Step 4 — proton pumping */}
      <Step at={4} step={step}>
        {[115, 422, 602].map((x, i) => (
          <g key={x}>
            <path d={`M ${x} 140 L ${x} 70`} stroke={proton} strokeWidth="3" markerEnd="url(#etc-arrow-proton)" />
            <rect x={x - 26} y="36" width="52" height="26" rx="13" fill={proton} />
            <text x={x} y="54" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
              {i === 2 ? '2 H⁺' : '4 H⁺'}
            </text>
          </g>
        ))}
        {[[200, 90], [260, 130], [330, 70], [480, 100], [530, 60], [660, 110], [740, 70], [300, 160]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="11" fill={proton} opacity="0.18" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="14" fontWeight="700" fill={proton}>
              H⁺
            </text>
          </g>
        ))}
      </Step>

      {/* Step 5 — ATP synthase */}
      <Step at={5} step={step}>
        <path d="M 715 120 L 715 186" stroke={proton} strokeWidth="3" markerEnd="url(#etc-arrow-proton)" />
        <text x="715" y="110" textAnchor="middle" fontSize="15" fontWeight="700" fill={proton}>
          H⁺
        </text>
        <text x="640" y="440" textAnchor="end" fontSize="16" fontWeight="600" fill={ink}>
          ADP + Pi
        </text>
        <path d="M 648 435 L 690 435" stroke={ink} strokeWidth="2" markerEnd="url(#etc-arrow-ink)" />
        <rect x="694" y="418" width="64" height="32" rx="16" fill={gold} />
        <text x="726" y="440" textAnchor="middle" fontSize="17" fontWeight="800" fill="#2b1d00">
          ATP
        </text>
      </Step>
    </svg>
  )
}

function Complex({ x, y, w, h, color, label }: { x: number; y: number; w: number; h: number; color: string; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={Math.min(w, h) / 2.4} fill={color} />
      <rect x={x + 6} y={y + 6} width={w * 0.35} height={h - 12} rx={w * 0.17} fill="white" opacity="0.18" />
      <text x={x + w / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize="23" fontWeight="700" fill="#16222f">
        {label}
      </text>
    </g>
  )
}
