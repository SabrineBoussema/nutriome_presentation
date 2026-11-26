import { AnimatePresence } from 'motion/react'
import type { MechanismStage } from '../../data/mechanisms'
import type { Product } from '../../data/types'
import { BisglycinateMolecule, CitrateMolecule, MalateMolecule } from '../scientific/molecules/MagnesiumForms'
import { Appear, Callout, FONT_STYLE, Hotspot, INK, MG, MgIon, PathParticles, Scene, SLATE } from './kit'
import { MechanismEngine, type VisualContext } from './MechanismEngine'

/* Colour code of the three salts (the ion released is always the same Mg²⁺) */
const MALATE = '#c9752c'
const CITRATE = '#1b6fa8'
const BISGLY = '#1d5a39'
const PANEL_X = 350
const PANEL_W = 590
const PANEL_H = 520

/* ------------------------------------------------------------------ anatomy */

/** Body coordinates (0..300 × 0..580) are mapped to the visual with this transform. */
const BODY = { x: 0, y: 12, s: 0.92 }
const bx = (x: number) => BODY.x + x * BODY.s
const by = (y: number) => BODY.y + y * BODY.s

const HOTSPOTS: { id: string; stage: string; x: number; y: number; label: string; color: string; side: 'left' | 'right' }[] = [
  { id: 'brain', stage: 'nervous', x: bx(150), y: by(50), label: 'Système nerveux', color: BISGLY, side: 'right' },
  { id: 'mitochondria', stage: 'energy', x: bx(220), y: by(200), label: 'Mitochondries', color: MALATE, side: 'right' },
  { id: 'intestine', stage: 'absorption', x: bx(150), y: by(284), label: 'Intestin', color: '#0e7c86', side: 'right' },
  { id: 'muscle', stage: 'muscle', x: bx(126), y: by(402), label: 'Muscles', color: CITRATE, side: 'left' },
]

function Silhouette({ activeHotspot, highlightAll }: { activeHotspot?: string; highlightAll: boolean }) {
  const skin = '#dbe7f1'
  const leftLimbs = (
    <>
      <path d="M104 126 Q84 130 80 160 L70 236 Q64 270 62 318 Q61 330 66 338 L77 338 Q80 300 85 270 L97 208 Z" />
      <ellipse cx="70" cy="350" rx="10" ry="15" />
      <path d="M106 330 L149 334 L145 440 Q143 500 141 560 L118 562 Q114 500 112 444 Q103 380 106 330 Z" />
      <ellipse cx="128" cy="569" rx="17" ry="7" />
    </>
  )
  const on = (id: string) => highlightAll || activeHotspot === id
  return (
    <g transform={`translate(${BODY.x},${BODY.y}) scale(${BODY.s})`} aria-hidden>
      <g fill={skin}>
        <ellipse cx="150" cy="52" rx="32" ry="38" />
        <rect x="136" y="84" width="28" height="36" rx="8" />
        <path d="M104 124 Q150 108 196 124 Q212 130 210 160 L204 214 Q200 262 196 300 Q198 322 194 336 L106 336 Q102 322 104 300 Q100 262 96 214 L90 160 Q88 130 104 124 Z" />
        {leftLimbs}
        <g transform="translate(300,0) scale(-1,1)">{leftLimbs}</g>
      </g>
      {/* nervous system */}
      <g fill="none" stroke={BISGLY} strokeLinecap="round" opacity={on('brain') ? 0.75 : 0.28}>
        <path d="M150 74 L150 300" strokeWidth="3" />
        <path d="M150 140 Q118 150 96 200 L74 300 M150 140 Q182 150 204 200 L226 300 M150 300 Q138 340 130 430 L128 540 M150 300 Q162 340 170 430 L172 540" strokeWidth="1.6" />
      </g>
      {/* brain */}
      <g opacity={on('brain') ? 1 : 0.65}>
        <ellipse cx="150" cy="46" rx="25" ry="19" fill="#f2d9df" stroke="#d6a1ad" strokeWidth="1.5" />
        <path d="M131 44 q6 -8 12 0 t12 0 t12 0 M135 54 q6 -6 12 0 t12 0 M140 34 q5 -5 10 0 t10 0" fill="none" stroke="#c98d9a" strokeWidth="1.3" />
      </g>
      {/* intestines */}
      <g fill="none" strokeLinecap="round" opacity={on('intestine') ? 1 : 0.6}>
        <path d="M121 318 L121 258 Q121 250 129 250 L171 250 Q179 250 179 258 L179 318" stroke="#e3a08d" strokeWidth="9" />
        <path d="M132 264 q10 -6 18 0 t18 0 M132 278 q10 6 18 0 t18 0 M132 292 q10 -6 18 0 t18 0 M134 306 q8 6 16 0 t16 0" stroke="#efb9a8" strokeWidth="5.5" />
      </g>
      {/* muscles: right biceps (mitochondria hotspot) and left thigh */}
      <g opacity={on('mitochondria') || on('muscle') ? 0.95 : 0.55}>
        <ellipse cx="218" cy="196" rx="11" ry="34" transform="rotate(-9 218 196)" fill="#e9a99c" />
        <ellipse cx="127" cy="396" rx="17" ry="50" transform="rotate(3 127 396)" fill="#e9a99c" />
        <ellipse cx="173" cy="396" rx="17" ry="50" transform="rotate(-3 173 396)" fill="#efc1b6" />
        <path d="M120 360 Q124 396 120 440 M128 352 Q132 396 129 446 M136 360 Q139 396 136 440" fill="none" stroke="#d38a7c" strokeWidth="1.2" />
      </g>
    </g>
  )
}

