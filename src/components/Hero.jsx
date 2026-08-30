import { useLayoutEffect, useRef } from 'react'
import { useGetStarted } from '../hooks/useGetStarted'
import { useTilt } from '../hooks/useTilt'
import { useMagnetic } from '../hooks/useMagnetic'
import { gsap, SplitText, prefersReducedMotion } from '../lib/motion'
import './Hero.css'

export default function Hero() {
  const openGetStarted = useGetStarted()
  const videoRef = useTilt(2)
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const detailsRef = useRef(null)
  const primaryRef = useMagnetic(10)
  const secondaryRef = useMagnetic(8)

  // Load-in: a slow settle on the visual, then the copy reveals in sequence.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    let split = null
    const tl = gsap.timeline({ delay: 0.2 })

    if (visualRef.current) {
      tl.fromTo(
        visualRef.current,
        { scale: 1.14, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.8, ease: 'power2.out' },
        0,
      )
    }

    if (eyebrowRef.current) {
      tl.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.7 }, 0.5)
    }

    if (headingRef.current) {
      split = SplitText.create(headingRef.current, { type: 'lines', mask: 'lines' })
      tl.from(
        split.lines,
        { yPercent: 115, opacity: 0, duration: 1, stagger: 0.12, ease: 'power4.out' },
        0.62,
      )
    }

    if (detailsRef.current) {
      tl.from(detailsRef.current, { opacity: 0, y: 24, duration: 0.8 }, 1.05)
    }

    return () => {
      // .revert() undoes the inline styles the timeline set (not just
      // stops it), so a StrictMode double-mount doesn't leave the copy
      // stuck at its hidden "from" state — see useSectionIntro.js for why.
      tl.revert()
      split?.revert()
    }
  }, [])

  // Scroll-scrubbed depth: desktop only — cheap on mobile viewports is still
  // a cost, and it reads worse on a screen this small anyway.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px) and (hover: hover)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      tl.to(visualRef.current, { y: 90, ease: 'none' }, 0)
      tl.to(contentRef.current, { y: -50, opacity: 0.2, ease: 'none' }, 0)

      return () => tl.scrollTrigger?.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero-visual" ref={visualRef}>
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
        />
      </div>
      <div className="hero-overlay" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-headline">
          <span className="hero-eyebrow" ref={eyebrowRef}>
            Build &middot; Reach &middot; Growth
          </span>
          <h1 ref={headingRef}>
            Grow your brand.
            <br />
            Everywhere.
          </h1>
        </div>
        <div className="hero-details" ref={detailsRef}>
          <p className="hero-description">
            We help brands build presence, reach new audiences, and grow
            faster across every platform.
          </p>
          <div className="hero-actions">
            <button
              ref={primaryRef}
              type="button"
              onClick={openGetStarted}
              className="btn btn-onlight"
            >
              Get Started
            </button>
            <a ref={secondaryRef} href="#services" className="btn btn-outline-light">
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
