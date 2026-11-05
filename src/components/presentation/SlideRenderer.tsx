import { getProduct } from '../../data/products'
import type { SlideDef } from '../../data/presentation'
import { useI18n } from '../../i18n'
import { MagMoleculesSlide, MagPillarsSlide } from '../products/bio3mag/Bio3MagSlides'
import { Q10HighlightsSlide } from '../products/coq10/Q10HighlightsSlide'
import { Q10RevealSlide } from '../products/coq10/Q10RevealSlide'
import { CompositionSlide } from '../products/CompositionSlide'
import { DifferentiationSlide, FormulationSlide, IndicationsSlide } from '../products/DifferentiationSlide'
import { PracticalSlide, SafetySlide } from '../products/PracticalSlide'
import { ProductHeroSlide } from '../products/ProductHeroSlide'
import { ReferencesSlide } from '../products/ReferencesSlide'
import { IllustrationSlide, ScienceSlide } from '../products/ScienceSlide'
import { ClosingSlide as DirectionClosingSlide } from '../direction/ClosingSlide'
import { ProgramSlide } from '../direction/ProgramSlide'
import { WelcomeSlide } from '../direction/WelcomeSlide'
import { AboutSlide } from './slides/AboutSlide'
import { ClosingSlide } from './slides/ClosingSlide'
import { OpeningSlide } from './slides/OpeningSlide'
import { PortfolioSlide } from './slides/PortfolioSlide'
import { ValidationSlide } from './slides/ValidationSlide'

/** Maps a slide definition to its component. Content comes from src/data only. */
export function SlideRenderer({ slide }: { slide: SlideDef }) {
  const { t } = useI18n()
  const product = slide.productSlug ? getProduct(slide.productSlug) : undefined
  const coq10 = product?.story === 'coq10'

  switch (slide.kind) {
    case 'opening':
      return <OpeningSlide />
    case 'about':
      return <AboutSlide />
    case 'portfolio':
      return <PortfolioSlide />
    case 'closing':
      return <ClosingSlide />
    case 'validation':
      return <ValidationSlide part={slide.part ?? 1} />
    case 'direction-welcome':
      return <WelcomeSlide />
    case 'direction-program':
      return <ProgramSlide />
    case 'direction-closing':
      return <DirectionClosingSlide />
  }

  if (!product) return null

  switch (slide.kind) {
    case 'product-hero':
      return <ProductHeroSlide product={product} />
    case 'composition':
      return <CompositionSlide product={product} />
    case 'science':
      return <ScienceSlide product={product} />
    case 'illustration':
      return <IllustrationSlide product={product} />
    case 'indications':
      return <IndicationsSlide product={product} />
    case 'differentiation':
      return <DifferentiationSlide product={product} />
    case 'formulation':
      return <FormulationSlide product={product} />
    case 'safety':
      return <SafetySlide product={product} />
    case 'practical':
      return <PracticalSlide product={product} />
    case 'references':
      return <ReferencesSlide product={product} dark={coq10} />
    case 'mag-pillars':
      return <MagPillarsSlide product={product} />
    case 'mag-molecules':
      return <MagMoleculesSlide product={product} />
    case 'mag-physiology':
      return <ScienceSlide product={product} diagram="magnesium-atp" eyebrow={t.bio3mag.physiologyEyebrow} title={t.bio3mag.physiologyTitle} />
    case 'q10-highlights':
      return <Q10HighlightsSlide product={product} />
    case 'q10-reveal':
      return <Q10RevealSlide product={product} />
    case 'q10-mitochondrion':
      return <ScienceSlide product={product} diagram="mitochondria" eyebrow={t.coq10.mitoEyebrow} title={t.coq10.mitoTitle} />
    case 'q10-mechanism':
      return <ScienceSlide product={product} diagram="electron-transport" eyebrow={t.coq10.mechEyebrow} title={t.coq10.mechTitle} />
    default:
      return null
  }
}
