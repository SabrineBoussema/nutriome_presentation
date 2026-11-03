import { motion } from 'motion/react'
import { useSlide } from '../presentation/SlideContext'
import { ArrowDefs, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

const CX = 400
const CY = 240
const RX_OUT = 340
const RY_OUT = 180
const RX_IN = 312
const RY_IN = 152

/** y of the inner ellipse at a given x (upper or lower half) */
function innerY(x: number, upper: boolean) {
  const dx = (x - CX) / RX_IN
  const dy = RY_IN * Math.sqrt(Math.max(0, 1 - dx * dx))
  return upper ? CY - dy : CY + dy
}

/**
 * Stylised mitochondrion: outer membrane, inner membrane folded into cristae, matrix with Krebs cycle.
 * Steps: 0 outer membrane · 1 inner membrane & cristae · 2 matrix / Krebs → NADH, FADH₂
 */
export function MitochondrionDiagram({ step, dark = true, className = '' }: DiagramProps) {
  const tr = useTr()
  const { isPrint } = useSlide()
  const outer = dark ? '#d9a93b' : '#b8862b'
  const inner = dark ? '#f0c95a' : '#c9a24b'
  const ims = dark ? '#1a2b40' : '#fbf4e4'
  const matrix = dark ? '#132338' : '#fffaf0'
  const label = dark ? '#e9eef5' : '#16222f'
  const muted = dark ? 'rgb(233 238 245 / 0.65)' : '#5a6675'

  const cristae = [150, 230, 310, 490, 570, 650].map((x, i) => {
    const upper = i % 2 === 0
    const edge = innerY(x, upper)
    const depth = 118 - Math.abs(x - CX) * 0.18
    const end = upper ? edge + depth : edge - depth
    const dir = upper ? 1 : -1
    return { x, edge, end, dir }
  })

  return (
    <svg viewBox="0 0 800 480" className={className} role="img" aria-label={tr('Schéma d’une mitochondrie', 'Mitochondrion schematic')} style={FONT}>
      <ArrowDefs prefix="mito" colors={{ gold: inner, label }} />
      <defs>
        <radialGradient id="mito-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor={outer} stopOpacity="0.28" />
          <stop offset="1" stopColor={outer} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={CX} cy={CY} rx={RX_OUT + 50} ry={RY_OUT + 50} fill="url(#mito-glow)" />

      {/* Step 0 — outer membrane */}
      <Step at={0} step={step}>
        <ellipse cx={CX} cy={CY} rx={RX_OUT} ry={RY_OUT} fill={ims} stroke={outer} strokeWidth="7" />
        <text x={CX + RX_OUT - 10} y={CY - RY_OUT - 8} textAnchor="end" fontSize="16" fontWeight="600" fill={muted}>
          {tr('Membrane externe', 'Outer membrane')}
        </text>
      </Step>

      {/* Step 1 — inner membrane with cristae */}
      <Step at={1} step={step} dim={0}>
        <ellipse cx={CX} cy={CY} rx={RX_IN} ry={RY_IN} fill={matrix} stroke={inner} strokeWidth="5" />
        {cristae.map(({ x, edge, end, dir }) => (
          <g key={x}>
            <path
              d={`M ${x - 13} ${edge - dir * 6} L ${x - 13} ${end - dir * 13} Q ${x - 13} ${end} ${x} ${end} Q ${x + 13} ${end} ${x + 13} ${end - dir * 13} L ${x + 13} ${edge - dir * 6} Z`}
              fill={ims}
            />
            <path
              d={`M ${x - 13} ${edge - dir * 4} L ${x - 13} ${end - dir * 13} Q ${x - 13} ${end} ${x} ${end} Q ${x + 13} ${end} ${x + 13} ${end - dir * 13} L ${x + 13} ${edge - dir * 4}`}
              fill="none"
              stroke={inner}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* ATP synthase knobs on the matrix side of each crista */}
            {[0.35, 0.7].map((f) => (
              <circle key={f} cx={x + 19} cy={edge + (end - edge) * f} r="4.5" fill={inner} opacity="0.9" />
            ))}
          </g>
        ))}
        <text x={CX - RX_IN + 30} y={CY + RY_IN + 52} fontSize="16" fontWeight="600" fill={muted}>
          {tr('Membrane interne & crêtes — chaîne respiratoire', 'Inner membrane & cristae — respiratory chain')}
        </text>
      </Step>

      {/* Step 2 — matrix & Krebs cycle */}
      <Step at={2} step={step}>
        <g transform={`translate(${CX} ${CY})`}>
          {isPrint ? (
            <circle r="46" fill="none" stroke={inner} strokeWidth="3" strokeDasharray="10 8" />
          ) : (
            <motion.circle
              r="46"
              fill="none"
              stroke={inner}
              strokeWidth="3"
              strokeDasharray="10 8"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
          )}
          <text y="-4" textAnchor="middle" fontSize="16" fontWeight="700" fill={label}>
            {tr('Cycle', 'Krebs')}
          </text>
          <text y="14" textAnchor="middle" fontSize="16" fontWeight="700" fill={label}>
            {tr('de Krebs', 'cycle')}
          </text>
          <path d="M 50 -20 L 120 -60" stroke={inner} strokeWidth="2.5" markerEnd="url(#mito-arrow-gold)" />
          <text x="128" y="-62" fontSize="16" fontWeight="700" fill={inner}>
            NADH
          </text>
          <path d="M 50 20 L 120 58" stroke={inner} strokeWidth="2.5" markerEnd="url(#mito-arrow-gold)" />
          <text x="128" y="72" fontSize="16" fontWeight="700" fill={inner}>
            FADH₂
          </text>
          <path d="M -120 0 L -52 0" stroke={label} strokeWidth="2" markerEnd="url(#mito-arrow-label)" />
          <text x="-128" y="5" textAnchor="end" fontSize="15" fill={muted}>
            Acétyl-CoA
          </text>
        </g>
        <text x={CX - 150} y={CY - 40} textAnchor="middle" fontSize="16" fontWeight="600" fill={muted}>
          {tr('Matrice', 'Matrix')}
        </text>
      </Step>
    </svg>
  )
}
