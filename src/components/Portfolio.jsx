import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { portfolioProjects } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { gsap, prefersReducedMotion } from '../lib/motion'
import './Portfolio.css'

function ProjectCard({ project }) {
  const visualRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px)', () => {
      const tween = gsap.fromTo(
        visualRef.current,
        { '--parallax-y': '0px' },
        {
          '--parallax-y': '-28px',
          ease: 'none',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      return () => tween.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <article
      style={{ '--glow-color': project.color }}
      className="project-card"
    >
      <div
        className="project-visual"
        style={{
          background: project.logo
            ? 'linear-gradient(160deg, #ffffff, #eef2f8)'
            : `radial-gradient(circle at 30% 20%, ${project.color}, ${project.color}55 70%, var(--navy-900) 130%)`,
        }}
      >
        {project.image ? (
          <img
            className={project.logo ? 'project-thumb is-logo' : 'project-thumb'}
            src={project.image}
            alt={project.name}
            ref={visualRef}
            loading="lazy"
          />
        ) : (
          <span className="project-monogram" ref={visualRef}>
            {project.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.result}</p>
      </div>
    </article>
  )
}

const AUTOPLAY_MS = 4000

function usePerView() {
  const query = (w) => (w <= 860 ? 1 : w <= 1100 ? 2 : 3)
  const [perView, setPerView] = useState(() =>
    typeof window === 'undefined' ? 3 : query(window.innerWidth),
  )
  useEffect(() => {
    const onResize = () => setPerView(query(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return perView
}

export default function Portfolio() {
  const headRef = useSectionIntro()
  const perView = usePerView()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [animate, setAnimate] = useState(true)

  const count = portfolioProjects.length
  const loops = count > perView
  // First `perView` cards are repeated after the last one so the slider can
  // keep moving forward; once it lands on the clones it snaps back to 0.
  const slides = loops
    ? [...portfolioProjects, ...portfolioProjects.slice(0, perView)]
    : portfolioProjects
  const current = loops ? index : 0

  useEffect(() => {
    if (paused || !loops || prefersReducedMotion()) return
    const id = setTimeout(() => setIndex((i) => Math.min(i + 1, count)), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [paused, loops, count, index])

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || index < count) return
    setAnimate(false)
    setIndex(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
  }

  return (
    <section id="work" className="section portfolio">
      <div className="container">
        <div ref={headRef} className="section-head portfolio-head">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="section-heading">Work That Speaks.</h2>
          <p className="section-sub">
            A curated selection of campaigns, brand identities, reels, and
            content delivered for our clients across industries.
          </p>
        </div>

        <div
          className="portfolio-slider"
          style={{ '--per': perView, '--i': current }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Portfolio projects"
        >
          <div className="portfolio-viewport">
            <div
              className="portfolio-track"
              style={animate ? undefined : { transition: 'none' }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((project, n) => (
                <ProjectCard key={`${project.key}-${n}`} project={project} />
              ))}
            </div>
          </div>
          {loops && (
            <div className="portfolio-dots">
              {Array.from({ length: count }, (_, n) => (
                <button
                  key={n}
                  type="button"
                  className={n === current % count ? 'is-active' : ''}
                  aria-label={`Go to slide ${n + 1}`}
                  aria-current={n === current % count}
                  onClick={() => {
                    setAnimate(true)
                    setIndex(n)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
