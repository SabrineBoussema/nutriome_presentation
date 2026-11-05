import { Deck } from '../components/presentation/Deck'
import { DIRECTION_HANDOVER, directionSlides } from '../data/direction'

export default function Direction() {
  return (
    <Deck
      slides={directionSlides}
      allowAutoplay={false}
      allowExport={false}
      padIndex
      atmosphere="emerald"
      extraLink={DIRECTION_HANDOVER}
    />
  )
}
