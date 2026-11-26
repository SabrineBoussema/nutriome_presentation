import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Hand,
  Handshake,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  Microscope,
  Mic,
  PlayCircle,
  Share2,
  Sparkles,
  Users,
  Video,
  Ear,
  HeartHandshake,
  Globe,
} from 'lucide-react'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { products } from '../data/products'
import { DEFAULT_PORTRAIT, type EventConfig, type ScreenId } from './eventConfig'
import { Backdrop, Eyebrow, GOLD, LogoBadge, QrCard } from './ui'

const EASE = [0.22, 1, 0.36, 1] as const

export interface ScreenProps {
  config: EventConfig
  now: number
}

/* ---------------------------------------------------------------- helpers */

const up = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: EASE },
})

export function formatEventDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const day = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Tunis' }).format(d)
  const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' }).format(d).replace(':', 'h')
  return `${day.charAt(0).toUpperCase()}${day.slice(1)} — ${time}`
}

function Frame({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden font-sans ${tone === 'dark' ? 'text-white' : 'text-[#0e1a2b]'}`}>
      <Backdrop tone={tone} />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}

function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h1 className={`font-serif text-[84px] leading-[1.04] tracking-[-0.015em] text-balance ${className}`}>{children}</h1>
}

function Portrait({ src, size }: { src: string; size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute -inset-5 rounded-full"
        style={{ background: `conic-gradient(from 0deg, ${GOLD}, transparent 40%, ${GOLD} 70%, transparent)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute -inset-2 rounded-full bg-[#0b3524]" />
      <img src={src} alt="" className="absolute inset-0 h-full w-full rounded-full object-cover" draggable={false} />
    </div>
  )
}

function Pill({ icon: Icon, children, delay }: { icon: typeof Sparkles; children: ReactNode; delay: number }) {
  return (
    <motion.div
      {...up(delay, 20)}
      className="flex items-center gap-4 rounded-[24px] border border-white/15 bg-white/[0.08] px-6 py-5 backdrop-blur"
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: GOLD }}>
        <Icon className="size-7 text-[#2a1a03]" />
      </span>
      <span className="text-[32px] font-semibold leading-tight">{children}</span>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- screens */

function Welcome({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1fr_620px] gap-16 px-[120px] py-[90px]">
        <div className="flex flex-col">
          <motion.div {...up(0)}>
            <LogoBadge />
          </motion.div>
          <motion.div {...up(0.15)} className="mt-12">
            <Eyebrow>{config.eyebrow}</Eyebrow>
          </motion.div>
          <motion.div {...up(0.3)}>
            <Title className="mt-5 text-[104px]">Bienvenue à toutes et à tous</Title>
          </motion.div>
          <motion.p {...up(0.45)} className="mt-6 max-w-[1000px] text-[34px] leading-snug text-white/85">
            Nous sommes ravis de vous retrouver et d’accueillir nos nouveaux participants.
          </motion.p>
          <motion.div
            {...up(0.6)}
            className="mt-10 max-w-[1040px] rounded-[30px] border-l-[6px] bg-white/[0.08] px-9 py-7"
            style={{ borderColor: GOLD }}
          >
            <p className="text-[22px] font-bold uppercase tracking-[0.2em] text-[#f2c26f]">Thématique</p>
            <p className="mt-2 font-serif text-[46px] leading-[1.15]">{config.theme}</p>
          </motion.div>
          <motion.p {...up(0.75)} className="mt-8 flex items-center gap-4 text-[32px] font-semibold">
            <CalendarDays className="size-9 text-[#f2c26f]" />
            {formatEventDate(config.startsAt)}
            <span className="ml-3 flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[24px] font-medium text-white/80">
              <Video className="size-6" /> Zoom
            </span>
          </motion.p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1.1, ease: EASE }}>
            <Portrait src={config.speaker.portrait || DEFAULT_PORTRAIT} size={360} />
          </motion.div>
          <motion.p {...up(0.7)} className="mt-9 font-serif text-[54px] leading-none">
            {config.speaker.name}
          </motion.p>
          <motion.p {...up(0.8)} className="mt-3 text-[28px] text-[#f2c26f]">
            {config.speaker.title}
          </motion.p>
          <motion.p {...up(1)} className="mt-10 text-[28px] italic text-white/85">
            Début de la conférence à {formatEventDate(config.startsAt).split('— ')[1] ?? ''}
          </motion.p>
        </div>
      </div>
    </Frame>
  )
}

