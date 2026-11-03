import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from '../data/types'
import { en } from './en'
import { fr, type Dictionary } from './fr'

const dictionaries: Record<Lang, Dictionary> = { fr, en }
const STORAGE_KEY = 'nutriome.lang'

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
  /** Resolve a localized data string */
  l: (value: L) => string
  /** Locale-aware number formatting (French decimal comma) */
  n: (value: number) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* storage unavailable */
  }
  return 'fr'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nValue>(() => {
    const nf = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 2 })
    return { lang, setLang, t: dictionaries[lang], l: (v) => v[lang], n: (v) => nf.format(v) }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
