import { getReferences } from './references'
import type { Reference } from './types'

/**
 * Centralised scientific-evidence registry for every claim shown in the interactive mechanisms.
 *
 * Rules
 * - Never invent a citation: a claim without a verifiable source keeps `refs: []` and is flagged.
 * - `status` drives what is shown to an external audience:
 *     'validated'     → shown normally
 *     'to-review'     → shown with an amber "à valider médicalement" chip (wording or scope to confirm)
 *     'unsupported'   → never shown as a fact; listed only in the references panel for medical review
 * - `level` distinguishes general physiology from ingredient studies and from product-specific evidence.
 *   No claim here is product-specific: no study on Bio3Mag or BioDigest themselves is available.
 */

export type EvidenceLevel =
  | 'authorized-claim' // EU authorised health claim (Reg. 432/2012) for the nutrient
  | 'physiology' // established human physiology / biochemistry
  | 'mechanistic' // in-vitro / animal / mechanistic studies
  | 'clinical' // human studies on the ingredient (not on the finished product)
  | 'product' // studies on the finished product itself

export type ClaimStatus = 'validated' | 'to-review' | 'unsupported'

export interface Claim {
  id: string
  product: 'bio3mag' | 'biodigest'
  /** Visible French wording */
  fr: string
  ingredient: string
  mechanism: string
  level: EvidenceLevel
  refs: string[]
  status: ClaimStatus
  /** Why the claim is flagged, for the medical reviewer */
  reviewNote?: string
}

export const LEVEL_LABEL: Record<EvidenceLevel, { fr: string; short: string; tone: string }> = {
  'authorized-claim': { fr: 'Allégation santé autorisée (UE 432/2012)', short: 'Allégation autorisée', tone: '#1d5a39' },
  physiology: { fr: 'Physiologie établie', short: 'Physiologie', tone: '#1b6fa8' },
  mechanistic: { fr: 'Études mécanistiques / précliniques', short: 'Mécanistique', tone: '#6a3d8f' },
  clinical: { fr: 'Études cliniques sur l’ingrédient (pas sur le produit fini)', short: 'Clinique (ingrédient)', tone: '#0e1a2b' },
  product: { fr: 'Études sur le produit fini', short: 'Produit', tone: '#c9a24b' },
}

export const STATUS_LABEL: Record<ClaimStatus, string> = {
  validated: 'Validé',
  'to-review': 'À valider médicalement',
  unsupported: 'Non étayé — à revoir',
}

