import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion'

let lenis = null
let tickerFn = null
let unbindClicks = null

function bindAnchorClicks(instance) {
  const handleClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor) return

    const hash = anchor.getAttribute('href')
    if (!hash || hash === '#') return

    const target = document.querySelector(hash)
    if (!target) return

    event.preventDefault()
    // No manual offset here — the target's own `scroll-margin-top` (set in
    // tokens.css to match the fixed header) is read natively by Lenis.
    instance.scrollTo(target, {
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    })
    if (window.history?.pushState) window.history.pushState(null, '', hash)
  }

  document.addEventListener('click', handleClick)
  return () => document.removeEventListener('click', handleClick)
}

/** Boots the Lenis + GSAP scroll pipeline once. No-ops (native scroll) under reduced-motion. */
export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis

  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 1,
    // Native touch momentum reads better on mobile than a lerped scroll —
    // only wheel/trackpad get the smoothed feel.
    syncTouch: false,
    touchMultiplier: 1,
  })

  lenis.on('scroll', ScrollTrigger.update)

  tickerFn = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  unbindClicks = bindAnchorClicks(lenis)

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroySmoothScroll() {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  if (unbindClicks) unbindClicks()
  lenis?.destroy()
  lenis = null
  tickerFn = null
  unbindClicks = null
}
