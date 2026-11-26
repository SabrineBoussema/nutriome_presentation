import { ArrowLeft, Check, ChevronDown, Copy, Lock, Timer } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProofsList } from '../components/biodigest/BioDigestStorySlides'
import { RefLine } from '../components/commercial/shared'
import { Logo } from '../components/ui/Logo'
import { PRESENTATION_MODES, parsePresentationMode, type PresentationMode } from '../data/modes'
import { getProduct } from '../data/products'
import { KIT_SECTIONS, KIT_SECTIONS_BY_MODE, salesKits, type KitSectionId, type SalesKit } from '../data/salesKit'

function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable (http, permissions): ignore */
    }
  }
  return { copied, copy }
}

function Pitch({ paragraphs, seconds }: { paragraphs: string[]; seconds: number }) {
  const { copied, copy } = useCopy()
  const [running, setRunning] = useState(false)
  const [left, setLeft] = useState(seconds)
  useEffect(() => {
    if (!running) return
    if (left <= 0) {
      setRunning(false)
      return
    }
    const id = window.setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => window.clearTimeout(id)
  }, [running, left])
  const mm = String(Math.floor(left / 60)).padStart(1, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (!running && left <= 0) setLeft(seconds)
            setRunning((r) => !r)
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white"
        >
          <Timer className="size-4" aria-hidden />
          {running ? 'Pause' : left < seconds && left > 0 ? 'Reprendre' : 'Chronomètre'}
          <span className="tabular-nums text-amber" aria-live="polite">
            {mm}:{ss}
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false)
            setLeft(seconds)
          }}
          className="min-h-11 rounded-full border border-navy/15 bg-white px-4 text-sm font-semibold text-navy"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={() => copy(paragraphs.join('\n\n'))}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-sm font-semibold text-navy"
        >
          {copied ? <Check className="size-4 text-forest" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copied ? 'Copié' : 'Copier le texte'}
        </button>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="max-w-[72ch] text-[1.15rem] leading-relaxed text-ink">
          {p}
        </p>
      ))}
    </div>
  )
}

function Accordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <ul className="flex flex-col gap-2">
      {items.map((it, i) => (
        <li key={it.title} className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.05rem] font-semibold text-navy"
          >
            {it.title}
            <ChevronDown className={`size-5 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }}>
                <p className="px-5 pb-4 text-[1rem] leading-relaxed text-ink">{it.body}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}

function Section({ kit, id }: { kit: SalesKit; id: KitSectionId }) {
  const reduced = useReducedMotion()
  const list = (items: string[]) => (
    <ul className="flex flex-col gap-2.5">
      {items.map((t, i) => (
        <motion.li
          key={t}
          initial={reduced ? false : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.35 }}
          className="flex gap-3 rounded-2xl border border-navy/10 bg-white px-5 py-3.5 text-[1.05rem] leading-snug text-ink"
        >
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-white">{i + 1}</span>
          {t}
        </motion.li>
      ))}
    </ul>
  )
  switch (id) {
    case 'points':
      return list(kit.points)
    case 'differentiation':
      return list(kit.differentiation)
    case 'faq':
      return <Accordion items={kit.faq.map((f) => ({ title: f.q, body: f.a }))} />
    case 'objections':
      return <Accordion items={kit.objections.map((o) => ({ title: o.objection, body: o.answer }))} />
    case 'references':
      return (
        <ul className="flex flex-col gap-2 rounded-2xl border border-navy/10 bg-white px-5 py-4">
          {kit.references.map((r) => (
            <RefLine key={r} id={r} />
          ))}
        </ul>
      )
    case 'pitch30':
      return <Pitch paragraphs={[kit.pitch30]} seconds={30} />
    case 'pitch2':
      return <Pitch paragraphs={kit.pitch2} seconds={120} />
    case 'proofs':
      return <ProofsList />
    case 'summary':
      return (
        <dl className="grid gap-2 sm:grid-cols-2">
          {kit.summary.map((s) => (
            <div key={s.label} className="rounded-2xl border border-navy/10 bg-white px-5 py-3.5">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-slate">{s.label}</dt>
              <dd className="mt-1 text-[1.05rem] font-semibold text-navy">{s.value}</dd>
            </div>
          ))}
        </dl>
      )
  }
}

/** /argumentaire — « Argumentaire terrain », internal tool for medical representatives. */
export default function SalesKitPage() {
  const [params, setParams] = useSearchParams()
  const mode = parsePresentationMode(params.get('mode'))
  const kit = salesKits.find((k) => k.product === params.get('product')) ?? salesKits[0]
  const product = getProduct(kit.product)
  const order = KIT_SECTIONS_BY_MODE[mode].filter((id) => id !== 'proofs' || kit.product === 'biodigest')
  const sections = order.map((id) => KIT_SECTIONS.find((s) => s.id === id)!)
  const requested = params.get('section') as KitSectionId | null
  const section = requested && order.includes(requested) ? requested : order[0]

  const set = (key: string, value: string | null) =>
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        if (value === null) p.delete(key)
        else p.set(key, value)
        if (key !== 'section') p.delete('section')
        return p
      },
      { replace: true },
    )

  useEffect(() => {
    document.title = `Argumentaire terrain · ${kit.name} · Nutriome Labs`
  }, [kit.name])

  return (
    <div className="h-full overflow-y-auto bg-ivory">
      <header className="sticky top-0 z-20 border-b border-navy/10 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <Logo className="h-11 w-auto" />
          <div className="mr-auto">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate">
              <Lock className="size-3" aria-hidden /> Outil interne — représentants
            </p>
            <h1 className="font-serif text-[1.7rem] leading-tight text-navy">Argumentaire terrain</h1>
          </div>
          <div role="radiogroup" aria-label="Mode" className="flex flex-wrap rounded-full border border-navy/15 bg-white p-1">
            {PRESENTATION_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={mode === m.id}
                title={m.hint}
                onClick={() => set('mode', m.id === 'scientifique' ? null : (m.id as PresentationMode))}
                className={`min-h-10 rounded-full px-3.5 text-sm font-semibold ${mode === m.id ? 'bg-navy text-white' : 'text-slate hover:text-navy'}`}
              >
                {m.id === 'scientifique' ? 'Mode scientifique' : m.id === 'commercial' ? 'Mode commercial' : 'Visite médicale express'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pt-6 pb-16">
        <div className="flex flex-wrap items-center gap-3">
          {salesKits.map((k) => {
            const p = getProduct(k.product)
            const on = k.product === kit.product
            return (
              <button
                key={k.product}
                type="button"
                onClick={() => set('product', k.product)}
                aria-pressed={on}
                className={`flex items-center gap-3 rounded-2xl border bg-white py-2 pr-5 pl-2 text-left transition-shadow ${on ? 'shadow-[0_12px_30px_-18px_rgb(14_26_43/0.5)]' : 'opacity-70 hover:opacity-100'}`}
                style={{ borderColor: on ? p?.accent : 'rgb(14 26 43 / 0.1)' }}
              >
                {p && <img src={p.image} alt="" className="h-12 w-auto rounded" />}
                <span className="text-lg font-bold" style={{ color: on ? p?.accent : undefined }}>
                  {k.name}
                </span>
              </button>
            )
          })}
          <Link
            to={`/presentation${mode === 'scientifique' ? '' : `?mode=${mode}`}`}
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-white px-4 text-sm font-semibold text-navy"
          >
            <ArrowLeft className="size-4" aria-hidden /> Présentation
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr]">
          <nav aria-label="Sections" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => set('section', s.id)}
                aria-current={section === s.id ? 'page' : undefined}
                className={`shrink-0 rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors ${
                  section === s.id ? 'text-white' : 'bg-white text-navy hover:bg-navy/5'
                }`}
                style={section === s.id ? { background: product?.accent } : undefined}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <section aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={`${kit.product}-${section}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <h2 className="mb-4 font-serif text-[2rem] text-navy">{KIT_SECTIONS.find((s) => s.id === section)?.label}</h2>
                <Section kit={kit} id={section} />
              </motion.div>
            </AnimatePresence>
            <p className="mt-8 text-[13px] leading-snug text-slate">
              Données sur les ingrédients, pas sur le produit fini. Les allégations commerciales non validées (exclusivité, prix) ne sont pas affichées :
              voir <code className="rounded bg-navy/5 px-1">src/data/commercialClaims.ts</code>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
