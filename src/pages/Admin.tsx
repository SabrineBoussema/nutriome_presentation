import { ChevronLeft, ChevronRight, Circle, ExternalLink, MonitorPlay, MonitorX, Pause, Play, Settings, Undo2, X } from 'lucide-react'
import { MotionConfig } from 'motion/react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Logo } from '../components/ui/Logo'
import { AdminEventEditor } from '../live/AdminEventEditor'
import type { EventConfig, ScreenId } from '../live/eventConfig'
import { ModeratorTeleprompter } from '../live/ModeratorTeleprompter'
import { ScreenView } from '../live/screens'
import { currentScreen, loopAt, loopPosition, loopScreens, useLiveSync, useNow } from '../live/sync'
import { Stage } from '../live/ui'

const BG = '#071a12'
const GOLD = '#e7a23b'

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h ? `${h}:` : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(sec).padStart(2, '0')}`
}

/** Motion-free scaled preview of a screen. */
function Preview({ id, config, now }: { id: ScreenId; config: EventConfig; now: number }) {
  return (
    <MotionConfig reducedMotion="always">
      <Stage className="live-still w-full" style={{ aspectRatio: '16 / 9', background: '#000' }}>
        <ScreenView id={id} config={config} now={now} />
      </Stage>
    </MotionConfig>
  )
}

function Big({ children, onClick, style, title }: { children: ReactNode; onClick: () => void; style?: React.CSSProperties; title?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{ minHeight: 56, ...style }}
      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 text-[16px] font-bold text-white transition hover:brightness-110"
    >
      {children}
    </button>
  )
}

/** AdminControlPanel — régie simple : un aperçu, Précédent / Suivant, le déroulé, les notes. */
export default function Admin() {
  const { state, config, update, setConfig, peerSeen } = useLiveSync('admin')
  const now = useNow(500)
  const [settings, setSettings] = useState(false)
  const screen = currentScreen(state, config, now)
  const loop = loopScreens(config)
  const pos = loopPosition(state, config, now)
  const connected = peerSeen !== null && now - peerSeen < 5000
  const start = new Date(config.startsAt).getTime()
  const order = config.screens.map((s) => s.id)
  const waiting = state.mode === 'waiting'
  const presenting = state.view === 'presentation'
  const label = (id: ScreenId) => config.screens.find((s) => s.id === id)?.label ?? id

  useEffect(() => {
    document.title = 'Régie EPU — Nutriome Labs'
  }, [])

  /** Show a screen (switches to live mode, starts the event clock). */
  const show = useCallback(
    (id: ScreenId) =>
      update((s) => ({ mode: 'live', screen: id, view: 'live', conferenceStartedAt: s.conferenceStartedAt ?? Date.now() })),
    [update],
  )

  const step = useCallback(
    (dir: 1 | -1) => {
      if (waiting) {
        const target = loop[(pos.index + dir + loop.length) % loop.length]
        if (target) update({ loop: loopAt(config, target.id, state.loop.running, Date.now()) })
        return
      }
      const i = order.indexOf(state.screen)
      show(order[Math.max(0, Math.min(order.length - 1, i + dir))])
    },
    [waiting, loop, pos.index, config, state.loop.running, state.screen, order, update, show],
  )

  const toggleLoop = useCallback(() => {
    const t = Date.now()
    if (!waiting) {
      update({ mode: 'waiting', view: 'live', loop: loopAt(config, loop.some((s) => s.id === screen) ? screen : (loop[0]?.id ?? 'welcome'), true, t) })
      return
    }
    update((s) =>
      s.loop.running
        ? { loop: { running: false, anchor: t, offset: s.loop.offset + (t - s.loop.anchor) } }
        : { loop: { running: true, anchor: t, offset: s.loop.offset } },
    )
  }, [waiting, config, loop, screen, update])

  const blackout = useCallback(() => update((s) => ({ blackout: !s.blackout })), [update])

  // ← → Espace B F (disabled while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === ' ') toggleLoop()
      else if (e.key === 'b' || e.key === 'B') blackout()
      else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void document.documentElement.requestFullscreen().catch(() => {})
      } else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, toggleLoop, blackout])

  const openLive = () => window.open('/live', 'nutriome-live', 'popup,width=1280,height=720')

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="text-white">
      {/* ── barre du haut ── */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '12px 20px', borderBottom: '1px solid rgb(255 255 255 / 0.1)' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '4px 10px' }}>
          <Logo className="h-9 w-auto" />
        </div>
        <p className="text-[15px] font-bold uppercase tracking-[0.18em]" style={{ color: GOLD }}>
          Régie EPU
        </p>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[14px] font-semibold"
          style={{ background: connected ? 'rgb(31 122 82 / 0.35)' : 'rgb(122 31 31 / 0.45)', color: connected ? '#8be8b6' : '#ffb4b4' }}
        >
          <Circle className="size-2.5" fill="currentColor" />
          {connected ? 'Écran /live connecté' : 'Écran /live non ouvert'}
        </span>
        <span className="text-[14px] tabular-nums text-white/70">
          {now < start ? `Début dans ${fmt(start - now)}` : state.conferenceStartedAt ? `Écoulé ${fmt(now - state.conferenceStartedAt)}` : 'Heure de début passée'}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <Big onClick={openLive} style={{ background: GOLD, color: '#2a1a03', minHeight: 44 }}>
            <ExternalLink className="size-4" /> Ouvrir l’écran /live
          </Big>
          <Big onClick={() => setSettings((v) => !v)} style={{ background: 'rgb(255 255 255 / 0.08)', minHeight: 44 }} title="Paramètres de l’événement">
            {settings ? <X className="size-4" /> : <Settings className="size-4" />}
          </Big>
        </div>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 400px)', minHeight: 0 }}>
        {/* ── colonne principale ── */}
        <main style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {/* aperçu */}
          <div>
            <p className="mb-2 flex flex-wrap items-center gap-3 text-[15px]">
              <span className="font-bold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
                À l’écran
              </span>
              <span className="font-semibold">{presenting ? 'Présentation produits' : label(screen)}</span>
              {state.blackout && <span className="rounded bg-black px-2 py-0.5 text-[13px] font-bold">ÉCRAN NOIR</span>}
              <span className="ml-auto text-white/55">
                {waiting
                  ? state.loop.running
                    ? `Boucle d’attente · suivant dans ${Math.ceil(pos.remaining / 1000)} s`
                    : 'Boucle d’attente en pause'
                  : `Suivant : ${label(order[Math.min(order.length - 1, order.indexOf(screen) + 1)])}`}
              </span>
            </p>
            <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', border: `3px solid ${GOLD}`, maxWidth: 'calc((100vh - 330px) * 16 / 9)' }}>
              <Preview id={screen} config={config} now={now} />
              {state.blackout && <div style={{ position: 'absolute', inset: 0, background: 'rgb(0 0 0 / 0.85)' }} />}
            </div>
          </div>

          {/* commandes principales */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Big onClick={() => step(-1)} style={{ background: 'rgb(255 255 255 / 0.1)', minWidth: 160 }} title="←">
              <ChevronLeft className="size-6" /> Précédent
            </Big>
            <Big onClick={() => step(1)} style={{ background: '#1f7a52', minWidth: 200 }} title="→">
              Suivant <ChevronRight className="size-6" />
            </Big>
            <Big onClick={toggleLoop} style={{ background: 'rgb(255 255 255 / 0.1)' }} title="Espace">
              {waiting && state.loop.running ? <Pause className="size-5" /> : <Play className="size-5" />}
              {waiting ? (state.loop.running ? 'Pause boucle' : 'Relancer la boucle') : 'Boucle d’attente'}
            </Big>
            <Big onClick={blackout} style={{ background: state.blackout ? '#000' : '#7a1f1f', marginLeft: 'auto' }} title="B">
              <MonitorX className="size-5" /> {state.blackout ? 'Rétablir' : 'Écran noir'}
            </Big>
          </div>

          {/* déroulé */}
          <div>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-white/50">Déroulé — cliquez pour afficher</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {config.screens.map((s, i) => {
                const active = !presenting && s.id === screen
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => show(s.id)}
                    className="rounded-xl px-3.5 py-2.5 text-[14.5px] font-semibold transition"
                    style={{
                      background: active ? GOLD : 'rgb(255 255 255 / 0.06)',
                      color: active ? '#2a1a03' : '#fff',
                      border: `1px solid ${active ? GOLD : 'rgb(255 255 255 / 0.12)'}`,
                    }}
                  >
                    {i + 1}. {s.label}
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => update(presenting ? { view: 'live' } : { view: 'presentation', blackout: false })}
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[14.5px] font-bold"
                style={{ background: presenting ? GOLD : '#1f7a52', color: presenting ? '#2a1a03' : '#fff' }}
              >
                {presenting ? <Undo2 className="size-4" /> : <MonitorPlay className="size-4" />}
                {presenting ? 'Revenir aux écrans EPU' : 'Présentation produits (Malek)'}
              </button>
            </div>
          </div>

          <p className="mt-auto text-[12.5px] text-white/40">
            Clavier : → suivant · ← précédent · Espace boucle · B écran noir. Sur /live : F ou double-clic = plein écran.
          </p>
        </main>

        {/* ── notes / paramètres ── */}
        <aside style={{ borderLeft: '1px solid rgb(255 255 255 / 0.1)', display: 'flex', flexDirection: 'column', minHeight: 0, maxHeight: 'calc(100vh - 69px)', overflowY: 'auto' }}>
          {settings ? <AdminEventEditor config={config} onChange={setConfig} /> : <ModeratorTeleprompter screen={screen} />}
        </aside>
      </div>
    </div>
  )
}
