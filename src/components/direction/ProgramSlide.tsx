import { FlaskConical, Handshake, Leaf, MessagesSquare, Microscope, Presentation } from 'lucide-react'
import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import { directionProgram } from '../../data/direction'
import { useSlide } from '../presentation/SlideContext'
import { Reveal } from '../ui/Reveal'
import { DirectionMotif } from './DirectionMotif'
import { NL, easeOut } from './stage'

const ICONS: Record<(typeof directionProgram)[number]['icon'], ComponentType<{ className?: string }>> = {
  welcome: Handshake,
  range: Presentation,
  science: Microscope,
  interlude: FlaskConical,
  micronutrition: Leaf,
  close: MessagesSquare,
}

function ProgramCard({
  step,
  index,
}: {
  step: (typeof directionProgram)[number]
  index: number
}) {
  const { step: current, isPrint } = useSlide()
  const visible = isPrint || current >= index
  const Icon = ICONS[step.icon]
  const accent = step.accent

  return (
    <motion.article
      className={`relative flex min-h-0 flex-col overflow-hidden rounded-[1.35rem] bg-white/90 p-5 ring-1 @4xl:h-full @4xl:p-6 ${
        accent ? 'ring-[#F47B20]/30' : 'ring-[#063D32]/10'
      }`}
      style={{
        boxShadow: visible ? '0 18px 40px -28px rgb(6 61 50 / 0.45)' : 'none',
      }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0.22, y: visible ? 0 : 10 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: accent ? NL.orange : NL.emerald, opacity: accent ? 1 : 0.35 }}
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className="font-serif text-[2rem] leading-none tracking-[-0.04em] @4xl:text-[2.35rem]"
          style={{ color: accent ? NL.orange : 'rgb(6 61 50 / 0.28)' }}
        >
          {step.n}
        </span>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-white @4xl:size-11"
          style={{
            background: accent ? NL.orange : NL.emerald,
            boxShadow: accent ? '0 10px 22px -10px rgb(244 123 32 / 0.7)' : '0 10px 22px -12px rgb(6 61 50 / 0.5)',
          }}
        >
          <Icon className="size-5" />
        </div>
      </div>

      <h3 className="mt-4 font-serif text-[1.12rem] leading-snug tracking-[-0.02em] text-[#022D25] @4xl:text-[1.28rem]">
        {step.title}
      </h3>
      <p
        className="mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide @4xl:text-xs"
        style={{
          background: accent ? 'rgb(244 123 32 / 0.12)' : 'rgb(6 61 50 / 0.08)',
          color: accent ? NL.orange : NL.emerald,
        }}
      >
        {step.speaker}
      </p>
      {step.detail && <p className="mt-2 text-sm leading-snug text-[#063D32]/65 @4xl:text-[0.95rem]">{step.detail}</p>}
    </motion.article>
  )
}

/** Conference agenda as a 3×2 scientific program. */
export function ProgramSlide() {
  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden grain @4xl:h-full" style={{ background: NL.mint }}>
      <DirectionMotif tone="light" id="program" />

      <header className="relative z-10 px-6 pt-6 @4xl:px-12 @4xl:pt-8">
        <Reveal y={8}>
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#063D32]/55 @4xl:text-xs">
            Nutriome Labs
            <span className="inline-block size-1 rounded-full bg-[#F47B20]" />
            5 novembre 2026
          </p>
          <h1 className="mt-2 font-serif text-[1.85rem] leading-[1.08] tracking-[-0.03em] text-[#022D25] @4xl:text-[2.45rem]">
            Déroulement de notre rencontre scientifique
          </h1>
        </Reveal>
      </header>

      <div className="relative z-10 mt-5 grid grid-cols-1 gap-3 px-6 pb-28 @4xl:mt-7 @4xl:flex-1 @4xl:grid-cols-3 @4xl:grid-rows-2 @4xl:gap-4 @4xl:px-12 @4xl:pb-16">
        {directionProgram.map((step, index) => (
          <ProgramCard key={step.n} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}
