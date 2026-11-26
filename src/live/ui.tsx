import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Logo } from '../components/ui/Logo'

export const GREEN = '#0f4a33'
export const DEEP = '#082a1d'
export const GOLD = '#e7a23b'
export const BEIGE = '#f6efe2'

const KEYFRAMES = `
@keyframes live-float { 0%,100% { transform: translate3d(0,0,0) rotate(0deg) } 50% { transform: translate3d(0,-26px,0) rotate(8deg) } }
@keyframes live-drift { 0% { transform: translate3d(-4%,0,0) } 100% { transform: translate3d(4%,0,0) } }
@keyframes live-rise { 0% { transform: translate3d(0,0,0); opacity: 0 } 15% { opacity: .9 } 100% { transform: translate3d(0,-1100px,0); opacity: 0 } }
@keyframes live-glow { 0%,100% { opacity: .45 } 50% { opacity: .8 } }
@keyframes live-helix { 0% { transform: translateY(0) } 100% { transform: translateY(-240px) } }
@keyframes live-dots { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
.live-still * { animation: none !important }
`

/** Molecule: hexagon ring with atoms. */
function Molecule({ size, className = '', style }: { size: number; className?: string; style?: React.CSSProperties }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return [50 + 30 * Math.cos(a), 50 + 30 * Math.sin(a)] as const
  })
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden>
      <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="currentColor" strokeWidth={2} />
      <line x1={pts[0][0]} y1={pts[0][1]} x2={96} y2={50} stroke="currentColor" strokeWidth={2} />
      <line x1={pts[4][0]} y1={pts[4][1]} x2={38} y2={4} stroke="currentColor" strokeWidth={2} />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 4.5 : 6} fill="currentColor" />
      ))}
      <circle cx={96} cy={50} r={4} fill="currentColor" />
      <circle cx={38} cy={4} r={4} fill="currentColor" />
    </svg>
  )
}

/** DNA helix column drawn with sine strands. */
function Helix({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: 22 }, (_, i) => i)
  return (
    <svg viewBox="0 0 120 1320" className={className} aria-hidden>
      <g style={{ animation: 'live-helix 18s linear infinite' }}>
        {rungs.map((i) => {
          const y = i * 60
          const x1 = 60 + 46 * Math.sin(i * 0.7)
          const x2 = 60 - 46 * Math.sin(i * 0.7)
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth={2} strokeOpacity={0.5} />
              <circle cx={x1} cy={y} r={6} fill="currentColor" />
              <circle cx={x2} cy={y} r={6} fill={GOLD} />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

/** Scientific atmosphere: gradients, molecules, helix, rising particles. Subtle, Zoom-friendly. */
export function Backdrop({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark'
  const particles = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 137) % 1920,
    delay: (i * 1.7) % 14,
    dur: 14 + (i % 5) * 3,
    size: 4 + (i % 3) * 3,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <style>{KEYFRAMES}</style>
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? `radial-gradient(1200px 800px at 85% 10%, #1d6b4a 0%, transparent 60%), radial-gradient(900px 700px at 0% 100%, #6b4a12 0%, transparent 55%), linear-gradient(135deg, ${GREEN} 0%, ${DEEP} 100%)`
            : `radial-gradient(1100px 700px at 90% 0%, #e9dcc2 0%, transparent 60%), radial-gradient(900px 700px at 0% 100%, #dfeee4 0%, transparent 60%), ${BEIGE}`,
        }}
      />
      <div
        className="absolute -right-40 -top-40 size-[760px] rounded-full blur-3xl"
        style={{ background: dark ? '#2b8a5e' : '#f1d29b', opacity: 0.35, animation: 'live-glow 9s ease-in-out infinite' }}
      />
      <Helix className={`absolute right-[14px] top-0 h-[1320px] w-[90px] opacity-50 ${dark ? 'text-white/20' : 'text-[#0f4a33]/15'}`} />
      {[
        { x: 140, y: 120, s: 120, d: 0 },
        { x: 1500, y: 760, s: 160, d: 2 },
        { x: 820, y: 900, s: 90, d: 4 },
        { x: 1180, y: 70, s: 80, d: 1 },
      ].map((m, i) => (
        <Molecule
          key={i}
          size={m.s}
          className={`absolute ${dark ? 'text-white/12' : 'text-[#0f4a33]/10'}`}
          style={{ left: m.x, top: m.y, animation: `live-float ${10 + i * 2}s ease-in-out ${m.d}s infinite` }}
        />
      ))}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: -20,
            width: p.size,
            height: p.size,
            background: i % 3 ? (dark ? '#ffffff' : GREEN) : GOLD,
            opacity: 0,
            boxShadow: `0 0 12px ${i % 3 ? 'rgba(255,255,255,.6)' : GOLD}`,
            animation: `live-rise ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** White badge carrying the official logo (keeps contrast on dark green). */
export function LogoBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 'h-[150px]' : size === 'md' ? 'h-[96px]' : 'h-[64px]'
  const pad = size === 'lg' ? 'px-10 py-6' : size === 'md' ? 'px-7 py-4' : 'px-5 py-3'
  return (
    <div className={`inline-flex rounded-[28px] bg-white/95 shadow-[0_20px_60px_-30px_rgba(0,0,0,.6)] ${pad}`}>
      <Logo className={`${h} w-auto`} />
    </div>
  )
}

export function Eyebrow({ children, light = true }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-4 text-[28px] font-bold uppercase tracking-[0.28em] ${light ? 'text-[#f2c26f]' : 'text-[#b06d12]'}`}>
      <span className="h-[3px] w-16 rounded-full" style={{ background: GOLD }} />
      {children}
    </p>
  )
}

