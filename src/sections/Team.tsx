import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Quote } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '../components/ui'
import { FAQ, TEAM, TESTIMONIALS } from '../data/site'

/**
 * Compact "people & proof" section: team strip + rotating testimonials + FAQ.
 * Light theme to break rhythm before the dark CTA.
 */
export function Team() {
  const [t, setT] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section id="team" className="people theme-light section" aria-label="Team and testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="The team"
          title={[<>Specialists,</>, <>not generalists.</>]}
          text="Dedicated leads across strategy, engineering, design, video and digital marketing."
        />

        <ul className="team">
          {TEAM.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.06} className="team__member">
              <span className="team__avatar" aria-hidden>
                {m.initials}
              </span>
              <div>
                <h3 className="team__name">{m.name}</h3>
                <p className="team__role muted">{m.role}</p>
                <p className="team__focus mono">{m.focus}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="proof">
          {/* Testimonials */}
          <Reveal className="testimonial">
            <Quote className="testimonial__icon accent" size={32} strokeWidth={1.4} aria-hidden />
            <div className="testimonial__stage">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={t}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="testimonial__quote heading-2">“{TESTIMONIALS[t].quote}”</p>
                  <footer className="testimonial__by">
                    <strong>{TESTIMONIALS[t].name}</strong>
                    <span className="muted"> — {TESTIMONIALS[t].role}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="testimonial__nav" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === t}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`testimonial__dot ${i === t ? 'is-active' : ''}`}
                  onClick={() => setT(i)}
                />
              ))}
            </div>
          </Reveal>

          {/* FAQ */}
          <Reveal delay={0.1} className="faq">
            <h3 className="eyebrow accent faq__head">Before we start</h3>
            <ul>
              {FAQ.map((f, i) => {
                const open = openFaq === i
                return (
                  <li key={f.q} className={`faq__item ${open ? 'is-open' : ''}`}>
                    <button
                      className="faq__q"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpenFaq(open ? null : i)}
                    >
                      <span>{f.q}</span>
                      <span className="faq__icon" aria-hidden>
                        {open ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`faq-${i}`}
                          className="faq__a"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="muted">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
