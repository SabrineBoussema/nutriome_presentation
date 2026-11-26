/**
 * Commercial claims registry — every positioning statement shown in the deck or the sales kit.
 *
 * A claim is displayed only when `status === 'validated'`. Otherwise its `fallback` is displayed (or nothing).
 * To activate a claim: attach the supporting document in `source`, set `status: 'validated'` and `verifiedOn`.
 * Never mark a claim validated without a document (market study, registry extract, invoice, regulatory file…).
 */

export type CommercialClaimStatus = 'validated' | 'pending'

export interface CommercialClaim {
  id: string
  product: 'bio3mag' | 'biodigest' | 'nutriome'
  kind: 'exclusivity' | 'positioning' | 'slogan' | 'distribution' | 'pricing' | 'manufacturing'
  text: string
  /** Shown while the claim is not validated (must itself be uncontroversial) */
  fallback?: string
  /** Document or reference proving the claim */
  source: string
  status: CommercialClaimStatus
  /** ISO date of the last verification */
  verifiedOn: string | null
  note?: string
}

const claims: CommercialClaim[] = [
  {
    id: 'biodigest-exclusivity',
    product: 'biodigest',
    kind: 'exclusivity',
    text: 'Nutriome Labs est le seul laboratoire en Tunisie à importer cette molécule de zinc carnosine.',
    fallback: 'Une formulation différenciante à base de zinc L-carnosine sur le marché tunisien.',
    source: 'Positionnement Nutriome Labs — exclusivité d’importation déclarée par le laboratoire.',
    status: 'validated',
    verifiedOn: '2026-11-26',
    note: 'Allégation d’exclusivité d’importation, distincte du statut médicament du polaprezinc. Joindre le justificatif (contrat / registre) dès qu’il est disponible.',
  },
  {
    id: 'biodigest-japan-raw-material',
    product: 'biodigest',
    kind: 'manufacturing',
    text: 'Matière première importée du Japon.',
    fallback: 'Un actif développé au Japon.',
    source: 'À fournir : certificat d’origine et identification du fabricant de la matière première.',
    status: 'pending',
    verifiedOn: null,
    note: 'Le repli « actif développé au Japon » est documenté (Li 2021 : développé par Hamari Chemicals et Zeria).',
  },
  {
    id: 'biodigest-heritage',
    product: 'biodigest',
    kind: 'positioning',
    text: 'Plus de 30 ans de recul pharmaceutique depuis la première autorisation du polaprezinc au Japon (1994).',
    source: 'Li M et al., Exp Ther Med 2021 (PMID 34721687) : « first approved in Japan in 1994 ».',
    status: 'validated',
    verifiedOn: '2026-11-26',
    note: 'Recul sur le polaprezinc médicament, pas sur BioDigest, qui est un complément alimentaire.',
  },
  {
    id: 'biodigest-slogan-final',
    product: 'biodigest',
    kind: 'slogan',
    text: 'BioDigest — Un actif différenciant, une expertise scientifique, une approche ciblée de la santé digestive.',
    source: 'Positionnement Nutriome Labs.',
    status: 'validated',
    verifiedOn: '2026-11-26',
  },
  {
    id: 'biodigest-availability',
    product: 'biodigest',
    kind: 'distribution',
    text: 'Disponible en pharmacie, sur conseil pharmaceutique, via le réseau de distribution pharmaceutique tunisien.',
    fallback: 'Disponible en pharmacie, sur conseil pharmaceutique.',
    source: 'À fournir : liste des grossistes répartiteurs partenaires.',
    status: 'pending',
    verifiedOn: null,
  },
  {
    id: 'nutriome-tunisian-lab',
    product: 'nutriome',
    kind: 'manufacturing',
    text: 'Un laboratoire tunisien basé à Monastir.',
    source: 'Nutriome Labs — informations société (slide « À propos »).',
    status: 'validated',
    verifiedOn: '2026-11-26',
  },
  {
    id: 'biodigest-not-a-drug',
    product: 'biodigest',
    kind: 'positioning',
    text: 'BioDigest est un complément alimentaire : il ne remplace pas un traitement gastrique prescrit (IPP, éradication de H. pylori…).',
    source: 'Statut réglementaire du produit (complément alimentaire).',
    status: 'validated',
    verifiedOn: '2026-11-26',
  },
  {
    id: 'bio3mag-slogan',
    product: 'bio3mag',
    kind: 'slogan',
    text: 'Bien plus qu’un simple magnésium : trois formes soigneusement sélectionnées dans une même formule.',
    source: 'Composition déclarée : malate, citrate et bisglycinate de magnésium.',
    status: 'validated',
    verifiedOn: '2026-11-26',
  },
  {
    id: 'bio3mag-subtitle',
    product: 'bio3mag',
    kind: 'positioning',
    text: 'Trois formes soigneusement sélectionnées pour associer biodisponibilité, confort digestif et complémentarité fonctionnelle.',
    source: 'Logique de formulation du laboratoire ; données par forme dans data/bio3magStory.ts.',
    status: 'validated',
    verifiedOn: '2026-11-26',
    note: 'Formulé comme une intention de sélection, pas comme un résultat démontré sur le produit fini.',
  },
  {
    id: 'bio3mag-slogan-final',
    product: 'bio3mag',
    kind: 'slogan',
    text: 'Bio3Mag — Trois formes, une formulation experte.',
    source: 'Composition déclarée.',
    status: 'validated',
    verifiedOn: '2026-11-26',
  },
  {
    id: 'bio3mag-keyword-recovery',
    product: 'bio3mag',
    kind: 'positioning',
    text: 'Récupération',
    fallback: 'Réduction de la fatigue',
    source: 'À fournir : « récupération » ne figure pas parmi les allégations autorisées pour le magnésium (UE 432/2012).',
    status: 'pending',
    verifiedOn: null,
    note: 'Remplacé par l’allégation autorisée « réduction de la fatigue » tant que non validé.',
  },
  {
    id: 'bio3mag-price',
    product: 'bio3mag',
    kind: 'pricing',
    text: 'Coût par jour',
    source: 'À fournir : prix public conseillé validé.',
    status: 'pending',
    verifiedOn: null,
    note: 'La ligne « Coût par jour » du tableau comparatif reste masquée tant que le prix n’est pas validé.',
  },
]

export const commercialClaims: Record<string, CommercialClaim> = Object.fromEntries(claims.map((c) => [c.id, c]))

/** Text to display for a claim: the claim when validated, otherwise its fallback (or null). */
export function claimText(id: string): string | null {
  const c = commercialClaims[id]
  if (!c) return null
  return c.status === 'validated' ? c.text : (c.fallback ?? null)
}

export const isClaimValidated = (id: string) => commercialClaims[id]?.status === 'validated'

/** Validated daily price per product in TND, or null. Fill only from a validated price list. */
export const validatedDailyCost: Partial<Record<'bio3mag' | 'biodigest', string>> = {}
