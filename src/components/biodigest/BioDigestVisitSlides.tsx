import { Beaker, BookOpen, ShieldAlert, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState, type ReactNode } from 'react'
import {
  BIBLIOGRAPHY,
  DATA_LIMITS,
  FUNCTION_CARDS,
  MUCOSA_CARDS,
  type AnatomyZone,
  type FunctionCard,
  type MucosaCard,
} from '../../data/biodigestStory'
import { claimText, commercialClaims } from '../../data/commercialClaims'
import { evidence, LEVEL_LABEL } from '../../data/evidence'
import { NOT_A_TREATMENT, STANDARD_PRECAUTIONS } from '../../data/products'
import type { Product } from '../../data/types'
import { MotionRuntime } from '../bio3mag/anims'
import { Eyebrow, LevelChip, RefLine } from '../commercial/shared'
import { FONT_STYLE, Hotspot, INK, PathParticles, SLATE } from '../mechanisms/kit'
import { BioDigestScene } from '../mechanisms/BioDigestMechanism'
import { useSlide } from '../presentation/SlideContext'
import { Packshot } from '../products/Packshot'
import { SlideShell } from '../ui/SlideShell'
import { Drawer, FlagTunisia, PolymerChain } from './BioDigestStorySlides'

const GREEN = '#1d5a39'
const ZN = '#5b7a99'
const CARN = '#c9752c'
const EASE = [0.22, 1, 0.36, 1] as const

function useFlags() {
  const { layout, isPrint } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  return { canvas: layout === 'canvas', reduced }
}

function StatusNote({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl bg-sage px-3 py-2 text-[16px] leading-snug text-forest">
      <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
      {children ?? commercialClaims['biodigest-not-a-drug'].text}
    </p>
  )
}

function ClaimBlock({ ids, caveat }: { ids: string[]; caveat?: string }) {
  const items = ids.map((id) => evidence[id]).filter((c) => c && c.status !== 'unsupported')
  return (
    <ul className="flex flex-col gap-3">
      {items.map((c) => {
        const level = LEVEL_LABEL[c.level]
        return (
          <li key={c.id} className="rounded-2xl border border-navy/10 bg-white px-4 py-3">
            <p className="leading-snug text-ink">{c.fr}</p>
            <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[15.5px] font-semibold" style={{ color: level.tone }}>
              <span className="size-2 rounded-full" style={{ background: level.tone }} aria-hidden />
              {level.short}
            </p>
          </li>
        )
      })}
      {caveat && <li className="border-l-2 border-forest pl-3 text-[17px] italic leading-snug text-slate">{caveat}</li>}
    </ul>
  )
}

function SceneDrawer({
  title,
  onClose,
  scene,
  children,
}: {
  title: string
  onClose: () => void
  scene: string
  children: ReactNode
}) {
  return (
    <Drawer title={title} onClose={onClose}>
      <MotionRuntime>
        <div className="mb-4 overflow-hidden rounded-[22px] border border-navy/10 bg-white">
          <BioDigestScene id={scene} />
        </div>
        {children}
      </MotionRuntime>
    </Drawer>
  )
}

/* ============================================================ 1 — complex */

