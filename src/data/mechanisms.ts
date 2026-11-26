/**
 * Stage scripts for the interactive mechanisms of action.
 * Visible text is French; every factual annotation points to a claim in `evidence.ts`.
 * To add a product: add its stages here, a visual component in components/mechanisms, and register it
 * in components/mechanisms/registry.ts.
 */

export type MechanismMode = 'expert' | 'express'

export interface MechanismStage {
  id: string
  /** Short label for the stage stepper */
  label: string
  title: string
  /** Key message for short visits (express mode) */
  lead: string
  /** Evidence cards (claim ids), shown in expert mode and in the references panel. Express mode shows the lead instead. */
  claims: string[]
  /** Kept in express mode (short medical visits) */
  express: boolean
  /** Formulation item highlighted during this stage */
  highlight?: 'malate' | 'citrate' | 'bisglycinate' | 'all' | 'znc'
  /** Anatomical hotspot that leads to this stage */
  hotspot?: string
  /** Shown under the visual, e.g. educational disclaimers */
  caveat?: string
  /** Seconds before auto-advancing in play mode */
  duration: number
}

export type MechanismProductId = 'bio3mag' | 'biodigest'

export const mechanismStages: Record<MechanismProductId, MechanismStage[]> = {
  bio3mag: [
    {
      id: 'absorption',
      label: 'Absorption',
      title: 'Absorption du magnésium',
      lead: 'Dans l’intestin, les sels libèrent l’ion Mg²⁺, qui traverse la paroi intestinale puis rejoint la circulation sanguine.',
      claims: ['mg-absorption', 'mg-organic-forms'],
      express: false,
      highlight: 'all',
      hotspot: 'intestine',
      duration: 10,
    },
    {
      id: 'energy',
      label: 'Énergie',
      title: 'Énergie cellulaire',
      lead: 'Dans la cellule, l’ATP est utilisé surtout sous forme de complexe Mg-ATP : le magnésium est indispensable au métabolisme énergétique.',
      claims: ['mg-energy', 'mg-fatigue', 'malate-krebs'],
      express: true,
      highlight: 'malate',
      hotspot: 'mitochondria',
      duration: 10,
    },
    {
      id: 'muscle',
      label: 'Muscle',
      title: 'Fonction musculaire',
      lead: 'Le calcium déclenche la contraction ; le magnésium participe à la relaxation de la fibre musculaire.',
      claims: ['mg-muscle', 'mg-calcium-antagonist'],
      express: true,
      highlight: 'citrate',
      hotspot: 'muscle',
      duration: 10,
    },
    {
      id: 'nervous',
      label: 'Système nerveux',
      title: 'Système nerveux',
      lead: 'Le magnésium module l’excitabilité neuronale, notamment au niveau du récepteur NMDA des synapses.',
      claims: ['mg-nervous', 'mg-nmda'],
      express: true,
      highlight: 'bisglycinate',
      hotspot: 'brain',
      duration: 10,
    },
    {
      id: 'formulation',
      label: 'Synthèse',
      title: 'Un même ion, plusieurs fonctions',
      lead: 'Les trois sels de Bio3Mag apportent le même ion Mg²⁺, qui contribue à l’ensemble de ces fonctions.',
      claims: ['mg-organic-forms', 'bisglycinate-tolerance'],
      express: true,
      highlight: 'all',
      caveat: 'Aucun sel n’agit exclusivement sur un organe.',
      duration: 12,
    },
  ],
  biodigest: [
    {
      id: 'alteration',
      label: 'Muqueuse altérée',
      title: 'Altération de la muqueuse gastrique',
      lead: 'Acide, AINS, H. pylori ou stress oxydatif peuvent fragiliser la barrière formée par le mucus et les cellules épithéliales.',
      claims: ['mucosa-barrier'],
      express: true,
      hotspot: 'stomach',
      duration: 9,
    },
    {
      id: 'znc',
      label: 'Zinc-L-carnosine',
      title: 'Le complexe zinc-L-carnosine',
      lead: 'Le zinc-L-carnosine est un complexe zinc / L-carnosine dont l’action locale sur la muqueuse lésée a été étudiée.',
      claims: ['znc-local', 'znc-complex'],
      express: true,
      highlight: 'znc',
      duration: 10,
    },
    {
      id: 'cytoprotection',
      label: 'Cytoprotection',
      title: 'Cytoprotection',
      lead: 'Les études décrivent une action antioxydante, une stabilisation des membranes et une modulation de l’inflammation locale.',
      claims: ['znc-cytoprotection', 'zinc-oxidative'],
      express: false,
      highlight: 'znc',
      duration: 10,
    },
    {
      id: 'repair',
      label: 'Réparation',
      title: 'Réparation de la barrière épithéliale',
      lead: 'Les modèles expérimentaux montrent une stimulation de la migration et de la prolifération des cellules épithéliales.',
      claims: ['znc-repair', 'znc-japan'],
      express: true,
      highlight: 'znc',
      caveat: 'Illustration pédagogique des mécanismes étudiés : elle ne préjuge pas d’une cicatrisation clinique.',
      duration: 12,
    },
    {
      id: 'physiology',
      label: 'Respect physiologique',
      title: 'Respect de la physiologie gastrique',
      lead: 'Le zinc-L-carnosine protège la muqueuse sans bloquer la pompe à protons. Il ne remplace ni les IPP ni un traitement prescrit.',
      claims: ['znc-not-antisecretory', 'znc-hpylori'],
      express: true,
      duration: 10,
    },
    {
      id: 'microbiota',
      label: 'Environnement intestinal',
      title: 'Barrière intestinale et microbiote',
      lead: 'Le zinc participe à l’intégrité de la barrière intestinale ; son lien avec le microbiote relève de la recherche émergente.',
      claims: ['zinc-microbiota', 'znc-efsa'],
      express: false,
      hotspot: 'intestine',
      duration: 10,
    },
  ],
}

export function stagesFor(product: MechanismProductId, mode: MechanismMode): MechanismStage[] {
  const all = mechanismStages[product]
  return mode === 'express' ? all.filter((s) => s.express) : all
}

export function hasMechanism(productId: string): productId is MechanismProductId {
  return productId in mechanismStages
}

export function parseMode(value: string | null): MechanismMode {
  return value === 'express' ? 'express' : 'expert'
}
