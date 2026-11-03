import { ArrowUpRight, FlaskRound, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { catalog } from '../../../data/products'
import { useI18n } from '../../../i18n'
import { Eyebrow } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell, SlideTitle } from '../../ui/SlideShell'
import { useDeck } from '../DeckContext'
import { useSlide } from '../SlideContext'

/** Animated portfolio grid — each card jumps to the product's section. */
export function PortfolioSlide() {
  const { l, t } = useI18n()
  const { goToSlideId, slides } = useDeck()
  const { isPrint } = useSlide()

  const firstSlideId = (slug: string) => slides.find((s) => s.productSlug === slug)?.id

  return (
    <SlideShell tone="paper" label={t.portfolio.eyebrow}>
      <div className="flex flex-col gap-2 @4xl:flex-row @4xl:items-end @4xl:justify-between">
        <div>
          <Reveal>
            <Eyebrow color="#1d5a39">{t.portfolio.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SlideTitle className="mt-3 text-navy">{t.portfolio.title}</SlideTitle>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="max-w-sm text-sm text-slate @4xl:text-right @4xl:text-[21px]">{t.portfolio.subtitle}</p>
        </Reveal>
      </div>

      <div className="mt-6 grid flex-1 grid-cols-1 gap-3 @md:grid-cols-2 @4xl:mt-8 @4xl:grid-cols-4 @4xl:grid-rows-2 @4xl:gap-4">
        {catalog.map((p, i) => {
          const target = firstSlideId(p.slug)
          const isNew = p.story !== 'standard'
          return (
            <Reveal key={p.id} delay={0.12 + i * 0.06} className="min-h-0">
              <motion.button
                type="button"
                onClick={() => target && goToSlideId(target)}
                whileHover={isPrint ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-navy/[0.06] bg-white text-left shadow-[0_24px_50px_-36px_rgb(14_26_43/0.5)] transition-shadow hover:shadow-[0_40px_70px_-36px_rgb(14_26_43/0.55)]"
              >
                <div className="relative flex flex-1 items-center justify-center px-3 pb-3 pt-11" style={{ background: `linear-gradient(160deg, ${p.accentSoft}, #fff)` }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-28 w-auto max-w-full rounded-[4px] object-contain shadow-md transition-transform duration-500 group-hover:scale-[1.04] @4xl:max-h-[118px]"
                  />
                  {isNew && (
                    <span className="absolute left-3 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white" style={{ background: p.accent }}>
                      <Sparkles className="size-3" aria-hidden /> {t.common.newProduct}
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-2 px-4 pb-3 pt-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: p.accent }}>
                      {l(p.category)}
                    </div>
                    <div className="mt-0.5 text-lg font-semibold text-ink @4xl:text-[25px]">{p.name}</div>
                    <div className="mt-0.5 line-clamp-1 text-sm leading-snug text-slate">{l(p.tagline)}</div>
                  </div>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-slate transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 no-print" aria-hidden />
                </div>
              </motion.button>
            </Reveal>
          )
        })}
        {/* placeholder for the R&D formula announced on nutriome.tn */}
        <Reveal delay={0.12 + catalog.length * 0.06}>
          <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-navy/15 p-6 text-center text-slate">
            <FlaskRound className="size-8 text-forest/60" aria-hidden />
            <div className="mt-3 font-semibold text-ink">{t.common.comingSoon}</div>
            <div className="text-sm">{t.common.comingSoonBody}</div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  )
}
