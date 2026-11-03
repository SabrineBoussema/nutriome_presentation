import { motion } from 'motion/react'
import type { Product } from '../../../data/types'
import { useI18n } from '../../../i18n'
import { useSlide } from '../../presentation/SlideContext'
import { Eyebrow, PendingBadge } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell } from '../../ui/SlideShell'
import { Packshot } from '../Packshot'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 53) % 100,
  y: (i * 37) % 100,
  s: 2 + (i % 4),
  d: 6 + (i % 5) * 1.5,
}))

/** Scene 1 — product reveal against a navy field with golden light. */
export function Q10RevealSlide({ product }: { product: Product }) {
  const { l, t } = useI18n()
  const { isPrint } = useSlide()
  return (
    <SlideShell tone="navy" label={t.coq10.launch}>
      {/* golden light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 72% 50%, rgb(217 169 59 / 0.32), transparent 65%), radial-gradient(40% 50% at 15% 85%, rgb(217 169 59 / 0.12), transparent 70%)',
        }}
        aria-hidden
      />
      {!isPrint &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-[#f0c95a]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: p.d, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            aria-hidden
          />
        ))}

      <div className="relative grid flex-1 items-center gap-10 @4xl:grid-cols-[1fr_1.05fr] @4xl:gap-16">
        <div className="order-2 @4xl:order-1">
          <Reveal>
            <Eyebrow color="#e9c46a">{t.coq10.launch} · {l(product.category)}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.02em] text-white @4xl:text-[102px]">
              {t.coq10.revealTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 font-serif text-2xl italic text-[#e9c46a] @4xl:text-[39px]">{product.name}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 @4xl:text-[27px]">{l(product.positioning)}</p>
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
