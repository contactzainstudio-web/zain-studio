import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsDesktopPointer, usePrefersReducedMotion } from '../hooks/useMedia'

/**
 * Subtle custom cursor: a tiny orange dot that grows into a labelled disc
 * over elements with [data-cursor="view"] etc. Desktop only.
 */
export function Cursor() {
  const desktop = useIsDesktopPointer()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const [label, setLabel] = useState<string | null>(null)
  const [mode, setMode] = useState<'dot' | 'label' | 'hide'>('dot')

  useEffect(() => {
    if (!desktop || reduced) return
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      if (!t) {
        setMode('dot')
        setLabel(null)
        return
      }
      const v = t.dataset.cursor
      if (v === 'hide') {
        setMode('hide')
      } else {
        setMode('label')
        setLabel(v === 'view' ? 'View' : v === 'drag' ? 'Drag' : v === 'open' ? 'Open' : v ?? null)
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [desktop, reduced, x, y])

  if (!desktop || reduced) return null

  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden>
      <motion.div
        className="cursor__disc"
        animate={{
          width: mode === 'label' ? 84 : mode === 'hide' ? 0 : 10,
          height: mode === 'label' ? 84 : mode === 'hide' ? 0 : 10,
          opacity: mode === 'hide' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <motion.span
          className="cursor__label"
          animate={{ opacity: mode === 'label' ? 1 : 0, scale: mode === 'label' ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