const PILLARS = [
  { icon: Microscope, label: 'Rigueur scientifique' },
  { icon: Lightbulb, label: 'Innovation' },
  { icon: BadgeCheck, label: 'Qualité' },
  { icon: Handshake, label: 'Collaboration avec les professionnels de santé' },
]

function About() {
  const shots = products.slice(0, 5)
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1fr_640px] gap-14 px-[120px] py-[90px]">
        <div className="flex flex-col justify-center">
          <motion.div {...up(0)}>
            <Eyebrow>Qui sommes-nous ?</Eyebrow>
          </motion.div>
          <motion.div {...up(0.15)}>
            <Title className="mt-5">
              Nutriome Labs — <span className="text-[#f2c26f]">Faisons avancer la micronutrition ensemble</span>
            </Title>
          </motion.div>
          <motion.p {...up(0.3)} className="mt-8 max-w-[1020px] text-[34px] leading-snug text-white/85">
            Nutriome Labs est un laboratoire tunisien spécialisé dans les compléments alimentaires et engagé dans le développement de
            solutions en micronutrition, ainsi que dans l’accompagnement scientifique des professionnels de santé.
          </motion.p>
          <div className="mt-12 grid max-w-[1060px] grid-cols-2 gap-5">
            {PILLARS.map((p, i) => (
              <Pill key={p.label} icon={p.icon} delay={0.5 + i * 0.15}>
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
        <div className="relative">
          {shots.map((p, i) => (
            <motion.img
              key={p.id}
              src={p.image}
              alt={p.name}
              draggable={false}
              className="absolute w-[300px] rounded-[18px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]"
              style={{ left: [40, 320, 0, 300, 150][i], top: [60, 170, 420, 540, 760][i] - 40, rotate: [-6, 5, 4, -4, 2][i] }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.4 + i * 0.15, duration: 0.8 },
                y: { delay: 0.4 + i * 0.15, duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          ))}
        </div>
      </div>
    </Frame>
  )
}

const AXES = [
  { icon: Lightbulb, title: 'Innover', text: 'Développer des formulations répondant aux besoins nutritionnels.' },
  {
    icon: HeartHandshake,
    title: 'Accompagner',
    text: 'Mettre à disposition des professionnels de santé des informations et des ressources scientifiques.',
  },
  { icon: Share2, title: 'Partager', text: 'Favoriser la formation continue, les échanges scientifiques et le partage des connaissances.' },
]

function Vision() {
  return (
    <Frame tone="light">
      <div className="flex h-full flex-col px-[120px] py-[90px]">
        <div className="flex items-start justify-between">
          <div>
            <motion.div {...up(0)}>
              <Eyebrow light={false}>Notre vision et notre mission</Eyebrow>
            </motion.div>
            <motion.div {...up(0.15)}>
              <Title className="mt-5 text-[#0f4a33]">Trois engagements au quotidien</Title>
            </motion.div>
          </div>
          <LogoBadge size="sm" />
        </div>
        <div className="relative mt-auto grid grid-cols-3 gap-10">
          <motion.div
            className="absolute left-[16%] right-[16%] top-[70px] h-[4px] origin-left rounded-full"
            style={{ background: `linear-gradient(90deg, ${GOLD}, #0f4a33)` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.6, ease: EASE }}
          />
          {AXES.map((a, i) => (
            <motion.div
              key={a.title}
              {...up(0.4 + i * 0.35, 40)}
              className="relative flex flex-col items-center rounded-[36px] bg-white px-10 pb-12 pt-0 text-center shadow-[0_40px_80px_-50px_rgba(15,74,51,.6)]"
            >
              <span className="-mt-0 flex size-[140px] items-center justify-center rounded-full border-[6px] border-white bg-[#0f4a33] shadow-xl">
                <a.icon className="size-16 text-[#f2c26f]" />
              </span>
              <p className="mt-6 font-serif text-[64px] leading-none text-[#0f4a33]">{a.title}</p>
              <p className="mt-5 text-[32px] leading-snug text-[#33424f]">{a.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-auto" />
      </div>
    </Frame>
  )
}

function Range({ config, now }: ScreenProps) {
  const list = products
  const spot = Math.floor(now / 3200) % list.length
  return (
    <Frame>
      <div className="flex h-full flex-col px-[110px] py-[80px]">
        <div className="flex items-start justify-between">
          <div>
            <motion.div {...up(0)}>
              <Eyebrow>Notre gamme</Eyebrow>
            </motion.div>
            <motion.div {...up(0.15)}>
              <Title className="mt-5">Nos compléments alimentaires</Title>
            </motion.div>
          </div>
          <LogoBadge size="sm" />
        </div>
        <div className="my-auto flex items-end justify-center gap-6 pt-6">
          {list.map((p, i) => {
            const active = i === spot
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: active ? -24 : 0, scale: active ? 1.08 : 1 }}
                transition={{ opacity: { delay: 0.3 + i * 0.18, duration: 0.8 }, default: { duration: 0.7, ease: EASE } }}
                className="flex w-[236px] flex-col items-center"
              >
                <div
                  className={`overflow-hidden rounded-[20px] bg-white p-2 transition-shadow duration-700 ${active ? 'shadow-[0_0_0_4px_#e7a23b,0_40px_80px_-30px_rgba(0,0,0,.8)]' : 'shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)]'}`}
                >
                  <img src={p.image} alt={p.name} className="w-full rounded-[14px]" draggable={false} />
                </div>
                <p className="mt-5 text-center text-[30px] font-semibold leading-tight">{p.name}</p>
                <p className={`mt-1 text-center text-[22px] font-semibold uppercase tracking-[0.14em] ${active ? 'text-[#f2c26f]' : 'text-white/60'}`}>
                  {p.category.fr}
                </p>
              </motion.div>
            )
          })}
        </div>
        <motion.p {...up(1.6)} className="text-center text-[26px] text-white/70">
          {config.websiteLabel}
        </motion.p>
      </div>
    </Frame>
  )
}

const ACADEMY = [
  { icon: GraduationCap, label: 'EPU scientifiques' },
  { icon: Sparkles, label: 'Masterclasses' },
  { icon: Mic, label: 'Conférences avec des experts' },
  { icon: PlayCircle, label: 'Replays des interventions' },
  { icon: BookOpen, label: 'Formation continue' },
  { icon: Share2, label: 'Partage des connaissances' },
  { icon: Users, label: 'Échanges entre professionnels de santé' },
]

function Academy({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1fr_560px] gap-16 px-[120px] py-[90px]">
        <div className="flex flex-col justify-center">
          <motion.div {...up(0)}>
            <Eyebrow>Nutriome Academy</Eyebrow>
          </motion.div>
          <motion.div {...up(0.15)}>
            <Title className="mt-5">Au-delà des produits, un engagement scientifique</Title>
          </motion.div>
          <motion.p {...up(0.3)} className="mt-6 text-[34px] text-white/85">
            Un espace dédié aux professionnels de santé.
          </motion.p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {ACADEMY.map((a, i) => (
              <Pill key={a.label} icon={a.icon} delay={0.45 + i * 0.1}>
                <span className="text-[28px]">{a.label}</span>
              </Pill>
            ))}
          </div>
        </div>
        <motion.div {...up(0.6)} className="flex flex-col items-center justify-center gap-8">
          <QrCard url={config.academyUrl} label={config.websiteLabel} caption="Accéder à la plateforme" />
          <p className="flex items-center gap-3 text-[30px] text-white/85">
            <Globe className="size-8 text-[#f2c26f]" /> {config.websiteLabel}
          </p>
        </motion.div>
      </div>
    </Frame>
  )
}

function Newcomers() {
  return (
    <Frame>
      <div className="flex h-full flex-col justify-center px-[160px]">
        <motion.div {...up(0)}>
          <Eyebrow>Bienvenue à nos nouveaux participants</Eyebrow>
        </motion.div>
        <motion.div {...up(0.15)}>
          <Title className="mt-5 text-[96px]">Une communauté scientifique qui grandit</Title>
        </motion.div>
        <motion.p {...up(0.3)} className="mt-8 max-w-[1400px] text-[36px] leading-snug text-white/85">
          Nous adressons une bienvenue toute particulière aux médecins et professionnels de santé qui nous rejoignent pour la première
          fois. Nous sommes heureux de partager avec vous cette rencontre scientifique et d’ouvrir ensemble de nouvelles perspectives
          de collaboration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 120, damping: 14 }}
          className="mt-14 flex items-center gap-6 self-start rounded-[40px] rounded-bl-[8px] bg-white px-10 py-8 text-[#0f4a33] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]"
        >
          <MessageCircle className="size-16 shrink-0" style={{ color: GOLD }} />
          <div>
            <p className="font-serif text-[52px] leading-tight">Présentez-vous dans le chat</p>
            <p className="mt-1 text-[34px] text-[#33424f]">Votre spécialité et votre ville.</p>
          </div>
          <span className="ml-6 flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-4 rounded-full bg-[#0f4a33]" style={{ animation: `live-dots 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </span>
        </motion.div>
      </div>
    </Frame>
  )
}

const COLLAB = [
  { icon: Ear, label: 'L’écoute des professionnels de santé' },
  { icon: Share2, label: 'Le partage d’expertise' },
  { icon: MessagesSquare, label: 'Les échanges scientifiques' },
  { icon: Handshake, label: 'Les nouvelles collaborations' },
  { icon: HeartHandshake, label: 'L’accompagnement de la pratique professionnelle' },
]

function Collaborate({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[minmax(0,1fr)_680px] gap-12 px-[100px] py-[90px]">
        <div className="flex flex-col justify-center">
          <motion.div {...up(0)}>
            <Eyebrow>Collaborons ensemble</Eyebrow>
          </motion.div>
          <motion.div {...up(0.15)}>
            <Title className="mt-5">Construisons ensemble une relation de confiance</Title>
          </motion.div>
          <div className="mt-10 flex flex-col gap-4">
            {COLLAB.map((c, i) => (
              <Pill key={c.label} icon={c.icon} delay={0.35 + i * 0.12}>
                {c.label}
              </Pill>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <motion.div {...up(0.6)}>
            <QrCard url={config.contactUrl} label={config.contactLabel} caption="Contactez le laboratoire" />
          </motion.div>
          <motion.p {...up(1.1)} className="font-serif text-[38px] italic leading-snug text-[#f6e3bd]">
            « Ensemble, contribuons au développement d’une micronutrition fondée sur la science, l’écoute et le partage. »
          </motion.p>
        </div>
      </div>
    </Frame>
  )
}

function Program({ config }: ScreenProps) {
  const items = config.program
  return (
    <Frame tone="light">
      <div className="flex h-full flex-col px-[120px] py-[80px]">
        <div className="flex items-start justify-between">
          <div>
            <motion.div {...up(0)}>
              <Eyebrow light={false}>Programme scientifique</Eyebrow>
            </motion.div>
            <motion.div {...up(0.15)}>
              <Title className="mt-4 max-w-[1400px] text-[60px] text-[#0f4a33]">{config.theme}</Title>
            </motion.div>
          </div>
          <LogoBadge size="sm" />
        </div>
        <div className="relative my-auto">
          <motion.div
            className="absolute left-[70px] right-[70px] top-[62px] h-[5px] origin-left rounded-full"
            style={{ background: `linear-gradient(90deg, #0f4a33, ${GOLD})` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 2.2, ease: EASE }}
          />
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
            {items.map((it, i) => (
              <motion.div key={i} {...up(0.5 + i * 0.3, 30)} className="flex flex-col items-center px-3 text-center">
                <span className="flex size-[124px] items-center justify-center rounded-full border-[6px] border-[#f6efe2] bg-[#0f4a33] font-serif text-[52px] text-[#f2c26f] shadow-xl">
                  {i + 1}
                </span>
                <p className="mt-7 font-serif text-[36px] leading-[1.12] text-[#0e1a2b]">{it.title}</p>
                <p className="mt-3 text-[26px] font-semibold text-[#b06d12]">{it.speaker}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}

function Speaker({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[700px_1fr] items-center gap-20 px-[140px]">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: EASE }}>
          <Portrait src={config.speaker.portrait || DEFAULT_PORTRAIT} size={620} />
        </motion.div>
        <div>
          <motion.div {...up(0.3)}>
            <Eyebrow>{config.eyebrow}</Eyebrow>
          </motion.div>
          <motion.p {...up(0.45)} className="mt-6 font-serif text-[120px] leading-none">
            {config.speaker.name}
          </motion.p>
          <motion.p {...up(0.6)} className="mt-5 text-[40px] text-[#f2c26f]">
            {config.speaker.title}
          </motion.p>
          <motion.p {...up(0.75)} className="mt-10 max-w-[900px] font-serif text-[46px] leading-[1.18] text-white/90">
            {config.theme}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 1.4, duration: 1.8, ease: EASE }}
            className="mt-14 border-t border-white/20 pt-8 text-[36px] italic text-white/85"
          >
            Nous avons le plaisir de vous donner la parole, {config.speaker.name.replace(/GASMI/, 'Gasmi')}.
          </motion.p>
        </div>
      </div>
    </Frame>
  )
}

function Malek({ config }: ScreenProps) {
  const featured = ['biodigest', 'bio3mag'].map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined)
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1fr_640px] items-center gap-16 px-[140px]">
        <div>
          <motion.div {...up(0)}>
            <Eyebrow>Transition</Eyebrow>
          </motion.div>
          <motion.div {...up(0.15)}>
            <Title className="mt-6 text-[110px]">
              De la science <span className="text-[#f2c26f]">à la micronutrition</span>
            </Title>
          </motion.div>
          <motion.p {...up(0.35)} className="mt-8 max-w-[1000px] text-[38px] leading-snug text-white/85">
            Présentation de deux compléments alimentaires Nutriome Labs en lien avec la thématique de ce soir.
          </motion.p>
          <motion.p {...up(0.55)} className="mt-12 flex items-center gap-5 font-serif text-[64px]">
            <span className="h-[4px] w-20 rounded-full" style={{ background: GOLD }} />
            {config.presenter.name}
          </motion.p>
        </div>
        <div className="relative h-[620px]">
          {featured.map((p, i) => (
            <motion.img
              key={p.id}
              src={p.image}
              alt={p.name}
              draggable={false}
              className="absolute w-[400px] rounded-[22px] bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)]"
              style={{ left: i ? 200 : 0, top: i ? 250 : 20, rotate: i ? 5 : -5 }}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.3, duration: 1, ease: EASE }}
            />
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Break() {
  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <motion.div {...up(0)}>
          <LogoBadge size="lg" />
        </motion.div>
        <motion.div {...up(0.2)}>
          <Title className="mt-14 text-[110px]">Courte pause</Title>
        </motion.div>
        <motion.p {...up(0.4)} className="mt-6 text-[40px] text-white/85">
          Nous reprenons dans quelques instants
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ animation: `live-dots 1.4s ease-in-out ${i * 0.25}s infinite` }}>
              .
            </span>
          ))}
        </motion.p>
      </div>
    </Frame>
  )
}

