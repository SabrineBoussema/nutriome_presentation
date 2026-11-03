import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { SlideDef } from '../../data/presentation'
import { getProduct } from '../../data/products'
import { useI18n } from '../../i18n'

interface OverviewProps {
  open: boolean
  slides: SlideDef[]
  current: number
  onSelect: (index: number) => void
  onClose: () => void
}

/** Grid of every slide, grouped by section, for direct navigation. */
export function Overview({ open, slides, current, onSelect, onClose }: OverviewProps) {
  const { l, t } = useI18n()
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) activeRef.current?.scrollIntoView({ block: 'center' })
  }, [open])

  const groups: { section: string; accent?: string; items: { slide: SlideDef; index: number }[] }[] = []
  slides.forEach((slide, index) => {
    const section = l(slide.section)
    const last = groups[groups.length - 1]
    if (last && last.section === section) last.items.push({ slide, index })
    else groups.push({ section, accent: slide.productSlug ? getProduct(slide.productSlug)?.accent : undefined, items: [{ slide, index }] })
  })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print fixed inset-0 z-50 overflow-y-auto bg-navy/95 px-4 py-6 text-white backdrop-blur-md sm:px-10 sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.overview}
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl">{t.nav.overview}</h2>
              <button type="button" onClick={onClose} aria-label={t.nav.close} className="flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-white/50">{t.nav.shortcuts}</p>
            <div className="mt-8 flex flex-col gap-8">
              {groups.map((g) => (
                <section key={`${g.section}-${g.items[0].index}`}>
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    <span className="size-2 rounded-full" style={{ background: g.accent ?? '#e3862b' }} />
                    {g.section}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                    {g.items.map(({ slide, index }) => (
                      <button
                        key={slide.id}
                        ref={index === current ? activeRef : undefined}
                        type="button"
                        onClick={() => onSelect(index)}
                        className={`flex aspect-video flex-col justify-between rounded-xl p-3 text-left transition-colors ${
                          index === current ? 'bg-white text-navy' : 'bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.12]'
                        }`}
                      >
                        <span className="text-xs font-semibold tabular-nums opacity-60">{String(index + 1).padStart(2, '0')}</span>
                        <span className="text-sm font-medium leading-tight">{l(slide.title)}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
