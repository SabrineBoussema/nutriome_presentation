import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parsePresentationMode, type PresentationMode } from '../data/modes'
import type { SlideDef } from '../data/presentation'

/**
 * Presentation mode (?mode=…) and the matching slide list.
 * Switching mode keeps the presenter on the same slide when it exists in the new mode,
 * otherwise on the closest previous one.
 */
export function usePresentationMode(build: (mode: PresentationMode) => SlideDef[]) {
  const [params, setParams] = useSearchParams()
  const mode = parsePresentationMode(params.get('mode'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slides = useMemo(() => build(mode), [mode])

  const setMode = useCallback(
    (next: PresentationMode) => {
      if (next === mode) return
      const target = build(next)
      const current = Math.max(0, Number.parseInt(params.get('slide') ?? '1', 10) - 1)
      let idx = -1
      for (let i = Math.min(current, slides.length - 1); i >= 0 && idx < 0; i--) {
        idx = target.findIndex((s) => s.id === slides[i]?.id)
      }
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          if (next === 'scientifique') p.delete('mode')
          else p.set('mode', next)
          p.set('slide', String(Math.max(idx, 0) + 1))
          return p
        },
        { replace: true },
      )
    },
    [mode, build, params, slides, setParams],
  )

  return { mode, slides, setMode }
}
