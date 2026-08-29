import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navLinks, googleFormUrl } from '../data/content'
import { useMagnetic } from '../hooks/useMagnetic'
import { gsap, prefersReducedMotion } from '../lib/motion'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')
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
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <span className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="site-header-inner">
        <a href="#home" className="brand">
          <img
            src="/sm360-logo-light.png"
            alt="Super Media 360"
            className="brand-logo"
          />
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

        <a
          ref={ctaRef}
          href={googleFormUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-onlight header-cta"
        >
          Get Started
        </a>

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

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
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
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-onlight"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  )
}
