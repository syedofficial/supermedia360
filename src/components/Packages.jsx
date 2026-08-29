import { packages, googleFormUrl } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import { useTilt } from '../hooks/useTilt'
import { useSpotlight } from '../hooks/useSpotlight'
import { useScrollFrameSequence } from '../hooks/useScrollFrameSequence'
import SkyBgFrames from './SkyBgFrames'
import CallPicker from './CallPicker'
import './Packages.css'

function PackageCard({ pkg }) {
  const tiltRef = useTilt(pkg.featured ? 5 : 4, pkg.featured ? 1.04 : 1)
  const spotlightRef = useSpotlight()

  const setRefs = (node) => {
    tiltRef.current = node
    spotlightRef.current = node
  }

  return (
    <div
      ref={setRefs}
      style={{ '--accent': pkg.accent }}
      className={`package-card spotlight ${pkg.featured ? 'is-featured' : ''}`}
    >
      {pkg.featured && (
        <span className="package-badge pixel-notch">{pkg.badge}</span>
      )}
      <div className="package-head">
        <h3>{pkg.name}</h3>
        <p className="package-tagline">{pkg.tagline}</p>
      </div>
      <p className="package-price">{pkg.price}</p>
      <ul className="package-features">
        {pkg.features.map((feature) => (
          <li key={feature}>
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M4 10.5 8 14.5 16 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={googleFormUrl}
        target="_blank"
        rel="noreferrer"
        className={`btn package-cta ${pkg.featured ? 'btn-onlight' : 'btn-primary'}`}
      >
        {pkg.cta}
        <span className="btn-arrow" aria-hidden="true">
          &rarr;
        </span>
      </a>
    </div>
  )
}

export default function Packages() {
  const headRef = useSectionIntro()
  const gridRef = useBatchReveal('.package-card', { variant: 'up' })
  const { sectionRef, frameARef, frameBRef } = useScrollFrameSequence()

  return (
    <section ref={sectionRef} id="packages" className="section packages">
      <SkyBgFrames frameARef={frameARef} frameBRef={frameBRef} />

      <div className="container">
        <div ref={headRef} className="section-head">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="section-heading">Packages Built for Real Growth.</h2>
          <p className="section-sub">
            Transparent, flexible pricing with no hidden fees. Scale your
            package as your business grows.
          </p>
        </div>

        <div ref={gridRef} className="package-grid">
          {packages.map((pkg) => (
            <PackageCard key={pkg.key} pkg={pkg} />
          ))}
        </div>

        <p className="package-footnote">
          All packages include a free onboarding strategy call. Not sure
          which plan fits?{' '}
          <CallPicker className="footnote-link">Book a free consultation</CallPicker>{' '}
          and we&apos;ll guide you.
        </p>
      </div>
    </section>
  )
}
