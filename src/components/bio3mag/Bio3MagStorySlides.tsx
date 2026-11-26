import { Atom, Droplets, Leaf, Scale } from 'lucide-react'
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import {
  COMFORT_COLUMNS,
  COMFORT_REFS,
  COMFORT_ROWS,
  ENZYME_REFS,
  ENZYME_STEPS,
  INTRO,
  ORIENTATIONS,
  SALT_CARDS,
  type SaltCard,
} from '../../data/bio3magStory'
import { stagesFor } from '../../data/mechanisms'
import { claimText } from '../../data/commercialClaims'
import type { Product } from '../../data/types'
import { Eyebrow, RefLine } from '../commercial/shared'
import { Bio3MagVisual } from '../mechanisms/Bio3MagMechanism'
import { MgIon, PathParticles } from '../mechanisms/kit'
import { useDeck } from '../presentation/DeckContext'
import { useSlide } from '../presentation/SlideContext'
import { Packshot } from '../products/Packshot'
import { BisglycinateMolecule, CitrateMolecule, MalateMolecule } from '../scientific/molecules/MagnesiumForms'
import { SlideShell } from '../ui/SlideShell'
import { BISGLY, CITRATE, MALATE, MG, MiniMito, MiniMuscle, MiniNeuronGut, MotionRuntime } from './anims'

const EASE = [0.22, 1, 0.36, 1] as const

function useFlags() {
  const { layout, isPrint } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  return { canvas: layout === 'canvas', reduced }
}

function Heading({ children, size = 56 }: { children: ReactNode; size?: number }) {
  const { canvas } = useFlags()
  return (
    <h2 className="font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance" style={{ fontSize: canvas ? size : '2.1rem', marginTop: 6 }}>
      {children}
    </h2>
  )
}

function Refs({ ids, label = 'Références' }: { ids: string[]; label?: string }) {
  return (
    <details className="text-[15px] text-slate">
      <summary className="cursor-pointer select-none font-semibold text-ink">{label}</summary>
      <ul className="mt-1.5 flex flex-col gap-1">
        {[...new Set(ids)].map((id) => (
          <RefLine key={id} id={id} />
        ))}
      </ul>
    </details>
  )
}

/* ============================================================ A — introduction */

const PILLAR_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  bioavailability: Droplets,
  comfort: Leaf,
  enzymes: Atom,
  balance: Scale,
}
const PILLAR_COLORS: Record<string, string> = { bioavailability: CITRATE, comfort: BISGLY, enzymes: MALATE, balance: '#6a3d8f' }

