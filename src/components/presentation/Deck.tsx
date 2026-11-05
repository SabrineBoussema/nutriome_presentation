import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { presentationConfig, type SlideDef } from '../../data/presentation'
import { useDeckNavigation } from '../../hooks/useDeckNavigation'
import { useFullscreen } from '../../hooks/useFullscreen'
import { useIdle } from '../../hooks/useIdle'
import { DESIGN_HEIGHT, DESIGN_WIDTH, useStageLayout } from '../../hooks/useStageLayout'
import { useSwipe } from '../../hooks/useSwipe'
import { useI18n } from '../../i18n'
import { ControlBar } from '../navigation/ControlBar'
import { NotesPanel } from '../navigation/NotesPanel'
import { Overview } from '../navigation/Overview'
import { DeckContext } from './DeckContext'
import { SlideContext } from './SlideContext'
import { SlideRenderer } from './SlideRenderer'

interface DeckProps {
  slides: SlideDef[]
  /** Shown as a "home" button, e.g. on a single-product deck */
  backHref?: string
  /** Query appended to the /print URL for PDF export */
  printQuery?: string
  /** When false, autoplay is unavailable (Direction deck). Default true. */
  allowAutoplay?: boolean
  /** When false, the PDF export control is hidden. Default true. */
  allowExport?: boolean
  /** Zero-pad the slide counter, e.g. 01 / 03 */
  padIndex?: boolean
  /** Stage atmosphere. Emerald is used by the Direction presentation. */
  atmosphere?: 'navy' | 'emerald'
  /** Discrete extra link in the control bar (does not auto-navigate). */
  extraLink?: { to: string; label: string }
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.985 }),
}

export function Deck({
  slides,
  backHref,
  printQuery = '',
  allowAutoplay = true,
  allowExport = true,
  padIndex = false,
  atmosphere = 'navy',
  extraLink,
}: DeckProps) {
  const { l, lang } = useI18n()
  const nav = useDeckNavigation(slides)
  const layout = useStageLayout()
  const fullscreen = useFullscreen()
  const [autoplay, setAutoplay] = useState(false)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const idle = useIdle(2800, fullscreen.isFullscreen || (autoplay && !nav.atEnd))

  const slide = slides[nav.index]
  const { next, prev, goTo } = nav

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target
      if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          goTo(0)
          break
        case 'End':
          goTo(slides.length - 1)
          break
        case 'f':
        case 'F':
          fullscreen.toggle()
          break
        case 'g':
        case 'G':
        case 'o':
        case 'O':
          setOverviewOpen((v) => !v)
          break
        case 'n':
        case 'N':
          setNotesOpen((v) => !v)
          break
        case 'p':
        case 'P':
          if (allowAutoplay) setAutoplay((v) => !v)
          break
        case 'Escape':
          setOverviewOpen(false)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, slides.length, fullscreen, allowAutoplay])

  // Autoplay — pauses while the overview is open, stops at the end
  useEffect(() => {
    if (!autoplay || overviewOpen || nav.atEnd) return
    const id = window.setTimeout(next, presentationConfig.autoplayInterval * 1000)
    return () => window.clearTimeout(id)
  }, [autoplay, overviewOpen, next, nav.atEnd, nav.index, nav.step])

  useSwipe(stageRef, next, prev)

  // Flow mode: scroll back to the top on slide change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [nav.index])

  useEffect(() => {
    document.title = `${l(slide.title)} · Nutriome Labs`
  }, [slide, l])

  const goToSlideId = useCallback(
    (id: string) => {
      const i = slides.findIndex((s) => s.id === id)
      if (i >= 0) goTo(i)
    },
    [slides, goTo],
  )

  const deckValue = useMemo(() => ({ slides, goToSlideId }), [slides, goToSlideId])
  const progress = ((nav.index + (nav.step + 1) / nav.steps) / slides.length) * 100

  const share = async () => {
    const url = new URL(window.location.href)
    url.searchParams.set('slide', String(nav.index + 1))
    url.searchParams.set('lang', lang)
    try {
      await navigator.clipboard.writeText(url.toString())
    } catch {
      window.prompt('URL', url.toString())
    }
  }

  const exportPdf = () => {
    window.open(`/print?auto=1&lang=${lang}${printQuery}`, '_blank', 'noopener')
  }

  const slideNode = (
    <SlideContext.Provider value={{ step: nav.step, steps: nav.steps, isPrint: false, layout: layout.mode }}>
      <SlideRenderer slide={slide} />
    </SlideContext.Provider>
  )

  return (
    <DeckContext.Provider value={deckValue}>
      <div
        ref={stageRef}
        className={`fixed inset-0 overflow-hidden ${atmosphere === 'emerald' ? 'bg-[#022D25]' : 'bg-navy'}`}
        style={{ cursor: idle ? 'none' : undefined }}
      >
        {/* progress */}
        <div className="no-print absolute inset-x-0 top-0 z-30 h-[3px] bg-white/10">
          <motion.div className="h-full bg-gradient-to-r from-forest via-leaf to-amber" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
        </div>

        {layout.mode === 'canvas' ? (
          <div
            className={`absolute overflow-hidden rounded-[2px] shadow-2xl ${atmosphere === 'emerald' ? 'bg-[#022D25]' : 'bg-ivory'}`}
            style={{
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              left: layout.offsetX,
              top: layout.offsetY,
              transform: `scale(${layout.scale})`,
              transformOrigin: 'top left',
            }}
          >
            <div className="slide-canvas @container relative h-full w-full">
              <AnimatePresence initial={false} custom={nav.direction} mode="popLayout">
                <motion.div
                  key={slide.id}
                  custom={nav.direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {slideNode}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className={`absolute inset-0 overflow-y-auto overscroll-contain ${atmosphere === 'emerald' ? 'bg-[#022D25]' : 'bg-ivory'}`}
          >
            <div className="@container min-h-full">
              <AnimatePresence initial={false} custom={nav.direction} mode="wait">
                <motion.div
                  key={slide.id}
                  custom={nav.direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-dvh"
                >
                  {slideNode}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        <ControlBar
          index={nav.index}
          total={slides.length}
          step={nav.step}
          steps={nav.steps}
          sectionLabel={l(slide.section)}
          onPrev={prev}
          onNext={next}
          canPrev={nav.index > 0 || nav.step > 0}
          canNext={!nav.atEnd}
          autoplay={autoplay && !nav.atEnd}
          onToggleAutoplay={allowAutoplay ? () => setAutoplay((v) => !v) : undefined}
          onOverview={() => setOverviewOpen(true)}
          notesOpen={notesOpen}
          onToggleNotes={() => setNotesOpen((v) => !v)}
          fullscreen={fullscreen}
          onExport={allowExport ? exportPdf : undefined}
          onShare={share}
          hidden={idle && !overviewOpen}
          backHref={backHref}
          padIndex={padIndex}
          extraLink={extraLink}
        />
        <NotesPanel open={notesOpen} slide={slide} next={slides[nav.index + 1]} onClose={() => setNotesOpen(false)} />
        <Overview
          open={overviewOpen}
          slides={slides}
          current={nav.index}
          onSelect={(i) => {
            goTo(i)
            setOverviewOpen(false)
          }}
          onClose={() => setOverviewOpen(false)}
        />
      </div>
    </DeckContext.Provider>
  )
}
