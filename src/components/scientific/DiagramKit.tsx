import { motion } from 'motion/react'
import type { ReactNode, SVGProps } from 'react'
import { useI18n } from '../../i18n'
import { useSlide } from '../presentation/SlideContext'

export interface DiagramProps {
  step: number
  dark?: boolean
  className?: string
}

/** A group that fades in once the presenter reaches `at`. */
export function Step({ at, step, children, dim = 0 }: { at: number; step: number; children: ReactNode; dim?: number }) {
  const { isPrint } = useSlide()
  const on = step >= at
  if (isPrint) return <g>{children}</g>
  return (
    <motion.g
      initial={false}
      animate={{ opacity: on ? 1 : dim }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.g>
  )
}

/** Path that draws itself when its step is reached. */
export function DrawPath({ at, step, flow = false, ...props }: { at: number; step: number; flow?: boolean } & SVGProps<SVGPathElement>) {
  const { isPrint } = useSlide()
  const on = step >= at
  if (isPrint) return <path {...props} fill={props.fill ?? 'none'} strokeLinecap={props.strokeLinecap ?? 'round'} strokeDasharray={flow ? (props.strokeDasharray ?? '6 6') : undefined} />
  const { d, stroke, strokeWidth, fill, markerEnd, strokeDasharray, strokeLinecap } = props
  // Dashed "flow" paths animate their dash offset (CSS); solid paths draw themselves in.
  if (flow) {
    return (
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill ?? 'none'}
        markerEnd={markerEnd}
        strokeLinecap={strokeLinecap ?? 'round'}
        strokeDasharray={strokeDasharray ?? '6 6'}
        className="flow-dash"
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    )
  }
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill ?? 'none'}
      markerEnd={markerEnd}
      strokeLinecap={strokeLinecap ?? 'round'}
      initial={false}
      animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
    />
  )
}

/** Arrow-head markers, referenced as url(#<prefix>-arrow-<name>). Prefixes keep IDs unique when all slides render together (print). */
export function ArrowDefs({ colors, prefix }: { colors: Record<string, string>; prefix: string }) {
  return (
    <defs>
      {Object.entries(colors).map(([name, color]) => (
        <marker
          key={name}
          id={`${prefix}-arrow-${name}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>
      ))}
    </defs>
  )
}

/** Small helper so diagram labels stay bilingual without bloating the data files. */
export function useTr() {
  const { lang } = useI18n()
  return (fr: string, en: string) => (lang === 'fr' ? fr : en)
}

export const FONT = { fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }
