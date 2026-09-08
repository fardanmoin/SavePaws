import { useEffect } from 'react'
import { Photo } from './Bits'

export function AnimalCard({ animal, onOpen, index = 0 }) {
  return (
    <article className="acard" style={{ '--i': index }}>
      <button className="acard__hit" onClick={() => onOpen(animal)} aria-label={`Read about ${animal.name}`}>
        <div className="acard__media">
          <Photo src={animal.photo} alt={animal.name} name={animal.name} ratio="4 / 5" />
          {animal.urgent && <span className="flag">Waiting longest</span>}
          <span className="acard__days">{animal.daysWaiting} days here</span>
        </div>
        <div className="acard__body">
          <h3>{animal.name}</h3>
          <p className="acard__meta">
            {animal.breed}, {animal.age}, {animal.sex}
          </p>
          <ul className="acard__tags">
            {animal.tags.slice(0, 2).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  )
}

export function AnimalSheet({ animal, onClose, onDonate }) {
  useEffect(() => {
    if (!animal) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [animal, onClose])

  if (!animal) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={animal.name}>
      <div className="modal__scrim" onClick={onClose} />
      <div className="modal__body modal__body--wide">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </button>
        <div className="sheet">
          <Photo src={animal.photo} alt={animal.name} name={animal.name} ratio="1 / 1" className="sheet__photo" />
          <div className="sheet__text">
            <h3>{animal.name}</h3>
            <p className="sheet__meta">
              {animal.breed}, {animal.age}, {animal.sex}, {animal.size}
            </p>
            <p className="sheet__note">{animal.note}</p>
            <dl className="sheet__facts">
              <div>
                <dt>Shelter</dt>
                <dd>{animal.shelter}</dd>
              </div>
              <div>
                <dt>Waiting</dt>
                <dd>{animal.daysWaiting} days</dd>
              </div>
              <div>
                <dt>Adoption fee</dt>
                <dd>{animal.fee === 0 ? 'Waived' : `$${animal.fee}`}</dd>
              </div>
            </dl>
            <ul className="sheet__tags">
              {animal.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="sheet__actions">
              <button className="btn btn--primary" onClick={onDonate}>
                <span>Sponsor {animal.name}</span>
              </button>
              <button className="btn btn--ghost" onClick={onClose}>
                <span>Back to the list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
