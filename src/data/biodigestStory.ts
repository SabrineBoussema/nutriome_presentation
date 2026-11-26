/**
 * BioDigest — commercial storyline and Japanese pharmaceutical heritage.
 * Key distinction, repeated on every slide: polaprezinc is an AUTHORISED DRUG in Japan (since 1994) and South Korea;
 * BioDigest is a FOOD SUPPLEMENT containing zinc L-carnosine. Results obtained with polaprezinc are not BioDigest results.
 * All dates and figures were checked against the cited sources on 26/11/2026.
 */

/* ---------------------------------------------------------------- proofs (justificatifs) */

export type ProofStatus = 'available' | 'missing'

export interface Proof {
  id: string
  label: string
  /** Which commercial claim it supports */
  supports: string[]
  status: ProofStatus
  /** Path under /public (e.g. /docs/biodigest/certificat-origine.pdf) once the document is supplied */
  file?: string
  note?: string
}

/** Never invent a document: a proof stays 'missing' until the file is added to /public/docs/biodigest/. */
export const PROOFS: Proof[] = [
  { id: 'origin-certificate', label: 'Certificat d’origine de la matière première', supports: ['biodigest-japan-raw-material'], status: 'missing' },
  { id: 'coa', label: 'Certificat d’analyse (CoA) de la matière première', supports: ['biodigest-japan-raw-material'], status: 'missing' },
  { id: 'manufacturer', label: 'Identification du fabricant de la matière première', supports: ['biodigest-japan-raw-material'], status: 'missing' },
  { id: 'supplier-tech', label: 'Documentation technique du fournisseur', supports: ['biodigest-japan-raw-material'], status: 'missing' },
  {
    id: 'market-study',
    label: 'Justificatif d’exclusivité d’importation (contrat / registre)',
    supports: ['biodigest-exclusivity'],
    status: 'missing',
    note: 'Allégation affichée sur déclaration du laboratoire. Joindre le document dès qu’il est disponible.',
  },
  {
    id: 'regulatory',
    label: 'Documents réglementaires (enregistrement du complément alimentaire)',
    supports: ['biodigest-not-a-drug'],
    status: 'missing',
    note: 'À joindre : décision ou numéro d’enregistrement auprès de l’autorité tunisienne compétente.',
  },
]

/* ---------------------------------------------------------------- timeline */

export interface Milestone {
  year: string
  title: string
  text: string
  kind: 'drug' | 'study' | 'supplement'
  refs: string[]
}

export const TIMELINE: Milestone[] = [
  {
    year: '1994',
    title: 'Première autorisation au Japon',
    text: 'Le polaprezinc, développé par Hamari Chemicals et Zeria, est autorisé comme médicament anti-ulcéreux.',
    kind: 'drug',
    refs: ['li-2021', 'matsukura-2000'],
  },
  {
    year: '1999',
    title: 'Association à la trithérapie',
    text: 'Étude japonaise : ajouté à la trithérapie anti-H. pylori, le polaprezinc augmente le taux d’éradication. Un essai de 2005 ne retrouve pas de gain significatif.',
    kind: 'study',
    refs: ['kashimura-1999', 'isomoto-2005'],
  },
  {
    year: '2007',
    title: 'Publication dans Gut',
    text: 'Chez 10 volontaires sains, le zinc-carnosine limite la hausse de perméabilité intestinale induite par l’indométacine.',
    kind: 'study',
    refs: ['mahmood-2007'],
  },
  {
    year: '2013',
    title: 'Lésions liées à l’aspirine',
    text: 'Essai pilote randomisé (20 patients sous aspirine à faible dose) : diminution des lésions de l’intestin grêle en vidéocapsule.',
    kind: 'study',
    refs: ['watari-2013'],
  },
  {
    year: '2017',
    title: 'Essai multicentrique randomisé',
    text: '303 patients en Chine : éradication de H. pylori de 81 % et 83 % avec polaprezinc contre 61 % sans (per protocole).',
    kind: 'study',
    refs: ['tan-2017'],
  },
  {
    year: '2020',
    title: 'Corée du Sud',
    text: 'Plusieurs spécialités à base de polaprezinc 75 mg autorisées et répertoriées par l’autorité sanitaire coréenne.',
    kind: 'drug',
    refs: ['mfds-korea-2020'],
  },
  {
    year: '2022',
    title: 'Méta-analyse',
    text: '3 essais randomisés, 396 participants : meilleur taux d’éradication avec le polaprezinc ; preuves jugées encore limitées.',
    kind: 'study',
    refs: ['mahmoud-2022'],
  },
  {
    year: 'BioDigest',
    title: 'En Tunisie',
    text: 'Valorisation nutritionnelle du zinc L-carnosine sous forme de complément alimentaire.',
    kind: 'supplement',
    refs: [],
  },
]

