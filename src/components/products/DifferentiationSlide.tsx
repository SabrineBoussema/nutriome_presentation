import { Check } from 'lucide-react'
import type { Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { Eyebrow, EvidenceChip } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'
import { Packshot } from './Packshot'

/** Physiological roles of the ingredients, each with its evidence level and citations. */
export function DifferentiationSlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  const count = product.mechanisms.length
  const cols = count === 4 ? '@4xl:grid-cols-2' : count >= 3 ? '@4xl:grid-cols-3' : '@4xl:grid-cols-2'
  return (
    <SlideShell tone="ivory" accent={product.accent} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{product.name}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.common.mechanisms}</SlideTitle>
      </Reveal>
      <div className={`mt-6 grid flex-1 content-center gap-4 @4xl:mt-8 @4xl:gap-5 ${cols}`}>
        {product.mechanisms.map((m, i) => (
          <Reveal key={i} delay={0.12 + i * 0.06}>
            <article className="h-full rounded-3xl border border-navy/[0.06] bg-white p-5 shadow-[0_20px_50px_-36px_rgb(14_26_43/0.45)] @4xl:p-7">
              <EvidenceChip level={m.evidence} />
              <h3 className="mt-3 text-lg font-bold text-ink @4xl:text-[26px]">{l(m.title)}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate @4xl:text-[20px]">{l(m.body)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  )
}

/** Verified formulation characteristics, presented next to the pack. */
export function FormulationSlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  return (
    <SlideShell tone="tint" accent={product.accent} accentSoft={product.accentSoft} label={product.name} product={product} headerPackshot={false}>
      <Reveal>
        <Eyebrow color={product.accent}>{product.name}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.common.differentiation}</SlideTitle>
      </Reveal>
      <div className="mt-6 grid flex-1 items-center gap-8 @4xl:mt-4 @4xl:grid-cols-[0.8fr_1.2fr] @4xl:gap-14">
        <Reveal delay={0.12} className="mx-auto w-full max-w-sm @4xl:max-w-[460px]">
          <Packshot product={product} />
        </Reveal>
        <ul className="flex flex-col gap-4 @4xl:gap-5">
          {product.differentiators.map((d, i) => (
            <Reveal key={i} delay={0.18 + i * 0.08} x={24} y={0}>
              <li className="flex gap-4 rounded-3xl bg-white/85 p-5 text-lg font-medium leading-snug text-ink shadow-[0_20px_50px_-38px_rgb(14_26_43/0.5)] @4xl:p-6 @4xl:text-[24px]">
                <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full text-white @4xl:size-8" style={{ background: product.accent }}>
                  <Check className="size-4" aria-hidden />
                </span>
                {l(d)}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </SlideShell>
  )
}
