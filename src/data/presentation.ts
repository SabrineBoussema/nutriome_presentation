import { diagrams } from './diagrams'
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
  return /à confirmer|to be confirmed|attente de validation|pending validation/i.test(text)
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
  const differentiation = base('differentiation', { fr: 'Rôles physiologiques', en: 'Physiological roles' })
  const formulation = base('formulation', { fr: 'Formulation', en: 'Formulation' })
  const safety = base('safety', { fr: 'Précautions', en: 'Precautions' })
  const practical = base('practical', { fr: 'Informations pratiques', en: 'Practical information' })
  const refs = presentationConfig.showReferences
    ? [base('references', { fr: 'Références', en: 'References' })]
    : []

  if (p.story === 'bio3mag') {
    return [
      base('product-hero', { fr: 'Bio3Mag', en: 'Bio3Mag' }, 1, {
        fr: 'Nouveau : trois sels de magnésium dans une gélule, soit 75 mg de magnésium élément.',
        en: 'New: three magnesium salts in one capsule, i.e. 75 mg of elemental magnesium.',
      }),
      base('mag-pillars', { fr: 'Trois formes, une formule', en: 'Three forms, one formula' }, 2, {
        fr: 'Étape 1 : les trois piliers. Étape 2 : réunion dans la formule. Insister sur 150 / 150 / 200 mg de composé et 75 mg d’élément.',
        en: 'Step 1: the three pillars. Step 2: brought together in the formula. Stress 150 / 150 / 200 mg of compound and 75 mg elemental.',
      }),
      base('mag-molecules', { fr: 'Schémas des trois formes', en: 'The three forms, schematically' }, 3, {
        fr: 'Schémas simplifiés, non à l’échelle. La structure réelle dépend de la forme hydratée et du fournisseur.',
        en: 'Simplified, not-to-scale schematics. Actual structure depends on hydration form and supplier.',
      }),
      base('mag-physiology', { fr: 'Rôle physiologique du magnésium', en: 'Physiological role of magnesium' }, diagrams['magnesium-atp'].steps.length),
      composition,
      differentiation,
      formulation,
      practical,
      safety,
      ...refs,
    ]
  }

  if (p.story === 'coq10') {
    return [
      base('q10-reveal', { fr: 'Nouvelle Coenzyme Q10', en: 'New Coenzyme Q10' }, 1, {
        fr: 'Lancement. La formulation est en attente de la fiche produit finale : ne pas citer de chiffres hors de la diapositive Composition.',
        en: 'Launch. Formulation pending the final product sheet: do not quote figures beyond the Composition slide.',
      }),
      base('q10-mitochondrion', { fr: 'Énergie cellulaire', en: 'Cellular energy' }, diagrams.mitochondria.steps.length),
      base('q10-mechanism', { fr: 'Mécanisme', en: 'Mechanism' }, diagrams['electron-transport'].steps.length, {
        fr: 'Biologie générale de la CoQ10, et non effet démontré du produit.',
        en: 'General CoQ10 biology, not a demonstrated effect of the product.',
      }),
      composition,
      base('q10-highlights', { fr: 'Pourquoi BioQ10+', en: 'Why BioQ10+' }, 2, {
        fr: 'Étape 1 : les chiffres clés. Étape 2 : le dosage de chaque vitamine en % des VNR. Atouts factuels uniquement : pour une comparaison avec la concurrence, ajouter des données marché vérifiées.',
        en: 'Step 1: key figures. Step 2: each vitamin’s dose as % of the NRV. Factual strengths only: add verified market data before any competitor comparison.',
      }),
      differentiation,
      practical,
      safety,
      ...refs,
    ]
  }

  return [
    base('product-hero', { fr: p.name, en: p.name }),
    composition,
    base('science', { fr: 'Explication scientifique', en: 'Scientific explanation' }, diagrams[p.diagram].steps.length),
    differentiation,
    formulation,
    practical,
    safety,
    ...refs,
  ]
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
