import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SlideDef } from '../data/presentation'

/**
 * Slide + step state, synchronised with `?slide=N` (1-based) so any slide can be shared.
 * "Next" first walks through a slide's progressive steps, then moves on.
 */
export function useDeckNavigation(slides: SlideDef[]) {
  const [params, setParams] = useSearchParams()
  const total = slides.length
  const parsed = Number.parseInt(params.get('slide') ?? '1', 10)
  const index = Number.isFinite(parsed) ? Math.min(Math.max(parsed - 1, 0), Math.max(total - 1, 0)) : 0

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const pendingStep = useRef<number | null>(null)
  const lastIndex = useRef(index)

  // Reset step whenever the slide changes (incl. browser back/forward)
  useEffect(() => {
    if (lastIndex.current === index) return
    lastIndex.current = index
    setStep(pendingStep.current ?? 0)
    pendingStep.current = null
  }, [index])

  const goTo = useCallback(
    (target: number, opts?: { step?: number }) => {
      const clamped = Math.min(Math.max(target, 0), total - 1)
      if (clamped === index) {
        if (opts?.step !== undefined) setStep(opts.step)
        return
      }
      setDirection(clamped > index ? 1 : -1)
      pendingStep.current = opts?.step ?? 0
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('slide', String(clamped + 1))
          return next
        },
        { replace: true },
      )
    },
    [index, total, setParams],
  )

  const steps = slides[index]?.steps ?? 1
  const atEnd = index === total - 1 && step >= steps - 1

  const next = useCallback(() => {
    if (step < steps - 1) {
      setDirection(1)
      setStep((s) => s + 1)
    } else if (index < total - 1) goTo(index + 1)
  }, [step, steps, index, total, goTo])

  const prev = useCallback(() => {
    if (step > 0) {
      setDirection(-1)
      setStep((s) => s - 1)
    } else if (index > 0) goTo(index - 1, { step: (slides[index - 1]?.steps ?? 1) - 1 })
  }, [step, index, slides, goTo])

  return { index, step, steps, total, direction, atEnd, next, prev, goTo }
}
