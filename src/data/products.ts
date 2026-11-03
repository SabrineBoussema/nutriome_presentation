import type { L, Product } from './types'

import bio3magImg from '../assets/products/bio3mag.jpg'
import bioQ10Img from '../assets/products/bio-q10-plus-30.jpg'
import berberineImg from '../assets/products/bio-berberine-plus.jpg'
import biodigestImg from '../assets/products/biodigest.jpg'
import d3k2Img from '../assets/products/bio-d3k2-plus.jpg'
import grippalImg from '../assets/products/biogrippal.jpg'
import tenseurImg from '../assets/products/biotenseur.jpg'

/*
 * PRODUCT REGISTRY — single source of truth for every product slide.
 *
 * Data source (audit of 3 Nov 2026): product pages of https://www.nutriome.tn,
 * cross-checked against the packaging artwork and the existing Figma deck.
 * Anything that is inconsistent between sources, or not stated anywhere, is
 * marked `status: 'pending'` / listed in `validationNotes` and rendered with a
 * "Contenu en attente de validation" badge. Do not remove those flags until the
 * value has been checked against the final packaging and product specification.
 */

const SITE: L = {
  fr: 'Fiche produit nutriome.tn (audit du 03/11/2026) — à confirmer sur l’emballage final.',
  en: 'nutriome.tn product page (audited 3 Nov 2026) — to be confirmed against final packaging.',
}

/** Mandatory food-supplement label statements (EU Directive 2002/46/EC, art. 6) */
const STANDARD_PRECAUTIONS: L[] = [
  { fr: 'Ne pas dépasser la dose journalière recommandée.', en: 'Do not exceed the recommended daily dose.' },
  {
    fr: 'Un complément alimentaire ne remplace pas une alimentation variée et équilibrée ni un mode de vie sain.',
    en: 'Food supplements are not a substitute for a varied, balanced diet and a healthy lifestyle.',
  },
  { fr: 'Tenir hors de portée des jeunes enfants.', en: 'Keep out of reach of young children.' },
]

const NOT_A_TREATMENT: L = {
  fr: 'Ne se substitue pas à un traitement médical : en cas de pathologie ou de traitement en cours, demander l’avis d’un médecin ou d’un pharmacien.',
  en: 'Not a substitute for medical treatment: in case of illness or ongoing medication, seek the advice of a physician or pharmacist.',
}