function BodySilhouette({
  focus,
  onSelect,
}: {
  focus: AnatomyZone | 'all'
  onSelect: (zone: AnatomyZone) => void
}) {
  const on = (id: AnatomyZone) => focus === 'all' || focus === id
  const active = (id: AnatomyZone) => focus !== 'all' && focus === id
  return (
    <g transform="translate(8,8) scale(0.92)" aria-hidden>
      <g fill="#dbe7f1">
        <ellipse cx="150" cy="52" rx="32" ry="38" />
        <rect x="136" y="84" width="28" height="36" rx="8" />
        <path d="M104 124 Q150 108 196 124 Q212 130 210 160 L204 214 Q200 262 196 300 Q198 322 194 336 L106 336 Q102 322 104 300 Q100 262 96 214 L90 160 Q88 130 104 124 Z" />
        <path d="M104 126 Q84 130 80 160 L70 236 Q64 270 62 318 Q61 330 66 338 L77 338 Q80 300 85 270 L97 208 Z" />
        <ellipse cx="70" cy="350" rx="10" ry="15" />
        <path d="M106 330 L149 334 L145 440 Q143 500 141 560 L118 562 Q114 500 112 444 Q103 380 106 330 Z" />
        <ellipse cx="128" cy="569" rx="17" ry="7" />
        <g transform="translate(300,0) scale(-1,1)">
          <path d="M104 126 Q84 130 80 160 L70 236 Q64 270 62 318 Q61 330 66 338 L77 338 Q80 300 85 270 L97 208 Z" />
          <ellipse cx="70" cy="350" rx="10" ry="15" />
          <path d="M106 330 L149 334 L145 440 Q143 500 141 560 L118 562 Q114 500 112 444 Q103 380 106 330 Z" />
          <ellipse cx="128" cy="569" rx="17" ry="7" />
        </g>
      </g>
      <g opacity={on('stomach') ? 1 : 0.45}>
        <path
          d="M146 118 C176 104 232 118 242 168 C250 214 214 252 170 252 C138 252 116 236 122 218 C128 202 152 210 168 200 C184 190 180 158 160 142 C152 134 146 126 146 118 Z"
          fill="#f0b2a2"
          stroke="#d98b7c"
          strokeWidth="2"
        />
        <path d="M150 0 L150 118" stroke="#e3a08d" strokeWidth="10" strokeLinecap="round" fill="none" />
      </g>
      <g fill="none" strokeLinecap="round" opacity={on('intestine') ? 1 : 0.4}>
        <path d="M121 318 L121 258 Q121 250 129 250 L171 250 Q179 250 179 258 L179 318" stroke="#e3a08d" strokeWidth="9" />
        <path d="M132 264 q10 -6 18 0 t18 0 M132 278 q10 6 18 0 t18 0 M132 292 q10 -6 18 0 t18 0 M134 306 q8 6 16 0 t16 0" stroke="#efb9a8" strokeWidth="5.5" />
      </g>
      <Hotspot x={186} y={176} label="Estomac" color={GREEN} active={active('stomach')} labelSide="right" onSelect={() => onSelect('stomach')} />
      <Hotspot x={150} y={284} label="Intestin" color={GREEN} active={active('intestine')} labelSide="right" onSelect={() => onSelect('intestine')} />
    </g>
  )
}

function ComplexVisual({
  selected,
  onSelect,
}: {
  selected: FunctionCard | null
  onSelect: (card: FunctionCard) => void
}) {
  const focus: AnatomyZone | 'all' = selected?.anatomy ?? 'all'
  const ion = { x: 295, y: 148 }
  const donors = [
    { x: 120, label: 'Zinc', c: ZN },
    { x: 470, label: 'L-carnosine', c: CARN },
  ]
  return (
    <svg viewBox="0 0 960 560" className="h-full w-full" style={FONT_STYLE} role="img" aria-label="BioDigest — un complexe unique, plusieurs mécanismes">
      <BodySilhouette
        focus={focus}
        onSelect={(zone) => {
          const card = FUNCTION_CARDS.find((c) => c.anatomy === zone)
          if (card) onSelect(card)
        }}
      />
      <g transform="translate(350,24)">
        <rect width={590} height={520} rx={24} fill="#fbfcfd" stroke={GREEN} strokeOpacity={0.3} strokeWidth={1.5} />
        {donors.map((s) => (
          <g key={s.label}>
            <rect x={s.x - 70} y={28} width={140} height={32} rx={16} fill="white" stroke={s.c} strokeWidth={1.5} />
            <text x={s.x} y={49} textAnchor="middle" fontSize={14} fontWeight={700} fill={s.c}>
              {s.label}
            </text>
            <PathParticles d={`M${s.x} 62 C${s.x} 108 ${ion.x} 108 ${ion.x} ${ion.y - 34}`} count={3} dur={2.4} r={5} fill={s.c} />
          </g>
        ))}
        <circle cx={ion.x} cy={ion.y} r={34} fill={GREEN} stroke="white" strokeWidth={2} />
        <text x={ion.x} y={ion.y - 2} textAnchor="middle" fontSize={13} fontWeight={800} fill="white">
          Zn–Car
        </text>
        <text x={ion.x} y={ion.y + 14} textAnchor="middle" fontSize={10} fontWeight={600} fill="white">
          1:1
        </text>
        {FUNCTION_CARDS.map((card, k) => {
          const tw = 178
          const th = 84
          const x = 12 + (k % 3) * (tw + 10)
          const y = 262 + Math.floor(k / 3) * (th + 12)
          const active = selected?.id === card.id
          return (
            <g key={card.id}>
              <path
                d={`M${ion.x} ${ion.y + 34} C${ion.x} ${ion.y + 64} ${x + tw / 2} ${y - 36} ${x + tw / 2} ${y}`}
                fill="none"
                stroke={active ? GREEN : '#b9c8d6'}
                strokeWidth={active ? 1.8 : 1.2}
                strokeDasharray="4 4"
              />
              <g
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={card.lines.join(' ')}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(card)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    onSelect(card)
                  }
                }}
                className="cursor-pointer"
              >
                <rect x={x} y={y} width={tw} height={th} rx={16} fill="white" stroke={active ? GREEN : '#d5e2ee'} strokeWidth={active ? 2 : 1} />
                <rect x={x + 16} y={y + 16} width={26} height={4} rx={2} fill={GREEN} />
                <text x={x + 16} y={y + 44} fontSize={14.5} fontWeight={700} fill={INK}>
                  {card.lines[0]}
                </text>
                <text x={x + 16} y={y + 64} fontSize={14.5} fontWeight={700} fill={INK}>
                  {card.lines[1]}
                </text>
              </g>
            </g>
          )
        })}
        <text x={295} y={504} textAnchor="middle" fontSize={12} fill={SLATE}>
          Données sur le polaprezinc / zinc L-carnosine — pas sur BioDigest
        </text>
      </g>
    </svg>
  )
}

