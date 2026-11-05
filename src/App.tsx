import { lazy, Suspense } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { I18nProvider, useI18n } from './i18n'
import Presentation from './pages/Presentation'

const Direction = lazy(() => import('./pages/Direction'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const PrintDeck = lazy(() => import('./pages/PrintDeck'))

function NotFound() {
  const { t } = useI18n()
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 bg-ivory text-center">
      <h1 className="font-serif text-4xl text-navy">{t.notFound.title}</h1>
      <Link to="/presentation" className="rounded-full bg-navy px-5 py-2 text-white">
        {t.notFound.back}
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="fixed inset-0 bg-navy" />}>
          <Routes>
            <Route path="/" element={<Navigate to="/presentation" replace />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/nutriome_direction" element={<Direction />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/print" element={<PrintDeck />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </I18nProvider>
  )
}
