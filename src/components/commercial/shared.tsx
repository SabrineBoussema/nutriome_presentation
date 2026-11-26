import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { references } from '../../data/references'
import { useSlide } from '../presentation/SlideContext'

/** Compact citation with DOI / PubMed links */
export function RefLine({ id }: { id: string }) {
  const r = references[id]
  if (!r) return null
  const href = r.url?.includes('pmc.ncbi') || !r.pmid ? r.url : `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`
  return (
    <li className="text-[13px] leading-snug text-slate">
      <span className="font-semibold text-ink">{(r.authors ?? r.source ?? '').split(',')[0]}</span>
      {r.authors?.includes(',') ? ' et al.' : ''} {r.year ? `(${r.year}). ` : ''}{r.title}. <span className="italic">{r.source}</span>.{' '}
      <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ocean hover:underline">
        {r.pmid ? `PMID ${r.pmid}` : r.doi ? `DOI ${r.doi}` : 'Source'}
        <ExternalLink className="size-3" aria-hidden />
      </a>
    </li>
  )
}

const LEVEL_STYLE: Record<string, string> = {
  clinique: 'bg-navy text-white',
  limitée: 'bg-amber-soft text-[#9a5612]',
  'non documentée': 'bg-navy/8 text-slate',
  mécanistique: 'bg-plum/10 text-plum',
  sécurité: 'bg-sage text-forest',
  usage: 'bg-ocean-soft text-ocean',
}

export function LevelChip({ level, children }: { level: string; children?: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${LEVEL_STYLE[level] ?? 'bg-navy/8 text-slate'}`}>
      {children ?? level}
    </span>
  )
}

export function Eyebrow({ color, children }: { color: string; children: ReactNode }) {
  const { layout } = useSlide()
  return (
    <p
      className={`flex items-center gap-3 font-semibold uppercase ${layout === 'canvas' ? 'text-[15px] tracking-[0.2em]' : 'text-[12px] tracking-[0.14em]'}`}
      style={{ color }}
    >
      <span className="h-px w-8" style={{ background: color }} aria-hidden />
      {children}
    </p>
  )
}

export function Title({ children }: { children: ReactNode }) {
  const { layout } = useSlide()
  return (
    <h2 className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${layout === 'canvas' ? 'mt-1.5 text-[48px]' : 'mt-1 text-[1.9rem]'}`}>
      {children}
    </h2>
  )
}
