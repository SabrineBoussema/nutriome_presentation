import { motion } from 'motion/react'
import { Logo } from '../ui/Logo'
import { DirectionMotif } from './DirectionMotif'

const THANKS = [
  { who: 'Dr Amin Gasmi', why: 'pour son éclairage scientifique.' },
  { who: 'Professionnels de santé', why: 'pour leur présence et leur engagement.' },
  { who: 'Équipe Nutriome Labs', why: 'pour la préparation de cette rencontre.' },
]

/** Institutional closing — thanks and brand signature. */
export function ClosingSlide() {
  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden @4xl:h-full" style={{ background: '#063D32' }}>
      <DirectionMotif tone="dark" id="closing" />

      <div
        className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgb(244 123 32 / 0.18), transparent 68%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 size-[24rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgb(244 123 32 / 0.10), transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-28 pt-10 text-center @4xl:pb-16">
        <motion.div
          className="rounded-2xl bg-white px-5 py-3 shadow-[0_20px_50px_-28px_rgb(0_0_0/0.55)]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo className="h-14 w-auto @4xl:h-[4.5rem]" />
        </motion.div>

        <motion.h1
          className="mt-8 font-serif text-[2.15rem] leading-[1.05] tracking-[-0.03em] text-white @4xl:text-[3.4rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Merci pour votre participation
        </motion.h1>

        <motion.p
          className="mt-4 max-w-[36rem] text-base leading-relaxed text-white/75 @4xl:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          Ensemble, faisons avancer le partage des connaissances scientifiques.
        </motion.p>

        <motion.ul
          className="mt-10 flex w-full max-w-[52rem] flex-col gap-3 @4xl:flex-row @4xl:gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {THANKS.map((item) => (
            <li
              key={item.who}
              className="flex-1 rounded-2xl px-5 py-4 text-left ring-1 ring-white/12"
              style={{ background: 'rgb(2 45 37 / 0.45)' }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F47B20]">Remerciements</p>
              <p className="mt-1.5 font-serif text-lg text-white">{item.who}</p>
              <p className="mt-0.5 text-sm text-white/65">{item.why}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
