import { Clock, Maximize2, Minus, Pause, Pencil, Play, Plus, RotateCcw, X } from 'lucide-react'
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import type { ScreenId } from './eventConfig'
import { DEFAULT_NOTES, type NoteDef } from './speeches'
import { loadNotes, saveNotes } from './sync'

const GOLD = '#e7a23b'

const CUES: Record<string, { label: string; color: string }> = {
  sourire: { label: '🙂 Sourire', color: '#f2c26f' },
  pause: { label: '⏸ Pause', color: '#9ad7ff' },
  caméra: { label: '👁 Regarder la caméra', color: '#b6f0c9' },
  camera: { label: '👁 Regarder la caméra', color: '#b6f0c9' },
  remercier: { label: '🙏 Remercier', color: '#ffc6a8' },
  respirer: { label: '🌬 Respirer', color: '#d9c8ff' },
  'regarder le chat': { label: '💬 Regarder le chat', color: '#ffe08a' },
}

/** Words per minute for a calm spoken delivery */
const WPM = 130

export function readingTime(text: string) {
  const words = text
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/\*\*/g, '')
    .split(/\s+/)
    .filter(Boolean).length
  const sec = Math.max(5, Math.round((words / WPM) * 60))
  return sec < 60 ? `${sec} s` : `${Math.floor(sec / 60)} min ${String(sec % 60).padStart(2, '0')}`
}

/** **important** → highlighted ; [cue] → oral indication badge */
function renderLine(line: string, key: number): ReactNode {
  const parts: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\])/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(<Fragment key={i++}>{line.slice(last, m.index)}</Fragment>)
    const tok = m[0]
    if (tok.startsWith('**')) {
      parts.push(
        <mark key={i++} style={{ background: 'rgb(231 162 59 / 0.22)', color: '#ffe3b0', borderRadius: 4, padding: '0 3px' }}>
          {tok.slice(2, -2)}
        </mark>,
      )
    } else {
      const cue = CUES[tok.slice(1, -1).toLowerCase()]
      parts.push(
        <span
          key={i++}
          style={{
            display: 'inline-block',
            fontSize: '0.62em',
            fontWeight: 700,
            verticalAlign: 'middle',
            margin: '0 4px',
            padding: '2px 8px',
            borderRadius: 999,
            border: `1px solid ${cue?.color ?? '#aaa'}`,
            color: cue?.color ?? '#ccc',
          }}
        >
          {cue?.label ?? tok.slice(1, -1)}
        </span>,
      )
    }
    last = m.index + tok.length
  }
  if (last < line.length) parts.push(<Fragment key={i++}>{line.slice(last)}</Fragment>)
  const isAside = line.trim().startsWith('(')
  return (
    <p key={key} style={{ minHeight: '0.6em', margin: '0 0 0.55em', color: isAside ? 'rgb(255 255 255 / 0.5)' : undefined, fontStyle: isAside ? 'italic' : undefined }}>
      {parts}
    </p>
  )
}