/* ---------------------------------------------------------------- formula bar */

function FormulaBar({ highlight }: { highlight?: MechanismStage['highlight'] }) {
  const items = [
    { id: 'malate', name: 'Malate', dose: '150 mg', color: MALATE },
    { id: 'citrate', name: 'Citrate', dose: '200 mg', color: CITRATE },
    { id: 'bisglycinate', name: 'Bisglycinate', dose: '150 mg', color: BISGLY },
  ] as const
  const w = 168
  const gap = 12
  const x0 = (PANEL_W - (3 * w + 2 * gap)) / 2
  return (
    <g transform={`translate(0, ${PANEL_H - 52})`}>
      {items.map((it, i) => {
        const on = highlight === 'all' || highlight === it.id
        const x = x0 + i * (w + gap)
        return (
          <g key={it.id}>
            <rect x={x} y={0} width={w} height={36} rx={18} fill={on ? it.color : 'white'} stroke={it.color} strokeWidth={on ? 0 : 1.5} opacity={on ? 1 : 0.7} />
            <text x={x + w / 2} y={23} textAnchor="middle" fontSize={14.5} fontWeight={700} fill={on ? 'white' : it.color}>
              {it.name} · {it.dose}
            </text>
          </g>
        )
      })}
    </g>
  )
}

/* -------------------------------------------------------------------- scenes */

