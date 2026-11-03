import type { NrvKey } from './nrv'

export type Lang = 'fr' | 'en'

/** Localized string. French is the source language. */
export type L = { fr: string; en: string }

export type ValidationStatus = 'verified' | 'pending'

export interface Reference {
  id: string
  authors?: string
  year?: number
  title: string
  source?: string
  url: string
  doi?: string
}

export interface Ingredient {
  name: L
  quantity?: number
  unit?: 'mg' | 'µg' | 'UI' | '%'
  /** Secondary line, e.g. "dont zinc élément : 5 mg" */
  detail?: L
  /** When set, the composition card shows the quantity as % of the EU nutrient reference value */
  nrvKey?: NrvKey
  /** Short physiological role shown on the composition card */
  role?: L
  status?: ValidationStatus
}

export interface Mechanism {
  title: L
  body: L
  /** Evidence level, displayed as a chip so general biology is never confused with product efficacy */
  evidence: 'authorized-claim' | 'established-physiology' | 'human-studies' | 'preclinical'
  refs?: string[]
}

export interface PracticalField {
  text: L
  pending?: boolean
}

export type DiagramId =
  | 'mitochondria'
  | 'electron-transport'
  | 'magnesium-atp'
  | 'glucose-ampk'
  | 'gastric-mucosa'
  | 'vitamin-d'
  | 'immune-barrier'
  | 'vascular'

export interface Product {
  id: string
  slug: string
  /** Legacy slugs used on nutriome.tn — redirect to `slug` */
  aliases?: string[]
  name: string
  category: L
  tagline: L
  positioning: L
  description: L
  image: string
  /** width / height of the packaging artwork, used to avoid any cropping */
  imageAspect: number
  /** Theme accent for the product's slides */
  accent: string
  accentSoft: string
  doseBasis: L
  ingredients: Ingredient[]
  excipients?: L
  mechanisms: Mechanism[]
  diagram: DiagramId
  differentiators: L[]
  usage?: PracticalField
  format?: PracticalField
  packaging?: PracticalField
  precautions: L[]
  hcpNotes: L[]
  references: string[]
  validationStatus: ValidationStatus
  /** Open issues to resolve against the final packaging / product specification */
  validationNotes: L[]
  /** Which storytelling template to use */
  story: 'standard' | 'bio3mag' | 'coq10'
  /** Units per box, when confirmed on the pack */
  packCount?: number
  manufacturer?: L
  /** Where the current data comes from */
  source: L
}
