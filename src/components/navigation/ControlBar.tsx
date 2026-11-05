import {
  ChevronLeft,
  ChevronRight,
  FileDown,
  LayoutGrid,
  Link2,
  Maximize,
  Minimize,
  NotebookPen,
  Pause,
  Play,
  Check,
  Home,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { presentationConfig } from '../../data/presentation'
import { useI18n } from '../../i18n'

interface ControlBarProps {
  index: number
  total: number
  step: number
  steps: number
  sectionLabel: string
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  autoplay: boolean
  onToggleAutoplay?: () => void
  onOverview: () => void
  notesOpen: boolean
  onToggleNotes: () => void
  fullscreen: { supported: boolean; isFullscreen: boolean; toggle: () => void }
  onExport?: () => void
  onShare: () => Promise<void>
  hidden: boolean
  backHref?: string
  padIndex?: boolean
  extraLink?: { to: string; label: string }
}

function IconButton({ label, onClick, active, children, disabled }: { label: string; onClick?: () => void; active?: boolean; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`flex size-9 items-center justify-center rounded-full transition-colors disabled:opacity-30 ${
        active ? 'bg-white text-navy' : 'text-white/80 hover:bg-white/15 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}

export function ControlBar(props: ControlBarProps) {
  const { t, lang, setLang } = useI18n()
  const [copied, setCopied] = useState(false)
  const { index, total, step, steps, padIndex } = props
  const currentLabel = padIndex ? String(index + 1).padStart(2, '0') : String(index + 1)
  const totalLabel = padIndex ? String(total).padStart(2, '0') : String(total)

  const share = async () => {
    await props.onShare()
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={`no-print pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-opacity duration-500 ${
        props.hidden ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <nav
        className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-navy/85 p-1.5 text-white shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10 backdrop-blur-xl"
        aria-label="Presentation controls"
      >
        {props.backHref && (
          <Link to={props.backHref} title={t.nav.backToDeck} aria-label={t.nav.backToDeck} className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/15">
            <Home className="size-4" />
          </Link>
        )}
        <IconButton label={t.nav.previous} onClick={props.onPrev} disabled={!props.canPrev}>
          <ChevronLeft className="size-5" />
        </IconButton>
        <div className="flex min-w-[92px] flex-col items-center px-1 leading-none">
          <span className="text-sm font-semibold tabular-nums">
            {currentLabel} <span className="text-white/45">/ {totalLabel}</span>
          </span>
          {steps > 1 ? (
            <span className="mt-1 flex gap-1" aria-label={`${t.common.step} ${step + 1} / ${steps}`}>
              {Array.from({ length: steps }, (_, i) => (
                <span key={i} className={`h-1 w-2.5 rounded-full ${i <= step ? 'bg-amber' : 'bg-white/25'}`} />
              ))}
            </span>
          ) : (
            <span className="mt-1 hidden max-w-[120px] truncate text-[10px] text-white/50 sm:block">{props.sectionLabel}</span>
          )}
        </div>
        <IconButton label={t.nav.next} onClick={props.onNext} disabled={!props.canNext}>
          <ChevronRight className="size-5" />
        </IconButton>

        <span className="mx-1 h-6 w-px shrink-0 bg-white/15" />

        {props.onToggleAutoplay && (
          <IconButton label={props.autoplay ? t.nav.pause : t.nav.autoplay} onClick={props.onToggleAutoplay} active={props.autoplay}>
            {props.autoplay ? <Pause className="size-4" /> : <Play className="size-4" />}
          </IconButton>
        )}
        <IconButton label={t.nav.overview} onClick={props.onOverview}>
          <LayoutGrid className="size-4" />
        </IconButton>
        <IconButton label={t.nav.notes} onClick={props.onToggleNotes} active={props.notesOpen}>
          <NotebookPen className="size-4" />
        </IconButton>
        <IconButton label={copied ? t.nav.copied : t.nav.share} onClick={share}>
          {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        </IconButton>
        {props.onExport && (
          <span className="hidden sm:contents">
            <IconButton label={t.nav.exportPdf} onClick={props.onExport}>
              <FileDown className="size-4" />
            </IconButton>
          </span>
        )}
        {props.fullscreen.supported && (
          <IconButton label={props.fullscreen.isFullscreen ? t.nav.exitFullscreen : t.nav.fullscreen} onClick={props.fullscreen.toggle}>
            {props.fullscreen.isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </IconButton>
        )}

        {props.extraLink && (
          <>
            <span className="mx-1 h-6 w-px shrink-0 bg-white/15" />
            <Link
              to={props.extraLink.to}
              title={props.extraLink.label}
              className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white/85 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              {props.extraLink.label}
            </Link>
          </>
        )}

        {presentationConfig.showLanguageSwitch && (
          <>
            <span className="mx-1 h-6 w-px shrink-0 bg-white/15" />
            <div className="flex shrink-0 rounded-full bg-white/10 p-0.5 text-xs font-semibold" role="group" aria-label={t.nav.language}>
              {(['fr', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${lang === code ? 'bg-white text-navy' : 'text-white/70 hover:text-white'}`}
                >
                  {code}
                </button>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  )
}
