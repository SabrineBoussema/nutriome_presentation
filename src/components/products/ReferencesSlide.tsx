import { ExternalLink } from 'lucide-react'
import type { Product } from '../../data/types'
import { useI18n } from '../../i18n'
import { Eyebrow } from '../ui/Badges'
import { Reveal } from '../ui/Reveal'
import { SlideShell, SlideTitle } from '../ui/SlideShell'
import { productReferences } from './productRefs'

export function ReferencesSlide({ product, dark = false }: { product: Product; dark?: boolean }) {
  const { t, l } = useI18n()
  const refs = productReferences(product)
  return (
    <SlideShell tone={dark ? 'navy' : 'ivory'} accent={product.accent} label={product.name} product={product}>
      <Reveal>
        <Eyebrow color={dark ? '#e9c46a' : product.accent}>{t.common.references}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <SlideTitle className={`mt-3 ${dark ? 'text-white' : 'text-navy'}`}>{product.name}</SlideTitle>
      </Reveal>
      <Reveal delay={0.16} className="mt-6 @4xl:mt-8">
        <ol className={`grid gap-x-10 gap-y-3 ${refs.length > 5 ? '@4xl:grid-cols-2' : ''}`}>
          {refs.map((r, i) => (
            <li key={r.id} className="flex gap-3 text-sm leading-snug @4xl:text-[19px]">
              <span className="w-6 shrink-0 text-right font-semibold" style={{ color: dark ? '#e9c46a' : product.accent }}>
                {i + 1}.
              </span>
              <span className={dark ? 'text-white/85' : 'text-ink'}>
                {r.authors && <span className="font-medium">{r.authors}</span>}
                {r.year && ` (${r.year}). `}
                <span className="italic">{r.title}</span>
                {r.source && `. ${r.source}`}.{' '}
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 underline decoration-dotted underline-offset-2 ${dark ? 'text-white/60' : 'text-slate'}`}
                >
                  {r.doi ? `doi:${r.doi}` : r.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                  <ExternalLink className="size-3 no-print" aria-hidden />
                </a>
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={0.3} className={`mt-auto pt-6 text-xs @4xl:text-[17px] ${dark ? 'text-white/50' : 'text-slate'}`}>
        {t.common.source} : {l(product.source)}
      </Reveal>
    </SlideShell>
  )
}
