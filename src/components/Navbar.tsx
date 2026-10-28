import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NAV, SITE } from '../data/site'
import { getLenis, scrollToHash } from '../hooks/useLenisScroll'
import { Button, Logo } from './ui'

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // Active-section tracking
  useEffect(() => {
    const ids = ['#home', ...NAV.map((n) => n.href)]
    const els = ids.map((id) => document.querySelector(id)).filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Lock scroll when menu open
  useEffect(() => {
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      document.documentElement.classList.add('no-scroll')
    } else {
      lenis?.start()
      document.documentElement.classList.remove('no-scroll')
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    // wait for the overlay to start leaving before scrolling
    setTimeout(() => scrollToHash(href), open ? 350 : 0)
  }

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="nav__inner">
          <Logo size={scrolled ? 34 : 40} />

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav__link ${active === item.href ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
              >
                <span>{item.label}</span>
                <span className="nav__dot" aria-hidden />
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <div className="nav__cta">
              <Button href="#contact" size="sm">
                Let's Talk
              </Button>
            </div>
            <button
              className={`burger ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu__inner">
              <ul className="menu__list">
                {[{ label: 'Home', href: '#home' }, ...NAV].map((item, i) => (
                  <li key={item.href} className="menu__item">
                    <span className="menu__mask">
                      <motion.a
                        href={item.href}
                        className="menu__link"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '110%', transition: { duration: 0.35, delay: 0 } }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => {
                          e.preventDefault()
                          go(item.href)
                        }}
                      >
                        <span className="menu__num mono">0{i + 1}</span>
                        {item.label}
                      </motion.a>
                    </span>
                  </li>
                ))}
              </ul>
              <motion.div
                className="menu__foot"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <a href={`mailto:${SITE.email}`} className="link link--orange">
                  {SITE.email}
                </a>
                <div className="menu__social">
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/${SITE.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
