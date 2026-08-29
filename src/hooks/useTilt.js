import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Applies a subtle 3D tilt to `ref`'s element that follows the cursor,
 * resetting smoothly on pointer leave. `max` is the peak rotation in degrees.
 */
export function useTilt(max = 8, baseScale = 1) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    const scalePart = baseScale !== 1 ? ` scale(${baseScale})` : ''

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)${scalePart}`
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
  }, [max, baseScale])

  return ref
}
