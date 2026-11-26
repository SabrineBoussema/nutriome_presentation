import { Download, ImagePlus, Plus, RotateCcw, Trash2, Upload } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { DEFAULT_EVENT, DEFAULT_PORTRAIT, type EventConfig } from './eventConfig'

const input =
  'w-full rounded-lg border border-white/12 bg-[#0b2219] px-2.5 py-2 text-[13.5px] text-white outline-none focus:border-[#e7a23b]'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/55">{label}</span>
      {children}
    </label>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-b border-white/10 p-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#e7a23b]">{title}</h3>
      {children}
    </section>
  )
}

/** startsAt ISO (+01:00, Tunisia has no DST) ⇄ datetime-local value */
const toLocal = (iso: string) => iso.slice(0, 16)
const fromLocal = (v: string) => `${v}:00+01:00`

async function resizeImage(file: File): Promise<string> {
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.src = url
  await img.decode()
  const side = Math.min(img.width, img.height)
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 640
  canvas.getContext('2d')!.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, 640, 640)
  URL.revokeObjectURL(url)
  return canvas.toDataURL('image/jpeg', 0.86)
}

/** EventConfiguration editor — tout le contenu d'un EPU, sans modifier le code. */
export function AdminEventEditor({ config, onChange }: { config: EventConfig; onChange: (c: EventConfig) => void }) {
  const set = <K extends keyof EventConfig>(k: K, v: EventConfig[K]) => onChange({ ...config, [k]: v })
  const portraitInput = useRef<HTMLInputElement>(null)
  const importInput = useRef<HTMLInputElement>(null)

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `epu-${config.startsAt.slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const importJson = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as Partial<EventConfig>
      onChange({ ...DEFAULT_EVENT, ...parsed, version: 1 })
    } catch {
      window.alert('Fichier invalide.')
    }
  }

  return (
    <div className="text-[13.5px]">
      <Section title="Événement">
        <Field label="Mention">
          <input className={input} value={config.eyebrow} onChange={(e) => set('eyebrow', e.target.value)} />
        </Field>
        <Field label="Thématique">
          <textarea className={`${input} min-h-[72px]`} value={config.theme} onChange={(e) => set('theme', e.target.value)} />
        </Field>
        <Field label="Date et heure (heure de Tunis)">
          <input
            type="datetime-local"
            className={input}
            value={toLocal(config.startsAt)}
            onChange={(e) => e.target.value && set('startsAt', fromLocal(e.target.value))}
          />
        </Field>
      </Section>

      <Section title="Intervenants">
        <div className="flex items-center gap-3">
          <img src={config.speaker.portrait || DEFAULT_PORTRAIT} alt="" className="size-16 rounded-full object-cover" />
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => portraitInput.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-2.5 py-1.5 font-semibold"
            >
              <ImagePlus className="size-4" /> Changer le portrait
            </button>
            {config.speaker.portrait && (
              <button type="button" onClick={() => set('speaker', { ...config.speaker, portrait: '' })} className="text-left text-[12px] text-white/60 underline">
                Portrait officiel par défaut
              </button>
            )}
          </div>
          <input
            ref={portraitInput}
            type="file"
            accept="image/*"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0]
              if (f) set('speaker', { ...config.speaker, portrait: await resizeImage(f) })
              e.target.value = ''
            }}
          />
        </div>
        <Field label="Conférencier">
          <input className={input} value={config.speaker.name} onChange={(e) => set('speaker', { ...config.speaker, name: e.target.value })} />
        </Field>
        <Field label="Titre du conférencier">
          <input className={input} value={config.speaker.title} onChange={(e) => set('speaker', { ...config.speaker, title: e.target.value })} />
        </Field>
        <Field label="Présentation produits par">
          <input className={input} value={config.presenter.name} onChange={(e) => set('presenter', { ...config.presenter, name: e.target.value })} />
        </Field>
      </Section>

      <Section title="Programme">
        {config.program.map((it, i) => (
          <div key={i} className="flex gap-2">
            <span className="mt-2 w-5 shrink-0 text-white/50">{i + 1}.</span>
            <div className="flex flex-1 flex-col gap-1">
              <input
                className={input}
                value={it.title}
                onChange={(e) => set('program', config.program.map((p, j) => (j === i ? { ...p, title: e.target.value } : p)))}
              />
              <input
                className={`${input} text-white/70`}
                value={it.speaker}
                onChange={(e) => set('program', config.program.map((p, j) => (j === i ? { ...p, speaker: e.target.value } : p)))}
              />
            </div>
            <button
              type="button"
              aria-label="Supprimer"
              onClick={() => set('program', config.program.filter((_, j) => j !== i))}
              className="mt-1 h-8 rounded-md p-1.5 text-white/50 hover:text-white"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set('program', [...config.program, { title: 'Nouvelle étape', speaker: '' }])}
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-white/[0.08] px-2.5 py-1.5 font-semibold"
        >
          <Plus className="size-4" /> Ajouter une étape
        </button>
      </Section>

      <Section title="Prochain rendez-vous">
        <Field label="Date">
          <input className={input} value={config.next.date} onChange={(e) => set('next', { ...config.next, date: e.target.value })} />
        </Field>
        <Field label="Thème">
          <textarea className={`${input} min-h-[72px]`} value={config.next.theme} onChange={(e) => set('next', { ...config.next, theme: e.target.value })} />
        </Field>
      </Section>

      <Section title="Liens et QR codes">
        <Field label="Nutriome Academy (QR)">
          <input className={input} value={config.academyUrl} onChange={(e) => set('academyUrl', e.target.value)} />
        </Field>
        <Field label="Canal de contact (QR)">
          <input className={input} value={config.contactUrl} onChange={(e) => set('contactUrl', e.target.value)} />
        </Field>
        <Field label="Libellé du contact">
          <input className={input} value={config.contactLabel} onChange={(e) => set('contactLabel', e.target.value)} />
        </Field>
        <Field label="Présentation produits (adresse)">
          <input className={input} value={config.handoverUrl} onChange={(e) => set('handoverUrl', e.target.value)} />
        </Field>
      </Section>

      <Section title="Écrans d’attente (défilement automatique)">
        {config.screens.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={s.loop}
              onChange={(e) => set('screens', config.screens.map((x) => (x.id === s.id ? { ...x, loop: e.target.checked } : x)))}
              className="accent-[#e7a23b]"
              aria-label={`Inclure ${s.label}`}
            />
            <span className="flex-1 truncate">{s.label}</span>
            <input
              type="number"
              min={5}
              max={120}
              value={s.duration}
              onChange={(e) => set('screens', config.screens.map((x) => (x.id === s.id ? { ...x, duration: Math.max(5, Number(e.target.value) || 5) } : x)))}
              className={`${input} w-16 text-right`}
              aria-label={`Durée ${s.label}`}
            />
            <span className="text-white/50">s</span>
          </div>
        ))}
      </Section>

      <Section title="Sauvegarde">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportJson} className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-2.5 py-1.5 font-semibold">
            <Download className="size-4" /> Exporter
          </button>
          <button
            type="button"
            onClick={() => importInput.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-2.5 py-1.5 font-semibold"
          >
            <Upload className="size-4" /> Importer
          </button>
          <button
            type="button"
            onClick={() => window.confirm('Revenir au contenu par défaut de cet EPU ?') && onChange(DEFAULT_EVENT)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-2.5 py-1.5 font-semibold"
          >
            <RotateCcw className="size-4" /> Réinitialiser
          </button>
          <input
            ref={importInput}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void importJson(f)
              e.target.value = ''
            }}
          />
        </div>
        <p className="text-[12px] text-white/50">Les modifications s’appliquent immédiatement à l’écran /live et sont enregistrées dans ce navigateur.</p>
      </Section>
    </div>
  )
}
