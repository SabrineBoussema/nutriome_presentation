/**
 * EventConfiguration — tout le contenu d'un EPU Nutriome Labs.
 * Modifiable depuis /admin (persisté dans le navigateur) ; ces valeurs sont les valeurs par défaut.
 * Pour un prochain EPU : modifier depuis /admin → « Événement », ou exporter / importer le JSON.
 */
import gasmiPortrait from '../assets/conference/dr-amin-gasmi.jpg'

export const DEFAULT_PORTRAIT = gasmiPortrait

export type ScreenId =
  | 'welcome'
  | 'about'
  | 'vision'
  | 'range'
  | 'academy'
  | 'newcomers'
  | 'collaborate'
  | 'program'
  | 'speaker'
  | 'malek'
  | 'break'
  | 'qa'
  | 'thanks'

export interface ScreenDef {
  id: ScreenId
  label: string
  /** Shown in the automatic waiting loop */
  loop: boolean
  /** Seconds on screen in the waiting loop */
  duration: number
}

export interface ProgramItem {
  title: string
  speaker: string
}

export interface EventConfig {
  version: 1
  eyebrow: string
  theme: string
  /** ISO date-time with offset, e.g. 2026-11-26T19:30:00+01:00 */
  startsAt: string
  speaker: { name: string; title: string; portrait: string }
  presenter: { name: string; topic: string }
  program: ProgramItem[]
  next: { date: string; theme: string }
  academyUrl: string
  contactUrl: string
  contactLabel: string
  websiteLabel: string
  /** Opened in the projection window by « Passer à la présentation produits » */
  handoverUrl: string
  screens: ScreenDef[]
}

export const SCREENS: ScreenDef[] = [
  { id: 'welcome', label: 'Bienvenue', loop: true, duration: 25 },
  { id: 'about', label: 'Qui sommes-nous ?', loop: true, duration: 20 },
  { id: 'vision', label: 'Vision et mission', loop: true, duration: 18 },
  { id: 'range', label: 'Notre gamme', loop: true, duration: 24 },
  { id: 'academy', label: 'Nutriome Academy', loop: true, duration: 20 },
  { id: 'newcomers', label: 'Nouveaux participants', loop: true, duration: 18 },
  { id: 'collaborate', label: 'Collaborons ensemble', loop: true, duration: 20 },
  { id: 'program', label: 'Programme', loop: true, duration: 22 },
  { id: 'speaker', label: 'Conférencier', loop: false, duration: 20 },
  { id: 'malek', label: 'Transition Malek', loop: false, duration: 20 },
  { id: 'break', label: 'Pause', loop: false, duration: 20 },
  { id: 'qa', label: 'Questions & réponses', loop: false, duration: 20 },
  { id: 'thanks', label: 'Remerciements', loop: false, duration: 20 },
]

export const DEFAULT_EVENT: EventConfig = {
  version: 1,
  eyebrow: 'EPU scientifique',
  theme: 'Syndrome de l’intestin irritable : quelle place pour les compléments alimentaires ?',
  startsAt: '2026-11-26T19:30:00+01:00',
  // portrait '' = official portrait bundled with the app (an uploaded photo is stored as a data URL)
  speaker: { name: 'Dr Amin GASMI', title: 'Conférencier international', portrait: '' },
  presenter: { name: 'Malek Nabli', topic: 'Présentation de deux compléments alimentaires Nutriome Labs' },
  program: [
    { title: 'Accueil et introduction', speaker: 'Nutriome Labs' },
    { title: 'Intervention scientifique', speaker: 'Dr Amin Gasmi' },
    { title: 'Présentation de deux compléments alimentaires', speaker: 'Malek Nabli' },
    { title: 'Reprise de la conférence scientifique', speaker: 'Dr Amin Gasmi' },
    { title: 'Questions et réponses', speaker: 'Avec les participants' },
    { title: 'Remerciements et clôture', speaker: 'Nutriome Labs' },
  ],
  next: {
    date: '8 décembre 2026',
    theme: 'Immunité et infections respiratoires saisonnières : quels apports de la phytothérapie et des micronutriments ?',
  },
  academyUrl: 'https://www.nutriome.tn',
  contactUrl: 'https://wa.me/21651858560',
  contactLabel: '+216 51 85 85 60',
  websiteLabel: 'www.nutriome.tn',
  handoverUrl: '/presentation?slide=3',
  screens: SCREENS,
}