export const KIND_LABEL: Record<Milestone['kind'], string> = {
  drug: 'Médicament (polaprezinc)',
  study: 'Étude clinique (polaprezinc)',
  supplement: 'Complément alimentaire',
}

/* ---------------------------------------------------------------- five scientific axes */

export interface Axis {
  id: string
  title: string
  summary: string
  evidence: string
  level: string
  refs: string[]
  /** Mechanism stage illustrating the axis */
  stage: string
  caveat?: string
}

export const AXES: Axis[] = [
  {
    id: 'protection',
    title: 'Protection de la muqueuse',
    summary: 'Cytoprotection, action antioxydante et soutien de la réparation épithéliale.',
    evidence: 'Études expérimentales et cliniques sur le polaprezinc ; protéines de choc thermique, effets antioxydants et anti-apoptotiques décrits.',
    level: 'mécanistique',
    refs: ['li-2021', 'hewlings-2020', 'mahmood-2007'],
    stage: 'cytoprotection',
  },
  {
    id: 'physiology',
    title: 'Respect de la physiologie gastrique',
    summary: 'Une action cytoprotectrice, et non antisécrétoire comme celle des IPP.',
    evidence: 'Le zinc L-carnosine ne bloque pas la pompe à protons ; il n’est pas un substitut aux IPP.',
    level: 'usage',
    refs: ['efthymakis-2022'],
    stage: 'physiology',
    caveat: 'BioDigest ne remplace pas un IPP ni un traitement prescrit.',
  },
  {
    id: 'hpylori',
    title: 'Prise en charge de H. pylori',
    summary: 'En complément de la trithérapie, dans des essais menés avec le polaprezinc médicament.',
    evidence: 'Essai multicentrique (Tan 2017) et méta-analyse de 3 essais (396 participants) ; un essai de 2005 sans gain significatif.',
    level: 'clinique',
    refs: ['tan-2017', 'mahmoud-2022', 'isomoto-2005'],
    stage: 'hpylori',
    caveat: 'Résultats obtenus avec le polaprezinc, pas avec BioDigest.',
  },
  {
    id: 'drugs',
    title: 'Agressions médicamenteuses',
    summary: 'Certaines lésions digestives associées aux AINS et à l’aspirine.',
    evidence: 'Indométacine chez 10 volontaires (Mahmood 2007) ; aspirine à faible dose, essai pilote de 20 patients (Watari 2013).',
    level: 'clinique',
    refs: ['mahmood-2007', 'watari-2013'],
    stage: 'drugs',
    caveat: 'Pas de donnée spécifique pour les antibiotiques ou la metformine.',
  },
  {
    id: 'barrier',
    title: 'Barrière intestinale et microbiote',
    summary: 'Cellules épithéliales, jonctions serrées et perméabilité ; le microbiote reste un champ exploratoire.',
    evidence: 'Perméabilité : données cliniques (Mahmood 2007). Microbiote : recherches surtout précliniques.',
    level: 'mécanistique',
    refs: ['mahmood-2007', 'scarpellini-2022'],
    stage: 'microbiota',
    caveat: 'Aucune étude ne montre une restauration du microbiote en moins de deux semaines.',
  },
]

/* ---------------------------------------------------------------- why choose / synthesis */

export const WHY = [
  { id: 'molecule', title: 'Innovation moléculaire', text: 'Un complexe zinc / L-carnosine 1:1 de nature polymérique, différent d’un sel de zinc.', refs: ['matsukura-2000'] },
  { id: 'japan', title: 'Origine japonaise', text: 'Un actif développé au Japon par Hamari Chemicals et Zeria.', refs: ['li-2021'] },
  { id: 'history', title: 'Historique pharmaceutique', text: 'Polaprezinc autorisé au Japon depuis 1994, puis en Corée du Sud.', refs: ['li-2021', 'mfds-korea-2020'] },
  { id: 'tunisia', title: 'Seul importateur en Tunisie', text: '', refs: [] },
  { id: 'docs', title: 'Documentation scientifique', text: 'Revues, essais randomisés et méta-analyse publiés à l’international.', refs: ['mahmoud-2022', 'tan-2017'] },
  { id: 'mucosa', title: 'Approche ciblée sur la muqueuse', text: 'Une action locale étudiée sur les zones lésées, sans effet antisécrétoire.', refs: ['matsukura-2000'] },
]

export const SYNTHESIS_ARGS = [
  'Innovation japonaise',
  'Zinc L-carnosine',
  'Historique pharmaceutique depuis 1994',
  'Approche cytoprotectrice',
  'Documentation scientifique internationale',
  'Différenciation tunisienne',
]

export const BIBLIOGRAPHY = ['li-2021', 'matsukura-2000', 'mahmood-2007', 'watari-2013', 'tan-2017', 'mahmoud-2022', 'kashimura-1999', 'isomoto-2005', 'mfds-korea-2020', 'efthymakis-2022', 'hewlings-2020', 'efsa-zinc-carnosine-2022']

