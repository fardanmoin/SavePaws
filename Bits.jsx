import { useEffect, useState } from 'react'
import useInView from '../hooks/useInView'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function PawMark({ size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="63" r="23" fill={color} />
      <circle cx="24" cy="35" r="10.5" fill={color} />
      <circle cx="50" cy="25" r="10.5" fill={color} />
      <circle cx="76" cy="35" r="10.5" fill={color} />
    </svg>
  )
}

// Photos load from a live source, so a failed request falls back to a
// tinted block with the animal's initial instead of a broken image icon.
export function Photo({ src, alt, name = '', className = '', ratio }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div className={`photo photo--fallback ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
        <span>{(name || alt || '?').charAt(0)}</span>
      </div>
    )
  }

  return (
    <div className={`photo ${loaded ? 'is-loaded' : ''} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function Counter({ to, duration = 1400, format = (n) => n.toLocaleString('en-US') }) {
  const [ref, seen] = useInView(0.4)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (reduced()) {
      setValue(to)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])

  return <span ref={ref}>{format(value)}</span>
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, seen] = useInView(0.15)
  return (
    <Tag
      ref={ref}
      className={`reveal ${seen ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function Meter({ raised, goal }) {
  const [ref, seen] = useInView(0.4)
  const pct = Math.min(Math.round((raised / goal) * 100), 100)
  return (
    <div className="meter" ref={ref}>
      <div className="meter__track">
        <div className="meter__fill" style={{ width: seen ? `${pct}%` : '0%' }} />
      </div>
      <div className="meter__row">
        <strong>${raised.toLocaleString('en-US')}</strong>
        <span>
          {pct}% of ${goal.toLocaleString('en-US')}
        </span>
      </div>
    </div>
  )
}
