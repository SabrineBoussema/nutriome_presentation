import { motion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { useSlide } from '../presentation/SlideContext'

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  delay?: number
  /** Distance travelled on entrance, in px */
  y?: number
  x?: number
  /** Only show from this progressive step onwards */
  fromStep?: number
}

/** Entrance animation used throughout the slides. Renders statically for print. */
export function Reveal({ children, delay = 0, y = 24, x = 0, fromStep = 0, className, ...rest }: RevealProps) {
  const { step, isPrint } = useSlide()
  const visible = step >= fromStep
  if (isPrint) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      animate={visible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration: 0.7, delay: visible ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
