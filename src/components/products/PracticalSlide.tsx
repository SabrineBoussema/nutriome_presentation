import { Box, ClipboardList, Pill, ShieldAlert, Stethoscope } from 'lucide-react'
import type { PracticalField, Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { Eyebrow, PendingBadge } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'
import { Packshot } from './Packshot'

function Field({ icon: Icon, label, field, accent }: { icon: typeof Pill; label: string; field?: PracticalField; accent: string }) {
  const { l, t } = useI18n()
  return (
    <div className="rounded-3xl border border-navy/[0.06] bg-white p-5 @4xl:p-6">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
        <Icon className="size-5" aria-hidden /> {label}
      </div>
      <p className="mt-2 text-xl font-semibold leading-snug text-ink @4xl:text-[28px]">{field ? l(field.text) : t.common.pending}</p>
      {(!field || field.pending) && <PendingBadge short className="mt-2" />}
    </div>
  )
}

/** Directions for use, format and pack size. */
export function PracticalSlide({ product }: { product: Product }) {
  const { t } = useI18n()
  return (
    <SlideShell tone="paper" accent={product.accent} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{product.name}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.common.usage}</SlideTitle>
      </Reveal>

      <div className="mt-6 grid flex-1 items-center gap-8 @4xl:mt-4 @4xl:grid-cols-[1.15fr_0.85fr] @4xl:gap-14">
        <Reveal delay={0.12} className="flex flex-col gap-4">
          <Field icon={ClipboardList} label={t.common.usage} field={product.usage} accent={product.accent} />
          <Field icon={Pill} label={t.common.format} field={product.format} accent={product.accent} />
          <Field icon={Box} label={t.common.packaging} field={product.packaging} accent={product.accent} />
        </Reveal>
        <Reveal delay={0.2} className="mx-auto hidden w-full max-w-[460px] @4xl:block">
          <Packshot product={product} />
        </Reveal>
      </div>
    </SlideShell>
  )
}

/** Precautions and the notes intended for healthcare professionals. */
export function SafetySlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  return (
    <SlideShell tone="ivory" accent={product.accent} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{product.name}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{t.common.precautions}</SlideTitle>
      </Reveal>
      <div className="mt-6 grid flex-1 content-center gap-6 @4xl:mt-8 @4xl:grid-cols-2 @4xl:gap-8">
        <Reveal delay={0.12} className="rounded-[28px] border border-amber/30 bg-amber-soft/70 p-6 @4xl:p-8">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#9a5612]">
            <ShieldAlert className="size-5" aria-hidden /> {t.common.precautions}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {product.precautions.map((p, i) => (
              <li key={i} className="flex gap-3 text-base leading-snug text-ink @4xl:text-[22px]">
                <span className="mt-[9px] size-2 shrink-0 rounded-full bg-amber" />
                {l(p)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="rounded-[28px] bg-navy p-6 text-white @4xl:p-8">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white/75">
            <Stethoscope className="size-5" aria-hidden /> {t.common.hcp}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {product.hcpNotes.map((p, i) => (
              <li key={i} className="flex gap-3 text-base leading-snug text-white/95 @4xl:text-[22px]">
                <span className="mt-[9px] size-2 shrink-0 rounded-full" style={{ background: product.accent }} />
                {l(p)}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SlideShell>
  )
}
