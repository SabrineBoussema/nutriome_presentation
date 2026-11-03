import type { L } from './types'
import echinaceaImg from '../assets/ingredients/echinacea.jpg'
import propolisImg from '../assets/ingredients/propolis.jpg'
import reishiImg from '../assets/ingredients/reishi.jpg'
import redYeastRiceImg from '../assets/ingredients/red-yeast-rice.jpg'
import milkThistleImg from '../assets/ingredients/milk-thistle.jpg'
import oliveLeafImg from '../assets/ingredients/olive-leaf.jpg'
import berberineImg from '../assets/ingredients/berberine.png'
import cholecalciferolImg from '../assets/ingredients/cholecalciferol.png'
import chromiumPicolinateImg from '../assets/ingredients/chromium-picolinate.png'
import menaquinone7Img from '../assets/ingredients/menaquinone-7.png'
import polaprezincImg from '../assets/ingredients/polaprezinc.png'

/**
 * Illustration shown on each composition card.
 *  - photo: botanical / natural raw material (Wikimedia Commons, licence recorded below)
 *  - structure: 2-D structure of a defined molecule (PubChem, NIH — public domain)
 *  - molecule: hand-drawn magnesium-salt schematic (see scientific/molecules)
 *  - ion: mineral shown as its ion
 *  - monogram: used when the exact chemical form is not yet validated (CoQ10, B vitamins),
 *    so no specific salt or redox form is implied
 */
export type IngredientVisual =
  | { kind: 'photo'; src: string; alt: L; credit: { author: string; license: string; url: string }; note?: L }
  | { kind: 'structure'; src: string; alt: L; pubchemCid: number }
  | { kind: 'molecule'; id: 'bisglycinate' | 'malate' | 'citrate' }
  | { kind: 'ion'; label: string }
  | { kind: 'monogram'; label: string }

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`

/** Keyed by the ingredient's French name in products.ts */
export const INGREDIENT_VISUALS: Record<string, IngredientVisual> = {
  // Bio3Mag
  'Bisglycinate de magnésium': { kind: 'molecule', id: 'bisglycinate' },
  'Malate de magnésium': { kind: 'molecule', id: 'malate' },
  'Citrate de magnésium': { kind: 'molecule', id: 'citrate' },
  'Magnésium élément': { kind: 'ion', label: 'Mg²⁺' },
  // BioQ10+
  'Coenzyme Q10': { kind: 'monogram', label: 'Q10' },
  'Levure de riz rouge': {
    kind: 'photo',
    src: redYeastRiceImg,
    alt: { fr: 'Levure de riz rouge (riz fermenté par Monascus purpureus)', en: 'Red yeast rice (rice fermented with Monascus purpureus)' },
    credit: { author: 'FotoosVanRobin', license: 'CC BY-SA 2.0', url: commons('Red_yeast_rice.jpg') },
  },
  'Vitamine B1': { kind: 'monogram', label: 'B1' },
  'Vitamine B2': { kind: 'monogram', label: 'B2' },
  'Vitamine B3': { kind: 'monogram', label: 'B3' },
  'Vitamine B5': { kind: 'monogram', label: 'B5' },
  'Vitamine B12': { kind: 'monogram', label: 'B12' },
  // BioBerberine+
  'Berbérine': { kind: 'structure', src: berberineImg, alt: { fr: 'Structure de la berbérine', en: 'Berberine structure' }, pubchemCid: 2353 },
  'Chardon-marie': {
    kind: 'photo',
    src: milkThistleImg,
    alt: { fr: 'Chardon-marie (Silybum marianum)', en: 'Milk thistle (Silybum marianum)' },
    credit: { author: 'Frank Schulenburg', license: 'CC BY-SA 4.0', url: commons('Silybum_marianum_at_Mount_Burdell_Open_Space_Preserve.jpg') },
    note: { fr: 'plante en fleur', en: 'flowering plant' },
  },
  'Zinc bisglycinate': { kind: 'ion', label: 'Zn²⁺' },
  'Chrome picolinate': {
    kind: 'structure',
    src: chromiumPicolinateImg,
    alt: { fr: 'Structure du picolinate de chrome', en: 'Chromium picolinate structure' },
    pubchemCid: 151932,
  },
  // BioDigest
  'Zinc-L-carnosine': { kind: 'structure', src: polaprezincImg, alt: { fr: 'Structure du zinc-L-carnosine', en: 'Zinc-L-carnosine structure' }, pubchemCid: 9817450 },
  // BioD3K2+
  'Vitamine D3': { kind: 'structure', src: cholecalciferolImg, alt: { fr: 'Structure du cholécalciférol', en: 'Cholecalciferol structure' }, pubchemCid: 5280795 },
  'Vitamine K2 (MK-7)': { kind: 'structure', src: menaquinone7Img, alt: { fr: 'Structure de la ménaquinone-7', en: 'Menaquinone-7 structure' }, pubchemCid: 5287554 },
  // BioGrippal
  'Extrait de racine d’échinacée': {
    kind: 'photo',
    src: echinaceaImg,
    alt: { fr: 'Échinacée pourpre (Echinacea purpurea)', en: 'Purple coneflower (Echinacea purpurea)' },
    credit: { author: 'Gzen92', license: 'CC BY-SA 4.0', url: commons('Échinacée_pourpre_(Echinacea_purpurea)_(2).jpg') },
    note: { fr: 'plante en fleur — le produit contient l’extrait de racine', en: 'flowering plant — the product contains root extract' },
  },
  Propolis: {
    kind: 'photo',
    src: propolisImg,
    alt: { fr: 'Propolis brute', en: 'Raw propolis' },
    credit: { author: 'Epukas', license: 'domaine public', url: commons('Propolis_taruvaik.jpg') },
  },
  'Extrait de reishi': {
    kind: 'photo',
    src: reishiImg,
    alt: { fr: 'Reishi (Ganoderma)', en: 'Reishi (Ganoderma)' },
    credit: { author: 'Rev. Daniel Elis Axelrod', license: 'CC0', url: commons('Photograph_2021-09-28_reishi_mushroom_CC0_Rev_Daniel_Elis_Axelrod_2021.jpg') },
  },
  // BioTenseur
  'Extrait d’olive EFLA®': {
    kind: 'photo',
    src: oliveLeafImg,
    alt: { fr: 'Rameau d’olivier (Olea europaea)', en: 'Olive branch (Olea europaea)' },
    credit: {
      author: 'Javier Martin',
      license: 'domaine public',
      url: commons('Olea_europaea_FruitsandLeaves_2009December13_DehesaBoyaldePuertollano.jpg'),
    },
    note: { fr: 'feuilles et fruits d’olivier', en: 'olive leaves and fruit' },
  },
  Potassium: { kind: 'ion', label: 'K⁺' },
}

export function visualFor(name: L): IngredientVisual | undefined {
  return INGREDIENT_VISUALS[name.fr]
}
