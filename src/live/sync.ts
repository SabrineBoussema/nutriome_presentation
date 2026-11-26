/**
 * PresentationSync — synchronisation /admin ↔ /live.
 * Transport par défaut : BroadcastChannel (même navigateur) + localStorage (persistance, et repli via l'événement
 * `storage`). L'interface `SyncTransport` permet de brancher plus tard une synchronisation distante
 * (WebSocket, Supabase Realtime…) sans changer les écrans.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_EVENT, type EventConfig, type ScreenDef, type ScreenId } from './eventConfig'
import { DEFAULT_NOTES, type NoteDef } from './speeches'

export interface LiveState {
  /** waiting = boucle automatique d'attente ; live = contrôle manuel */
  mode: 'waiting' | 'live'
  /** Écran courant en mode live */
  screen: ScreenId
  /** Horloge de la boucle d'attente */
  loop: { running: boolean; anchor: number; offset: number }
  blackout: boolean
  /** live = écrans EPU ; presentation = la fenêtre de projection affiche la présentation produits */
  view: 'live' | 'presentation'
  conferenceStartedAt: number | null
  rev: number
}

export const INITIAL_STATE: LiveState = {
  mode: 'waiting',
  screen: 'welcome',
  loop: { running: true, anchor: Date.now(), offset: 0 },
  blackout: false,
  view: 'live',
  conferenceStartedAt: null,
  rev: 0,
}

type Message =
  | { type: 'state'; state: LiveState }
  | { type: 'config'; config: EventConfig }
  | { type: 'hello'; role: 'live' | 'presentation' | 'admin'; at: number }

export interface SyncTransport {
  publish(msg: Message): void
  subscribe(cb: (msg: Message) => void): () => void
}

const KEY = { state: 'nutriome-live:state:v2', config: 'nutriome-live:config:v2', notes: 'nutriome-live:notes:v2' }
const CHANNEL = 'nutriome-live'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota or private mode: state stays in memory */
  }
}

export function broadcastTransport(): SyncTransport {
  const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(CHANNEL) : null
  return {
    publish: (msg) => bc?.postMessage(msg),
    subscribe(cb) {
      const onMsg = (e: MessageEvent<Message>) => cb(e.data)
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY.state && e.newValue) cb({ type: 'state', state: JSON.parse(e.newValue) })
        if (e.key === KEY.config && e.newValue) cb({ type: 'config', config: JSON.parse(e.newValue) })
      }
      bc?.addEventListener('message', onMsg)
      window.addEventListener('storage', onStorage)
      return () => {
        bc?.removeEventListener('message', onMsg)
        window.removeEventListener('storage', onStorage)
      }
    },
  }
}

/** Merge stored config with defaults (new fields / screens added in code stay available). */
function loadConfig(): EventConfig {
  const stored = read<Partial<EventConfig>>(KEY.config)
  if (!stored) return DEFAULT_EVENT
  const migrate = (stored.version ?? 2) < 3
  const screens: ScreenDef[] = DEFAULT_EVENT.screens.map((d) => {
    const s = stored.screens?.find((x) => x.id === d.id)
    const merged = s ? { ...d, loop: s.loop, duration: s.duration } : d
    if (migrate && (d.id === 'academy' || d.id === 'newcomers')) return { ...merged, loop: d.loop, phase: d.phase }
    return merged
  })
  const known = new Set(screens.map((s) => s.id))
  const loopOrder = (migrate ? DEFAULT_EVENT.loopOrder : (stored.loopOrder ?? DEFAULT_EVENT.loopOrder)).filter((id) => known.has(id))
  return { ...DEFAULT_EVENT, ...stored, version: 3, screens, loopOrder, speaker: { ...DEFAULT_EVENT.speaker, ...stored.speaker } }
}