function AbsorptionScene() {
  const cells = Array.from({ length: 9 }, (_, i) => 18 + i * 62)
  const para = 'M150 96 C170 140 266 140 266 196 L266 300 C266 332 286 350 316 372'
  const trans = 'M455 96 C450 140 421 146 421 196 L421 300 C421 334 404 352 382 372'
  const blood = 'M14 372 L578 372'
  return (
    <Scene originX={0} originY={260}>
      <text x={20} y={32} fontSize={13} fontWeight={700} fill={SLATE} letterSpacing="2">
        LUMIÈRE INTESTINALE
      </text>
      {/* salts dissociating */}
      {[
        { x: 150, label: 'Malate de Mg', c: MALATE },
        { x: 300, label: 'Citrate de Mg', c: CITRATE },
        { x: 455, label: 'Bisglycinate de Mg', c: BISGLY },
      ].map((s) => (
        <g key={s.label}>
          <rect x={s.x - 70} y={50} width={140} height={30} rx={15} fill="white" stroke={s.c} strokeWidth={1.5} />
          <text x={s.x} y={70} textAnchor="middle" fontSize={13.5} fontWeight={700} fill={s.c}>
            {s.label}
          </text>
        </g>
      ))}
      <path d="M300 82 L300 128" stroke={SLATE} strokeWidth={1.5} strokeDasharray="4 4" markerEnd="url(#b3m-arrow)" />
      <Callout x={310} y={118} text="libèrent l’ion Mg²⁺" color={SLATE} size={13} weight={500} />
      {/* enterocytes with microvilli */}
      {cells.map((x, i) => (
        <g key={i}>
          <rect x={x} y={196} width={56} height={104} rx={10} fill="#fbe3dc" stroke="#e3a99b" strokeWidth={1.2} />
          <path d={Array.from({ length: 7 }, (_, k) => `M${x + 6 + k * 7.5} 196 l0 -9`).join(' ')} stroke="#e3a99b" strokeWidth={2} strokeLinecap="round" />
          <circle cx={x + 28} cy={258} r={9} fill="#e9b7aa" />
        </g>
      ))}
      {/* TRPM6/7 channel on the apical side of a cell */}
      <rect x={410} y={190} width={22} height={14} rx={4} fill={MG} />
      {/* blood vessel */}
      <rect x={10} y={344} width={570} height={56} rx={28} fill="#f7d6d3" stroke="#de9690" strokeWidth={1.5} />
      <PathParticles d={blood} count={8} dur={6} r={13} label="Mg²⁺" fill={MG} />
      <PathParticles d={para} count={4} dur={4.5} r={13} label="Mg²⁺" fill={MG} />
      <PathParticles d={trans} count={4} dur={4.5} r={13} label="Mg²⁺" fill={MG} />
      <Appear delay={0.6}>
        <Callout x={140} y={160} text="Voie paracellulaire" to={[262, 230]} anchor="middle" />
        <Callout x={520} y={160} text="Canal TRPM6/7" to={[432, 196]} anchor="middle" color={MG} />
        <Callout x={40} y={326} text="Entérocytes" color={SLATE} size={14} />
        <Callout x={40} y={430} text="Circulation sanguine" color="#b4524c" size={14} />
      </Appear>
    </Scene>
  )
}

