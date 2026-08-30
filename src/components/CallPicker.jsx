import { forwardRef, useCallback, useRef, useState } from 'react'
import { contactNumbers } from '../data/content'
import { useDismiss } from '../hooks/useDismiss'
import './CallPicker.css'

const CallPicker = forwardRef(function CallPicker({ className, children }, triggerRef) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])

  useDismiss(open, close, rootRef)

  return (
    // Spans throughout — this component gets used inline inside a <p> (the
    // Packages footnote), where a <div> would be invalid HTML (not
    // "phrasing content") and trigger the browser to silently close the
    // paragraph early.
    <span className="call-picker" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {children}
      </button>

      {open && (
        <span className="call-picker-menu" role="menu">
          {contactNumbers.map((number) => (
            <a
              key={number}
              href={`tel:+91${number}`}
              className="call-picker-option"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <svg
                className="call-picker-option-icon"
                viewBox="0 0 20 20"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5.5 3h2l1.2 3.3-1.6 1.3a9 9 0 0 0 4.3 4.3l1.3-1.6L16 11.5v2a1.5 1.5 0 0 1-1.6 1.5A11.5 11.5 0 0 1 4 4.6 1.5 1.5 0 0 1 5.5 3Z" />
              </svg>
              <span className="call-picker-option-number">{number}</span>
            </a>
          ))}
        </span>
      )}
    </span>
  )
})

export default CallPicker