/** ModeratorTeleprompter — discours privés, visibles uniquement dans /admin (stockés localement, jamais diffusés). */
export function ModeratorTeleprompter({ screen, screenLabel }: { screen: ScreenId; screenLabel?: string }) {
  const [notes, setNotes] = useState<NoteDef[]>(loadNotes)
  const [follow, setFollow] = useState(true)
  const [manual, setManual] = useState<string | null>(null)
  const [size, setSize] = useState(() => Number(localStorage.getItem('nutriome-live:prompt-size')) || 24)
  const [editing, setEditing] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [speed, setSpeed] = useState(() => Number(localStorage.getItem('nutriome-live:prompt-speed')) || 28)
  const [focus, setFocus] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  const followed = notes.find((n) => n.screen === screen)
  const note = (follow ? followed : undefined) ?? notes.find((n) => n.id === manual) ?? followed ?? notes[0]

  useEffect(() => {
    localStorage.setItem('nutriome-live:prompt-size', String(size))
    localStorage.setItem('nutriome-live:prompt-speed', String(speed))
  }, [size, speed])

  // Auto-scroll
  useEffect(() => {
    if (!scrolling || editing) return
    let raf = 0
    let last = performance.now()
    const tick = (t: number) => {
      const el = box.current
      if (el) {
        el.scrollTop += ((t - last) / 1000) * speed
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) setScrolling(false)
      }
      last = t
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [scrolling, editing, speed, focus])

  // New speech → back to top
  useEffect(() => {
    if (box.current) box.current.scrollTop = 0
  }, [note.id, focus])

  // Esc closes the reading mode
  useEffect(() => {
    if (!focus) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFocus(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focus])

  const pick = (id: string) => {
    setManual(id)
    setFollow(false)
    setScrolling(false)
  }
  const setText = (text: string) => {
    const next = notes.map((n) => (n.id === note.id ? { ...n, text } : n))
    setNotes(next)
    saveNotes(next)
  }
  const reset = () => {
    const def = DEFAULT_NOTES.find((n) => n.id === note.id)
    if (def) setText(def.text)
  }

  const iconBtn = 'inline-flex items-center justify-center gap-1 rounded-lg bg-white/[0.07] px-2 py-1.5 text-[12.5px] font-semibold hover:bg-white/[0.14]'

  const body = (big: boolean) => (
    <div ref={box} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: big ? '8vh 12vw' : '18px 20px' }}>
      <div style={{ fontSize: big ? size * 1.6 : size, lineHeight: 1.5, color: '#fff' }}>{note.text.split('\n').map(renderLine)}</div>
      <div style={{ height: '45vh' }} />
    </div>
  )

  const groups: [NoteDef['group'], string][] = [
    ['screen', 'Discours par écran'],
    ['backup', 'Notes de secours'],
    ['questions', 'Discussion scientifique'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* choix du discours */}
      <div style={{ padding: 12, borderBottom: '1px solid rgb(255 255 255 / 0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <select
          value={note.id}
          onChange={(e) => pick(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-[#0b2219] px-3 py-2.5 text-[15px] font-semibold text-white"
          aria-label="Discours affiché"
        >
          {groups.map(([g, label]) => (
            <optgroup key={g} label={label}>
              {notes
                .filter((n) => n.group === g)
                .map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          <label className="mr-auto flex items-center gap-1.5 text-[12.5px] text-white/70">
            <input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} className="accent-[#e7a23b]" />
            Suivre l’écran{screenLabel ? ` (${screenLabel})` : ''}
          </label>
          {notes
            .filter((n) => n.group !== 'screen')
            .map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => pick(n.id)}
                className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                style={{ background: n.id === note.id ? GOLD : n.group === 'questions' ? 'rgb(31 122 82 / 0.45)' : 'rgb(122 31 31 / 0.45)', color: n.id === note.id ? '#2a1a03' : '#fff' }}
              >
                {n.label.replace('Secours : ', '')}
              </button>
            ))}
        </div>
      </div>

      {/* barre d'outils */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, padding: '8px 12px', borderBottom: '1px solid rgb(255 255 255 / 0.1)' }}>
        <span className="inline-flex items-center gap-1 text-[12.5px] text-white/70" title="Temps de lecture estimé">
          <Clock className="size-3.5" /> ≈ {readingTime(note.text)}
        </span>
        <span style={{ marginLeft: 'auto' }} />
        <button type="button" aria-label="Réduire le texte" onClick={() => setSize((s) => Math.max(16, s - 2))} className={iconBtn}>
          <Minus className="size-3.5" />
        </button>
        <span className="w-6 text-center text-[12.5px] tabular-nums">{size}</span>
        <button type="button" aria-label="Agrandir le texte" onClick={() => setSize((s) => Math.min(56, s + 2))} className={iconBtn}>
          <Plus className="size-3.5" />
        </button>
        <button type="button" onClick={() => setScrolling((v) => !v)} disabled={editing} className={iconBtn} style={scrolling ? { background: GOLD, color: '#2a1a03' } : undefined}>
          {scrolling ? <Pause className="size-3.5" /> : <Play className="size-3.5" />} {scrolling ? 'Pause' : 'Défiler'}
        </button>
        <input
          type="range"
          min={8}
          max={90}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          aria-label="Vitesse de défilement"
          className="w-16 accent-[#e7a23b]"
        />
        <button
          type="button"
          onClick={() => {
            setEditing((v) => !v)
            setScrolling(false)
          }}
          className={iconBtn}
          style={editing ? { background: GOLD, color: '#2a1a03' } : undefined}
        >
          <Pencil className="size-3.5" /> {editing ? 'OK' : 'Modifier'}
        </button>
        {editing && (
          <button type="button" onClick={reset} title="Texte d’origine" className={iconBtn}>
            <RotateCcw className="size-3.5" />
          </button>
        )}
        <button type="button" onClick={() => setFocus(true)} className={iconBtn} title="Mode lecture sans distraction">
          <Maximize2 className="size-3.5" /> Lecture
        </button>
      </div>

      {editing ? (
        <>
          <textarea
            value={note.text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-0 flex-1 resize-none bg-[#0b2219] p-4 leading-relaxed text-white outline-none"
            style={{ fontSize: Math.min(size, 20) }}
          />
          <p className="px-3 py-2 text-[11.5px] text-white/50">
            **texte** = phrase importante · [sourire] [pause] [caméra] [remercier] [respirer] [regarder le chat] = indications orales
          </p>
        </>
      ) : (
        body(false)
      )}

      {/* mode lecture sans distraction */}
      {focus && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: '#040d09', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', color: 'rgb(255 255 255 / 0.6)', fontSize: 14 }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>{note.label}</span>
            <span>≈ {readingTime(note.text)}</span>
            <span style={{ marginLeft: 'auto' }} />
            <button type="button" onClick={() => setSize((s) => Math.max(16, s - 2))} className={iconBtn}>
              <Minus className="size-4" />
            </button>
            <button type="button" onClick={() => setSize((s) => Math.min(56, s + 2))} className={iconBtn}>
              <Plus className="size-4" />
            </button>
            <button type="button" onClick={() => setScrolling((v) => !v)} className={iconBtn} style={scrolling ? { background: GOLD, color: '#2a1a03' } : undefined}>
              {scrolling ? <Pause className="size-4" /> : <Play className="size-4" />} {scrolling ? 'Pause' : 'Défiler'}
            </button>
            <button type="button" onClick={() => setFocus(false)} className={iconBtn} aria-label="Fermer (Échap)">
              <X className="size-4" /> Fermer
            </button>
          </div>
          {body(true)}
        </div>
      )}
    </div>
  )
}
