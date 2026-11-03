import { motion } from 'motion/react'
import type { Product } from '../../../data/types'
import { useI18n } from '../../../i18n'
import { BisglycinateMolecule, CitrateMolecule, MalateMolecule } from '../../scientific/molecules/MagnesiumForms'
import { useSlide } from '../../presentation/SlideContext'
import { Eyebrow } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell, SlideTitle } from '../../ui/SlideShell'

const BLUES = ['#14507c', '#1b6fa8', '#5fa8d8']
const MOLECULES = [BisglycinateMolecule, MalateMolecule, CitrateMolecule]

/** The three declared magnesium compounds (excludes the elemental-Mg summary). */
function forms(product: Product) {
  return product.ingredients.filter((i) => i.quantity !== undefined && !i.derived).slice(0, 3)
}

/** Step 0: three pillars. Step 1: animated composition overview bringing them together. */
export function MagPillarsSlide({ product }: { product: Product }) {
  const { l, n, t } = useI18n()
  const { step, isPrint } = useSlide()
  const items = forms(product)
  const elemental = product.ingredients.find((i) => i.derived && i.quantity !== undefined)
  const total = items.reduce((s, i) => s + (i.quantity ?? 0), 0)
  const together = step >= 1 || isPrint
  const offsets = items.map((_, i) => items.slice(0, i).reduce((s, x) => s + ((x.quantity ?? 0) / total) * 100, 0))

  return (
    <SlideShell tone="tint" accent={product.accent} accentSoft={product.accentSoft} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{t.bio3mag.pillarsEyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.bio3mag.pillarsTitle}</SlideTitle>
      </Reveal>

      <div className="mt-6 grid flex-1 items-center gap-8 @4xl:mt-8 @4xl:grid-cols-[1.25fr_1fr] @4xl:gap-14">
        <div className="flex flex-col gap-3 @4xl:gap-4">
          {items.map((ing, i) => {
            const Molecule = MOLECULES[i]
            return (
              <Reveal key={i} delay={0.15 + i * 0.12} x={-30} y={0}>
                <div className="flex items-center gap-4 rounded-3xl border border-white bg-white/80 p-3 pr-6 shadow-[0_24px_50px_-34px_rgb(14_26_43/0.45)] backdrop-blur @4xl:gap-6 @4xl:p-4 @4xl:pr-8">
                  <div className="hidden w-28 shrink-0 rounded-2xl bg-paper p-1 @md:block @4xl:w-40">
                    <Molecule className="h-auto w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUES[i] }}>
                      {t.bio3mag.pillar} {i + 1}
                    </div>
                    <div className="mt-1 text-lg font-semibold leading-tight text-ink @4xl:text-[28px]">{l(ing.name)}</div>
                    {ing.role && <div className="mt-1 text-sm text-slate @4xl:text-[20px]">{l(ing.role)}</div>}
                  </div>
                  <div className="text-right font-serif text-4xl text-navy @4xl:text-[55px]">
                    {n(ing.quantity ?? 0)}
                    <span className="ml-1 font-sans text-base text-slate">mg</span>
                  </div>
                </div>
              </Reveal>
            )
          })}
          <Reveal delay={0.5}>
            <p className="px-2 text-xs text-slate @4xl:text-[18px]">{t.bio3mag.compoundNote}</p>
          </Reveal>
        </div>

        {/* Composition overview */}
        <div className="relative mx-auto aspect-square w-full max-w-[300px] @4xl:max-w-[440px]">
          <svg viewBox="0 0 400 400" className="h-full w-full -rotate-90">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#dbe9f3" strokeWidth="34" />
            {items.map((ing, i) => {
              const pct = ((ing.quantity ?? 0) / total) * 100
              const offset = -offsets[i]
              const target = `${pct - 0.8} ${100 - pct + 0.8}`
              return isPrint ? (
                <circle key={i} cx="200" cy="200" r="150" fill="none" stroke={BLUES[i]} strokeWidth="34" pathLength={100} strokeDasharray={target} strokeDashoffset={offset} />
              ) : (
                <motion.circle
                  key={i}
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke={BLUES[i]}
                  strokeWidth="34"
                  pathLength={100}
                  strokeDashoffset={offset}
                  initial={false}
                  animate={{ strokeDasharray: together ? target : '0 100' }}
                  transition={{ duration: 1.2, delay: together ? 0.2 + i * 0.25 : 0, ease: [0.22, 1, 0.36, 1] }}
                />
              )
            })}
          </svg>
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            initial={false}
            animate={isPrint ? undefined : { opacity: together ? 1 : 0.25, scale: together ? 1 : 0.92 }}
            transition={{ duration: 0.8 }}
          >
            {/* capsule */}
            <div className={`relative h-14 w-32 -rotate-12 overflow-hidden rounded-full @4xl:h-20 @4xl:w-44 ${isPrint ? '' : 'shadow-[0_18px_30px_-12px_rgb(27_111_168/0.6)]'}`}>
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-b from-[#5fa8d8] to-[#14507c]" />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-b from-white to-[#dbe9f3]" />
              <div className="absolute inset-x-3 top-1.5 h-2 rounded-full bg-white/50" />
            </div>
            <div className="mt-5 font-serif text-3xl text-navy @4xl:text-[42px]">
              {elemental ? (
                <>
                  {n(elemental.quantity ?? 0)}
                  <span className="ml-1 font-sans text-base text-slate">mg</span>
                </>
              ) : (
                product.name
              )}
            </div>
            <div className="text-sm text-slate @4xl:text-base">{elemental ? l(elemental.name) : l(product.doseBasis)}</div>
          </motion.div>
          <div className="absolute -bottom-4 left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-1 @4xl:-bottom-8">
            {items.map((ing, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-slate @4xl:text-[17px]">
                <span className="size-2.5 rounded-full" style={{ background: BLUES[i] }} />
                {l(ing.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

/** One schematic per form, revealed one at a time. */
export function MagMoleculesSlide({ product }: { product: Product }) {
  const { l, n, t } = useI18n()
  const items = forms(product)
  const captions = [t.bio3mag.pillar1, t.bio3mag.pillar2, t.bio3mag.pillar3]
  return (
    <SlideShell tone="paper" accent={product.accent} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{t.bio3mag.moleculesEyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.bio3mag.moleculesTitle}</SlideTitle>
      </Reveal>
      <div className="mt-6 grid flex-1 gap-5 @4xl:mt-6 @4xl:grid-cols-3 @4xl:gap-6">
        {items.map((ing, i) => {
          const Molecule = MOLECULES[i]
          return (
            <Reveal key={i} fromStep={i} delay={0.15} className="flex flex-col rounded-[28px] border border-navy/[0.06] bg-white p-5 shadow-[0_30px_60px_-45px_rgb(14_26_43/0.5)] @4xl:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink @4xl:text-[29px]">{l(ing.name)}</h3>
                <span className="font-serif text-2xl @4xl:text-[37px]" style={{ color: BLUES[i] }}>
                  {n(ing.quantity ?? 0)}
                  <span className="ml-1 font-sans text-sm text-slate">mg</span>
                </span>
              </div>
              <div className="mx-auto my-3 w-full max-w-[340px] rounded-2xl bg-paper @4xl:my-3">
                <Molecule className="h-auto w-full" />
              </div>
              <p className="mt-auto text-sm leading-snug text-slate @4xl:text-[20px]">{captions[i]}</p>
            </Reveal>
          )
        })}
      </div>
      <p className="mt-5 text-xs text-slate @4xl:text-[17px]">
        {t.common.schematic}. {t.bio3mag.compoundNote}
      </p>
    </SlideShell>
  )
}