export function BdComplexSlide({ product }: { product: Product }) {
  const { canvas } = useFlags()
  const [selected, setSelected] = useState<FunctionCard | null>(null)

  return (
    <SlideShell product={product} headerPackshot={false} tone="tint">
      <Eyebrow color={product.accent}>BioDigest · Mécanisme d’action</Eyebrow>
      <h2 className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 text-[54px]' : 'mt-1 text-[2.3rem]'}`}>
        Comment agit le zinc carnosine ?
      </h2>
      <MotionRuntime>
        <div
          className={`relative mt-4 min-h-0 flex-1 overflow-hidden rounded-[28px] border border-navy/10 bg-white/80 shadow-[0_24px_50px_-34px_rgb(14_26_43/0.35)] ${canvas ? '' : 'aspect-[960/560]'}`}
        >
          <div className={canvas ? 'absolute inset-0' : 'h-full w-full'}>
            <ComplexVisual selected={selected} onSelect={setSelected} />
          </div>
        </div>
      </MotionRuntime>
      <AnimatePresence>
        {selected && (
          <SceneDrawer title={selected.lines.join(' ')} scene={selected.scene} onClose={() => setSelected(null)}>
            <p className="mb-4 text-[19px] leading-snug text-navy">{selected.lead}</p>
            <ClaimBlock ids={selected.claims} caveat={selected.caveat} />
            <p className="mt-4 text-[15.5px] text-slate">Cliquer une carte pour l’animation détaillée. Estomac et intestin sont interactifs.</p>
          </SceneDrawer>
        )}
      </AnimatePresence>
    </SlideShell>
  )
}

/* ============================================================ 2 — exclusivity + molecule (heritage slot) */

const MOLECULE_CARDS = [
  {
    title: 'Complexe spécifique',
    text: 'Zinc lié à la L-carnosine (1:1), distinct d’un sel de zinc classique.',
  },
  {
    title: 'Intérêt pour la muqueuse',
    text: 'Action locale sur la muqueuse gastrique étudiée.',
  },
  {
    title: 'Non antisécrétoire',
    text: 'Ne bloque pas la pompe à protons ; ne remplace pas un IPP.',
  },
] as const

/** Rotating circular stamp « Exclusivité Nutriome Labs · Tunisie ». */
function ExclusiveSeal({ size = 150, reduced }: { size?: number; reduced: boolean }) {
  const text = 'EXCLUSIVITÉ NUTRIOME LABS · TUNISIE · '
  const ring = `seal-${useId().replace(/:/g, '')}`
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id={ring} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill={GREEN} />
        <circle cx="100" cy="100" r="88" fill="none" stroke="white" strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="3 5" />
        <text fontSize="15.5" fontWeight={800} letterSpacing="2.2" fill="white">
          <textPath href={`#${ring}`}>{text}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[24%] flex items-center justify-center rounded-full bg-white shadow-inner">
        <FlagTunisia className="w-[70%]" />
      </div>
    </div>
  )
}

