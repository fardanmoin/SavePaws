import { useEffect } from 'react'
import DonationPanel from './DonationPanel'

export default function DonateModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Make a donation">
      <div className="modal__scrim" onClick={onClose} />
      <div className="modal__body">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
        <p className="modal__kicker">Ridgeway, Marlow and Halden Farm share every dollar by need, not by size.</p>
        <DonationPanel compact />
      </div>
    </div>
  )
}
