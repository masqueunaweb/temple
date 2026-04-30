const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface ScrambleOptions {
  el: HTMLElement
  original: string
  iterations?: number
  intervalMs?: number
}

export function scrambleText({
  el,
  original,
  iterations = 6,
  intervalMs = 38,
}: ScrambleOptions): void {
  original.split('').forEach((char, i) => {
    const span = el.children[i] as HTMLElement
    if (!span) return

    let n = 0
    setTimeout(() => {
      const t = setInterval(() => {
        span.textContent = n >= iterations
          ? char
          : CHARS[Math.floor(Math.random() * CHARS.length)]
        if (n >= iterations) clearInterval(t)
        n++
      }, intervalMs)
    }, i * intervalMs * 1.5)
  })
}
