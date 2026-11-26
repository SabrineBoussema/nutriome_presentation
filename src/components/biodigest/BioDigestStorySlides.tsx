import { BookOpen, ChevronDown, FileCheck2, FileX2, PlayCircle, ShieldCheck, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AXES, BIBLIOGRAPHY, KIND_LABEL, PROOFS, SYNTHESIS_ARGS, TIMELINE, WHY } from '../../data/biodigestStory'
import { claimText, commercialClaims } from '../../data/commercialClaims'
import { parseMode, stagesFor } from '../../data/mechanisms'
import { presentationConfig } from '../../data/presentation'
import { salesKits } from '../../data/salesKit'
import type { Product } from '../../data/types'
import { Eyebrow, LevelChip, RefLine } from '../commercial/shared'
import { WORLD } from '../commercial/worldPath'
import { MotionRuntime } from '../bio3mag/anims'
import { PathParticles } from '../mechanisms/kit'
import { useDeck } from '../presentation/DeckContext'
import { useSlide } from '../presentation/SlideContext'
import { Packshot } from '../products/Packshot'
import { SlideShell } from '../ui/SlideShell'

const GREEN = '#1d5a39'
const LEAF = '#2f8a57'
const ZN = '#5b7a99'
const EASE = [0.22, 1, 0.36, 1] as const

function useFlags() {
  const { layout, isPrint } = useSlide()
  const reduced = Boolean(useReducedMotion()) || isPrint
  return { canvas: layout === 'canvas', reduced }
}

function Heading({ children, size = 48 }: { children: ReactNode; size?: number }) {
  const { canvas } = useFlags()
  return (
    <h2 className="font-serif leading-[1.05] tracking-[-0.015em] text-navy text-balance" style={{ fontSize: canvas ? size : '1.8rem', marginTop: 6 }}>
      {children}
    </h2>
  )
}

/** Always-visible regulatory distinction */
function StatusNote({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl bg-sage px-3 py-2 text-[13.5px] leading-snug text-forest">
      <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
      {children ?? commercialClaims['biodigest-not-a-drug'].text}
    </p>
  )
}

/* -------------------------------------------------------------- drawers */

export function Drawer({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', k, true)
    return () => window.removeEventListener('keydown', k, true)
  }, [onClose])
  return (
    <motion.aside
      role="dialog"
      aria-label={title}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-y-0 right-0 z-40 flex w-full max-w-[620px] flex-col border-l border-navy/10 bg-ivory shadow-[-24px_0_60px_-30px_rgb(14_26_43/0.45)]"
      onKeyDown={(e) => e.stopPropagation()}
    >
      <header className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
        <h3 className="font-serif text-[28px] text-navy">{title}</h3>
        <button type="button" onClick={onClose} aria-label="Fermer" className="flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy hover:bg-navy/5">
          <X className="size-5" aria-hidden />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">{children}</div>
    </motion.aside>
  )
}

export function BibliographyButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-[14.5px] font-semibold text-navy hover:bg-navy/5"
      >
        <BookOpen className="size-[18px]" aria-hidden /> Bibliographie
      </button>
      <AnimatePresence>
        {open && (
          <Drawer title="Bibliographie" onClose={() => setOpen(false)}>
            <p className="mb-3 text-[13px] text-slate">Études menées avec le polaprezinc / zinc L-carnosine — aucune sur BioDigest lui-même.</p>
            <ul className="flex flex-col gap-2.5">
              {BIBLIOGRAPHY.map((id) => (
                <RefLine key={id} id={id} />
              ))}
            </ul>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  )
}

