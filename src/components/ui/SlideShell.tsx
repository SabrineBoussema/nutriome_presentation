import type { CSSProperties, ReactNode } from 'react'
import { Logo } from './Logo'

interface SlideShellProps {
  children: ReactNode
  tone?: 'ivory' | 'paper' | 'navy' | 'tint'
  accent?: string
  accentSoft?: string
  /** Small label at the top right, e.g. the product name */
  label?: string
  className?: string
  hideLogo?: boolean
}

/** Common frame: background, safe padding and discreet brand header. */
export function SlideShell({ children, tone = 'ivory', accent, accentSoft, label, className = '', hideLogo }: SlideShellProps) {
  const dark = tone === 'navy'
  const style: CSSProperties = {}
  if (tone === 'tint' && accentSoft) {
    style.background = `radial-gradient(120% 90% at 85% 15%, ${accentSoft} 0%, #fffdf8 55%, #faf7f0 100%)`
  }
  const bg = {
    ivory: 'bg-ivory grain',
    paper: 'bg-paper',
    navy: 'bg-navy text-white',
    tint: '',
  }[tone]

  return (
    <section
      className={`relative flex min-h-full w-full flex-col overflow-hidden @4xl:h-full ${bg} ${className}`}
      style={style}
    >
      {!hideLogo && (
        <header className="relative z-10 flex items-center justify-between px-6 pt-6 @4xl:px-20 @4xl:pt-10">
          {dark ? (
            <span className="rounded-xl bg-white/95 px-2.5 py-1.5">
              <Logo className="h-7 w-auto @4xl:h-9" />
            </span>
          ) : (
            <Logo className="h-9 w-auto @4xl:h-12" />
          )}
          {label && (
            <span
              className={`text-xs @4xl:text-sm font-medium uppercase tracking-[0.2em] ${dark ? 'text-white/60' : 'text-slate'}`}
              style={accent && !dark ? { color: accent } : undefined}
            >
              {label}
            </span>
          )}
        </header>
      )}
      <div className="relative z-10 flex flex-1 flex-col px-6 pb-28 pt-6 @4xl:px-20 @4xl:pb-24 @4xl:pt-6">{children}</div>
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
