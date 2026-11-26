import { motion } from 'motion/react'
import { createContext, useContext, type ReactNode } from 'react'

/** Runtime flags shared by every scene of an interactive mechanism. */
export interface MechanismRuntime {
  /** Animations frozen by the presenter */
  paused: boolean
  /** prefers-reduced-motion, or static rendering — loops are replaced by still frames */
  reduced: boolean
}

export const RuntimeContext = createContext<MechanismRuntime>({ paused: false, reduced: false })
export const useRuntime = () => useContext(RuntimeContext)

export const INK = '#16222f'
export const SLATE = '#46515e'
export const MG = '#1b6fa8'
export const FONT_STYLE = { fontFamily: "'Source Sans 3', ui-sans-serif, system-ui, sans-serif" }

/**
 * Particles travelling along an SVG path (SMIL animateMotion: GPU-cheap, pausable with svg.pauseAnimations()).
 * With reduced motion they are drawn as still dots spread along the same path.
 */
export function PathParticles({
  d,
  count = 6,
  dur = 4,
  r = 6,
  fill = MG,
  label,
  labelColor = 'white',
  stroke = 'white',
}: {
  d: string
  count?: number
  dur?: number
  r?: number
  fill?: string
  label?: string
  labelColor?: string
  stroke?: string
}) {
  const { reduced } = useRuntime()
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const f = (i + 0.5) / count
        return (
          <g key={i}>
            <circle r={r} fill={fill} stroke={stroke} strokeWidth={1.5} />
            {label && (
              <text y={r * 0.3} textAnchor="middle" fontSize={label.length > 3 ? r * 0.72 : r * 0.85} fontWeight={700} fill={labelColor}>
                {label}
              </text>
            )}
            {reduced ? (
              <animateMotion dur="1s" path={d} keyPoints={`${f};${f}`} keyTimes="0;1" calcMode="linear" fill="freeze" />
            ) : (
              <animateMotion dur={`${dur}s`} path={d} begin={`${(-dur * i) / count}s`} repeatCount="indefinite" />
            )}
          </g>
        )
      })}
    </g>
  )
}

/** Mg²⁺ ion glyph */
export function MgIon({ x, y, r = 13, fill = MG }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle r={r} fill={fill} stroke="white" strokeWidth={1.5} />
      <text y={r * 0.32} textAnchor="middle" fontSize={r * 0.78} fontWeight={700} fill="white">
        Mg²⁺
      </text>
    </g>
  )
}

/** Text label with an optional leader line, placed in clear space. */
export function Callout({
  x,
  y,
  text,
  to,
  anchor = 'start',
  color = INK,
  size = 15,
  weight = 600,
  sub,
}: {
  x: number
  y: number
  text: string
  to?: [number, number]
  anchor?: 'start' | 'middle' | 'end'
  color?: string
  size?: number
  weight?: number
  sub?: string
}) {
  return (
    <g>
      {to && (
        <>
          <line x1={to[0]} y1={to[1]} x2={x + (anchor === 'end' ? 6 : anchor === 'start' ? -6 : 0)} y2={y - size * 0.35} stroke="#9aa3ad" strokeWidth={1} strokeDasharray="3 3" />
          <circle cx={to[0]} cy={to[1]} r={2.5} fill="#9aa3ad" />
        </>
      )}
      <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>
        {text}
      </text>
      {sub && (
        <text x={x} y={y + size + 3} textAnchor={anchor} fontSize={size - 3} fill={SLATE}>
          {sub}
        </text>
      )}
    </g>
  )
}

/** Entrance of a zoomed scene: a short, sober scale-and-fade, as if zooming into tissue. */
export function Scene({ children, originX = 0, originY = 0 }: { children: ReactNode; originX?: number; originY?: number }) {
  const { reduced } = useRuntime()
  return (
    <motion.g
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${originX}px ${originY}px` }}
    >
      {children}
    </motion.g>
  )
}

/** Fades a group in after `delay` seconds (progressive annotations inside a scene). */
export function Appear({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  const { reduced } = useRuntime()
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : delay }}>
      {children}
    </motion.g>
  )
}

/** Pulsing ring around a hotspot or a point of interest (CSS animation, pausable). */
export function PulseRing({ x, y, r = 14, color = MG }: { x: number; y: number; r?: number; color?: string }) {
  return <circle className="mech-anim mech-pulse" cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={2} />
}

/** Interactive anatomical hotspot: keyboard and touch friendly. */
export function Hotspot({
  x,
  y,
  label,
  active,
  color,
  onSelect,
  labelSide = 'right',
}: {
  x: number
  y: number
  label: string
  active: boolean
  color: string
  onSelect?: () => void
  labelSide?: 'left' | 'right'
}) {
  const interactive = Boolean(onSelect)
  return (
    <g
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Afficher : ${label}` : undefined}
      aria-pressed={interactive ? active : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          e.stopPropagation()
          onSelect()
        }
      }}
      className={interactive ? 'mech-hotspot cursor-pointer' : undefined}
      style={{ outline: 'none' }}
    >
      {/* generous invisible hit area for touch */}
      <circle cx={x} cy={y} r={24} fill="transparent" />
      {active && <PulseRing x={x} y={y} r={13} color={color} />}
      <circle className="mech-dot" cx={x} cy={y} r={active ? 9 : 7} fill={active ? color : 'white'} stroke={color} strokeWidth={2.5} />
      <text
        x={labelSide === 'right' ? x + 16 : x - 16}
        y={y + 5}
        textAnchor={labelSide === 'right' ? 'start' : 'end'}
        fontSize={14}
        fontWeight={active ? 700 : 500}
        fill={active ? color : SLATE}
        paintOrder="stroke"
        stroke="#fffdf8"
        strokeWidth={4}
        strokeLinejoin="round"
      >
        {label}
      </text>
    </g>
  )
}