export function QrCard({ url, label, caption }: { url: string; label: string; caption?: string }) {
  return (
    <div className="flex w-max max-w-full items-center gap-7 rounded-[32px] bg-white px-8 py-6 text-[#0e1a2b] shadow-[0_30px_80px_-40px_rgba(0,0,0,.7)]">
      <QRCodeSVG value={url} size={200} level="M" fgColor="#0f4a33" bgColor="#ffffff" marginSize={1} className="shrink-0" />
      <div className="min-w-0">
        {caption && (
          <p className="text-[20px] font-bold uppercase leading-snug tracking-[0.12em] text-[#b06d12]">{caption}</p>
        )}
        <p className="mt-2 font-serif text-[36px] leading-none whitespace-nowrap">{label}</p>
      </div>
    </div>
  )
}

/** Fixed 1920×1080 stage scaled to fit its container (letterboxed). */
export function Stage({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1920,
          height: 1080,
          overflow: 'hidden',
          transform: `translate(-50%, -50%) scale(${scale})`,
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/** Discreet clock + countdown shown during the waiting loop (phase A). Never starts the event by itself. */
export function WaitingClock({ startsAt, now }: { startsAt: string; now: number }) {
  const start = new Date(startsAt).getTime()
  const diff = start - now
  const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' }).format(now).replace(':', 'h')
  const mm = Math.floor(Math.max(0, diff) / 60_000)
  const ss = Math.floor((Math.max(0, diff) % 60_000) / 1000)
  const hh = Math.floor(mm / 60)
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        bottom: 44,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '12px 24px',
        borderRadius: 999,
        background: 'rgb(4 20 13 / 0.72)',
        border: '1px solid rgb(255 255 255 / 0.14)',
        color: '#fff',
        fontSize: 26,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ opacity: 0.75, fontVariantNumeric: 'tabular-nums' }}>{time}</span>
      <span style={{ width: 1, height: 26, background: 'rgb(255 255 255 / 0.25)' }} />
      {diff > 0 ? (
        <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          Début dans <span style={{ color: GOLD }}>{hh > 0 ? `${hh} h ${String(mm % 60).padStart(2, '0')}` : `${mm}:${String(ss).padStart(2, '0')}`}</span>
        </span>
      ) : (
        <span style={{ fontWeight: 600, fontStyle: 'italic' }}>Nous allons commencer dans quelques instants…</span>
      )}
    </div>
  )
}
