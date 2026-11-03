/**
 * Nutrient reference values for adults, in mg (Regulation (EU) No 1169/2011, Annex XIII).
 * Used to show "% VNR" next to declared quantities. Only nutrients with an official NRV belong here.
 */
export const NRV_MG = {
  B1: 1.1,
  B2: 1.4,
  B3: 16,
  B5: 6,
  B12: 0.0025,
  D: 0.005,
  Mg: 375,
  Zn: 10,
  Cr: 0.04,
} as const

export type NrvKey = keyof typeof NRV_MG

/** % of the NRV for a quantity expressed in mg, rounded to the nearest whole percent */
export function nrvPercent(key: NrvKey, quantityMg: number): number {
  return Math.round((quantityMg / NRV_MG[key]) * 100)
}
