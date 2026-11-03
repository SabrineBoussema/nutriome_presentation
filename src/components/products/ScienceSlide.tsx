import { diagrams } from '../../data/diagrams'
import type { DiagramId, Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { diagramComponents, ScopeBanner, StepCaptions } from '../scientific'
import { TherapeuticSchema, therapeuticSchemas } from '../scientific/TherapeuticSchemas'
import { useSlide } from '../presentation/SlideContext'
import { Eyebrow } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'

interface ScienceSlideProps {
  product: Product
  diagram?: DiagramId
  eyebrow?: string
  title?: string
}

/** Progressive scientific diagram with synchronised step captions. */
export function ScienceSlide({ product, diagram, eyebrow, title }: ScienceSlideProps) {
  const { l, t } = useI18n()
  const { step, steps, isPrint } = useSlide()
  const id = diagram ?? product.diagram
  const Diagram = diagramComponents[id]
  const shownStep = isPrint ? steps - 1 : step

  return (
    <SlideShell accent={product.accent} product={product}>
      <Reveal>
        <Eyebrow color={product.accent}>{eyebrow ?? t.common.mechanisms}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className="mt-3 text-navy">{title ?? l(diagrams[id].title)}</SlideTitle>
      </Reveal>
      <div className="mt-6 grid flex-1 items-center gap-6 @4xl:mt-8 @4xl:grid-cols-[1.55fr_1fr] @4xl:gap-12">
        <Reveal delay={0.15} className="rounded-[28px] bg-white p-3 shadow-[0_30px_70px_-40px_rgb(14_26_43/0.4)] @4xl:p-5">
          <Diagram step={shownStep} className="h-auto w-full" />
        </Reveal>
        <Reveal delay={0.25} className="flex flex-col gap-4">
          <StepCaptions id={id} accent={product.accent} />
          <ScopeBanner id={id} />
        </Reveal>
      </div>
    </SlideShell>
  )
}

/** Illustrative therapeutic schema; products without one fall back to their SVG diagram, fully built. */
export function IllustrationSlide({ product }: { product: Product }) {
  const { t } = useI18n()
  const Diagram = diagramComponents[product.diagram]
  const last = diagrams[product.diagram].steps.length - 1

  return (
    <SlideShell accent={product.accent} product={product}>
      <Reveal>
        <SlideTitle className="text-navy">{t.common.schema}</SlideTitle>
      </Reveal>
      {therapeuticSchemas[product.id] ? (
        // Absolutely positioned so the 1600 × 720 canvas always fits the space left under the title
        <div className="relative mt-4 min-h-[45vw] flex-1 @4xl:min-h-0">
          <TherapeuticSchema product={product} className="absolute inset-0 size-full" />
        </div>
      ) : (
        <Reveal delay={0.12} className="mt-5 flex flex-1 items-center justify-center">
          <div className="w-full max-w-[1150px] rounded-[28px] bg-white p-3 shadow-[0_30px_70px_-40px_rgb(14_26_43/0.4)] @4xl:p-5">
            <Diagram step={last} className="h-auto w-full" />
          </div>
        </Reveal>
      )}
    </SlideShell>
  )
}
