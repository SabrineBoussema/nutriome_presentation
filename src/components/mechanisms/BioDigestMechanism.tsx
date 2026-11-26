import { AnimatePresence, motion } from 'motion/react'
import type { Product } from '../../data/types'
import { Appear, Callout, FONT_STYLE, Hotspot, INK, PathParticles, Scene, SLATE, useRuntime } from './kit'
import { MechanismEngine, type VisualContext } from './MechanismEngine'

const GREEN = '#1d5a39'
const LEAF = '#2f8a57'
const ACID = '#c4525f'
const ROS = '#e3862b'
const ZN = '#5b7a99'
const PANEL_X = 350
const PANEL_W = 590
const PANEL_H = 520

/* ------------------------------------------------------------------ anatomy */

const GI = { x: 18, y: 18, s: 1 }
const HOTSPOTS = [
  { id: 'stomach', stage: 'alteration', x: GI.x + 214, y: GI.y + 176, label: 'Estomac', side: 'right' as const },
  { id: 'intestine', stage: 'microbiota', x: GI.x + 150, y: GI.y + 384, label: 'Intestin', side: 'right' as const },
]

function GiTract({ focus }: { focus: 'stomach' | 'intestine' }) {
  return (
    <g transform={`translate(${GI.x},${GI.y}) scale(${GI.s})`} aria-hidden>
      <path d="M70 20 Q150 0 230 20 Q252 30 248 90 L238 300 Q232 420 242 510 L58 510 Q68 420 62 300 L52 90 Q48 30 70 20 Z" fill="#e2ebf3" />
      {/* oesophagus + stomach */}
      <g opacity={focus === 'stomach' ? 1 : 0.6}>
        <path d="M150 0 L150 118" stroke="#e3a08d" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path
          d="M146 112 C176 98 236 112 246 168 C254 222 214 262 168 262 C134 262 112 244 118 224 C124 206 150 214 168 204 C186 192 182 158 160 140 C152 132 146 124 146 112 Z"
          fill="#f0b2a2"
          stroke="#d98b7c"
          strokeWidth="2"
        />
        <path d="M150 152 C172 170 168 200 150 210 M190 140 C214 170 214 214 186 238" fill="none" stroke="#e29c8b" strokeWidth="1.6" />
      </g>
      {/* intestines */}
      <g fill="none" strokeLinecap="round" opacity={focus === 'intestine' ? 1 : 0.6}>
        <path d="M124 232 C104 262 120 282 140 284" stroke="#e8a896" strokeWidth="9" />
        <path d="M84 470 L84 306 Q84 292 98 292 L204 292 Q218 292 218 306 L218 470" stroke="#e3a08d" strokeWidth="14" />
        <path
          d="M108 318 q14 -10 28 0 t28 0 t28 0 M108 344 q14 10 28 0 t28 0 t28 0 M108 370 q14 -10 28 0 t28 0 t28 0 M108 396 q14 10 28 0 t28 0 t28 0 M112 422 q12 -10 26 0 t26 0 t26 0 M116 446 q12 8 24 0 t24 0"
          stroke="#efb9a8"
          strokeWidth="8"
        />
      </g>
    </g>
  )
}

/* ------------------------------------------------------- shared mucosa layer */

const CELL_W = 44
const CELLS = Array.from({ length: 13 }, (_, i) => 6 + i * (CELL_W + 1))
const LESION = new Set([5, 6, 7])
const EPI_TOP = 196
const EPI_H = 96

