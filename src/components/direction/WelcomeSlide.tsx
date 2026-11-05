import { motion } from 'motion/react'
import poster from '../../assets/conference/rencontre-scientifique-5-novembre-2026.jpg'
import { Logo } from '../ui/Logo'
import { DirectionMotif } from './DirectionMotif'
import { NL, easeOut } from './stage'

/** Official welcome — full conference poster on a cinematic emerald stage. */
export function WelcomeSlide() {
  return (
    <section
      className="relative grid h-dvh min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden @4xl:h-full"
      style={{ background: NL.deep }}
    >
      <DirectionMotif tone="dark" id="welcome" />

      <header className="relative z-10 grid shrink-0 items-center gap-2 px-5 py-3 @4xl:grid-cols-[auto_1fr_auto] @4xl:px-10 @4xl:py-4">
        <motion.div
          className="hidden justify-self-start rounded-2xl bg-white px-3 py-1.5 @4xl:block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <Logo className="h-10 w-auto" />
        </motion.div>

        <div className="text-center">
          <motion.p
            className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/50 @4xl:text-[11px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            Rencontre scientifique · Direction
          </motion.p>
          <motion.h1
            className="mt-1 font-serif text-[1.35rem] leading-tight tracking-[-0.03em] text-white @4xl:text-[1.85rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
          >
            Bienvenue à notre rencontre scientifique
          </motion.h1>
        </div>

        <motion.p
          className="hidden text-right text-[11px] font-medium tracking-wide text-white/55 @4xl:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
        >
          5 novembre 2026
          <span className="mt-0.5 block text-[#F47B20]">Intervention en ligne</span>
        </motion.p>

        <div className="col-span-full mx-1 mt-3 h-px bg-gradient-to-r from-transparent via-[#F47B20]/50 to-transparent" />
      </header>

      <motion.div
        className="relative z-10 flex min-h-0 items-center justify-center px-4 pb-16 pt-3 @4xl:px-12 @4xl:pb-12 @4xl:pt-4"
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.16, ease: easeOut }}
      >
        <div
          className="pointer-events-none absolute size-[min(70%,36rem)] rounded-full"
          style={{ background: 'radial-gradient(circle, rgb(244 123 32 / 0.18), transparent 68%)' }}
          aria-hidden
        />
        <figure className="relative flex h-full max-h-full max-w-full items-center justify-center rounded-[1.4rem] p-px shadow-[0_40px_90px_-28px_rgb(0_0_0/0.65)] ring-1 ring-[#F47B20]/55">
          <img
            src={poster}
            alt="Affiche officielle — Surpoids, résistance à l’insuline, apport de la micronutrition. Dr Amin Gasmi, 5 novembre 2026, intervention en ligne par Zoom."
            className="block h-auto max-h-full w-auto max-w-full rounded-[1.32rem] object-contain"
            draggable={false}
          />
        </figure>
      </motion.div>
    </section>
  )
}
