import { useLayoutEffect, useRef } from 'react'
import { portfolioProjects } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
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
          background: `radial-gradient(circle at 30% 20%, ${project.color}, ${project.color}55 70%, var(--navy-900) 130%)`,
        }}
      >
        <span className="project-monogram" ref={visualRef}>
          {project.name.charAt(0)}
        </span>
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.result}</p>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const headRef = useSectionIntro()
  const gridRef = useBatchReveal('.project-card', { variant: 'scale' })

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

        <div ref={gridRef} className="portfolio-grid">
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
