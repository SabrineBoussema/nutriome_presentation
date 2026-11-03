import { motion } from 'motion/react'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'

interface PackshotProps {
  product: Product
  className?: string
  /** Gentle floating motion */
  float?: boolean
  glow?: boolean
  eager?: boolean
}

/**
 * Packaging artwork displayed whole (never cropped): the frame takes the artwork's
 * own aspect ratio and the image is object-contain.
 */
export function Packshot({ product, className = '', float = true, glow = true, eager = false }: PackshotProps) {
  const { isPrint } = useSlide()
  const animate = float && !isPrint
  return (
    <div className={`relative ${className}`}>
      {glow && (
        <div
          className="absolute inset-[-12%] rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${product.accent}33, transparent)` }}
          aria-hidden
        />
      )}
      <motion.div
        className="relative"
        animate={animate ? { y: [0, -10, 0] } : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <div
          className="relative overflow-hidden rounded-[6px] bg-white shadow-[0_40px_80px_-30px_rgb(14_26_43/0.45),0_12px_24px_-12px_rgb(14_26_43/0.25)] ring-1 ring-black/5"
          style={{ aspectRatio: product.imageAspect }}
        >
          <img
            src={product.image}
            alt={`${product.name} — packaging`}
            className="absolute inset-0 h-full w-full object-contain"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
          {/* specular sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(115deg, rgb(255 255 255 / 0.28) 0%, transparent 32%, transparent 70%, rgb(0 0 0 / 0.05) 100%)' }}
            aria-hidden
          />
        </div>
        {/* floor shadow */}
        <div className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-navy/15 blur-md" aria-hidden />
      </motion.div>
    </div>
  )
}