function QA() {
  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center px-[160px] text-center">
        <motion.div {...up(0)}>
          <Eyebrow>Questions et réponses</Eyebrow>
        </motion.div>
        <motion.div {...up(0.15)}>
          <Title className="mt-6 text-[140px]">Place aux échanges</Title>
        </motion.div>
        <motion.p {...up(0.35)} className="mt-8 max-w-[1300px] font-serif text-[46px] italic leading-snug text-white/90">
          Vos questions, vos expériences et vos réflexions enrichissent cette rencontre scientifique.
        </motion.p>
        <div className="mt-16 flex gap-10">
          {[
            { icon: MessageCircle, label: 'Écrivez dans le chat' },
            { icon: Hand, label: 'Levez la main sur Zoom' },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              {...up(0.6 + i * 0.2)}
              className="flex items-center gap-6 rounded-[32px] bg-white px-10 py-7 text-[#0f4a33] shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]"
            >
              <motion.span
                animate={i ? { rotate: [0, 14, -6, 14, 0] } : { y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5 }}
                className="flex size-20 items-center justify-center rounded-full"
                style={{ background: GOLD }}
              >
                <c.icon className="size-11 text-[#2a1a03]" />
              </motion.span>
              <span className="text-[40px] font-semibold">{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Thanks({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="grid h-full grid-cols-[1fr_700px] gap-16 px-[120px] py-[90px]">
        <div className="flex flex-col">
          <motion.div {...up(0)}>
            <LogoBadge />
          </motion.div>
          <motion.div {...up(0.15)}>
            <Title className="mt-12 text-[96px]">Merci pour votre présence et votre confiance</Title>
          </motion.div>
          <div className="mt-10 flex flex-col gap-4 text-[34px] text-white/90">
            {[
              `${config.speaker.name.replace(/GASMI/, 'Gasmi')}, pour son intervention`,
              `${config.presenter.name}, pour sa présentation`,
              'Et l’ensemble des professionnels de santé présents',
            ].map((t, i) => (
              <motion.p key={t} {...up(0.35 + i * 0.15, 16)} className="flex items-center gap-4">
                <Sparkles className="size-8 shrink-0 text-[#f2c26f]" /> {t}
              </motion.p>
            ))}
          </div>
          <motion.p {...up(0.9)} className="mt-auto flex items-center gap-4 text-[30px] text-white/80">
            <Globe className="size-8 text-[#f2c26f]" /> {config.websiteLabel}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: EASE }}
          className="flex flex-col items-center justify-center gap-10"
        >
          <Portrait src={config.speaker.portrait || DEFAULT_PORTRAIT} size={300} />
          <QrCard url={config.academyUrl} label={config.websiteLabel} caption="Notre site" />
        </motion.div>
      </div>
    </Frame>
  )
}


function Theme({ config }: ScreenProps) {
  return (
    <Frame tone="light">
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-20 px-[130px]">
        <div>
          <motion.div {...up(0)}>
            <Eyebrow light={false}>Thématique de la soirée</Eyebrow>
          </motion.div>
          <motion.p {...up(0.2)} className="mt-8 font-serif text-[92px] leading-[1.04] tracking-[-0.015em] text-[#0f4a33] text-balance">
            {config.theme}
          </motion.p>
          <motion.p {...up(0.45)} className="mt-10 flex items-center gap-4 text-[32px] font-semibold text-[#33424f]">
            <CalendarDays className="size-9" style={{ color: GOLD }} />
            {formatEventDate(config.startsAt)}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: EASE }}
          className="flex flex-col items-center rounded-[44px] bg-[#0f4a33] px-10 pb-12 pt-14 text-center text-white shadow-[0_50px_100px_-50px_rgba(15,74,51,.9)]"
        >
          <Portrait src={config.speaker.portrait || DEFAULT_PORTRAIT} size={300} />
          <p className="mt-10 font-serif text-[50px] leading-none">{config.speaker.name}</p>
          <p className="mt-3 text-[26px] text-[#f2c26f]">{config.speaker.title}</p>
        </motion.div>
      </div>
    </Frame>
  )
}

