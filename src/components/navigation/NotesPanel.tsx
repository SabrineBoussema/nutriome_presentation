import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { SlideDef } from '../../data/presentation'
import { useI18n } from '../../i18n'

/** Presenter notes, docked at the top-left. Toggle with N. */
export function NotesPanel({ open, slide, next, onClose }: { open: boolean; slide?: SlideDef; next?: SlideDef; onClose: () => void }) {
  const { l, t } = useI18n()
  return (
    <AnimatePresence>
      {open && slide && (
        <motion.aside
          className="no-print fixed left-3 top-3 z-40 w-[min(380px,calc(100vw-24px))] rounded-2xl bg-navy/90 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">{t.nav.notes}</div>
              <div className="mt-1 text-sm font-semibold">
                {l(slide.section)} — {l(slide.title)}
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label={t.nav.close} className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/85">{slide.notes ? l(slide.notes) : t.nav.noNotes}</p>
          {next && (
            <p className="mt-3 border-t border-white/10 pt-2 text-xs text-white/50">
              → {l(next.section)} — {l(next.title)}
            </p>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
