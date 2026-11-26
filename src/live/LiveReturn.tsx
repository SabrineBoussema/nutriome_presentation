import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LIVE_WINDOW_FLAG, useLiveSync } from './sync'

function Listener() {
  const { state } = useLiveSync('presentation')
  const navigate = useNavigate()
  useEffect(() => {
    if (state.view === 'live') navigate('/live')
  }, [state.view, navigate])
  return null
}

/** Mounted on /presentation: only active in the projection window opened from /live, so the régie can bring it back. */
export function LiveReturn() {
  let active = false
  try {
    active = sessionStorage.getItem(LIVE_WINDOW_FLAG) === '1'
  } catch {
    active = false
  }
  return active ? <Listener /> : null
}
