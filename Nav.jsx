import { useEffect, useState } from 'react'
import { PawMark } from './Bits'

const links = [
  { key: 'home', label: 'Home' },
  { key: 'animals', label: 'Animals' },
  { key: 'involved', label: 'Get involved' },
]

export default function Nav({ route, navigate, onDonate }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (key) => {
    setOpen(false)
    navigate(key)
  }

  return (
    <header className={`nav ${stuck ? 'nav--stuck' : ''}`}>
      <div className="nav__inner">
        <button className="brand" onClick={() => go('home')} aria-label="SavePaws home">
          <span className="brand__mark">
            <PawMark size={18} color="#10201A" />
          </span>
          <span className="brand__word">SavePaws</span>
        </button>

        <nav className="nav__links" aria-label="Main">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className={`nav__link ${route === l.key ? 'is-active' : ''}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav__end">
          <button className="btn btn--primary btn--sm" onClick={onDonate}>
            <span>Donate</span>
          </button>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      <div className={`drawer ${open ? 'is-open' : ''}`}>
        {links.map((l) => (
          <button key={l.key} onClick={() => go(l.key)} className={route === l.key ? 'is-active' : ''}>
            {l.label}
          </button>
        ))}
      </div>
    </header>
  )
}
