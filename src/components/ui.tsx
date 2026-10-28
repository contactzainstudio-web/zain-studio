import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { scrollToHash } from '../hooks/useLenisScroll'

/* --------------------------------------------------------------------------
   Logo — uses the exact supplied orange Z mark asset. Never redrawn.
   -------------------------------------------------------------------------- */
export function Logo({
  size = 40,
  withWordmark = true,
  className = '',
  light = true,
}: {
  size?: number
  withWordmark?: boolean
  className?: string
  light?: boolean
}) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault()
        scrollToHash('#home')
      }}
      className={`logo ${className}`}
      aria-label="Zain Studio — home"
      style={{ color: light ? 'var(--text-on-dark)' : 'var(--text-on-light)' }}
    >
      <img
        src="/brand/zain-mark-160.png"
        width={size}
        height={size}
        alt="Zain Studio logo"
        className="logo__mark"
        style={{ width: size, height: size }}
        decoding="async"
      />
      {withWordmark && (
        <span className="logo__word">
          Zain<span className="logo__word-thin">Studio</span>
        </span>
      )}
    </a>
  )
}

/* --------------------------------------------------------------------------
   Magnetic — subtle attraction to the cursor (desktop only)
   -------------------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const reduced = useReducedMotion()

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------------------
   Button
   -------------------------------------------------------------------------- */
export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  icon = true,
  magnetic = true,
  onClick,
  type,
}: {
  href?: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'dark'
  size?: 'md' | 'sm'
  external?: boolean
  icon?: boolean
  magnetic?: boolean
  onClick?: () => void
  type?: 'submit' | 'button'
}) {
  const cls = `btn ${variant === 'ghost' ? 'btn--ghost' : ''} ${variant === 'dark' ? 'btn--dark' : ''} ${
    size === 'sm' ? 'btn--sm' : ''
  }`
  const inner = (
    <>
      <span className="btn__fill" aria-hidden />
      <span>{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden>
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </span>
      )}
    </>
  )
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      scrollToHash(href)
    }
    onClick?.()
  }
  const el = href ? (
    <a
      href={href}
      className={cls}
      onClick={handle}
      data-cursor="hide"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type={type ?? 'button'} className={cls} onClick={onClick} data-cursor="hide">
      {inner}
    </button>
  )
  return magnetic ? <Magnetic>{el}</Magnetic> : el
}

/* --------------------------------------------------------------------------
   Reveal — fade/slide up on scroll into view
   -------------------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className = '',
  once = true,
  amount = 0.3,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  amount?: number
  as?: 'div' | 'span' | 'p' | 'li' | 'section' | 'article' | 'header' | 'footer'
}) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   SplitLines — line-by-line masked text reveal
   -------------------------------------------------------------------------- */
const lineVariants: Variants = {
  hidden: { y: '110%', rotate: 2 },
  show: (i: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 1, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function SplitLines({
  lines,
  className = '',
  delay = 0,
  as = 'h2',
  inView = true,
  ariaLabel,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  inView?: boolean
  ariaLabel?: string
}) {
  const Tag = motion[as] as typeof motion.h2
  // The parent is observed (children are clipped by their overflow mask and
  // would never intersect); variants propagate to the lines.
  return (
    <Tag
      className={`split ${className}`}
      aria-label={ariaLabel}
      initial="hidden"
      {...(inView ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' })}
    >
      {lines.map((line, i) => (
        <span className="split__mask" key={i} aria-hidden={ariaLabel ? true : undefined}>
          <motion.span className="split__line" custom={i + delay} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   SectionHeading
   -------------------------------------------------------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  text,
  stack = false,
  cta,
}: {
  eyebrow: string
  title: ReactNode[]
  text?: ReactNode
  stack?: boolean
  cta?: ReactNode
}) {
  return (
    <div className={`section-head ${stack ? 'section-head--stack' : ''}`}>
      <div>
        <Reveal y={16}>
          <span className="eyebrow accent">{eyebrow}</span>
        </Reveal>
        <SplitLines lines={title} className="display-2" as="h2" />
      </div>
      {(text || cta) && (
        <Reveal delay={0.15} className="section-head__aside">
          {text && <p className="lead muted section-head__text">{text}</p>}
          {cta}
        </Reveal>
      )}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Counter — animated number
   -------------------------------------------------------------------------- */
export function Counter({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduced) {
      ref.current.textContent = `${to}${suffix}`
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 4)
      if (ref.current) ref.current.textContent = `${Math.round(to * eased)}${suffix}`
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, suffix, duration, reduced])

  return (
    <span ref={ref} className="mono">
      0{suffix}
    </span>
  )
}

/* --------------------------------------------------------------------------
   Marquee — infinite horizontal scroll (CSS-driven, GPU friendly)
   -------------------------------------------------------------------------- */
export function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = '',
  outline = false,
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
  outline?: boolean
}) {
  const row = [...items, ...items]
  return (
    <div className={`marquee ${className}`} aria-hidden>
      <div
        className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((it, i) => (
          <span className={`marquee__item ${outline ? 'marquee__item--outline' : ''}`} key={i}>
            {it}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
