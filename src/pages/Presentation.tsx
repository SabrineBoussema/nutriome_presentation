import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Deck } from '../components/presentation/Deck'
import { parseMode } from '../data/mechanisms'
import { buildDeck } from '../data/presentation'

export default function Presentation() {
  const [params] = useSearchParams()
  const mode = parseMode(params.get('mode'))
  const slides = useMemo(() => buildDeck(undefined, mode), [mode])
  return <Deck slides={slides} />
}
