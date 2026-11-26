import { Check, Minus } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { COMPARE_COLUMNS, compareRows, type Cell } from '../../data/bio3magForms'
import { claimText, validatedDailyCost } from '../../data/commercialClaims'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { SlideShell } from '../ui/SlideShell'
import { Eyebrow, RefLine, Title } from './shared'

function CellView({ cell, highlight }: { cell: Cell; highlight: boolean }) {
  const tone = highlight ? 'text-navy font-semibold' : cell.tone === 'muted' ? 'text-slate' : 'text-ink'
  return (
    <span className={`flex items-start gap-1.5 leading-snug ${tone}`}>
      {highlight && cell.tone === 'plus' && <Check className="mt-0.5 size-4 shrink-0 text-ocean" aria-hidden />}
      {!highlight && cell.tone === 'muted' && cell.text.startsWith('Non') && <Minus className="mt-0.5 size-4 shrink-0 text-slate/60" aria-hidden />}
      {cell.text}
    </span>
  )
}

/** « Tous les magnésiums ne se valent pas » — objective comparison, no invented absorption figures. */
export function Bio3MagCompareSlide({ product }: { product: Product }) {
  const { layout, isPrint } = useSlide()
  const reduced = useReducedMotion() || isPrint
  const canvas = layout === 'canvas'
  const rows = compareRows(validatedDailyCost.bio3mag).filter((r) => !r.hidden)
  const slogan = claimText('bio3mag-slogan')
  const [focus, setFocus] = useState<number | null>(3)
  const evidenceRefs = rows.flatMap((r) => r.refs ?? [])

  if (!canvas) {
    // Mobile / portrait: one interactive card per option
    return (
      <SlideShell product={product}>
        <Eyebrow color={product.accent}>Bio3Mag · Comparaison</Eyebrow>
        <Title>Tous les magnésiums ne se valent pas</Title>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Choisir une forme">
          {COMPARE_COLUMNS.map((c, i) => (
            <button
              key={c}
              role="tab"
              aria-selected={focus === i}
              onClick={() => setFocus(i)}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm font-semibold ${focus === i ? 'border-transparent bg-ocean text-white' : 'border-navy/15 bg-white text-navy'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <dl className="mt-3 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
          {rows.map((r) => (
            <div key={r.label} className="grid grid-cols-[42%_1fr] gap-3 px-4 py-2.5 text-[18px]">
              <dt className="font-semibold text-slate">{r.label}</dt>
              <dd>
                <CellView cell={r.cells[focus ?? 3]} highlight={focus === 3} />
              </dd>
            </div>
          ))}
        </dl>
        {slogan && <p className="mt-4 font-serif text-[1.25rem] italic leading-snug text-navy">{slogan}</p>}
      </SlideShell>
    )
  }

  return (
    <SlideShell product={product}>
      <Eyebrow color={product.accent}>Bio3Mag · Comparaison</Eyebrow>
      <Title>Tous les magnésiums ne se valent pas</Title>
      <div className="mt-5 min-h-0 flex-1 overflow-hidden rounded-[26px] border border-navy/10 bg-white/85 shadow-[0_24px_50px_-36px_rgb(14_26_43/0.4)]">
        <table className="h-full w-full table-fixed border-collapse text-[18.5px]">
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[19.5%]" />
            <col className="w-[19.5%]" />
            <col className="w-[19.5%]" />
            <col className="w-[19.5%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-[15.5px] font-semibold uppercase tracking-[0.14em] text-slate">
                Critère
              </th>
              {COMPARE_COLUMNS.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  onMouseEnter={() => setFocus(i)}
                  className={`px-4 py-3 text-left text-[19px] font-bold ${i === 3 ? 'bg-ocean text-white' : focus === i ? 'bg-ocean-soft text-navy' : 'text-navy'}`}
                >
                  <span className="flex items-center gap-2">
                    {i === 3 && <img src={product.image} alt="" className="h-9 w-auto rounded-sm" draggable={false} />}
                    {c}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <motion.tr
                key={r.label}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + ri * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-navy/8"
              >
                <th scope="row" className="px-5 py-2.5 text-left align-top font-semibold text-ink">
                  {r.label}
                </th>
                {r.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    onMouseEnter={() => setFocus(ci)}
                    className={`px-4 py-2.5 align-top transition-colors ${ci === 3 ? 'bg-ocean-soft/70' : focus === ci ? 'bg-ocean-soft/35' : ''}`}
                  >
                    <CellView cell={cell} highlight={ci === 3} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-8">
        {slogan && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-serif text-[31px] italic leading-snug text-navy"
          >
            {slogan}
          </motion.p>
        )}
        <details className="max-w-[520px] text-right text-[15px] text-slate">
          <summary className="cursor-pointer select-none font-semibold text-ink">
            Sources de la biodisponibilité · aucune étude sur le produit fini
          </summary>
          <ul className="mt-2 flex flex-col gap-1 text-left">
            {[...new Set(evidenceRefs)].map((id) => (
              <RefLine key={id} id={id} />
            ))}
          </ul>
        </details>
      </div>
    </SlideShell>
  )
}
