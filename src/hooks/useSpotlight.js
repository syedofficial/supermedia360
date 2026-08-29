import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position within `ref`'s element and exposes it as
 * --spot-x / --spot-y (percentages), so a ::before radial-gradient can
 * act as a cursor-following spotlight for dynamic-lighting hover states.
 */
export function useSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(hover: none)').matches) return

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      node.style.setProperty('--spot-x', `${x.toFixed(1)}%`)
      node.style.setProperty('--spot-y', `${y.toFixed(1)}%`)
    }

    node.addEventListener('pointermove', handleMove)
    return () => node.removeEventListener('pointermove', handleMove)
  }, [])

  return ref
}
