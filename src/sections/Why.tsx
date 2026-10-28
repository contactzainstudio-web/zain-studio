import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from '../components/ui'
import { WHY } from '../data/site'

/**
 * Light editorial section: sticky headline on the left, numbered
 * advantage list on the right that reveals as you scroll.
 */
export function Why() {
  return (
    <section id="why" className="why theme-light section" aria-label="Why Zain Studio">
      <div className="container why__grid">
        <div className="why__sticky">
          <SectionHeading
            eyebrow="Why Zain Studio"
            stack
            title={[<>Not a vendor.</>, <>A creative partner.</>]}
          />
          <Reveal delay={0.2}>
            <p className="lead muted why__text">
              We work like an in-house team with an outside perspective — fast, opinionated and
              accountable for results, not just deliverables.
            </p>
          </Reveal>
        </div>

        <ol className="why__list">
          {WHY.map((w, i) => (
            <motion.li
              key={w.index}
              className="why__item"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="why__index mono accent">{w.index}</span>
              <div>
                <h3 className="why__title heading-1">{w.title}</h3>
                <p className="why__desc muted">{w.text}</p>
              </div>
              <motion.span
                className="why__line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
