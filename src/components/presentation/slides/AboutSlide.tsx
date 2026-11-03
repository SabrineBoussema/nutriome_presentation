import { BookOpen, FlaskConical, ShieldCheck, Stethoscope } from 'lucide-react'
import { company } from '../../../data/company'
import { products } from '../../../data/products'
import { useI18n } from '../../../i18n'
import { Eyebrow } from '../../ui/Badges'
import { Reveal } from '../../ui/Reveal'
import { SlideShell, SlideTitle } from '../../ui/SlideShell'

const ICONS = { flask: FlaskConical, shield: ShieldCheck, stethoscope: Stethoscope, book: BookOpen }

export function AboutSlide() {
  const { l, t } = useI18n()
  return (
    <SlideShell tone="ivory" label={t.about.eyebrow}>
      <div className="grid flex-1 gap-8 @4xl:grid-cols-[1.1fr_1fr] @4xl:gap-16">
        <div className="flex flex-col">
          <Reveal>
            <Eyebrow color="#1d5a39">{t.about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SlideTitle className="mt-4 text-navy @4xl:text-[72px]">{t.about.title}</SlideTitle>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate @4xl:text-[24px]">{l(company.intro)}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 @4xl:grid-cols-2">
            <Reveal delay={0.24} className="rounded-3xl bg-forest p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t.about.vision}</div>
              <p className="mt-2 font-serif text-xl leading-snug @4xl:text-[23px]">{l(company.vision)}</p>
            </Reveal>
            <Reveal delay={0.3} className="rounded-3xl bg-navy p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t.about.mission}</div>
              <p className="mt-2 font-serif text-xl leading-snug @4xl:text-[23px]">{l(company.mission)}</p>
            </Reveal>
          </div>
          <Reveal delay={0.38} className="mt-auto flex flex-wrap gap-x-12 gap-y-4 pt-8">
            {[
              { k: t.about.since, v: String(company.founded) },
              { k: t.about.products, v: String(products.length) },
              { k: t.about.base, v: 'Monastir' },
            ].map(({ k, v }) => (
              <div key={k}>
                <div className="font-serif text-4xl text-navy @4xl:text-[48px]">{v}</div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate">{k}</div>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="grid content-center gap-3 @4xl:gap-4">
          {company.pillars.map((p, i) => {
            const Icon = ICONS[p.icon]
            return (
              <Reveal key={i} delay={0.2 + i * 0.1} x={30} y={0}>
                <div className="flex gap-4 rounded-3xl border border-navy/[0.06] bg-white/80 p-5 backdrop-blur @4xl:p-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sage text-forest">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink @4xl:text-[23px]">{l(p.title)}</h3>
                    <p className="mt-1 text-sm leading-snug text-slate @4xl:text-[18px]">{l(p.body)}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </SlideShell>
  )
}
