/**
 * « En pratique » : la diapositive de conclusion de chaque produit.
 * Elle réunit arguments de vente, indications, composition, posologie et contre-indications.
 * Règles : uniquement des éléments déjà sourcés ailleurs (evidence.ts, commercialClaims.ts, composition déclarée).
 * Pas de résultat clinique attribué au produit fini. Langage simple.
 */

export interface PitchArgument {
  title: string
  text: string
  /** commercialClaims id: when set, the argument text comes from the claim (validated text or its fallback) */
  claim?: string
}

export interface ProductPitch {
  /** One simple sentence, used as the slide title */
  positioning: string
  arguments: PitchArgument[]
  /** « Indications » — when to recommend the product */
  indications: string[]
  /** Scope of the indications (source / evidence level) */
  indicationsNote: string
  /** Extra composition line, e.g. elemental magnesium */
  compositionNote?: string
  /** commercialClaims id of the closing slogan */
  sloganClaim: string
  /** Scope / limit statement, always visible */
  limit: string
}

export const PITCH: Record<string, ProductPitch> = {
  biodigest: {
    positioning: 'Le zinc carnosine pour le confort digestif et la muqueuse de l’estomac.',
    arguments: [
      {
        title: 'Exclusivité Tunisie',
        text: 'Seul laboratoire en Tunisie à importer la molécule.',
        claim: 'biodigest-exclusivity',
      },
      {
        title: 'Une molécule à part',
        text: 'Zinc lié à la L-carnosine (1:1) : ce n’est pas un simple sel de zinc.',
      },
      {
        title: 'Plus de 30 ans de recul',
        text: 'Utilisé comme médicament au Japon depuis 1994, puis en Corée du Sud.',
      },
    ],
    indications: [
      'Confort digestif et protection de la muqueuse de l’estomac',
      'En accompagnement d’un traitement anti-H. pylori prescrit',
      'Prise régulière d’anti-inflammatoires (AINS) ou d’aspirine',
      'Quand on ne veut pas bloquer l’acidité : n’agit pas comme un IPP',
    ],
    indicationsNote: 'D’après les études sur le zinc carnosine (polaprezinc).',
    sloganClaim: 'biodigest-slogan-final',
    limit: 'Complément alimentaire : ne remplace pas un traitement prescrit (IPP, éradication de H. pylori…).',
  },
  bio3mag: {
    positioning: 'Trois formes de magnésium en une gélule, contre la fatigue, pour les muscles et les nerfs.',
    arguments: [
      {
        title: 'Trois formes en une',
        text: 'Malate, citrate et bisglycinate de magnésium dans un seul produit.',
      },
      {
        title: 'Bien absorbé, bien toléré',
        text: 'Formes plus solubles que l’oxyde ; bisglycinate réputé doux pour le ventre.',
      },
      {
        title: 'Des bénéfices reconnus',
        text: 'Fatigue, muscles, système nerveux : allégations autorisées du magnésium.',
      },
    ],
    indications: [
      'Fatigue physique et intellectuelle',
      'Stress du quotidien et nervosité',
      'Fonction musculaire : vie active et sportive',
      'Besoin en magnésium avec un ventre sensible',
    ],
    indicationsNote: 'Allégations du magnésium autorisées (Règl. UE 432/2012).',
    compositionNote: '75 mg de magnésium élément par gélule',
    sloganClaim: 'bio3mag-slogan-final',
    limit: 'Complément alimentaire. Aucune étude clinique n’a été menée sur Bio3Mag lui-même.',
  },
}

/** Key message (« À retenir ») of each storyline slide, keyed by slide kind. */
export const TAKEAWAYS: Record<string, string> = {
  'bd-heritage': 'Nutriome Labs est le seul importateur de la molécule zinc carnosine en Tunisie.',
  'bd-complex': 'Un complexe qui cible la muqueuse de l’estomac, sans bloquer l’acidité.',
  'bd-mucosa': 'Des essais publiés avec le polaprezinc (H. pylori, AINS) : résultats encourageants, données encore limitées.',
  'b3m-intro': 'Trois sels de magnésium réunis dans une seule formule.',
  'b3m-salts': 'Trois formes de magnésium, chacune choisie pour son profil.',
  'b3m-complement': 'Trois ligands différents, un même ion Mg²⁺ : une complémentarité de formulation.',
  'b3m-enzymes': 'Le magnésium est cofacteur de plus de 300 systèmes enzymatiques.',
  'b3m-comfort': 'Des formes plus solubles que l’oxyde, et un bisglycinate réputé bien toléré.',
  'b3m-synthesis': 'Un même magnésium : énergie, muscles, nerfs et moins de fatigue.',
}
