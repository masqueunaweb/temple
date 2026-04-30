'use client'
import { useEffect, useRef } from 'react'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }

    document.addEventListener('mousemove', move, { passive: true })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />
}
