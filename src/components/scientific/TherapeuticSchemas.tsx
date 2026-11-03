import { motion } from 'motion/react'
import type { ComponentType, ReactNode } from 'react'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { FONT, useTr } from './DiagramKit'

/*
 * Illustrative therapeutic schemas: one central illustration per product, linked to the
 * therapeutic targets. Drawn on a 1600 × 720 canvas so they fill a 16:9 slide body.
 */

const W = 1600
const H = 720
const CX = 800
const CY = 350
const R = 272

type Tr = ReturnType<typeof useTr>

interface Target {
  label: [string, string]
  sub: [string, string]
}

interface IllustrationProps {
  id: string
  accent: string
  accentSoft: string
  tr: Tr
}

interface SchemaDef {
  caption: [string, string]
  targets: [Target, Target, Target, Target]
  Illustration: ComponentType<IllustrationProps>
}

/** Fades and lifts a group in on slide entry; static in print. */
function Appear({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const { isPrint } = useSlide()
  if (isPrint) return <g>{children}</g>
  return (
    <motion.g initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.g>
  )
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

// ─────────────────────────────────────────────────────────────── Bio3Mag
function MagnesiumHub({ id, accent, tr }: IllustrationProps) {
  const satellites = [
    { a: -90, label: tr('Bisglycinate', 'Bisglycinate') },
    { a: 30, label: tr('Malate', 'Malate') },
    { a: 150, label: tr('Citrate', 'Citrate') },
  ].map((s) => ({ ...s, x: 270 + 172 * Math.cos((s.a * Math.PI) / 180), y: 270 + 172 * Math.sin((s.a * Math.PI) / 180) }))
  const ions = [
    [70, 150], [470, 170], [96, 400], [440, 420], [270, 488], [190, 60], [360, 64],
  ]
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-mg`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#7cc0ea" />
          <stop offset="0.55" stopColor={accent} />
          <stop offset="1" stopColor="#0f4a74" />
        </radialGradient>
      </defs>
      <circle cx={270} cy={270} r={172} fill="none" stroke={accent} strokeOpacity={0.28} strokeWidth={2} strokeDasharray="3 10" strokeLinecap="round" />
      <circle cx={270} cy={270} r={226} fill="none" stroke={accent} strokeOpacity={0.12} strokeWidth={1.5} />
      {ions.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 7} fill={accent} fillOpacity={0.22} />
      ))}
      {satellites.map((s, i) => (
        <line key={i} x1={270} y1={270} x2={s.x} y2={s.y} stroke={accent} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
      ))}
      <circle cx={270} cy={270} r={96} fill={accent} fillOpacity={0.1} />
      <circle cx={270} cy={270} r={84} fill={`url(#${id}-mg)`} />
      <ellipse cx={244} cy={238} rx={34} ry={20} fill="white" fillOpacity={0.3} transform="rotate(-30 244 238)" />
      <text x={262} y={292} textAnchor="middle" fontSize={64} fontWeight={800} fill="white" style={FONT}>
        Mg
      </text>
      <text x={334} y={250} textAnchor="middle" fontSize={28} fontWeight={700} fill="white" style={FONT}>
        2+
      </text>
      {satellites.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={50} fill="white" stroke={accent} strokeWidth={3} />
          <polygon points={hexPoints(s.x - 9, s.y - 4, 17)} fill="none" stroke={accent} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={hexPoints(s.x + 20, s.y + 13, 11)} fill={accent} fillOpacity={0.16} stroke={accent} strokeWidth={2.5} strokeLinejoin="round" />
          <text x={s.x} y={s.a === -90 ? s.y - 66 : s.y + 82} textAnchor="middle" fontSize={22} fontWeight={700} fill={accent} style={FONT}>
            {s.label}
          </text>
        </g>
      ))}
    </g>
  )
}

