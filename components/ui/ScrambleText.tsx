'use client'
import { useRef } from 'react'
import { scrambleText } from '@/lib/scramble'

interface Props {
  text: string
  className?: string
}

export function ScrambleText({ text, className }: Props) {
  const ref  = useRef<HTMLSpanElement>(null)
  const busy = useRef(false)

  const handleHover = () => {
    if (busy.current || !ref.current) return
    busy.current = true
    scrambleText({ el: ref.current, original: text })
    setTimeout(() => { busy.current = false }, text.length * 100)
  }

  return (
    <span
      ref={ref}
      onMouseEnter={handleHover}
      className={className}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <span key={i} aria-hidden="true">{ch}</span>
      ))}
    </span>
  )
}
