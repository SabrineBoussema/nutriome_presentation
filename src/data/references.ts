import type { Reference } from './types'

/**
 * Central bibliography. Products and mechanisms cite these by `id`.
 * Entries marked "blog" in comments are those already cited on nutriome.tn/blog.
 */
const list: Reference[] = [
  // --- Regulatory -------------------------------------------------------
  {
    id: 'eu-432-2012',
    authors: 'European Commission',
    year: 2012,
    title: 'Regulation (EU) No 432/2012 establishing a list of permitted health claims made on foods',
    source: 'Official Journal of the European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj',
  },
  {
    id: 'eu-1169-2011',
    authors: 'European Parliament and Council',
    year: 2011,
    title: 'Regulation (EU) No 1169/2011 on the provision of food information to consumers (Annex XIII: nutrient reference values)',
    source: 'Official Journal of the European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2011/1169/oj',
  },
  {
    id: 'eu-2022-860',
    authors: 'European Commission',
    year: 2022,
    title: 'Regulation (EU) 2022/860 amending Annex III to Regulation (EC) No 1925/2006 as regards monacolins from red yeast rice',
    source: 'Official Journal of the European Union',
    url: 'https://eur-lex.europa.eu/eli/reg/2022/860/oj',
  },

  // --- Coenzyme Q10 (blog) ----------------------------------------------
  {
    id: 'nccih-coq10',
    authors: 'National Center for Complementary and Integrative Health',
    year: 2019,
    title: 'Coenzyme Q10',
    source: 'NCCIH',
    url: 'https://www.nccih.nih.gov/health/coenzyme-q10',
  },
  {
    id: 'rich-2010',
    authors: 'Rich PR, Maréchal A',
    year: 2010,
    title: 'The mitochondrial respiratory chain',
    source: 'Essays in Biochemistry',
    doi: '10.1042/bse0470001',
    url: 'https://doi.org/10.1042/bse0470001',
  },
  {
    id: 'marcoff-2007',
    authors: 'Marcoff L, Thompson PD',
    year: 2007,
    title: 'The role of coenzyme Q10 in statin-associated myopathy: a systematic review',
    source: 'Journal of the American College of Cardiology',
    doi: '10.1016/j.jacc.2006.12.049',
    url: 'https://doi.org/10.1016/j.jacc.2006.12.049',
  },
  {
    id: 'qu-2018',
    authors: 'Qu H, Guo M, Chai H, et al.',
    year: 2018,
    title: 'Effects of coenzyme Q10 on statin-induced myopathy: an updated meta-analysis of randomized controlled trials',
    source: 'Journal of the American Heart Association',
    doi: '10.1161/JAHA.118.009835',
    url: 'https://doi.org/10.1161/JAHA.118.009835',
  },
  {
    id: 'bentinger-2007',
    authors: 'Bentinger M, Brismar K, Dallner G',
    year: 2007,
    title: 'The antioxidant role of coenzyme Q',
    source: 'Mitochondrion',
    doi: '10.1016/j.mito.2007.02.006',
    url: 'https://doi.org/10.1016/j.mito.2007.02.006',
  },

  // --- Magnesium (blog + EFSA) -------------------------------------------
  {
    id: 'ods-magnesium',
    authors: 'NIH Office of Dietary Supplements',
    year: 2022,
    title: 'Magnesium — Fact Sheet for Health Professionals',
    source: 'NIH ODS',
    url: 'https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/',
  },
  {
    id: 'efsa-magnesium-2010',
    authors: 'EFSA Panel on Dietetic Products, Nutrition and Allergies',
    year: 2010,
    title: 'Scientific Opinion on the substantiation of health claims related to magnesium (incl. reduction of tiredness and fatigue, electrolyte balance, energy-yielding metabolism)',
    source: 'EFSA Journal',
    doi: '10.2903/j.efsa.2010.1807',
    url: 'https://doi.org/10.2903/j.efsa.2010.1807',
  },
  {
    id: 'debaaij-2015',
    authors: 'de Baaij JHF, Hoenderop JGJ, Bindels RJM',
    year: 2015,
    title: 'Magnesium in man: implications for health and disease',
    source: 'Physiological Reviews',
    doi: '10.1152/physrev.00012.2014',
    url: 'https://doi.org/10.1152/physrev.00012.2014',
  },

  // --- Berberine (blog) --------------------------------------------------
  {
    id: 'nccih-diabetes',
    authors: 'National Center for Complementary and Integrative Health',
    year: 2023,
    title: 'Diabetes and Dietary Supplements: What You Need To Know',
    source: 'NCCIH',
    url: 'https://www.nccih.nih.gov/health/diabetes-and-dietary-supplements-what-you-need-to-know',
  },
  {
    id: 'zhao-2023',
    authors: 'Zhao JV, Huang X, Zhang J, et al.',
    year: 2023,
    title: 'Overall and sex-specific effect of berberine on glycemic and insulin-related traits: a systematic review and meta-analysis of randomized controlled trials',
    source: 'The Journal of Nutrition',
    doi: '10.1016/j.tjnut.2023.08.016',
    url: 'https://doi.org/10.1016/j.tjnut.2023.08.016',
  },
  {
    id: 'liu-2025',
    authors: 'Liu D, Zhao H, Zhang Y, Hu J, Xu H',
    year: 2025,
    title: 'Efficacy and safety of berberine on the components of metabolic syndrome: a systematic review and meta-analysis of randomized placebo-controlled trials',
    source: 'Frontiers in Pharmacology',
    doi: '10.3389/fphar.2025.1572197',
    url: 'https://doi.org/10.3389/fphar.2025.1572197',
  },
  {
    id: 'lee-2006',
    authors: 'Lee YS, Kim WS, Kim KH, et al.',
    year: 2006,
    title: 'Berberine, a natural plant product, activates AMP-activated protein kinase with beneficial metabolic effects in diabetic and insulin-resistant states',
    source: 'Diabetes',
    doi: '10.2337/db06-0006',
    url: 'https://doi.org/10.2337/db06-0006',
  },

  // --- Zinc carnosine (blog) --------------------------------------------
  {
    id: 'efthymakis-2022',
    authors: 'Efthymakis K, Neri M',
    year: 2022,
    title: 'The role of Zinc L-Carnosine in the prevention and treatment of gastrointestinal mucosal disease in humans: a review',
    source: 'Clinics and Research in Hepatology and Gastroenterology',
    doi: '10.1016/j.clinre.2022.101954',
    url: 'https://doi.org/10.1016/j.clinre.2022.101954',
  },
  {
    id: 'mahmood-2007',
    authors: 'Mahmood A, FitzGerald AJ, Marchbank T, et al.',
    year: 2007,
    title: 'Zinc carnosine, a health food supplement that stabilises small bowel integrity and stimulates gut repair processes',
    source: 'Gut',
    doi: '10.1136/gut.2006.099929',
    url: 'https://doi.org/10.1136/gut.2006.099929',
  },
  {
    id: 'ods-zinc',
    authors: 'NIH Office of Dietary Supplements',
    year: 2022,
    title: 'Zinc — Fact Sheet for Health Professionals',
    source: 'NIH ODS',
    url: 'https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/',
  },
  {
    id: 'efsa-zinc-carnosine-2022',
    authors: 'EFSA Panel on Nutrition, Novel Foods and Food Allergens',
    year: 2022,
    title: 'Safety of zinc L-carnosine as a novel food pursuant to Regulation (EU) 2015/2283',
    source: 'EFSA Journal',
    doi: '10.2903/j.efsa.2022.7332',
    url: 'https://doi.org/10.2903/j.efsa.2022.7332',
  },

  // --- Vitamin D / K (blog) ---------------------------------------------
  {
    id: 'ods-vitamin-d',
    authors: 'NIH Office of Dietary Supplements',
    year: 2024,
    title: 'Vitamin D — Fact Sheet for Health Professionals',
    source: 'NIH ODS',
    url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/',
  },
  {
    id: 'ods-vitamin-k',
    authors: 'NIH Office of Dietary Supplements',
    year: 2021,
    title: 'Vitamin K — Fact Sheet for Health Professionals',
    source: 'NIH ODS',
    url: 'https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/',
  },
  {
    id: 'holick-2007',
    authors: 'Holick MF',
    year: 2007,
    title: 'Vitamin D deficiency',
    source: 'New England Journal of Medicine',
    doi: '10.1056/NEJMra070553',
    url: 'https://doi.org/10.1056/NEJMra070553',
  },
  {
    id: 'manson-2019',
    authors: 'Manson JE, Cook NR, Lee IM, et al.',
    year: 2019,
    title: 'Vitamin D supplements and prevention of cancer and cardiovascular disease (VITAL)',
    source: 'New England Journal of Medicine',
    doi: '10.1056/NEJMoa1809944',
    url: 'https://doi.org/10.1056/NEJMoa1809944',
  },
  {
    id: 'efsa-vitamin-d-2009',
    authors: 'EFSA Panel on Dietetic Products, Nutrition and Allergies',
    year: 2009,
    title: 'Scientific Opinion on the substantiation of health claims related to vitamin D',
    source: 'EFSA Journal',
    doi: '10.2903/j.efsa.2009.1227',
    url: 'https://doi.org/10.2903/j.efsa.2009.1227',
  },

  // --- Immunity (blog) ---------------------------------------------------
  {
    id: 'nccih-echinacea',
    authors: 'National Center for Complementary and Integrative Health',
    year: 2024,
    title: 'Echinacea: usefulness and safety',
    source: 'NCCIH',
    url: 'https://www.nccih.nih.gov/health/echinacea',
  },
  {
    id: 'karsch-volk-2014',
    authors: 'Karsch-Völk M, Barrett B, Kiefer D, et al.',
    year: 2014,
    title: 'Echinacea for preventing and treating the common cold',
    source: 'Cochrane Database of Systematic Reviews',
    doi: '10.1002/14651858.CD000530.pub3',
    url: 'https://doi.org/10.1002/14651858.CD000530.pub3',
  },
  {
    id: 'mskcc-reishi',
    authors: 'Memorial Sloan Kettering Cancer Center',
    year: 2023,
    title: 'Reishi mushroom',
    source: 'MSKCC — About Herbs',
    url: 'https://www.mskcc.org/cancer-care/integrative-medicine/herbs/reishi-mushroom',
  },

  // --- Blood pressure / potassium ---------------------------------------
  {
    id: 'ods-potassium',
    authors: 'NIH Office of Dietary Supplements',
    year: 2022,
    title: 'Potassium — Fact Sheet for Health Professionals',
    source: 'NIH ODS',
    url: 'https://ods.od.nih.gov/factsheets/Potassium-HealthProfessional/',
  },
  {
    id: 'lockyer-2017',
    authors: 'Lockyer S, Rowland I, Spencer JPE, Yaqoob P, Stonehouse W',
    year: 2017,
    title: 'Impact of phenolic-rich olive leaf extract on blood pressure, plasma lipids and inflammatory markers: a randomised controlled trial',
    source: 'European Journal of Nutrition',
    doi: '10.1007/s00394-016-1188-y',
    url: 'https://doi.org/10.1007/s00394-016-1188-y',
  },
]

export const references: Record<string, Reference> = Object.fromEntries(list.map((r) => [r.id, r]))

export function getReferences(ids: string[]): Reference[] {
  return ids.map((id) => references[id]).filter((r): r is Reference => Boolean(r))
}
