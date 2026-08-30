import { useEffect, useRef } from 'react'
import { googleFormUrl } from '../data/content'
import './GetStartedModal.css'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

export default function GetStartedModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    previouslyFocusedRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    modalRef.current?.querySelector('.gs-modal-close')?.focus()

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      // Trap Tab within the modal — without this, focus escapes into the
      // (still-present, just visually hidden-behind) page underneath.
      if (event.key === 'Tab' && modalRef.current) {
        const focusable = [...modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR)]
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
      previouslyFocusedRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="gs-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="gs-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Get started"
      >
        <div className="gs-modal-head">
          <span className="gs-modal-title">Let&apos;s Get Started</span>
          <button
            type="button"
            className="gs-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5 5 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="gs-modal-body">
          <iframe
            src={`${googleFormUrl}?embedded=true`}
            title="Get started form"
            className="gs-modal-iframe"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  )
}
