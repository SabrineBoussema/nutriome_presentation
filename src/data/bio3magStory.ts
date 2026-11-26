/**
 * Bio3Mag — commercial & scientific storyline (slides A → F).
 * Rule: separate what belongs to MAGNESIUM in general (`scope: 'mg'`, identical whatever the salt)
 * from what belongs to EACH SALT (`scope: 'salt'`: ligand, chelation, documented bioavailability).
 * "Orientation" = the laboratory's selection rationale, not a demonstrated organ-specific effect.
 */

export type Scope = 'mg' | 'salt'

export const SCOPE_LABEL: Record<Scope, string> = {
  mg: 'Fonction du magnésium',
  salt: 'Propre au sel',
}

/* A — introduction */
export const INTRO = {
  title: 'Bio3Mag — L’intelligence d’une triple formulation',
  subtitle: 'Trois formes soigneusement sélectionnées pour associer biodisponibilité, confort digestif et complémentarité fonctionnelle.',
  pillars: [
    {
      id: 'bioavailability',
      title: 'Biodisponibilité',
      text: 'Formes organiques et chélatée.',
      slide: 'b3m-comfort',
      refs: ['walker-2003', 'schuette-1994'],
    },
    {
      id: 'comfort',
      title: 'Confort digestif',
      text: 'Le bisglycinate, forme chélatée.',
      slide: 'b3m-comfort',
      refs: ['schuette-1994'],
    },
    {
      id: 'enzymes',
      title: 'Complémentarité métabolique et enzymatique',
      text: 'Trois ligands, un même ion Mg²⁺.',
      slide: 'b3m-enzymes',
      refs: ['ods-magnesium'],
    },
    {
      id: 'balance',
      title: 'Équilibre nerveux et musculaire',
      text: 'Fonctions autorisées du magnésium.',
      slide: 'b3m-synthesis',
      refs: ['eu-432-2012'],
    },
  ],
}

/* B — why these three salts */
export interface SaltCard {
  id: 'malate' | 'citrate' | 'bisglycinate'
  name: string
  orientation: string
  dose: string
  color: string
  soft: string
  formula: string
  points: { scope: Scope; text: string }[]
  refs: string[]
}

export const SALT_CARDS: SaltCard[] = [
  {
    id: 'malate',
    name: 'Malate',
    orientation: 'Orientation énergétique et enzymatique',
    dose: '150 mg',
    color: '#c9752c',
    soft: '#fbeadb',
    formula: 'MgC₄H₄O₅ · ≈ 15 % de Mg',
    points: [
      { scope: 'salt', text: 'Le malate, forme ionisée de l’acide malique, est un intermédiaire du cycle de Krebs.' },
      { scope: 'mg', text: 'Le magnésium contribue à un métabolisme énergétique normal.' },
      { scope: 'mg', text: 'Les réactions utilisant l’ATP mobilisent le complexe Mg-ATP.' },
    ],
    refs: ['eu-432-2012', 'debaaij-2015'],
  },
  {
    id: 'citrate',
    name: 'Citrate',
    orientation: 'Orientation musculaire et métabolique',
    dose: '200 mg',
    color: '#1b6fa8',
    soft: '#e3f0f8',
    formula: 'Mg₃(C₆H₅O₇)₂ · ≈ 16 % de Mg',
    points: [
      { scope: 'salt', text: 'Biodisponibilité documentée : plus soluble et mieux absorbé que l’oxyde dans des études comparatives.' },
      { scope: 'mg', text: 'Le magnésium contribue à l’équilibre électrolytique.' },
      { scope: 'mg', text: 'Le magnésium contribue à une fonction musculaire normale.' },
    ],
    refs: ['walker-2003', 'lindberg-1990', 'eu-432-2012'],
  },
  {
    id: 'bisglycinate',
    name: 'Bisglycinate',
    orientation: 'Orientation nerveuse et digestive',
    dose: '150 mg',
    color: '#1d5a39',
    soft: '#e3efe6',
    formula: 'Mg(C₂H₄NO₂)₂ · ≈ 14 % de Mg',
    points: [
      { scope: 'salt', text: 'Chélate : le magnésium est lié à deux molécules de glycine.' },
      { scope: 'salt', text: 'Intérêt pour la tolérance digestive : généralement décrit comme bien toléré ; données comparatives limitées.' },
      { scope: 'mg', text: 'Le magnésium contribue au fonctionnement normal du système nerveux.' },
    ],
    refs: ['schuette-1994', 'eu-432-2012'],
  },
]

/* C — complementarity */
export const ORIENTATIONS = [
  { salts: ['malate', 'citrate'] as const, title: 'Malate + Citrate', text: 'Énergie, métabolisme et fonction musculaire' },
  { salts: ['bisglycinate'] as const, title: 'Bisglycinate', text: 'Équilibre nerveux et recherche de confort digestif' },
]

/* D — 300+ enzyme systems */
export const ENZYME_STEPS = [
  { id: 'ion', title: 'L’ion Mg²⁺', text: 'Deuxième cation intracellulaire, libéré par chacun des trois sels.' },
  { id: 'atp', title: 'Association avec l’ATP', text: 'L’ATP cellulaire circule principalement sous forme de complexe Mg-ATP.' },
  { id: 'enzymes', title: 'Réactions enzymatiques', text: 'Cofacteur de plus de 300 systèmes enzymatiques (kinases, ATPases…).' },
  // Physiological functions (energy, proteins, muscles, nerves) are shown once, on the synthesis slide.
]
export const ENZYME_REFS = ['ods-magnesium', 'debaaij-2015', 'eu-432-2012']

/* E — bioavailability & digestive comfort: objective table (no absorption percentages) */
export const COMFORT_COLUMNS = ['Oxyde de magnésium', 'Citrate', 'Malate', 'Bisglycinate'] as const
export const COMFORT_ROWS: { label: string; cells: [string, string, string, string]; note?: string }[] = [
  { label: 'Nature chimique', cells: ['Sel minéral', 'Sel organique', 'Sel organique', 'Chélate (glycine)'] },
  { label: 'Magnésium élément du sel', cells: ['≈ 60 %', '≈ 16 %', '≈ 15 %', '≈ 14 %'], note: 'Une teneur élevée ne signifie pas une meilleure absorption.' },
  { label: 'Solubilité', cells: ['Faible', 'Bonne', 'Pas de donnée comparative identifiée', 'Pas de donnée comparative identifiée'] },
  {
    label: 'Biodisponibilité documentée',
    cells: ['Plus faible que les formes solubles dans plusieurs études', 'Supérieure à l’oxyde (volontaires sains)', 'Pas de donnée clinique comparative identifiée', 'Supérieure à l’oxyde (12 patients, résection iléale)'],
  },
  {
    label: 'Tolérance digestive',
    cells: ['Effet laxatif possible (sels non absorbés)', 'Effet laxatif possible à forte dose', 'Pas de donnée spécifique identifiée', 'Généralement décrite comme bonne'],
  },
]
export const COMFORT_REFS = ['ods-magnesium', 'schuchardt-2017', 'blancquaert-2019', 'walker-2003', 'lindberg-1990', 'schuette-1994']

/* F — synthesis */
export const SYNTHESIS_KEYWORDS = [
  'Triple formulation',
  'Biodisponibilité',
  'Confort digestif',
  'Énergie cellulaire',
  'Équilibre neuromusculaire',
  'Activité enzymatique',
  'Récupération',
]
