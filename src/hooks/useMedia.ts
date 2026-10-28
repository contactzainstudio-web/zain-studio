import { useEffect, useState } from 'react'

export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(initial)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** True on devices with a fine pointer (mouse) and hover capability. */
export function useIsDesktopPointer() {
  return useMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
}

export function usePrefersReducedMotion() {
  return useMedia('(prefers-reduced-motion: reduce)')
}
