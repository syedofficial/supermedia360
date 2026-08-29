import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'

const VARIANTS = {
  up: { y: 32, opacity: 0 },
  scale: { y: 22, opacity: 0, scale: 0.94 },
  left: { x: -36, opacity: 0 },
  right: { x: 36, opacity: 0 },
}

/**
 * Choreographs a grid/row of cards as one cascade instead of N independent
 * observers: elements that enter the viewport together animate together,
 * via ScrollTrigger.batch. Attach the returned ref to the grid container —
 * `selector` picks the direct children to animate.
 *
 * Elements get `.is-revealed` once their entrance finishes, so CSS-only
 * idle animations (e.g. a float keyframe) can wait until the reveal
 * settles instead of fighting it for the transform property.
 */
export function useBatchReveal(
  selector,
  { variant = 'up', stagger = 0.09, start = 'top 88%' } = {},
) {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const root = containerRef.current
    if (!root) return

    const targets = gsap.utils.toArray(root.querySelectorAll(selector))
    if (!targets.length) return

    const from = VARIANTS[variant] || VARIANTS.up

    if (prefersReducedMotion()) {
      // Clear only the properties the reveal itself would have touched —
      // an unscoped clearProps:'all' would also wipe unrelated inline
      // custom properties elements set for their own styling, like
      // `--accent`.
      gsap.set(targets, { clearProps: Object.keys(from).join(',') })
      targets.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    gsap.set(targets, from)

    const triggers = ScrollTrigger.batch(targets, {
      start,
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          overwrite: true,
          onComplete: () => batch.forEach((el) => el.classList.add('is-revealed')),
        })
      },
    })

    return () => triggers.forEach((trigger) => trigger.kill())
  }, [selector, variant, stagger, start])

  return containerRef
}
