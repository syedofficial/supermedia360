import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText, prefersReducedMotion } from '../lib/motion'

const HEADING_SELECTOR = '.section-heading, .why-statement, .cta-heading'
const SUB_SELECTOR = '.section-sub, .cta-sub'
const ACTIONS_SELECTOR = '.cta-actions'

/**
 * Choreographs a section's eyebrow / heading / sub-copy / actions as one
 * timed sequence: eyebrow fades up first, the heading mask-reveals line by
 * line, then the sub-copy and any actions rise in after. Attach the
 * returned ref to the wrapping element (e.g. `.section-head`); the hook
 * finds its children by class, so no markup changes are needed per section.
 */
export function useSectionIntro({ start = 'top 82%' } = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return

    const eyebrow = root.querySelector('.section-eyebrow')
    const heading = root.querySelector(HEADING_SELECTOR)
    const sub = root.querySelector(SUB_SELECTOR)
    const actions = root.querySelector(ACTIONS_SELECTOR)

    const tweens = []
    let split = null

    if (eyebrow) {
      tweens.push(
        gsap.from(eyebrow, {
          opacity: 0,
          y: 14,
          duration: 0.6,
          scrollTrigger: { trigger: root, start, once: true },
        }),
      )
    }

    if (heading) {
      split = SplitText.create(heading, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            delay: eyebrow ? 0.12 : 0,
            ease: 'power4.out',
            scrollTrigger: { trigger: root, start, once: true },
          })
        },
      })
    }

    if (sub) {
      tweens.push(
        gsap.from(sub, {
          opacity: 0,
          y: 18,
          duration: 0.7,
          delay: heading ? 0.32 : 0.12,
          scrollTrigger: { trigger: root, start, once: true },
        }),
      )
    }

    if (actions) {
      tweens.push(
        // fromTo (not .from()) — the heading's SplitText reveal reflows the
        // layout at this same moment, and .from() measures its "to" state
        // lazily when the tween starts, so a mid-flight reflow can make it
        // land on the "from" y instead of resting at 0. An explicit "to"
        // sidesteps that.
        gsap.fromTo(
          actions.children.length ? [...actions.children] : actions,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: sub ? 0.46 : 0.3,
            scrollTrigger: { trigger: root, start, once: true },
          },
        ),
      )
    }

    return () => {
      // .revert() (not .kill()) — it undoes the inline styles the tween
      // set, so a StrictMode double-mount doesn't leave the element stuck
      // at its "from" values (which the second mount's .from() would then
      // mistake for the natural resting state and animate 0 -> 0).
      tweens.forEach((tween) => tween.revert())
      split?.revert()
    }
  }, [start])

  return ref
}
