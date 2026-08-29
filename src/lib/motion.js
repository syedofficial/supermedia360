import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })
// Text reflows (SplitText, section reveals) shift layout mid-scroll — settle
// on the next paint rather than mid-frame so ScrollTrigger positions stay accurate.
ScrollTrigger.config({ ignoreMobileResize: true })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isDesktop = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 861px) and (hover: hover)').matches

export { gsap, ScrollTrigger, SplitText }
