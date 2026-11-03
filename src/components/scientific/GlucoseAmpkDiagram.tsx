import { motion } from 'motion/react'
import { useSlide } from '../presentation/SlideContext'
import { ArrowDefs, FONT, Step, useTr, type DiagramProps } from './DiagramKit'

function Glucose({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,-11 10,-5.5 10,5.5 0,11 -10,5.5 -10,-5.5" fill="#e3862b" />
    </g>
  )
}

/**
 * Proposed AMPK-mediated effects of berberine (cell & animal models). Refs: Lee et al. 2006.
 * Steps: 0 cell + GLUT4 vesicles · 1 AMPK activation · 2 GLUT4 translocation, glucose uptake · 3 liver
 */
export function GlucoseAmpkDiagram({ step, className = '' }: DiagramProps) {
  const tr = useTr()
  const { isPrint } = useSlide()
  const ink = '#16222f'
  const muted = '#5a6675'
  const green = '#2f8a57'
  const amber = '#c25b2a'
  const moved = step >= 2

  const vesicles = [
    { x: 150, y: 330, tx: 150 },
    { x: 260, y: 360, tx: 260 },
    { x: 370, y: 320, tx: 370 },
  ]

  return (
    <svg viewBox="0 0 800 470" className={className} role="img" aria-label={tr('Berbérine, AMPK et glucose', 'Berberine, AMPK and glucose')} style={FONT}>
      <ArrowDefs prefix="glu" colors={{ ink, green, amber }} />

      {/* Step 0 — muscle cell */}
      <Step at={0} step={step}>
        <rect x="60" y="150" width="420" height="290" rx="36" fill="#fbeadf" stroke={amber} strokeWidth="4" />
        <text x="80" y="428" fontSize="15" fontWeight="600" fill={muted} letterSpacing="1">
          {tr('CELLULE MUSCULAIRE', 'MUSCLE CELL')}
        </text>
        {[90, 170, 330, 420, 140, 400].map((x, i) => (
          <Glucose key={i} x={x} y={i < 4 ? 100 : 60} />
        ))}
        <text x="270" y="40" textAnchor="middle" fontSize="15" fill={muted}>
          {tr('Glucose sanguin', 'Blood glucose')}
        </text>
      </Step>

      {/* GLUT4 vesicles — move to the membrane at step 2 */}
      {vesicles.map((v, i) => {
        const target = { y: moved ? 150 - v.y + 6 : 0 }
        const content = (
          <g>
            <circle cx={v.x} cy={v.y} r="22" fill="#fff" stroke={amber} strokeWidth="2" />
            <rect x={v.x - 6} y={v.y - 14} width="12" height="28" rx="4" fill={green} />
          </g>
        )
        return (
          <Step key={i} at={0} step={step}>
            {isPrint ? (
              <g transform={`translate(0 ${target.y})`}>{content}</g>
            ) : (
              <motion.g initial={false} animate={target} transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                {content}
              </motion.g>
            )}
          </Step>
        )
      })}
      <Step at={0} step={step}>
        <text x="330" y="408" fontSize="14" fill={muted}>
          {tr('Vésicules GLUT4', 'GLUT4 vesicles')}
        </text>
      </Step>

      {/* Step 1 — berberine → AMP/ATP ↑ → AMPK */}
      <Step at={1} step={step}>
        <rect x="520" y="40" width="150" height="38" rx="19" fill={amber} />
        <text x="595" y="65" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
          {tr('Berbérine', 'Berberine')}
        </text>
        <path d="M 560 82 C 520 140, 470 190, 420 225" stroke={amber} strokeWidth="2.5" fill="none" markerEnd="url(#glu-arrow-amber)" />
        <text x="300" y="258" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          AMP/ATP ↑
        </text>
        <circle cx="390" cy="245" r="34" fill={green} />
        <text x="390" y="251" textAnchor="middle" fontSize="17" fontWeight="800" fill="white">
          AMPK
        </text>
      </Step>

      {/* Step 2 — glucose enters through GLUT4 */}
      <Step at={2} step={step}>
        {vesicles.map((v) => (
          <g key={v.x}>
            <path d={`M ${v.x} 108 L ${v.x} 192`} stroke={green} strokeWidth="2.5" markerEnd="url(#glu-arrow-green)" />
            <Glucose x={v.x + 26} y={212} s={0.8} />
          </g>
        ))}
        <text x="270" y="290" textAnchor="middle" fontSize="16" fontWeight="600" fill={green}>
          {tr('Captation du glucose ↑', 'Glucose uptake ↑')}
        </text>
      </Step>

      {/* Step 3 — liver */}
      <Step at={3} step={step}>
        <path
          d="M 540 230 C 560 180, 680 170, 740 200 C 770 215, 760 260, 720 290 C 680 320, 600 330, 560 300 C 530 280, 528 255, 540 230 Z"
          fill="#f3d9cf"
          stroke="#a8492a"
          strokeWidth="3"
        />
        <text x="648" y="258" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7a3119">
          {tr('Foie', 'Liver')}
        </text>
        <text x="648" y="365" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          {tr('Néoglucogenèse ↓', 'Gluconeogenesis ↓')}
        </text>
        <text x="648" y="388" textAnchor="middle" fontSize="16" fontWeight="600" fill={ink}>
          {tr('Lipogenèse ↓', 'Lipogenesis ↓')}
        </text>
        <text x="648" y="412" textAnchor="middle" fontSize="14" fill={muted}>
          {tr('(modèles animaux)', '(animal models)')}
        </text>
      </Step>
    </svg>
  )
}
