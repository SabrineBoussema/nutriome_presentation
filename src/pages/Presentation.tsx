import { useMemo } from 'react'
import { Deck } from '../components/presentation/Deck'
import { buildDeck } from '../data/presentation'

export default function Presentation() {
  const slides = useMemo(() => buildDeck(), [])
  return <Deck slides={slides} />
}
