import { Minus, Pause, Pencil, Play, Plus, RotateCcw, ScrollText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_NOTES, type NoteDef, type ScreenId } from './eventConfig'
import { loadNotes, saveNotes } from './sync'

/** ModeratorTeleprompter — notes privées (visibles uniquement sur /admin, stockées localement, jamais diffusées). */
export function ModeratorTeleprompter({ screen }: { screen: ScreenId }) {
  const [notes, setNotes] = useState<NoteDef[]>(loadNotes)
  const [follow, setFollow] = useState(true)
  const [selected, setSelected] = useState<string>(() => notes.find((n) => n.screen === screen)?.id ?? notes[0].id)
  const [size, setSize] = useState(() => Number(localStorage.getItem('nutriome-live:prompt-size')) || 24)
  const [editing, setEditing] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const [speed, setSpeed] = useState(30)
  const box = useRef<HTMLDivElement>(null)

  // Follow the projected screen
  useEffect(() => {
    if (!follow) return
    const match = notes.find((n) => n.screen === screen)
    if (match) setSelected(match.id)
  }, [screen, follow, notes])

  useEffect(() => {
    localStorage.setItem('nutriome-live:prompt-size', String(size))
  }, [size])

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
  }, [scrolling, editing, speed])

  useEffect(() => {
    if (box.current) box.current.scrollTop = 0
  }, [selected])

  const note = notes.find((n) => n.id === selected) ?? notes[0]
  const setText = (text: string) => {
    const next = notes.map((n) => (n.id === note.id ? { ...n, text } : n))
    setNotes(next)
    saveNotes(next)
  }
  const reset = () => {
    const def = DEFAULT_NOTES.find((n) => n.id === note.id)
    if (def) setText(def.text)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-3">
        <select
          value={note.id}
          onChange={(e) => {
            setSelected(e.target.value)
            setFollow(false)
          }}
          className="w-full rounded-lg border border-white/15 bg-[#0b2219] px-3 py-2.5 text-[15px] font-semibold text-white"
          aria-label="Note affichée"
        >
          {notes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2 text-[12.5px]">
        <label className="flex items-center gap-1.5 text-white/70">
          <input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} className="accent-[#e7a23b]" />
          Suivre l’écran
        </label>
        <span className="ml-auto flex items-center gap-1">
          <button type="button" aria-label="Réduire le texte" onClick={() => setSize((s) => Math.max(16, s - 2))} className="rounded-md bg-white/[0.06] p-1.5">
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center tabular-nums">{size}</span>
          <button type="button" aria-label="Agrandir le texte" onClick={() => setSize((s) => Math.min(56, s + 2))} className="rounded-md bg-white/[0.06] p-1.5">
            <Plus className="size-3.5" />
          </button>
        </span>
        <button
          type="button"
          onClick={() => setScrolling((v) => !v)}
          disabled={editing}
          className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-1.5 font-semibold disabled:opacity-40"
        >
          {scrolling ? <Pause className="size-3.5" /> : <Play className="size-3.5" />} <ScrollText className="size-3.5" />
        </button>
        <input
          type="range"
          min={10}
          max={90}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          aria-label="Vitesse de défilement"
          className="w-20 accent-[#e7a23b]"
        />
        <button
          type="button"
          onClick={() => {
            setEditing((v) => !v)
            setScrolling(false)
          }}
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 font-semibold ${editing ? 'bg-[#e7a23b] text-[#2a1a03]' : 'bg-white/[0.06]'}`}
        >
          <Pencil className="size-3.5" /> {editing ? 'Terminer' : 'Modifier'}
        </button>
        {editing && (
          <button type="button" onClick={reset} title="Texte d’origine" className="rounded-md bg-white/[0.06] p-1.5">
            <RotateCcw className="size-3.5" />
          </button>
        )}
      </div>
      {editing ? (
        <textarea
          value={note.text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-0 flex-1 resize-none bg-[#0b2219] p-4 leading-relaxed text-white outline-none"
          style={{ fontSize: size }}
        />
      ) : (
        <div ref={box} className="min-h-0 flex-1 overflow-y-auto p-5">
          <p className="whitespace-pre-wrap leading-[1.5] text-white" style={{ fontSize: size }}>
            {note.text}
          </p>
          <div className="h-[40vh]" />
        </div>
      )}
    </div>
  )
}
