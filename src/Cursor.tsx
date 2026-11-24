import { useEffect, useRef } from 'react'

/**
 * Custom cursor: a precise dot plus a soft trailing ring.
 * - Ring grows over links and buttons, shrinks on press.
 * - Elements with data-cursor="Label" show a filled label bubble (e.g. "Open").
 * - Text fields keep the normal text cursor.
 * - Only on devices with a real mouse; touch screens keep their native behaviour.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    const dot = dotRef.current!
    const ring = ringRef.current!
    const label = labelRef.current!
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    // Reduced motion: keep the cursor, but let the ring trail much less.
    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.45 : 0.18
    const mouse = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let frame = 0
    let visible = false

    const setState = (name: string, on: boolean) => root.classList.toggle(`cur-${name}`, on)

    const loop = () => {
      pos.x += (mouse.x - pos.x) * ease
      pos.y += (mouse.y - pos.y) * ease
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      label.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      mouse.x = event.clientX
      mouse.y = event.clientY
      if (!visible) {
        visible = true
        pos.x = mouse.x
        pos.y = mouse.y
        setState('visible', true)
      }
    }

    let lastTarget: Element | null = null
    const evaluate = (target: Element | null) => {
      if (!target?.closest) return
      lastTarget = target
      const text = target.closest('input, textarea, [contenteditable="true"]')
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      const interactive = target.closest('a, button, label, [role="button"], summary')
      setState('text', Boolean(text))
      setState('hover', Boolean(interactive) && !labelled && !text)
      if (labelled && !text) {
        label.firstElementChild!.textContent = labelled.dataset.cursor || ''
        setState('label', true)
      } else {
        setState('label', false)
      }
    }
    const onOver = (event: PointerEvent) => evaluate(event.target as Element | null)

    const onDown = () => setState('down', true)
    const onUp = () => { setState('down', false); window.setTimeout(() => evaluate(lastTarget), 30) }
    const onLeave = () => { visible = false; setState('visible', false) }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      root.classList.remove('has-custom-cursor', 'cur-visible', 'cur-hover', 'cur-label', 'cur-text', 'cur-down')
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-ring" ref={ringRef}><span /></div>
      <div className="cursor-bubble" ref={labelRef}><span /></div>
      <div className="cursor-dot" ref={dotRef}><span /></div>
    </div>
  )
}
