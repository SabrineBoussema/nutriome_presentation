import { getProduct } from '../../data/products'
import {
  Bio3MagComfortSlide,
  Bio3MagComplementSlide,
  Bio3MagEnzymesSlide,
  Bio3MagIntroSlide,
  Bio3MagSaltsSlide,
  Bio3MagSynthesisSlide,
} from '../bio3mag/Bio3MagStorySlides'
import {
  BdAxesSlide,
  BdIntroSlide,
  BdMoleculeSlide,
  BdOriginSlide,
  BdSynthesisSlide,
  BdTimelineSlide,
  BdWhySlide,
} from '../biodigest/BioDigestStorySlides'
import { BdComplexSlide, BdHeritageSlide, BdMucosaSlide } from '../biodigest/BioDigestVisitSlides'
import { ProductPitchSlide } from '../commercial/ProductPitchSlide'
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
    case 'b3m-intro':
      return <Bio3MagIntroSlide product={product} />
    case 'b3m-salts':
      return <Bio3MagSaltsSlide product={product} />
    case 'b3m-complement':
      return <Bio3MagComplementSlide product={product} />
    case 'b3m-enzymes':
      return <Bio3MagEnzymesSlide product={product} />
    case 'b3m-comfort':
      return <Bio3MagComfortSlide product={product} />
    case 'b3m-synthesis':
      return <Bio3MagSynthesisSlide product={product} />
    case 'bd-intro':
      return <BdIntroSlide product={product} />
    case 'bd-origin':
      return <BdOriginSlide product={product} />
    case 'bd-timeline':
      return <BdTimelineSlide product={product} />
    case 'bd-molecule':
      return <BdMoleculeSlide product={product} />
    case 'bd-axes':
      return <BdAxesSlide product={product} />
    case 'bd-why':
      return <BdWhySlide product={product} />
    case 'bd-synthesis':
      return <BdSynthesisSlide product={product} />
    case 'bd-complex':
      return <BdComplexSlide product={product} />
    case 'bd-heritage':
      return <BdHeritageSlide product={product} />
    case 'bd-mucosa':
      return <BdMucosaSlide product={product} />
    case 'product-pitch':
      return <ProductPitchSlide product={product} />
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
