import { useCallback, useEffect, useRef, useState } from 'react'
import { contactNumbers } from '../data/content'
import { useDismiss } from '../hooks/useDismiss'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const close = useCallback(() => setOpen(false), [])

  useDismiss(open, close, rootRef)

  useEffect(() => {
    const hero = document.querySelector('#home')
    if (!hero) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting)
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Gated on `visible` too (not just `open`) — scrolling the trigger back
  // off past the hero shouldn't leave an orphaned menu floating behind an
  // invisible (pointer-events: none) button.
  const menuOpen = open && visible

  return (
    <div className="whatsapp-wrap" ref={rootRef}>
      {menuOpen && (
        <div className="whatsapp-menu" role="menu">
          {contactNumbers.map((number) => (
            <a
              key={number}
              href={`https://wa.me/91${number}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-option"
              role="menuitem"
              onClick={close}
            >
              <svg
                className="whatsapp-option-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.715 1.494h.005c6.582 0 11.94-5.36 11.943-11.943 0-3.192-1.24-6.19-3.478-8.45"
                />
              </svg>
              <span className="whatsapp-option-number">{number}</span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        aria-label="Chat with us on WhatsApp"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        className={`whatsapp-button ${visible ? 'is-visible' : ''}`}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.715 1.494h.005c6.582 0 11.94-5.36 11.943-11.943 0-3.192-1.24-6.19-3.478-8.45"
          />
        </svg>
      </button>
    </div>
  )
}
