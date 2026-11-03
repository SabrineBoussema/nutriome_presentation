import { motion } from 'motion/react'
import { useSlide } from '../../presentation/SlideContext'
import { FONT } from '../DiagramKit'

/*
 * Simplified 2-D schematics of the three magnesium forms in Bio3Mag.
 * Not to scale; solid-state structure (hydration, polymeric packing) depends on the supplier's material.
 *  - Bisglycinate: Mg²⁺ chelated by two glycinate ligands, each binding through the amino N and a carboxylate O
 *    (two five-membered chelate rings).
 *  - Malate: Mg²⁺ associated with the malate dianion (⁻OOC–CH₂–CH(OH)–COO⁻).
 *  - Citrate: trivalent citrate; trimagnesium dicitrate = 3 Mg²⁺ for 2 citrate³⁻.
 */

const C = { bond: '#16222f', o: '#c4525f', n: '#1b6fa8', c: '#16222f', mg: '#1b6fa8' }

function Atom({ x, y, label, color = C.c, size = 15 }: { x: number; y: number; label: string; color?: string; size?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={size * 0.95} fill="#fffdf8" />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontSize={size} fontWeight="600" fill={color}>
        {label}
      </text>
    </g>
  )
}

function Bond({ a, b, double = false, coord = false }: { a: [number, number]; b: [number, number]; double?: boolean; coord?: boolean }) {
  const [x1, y1] = a
  const [x2, y2] = b
  if (coord) return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.mg} strokeWidth="2.5" strokeDasharray="5 4" />
  if (!double) return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.bond} strokeWidth="2.2" />
  const len = Math.hypot(x2 - x1, y2 - y1)
  const ox = (-(y2 - y1) / len) * 3.5
  const oy = ((x2 - x1) / len) * 3.5
  return (
    <g stroke={C.bond} strokeWidth="2.2">
      <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy} />
      <line x1={x1 - ox} y1={y1 - oy} x2={x2 - ox} y2={y2 - oy} />
    </g>
  )
}

