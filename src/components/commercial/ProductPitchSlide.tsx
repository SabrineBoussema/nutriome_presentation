import { Ban, Check, ClipboardList, FlaskConical, Package, ShieldAlert, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { claimText, commercialClaims } from '../../data/commercialClaims'
import { nrvPercent } from '../../data/nrv'
import { PITCH } from '../../data/pitch'
import { NOT_A_TREATMENT, STANDARD_PRECAUTIONS } from '../../data/products'
import type { Product } from '../../data/types'
import { Drawer } from '../biodigest/BioDigestStorySlides'
import { useSlide } from '../presentation/SlideContext'
import { Packshot } from '../products/Packshot'
import { SlideShell } from '../ui/SlideShell'
import { Eyebrow } from './shared'

const EASE = [0.22, 1, 0.36, 1] as const

function Panel({
  icon: Icon,
  title,
  accent,
  children,
  className = '',
  delay = 0,
  reduced,
}: {
  icon: typeof Target
  title: string
  accent: string
  children: ReactNode
  className?: string
  delay?: number
  reduced: boolean
}) {
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: EASE }}
      className={`flex min-h-0 flex-col rounded-[22px] border border-navy/10 bg-white px-5 py-4 shadow-[0_18px_40px_-32px_rgb(14_26_43/0.45)] ${className}`}
    >
      <h3 className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
        <Icon className="size-4" aria-hidden /> {title}
      </h3>
      <div className="mt-3 flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  )
}

