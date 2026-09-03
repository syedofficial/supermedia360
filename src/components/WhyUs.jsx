import { whyFeatures, whyStats } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import { useCountUp } from '../hooks/useCountUp'
import { useSpotlight } from '../hooks/useSpotlight'
import './WhyUs.css'

function StatBlock({ stat }) {
  const { ref, value } = useCountUp(stat.value)
  return (
    <div ref={ref} className="stat-block" style={{ '--accent': stat.accent }}>
      <span className="stat-value">
        {value}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  )
}

function FeatureCard({ feature, index }) {
  const spotlightRef = useSpotlight()

  return (
    <div
      ref={spotlightRef}
      style={{ '--accent': feature.accent }}
      className="why-card spotlight"
    >
      <span className="why-card-mark">{String(index + 1).padStart(2, '0')}</span>
      <h3>{feature.title}</h3>
      <p>{feature.body}</p>
    </div>
  )
}

export default function WhyUs() {
  const headRef = useSectionIntro()
  const gridRef = useBatchReveal('.why-card', { variant: 'up' })
  const statsRef = useBatchReveal('.stat-block', { variant: 'up', stagger: 0.12 })

  return (
    <section id="why-us" className="section why-us">
      <div className="container">
        <div ref={headRef} className="why-head">
          <div className="section-head">
            <span className="section-eyebrow">Why SuperMedia360?</span>
          </div>
          <h2 className="why-statement">The Standard Has Changed.</h2>
        </div>

        <div ref={gridRef} className="why-grid">
          {whyFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div ref={statsRef} className="why-stats">
          {whyStats.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
