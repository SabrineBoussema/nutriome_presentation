import { FONT, Step, useTr, type DiagramProps } from './DiagramKit'

/**
 * Arterial cross-section with the electrolytes and polyphenols discussed for BioTenseur.
 * Refs: NIH ODS potassium & magnesium; Lockyer et al. 2017.
 * Steps: 0 wall layers · 1 K⁺ / Mg²⁺ · 2 olive polyphenols on endothelium · 3 multifactorial regulation
 */
export function VascularDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = '#16222f'
  const muted = '#5a6675'
  const rose = '#b23a48'
  const cx = 290
  const cy = 235
  const spindles = Array.from({ length: 22 }, (_, i) => (i * 360) / 22)

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Coupe d’une artère', 'Artery cross-section')} style={FONT}>
      {/* Step 0 — layers */}
      <Step at={0} step={step}>
        <circle cx={cx} cy={cy} r="200" fill="#f6e6dc" stroke="#d9b8a4" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="160" fill="#f0c9c9" />
        {spindles.map((a) => (
          <ellipse key={a} cx={cx} cy={cy - 140} rx="22" ry="7" fill="#d98f95" transform={`rotate(${a} ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r="112" fill="#fff4f4" stroke={rose} strokeWidth="5" />
        <circle cx={cx} cy={cy} r="104" fill="#fde9ea" />
        {[[-40, -30], [30, -50], [10, 20], [-50, 40], [55, 35], [-5, -70]].map(([dx, dy], i) => (
          <ellipse key={i} cx={cx + dx} cy={cy + dy} rx="17" ry="11" fill="#d2484f" opacity="0.8" />
        ))}
        {/* layer labels */}
        <line x1={cx + 175} y1={cy - 90} x2="540" y2="70" stroke={muted} strokeWidth="1" />
        <text x="548" y="74" fontSize="15" fill={ink}>
          {tr('Adventice', 'Adventitia')}
        </text>
        <line x1={cx + 135} y1={cy - 45} x2="540" y2="110" stroke={muted} strokeWidth="1" />
        <text x="548" y="114" fontSize="15" fill={ink}>
          {tr('Muscle lisse (média)', 'Smooth muscle (media)')}
        </text>
        <line x1={cx + 108} y1={cy - 10} x2="540" y2="150" stroke={muted} strokeWidth="1" />
        <text x="548" y="154" fontSize="15" fill={ink}>
          {tr('Endothélium', 'Endothelium')}
        </text>
      </Step>

      {/* Step 1 — electrolytes */}
      <Step at={1} step={step}>
        {[
          { a: 200, label: 'K⁺', c: '#7a4fb0' },
          { a: 250, label: 'Mg²⁺', c: '#1b6fa8' },
          { a: 310, label: 'K⁺', c: '#7a4fb0' },
          { a: 140, label: 'Mg²⁺', c: '#1b6fa8' },
        ].map(({ a, label, c }) => {
          const r = (a * Math.PI) / 180
          const x = cx + Math.cos(r) * 140
          const y = cy + Math.sin(r) * 140
          return (
            <g key={a}>
              <circle cx={x} cy={y} r="19" fill={c} />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
                {label}
              </text>
            </g>
          )
        })}
        <rect x="540" y="200" width="230" height="58" rx="14" fill="white" stroke="#1b6fa8" strokeOpacity="0.35" />
        <text x="556" y="224" fontSize="15" fontWeight="700" fill={ink}>
          {tr('Potassium & magnésium', 'Potassium & magnesium')}
        </text>
        <text x="556" y="244" fontSize="14" fill={muted}>
          {tr('équilibre électrolytique, muscle', 'electrolyte balance, muscle')}
        </text>
      </Step>

      {/* Step 2 — polyphenols */}
      <Step at={2} step={step}>
        {[[-60, -60], [70, -40], [-70, 55], [60, 70]].map(([dx, dy], i) => (
          <g key={i} transform={`translate(${cx + dx} ${cy + dy})`}>
            <polygon points="0,-9 8,-4.5 8,4.5 0,9 -8,4.5 -8,-4.5" fill="#6b8f2a" />
          </g>
        ))}
        <rect x="540" y="276" width="230" height="58" rx="14" fill="white" stroke="#6b8f2a" strokeOpacity="0.45" />
        <text x="556" y="300" fontSize="15" fontWeight="700" fill={ink}>
          {tr('Polyphénols de l’olivier', 'Olive polyphenols')}
        </text>
        <text x="556" y="320" fontSize="14" fill={muted}>
          {tr('effets endothéliaux étudiés', 'endothelial effects under study')}
        </text>
      </Step>

      {/* Step 3 — multifactorial */}
      <Step at={3} step={step}>
        <rect x="540" y="352" width="230" height="92" rx="14" fill={rose} />
        <text x="556" y="378" fontSize="15" fontWeight="700" fill="white">
          {tr('Régulation multifactorielle', 'Multifactorial regulation')}
        </text>
        <text x="556" y="400" fontSize="14" fill="white" opacity="0.9">
          {tr('cœur · rein · système nerveux', 'heart · kidney · nervous system')}
        </text>
        <text x="556" y="420" fontSize="14" fill="white" opacity="0.9">
          {tr('tonus vasculaire · hormones', 'vascular tone · hormones')}
        </text>
      </Step>
    </svg>
  )
}
