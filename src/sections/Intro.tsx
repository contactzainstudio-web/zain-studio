import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Counter, Reveal } from '../components/ui'
import { STATS } from '../data/site'

const WORDS =
  'We turn ideas into digital experiences — websites, apps, brands and films crafted with obsessive attention to design, technology and motion.'.split(
    ' ',
  )
const HIGHLIGHT = new Set(['ideas', 'digital', 'experiences', 'motion.'])

/**
 * Editorial statement whose words light up as you scroll (scroll-scrubbed).
 */
export function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  return (
    <section id="about" className="intro theme-light section" aria-label="About Zain Studio">
      <div className="container">
        <Reveal y={16}>
          <span className="eyebrow accent">About the studio</span>
        </Reveal>

        <div ref={ref} className="intro__statement-wrap">
          <p className="intro__statement display-1">
            {WORDS.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / WORDS.length, (i + 1) / WORDS.length]} highlight={HIGHLIGHT.has(w)}>
                {w}
              </Word>
            ))}
          </p>
        </div>

        <div className="intro__grid">
          <Reveal className="intro__copy">
            <p className="lead muted">
              Zain Studio is a full-spectrum creative and product team based in Karachi, working
              with founders and brands worldwide. One team handles strategy, design, development
              and motion — so the idea never gets lost between departments.
            </p>
          </Reveal>

          <ul className="intro__stats" aria-label="Studio statistics">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.08} className="stat">
                <span className="stat__value display-2">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="stat__label muted">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
  highlight: boolean
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <span className="intro__word-wrap">
      <motion.span style={{ opacity }} className={`intro__word ${highlight ? 'accent' : ''}`}>
        {children}
      </motion.span>{' '}
    </span>
  )
}
