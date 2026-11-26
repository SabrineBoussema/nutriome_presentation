import { BookOpen, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { evidence, LEVEL_LABEL, STATUS_LABEL } from '../../data/evidence'
import { parseMode, stagesFor, type MechanismMode, type MechanismProductId, type MechanismStage } from '../../data/mechanisms'
import { presentationConfig } from '../../data/presentation'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { RuntimeContext } from './kit'
import { ReferencesPanel } from './ReferencesPanel'

export interface VisualContext {
  stage: MechanismStage
  index: number
  stages: MechanismStage[]
  /** Jump to the stage with this id (hotspots). No-op if the stage is not part of the current mode. */
  goToStageId: (id: string) => void
  /** Increments on "restart" so scenes can replay their entrance */
  replayKey: number
}

type Playback = 'idle' | 'playing' | 'paused'

/**
 * ScientificPresentationEngine — shared shell for every interactive mechanism.
 * - Stages are deck steps: the clicker, arrow keys, swipe and the deck autoplay all walk through them.
 * - Local controls: previous / next, play (auto-advance) / pause (freezes every animation), restart.
 * - Express mode (short visits) keeps the key stages and the first annotation; expert mode shows everything.
 * - Animations stop when the slide is left (the slide unmounts) and respect prefers-reduced-motion.
 */
export function MechanismEngine({
  product,
  productId,
  accent,
  eyebrow,
  renderVisual,
}: {
  product: Product
  productId: MechanismProductId
  accent: string
  eyebrow: string
  renderVisual: (ctx: VisualContext) => ReactNode
}) {
  const { step, goToStep, layout } = useSlide()
  const [params, setParams] = useSearchParams()
  const mode = parseMode(params.get('mode'))
  const review = presentationConfig.showValidationBadges || params.get('review') === '1'
  const stages = stagesFor(productId, mode)
  const index = Math.min(Math.max(step, 0), stages.length - 1)
  const stage = stages[index]
  const last = stages.length - 1

  const prefersReduced = useReducedMotion() ?? false
  const [playback, setPlayback] = useState<Playback>('idle')
  const [replayKey, setReplayKey] = useState(0)
  const [refsOpen, setRefsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const paused = playback === 'paused'

  const go = useCallback((i: number) => goToStep?.(Math.min(Math.max(i, 0), last)), [goToStep, last])

  const goToStageId = useCallback(
    (id: string) => {
      const i = stages.findIndex((s) => s.id === id)
      if (i >= 0) {
        setPlayback((p) => (p === 'paused' ? 'idle' : p))
        go(i)
      }
    },
    [stages, go],
  )

  const setMode = (m: MechanismMode) => {
    if (m === mode) return
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (m === 'express') next.set('mode', 'express')
        else next.delete('mode')
        return next
      },
      { replace: true },
    )
    // stage lists differ between modes: restart from the first stage
    window.setTimeout(() => goToStep?.(0), 0)
  }

  const restart = useCallback(() => {
    setReplayKey((k) => k + 1)
    setPlayback('playing')
    go(0)
  }, [go])

  // A manual stage change unfreezes the animations
  const lastIndex = useRef(index)
  useEffect(() => {
    if (lastIndex.current !== index && playback === 'paused') setPlayback('idle')
    lastIndex.current = index
  }, [index, playback])

  // Auto-advance
  useEffect(() => {
    if (playback !== 'playing') return
    if (index >= last) {
      const id = window.setTimeout(() => setPlayback('idle'), stage.duration * 1000)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => go(index + 1), stage.duration * 1000)
    return () => window.clearTimeout(id)
  }, [playback, index, last, stage.duration, go])

  // Freeze SMIL animations (CSS ones are frozen through the .mech-paused class)
  useEffect(() => {
    rootRef.current?.querySelectorAll('svg').forEach((svg) => (paused ? svg.pauseAnimations() : svg.unpauseAnimations()))
  }, [paused, index, replayKey])

  // Pause when the tab is hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPlayback((p) => (p === 'playing' ? 'paused' : p))
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Local shortcuts (the deck owns ←/→/space): K = play/pause, R = restart, E = express/expert, B = references
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target
      if (t instanceof HTMLElement && t.closest('input, textarea, select, [contenteditable="true"]')) return
      switch (e.key.toLowerCase()) {
        case 'k':
          setPlayback((p) => (p === 'playing' ? 'paused' : 'playing'))
          break
        case 'r':
          restart()
          break
        case 'e':
          setMode(mode === 'express' ? 'expert' : 'express')
          break
        case 'b':
          setRefsOpen((v) => !v)
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Express: one key message. Expert: the evidence cards. Never both (they would repeat each other).
  const visibleClaims = (mode === 'express' ? [] : stage.claims)
    .map((id) => evidence[id])
    .filter((c) => c && c.status !== 'unsupported')

  const canvas = layout === 'canvas'
  const reduced = prefersReduced

  return (
    <MotionConfig reducedMotion="user">
      <RuntimeContext.Provider value={{ paused, reduced }}>
        <div ref={rootRef} className={`relative flex min-h-0 flex-1 flex-col ${paused ? 'mech-paused' : ''} ${reduced ? 'mech-reduced' : ''}`}>
          {/* Header: stage title + mode + references */}
          <div className={`flex items-end justify-between gap-6 ${canvas ? '' : 'flex-wrap'}`}>
            <div className="min-w-0">
              <p
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold uppercase ${canvas ? 'text-[15px] tracking-[0.2em]' : 'text-[12px] tracking-[0.14em]'}`}
                style={{ color: accent }}
              >
                <span className="h-px w-8" style={{ background: accent }} aria-hidden />
                {eyebrow}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={stage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy ${canvas ? 'mt-1.5 text-[48px]' : 'mt-1 text-[2rem]'}`}
                >
                  {stage.title}
                </motion.h2>
              </AnimatePresence>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div role="radiogroup" aria-label="Mode de présentation" className="flex rounded-full border border-navy/15 bg-white p-1">
                {(['express', 'expert'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => setMode(m)}
                    title={m === 'express' ? 'Visite courte : étapes clés (E)' : 'Discussion scientifique : toutes les étapes (E)'}
                    className={`min-h-10 rounded-full px-4 text-[15px] font-semibold transition-colors ${mode === m ? 'text-white' : 'text-slate hover:text-navy'}`}
                    style={mode === m ? { background: accent } : undefined}
                  >
                    {m === 'express' ? 'Express' : 'Expert'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setRefsOpen(true)}
                aria-expanded={refsOpen}
                title="Références scientifiques (B)"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-[15px] font-semibold text-navy hover:bg-navy/5"
              >
                <BookOpen className="size-[18px]" aria-hidden />
                Références
              </button>
            </div>
          </div>

          {/* Visual + annotations */}
          <div className={`mt-4 min-h-0 flex-1 gap-7 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_430px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
            <div
              className={`relative min-h-0 overflow-hidden rounded-[28px] border border-navy/10 bg-white/80 shadow-[0_24px_50px_-34px_rgb(14_26_43/0.35)] ${canvas ? '' : 'aspect-[960/560]'}`}
            >
              <div className={canvas ? 'absolute inset-0' : 'h-full w-full'}>{renderVisual({ stage, index, stages, goToStageId, replayKey })}</div>
            </div>
            <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${stage.id}-${mode}-${replayKey}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-0 flex-col gap-4"
                >
                  {mode === 'express' && (
                    <p className={`font-medium leading-snug text-navy ${canvas ? 'text-[26px]' : 'text-[1.2rem]'}`}>{stage.lead}</p>
                  )}
                  <ul className="flex flex-col gap-3">
                    {visibleClaims.map((c, i) => {
                      const level = LEVEL_LABEL[c.level]
                      return (
                        <motion.li
                          key={c.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: reduced ? 0 : 0.4 + i * 0.8 }}
                          className="rounded-2xl border border-navy/10 bg-white px-4 py-2.5"
                        >
                          <p className={`leading-snug text-ink ${canvas ? 'text-[16px]' : 'text-base'}`}>{c.fr}</p>
                          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] font-semibold">
                            <span className="inline-flex items-center gap-1.5" style={{ color: level.tone }}>
                              <span className="size-2 rounded-full" style={{ background: level.tone }} aria-hidden />
                              {level.short}
                            </span>
                            {review && c.status !== 'validated' && (
                              <span className="rounded-full bg-amber-soft px-2 py-0.5 text-[#9a5612]">{STATUS_LABEL[c.status]}</span>
                            )}
                          </p>
                        </motion.li>
                      )
                    })}
                  </ul>
                  {stage.caveat && (
                    <p className={`border-l-2 pl-3 italic leading-snug text-slate ${canvas ? 'text-[15px]' : 'text-sm'}`} style={{ borderColor: accent }}>
                      {stage.caveat}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stepper + playback controls */}
          <div className={`mt-4 flex items-center justify-between gap-4 ${canvas ? '' : 'flex-col items-stretch'}`}>
            <ol className="flex flex-wrap items-center gap-2" aria-label="Étapes du mécanisme">
              {stages.map((s, i) => {
                const active = i === index
                const done = i < index
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={active ? 'step' : undefined}
                      aria-label={`Étape ${i + 1} sur ${stages.length} : ${s.label}`}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-[14.5px] font-semibold transition-colors ${
                        active ? 'border-transparent text-white' : done ? 'border-navy/15 bg-white text-navy' : 'border-navy/10 bg-white/60 text-slate hover:text-navy'
                      }`}
                      style={active ? { background: accent } : undefined}
                    >
                      <span
                        className={`flex size-6 items-center justify-center rounded-full text-[12.5px] ${active ? 'bg-white/20' : 'bg-navy/5'}`}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      {s.label}
                    </button>
                  </li>
                )
              })}
            </ol>
            <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Contrôles de l’animation">
              <CtrlButton label="Étape précédente" onClick={() => go(index - 1)} disabled={index === 0}>
                <ChevronLeft className="size-5" aria-hidden />
              </CtrlButton>
              <CtrlButton
                label={playback === 'playing' ? 'Pause (K)' : 'Lecture automatique (K)'}
                onClick={() => setPlayback((p) => (p === 'playing' ? 'paused' : 'playing'))}
                primary
                accent={accent}
              >
                {playback === 'playing' ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
              </CtrlButton>
              <CtrlButton label="Recommencer (R)" onClick={restart}>
                <RotateCcw className="size-5" aria-hidden />
              </CtrlButton>
              <CtrlButton label="Étape suivante" onClick={() => go(index + 1)} disabled={index === last}>
                <ChevronRight className="size-5" aria-hidden />
              </CtrlButton>
            </div>
          </div>

          <AnimatePresence>
            {refsOpen && <ReferencesPanel productId={productId} stage={stage} review={review} onClose={() => setRefsOpen(false)} />}
          </AnimatePresence>
          <span className="sr-only">{product.name}</span>
        </div>
      </RuntimeContext.Provider>
    </MotionConfig>
  )
}

function CtrlButton({
  label,
  onClick,
  disabled,
  primary,
  accent,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  primary?: boolean
  accent?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`flex size-12 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${
        primary ? 'border-transparent text-white' : 'border-navy/15 bg-white text-navy hover:bg-navy/5'
      }`}
      style={primary ? { background: accent } : undefined}
    >
      {children}
    </button>
  )
}
