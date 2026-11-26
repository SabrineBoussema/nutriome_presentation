import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { MechanismProductId } from '../../data/mechanisms'
import type { Product } from '../../data/types'
import bio3magStatic from '../../assets/scientific/bio3mag-mecanismes-action.svg'
import biodigestStatic from '../../assets/scientific/biodigest-mecanismes-action.svg'

/**
 * Interactive mechanisms, lazy-loaded so their code only downloads when the slide is reached.
 * `fallback` is the static infographic used for print/PDF, while loading, and if the component fails.
 * To extend: add stages in data/mechanisms.ts, a component here, and claims in data/evidence.ts.
 */
export const mechanismRegistry: Record<
  MechanismProductId,
  { component: LazyExoticComponent<ComponentType<{ product: Product }>>; fallback: string; alt: string }
> = {
  bio3mag: {
    component: lazy(() => import('./Bio3MagMechanism')),
    fallback: bio3magStatic,
    alt: 'Bio3Mag : mécanismes d’action. Malate, citrate et bisglycinate de magnésium — énergie cellulaire, fonction musculaire, système nerveux.',
  },
  biodigest: {
    component: lazy(() => import('./BioDigestMechanism')),
    fallback: biodigestStatic,
    alt: 'BioDigest : mécanismes d’action. Zinc-L-carnosine — protection et réparation de la muqueuse gastrique, respect physiologique, barrière intestinale.',
  },
}

/** Warm the chunk ahead of time so the first stage appears without a loading frame */
const loaders: Record<MechanismProductId, () => Promise<unknown>> = {
  bio3mag: () => import('./Bio3MagMechanism'),
  biodigest: () => import('./BioDigestMechanism'),
}
export const preloadMechanism = (id: MechanismProductId) => loaders[id]()
