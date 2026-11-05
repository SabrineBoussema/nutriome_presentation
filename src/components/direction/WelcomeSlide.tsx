import { motion } from 'motion/react'
import poster from '../../assets/conference/rencontre-scientifique-5-novembre-2026.jpg'
import { DirectionMotif } from './DirectionMotif'

/** Official welcome — full conference poster, uncropped, on a dark emerald stage. */
export function WelcomeSlide() {
  return (
    <section
      className="relative grid h-dvh min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden @4xl:h-full"
      style={{ background: '#022D25' }}
    >
      <DirectionMotif tone="dark" id="welcome" />

      <header className="relative z-10 flex shrink-0 flex-col items-center px-5 pt-4 text-center @4xl:px-16 @4xl:pt-5">
        <motion.p
          className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55 @4xl:text-xs"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Nutriome Labs · Direction
        </motion.p>
        <motion.h1
          className="mt-1 font-serif text-[1.25rem] leading-tight tracking-[-0.03em] text-white @4xl:text-[2rem]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Bienvenue à notre rencontre scientifique
        </motion.h1>
      </header>

      <motion.div
        className="relative z-10 flex min-h-0 items-center justify-center px-4 pb-16 pt-2 @4xl:px-16 @4xl:pb-12"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <figure
          className="flex h-full max-h-full max-w-full items-center justify-center rounded-[1.35rem] p-[3px] shadow-[0_30px_70px_-28px_rgb(0_0_0/0.55)]"
          style={{ background: 'linear-gradient(160deg, #F47B20 0%, #063D32 55%, #F47B20 100%)' }}
        >
          <img
            src={poster}
            alt="Affiche officielle — Surpoids, résistance à l’insuline, apport de la micronutrition. Dr Amin Gasmi, 5 novembre 2026, intervention en ligne par Zoom."
            className="block h-auto max-h-full w-auto max-w-full rounded-[1.2rem] object-contain"
            draggable={false}
          />
        </figure>
      </motion.div>
    </section>
  )
}
