import { ctaFeatures } from '../data/content'
import { useGetStarted } from '../hooks/useGetStarted'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import { useMagnetic } from '../hooks/useMagnetic'
import CallPicker from './CallPicker'
import './CTA.css'

export default function CTA() {
  const openGetStarted = useGetStarted()
  const introRef = useSectionIntro({ start: 'top 88%' })
  const featuresRef = useBatchReveal('.cta-feature', { variant: 'up', stagger: 0.1 })
  const primaryRef = useMagnetic(10)
  const secondaryRef = useMagnetic(8)

  const setRefs = (node) => {
    introRef.current = node
    featuresRef.current = node
  }

  return (
    <section id="contact" className="section cta">
      <div ref={setRefs} className="container cta-content">
        <h2 className="cta-heading">Ready to Grow Your Brand?</h2>
        <p className="cta-sub">
          Stop blending in. Start commanding attention. Let SuperMedia360
          build your digital presence — premium content, proven strategy,
          real results.
        </p>
        <div className="cta-actions">
          <button
            ref={primaryRef}
            type="button"
            onClick={openGetStarted}
            className="btn btn-onlight"
          >
            Get Started
          </button>
          <CallPicker ref={secondaryRef} className="btn btn-outline-light">
            Book a Free Call
          </CallPicker>
        </div>

        <div className="cta-features">
          {ctaFeatures.map((feature) => (
            <div className="cta-feature" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
