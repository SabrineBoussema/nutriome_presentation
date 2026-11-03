import type { ReactNode } from 'react'
import type { Product } from '../../data/types'
import { Logo } from './Logo'

interface SlideShellProps {
  children: ReactNode
  tone?: 'ivory' | 'paper' | 'navy' | 'tint'
  accent?: string
  accentSoft?: string
  /** Small label at the top right, e.g. the product name */
  label?: string
  /** When set, the product packshot stays in the header so every captured slide is identifiable */
  product?: Product
  /** Hide the header packshot when the slide already shows the box in the body */
  headerPackshot?: boolean
  className?: string
  hideLogo?: boolean
}

/** Common frame: one shared ivory canvas, safe padding and discreet brand header. */
export function SlideShell({ children, accent, label, product, headerPackshot = true, className = '', hideLogo }: SlideShellProps) {
  const showHeaderPackshot = Boolean(product && headerPackshot)
  return (
    <section className={`relative flex min-h-full w-full flex-col overflow-hidden bg-ivory grain @4xl:h-full ${className}`}>
      {!hideLogo && (
        <header className="relative z-10 flex items-center justify-between gap-5 px-6 pt-5 @4xl:px-20 @4xl:pt-7">
          <Logo className="h-14 w-auto @4xl:h-20" />
          {showHeaderPackshot && product ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-[4.75rem] w-auto rounded-md object-contain shadow-[0_16px_32px_-16px_rgb(14_26_43/0.55)] ring-1 ring-black/10 @4xl:h-28"
              draggable={false}
            />
          ) : (
            !product &&
            label && (
              <span
                className="text-xs font-medium uppercase tracking-[0.2em] text-slate @4xl:text-sm"
                style={accent ? { color: accent } : undefined}
              >
                {label}
              </span>
            )
          )}
        </header>
      )}
      <div className="relative z-10 flex flex-1 flex-col px-6 pb-28 pt-5 @4xl:px-20 @4xl:pb-24 @4xl:pt-5">{children}</div>
    </section>
  )
}

export function SlideTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-serif text-[2.1rem] leading-[1.05] tracking-[-0.015em] text-balance @4xl:text-[68px] ${className}`}
    >
      {children}
    </h2>
  )
}