function EnergyScene() {
  return (
    <Scene originX={0} originY={220}>
      {/* mitochondrion */}
      <ellipse cx={240} cy={210} rx={210} ry={128} fill="#fdf0e3" stroke={MALATE} strokeWidth={3} />
      <path
        d="M60 210 C70 150 100 150 104 210 C108 270 140 270 146 210 C152 150 186 150 190 210 C194 270 228 270 232 210 C236 150 270 150 274 210 C278 270 312 270 316 210 C320 150 354 150 358 210 C362 270 396 270 404 214"
        fill="none"
        stroke="#e0a26a"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <text x={240} y={66} textAnchor="middle" fontSize={13} fontWeight={700} fill={MALATE} letterSpacing="2">
        MITOCHONDRIE
      </text>
      {/* Krebs cycle, malate highlighted */}
      <Appear delay={0.4}>
        <g transform="translate(150,272)">
          <circle r={26} fill="none" stroke={MALATE} strokeWidth={2} strokeDasharray="5 5" className="mech-anim mech-dash" />
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const a = (k / 6) * Math.PI * 2 - Math.PI / 2
            return <circle key={k} cx={Math.cos(a) * 26} cy={Math.sin(a) * 26} r={k === 4 ? 7 : 4} fill={k === 4 ? MALATE : '#e8b98c'} />
          })}
        </g>
        <Callout x={60} y={372} text="Cycle de Krebs" color={MALATE} size={14} sub="dont le malate est un intermédiaire" />
      </Appear>
      {/* ATP synthase */}
      <g transform="translate(372,148)">
        <rect x={-6} y={0} width={12} height={34} rx={4} fill="#c98a4e" />
        <circle cx={0} cy={-8} r={14} fill="#e0a26a" stroke="#c98a4e" strokeWidth={2} />
      </g>
      <Callout x={330} y={116} text="ATP synthase" color={SLATE} size={13} weight={500} anchor="middle" />
      <PathParticles d="M372 140 C420 110 470 96 512 104" count={3} dur={3} r={14} label="ATP" fill={MALATE} />
      <PathParticles d="M560 14 C556 60 540 90 524 104" count={3} dur={3} r={11} label="Mg²⁺" fill={MG} />
      {/* Mg-ATP → cellular work */}
      <Appear delay={0.9}>
        <rect x={468} y={186} width={104} height={40} rx={20} fill="white" stroke={MG} strokeWidth={2} />
        <text x={520} y={212} textAnchor="middle" fontSize={16} fontWeight={800} fill={MG}>
          Mg-ATP
        </text>
        <path d="M520 132 L520 180" stroke={SLATE} strokeWidth={1.5} markerEnd="url(#b3m-arrow)" />
        <path d="M520 230 L520 276" stroke={SLATE} strokeWidth={1.5} markerEnd="url(#b3m-arrow)" />
        <rect x={452} y={282} width={136} height={92} rx={14} fill="#f3f7fb" stroke="#c9d7e5" />
        <text x={520} y={306} textAnchor="middle" fontSize={13.5} fontWeight={700} fill={INK}>
          Énergie utilisable
        </text>
        {['Kinases', 'Pompes ioniques', 'Contraction'].map((t, i) => (
          <text key={t} x={520} y={328 + i * 18} textAnchor="middle" fontSize={12.5} fill={SLATE}>
            {t}
          </text>
        ))}
      </Appear>
    </Scene>
  )
}

