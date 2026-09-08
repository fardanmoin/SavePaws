import { useCallback, useState } from 'react'
import useHashRoute from './hooks/useHashRoute'
import Nav from './components/Nav'
import Footer from './components/Footer'
import DonateModal from './components/DonateModal'
import { AnimalSheet } from './components/AnimalCard'
import Home from './pages/Home'
import Animals from './pages/Animals'
import Involved from './pages/Involved'

export default function App() {
  const [route, navigate] = useHashRoute()
  const [donateOpen, setDonateOpen] = useState(false)
  const [active, setActive] = useState(null)

  const openDonate = useCallback(() => {
    setActive(null)
    setDonateOpen(true)
  }, [])

  return (
    <div className="app">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Nav route={route} navigate={navigate} onDonate={openDonate} />

      <main id="main" className="shell">
        {route === 'home' && <Home navigate={navigate} onDonate={openDonate} onOpenAnimal={setActive} />}
        {route === 'animals' && <Animals onDonate={openDonate} onOpenAnimal={setActive} />}
        {route === 'involved' && <Involved />}
      </main>

      <Footer navigate={navigate} onDonate={openDonate} />

      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
      <AnimalSheet animal={active} onClose={() => setActive(null)} onDonate={openDonate} />
    </div>
  )
}
