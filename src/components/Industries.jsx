import { industries } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import { useScrollFrameSequence } from '../hooks/useScrollFrameSequence'
import SkyBgFrames from './SkyBgFrames'
import './Industries.css'

function IndustryChip({ industry }) {
  return (
    <div className="industry-chip" style={{ '--accent': industry.accent }}>
      <span className="industry-dot" aria-hidden="true" />
      {industry.label}
    </div>
  )
}

export default function Industries() {
  const headRef = useSectionIntro()
  const gridRef = useBatchReveal('.industry-chip', { variant: 'up', stagger: 0.05 })
  const { sectionRef, frameARef, frameBRef } = useScrollFrameSequence({ reverse: true })

  return (
    <section ref={sectionRef} className="section industries">
      <SkyBgFrames frameARef={frameARef} frameBRef={frameBRef} />

      <div className="container">
        <div ref={headRef} className="section-head">
          <span className="section-eyebrow">Industries We Serve</span>
          <h2 className="section-heading">Built for Every Ambitious Brand.</h2>
          <p className="section-sub">
            Whether you&apos;re a local café or a scaling startup,
            SuperMedia360 delivers premium digital marketing tailored to
            your industry and audience.
          </p>
        </div>

        <div ref={gridRef} className="industry-grid">
          {industries.map((industry) => (
            <IndustryChip key={industry.key} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  )
}
