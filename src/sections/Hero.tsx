import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Button, SplitLines } from '../components/ui'
import { useIsDesktopPointer, usePrefersReducedMotion } from '../hooks/useMedia'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const desktop = useIsDesktopPointer()
  const reduced = usePrefersReducedMotion()

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const markY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  // Mouse-follow for the Z mark + glow
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.8 })
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.8 })
  const markX = useTransform(smx, (v) => v * 40)
  const markYm = useTransform(smy, (v) => v * 40)
  const glowX = useTransform(smx, (v) => v * -90)
  const glowY = useTransform(smy, (v) => v * -90)
  const rotX = useTransform(smy, (v) => v * -10)
  const rotY = useTransform(smx, (v) => v * 10)

  useEffect(() => {
    if (!desktop || reduced) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [desktop, reduced, mx, my])

  return (
    <section id="home" ref={ref} className="hero theme-dark" aria-label="Introduction">
      <div className="grid-bg" aria-hidden />

      {/* Ambient orange glow that drifts with the pointer */}
      <motion.div className="hero__glow" style={{ x: glowX, y: glowY }} aria-hidden />

      <motion.div className="hero__inner container" style={{ y: textY, opacity: fade }}>
        <div className="hero__top">
          <motion.p
            className="eyebrow accent"
            initial={{ opacity: 0, x: -12 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Digital creative agency — Karachi
          </motion.p>
          <motion.p
            className="hero__meta mono muted"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Web · Apps · UI/UX · Design · Video · Marketing
          </motion.p>
        </div>

        {ready && (
          <SplitLines
            as="h1"
            className="display-hero hero__title"
            ariaLabel="We build digital experiences that stand out."
            inView={false}
            delay={2}
            lines={[
              <>We build</>,
              <>
                digital <span className="hero__outline">experiences</span>
              </>,
              <>
                that <span className="accent">stand out.</span>
              </>,
            ]}
          />
        )}

        <div className="hero__bottom">
          <motion.p
            className="hero__lead lead muted"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Zain Studio blends strategy, design, code and motion to launch brands and products
            that convert attention into action.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="#contact">Start a Project</Button>
            <Button href="#work" variant="ghost">
              View our Work
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Z mark — the exact supplied asset, floating with parallax + tilt */}
      <motion.div
        className="hero__mark-wrap"
        style={{ y: markY, scale, x: markX, translateY: markYm, rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <motion.img
          src="/brand/zain-logo-tight.png"
          alt=""
          className="hero__mark"
          width={520}
          height={520}
          animate={reduced ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          fetchPriority="high"
        />
        <span className="hero__ring hero__ring--1" />
        <span className="hero__ring hero__ring--2" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="Scroll to next section"
      >
        <span className="mono">01 / Scroll</span>
        <span className="scroll-hint__line">
          <span className="scroll-hint__dot" />
        </span>
      </motion.a>
    </section>
  )
}
