import { useLayoutEffect, useRef, useState } from 'react'
import { ScrollTrigger, prefersReducedMotion } from '../lib/motion'

/**
 * Adds the `is-in` class once the element crosses into the viewport.
 * Pair with a `data-reveal="up|scale|left|right"` element in markup.
 * Detection runs on ScrollTrigger so it stays in sync with Lenis and the
 * rest of the motion system.
 */
export function useReveal({ threshold = 0.2, start } = {}) {
  const ref = useRef(null)
  const [isIn, setIsIn] = useState(false)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    if (prefersReducedMotion()) {
      setIsIn(true)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: start || `top ${Math.round((1 - threshold) * 100)}%`,
      once: true,
      onEnter: () => setIsIn(true),
    })

    return () => trigger.kill()
  }, [threshold, start])

  return { ref, isIn }
}