// ─────────────────────────────────────────────────────────────── BioQ10+
function Mitochondrion({ id, accent, tr }: IllustrationProps) {
  const cx = 270
  const cy = 270
  const rx = 206
  const ry = 106
  const half = (x: number) => ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2))
  const cristae = Array.from({ length: 7 }, (_, i) => {
    const x = 104 + i * 50
    const w = 24
    const top = i % 2 === 0
    const h0 = half(x)
    const h1 = half(x + w)
    const len = Math.min(h0, h1) * 1.08
    return top
      ? `M ${x} ${cy - h0 + 1} L ${x} ${cy - h0 + len} A ${w / 2} ${w / 2} 0 0 0 ${x + w} ${cy - h0 + len} L ${x + w} ${cy - h1 + 1}`
      : `M ${x} ${cy + h0 - 1} L ${x} ${cy + h0 - len} A ${w / 2} ${w / 2} 0 0 1 ${x + w} ${cy + h0 - len} L ${x + w} ${cy + h1 - 1}`
  })
  const q10 = [
    [128, 236], [178, 300], [228, 228], [278, 310], [328, 232], [378, 304], [418, 250],
  ]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-outer`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dfae" />
          <stop offset="1" stopColor="#dcae5d" />
        </linearGradient>
        <radialGradient id={`${id}-matrix`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#fff8e8" />
          <stop offset="1" stopColor="#f6e4bd" />
        </radialGradient>
      </defs>
      <g transform="rotate(-16 270 270)">
        <ellipse cx={cx} cy={cy + 10} rx={238} ry={140} fill="#8a6421" fillOpacity={0.12} />
        <ellipse cx={cx} cy={cy} rx={234} ry={134} fill={`url(#${id}-outer)`} stroke="#a8781f" strokeWidth={4} />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-matrix)`} stroke="#c3913a" strokeWidth={3} />
        {cristae.map((d, i) => (
          <path key={i} d={d} fill="#f1d295" stroke="#c3913a" strokeWidth={3} strokeLinejoin="round" />
        ))}
        {q10.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill={accent} stroke="white" strokeWidth={2} />
        ))}
        <ellipse cx={200} cy={176} rx={70} ry={12} fill="white" fillOpacity={0.35} />
      </g>
      {[
        [96, 92],
        [496, 76],
        [470, 418],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={30} fill={accent} />
          <circle cx={x} cy={y} r={38} fill="none" stroke={accent} strokeOpacity={0.3} strokeWidth={2} />
          <text x={x} y={y + 7} textAnchor="middle" fontSize={19} fontWeight={800} fill="white" style={FONT}>
            ATP
          </text>
        </g>
      ))}
      <g>
        <rect x={150} y={436} width={150} height={44} rx={22} fill="white" stroke={accent} strokeWidth={2.5} />
        <circle cx={176} cy={458} r={8} fill={accent} />
        <text x={196} y={466} fontSize={21} fontWeight={700} fill="#16222f" style={FONT}>
          {tr('CoQ10', 'CoQ10')}
        </text>
      </g>
    </g>
  )
}