function Mucosa({ state }: { state: 'healthy' | 'damaged' | 'protected' }) {
  const lesionX0 = CELLS[5]
  const lesionX1 = CELLS[7] + CELL_W
  return (
    <g>
      <text x={18} y={30} fontSize={13} fontWeight={700} fill={SLATE} letterSpacing="2">
        LUMIÈRE GASTRIQUE
      </text>
      {/* mucus / bicarbonate layer */}
      {state === 'healthy' ? (
        <rect x={6} y={162} width={580} height={32} rx={8} fill="#f3e7c9" />
      ) : (
        <>
          <rect x={6} y={162} width={lesionX0 - 10} height={32} rx={8} fill="#f3e7c9" />
          <rect x={lesionX1 + 4} y={162} width={586 - lesionX1 - 4} height={32} rx={8} fill="#f3e7c9" />
        </>
      )}
      {/* epithelial cells */}
      {CELLS.map((x, i) => {
        const hurt = state !== 'healthy' && LESION.has(i)
        if (hurt && i === 6) return null
        return (
          <g key={i} opacity={hurt ? 0.55 : 1}>
            <rect
              x={x}
              y={hurt ? EPI_TOP + 26 : EPI_TOP}
              width={CELL_W}
              height={hurt ? EPI_H - 26 : EPI_H}
              rx={9}
              fill={hurt ? '#f6cfc6' : '#fbe3dc'}
              stroke={hurt ? '#d98b7c' : '#e3a99b'}
              strokeWidth={1.2}
              strokeDasharray={hurt ? '4 3' : undefined}
            />
            <circle cx={x + CELL_W / 2} cy={EPI_TOP + 62} r={7} fill="#e9b7aa" />
            {/* tight junctions */}
            {!hurt && i < CELLS.length - 1 && !(state !== 'healthy' && LESION.has(i + 1)) && (
              <rect x={x + CELL_W - 2} y={EPI_TOP + 4} width={5} height={12} rx={2} fill={GREEN} />
            )}
          </g>
        )
      })}
      {/* lamina propria with capillaries */}
      <rect x={6} y={300} width={580} height={110} rx={10} fill="#fbe9e4" />
      {[60, 210, 380, 520].map((x) => (
        <ellipse key={x} cx={x} cy={360} rx={26} ry={10} fill="#f1b0a6" opacity={0.7} />
      ))}
      {state === 'protected' && (
        <path
          d={`M${lesionX0 - 4} ${EPI_TOP + 2} C${lesionX0 + 20} ${EPI_TOP + 46}, ${lesionX1 - 20} ${EPI_TOP + 46}, ${lesionX1 + 4} ${EPI_TOP + 2}`}
          fill="none"
          stroke={LEAF}
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.85}
        />
      )}
    </g>
  )
}

function ZnGlyph({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M0 0 L-14 -9 M0 0 L14 -9 M0 0 L0 16" stroke={LEAF} strokeWidth={2.4} />
      <circle cx={-14} cy={-9} r={5} fill={LEAF} />
      <circle cx={14} cy={-9} r={5} fill={LEAF} />
      <circle cx={0} cy={16} r={5} fill={LEAF} />
      <circle r={9} fill={ZN} stroke="white" strokeWidth={1.5} />
      <text y={3.5} textAnchor="middle" fontSize={8.5} fontWeight={800} fill="white">
        Zn
      </text>
    </g>
  )
}

function Bacterium({ x, y, rot = 0, color = '#7a8a9a', className = 'mech-anim mech-drift' }: { x: number; y: number; rot?: number; color?: string; className?: string }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <g className={className}>
        <rect x={-18} y={-7} width={36} height={14} rx={7} fill={color} opacity={0.85} />
        <path d="M18 0 q8 -6 14 0 t12 0" fill="none" stroke={color} strokeWidth={1.5} />
      </g>
    </g>
  )
}

function RosStar({ x, y, cls = '' }: { x: number; y: number; cls?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={cls}>
        <path d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z" fill={ROS} />
      </g>
    </g>
  )
}

const lesionCenter = CELLS[6] + CELL_W / 2

/* -------------------------------------------------------------------- scenes */

function AlterationScene() {
  return (
    <Scene>
      <Mucosa state="damaged" />
      <PathParticles d={`M${lesionCenter - 60} 50 C${lesionCenter - 40} 120 ${lesionCenter - 10} 150 ${lesionCenter} 236`} count={5} dur={3.2} r={9} label="H⁺" fill={ACID} />
      <PathParticles d={`M${lesionCenter + 90} 60 C${lesionCenter + 60} 130 ${lesionCenter + 20} 160 ${lesionCenter + 10} 236`} count={4} dur={3.8} r={9} label="H⁺" fill={ACID} />
      <Bacterium x={86} y={84} rot={-12} color="#7b6a9e" />
      <Bacterium x={132} y={118} rot={18} color="#7b6a9e" />
      <RosStar x={420} y={112} cls="mech-anim mech-breathe" />
      <RosStar x={452} y={136} cls="mech-anim mech-breathe" />
      {/* NSAID tablet */}
      <g transform="translate(540,118) rotate(-20)">
        <rect x={-22} y={-10} width={44} height={20} rx={10} fill="white" stroke={SLATE} strokeWidth={1.5} />
        <line x1={0} y1={-10} x2={0} y2={10} stroke={SLATE} strokeWidth={1.5} />
      </g>
      <Appear delay={0.5}>
        <Callout x={100} y={58} text="H. pylori" color="#5e4d86" size={14} anchor="middle" />
        <Callout x={540} y={94} text="AINS" color={SLATE} size={14} anchor="middle" />
        <Callout x={436} y={88} text="Stress oxydatif" color="#b06516" size={14} anchor="middle" />
        <Callout x={lesionCenter - 72} y={150} text="Acide (H⁺)" color={ACID} size={14} anchor="end" />
      </Appear>
      <Appear delay={1}>
        <Callout x={18} y={186} text="Mucus" color="#9b7f3c" size={13} />
        <Callout x={18} y={440} text="Cellules épithéliales et jonctions serrées" to={[CELLS[2] + CELL_W, EPI_TOP + 10]} color={INK} size={14} />
        <Callout x={lesionCenter} y={326} text="Barrière altérée" color={ACID} size={15} anchor="middle" />
      </Appear>
    </Scene>
  )
}

