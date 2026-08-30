import { useEffect, useState } from 'react'
import { services } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useSectionIntro } from '../hooks/useSectionIntro'
import './Services.css'

// Must match --dur-med in tokens.css — the panel's own flex-grow expansion
// takes this long, and the title should only flip from vertical to
// horizontal once that expansion has actually finished (see the comment
// by the title's className below for why this couldn't be done in CSS).
const PANEL_EXPAND_MS = 500

const ICON_PROPS = {
  viewBox: '0 0 20 20',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const SERVICE_ICONS = {
  social: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M4 5h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  reels: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <rect x="3" y="4" width="14" height="12" rx="3" />
      <path d="M8.5 7.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  ads: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M3 8v4a1 1 0 0 0 1 1h1l1 4h2l-1-4h1l7 3V4l-7 3H4a1 1 0 0 0-1 1Z" />
    </svg>
  ),
  branding: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M14.5 2.5 17.5 5.5 8 15l-4 1 1-4Z" />
    </svg>
  ),
  content: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M7 6l1.2-2h3.6L13 6" />
      <rect x="2.5" y="6" width="15" height="10" rx="2" />
      <circle cx="10" cy="11" r="3" />
    </svg>
  ),
  leads: (
    <svg {...ICON_PROPS} aria-hidden="true">
      <path d="M3 4h14l-5 7v5l-4 2v-7Z" />
    </svg>
  ),
}

export default function Services() {
  const [active, setActive] = useState(0)
  // Lags `active` by PANEL_EXPAND_MS so the title only flips horizontal
  // after the panel has actually finished growing — flipping immediately
  // overflowed the still-narrow panel mid-expansion. Flipping a
  // newly-inactive panel's title back to vertical stays instant (it's
  // gated on `active === index` directly, not on this), since a vertical
  // line never overflows a shrinking panel.
  const [titleActive, setTitleActive] = useState(0)
  const headRef = useSectionIntro()
  const { ref: railRef, isIn: railIn } = useReveal({ threshold: 0.15 })

  useEffect(() => {
    const timer = setTimeout(() => setTitleActive(active), PANEL_EXPAND_MS)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <section id="services" className="section services">
      <div className="container">
        <div ref={headRef} className="section-head">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-heading">
            Full-Service Digital Marketing — Done Right.
          </h2>
          <p className="section-sub">
            From social media to paid ads to brand identity, SuperMedia360
            delivers end-to-end digital solutions that make your business
            impossible to ignore.
          </p>
        </div>

        <div
          ref={railRef}
          data-reveal="up"
          className={`services-rail ${railIn ? 'is-in' : ''}`}
        >
          {services.map((service, index) => (
            <button
              key={service.key}
              type="button"
              className={`service-panel ${active === index ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              style={{ '--panel-index': index, '--accent': service.accent }}
            >
              <span className="service-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`service-title ${active === index && titleActive === index ? 'is-horizontal' : ''}`}
              >
                {service.title}
              </span>
              <span className="service-body">{service.body}</span>
              <span className="service-glyph" aria-hidden="true">
                {SERVICE_ICONS[service.key]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