// ────────────────────────────────────────────────────────── BioBerberine+
function Glycaemia({ id, accent, tr }: IllustrationProps) {
  const glucose = [
    [80, 182], [128, 236], [168, 170], [214, 222], [262, 180], [300, 238], [352, 196], [420, 224],
  ]
  const cells = [
    [110, 208], [236, 252], [330, 172], [454, 196],
  ]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-vessel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1b9a8" />
          <stop offset="0.5" stopColor="#e79a85" />
          <stop offset="1" stopColor="#d77b66" />
        </linearGradient>
        <linearGradient id={`${id}-curve`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c0392b" />
          <stop offset="1" stopColor={accent} />
        </linearGradient>
      </defs>
      <rect x={34} y={118} width={472} height={180} rx={90} fill={`url(#${id}-vessel)`} />
      <rect x={34} y={146} width={472} height={124} rx={62} fill="#fcece6" />
      <rect x={60} y={150} width={420} height={18} rx={9} fill="white" fillOpacity={0.6} />
      {cells.map(([x, y], i) => (
        <g key={i} transform={`rotate(${i % 2 ? 18 : -12} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={26} ry={17} fill="#d9503f" />
          <ellipse cx={x} cy={y} rx={13} ry={7} fill="#b83a2c" />
        </g>
      ))}
      {glucose.map(([x, y], i) => (
        <g key={i} opacity={1 - i * 0.09}>
          <polygon points={hexPoints(x, y, 15)} fill="white" stroke={accent} strokeWidth={3} strokeLinejoin="round" />
        </g>
      ))}
      <text x={270} y={104} textAnchor="middle" fontSize={20} fontWeight={700} fill="#b4533a" style={FONT} letterSpacing={2}>
        {tr('VAISSEAU SANGUIN', 'BLOOD VESSEL')}
      </text>

      <g transform="translate(0 330)">
        <rect x={60} y={0} width={440} height={170} rx={22} fill="white" stroke="#16222f" strokeOpacity={0.08} strokeWidth={2} />
        <rect x={84} y={98} width={396} height={40} rx={8} fill={accent} fillOpacity={0.12} />
        <text x={100} y={124} fontSize={16} fontWeight={700} fill={accent} style={FONT}>
          {tr('Zone cible', 'Target range')}
        </text>
        <line x1={84} y1={24} x2={84} y2={150} stroke="#46515e" strokeOpacity={0.4} strokeWidth={2} />
        <line x1={84} y1={150} x2={480} y2={150} stroke="#46515e" strokeOpacity={0.4} strokeWidth={2} />
        <path d="M 96 40 C 170 30 200 60 250 80 C 310 104 350 118 470 116" fill="none" stroke={`url(#${id}-curve)`} strokeWidth={6} strokeLinecap="round" />
        <circle cx={470} cy={116} r={8} fill={accent} />
        <text x={100} y={26} fontSize={16} fontWeight={700} fill="#46515e" style={FONT}>
          {tr('Glycémie', 'Blood glucose')}
        </text>
      </g>
    </g>
  )
}

// ────────────────────────────────────────────────────────────── BioDigest
function Stomach({ id, accent, tr }: IllustrationProps) {
  const outline =
    'M 262 24 L 262 96 C 170 84 92 140 96 244 C 100 372 168 474 292 474 C 386 474 440 418 466 356 L 520 352 L 520 290 L 458 292 C 424 316 372 304 352 252 C 336 212 334 150 322 96 L 322 24 Z'
  const zinc = [
    [118, 250], [150, 384], [246, 448], [366, 432], [432, 352], [300, 120],
  ]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-stomach`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6c4b6" />
          <stop offset="1" stopColor="#e08d7a" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d={outline} />
        </clipPath>
      </defs>
      <path d={outline} fill="#7a2f22" fillOpacity={0.1} transform="translate(6 10)" />
      <path d={outline} fill={`url(#${id}-stomach)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {/* Thick inner stroke clipped to the organ = protective lining along the mucosa */}
        <path d={outline} fill="none" stroke="#a9d6b8" strokeWidth={34} />
        <path d={outline} fill="none" stroke={accent} strokeOpacity={0.35} strokeWidth={10} />
        <path d={outline} fill="none" stroke="white" strokeOpacity={0.5} strokeWidth={6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M ${150 + i * 10} ${180 + i * 52} C ${200 + i * 20} ${160 + i * 52} ${240 + i * 25} ${220 + i * 50} ${300 + i * 22} ${200 + i * 50}`}
            fill="none"
            stroke="#b8604d"
            strokeOpacity={0.45}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ))}
      </g>
      <path d={outline} fill="none" stroke="#b55a47" strokeWidth={4} strokeLinejoin="round" />
      <ellipse cx={180} cy={190} rx={46} ry={18} fill="white" fillOpacity={0.32} transform="rotate(-35 180 190)" />
      {zinc.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={17} fill="white" stroke={accent} strokeWidth={3} />
          <text x={x} y={y + 6} textAnchor="middle" fontSize={15} fontWeight={800} fill={accent} style={FONT}>
            Zn
          </text>
        </g>
      ))}
      <g>
        <line x1={404} y1={488} x2={418} y2={430} stroke={accent} strokeWidth={2} strokeDasharray="3 6" />
        <rect x={334} y={488} width={140} height={46} rx={23} fill={accent} />
        <text x={404} y={518} textAnchor="middle" fontSize={18} fontWeight={700} fill="white" style={FONT}>
          {tr('Muqueuse', 'Mucosa')}
        </text>
      </g>
    </g>
  )
}

// ─────────────────────────────────────────────────────────────── BioD3K2+
function Bone({ id, accent, tr }: IllustrationProps) {
  const shapes = (
    <>
      <rect x={140} y={272} width={260} height={56} rx={10} />
      <circle cx={128} cy={274} r={44} />
      <circle cx={128} cy={330} r={44} />
      <circle cx={412} cy={274} r={44} />
      <circle cx={412} cy={330} r={44} />
    </>
  )
  const calcium = [
    [150, 150], [190, 176], [226, 206],
  ]
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-sun`} cx="40%" cy="40%" r="65%">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#f0a81c" />
        </radialGradient>
        <pattern id={`${id}-trab`} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <path d="M 0 9 Q 9 0 18 9 M 9 0 Q 18 9 9 18" fill="none" stroke="#cdb88a" strokeWidth={2} />
        </pattern>
        <linearGradient id={`${id}-bone`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#efe2c4" />
        </linearGradient>
      </defs>
      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI / 6) * i
          return (
            <line
              key={i}
              x1={92 + 56 * Math.cos(a)}
              y1={92 + 56 * Math.sin(a)}
              x2={92 + 76 * Math.cos(a)}
              y2={92 + 76 * Math.sin(a)}
              stroke="#f0a81c"
              strokeWidth={5}
              strokeLinecap="round"
            />
          )
        })}
        <circle cx={92} cy={92} r={46} fill={`url(#${id}-sun)`} />
        <text x={92} y={102} textAnchor="middle" fontSize={26} fontWeight={800} fill="#7a4a00" style={FONT}>
          D3
        </text>
      </g>
      <path d="M 140 140 C 200 170 236 214 262 262" fill="none" stroke={accent} strokeWidth={3} strokeDasharray="3 8" strokeLinecap="round" />
      {calcium.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={15} fill="white" stroke={accent} strokeWidth={2.5} />
          <text x={x} y={y + 5} textAnchor="middle" fontSize={12} fontWeight={800} fill={accent} style={FONT}>
            Ca
          </text>
        </g>
      ))}
      <g transform="rotate(-28 270 302)">
        <g fill="#7a5f26" fillOpacity={0.12} transform="translate(6 12)">
          {shapes}
        </g>
        <g fill="#b99c5e" stroke="#b99c5e" strokeWidth={8}>
          {shapes}
        </g>
        <g fill={`url(#${id}-bone)`}>{shapes}</g>
        <rect x={168} y={288} width={204} height={24} rx={12} fill="#ead8ae" />
        {[
          [124, 300],
          [416, 300],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={40} fill={`url(#${id}-trab)`} />
        ))}
        <rect x={180} y={278} width={150} height={7} rx={3.5} fill="white" fillOpacity={0.8} />
      </g>
      {[
        { x: 456, y: 160, label: 'K2', color: '#1d7a4a' },
        { x: 160, y: 478, label: 'Mg', color: '#1b6fa8' },
      ].map((b) => (
        <g key={b.label}>
          <circle cx={b.x} cy={b.y} r={34} fill={b.color} />
          <circle cx={b.x} cy={b.y} r={42} fill="none" stroke={b.color} strokeOpacity={0.3} strokeWidth={2} />
          <text x={b.x} y={b.y + 9} textAnchor="middle" fontSize={26} fontWeight={800} fill="white" style={FONT}>
            {b.label}
          </text>
        </g>
      ))}
      <text x={380} y={500} textAnchor="middle" fontSize={20} fontWeight={700} fill="#8a6a2a" style={FONT} letterSpacing={2}>
        {tr('TISSU OSSEUX', 'BONE TISSUE')}
      </text>
    </g>
  )
}

