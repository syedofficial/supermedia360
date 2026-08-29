import { forwardRef, useEffect, useRef, useState } from 'react'
import './CallPicker.css'

const CALL_OPTIONS = [
  { label: 'Option 1', number: '7806929113' },
  { label: 'Option 2', number: '8667665118' },
]

const CallPicker = forwardRef(function CallPicker({ className, children }, triggerRef) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

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
          {CALL_OPTIONS.map((option) => (
            <a
              key={option.number}
              href={`tel:+91${option.number}`}
              className="call-picker-option"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              <span className="call-picker-option-label">{option.label}</span>
              <span className="call-picker-option-number">{option.number}</span>
            </a>
          ))}
        </span>
      )}
    </span>
  )
})

export default CallPicker
