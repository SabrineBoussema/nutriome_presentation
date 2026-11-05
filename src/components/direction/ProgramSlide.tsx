import { FlaskConical, Handshake, Leaf, MessagesSquare, Microscope, Presentation } from 'lucide-react'
import type { ComponentType } from 'react'
import { directionProgram } from '../../data/direction'
import { Reveal } from '../ui/Reveal'
import { DirectionMotif } from './DirectionMotif'

const ICONS: Record<(typeof directionProgram)[number]['icon'], ComponentType<{ className?: string }>> = {
  welcome: Handshake,
  range: Presentation,
  science: Microscope,
  interlude: FlaskConical,
  micronutrition: Leaf,
  close: MessagesSquare,
}

function ProgramStep({
  step,
  index,
}: {
  step: (typeof directionProgram)[number]
  index: number
}) {
  const Icon = ICONS[step.icon]
  const accent = step.accent

  return (
    <Reveal delay={0.05} fromStep={index} className="relative flex gap-4">
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full ring-1 @4xl:size-12"
          style={{
            background: accent ? '#F47B20' : '#063D32',
            color: '#FFFFFF',
            boxShadow: accent ? '0 10px 24px -10px rgb(244 123 32 / 0.7)' : '0 10px 24px -12px rgb(6 61 50 / 0.55)',
          }}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.22em] @4xl:text-xs"
          style={{ color: accent ? '#F47B20' : '#063D32' }}
        >
          {step.n}
        </p>
        <h3 className="mt-0.5 font-serif text-[1.15rem] leading-snug tracking-[-0.02em] text-[#022D25] @4xl:text-[1.35rem]">
          {step.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#063D32] @4xl:text-base">{step.speaker}</p>
        {step.detail && <p className="mt-0.5 text-sm leading-snug text-[#063D32]/70 @4xl:text-[0.95rem]">{step.detail}</p>}
      </div>
    </Reveal>
  )
}

/** Conference agenda as a two-column scientific timeline. */
export function ProgramSlide() {
  const left = directionProgram.slice(0, 3)
  const right = directionProgram.slice(3)

  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden @4xl:h-full" style={{ background: '#F5F8F6' }}>
      <DirectionMotif tone="light" id="program" />

      <header className="relative z-10 px-6 pt-6 @4xl:px-16 @4xl:pt-8">
        <Reveal y={10}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#063D32]/55 @4xl:text-xs">
            Nutriome Labs | 5 novembre 2026
          </p>
          <h1 className="mt-2 font-serif text-[1.9rem] leading-tight tracking-[-0.03em] text-[#022D25] @4xl:text-[2.55rem]">
            Déroulement de notre rencontre scientifique
          </h1>
        </Reveal>
      </header>

      <div className="relative z-10 mt-6 grid flex-1 grid-cols-1 gap-x-16 gap-y-2 px-6 pb-28 @4xl:mt-8 @4xl:grid-cols-2 @4xl:px-16 @4xl:pb-20">
        {[left, right].map((column, col) => (
          <div key={col} className="relative flex flex-col gap-5 @4xl:gap-6">
            <div
              className="absolute bottom-6 left-[21px] top-6 w-px @4xl:left-[23px]"
              style={{ background: 'linear-gradient(180deg, #063D32 0%, rgb(6 61 50 / 0.12) 100%)' }}
              aria-hidden
            />
            {column.map((step, i) => (
              <ProgramStep key={step.n} step={step} index={col * 3 + i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
