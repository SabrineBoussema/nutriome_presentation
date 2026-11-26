import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFullscreen } from '../hooks/useFullscreen'
import { ScreenView } from '../live/screens'
import { currentScreen, LIVE_WINDOW_FLAG, useLiveSync, useNow } from '../live/sync'
import { Stage } from '../live/ui'

/** LivePresentation — écran public projeté sur Zoom (1920×1080). Aucune commande visible. */
export default function Live() {
  const { state, config } = useLiveSync('live')
  const now = useNow(250)
  const navigate = useNavigate()
  const { toggle } = useFullscreen()
  const screen = currentScreen(state, config, now)
  const [cursor, setCursor] = useState(true)
  const idle = useRef<number | undefined>(undefined)

  useEffect(() => {
    document.title = 'Nutriome Labs — EPU en direct'
    try {
      sessionStorage.setItem(LIVE_WINDOW_FLAG, '1')
    } catch {
      /* ignore */
    }
  }, [])

  // Hand over the projection window to the product presentation (same window: Zoom sharing is kept)
  useEffect(() => {
    if (state.view === 'presentation') navigate(config.handoverUrl)
  }, [state.view, config.handoverUrl, navigate])

  // F: fullscreen (Échap is handled by the browser). No visible controls.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') toggle()
    }
    const onMove = () => {
      setCursor(true)
      window.clearTimeout(idle.current)
      idle.current = window.setTimeout(() => setCursor(false), 2000)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousemove', onMove)
    onMove()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousemove', onMove)
    }
  }, [toggle])

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#04140d]"
      style={{ cursor: cursor ? 'default' : 'none' }}
      onDoubleClick={toggle}
    >
      <Stage className="h-full w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={screen}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.985, filter: 'blur(6px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScreenView id={screen} config={config} now={now} />
          </motion.div>
        </AnimatePresence>
      </Stage>
      <AnimatePresence>
        {state.blackout && (
          <motion.div
            key="black"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
