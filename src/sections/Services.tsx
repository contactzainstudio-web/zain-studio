import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '../components/ui'
import { SERVICES } from '../data/site'
import { useIsDesktopPointer } from '../hooks/useMedia'

/**
 * Editorial service rows. On desktop, hovering a row reveals a floating
 * preview image; on mobile rows expand on tap.
 */
export function Services() {
  const desktop = useIsDesktopPointer()
  const [active, setActive] = useState<number | null>(null)
  const [openMobile, setOpenMobile] = useState<number | null>(0)

  return (
    <section id="services" className="services theme-dark section" aria-label="Services">
      <div className="grid-bg" aria-hidden />
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title={[<>Seven disciplines.</>, <>One team.</>]}
          text="From first sketch to launch day and beyond — strategy, design, engineering, motion and growth under one roof."
        />

        <ul className="service-list" onMouseLeave={() => setActive(null)}>
          {SERVICES.map((s, i) => {
            const isOpen = desktop ? active === i : openMobile === i
            return (
              <Reveal as="li" key={s.slug} delay={i * 0.05} amount={0.2} className="service-row-wrap">
                <div
                  className={`service-row ${isOpen ? 'is-active' : ''}`}
                  onMouseEnter={() => desktop && setActive(i)}
                  onClick={() => !desktop && setOpenMobile(openMobile === i ? null : i)}
                  role={desktop ? undefined : 'button'}
                  tabIndex={desktop ? undefined : 0}
                  aria-expanded={desktop ? undefined : isOpen}
                  onKeyDown={(e) => {
                    if (!desktop && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      setOpenMobile(openMobile === i ? null : i)
                    }
                  }}
                >
                  <span className="service-row__bar" aria-hidden />
                  <div className="service-row__head">
                    <span className="service-row__index mono">{s.index}</span>
                    <h3 className="service-row__title heading-1">{s.title}</h3>
                    <span className="service-row__short muted">{s.short}</span>
                    <span className="service-row__arrow" aria-hidden>
                      <ArrowUpRight size={28} strokeWidth={1.6} />
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="service-row__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="service-row__body-inner">
                          <p className="service-row__desc muted">{s.description}</p>
                          <ul className="service-row__points">
                            {s.points.map((p) => (
                              <li key={p} className="mono">
                                {p}
                              </li>
                            ))}
                          </ul>
                          {s.links && (
                            <ul className="service-row__links">
                              {s.links.map((l) => (
                                <li key={l.url}>
                                  <a
                                    href={l.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {l.label}
                                    <ArrowUpRight size={13} strokeWidth={2} />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                          {!desktop && (
                            <div className="service-row__img-mobile">
                              <img src={s.image} alt={`${s.title} example work`} loading="lazy" width={800} height={520} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>

      {/* Desktop floating preview */}
      {desktop && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={SERVICES[active].slug}
              className="service-preview"
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <img src={SERVICES[active].image} alt="" width={420} height={280} loading="lazy" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}
