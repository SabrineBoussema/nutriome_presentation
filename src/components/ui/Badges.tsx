import { AlertTriangle, BookOpenCheck, FlaskConical, Microscope, Scale } from 'lucide-react'
import { presentationConfig } from '../../data/presentation'
import type { Mechanism } from '../../data/types'
import { useI18n } from '../../i18n'

export function PendingBadge({ short = false, className = '' }: { short?: boolean; className?: string }) {
  const { t } = useI18n()
  if (!presentationConfig.showValidationBadges) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber-soft px-2.5 py-0.5 text-[0.72em] font-medium tracking-wide text-[#9a5612] whitespace-nowrap ${className}`}
      title={t.common.pending}
    >
      <AlertTriangle className="size-[1.05em]" aria-hidden />
      {short ? t.common.pendingShort : t.common.pending}
    </span>
  )
}

const evidenceStyle: Record<Mechanism['evidence'], { icon: typeof Scale; cls: string }> = {
  'authorized-claim': { icon: Scale, cls: 'bg-sage text-forest border-forest/20' },
  'established-physiology': { icon: BookOpenCheck, cls: 'bg-ocean-soft text-ocean border-ocean/20' },
  'human-studies': { icon: Microscope, cls: 'bg-[#efe7f5] text-plum border-plum/20' },
  preclinical: { icon: FlaskConical, cls: 'bg-sand text-slate border-slate/20' },
}

export function EvidenceChip({ level }: { level: Mechanism['evidence'] }) {
  const { t } = useI18n()
  const { icon: Icon, cls } = evidenceStyle[level]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${cls}`}>
      <Icon className="size-3" aria-hidden />
      {t.evidence[level]}
    </span>
  )
}

export function Eyebrow({ children, color, className = '' }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 text-xs @4xl:text-sm font-semibold uppercase tracking-[0.22em] ${className}`}
      style={color ? { color } : undefined}
    >
      <span className="h-px w-8 bg-current opacity-60" aria-hidden />
      {children}
    </div>
  )
}
