import { MotionGlobalConfig } from 'motion/react'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DeckContext } from '../components/presentation/DeckContext'
import { SlideContext } from '../components/presentation/SlideContext'
import { SlideRenderer } from '../components/presentation/SlideRenderer'
import { buildDeck } from '../data/presentation'
import { DESIGN_HEIGHT, DESIGN_WIDTH } from '../hooks/useStageLayout'
import { useI18n } from '../i18n'

/**
 * /print — every slide rendered statically at the 1600×900 baseline, one per landscape page.
 * `?auto=1` opens the print dialog once images are loaded. `?product=slug` limits to one product.
 */
export default function PrintDeck() {
  const { t } = useI18n()
  const [params] = useSearchParams()
  const product = params.get('product') ?? undefined
  const slides = useMemo(() => buildDeck(product), [product])
  const deckValue = useMemo(() => ({ slides, goToSlideId: () => {} }), [slides])

  // Jump every animation to its end state
  useLayoutEffect(() => {
    MotionGlobalConfig.skipAnimations = true
    document.body.style.background = '#e9e4da'
    return () => {
      MotionGlobalConfig.skipAnimations = false
      document.body.style.background = ''
    }
  }, [])

  useEffect(() => {
    document.title = 'Nutriome Labs — PDF'
    if (params.get('auto') !== '1') return
    let cancelled = false
    const images = Array.from(document.images)
    Promise.all([
      document.fonts.ready,
      ...images.map((img) => (img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener('load', r, { once: true })))),
    ]).then(() => {
      if (!cancelled) window.setTimeout(() => window.print(), 400)
    })
    return () => {
      cancelled = true
    }
  }, [params])

  return (
    <DeckContext.Provider value={deckValue}>
      <div className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-navy px-6 py-3 text-white">
        <div>
          <div className="font-semibold">{t.print.title}</div>
          <div className="text-xs text-white/60">{t.print.hint}</div>
        </div>
        <div className="flex gap-2">
          <Link to="/presentation" className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
            {t.print.back}
          </Link>
          <button type="button" onClick={() => window.print()} className="rounded-full bg-amber px-4 py-2 text-sm font-semibold text-navy">
            {t.print.print}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 py-6 print:block print:p-0">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="print-slide slide-canvas @container relative overflow-hidden bg-ivory shadow-xl"
            style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT }}
          >
            <SlideContext.Provider value={{ step: slide.steps - 1, steps: slide.steps, isPrint: true, layout: 'canvas' }}>
              <SlideRenderer slide={slide} />
            </SlideContext.Provider>
          </div>
        ))}
      </div>
    </DeckContext.Provider>
  )
}
