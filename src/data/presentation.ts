import { catalog, products } from './products'
import type { L, Product } from './types'

export const presentationConfig = {
  /** Seconds per step when autoplay is on */
  autoplayInterval: 8,
  /** Shows amber "pending validation" badges on unverified data. Off for this deck. */
  showValidationBadges: false,
  /** Appends an internal slide listing every open validation item */
  showValidationAppendix: false,
  /** FR/EN control in the presenter bar. Hidden for this deck (French only). */
  showLanguageSwitch: false,
  /** Dedicated scientific-references slides at the end of each product section */
  showReferences: false,
}

/** Visible copy that only exists to flag missing validation — hidden with the badges. */
export function isValidationPlaceholder(text: string): boolean {
  return /à confirmer|à préciser|à déclarer|to be confirmed|to be specified|attente de validation|pending validation/i.test(text)
}

export type SlideKind =
  | 'opening'
  | 'about'
  | 'portfolio'
  | 'closing'
  | 'validation'
  | 'product-hero'
  | 'composition'
  | 'science'
  | 'illustration'
  | 'indications'
  | 'differentiation'
  | 'formulation'
  | 'safety'
  | 'practical'
  | 'references'
  | 'mag-pillars'
  | 'mag-molecules'
  | 'mag-physiology'
  | 'q10-reveal'
  | 'q10-mitochondrion'
  | 'q10-mechanism'
  | 'q10-highlights'
  | 'direction-welcome'
  | 'direction-program'
  | 'direction-closing'

export interface SlideDef {
  id: string
  kind: SlideKind
  productSlug?: string
  /** For slides split over several pages (e.g. the validation appendix) */
  part?: number
  /** Number of progressive reveal steps (1 = static) */
  steps: number
  section: L
  title: L
  notes?: L
}

const S = {
  intro: { fr: 'Introduction', en: 'Introduction' },
  range: { fr: 'Gamme', en: 'Range' },
  end: { fr: 'Conclusion', en: 'Closing' },
}

function productSlides(p: Product): SlideDef[] {
  const section: L = { fr: p.name, en: p.name }
  const base = (kind: SlideKind, title: L, steps = 1, notes?: L): SlideDef => ({
    id: `${p.slug}-${kind}`,
    kind,
    productSlug: p.slug,
    steps,
    section,
    title,
    notes,
  })
  const composition = base('composition', { fr: 'Composition', en: 'Composition' }, 1, {
    fr: 'Rappeler la base de calcul de chaque quantité, et signaler les valeurs en attente de validation.',
    en: 'State the basis of each amount, and point out values pending validation.',
  })
  const schema = base('illustration', { fr: 'Mode d’action', en: 'How it works' })
  const indications = base('indications', { fr: 'Indications thérapeutiques', en: 'Therapeutic indications' })
  const posology = base('practical', { fr: 'Posologie', en: 'Dosage' })
  const refs = presentationConfig.showReferences
    ? [base('references', { fr: 'Références', en: 'References' })]
    : []

  // Therapeutic presentation: composition, illustrative schema, indications, dosage. Mechanism, science and
  // formulation slides are kept in the codebase but no longer part of the deck.
  const hero =
    p.story === 'coq10'
      ? base('q10-reveal', { fr: 'Nouvelle Coenzyme Q10', en: 'New Coenzyme Q10' }, 1, {
          fr: 'Lancement de BioQ10+.',
          en: 'BioQ10+ launch.',
        })
      : base('product-hero', { fr: p.name, en: p.name })

  return [hero, composition, schema, indications, posology, ...refs]
}

export function buildDeck(onlySlug?: string): SlideDef[] {
  if (onlySlug) {
    const p = products.find((x) => x.slug === onlySlug)
    return p ? productSlides(p) : []
  }
  const deck: SlideDef[] = [
    {
      id: 'opening',
      kind: 'opening',
      steps: 1,
      section: S.intro,
      title: { fr: 'Ouverture', en: 'Opening' },
      notes: {
        fr: 'Accueil. Nutriome Labs : micronutrition scientifique, distribuée via les professionnels de santé.',
        en: 'Welcome. Nutriome Labs: science-based micronutrition distributed through healthcare professionals.',
      },
    },
    { id: 'about', kind: 'about', steps: 1, section: S.intro, title: { fr: 'À propos', en: 'About' } },
    {
      id: 'portfolio',
      kind: 'portfolio',
      steps: 1,
      section: S.range,
      title: { fr: 'Notre gamme', en: 'Our range' },
      notes: {
        fr: 'Cliquer sur un produit pour accéder directement à sa section.',
        en: 'Click a product to jump straight to its section.',
      },
    },
    ...catalog.flatMap(productSlides),
    { id: 'closing', kind: 'closing', steps: 1, section: S.end, title: { fr: 'Contact', en: 'Contact' } },
  ]
  if (presentationConfig.showValidationAppendix) {
    deck.push(
      ...[1, 2].map((part) => ({
        id: `validation-${part}`,
        kind: 'validation' as const,
        part,
        steps: 1,
        section: { fr: 'Annexe interne', en: 'Internal appendix' },
        title: { fr: `Points à valider (${part}/2)`, en: `Items to validate (${part}/2)` },
        notes: {
          fr: 'Diapositive interne : à masquer pour une présentation externe (presentationConfig.showValidationAppendix).',
          en: 'Internal slide: hide for external audiences (presentationConfig.showValidationAppendix).',
        },
      })),
    )
  }
  return deck
}