/** Supporting documents. Missing documents are shown as missing: none is ever invented. */
export function ProofsList() {
  return (
    <ul className="flex flex-col gap-2">
      {PROOFS.map((p) => (
        <li key={p.id} className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3">
          {p.status === 'available' ? <FileCheck2 className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden /> : <FileX2 className="mt-0.5 size-5 shrink-0 text-slate/60" aria-hidden />}
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-ink">{p.label}</p>
            {p.status === 'available' && p.file ? (
              <a href={p.file} target="_blank" rel="noreferrer" className="text-[13.5px] font-medium text-ocean hover:underline">
                Consulter le document
              </a>
            ) : (
              <p className="text-[13px] text-slate">Document non fourni — l’allégation associée reste désactivée.</p>
            )}
            {p.note && <p className="text-[12.5px] text-slate">{p.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

function ProofsButton() {
  const [params] = useSearchParams()
  const [open, setOpen] = useState(false)
  const review = presentationConfig.showValidationBadges || params.get('review') === '1'
  // Shown to physicians only once at least one document exists; always available in review mode and in /argumentaire.
  if (!review && !PROOFS.some((p) => p.status === 'available')) return null
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-[14.5px] font-semibold text-navy hover:bg-navy/5"
      >
        <FileCheck2 className="size-[18px]" aria-hidden /> Justificatifs
      </button>
      <AnimatePresence>
        {open && (
          <Drawer title="Justificatifs" onClose={() => setOpen(false)}>
            <ProofsList />
          </Drawer>
        )}
      </AnimatePresence>
    </>
  )
}

/* -------------------------------------------------------------- flags & glyphs */

export function FlagJapan({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 60" className={className} role="img" aria-label="Drapeau du Japon">
      <rect width={90} height={60} rx={4} fill="white" stroke="#d5dee7" />
      <circle cx={45} cy={30} r={18} fill="#bc002d" />
    </svg>
  )
}

export function FlagTunisia({ className = '' }: { className?: string }) {
  // red field, white disc, red crescent and five-pointed star
  const star = Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? 7.5 : 3
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    return `${(50 + Math.cos(a) * r).toFixed(2)},${(30 + Math.sin(a) * r).toFixed(2)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 90 60" className={className} role="img" aria-label="Drapeau de la Tunisie">
      <rect width={90} height={60} rx={4} fill="#e70013" />
      <circle cx={45} cy={30} r={15} fill="white" />
      <circle cx={42} cy={30} r={11.25} fill="#e70013" />
      <circle cx={45} cy={30} r={9} fill="white" />
      <polygon points={star} fill="#e70013" />
    </svg>
  )
}

/** Schematic of the zinc L-carnosine complex: quadridentate 1:1 complex of polymeric nature (Matsukura & Tanaka, 2000).
 *  Each Zn²⁺ is bound by the amino N, the amide N and the carboxylate O of one carnosine and by the imidazole N of the next. */
export function PolymerChain({ units = 3, className = '' }: { units?: number; className?: string }) {
  const w = 150
  return (
    <svg viewBox={`0 0 ${units * w + 40} 150`} className={className} aria-hidden>
      {Array.from({ length: units }, (_, i) => {
        const x = 30 + i * w
        return (
          <g key={i}>
            {/* carnosine backbone */}
            <path d={`M${x} 40 L${x + 26} 26 L${x + 52} 40 L${x + 78} 26 L${x + 104} 40`} fill="none" stroke={LEAF} strokeWidth={3} strokeLinejoin="round" />
            {/* imidazole ring */}
            <polygon points={`${x + 104},40 ${x + 124},54 ${x + 118},78 ${x + 94},78 ${x + 88},54`} fill="none" stroke={LEAF} strokeWidth={3} />
            {[
              [x, 40, 'N'],
              [x + 52, 40, 'N'],
              [x + 78, 26, 'O'],
              [x + 118, 78, 'N'],
            ].map(([ax, ay, l], k) => (
              <g key={k}>
                <circle cx={ax} cy={ay} r={9} fill={l === 'O' ? '#e3862b' : '#6a8fb0'} />
                <text x={ax as number} y={(ay as number) + 4} textAnchor="middle" fontSize={10} fontWeight={800} fill="white">
                  {l}
                </text>
              </g>
            ))}
            {/* zinc, coordinated by N, N, O of this unit and N(imidazole) of the previous one */}
            <g>
              <line x1={x + 30} y1={96} x2={x} y2={49} stroke={ZN} strokeWidth={2} strokeDasharray="3 3" />
              <line x1={x + 30} y1={96} x2={x + 52} y2={49} stroke={ZN} strokeWidth={2} strokeDasharray="3 3" />
              <line x1={x + 30} y1={96} x2={x + 74} y2={34} stroke={ZN} strokeWidth={2} strokeDasharray="3 3" />
              {i > 0 && <line x1={x + 30} y1={96} x2={x - w + 118} y2={78} stroke={ZN} strokeWidth={2} strokeDasharray="3 3" />}
              <circle cx={x + 30} cy={104} r={15} fill={ZN} stroke="white" strokeWidth={2} />
              <text x={x + 30} y={109} textAnchor="middle" fontSize={12} fontWeight={800} fill="white">
                Zn
              </text>
            </g>
          </g>
        )
      })}
      <text x={(units * w + 40) / 2} y={146} textAnchor="middle" fontSize={11} fill="#46515e">
        … chaîne polymérique : un Zn²⁺ pour une L-carnosine (1:1)
      </text>
    </svg>
  )
}

/* ========================================================== 1 — introduction */

export function BdIntroSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const appear = (delay: number) => (reduced ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6, ease: EASE } })
  return (
    <SlideShell product={product} headerPackshot={false}>
      <div className={`min-h-0 flex-1 gap-10 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_560px] items-center' : 'flex flex-col'}`}>
        <div>
          <Eyebrow color={product.accent}>BioDigest · Zinc L-carnosine</Eyebrow>
          <Heading size={56}>
            BioDigest — L’expertise <em className="text-forest">japonaise</em> au service de la muqueuse digestive
          </Heading>
          <motion.div {...appear(0.6)} className="mt-7 flex items-end gap-6">
            <p className={`font-serif leading-none text-forest ${canvas ? 'text-[120px]' : 'text-[64px]'}`}>1994</p>
            <p className={`pb-3 leading-snug text-ink ${canvas ? 'max-w-[440px] text-[20px]' : 'text-base'}`}>{claimText('biodigest-heritage')}</p>
          </motion.div>
          <motion.p {...appear(1)} className={`mt-5 font-serif leading-snug text-navy ${canvas ? 'text-[26px]' : 'text-lg'}`}>
            {claimText('biodigest-exclusivity')}
          </motion.p>
          <motion.div {...appear(1.3)} className="mt-5 max-w-[760px]">
            <StatusNote>Le polaprezinc est un médicament au Japon ; BioDigest est un complément alimentaire à base de zinc L-carnosine.</StatusNote>
          </motion.div>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="flex w-full items-center justify-between px-6">
            <motion.div {...appear(0.2)} className="flex flex-col items-center gap-1">
              <FlagJapan className="w-[96px] drop-shadow" />
              <span className="text-[13px] font-semibold text-slate">Japon · développement</span>
            </motion.div>
            <svg viewBox="0 0 200 40" className="mx-2 h-10 flex-1" aria-hidden>
              <motion.path
                d="M4 30 Q100 -10 196 30"
                fill="none"
                stroke={GREEN}
                strokeWidth={2}
                strokeDasharray="6 6"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
              />
            </svg>
            <motion.div {...appear(0.4)} className="flex flex-col items-center gap-1">
              <FlagTunisia className="w-[96px] drop-shadow" />
              <span className="text-[13px] font-semibold text-slate">Tunisie · BioDigest</span>
            </motion.div>
          </div>
          <Packshot product={product} className={canvas ? 'mt-4 w-[380px]' : 'mt-3 w-[220px]'} eager />
          <motion.div {...appear(1.1)} className="mt-3 w-[340px] rounded-2xl border border-navy/10 bg-white px-3 pt-2 pb-1">
            <PolymerChain units={2} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </SlideShell>
  )
}

/* ========================================================== 2 — Japan → Tunisia */

export function BdOriginSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const t = WORLD.tokyo
  const m = WORLD.monastir
  const route = `M${t.x} ${t.y} Q${(t.x + m.x) / 2} ${Math.min(t.y, m.y) - 170} ${m.x} ${m.y}`
  const facts = [
    { k: 'Japon', v: 'Polaprezinc développé par Hamari Chemicals et Zeria Pharmaceutical.' },
    { k: '1994', v: 'Première autorisation comme médicament anti-ulcéreux au Japon.' },
    { k: 'Tunisie', v: 'Le zinc L-carnosine entre dans la formulation de BioDigest, complément alimentaire.' },
  ]
  return (
    <SlideShell product={product}>
      <MotionRuntime>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow color={product.accent}>BioDigest · Origine</Eyebrow>
            <Heading>Du Japon à la Tunisie</Heading>
          </div>
          <ProofsButton />
        </div>
        <div className={`mt-4 min-h-0 flex-1 gap-8 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_470px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
          <div className={`relative overflow-hidden rounded-[26px] border border-navy/10 bg-[#f3f7fa] ${canvas ? 'min-h-0' : 'aspect-[1000/397]'}`}>
            <svg viewBox={`0 0 ${WORLD.width} ${WORLD.height}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte : du Japon à la Tunisie">
              <path d={WORLD.land} fill="#dfe7ee" stroke="#c9d4df" strokeWidth={0.6} />
              <motion.path d={WORLD.japan} fill="#bc002d" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.3 }} />
              <motion.path d={WORLD.tunisia} fill={GREEN} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.5 }} />
              <motion.path
                d={route}
                fill="none"
                stroke={GREEN}
                strokeWidth={2.5}
                strokeDasharray="7 7"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 2.2, ease: 'easeInOut' }}
              />
              <PathParticles d={route} count={2} dur={5} r={6} fill={ZN} />
              <circle cx={t.x} cy={t.y} r={6} fill="#bc002d" stroke="white" strokeWidth={2} />
              <text x={t.x - 34} y={t.y - 14} textAnchor="end" fontSize={17} fontWeight={700} fill="#0e1a2b">
                Japon
              </text>
              <circle cx={m.x} cy={m.y} r={6} fill={GREEN} stroke="white" strokeWidth={2} />
              <circle cx={m.x} cy={m.y} r={9} fill="none" stroke={GREEN} strokeWidth={2} className="mech-anim mech-pulse" />
              <text x={m.x + 12} y={m.y + 26} fontSize={17} fontWeight={700} fill="#0e1a2b">
                Tunisie · Monastir
              </text>
            </svg>
          </div>
          <div className="flex min-h-0 flex-col gap-3 overflow-y-auto">
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.3, duration: 0.5, ease: EASE }}
                className="rounded-2xl border border-navy/10 bg-white px-4 py-3"
              >
                <p className="font-serif text-[24px] leading-tight text-forest">{f.k}</p>
                <p className="text-[15.5px] leading-snug text-ink">{f.v}</p>
              </motion.div>
            ))}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="flex flex-col gap-2 rounded-2xl bg-forest px-4 py-3 text-white"
            >
              <p className="text-[15.5px] font-semibold">{claimText('biodigest-japan-raw-material')}</p>
              <p className="text-[15.5px] leading-snug">{claimText('biodigest-exclusivity')}</p>
            </motion.div>
            <p className="text-[12.5px] text-slate">Source : Li et al., Exp Ther Med 2021. Les allégations commerciales s’affichent une fois leurs justificatifs fournis.</p>
          </div>
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ========================================================== 3 — timeline */

const KIND_COLOR = { drug: '#9c2a3a', study: '#1b6fa8', supplement: GREEN } as const

export function BdTimelineSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const [sel, setSel] = useState(0)
  const m = TIMELINE[sel]
  return (
    <SlideShell product={product}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow color={product.accent}>Polaprezinc · Reconnaissance internationale</Eyebrow>
          <Heading>Plus de 30 ans d’histoire pharmaceutique</Heading>
        </div>
        <BibliographyButton />
      </div>
      <div className={`relative mt-8 ${canvas ? '' : 'overflow-x-auto pb-2'}`}>
        <div className={`relative ${canvas ? '' : 'min-w-[900px]'}`}>
          <motion.div
            className="absolute top-[27px] left-0 h-[3px] rounded-full bg-navy/15"
            initial={reduced ? false : { width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          <ol className="relative grid grid-cols-8 gap-2">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
              >
                <button type="button" onClick={() => setSel(i)} aria-pressed={sel === i} className="flex w-full flex-col items-center gap-2 text-center">
                  <span
                    className={`flex size-14 items-center justify-center rounded-full border-[3px] bg-white transition-transform ${sel === i ? 'scale-110' : ''}`}
                    style={{ borderColor: KIND_COLOR[t.kind], background: sel === i ? KIND_COLOR[t.kind] : 'white' }}
                  >
                    <span className="size-3 rounded-full" style={{ background: sel === i ? 'white' : KIND_COLOR[t.kind] }} />
                  </span>
                  <span className={`font-serif leading-none ${t.year.length > 4 ? 'text-[20px]' : 'text-[28px]'} text-navy`}>{t.year}</span>
                  <span className="text-[13.5px] leading-tight font-semibold text-slate">{t.title}</span>
                </button>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
      <div className={`mt-7 min-h-0 flex-1 gap-6 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_420px]' : 'flex flex-col'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border bg-white px-6 py-5"
            style={{ borderColor: `${KIND_COLOR[m.kind]}55` }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ color: KIND_COLOR[m.kind] }}>
              {KIND_LABEL[m.kind]}
            </p>
            <p className="mt-1 font-serif text-[32px] leading-tight text-navy">
              {m.year} — {m.title}
            </p>
            <p className={`mt-2 leading-snug text-ink ${canvas ? 'text-[19px]' : 'text-base'}`}>{m.text}</p>
            {m.refs.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1">
                {m.refs.map((id) => (
                  <RefLine key={id} id={id} />
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-col justify-center gap-3">
          {(['drug', 'study', 'supplement'] as const).map((k) => (
            <p key={k} className="flex items-center gap-3 text-[15px] text-ink">
              <span className="size-4 rounded-full" style={{ background: KIND_COLOR[k] }} />
              {KIND_LABEL[k]}
            </p>
          ))}
          <StatusNote>Autorisation pharmaceutique du polaprezinc ≠ statut de BioDigest, qui est un complément alimentaire.</StatusNote>
        </div>
      </div>
    </SlideShell>
  )
}

/* ========================================================== 4 — molecular innovation */

const MOL_STEPS = ['Zinc + L-carnosine', 'Formation du complexe', 'Stabilité dans l’estomac', 'Action locale sur la lésion']

function MoleculeScene({ step }: { step: number }) {
  const { reduced } = useFlags()
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.g key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <circle cx={170} cy={170} r={46} fill={ZN} />
            <text x={170} y={178} textAnchor="middle" fontSize={26} fontWeight={800} fill="white">
              Zn²⁺
            </text>
            <text x={170} y={250} textAnchor="middle" fontSize={16} fontWeight={600} fill="#16222f">
              Zinc
            </text>
            <text x={320} y={182} textAnchor="middle" fontSize={40} fill="#9aa3ad">
              +
            </text>
            <g transform="translate(400,120)">
              <path d="M0 50 L26 36 L52 50 L78 36 L104 50" fill="none" stroke={LEAF} strokeWidth={4} strokeLinejoin="round" />
              <polygon points="104,50 124,64 118,88 94,88 88,64" fill="none" stroke={LEAF} strokeWidth={4} />
              <text x={60} y={130} textAnchor="middle" fontSize={16} fontWeight={600} fill="#16222f">
                L-carnosine
              </text>
              <text x={60} y={150} textAnchor="middle" fontSize={13} fill="#46515e">
                dipeptide β-alanyl-L-histidine
              </text>
            </g>
          </motion.g>
        )}
        {step === 1 && (
          <motion.g key="s1" initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ transformOrigin: '320px 180px' }}>
            <foreignObject x={20} y={60} width={600} height={200}>
              <PolymerChain units={3} className="h-full w-full" />
            </foreignObject>
            <text x={320} y={300} textAnchor="middle" fontSize={15} fontWeight={600} fill={GREEN}>
              Complexe 1:1 quadridenté, de nature polymérique
            </text>
            <text x={320} y={322} textAnchor="middle" fontSize={12.5} fill="#46515e">
              23 % de zinc et 77 % de L-carnosine en masse
            </text>
          </motion.g>
        )}
        {step === 2 && (
          <motion.g key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <rect x={40} y={40} width={560} height={230} rx={28} fill="#fdf3ec" stroke="#e7c3b2" />
            <text x={64} y={72} fontSize={13} fontWeight={700} fill="#46515e" letterSpacing="2">
              SUC GASTRIQUE (ACIDE)
            </text>
            {[
              [150, 150],
              [300, 120],
              [450, 170],
            ].map(([x, y], i) => (
              <g key={i} className="mech-anim mech-drift">
                <circle cx={x} cy={y} r={22} fill={ZN} />
                <circle cx={x} cy={y} r={34} fill="none" stroke={LEAF} strokeWidth={4} strokeDasharray="10 6" />
                <text x={x} y={y + 5} textAnchor="middle" fontSize={13} fontWeight={800} fill="white">
                  Zn
                </text>
              </g>
            ))}
            <text x={320} y={310} textAnchor="middle" fontSize={15} fontWeight={600} fill={GREEN}>
              Reste dans le suc gastrique sans dissociation rapide
            </text>
          </motion.g>
        )}
        {step === 3 && (
          <motion.g key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {Array.from({ length: 11 }, (_, i) => 30 + i * 54)
              .filter((_, i) => i < 4 || i > 6)
              .map((x) => (
                <rect key={x} x={x} y={190} width={50} height={90} rx={9} fill="#fbe3dc" stroke="#e3a99b" />
              ))}
            <path d="M246 190 C270 250 370 250 394 190" fill="#f2b3a5" />
            <path d="M246 190 C270 250 370 250 394 190" fill="none" stroke={LEAF} strokeWidth={7} strokeLinecap="round" />
            {[270, 300, 330, 360].map((x, i) => (
              <motion.g
                key={x}
                initial={reduced ? false : { y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.25, duration: 0.9, ease: EASE }}
              >
                <circle cx={x} cy={214 + (i % 2) * 8} r={10} fill={ZN} stroke="white" strokeWidth={1.5} />
              </motion.g>
            ))}
            {[300, 340].map((x, i) => (
              <motion.g key={x} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 1.6 + i * 0.4, duration: 2.4, repeat: reduced ? 0 : Infinity }}>
                <circle cx={x} cy={262} r={5} fill={ZN} />
                <circle cx={x + 14} cy={268} r={5} fill={LEAF} />
              </motion.g>
            ))}
            <text x={320} y={90} textAnchor="middle" fontSize={15} fontWeight={600} fill={GREEN}>
              Adhère aux zones lésées
            </text>
            <text x={320} y={318} textAnchor="middle" fontSize={15} fontWeight={600} fill={GREEN}>
              puis libère localement zinc et L-carnosine
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

const ZINC_COMPARE: [string, string, string][] = [
  ['Nature', 'Sel de zinc (sulfate, gluconate…)', 'Complexe chélaté zinc + L-carnosine (1:1)'],
  ['Partenaire du zinc', 'Contre-ion sans rôle propre sur la muqueuse', 'L-carnosine, dipeptide'],
  ['Dans l’estomac', 'Ions libres, diffusion rapide', 'Peu soluble, sans dissociation rapide'],
  ['Sur la muqueuse', 'Apport nutritionnel en zinc', 'Adhésion aux lésions étudiée, libération locale'],
  ['Documentation', 'Allégations nutritionnelles du zinc', 'Revues, essais randomisés, méta-analyse'],
]

export function BdMoleculeSlide({ product }: { product: Product }) {
  const { step, goToStep } = useSlide()
  const { canvas } = useFlags()
  const s = Math.min(step, MOL_STEPS.length - 1)
  const [view, setView] = useState<'compare' | 'znc'>('compare')
  return (
    <SlideShell product={product}>
      <MotionRuntime>
        <Eyebrow color={product.accent}>BioDigest · Innovation moléculaire</Eyebrow>
        <Heading>Le complexe zinc L-carnosine</Heading>
        <div className={`mt-4 min-h-0 flex-1 gap-7 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_540px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
          <div className="flex min-h-0 flex-col">
            <ol className="mb-3 flex flex-wrap gap-2">
              {MOL_STEPS.map((l, i) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => goToStep?.(i)}
                    aria-current={i === s ? 'step' : undefined}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-[14px] font-semibold ${i === s ? 'border-transparent bg-forest text-white' : 'border-navy/12 bg-white text-slate hover:text-navy'}`}
                  >
                    <span className={`flex size-5 items-center justify-center rounded-full text-[11.5px] ${i === s ? 'bg-white/20' : 'bg-navy/5'}`}>{i + 1}</span>
                    {l}
                  </button>
                </li>
              ))}
            </ol>
            <div className={`relative min-h-0 flex-1 rounded-[26px] border border-navy/10 bg-white ${canvas ? '' : 'aspect-[640/360]'}`}>
              <div className="absolute inset-0 p-3">
                <MoleculeScene step={s} />
              </div>
            </div>
            <p className="mt-2 text-[12.5px] text-slate">
              Schéma d’après Matsukura &amp; Tanaka (2000) : chaque Zn²⁺ est lié aux azotes aminé et amide et à l’oxygène carboxylate d’une L-carnosine, et à l’azote
              imidazole de la suivante.
            </p>
          </div>
          <div className="flex min-h-0 flex-col gap-3">
            <div role="tablist" aria-label="Comparatif" className="flex rounded-full border border-navy/15 bg-white p-1">
              {(
                [
                  ['compare', 'Zinc conventionnel vs zinc L-carnosine'],
                  ['znc', 'Zinc L-carnosine seul'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={view === id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`min-h-10 flex-1 rounded-full px-3 text-[13.5px] font-semibold ${view === id ? 'bg-forest text-white' : 'text-slate hover:text-navy'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <dl className="min-h-0 flex-1 divide-y divide-navy/8 overflow-y-auto rounded-2xl border border-navy/10 bg-white text-[14.5px]">
              {view === 'compare' && (
                <div className="grid grid-cols-[120px_1fr_1fr] gap-3 bg-sage/50 px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[0.08em]">
                  <span />
                  <span className="text-slate">Zinc conventionnel</span>
                  <span className="text-forest">Zinc L-carnosine</span>
                </div>
              )}
              {ZINC_COMPARE.map(([k, a, b], i) => (
                <motion.div
                  key={`${view}-${k}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`grid gap-3 px-4 py-2.5 ${view === 'compare' ? 'grid-cols-[120px_1fr_1fr]' : 'grid-cols-[140px_1fr]'}`}
                >
                  <dt className="font-semibold text-ink">{k}</dt>
                  {view === 'compare' && <dd className="text-slate">{a}</dd>}
                  <dd className="font-medium text-forest">{b}</dd>
                </motion.div>
              ))}
            </dl>
            <ul className="flex flex-col gap-1">
              <RefLine id="matsukura-2000" />
              <RefLine id="li-2021" />
            </ul>
          </div>
        </div>
      </MotionRuntime>
    </SlideShell>
  )
}

/* ========================================================== 5 — five axes */

export function BdAxesSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const { slides, goToSlideId } = useDeck()
  const [open, setOpen] = useState<string>(AXES[0].id)
  const mechanism = slides.find((s) => s.kind === 'illustration' && s.productSlug === product.slug)
  const [params] = useSearchParams()
  const stageIds = stagesFor('biodigest', parseMode(params.get('mode'))).map((st) => st.id)
  return (
    <SlideShell product={product}>
      <Eyebrow color={product.accent}>BioDigest · Données scientifiques</Eyebrow>
      <Heading>Cinq axes scientifiques</Heading>
      <div className={`mt-5 min-h-0 flex-1 gap-3 ${canvas ? 'flex items-stretch' : 'flex flex-col'}`}>
        {AXES.map((a, i) => {
          const on = open === a.id
          return (
            <motion.article
              key={a.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: EASE, layout: { duration: 0.4 } }}
              className={`flex min-h-0 flex-col overflow-hidden rounded-[24px] border bg-white ${on ? 'shadow-[0_22px_44px_-30px_rgb(14_26_43/0.55)]' : ''}`}
              style={{ flex: canvas ? (on ? 2.4 : 1) : undefined, borderColor: on ? LEAF : 'rgb(14 26 43 / 0.1)' }}
            >
              <button type="button" onClick={() => setOpen(a.id)} aria-expanded={on} className="flex flex-col gap-2 px-4 pt-4 pb-3 text-left">
                <span className="flex size-9 items-center justify-center rounded-full bg-sage font-serif text-[18px] text-forest">{i + 1}</span>
                <span className={`font-semibold leading-tight text-navy ${canvas ? 'text-[19px]' : 'text-base'}`}>{a.title}</span>
                {!on && canvas && <ChevronDown className="size-4 text-slate" aria-hidden />}
              </button>
              <AnimatePresence initial={false}>
                {(on || !canvas) && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4">
                    <p className={`leading-snug text-ink ${canvas ? 'text-[16.5px]' : 'text-sm'}`}>{a.summary}</p>
                    <div className="rounded-2xl bg-ivory px-3 py-2.5">
                      <LevelChip level={a.level}>{a.level === 'usage' ? 'Pharmacologie' : a.level === 'clinique' ? 'Clinique (polaprezinc)' : 'Mécanistique'}</LevelChip>
                      <p className="mt-1.5 text-[14.5px] leading-snug text-ink">{a.evidence}</p>
                    </div>
                    {a.caveat && <p className="border-l-2 border-forest pl-2.5 text-[13.5px] italic leading-snug text-slate">{a.caveat}</p>}
                    <ul className="flex flex-col gap-1">
                      {a.refs.map((id) => (
                        <RefLine key={id} id={id} />
                      ))}
                    </ul>
                    {mechanism && (
                      <button
                        type="button"
                        onClick={() => {
                          const idx = stageIds.indexOf(a.stage)
                          if (idx >= 0) goToSlideId(mechanism.id, Math.min(idx, mechanism.steps - 1))
                        }}
                        className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-forest px-4 text-[14px] font-semibold text-white"
                      >
                        <PlayCircle className="size-[18px]" aria-hidden /> Voir l’animation
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </div>
      <div className="mt-3">
        <StatusNote>Données obtenues avec le polaprezinc / zinc L-carnosine ; aucune étude n’a été menée sur BioDigest lui-même.</StatusNote>
      </div>
    </SlideShell>
  )
}

/* ========================================================== 6 — why choose BioDigest */

export function BdWhySlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const faq = salesKits.find((k) => k.product === 'biodigest')!.faq
  const [q, setQ] = useState<number | null>(null)
  const items = WHY.map((w) => (w.id === 'tunisia' ? { ...w, text: claimText('biodigest-exclusivity') ?? '' } : w))
  return (
    <SlideShell product={product}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <Eyebrow color={product.accent}>BioDigest · Argumentaire</Eyebrow>
          <Heading>Pourquoi choisir BioDigest ?</Heading>
        </div>
        <BibliographyButton />
      </div>
      <div className={`mt-5 min-h-0 flex-1 gap-6 ${canvas ? 'grid grid-cols-[minmax(0,1fr)_480px] grid-rows-[minmax(0,1fr)]' : 'flex flex-col'}`}>
        <div className={`grid gap-3 ${canvas ? 'grid-cols-2 content-start' : 'grid-cols-1'}`}>
          {items.map((w, i) => (
            <motion.div
              key={w.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }}
              className="rounded-3xl border border-navy/10 bg-white px-5 py-4"
            >
              <p className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-forest text-[14px] font-bold text-white">{i + 1}</span>
                <span className={`font-semibold text-navy ${canvas ? 'text-[19px]' : 'text-base'}`}>{w.title}</span>
              </p>
              <p className={`mt-1.5 leading-snug text-ink ${canvas ? 'text-[15.5px]' : 'text-sm'}`}>{w.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex min-h-0 flex-col">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate">Questions fréquentes</p>
          <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain pr-1">
            {faq.map((f, i) => (
              <li key={f.q} className="rounded-2xl border border-navy/10 bg-white">
                <button type="button" onClick={() => setQ(q === i ? null : i)} aria-expanded={q === i} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[15.5px] font-semibold text-navy">
                  {f.q}
                  <ChevronDown className={`size-4 shrink-0 transition-transform ${q === i ? 'rotate-180' : ''}`} aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {q === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-3 text-[14.5px] leading-snug text-ink">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  )
}

/* ========================================================== 7 — synthesis */

export function BdSynthesisSlide({ product }: { product: Product }) {
  const { canvas, reduced } = useFlags()
  const n = SYNTHESIS_ARGS.length
  return (
    <SlideShell product={product} headerPackshot={false} tone="tint">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className={`relative ${canvas ? 'h-[540px] w-[1180px]' : 'flex w-full flex-col items-center gap-3'}`}>
          {canvas ? (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Packshot product={product} className="w-[330px]" eager />
              </div>
              {SYNTHESIS_ARGS.map((a, i) => {
                const ang = -Math.PI / 2 + (i / n) * Math.PI * 2 + Math.PI / n
                const x = 50 + Math.cos(ang) * 38
                const y = 50 + Math.sin(ang) * 40
                return (
                  <motion.span
                    key={a}
                    initial={reduced ? false : { opacity: 0, scale: 0.6, left: '50%', top: '50%' }}
                    animate={{ opacity: 1, scale: 1, left: `${x}%`, top: `${y}%` }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: EASE }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest/25 bg-white px-5 py-2.5 text-center text-[19px] font-semibold whitespace-nowrap text-navy shadow-[0_14px_30px_-22px_rgb(14_26_43/0.5)]"
                  >
                    {a}
                  </motion.span>
                )
              })}
            </>
          ) : (
            <>
              <Packshot product={product} className="w-[200px]" eager />
              <div className="flex flex-wrap justify-center gap-2">
                {SYNTHESIS_ARGS.map((a) => (
                  <span key={a} className="rounded-full border border-forest/25 bg-white px-3 py-1.5 text-sm font-semibold text-navy">
                    {a}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className={`max-w-[1150px] text-center font-serif leading-snug text-navy ${canvas ? 'mt-2 text-[34px]' : 'mt-4 text-xl'}`}
        >
          {claimText('biodigest-slogan-final')}
        </motion.p>
        <p className="mt-2 text-[13px] text-slate">Complément alimentaire — ne remplace pas un traitement prescrit.</p>
      </div>
    </SlideShell>
  )
}

