import { philosophyPillars } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import { useTilt } from '../hooks/useTilt'
import { useSpotlight } from '../hooks/useSpotlight'
import './Philosophy.css'

function PillarCard({ pillar }) {
  const tiltRef = useTilt(6)
  const spotlightRef = useSpotlight()

  const setRefs = (node) => {
    tiltRef.current = node
    spotlightRef.current = node
  }

  return (
    <div
      ref={setRefs}
      style={{ '--accent': pillar.accent }}
      className="pillar-card spotlight"
    >
      <span className="pillar-step pixel-notch">{pillar.step}</span>
      <h3>{pillar.title}</h3>
      <p>{pillar.body}</p>
      <span className="pillar-orb" aria-hidden="true" />
    </div>
  )
}

export default function Philosophy() {
  const headRef = useSectionIntro()
  const gridRef = useBatchReveal('.pillar-card', { variant: 'scale', stagger: 0.12 })

  return (
    <section id="philosophy" className="section philosophy">
      <div className="container">
        <div ref={headRef} className="section-head">
          <span className="section-eyebrow">Our Philosophy</span>
          <h2 className="section-heading">Not Just Marketing. Momentum.</h2>
          <p className="section-sub">
            We help businesses stand out online with sharp strategy, premium
            content, and performance-focused marketing that compounds over
            time.
          </p>
        </div>

        <div ref={gridRef} className="pillar-grid">
          {philosophyPillars.map((pillar) => (
            <PillarCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
