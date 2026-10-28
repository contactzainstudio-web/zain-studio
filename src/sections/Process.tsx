import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeading } from '../components/ui'
import { PROCESS } from '../data/site'

/**
 * Process timeline. A progress line fills as you scroll; each step lights up.
 */
export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 })
  const scaleY = useTransform(progress, [0, 1], [0, 1])
  const scaleX = scaleY

  return (
    <section id="process" className="process theme-dark section" aria-label="Our process">
      <div className="grid-bg" aria-hidden />
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title={[<>From insight</>, <>to launch — in five moves.</>]}
          text="A tight, transparent workflow. You see progress weekly and nothing ships untested."
        />

        <ol className="process__list" ref={ref}>
          <motion.span className="process__track" aria-hidden>
            <motion.span className="process__fill process__fill--v" style={{ scaleY }} />
            <motion.span className="process__fill process__fill--h" style={{ scaleX }} />
          </motion.span>

          {PROCESS.map((step, i) => (
            <Step key={step.index} step={step} index={i} progress={progress} total={PROCESS.length} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  progress,
  total,
}: {
  step: (typeof PROCESS)[number]
  index: number
  progress: ReturnType<typeof useSpring>
  total: number
}) {
  const at = index / (total - 1)
  const lit = useTransform(progress, (v): number => (v >= at - 0.02 ? 1 : 0))
  const dotScale = useTransform(lit, [0, 1], [0.5, 1])
  const color = useTransform(lit, [0, 1], ['rgba(245,243,239,0.35)', '#f86516'])
  const bg = useTransform(lit, [0, 1], ['rgba(245,243,239,0.15)', '#f86516'])
  const shadow = useTransform(lit, [0, 1], ['0 0 0 rgba(248,101,22,0)', '0 0 24px rgba(248,101,22,0.6)'])

  return (
    <motion.li
      className="process__step"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span className="process__dot" style={{ scale: dotScale, background: bg, boxShadow: shadow }} aria-hidden />
      <motion.span className="process__index mono" style={{ color }}>
        {step.index}
      </motion.span>
      <h3 className="process__title heading-1">{step.title}</h3>
      <p className="process__text muted">{step.text}</p>
    </motion.li>
  )
}
