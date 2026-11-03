import { useEffect, useState } from 'react'

/** 16:9 design baseline. Slides are authored at this size and scaled to fit. */
export const DESIGN_WIDTH = 1600
export const DESIGN_HEIGHT = 900

export interface StageLayout {
  /** 'canvas' = fixed 16:9 canvas scaled to the viewport (desktop, TV, landscape tablet).
   *  'flow'   = responsive, vertically scrollable slides (phones, portrait tablets). */
  mode: 'canvas' | 'flow'
  scale: number
  offsetX: number
  offsetY: number
}

function compute(): StageLayout {
  const w = window.innerWidth
  const h = window.innerHeight
  const canvas = w >= 768 && w / h >= 1.2
  if (!canvas) return { mode: 'flow', scale: 1, offsetX: 0, offsetY: 0 }
  const scale = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT)
  return {
    mode: 'canvas',
    scale,
    offsetX: (w - DESIGN_WIDTH * scale) / 2,
    offsetY: (h - DESIGN_HEIGHT * scale) / 2,
  }
}

export function useStageLayout(): StageLayout {
  const [layout, setLayout] = useState(compute)
  useEffect(() => {
    const onResize = () => setLayout(compute())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return layout
}
