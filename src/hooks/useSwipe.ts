import { useEffect, type RefObject } from 'react'

/** Horizontal swipe detection. Vertical gestures are left to native scrolling. */
export function useSwipe(ref: RefObject<HTMLElement | null>, onLeft: () => void, onRight: () => void) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let x0 = 0
    let y0 = 0
    let t0 = 0
    const start = (e: TouchEvent) => {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
      t0 = Date.now()
    }
    const end = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0
      const dy = e.changedTouches[0].clientY - y0
      if (Date.now() - t0 > 800) return
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      if (dx < 0) onLeft()
      else onRight()
    }
    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', end, { passive: true })
    return () => {
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchend', end)
    }
  }, [ref, onLeft, onRight])
}
