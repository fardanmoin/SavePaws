import { useEffect, useRef, useState } from 'react'

export default function useInView(threshold = 0.25) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || seen) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true)
            io.disconnect()
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [seen, threshold])

  return [ref, seen]
}
