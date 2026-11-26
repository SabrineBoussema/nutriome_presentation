import { createContext, useContext } from 'react'

export interface SlideState {
  /** Current progressive-reveal step (0-based) */
  step: number
  steps: number
  /** Static rendering for print/PDF — every step revealed, no animation */
  isPrint: boolean
  /** 'flow' on phones / portrait tablets — slides should use compact spacing */
  layout: 'canvas' | 'flow'
  /** Jump to a step of the current slide (interactive slides). Absent in print. */
  goToStep?: (step: number) => void
  /** Key message of the current slide, displayed by SlideShell */
  takeaway?: string
}

export const SlideContext = createContext<SlideState>({ step: 0, steps: 1, isPrint: false, layout: 'canvas' })

export const useSlide = () => useContext(SlideContext)
