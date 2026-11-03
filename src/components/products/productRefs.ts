import { diagrams } from '../../data/diagrams'
import { getReferences } from '../../data/references'
import type { Product, Reference } from '../../data/types'

/** Ordered bibliography for a product: declared references, then any cited by mechanisms or diagrams. */
export function productReferenceIds(p: Product): string[] {
  const ids = [...p.references]
  const add = (id: string) => {
    if (!ids.includes(id)) ids.push(id)
  }
  p.mechanisms.forEach((m) => m.refs?.forEach(add))
  diagrams[p.diagram].refs.forEach(add)
  if (p.story === 'coq10') diagrams.mitochondria.refs.forEach(add)
  return ids
}

export function productReferences(p: Product): Reference[] {
  return getReferences(productReferenceIds(p))
}

/** "[1, 3]"-style citation numbers for a list of reference ids */
export function citation(p: Product, refs: string[] | undefined): string {
  if (!refs?.length) return ''
  const order = productReferenceIds(p)
  const nums = refs.map((r) => order.indexOf(r) + 1).filter((n) => n > 0).sort((a, b) => a - b)
  return nums.length ? `[${nums.join(', ')}]` : ''
}
