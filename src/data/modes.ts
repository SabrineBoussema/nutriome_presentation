import type { MechanismMode } from './mechanisms'

/**
 * Presentation modes, switchable from the control bar (URL: ?mode=…).
 * - scientifique : every slide, mechanisms in full (evidence cards)
 * - commercial   : positioning & comparison slides, mechanisms as key messages
 * - express      : short medical visit — hero, formulation, key mechanism stages, posology
 */
export type PresentationMode = 'scientifique' | 'commercial' | 'express'

export const PRESENTATION_MODES: { id: PresentationMode; label: string; hint: string }[] = [
  { id: 'scientifique', label: 'Scientifique', hint: 'Discussion scientifique : toutes les slides et les preuves détaillées' },
  { id: 'commercial', label: 'Commercial', hint: 'Positionnement, différenciation et messages clés' },
  { id: 'express', label: 'Visite express', hint: 'Visite médicale courte : l’essentiel en quelques slides' },
]

export function parsePresentationMode(value: string | null): PresentationMode {
  if (value === 'express') return 'express'
  if (value === 'commercial') return 'commercial'
  return 'scientifique' // also 'expert' (previous name) and no value
}

export function mechanismModeFor(mode: PresentationMode): MechanismMode {
  return mode === 'scientifique' ? 'expert' : 'express'
}
