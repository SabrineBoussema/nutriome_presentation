import { Globe, Mail, MapPin, Phone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
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
    <section className="relative flex min-h-full w-full flex-col overflow-hidden bg-navy text-white @4xl:h-full">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 80% at 100% 0%, rgb(47 138 87 / 0.35), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgb(227 134 43 / 0.18), transparent 60%)' }}
        aria-hidden
      />
      <div className="relative z-10 grid flex-1 items-center gap-10 px-6 pb-28 pt-12 @4xl:grid-cols-[1.4fr_1fr] @4xl:gap-20 @4xl:px-24 @4xl:pb-16">
        <div>
          <Reveal>
            <div className="inline-block rounded-2xl bg-white px-5 py-3">
              <Logo className="h-14 w-auto @4xl:h-20" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-serif text-4xl leading-[1.04] tracking-[-0.02em] text-balance @4xl:text-[81px]">{t.closing.title}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-xl italic text-[#e9c46a] @4xl:text-[32px]">{l(company.signature)}</p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="rounded-[32px] bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur @4xl:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{t.closing.contact}</div>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map(({ icon: Icon, value, href }) => (
              <li key={value} className="flex items-center gap-3 text-base @4xl:text-[25px]">
                <Icon className="size-5 shrink-0 text-[#e9c46a]" aria-hidden />
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
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-3 text-navy">
            <QRCodeSVG value={company.website} size={96} fgColor="#0e1a2b" bgColor="#ffffff" level="M" />
            <span className="text-sm font-medium">{t.closing.scan}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