function ZncScene() {
  const { reduced } = useRuntime()
  const film = [-46, -24, 0, 24, 46]
  return (
    <Scene>
      <Mucosa state="damaged" />
      {/* inset: the complex */}
      <g transform="translate(398,22)">
        <rect width={178} height={112} rx={14} fill="white" stroke="#d5dee7" />
        <ZnGlyph x={50} y={56} s={2} />
        <text x={96} y={44} fontSize={12.5} fontWeight={700} fill={INK}>
          Zinc
        </text>
        <text x={96} y={62} fontSize={12.5} fontWeight={700} fill={LEAF}>
          + L-carnosine
        </text>
        <text x={96} y={80} fontSize={11.5} fill={SLATE}>
          complexe 1:1
        </text>
      </g>
      {[0, 1, 2].map((i) => (
        <PathParticlesZn key={i} d={`M${120 + i * 70} 40 C${160 + i * 50} 110 ${lesionCenter - 30 + i * 30} 140 ${lesionCenter - 30 + i * 30} 228`} delay={i * 0.8} />
      ))}
      {/* accumulation on the damaged area */}
      {film.map((dx, i) => (
        <motion.g key={dx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 1.4 + i * 0.25, duration: 0.5 }}>
          <ZnGlyph x={lesionCenter + dx} y={EPI_TOP + 40 - Math.abs(dx) * 0.4} s={0.9} />
        </motion.g>
      ))}
      <Appear delay={0.6}>
        <Callout x={30} y={60} text="Zinc-L-carnosine" color={LEAF} size={15} sub="66 mg par gélule" />
      </Appear>
      <Appear delay={2}>
        <Callout x={lesionCenter} y={334} text="Interaction locale avec la zone lésée" color={GREEN} size={15} anchor="middle" />
        <text x={lesionCenter} y={354} textAnchor="middle" fontSize={12.5} fill={SLATE}>
          (données principalement expérimentales)
        </text>
      </Appear>
    </Scene>
  )
}

/** Zinc-carnosine complexes drifting toward the lesion. */
function PathParticlesZn({ d, delay }: { d: string; delay: number }) {
  const { reduced } = useRuntime()
  return (
    <g>
      <g>
        <ZnGlyph x={0} y={0} s={0.9} />
        {reduced ? (
          <animateMotion dur="1s" path={d} keyPoints="0.5;0.5" keyTimes="0;1" calcMode="linear" fill="freeze" />
        ) : (
          <animateMotion dur="3.6s" path={d} begin={`${-delay}s`} repeatCount="indefinite" />
        )}
      </g>
    </g>
  )
}

