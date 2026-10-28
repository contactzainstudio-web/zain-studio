import { MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Marquee } from './components/ui'
import { MARQUEE_ITEMS } from './data/site'
import { useLenisScroll } from './hooks/useLenisScroll'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Intro } from './sections/Intro'
import { Process } from './sections/Process'
import { Services } from './sections/Services'
import { Team } from './sections/Team'
import { Why } from './sections/Why'
import { Work } from './sections/Work'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  useLenisScroll(true)

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={onDone} />
      <Cursor />
      <Navbar ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Intro />
        <Marquee items={MARQUEE_ITEMS} speed={38} className="marquee--dark" />
        <Services />
        <Work />
        <Marquee items={MARQUEE_ITEMS} speed={46} reverse outline className="marquee--light" />
        <Why />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
