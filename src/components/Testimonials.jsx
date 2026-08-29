import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials, ratingCategories } from '../data/content'
import { useSectionIntro } from '../hooks/useSectionIntro'
import { useBatchReveal } from '../hooks/useBatchReveal'
import './Testimonials.css'

const AUTOPLAY_MS = 6000

function Stars() {
  return (
    <span className="t-stars" aria-hidden="true">
      {'★★★★★'}
    </span>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const headRef = useSectionIntro()
  const ratingsRef = useBatchReveal('.t-rating', { variant: 'up', stagger: 0.06 })
  const dragState = useRef(null)

  const count = testimonials.length
  const goTo = useCallback(
    (next) => setIndex(((next % count) + count) % count),
    [count],
  )

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [index, paused, goTo])

  const handlePointerDown = (event) => {
    dragState.current = { startX: event.clientX, dx: 0 }
    setPaused(true)
  }

  const handlePointerMove = (event) => {
    if (!dragState.current) return
    dragState.current.dx = event.clientX - dragState.current.startX
  }

  const handlePointerUp = () => {
    const drag = dragState.current
    dragState.current = null
    if (!drag) return
    if (drag.dx > 60) goTo(index - 1)
    else if (drag.dx < -60) goTo(index + 1)
    setPaused(false)
  }

  return (
    <section className="section testimonials">
      <div className="container">
        <div ref={headRef} className="section-head">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-heading">Clients Who Trust Us.</h2>
        </div>

        <div
          className="testimonial-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <button
            type="button"
            className="t-nav t-nav-prev"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
          >
            &larr;
          </button>

          <div className="testimonial-track">
            <div
              className="testimonial-track-inner"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <figure className="testimonial-slide" key={testimonial.name}>
                  <Stars />
                  <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="t-avatar" aria-hidden="true">
                      {testimonial.name.charAt(0)}
                    </span>
                    <span>
                      <strong>{testimonial.name}</strong>
                      <span className="t-role">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ''}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="t-nav t-nav-next"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
          >
            &rarr;
          </button>
        </div>

        <div className="t-progress" role="tablist" aria-label="Testimonials">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              className={`t-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div ref={ratingsRef} className="t-ratings">
          {ratingCategories.map((category) => (
            <div className="t-rating" key={category}>
              <Stars />
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
