import { Sparkles } from 'lucide-react'
import type { Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { Eyebrow, PendingBadge } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell } from '../ui/SlideShell'
import { Packshot } from './Packshot'

export function ProductHeroSlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  const isNew = product.story !== 'standard'
  return (
    <SlideShell tone="tint" accent={product.accent} accentSoft={product.accentSoft} label={l(product.category)}>
      <div className="grid flex-1 items-center gap-10 @4xl:grid-cols-[1.05fr_1fr] @4xl:gap-16">
        <div className="order-2 @4xl:order-1">
          <Reveal>
            <Eyebrow color={product.accent}>
              {isNew && (
                <span className="mr-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-white" style={{ background: product.accent }}>
                  <Sparkles className="size-3" aria-hidden /> {t.common.newProduct}
                </span>
              )}
              {l(product.category)}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-[-0.03em] text-navy @4xl:text-[136px]">{product.name}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 font-serif text-2xl italic text-ink/80 @4xl:text-[39px]" style={{ color: product.accent }}>
              {l(product.tagline)}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate @4xl:text-[27px]">{l(product.positioning)}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-2.5">
            {product.format && (
              <span className="rounded-full border border-navy/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink backdrop-blur">
                {l(product.format.text)}
              </span>
            )}
            <span className="rounded-full border border-navy/10 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink backdrop-blur">
              {l(product.doseBasis)}
            </span>
            {product.validationStatus === 'pending' && <PendingBadge />}
          </Reveal>
        </div>
        <Reveal delay={0.15} y={40} className="order-1 mx-auto w-full max-w-md @4xl:order-2 @4xl:max-w-[600px]">
          <Packshot product={product} eager />
        </Reveal>
      </div>
    </SlideShell>
  )
}
