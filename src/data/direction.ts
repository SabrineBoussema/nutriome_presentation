import type { SlideDef } from './presentation'

/** Direction Nutriome Labs — rencontre scientifique du 5 novembre 2026. */
export const DIRECTION_HANDOVER = {
  to: '/presentation',
  label: 'Accéder à la présentation de la gamme',
} as const

export const directionProgram = [
  {
    n: '01',
    title: 'Mot de bienvenue et ouverture',
    speaker: 'Direction Nutriome Labs',
    detail: null,
    accent: false,
    icon: 'welcome' as const,
  },
  {
    n: '02',
    title: 'Présentation de Nutriome Labs',
    speaker: 'Malek Nabli',
    detail: 'Présentation de trois compléments alimentaires — 10 minutes',
    accent: false,
    icon: 'range' as const,
  },
  {
    n: '03',
    title: 'Intervention scientifique | Partie 1',
    speaker: 'Dr Amin Gasmi',
    detail: 'Surpoids, résistance à l’insuline et santé métabolique',
    accent: true,
    icon: 'science' as const,
  },
  {
    n: '04',
    title: 'Intermède | Découverte de notre gamme',
    speaker: 'Malek Nabli',
    detail: 'Présentation des autres compléments alimentaires',
    accent: false,
    icon: 'interlude' as const,
  },
  {
    n: '05',
    title: 'Intervention scientifique | Partie 2',
    speaker: 'Dr Amin Gasmi',
    detail: 'Apport de la micronutrition et perspectives pratiques',
    accent: true,
    icon: 'micronutrition' as const,
  },
  {
    n: '06',
    title: 'Échanges et clôture',
    speaker: 'Questions-réponses avec les participants',
    detail: 'Remerciements de la Direction',
    accent: false,
    icon: 'close' as const,
  },
]

export const directionSlides: SlideDef[] = [
  {
    id: 'direction-welcome',
    kind: 'direction-welcome',
    steps: 1,
    section: { fr: 'Ouverture', en: 'Opening' },
    title: { fr: 'Bienvenue à notre rencontre scientifique', en: 'Bienvenue à notre rencontre scientifique' },
    notes: {
      fr: 'Mesdames, Messieurs, chers professionnels de santé, bienvenue à cette rencontre scientifique Nutriome Labs. Merci de votre présence. Nutriome Labs développe des compléments alimentaires formulés avec une approche scientifique, au service des pharmaciens, médecins et nutritionnistes en Tunisie. Ce soir, nous ouvrons un temps d’échange autour du surpoids, de la résistance à l’insuline et de l’apport de la micronutrition.',
      en: 'Mesdames, Messieurs, chers professionnels de santé, bienvenue à cette rencontre scientifique Nutriome Labs. Merci de votre présence. Nutriome Labs développe des compléments alimentaires formulés avec une approche scientifique, au service des pharmaciens, médecins et nutritionnistes en Tunisie. Ce soir, nous ouvrons un temps d’échange autour du surpoids, de la résistance à l’insuline et de l’apport de la micronutrition.',
    },
  },
  {
    id: 'direction-program',
    kind: 'direction-program',
    steps: 6,
    section: { fr: 'Programme', en: 'Programme' },
    title: { fr: 'Déroulement de notre rencontre scientifique', en: 'Déroulement de notre rencontre scientifique' },
    notes: {
      fr: 'Nous suivrons six temps. Après l’ouverture, Malek Nabli présentera Nutriome Labs et trois de nos compléments alimentaires pendant dix minutes. Nous accueillerons ensuite le Dr Amin Gasmi, conférencier international, pour la première partie de son intervention — surpoids, résistance à l’insuline et santé métabolique. Un intermède permettra à Malek de présenter le reste de la gamme. Le Dr Gasmi reprendra alors la parole pour la seconde partie, consacrée à l’apport de la micronutrition et aux perspectives pratiques. Nous clôturerons par vos questions.',
      en: 'Nous suivrons six temps. Après l’ouverture, Malek Nabli présentera Nutriome Labs et trois de nos compléments alimentaires pendant dix minutes. Nous accueillerons ensuite le Dr Amin Gasmi, conférencier international, pour la première partie de son intervention — surpoids, résistance à l’insuline et santé métabolique. Un intermède permettra à Malek de présenter le reste de la gamme. Le Dr Gasmi reprendra alors la parole pour la seconde partie, consacrée à l’apport de la micronutrition et aux perspectives pratiques. Nous clôturerons par vos questions.',
    },
  },
  {
    id: 'direction-closing',
    kind: 'direction-closing',
    steps: 1,
    section: { fr: 'Clôture', en: 'Closing' },
    title: { fr: 'Merci pour votre participation', en: 'Merci pour votre participation' },
    notes: {
      fr: 'Au nom de la Direction de Nutriome Labs, je remercie le Dr Amin Gasmi pour son éclairage scientifique, les professionnels de santé présents ce soir, et l’équipe Nutriome Labs. Merci pour votre participation. Ensemble, faisons avancer le partage des connaissances scientifiques. Je vous souhaite une excellente soirée.',
      en: 'Au nom de la Direction de Nutriome Labs, je remercie le Dr Amin Gasmi pour son éclairage scientifique, les professionnels de santé présents ce soir, et l’équipe Nutriome Labs. Merci pour votre participation. Ensemble, faisons avancer le partage des connaissances scientifiques. Je vous souhaite une excellente soirée.',
    },
  },
]
