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
  SlidersHorizontal,
  ClipboardList,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PRESENTATION_MODES, type PresentationMode } from '../../data/modes'
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
  modeSwitch?: { mode: PresentationMode; onChange: (mode: PresentationMode) => void }
  /** Field sales kit for the current product */
  kitHref?: string
}

/** Presentation mode menu (Scientifique / Commercial / Visite express) + link to the field sales kit. */
function ModeMenu({ modeSwitch, kitHref }: { modeSwitch: NonNullable<ControlBarProps['modeSwitch']>; kitHref?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const current = PRESENTATION_MODES.find((m) => m.id === modeSwitch.mode)!
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node) && !menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', close)
    window.addEventListener('keydown', esc, true)
    return () => {
      window.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', esc, true)
    }
  }, [open])
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Mode de présentation"
        className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-colors ${open ? 'bg-white text-navy' : 'text-white/85 ring-1 ring-white/15 hover:bg-white/10'}`}
      >
        <SlidersHorizontal className="size-3.5" aria-hidden />
        {current.label}
      </button>
      {open &&
        createPortal(
        <div
          ref={menuRef}
          role="menu"
          aria-label="Mode de présentation"
          className="no-print fixed bottom-[76px] left-1/2 z-[60] w-[300px] -translate-x-1/2 rounded-2xl bg-navy p-2 text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
        >
          {PRESENTATION_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="menuitemradio"
              aria-checked={m.id === modeSwitch.mode}
              onClick={() => {
                modeSwitch.onChange(m.id)
                setOpen(false)
              }}
              className={`flex w-full flex-col items-start rounded-xl px-3 py-2 text-left transition-colors ${m.id === modeSwitch.mode ? 'bg-white/15' : 'hover:bg-white/10'}`}
            >
              <span className="text-[13px] font-semibold">{m.label}</span>
              <span className="text-[11.5px] leading-snug text-white/60">{m.hint}</span>
            </button>
          ))}
          {kitHref && (
            <Link
              to={kitHref}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="mt-1 flex items-center gap-2 rounded-xl border-t border-white/10 px-3 pt-2.5 pb-2 text-[13px] font-semibold text-amber hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              <ClipboardList className="size-4" aria-hidden />
              Argumentaire terrain (nouvel onglet)
            </Link>
          )}
        </div>,
          document.body,
        )}
    </div>
  )
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

        {props.modeSwitch && (
          <>
            <span className="mx-1 h-6 w-px shrink-0 bg-white/15" />
            <ModeMenu modeSwitch={props.modeSwitch} kitHref={props.kitHref} />
          </>
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
