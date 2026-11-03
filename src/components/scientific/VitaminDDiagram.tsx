import liverImg from '../../assets/scientific/liver.jpg'
import kidneyImg from '../../assets/scientific/kidney.jpg'
import intestineImg from '../../assets/scientific/intestine.jpg'
import { ArrowDefs, DrawPath, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

/**
 * Vitamin D activation and the vitamin K–dependent carboxylation of osteocalcin.
 * Refs: Holick 2007; NIH ODS vitamin D & K fact sheets.
 * Steps: 0 skin/diet · 1 liver · 2 kidney · 3 intestine · 4 bone + vitamin K
 */
export function VitaminDDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const ink = '#16222f'
  const muted = '#5a6675'
  const sun = '#c98a12'
  const k = '#2f8a57'

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Métabolisme de la vitamine D', 'Vitamin D metabolism')} style={FONT}>
      <ArrowDefs prefix="vitd" colors={{ ink, sun, k }} />

      {/* Step 0 — sources */}
      <Step at={0} step={step}>
        <g transform="translate(90 120)">
          <circle r="26" fill="#ffd56b" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4
            return <line key={i} x1={Math.cos(a) * 34} y1={Math.sin(a) * 34} x2={Math.cos(a) * 46} y2={Math.sin(a) * 46} stroke="#e9b23a" strokeWidth="4" strokeLinecap="round" />
          })}
        </g>
        <text x="90" y="200" textAnchor="middle" fontSize="15" fontWeight="600" fill={ink}>
          {tr('Peau (UVB)', 'Skin (UVB)')}
        </text>
        <text x="90" y="218" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('+ alimentation', '+ diet')}
        </text>
        <rect x="40" y="250" width="100" height="34" rx="17" fill={sun} />
        <text x="90" y="272" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
          D3
        </text>
      </Step>

      {/* Step 1 — liver */}
      <DrawPath at={1} step={step} d="M 145 267 L 222 267" stroke={sun} strokeWidth={3} markerEnd="url(#vitd-arrow-sun)" />
      <Step at={1} step={step}>
        <image href={liverImg} x="228" y="58" width="158" height="158" preserveAspectRatio="xMidYMid meet" />
        <text x="307" y="232" textAnchor="middle" fontSize="16" fontWeight="700" fill="#6e2a14">
          {tr('Foie', 'Liver')}
        </text>
        <rect x="230" y="250" width="150" height="34" rx="17" fill={sun} />
        <text x="305" y="272" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
          25(OH)D
        </text>
        <text x="305" y="304" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('calcidiol — marqueur du statut', 'calcidiol — status marker')}
        </text>
      </Step>

      {/* Step 2 — kidney */}
      <DrawPath at={2} step={step} d="M 385 267 L 452 267" stroke={sun} strokeWidth={3} markerEnd="url(#vitd-arrow-sun)" />
      <Step at={2} step={step}>
        <image href={kidneyImg} x="455" y="52" width="162" height="162" preserveAspectRatio="xMidYMid meet" />
        <text x="536" y="228" textAnchor="middle" fontSize="16" fontWeight="700" fill="#5d1f1f">
          {tr('Rein', 'Kidney')}
        </text>
        <rect x="458" y="250" width="160" height="34" rx="17" fill="#a86e0c" />
        <text x="538" y="272" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
          1,25(OH)₂D
        </text>
        <text x="538" y="304" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('calcitriol — forme active', 'calcitriol — active form')}
        </text>
      </Step>

      {/* Step 3 — intestine */}
      <DrawPath at={3} step={step} d="M 622 267 C 660 267, 680 210, 700 175" stroke={sun} strokeWidth={3} markerEnd="url(#vitd-arrow-sun)" />
      <Step at={3} step={step}>
        <text x="710" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink}>
          {tr('Intestin', 'Intestine')}
        </text>
        <text x="710" y="48" textAnchor="middle" fontSize="14" fontWeight="600" fill={ink}>
          {tr('Absorption Ca²⁺ · P ↑', 'Ca²⁺ · P absorption ↑')}
        </text>
        <image href={intestineImg} x="638" y="54" width="148" height="148" preserveAspectRatio="xMidYMid meet" />
      </Step>

      {/* Step 4 — bone & vitamin K */}
      <DrawPath at={4} step={step} d="M 700 245 C 700 320, 640 360, 560 380" stroke={sun} strokeWidth={3} markerEnd="url(#vitd-arrow-sun)" />
      <Step at={4} step={step}>
        <g transform="translate(470 390)">
          <path d="M -70 -10 L 70 -10 L 70 10 L -70 10 Z" fill="#f4ece0" stroke="#a89a80" strokeWidth="2" />
          {[-70, 70].map((x) => (
            <g key={x}>
              <circle cx={x} cy="-12" r="16" fill="#f4ece0" stroke="#a89a80" strokeWidth="2" />
              <circle cx={x} cy="12" r="16" fill="#f4ece0" stroke="#a89a80" strokeWidth="2" />
            </g>
          ))}
          <rect x="-66" y="-9" width="132" height="18" fill="#f4ece0" />
        </g>
        <text x="470" y="440" textAnchor="middle" fontSize="16" fontWeight="700" fill={ink}>
          {tr('Os', 'Bone')}
        </text>
        <rect x="50" y="350" width="290" height="96" rx="16" fill="#e6efe7" stroke={k} strokeOpacity="0.35" />
        <text x="70" y="378" fontSize="16" fontWeight="700" fill={k}>
          {tr('Vitamine K2 (MK-7)', 'Vitamin K2 (MK-7)')}
        </text>
        <text x="70" y="402" fontSize="14" fill={ink}>
          {tr('Ostéocalcine → ostéocalcine carboxylée', 'Osteocalcin → carboxylated osteocalcin')}
        </text>
        <text x="70" y="424" fontSize="14" fill={ink}>
          {tr('(résidus Gla) qui fixe le Ca²⁺', '(Gla residues) that binds Ca²⁺')}
        </text>
        <path d="M 340 398 L 392 392" stroke={k} strokeWidth="2.5" markerEnd="url(#vitd-arrow-k)" />
      </Step>
    </svg>
  )
}