/** « En pratique » — one slide per product: arguments, indications, composition, dosage, contraindications, slogan. */
export function ProductPitchSlide({ product }: { product: Product }) {
  const pitch = PITCH[product.id]
  const { layout, isPrint } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  const canvas = layout === 'canvas'
  const [precautionsOpen, setPrecautionsOpen] = useState(false)
  if (!pitch) return null

  const accent = product.accent
  const slogan = claimText(pitch.sloganClaim)
  const contraindications = product.contraindications ?? []
  const precautions = product.precautions.filter((p) => p !== NOT_A_TREATMENT && !STANDARD_PRECAUTIONS.includes(p))
  const compounds = product.ingredients.filter((i) => !i.derived)
  const elemental = product.ingredients.find((i) => i.derived && i.nrvKey && i.quantity)
  const exclusive = commercialClaims['biodigest-exclusivity']?.status === 'validated' && product.id === 'biodigest'

  const args = pitch.arguments.map((a) => ({ ...a, text: a.claim ? (claimText(a.claim) ?? a.text) : a.text }))

  return (
    <SlideShell product={product} headerPackshot={false} accent={accent}>
      <Eyebrow color={accent}>{product.name} · En pratique</Eyebrow>
      <h2
        className={`font-serif leading-[1.06] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 max-w-[1300px] text-[47px]' : 'mt-1 text-[1.85rem]'}`}
      >
        {pitch.positioning}
      </h2>

      <div
        className={`mt-5 min-h-0 flex-1 ${canvas ? 'grid grid-cols-[250px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.95fr)] content-center items-stretch gap-4' : 'flex flex-col gap-3'}`}
      >
        {/* packshot */}
        <div className="relative flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Packshot product={product} className={canvas ? 'w-[240px]' : 'w-[170px]'} eager />
          </motion.div>
          {exclusive && (
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#f3c86b] px-3 py-1 text-[14.5px] font-bold uppercase tracking-[0.12em] text-[#3d2a05]"
            >
              <Sparkles className="size-3.5" aria-hidden /> Exclusivité Tunisie
            </motion.span>
          )}
        </div>

        {/* why recommend */}
        <Panel icon={Sparkles} title="Pourquoi le conseiller" accent={accent} delay={0.1} reduced={reduced}>
          <ol className="flex flex-col gap-5">
            {args.map((a, i) => (
              <li key={a.title} className="flex gap-3">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full font-serif text-[21.5px] text-white"
                  style={{ background: accent }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className={`font-semibold leading-tight text-navy ${canvas ? 'text-[23px]' : 'text-base'}`}>{a.title}</p>
                  <p className={`mt-0.5 leading-snug text-slate ${canvas ? 'text-[19px]' : 'text-sm'}`}>{a.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        {/* indications */}
        <Panel icon={Target} title="Indications" accent={accent} delay={0.2} reduced={reduced}>
          <ul className="flex flex-col gap-4">
            {pitch.indications.map((ind) => (
              <li key={ind} className={`flex gap-2.5 leading-snug text-ink ${canvas ? 'text-[21px]' : 'text-sm'}`}>
                <Check className="mt-1 size-5 shrink-0" style={{ color: accent }} aria-hidden />
                {ind}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-3 text-[15px] leading-snug text-slate">{pitch.indicationsNote}</p>
        </Panel>

        {/* composition + dosage */}
        <div className="flex min-h-0 flex-col gap-3">
          <Panel icon={FlaskConical} title={`Composition · ${product.doseBasis.fr.toLowerCase()}`} accent={accent} delay={0.3} reduced={reduced}>
            <ul className="flex flex-col gap-1">
              {compounds.map((ing) => (
                <li key={ing.name.fr} className="flex items-baseline justify-between gap-3 text-[18.5px] leading-snug">
                  <span className="text-ink">{ing.name.fr}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-navy">
                    {ing.quantity} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
            {elemental?.quantity && elemental.nrvKey && (
              <p className="mt-2 rounded-xl px-3 py-1.5 text-[16px] font-semibold" style={{ background: product.accentSoft, color: accent }}>
                {pitch.compositionNote ?? elemental.name.fr} · {nrvPercent(elemental.nrvKey, elemental.quantity)} % VNR
              </p>
            )}
          </Panel>
          <Panel icon={ClipboardList} title="Posologie" accent={accent} delay={0.4} reduced={reduced}>
            {product.usage && <p className={`font-semibold leading-snug text-navy ${canvas ? 'text-[23px]' : 'text-base'}`}>{product.usage.text.fr}</p>}
            {product.packaging && (
              <p className="mt-1 flex items-center gap-1.5 text-[16px] text-slate">
                <Package className="size-3.5" aria-hidden /> {product.packaging.text.fr}
              </p>
            )}
            {contraindications.length > 0 && (
              <p className="mt-2 flex gap-1.5 text-[15.5px] leading-snug text-[#a3302b]">
                <Ban className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>
                  <span className="font-semibold">Contre-indication{contraindications.length > 1 ? 's' : ''} : </span>
                  {contraindications.map((c) => c.fr.charAt(0).toLowerCase() + c.fr.slice(1)).join(' ; ')}
                </span>
              </p>
            )}
            {precautions.length > 0 && !isPrint && (
              <button
                type="button"
                onClick={() => setPrecautionsOpen(true)}
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-navy/15 px-3 text-[15px] font-semibold text-navy hover:bg-navy/5"
              >
                <ShieldAlert className="size-3.5" aria-hidden /> Précautions d’emploi
              </button>
            )}
            {precautions.length > 0 && isPrint && (
              <ul className="mt-2 flex flex-col gap-0.5">
                {precautions.map((p) => (
                  <li key={p.fr} className="text-[14px] leading-snug text-slate">
                    {p.fr}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>

      {/* slogan + scope */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-4 flex flex-col items-center gap-1.5 text-center"
      >
        {slogan && (
          <p className={`font-serif leading-snug text-navy text-balance ${canvas ? 'text-[31px]' : 'text-lg'}`}>
            <span style={{ color: accent }}>«</span> {slogan} <span style={{ color: accent }}>»</span>
          </p>
        )}
        <p className="flex items-center gap-2 text-[15px] text-slate">
          <ShieldCheck className="size-4 shrink-0" aria-hidden /> {pitch.limit}
        </p>
      </motion.div>

      <AnimatePresence>
        {precautionsOpen && (
          <Drawer title="Précautions d’emploi" onClose={() => setPrecautionsOpen(false)}>
            <ul className="flex flex-col gap-2.5">
              {precautions.map((p) => (
                <li key={p.fr} className="flex gap-2 text-[18px] leading-snug text-ink">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                  {p.fr}
                </li>
              ))}
            </ul>
          </Drawer>
        )}
      </AnimatePresence>
    </SlideShell>
  )
}