function MgIon({ x, y, r = 24 }: { x: number; y: number; r?: number }) {
  const { isPrint } = useSlide()
  return (
    <g>
      {!isPrint && (
        <motion.circle
          cx={x}
          cy={y}
          r={r + 8}
          fill="#1b6fa8"
          opacity={0.15}
          animate={{ r: [r + 4, r + 12, r + 4], opacity: [0.18, 0.05, 0.18] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <circle cx={x} cy={y} r={r} fill="url(#mg-grad)" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={r * 0.62} fontWeight="700" fill="white">
        Mg²⁺
      </text>
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <radialGradient id="mg-grad" cx="0.35" cy="0.3">
        <stop offset="0" stopColor="#bfe0f5" />
        <stop offset="0.55" stopColor="#4c9bd0" />
        <stop offset="1" stopColor="#14507c" />
      </radialGradient>
    </defs>
  )
}

export function BisglycinateMolecule({ className = '' }: { className?: string }) {
  const mirror = (p: [number, number]): [number, number] => [360 - p[0], p[1]]
  const O1: [number, number] = [128, 92]
  const C1: [number, number] = [82, 112]
  const O2: [number, number] = [56, 76]
  const C2: [number, number] = [84, 170]
  const N: [number, number] = [132, 178]
  const Mg: [number, number] = [180, 135]
  const side = (m: (p: [number, number]) => [number, number]) => (
    <>
      <Bond a={m(O1)} b={m(C1)} />
      <Bond a={m(C1)} b={m(O2)} double />
      <Bond a={m(C1)} b={m(C2)} />
      <Bond a={m(C2)} b={m(N)} />
      <Bond a={m(O1)} b={Mg} coord />
      <Bond a={m(N)} b={Mg} coord />
      <Atom x={m(O1)[0]} y={m(O1)[1]} label="O" color={C.o} />
      <Atom x={m(C1)[0]} y={m(C1)[1]} label="C" />
      <Atom x={m(O2)[0]} y={m(O2)[1]} label="O" color={C.o} />
      <Atom x={m(C2)[0]} y={m(C2)[1]} label="CH₂" size={13} />
      <Atom x={m(N)[0]} y={m(N)[1]} label="NH₂" color={C.n} size={13} />
    </>
  )
  return (
    <svg viewBox="0 0 360 250" className={className} style={FONT} role="img" aria-label="Magnesium bisglycinate">
      <Defs />
      {side((p) => p)}
      {side(mirror)}
      <MgIon x={Mg[0]} y={Mg[1]} />
      <text x="180" y="236" textAnchor="middle" fontSize="14" fill="#5a6675">
        Mg(C₂H₄NO₂)₂
      </text>
    </svg>
  )
}

export function MalateMolecule({ className = '' }: { className?: string }) {
  const C1: [number, number] = [86, 78]
  const Oa: [number, number] = [50, 48]
  const Ob: [number, number] = [86, 128]
  const C2: [number, number] = [142, 100]
  const C3: [number, number] = [200, 72]
  const OH: [number, number] = [200, 28]
  const C4: [number, number] = [258, 100]
  const Oc: [number, number] = [306, 84]
  const Od: [number, number] = [258, 150]
  const Mg: [number, number] = [172, 186]
  return (
    <svg viewBox="0 0 360 250" className={className} style={FONT} role="img" aria-label="Magnesium malate">
      <Defs />
      <Bond a={C1} b={Oa} double />
      <Bond a={C1} b={Ob} />
      <Bond a={C1} b={C2} />
      <Bond a={C2} b={C3} />
      <Bond a={C3} b={OH} />
      <Bond a={C3} b={C4} />
      <Bond a={C4} b={Oc} double />
      <Bond a={C4} b={Od} />
      <Bond a={Ob} b={Mg} coord />
      <Bond a={Od} b={Mg} coord />
      <Atom x={C1[0]} y={C1[1]} label="C" />
      <Atom x={Oa[0]} y={Oa[1]} label="O" color={C.o} />
      <Atom x={Ob[0]} y={Ob[1]} label="O⁻" color={C.o} />
      <Atom x={C2[0]} y={C2[1]} label="CH₂" size={13} />
      <Atom x={C3[0]} y={C3[1]} label="CH" size={13} />
      <Atom x={OH[0]} y={OH[1]} label="OH" color={C.o} size={13} />
      <Atom x={C4[0]} y={C4[1]} label="C" />
      <Atom x={Oc[0]} y={Oc[1]} label="O" color={C.o} />
      <Atom x={Od[0]} y={Od[1]} label="O⁻" color={C.o} />
      <MgIon x={Mg[0]} y={Mg[1]} />
      <text x="180" y="240" textAnchor="middle" fontSize="14" fill="#5a6675">
        Mg²⁺ · C₄H₄O₅²⁻
      </text>
    </svg>
  )
}

export function CitrateMolecule({ className = '' }: { className?: string }) {
  const Cc: [number, number] = [180, 92]
  const OH: [number, number] = [180, 44]
  const L1: [number, number] = [124, 116]
  const L2: [number, number] = [74, 92]
  const LOa: [number, number] = [50, 56]
  const LOb: [number, number] = [54, 134]
  const R1: [number, number] = [236, 116]
  const R2: [number, number] = [286, 92]
  const ROa: [number, number] = [310, 56]
  const ROb: [number, number] = [306, 134]
  const M: [number, number] = [180, 146]
  const MOa: [number, number] = [218, 172]
  const MOb: [number, number] = [146, 172]
  return (
    <svg viewBox="0 0 360 250" className={className} style={FONT} role="img" aria-label="Magnesium citrate">
      <Defs />
      <Bond a={Cc} b={OH} />
      <Bond a={Cc} b={L1} />
      <Bond a={L1} b={L2} />
      <Bond a={L2} b={LOa} double />
      <Bond a={L2} b={LOb} />
      <Bond a={Cc} b={R1} />
      <Bond a={R1} b={R2} />
      <Bond a={R2} b={ROa} double />
      <Bond a={R2} b={ROb} />
      <Bond a={Cc} b={M} />
      <Bond a={M} b={MOa} double />
      <Bond a={M} b={MOb} />
      <Bond a={LOb} b={[62, 196]} coord />
      <Bond a={MOb} b={[62, 196]} coord />
      <Bond a={ROb} b={[300, 196]} coord />
      <Atom x={Cc[0]} y={Cc[1]} label="C" />
      <Atom x={OH[0]} y={OH[1]} label="OH" color={C.o} size={13} />
      <Atom x={L1[0]} y={L1[1]} label="CH₂" size={13} />
      <Atom x={L2[0]} y={L2[1]} label="C" />
      <Atom x={LOa[0]} y={LOa[1]} label="O" color={C.o} />
      <Atom x={LOb[0]} y={LOb[1]} label="O⁻" color={C.o} />
      <Atom x={R1[0]} y={R1[1]} label="CH₂" size={13} />
      <Atom x={R2[0]} y={R2[1]} label="C" />
      <Atom x={ROa[0]} y={ROa[1]} label="O" color={C.o} />
      <Atom x={ROb[0]} y={ROb[1]} label="O⁻" color={C.o} />
      <Atom x={M[0]} y={M[1]} label="C" />
      <Atom x={MOa[0]} y={MOa[1]} label="O" color={C.o} />
      <Atom x={MOb[0]} y={MOb[1]} label="O⁻" color={C.o} />
      <MgIon x={62} y={196} r={20} />
      <MgIon x={300} y={196} r={20} />
      <text x="180" y="240" textAnchor="middle" fontSize="14" fill="#5a6675">
        Mg₃(C₆H₅O₇)₂ — 3 Mg²⁺ : 2 citrate³⁻
      </text>
    </svg>
  )
}
