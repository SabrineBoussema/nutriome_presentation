/**
 * Discours de la modératrice — privés : affichés uniquement dans /admin, jamais transmis à /live.
 * Syntaxe : **phrase importante** (surlignée) ; indications orales entre crochets :
 * [sourire] [pause] [caméra] [remercier] [respirer] [regarder le chat].
 * Aucun titre, étude, certification ou allégation n'est inventé : seuls les éléments du programme sont cités.
 */
import type { ScreenId } from './eventConfig'

export interface NoteDef {
  id: string
  label: string
  /** Screen this speech accompanies (followed automatically) */
  screen?: ScreenId
  group: 'screen' | 'backup' | 'questions'
  text: string
}

export const DEFAULT_NOTES: NoteDef[] = [
  {
    id: 'welcome',
    screen: 'welcome',
    group: 'screen',
    label: 'Mot de bienvenue',
    text: `[sourire] [caméra]
Bonsoir à toutes et à tous, et **bienvenue à cet EPU scientifique de Nutriome Labs.**

[pause]
Avant tout, merci. Merci d'avoir choisi de nous consacrer votre soirée, après des journées que l'on sait bien remplies. **Votre présence nous touche, sincèrement.**

Je salue chaleureusement celles et ceux qui nous suivent depuis nos premières rencontres. [sourire]
Et j'adresse **une bienvenue toute particulière aux médecins et aux professionnels de santé qui nous rejoignent pour la première fois ce soir.** Nous sommes très heureux de vous compter parmi nous.

[pause]
Je vous invite d'ailleurs à vous présenter dans le chat : votre spécialité et votre ville. [regarder le chat]
C'est toujours un plaisir de savoir qui est avec nous.`,
  },
  {
    id: 'about',
    screen: 'about',
    group: 'screen',
    label: 'Qui sommes-nous ?',
    text: `[caméra]
Pour celles et ceux qui nous découvrent, quelques mots sur nous.

**Nutriome Labs est un laboratoire tunisien, spécialisé dans les compléments alimentaires.**
Nous développons des solutions en micronutrition, et nous avons à cœur d'accompagner scientifiquement les professionnels de santé.

[pause]
Ce qui nous guide au quotidien tient en quelques mots : **la rigueur scientifique, l'innovation, la qualité**, et surtout **la collaboration avec vous**, professionnels de santé.`,
  },
  {
    id: 'vision',
    screen: 'vision',
    group: 'screen',
    label: 'Mission et vision',
    text: `Notre mission, nous la résumons en trois verbes.

**Innover** : développer des formulations qui répondent à de vrais besoins nutritionnels.
[pause]
**Accompagner** : mettre à votre disposition des informations et des ressources scientifiques claires.
[pause]
**Partager** : favoriser la formation continue et les échanges entre professionnels.

[sourire]
Et c'est exactement le sens de la soirée de ce soir.`,
  },
  {
    id: 'collaborate',
    screen: 'collaborate',
    group: 'screen',
    label: 'Relation avec les professionnels de santé',
    text: `[caméra]
Pour nous, la relation avec les professionnels de santé ne se limite pas à un produit.

**C'est d'abord une relation d'écoute et de confiance.**
Vos retours de terrain, vos questions, vos expériences : c'est ce qui nous fait avancer.

[pause]
Nous sommes ouverts à **de nouvelles collaborations**, et vous pouvez nous contacter à tout moment : le QR code à l'écran vous donne nos coordonnées.

[sourire]
Ensemble, faisons avancer une micronutrition fondée sur la science, l'écoute et le partage.`,
  },
  {
    id: 'academy',
    screen: 'academy',
    group: 'screen',
    label: 'Nutriome Academy',
    text: `Au-delà des produits, nous avons voulu créer un véritable espace d'échange : **Nutriome Academy.**

C'est un espace dédié aux professionnels de santé : des EPU comme celui de ce soir, des masterclasses, des conférences avec des experts, des replays des interventions.

[pause]
**Vous pouvez y accéder en scannant le QR code à l'écran**, ou sur www.nutriome.tn.`,
  },
  {
    id: 'theme',
    screen: 'theme',
    group: 'screen',
    label: 'Thématique scientifique',
    text: `[respirer]
J'en viens maintenant au cœur de notre soirée.

Le thème de ce soir : **« Syndrome de l'intestin irritable : quelle place pour les compléments alimentaires ? »**

[pause]
C'est un sujet que vous rencontrez au quotidien dans vos consultations et à l'officine, et sur lequel les questions sont nombreuses.
Nous avons la chance de l'aborder ce soir avec un expert.`,
  },
  {
    id: 'program',
    screen: 'program',
    group: 'screen',
    label: 'Programme de la soirée',
    text: `Voici comment va se dérouler notre soirée.

**Le Dr Amin Gasmi ouvrira la partie scientifique.**
Ensuite, **Malek Nabli vous présentera brièvement deux compléments alimentaires Nutriome Labs**, en lien avec la thématique.
Le Dr Gasmi reprendra alors la parole pour la suite de son intervention.

[pause]
Nous terminerons par **un temps de questions-réponses.**
N'hésitez pas à écrire vos questions dans le chat tout au long de la soirée : nous les garderons pour la fin. [regarder le chat]`,
  },
  {
    id: 'speaker',
    screen: 'speaker',
    group: 'screen',
    label: 'Présentation du Dr Amin Gasmi',
    text: `[sourire] [caméra]
J'ai maintenant le grand plaisir d'accueillir notre conférencier de ce soir : **le Dr Amin Gasmi, conférencier international.**

[remercier]
Docteur, **merci de tout cœur d'avoir accepté notre invitation**, et de prendre le temps de partager votre expertise avec nous.

[pause]
**Docteur Gasmi, nous vous donnons la parole.**`,
  },
  {
    id: 'malek',
    screen: 'malek',
    group: 'screen',
    label: 'Transition vers Malek',
    text: `[remercier]
**Merci beaucoup Docteur** pour cette première partie, très riche.

[pause]
De la science à la micronutrition : je vais maintenant laisser la parole à **Malek Nabli**, qui va vous présenter **deux compléments alimentaires Nutriome Labs**, en lien avec la thématique de ce soir.

Malek, à vous. [sourire]

(Après l'écran : cliquer sur « Présentation produits ».)`,
  },
  {
    id: 'resume',
    screen: 'resume',
    group: 'screen',
    label: 'Reprise de la conférence',
    text: `[remercier]
**Merci Malek** pour cette présentation.

[pause]
Nous reprenons maintenant le fil de la conférence scientifique.
**Docteur Gasmi, la parole est à nouveau à vous.**`,
  },
  {
    id: 'qa',
    screen: 'qa',
    group: 'screen',
    label: 'Questions-réponses',
    text: `[remercier] [sourire]
**Merci Docteur** pour cette intervention passionnante.

Place maintenant aux échanges.
**Vos questions, vos expériences et vos réflexions enrichissent cette rencontre.**

[pause]
Vous pouvez écrire dans le chat, ou lever la main sur Zoom : nous vous donnerons la parole. [regarder le chat]

(Lire les questions en citant le prénom et la spécialité. Si le chat est calme : voir « Questions préparées ».)`,
  },
  {
    id: 'thanks',
    screen: 'thanks',
    group: 'screen',
    label: 'Remerciements',
    text: `[respirer] [caméra]
Nous arrivons à la fin de notre rencontre.

[remercier]
**Un immense merci au Dr Amin Gasmi**, pour la qualité de son intervention et la générosité de ses réponses.
Merci à **Malek Nabli** pour sa présentation.

[pause]
Et surtout, **merci à vous tous**, professionnels de santé, pour votre présence, votre attention et la richesse de vos questions.
À celles et ceux qui nous ont rejoints pour la première fois : **nous espérons vous retrouver très vite.** [sourire]`,
  },
  {
    id: 'next',
    screen: 'next',
    group: 'screen',
    label: 'Prochain rendez-vous',
    text: `Avant de nous quitter, notez déjà notre prochain rendez-vous scientifique :

**le 8 décembre 2026**, sur le thème :
**« Immunité et infections respiratoires saisonnières : quels apports de la phytothérapie et des micronutriments ? »**

[pause]
Retrouvez toutes nos rencontres sur www.nutriome.tn.

[sourire] [caméra]
Merci encore, et **excellente soirée à toutes et à tous.**`,
  },
  {
    id: 'range',
    screen: 'range',
    group: 'screen',
    label: 'Notre gamme',
    text: `(Écran de la boucle d'attente.)
Si besoin : « Vous découvrez à l'écran notre gamme de compléments alimentaires. Toutes les informations sont disponibles sur www.nutriome.tn. »`,
  },
  {
    id: 'newcomers',
    screen: 'newcomers',
    group: 'screen',
    label: 'Présentez-vous dans le chat',
    text: `[regarder le chat] [sourire]
« N'hésitez pas à vous présenter dans le chat : votre spécialité et votre ville. Bienvenue à chacun d'entre vous ! »

(Saluer quelques participants par leur prénom et leur ville.)`,
  },
  {
    id: 'break',
    screen: 'break',
    group: 'screen',
    label: 'Courte pause',
    text: `« Nous faisons une courte pause, nous reprenons dans quelques instants. Merci de rester avec nous. » [sourire]`,
  },
  {
    id: 'backup-delay',
    group: 'backup',
    label: 'Secours : retard du conférencier',
    text: `[sourire] [caméra]
« Merci de votre patience. **Nous attendons encore quelques participants et notre conférencier**, nous commençons dans quelques instants.

En attendant, je vous invite à vous présenter dans le chat : votre spécialité et votre ville. »

(Afficher « Présentez-vous dans le chat » ou relancer la boucle d'attente. Prévenir Malek qu'il peut passer en premier si le retard dépasse 10 minutes.)`,
  },
  {
    id: 'backup-tech',
    group: 'backup',
    label: 'Secours : problème technique',
    text: `[respirer] [sourire]
« Nous rencontrons **un petit souci technique**, merci de rester avec nous, nous revenons très vite. »

Réflexes :
– Appuyer sur B (écran noir) si l'image pose problème.
– Son coupé : vérifier le micro dans Zoom, demander au chat « Est-ce que vous m'entendez ? ».
– Partage d'écran perdu : repartager la fenêtre /live (F pour le plein écran).
– Connexion du conférencier coupée : afficher « Courte pause » et le rappeler.`,
  },
  {
    id: 'backup-time',
    group: 'backup',
    label: 'Secours : temps dépassé',
    text: `[sourire]
« Le temps passe vite en si bonne compagnie ! Nous allons prendre **deux dernières questions**, puis nous conclurons. Les questions restantes pourront nous être envoyées par e-mail à nutriome.labs@gmail.com, nous les transmettrons au Dr Gasmi. »`,
  },
  {
    id: 'questions',
    group: 'questions',
    label: 'Questions préparées',
    text: `Pour lancer la discussion si le chat est calme :

1. « Docteur, en pratique, **comment orientez-vous le choix d'un complément alimentaire** chez un patient qui souffre du syndrome de l'intestin irritable ? »
[pause]
2. « Quelle place donnez-vous aux **mesures hygiéno-diététiques** avant ou à côté des compléments alimentaires ? »
[pause]
3. « Au comptoir, **quels signes doivent amener le pharmacien à orienter vers un médecin** plutôt que de conseiller un complément ? »
[pause]
4. « Combien de temps conseillez-vous d'attendre avant d'**évaluer si une approche est utile** pour le patient ? »
[pause]
5. « Quels sont, selon vous, **les points sur lesquels la recherche doit encore progresser** dans ce domaine ? »`,
  },
]
