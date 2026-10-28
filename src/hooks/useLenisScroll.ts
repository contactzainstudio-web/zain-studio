import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './useMedia'

let instance: Lenis | null = null
export const getLenis = () => instance

/**
 * Sets up Lenis smooth scrolling on the document.
 * Uses native scroll on touch devices / reduced-motion for performance.
 */
export function useLenisScroll(enabled = true) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!enabled || reduced) return
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
    })
    instance = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      instance = null
    }
  }, [enabled, reduced])
}

/** Scroll to an anchor, using Lenis when available. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  if (instance) instance.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
  else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', hash)
}
