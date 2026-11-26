/**
 * EventConfiguration — tout le contenu d'un EPU Nutriome Labs.
 * Modifiable depuis /admin (persisté dans le navigateur) ; ces valeurs sont les valeurs par défaut.
 * Pour un prochain EPU : modifier depuis /admin → « Événement », ou exporter / importer le JSON.
 */
import gasmiPortrait from '../assets/conference/dr-amin-gasmi.jpg'

export const DEFAULT_PORTRAIT = gasmiPortrait

export type ScreenId =
  | 'welcome'
  | 'theme'
  | 'about'
  | 'vision'
  | 'collaborate'
  | 'academy'
  | 'program'
  | 'speaker'
  | 'malek'
  | 'resume'
  | 'qa'
  | 'thanks'
  | 'next'
  | 'range'
  | 'newcomers'
  | 'break'

export type Phase = 'A' | 'B' | 'C' | 'X'

export interface ScreenDef {
  id: ScreenId
  label: string
  /** B = introduction officielle, C = modération scientifique, X = écran d'appoint */
  phase: Phase
  /** Shown in the automatic waiting loop (phase A) */
  loop: boolean
  /** Seconds on screen in the waiting loop */
  duration: number
}

export interface ProgramItem {
  title: string
  speaker: string
}

export interface EventConfig {
  version: 3
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
  /** Opened in the projection window by « Présentation produits » */
  handoverUrl: string
  /** Screen definitions, in manual running order (phases B then C) */
  screens: ScreenDef[]
  /** Order of the waiting loop (phase A) */
  loopOrder: ScreenId[]
}

/** Manual order = phase B (introduction) then phase C (modération). */
export const SCREENS: ScreenDef[] = [
  { id: 'welcome', label: 'Mot de bienvenue', phase: 'B', loop: true, duration: 22 },
  { id: 'about', label: 'Qui sommes-nous ?', phase: 'B', loop: true, duration: 18 },
  { id: 'vision', label: 'Mission et vision', phase: 'B', loop: true, duration: 16 },
  { id: 'collaborate', label: 'Relation avec les professionnels de santé', phase: 'B', loop: true, duration: 18 },
  { id: 'academy', label: 'Nutriome Academy', phase: 'X', loop: false, duration: 18 },
  { id: 'theme', label: 'Thématique scientifique', phase: 'B', loop: true, duration: 18 },
  { id: 'program', label: 'Programme de la soirée', phase: 'B', loop: false, duration: 18 },
  { id: 'speaker', label: 'Dr Amin Gasmi', phase: 'B', loop: false, duration: 18 },
  { id: 'malek', label: 'Présentation de Malek', phase: 'C', loop: false, duration: 18 },
  { id: 'resume', label: 'Reprise de la conférence', phase: 'C', loop: false, duration: 18 },
  { id: 'qa', label: 'Questions-réponses', phase: 'C', loop: false, duration: 18 },
  { id: 'thanks', label: 'Remerciements', phase: 'C', loop: false, duration: 18 },
  { id: 'next', label: 'Prochain rendez-vous', phase: 'C', loop: false, duration: 18 },
  { id: 'range', label: 'Notre gamme', phase: 'X', loop: true, duration: 22 },
  { id: 'newcomers', label: 'Présentez-vous dans le chat', phase: 'X', loop: false, duration: 16 },
  { id: 'break', label: 'Courte pause', phase: 'X', loop: false, duration: 18 },
]

/** Phase A — boucle d'attente */
export const LOOP_ORDER: ScreenId[] = ['welcome', 'theme', 'about', 'vision', 'range', 'collaborate']

export const DEFAULT_EVENT: EventConfig = {
  version: 3,
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
  contactUrl: 'tel:+21651858560',
  contactLabel: '+216 51 85 85 60',
  websiteLabel: 'www.nutriome.tn',
  handoverUrl: '/presentation?slide=3',
  screens: SCREENS,
  loopOrder: LOOP_ORDER,
}

