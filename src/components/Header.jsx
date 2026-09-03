import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import { useGetStarted } from '../hooks/useGetStarted'
import { useMagnetic } from '../hooks/useMagnetic'
import { gsap, prefersReducedMotion } from '../lib/motion'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const openGetStarted = useGetStarted()
  const ctaRef = useMagnetic(6)
  const scrolledRef = useRef(false)
  const progressRef = useRef(null)
  const mobileNavRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 24
      if (next !== scrolledRef.current) {
        scrolledRef.current = next
        setScrolled(next)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href),
    ).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !progressRef.current) return

    const tween = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  useLayoutEffect(() => {
    const nav = mobileNavRef.current
    if (!nav || prefersReducedMotion()) return

    const items = [...nav.children]
    if (!menuOpen) {
      gsap.set(items, { clearProps: 'all' })
      return
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.15, ease: 'power3.out' },
    )

    return () => tween.kill()
  }, [menuOpen])

  return (
    <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="site-header-inner">
        <a href="#home" className="brand">
          <picture>
            <source srcSet="/sm360-logo-light.webp" type="image/webp" />
            <img
              src="/sm360-logo-light.png"
              alt="Super Media 360"
              className="brand-logo"
              width="300"
              height="213"
            />
          </picture>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          ref={ctaRef}
          type="button"
          onClick={openGetStarted}
          className="btn btn-onlight header-cta"
        >
          Let&apos;s Talk
        </button>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>

    {/* Sibling of <header>, not a descendant — .site-header.is-scrolled sets
        backdrop-filter, and a backdrop-filter/filter ancestor becomes the
        containing block for its position:fixed descendants. Nested here,
        this fixed full-screen overlay would collapse to the header's own
        (much smaller) box the moment the page had already scrolled past the
        is-scrolled threshold before the menu was opened.
        It stacks above <header> (see Header.css) so it's a true full-screen
        cover, not just the area below the header bar — which is why it
        carries its own close button rather than relying on the header's
        now-hidden-behind-it toggle. */}
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="mobile-menu-close"
        aria-label="Close menu"
        onClick={() => setMenuOpen(false)}
      >
        <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
          <path
            d="M5 5l10 10M15 5 5 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <nav aria-label="Mobile" ref={mobileNavRef}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="btn btn-onlight"
          onClick={() => {
            setMenuOpen(false)
            openGetStarted()
          }}
        >
          Let&apos;s Talk
        </button>
      </nav>
    </div>
    </>
  )
}
