import type { Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { Eyebrow, PendingBadge } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'
import { useSlide } from '../presentation/SlideContext'
import { motion } from 'motion/react'
import { nrvPercent } from '../../data/nrv'
import { visualFor } from '../../data/ingredientVisuals'
import { IngredientThumb } from './IngredientThumb'

export function CompositionSlide({ product }: { product: Product }) {
  const { l, n, t, lang } = useI18n()
  const { isPrint } = useSlide()
  const quantified = product.ingredients.filter((i) => i.quantity !== undefined && !i.derived)
  // Mass bar only when every quantified ingredient is in mg (never mix units)
  const showBar = quantified.length > 1 && quantified.length <= 5 && quantified.every((i) => i.unit === 'mg')
  const total = quantified.reduce((s, i) => s + (i.quantity ?? 0), 0)
  const shades = [product.accent, `${product.accent}cc`, `${product.accent}99`, `${product.accent}70`, `${product.accent}50`, `${product.accent}38`, `${product.accent}28`, `${product.accent}1c`]
  const anyPending = product.ingredients.some((i) => i.status === 'pending')
  const many = product.ingredients.length > 5
  const visuals = product.ingredients.map((i) => visualFor(i.name))
  // Narrow 5-column cards: the illustration sits above the figure instead of in the corner
  const stacked = product.ingredients.length === 5
  const photos = visuals.flatMap((v) => (v?.kind === 'photo' ? [v] : []))
  const hasStructures = visuals.some((v) => v?.kind === 'structure')

  return (
    <SlideShell tone="paper" accent={product.accent} label={product.name} product={product}>
      <div className="flex flex-col gap-2 @4xl:flex-row @4xl:items-end @4xl:justify-between">
        <div>
          <Reveal>
            <Eyebrow color={product.accent}>{t.common.composition}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SlideTitle className="mt-3 text-navy">{l(product.doseBasis)}</SlideTitle>
          </Reveal>
        </div>
        {anyPending && (
          <Reveal delay={0.1}>
            <PendingBadge />
          </Reveal>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center">
      <div className={`mt-8 grid gap-3 @md:grid-cols-2 @4xl:gap-4 ${many ? '@4xl:mt-5' : '@4xl:mt-10'} ${many || product.ingredients.length === 4 ? '@4xl:grid-cols-4' : product.ingredients.length === 5 ? '@4xl:grid-cols-5' : '@4xl:grid-cols-3'}`}>
        {product.ingredients.map((ing, i) => (
          <Reveal key={i} delay={0.12 + i * 0.06}>
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-5 shadow-[0_20px_50px_-30px_rgb(14_26_43/0.35)] ${many ? '@4xl:p-5' : '@4xl:p-6'} ${
                ing.derived
                  ? 'border-transparent'
                  : ing.status === 'pending'
                    ? 'border-amber/30 bg-white'
                    : 'border-navy/[0.06] bg-white'
              }`}
              style={ing.derived ? { background: product.accent } : undefined}
            >
              {visuals[i] && (
                <IngredientThumb
                  visual={visuals[i]}
                  accent={product.accent}
                  accentSoft={product.accentSoft}
                  className={
                    stacked
                      ? 'mb-4 size-20 text-base @4xl:size-[96px]'
                      : `absolute right-4 top-4 text-base @4xl:right-5 @4xl:top-5 ${many ? 'size-20 @4xl:size-[76px]' : 'size-20 @4xl:size-[104px]'}`
                  }
                />
              )}
              <div className={visuals[i] && !stacked ? `pr-24 ${many ? '@4xl:pr-[88px]' : '@4xl:min-h-[104px] @4xl:pr-[116px]'}` : undefined}>
              <div className="h-1 w-10 rounded-full" style={{ background: ing.derived ? 'rgb(255 255 255 / 0.55)' : shades[i % shades.length] }} />
              <div
                className={`mt-4 flex items-baseline gap-1.5 font-serif ${ing.derived ? 'text-white' : 'text-navy'} ${many ? 'text-4xl @4xl:text-[47px]' : 'text-5xl @4xl:text-[64px]'}`}
              >
                {ing.quantity !== undefined ? (
                  <>
                    {n(ing.quantity)}
                    <span className={`font-sans text-lg font-medium @4xl:text-xl ${ing.derived ? 'text-white/80' : 'text-slate'}`}>
                      {ing.unit === 'UI' && lang === 'en' ? 'IU' : ing.unit}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl text-slate/60">—</span>
                )}
              </div>
              </div>
              <div className={`mt-2 text-base font-semibold leading-tight @4xl:text-[25px] ${ing.derived ? 'text-white' : 'text-ink'}`}>{l(ing.name)}</div>
              {ing.nrvKey && ing.quantity !== undefined && (
                <div
                  className="mt-2 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold @4xl:text-[17px]"
                  style={ing.derived ? { background: 'white', color: product.accent } : { background: product.accent, color: 'white' }}
                >
                  {n(nrvPercent(ing.nrvKey, ing.quantity))} % {t.common.nrv}
                </div>
              )}
              {ing.detail && <div className={`mt-1 text-sm @4xl:text-[20px] ${ing.derived ? 'text-white/80' : 'text-slate'}`}>{l(ing.detail)}</div>}
              {ing.role && !many && (
                <div className={`mt-3 text-sm leading-snug @4xl:text-[19px] ${ing.derived ? 'text-white/85' : 'text-slate/90'}`}>{l(ing.role)}</div>
              )}
              {ing.status === 'pending' && (
                <div className="mt-auto pt-3">
                  <PendingBadge short />
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {showBar && (
        <Reveal delay={0.4} className="mt-8">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-navy/[0.06]">
            {quantified.map((ing, i) => (
              <motion.div
                key={i}
                className="h-full"
                style={{ background: shades[i % shades.length] }}
                initial={isPrint ? false : { width: 0 }}
                animate={{ width: `${((ing.quantity ?? 0) / total) * 100}%` }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                title={`${l(ing.name)} — ${n(ing.quantity ?? 0)} mg`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate @4xl:text-[17px]">
            {product.story === 'bio3mag' ? t.bio3mag.compoundNote : `${n(total)} mg — ${l(product.doseBasis).toLowerCase()}`}
          </p>
        </Reveal>
      )}
      </div>

      <Reveal delay={0.5} className="pt-4 text-xs text-slate @4xl:text-[17px]">
        {product.excipients && <p>{l(product.excipients)}</p>}
        {product.ingredients.some((i) => i.nrvKey) && <p className="mt-1">{t.common.nrvNote}</p>}
        {(photos.length > 0 || hasStructures) && (
          <p className="mt-1 opacity-80">
            {t.common.imageCredits} :{' '}
            {[
              ...photos.map((v) => `${l(v.alt)}${v.note ? ` (${l(v.note)})` : ''} — ${v.credit.author}, ${v.credit.license === 'domaine public' && lang === 'en' ? 'public domain' : v.credit.license}, Wikimedia Commons`),
              ...(hasStructures ? [t.common.structuresCredit] : []),
            ].join(' · ')}
          </p>
        )}
      </Reveal>
    </SlideShell>
  )
}
