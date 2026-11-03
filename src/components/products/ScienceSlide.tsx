import { diagrams } from '../../data/diagrams'
import type { DiagramId, Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { diagramComponents, ScopeBanner, StepCaptions } from '../scientific'
import { useSlide } from '../presentation/SlideContext'
import { Eyebrow } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'

interface ScienceSlideProps {
  product: Product
  diagram?: DiagramId
  eyebrow?: string
  title?: string
  dark?: boolean
}

/** Progressive scientific diagram with synchronised step captions. */
export function ScienceSlide({ product, diagram, eyebrow, title, dark = false }: ScienceSlideProps) {
  const { l, t } = useI18n()
  const { step, steps, isPrint } = useSlide()
  const id = diagram ?? product.diagram
  const Diagram = diagramComponents[id]
  const shownStep = isPrint ? steps - 1 : step

  return (
    <SlideShell tone={dark ? 'navy' : 'ivory'} accent={product.accent} label={product.name}>
      <Reveal>
        <Eyebrow color={dark ? '#e9c46a' : product.accent}>{eyebrow ?? t.common.mechanisms}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className={`mt-3 ${dark ? 'text-white' : 'text-navy'}`}>{title ?? l(diagrams[id].title)}</SlideTitle>
      </Reveal>
      <div className="mt-6 grid flex-1 items-center gap-6 @4xl:mt-8 @4xl:grid-cols-[1.55fr_1fr] @4xl:gap-12">
        <Reveal delay={0.15} className={`rounded-[28px] p-3 @4xl:p-5 ${dark ? 'bg-white/[0.03] ring-1 ring-white/10' : 'bg-white shadow-[0_30px_70px_-40px_rgb(14_26_43/0.4)]'}`}>
          <Diagram step={shownStep} dark={dark} className="h-auto w-full" />
        </Reveal>
        <Reveal delay={0.25} className="flex flex-col gap-4">
          <StepCaptions id={id} accent={dark ? '#d9a93b' : product.accent} dark={dark} />
          <ScopeBanner id={id} dark={dark} />
        </Reveal>
      </div>
    </SlideShell>
  )
}
