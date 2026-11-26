import { AlertTriangle, ExternalLink, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { claimsFor, evidence, LEVEL_LABEL, STATUS_LABEL, type Claim } from '../../data/evidence'
import type { MechanismProductId, MechanismStage } from '../../data/mechanisms'
import { references } from '../../data/references'

function ClaimItem({ claim, review }: { claim: Claim; review: boolean }) {
  const level = LEVEL_LABEL[claim.level]
  return (
    <li className="rounded-2xl border border-navy/10 bg-white p-4">
      <p className="text-[20.5px] leading-snug text-ink">{claim.fr}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[15.5px]">
        <span className="rounded-full px-2.5 py-0.5 font-semibold text-white" style={{ background: level.tone }}>
          {level.fr}
        </span>
        {review && claim.status !== 'validated' && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber-soft px-2.5 py-0.5 font-semibold text-[#9a5612]">
            <AlertTriangle className="size-3.5" aria-hidden />
            {STATUS_LABEL[claim.status]}
          </span>
        )}
      </div>
      {review && claim.reviewNote && <p className="mt-2 text-[15.5px] leading-snug text-slate">Note de revue : {claim.reviewNote}</p>}
      {claim.refs.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-navy/10 pt-2.5">
          {claim.refs.map((id) => {
            const r = references[id]
            if (!r) return null
            return (
              <li key={id} className="text-[15.5px] leading-snug text-slate">
                <span className="font-semibold text-ink">{r.authors}</span>
                {r.year ? ` (${r.year}). ` : '. '}
                {r.title}. <span className="italic">{r.source}</span>.{' '}
                {r.doi && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ocean underline-offset-2 hover:underline">
                    DOI {r.doi}
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
                {r.pmid && (
                  <>
                    {' · '}
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-ocean underline-offset-2 hover:underline"
                    >
                      PMID {r.pmid}
                    </a>
                  </>
                )}
                {!r.doi && !r.pmid && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 font-medium text-ocean underline-offset-2 hover:underline">
                    Source
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      )}
      {claim.refs.length === 0 && review && <p className="mt-2 text-[15.5px] italic text-slate">Aucune source citée.</p>}
    </li>
  )
}

/** Scientific references drawer: claims of the current stage first, then the rest of the mechanism. */
export function ReferencesPanel({
  productId,
  stage,
  review,
  onClose,
}: {
  productId: MechanismProductId
  stage: MechanismStage
  review: boolean
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  const all = claimsFor(productId)
  const current = stage.claims.map((id) => evidence[id]).filter((c): c is Claim => Boolean(c) && c.status !== 'unsupported')
  const others = all.filter((c) => c.status !== 'unsupported' && !stage.claims.includes(c.id))
  const flagged = all.filter((c) => c.status === 'unsupported')

  return (
    <motion.aside
      role="dialog"
      aria-modal="false"
      aria-label="Références scientifiques"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-y-0 right-0 z-40 flex w-full max-w-[620px] flex-col border-l border-navy/10 bg-ivory shadow-[-24px_0_60px_-30px_rgb(14_26_43/0.45)]"
      onKeyDown={(e) => e.stopPropagation()}
    >
      <header className="flex items-center justify-between gap-4 border-b border-navy/10 px-7 py-5">
        <div>
          <p className="text-[15.5px] font-semibold uppercase tracking-[0.2em] text-slate">Références scientifiques</p>
          <h3 className="font-serif text-[35px] leading-tight text-navy">{stage.title}</h3>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer les références"
          className="flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy hover:bg-navy/5"
        >
          <X className="size-5" aria-hidden />
        </button>
      </header>
      <div className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-7 py-6">
        <section>
          <h4 className="mb-3 text-[17px] font-semibold uppercase tracking-[0.16em] text-ink">Étape en cours</h4>
          <ul className="space-y-3">
            {current.map((c) => (
              <ClaimItem key={c.id} claim={c} review={review} />
            ))}
          </ul>
        </section>
        {others.length > 0 && (
          <section>
            <h4 className="mb-3 text-[17px] font-semibold uppercase tracking-[0.16em] text-ink">Autres données du mécanisme</h4>
            <ul className="space-y-3">
              {others.map((c) => (
                <ClaimItem key={c.id} claim={c} review={review} />
              ))}
            </ul>
          </section>
        )}
        {review && flagged.length > 0 && (
          <section>
            <h4 className="mb-1 text-[17px] font-semibold uppercase tracking-[0.16em] text-[#9a5612]">En revue médicale — non affiché</h4>
            <p className="mb-3 text-[15.5px] text-slate">Allégations sans source vérifiable : elles ne sont jamais présentées comme des faits.</p>
            <ul className="space-y-3">
              {flagged.map((c) => (
                <ClaimItem key={c.id} claim={c} review />
              ))}
            </ul>
          </section>
        )}
        <p className="text-[15px] leading-snug text-slate">
          Les niveaux de preuve distinguent les allégations autorisées, la physiologie établie, les études mécanistiques et les études cliniques
          sur l’ingrédient. Aucune étude n’a été menée sur le produit fini.
        </p>
      </div>
    </motion.aside>
  )
}
