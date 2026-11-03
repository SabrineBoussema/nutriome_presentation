import { Factory, Pill, Sparkles, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { nrvPercent } from '../../../data/nrv'
import type { Product } from '../../../data/types'
import { useI18n } from '../../../i18n'
import { useSlide } from '../../presentation/SlideContext'
import { Eyebrow } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell, SlideTitle } from '../../ui/SlideShell'

const GOLD = '#d9a93b'
/** Bars are drawn on a 0–500 % scale; anything above is shown full-length with a break mark. */
const SCALE_MAX = 500

/**
 * "Why BioQ10+": key figures (step 0) and the per-capsule dose of each vitamin as % NRV (step 1).
 * Every number is derived from the product registry.
 */
export function Q10HighlightsSlide({ product }: { product: Product }) {
  const { l, n, t } = useI18n()
  const { step, isPrint } = useSlide()
  const coq10 = product.ingredients.find((i) => i.name.en === 'Coenzyme Q10')
  const vitamins = product.ingredients
    .filter((i) => i.nrvKey && i.quantity !== undefined)
    .map((i) => ({ ing: i, pct: nrvPercent(i.nrvKey!, i.quantity!) }))
    .sort((a, b) => a.pct - b.pct)
  const showChart = isPrint || step >= 1

  const stats = [
    { icon: Zap, value: coq10?.quantity !== undefined ? `${n(coq10.quantity)} mg` : '—', label: t.coq10.statCoq10 },
    { icon: Sparkles, value: String(vitamins.length), label: t.coq10.statVitamins },
    { icon: Pill, value: product.packCount ? String(product.packCount) : '—', label: t.coq10.statPack },
    { icon: Factory, value: t.coq10.madeIn, label: product.manufacturer ? l(product.manufacturer) : '', small: true },
  ]

  return (
    <SlideShell tone="navy" label={product.name}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(55% 70% at 80% 45%, rgb(217 169 59 / 0.18), transparent 70%)' }}
        aria-hidden
      />
      <div className="relative grid flex-1 gap-8 @4xl:grid-cols-[1fr_1.1fr] @4xl:gap-14">
        <div className="flex flex-col">
          <Reveal>
            <Eyebrow color="#e9c46a">{t.coq10.highlightsEyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SlideTitle className="mt-3 text-white">{t.coq10.highlightsTitle}</SlideTitle>
          </Reveal>
          <div className="mt-8 grid flex-1 grid-cols-2 content-center gap-3 @4xl:gap-4">
            {stats.map(({ icon: Icon, value, label, small }, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl bg-white/[0.05] p-5 ring-1 ring-white/10 @4xl:p-6">
                  <Icon className="size-5 text-[#e9c46a]" aria-hidden />
                  <div className={`mt-3 font-serif leading-none text-white ${small ? 'text-2xl @4xl:text-[37px]' : 'text-4xl @4xl:text-[68px]'}`}>{value}</div>
                  <div className="mt-2 text-sm leading-snug text-white/65 @4xl:text-[21px]">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal fromStep={1} delay={0.1} className="flex flex-col justify-center rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 @4xl:p-8">
          <h3 className="font-serif text-2xl text-white @4xl:text-[34px]">{t.coq10.chartTitle}</h3>
          <p className="mt-1 text-sm text-white/55 @4xl:text-[18px]">{t.coq10.chartSub}</p>
          <ul className="mt-6 flex flex-col gap-4 @4xl:gap-5">
            {vitamins.map(({ ing, pct }, i) => {
              const width = Math.min(pct, SCALE_MAX) / SCALE_MAX
              const overflow = pct > SCALE_MAX
              return (
                <li key={ing.nrvKey}>
                  <div className="flex items-baseline justify-between gap-3 text-sm @4xl:text-[21px]">
                    <span className="font-medium text-white">
                      {l(ing.name)} <span className="text-white/50">· {ing.unit === 'mg' && ing.quantity! < 1 ? `${n(ing.quantity! * 1000)} µg` : `${n(ing.quantity!)} ${ing.unit}`}</span>
                    </span>
                    <span className="font-semibold tabular-nums text-[#e9c46a]">{n(pct)} %</span>
                  </div>
                  <div className="relative mt-2 h-3 rounded-full bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, #a87b16, ${GOLD})` }}
                      initial={isPrint ? false : { width: 0 }}
                      animate={{ width: showChart ? `${width * 100}%` : 0 }}
                      transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {overflow && (
                      <span className="absolute -right-1 top-1/2 h-5 w-2 -translate-y-1/2 skew-x-[-20deg] bg-navy ring-2 ring-navy" aria-hidden />
                    )}
                    {/* 100 % NRV marker */}
                    <span className="absolute inset-y-[-4px] w-px bg-white/70" style={{ left: `${(100 / SCALE_MAX) * 100}%` }} aria-hidden />
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-xs text-white/45 @4xl:text-[17px]">{t.common.nrvNote}</p>
        </Reveal>
      </div>
    </SlideShell>
  )
}
