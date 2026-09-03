import { useLayoutEffect, useRef } from 'react'
import { ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import { skyFrames, preloadSkyFrames } from '../lib/skyFrames'

/**
 * Crossfades a pair of stacked <img>s through the sky-bg-frame sequence as
 * `sectionRef`'s element crosses the viewport. Attach `sectionRef` to the
 * section and `frameARef`/`frameBRef` to two identically-positioned <img>s
 * (B stacked on top of A). Scroll progress maps to a fractional frame index:
 * A holds the floor frame, B holds the ceil frame and fades in as progress
 * approaches it, so the sequence reads as continuous motion instead of a
 * hard per-frame cut. `reverse` walks the sequence tail-to-head instead of
 * head-to-tail, so neighboring sections can alternate drift direction
 * while sharing one asset set.
 */
export function useScrollFrameSequence({ reverse = false, start = 'top bottom', end = 'bottom top' } = {}) {
  const sectionRef = useRef(null)
  const frameARef = useRef(null)
  const frameBRef = useRef(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const frameA = frameARef.current
    const frameB = frameBRef.current
    if (!section || !frameA || !frameB || !skyFrames.length) return

    const frames = reverse ? [...skyFrames].reverse() : skyFrames
    const lastIndex = frames.length - 1
    let lastFloor = -1
    let lastCeil = -1

    const setProgress = (progress) => {
      const scaled = Math.min(Math.max(progress, 0), 1) * lastIndex
      const floor = Math.floor(scaled)
      const ceil = Math.min(floor + 1, lastIndex)
      const fraction = scaled - floor

      if (floor !== lastFloor) {
        frameA.src = frames[floor]
        lastFloor = floor
      }
      if (ceil !== lastCeil) {
        frameB.src = frames[ceil]
        lastCeil = ceil
      }
      frameB.style.opacity = fraction.toFixed(3)
    }

    // Defers the very first frame paint *and* the full ~51-frame preload
    // (a few MB) until this section is actually getting close, instead of
    // firing on mount unconditionally — this sequence sits well below the
    // fold, and eagerly fetching frames on initial load competed with
    // above-the-fold assets (hero video, fonts) for bandwidth on every
    // page load, regardless of whether the visitor ever scrolled this far.
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setProgress(0)
        preloadSkyFrames()
        preloadObserver.disconnect()
      },
      { rootMargin: '600px 0px' },
    )
    preloadObserver.observe(section)

    if (prefersReducedMotion()) {
      return () => preloadObserver.disconnect()
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start,
      end,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => {
      preloadObserver.disconnect()
      trigger.kill()
    }
  }, [reverse, start, end])

  return { sectionRef, frameARef, frameBRef }
}
