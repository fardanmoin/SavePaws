import { useEffect, useState } from 'react'
import { animals, campaigns, impact, research, stories, adoptedTicker } from '../data'
import { Counter, Meter, Photo, Reveal } from '../components/Bits'
import { AnimalCard } from '../components/AnimalCard'

function KennelBoard({ onOpen }) {
  const cast = [animals[0], animals[4], animals[10], animals[6]]
  const [front, setFront] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const t = setInterval(() => setFront((f) => (f + 1) % cast.length), 4200)
    return () => clearInterval(t)
  }, [cast.length])

  return (
    <div className="board">
      {cast.map((a, i) => {
        const offset = (i - front + cast.length) % cast.length
        return (
          <button
            key={a.id}
            className="board__card"
            style={{ '--o': offset, zIndex: cast.length - offset }}
            onClick={() => (offset === 0 ? onOpen(a) : setFront(i))}
            aria-label={offset === 0 ? `Read about ${a.name}` : `Show ${a.name}`}
          >
            <Photo src={a.photo} alt={a.name} name={a.name} ratio="4 / 5" />
            <span className="board__plate">
              <b>{a.name}</b>
              <i>{a.daysWaiting} days waiting</i>
            </span>
          </button>
        )
      })}
      <p className="board__hint">Tap a card. Four of the 61 animals with us tonight.</p>
    </div>
  )
}

export default function Home({ navigate, onDonate, onOpenAnimal }) {
  const featured = animals.slice(0, 4)
  const spotlight = campaigns[1]

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <h1>
            Every animal here is
            <span className="hero__line">waiting for someone</span>
            to walk in.
          </h1>
          <p className="hero__sub">
            Three shelters, 61 animals tonight, one rule. Nobody healthy gets put down for space. That rule costs
            money and hours, and this is where both come from.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => navigate('animals')}>
              <span>Meet the animals</span>
            </button>
            <button className="btn btn--ghost" onClick={onDonate}>
              <span>Fund a rescue</span>
            </button>
          </div>
          <p className="hero__foot">
            <b>1,284</b> homes found since 2019, and <b>240</b> volunteers on the roster this month.
          </p>
        </div>
        <KennelBoard onOpen={onOpenAnimal} />
      </section>

      <div className="ticker" aria-label="Animals rehomed this week">
        <div className="ticker__run">
          {[...adoptedTicker, ...adoptedTicker].map((n, i) => (
            <span key={`${n}-${i}`}>
              {n} <em>went home</em>
            </span>
          ))}
        </div>
      </div>

      <section className="section numbers">
        <h2 className="section__title">The shape of the problem</h2>
        <div className="numbers__grid">
          {impact.map((s) => (
            <div className="numbers__cell" key={s.label}>
              <strong>
                <Counter to={s.value} />
                {s.suffix}
              </strong>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
        <p className="numbers__source">
          United States, annual estimates. Sample data assembled for this campaign build.
        </p>
      </section>

      <section className="section studies">
        <h2 className="section__title">Three things the data keeps telling us</h2>
        <div className="studies__list">
          {research.map((r, i) => (
            <Reveal key={r.stat} delay={i * 90} className="studies__item">
              <strong>{r.stat}</strong>
              <p>{r.claim}</p>
              <cite>{r.source}</cite>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Looking for a home right now</h2>
          <button className="linkish" onClick={() => navigate('animals')}>
            See all 12
          </button>
        </div>
        <div className="grid grid--4">
          {featured.map((a, i) => (
            <AnimalCard key={a.id} animal={a} index={i} onOpen={onOpenAnimal} />
          ))}
        </div>
      </section>

      <section className="spotlight">
        <Photo src={spotlight.photo} alt={spotlight.title} name={spotlight.title} className="spotlight__photo" />
        <div className="spotlight__panel">
          <h2>{spotlight.title}</h2>
          <p>{spotlight.blurb}</p>
          <Meter raised={spotlight.raised} goal={spotlight.goal} />
          <p className="spotlight__meta">
            {spotlight.donors.toLocaleString('en-US')} people giving, {spotlight.daysLeft} days left
          </p>
          <button className="btn btn--primary" onClick={onDonate}>
            <span>Back this campaign</span>
          </button>
        </div>
      </section>

      <section className="section stories">
        {stories.map((s) => (
          <figure className="story" key={s.name}>
            <Photo src={s.photo} alt={s.name} name={s.name} ratio="1 / 1" className="story__photo" />
            <blockquote>
              {s.quote}
              <figcaption>
                {s.name}, {s.since}
              </figcaption>
            </blockquote>
          </figure>
        ))}
      </section>

      <section className="cta">
        <h2>Two hours a week moves a dog out of a kennel faster than any donation does.</h2>
        <div className="cta__actions">
          <button className="btn btn--dark" onClick={() => navigate('involved')}>
            <span>Volunteer with us</span>
          </button>
          <button className="btn btn--ghost btn--onlight" onClick={onDonate}>
            <span>Give instead</span>
          </button>
        </div>
      </section>
    </>
  )
}
