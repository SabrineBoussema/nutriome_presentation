import { Building2, Globe2, MapPin, ShieldCheck, Store } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { claimText, commercialClaims } from '../../data/commercialClaims'
import type { Product } from '../../data/types'
import { useSlide } from '../presentation/SlideContext'
import { SlideShell } from '../ui/SlideShell'
import { Eyebrow, LevelChip, RefLine } from './shared'
import { CITIES, TUNISIA } from './tunisiaPath'

const GREEN = '#1d5a39'
const LEAF = '#2f8a57'
const ZN = '#5b7a99'
const STEP_LABELS = ['Positionnement', 'Zinc classique vs zinc L-carnosine', 'Documentation internationale']

function TunisiaMap({ reduced }: { reduced: boolean }) {
  const m = CITIES.monastir
  const t = CITIES.tunis
  return (
    <svg viewBox={`-60 -20 ${TUNISIA.width + 150} ${TUNISIA.height + 40}`} className="h-full w-auto" role="img" aria-label="Carte de la Tunisie : Nutriome Labs à Monastir">
      <motion.path
        d={TUNISIA.d}
        fill={GREEN}
        stroke={GREEN}
        strokeWidth={2}
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 0.12 }}
        transition={{ pathLength: { duration: 1.8, ease: 'easeInOut' }, fillOpacity: { delay: 1.4, duration: 0.8 } }}
      />
      <motion.g initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.5 }}>
        <circle cx={t.x} cy={t.y} r={4} fill="#46515e" />
        <text x={t.x - 9} y={t.y + 4} textAnchor="end" fontSize={13} fontWeight={600} fill="#46515e">
          Tunis
        </text>
        <circle cx={m.x} cy={m.y} r={7} fill="#e3862b" stroke="white" strokeWidth={2} />
        <circle cx={m.x} cy={m.y} r={9} fill="none" stroke="#e3862b" strokeWidth={2} className="mech-anim mech-pulse" />
        <text x={m.x + 14} y={m.y - 4} fontSize={14} fontWeight={700} fill="#0e1a2b">
          Monastir
        </text>
        <text x={m.x + 14} y={m.y + 13} fontSize={12} fill="#46515e">
          Nutriome Labs
        </text>
      </motion.g>
    </svg>
  )
}

/** Schematic: conventional zinc salt (dissociated ions) vs zinc chelated by L-carnosine */
function ZincSalt() {
  return (
    <svg viewBox="0 0 200 110" className="h-[110px] w-full" aria-hidden>
      <circle cx={70} cy={55} r={20} fill="#9aa3ad" />
      <text x={70} y={61} textAnchor="middle" fontSize={15} fontWeight={800} fill="white">
        Zn²⁺
      </text>
      <g transform="translate(140,55)">
        <circle r={20} fill="none" stroke="#9aa3ad" strokeWidth={2} strokeDasharray="4 4" />
        <text y={5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#46515e">
          sel
        </text>
      </g>
      <text x={105} y={104} textAnchor="middle" fontSize={11} fill="#46515e">
        ions séparés en solution
      </text>
    </svg>
  )
}

function ZincCarnosine() {
  return (
    <svg viewBox="0 0 200 110" className="h-[110px] w-full" aria-hidden>
      <path d="M100 55 L60 30 M100 55 L60 80 M100 55 L145 32 M100 55 L145 78" stroke={LEAF} strokeWidth={3} />
      <path d="M60 30 L36 42 L36 68 L60 80" fill="none" stroke={LEAF} strokeWidth={3} strokeLinejoin="round" />
      <path d="M145 32 L170 44 L170 66 L145 78" fill="none" stroke={LEAF} strokeWidth={3} strokeLinejoin="round" />
      {[
        [60, 30],
        [60, 80],
        [145, 32],
        [145, 78],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={6} fill={LEAF} />
      ))}
      <circle cx={100} cy={55} r={19} fill={ZN} stroke="white" strokeWidth={2} />
      <text x={100} y={61} textAnchor="middle" fontSize={15} fontWeight={800} fill="white">
        Zn
      </text>
      <text x={100} y={104} textAnchor="middle" fontSize={11} fill={GREEN}>
        zinc lié à la L-carnosine (complexe)
      </text>
    </svg>
  )
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-sage text-forest">{icon}</span>
      <div>
        <p className="text-[15.5px] font-semibold text-ink">{title}</p>
        <div className="text-[14px] leading-snug text-slate">{children}</div>
      </div>
    </div>
  )
}

