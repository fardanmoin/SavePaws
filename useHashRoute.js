import { useCallback, useEffect, useState } from 'react'

const VALID = ['home', 'animals', 'involved']

function read() {
  const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  return VALID.includes(raw) ? raw : 'home'
}

export default function useHashRoute() {
  const [route, setRoute] = useState(read)

  useEffect(() => {
    const onChange = () => {
      setRoute(read())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((next) => {
    if (read() === next) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.location.hash = `/${next}`
  }, [])

  return [route, navigate]
}
