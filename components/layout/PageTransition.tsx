'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref      = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
    } else {
      gsap.fromTo(el,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
      )
    }
  }, [pathname])

  return <div ref={ref}>{children}</div>
}