export function loadNotes(): NoteDef[] {
  const stored = read<NoteDef[]>(KEY.notes)
  if (!stored) return DEFAULT_NOTES
  return DEFAULT_NOTES.map((d) => stored.find((s) => s.id === d.id) ?? d)
}
export function saveNotes(notes: NoteDef[]) {
  write(KEY.notes, notes)
}

/** Screen shown right now (waiting loop is derived from a shared clock, so every window agrees). */
export function loopScreens(config: EventConfig) {
  return config.loopOrder
    .map((id) => config.screens.find((s) => s.id === id))
    .filter((s): s is ScreenDef => Boolean(s && s.loop && s.duration > 0))
}

/** Manual running order (phases B and C). */
export function runOrder(config: EventConfig): ScreenId[] {
  return config.screens.filter((s) => s.phase === 'B' || s.phase === 'C').map((s) => s.id)
}

export function loopPosition(state: LiveState, config: EventConfig, now: number) {
  const list = loopScreens(config)
  const total = list.reduce((a, s) => a + s.duration * 1000, 0)
  if (!list.length || !total) return { screen: state.screen, remaining: 0, index: 0 }
  const elapsed = state.loop.running ? now - state.loop.anchor + state.loop.offset : state.loop.offset
  let t = ((elapsed % total) + total) % total
  for (let i = 0; i < list.length; i++) {
    const d = list[i].duration * 1000
    if (t < d) return { screen: list[i].id, remaining: d - t, index: i }
    t -= d
  }
  return { screen: list[0].id, remaining: 0, index: 0 }
}

export function currentScreen(state: LiveState, config: EventConfig, now: number): ScreenId {
  return state.mode === 'waiting' ? loopPosition(state, config, now).screen : state.screen
}

/** Loop clock positioned at the start of a given screen. */
export function loopAt(config: EventConfig, id: ScreenId, running: boolean, now: number): LiveState['loop'] {
  let offset = 0
  for (const s of loopScreens(config)) {
    if (s.id === id) break
    offset += s.duration * 1000
  }
  return { running, anchor: now, offset }
}

export function useNow(intervalMs = 250) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs)
    return () => window.clearInterval(t)
  }, [intervalMs])
  return now
}

/** Shared live state + event configuration, for one role. */
export function useLiveSync(role: 'live' | 'presentation' | 'admin', transport?: SyncTransport) {
  const [state, setState] = useState<LiveState>(() => read<LiveState>(KEY.state) ?? INITIAL_STATE)
  const [config, setConfigState] = useState<EventConfig>(loadConfig)
  const [peerSeen, setPeerSeen] = useState<number | null>(null)
  const transportRef = useRef<SyncTransport | null>(null)
  if (!transportRef.current) transportRef.current = transport ?? broadcastTransport()
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    const t = transportRef.current!
    const unsub = t.subscribe((msg) => {
      if (msg.type === 'state' && msg.state.rev >= stateRef.current.rev) setState(msg.state)
      if (msg.type === 'config') setConfigState(msg.config)
      if (msg.type === 'hello' && msg.role !== role) setPeerSeen(msg.at)
    })
    const hello = () => t.publish({ type: 'hello', role, at: Date.now() })
    hello()
    const timer = window.setInterval(hello, 2000)
    return () => {
      unsub()
      window.clearInterval(timer)
    }
  }, [role])

  const update = useCallback((patch: Partial<LiveState> | ((s: LiveState) => Partial<LiveState>)) => {
    const prev = stateRef.current
    const next: LiveState = { ...prev, ...(typeof patch === 'function' ? patch(prev) : patch), rev: prev.rev + 1 }
    stateRef.current = next
    setState(next)
    write(KEY.state, next)
    transportRef.current!.publish({ type: 'state', state: next })
  }, [])

  const setConfig = useCallback((config: EventConfig) => {
    setConfigState(config)
    write(KEY.config, config)
    transportRef.current!.publish({ type: 'config', config })
  }, [])

  return { state, config, update, setConfig, peerSeen }
}

export const LIVE_WINDOW_FLAG = 'nutriome-live-window'