const claims: Claim[] = [
  // ---------------------------------------------------------------- BIO3MAG
  {
    id: 'mg-absorption',
    product: 'bio3mag',
    fr: 'Le magnésium est absorbé surtout dans l’intestin grêle (voie paracellulaire) et dans le côlon (canaux TRPM6/7), puis distribué par le sang.',
    ingredient: 'Magnésium',
    mechanism: 'Absorption intestinale',
    level: 'physiology',
    refs: ['debaaij-2015'],
    status: 'validated',
  },
  {
    id: 'mg-organic-forms',
    product: 'bio3mag',
    fr: 'Les formes de magnésium solubles (dont le citrate) sont décrites comme mieux absorbées que l’oxyde ou le sulfate dans de petites études.',
    ingredient: 'Citrate, malate, bisglycinate de magnésium',
    mechanism: 'Biodisponibilité selon la forme',
    level: 'clinical',
    refs: ['ods-magnesium'],
    status: 'to-review',
    reviewNote:
      'Données comparatives limitées et hétérogènes ; extrapolation au malate et au bisglycinate à confirmer. Ne pas parler de « haute biodisponibilité » sans étude comparative.',
  },
  {
    id: 'mg-energy',
    product: 'bio3mag',
    fr: 'Le magnésium contribue à un métabolisme énergétique normal ; l’ATP cellulaire est présent principalement sous forme de complexe Mg-ATP.',
    ingredient: 'Magnésium',
    mechanism: 'Métabolisme énergétique',
    level: 'authorized-claim',
    refs: ['eu-432-2012', 'debaaij-2015'],
    status: 'validated',
  },
  {
    id: 'mg-fatigue',
    product: 'bio3mag',
    fr: 'Le magnésium contribue à réduire la fatigue.',
    ingredient: 'Magnésium',
    mechanism: 'Fatigue',
    level: 'authorized-claim',
    refs: ['eu-432-2012', 'efsa-magnesium-2010'],
    status: 'validated',
  },
  {
    id: 'malate-krebs',
    product: 'bio3mag',
    fr: 'Le malate est un intermédiaire du cycle de Krebs, dans la mitochondrie.',
    ingredient: 'Malate de magnésium',
    mechanism: 'Biochimie du ligand',
    level: 'physiology',
    refs: [],
    status: 'validated',
    reviewNote: 'Fait de biochimie générale (manuel). Ne démontre pas un effet énergétique propre au malate de magnésium.',
  },
  {
    id: 'malate-energy-specific',
    product: 'bio3mag',
    fr: 'Le malate de magnésium cible spécifiquement l’énergie mitochondriale.',
    ingredient: 'Malate de magnésium',
    mechanism: 'Effet spécifique de forme',
    level: 'mechanistic',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Aucune preuve qu’un sel de magnésium agisse de façon exclusive sur un organe. Retiré des visuels.',
  },
  {
    id: 'mg-muscle',
    product: 'bio3mag',
    fr: 'Le magnésium contribue à une fonction musculaire normale et à l’équilibre électrolytique.',
    ingredient: 'Magnésium',
    mechanism: 'Contraction / relaxation musculaire',
    level: 'authorized-claim',
    refs: ['eu-432-2012'],
    status: 'validated',
  },
  {
    id: 'mg-calcium-antagonist',
    product: 'bio3mag',
    fr: 'Le magnésium module les flux de calcium dans la fibre musculaire et participe à la relaxation après la contraction.',
    ingredient: 'Magnésium',
    mechanism: 'Couplage excitation-contraction',
    level: 'physiology',
    refs: ['debaaij-2015'],
    status: 'validated',
  },
  {
    id: 'mg-nervous',
    product: 'bio3mag',
    fr: 'Le magnésium contribue au fonctionnement normal du système nerveux et à des fonctions psychologiques normales.',
    ingredient: 'Magnésium',
    mechanism: 'Transmission nerveuse',
    level: 'authorized-claim',
    refs: ['eu-432-2012'],
    status: 'validated',
  },
  {
    id: 'mg-nmda',
    product: 'bio3mag',
    fr: 'Au niveau des synapses, le Mg²⁺ bloque le récepteur NMDA au repos et module ainsi l’excitabilité neuronale.',
    ingredient: 'Magnésium',
    mechanism: 'Récepteur NMDA',
    level: 'physiology',
    refs: ['debaaij-2015'],
    status: 'validated',
  },
  {
    id: 'bisglycinate-sleep',
    product: 'bio3mag',
    fr: 'Le bisglycinate de magnésium favorise un sommeil de qualité.',
    ingredient: 'Bisglycinate de magnésium',
    mechanism: 'Sommeil',
    level: 'clinical',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Pas de référence identifiée spécifique au bisglycinate. Préférer l’allégation autorisée « système nerveux / fonctions psychologiques ».',
  },
  {
    id: 'bisglycinate-tolerance',
    product: 'bio3mag',
    fr: 'Le bisglycinate est généralement décrit comme bien toléré sur le plan digestif.',
    ingredient: 'Bisglycinate de magnésium',
    mechanism: 'Tolérance digestive',
    level: 'clinical',
    refs: [],
    status: 'to-review',
    reviewNote: 'Formulation courante mais source à fournir par le fabricant de la matière première.',
  },
  {
    id: 'bio3mag-synergy',
    product: 'bio3mag',
    fr: 'Synergie des trois formes : absorption globale maximisée.',
    ingredient: 'Association des trois sels',
    mechanism: 'Synergie',
    level: 'product',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Aucune étude comparative sur l’association. Remplacé par « trois sels organiques associés dans une même formule ».',
  },

  // -------------------------------------------------------------- BIODIGEST
  {
    id: 'mucosa-barrier',
    product: 'biodigest',
    fr: 'La muqueuse gastrique est protégée par une couche de mucus et de bicarbonate et par des jonctions serrées entre cellules épithéliales ; une agression (AINS, H. pylori, stress oxydatif) peut l’altérer.',
    ingredient: '—',
    mechanism: 'Barrière muqueuse',
    level: 'physiology',
    refs: ['efthymakis-2022'],
    status: 'validated',
  },
  {
    id: 'znc-complex',
    product: 'biodigest',
    fr: 'Le zinc-L-carnosine (polaprezinc) est un complexe chélaté zinc / L-carnosine (1:1).',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Structure',
    level: 'physiology',
    refs: ['hewlings-2020', 'mahmood-2007'],
    status: 'validated',
  },
  {
    id: 'znc-local',
    product: 'biodigest',
    fr: 'Une action locale sur la muqueuse lésée est décrite : le complexe interagit avec la zone altérée, où il exerce son effet protecteur.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Interaction locale',
    level: 'mechanistic',
    refs: ['efthymakis-2022'],
    status: 'to-review',
    reviewNote: 'Données principalement expérimentales. La formule « forme non dissociée » de l’emballage est à confirmer avec le fournisseur.',
  },
  {
    id: 'znc-cytoprotection',
    product: 'biodigest',
    fr: 'Effets cytoprotecteurs étudiés : action antioxydante, stabilisation des membranes et modulation des cytokines inflammatoires.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Cytoprotection',
    level: 'mechanistic',
    refs: ['efthymakis-2022', 'hewlings-2020'],
    status: 'validated',
  },
  {
    id: 'zinc-oxidative',
    product: 'biodigest',
    fr: 'Le zinc contribue à protéger les cellules contre le stress oxydatif.',
    ingredient: 'Zinc',
    mechanism: 'Stress oxydatif',
    level: 'authorized-claim',
    refs: ['eu-432-2012'],
    status: 'validated',
  },
  {
    id: 'znc-repair',
    product: 'biodigest',
    fr: 'In vitro, le zinc-carnosine stimule la migration et la prolifération des cellules épithéliales ; chez 10 volontaires sains, il a limité la hausse de perméabilité intestinale induite par l’indométacine.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Réparation épithéliale',
    level: 'clinical',
    refs: ['mahmood-2007'],
    status: 'validated',
  },
  {
    id: 'znc-japan',
    product: 'biodigest',
    fr: 'Le polaprezinc est utilisé au Japon comme médicament protecteur de la muqueuse dans l’ulcère gastrique.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Usage clinique',
    level: 'clinical',
    refs: ['efthymakis-2022'],
    status: 'validated',
    reviewNote: 'Statut d’AMM en Corée du Sud : source à fournir.',
  },
  {
    id: 'znc-not-antisecretory',
    product: 'biodigest',
    fr: 'Le zinc-L-carnosine n’est pas un antisécrétoire : il ne réduit pas l’acidité gastrique et ne remplace ni les IPP ni un traitement prescrit.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Mode d’action non antisécrétoire',
    level: 'physiology',
    refs: ['efthymakis-2022'],
    status: 'validated',
  },
  {
    id: 'znc-hypochlorhydria',
    product: 'biodigest',
    fr: 'Efficace même en cas d’hypochlorhydrie.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Hypochlorhydrie',
    level: 'clinical',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Aucune étude identifiée dans cette population. Retiré des visuels.',
  },
  {
    id: 'znc-hpylori',
    product: 'biodigest',
    fr: 'Ajouté à la trithérapie anti-H. pylori, le polaprezinc a augmenté le taux d’éradication dans une méta-analyse de 3 essais (396 patients) ; les auteurs jugent les preuves encore limitées.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Adjuvant à l’éradication de H. pylori',
    level: 'clinical',
    refs: ['mahmoud-2022'],
    status: 'validated',
  },
  {
    id: 'znc-drugs',
    product: 'biodigest',
    fr: 'Protection de l’estomac sous antibiotiques ou metformine.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Gastroprotection médicamenteuse',
    level: 'clinical',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Seules les données AINS (indométacine, Mahmood 2007) sont étayées. Antibiotiques / metformine : source à fournir.',
  },
  {
    id: 'zinc-microbiota',
    product: 'biodigest',
    fr: 'Le zinc participe à l’intégrité de la barrière intestinale ; ses liens avec le microbiote font l’objet de recherches émergentes.',
    ingredient: 'Zinc',
    mechanism: 'Barrière intestinale et microbiote',
    level: 'mechanistic',
    refs: ['scarpellini-2022'],
    status: 'to-review',
    reviewNote: 'Recherche émergente, principalement préclinique. À présenter comme telle.',
  },
  {
    id: 'znc-microbiota-fast',
    product: 'biodigest',
    fr: 'Équilibre et renforcement de la flore intestinale observés en moins de deux semaines.',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Microbiote',
    level: 'product',
    refs: [],
    status: 'unsupported',
    reviewNote: 'Aucune référence identifiée. Ne pas présenter comme un fait.',
  },
  {
    id: 'znc-efsa',
    product: 'biodigest',
    fr: 'La sécurité du zinc L-carnosine a été évaluée par l’EFSA (nouvel aliment, 2022).',
    ingredient: 'Zinc-L-carnosine',
    mechanism: 'Sécurité',
    level: 'physiology',
    refs: ['efsa-zinc-carnosine-2022'],
    status: 'validated',
  },
]

export const evidence: Record<string, Claim> = Object.fromEntries(claims.map((c) => [c.id, c]))

export function getClaim(id: string): Claim {
  const c = evidence[id]
  if (!c) throw new Error(`Unknown evidence claim: ${id}`)
  return c
}

export function claimsFor(product: Claim['product']): Claim[] {
  return claims.filter((c) => c.product === product)
}

export function claimReferences(ids: string[]): Reference[] {
  const refIds = [...new Set(ids.flatMap((id) => evidence[id]?.refs ?? []))]
  return getReferences(refIds)
}

/** Claims that may be displayed as facts to an external audience */
export const isDisplayable = (c: Claim) => c.status !== 'unsupported'
