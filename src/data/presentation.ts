import { products, themeCatalog } from './products'
import { hasMechanism } from './mechanisms'
import { TAKEAWAYS } from './pitch'
import { type PresentationMode } from './modes'
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
  /** Products with an interactive mechanism already cover their indications stage by stage */
  showIndicationsWithMechanism: false,
}

/** Visible copy that only exists to flag missing validation — hidden with the badges. */
export function isValidationPlaceholder(text: string): boolean {
  return /à confirmer|à préciser|à déclarer|to be confirmed|to be specified|attente de validation|pending validation/i.test(text)
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
  | 'illustration'
  | 'indications'
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
  | 'direction-welcome'
  | 'direction-program'
  | 'direction-closing'
  | 'b3m-intro'
  | 'b3m-salts'
  | 'b3m-complement'
  | 'b3m-enzymes'
  | 'b3m-comfort'
  | 'b3m-synthesis'
  | 'bd-intro'
  | 'bd-origin'
  | 'bd-timeline'
  | 'bd-molecule'
  | 'bd-axes'
  | 'bd-why'
  | 'bd-synthesis'
  | 'bd-complex'
  | 'bd-heritage'
  | 'bd-mucosa'
  | 'product-pitch'

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
  /** One-line key message shown in the slide header (« À retenir ») */
  takeaway?: string
}

const S = {
  intro: { fr: 'Introduction', en: 'Introduction' },
  range: { fr: 'Gamme', en: 'Range' },
  end: { fr: 'Conclusion', en: 'Closing' },
}

const SCRIPT: Record<string, { hero: L; composition: L; schema: L; indications: L }> = {
  biodigest: {
    hero: {
      fr: 'Le BioDigest est un complément alimentaire innovant axé sur la santé gastro-intestinale. Sa particularité : le Zinc Carnosine, pour traiter et protéger l’estomac sans altérer ses fonctions naturelles.',
      en: 'BioDigest is an innovative food supplement focused on gastrointestinal health. Its distinctive feature is zinc carnosine, which treats and protects the stomach without altering its natural functions.',
    },
    composition: {
      fr: 'L’innovation, c’est le Zinc Carnosine lévogyre. Contrairement au zinc classique, il n’est pas libéré sous forme libre : il reste complexé, cible directement les zones lésées de la muqueuse gastrique, et assure une action cicatrisante et protectrice prolongée.',
      en: 'The innovation is L-zinc carnosine. Unlike ordinary zinc, it is not released as a free element: it remains complexed, targets damaged gastric mucosa, and provides a prolonged healing and protective action.',
    },
    schema: {
      fr: 'Cinq temps : action ciblée, cicatrisation des lésions, protection de la muqueuse, respect physiologique, soutien du microbiote. Zinc Carnosine à gauche ; synergie (H. pylori, AINS, ATB, metformine) et microbiote à droite.',
      en: 'Five stages: targeted action, lesion healing, mucosal protection, physiological respect, microbiota support. Zinc carnosine on the left; synergy (H. pylori, NSAIDs, antibiotics, metformin) and microbiota on the right.',
    },
    indications: {
      fr: 'Cicatrisation et ulcères — AMM au Japon et en Corée du Sud. Respect de la physiologie : n’inhibe pas les sécrétions, contrairement aux IPP, y compris en hypochlorhydrie. Synergie avec la trithérapie anti-H. pylori, les AINS, les antibiotiques et la metformine. Microbiote : amélioration observée en moins de deux semaines.',
      en: 'Healing and ulcers — MA in Japan and South Korea. Physiological respect: does not inhibit secretions, unlike PPIs, including in hypochlorhydria. Synergy with anti-H. pylori triple therapy, NSAIDs, antibiotics and metformin. Microbiota: improvement observed in under two weeks.',
    },
  },
  bio3mag: {
    hero: {
      fr: 'Bio3Mag est un cocktail ultra-complet, orienté énergie, performance et récupération. Trois formes hautement biodisponibles — malate, citrate et bisglycinate — pour un mode de vie actif et sportif.',
      en: 'Bio3Mag is an all-round cocktail aimed at energy, performance and recovery. Three highly bioavailable forms — malate, citrate and bisglycinate — for an active, sporty lifestyle.',
    },
    composition: {
      fr: 'Le duo malate + citrate s’occupe de l’énergie et des muscles : le malate alimente les mitochondries, le citrate soutient la fonction neuromusculaire. Le bisglycinate détend le système nerveux, favorise le sommeil et tamponne le digestif.',
      en: 'The malate + citrate duo covers energy and muscles: malate fuels the mitochondria, citrate supports neuromuscular function. Bisglycinate relaxes the nervous system, supports sleep and buffers digestion.',
    },
    schema: {
      fr: 'Cinq temps : assimilation optimisée, énergie cellulaire, contraction musculaire, détente nerveuse, performance et récupération. Malate à gauche, citrate en bas, bisglycinate à droite, synergie Bio3Mag en bas à droite.',
      en: 'Five stages: optimised assimilation, cellular energy, muscle contraction, nervous relaxation, performance and recovery. Malate on the left, citrate below, bisglycinate on the right, Bio3Mag synergy lower right.',
    },
    indications: {
      fr: 'Formule qualitative pour un mode de vie actif et sportif. Elle coche toutes les cases : contraction musculaire et énergie (citrate + malate) et récupération nerveuse et musculaire en profondeur (bisglycinate). Absorption élevée, sans agresser le système digestif.',
      en: 'A high-quality formula for an active, sporty lifestyle. It covers muscle contraction and energy (citrate + malate) and deep nervous and muscular recovery (bisglycinate). High absorption, without stressing the digestive system.',
    },
  },
}

