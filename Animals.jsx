import { useMemo, useState } from 'react'
import { animals, campaigns } from '../data'
import { AnimalCard } from '../components/AnimalCard'
import { Meter, Photo } from '../components/Bits'

const species = ['All', 'Dog', 'Cat', 'Rabbit']
const sorts = [
  { key: 'waiting', label: 'Longest wait first' },
  { key: 'newest', label: 'Newest arrivals' },
  { key: 'name', label: 'Name' },
]

export default function Animals({ onDonate, onOpenAnimal }) {
  const [kind, setKind] = useState('All')
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [sort, setSort] = useState('waiting')

  const list = useMemo(() => {
    let out = animals.filter((a) => (kind === 'All' ? true : a.species === kind))
    if (urgentOnly) out = out.filter((a) => a.urgent)
    out = [...out].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'newest') return a.daysWaiting - b.daysWaiting
      return b.daysWaiting - a.daysWaiting
    })
    return out
  }, [kind, urgentOnly, sort])

  return (
    <>
      <header className="pagehead">
        <h1>Twelve animals, one page, no filters on the sad ones.</h1>
        <p>
          Wait times are counted from the day each animal arrived. The ones near the top have been here the
          longest, which usually means they are older, larger, or have a diagnosis that scares people off.
        </p>
      </header>

      <div className="filters">
        <div className="filters__chips">
          {species.map((s) => (
            <button key={s} className={`chip ${kind === s ? 'is-on' : ''}`} onClick={() => setKind(s)}>
              {s}
            </button>
          ))}
          <button className={`chip ${urgentOnly ? 'is-on' : ''}`} onClick={() => setUrgentOnly((v) => !v)}>
            Waiting longest
          </button>
        </div>
        <label className="select">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {sorts.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="resultline">
        {list.length} {list.length === 1 ? 'animal' : 'animals'} shown
      </p>

      {list.length === 0 ? (
        <div className="empty">
          <p>Nothing matches those filters. Clear them and the whole list comes back.</p>
          <button
            className="btn btn--ghost"
            onClick={() => {
              setKind('All')
              setUrgentOnly(false)
            }}
          >
            <span>Clear filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid--4">
          {list.map((a, i) => (
            <AnimalCard key={a.id} animal={a} index={i} onOpen={onOpenAnimal} />
          ))}
        </div>
      )}

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Campaigns running now</h2>
          <button className="linkish" onClick={onDonate}>
            Give to any of them
          </button>
        </div>
        <div className="grid grid--2">
          {campaigns.map((c) => (
            <article className="ccard" key={c.id}>
              <Photo src={c.photo} alt={c.title} name={c.title} ratio="16 / 9" className="ccard__photo" />
              <div className="ccard__body">
                <p className="ccard__where">{c.location}</p>
                <h3>{c.title}</h3>
                <p className="ccard__blurb">{c.blurb}</p>
                <Meter raised={c.raised} goal={c.goal} />
                <div className="ccard__foot">
                  <span>
                    {c.donors.toLocaleString('en-US')} donors, {c.daysLeft} days left
                  </span>
                  <button className="btn btn--primary btn--sm" onClick={onDonate}>
                    <span>Give</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
