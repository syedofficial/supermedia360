import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * Animates a number from 0 to `end` once it scrolls into view.
 * Returns { ref, value } — render `value` in place of the raw number.
 */
export function useCountUp(end, { duration = 1.4 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(prefersReducedMotion() ? end : 0)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return

    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: end,
      duration,
      ease: 'power3.out',
      onUpdate: () => setValue(Math.round(counter.val)),
      scrollTrigger: { trigger: node, start: 'top 90%', once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [end, duration])

  return { ref, value }
}
