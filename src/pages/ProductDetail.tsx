import { useMemo } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Deck } from '../components/presentation/Deck'
import { buildDeck } from '../data/presentation'
import { getProduct } from '../data/products'

/** /products/:slug — the product's own section as a standalone, shareable deck. */
export default function ProductDetail() {
  const { slug = '' } = useParams()
  const [params] = useSearchParams()
  const product = getProduct(slug)
  const slides = useMemo(() => (product ? buildDeck(product.slug) : []), [product])

  if (!product) return <Navigate to="/presentation" replace />
  // Legacy nutriome.tn slugs (e.g. /products/bioq10) redirect to the canonical slug
  if (product.slug !== slug) return <Navigate to={`/products/${product.slug}?${params.toString()}`} replace />

  const deck = buildDeck()
  const indexInDeck = deck.findIndex((s) => s.productSlug === product.slug)
  return <Deck slides={slides} backHref={`/presentation?slide=${indexInDeck + 1}`} printQuery={`&product=${product.slug}`} />
}
