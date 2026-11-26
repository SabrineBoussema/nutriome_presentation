/**
 * Bio3Mag — the three magnesium forms (formulation slide) and the objective comparison table.
 * Elemental magnesium contents are stoichiometric (anhydrous forms); the actual content depends
 * on the raw material and its hydration — the declared total (75 mg/capsule) prevails.
 */

export type MagFormId = 'bisglycinate' | 'malate' | 'citrate'

export interface MagForm {
  id: MagFormId
  name: string
  short: string
  dose: string
  color: string
  formula: string
  nature: string
  mgContent: string
  ligand: string
  rationale: string
  bioavailability: { text: string; level: 'clinique' | 'limitée' | 'non documentée' }
  tolerability: { text: string; level: 'clinique' | 'limitée' | 'non documentée' }
  refs: string[]
}

export const MAG_FORMS: MagForm[] = [
  {
    id: 'bisglycinate',
    name: 'Bisglycinate de magnésium',
    short: 'Bisglycinate',
    dose: '150 mg',
    color: '#1d5a39',
    formula: 'Mg(C₂H₄NO₂)₂',
    nature: 'Chélate : le magnésium est lié à deux molécules de glycine',
    mgContent: '≈ 14 % de magnésium élément',
    ligand: 'Glycine, acide aminé',
    rationale: 'Forme chélatée retenue pour sa tolérance digestive généralement décrite comme bonne.',
    bioavailability: {
      text: 'Absorption supérieure à l’oxyde de magnésium chez 12 patients ayant subi une résection iléale (essai croisé, double aveugle).',
      level: 'limitée',
    },
    tolerability: { text: 'Généralement décrite comme bien tolérée ; pas d’essai comparatif de tolérance identifié.', level: 'non documentée' },
    refs: ['schuette-1994'],
  },
  {
    id: 'malate',
    name: 'Malate de magnésium',
    short: 'Malate',
    dose: '150 mg',
    color: '#c9752c',
    formula: 'MgC₄H₄O₅',
    nature: 'Sel organique',
    mgContent: '≈ 15 % de magnésium élément',
    ligand: 'Malate, intermédiaire du cycle de Krebs',
    rationale: 'Forme organique dont le ligand, le malate, intervient dans le métabolisme énergétique cellulaire.',
    bioavailability: { text: 'Pas de donnée clinique comparative identifiée chez l’humain.', level: 'non documentée' },
    tolerability: { text: 'Pas de donnée spécifique identifiée.', level: 'non documentée' },
    refs: ['debaaij-2015'],
  },
  {
    id: 'citrate',
    name: 'Citrate de magnésium',
    short: 'Citrate',
    dose: '200 mg',
    color: '#1b6fa8',
    formula: 'Mg₃(C₆H₅O₇)₂',
    nature: 'Sel organique, soluble dans l’eau',
    mgContent: '≈ 16 % de magnésium élément',
    ligand: 'Citrate',
    rationale: 'Forme soluble, la plus étudiée des sels organiques de magnésium.',
    bioavailability: {
      text: 'Plus soluble et mieux absorbé que l’oxyde de magnésium dans des études comparatives chez des volontaires sains.',
      level: 'clinique',
    },
    tolerability: { text: 'Effet laxatif possible à forte dose (selles molles).', level: 'clinique' },
    refs: ['walker-2003', 'lindberg-1990'],
  },
]

export type Cell = { text: string; tone?: 'plus' | 'neutral' | 'muted' }

export interface CompareRow {
  label: string
  cells: [Cell, Cell, Cell, Cell]
  refs?: string[]
  /** Row shown only when this returns true (e.g. validated pricing) */
  hidden?: boolean
}

export const COMPARE_COLUMNS = ['Oxyde de magnésium', 'Citrate seul', 'Bisglycinate seul', 'Bio3Mag'] as const

export function compareRows(dailyCost?: string): CompareRow[] {
  return [
    {
      label: 'Nombre de formes',
      cells: [{ text: '1' }, { text: '1' }, { text: '1' }, { text: '3', tone: 'plus' }],
    },
    {
      label: 'Forme organique',
      cells: [{ text: 'Non (sel minéral)', tone: 'muted' }, { text: 'Oui' }, { text: 'Oui' }, { text: 'Oui, les 3 formes', tone: 'plus' }],
    },
    {
      label: 'Forme chélatée',
      cells: [{ text: 'Non', tone: 'muted' }, { text: 'Non', tone: 'muted' }, { text: 'Oui (glycine)' }, { text: '1 sur 3 (bisglycinate)', tone: 'plus' }],
    },
    {
      label: 'Magnésium élément par jour',
      cells: [{ text: 'Selon le produit', tone: 'muted' }, { text: 'Selon le produit', tone: 'muted' }, { text: 'Selon le produit', tone: 'muted' }, { text: '150 mg (40 % des VNR)', tone: 'plus' }],
    },
    {
      label: 'Posologie',
      cells: [{ text: 'Selon le produit', tone: 'muted' }, { text: 'Selon le produit', tone: 'muted' }, { text: 'Selon le produit', tone: 'muted' }, { text: '2 gélules le soir', tone: 'plus' }],
    },
    {
      label: 'Coût par jour',
      cells: [{ text: '—', tone: 'muted' }, { text: '—', tone: 'muted' }, { text: '—', tone: 'muted' }, { text: dailyCost ?? '—', tone: 'plus' }],
      hidden: !dailyCost,
    },
    {
      label: 'Biodisponibilité documentée',
      cells: [
        { text: 'Plus faible que les formes organiques dans plusieurs études', tone: 'muted' },
        { text: 'Supérieure à l’oxyde (volontaires sains)' },
        { text: 'Supérieure à l’oxyde (12 patients, résection iléale)' },
        { text: 'Pas d’étude sur le produit fini', tone: 'neutral' },
      ],
      refs: ['firoz-2001', 'walker-2003', 'lindberg-1990', 'schuette-1994', 'schuchardt-2017'],
    },
    {
      label: 'Diversité de formulation',
      cells: [{ text: 'Un seul sel', tone: 'muted' }, { text: 'Un seul sel', tone: 'muted' }, { text: 'Un seul sel', tone: 'muted' }, { text: 'Trois ligands : malate, citrate, glycine', tone: 'plus' }],
    },
  ]
}
