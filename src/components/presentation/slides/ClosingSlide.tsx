import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { company } from '../../../data/company'
import { useI18n } from '../../../i18n'
import { Logo } from '../../ui/Logo'
import { Reveal } from '../../ui/Reveal'

export function ClosingSlide() {
  const { l, t } = useI18n()
  const items = [
    { icon: Globe, value: company.websiteLabel, href: company.website },
    { icon: Mail, value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: MapPin, value: l(company.location) },
  ]
  return (
    <section className="relative flex min-h-full w-full flex-col overflow-hidden bg-ivory grain text-ink @4xl:h-full">
      <div className="relative z-10 grid flex-1 items-center gap-10 px-6 pb-28 pt-12 @4xl:grid-cols-[1.4fr_1fr] @4xl:gap-20 @4xl:px-24 @4xl:pb-16">
        <div>
          <Reveal>
            <Logo className="h-16 w-auto @4xl:h-24" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-serif text-4xl leading-[1.04] tracking-[-0.02em] text-navy text-balance @4xl:text-[81px]">{t.closing.title}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-xl italic text-forest @4xl:text-[32px]">{l(company.signature)}</p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="rounded-[32px] border border-navy/[0.06] bg-white p-6 shadow-[0_20px_50px_-36px_rgb(14_26_43/0.45)] @4xl:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">{t.closing.contact}</div>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map(({ icon: Icon, value, href }) => (
              <li key={value} className="flex items-center gap-3 text-base text-ink @4xl:text-[25px]">
                <Icon className="size-5 shrink-0 text-forest" aria-hidden />
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="hover:underline">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