function StepPositioning() {
  const claim = claimText('biodigest-exclusivity')
  const exclusivityValidated = commercialClaims['biodigest-exclusivity'].status === 'validated'
  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif text-[30px] leading-[1.15] text-navy">{claim}</p>
      {!exclusivityValidated && (
        <p className="sr-only">Allégation d’exclusivité en attente de validation documentaire.</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <InfoCard icon={<Building2 className="size-[18px]" />} title="Laboratoire tunisien">
          Formulé par Nutriome Labs, à Monastir.
        </InfoCard>
        <InfoCard icon={<Store className="size-[18px]" />} title="En pharmacie">
          {claimText('biodigest-availability')}
        </InfoCard>
      </div>
      <InfoCard icon={<MapPin className="size-[18px]" />} title="Zinc-L-carnosine · 66 mg par gélule">
        Un actif peu courant, différent des compléments de zinc classiques.
      </InfoCard>
    </div>
  )
}

function StepComparison() {
  const rows: [string, string, string][] = [
    ['Forme', 'Sel de zinc (sulfate, gluconate…)', 'Complexe zinc + L-carnosine (1:1)'],
    ['Partenaire du zinc', 'Contre-ion sans rôle sur la muqueuse', 'L-carnosine, un dipeptide'],
    ['Muqueuse gastrique', 'Apport nutritionnel en zinc', 'Affinité pour la muqueuse lésée et cytoprotection étudiées'],
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-navy/10 bg-white px-4 pt-3 pb-2">
          <p className="text-[15px] font-bold text-slate">Zinc classique</p>
          <ZincSalt />
        </div>
        <div className="rounded-2xl border-2 bg-white px-4 pt-3 pb-2" style={{ borderColor: LEAF }}>
          <p className="text-[15px] font-bold" style={{ color: GREEN }}>
            Zinc L-carnosine
          </p>
          <ZincCarnosine />
        </div>
      </div>
      <dl className="divide-y divide-navy/8 rounded-2xl border border-navy/10 bg-white text-[14px]">
        {rows.map(([k, a, b]) => (
          <div key={k} className="grid grid-cols-[150px_1fr_1fr] gap-3 px-4 py-2">
            <dt className="font-semibold text-ink">{k}</dt>
            <dd className="text-slate">{a}</dd>
            <dd className="font-medium text-forest">{b}</dd>
          </div>
        ))}
      </dl>
      <p className="border-l-2 pl-3 text-[15px] leading-snug text-ink" style={{ borderColor: LEAF }}>
        <span className="font-semibold">Pourquoi ce choix : </span>
        les études sur la muqueuse gastrique portent sur ce complexe, et non sur les sels de zinc classiques.
      </p>
    </div>
  )
}

function StepDocumentation() {
  const docs: { title: string; text: string; level: string; levelLabel: string; refs: string[] }[] = [
    { title: 'Japon', text: 'Le polaprezinc est utilisé comme médicament protecteur de la muqueuse dans l’ulcère gastrique.', level: 'usage', levelLabel: 'Usage médical', refs: ['efthymakis-2022'] },
    { title: 'Union européenne', text: 'Sécurité du zinc L-carnosine évaluée par l’EFSA (nouvel aliment, 2022).', level: 'sécurité', levelLabel: 'Sécurité', refs: ['efsa-zinc-carnosine-2022'] },
    { title: 'Mécanismes', text: 'Revues : cytoprotection, action antioxydante, soutien de la réparation épithéliale.', level: 'mécanistique', levelLabel: 'Mécanistique', refs: ['hewlings-2020', 'mahmood-2007'] },
    { title: 'H. pylori', text: 'Méta-analyse de 3 essais (396 patients) en adjuvant à la trithérapie ; preuves encore limitées.', level: 'clinique', levelLabel: 'Clinique (ingrédient)', refs: ['mahmoud-2022'] },
  ]
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {docs.map((d) => (
          <div key={d.title} className="flex flex-col gap-1.5 rounded-2xl border border-navy/10 bg-white px-4 py-3">
            <p className="flex items-center justify-between gap-2 text-[15.5px] font-semibold text-ink">
              <span className="flex items-center gap-2">
                <Globe2 className="size-4 text-forest" aria-hidden />
                {d.title}
              </span>
              <LevelChip level={d.level}>{d.levelLabel}</LevelChip>
            </p>
            <p className="text-[14px] leading-snug text-slate">{d.text}</p>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-1">
        {['efthymakis-2022', 'efsa-zinc-carnosine-2022', 'mahmoud-2022'].map((id) => (
          <RefLine key={id} id={id} />
        ))}
      </ul>
      <p className="text-[13px] text-slate">Données sur l’ingrédient : aucune étude n’a été menée sur BioDigest lui-même.</p>
    </div>
  )
}

/** « BIODIGEST : une formulation différenciante sur le marché tunisien » — 3 progressive steps. */
export function BioDigestMarketSlide({ product }: { product: Product }) {
  const { step, layout, isPrint, goToStep } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  const canvas = layout === 'canvas'
  const s = Math.min(step, 2)
  const steps = [<StepPositioning key="p" />, <StepComparison key="c" />, <StepDocumentation key="d" />]

  return (
    <SlideShell product={product} headerPackshot={false}>
      <Eyebrow color={product.accent}>BioDigest · Marché tunisien</Eyebrow>
      <h2 className={`font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance ${canvas ? 'mt-1.5 text-[44px]' : 'mt-1 text-[1.8rem]'}`}>
        BioDigest : une formulation différenciante sur le marché tunisien
      </h2>
      <div className={`mt-4 min-h-0 flex-1 gap-8 ${canvas ? 'grid grid-cols-[500px_minmax(0,1fr)] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
        {/* map + packaging reveal */}
        <div className={`relative flex items-center ${canvas ? 'min-h-0 justify-start' : 'h-[320px] justify-center'}`}>
          <div className="h-full">
            <TunisiaMap reduced={reduced} />
          </div>
          <motion.img
            src={product.image}
            alt="Boîte BioDigest"
            draggable={false}
            initial={reduced ? false : { opacity: 0, x: 60, rotate: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotate: -4, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute rounded-lg shadow-[0_28px_50px_-24px_rgb(14_26_43/0.6)] ${canvas ? 'right-0 bottom-6 w-[250px]' : 'right-2 bottom-2 w-[150px]'}`}
          />
        </div>
        {/* step content */}
        <div className="flex min-h-0 flex-col">
          <ol className="mb-4 flex flex-wrap gap-2" aria-label="Étapes de la slide">
            {STEP_LABELS.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => goToStep?.(i)}
                  aria-current={i === s ? 'step' : undefined}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-[14px] font-semibold transition-colors ${
                    i === s ? 'border-transparent bg-forest text-white' : 'border-navy/12 bg-white text-slate hover:text-navy'
                  }`}
                >
                  <span className={`flex size-5 items-center justify-center rounded-full text-[11.5px] ${i === s ? 'bg-white/20' : 'bg-navy/5'}`}>{i + 1}</span>
                  {label}
                </button>
              </li>
            ))}
          </ol>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={s}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[s]}
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-sage px-3 py-2 text-[13.5px] leading-snug text-forest">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            {commercialClaims['biodigest-not-a-drug'].text}
          </p>
        </div>
      </div>
    </SlideShell>
  )
}
