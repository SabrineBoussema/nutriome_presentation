import { Component, Suspense, useEffect, type ReactNode } from 'react'
import { hasMechanism } from '../../data/mechanisms'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { SlideShell } from '../ui/SlideShell'
import { MechanismInfographicSlide } from '../products/MechanismInfographicSlide'
import { mechanismRegistry, preloadMechanism } from './registry'

class MechanismBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    console.error('[mechanism] falling back to the static infographic', error)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function StaticInfographic({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center">
      <img src={src} alt={alt} className="h-auto max-h-[690px] w-full max-w-full object-contain" draggable={false} />
    </div>
  )
}

/** Mechanism-of-action slide: interactive when available, static infographic for print, loading or errors. */
export function MechanismSlide({ product }: { product: Product }) {
  const { isPrint } = useSlide()
  const entry = hasMechanism(product.id) ? mechanismRegistry[product.id] : undefined

  useEffect(() => {
    if (entry && hasMechanism(product.id)) void preloadMechanism(product.id)
  }, [entry, product.id])

  if (!entry) return null
  if (isPrint) return <MechanismInfographicSlide product={product} src={entry.fallback} alt={entry.alt} />

  const Interactive = entry.component
  const fallback = <StaticInfographic src={entry.fallback} alt={entry.alt} />
  return (
    <SlideShell product={product}>
      <MechanismBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <Interactive product={product} />
        </Suspense>
      </MechanismBoundary>
    </SlideShell>
  )
}