function MuscleScene() {
  const rows = [218, 258, 298, 338]
  const zLeft = 70
  const zRight = 520
  const zDisc = (x: number) => `M${x} 196 l-8 16 l16 16 l-16 16 l16 16 l-16 16 l16 16 l-16 16 l16 16 l-8 16`
  return (
    <Scene originX={0} originY={280}>
      {/* fibre bundle → myofibril */}
      <g transform="translate(40,34)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 14}, ${i * 22})`}>
            <rect x={0} y={0} width={210} height={20} rx={10} fill="#f0b4a6" stroke="#d98b7c" />
            {Array.from({ length: 12 }, (_, k) => (
              <line key={k} x1={14 + k * 16} y1={3} x2={14 + k * 16} y2={17} stroke="#d98b7c" strokeWidth={1.2} />
            ))}
          </g>
        ))}
        <text x={0} y={-10} fontSize={13} fontWeight={700} fill={SLATE} letterSpacing="2">
          FIBRE MUSCULAIRE
        </text>
      </g>
      <path d="M280 90 C330 100 360 140 380 176" fill="none" stroke="#9aa3ad" strokeDasharray="4 4" markerEnd="url(#b3m-arrow)" />
      <Callout x={392} y={124} text="Sarcomère" color={INK} size={15} />
      {/* thick filaments (myosin), static */}
      {rows.map((y) => (
        <g key={y}>
          <rect x={200} y={y + 10} width={190} height={10} rx={5} fill={CITRATE} opacity={0.85} />
          {Array.from({ length: 9 }, (_, k) => (
            <line key={k} x1={210 + k * 21} y1={y + 10} x2={204 + k * 21} y2={y + 3} stroke={CITRATE} strokeWidth={2} />
          ))}
        </g>
      ))}
      {/* thin filaments (actin) attached to Z-discs, sliding */}
      <g className="mech-anim mech-contract-left">
        <path d={zDisc(zLeft)} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {rows.map((y) => (
          <rect key={y} x={zLeft} y={y} width={180} height={5} rx={2.5} fill="#e08f7f" />
        ))}
      </g>
      <g className="mech-anim mech-contract-right">
        <path d={zDisc(zRight)} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {rows.map((y) => (
          <rect key={y} x={zRight - 180} y={y + 26} width={180} height={5} rx={2.5} fill="#e08f7f" />
        ))}
      </g>
      {/* Ca²⁺ during contraction, Mg²⁺ during relaxation */}
      <g className="mech-anim mech-ca-phase">
        {[
          [150, 246],
          [300, 286],
          [440, 326],
          [250, 206],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r={11} fill="#e3862b" stroke="white" strokeWidth={1.5} />
            <text y={4} textAnchor="middle" fontSize={9} fontWeight={700} fill="white">
              Ca²⁺
            </text>
          </g>
        ))}
      </g>
      <g className="mech-anim mech-mg-phase">
        {[
          [160, 286],
          [320, 246],
          [430, 206],
          [270, 330],
        ].map(([x, y], i) => (
          <MgIon key={i} x={x} y={y} r={11} />
        ))}
      </g>
      <Appear delay={0.5}>
        <Callout x={zLeft - 10} y={190} text="Disque Z" color={INK} size={13} anchor="start" />
        <Callout x={110} y={392} text="Actine" color="#c86d5c" size={13.5} />
        <Callout x={296} y={392} text="Myosine" color={CITRATE} size={13.5} anchor="middle" />
        <g transform="translate(70,420)">
          <circle cx={8} cy={-5} r={8} fill="#e3862b" />
          <text x={22} y={0} fontSize={14} fontWeight={600} fill={INK}>
            Ca²⁺ : contraction
          </text>
          <circle cx={238} cy={-5} r={8} fill={MG} />
          <text x={252} y={0} fontSize={14} fontWeight={600} fill={INK}>
            Mg²⁺ : relaxation
          </text>
        </g>
      </Appear>
    </Scene>
  )
}

function NervousScene() {
  const axon = 'M120 210 C180 210 200 170 260 170 C320 170 340 210 410 210'
  return (
    <Scene originX={0} originY={140}>
      {/* presynaptic neuron */}
      <g stroke={BISGLY} strokeLinecap="round" fill="none">
        <path d="M70 196 L28 150 M40 164 L22 176 M66 222 L24 262 M36 250 L30 278 M84 176 L80 120 M80 140 L62 128" strokeWidth={4} />
        <path d={axon} strokeWidth={9} opacity={0.25} />
        <path d={axon} strokeWidth={4} />
      </g>
      {[175, 245, 320].map((x, i) => (
        <rect key={i} x={x} y={i === 1 ? 160 : 182 + (i === 2 ? 6 : 0)} width={34} height={18} rx={9} fill="#cfe3d6" stroke={BISGLY} strokeWidth={1.5} />
      ))}
      <circle cx={88} cy={208} r={34} fill="#e3efe6" stroke={BISGLY} strokeWidth={3} />
      <circle cx={88} cy={208} r={11} fill={BISGLY} opacity={0.7} />
      {/* action potential */}
      <PathParticles d={axon} count={3} dur={1.8} r={8} fill="#e3862b" stroke="#fff7ec" />
      {/* synapse */}
      <path d="M410 150 C470 150 470 270 410 270 Z" fill="#e3efe6" stroke={BISGLY} strokeWidth={3} />
      {[
        [432, 184],
        [440, 214],
        [430, 244],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={9} fill="white" stroke={BISGLY} strokeWidth={1.5} />
      ))}
      <PathParticles d="M452 200 L500 200" count={3} dur={1.4} r={4} fill={BISGLY} stroke="white" />
      <PathParticles d="M450 226 L500 232" count={3} dur={1.6} r={4} fill={BISGLY} stroke="white" />
      {/* postsynaptic membrane with NMDA receptor plugged by Mg²⁺ */}
      <rect x={508} y={110} width={30} height={220} rx={10} fill="#eef3f0" stroke="#b9cbbf" />
      <rect x={504} y={190} width={14} height={60} rx={4} fill={BISGLY} />
      <rect x={528} y={190} width={14} height={60} rx={4} fill={BISGLY} />
      <MgIon x={523} y={220} r={11} />
      <Appear delay={0.6}>
        <Callout x={40} y={316} text="Neurone" color={BISGLY} size={14.5} />
        <Callout x={250} y={128} text="Influx nerveux" color="#c06b14" size={14} anchor="middle" />
        <Callout x={445} y={300} text="Synapse" color={SLATE} size={13.5} anchor="middle" />
        <Callout x={560} y={372} text="Récepteur NMDA" to={[535, 252]} anchor="end" color={INK} size={14.5} sub="bloqué par Mg²⁺ au repos" />
      </Appear>
    </Scene>
  )
}

