import type { L } from './types'

/** Corporate content — taken from https://www.nutriome.tn (audit of 3 Nov 2026). */
export const company = {
  name: 'Nutriome Labs',
  motto: { fr: 'Science • Micronutrition • Innovation', en: 'Science • Micronutrition • Innovation' } as L,
  signature: { fr: 'La science au service de votre santé', en: 'Science in the service of your health' } as L,
  founded: 2024,
  location: { fr: 'Ksibet El Mediouni, Monastir — Tunisie', en: 'Ksibet El Mediouni, Monastir — Tunisia' } as L,
  website: 'https://www.nutriome.tn',
  websiteLabel: 'www.nutriome.tn',
  blog: 'https://www.nutriome.tn/blog',
  email: 'nutriome.labs@gmail.com',
  phone: '+216 51 85 85 60',
  intro: {
    fr: 'Nutriome Labs développe des compléments alimentaires formulés avec une approche scientifique et distribués à travers les professionnels de santé.',
    en: 'Nutriome Labs develops food supplements formulated with a scientific approach and distributed through healthcare professionals.',
  } as L,
  vision: {
    fr: 'Une micronutrition scientifique, pensée pour les besoins de santé en Tunisie.',
    en: 'Science-based micronutrition, designed for health needs in Tunisia.',
  } as L,
  mission: {
    fr: 'Développer des solutions fondées sur la science, la qualité et la confiance, en lien étroit avec les pharmaciens, médecins et nutritionnistes.',
    en: 'To develop solutions grounded in science, quality and trust, working closely with pharmacists, physicians and nutritionists.',
  } as L,
  pillars: [
    {
      icon: 'flask',
      title: { fr: 'Expertise scientifique', en: 'Scientific expertise' },
      body: {
        fr: 'Des formules construites autour d’actifs reconnus, sélectionnés pour leur qualité.',
        en: 'Formulas built around recognised actives, selected for their quality.',
      },
    },
    {
      icon: 'shield',
      title: { fr: 'Qualité & traçabilité', en: 'Quality & traceability' },
      body: {
        fr: 'Une exigence de traçabilité et de contrôle qualité à chaque étape.',
        en: 'Traceability and quality control at every step.',
      },
    },
    {
      icon: 'stethoscope',
      title: { fr: 'Proximité médicale', en: 'Close to healthcare' },
      body: {
        fr: 'Une marque présente auprès des pharmaciens, médecins et grossistes en Tunisie.',
        en: 'A brand working with pharmacists, physicians and wholesalers across Tunisia.',
      },
    },
    {
      icon: 'book',
      title: { fr: 'Communication scientifique', en: 'Scientific communication' },
      body: {
        fr: 'Des articles référencés qui distinguent la physiologie établie de ce que les essais ne démontrent pas encore.',
        en: 'Referenced articles that separate established physiology from what trials have not yet shown.',
      },
    },
  ] as { icon: 'flask' | 'shield' | 'stethoscope' | 'book'; title: L; body: L }[],
}
