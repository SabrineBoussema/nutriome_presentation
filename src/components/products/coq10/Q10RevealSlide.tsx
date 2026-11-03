import { motion } from 'motion/react'
import type { Product } from '../../../data/types'
import { useI18n } from '../../../i18n'
import { useSlide } from '../../presentation/SlideContext'
import { Eyebrow, PendingBadge } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell } from '../../ui/SlideShell'
import { Packshot } from '../Packshot'

/** Scene 1 — product reveal. */
export function Q10RevealSlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  const { isPrint } = useSlide()
  return (
    <SlideShell product={product}>
      <div className="relative grid flex-1 items-center gap-10 @4xl:grid-cols-[1fr_1.05fr] @4xl:gap-16">
        <div className="order-2 @4xl:order-1">
          <Reveal>
            <Eyebrow color={product.accent}>{t.coq10.launch} · {l(product.category)}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.02em] text-navy @4xl:text-[102px]">
              {t.coq10.revealTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 font-serif text-2xl italic @4xl:text-[39px]" style={{ color: product.accent }}>{product.name}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate @4xl:text-[27px]">{l(product.positioning)}</p>
          </Reveal>
          <Reveal delay={0.5} className="mt-8">
            <PendingBadge />
          </Reveal>
        </div>
        <div className="order-1 mx-auto w-full max-w-md @4xl:order-2 @4xl:max-w-[640px]">
          {isPrint ? (
            <Packshot product={product} float={false} glow={false} eager />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.86, filter: 'blur(18px)', rotate: -3 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <Packshot product={product} glow={false} eager />
            </motion.div>
          )}
        </div>
      </div>
    </SlideShell>
  )
}