function CytoprotectionScene() {
  return (
    <Scene>
      <Mucosa state="protected" />
      {[-40, 0, 40].map((dx) => (
        <ZnGlyph key={dx} x={lesionCenter + dx} y={EPI_TOP + 30} s={0.8} />
      ))}
      {/* ROS neutralised */}
      {[
        [150, 120],
        [250, 92],
        [380, 116],
        [470, 86],
        [330, 140],
      ].map(([x, y], i) => (
        <g key={i} style={{ animationDelay: `${i * 0.5}s` }}>
          <RosStar x={x} y={y} cls="mech-anim mech-fade-out" />
        </g>
      ))}
      {/* membrane stabilisation glow */}
      {CELLS.filter((_, i) => !LESION.has(i)).map((x) => (
        <rect key={x} x={x - 1} y={EPI_TOP - 1} width={CELL_W + 2} height={EPI_H + 2} rx={10} fill="none" stroke={LEAF} strokeWidth={2} className="mech-anim mech-breathe" />
      ))}
      <Appear delay={0.4}>
        <g transform="translate(18,48)">
          {[
            { t: 'Action antioxydante', c: ROS },
            { t: 'Stabilisation des membranes', c: LEAF },
            { t: 'Modulation des cytokines', c: '#6a3d8f' },
          ].map((it, i) => (
            <g key={it.t} transform={`translate(${[0, 160, 368][i]},0)`}>
              <rect width={[152, 200, 184][i]} height={34} rx={17} fill="white" stroke={it.c} strokeWidth={1.5} />
              <circle cx={16} cy={17} r={5} fill={it.c} />
              <text x={27} y={22} fontSize={12} fontWeight={700} fill={INK}>
                {it.t}
              </text>
            </g>
          ))}
        </g>
      </Appear>
      <Appear delay={1.2}>
        <Callout x={lesionCenter} y={334} text="Espèces réactives de l’oxygène neutralisées" color="#b06516" size={14.5} anchor="middle" />
      </Appear>
    </Scene>
  )
}

