import { useEffect, useRef } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Tracks pointer position over `ref`'s bounding box and exposes it as
 * CSS custom properties (--mx / --my, range -1..1) on that element, so
 * children can react purely in CSS via calc(var(--mx) * Npx).
 */
export function useParallax() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = null
    let latest = { x: 0, y: 0 }

    const apply = () => {
      node.style.setProperty('--mx', latest.x.toFixed(3))
      node.style.setProperty('--my', latest.y.toFixed(3))
      raf = null
    }

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      latest = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      }
      if (raf === null) raf = requestAnimationFrame(apply)
    }

    const handleLeave = () => {
      latest = { x: 0, y: 0 }
      if (raf === null) raf = requestAnimationFrame(apply)
    }

    node.addEventListener('pointermove', handleMove)
    node.addEventListener('pointerleave', handleLeave)
    return () => {
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerleave', handleLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
