import { useEffect, useRef } from 'react'

const STAGGER_MS = 65

export function useStaggerReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      Array.from(el.children).forEach((child, i) => {
        setTimeout(() => child.classList.add('in'), i * STAGGER_MS)
      })
      obs.disconnect()
    }, { threshold: 0.1 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}
