import { ArrowUp } from 'lucide-react'
import { Logo, Reveal } from './ui'
import { NAV, SERVICES, SITE } from '../data/site'
import { getLenis } from '../hooks/useLenisScroll'

export function Footer() {
  const toTop = () => {
    const l = getLenis()
    if (l) l.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer theme-dark" aria-label="Footer">
      <div className="container">
        <div className="footer__top">
          <Reveal className="footer__brand">
            <Logo size={56} withWordmark={false} />
            <p className="footer__tag heading-2">
              Strategy, design & technology for brands that want to be remembered.
            </p>
            <a href={`mailto:${SITE.email}`} className="footer__mail link link--orange">
              {SITE.email}
            </a>
          </Reveal>

          <div className="footer__cols">
            <Reveal delay={0.05}>
              <h4 className="footer__head mono">Services</h4>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <a href="#services" className="link" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h4 className="footer__head mono">Navigate</h4>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="link" onClick={(e) => { e.preventDefault(); document.querySelector(n.href)?.scrollIntoView({ behavior: 'smooth' }) }}>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <h4 className="footer__head mono">Connect</h4>
              <ul>
                <li>
                  <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SITE.phoneRaw}?text=Hello!%20I%20visited%20your%20agency%20website%20and%20would%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="link">
                    {SITE.phone}
                  </a>
                </li>
                <li className="muted">{SITE.location}</li>
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="footer__giant" aria-hidden>
          <span>Zain Studio</span>
        </div>

        <div className="footer__bottom">
          <span className="mono muted">© {new Date().getFullYear()} Zain Studio. All rights reserved.</span>
          <span className="mono muted footer__local">Karachi · Working worldwide</span>
          <button className="footer__top-btn" onClick={toTop} aria-label="Back to top">
            <span className="mono">Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
