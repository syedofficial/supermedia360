import { useEffect, useState } from 'react'
import './CookieConsent.css'

const STORAGE_KEY = 'sm360-cookie-consent'
const SHOW_DELAY_MS = 10000

function hasDecided() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // Storage unavailable (private browsing, disabled) — treat as already
    // decided so we fail closed instead of showing this on every load.
    return true
  }
}

function remember() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // best-effort only
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasDecided()) return undefined

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    remember()
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <button
        type="button"
        className="cookie-close"
        aria-label="Dismiss"
        onClick={dismiss}
      >
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path
            d="M5 5l10 10M15 5 5 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <p className="cookie-text">
        We use cookies to improve your experience and analyze site traffic.
        By continuing to browse, you agree to our use of cookies.
      </p>

      <button type="button" className="btn btn-primary cookie-accept" onClick={dismiss}>
        Accept
      </button>
    </div>
  )
}