function RepairScene() {
  const { reduced } = useRuntime()
  const half = (x0: number, after: boolean) => {
    const w = 33
    const xs = Array.from({ length: 8 }, (_, i) => x0 + i * (w + 1))
    const gap = new Set([3, 4])
    return (
      <g>
        <rect x={x0} y={150} width={8 * (w + 1)} height={24} rx={7} fill="#f3e7c9" opacity={after ? 1 : 0.6} />
        {xs.map((x, i) => {
          if (gap.has(i) && !after) return null
          const migr = gap.has(i) && after
          const from = i === 3 ? -w : w
          return (
            <motion.g
              key={i}
              initial={migr ? { x: from, opacity: 0.3 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.9 + (i - 3) * 0.3, duration: reduced ? 0.01 : 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect x={x} y={176} width={w} height={84} rx={8} fill={migr ? '#dff0e4' : '#fbe3dc'} stroke={migr ? LEAF : '#e3a99b'} strokeWidth={1.2} />
              <circle cx={x + w / 2} cy={224} r={5.5} fill={migr ? '#9cc9a9' : '#e9b7aa'} />
            </motion.g>
          )
        })}
        <rect x={x0} y={266} width={8 * (w + 1)} height={70} rx={8} fill="#fbe9e4" />
      </g>
    )
  }
  return (
    <Scene>
      <text x={18} y={34} fontSize={13} fontWeight={700} fill={SLATE} letterSpacing="2">
        ILLUSTRATION PÉDAGOGIQUE
      </text>
      <text x={146} y={124} textAnchor="middle" fontSize={17} fontWeight={700} fill={ACID}>
        Avant
      </text>
      <text x={444} y={124} textAnchor="middle" fontSize={17} fontWeight={700} fill={GREEN}>
        Après
      </text>
      {half(10, false)}
      <line x1={295} y1={100} x2={295} y2={350} stroke="#d5dee7" strokeWidth={2} strokeDasharray="6 6" />
      {half(308, true)}
      <Appear delay={0.6}>
        <path d="M392 300 L416 300" stroke={LEAF} strokeWidth={2.5} markerEnd="url(#bd-arrow)" />
        <path d="M496 300 L472 300" stroke={LEAF} strokeWidth={2.5} markerEnd="url(#bd-arrow)" />
      </Appear>
      <Appear delay={1.8}>
        <Callout x={444} y={378} text="Migration et prolifération" color={GREEN} size={14.5} anchor="middle" sub="cellules épithéliales (in vitro)" />
        <Callout x={146} y={378} text="Barrière interrompue" color={ACID} size={14.5} anchor="middle" />
      </Appear>
    </Scene>
  )
}

function PhysiologyScene() {
  const pump = (x: number, blocked: boolean) => (
    <g transform={`translate(${x},0)`}>
      <rect x={-120} y={170} width={240} height={150} rx={26} fill="#fbe3dc" stroke="#e3a99b" strokeWidth={1.5} />
      <text x={0} y={296} textAnchor="middle" fontSize={13} fill={SLATE}>
        Cellule pariétale
      </text>
      <circle cx={0} cy={236} r={14} fill="#e9b7aa" />
      {/* H+/K+ ATPase on the apical membrane */}
      <rect x={-22} y={158} width={44} height={26} rx={8} fill={blocked ? '#9aa3ad' : ACID} />
      <text x={0} y={175} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="white">
        H⁺/K⁺
      </text>
      {blocked ? (
        <g stroke={ACID} strokeWidth={4} strokeLinecap="round">
          <line x1={-20} y1={124} x2={20} y2={150} />
          <line x1={20} y1={124} x2={-20} y2={150} />
        </g>
      ) : (
        <PathParticles d="M0 156 C0 130 -6 110 -4 84" count={3} dur={2.4} r={9} label="H⁺" fill={ACID} />
      )}
    </g>
  )
  return (
    <Scene>
      <text x={150} y={40} textAnchor="middle" fontSize={17} fontWeight={700} fill={GREEN}>
        Zinc-L-carnosine
      </text>
      <text x={150} y={60} textAnchor="middle" fontSize={13} fill={SLATE}>
        protège la muqueuse
      </text>
      <text x={440} y={40} textAnchor="middle" fontSize={17} fontWeight={700} fill={SLATE}>
        IPP (comparaison)
      </text>
      <text x={440} y={60} textAnchor="middle" fontSize={13} fill={SLATE}>
        inhibent la pompe à protons
      </text>
      {pump(150, false)}
      {[-90, 90].map((dx) => (
        <ZnGlyph key={dx} x={150 + dx} y={160} s={0.85} />
      ))}
      <line x1={295} y1={20} x2={295} y2={360} stroke="#d5dee7" strokeWidth={2} strokeDasharray="6 6" />
      {pump(440, true)}
      <Appear delay={0.8}>
        <rect x={40} y={350} width={220} height={52} rx={14} fill="#e3efe6" />
        <text x={150} y={372} textAnchor="middle" fontSize={14} fontWeight={700} fill={GREEN}>
          Sécrétion acide conservée
        </text>
        <text x={150} y={391} textAnchor="middle" fontSize={12.5} fill={GREEN}>
          pas d’effet antisécrétoire
        </text>
        <rect x={330} y={350} width={220} height={52} rx={14} fill="#eef1f4" />
        <text x={440} y={372} textAnchor="middle" fontSize={14} fontWeight={700} fill={SLATE}>
          Sécrétion acide réduite
        </text>
        <text x={440} y={391} textAnchor="middle" fontSize={12.5} fill={SLATE}>
          traitement de référence si indiqué
        </text>
      </Appear>
    </Scene>
  )
}

function MicrobiotaScene() {
  const villi = Array.from({ length: 7 }, (_, i) => 20 + i * 80)
  return (
    <Scene>
      <text x={18} y={30} fontSize={13} fontWeight={700} fill={SLATE} letterSpacing="2">
        LUMIÈRE INTESTINALE
      </text>
      {/* microbiota */}
      {[
        [90, 70, 10, '#4f8a6a'],
        [160, 104, -20, '#6a8fb0'],
        [250, 64, 30, '#4f8a6a'],
        [330, 112, 0, '#9a7bb6'],
        [420, 74, -15, '#6a8fb0'],
        [500, 108, 22, '#4f8a6a'],
        [540, 56, -30, '#9a7bb6'],
      ].map(([x, y, r, c], i) => (
        <Bacterium key={i} x={x as number} y={y as number} rot={r as number} color={c as string} />
      ))}
      {[
        [210, 140],
        [460, 140],
        [120, 132],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={8} fill="#7fb894" opacity={0.8} />
      ))}
      {/* villi */}
      {villi.map((x) => (
        <g key={x}>
          <path d={`M${x} 330 L${x} 200 Q${x} 166 ${x + 35} 166 Q${x + 70} 166 ${x + 70} 200 L${x + 70} 330 Z`} fill="#fbe3dc" stroke="#e3a99b" strokeWidth={1.3} />
          {[0, 1].map((k) => (
            <rect key={k} x={x + 33} y={196 + k * 50} width={4} height={14} rx={2} fill={GREEN} />
          ))}
        </g>
      ))}
      <rect x={6} y={330} width={578} height={40} rx={8} fill="#fbe9e4" />
      {/* zinc at the junctions */}
      {villi.slice(0, 6).map((x) => (
        <circle key={x} cx={x + 75} cy={312} r={6} fill={ZN} className="mech-anim mech-breathe" />
      ))}
      <Appear delay={0.6}>
        <g transform="translate(14,388)">
          <rect width={274} height={76} rx={14} fill="#e3efe6" />
          <text x={14} y={24} fontSize={11.5} fontWeight={800} fill={GREEN} letterSpacing="1.5">
            PHYSIOLOGIE
          </text>
          <text x={14} y={46} fontSize={13.5} fontWeight={600} fill={INK}>
            Le zinc participe à l’intégrité
          </text>
          <text x={14} y={64} fontSize={13.5} fontWeight={600} fill={INK}>
            de la barrière épithéliale
          </text>
        </g>
      </Appear>
      <Appear delay={1.3}>
        <g transform="translate(302,388)">
          <rect width={274} height={76} rx={14} fill="white" stroke="#9a7bb6" strokeWidth={1.5} strokeDasharray="6 5" />
          <text x={14} y={24} fontSize={11.5} fontWeight={800} fill="#6a3d8f" letterSpacing="1.5">
            RECHERCHE ÉMERGENTE
          </text>
          <text x={14} y={46} fontSize={13.5} fontWeight={600} fill={INK}>
            Zinc et microbiote : données
          </text>
          <text x={14} y={64} fontSize={13.5} fontWeight={600} fill={INK}>
            surtout précliniques
          </text>
        </g>
      </Appear>
    </Scene>
  )
}

const SCENES: Record<string, () => React.ReactElement> = {
  alteration: AlterationScene,
  znc: ZncScene,
  cytoprotection: CytoprotectionScene,
  repair: RepairScene,
  physiology: PhysiologyScene,
  microbiota: MicrobiotaScene,
}

function ZncBar({ on }: { on: boolean }) {
  return (
    <g transform={`translate(${PANEL_W / 2 - 150}, ${PANEL_H - 50})`}>
      <rect width={300} height={34} rx={17} fill={on ? GREEN : 'white'} stroke={GREEN} strokeWidth={on ? 0 : 1.5} opacity={on ? 1 : 0.75} />
      <text x={150} y={22} textAnchor="middle" fontSize={14.5} fontWeight={700} fill={on ? 'white' : GREEN}>
        Zinc-L-carnosine · 66 mg par gélule
      </text>
    </g>
  )
}

export function BioDigestVisual({ stage, stages, goToStageId, replayKey, interactive = true }: VisualContext & { interactive?: boolean }) {
  const SceneComp = SCENES[stage.id]
  const focus = stage.id === 'microbiota' ? 'intestine' : 'stomach'
  const target = HOTSPOTS.find((h) => h.id === focus)!
  const available = new Set(stages.map((s) => s.id))
  return (
    <svg viewBox="0 0 960 560" className="h-full w-full" style={FONT_STYLE} role="img" aria-label={`BioDigest — ${stage.title}`}>
      <defs>
        <marker id="bd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" fill="none" stroke={LEAF} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      <GiTract focus={focus} />
      <g key={`cone-${focus}`}>
        <path d={`M${target.x} ${target.y} L${PANEL_X} 24 L${PANEL_X} ${24 + PANEL_H} Z`} fill={GREEN} opacity={0.06} />
        <path d={`M${target.x} ${target.y} L${PANEL_X} 24 M${target.x} ${target.y} L${PANEL_X} ${24 + PANEL_H}`} stroke={GREEN} strokeWidth={1} strokeDasharray="4 5" opacity={0.5} />
      </g>
      {HOTSPOTS.map((h) => (
        <Hotspot
          key={h.id}
          x={h.x}
          y={h.y}
          label={h.label}
          color={GREEN}
          active={h.id === focus}
          labelSide={h.side}
          onSelect={interactive && available.has(h.stage) ? () => goToStageId(h.stage) : undefined}
        />
      ))}
      <g transform={`translate(${PANEL_X},24)`}>
        <rect width={PANEL_W} height={PANEL_H} rx={24} fill="#fbfcfd" stroke={GREEN} strokeOpacity={0.3} strokeWidth={1.5} />
        <AnimatePresence mode="wait">
          <g key={`${stage.id}-${replayKey}`}>{SceneComp && <SceneComp />}</g>
        </AnimatePresence>
        {stage.id !== 'microbiota' && <ZncBar on={stage.highlight === 'znc'} />}
      </g>
    </svg>
  )
}

export default function BioDigestMechanism({ product }: { product: Product }) {
  return (
    <MechanismEngine
      product={product}
      productId="biodigest"
      accent={product.accent}
      eyebrow="BioDigest · Mécanisme d’action"
      renderVisual={(ctx) => <BioDigestVisual {...ctx} />}
    />
  )
}