/* ---------------------------------------------------------------- condensed visit (3 slides) */

export type AnatomyZone = 'stomach' | 'intestine'

export interface FunctionCard {
  id: string
  lines: [string, string]
  anatomy: AnatomyZone
  scene: string
  lead: string
  claims: string[]
  caveat?: string
}

export const FUNCTION_CARDS: FunctionCard[] = [
  {
    id: 'affinity',
    lines: ['Cible la muqueuse', 'abîmée'],
    anatomy: 'stomach',
    scene: 'alteration',
    lead: 'Une action locale sur la muqueuse altérée est décrite : le complexe interagit avec la zone lésée, où il exerce son effet protecteur.',
    claims: ['znc-local', 'znc-stability'],
    caveat: 'Données principalement expérimentales. Aucune étude n’a été menée sur BioDigest lui-même.',
  },
  {
    id: 'cytoprotection',
    lines: ['Protège', 'les cellules'],
    anatomy: 'stomach',
    scene: 'cytoprotection',
    lead: 'Effets cytoprotecteurs étudiés : action antioxydante, stabilisation des membranes et modulation de l’inflammation locale.',
    claims: ['znc-cytoprotection'],
  },
  {
    id: 'antioxidant',
    lines: ['Action', 'antioxydante'],
    anatomy: 'stomach',
    scene: 'cytoprotection',
    lead: 'Le zinc contribue à protéger les cellules contre le stress oxydatif (allégation de santé autorisée, Règl. UE 432/2012).',
    claims: ['zinc-oxidative', 'znc-cytoprotection'],
  },
  {
    id: 'repair',
    lines: ['Soutient', 'la réparation'],
    anatomy: 'stomach',
    scene: 'repair',
    lead: 'In vitro, le zinc-carnosine stimule la migration et la prolifération des cellules épithéliales.',
    claims: ['znc-repair'],
    caveat: 'Illustration pédagogique à partir de données in vitro — pas une démonstration clinique sur BioDigest.',
  },
  {
    id: 'physiology',
    lines: ['Respecte', 'l’acidité gastrique'],
    anatomy: 'stomach',
    scene: 'physiology',
    lead: 'Le zinc-L-carnosine n’inhibe pas la pompe à protons : la sécrétion acide est conservée.',
    claims: ['znc-not-antisecretory'],
    caveat: 'BioDigest ne remplace pas un IPP ni un traitement prescrit.',
  },
  {
    id: 'barrier',
    lines: ['Barrière', 'intestinale'],
    anatomy: 'intestine',
    scene: 'microbiota',
    lead: 'Le zinc participe à l’intégrité de la barrière intestinale. Les liens avec le microbiote restent un champ exploratoire.',
    claims: ['znc-indomethacin', 'zinc-microbiota'],
    caveat: 'Aucune étude ne montre une restauration du microbiote en moins de deux semaines.',
  },
]

export interface MucosaCard {
  id: string
  title: string
  summary: string
  scene: string
  claims: string[]
  refs: string[]
  caveat: string
  level: string
  figure: { value: string; label: string }
}

export const MUCOSA_CARDS: MucosaCard[] = [
  {
    id: 'hpylori',
    title: 'En complément de certains traitements anti-H. pylori',
    summary: 'Ajouté à la trithérapie, le polaprezinc a amélioré le taux d’éradication dans plusieurs essais.',
    figure: { value: '83 % vs 61 %', label: 'Éradication per protocole · Tan 2017, 303 patients' },
    scene: 'hpylori',
    claims: ['znc-hpylori', 'znc-hpylori-tan', 'znc-hpylori-negative'],
    refs: ['tan-2017', 'mahmoud-2022', 'isomoto-2005'],
    caveat: 'Résultats obtenus avec le polaprezinc médicament, pas avec BioDigest.',
    level: 'clinique',
  },
  {
    id: 'nsaids',
    title: 'Lésions digestives associées aux AINS',
    summary: 'Indométacine chez des volontaires sains (Gut, 2007) ; essai pilote sous aspirine à faible dose (2013).',
    figure: { value: '2 essais', label: 'Mahmood 2007 (n = 10) · Watari 2013 (n = 20)' },
    scene: 'drugs',
    claims: ['znc-indomethacin', 'znc-aspirin'],
    refs: ['mahmood-2007', 'watari-2013'],
    caveat: 'Pas de donnée spécifique pour les antibiotiques ou la metformine.',
    level: 'clinique',
  },
]

/** Limits shown next to the clinical cards (each one already documented in evidence.ts). */
export const DATA_LIMITS = [
  'Études menées avec le polaprezinc / zinc L-carnosine, aucune avec BioDigest lui-même.',
  'Méta-analyse 2022 : 3 essais, 396 participants ; un essai japonais (2005) sans gain significatif.',
  'Pas de donnée pour les antibiotiques ni la metformine.',
  'Microbiote et barrière intestinale : recherche surtout préclinique.',
]