// ───────────────────────────────────────────────────────────── BioGrippal
function Airways({ id, accent }: IllustrationProps) {
  const branches: { x1: number; y1: number; x2: number; y2: number; w: number }[] = []
  const grow = (x: number, y: number, a: number, len: number, depth: number) => {
    if (depth === 0) return
    const x2 = x + len * Math.sin(a)
    const y2 = y + len * Math.cos(a)
    branches.push({ x1: x, y1: y, x2, y2, w: depth * 2.6 })
    grow(x2, y2, a - 0.42, len * 0.74, depth - 1)
    grow(x2, y2, a + 0.42, len * 0.74, depth - 1)
  }
  grow(270, 214, -0.95, 74, 5)
  grow(270, 214, 0.95, 74, 5)
  const lung = 'M 246 168 C 172 140 78 222 66 356 C 58 446 108 486 182 476 C 232 468 252 436 252 404 L 252 200 Z'
  const viruses = [
    [36, 128], [504, 120], [28, 468], [512, 452],
  ]
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-lung`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8d6dc" />
          <stop offset="1" stopColor="#eeb1bc" />
        </linearGradient>
      </defs>
      <ellipse cx={270} cy={300} rx={252} ry={238} fill="none" stroke={accent} strokeWidth={5} strokeDasharray="1 14" strokeLinecap="round" />
      <ellipse cx={270} cy={300} rx={236} ry={222} fill={accent} fillOpacity={0.05} />
      <path d={lung} fill={`url(#${id}-lung)`} stroke="#d68695" strokeWidth={3} />
      <path d={lung} fill={`url(#${id}-lung)`} stroke="#d68695" strokeWidth={3} transform="translate(540 0) scale(-1 1)" />
      <rect x={254} y={28} width={32} height={192} rx={16} fill="#f3cbd2" stroke="#c96a7c" strokeWidth={3} />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={258} y1={48 + i * 19} x2={282} y2={48 + i * 19} stroke="#c96a7c" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
      ))}
      {branches.map((b, i) => (
        <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="#c25a6e" strokeWidth={b.w} strokeLinecap="round" />
      ))}
      {viruses.map(([x, y], i) => (
        <g key={i} opacity={0.85}>
          {Array.from({ length: 8 }, (_, k) => {
            const a = (Math.PI / 4) * k
            return (
              <g key={k}>
                <line x1={x + 14 * Math.cos(a)} y1={y + 14 * Math.sin(a)} x2={x + 22 * Math.cos(a)} y2={y + 22 * Math.sin(a)} stroke="#8a4f7d" strokeWidth={3} />
                <circle cx={x + 24 * Math.cos(a)} cy={y + 24 * Math.sin(a)} r={3.5} fill="#8a4f7d" />
              </g>
            )
          })}
          <circle cx={x} cy={y} r={15} fill="#f1dcea" stroke="#8a4f7d" strokeWidth={3} />
        </g>
      ))}
      <g>
        <path d="M 270 486 L 306 500 L 306 526 C 306 548 290 560 270 568 C 250 560 234 548 234 526 L 234 500 Z" fill={accent} />
        <path d="M 254 528 L 266 540 L 288 514" fill="none" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
}

