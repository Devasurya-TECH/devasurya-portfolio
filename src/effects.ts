import { useEffect } from 'react'

/**
 * Pointer-driven polish, mouse devices only:
 * - [data-magnetic]: element leans toward the cursor.
 * - [data-tilt]: element tilts in 3D and gets a moving glare (--gx / --gy).
 * - [data-spot]: a soft spotlight follows the cursor inside (--mx / --my).
 * All handled with one delegated listener, written to inline styles / CSS variables.
 */
export function usePointerEffects() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let magnet: HTMLElement | null = null
    let magnetRect: DOMRect | null = null
    let tilt: HTMLElement | null = null
    // Scrolling moves elements under a still cursor; drop the cached measurement.
    const onScroll = () => { release(magnet); magnet = null; magnetRect = null }

    const release = (el: HTMLElement | null) => {
      if (el) el.style.transform = ''
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const target = event.target as Element | null
      if (!target?.closest) return

      // Magnetic
      const m = target.closest<HTMLElement>('[data-magnetic]')
      if (m !== magnet) {
        release(magnet)
        magnet = m
        // Measure once, before it moves, so the pull doesn't feed back on itself.
        if (m) { m.style.transform = ''; magnetRect = m.getBoundingClientRect() }
      }
      if (m && magnetRect) {
        const r = magnetRect
        const dx = event.clientX - (r.left + r.width / 2)
        const dy = event.clientY - (r.top + r.height / 2)
        const strength = Number(m.dataset.magnetic) || 0.3
        const clamp = (v: number) => Math.max(-10, Math.min(10, v))
        m.style.transform = `translate(${clamp(dx * strength)}px, ${clamp(dy * strength)}px)`
      }

      // Tilt
      const t = target.closest<HTMLElement>('[data-tilt]')
      if (t !== tilt) {
        if (tilt) { tilt.style.transform = ''; tilt.classList.remove('is-tilting') }
        tilt = t
      }
      if (t) {
        const r = t.getBoundingClientRect()
        const px = (event.clientX - r.left) / r.width
        const py = (event.clientY - r.top) / r.height
        const max = 9
        t.classList.add('is-tilting')
        t.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`
        t.style.setProperty('--gx', `${px * 100}%`)
        t.style.setProperty('--gy', `${py * 100}%`)
      }

      // Spotlight
      const s = target.closest<HTMLElement>('[data-spot]')
      if (s) {
        const r = s.getBoundingClientRect()
        s.style.setProperty('--mx', `${event.clientX - r.left}px`)
        s.style.setProperty('--my', `${event.clientY - r.top}px`)
      }
    }

    const onLeave = () => {
      release(magnet); magnet = null
      if (tilt) { tilt.style.transform = ''; tilt.classList.remove('is-tilting'); tilt = null }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}