export function Bio3MagIntroSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const { slides, goToSlideId } = useDeck()
  const target = (kind: string) => {
    const id = `${product.slug}-${kind}`
    return slides.some((s) => s.id === id) ? id : null
  }
  return (
    <SlideShell product={product} headerPackshot={false}>
      <div className={`min-h-0 flex-1 gap-10 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_400px] items-center' : 'flex flex-col'}`}>
        <div className="flex flex-col">
          <Eyebrow color={product.accent}>Bio3Mag · Formulation</Eyebrow>
          <Heading size={58}>
            Bio3Mag — <em className="text-ocean">L’intelligence</em> d’une triple formulation
          </Heading>
          <p className={`mt-4 max-w-[760px] leading-snug text-slate ${canvas ? 'text-[26px]' : 'text-[1.25rem]'}`}>{claimText('bio3mag-subtitle')}</p>
          <div className={`mt-7 grid gap-4 ${canvas ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {INTRO.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[p.id]
              const color = PILLAR_COLORS[p.id]
              const link = target(p.slide)
              return (
                <motion.button
                  type="button"
                  disabled={!link}
                  onClick={() => link && goToSlideId(link)}
                  key={p.id}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.18, duration: 0.6, ease: EASE }}
                  className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white px-5 py-4 text-left shadow-[0_20px_40px_-32px_rgb(14_26_43/0.5)] enabled:hover:border-navy/25"
                >
                  <motion.span
                    className="absolute top-0 left-0 h-1 rounded-r-full"
                    style={{ background: color }}
                    initial={reduced ? false : { width: 0 }}
                    animate={{ width: '38%' }}
                    transition={{ delay: 0.7 + i * 0.18, duration: 0.7, ease: EASE }}
                  />
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}18`, color }}>
                      <Icon className="size-5" />
                    </span>
                    <p className={`font-semibold leading-tight text-navy ${canvas ? 'text-[23px]' : 'text-base'}`}>{p.title}</p>
                  </div>
                  <p className={`mt-2 flex items-center justify-between gap-2 leading-snug text-slate ${canvas ? 'text-[18px]' : 'text-sm'}`}>
                    {p.text}
                    {link && <span className="shrink-0 text-[15.5px] font-semibold" style={{ color }}>Voir →</span>}
                  </p>
                </motion.button>
              )
            })}
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <Packshot product={product} className={canvas ? 'w-[360px]' : 'w-[220px]'} eager />
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {SALT_CARDS.map((s) => (
              <span key={s.id} className="rounded-full px-3 py-1 text-[17px] font-semibold text-white" style={{ background: s.color }}>
                {s.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </SlideShell>
  )
}

/* ============================================================ B — why these salts */

const SALT_ANIM: Record<SaltCard['id'], ComponentType<{ className?: string }>> = {
  malate: MiniMito,
  citrate: MiniMuscle,
  bisglycinate: MiniNeuronGut,
}
const SALT_MOL: Record<SaltCard['id'], ComponentType<{ className?: string }>> = {
  malate: MalateMolecule,
  citrate: CitrateMolecule,
  bisglycinate: BisglycinateMolecule,
}

function SaltCardView({ card, open, onOpen, index }: { card: SaltCard; open: boolean; onOpen: () => void; index: number }) {
  const { canvas, reduced } = useFlags()
  const Anim = SALT_ANIM[card.id]
  const Mol = SALT_MOL[card.id]
  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.15, duration: 0.55, ease: EASE, layout: { duration: 0.45, ease: EASE } }}
      className={`flex min-h-0 flex-col overflow-hidden rounded-[26px] border bg-white shadow-[0_22px_44px_-34px_rgb(14_26_43/0.55)] ${canvas ? '' : 'w-full'}`}
      style={{ flex: canvas ? (open ? 1.55 : 1) : undefined, borderColor: open ? card.color : 'rgb(14 26 43 / 0.1)' }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        className="flex flex-col text-left"
        aria-label={`${card.name} — ${card.orientation}`}
      >
        <div className="relative" style={{ background: card.soft }}>
          <Anim className="h-[130px] w-full" />
          <span className="absolute top-3 left-4 rounded-full bg-white/90 px-2.5 py-0.5 text-[15px] font-semibold" style={{ color: card.color }}>
            {card.dose} par gélule
          </span>
        </div>
        <div className="px-5 pt-4">
          <p className="text-[15.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: card.color }}>
            {card.orientation}
          </p>
          <h3 className={`font-serif leading-tight text-navy ${canvas ? 'text-[35px]' : 'text-2xl'}`}>Magnésium {card.name.toLowerCase()}</h3>
        </div>
      </button>
      <ul className="flex flex-col gap-2 px-5 pt-3 pb-4">
        {card.points
          .filter((pt) => pt.scope === 'salt')
          .map((pt) => (
            <li key={pt.text} className="flex gap-2">
              <span className="mt-[8px] size-1.5 shrink-0 rounded-full" style={{ background: card.color }} aria-hidden />
              <span className={`leading-snug text-ink ${canvas ? 'text-[19px]' : 'text-sm'}`}>{pt.text}</span>
            </li>
          ))}
      </ul>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-auto border-t border-navy/8 px-5 pt-3 pb-4"
          >
            <div className="flex items-center gap-3">
              <span className="block h-16 w-28 shrink-0">
                <Mol className="h-full w-full" />
              </span>
              <p className="text-[16px] text-slate">{card.formula}</p>
            </div>
            <div className="mt-2">
              <Refs ids={card.refs} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export function Bio3MagSaltsSlide({ product }: { product: Product }) {
  const { canvas } = useFlags()
  const [, setOpen] = useState<SaltCard['id']>('malate')
  return (
    <SlideShell product={product}>
      <MotionRuntime>
        <Eyebrow color={product.accent}>Bio3Mag · Triple formulation</Eyebrow>
        <Heading>
          Trois formes de magnésium, <em className="text-ocean">une seule</em> gélule
        </Heading>
        <div className={`mt-5 min-h-0 flex-1 gap-5 ${canvas ? 'flex items-stretch' : 'flex flex-col'}`}>
          {SALT_CARDS.map((c, i) => (
            <SaltCardView key={c.id} card={c} index={i} open onOpen={() => setOpen(c.id)} />
          ))}
        </div>
        <p className={`mt-3 leading-snug text-slate ${canvas ? 'text-[16px]' : 'text-xs'}`}>
          Les trois formes apportent le même magnésium ; ce qui change, c’est la molécule qui le transporte. « Orientation » : logique de choix du laboratoire.
        </p>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ============================================================ C — complementarity */

const VERT = {
  malate: { x: 110, y: 400 },
  citrate: { x: 690, y: 400 },
  bisglycinate: { x: 400, y: 70 },
} as const

export function Bio3MagComplementSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const center = { x: 400, y: 280 }
  return (
    <SlideShell product={product} headerPackshot={false}>
      <MotionRuntime>
        <Eyebrow color={product.accent}>Bio3Mag · Complémentarité</Eyebrow>
        <Heading>Trois formes qui se complètent</Heading>
        <div className={`mt-4 min-h-0 flex-1 gap-8 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_440px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
          <div className={`relative ${canvas ? 'min-h-0' : 'aspect-[800/480] w-full'}`}>
            <svg viewBox="0 0 800 480" className="absolute inset-0 h-full w-full" aria-hidden>
              <motion.path
                d={`M${VERT.bisglycinate.x} ${VERT.bisglycinate.y} L${VERT.malate.x} ${VERT.malate.y} L${VERT.citrate.x} ${VERT.citrate.y} Z`}
                fill="#1b6fa808"
                stroke="#c9d4df"
                strokeWidth={2}
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {SALT_CARDS.map((s) => {
                const v = VERT[s.id]
                const d = `M${v.x} ${v.y} L${center.x} ${center.y}`
                return (
                  <g key={s.id}>
                    <path d={d} stroke={s.color} strokeWidth={2} strokeDasharray="6 7" opacity={0.5} />
                    <PathParticles d={d} count={3} dur={2.4} r={7} fill={s.color} />
                  </g>
                )
              })}
            </svg>
            {SALT_CARDS.map((s, i) => {
              const v = VERT[s.id]
              const Mol = SALT_MOL[s.id]
              return (
                <motion.div
                  key={s.id}
                  initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: EASE }}
                  className="absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-3xl border bg-white px-3 py-2.5 text-center shadow-[0_18px_36px_-28px_rgb(14_26_43/0.55)]"
                  style={{ left: `${(v.x / 800) * 100}%`, top: `${(v.y / 480) * 100}%`, borderColor: `${s.color}55` }}
                >
                  <span className="block h-[58px] w-full">
                    <Mol className="h-full w-full" />
                  </span>
                  <span className="text-[19px] font-bold" style={{ color: s.color }}>
                    {s.name}
                  </span>
                  <span className="text-[15.5px] text-slate">{s.dose}</span>
                </motion.div>
              )
            })}
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
              className="absolute flex w-[24%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${(center.x / 800) * 100}%`, top: `${(center.y / 480) * 100}%` }}
            >
              <img src={product.image} alt="Boîte Bio3Mag" className="w-full rounded-lg shadow-[0_24px_40px_-20px_rgb(14_26_43/0.6)]" draggable={false} />
              <span className="mt-2 rounded-full bg-ocean px-3 py-1 text-[15px] font-semibold whitespace-nowrap text-white">75 mg de Mg élément · 20 % VNR</span>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {ORIENTATIONS.map((o, i) => (
              <motion.div
                key={o.title}
                initial={reduced ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.3, duration: 0.55, ease: EASE }}
                className="rounded-3xl border border-navy/10 bg-white px-5 py-4"
              >
                <div className="flex gap-1.5">
                  {o.salts.map((id) => (
                    <span key={id} className="h-1.5 w-10 rounded-full" style={{ background: SALT_CARDS.find((s) => s.id === id)!.color }} />
                  ))}
                </div>
                <p className={`mt-2 font-serif leading-tight text-navy ${canvas ? 'text-[32px]' : 'text-xl'}`}>{o.title}</p>
                <p className={`mt-1 leading-snug text-ink ${canvas ? 'text-[21.5px]' : 'text-base'}`}>{o.text}</p>
              </motion.div>
            ))}
            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="border-l-2 border-ocean pl-3 text-[17.5px] leading-snug text-slate"
            >
              Une complémentarité de formulation : aucune synergie clinique n’est démontrée, faute d’étude sur Bio3Mag lui-même.
            </motion.p>
          </div>
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ============================================================ D — 300+ enzyme systems */

function Counter({ to, reduced }: { to: number; reduced: boolean }) {
  const mv = useMotionValue(reduced ? to : 0)
  const rounded = useTransform(mv, (v) => Math.round(v))
  const [value, setValue] = useState(reduced ? to : 0)
  useEffect(() => rounded.on('change', setValue), [rounded])
  useEffect(() => {
    if (reduced) return
    const c = animate(mv, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 })
    return () => c.stop()
  }, [mv, to, reduced])
  return <span className="tabular-nums">{value}</span>
}

export function Bio3MagEnzymesSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const n = ENZYME_STEPS.length
  const R = 175
  const nodes = ENZYME_STEPS.map((s, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2
    return { ...s, x: 270 + Math.cos(a) * R, y: 250 + Math.sin(a) * R * 0.86 }
  })
  const colors = [MG, MALATE, '#6a3d8f', MALATE, BISGLY, CITRATE]
  return (
    <SlideShell product={product}>
      <MotionRuntime>
        <Eyebrow color={product.accent}>Magnésium · Fonctions générales</Eyebrow>
        <Heading>Le magnésium au cœur de plus de 300 systèmes enzymatiques</Heading>
        <div className={`mt-4 min-h-0 flex-1 gap-8 ${canvas ? 'grid grid-cols-[560px_minmax(0,1fr)] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
          <div className={`relative ${canvas ? 'min-h-0' : 'aspect-[540/500] w-full'}`}>
            <svg viewBox="0 0 540 500" className="absolute inset-0 h-full w-full" aria-hidden>
              {nodes.map((nd, i) => (
                <g key={nd.id}>
                  <motion.line
                    x1={270}
                    y1={250}
                    x2={nd.x}
                    y2={nd.y}
                    stroke={colors[i]}
                    strokeWidth={2}
                    strokeDasharray="5 6"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
                  />
                  <PathParticles d={`M270 250 L${nd.x} ${nd.y}`} count={2} dur={2.6} r={4} fill={colors[i]} />
                  <motion.g initial={reduced ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.25, duration: 0.4 }}>
                    <circle cx={nd.x} cy={nd.y} r={30} fill="white" stroke={colors[i]} strokeWidth={2.5} />
                    <text x={nd.x} y={nd.y + 7} textAnchor="middle" fontSize={20} fontWeight={800} fill={colors[i]}>
                      {i + 1}
                    </text>
                  </motion.g>
                </g>
              ))}
              <circle cx={270} cy={250} r={86} fill="#e3f0f8" />
              <circle cx={270} cy={250} r={86} fill="none" stroke={MG} strokeWidth={2} className="mech-anim mech-pulse" />
              <MgIon x={270} y={218} r={24} />
            </svg>
            <div className="pointer-events-none absolute top-[54%] left-1/2 -translate-x-1/2 text-center">
              <p className="font-serif text-[61px] leading-none text-navy">
                <Counter to={300} reduced={reduced} />+
              </p>
              <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-ocean">systèmes enzymatiques</p>
            </div>
          </div>
          <div className="flex min-h-0 flex-col justify-center gap-2.5 overflow-y-auto">
            {ENZYME_STEPS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.25, duration: 0.45, ease: EASE }}
                className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-2.5"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[15.5px] font-bold text-white" style={{ background: colors[i] }}>
                  {i + 1}
                </span>
                <div>
                  <p className={`font-semibold text-navy ${canvas ? 'text-[20.5px]' : 'text-base'}`}>{s.title}</p>
                  <p className={`leading-snug text-slate ${canvas ? 'text-[17.5px]' : 'text-sm'}`}>{s.text}</p>
                </div>
              </motion.div>
            ))}
            <div className="mt-1">
              <Refs ids={ENZYME_REFS} label="Sources · fonctions du magnésium, communes aux trois sels" />
            </div>
          </div>
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ============================================================ E — bioavailability & digestive comfort */

/** Qualitative intestinal scene. `soluble=false`: poorly soluble particles mostly stay in the lumen. */
function GutScene({ soluble, label, color }: { soluble: boolean; label: string; color: string }) {
  const cells = Array.from({ length: 7 }, (_, i) => 14 + i * 50)
  return (
    <svg viewBox="0 0 380 230" className="h-full w-full" aria-hidden>
      <text x={14} y={20} fontSize={11} fontWeight={700} fill="#46515e" letterSpacing="1.5">
        LUMIÈRE INTESTINALE
      </text>
      {soluble ? (
        <>
          {[
            [60, 50],
            [150, 40],
            [250, 56],
            [330, 44],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={7} fill={color} opacity={0.35} />
          ))}
          <PathParticles d="M80 40 C90 70 112 80 112 104 L112 160 L112 196" count={3} dur={3} r={9} label="Mg" fill={MG} />
          <PathParticles d="M230 46 C226 70 212 80 212 104 L212 160 L212 196" count={3} dur={3.3} r={9} label="Mg" fill={MG} />
          <PathParticles d="M320 40 C316 70 312 80 312 104 L312 160 L312 196" count={3} dur={3.6} r={9} label="Mg" fill={MG} />
        </>
      ) : (
        <>
          {[
            [50, 52],
            [92, 70],
            [140, 46],
            [190, 66],
            [238, 50],
            [286, 72],
            [330, 48],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 9} y={y - 9} width={18} height={18} rx={3} fill="#9aa3ad" transform={`rotate(${i * 17} ${x} ${y})`} className="mech-anim mech-drift" />
          ))}
          <PathParticles d="M214 60 C214 80 212 90 212 104 L212 160 L212 196" count={1} dur={3.6} r={9} label="Mg" fill={MG} />
          {[70, 170, 270].map((x) => (
            <path key={x} d={`M${x} 140 C${x - 6} 120 ${x + 6} 104 ${x} 86`} fill="none" stroke="#6fa8d6" strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#e-arrow)" className="mech-anim mech-breathe" />
          ))}
        </>
      )}
      {cells.map((x) => (
        <g key={x}>
          <rect x={x} y={104} width={46} height={58} rx={9} fill="#fbe3dc" stroke="#e3a99b" />
          <circle cx={x + 23} cy={136} r={6} fill="#e9b7aa" />
        </g>
      ))}
      <rect x={10} y={176} width={360} height={36} rx={18} fill="#f7d6d3" stroke="#de9690" />
      <text x={190} y={226} textAnchor="middle" fontSize={12} fontWeight={600} fill={color}>
        {label}
      </text>
      <defs>
        <marker id="e-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" fill="none" stroke="#6fa8d6" strokeWidth="1.8" />
        </marker>
      </defs>
    </svg>
  )
}

export function Bio3MagComfortSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  return (
    <SlideShell product={product}>
      <MotionRuntime>
        <Eyebrow color={product.accent}>Bio3Mag · Absorption et tolérance</Eyebrow>
        <Heading>Biodisponibilité et confort digestif</Heading>
        <div className={`mt-4 grid min-h-0 gap-5 ${canvas ? 'grid-cols-2' : 'grid-cols-1'}`} style={canvas ? { height: 205 } : undefined}>
          {[
            { soluble: false, title: 'Oxyde de magnésium', sub: 'Peu soluble : une partie reste dans l’intestin et peut attirer l’eau', color: '#46515e' },
            { soluble: true, title: 'Formes organiques et chélatée de Bio3Mag', sub: 'Plus solubles : l’ion Mg²⁺ est disponible pour l’absorption', color: MG },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.2, duration: 0.5, ease: EASE }}
              className={`flex min-h-0 flex-col rounded-3xl border bg-white px-4 pt-3 pb-2 ${s.soluble ? 'border-ocean/40' : 'border-navy/10'}`}
            >
              <p className="text-[19px] font-bold" style={{ color: s.color }}>
                {s.title}
              </p>
              <div className={`min-h-0 flex-1 ${canvas ? '' : 'aspect-[380/230]'}`}>
                <GutScene soluble={s.soluble} label={s.sub} color={s.color} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 min-h-0 flex-1 overflow-auto rounded-3xl border border-navy/10 bg-white/90">
          <table className={`w-full table-fixed border-collapse ${canvas ? 'text-[16px]' : 'text-[15px]'}`}>
            <thead>
              <tr>
                <th scope="col" className="w-[19%] px-4 py-2 text-left text-[14.5px] font-semibold uppercase tracking-[0.12em] text-slate">
                  Critère
                </th>
                {COMFORT_COLUMNS.map((c, i) => (
                  <th key={c} scope="col" className={`px-3 py-2 text-left font-bold ${i === 0 ? 'text-slate' : 'bg-ocean-soft/60 text-navy'}`}>
                    {c}
                    {i > 0 && <span className="ml-1.5 text-[13px] font-semibold text-ocean">Bio3Mag</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMFORT_ROWS.map((r, ri) => (
                <motion.tr
                  key={r.label}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + ri * 0.12 }}
                  className="border-t border-navy/8 align-top"
                >
                  <th scope="row" className="px-4 py-1 text-left font-semibold text-ink">
                    {r.label}
                    {r.note && <span className="block text-[14px] font-normal text-slate">{r.note}</span>}
                  </th>
                  {r.cells.map((c, ci) => (
                    <td key={ci} className={`px-3 py-1 leading-snug ${ci === 0 ? 'text-slate' : 'bg-ocean-soft/30 text-ink'}`}>
                      {c}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`mt-2 flex items-start justify-between gap-6 ${canvas ? 'text-[15px]' : 'flex-col text-xs'} text-slate`}>
          <p className="max-w-[880px] leading-snug">
            Illustrations qualitatives, sans pourcentage d’absorption ; les résultats varient selon les études. Avec toutes les formes, des selles molles restent
            possibles à forte dose. « Magnésium marin » désigne une origine, pas une forme chimique : c’est la forme (oxyde, chlorure, citrate…) qui détermine la
            solubilité.
          </p>
          <Refs ids={COMFORT_REFS} label="Sources" />
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ============================================================ F — synthesis */

export function Bio3MagSynthesisSlide({ product }: { product: Product }) {
  const { canvas } = useFlags()
  const stages = stagesFor('bio3mag', 'expert')
  const stage = stages.find((s) => s.id === 'formulation') ?? stages.at(-1)
  if (!stage) return null
  const index = stages.findIndex((s) => s.id === stage.id)

  return (
    <SlideShell product={product} headerPackshot={false} tone="tint">
      <p
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold uppercase ${canvas ? 'text-[18px] tracking-[0.2em]' : 'text-[14.5px] tracking-[0.14em]'}`}
        style={{ color: product.accent }}
      >
        <span className="h-px w-8" style={{ background: product.accent }} aria-hidden />
        Bio3Mag · Comment ça marche
      </p>
      <h2
        className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 text-[54px]' : 'mt-1 text-[2.3rem]'}`}
      >
        Un même magnésium, plusieurs bienfaits
      </h2>
      <div
        className={`relative mt-4 min-h-0 flex-1 overflow-hidden rounded-[28px] border border-navy/10 bg-white/80 shadow-[0_24px_50px_-34px_rgb(14_26_43/0.35)] ${canvas ? '' : 'aspect-[960/560]'}`}
      >
        <div className={canvas ? 'absolute inset-0' : 'h-full w-full'}>
          <Bio3MagVisual
            stage={stage}
            index={index}
            stages={stages}
            goToStageId={() => {}}
            replayKey={0}
            interactive={false}
          />
        </div>
      </div>
    </SlideShell>
  )
}
