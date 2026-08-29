import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Subtly pulls an element toward the cursor while hovered, for a
 * "magnetic button" feel. Strength is in pixels of max travel.
 */
export function useMagnetic(strength = 10) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleLeave = () => {
      node.style.transform = ''
    }

    node.addEventListener('pointermove', handleMove)
    node.addEventListener('pointerleave', handleLeave)
    return () => {
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerleave', handleLeave)
    }
  }, [strength])

  return ref
}
