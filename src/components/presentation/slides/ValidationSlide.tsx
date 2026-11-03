import { AlertTriangle } from 'lucide-react'
import { products } from '../../../data/products'
import { useI18n } from '../../../i18n'
import { Eyebrow } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell } from '../../ui/SlideShell'

/** Internal appendix listing every open validation item, product by product. */
export function ValidationSlide({ part }: { part: number }) {
  const { l, t } = useI18n()
  const half = Math.ceil(products.length / 2)
  const items = part === 1 ? products.slice(0, half) : products.slice(half)
  return (
    <SlideShell tone="paper" label={t.common.validationTitle}>
      <Reveal>
        <Eyebrow color="#b8650f">
          <AlertTriangle className="size-4" aria-hidden /> {t.common.validationTitle}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-3 max-w-5xl text-lg font-medium text-ink @4xl:text-[24px]">{t.common.validationIntro}</p>
      </Reveal>
      <Reveal delay={0.12} className="mt-6 columns-1 gap-6 @4xl:columns-2 @4xl:gap-8">
        {items.map((p) => (
          <section key={p.id} className="mb-4 break-inside-avoid rounded-2xl border border-amber/25 bg-amber-soft/40 p-4">
            <h3 className="text-lg font-bold @4xl:text-[22px]" style={{ color: p.accent }}>
              {p.name}
            </h3>
            <ul className="mt-2 flex flex-col gap-1.5 text-xs leading-snug text-ink @4xl:text-[17px]">
              {p.validationNotes.length ? (
                p.validationNotes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[6px] size-1 shrink-0 rounded-full bg-amber" />
                    {l(n)}
                  </li>
                ))
              ) : (
                <li>{t.common.nothingPending}</li>
              )}
            </ul>
          </section>
        ))}
      </Reveal>
    </SlideShell>
  )
}