function Resume({ config }: ScreenProps) {
  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center px-[160px] text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: EASE }}>
          <Portrait src={config.speaker.portrait || DEFAULT_PORTRAIT} size={260} />
        </motion.div>
        <motion.div {...up(0.3)} className="mt-14">
          <Eyebrow>Reprise de la conférence scientifique</Eyebrow>
        </motion.div>
        <motion.p {...up(0.45)} className="mt-6 font-serif text-[104px] leading-none">
          {config.speaker.name}
        </motion.p>
        <motion.p {...up(0.6)} className="mt-8 max-w-[1400px] font-serif text-[42px] italic leading-snug text-white/85">
          {config.theme}
        </motion.p>
      </div>
    </Frame>
  )
}

function Next({ config }: ScreenProps) {
  return (
    <Frame tone="light">
      <div className="grid h-full grid-cols-[1fr_520px] items-center gap-20 px-[130px]">
        <div>
          <motion.div {...up(0)}>
            <Eyebrow light={false}>Prochain rendez-vous scientifique</Eyebrow>
          </motion.div>
          <motion.p {...up(0.2)} className="mt-8 flex items-center gap-6 font-serif text-[120px] leading-none text-[#0f4a33]">
            <CalendarDays className="size-24" style={{ color: GOLD }} />
            {config.next.date}
          </motion.p>
          <motion.p {...up(0.45)} className="mt-10 max-w-[1100px] font-serif text-[52px] leading-[1.15] text-[#0e1a2b] text-balance">
            « {config.next.theme} »
          </motion.p>
        </div>
        <motion.div {...up(0.7)} className="flex flex-col items-center gap-8">
          <LogoBadge size="lg" />
          <QrCard url={config.academyUrl} label={config.websiteLabel} caption="Notre site" />
        </motion.div>
      </div>
    </Frame>
  )
}

export const SCREEN_COMPONENTS: Record<ScreenId, (p: ScreenProps) => ReactNode> = {
  welcome: Welcome,
  theme: Theme,
  resume: Resume,
  next: Next,
  about: About,
  vision: Vision,
  range: Range,
  academy: Academy,
  newcomers: Newcomers,
  collaborate: Collaborate,
  program: Program,
  speaker: Speaker,
  malek: Malek,
  break: Break,
  qa: QA,
  thanks: Thanks,
}

export function ScreenView({ id, ...props }: ScreenProps & { id: ScreenId }) {
  const C = SCREEN_COMPONENTS[id]
  return <C {...props} />
}
