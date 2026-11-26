import { claimText } from './commercialClaims'
import type { PresentationMode } from './modes'

/**
 * « Argumentaire terrain » — field sales kit for medical representatives (internal tool, not shown to physicians).
 * Every statement relies on a validated claim (data/evidence.ts, data/commercialClaims.ts) or on the product file.
 * Distinguish ingredient-level evidence from product-specific evidence: no study exists on the finished products.
 */

export type KitSectionId = 'points' | 'differentiation' | 'faq' | 'objections' | 'references' | 'pitch30' | 'pitch2' | 'summary' | 'proofs'

export const KIT_SECTIONS: { id: KitSectionId; label: string }[] = [
  { id: 'points', label: 'Points clés' },
  { id: 'differentiation', label: 'Différenciation' },
  { id: 'faq', label: 'Questions des médecins' },
  { id: 'objections', label: 'Objections' },
  { id: 'pitch30', label: 'Pitch 30 secondes' },
  { id: 'pitch2', label: 'Pitch 2 minutes' },
  { id: 'summary', label: 'Résumé produit' },
  { id: 'references', label: 'Références' },
  { id: 'proofs', label: 'Justificatifs' },
]

/** Sections shown first / only, per mode */
export const KIT_SECTIONS_BY_MODE: Record<PresentationMode, KitSectionId[]> = {
  express: ['pitch30', 'points', 'summary', 'objections'],
  commercial: ['points', 'differentiation', 'objections', 'pitch30', 'pitch2', 'summary', 'proofs'],
  scientifique: ['points', 'faq', 'references', 'pitch2', 'differentiation', 'objections', 'summary', 'pitch30', 'proofs'],
}

export interface SalesKit {
  product: 'bio3mag' | 'biodigest'
  name: string
  points: string[]
  differentiation: string[]
  faq: { q: string; a: string }[]
  objections: { objection: string; answer: string }[]
  references: string[]
  pitch30: string
  pitch2: string[]
  summary: { label: string; value: string }[]
}