export const products: Product[] = [
  // ───────────────────────────────────────────────────────────────── BIO3MAG
  {
    id: 'bio3mag',
    slug: 'bio3mag',
    name: 'Bio3Mag',
    category: { fr: 'Minéraux', en: 'Minerals' },
    tagline: { fr: 'Triple source de magnésium', en: 'Triple source of magnesium' },
    positioning: {
      fr: 'Trois sels organiques de magnésium — bisglycinate, malate et citrate — réunis dans une même gélule.',
      en: 'Three organic magnesium salts — bisglycinate, malate and citrate — combined in a single capsule.',
    },
    description: {
      fr: 'Bisglycinate, malate et citrate de magnésium : une formule à trois formes, déclarées individuellement.',
      en: 'Magnesium bisglycinate, malate and citrate: a three-form formula with each compound declared individually.',
    },
    image: bio3magImg,
    imageAspect: 483 / 370,
    accent: '#1b6fa8',
    accentSoft: '#e3f0f8',
    doseBasis: { fr: 'Pour 1 gélule', en: 'Per capsule' },
    ingredients: [
      {
        name: { fr: 'Bisglycinate de magnésium', en: 'Magnesium bisglycinate' },
        quantity: 150,
        unit: 'mg',
        role: { fr: 'Magnésium chélaté par deux molécules de glycine', en: 'Magnesium chelated by two glycine molecules' },
        detail: { fr: 'Quantité du composé tel que fourni', en: 'Amount of the compound as supplied' },
        status: 'verified',
      },
      {
        name: { fr: 'Malate de magnésium', en: 'Magnesium malate' },
        quantity: 150,
        unit: 'mg',
        role: { fr: 'Sel de magnésium de l’acide malique', en: 'Magnesium salt of malic acid' },
        detail: { fr: 'Quantité du composé tel que fourni', en: 'Amount of the compound as supplied' },
        status: 'verified',
      },
      {
        name: { fr: 'Citrate de magnésium', en: 'Magnesium citrate' },
        quantity: 200,
        unit: 'mg',
        role: { fr: 'Sel de magnésium de l’acide citrique', en: 'Magnesium salt of citric acid' },
        detail: { fr: 'Quantité du composé tel que fourni', en: 'Amount of the compound as supplied' },
        status: 'verified',
      },
      {
        name: { fr: 'Magnésium élément', en: 'Elemental magnesium' },
        role: {
          fr: 'Teneur à déclarer d’après la spécification fournisseur validée',
          en: 'To be declared from the validated supplier specification',
        },
        status: 'pending',
      },
    ],
    excipients: { fr: 'Excipients : à confirmer sur l’emballage final.', en: 'Excipients: to be confirmed on final packaging.' },
    mechanisms: [
      {
        title: { fr: 'Métabolisme énergétique', en: 'Energy-yielding metabolism' },
        body: {
          fr: 'Le magnésium contribue à un métabolisme énergétique normal. L’ATP cellulaire est majoritairement présent sous forme de complexe Mg-ATP, substrat des kinases.',
          en: 'Magnesium contributes to normal energy-yielding metabolism. Cellular ATP exists mainly as a Mg-ATP complex, the substrate of kinases.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'debaaij-2015'],
      },
      {
        title: { fr: 'Fatigue', en: 'Tiredness' },
        body: {
          fr: 'Le magnésium contribue à réduire la fatigue.',
          en: 'Magnesium contributes to the reduction of tiredness and fatigue.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'efsa-magnesium-2010'],
      },
      {
        title: { fr: 'Système nerveux & fonctions psychologiques', en: 'Nervous system & psychological function' },
        body: {
          fr: 'Le magnésium contribue au fonctionnement normal du système nerveux et à des fonctions psychologiques normales.',
          en: 'Magnesium contributes to normal functioning of the nervous system and to normal psychological function.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Fonction musculaire', en: 'Muscle function' },
        body: {
          fr: 'Le magnésium contribue à une fonction musculaire normale et à l’équilibre électrolytique.',
          en: 'Magnesium contributes to normal muscle function and to electrolyte balance.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Synthèse protéique & ossature', en: 'Protein synthesis & bones' },
        body: {
          fr: 'Le magnésium contribue à une synthèse protéique normale, au maintien d’une ossature et d’une dentition normales, et joue un rôle dans la division cellulaire.',
          en: 'Magnesium contributes to normal protein synthesis, to the maintenance of normal bones and teeth, and has a role in cell division.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
    ],
    diagram: 'magnesium-atp',
    differentiators: [
      {
        fr: 'Trois sels organiques de magnésium associés dans une même formule.',
        en: 'Three organic magnesium salts combined in a single formula.',
      },
      {
        fr: 'Chaque composé est déclaré séparément (150 mg / 150 mg / 200 mg par gélule).',
        en: 'Each compound is declared separately (150 mg / 150 mg / 200 mg per capsule).',
      },
      {
        fr: 'Ligands d’origine métabolique : la glycine (acide aminé), le malate et le citrate (intermédiaires du cycle de Krebs).',
        en: 'Ligands of metabolic origin: glycine (an amino acid), malate and citrate (Krebs cycle intermediates).',
      },
      {
        fr: 'Aucune supériorité d’absorption n’est revendiquée en l’absence de données comparatives propres au produit.',
        en: 'No absorption superiority is claimed in the absence of product-specific comparative data.',
      },
    ],
    usage: {
      text: { fr: '2 gélules par jour, le soir au coucher.', en: '2 capsules per day, in the evening at bedtime.' },
      pending: true,
    },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: {
      text: { fr: '30 gélules (emballage) — 60 gélules (site web) : à harmoniser', en: '30 capsules (pack) — 60 capsules (website): to be reconciled' },
      pending: true,
    },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Insuffisance rénale : avis médical préalable (risque d’accumulation du magnésium).',
        en: 'Kidney impairment: seek medical advice first (risk of magnesium accumulation).',
      },
    ],
    hcpNotes: [
      {
        fr: 'Les quantités déclarées (150 / 150 / 200 mg) correspondent aux composés tels que fournis. Leur somme (500 mg) n’est pas la teneur en magnésium élément.',
        en: 'Declared amounts (150 / 150 / 200 mg) refer to the compounds as supplied. Their sum (500 mg) is not the elemental magnesium content.',
      },
      {
        fr: 'Les allégations nutritionnelles du magnésium (Règl. UE 432/2012) s’appliquent à partir de 15 % des VNR, soit 56,25 mg de magnésium élément par jour.',
        en: 'Magnesium health claims (EU Reg. 432/2012) apply from 15% of the NRV, i.e. 56.25 mg of elemental magnesium per day.',
      },
      {
        fr: 'Les sels de magnésium peuvent réduire l’absorption de certains médicaments (tétracyclines, fluoroquinolones, bisphosphonates) : espacer les prises.',
        en: 'Magnesium salts may reduce absorption of some medicines (tetracyclines, fluoroquinolones, bisphosphonates): separate intakes.',
      },
    ],
    references: ['eu-432-2012', 'efsa-magnesium-2010', 'ods-magnesium', 'debaaij-2015'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Magnésium élément : le site indique 70,5 mg / gélule. Valeur non affichée tant que la spécification fournisseur (titre en Mg de chaque sel, forme hydratée) n’est pas validée.',
        en: 'Elemental magnesium: the website states 70.5 mg / capsule. Not displayed until the supplier specification (Mg assay of each salt, hydration form) is validated.',
      },
      {
        fr: 'Conditionnement : 30 gélules sur l’emballage, 60 gélules sur le site.',
        en: 'Pack size: 30 capsules on the pack, 60 capsules on the website.',
      },
      {
        fr: 'Mentions « haute absorption et tolérance » (emballage) et « améliore la qualité du sommeil » (site) : non reprises, faute de justification produit.',
        en: '“High absorption and tolerance” (pack) and “improves sleep quality” (website): not used — no product-specific substantiation.',
      },
      {
        fr: 'Visuel d’emballage en basse résolution (483 px) : fournir un packshot HD.',
        en: 'Low-resolution pack image (483 px): supply an HD packshot.',
      },
    ],
    story: 'bio3mag',
    source: SITE,
  },

  // ─────────────────────────────────────────────────────────────── BIOQ10+
  // Source: BioQ10+ 30-capsule pack (photos supplied 03/11/2026) — "Composition (par une gélule)".
  {
    id: 'bioq10',
    slug: 'coenzyme-q10',
    aliases: ['bioq10', 'bio-q10'],
    name: 'BioQ10+',
    category: { fr: 'Énergie cellulaire', en: 'Cellular energy' },
    tagline: {
      fr: 'Coenzyme Q10 100 mg + 5 vitamines B',
      en: 'Coenzyme Q10 100 mg + 5 B vitamins',
    },
    positioning: {
      fr: 'La nouvelle formule de Nutriome Labs : 100 mg de coenzyme Q10, cinq vitamines du groupe B et de la levure de riz rouge, dans une seule gélule.',
      en: 'Nutriome Labs’ new formula: 100 mg of coenzyme Q10, five B vitamins and red yeast rice, in a single capsule.',
    },
    description: {
      fr: 'Coenzyme Q10 100 mg, vitamines B1, B2, B3, B5, B12, choline et levure de riz rouge — par gélule.',
      en: 'Coenzyme Q10 100 mg, vitamins B1, B2, B3, B5, B12, choline and red yeast rice — per capsule.',
    },
    image: bioQ10Img,
    imageAspect: 1000 / 769,
    accent: '#b8862b',
    accentSoft: '#f6eedb',
    doseBasis: { fr: 'Pour 1 gélule', en: 'Per capsule' },
    ingredients: [
      {
        name: { fr: 'Coenzyme Q10', en: 'Coenzyme Q10' },
        quantity: 100,
        unit: 'mg',
        role: { fr: 'Transporteur d’électrons mitochondrial', en: 'Mitochondrial electron carrier' },
        status: 'verified',
      },
      {
        name: { fr: 'Levure de riz rouge', en: 'Red yeast rice' },
        quantity: 100,
        unit: 'mg',
        detail: { fr: 'Teneur en monacolines à déclarer', en: 'Monacolin content to be declared' },
        role: { fr: 'Source naturelle de monacolines', en: 'Natural source of monacolins' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine B3', en: 'Vitamin B3' },
        quantity: 54,
        unit: 'mg',
        nrvKey: 'B3',
        detail: { fr: 'Forme (nicotinamide ?) à préciser', en: 'Form (nicotinamide?) to be specified' },
        role: { fr: 'Métabolisme énergétique, réduction de la fatigue', en: 'Energy metabolism, reduction of tiredness' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine B5', en: 'Vitamin B5' },
        quantity: 18,
        unit: 'mg',
        nrvKey: 'B5',
        role: { fr: 'Métabolisme énergétique, réduction de la fatigue', en: 'Energy metabolism, reduction of tiredness' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine B2', en: 'Vitamin B2' },
        quantity: 4.8,
        unit: 'mg',
        nrvKey: 'B2',
        role: { fr: 'Protection des cellules contre le stress oxydatif', en: 'Protection of cells from oxidative stress' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine B1', en: 'Vitamin B1' },
        quantity: 4.2,
        unit: 'mg',
        nrvKey: 'B1',
        role: { fr: 'Métabolisme énergétique, fonction cardiaque normale', en: 'Energy metabolism, normal heart function' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine B12', en: 'Vitamin B12' },
        quantity: 0.1,
        unit: 'mg',
        nrvKey: 'B12',
        detail: { fr: 'soit 100 µg', en: 'i.e. 100 µg' },
        role: { fr: 'Métabolisme normal de l’homocystéine', en: 'Normal homocysteine metabolism' },
        status: 'verified',
      },
      {
        name: { fr: 'Choline bitartrate', en: 'Choline bitartrate' },
        quantity: 4.2,
        unit: 'mg',
        role: { fr: 'Source de choline', en: 'Choline source' },
        status: 'verified',
      },
    ],
    excipients: {
      fr: 'Excipients : cellulose, silice colloïdale, stéarate de magnésium.',
      en: 'Excipients: cellulose, colloidal silica, magnesium stearate.',
    },
    mechanisms: [
      {
        title: { fr: 'Chaîne respiratoire', en: 'Respiratory chain' },
        body: {
          fr: 'Dans la membrane mitochondriale interne, la CoQ10 transporte les électrons des complexes I et II vers le complexe III. Ce transfert participe au gradient de protons utilisé par l’ATP synthase.',
          en: 'In the inner mitochondrial membrane, CoQ10 carries electrons from complexes I and II to complex III. This transfer contributes to the proton gradient used by ATP synthase.',
        },
        evidence: 'established-physiology',
        refs: ['rich-2010'],
      },
      {
        title: { fr: 'Antioxydant liposoluble', en: 'Lipid-soluble antioxidant' },
        body: {
          fr: 'Sous sa forme réduite (ubiquinol), la CoQ10 est un antioxydant des membranes et des lipoprotéines.',
          en: 'In its reduced form (ubiquinol), CoQ10 acts as an antioxidant in membranes and lipoproteins.',
        },
        evidence: 'established-physiology',
        refs: ['bentinger-2007'],
      },
      {
        title: { fr: 'Voie du mévalonate', en: 'Mevalonate pathway' },
        body: {
          fr: 'La CoQ10 est synthétisée par la voie du mévalonate, celle qu’inhibent les statines et la monacoline K de la levure de riz rouge. Les données sur la CoQ10 dans les myalgies sous statines restent hétérogènes.',
          en: 'CoQ10 is synthesised via the mevalonate pathway, which is inhibited by statins and by monacolin K from red yeast rice. Data on CoQ10 in statin-associated myalgia remain heterogeneous.',
        },
        evidence: 'human-studies',
        refs: ['marcoff-2007', 'qu-2018'],
      },
      {
        title: { fr: 'Vitamines B & métabolisme', en: 'B vitamins & metabolism' },
        body: {
          fr: 'Les vitamines B1, B2, B3, B5 et B12 contribuent à un métabolisme énergétique normal. B2, B3, B5 et B12 contribuent à réduire la fatigue.',
          en: 'Vitamins B1, B2, B3, B5 and B12 contribute to normal energy-yielding metabolism. B2, B3, B5 and B12 contribute to the reduction of tiredness and fatigue.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Homocystéine', en: 'Homocysteine' },
        body: {
          fr: 'La vitamine B12 contribue au métabolisme normal de l’homocystéine — 100 µg par gélule, soit 4 000 % des VNR.',
          en: 'Vitamin B12 contributes to normal homocysteine metabolism — 100 µg per capsule, i.e. 4,000% of the NRV.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'eu-1169-2011'],
      },
    ],
    diagram: 'electron-transport',
    differentiators: [
      {
        fr: '100 mg de coenzyme Q10 dans une seule gélule.',
        en: '100 mg of coenzyme Q10 in a single capsule.',
      },
      {
        fr: 'Cinq vitamines du groupe B dosées de 300 % à 4 000 % des VNR par gélule.',
        en: 'Five B vitamins at 300% to 4,000% of the NRV per capsule.',
      },
      {
        fr: 'CoQ10, vitamines B et levure de riz rouge réunies : une seule gélule au lieu de plusieurs produits.',
        en: 'CoQ10, B vitamins and red yeast rice together: one capsule instead of several products.',
      },
      {
        fr: 'Fabriqué en Tunisie par Medicka Lab (Beni Khalled, Nabeul).',
        en: 'Manufactured in Tunisia by Medicka Lab (Beni Khalled, Nabeul).',
      },
    ],
    usage: { text: { fr: '1 gélule par jour, au cours d’un repas.', en: '1 capsule per day, with a meal.' } },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: { text: { fr: 'Boîte de 30 gélules', en: 'Box of 30 capsules' } },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Levure de riz rouge : déconseillée pendant la grossesse et l’allaitement, avant 18 ans et après 70 ans, et en cas de traitement hypocholestérolémiant (Règl. UE 2022/860).',
        en: 'Red yeast rice: not recommended during pregnancy or breastfeeding, under 18 or over 70 years of age, or with cholesterol-lowering medication (EU Reg. 2022/860).',
      },
      {
        fr: 'Coenzyme Q10 : peut diminuer l’effet de la warfarine — avis médical en cas de traitement anticoagulant.',
        en: 'Coenzyme Q10 may reduce the effect of warfarin — seek medical advice if on anticoagulants.',
      },
      NOT_A_TREATMENT,
    ],
    hcpNotes: [
      {
        fr: 'La monacoline K est chimiquement identique à la lovastatine. Dans l’UE, l’apport en monacolines doit rester inférieur à 3 mg/jour.',
        en: 'Monacolin K is chemically identical to lovastatin. In the EU, monacolin intake must remain below 3 mg/day.',
      },
      {
        fr: 'Vitamine B3 (54 mg) : la limite supérieure de sécurité est de 900 mg/j pour le nicotinamide, mais de 10 mg/j pour l’acide nicotinique (bouffées vasomotrices). La forme doit être confirmée.',
        en: 'Vitamin B3 (54 mg): the upper safe level is 900 mg/day for nicotinamide but 10 mg/day for nicotinic acid (flushing). The form must be confirmed.',
      },
      {
        fr: 'Les mécanismes présentés relèvent de la biologie générale de la CoQ10. Ils ne constituent pas une démonstration d’efficacité du produit.',
        en: 'The mechanisms shown describe the general biology of CoQ10. They do not demonstrate the efficacy of the product.',
      },
    ],
    references: ['rich-2010', 'bentinger-2007', 'nccih-coq10', 'marcoff-2007', 'qu-2018', 'eu-432-2012', 'eu-1169-2011', 'eu-2022-860'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Composition confirmée par l’emballage 30 gélules (par gélule). Le deck Figma (berbérine, silymarine, CoQ10 200 mg) est obsolète.',
        en: 'Composition confirmed by the 30-capsule pack (per capsule). The Figma deck (berberine, silymarin, CoQ10 200 mg) is obsolete.',
      },
      {
        fr: 'À déclarer : forme de la vitamine B3, forme de la CoQ10 (ubiquinone / ubiquinol) et teneur en monacolines.',
        en: 'To declare: vitamin B3 form, CoQ10 form (ubiquinone / ubiquinol) and monacolin content.',
      },
      {
        fr: 'Mention « fonction hépatique » (emballage) : non reprise — aucune allégation autorisée ne la couvre à ces teneurs (la choline exige 82,5 mg/j).',
        en: '“Liver function” (pack): not used — no authorised claim covers it at these amounts (choline requires 82.5 mg/day).',
      },
    ],
    story: 'coq10',
    packCount: 30,
    manufacturer: { fr: 'Medicka Lab — Beni Khalled, Nabeul', en: 'Medicka Lab — Beni Khalled, Nabeul' },
    source: {
      fr: 'Emballage BioQ10+ 30 gélules — composition par gélule (photos du 03/11/2026).',
      en: 'BioQ10+ 30-capsule pack — composition per capsule (photos of 3 Nov 2026).',
    },
  },

  // ─────────────────────────────────────────────────────────── BIOBERBERINE+
  {
    id: 'bioberberine',
    slug: 'bio-berberine',
    aliases: ['berberine', 'bioberberine'],
    name: 'BioBerberine+',
    category: { fr: 'Métabolisme', en: 'Metabolism' },
    tagline: { fr: 'Glycémie normale & métabolisme glucidique', en: 'Normal blood glucose & carbohydrate metabolism' },
    positioning: {
      fr: 'Berbérine HCl associée au chardon-marie, au zinc et au chrome.',
      en: 'Berberine HCl combined with milk thistle, zinc and chromium.',
    },
    description: {
      fr: 'Berbérine HCl 1 500 mg, chardon-marie, zinc et chrome pour la dose journalière de 4 gélules.',
      en: 'Berberine HCl 1,500 mg, milk thistle, zinc and chromium per daily dose of 4 capsules.',
    },
    image: berberineImg,
    imageAspect: 1164 / 903,
    accent: '#c25b2a',
    accentSoft: '#fbeadf',
    doseBasis: { fr: 'Dose journalière : 4 gélules', en: 'Daily dose: 4 capsules' },
    ingredients: [
      {
        name: { fr: 'Berbérine HCl', en: 'Berberine HCl' },
        quantity: 1500,
        unit: 'mg',
        role: { fr: 'Alcaloïde végétal étudié sur le métabolisme glucidique', en: 'Plant alkaloid studied in glucose metabolism' },
        status: 'verified',
      },
      {
        name: { fr: 'Chardon-marie', en: 'Milk thistle' },
        quantity: 250,
        unit: 'mg',
        detail: { fr: 'dont silymarine 80 % : 200 mg', en: 'of which silymarin 80%: 200 mg' },
        role: { fr: 'Extrait standardisé en silymarine', en: 'Extract standardised in silymarin' },
        status: 'verified',
      },
      {
        name: { fr: 'Zinc bisglycinate', en: 'Zinc bisglycinate' },
        quantity: 17,
        unit: 'mg',
        detail: { fr: 'dont zinc élément : 5 mg', en: 'of which elemental zinc: 5 mg' },
        role: { fr: 'Métabolisme glucidique normal', en: 'Normal carbohydrate metabolism' },
        status: 'verified',
      },
      {
        name: { fr: 'Chrome picolinate', en: 'Chromium picolinate' },
        quantity: 4,
        unit: 'mg',
        detail: { fr: 'dont chrome élément : 0,5 mg', en: 'of which elemental chromium: 0.5 mg' },
        role: { fr: 'Maintien d’une glycémie normale', en: 'Maintenance of normal blood glucose' },
        status: 'verified',
      },
    ],
    excipients: {
      fr: 'Excipients : cellulose, silice colloïdale, stéarate de magnésium.',
      en: 'Excipients: cellulose, colloidal silica, magnesium stearate.',
    },
    mechanisms: [
      {
        title: { fr: 'Chrome', en: 'Chromium' },
        body: {
          fr: 'Le chrome contribue au maintien d’une glycémie normale et au métabolisme normal des macronutriments.',
          en: 'Chromium contributes to the maintenance of normal blood glucose levels and to normal macronutrient metabolism.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Zinc', en: 'Zinc' },
        body: {
          fr: 'Le zinc contribue à un métabolisme glucidique normal et au métabolisme normal des macronutriments.',
          en: 'Zinc contributes to normal carbohydrate metabolism and to normal macronutrient metabolism.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Berbérine & AMPK', en: 'Berberine & AMPK' },
        body: {
          fr: 'En modèles cellulaires et animaux, la berbérine active l’AMPK, un capteur énergétique. Cela favorise la captation du glucose et freine la lipogenèse.',
          en: 'In cellular and animal models, berberine activates AMPK, a cellular energy sensor. This promotes glucose uptake and limits lipogenesis.',
        },
        evidence: 'preclinical',
        refs: ['lee-2006'],
      },
      {
        title: { fr: 'Données humaines', en: 'Human data' },
        body: {
          fr: 'Des méta-analyses d’essais randomisés rapportent des variations de marqueurs glycémiques et lipidiques. Les essais sont hétérogènes, souvent courts, et ne permettent pas de conclure à un effet thérapeutique.',
          en: 'Meta-analyses of randomised trials report changes in glycaemic and lipid markers. The trials are heterogeneous and often short, and do not support conclusions about a therapeutic effect.',
        },
        evidence: 'human-studies',
        refs: ['zhao-2023', 'liu-2025', 'nccih-diabetes'],
      },
    ],
    diagram: 'glucose-ampk',
    differentiators: [
      {
        fr: '1 500 mg de berbérine HCl par dose journalière, répartis en 4 gélules.',
        en: '1,500 mg berberine HCl per daily dose, split across 4 capsules.',
      },
      {
        fr: 'Chardon-marie titré à 80 % de silymarine.',
        en: 'Milk thistle standardised to 80% silymarin.',
      },
      {
        fr: 'Zinc et chrome sous formes organiques (bisglycinate, picolinate), avec la teneur en élément déclarée.',
        en: 'Zinc and chromium in organic forms (bisglycinate, picolinate), with elemental content declared.',
      },
    ],
    usage: { text: { fr: '4 gélules par jour.', en: '4 capsules per day.' } },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: { text: { fr: '60 gélules (emballage / deck Figma) — à confirmer', en: '60 capsules (pack / Figma deck) — to be confirmed' }, pending: true },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Déconseillé pendant la grossesse et l’allaitement.',
        en: 'Not recommended during pregnancy and breastfeeding.',
      },
      {
        fr: 'Traitement antidiabétique ou médicaments à métabolisme hépatique (CYP) : avis médical préalable — risque d’interactions et d’effet additif sur la glycémie.',
        en: 'Glucose-lowering or CYP-metabolised medicines: seek medical advice first — risk of interactions and additive glucose-lowering effect.',
      },
      NOT_A_TREATMENT,
    ],
    hcpNotes: [
      {
        fr: 'Des troubles digestifs (constipation, diarrhée, inconfort) sont les effets indésirables les plus rapportés avec la berbérine.',
        en: 'Gastrointestinal effects (constipation, diarrhoea, discomfort) are the most frequently reported adverse effects of berberine.',
      },
      {
        fr: 'La berbérine n’est pas une alternative à la metformine ni à un traitement antidiabétique.',
        en: 'Berberine is not an alternative to metformin or to glucose-lowering treatment.',
      },
    ],
    references: ['eu-432-2012', 'lee-2006', 'zhao-2023', 'liu-2025', 'nccih-diabetes'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Conditionnement non précisé sur le site (60 gélules selon le deck Figma).',
        en: 'Pack size not stated on the website (60 capsules per the Figma deck).',
      },
      {
        fr: 'Libellés « contrôle du diabète » (emballage) et « soutien de la glycémie dans le diabète » (deck) : allégations relatives à une maladie, non reprises.',
        en: '“Diabetes control” (pack) and “glycaemic support in diabetes” (deck): disease claims, not used.',
      },
    ],
    story: 'standard',
    source: SITE,
  },

  // ─────────────────────────────────────────────────────────────── BIODIGEST
  {
    id: 'biodigest',
    slug: 'biodigest',
    name: 'BioDigest',
    category: { fr: 'Digestion', en: 'Digestion' },
    tagline: { fr: 'Zinc carnosine — confort digestif', en: 'Zinc carnosine — digestive comfort' },
    positioning: {
      fr: 'Une formule mono-actif : 66 mg de zinc-L-carnosine par gélule.',
      en: 'A single-active formula: 66 mg of zinc-L-carnosine per capsule.',
    },
    description: {
      fr: 'Zinc-L-carnosine 66 mg par gélule, un complexe zinc–carnosine étudié pour la muqueuse digestive.',
      en: 'Zinc-L-carnosine 66 mg per capsule, a zinc–carnosine complex studied for the digestive mucosa.',
    },
    image: biodigestImg,
    imageAspect: 305 / 238,
    accent: '#1d5a39',
    accentSoft: '#e6efe7',
    doseBasis: { fr: 'Pour 1 gélule', en: 'Per capsule' },
    ingredients: [
      {
        name: { fr: 'Zinc-L-carnosine', en: 'Zinc-L-carnosine' },
        quantity: 66,
        unit: 'mg',
        detail: { fr: 'Teneur en zinc élément à déclarer', en: 'Elemental zinc content to be declared' },
        role: { fr: 'Complexe de zinc et de L-carnosine (polaprézinc)', en: 'Complex of zinc and L-carnosine (polaprezinc)' },
        status: 'verified',
      },
    ],
    mechanisms: [
      {
        title: { fr: 'Adhésion à la muqueuse', en: 'Mucosal adhesion' },
        body: {
          fr: 'Le complexe zinc–carnosine se dissocie lentement dans l’estomac et adhère à la muqueuse lésée, où il libère localement zinc et carnosine.',
          en: 'The zinc–carnosine complex dissociates slowly in the stomach and adheres to injured mucosa, where it releases zinc and carnosine locally.',
        },
        evidence: 'human-studies',
        refs: ['efthymakis-2022'],
      },
      {
        title: { fr: 'Intégrité de la barrière', en: 'Barrier integrity' },
        body: {
          fr: 'Dans une petite étude humaine, le zinc carnosine a limité l’augmentation de la perméabilité intestinale induite par l’indométacine. Les modèles expérimentaux suggèrent une stimulation de la réparation épithéliale.',
          en: 'In a small human study, zinc carnosine limited the indomethacin-induced rise in gut permeability. Experimental models suggest stimulation of epithelial repair.',
        },
        evidence: 'human-studies',
        refs: ['mahmood-2007'],
      },
      {
        title: { fr: 'Zinc', en: 'Zinc' },
        body: {
          fr: 'Le zinc contribue à protéger les cellules contre le stress oxydatif et joue un rôle dans la division cellulaire.',
          en: 'Zinc contributes to the protection of cells from oxidative stress and has a role in cell division.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'ods-zinc'],
      },
    ],
    diagram: 'gastric-mucosa',
    differentiators: [
      {
        fr: 'Actif unique, clairement identifié : zinc-L-carnosine 66 mg.',
        en: 'A single, clearly identified active: zinc-L-carnosine 66 mg.',
      },
      {
        fr: 'Le polaprézinc est utilisé comme médicament au Japon (ulcère gastrique). Ce statut ne s’étend pas au complément alimentaire.',
        en: 'Polaprezinc is used as a medicine in Japan (gastric ulcer). That status does not extend to the food supplement.',
      },
      {
        fr: 'Sécurité du zinc L-carnosine évaluée par l’EFSA (nouvel aliment, 2022).',
        en: 'Safety of zinc L-carnosine assessed by EFSA (novel food, 2022).',
      },
    ],
    usage: { text: { fr: '1 à 2 gélules par jour, au cours d’un repas.', en: '1 to 2 capsules per day, with a meal.' } },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: { text: { fr: 'Boîte de 30 gélules', en: 'Box of 30 capsules' } },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Tenir compte de l’apport total en zinc (limite supérieure de sécurité de l’EFSA : 25 mg/jour chez l’adulte).',
        en: 'Take total zinc intake into account (EFSA tolerable upper intake level: 25 mg/day for adults).',
      },
      NOT_A_TREATMENT,
    ],
    hcpNotes: [
      {
        fr: 'Symptômes digestifs persistants, saignement, amaigrissement ou dysphagie : orienter vers une consultation médicale.',
        en: 'Persistent digestive symptoms, bleeding, weight loss or dysphagia: refer for medical consultation.',
      },
      {
        fr: 'Le zinc peut réduire l’absorption de certains antibiotiques (quinolones, tétracyclines) : espacer les prises.',
        en: 'Zinc may reduce absorption of some antibiotics (quinolones, tetracyclines): separate intakes.',
      },
    ],
    references: ['efthymakis-2022', 'mahmood-2007', 'ods-zinc', 'efsa-zinc-carnosine-2022', 'eu-432-2012'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Teneur en zinc élément non déclarée.',
        en: 'Elemental zinc content not declared.',
      },
      {
        fr: 'Libellés « soulage les inconforts digestifs », « apaise les brûlures d’estomac », « réduit les ballonnements » (site) : non autorisés en l’état, non repris.',
        en: '“Relieves digestive discomfort”, “soothes heartburn”, “reduces bloating” (website): not authorised as such, not used.',
      },
      {
        fr: 'Visuel d’emballage en basse résolution (305 px).',
        en: 'Low-resolution pack image (305 px).',
      },
    ],
    story: 'standard',
    source: SITE,
  },

  // ─────────────────────────────────────────────────────────────── BIOD3K2+
  {
    id: 'biod3k2',
    slug: 'bio-d3k2',
    aliases: ['biod3k2'],
    name: 'BioD3K2+',
    category: { fr: 'Vitamines', en: 'Vitamins' },
    tagline: { fr: 'Vitamine D3, vitamine K2 et magnésium', en: 'Vitamin D3, vitamin K2 and magnesium' },
    positioning: {
      fr: 'Vitamine D3, vitamine K2 (MK-7) et magnésium pour le métabolisme du calcium.',
      en: 'Vitamin D3, vitamin K2 (MK-7) and magnesium for calcium metabolism.',
    },
    description: {
      fr: 'Vitamine D3 2 000 UI, vitamine K2 MK-7 et bisglycinate de magnésium, en une gélule par jour.',
      en: 'Vitamin D3 2,000 IU, vitamin K2 MK-7 and magnesium bisglycinate, one capsule a day.',
    },
    image: d3k2Img,
    imageAspect: 1183 / 876,
    accent: '#c98a12',
    accentSoft: '#fbf1d9',
    doseBasis: { fr: 'Pour 1 gélule', en: 'Per capsule' },
    ingredients: [
      {
        name: { fr: 'Vitamine D3', en: 'Vitamin D3' },
        quantity: 2000,
        unit: 'UI',
        detail: { fr: 'soit 50 µg de cholécalciférol', en: 'i.e. 50 µg cholecalciferol' },
        role: { fr: 'Absorption du calcium et du phosphore', en: 'Calcium and phosphorus absorption' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine K2 (MK-7)', en: 'Vitamin K2 (MK-7)' },
        detail: { fr: 'Quantité à confirmer', en: 'Amount to be confirmed' },
        role: { fr: 'Cofacteur de la γ-carboxylation', en: 'Cofactor of γ-carboxylation' },
        status: 'pending',
      },
      {
        name: { fr: 'Bisglycinate de magnésium', en: 'Magnesium bisglycinate' },
        quantity: 60,
        unit: 'mg',
        detail: { fr: 'Teneur en magnésium élément à confirmer', en: 'Elemental magnesium to be confirmed' },
        role: { fr: 'Ossature et fonction musculaire', en: 'Bones and muscle function' },
        status: 'pending',
      },
    ],
    excipients: {
      fr: 'Excipients : cellulose, silice colloïdale, stéarate de magnésium.',
      en: 'Excipients: cellulose, colloidal silica, magnesium stearate.',
    },
    mechanisms: [
      {
        title: { fr: 'Activation de la vitamine D', en: 'Vitamin D activation' },
        body: {
          fr: 'La vitamine D3 est hydroxylée par le foie en 25(OH)D (calcidiol), puis par le rein en 1,25(OH)₂D (calcitriol). Le calcitriol agit via le récepteur VDR.',
          en: 'Vitamin D3 is hydroxylated in the liver to 25(OH)D (calcidiol), then in the kidney to 1,25(OH)₂D (calcitriol), which acts through the VDR receptor.',
        },
        evidence: 'established-physiology',
        refs: ['holick-2007', 'ods-vitamin-d'],
      },
      {
        title: { fr: 'Vitamine D', en: 'Vitamin D' },
        body: {
          fr: 'La vitamine D contribue à l’absorption normale du calcium et du phosphore, à une calcémie normale, au maintien d’une ossature, d’une dentition et d’une fonction musculaire normales, et au fonctionnement normal du système immunitaire.',
          en: 'Vitamin D contributes to normal absorption of calcium and phosphorus, normal blood calcium, maintenance of normal bones, teeth and muscle function, and normal immune function.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'efsa-vitamin-d-2009'],
      },
      {
        title: { fr: 'Vitamine K', en: 'Vitamin K' },
        body: {
          fr: 'La vitamine K contribue au maintien d’une ossature normale et à une coagulation sanguine normale. Elle est le cofacteur de la carboxylation de l’ostéocalcine.',
          en: 'Vitamin K contributes to the maintenance of normal bones and to normal blood clotting. It is the cofactor for osteocalcin carboxylation.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'ods-vitamin-k'],
      },
      {
        title: { fr: 'Limites des données', en: 'Limits of the evidence' },
        body: {
          fr: 'L’essai VITAL (D3 2 000 UI/j) n’a pas réduit les événements cardiovasculaires majeurs ni les cancers invasifs. La vitamine D ne doit pas être présentée comme un traitement.',
          en: 'The VITAL trial (D3 2,000 IU/day) did not reduce major cardiovascular events or invasive cancer. Vitamin D should not be presented as a treatment.',
        },
        evidence: 'human-studies',
        refs: ['manson-2019'],
      },
    ],
    diagram: 'vitamin-d',
    differentiators: [
      {
        fr: 'Trois micronutriments complémentaires du métabolisme phosphocalcique en une gélule.',
        en: 'Three complementary micronutrients of calcium–phosphate metabolism in one capsule.',
      },
      {
        fr: 'Vitamine K2 sous forme ménaquinone-7 (MK-7).',
        en: 'Vitamin K2 as menaquinone-7 (MK-7).',
      },
      {
        fr: 'Magnésium sous forme de bisglycinate.',
        en: 'Magnesium as bisglycinate.',
      },
    ],
    usage: { text: { fr: '1 gélule par jour.', en: '1 capsule per day.' } },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: { text: { fr: 'À confirmer', en: 'To be confirmed' }, pending: true },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Contient de la vitamine K : avis médical en cas de traitement anticoagulant par antivitamine K (AVK).',
        en: 'Contains vitamin K: seek medical advice if taking vitamin K antagonist anticoagulants.',
      },
      {
        fr: 'Éviter le cumul de sources de vitamine D sans suivi (limite supérieure de sécurité de l’EFSA : 100 µg/jour chez l’adulte), en particulier en cas d’hypercalcémie ou de granulomatose.',
        en: 'Avoid combining vitamin D sources without monitoring (EFSA upper level: 100 µg/day for adults), especially with hypercalcaemia or granulomatous disease.',
      },
    ],
    hcpNotes: [
      {
        fr: 'Le statut en vitamine D s’évalue par le dosage sérique de 25(OH)D.',
        en: 'Vitamin D status is assessed by serum 25(OH)D.',
      },
      {
        fr: 'La MK-7 a une demi-vie plasmatique plus longue que la K1. Cela ne suffit pas à établir une supériorité clinique.',
        en: 'MK-7 has a longer plasma half-life than K1. That alone does not establish clinical superiority.',
      },
    ],
    references: ['ods-vitamin-d', 'ods-vitamin-k', 'holick-2007', 'manson-2019', 'efsa-vitamin-d-2009', 'eu-432-2012'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Incohérences sur le site : « vitamine K2 0,05 mg dont MK7 300 mg » et « magnésium bisglycinate 60 mg dont magnésium élément 60 mg » sont impossibles en l’état. « D3 2 000 UI — 3,34 mg » désigne vraisemblablement la masse d’une préparation de D3. Fiche produit requise.',
        en: 'Website inconsistencies: “vitamin K2 0.05 mg of which MK7 300 mg” and “magnesium bisglycinate 60 mg of which elemental magnesium 60 mg” are impossible as stated. “D3 2,000 IU — 3.34 mg” likely refers to the mass of a D3 preparation. Product sheet required.',
      },
      {
        fr: 'Liste d’« indications » du deck Figma (asthme, maladies auto-immunes, chute des cheveux…) : allégations thérapeutiques, non reprises.',
        en: 'Figma deck “indications” list (asthma, autoimmune disease, hair loss…): therapeutic claims, not used.',
      },
    ],
    story: 'standard',
    source: SITE,
  },

  // ────────────────────────────────────────────────────────────── BIOGRIPPAL
  {
    id: 'biogrippal',
    slug: 'biogrippal',
    name: 'BioGrippal',
    category: { fr: 'Immunité', en: 'Immunity' },
    tagline: { fr: 'Échinacée, propolis, reishi, zinc et vitamine D3', en: 'Echinacea, propolis, reishi, zinc and vitamin D3' },
    positioning: {
      fr: 'Trois actifs d’origine naturelle associés au zinc et à la vitamine D3, deux nutriments du système immunitaire.',
      en: 'Three natural actives combined with zinc and vitamin D3, two nutrients of the immune system.',
    },
    description: {
      fr: 'Échinacée, propolis et reishi, associés au zinc et à la vitamine D3.',
      en: 'Echinacea, propolis and reishi, combined with zinc and vitamin D3.',
    },
    image: grippalImg,
    imageAspect: 314 / 231,
    accent: '#6a3d8f',
    accentSoft: '#efe7f5',
    doseBasis: { fr: 'Pour 1 gélule', en: 'Per capsule' },
    ingredients: [
      {
        name: { fr: 'Extrait de racine d’échinacée', en: 'Echinacea root extract' },
        quantity: 150,
        unit: 'mg',
        role: { fr: 'Plante traditionnellement utilisée en période hivernale', en: 'Plant traditionally used in winter' },
        status: 'verified',
      },
      {
        name: { fr: 'Propolis', en: 'Propolis' },
        quantity: 150,
        unit: 'mg',
        role: { fr: 'Résine produite par les abeilles', en: 'Resin produced by bees' },
        status: 'verified',
      },
      {
        name: { fr: 'Extrait de reishi', en: 'Reishi extract' },
        quantity: 150,
        unit: 'mg',
        detail: { fr: 'dont bêta-glucanes : 30 %', en: 'of which beta-glucans: 30%' },
        role: { fr: 'Champignon riche en β-glucanes', en: 'Mushroom rich in β-glucans' },
        status: 'verified',
      },
      {
        name: { fr: 'Zinc bisglycinate', en: 'Zinc bisglycinate' },
        quantity: 17,
        unit: 'mg',
        detail: { fr: 'dont zinc élément : 5 mg', en: 'of which elemental zinc: 5 mg' },
        role: { fr: 'Fonctionnement normal du système immunitaire', en: 'Normal immune function' },
        status: 'verified',
      },
      {
        name: { fr: 'Vitamine D3', en: 'Vitamin D3' },
        quantity: 1000,
        unit: 'UI',
        detail: { fr: 'soit 25 µg', en: 'i.e. 25 µg' },
        role: { fr: 'Fonctionnement normal du système immunitaire', en: 'Normal immune function' },
        status: 'verified',
      },
    ],
    mechanisms: [
      {
        title: { fr: 'Zinc & vitamine D', en: 'Zinc & vitamin D' },
        body: {
          fr: 'Le zinc et la vitamine D contribuent au fonctionnement normal du système immunitaire.',
          en: 'Zinc and vitamin D contribute to the normal function of the immune system.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'ods-zinc', 'ods-vitamin-d'],
      },
      {
        title: { fr: 'Échinacée', en: 'Echinacea' },
        body: {
          fr: 'La revue Cochrane suggère au mieux un faible effet préventif sur le rhume, avec des préparations très hétérogènes. Aucun bénéfice thérapeutique n’est démontré.',
          en: 'The Cochrane review suggests at most a weak preventive effect on colds, across very heterogeneous preparations. No therapeutic benefit has been demonstrated.',
        },
        evidence: 'human-studies',
        refs: ['karsch-volk-2014', 'nccih-echinacea'],
      },
      {
        title: { fr: 'Reishi & propolis', en: 'Reishi & propolis' },
        body: {
          fr: 'Les β-glucanes du reishi et les polyphénols de la propolis montrent des effets immunomodulateurs et antimicrobiens in vitro et chez l’animal. Les données cliniques restent limitées.',
          en: 'Reishi β-glucans and propolis polyphenols show immunomodulatory and antimicrobial effects in vitro and in animals. Clinical data remain limited.',
        },
        evidence: 'preclinical',
        refs: ['mskcc-reishi'],
      },
    ],
    diagram: 'immune-barrier',
    differentiators: [
      {
        fr: 'Cinq actifs en une gélule : trois extraits naturels et deux micronutriments.',
        en: 'Five actives in one capsule: three natural extracts and two micronutrients.',
      },
      {
        fr: 'Extrait de reishi titré à 30 % de bêta-glucanes.',
        en: 'Reishi extract standardised to 30% beta-glucans.',
      },
      {
        fr: 'Zinc sous forme bisglycinate, avec la teneur en élément déclarée.',
        en: 'Zinc as bisglycinate, with elemental content declared.',
      },
    ],
    usage: { text: { fr: 'Posologie à confirmer sur l’emballage final.', en: 'Dosage to be confirmed on final packaging.' }, pending: true },
    format: { text: { fr: 'Gélules', en: 'Capsules' } },
    packaging: { text: { fr: 'À confirmer', en: 'To be confirmed' }, pending: true },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Contient des produits de la ruche (propolis) et une Astéracée (échinacée) : déconseillé en cas d’allergie.',
        en: 'Contains bee products (propolis) and an Asteraceae plant (echinacea): not recommended in case of allergy.',
      },
      {
        fr: 'Traitement immunosuppresseur, anticoagulant, maladie auto-immune, grossesse ou allaitement : avis médical préalable.',
        en: 'Immunosuppressants, anticoagulants, autoimmune disease, pregnancy or breastfeeding: seek medical advice first.',
      },
      {
        fr: 'Ne remplace ni la vaccination ni une prise en charge médicale.',
        en: 'Does not replace vaccination or medical care.',
      },
    ],
    hcpNotes: [
      {
        fr: 'Les allégations immunitaires autorisées portent sur le zinc et la vitamine D, pas sur les extraits de plantes ou de champignons.',
        en: 'Authorised immune claims relate to zinc and vitamin D, not to the plant or mushroom extracts.',
      },
    ],
    references: ['eu-432-2012', 'ods-zinc', 'ods-vitamin-d', 'nccih-echinacea', 'karsch-volk-2014', 'mskcc-reishi'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Posologie et conditionnement non indiqués sur le site.',
        en: 'Dosage and pack size not stated on the website.',
      },
      {
        fr: 'Visuel d’emballage en basse résolution (314 px).',
        en: 'Low-resolution pack image (314 px).',
      },
    ],
    story: 'standard',
    source: SITE,
  },

  // ────────────────────────────────────────────────────────────── BIOTENSEUR
  {
    id: 'biotenseur',
    slug: 'biotenseur',
    name: 'BioTenseur',
    category: { fr: 'Cardiovasculaire', en: 'Cardiovascular' },
    tagline: { fr: 'Olive, potassium, magnésium et CoQ10', en: 'Olive, potassium, magnesium and CoQ10' },
    positioning: {
      fr: 'Extrait d’olive EFLA®, potassium, magnésium et coenzyme Q10.',
      en: 'EFLA® olive extract, potassium, magnesium and coenzyme Q10.',
    },
    description: {
      fr: 'Extrait d’olive EFLA® 500 mg standardisé en oleuropéine, potassium, magnésium et CoQ10, en comprimés.',
      en: 'EFLA® olive extract 500 mg standardised in oleuropein, potassium, magnesium and CoQ10, in tablets.',
    },
    image: tenseurImg,
    imageAspect: 1169 / 866,
    accent: '#b23a48',
    accentSoft: '#f8e5e7',
    doseBasis: { fr: 'Quantités par comprimé — à confirmer', en: 'Amounts per tablet — to be confirmed' },
    ingredients: [
      {
        name: { fr: 'Extrait d’olive EFLA®', en: 'EFLA® olive extract' },
        quantity: 500,
        unit: 'mg',
        detail: { fr: 'Titre en oleuropéine à déclarer', en: 'Oleuropein assay to be declared' },
        role: { fr: 'Polyphénols de l’olivier', en: 'Olive polyphenols' },
        status: 'pending',
      },
      {
        name: { fr: 'Bisglycinate de magnésium', en: 'Magnesium bisglycinate' },
        quantity: 150,
        unit: 'mg',
        role: { fr: 'Fonction musculaire, équilibre électrolytique', en: 'Muscle function, electrolyte balance' },
        status: 'pending',
      },
      {
        name: { fr: 'Potassium', en: 'Potassium' },
        quantity: 150,
        unit: 'mg',
        detail: { fr: 'Forme du sel à préciser', en: 'Salt form to be specified' },
        role: { fr: 'Maintien d’une pression sanguine normale', en: 'Maintenance of normal blood pressure' },
        status: 'pending',
      },
      {
        name: { fr: 'Coenzyme Q10', en: 'Coenzyme Q10' },
        quantity: 50,
        unit: 'mg',
        role: { fr: 'Transporteur d’électrons mitochondrial', en: 'Mitochondrial electron carrier' },
        status: 'pending',
      },
    ],
    mechanisms: [
      {
        title: { fr: 'Potassium', en: 'Potassium' },
        body: {
          fr: 'Le potassium contribue au maintien d’une pression sanguine normale et à une fonction musculaire normale.',
          en: 'Potassium contributes to the maintenance of normal blood pressure and to normal muscle function.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012', 'ods-potassium'],
      },
      {
        title: { fr: 'Magnésium', en: 'Magnesium' },
        body: {
          fr: 'Le magnésium contribue à l’équilibre électrolytique et à une fonction musculaire normale.',
          en: 'Magnesium contributes to electrolyte balance and to normal muscle function.',
        },
        evidence: 'authorized-claim',
        refs: ['eu-432-2012'],
      },
      {
        title: { fr: 'Polyphénols de l’olivier', en: 'Olive polyphenols' },
        body: {
          fr: 'Des essais randomisés de petite taille avec des extraits de feuille d’olivier riches en oleuropéine rapportent de modestes variations de pression artérielle. Ces données ne sont pas transposables sans étude du produit.',
          en: 'Small randomised trials with oleuropein-rich olive leaf extracts report modest changes in blood pressure. These data cannot be transferred to the product without product-specific study.',
        },
        evidence: 'human-studies',
        refs: ['lockyer-2017'],
      },
    ],
    diagram: 'vascular',
    differentiators: [
      {
        fr: 'Association d’un extrait d’olive de marque (EFLA®) et de minéraux impliqués dans l’équilibre électrolytique.',
        en: 'A branded olive extract (EFLA®) combined with minerals involved in electrolyte balance.',
      },
      {
        fr: 'Magnésium sous forme bisglycinate.',
        en: 'Magnesium as bisglycinate.',
      },
      {
        fr: 'Format comprimé.',
        en: 'Tablet format.',
      },
    ],
    usage: { text: { fr: '1 à 2 comprimés par jour, à distance des repas.', en: '1 to 2 tablets per day, away from meals.' } },
    format: { text: { fr: 'Comprimés', en: 'Tablets' } },
    packaging: { text: { fr: 'Boîte de 30 comprimés', en: 'Box of 30 tablets' } },
    precautions: [
      ...STANDARD_PRECAUTIONS,
      {
        fr: 'Hypertension diagnostiquée ou traitement antihypertenseur : ne pas modifier le traitement, avis médical préalable.',
        en: 'Diagnosed hypertension or antihypertensive treatment: do not change treatment, seek medical advice first.',
      },
      {
        fr: 'Insuffisance rénale, diurétiques épargneurs de potassium, IEC ou ARA II : risque d’hyperkaliémie — avis médical.',
        en: 'Kidney impairment, potassium-sparing diuretics, ACE inhibitors or ARBs: risk of hyperkalaemia — seek medical advice.',
      },
      {
        fr: 'Contient de la CoQ10 : avis médical en cas de traitement par warfarine.',
        en: 'Contains CoQ10: seek medical advice if taking warfarin.',
      },
    ],
    hcpNotes: [
      {
        fr: 'Un complément alimentaire ne traite pas l’hypertension artérielle. Il ne se substitue pas à une prise en charge médicale.',
        en: 'A food supplement does not treat hypertension and is not a substitute for medical management.',
      },
    ],
    references: ['eu-432-2012', 'ods-potassium', 'ods-magnesium', 'lockyer-2017', 'nccih-coq10'],
    validationStatus: 'pending',
    validationNotes: [
      {
        fr: 'Libellés « normalise la pression artérielle », « complément naturel aux traitements », « cliniquement validée » (site) : allégations thérapeutiques ou non étayées pour cette formule, non reprises.',
        en: '“Normalises blood pressure”, “natural complement to treatment”, “clinically validated” (website): therapeutic or unsubstantiated for this formula, not used.',
      },
      {
        fr: 'Base de calcul (par comprimé ou par jour), forme du potassium et titre en oleuropéine à confirmer.',
        en: 'Basis (per tablet or per day), potassium salt form and oleuropein assay to be confirmed.',
      },
      {
        fr: 'Utilisation de la marque EFLA® : vérifier les droits auprès du fournisseur.',
        en: 'Use of the EFLA® trademark: confirm rights with the supplier.',
      },
    ],
    story: 'standard',
    source: SITE,
  },
]

export function getProduct(slugOrAlias: string): Product | undefined {
  return products.find((p) => p.slug === slugOrAlias || p.aliases?.includes(slugOrAlias))
}
