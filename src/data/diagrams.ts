import type { DiagramId, L } from './types'

export interface DiagramMeta {
  title: L
  /** One caption per progressive step. The step count drives presenter navigation. */
  steps: L[]
  /** Shown as a banner so general biology is never read as proof of product efficacy */
  scope: 'general-biology' | 'preclinical'
  refs: string[]
}

export const diagrams: Record<DiagramId, DiagramMeta> = {
  mitochondria: {
    title: { fr: 'La mitochondrie', en: 'The mitochondrion' },
    scope: 'general-biology',
    refs: ['rich-2010'],
    steps: [
      {
        fr: 'Une double membrane : la membrane externe délimite l’organite.',
        en: 'A double membrane: the outer membrane encloses the organelle.',
      },
      {
        fr: 'La membrane interne, repliée en crêtes, porte la chaîne respiratoire et l’ATP synthase.',
        en: 'The inner membrane, folded into cristae, carries the respiratory chain and ATP synthase.',
      },
      {
        fr: 'Dans la matrice, le cycle de Krebs produit le NADH et le FADH₂ qui alimentent la chaîne respiratoire.',
        en: 'In the matrix, the Krebs cycle produces the NADH and FADH₂ that feed the respiratory chain.',
      },
    ],
  },
  'electron-transport': {
    title: { fr: 'Rôle de la CoQ10 dans la chaîne respiratoire', en: 'Role of CoQ10 in the respiratory chain' },
    scope: 'general-biology',
    refs: ['rich-2010'],
    steps: [
      {
        fr: 'La membrane mitochondriale interne porte les complexes I à V.',
        en: 'The inner mitochondrial membrane carries complexes I to V.',
      },
      {
        fr: 'Complexe I : le NADH cède deux électrons, transférés à la coenzyme Q10.',
        en: 'Complex I: NADH donates two electrons, which are passed to coenzyme Q10.',
      },
      {
        fr: 'Complexe II : l’oxydation du succinate (via le FADH₂) alimente aussi le pool de CoQ10.',
        en: 'Complex II: succinate oxidation (via FADH₂) also feeds the CoQ10 pool.',
      },
      {
        fr: 'La CoQ10 réduite (ubiquinol) cède ses électrons au complexe III. Le cytochrome c les conduit ensuite au complexe IV, où l’O₂ est réduit en H₂O.',
        en: 'Reduced CoQ10 (ubiquinol) passes its electrons to complex III. Cytochrome c then carries them to complex IV, where O₂ is reduced to H₂O.',
      },
      {
        fr: 'Les complexes I, III et IV pompent des protons vers l’espace intermembranaire. Un gradient électrochimique se forme.',
        en: 'Complexes I, III and IV pump protons into the intermembrane space, building an electrochemical gradient.',
      },
      {
        fr: 'L’ATP synthase utilise le reflux des protons pour former l’ATP à partir d’ADP et de phosphate.',
        en: 'ATP synthase uses the return flow of protons to make ATP from ADP and phosphate.',
      },
    ],
  },
  'magnesium-atp': {
    title: { fr: 'Magnésium et ATP', en: 'Magnesium and ATP' },
    scope: 'general-biology',
    refs: ['debaaij-2015', 'ods-magnesium'],
    steps: [
      {
        fr: 'L’ATP porte trois groupements phosphate (α, β, γ), chargés négativement.',
        en: 'ATP carries three negatively charged phosphate groups (α, β, γ).',
      },
      {
        fr: 'L’ion Mg²⁺ se lie aux phosphates β et γ. Dans la cellule, l’ATP circule surtout sous forme de complexe Mg-ATP.',
        en: 'The Mg²⁺ ion binds the β and γ phosphates. In the cell, ATP circulates mainly as a Mg-ATP complex.',
      },
      {
        fr: 'Les kinases reconnaissent le complexe Mg-ATP comme substrat et transfèrent le phosphate γ.',
        en: 'Kinases recognise Mg-ATP as their substrate and transfer the γ phosphate.',
      },
      {
        fr: 'Le magnésium est cofacteur de plus de 300 systèmes enzymatiques : énergie, synthèse protéique, transmission neuromusculaire.',
        en: 'Magnesium is a cofactor in more than 300 enzyme systems: energy, protein synthesis, neuromuscular transmission.',
      },
    ],
  },
  'glucose-ampk': {
    title: { fr: 'Berbérine, AMPK et métabolisme du glucose', en: 'Berberine, AMPK and glucose metabolism' },
    scope: 'preclinical',
    refs: ['lee-2006', 'zhao-2023'],
    steps: [
      {
        fr: 'Une cellule musculaire : le transporteur GLUT4 est stocké dans des vésicules intracellulaires.',
        en: 'A muscle cell: the GLUT4 transporter is stored in intracellular vesicles.',
      },
      {
        fr: 'En modèle cellulaire, la berbérine augmente le rapport AMP/ATP, ce qui active l’AMPK, capteur de l’état énergétique.',
        en: 'In cell models, berberine raises the AMP/ATP ratio, which activates AMPK, the cell’s energy sensor.',
      },
      {
        fr: 'L’AMPK favorise la translocation de GLUT4 vers la membrane : la captation du glucose augmente.',
        en: 'AMPK promotes GLUT4 translocation to the membrane, increasing glucose uptake.',
      },
      {
        fr: 'Dans le foie (modèles animaux), l’activation de l’AMPK freine la néoglucogenèse et la lipogenèse.',
        en: 'In the liver (animal models), AMPK activation restrains gluconeogenesis and lipogenesis.',
      },
    ],
  },
  'gastric-mucosa': {
    title: { fr: 'Zinc carnosine et muqueuse digestive', en: 'Zinc carnosine and the digestive mucosa' },
    scope: 'general-biology',
    refs: ['efthymakis-2022', 'mahmood-2007'],
    steps: [
      {
        fr: 'La muqueuse gastrique : couche de mucus, épithélium jointif et chorion vascularisé.',
        en: 'The gastric mucosa: a mucus layer, a tight epithelium and a vascularised lamina propria.',
      },
      {
        fr: 'L’acidité, certains médicaments (AINS) ou l’alcool peuvent altérer l’épithélium.',
        en: 'Acidity, some medicines (NSAIDs) or alcohol can damage the epithelium.',
      },
      {
        fr: 'Le complexe zinc–carnosine se dissocie lentement et adhère préférentiellement aux zones lésées.',
        en: 'The zinc–carnosine complex dissociates slowly and preferentially adheres to injured areas.',
      },
      {
        fr: 'Libération locale de zinc et de carnosine. Des modèles expérimentaux suggèrent une stimulation de la réparation épithéliale.',
        en: 'Zinc and carnosine are released locally. Experimental models suggest stimulation of epithelial repair.',
      },
    ],
  },
  'vitamin-d': {
    title: { fr: 'Vitamine D, vitamine K et calcium', en: 'Vitamin D, vitamin K and calcium' },
    scope: 'general-biology',
    refs: ['holick-2007', 'ods-vitamin-d', 'ods-vitamin-k'],
    steps: [
      {
        fr: 'Peau (UVB) ou alimentation : apport de vitamine D3 (cholécalciférol).',
        en: 'Skin (UVB) or diet: supply of vitamin D3 (cholecalciferol).',
      },
      {
        fr: 'Foie : hydroxylation en 25(OH)D (calcidiol), marqueur du statut.',
        en: 'Liver: hydroxylation to 25(OH)D (calcidiol), the status marker.',
      },
      {
        fr: 'Rein : conversion en 1,25(OH)₂D (calcitriol), la forme hormonale active.',
        en: 'Kidney: conversion to 1,25(OH)₂D (calcitriol), the active hormone.',
      },
      {
        fr: 'Intestin : le calcitriol augmente l’absorption du calcium et du phosphate.',
        en: 'Intestine: calcitriol increases calcium and phosphate absorption.',
      },
      {
        fr: 'Os : la vitamine K permet la carboxylation de l’ostéocalcine, qui fixe le calcium dans la matrice osseuse.',
        en: 'Bone: vitamin K enables carboxylation of osteocalcin, which binds calcium in the bone matrix.',
      },
    ],
  },
  'immune-barrier': {
    title: { fr: 'Barrière respiratoire et immunité innée', en: 'Respiratory barrier and innate immunity' },
    scope: 'general-biology',
    refs: ['ods-zinc', 'ods-vitamin-d'],
    steps: [
      {
        fr: 'L’épithélium respiratoire, avec son mucus et ses cils, forme une première barrière physique.',
        en: 'The respiratory epithelium, with its mucus and cilia, forms a first physical barrier.',
      },
      {
        fr: 'Lorsqu’un agent pathogène franchit le mucus, l’immunité innée est sollicitée.',
        en: 'When a pathogen crosses the mucus layer, innate immunity is engaged.',
      },
      {
        fr: 'Le zinc est nécessaire au développement et à la fonction des cellules immunitaires.',
        en: 'Zinc is required for the development and function of immune cells.',
      },
      {
        fr: 'Les cellules immunitaires expriment le récepteur de la vitamine D (VDR) : la vitamine D module leur réponse.',
        en: 'Immune cells express the vitamin D receptor (VDR): vitamin D modulates their response.',
      },
    ],
  },
  vascular: {
    title: { fr: 'Paroi artérielle et équilibre électrolytique', en: 'Arterial wall and electrolyte balance' },
    scope: 'general-biology',
    refs: ['ods-potassium', 'ods-magnesium', 'lockyer-2017'],
    steps: [
      {
        fr: 'La paroi artérielle : endothélium, muscle lisse et adventice.',
        en: 'The arterial wall: endothelium, smooth muscle and adventitia.',
      },
      {
        fr: 'Le potassium et le magnésium participent à l’équilibre électrolytique et à la fonction musculaire, y compris du muscle lisse vasculaire.',
        en: 'Potassium and magnesium take part in electrolyte balance and muscle function, including vascular smooth muscle.',
      },
      {
        fr: 'Les polyphénols de l’olivier (oleuropéine) sont étudiés pour leurs effets sur l’endothélium, surtout en modèles expérimentaux.',
        en: 'Olive polyphenols (oleuropein) are studied for effects on the endothelium, mostly in experimental models.',
      },
      {
        fr: 'La pression artérielle dépend de nombreux facteurs. Son suivi relève d’une prise en charge médicale.',
        en: 'Blood pressure depends on many factors. Its management is a medical matter.',
      },
    ],
  },
}
