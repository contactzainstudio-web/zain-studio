import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Short brand preloader: black → orange Z scales in → curtain lifts.
 * Total ≈ 1.4s. Skipped when prefers-reduced-motion.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(
      () => {
        setShow(false)
        onDone()
      },
      reduced ? 50 : 1350,
    )
    document.documentElement.classList.add('no-scroll')
    return () => {
      clearTimeout(t)
      document.documentElement.classList.remove('no-scroll')
    }
  }, [onDone])

  useEffect(() => {
    if (!show) document.documentElement.classList.remove('no-scroll')
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <motion.img
            src="/brand/zain-mark-160.png"
            alt=""
            className="preloader__mark"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.05, 1], opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            width={96}
            height={96}
          />
          <motion.span
            className="preloader__word"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Zain Studio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
