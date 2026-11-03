import { FlaskConical, Info } from 'lucide-react'
import type { ComponentType } from 'react'
import { diagrams } from '../../data/diagrams'
import type { DiagramId } from '../../data/types'
import { useI18n } from '../../i18n'
import { useSlide } from '../presentation/SlideContext'
import type { DiagramProps } from './DiagramKit'
import { ElectronTransportDiagram } from './ElectronTransportDiagram'
import { GastricMucosaDiagram } from './GastricMucosaDiagram'
import { GlucoseAmpkDiagram } from './GlucoseAmpkDiagram'
import { ImmuneBarrierDiagram } from './ImmuneBarrierDiagram'
import { MagnesiumAtpDiagram } from './MagnesiumAtpDiagram'
import { MitochondrionDiagram } from './MitochondrionDiagram'
import { VascularDiagram } from './VascularDiagram'
import { VitaminDDiagram } from './VitaminDDiagram'

export const diagramComponents: Record<DiagramId, ComponentType<DiagramProps>> = {
  mitochondria: MitochondrionDiagram,
  'electron-transport': ElectronTransportDiagram,
  'magnesium-atp': MagnesiumAtpDiagram,
  'glucose-ampk': GlucoseAmpkDiagram,
  'gastric-mucosa': GastricMucosaDiagram,
  'vitamin-d': VitaminDDiagram,
  'immune-barrier': ImmuneBarrierDiagram,
  vascular: VascularDiagram,
}

/** The diagram's scope disclaimer — general biology vs preclinical. */
export function ScopeBanner({ id, dark = false }: { id: DiagramId; dark?: boolean }) {
  const { t } = useI18n()
  const meta = diagrams[id]
  const Icon = meta.scope === 'preclinical' ? FlaskConical : Info
  return (
    <div
      className={`flex items-start gap-2 rounded-xl px-3 py-2 text-xs @4xl:text-[17px] leading-snug ${
        dark ? 'bg-white/8 text-white/75' : 'bg-navy/[0.04] text-slate'
      }`}
    >
      <Icon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      {meta.scope === 'preclinical' ? t.common.preclinical : t.common.generalBiology}
    </div>
  )
}

/** Step-by-step captions; the current step is highlighted. Clicking a caption is handled by the deck. */
export function StepCaptions({ id, accent, dark = false }: { id: DiagramId; accent: string; dark?: boolean }) {
  const { l, t } = useI18n()
  const { step, isPrint } = useSlide()
  const meta = diagrams[id]
  return (
    <ol className="flex flex-col gap-1.5 @4xl:gap-2">
      {meta.steps.map((caption, i) => {
        const active = isPrint || i === step
        const done = i <= step || isPrint
        return (
          <li
            key={i}
            className={`flex gap-3 rounded-2xl px-3 py-2 transition-all duration-500 @4xl:px-4 @4xl:py-2.5 ${
              active && !isPrint ? (dark ? 'bg-white/10' : 'bg-white shadow-[0_8px_30px_-12px_rgb(14_26_43/0.25)]') : ''
            }`}
            style={{ opacity: done ? 1 : 0.35 }}
          >
            <span
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: done ? accent : dark ? 'rgb(255 255 255 / 0.25)' : '#b9c0c8' }}
              aria-label={`${t.common.step} ${i + 1}`}
            >
              {i + 1}
            </span>
            <span className={`text-sm leading-snug ${meta.steps.length > 4 ? '@4xl:text-[18px]' : '@4xl:text-[21px]'} ${dark ? 'text-white/90' : 'text-ink'}`}>{l(caption)}</span>
          </li>
        )
      })}
    </ol>
  )
}
