import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { Reveal } from '../ui/Reveal'
import { SlideShell } from '../ui/SlideShell'

/** Full mechanism infographic (vector SVG in the deck's fonts and colours), uncropped. */
export function MechanismInfographicSlide({
  product,
  src,
  alt,
}: {
  product: Product
  src: string
  alt: string
}) {
  const { layout } = useSlide()
  const maxHeight = layout === 'canvas' ? 690 : 'min(740px, calc(100dvh - 10rem))'

  return (
    <SlideShell product={product}>
      <Reveal className="flex min-h-0 flex-1 items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="h-auto w-full max-w-full object-contain"
          style={{ maxHeight }}
          draggable={false}
        />
      </Reveal>
    </SlideShell>
  )
}
