import { createContext, useContext } from 'react'
import type { SlideDef } from '../../data/presentation'

interface DeckActions {
  slides: SlideDef[]
  goToSlideId: (id: string) => void
}

export const DeckContext = createContext<DeckActions>({ slides: [], goToSlideId: () => {} })

export const useDeck = () => useContext(DeckContext)