function FormulationScene() {
  const cards = [
    { name: 'Malate de magnésium', dose: '150 mg', ligand: 'Malate : intermédiaire du cycle de Krebs', color: MALATE, Mol: MalateMolecule },
    { name: 'Citrate de magnésium', dose: '200 mg', ligand: 'Citrate : forme soluble', color: CITRATE, Mol: CitrateMolecule },
    { name: 'Bisglycinate de magnésium', dose: '150 mg', ligand: 'Glycine : acide aminé (chélate)', color: BISGLY, Mol: BisglycinateMolecule },
  ]
  const w = 182
  const gap = 10
  return (
    <Scene originX={PANEL_W / 2} originY={PANEL_H / 2}>
      {cards.map((c, i) => {
        const x = 12 + i * (w + gap)
        return (
          <Appear key={c.name} delay={0.15 + i * 0.25}>
            <rect x={x} y={14} width={w} height={300} rx={18} fill="white" stroke="#e2e8ee" />
            <rect x={x + 16} y={30} width={30} height={4} rx={2} fill={c.color} />
            <foreignObject x={x + 6} y={42} width={w - 12} height={128}>
              <div style={{ width: '100%', height: '100%' }}>
                <c.Mol className="h-full w-full" />
              </div>
            </foreignObject>
            <text x={x + 16} y={200} fontSize={30} fontFamily="Fraunces, Georgia, serif" fill={INK}>
              {c.dose.split(' ')[0]}
              <tspan fontSize={15} fontFamily="'Plus Jakarta Sans', sans-serif" fill={SLATE}>
                {' '}
                mg
              </tspan>
            </text>
            {c.name.split(' de ').map((part, k) => (
              <text key={k} x={x + 16} y={226 + k * 19} fontSize={14.5} fontWeight={700} fill={c.color}>
                {k === 0 ? `${part} de` : part}
              </text>
            ))}
            <foreignObject x={x + 12} y={258} width={w - 24} height={50}>
              <p style={{ fontSize: 12.5, lineHeight: 1.3, color: SLATE, margin: 0 }}>{c.ligand}</p>
            </foreignObject>
          </Appear>
        )
      })}
      <Appear delay={1}>
        <rect x={12} y={330} width={566} height={64} rx={18} fill={MG} />
        <MgIon x={52} y={362} r={20} fill="#0f4f7c" />
        <text x={86} y={358} fontSize={20} fontFamily="Fraunces, Georgia, serif" fill="white">
          75 mg de magnésium élément par gélule
        </text>
        <text x={86} y={381} fontSize={13.5} fill="white" opacity={0.8}>
          20 % des VNR · le même ion Mg²⁺ quelle que soit la forme
        </text>
      </Appear>
      <Appear delay={1.4}>
        <text x={14} y={426} fontSize={12.5} fontWeight={700} fill={SLATE} letterSpacing="1.5">
          RÔLES DOCUMENTÉS DU MAGNÉSIUM (ALLÉGATIONS AUTORISÉES)
        </text>
        {['Métabolisme énergétique', 'Réduction de la fatigue', 'Fonction musculaire', 'Système nerveux', 'Équilibre électrolytique'].map((t, i) => {
          const widths = [168, 160, 140, 124, 168]
          const x = 12 + widths.slice(0, i % 3).reduce((a, b) => a + b + 8, 0)
          const row = i < 3 ? 0 : 1
          const xx = row === 0 ? x : 12 + widths.slice(3, i).reduce((a, b) => a + b + 8, 0)
          return (
            <g key={t}>
              <rect x={xx} y={438 + row * 36} width={widths[i]} height={28} rx={14} fill="#e8f2ea" />
              <text x={xx + widths[i] / 2} y={457 + row * 36} textAnchor="middle" fontSize={13} fontWeight={600} fill="#1d5a39">
                {t}
              </text>
            </g>
          )
        })}
      </Appear>
    </Scene>
  )
}

