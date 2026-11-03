import type { IngredientVisual } from '../../data/ingredientVisuals'
import { useI18n } from '../../i18n'
import { BisglycinateMolecule, CitrateMolecule, MalateMolecule } from '../scientific/molecules/MagnesiumForms'

const MOLECULES = { bisglycinate: BisglycinateMolecule, malate: MalateMolecule, citrate: CitrateMolecule }

/** Square illustration in the corner of a composition card. */
export function IngredientThumb({ visual, accent, accentSoft, className = '' }: { visual: IngredientVisual; accent: string; accentSoft: string; className?: string }) {
  const { l } = useI18n()
  const frame = `overflow-hidden rounded-2xl ${className}`

  switch (visual.kind) {
    case 'photo':
      return (
        <div className={`${frame} shadow-[0_10px_24px_-14px_rgb(14_26_43/0.6)] ring-1 ring-black/5`}>
          <img src={visual.src} alt={l(visual.alt)} title={l(visual.alt)} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
      )
    case 'structure':
      return (
        <div className={`${frame} border border-navy/[0.06] bg-white p-1.5`}>
          <img src={visual.src} alt={l(visual.alt)} title={l(visual.alt)} className="h-full w-full object-contain" loading="lazy" draggable={false} />
        </div>
      )
    case 'molecule': {
      const Molecule = MOLECULES[visual.id]
      return (
        <div className={`${frame} flex items-center justify-center border border-navy/[0.06] bg-white`}>
          <Molecule className="h-full w-full" />
        </div>
      )
    }
    case 'ion':
      return (
        <div className={`${frame} flex items-center justify-center`} style={{ background: accentSoft }}>
          <div
            className="flex aspect-square w-[72%] items-center justify-center rounded-full font-bold text-white shadow-[inset_-6px_-8px_14px_rgb(0_0_0/0.18),inset_6px_6px_12px_rgb(255_255_255/0.35)]"
            style={{ background: `radial-gradient(circle at 35% 30%, ${accent}aa, ${accent})`, fontSize: visual.label.length > 3 ? '1.25em' : '1.5em' }}
          >
            {visual.label}
          </div>
        </div>
      )
    case 'monogram':
      return (
        <div className={`${frame} flex items-center justify-center font-serif font-semibold`} style={{ background: accentSoft, color: accent, fontSize: visual.label.length > 2 ? '1.9em' : '2.3em' }}>
          {visual.label}
        </div>
      )
  }
}