function productSlides(p: Product, mode: PresentationMode = 'scientifique'): SlideDef[] {
  const section: L = { fr: p.name, en: p.name }
  const script = SCRIPT[p.id]
  const base = (kind: SlideKind, title: L, steps = 1, notes?: L): SlideDef => ({
    id: `${p.slug}-${kind}`,
    kind,
    productSlug: p.slug,
    steps,
    section,
    title,
    notes,
    takeaway: TAKEAWAYS[kind],
  })
  const composition = base('composition', { fr: 'Composition', en: 'Composition' }, 1, script?.composition ?? {
    fr: 'Rappeler la base de calcul de chaque quantité, et signaler les valeurs en attente de validation.',
    en: 'State the basis of each amount, and point out values pending validation.',
  })
  // Mécanismes d’action — commenté pour l’instant (infographies conservées dans le codebase).
  // const schema = base(
  //   'illustration',
  //   script ? { fr: 'Mécanismes d’action', en: 'Mechanisms of action' } : { fr: 'Mode d’action', en: 'How it works' },
  //   hasMechanism(p.id) ? stagesFor(p.id, mechanismModeFor(mode)).length : 1,
  //   script?.schema,
  // )
  const indications = base(
    'indications',
    { fr: 'Indications thérapeutiques', en: 'Therapeutic indications' },
    1,
    script?.indications,
  )
  const posology = base('practical', { fr: 'Posologie', en: 'Dosage' })
  const refs = presentationConfig.showReferences
    ? [base('references', { fr: 'Références', en: 'References' })]
    : []

  // Therapeutic presentation: composition, illustrative schema, indications, dosage. Mechanism, science and
  // formulation slides are kept in the codebase but no longer part of the deck.
  const hero =
    p.story === 'coq10'
      ? base('q10-reveal', { fr: 'Nouvelle Coenzyme Q10', en: 'New Coenzyme Q10' }, 1, {
          fr: 'Lancement de BioQ10+.',
          en: 'BioQ10+ launch.',
        })
      : base('product-hero', { fr: p.name, en: p.name }, 1, script?.hero)

  const withIndications = !hasMechanism(p.id) || presentationConfig.showIndicationsWithMechanism

  // Commercial & scientific argumentation layer (see data/commercialClaims.ts)
  if (p.id === 'bio3mag') {
    // Storyline A → F (data/bio3magStory.ts). The interactive anatomical mechanism stays in scientific mode.
    const s = (kind: SlideKind, fr: string, notes: string) => base(kind, { fr, en: fr }, 1, { fr: notes, en: notes })
    const intro = s(
      'b3m-intro',
      'Bio3Mag',
      'Diapositive de séparation : passer à Bio3Mag. Montrer la boîte, les trois formes, puis enchaîner sur le détail.',
    )
    const salts = s(
      'b3m-salts',
      'Trois formes de magnésium',
      'Cliquer sur chaque carte. Distinguer ce qui est propre au sel (ligand, chélation, données d’absorption) de ce qui est une fonction du magnésium.',
    )
    const complement = s(
      'b3m-complement',
      'Complémentarité',
      'Malate + citrate : énergie et muscle ; bisglycinate : nerveux et confort digestif. Complémentarité de formulation, pas de synergie démontrée.',
    )
    const enzymes = s('b3m-enzymes', 'Plus de 300 systèmes enzymatiques', 'Fonctions générales du magnésium, communes aux trois sels (NIH ODS).')
    const comfort = s(
      'b3m-comfort',
      'Biodisponibilité et confort digestif',
      'Pas de pourcentage d’absorption. Le bisglycinate ne neutralise pas l’effet des autres sels. Magnésium marin = origine, pas une forme.',
    )
    const synthesis = s('b3m-synthesis', 'Synthèse scientifique', 'Trois sels, un même ion Mg²⁺ ; six fonctions autorisées du magnésium (Règl. UE 432/2012). Aucun sel n’agit exclusivement sur un organe.')
    const pitch = s(
      'product-pitch',
      'Bio3Mag en pratique',
      'Arguments, composition, indications, posologie et contre-indications sur une seule diapositive. Précautions par le bouton.',
    )
    // Posology, contraindications and precautions now sit on the commercial synthesis (no separate dosage slide).
    // Condensed: intro (chapter break) + salts + synthesis + pitch.
    // Complementarity, enzymes and comfort slides stay in the codebase (unused).
    void complement
    void enzymes
    void comfort
    const byMode: Record<PresentationMode, SlideDef[]> = {
      scientifique: [intro, salts, synthesis, pitch],
      commercial: [intro, salts, synthesis, pitch],
      express: [intro, salts, pitch],
    }
    return [...byMode[mode], ...refs]
  }
  if (p.id === 'biodigest') {
    // Visit médicale condensée : 3 diapos. Polaprezinc = médicament (Japon, Corée) ; BioDigest = complément alimentaire.
    const s = (kind: SlideKind, fr: string, notes: string) => base(kind, { fr, en: fr }, 1, { fr: notes, en: notes })
    const complex = s(
      'bd-complex',
      'Mécanismes de protection',
      'Cliquer chaque carte. Distinguer mécanismes du complexe (polaprezinc / zinc L-carnosine) et statut de BioDigest, complément alimentaire.',
    )
    const heritage = s(
      'bd-heritage',
      'Zinc Carnosine',
      'Ouvrir sur la molécule : complexe zinc / L-carnosine, distinct d’un zinc classique. Souligner que Nutriome Labs est le seul laboratoire en Tunisie à importer cette molécule. Intérêt étudié sur la muqueuse, sans effet antisécrétoire.',
    )
    // const mucosa = s(
    //   'bd-mucosa',
    //   'Données cliniques',
    //   'Deux cartes cliniques : H. pylori et AINS (les mécanismes sont sur la diapositive précédente). Composition, précautions et bibliographie en bas. Rappeler les limites des données.',
    // )
    const pitch = s(
      'product-pitch',
      'BioDigest en pratique',
      'Arguments, exclusivité, composition, indications, posologie et contre-indications sur une seule diapositive.',
    )
    // Commercial hook first (heritage), then mechanism, then commercial synthesis.
    const byMode: Record<PresentationMode, SlideDef[]> = {
      scientifique: [heritage, complex, /* mucosa, */ pitch],
      commercial: [heritage, complex, /* mucosa, */ pitch],
      express: [heritage, pitch],
    }
    return byMode[mode]
  }
  return [hero, composition, /* schema, */ ...(withIndications ? [indications] : []), posology, ...refs]
}

export function buildDeck(onlySlug?: string, mode: PresentationMode = 'scientifique'): SlideDef[] {
  if (onlySlug) {
    const p = products.find((x) => x.slug === onlySlug)
    return p ? productSlides(p, mode) : []
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
    // « À propos » removed to keep the deck short: the opening slide already introduces Nutriome Labs.
    ...(mode === 'express' ? [] : [{
      id: 'portfolio',
      kind: 'portfolio' as const,
      steps: 1,
      section: S.range,
      title: { fr: 'Notre gamme', en: 'Our range' },
      notes: {
        fr: 'Montrer la gamme complète. Ce soir, on développe seulement les deux formules du thème : BioDigest puis Bio3Mag.',
        en: 'Show the full range. Tonight we only develop the two theme formulas: BioDigest then Bio3Mag.',
      },
    }]),
    ...themeCatalog.flatMap((p) => productSlides(p, mode)),
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
