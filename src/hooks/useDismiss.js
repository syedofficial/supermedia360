import { useEffect } from 'react'

/**
 * Closes an open popover on an outside pointerdown or Escape. `rootRef`
 * should point at the popover's outermost wrapper (trigger + menu together)
 * so a click on the trigger itself doesn't count as "outside".
 */
export function useDismiss(open, onClose, rootRef) {
  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) onClose()
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose, rootRef])
}