const T = (frL: string, enL: string, frS: string, enS: string): Target => ({ label: [frL, enL], sub: [frS, enS] })

export const therapeuticSchemas: Record<string, SchemaDef> = {
  bio3mag: {
    caption: ['Trois formes hautement biodisponibles, une même source de Mg²⁺', 'Three highly bioavailable forms, one source of Mg²⁺'],
    Illustration: MagnesiumHub,
    targets: [
      T('Système nerveux', 'Nervous system', 'Bisglycinate : stress, sommeil', 'Bisglycinate: stress, sleep'),
      T('Muscles', 'Muscles', 'Citrate : contraction', 'Citrate: contraction'),
      T('Récupération', 'Recovery', 'Nerveuse et musculaire', 'Nervous and muscular'),
      T('Énergie', 'Energy', 'Malate : mitochondries', 'Malate: mitochondria'),
    ],
  },
  bioq10: {
    caption: ['La coenzyme Q10 au cœur de la mitochondrie', 'Coenzyme Q10 at the heart of the mitochondrion'],
    Illustration: Mitochondrion,
    targets: [
      T('Lipides', 'Lipids', 'Dyslipidémie mixte', 'Mixed dyslipidaemia'),
      T('Statines', 'Statins', 'Compense le déficit en Q10', 'Offsets CoQ10 depletion'),
      T('Cœur & circulation', 'Heart & circulation', 'Risque thromboembolique', 'Thromboembolic risk'),
      T('Diabète', 'Diabetes', 'Prévention, hors statines', 'Prevention, without statins'),
    ],
  },
  bioberberine: {
    caption: ['Retour de la glycémie vers la zone cible', 'Blood glucose back towards the target range'],
    Illustration: Glycaemia,
    targets: [
      T('Glycémie', 'Blood glucose', 'Diabète I et II, prédiabète', 'Type I/II diabetes, prediabetes'),
      T('Insulinorésistance', 'Insulin resistance', 'Syndrome métabolique, SOPK', 'Metabolic syndrome, PCOS'),
      T('Poids', 'Weight', 'Objectif de perte de poids', 'Weight-loss goals'),
      T('Cœur & cerveau', 'Heart & brain', 'Risque CV, Alzheimer', 'CV risk, Alzheimer’s'),
    ],
  },
  biodigest: {
    caption: ['Le zinc carnosine cible les zones lésées de la muqueuse', 'Zinc carnosine targets damaged areas of the mucosa'],
    Illustration: Stomach,
    targets: [
      T('Estomac', 'Stomach', 'Sécrétions préservées', 'Secretions preserved'),
      T('Synergie', 'Synergy', 'H. pylori, AINS, ATB', 'H. pylori, NSAIDs, antibiotics'),
      T('Muqueuse', 'Mucosa', 'Cicatrisation, ulcère', 'Healing, ulcer'),
      T('Microbiote', 'Gut flora', 'Amélioré en < 2 semaines', 'Improved in < 2 weeks'),
    ],
  },
  biod3k2: {
    caption: ['Vitamine D3, K2 et magnésium : le calcium dirigé vers l’os', 'Vitamin D3, K2 and magnesium: calcium directed to bone'],
    Illustration: Bone,
    targets: [
      T('Vitamine D', 'Vitamin D', 'Déficit biologique', 'Laboratory deficiency'),
      T('Immunité', 'Immunity', 'Infections, auto-immunité', 'Infections, autoimmunity'),
      T('Os & dents', 'Bone & teeth', 'Croissance, dentition', 'Growth, teeth'),
      T('Phanères', 'Hair & nails', 'Ongles, cheveux', 'Nails, hair'),
    ],
  },
  biogrippal: {
    caption: ['Une barrière autour des voies respiratoires', 'A barrier around the airways'],
    Illustration: Airways,
    targets: [
      T('Sphère ORL', 'ENT', 'Rhume, rhinopharyngite', 'Colds, nasopharyngitis'),
      T('États grippaux', 'Flu-like illness', 'Traitement d’appoint', 'Adjunctive treatment'),
      T('Voies respiratoires', 'Airways', 'Infections récidivantes', 'Recurrent infections'),
      T('Défenses', 'Defences', 'Convalescence', 'Convalescence'),
    ],
  },
}

