import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type ComponentType } from 'react'
import { MAG_FORMS, type MagForm, type MagFormId } from '../../data/bio3magForms'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { BisglycinateMolecule, CitrateMolecule, MalateMolecule } from '../scientific/molecules/MagnesiumForms'
import { SlideShell } from '../ui/SlideShell'
import { Eyebrow, LevelChip, RefLine, Title } from './shared'

const MOLECULES: Record<MagFormId, ComponentType<{ className?: string }>> = {
  bisglycinate: BisglycinateMolecule,
  malate: MalateMolecule,
  citrate: CitrateMolecule,
}

/* Triangle geometry, in % of the stage */
const VERTEX: Record<MagFormId, { x: number; y: number }> = {
  bisglycinate: { x: 50, y: 17 },
  malate: { x: 17, y: 78 },
  citrate: { x: 83, y: 78 },
}

function FormNode({ form, selected, onSelect, delay }: { form: MagForm; selected: boolean; onSelect: () => void; delay: number }) {
  const Mol = MOLECULES[form.id]
  const v = VERTEX[form.id]
  const reduced = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${form.name}, ${form.dose} — afficher le détail`}
      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 flex w-[232px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-3xl border bg-white px-4 pt-3 pb-3.5 text-center shadow-[0_20px_44px_-30px_rgb(14_26_43/0.55)] transition-[box-shadow,border-color] hover:shadow-[0_22px_50px_-26px_rgb(14_26_43/0.6)] ${
        selected ? 'ring-[3px]' : ''
      }`}
      style={{ left: `${v.x}%`, top: `${v.y}%`, borderColor: selected ? form.color : 'rgb(14 26 43 / 0.1)', ['--tw-ring-color' as string]: `${form.color}55` }}
    >
      <span className="block h-[78px] w-full">
        <Mol className="h-full w-full" />
      </span>
      <span className="mt-1 text-[17px] font-bold leading-tight" style={{ color: form.color }}>
        {form.name}
      </span>
      <span className="mt-0.5 text-[14px] text-slate">
        <span className="font-serif text-[22px] text-navy">{form.dose.split(' ')[0]}</span> mg par gélule
      </span>
    </motion.button>
  )
}

function Detail({ form }: { form: MagForm }) {
  return (
    <motion.div
      key={form.id}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: form.color }}>
          {form.short} · {form.dose}
        </p>
        <h3 className="mt-1 font-serif text-[32px] leading-tight text-navy">{form.name}</h3>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[14.5px]">
        <dt className="text-slate">Formule</dt>
        <dd className="font-semibold text-ink">{form.formula}</dd>
        <dt className="text-slate">Nature</dt>
        <dd className="text-ink">{form.nature}</dd>
        <dt className="text-slate">Magnésium</dt>
        <dd className="text-ink">{form.mgContent}</dd>
        <dt className="text-slate">Ligand</dt>
        <dd className="text-ink">{form.ligand}</dd>
      </dl>
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">Pourquoi ce choix</p>
        <p className="mt-1 text-[16px] leading-snug text-ink">{form.rationale}</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">Données disponibles</p>
        <div className="rounded-2xl border border-navy/10 bg-white px-4 py-3">
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-slate">
            Biodisponibilité <LevelChip level={form.bioavailability.level}>Preuve {form.bioavailability.level}</LevelChip>
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink">{form.bioavailability.text}</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white px-4 py-3">
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-slate">
            Tolérance <LevelChip level={form.tolerability.level}>Preuve {form.tolerability.level}</LevelChip>
          </p>
          <p className="mt-1 text-[15px] leading-snug text-ink">{form.tolerability.text}</p>
        </div>
      </div>
      {form.refs.length > 0 && (
        <ul className="flex flex-col gap-1">
          {form.refs.map((id) => (
            <RefLine key={id} id={id} />
          ))}
        </ul>
      )}
    </motion.div>
  )
}

/** « BIO3MAG : trois formes de magnésium, une formulation experte » — clickable triangle of the three salts. */
export function Bio3MagFormsSlide({ product }: { product: Product }) {
  const { layout, isPrint } = useSlide()
  const [selected, setSelected] = useState<MagFormId>('citrate')
  const canvas = layout === 'canvas'
  const reduced = useReducedMotion()
  const form = MAG_FORMS.find((f) => f.id === selected)!
  const line = (a: MagFormId, b: MagFormId | 'center', i: number) => {
    const p = VERTEX[a]
    const q = b === 'center' ? { x: 50, y: 57 } : VERTEX[b]
    return (
      <motion.line
        key={`${a}-${b}`}
        x1={p.x}
        y1={p.y}
        x2={q.x}
        y2={q.y}
        stroke={b === 'center' ? MAG_FORMS.find((f) => f.id === a)!.color : '#c9d4df'}
        strokeDasharray={b === 'center' ? '6 7' : undefined}
        vectorEffect="non-scaling-stroke"
        initial={reduced || isPrint ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: b === 'center' && a !== selected ? 0.35 : 1 }}
        transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
        style={{ strokeWidth: b === 'center' ? (a === selected ? 3 : 1.5) : 2 }}
      />
    )
  }

  return (
    <SlideShell product={product} headerPackshot={false}>
      <Eyebrow color={product.accent}>Bio3Mag · Formulation</Eyebrow>
      <Title>Trois formes de magnésium, une formulation experte</Title>
      <div className={`mt-4 min-h-0 flex-1 gap-8 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_520px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
        {/* triangle */}
        <div className={`relative ${canvas ? 'min-h-0' : 'aspect-[4/3.4] w-full'}`}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            {line('bisglycinate', 'malate', 0)}
            {line('malate', 'citrate', 1)}
            {line('citrate', 'bisglycinate', 2)}
            {line('bisglycinate', 'center', 3)}
            {line('malate', 'center', 4)}
            {line('citrate', 'center', 5)}
          </svg>
          <motion.div
            initial={reduced || isPrint ? false : { opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[57%] left-1/2 flex w-[21%] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          >
            <img src={product.image} alt="Boîte Bio3Mag" className="w-full rounded-lg object-contain shadow-[0_24px_40px_-22px_rgb(14_26_43/0.6)]" draggable={false} />
            <span className="mt-3 rounded-full bg-ocean px-3 py-1 text-center text-[12.5px] font-semibold whitespace-nowrap text-white">75 mg de Mg élément · 20 % VNR</span>
          </motion.div>
          {MAG_FORMS.map((f, i) => (
            <FormNode key={f.id} form={f} selected={f.id === selected} onSelect={() => setSelected(f.id)} delay={0.1 + i * 0.15} />
          ))}
        </div>
        {/* detail */}
        <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain pr-1" aria-live="polite">
          <AnimatePresence mode="wait">
            <Detail form={form} />
          </AnimatePresence>
          <p className="mt-3 text-[12.5px] leading-snug text-slate">
            Teneurs en magnésium : calcul stœchiométrique sur la forme anhydre ; le total déclaré de 75 mg par gélule fait foi.
          </p>
        </div>
      </div>
    </SlideShell>
  )
}
