import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { MgIon, PathParticles, RuntimeContext } from '../mechanisms/kit'
import { useSlide } from '../presentation/SlideContext'

export const MALATE = '#c9752c'
export const CITRATE = '#1b6fa8'
export const BISGLY = '#1d5a39'
export const MG = '#1b6fa8'

/** Provides reduced-motion / print flags to the SMIL particles used in these slides. */
export function MotionRuntime({ children }: { children: ReactNode }) {
  const { isPrint } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  return (
    <RuntimeContext.Provider value={{ paused: false, reduced }}>
      <div className={reduced ? 'mech-reduced contents' : 'contents'}>{children}</div>
    </RuntimeContext.Provider>
  )
}

/** Malate: mitochondrion with the Krebs cycle (malate highlighted) producing ATP */
export function MiniMito({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden>
      <ellipse cx={150} cy={82} rx={128} ry={64} fill="#fdf0e3" stroke={MALATE} strokeWidth={3} />
      <path
        d="M36 82 C42 52 62 52 66 82 C70 112 92 112 96 82 C100 52 122 52 126 82 M174 82 C178 52 200 52 204 82 C208 112 230 112 234 82 C238 52 258 52 264 80"
        fill="none"
        stroke="#e4ae7c"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <g transform="translate(150,82)">
        <g className="mech-anim mech-spin">
          <circle r={26} fill="none" stroke={MALATE} strokeWidth={2} strokeDasharray="5 5" />
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const a = (k / 6) * Math.PI * 2
            return <circle key={k} cx={Math.cos(a) * 26} cy={Math.sin(a) * 26} r={k === 2 ? 7 : 4} fill={k === 2 ? MALATE : '#e8b98c'} />
          })}
        </g>
        <text y={4} textAnchor="middle" fontSize={10} fontWeight={700} fill={MALATE}>
          Krebs
        </text>
      </g>
      <PathParticles d="M176 82 C210 40 250 30 292 20" count={3} dur={2.8} r={10} label="ATP" fill={MALATE} />
    </svg>
  )
}

/** Citrate: muscle fibre bundle and a sarcomere contracting / relaxing */
export function MiniMuscle({ className = '' }: { className?: string }) {
  const rows = [56, 82, 108]
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden>
      {rows.map((y) => (
        <rect key={y} x={100} y={y + 4} width={100} height={8} rx={4} fill={CITRATE} opacity={0.85} />
      ))}
      <g className="mech-anim mech-mini-left">
        <path d="M40 40 l-6 12 l12 12 l-12 12 l12 12 l-12 12 l12 12 l-6 12" fill="none" stroke="#16222f" strokeWidth={3} strokeLinejoin="round" />
        {rows.map((y) => (
          <rect key={y} x={40} y={y} width={92} height={4} rx={2} fill="#e08f7f" />
        ))}
      </g>
      <g className="mech-anim mech-mini-right">
        <path d="M260 40 l-6 12 l12 12 l-12 12 l12 12 l-12 12 l12 12 l-6 12" fill="none" stroke="#16222f" strokeWidth={3} strokeLinejoin="round" />
        {rows.map((y) => (
          <rect key={y} x={168} y={y + 14} width={92} height={4} rx={2} fill="#e08f7f" />
        ))}
      </g>
      <MgIon x={150} y={142} r={12} />
      <text x={170} y={146} fontSize={11} fill="#46515e">
        relaxation
      </text>
      <circle cx={112} cy={142} r={9} fill="#e3862b" />
      <text x={64} y={146} fontSize={11} fill="#46515e">
        contraction
      </text>
    </svg>
  )
}

/** Bisglycinate: neuron with an impulse, above a calm intestinal segment */
export function MiniNeuronGut({ className = '' }: { className?: string }) {
  const axon = 'M70 50 C110 50 120 34 160 34 C200 34 210 50 270 50'
  return (
    <svg viewBox="0 0 300 160" className={className} aria-hidden>
      <g stroke={BISGLY} strokeLinecap="round" fill="none">
        <path d="M44 44 L20 24 M40 56 L16 66 M50 36 L50 14" strokeWidth={3} />
        <path d={axon} strokeWidth={3.5} />
      </g>
      <circle cx={52} cy={50} r={17} fill="#e3efe6" stroke={BISGLY} strokeWidth={2.5} />
      <PathParticles d={axon} count={2} dur={1.8} r={6} fill="#e3862b" stroke="#fff7ec" />
      <g className="mech-anim mech-wave">
        <path d="M20 118 C60 98 100 138 150 118 C200 98 240 138 280 118" fill="none" stroke="#efb9a8" strokeWidth={16} strokeLinecap="round" />
        <path d="M20 118 C60 98 100 138 150 118 C200 98 240 138 280 118" fill="none" stroke="#f8d9cf" strokeWidth={6} strokeLinecap="round" />
      </g>
      <text x={150} y={154} textAnchor="middle" fontSize={11} fill="#46515e">
        recherche de confort digestif
      </text>
    </svg>
  )
}