const CARD_W = 410
const CARD_H = 118
const CARD_Y = [150, 432]

/** Full schema: central illustration, four therapeutic targets and their connectors. */
export function TherapeuticSchema({ product, className }: { product: Product; className?: string }) {
  const tr = useTr()
  const def = therapeuticSchemas[product.id]
  if (!def) return null
  const { accent, accentSoft } = product
  const id = `ts-${product.id}`
  const { Illustration } = def

  const cards = def.targets.map((target, i) => {
    const left = i < 2
    const x = left ? 34 : W - 34 - CARD_W
    const y = CARD_Y[i % 2]
    const ex = left ? x + CARD_W : x
    const ey = y + CARD_H / 2
    const a = Math.atan2(ey - CY, ex - CX)
    const px = CX + (R + 10) * Math.cos(a)
    const py = CY + (R + 10) * Math.sin(a)
    const mid = (ex + px) / 2
    return { target, left, x, y, ex, ey, px, py, mid, i }
  })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={tr(def.caption[0], def.caption[1])} style={FONT}>
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="white" />
          <stop offset="0.7" stopColor={accentSoft} />
          <stop offset="1" stopColor={accentSoft} stopOpacity={0.4} />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0e1a2b" floodOpacity="0.12" />
        </filter>
      </defs>

      <Appear>
        <circle cx={CX} cy={CY} r={R} fill={`url(#${id}-halo)`} />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={accent} strokeOpacity={0.22} strokeWidth={2} />
      </Appear>

      <Appear delay={0.15}>
        <g transform={`translate(${CX - 270} ${CY - 270})`}>
          <Illustration id={id} accent={accent} accentSoft={accentSoft} tr={tr} />
        </g>
      </Appear>

      {cards.map((c) => (
        <Appear key={c.i} delay={0.45 + c.i * 0.12}>
          <path
            d={`M ${c.ex} ${c.ey} C ${c.mid} ${c.ey} ${c.mid} ${c.py} ${c.px} ${c.py}`}
            fill="none"
            stroke={accent}
            strokeOpacity={0.45}
            strokeWidth={2.5}
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <circle cx={c.px} cy={c.py} r={7} fill={accent} />
          <circle cx={c.px} cy={c.py} r={13} fill="none" stroke={accent} strokeOpacity={0.3} strokeWidth={2} />
          <g filter={`url(#${id}-shadow)`}>
            <rect x={c.x} y={c.y} width={CARD_W} height={CARD_H} rx={26} fill="white" />
          </g>
          <rect x={c.x} y={c.y} width={CARD_W} height={CARD_H} rx={26} fill="none" stroke={accent} strokeOpacity={0.16} strokeWidth={2} />
          <rect x={c.left ? c.x + CARD_W - 6 : c.x} y={c.y + 30} width={6} height={CARD_H - 60} rx={3} fill={accent} />
          <circle cx={c.x + 50} cy={c.y + CARD_H / 2} r={24} fill={accent} />
          <text x={c.x + 50} y={c.y + CARD_H / 2 + 8} textAnchor="middle" fontSize={22} fontWeight={800} fill="white">
            {c.i + 1}
          </text>
          <text x={c.x + 92} y={c.y + 52} fontSize={29} fontWeight={700} fill="#16222f">
            {tr(c.target.label[0], c.target.label[1])}
          </text>
          <text x={c.x + 92} y={c.y + 86} fontSize={20} fill="#46515e">
            {tr(c.target.sub[0], c.target.sub[1])}
          </text>
        </Appear>
      ))}

      <Appear delay={0.9}>
        <text x={CX} y={H - 22} textAnchor="middle" fontSize={24} fontStyle="italic" fill="#46515e" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          {tr(def.caption[0], def.caption[1])}
        </text>
      </Appear>
    </svg>
  )
}
