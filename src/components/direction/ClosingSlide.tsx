import { HeartHandshake, Microscope, Stethoscope } from 'lucide-react'
import { motion } from 'motion/react'
import { company } from '../../data/company'
import { Logo } from '../ui/Logo'
import { DirectionMotif } from './DirectionMotif'
import { NL, easeOut } from './stage'

const THANKS = [
  { who: 'Dr Amin Gasmi', why: 'pour son éclairage scientifique', icon: Microscope },
  { who: 'Professionnels de santé', why: 'pour leur présence et leur engagement', icon: Stethoscope },
  { who: 'Équipe Nutriome Labs', why: 'pour la préparation de cette rencontre', icon: HeartHandshake },
]

/** Institutional closing — thanks and brand signature. */
export function ClosingSlide() {
  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden @4xl:h-full" style={{ background: NL.emerald }}>
      <DirectionMotif tone="dark" id="closing" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-5 text-center @4xl:px-16 @4xl:pb-12 @4xl:pt-6">
        <motion.div
          className="rounded-[1.35rem] bg-white px-4 py-2 ring-1 ring-[#F47B20]/25 @4xl:px-5 @4xl:py-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <Logo className="h-11 w-auto @4xl:h-16" />
        </motion.div>

        <motion.p
          className="mt-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#F47B20] @4xl:mt-7 @4xl:text-xs"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
        >
          Clôture
        </motion.p>

        <motion.h1
          className="mt-1.5 max-w-[18ch] font-serif text-[1.85rem] leading-[1.05] tracking-[-0.03em] text-white @4xl:mt-2 @4xl:text-[3.4rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
        >
          Merci pour votre participation
        </motion.h1>

        <motion.p
          className="mt-3 max-w-[34rem] font-serif text-[0.95rem] italic leading-relaxed text-white/75 @4xl:mt-4 @4xl:text-[1.4rem]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: easeOut }}
        >
          Ensemble, faisons avancer le partage des connaissances scientifiques.
        </motion.p>

        <motion.div
          className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#F47B20] to-transparent @4xl:mt-7"
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
        />

        <ul className="mt-5 grid w-full max-w-[58rem] grid-cols-1 gap-2.5 @4xl:mt-8 @4xl:grid-cols-3 @4xl:gap-6">
          {THANKS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.li
                key={item.who}
                className="flex flex-col items-center rounded-[1.25rem] px-4 py-3 ring-1 ring-white/12 @4xl:rounded-[1.4rem] @4xl:px-5 @4xl:py-5"
                style={{ background: 'rgb(2 45 37 / 0.38)' }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.36 + i * 0.1, ease: easeOut }}
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-[#F47B20]/15 text-[#F47B20] @4xl:size-10">
                  <Icon className="size-4 @4xl:size-5" />
                </div>
                <p className="mt-2 font-serif text-[1.05rem] leading-snug text-white @4xl:mt-3 @4xl:text-[1.3rem]">{item.who}</p>
                <p className="mt-0.5 text-xs text-white/60 @4xl:text-sm">{item.why}.</p>
              </motion.li>
            )
          })}
        </ul>

        <motion.p
          className="mt-5 text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 @4xl:mt-7 @4xl:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
        >
          {company.name} · {company.websiteLabel}
        </motion.p>
      </div>
    </section>
  )
}