const SCENES: Record<string, () => React.ReactElement> = {
  absorption: AbsorptionScene,
  energy: EnergyScene,
  muscle: MuscleScene,
  nervous: NervousScene,
  formulation: FormulationScene,
}

/* -------------------------------------------------------------------- visual */

export function Bio3MagVisual({ stage, stages, goToStageId, replayKey, interactive = true }: VisualContext & { interactive?: boolean }) {
  const SceneComp = SCENES[stage.id]
  const activeHot = HOTSPOTS.find((h) => h.id === stage.hotspot)
  const available = new Set(stages.map((s) => s.id))
  const all = stage.id === 'formulation'
  return (
    <svg viewBox="0 0 960 560" className="h-full w-full" style={FONT_STYLE} role="img" aria-label={`Bio3Mag — ${stage.title}`}>
      <defs>
        <marker id="b3m-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" fill="none" stroke={SLATE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <Silhouette activeHotspot={stage.hotspot} highlightAll={all} />

      {/* zoom cone from the active hotspot to the detail panel */}
      {activeHot && (
        <g key={`cone-${stage.id}`}>
          <path
            d={`M${activeHot.x} ${activeHot.y} L${PANEL_X} 24 L${PANEL_X} ${24 + PANEL_H} Z`}
            fill={activeHot.color}
            opacity={0.06}
          />
          <path d={`M${activeHot.x} ${activeHot.y} L${PANEL_X} 24 M${activeHot.x} ${activeHot.y} L${PANEL_X} ${24 + PANEL_H}`} stroke={activeHot.color} strokeWidth={1} strokeDasharray="4 5" opacity={0.5} />
        </g>
      )}

      {HOTSPOTS.map((h) => (
        <Hotspot
          key={h.id}
          x={h.x}
          y={h.y}
          label={h.label}
          color={h.color}
          active={all || h.id === stage.hotspot}
          labelSide={h.side}
          onSelect={interactive && available.has(h.stage) ? () => goToStageId(h.stage) : undefined}
        />
      ))}

      {/* detail panel */}
      <g transform={`translate(${PANEL_X},24)`}>
        <rect width={PANEL_W} height={PANEL_H} rx={24} fill="#fbfcfd" stroke={activeHot?.color ?? '#d5dee7'} strokeOpacity={0.45} strokeWidth={1.5} />
        <AnimatePresence mode="wait">
          <g key={`${stage.id}-${replayKey}`}>{SceneComp && <SceneComp />}</g>
        </AnimatePresence>
        {stage.id !== 'formulation' && <FormulaBar highlight={stage.highlight} />}
      </g>
    </svg>
  )
}

export default function Bio3MagMechanism({ product }: { product: Product }) {
  return (
    <MechanismEngine
      product={product}
      productId="bio3mag"
      accent={product.accent}
      eyebrow="Bio3Mag · Mécanisme d’action"
      renderVisual={(ctx) => <Bio3MagVisual {...ctx} />}
    />
  )
}