export function BdHeritageSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const exclusivity = claimText('biodigest-exclusivity')
  const exclusive = commercialClaims['biodigest-exclusivity'].status === 'validated'

  return (
    <SlideShell product={product} headerPackshot={false} tone="tint">
      <Eyebrow color={product.accent}>BioDigest · {exclusive ? 'Exclusivité Nutriome Labs' : 'Zinc Carnosine'}</Eyebrow>
      <h2 className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 text-[52px]' : 'mt-1 text-[2.15rem]'}`}>
        {exclusive ? (
          <>
            Le zinc carnosine, en Tunisie, <em className="text-forest">uniquement</em> chez Nutriome Labs
          </>
        ) : (
          'Zinc Carnosine : l’actif différenciant de BioDigest'
        )}
      </h2>

      <MotionRuntime>
        <div className={`mt-4 min-h-0 flex-1 ${canvas ? 'grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-6' : 'flex flex-col gap-4'}`}>
          {/* exclusivity hero */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex min-h-0 flex-col overflow-hidden rounded-[30px] px-7 py-6 text-white shadow-[0_30px_60px_-36px_rgb(14_26_43/0.7)]"
            style={{ background: `linear-gradient(140deg, ${GREEN} 0%, #154630 60%, #0f3a27 100%)` }}
          >
            <div className={`flex min-h-0 flex-1 items-center ${canvas ? 'gap-10' : 'flex-col gap-4'}`}>
              <div className="relative shrink-0">
                <Packshot
                  product={product}
                  className={canvas ? 'w-[440px]' : 'w-[240px]'}
                  fill
                  eager
                  glow={false}
                />
                {exclusive && (
                  <motion.div
                    className="absolute -top-10 -right-8 z-10"
                    initial={reduced ? false : { scale: 0, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 14 }}
                  >
                    <ExclusiveSeal size={canvas ? 148 : 104} reduced={reduced} />
                  </motion.div>
                )}
              </div>
              <div className="min-w-0">
                {exclusive && (
                  <span className="inline-flex items-center rounded-full bg-[#f3c86b] px-3 py-1 text-[15px] font-bold uppercase tracking-[0.16em] text-[#3d2a05]">
                    Seul importateur en Tunisie
                  </span>
                )}
                <p className={`mt-3 font-serif leading-snug ${canvas ? 'text-[35px]' : 'text-xl'}`}>{exclusivity}</p>
                <p className={`mt-3 leading-snug text-white/80 ${canvas ? 'text-[19px]' : 'text-sm'}`}>
                  Proposée en Tunisie avec BioDigest, en complément alimentaire.
                </p>
              </div>
            </div>
          </motion.div>

          {/* molecule */}
          <div className="flex min-h-0 flex-col gap-3">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
              className="rounded-[24px] border border-navy/10 bg-white/90 px-5 py-3"
            >
              <p className="text-[14.5px] font-semibold uppercase tracking-[0.16em] text-forest">Complexe zinc · L-carnosine · 1:1</p>
              <PolymerChain units={2} className={`mt-1 w-full ${canvas ? 'h-[130px]' : 'h-[110px]'}`} />
            </motion.div>
            {MOLECULE_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.45, ease: EASE }}
                className="flex gap-3 rounded-[20px] border border-navy/10 bg-white px-4 py-3"
              >
                <span className="mt-1 h-8 w-1 shrink-0 rounded-full bg-forest" aria-hidden />
                <div>
                  <p className={`font-semibold leading-snug text-navy ${canvas ? 'text-[20.5px]' : 'text-base'}`}>{card.title}</p>
                  <p className={`mt-0.5 leading-snug text-slate ${canvas ? 'text-[17.5px]' : 'text-[15.5px]'}`}>{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ============================================================ 3 — mucosa */

export function BdMucosaSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const [open, setOpen] = useState<MucosaCard | null>(null)
  const [drawer, setDrawer] = useState<'composition' | 'precautions' | 'biblio' | null>(null)
  const extras = [
    { id: 'composition' as const, label: 'Composition', icon: Beaker },
    { id: 'precautions' as const, label: 'Précautions', icon: ShieldAlert },
    { id: 'biblio' as const, label: 'Bibliographie', icon: BookOpen },
  ]

  const precautions = product.precautions.filter((p) => p !== NOT_A_TREATMENT && !STANDARD_PRECAUTIONS.includes(p))

  return (
    <SlideShell product={product} headerPackshot={false}>
      <Eyebrow color={product.accent}>BioDigest · Données cliniques</Eyebrow>
      <h2 className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 text-[50px]' : 'mt-1 text-[2.15rem]'}`}>
        Ce que montrent les études sur le zinc L-carnosine
      </h2>
      <div className={`mt-4 grid min-h-0 flex-1 gap-4 ${canvas ? 'grid-cols-[1fr_1fr_380px]' : 'grid-cols-1'}`}>
        {MUCOSA_CARDS.map((card, i) => (
          <motion.button
            key={card.id}
            type="button"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: EASE }}
            onClick={() => setOpen(card)}
            className="flex min-h-0 flex-col rounded-[24px] border border-navy/10 bg-white px-6 py-5 text-left shadow-[0_18px_40px_-32px_rgb(14_26_43/0.4)] hover:border-forest/40"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-sage font-serif text-[19px] text-forest">{i + 1}</span>
              <LevelChip level={card.level} />
            </div>
            <p className={`mt-3 font-serif leading-snug text-navy ${canvas ? 'text-[30px]' : 'text-lg'}`}>{card.title}</p>
            <p className={`mt-2 leading-snug text-slate ${canvas ? 'text-[19px]' : 'text-sm'}`}>{card.summary}</p>
            <div className="mt-auto pt-4">
              <p className={`font-serif leading-none text-forest ${canvas ? 'text-[52px]' : 'text-3xl'}`}>{card.figure.value}</p>
              <p className="mt-1.5 text-[16px] leading-snug text-slate">{card.figure.label}</p>
              <p className="mt-3 text-[15.5px] font-semibold text-forest">Animation, études et limites →</p>
            </div>
          </motion.button>
        ))}
        <div className="flex min-h-0 flex-col rounded-[24px] border border-amber/30 bg-[#fdf6ec] px-5 py-5">
          <p className="flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.14em] text-[#9a5b12]">
            <ShieldAlert className="size-4" aria-hidden /> Limites des données
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {DATA_LIMITS.map((l) => (
              <li key={l} className="flex gap-2 text-[17.5px] leading-snug text-ink">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {extras.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setDrawer(e.id)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-navy/15 bg-white px-3.5 text-[16px] font-semibold text-navy hover:bg-navy/5"
          >
            <e.icon className="size-4" aria-hidden />
            {e.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <SceneDrawer title={open.title} scene={open.scene} onClose={() => setOpen(null)}>
            <p className="mb-3 text-[19px] leading-snug text-navy">{open.summary}</p>
            <ClaimBlock ids={open.claims} caveat={open.caveat} />
            <p className="mt-5 mb-2 text-[14.5px] font-semibold uppercase tracking-[0.14em] text-slate">Études</p>
            <ul className="flex flex-col gap-2">
              {open.refs.map((id) => (
                <RefLine key={id} id={id} />
              ))}
            </ul>
          </SceneDrawer>
        )}
        {drawer === 'composition' && (
          <Drawer title="Composition" onClose={() => setDrawer(null)}>
            <p className="mb-3 text-[15.5px] font-semibold uppercase tracking-[0.12em] text-slate">{product.doseBasis.fr}</p>
            <ul className="flex flex-col gap-3">
              {product.ingredients.map((ing) => (
                <li key={ing.name.fr} className="rounded-2xl border border-navy/10 bg-white px-4 py-3">
                  <p className="font-serif text-[32px] text-navy">
                    {ing.quantity} <span className="font-sans text-base text-slate">{ing.unit}</span>
                  </p>
                  <p className="font-semibold text-ink">{ing.name.fr}</p>
                  {ing.detail && <p className="text-[17px] text-slate">{ing.detail.fr}</p>}
                </li>
              ))}
            </ul>
          </Drawer>
        )}
        {drawer === 'precautions' && (
          <Drawer title="Précautions" onClose={() => setDrawer(null)}>
            <ul className="mb-4 flex flex-col gap-2">
              {precautions.map((p) => (
                <li key={p.fr} className="flex gap-2 text-[18px] leading-snug text-ink">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" />
                  {p.fr}
                </li>
              ))}
            </ul>
            <StatusNote />
          </Drawer>
        )}
        {drawer === 'biblio' && (
          <Drawer title="Bibliographie" onClose={() => setDrawer(null)}>
            <p className="mb-3 text-[15.5px] text-slate">Études menées avec le polaprezinc / zinc L-carnosine — aucune sur BioDigest lui-même.</p>
            <ul className="flex flex-col gap-2.5">
              {BIBLIOGRAPHY.map((id) => (
                <RefLine key={id} id={id} />
              ))}
            </ul>
          </Drawer>
        )}
      </AnimatePresence>
    </SlideShell>
  )
}
