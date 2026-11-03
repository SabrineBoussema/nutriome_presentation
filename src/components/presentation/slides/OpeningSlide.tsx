import { motion } from 'motion/react'
import { company } from '../../../data/company'
import { catalog } from '../../../data/products'
import { useI18n } from '../../../i18n'
import { Logo } from '../../ui/Logo'
import { Reveal } from '../../ui/Reveal'
import { useSlide } from '../SlideContext'

/** Corporate opening: logo, motto and the product collection fanning in. */
export function OpeningSlide() {
  const { l, t } = useI18n()
  const { isPrint, layout } = useSlide()
  const spread = layout === 'flow' ? 62 : 168
  const fan = catalog.slice(0, 5)
  const center = (fan.length - 1) / 2

  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden bg-ivory grain @4xl:h-full">
      {/* fine scientific grid */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0e1a2b" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 flex flex-1 flex-col items-center px-6 pb-28 pt-12 text-center @4xl:pb-10 @4xl:pt-16">
        <Reveal y={10}>
          <Logo className="h-28 w-auto @4xl:h-44" />
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-slate @4xl:text-sm">{t.opening.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <h1 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-navy @4xl:text-[117px]">
            Nutriome <span className="italic text-forest">Labs</span>
          </h1>
        </Reveal>
        <Reveal delay={0.55}>
          <p className="mt-5 text-base font-medium tracking-[0.3em] text-amber @4xl:text-xl">{l(company.motto).toUpperCase()}</p>
        </Reveal>

        {/* product collection */}
        <div className="relative mt-10 flex min-h-56 w-full max-w-5xl flex-1 items-end justify-center @4xl:mt-6">
          {fan.map((p, i) => {
            const offset = i - center
            const final = { x: offset * spread, y: Math.abs(offset) * (layout === 'flow' ? 12 : 26), rotate: offset * 6, opacity: 1, scale: 1 - Math.abs(offset) * 0.06 }
            return (
              <motion.div
                key={p.id}
                className="absolute bottom-6 @4xl:bottom-20"
                style={{ zIndex: 10 - Math.abs(offset) }}
                initial={isPrint ? false : { x: 0, y: 140, rotate: 0, opacity: 0, scale: 0.8 }}
                animate={final}
                transition={{ duration: 1.3, delay: 0.7 + Math.abs(offset) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-25px_rgb(14_26_43/0.5)] ring-1 ring-black/5">
                  <img src={p.image} alt={p.name} className="h-40 w-auto object-contain @4xl:h-56" />
                </div>
              </motion.div>
            )
          })}
        </div>
        <Reveal delay={1.2}>
          <p className="mt-4 text-xs text-slate @4xl:text-sm">{t.opening.audience}</p>
        </Reveal>
      </div>
    </section>
  )
}
