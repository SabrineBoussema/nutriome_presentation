import { useCallback } from 'react'
import { Deck } from '../components/presentation/Deck'
import type { PresentationMode } from '../data/modes'
import { buildDeck } from '../data/presentation'
import { usePresentationMode } from '../hooks/usePresentationMode'
import { LiveReturn } from '../live/LiveReturn'

export default function Presentation() {
  const build = useCallback((m: PresentationMode) => buildDeck(undefined, m), [])
  const { mode, slides, setMode } = usePresentationMode(build)
  return (
    <>
      <LiveReturn />
      <Deck slides={slides} modeSwitch={{ mode, onChange: setMode }} />
    </>
  )
}
