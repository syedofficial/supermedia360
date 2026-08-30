import { useCallback, useEffect, useRef, useState } from 'react'
import GetStartedModal from '../components/GetStartedModal'
import { GetStartedContext } from './getStartedContextObject'

// The cookie banner shows at 10s — this fires well after, so the two never
// compete for the visitor's attention.
const AUTO_POPUP_DELAY_MS = 35000
const AUTO_POPUP_STORAGE_KEY = 'sm360-get-started-auto-shown'

function hasAutoPopupFired() {
  try {
    return localStorage.getItem(AUTO_POPUP_STORAGE_KEY) === '1'
  } catch {
    // Storage unavailable (private browsing, disabled) — treat as already
    // fired so we fail closed instead of popping this on every load.
    return true
  }
}

function markAutoPopupFired() {
  try {
    localStorage.setItem(AUTO_POPUP_STORAGE_KEY, '1')
  } catch {
    // best-effort only
  }
}

export function GetStartedProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const autoTimerRef = useRef(null)

  // Every "Get Started" trigger (manual or automatic) flows through this,
  // so it also cancels the pending auto-popup timer and marks it consumed
  // — once a visitor has seen the form, once, the automatic popup never
  // fires on top of that later in the same visit.
  const open = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current)
      autoTimerRef.current = null
    }
    markAutoPopupFired()
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (hasAutoPopupFired()) return undefined

    autoTimerRef.current = setTimeout(() => {
      autoTimerRef.current = null
      open()
    }, AUTO_POPUP_DELAY_MS)

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    }
  }, [open])

  return (
    <GetStartedContext.Provider value={open}>
      {children}
      <GetStartedModal isOpen={isOpen} onClose={close} />
    </GetStartedContext.Provider>
  )
}