export const salesKits: SalesKit[] = [
  {
    product: 'bio3mag',
    name: 'Bio3Mag',
    points: [
      'Trois formes organiques de magnésium dans une même gélule : malate, citrate et bisglycinate.',
      '75 mg de magnésium élément par gélule, soit 150 mg par jour à la posologie de 2 gélules (40 % des VNR).',
      'Le magnésium contribue à réduire la fatigue, au métabolisme énergétique, à la fonction musculaire et au fonctionnement du système nerveux (allégations autorisées).',
      'Le citrate est la forme organique la plus étudiée ; le bisglycinate est une forme chélatée.',
      'Pas d’oxyde de magnésium dans la formule.',
      'Le magnésium est cofacteur de plus de 300 systèmes enzymatiques (NIH ODS).',
    ],
    differentiation: [
      'Une association de trois sels organiques, là où la plupart des produits apportent une seule forme.',
      'Trois ligands différents (malate, citrate, glycine) dans une même formule.',
      claimText('bio3mag-slogan') ?? '',
      'À dire avec précision : aucune étude n’a comparé Bio3Mag à un autre produit ; l’intérêt repose sur les données de chaque forme.',
    ].filter(Boolean),
    faq: [
      {
        q: 'Pourquoi trois formes plutôt qu’une ?',
        a: 'Pour associer dans une même formule trois sels organiques aux ligands différents. Chaque forme libère le même ion Mg²⁺ ; aucune supériorité clinique de l’association n’est revendiquée.',
      },
      {
        q: 'Est-il mieux absorbé que les autres magnésiums ?',
        a: 'Il n’existe pas d’étude sur Bio3Mag lui-même. Dans des études comparatives, le citrate et le bisglycinate ont été mieux absorbés que l’oxyde de magnésium (Walker 2003, Lindberg 1990, Schuette 1994). Les résultats varient selon les études (Schuchardt 2017).',
      },
      { q: 'Quelle posologie ?', a: '2 gélules par jour, le soir au coucher.' },
      {
        q: 'Contre-indications et précautions ?',
        a: 'Contre-indiqué en cas d’insuffisance rénale sévère ou d’hypersensibilité. Insuffisance rénale modérée, grossesse et allaitement : avis médical préalable.',
      },
      {
        q: 'Interactions ?',
        a: 'Espacer de 2 heures la prise de tétracyclines, fluoroquinolones, bisphosphonates ou lévothyroxine.',
      },
      { q: 'Effets indésirables ?', a: 'Selles molles possibles à forte dose : réduire la posologie.' },
    ],
    objections: [
      {
        objection: '« Le magnésium, c’est tous pareil. »',
        answer: 'Les formes ne se valent pas : l’oxyde de magnésium a été moins bien absorbé que les formes organiques dans plusieurs études. Bio3Mag n’associe que des formes organiques, dont le citrate, la plus documentée.',
      },
      {
        objection: '« Mon patient prend déjà un magnésium à bas prix. »',
        answer: 'Vérifier la forme et la dose de magnésium élément du produit actuel. Bio3Mag apporte 150 mg/jour de magnésium élément sous trois formes organiques, sans oxyde.',
      },
      {
        objection: '« Y a-t-il des études sur Bio3Mag ? »',
        answer: 'Non : les données portent sur le magnésium et sur chacune des formes. Le dire clairement renforce la crédibilité.',
      },
      {
        objection: '« Pourquoi le soir ? »',
        answer: 'C’est la posologie recommandée par le laboratoire. Elle n’est pas associée à une allégation sur le sommeil.',
      },
    ],
    references: ['eu-432-2012', 'efsa-magnesium-2010', 'debaaij-2015', 'walker-2003', 'lindberg-1990', 'firoz-2001', 'schuette-1994', 'schuchardt-2017'],
    pitch30:
      'Bio3Mag associe trois formes organiques de magnésium — malate, citrate et bisglycinate — dans une même gélule, sans oxyde. À 2 gélules le soir, il apporte 150 mg de magnésium élément, soit 40 % des apports de référence. Le magnésium contribue à réduire la fatigue et au bon fonctionnement musculaire et nerveux.',
    pitch2: [
      'Docteur, la fatigue et les crampes font partie des plaintes fréquentes en consultation, et le magnésium est souvent proposé. Mais toutes les formes de magnésium ne se valent pas : dans plusieurs études, l’oxyde de magnésium a été moins bien absorbé que les formes organiques.',
      'Bio3Mag a été formulé avec trois formes organiques. Le citrate est la forme la plus étudiée : il s’est montré plus soluble et mieux absorbé que l’oxyde. Le bisglycinate est un chélate, lié à la glycine, généralement décrit comme bien toléré. Le malate apporte un ligand qui intervient dans le métabolisme énergétique.',
      'Chaque gélule apporte 75 mg de magnésium élément ; à la posologie de 2 gélules le soir, cela représente 150 mg par jour, soit 40 % des valeurs nutritionnelles de référence. Le magnésium contribue à réduire la fatigue, au métabolisme énergétique et au fonctionnement normal des muscles et du système nerveux.',
      'Précautions : contre-indiqué en cas d’insuffisance rénale sévère ; espacer de 2 heures la prise de certains médicaments comme les tétracyclines, les fluoroquinolones ou la lévothyroxine. Il n’existe pas d’étude sur le produit fini : l’intérêt repose sur les données de chacune des formes.',
    ],
    summary: [
      { label: 'Composition', value: 'Malate 150 mg · Citrate 200 mg · Bisglycinate 150 mg par gélule' },
      { label: 'Magnésium élément', value: '75 mg/gélule — 150 mg/jour (40 % VNR)' },
      { label: 'Posologie', value: '2 gélules par jour, le soir' },
      { label: 'Conditionnement', value: 'Boîte de 30 gélules' },
      { label: 'Contre-indications', value: 'Insuffisance rénale sévère, hypersensibilité' },
      { label: 'Statut', value: 'Complément alimentaire' },
    ],
  },
  {
    product: 'biodigest',
    name: 'BioDigest',
    points: [
      '66 mg de zinc-L-carnosine par gélule : un complexe de zinc et de L-carnosine.',
      'Mécanismes étudiés : action locale sur la muqueuse lésée, cytoprotection et soutien de la réparation épithéliale (études surtout expérimentales).',
      'Pas d’effet antisécrétoire : la sécrétion acide est conservée.',
      'Documentation internationale : le polaprezinc est autorisé comme médicament au Japon depuis 1994, puis en Corée du Sud ; la sécurité du zinc L-carnosine a été évaluée par l’EFSA en 2022.',
      'Complément alimentaire : il ne remplace pas un traitement gastrique prescrit.',
    ],
    differentiation: [
      claimText('biodigest-exclusivity') ?? '',
      'Le zinc est apporté sous forme de complexe avec la L-carnosine, et non sous forme de sel de zinc classique.',
      'Formulé par un laboratoire tunisien basé à Monastir.',
      claimText('biodigest-japan-raw-material') ?? '',
      claimText('biodigest-availability') ?? '',
    ].filter(Boolean),
    faq: [
      {
        q: 'Peut-on l’utiliser avec un IPP ?',
        a: 'Le zinc-L-carnosine n’agit pas sur la sécrétion acide et ne remplace pas un IPP. Aucune interaction avec les IPP ne figure dans les précautions du produit ; l’association relève de l’appréciation du médecin.',
      },
      {
        q: 'Quelles données cliniques ?',
        a: 'Des données sur le polaprezinc, pas sur BioDigest : perméabilité intestinale sous indométacine chez 10 volontaires (Mahmood 2007), lésions liées à l’aspirine chez 20 patients (Watari 2013), essai multicentrique H. pylori sur 303 patients (Tan 2017) et méta-analyse de 3 essais, 396 participants, aux preuves encore limitées (Mahmoud 2022).',
      },
      { q: 'Quelle posologie ?', a: '1 à 2 gélules par jour, au cours d’un repas.' },
      {
        q: 'Interactions ?',
        a: 'Espacer de 2 heures la prise de quinolones, de tétracyclines ou de fer. Tenir compte de l’apport total en zinc (limite supérieure de sécurité de l’EFSA : 25 mg/jour chez l’adulte).',
      },
      { q: 'Grossesse et allaitement ?', a: 'Avis médical préalable.' },
      {
        q: 'Quand orienter vers un médecin ?',
        a: 'Saignement digestif, amaigrissement ou difficulté à avaler : consultation sans délai.',
      },
    ],
    objections: [
      {
        objection: '« Pourquoi pas un simple complément de zinc ? »',
        answer: 'Les études portent sur le complexe zinc-L-carnosine, pas sur les sels de zinc classiques : c’est ce complexe qui a été étudié pour son action locale sur la muqueuse gastrique.',
      },
      {
        objection: '« J’ai déjà un IPP pour mes patients. »',
        answer: 'Le mécanisme est différent : BioDigest n’a pas d’effet antisécrétoire et ne remplace pas l’IPP. Il s’agit d’un complément alimentaire.',
      },
      {
        objection: '« Les preuves sont-elles suffisantes ? »',
        answer: 'Les données sont surtout expérimentales et cliniques sur l’ingrédient, avec un usage médical documenté au Japon. Il n’y a pas d’étude sur BioDigest lui-même.',
      },
      {
        objection: '« Est-ce un médicament ? »',
        answer: 'Non. BioDigest est un complément alimentaire ; il ne revendique pas d’indication thérapeutique.',
      },
    ],
    references: ['li-2021', 'matsukura-2000', 'mahmood-2007', 'watari-2013', 'tan-2017', 'mahmoud-2022', 'kashimura-1999', 'isomoto-2005', 'efthymakis-2022', 'hewlings-2020', 'efsa-zinc-carnosine-2022', 'mfds-korea-2020'],
    pitch30:
      'BioDigest apporte 66 mg de zinc-L-carnosine par gélule, un complexe de zinc et de L-carnosine étudié pour son action locale sur la muqueuse gastrique. Il n’a pas d’effet antisécrétoire et ne remplace pas un traitement prescrit : c’est un complément alimentaire, formulé par un laboratoire tunisien et disponible en pharmacie.',
    pitch2: [
      'Docteur, la muqueuse gastrique est régulièrement fragilisée : acidité, AINS, H. pylori, stress oxydatif. BioDigest a été formulé autour du zinc-L-carnosine, un complexe de zinc et de L-carnosine.',
      'Ce complexe a été étudié pour son action locale sur la muqueuse lésée. Les études décrivent une action antioxydante, une stabilisation des membranes et, in vitro, une stimulation de la migration et de la prolifération des cellules épithéliales. Chez des volontaires sains, il a limité la hausse de perméabilité intestinale induite par l’indométacine.',
      'Sur le plan international, le polaprezinc est utilisé au Japon comme médicament protecteur de la muqueuse, et sa sécurité a été évaluée par l’EFSA en 2022. Une méta-analyse suggère un bénéfice en adjuvant à la trithérapie anti-H. pylori, avec des preuves encore limitées.',
      'BioDigest n’a pas d’effet antisécrétoire et ne remplace ni un IPP ni un traitement prescrit. Posologie : 1 à 2 gélules par jour au cours d’un repas, en tenant compte de l’apport total en zinc.',
    ],
    summary: [
      { label: 'Actif', value: 'Zinc-L-carnosine 66 mg par gélule' },
      { label: 'Posologie', value: '1 à 2 gélules par jour, au cours d’un repas' },
      { label: 'Conditionnement', value: 'Boîte de 30 gélules' },
      { label: 'Contre-indication', value: 'Hypersensibilité au zinc ou à la L-carnosine' },
      { label: 'Vigilance', value: 'Apport total en zinc ; saignement, amaigrissement, dysphagie : consulter' },
      { label: 'Statut', value: 'Complément alimentaire — ne remplace pas un traitement prescrit' },
    ],
  },
]