/** Private moderator notes — stored separately, never sent to /live. */
export interface NoteDef {
  id: string
  label: string
  /** Screen on which this note is suggested */
  screen: ScreenId
  text: string
}

export const DEFAULT_NOTES: NoteDef[] = [
  {
    id: 'welcome',
    label: 'Mot de bienvenue',
    screen: 'welcome',
    text: `Bonsoir à toutes et à tous, et bienvenue à cet EPU scientifique organisé par Nutriome Labs.

Merci de votre présence ce soir. Nous sommes ravis de retrouver les fidèles de nos rencontres, et d’accueillir celles et ceux qui nous rejoignent pour la première fois.

Le thème de ce soir : « Syndrome de l’intestin irritable : quelle place pour les compléments alimentaires ? »`,
  },
  {
    id: 'about',
    label: 'Présentation de Nutriome Labs',
    screen: 'about',
    text: `Quelques mots sur Nutriome Labs : nous sommes un laboratoire tunisien spécialisé dans les compléments alimentaires.

Notre engagement : développer des solutions en micronutrition, avec rigueur scientifique, innovation et qualité, et accompagner au quotidien les professionnels de santé.`,
  },
  {
    id: 'newcomers',
    label: 'Accueil des nouveaux participants',
    screen: 'newcomers',
    text: `Une bienvenue toute particulière aux médecins et professionnels de santé qui nous rejoignent pour la première fois.

N’hésitez pas à vous présenter dans le chat : votre spécialité et votre ville. Nous sommes heureux de faire votre connaissance.`,
  },
  {
    id: 'program',
    label: 'Présentation du programme',
    screen: 'program',
    text: `Voici le déroulement de la soirée :
– l’intervention scientifique du Dr Amin Gasmi ;
– une courte présentation de deux compléments alimentaires par Malek Nabli ;
– la reprise de la conférence ;
– puis un temps de questions et réponses.

Vous pouvez poser vos questions dans le chat tout au long de la soirée.`,
  },
  {
    id: 'speaker',
    label: 'Remerciements au Dr Amin Gasmi',
    screen: 'speaker',
    text: `Nous avons l’honneur d’accueillir ce soir le Dr Amin Gasmi, conférencier international.

Docteur, merci d’avoir accepté notre invitation et de partager votre expertise avec nous.

Nous avons le plaisir de vous donner la parole.`,
  },
  {
    id: 'malek',
    label: 'Transition vers Malek',
    screen: 'malek',
    text: `Merci Docteur pour cette première partie très riche.

De la science à la micronutrition : je donne maintenant la parole à Malek Nabli, qui va vous présenter deux compléments alimentaires Nutriome Labs en lien avec la thématique de ce soir.`,
  },
  {
    id: 'resume',
    label: 'Reprise de la conférence',
    screen: 'speaker',
    text: `Merci Malek.

Nous reprenons maintenant la conférence scientifique. Docteur Gasmi, la parole est à vous.`,
  },
  {
    id: 'qa',
    label: 'Animation des questions-réponses',
    screen: 'qa',
    text: `Place maintenant aux échanges.

Vous pouvez écrire vos questions dans le chat ou lever la main sur Zoom : nous vous donnerons la parole.

(Lire les questions du chat en citant le prénom et la spécialité.)`,
  },
  {
    id: 'closing',
    label: 'Discours de clôture',
    screen: 'thanks',
    text: `Nous arrivons à la fin de cette rencontre.

Un grand merci au Dr Amin Gasmi pour la qualité de son intervention, à Malek Nabli, et à vous tous, professionnels de santé, pour votre présence et votre confiance.

Notre prochain rendez-vous scientifique aura lieu le 8 décembre 2026, sur le thème : « Immunité et infections respiratoires saisonnières : quels apports de la phytothérapie et des micronutriments ? »

Retrouvez Nutriome Academy sur www.nutriome.tn. Excellente soirée à tous.`,
  },
]
