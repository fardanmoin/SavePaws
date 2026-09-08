import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

/* ============================================================
   SavePaws, single file build.
   Everything lives here so the project is only five files.
   Data sits at the top, then hooks, components, pages, app.
   ============================================================ */


/* ---------- data.js ---------- */

// All content below is sample data for the SavePaws demo build.
// Photos are pulled from loremflickr, so every reload shows a real photo.

const photo = (topic, lock, w = 800, h = 900) =>
  `https://loremflickr.com/${w}/${h}/${topic}?lock=${lock}`;

const animals = [
  {
    id: 'a1',
    name: 'Barnaby',
    species: 'Dog',
    breed: 'Staffordshire mix',
    age: '4 yrs',
    size: 'Medium',
    sex: 'Male',
    shelter: 'Ridgeway Kennels',
    daysWaiting: 214,
    urgent: true,
    tags: ['Good with kids', 'House trained', 'Knows 6 commands'],
    fee: 95,
    photo: photo('staffordshire,dog', 11),
    note: 'Came in with a broken hip after a hit and run. Walks fine now, still flinches at cars, so a quiet street suits him best.',
  },
  {
    id: 'a2',
    name: 'Olive',
    species: 'Cat',
    breed: 'Domestic shorthair',
    age: '2 yrs',
    size: 'Small',
    sex: 'Female',
    shelter: 'Marlow Cattery',
    daysWaiting: 38,
    urgent: false,
    tags: ['Bonded with Fig', 'Lap cat', 'Indoor only'],
    fee: 60,
    photo: photo('tabby,cat', 22),
    note: 'Adopted as a pair with her brother Fig. She talks. Constantly. About everything.',
  },
  {
    id: 'a3',
    name: 'Fig',
    species: 'Cat',
    breed: 'Domestic shorthair',
    age: '2 yrs',
    size: 'Small',
    sex: 'Male',
    shelter: 'Marlow Cattery',
    daysWaiting: 38,
    urgent: false,
    tags: ['Bonded with Olive', 'Shy at first', 'Indoor only'],
    fee: 60,
    photo: photo('black,cat', 33),
    note: 'Hides for the first week, then decides you are furniture and sleeps on you.',
  },
  {
    id: 'a4',
    name: 'Juniper',
    species: 'Dog',
    breed: 'Border collie',
    age: '1 yr',
    size: 'Medium',
    sex: 'Female',
    shelter: 'Ridgeway Kennels',
    daysWaiting: 12,
    urgent: false,
    tags: ['High energy', 'Needs a job', 'Great recall'],
    fee: 120,
    photo: photo('border,collie', 44),
    note: 'Surrendered by a family who underestimated a collie. She needs two hours a day and a puzzle to solve.',
  },
  {
    id: 'a5',
    name: 'Doris',
    species: 'Dog',
    breed: 'Beagle',
    age: '9 yrs',
    size: 'Small',
    sex: 'Female',
    shelter: 'Halden Farm Rescue',
    daysWaiting: 341,
    urgent: true,
    tags: ['Senior', 'Sofa specialist', 'Free adoption'],
    fee: 0,
    photo: photo('beagle', 55),
    note: 'Nine years old and passed over 40 times. Sleeps 18 hours a day and asks for very little.',
  },
  {
    id: 'a6',
    name: 'Pepper',
    species: 'Rabbit',
    breed: 'Lop',
    age: '3 yrs',
    size: 'Small',
    sex: 'Female',
    shelter: 'Halden Farm Rescue',
    daysWaiting: 67,
    urgent: false,
    tags: ['Litter trained', 'Needs a companion', 'Indoor hutch'],
    fee: 35,
    photo: photo('rabbit,lop', 66),
    note: 'An Easter present that stopped being interesting by June. She is still lovely.',
  },
  {
    id: 'a7',
    name: 'Atlas',
    species: 'Dog',
    breed: 'German shepherd',
    age: '6 yrs',
    size: 'Large',
    sex: 'Male',
    shelter: 'Ridgeway Kennels',
    daysWaiting: 156,
    urgent: true,
    tags: ['Ex working dog', 'No small pets', 'Crate trained'],
    fee: 110,
    photo: photo('german,shepherd', 77),
    note: 'Retired from search work after a shoulder injury. Sharp, loyal, and bored out of his mind in a kennel.',
  },
  {
    id: 'a8',
    name: 'Marzipan',
    species: 'Cat',
    breed: 'Ragdoll cross',
    age: '5 mo',
    size: 'Small',
    sex: 'Female',
    shelter: 'Marlow Cattery',
    daysWaiting: 9,
    urgent: false,
    tags: ['Kitten', 'Fully vaccinated', 'Climbs curtains'],
    fee: 75,
    photo: photo('kitten', 88),
    note: 'Found in a car engine bay in March. Now weighs 2.1kg and fears nothing.',
  },
  {
    id: 'a9',
    name: 'Tuesday',
    species: 'Dog',
    breed: 'Lurcher',
    age: '3 yrs',
    size: 'Large',
    sex: 'Female',
    shelter: 'Halden Farm Rescue',
    daysWaiting: 88,
    urgent: false,
    tags: ['Quiet', 'Cat friendly', 'Loves a blanket'],
    fee: 95,
    photo: photo('lurcher,greyhound', 99),
    note: 'Named after the day she was found. Runs for four minutes, sleeps for eleven hours.',
  },
  {
    id: 'a10',
    name: 'Bruno',
    species: 'Dog',
    breed: 'Labrador',
    age: '7 yrs',
    size: 'Large',
    sex: 'Male',
    shelter: 'Ridgeway Kennels',
    daysWaiting: 45,
    urgent: false,
    tags: ['Great with dogs', 'On a diet', 'Steals socks'],
    fee: 90,
    photo: photo('labrador', 101),
    note: 'His owner moved into care. Bruno is 6kg overweight and on a strict plan he resents deeply.',
  },
  {
    id: 'a11',
    name: 'Saffron',
    species: 'Cat',
    breed: 'Ginger tabby',
    age: '4 yrs',
    size: 'Small',
    sex: 'Female',
    shelter: 'Marlow Cattery',
    daysWaiting: 122,
    urgent: true,
    tags: ['FIV positive', 'Indoor only', 'Very affectionate'],
    fee: 0,
    photo: photo('ginger,cat', 111),
    note: 'FIV positive cats live full normal lives indoors. Most people scroll past her anyway.',
  },
  {
    id: 'a12',
    name: 'Clover',
    species: 'Rabbit',
    breed: 'Dutch',
    age: '1 yr',
    size: 'Small',
    sex: 'Male',
    shelter: 'Halden Farm Rescue',
    daysWaiting: 21,
    urgent: false,
    tags: ['Bonded pair wanted', 'Neutered', 'Hay obsessed'],
    fee: 35,
    photo: photo('dutch,rabbit', 121),
    note: 'Would happily share a hutch with Pepper if someone takes them both.',
  },
];

const campaigns = [
  {
    id: 'c1',
    title: 'Winter kennel heating',
    location: 'Ridgeway Kennels',
    raised: 18400,
    goal: 26000,
    donors: 412,
    daysLeft: 19,
    blurb:
      'Six of the twelve kennel blocks still run on portable heaters from 2009. Replacing them keeps 84 dogs above 15C through January.',
    photo: photo('kennel,dog', 131, 900, 600),
  },
  {
    id: 'c2',
    title: 'Mobile spay and neuter van',
    location: 'County wide',
    raised: 61250,
    goal: 75000,
    donors: 1893,
    daysLeft: 41,
    blurb:
      'One van covers eleven rural postcodes with no low cost clinic. Every 1,000 procedures prevents an estimated 6,700 unwanted births over five years.',
    photo: photo('veterinarian,dog', 141, 900, 600),
  },
  {
    id: 'c3',
    title: 'Emergency intake after the floods',
    location: 'Halden Farm Rescue',
    raised: 9120,
    goal: 12000,
    donors: 276,
    daysLeft: 6,
    blurb:
      'Thirty one animals arrived in nine days when the river came up. This covers their food, medication and quarantine housing.',
    photo: photo('flood,rescue,dog', 151, 900, 600),
  },
  {
    id: 'c4',
    title: 'Senior dog dental fund',
    location: 'All shelters',
    raised: 4780,
    goal: 15000,
    donors: 158,
    daysLeft: 63,
    blurb:
      'Dental disease is the single most common reason an older dog gets passed over. A clean and extraction runs about 380 dollars per dog.',
    photo: photo('senior,dog', 161, 900, 600),
  },
];

const impact = [
  { value: 6300000, suffix: '', label: 'companion animals entering shelters each year' },
  { value: 4100000, suffix: '', label: 'of those adopted into a home' },
  { value: 920000, suffix: '', label: 'still euthanised, mostly for space' },
  { value: 87, suffix: '%', label: 'of shelter intake is preventable with spay and neuter access' },
];

const research = [
  {
    stat: '3.1x',
    claim:
      'Households that foster before adopting are three times more likely to complete an adoption than households that meet an animal only at a kennel visit.',
    source: 'Sample figure, SavePaws intake review 2024',
  },
  {
    stat: '48 days',
    claim:
      'A single professional photograph cuts the average time a dog waits for a home from 96 days to 48. It is the cheapest thing a shelter can do.',
    source: 'Sample figure, shelter listing study',
  },
  {
    stat: '1 in 4',
    claim:
      'One in four surrenders is financial, not behavioural. A short term food and vet bank keeps those animals in the homes they already have.',
    source: 'Sample figure, regional surrender survey',
  },
];

const roles = [
  {
    id: 'r1',
    title: 'Dog walker',
    commitment: '2 hours, weekly',
    spots: 14,
    detail:
      'Two walks per shift from Ridgeway Kennels. Training is one Saturday morning. You will be matched to dogs that suit your pace, not the other way round.',
  },
  {
    id: 'r2',
    title: 'Foster carer',
    commitment: '2 to 8 weeks',
    spots: 6,
    detail:
      'We cover food, crates and every vet bill. You cover the sofa. Most needed for kittens under 8 weeks and dogs recovering from surgery.',
  },
  {
    id: 'r3',
    title: 'Transport driver',
    commitment: 'On call',
    spots: 9,
    detail:
      'Vet runs, intake pickups and adoption handovers. Fuel is reimbursed at 45c per mile. A hatchback is plenty.',
  },
  {
    id: 'r4',
    title: 'Kennel photographer',
    commitment: '3 hours, monthly',
    spots: 3,
    detail:
      'You shoot, we list. Bring a camera and patience. This role moves more animals than any other on the board.',
  },
];

const stories = [
  {
    name: 'Marisol and Dot',
    quote:
      'Dot spent eleven months in a kennel because she growled at the assessment. Turns out she just hates clipboards. She has been asleep on my bed for two years now.',
    photo: photo('woman,dog', 171, 500, 500),
    since: 'Adopted March 2023',
  },
  {
    name: 'The Okafor family',
    quote:
      'We fostered two kittens for six weeks so we could see how our son handled it. We failed the foster, obviously. Both cats stayed.',
    photo: photo('family,cat', 181, 500, 500),
    since: 'Adopted August 2024',
  },
];

const adoptedTicker = [
  'Rufus',
  'Nell',
  'Pickle',
  'Otis',
  'Maple',
  'Bear',
  'Winnie',
  'Sid',
  'Hazel',
  'Moss',
  'Ziggy',
  'Peach',
  'Rye',
  'Cassie',
];

const donationTiers = [
  { amount: 15, impact: 'Feeds one dog for a week' },
  { amount: 40, impact: 'A full vaccination course for a kitten' },
  { amount: 85, impact: 'One night of emergency intake care' },
  { amount: 150, impact: 'A spay or neuter procedure plus recovery' },
  { amount: 380, impact: 'Dental surgery for a senior dog' },
];


/* ---------- useInView.js ---------- */

function useInView(threshold = 0.25) {
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


/* ---------- useHashRoute.js ---------- */

const VALID = ['home', 'animals', 'involved']

function read() {
  const raw = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  return VALID.includes(raw) ? raw : 'home'
}

function useHashRoute() {
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


/* ---------- Bits.jsx ---------- */

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function PawMark({ size = 22, color = 'currentColor' }) {
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
function Photo({ src, alt, name = '', className = '', ratio }) {
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

function Counter({ to, duration = 1400, format = (n) => n.toLocaleString('en-US') }) {
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

function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
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

function Meter({ raised, goal }) {
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


/* ---------- AnimalCard.jsx ---------- */

function AnimalCard({ animal, onOpen, index = 0 }) {
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

function AnimalSheet({ animal, onClose, onDonate }) {
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


/* ---------- DonationPanel.jsx ---------- */

const presets = [15, 40, 85, 150]

function impactFor(amount) {
  if (!amount || amount < 5) return 'Every amount buys something. Litter, hay, a syringe of antibiotics.'
  let match = donationTiers[0]
  donationTiers.forEach((t) => {
    if (amount >= t.amount) match = t
  })
  const multiple = Math.floor(amount / match.amount)
  return multiple > 1 ? `${match.impact}, ${multiple} times over` : match.impact
}

function digits(value, max) {
  return value.replace(/\D/g, '').slice(0, max)
}

function DonationPanel({ compact = false }) {
  const [monthly, setMonthly] = useState(true)
  const [amount, setAmount] = useState(40)
  const [custom, setCustom] = useState('')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', card: '', exp: '', cvc: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const value = custom ? Number(custom) : amount
  const impact = useMemo(() => impactFor(value), [value])

  const set = (key) => (e) => {
    let v = e.target.value
    if (key === 'card') v = digits(v, 16).replace(/(.{4})/g, '$1 ').trim()
    if (key === 'exp') {
      const d = digits(v, 4)
      v = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
    }
    if (key === 'cvc') v = digits(v, 4)
    setForm((f) => ({ ...f, [key]: v }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter the name on the card'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a working email for the receipt'
    if (digits(form.card, 16).length < 15) e.card = 'Card number looks short'
    if (!/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = 'Use MM/YY'
    if (form.cvc.length < 3) e.cvc = 'Three digits on the back'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const pay = () => {
    if (!validate()) return
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setStep(3)
    }, 1100)
  }

  if (step === 3) {
    return (
      <div className={`donate ${compact ? 'donate--compact' : ''}`}>
        <div className="donate__done">
          <span className="donate__stamp">
            <PawMark size={30} color="#10201A" />
          </span>
          <h3>
            ${value} {monthly ? 'a month' : 'received'}
          </h3>
          <p>{impact}. A receipt is on its way to {form.email}.</p>
          <p className="donate__ref">Reference SP-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          <button
            className="btn btn--ghost"
            onClick={() => {
              setStep(1)
              setForm({ name: '', email: '', card: '', exp: '', cvc: '' })
            }}
          >
            <span>Give again</span>
          </button>
          <p className="donate__demo">Sample checkout. No payment is taken and no card data leaves this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`donate ${compact ? 'donate--compact' : ''}`}>
      <div className="donate__head">
        <h3>{step === 1 ? 'Pick an amount' : 'Card details'}</h3>
        <div className="switch" role="group" aria-label="Giving frequency">
          <button className={monthly ? 'is-on' : ''} onClick={() => setMonthly(true)}>
            Monthly
          </button>
          <button className={!monthly ? 'is-on' : ''} onClick={() => setMonthly(false)}>
            One time
          </button>
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="chips">
            {presets.map((p) => (
              <button
                key={p}
                className={`chip ${!custom && amount === p ? 'is-on' : ''}`}
                onClick={() => {
                  setAmount(p)
                  setCustom('')
                }}
              >
                ${p}
              </button>
            ))}
            <label className="chip chip--input">
              <span>$</span>
              <input
                inputMode="numeric"
                placeholder="Other"
                value={custom}
                onChange={(e) => setCustom(digits(e.target.value, 5))}
                aria-label="Custom amount"
              />
            </label>
          </div>

          <p className="donate__impact" key={impact}>
            {impact}
          </p>

          <button className="btn btn--primary btn--block" onClick={() => setStep(2)} disabled={!value}>
            <span>
              Give ${value || 0} {monthly ? 'monthly' : 'once'}
            </span>
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="field">
            <label htmlFor="dn">Name on card</label>
            <input id="dn" value={form.name} onChange={set('name')} placeholder="Alex Rivera" />
            {errors.name && <em>{errors.name}</em>}
          </div>
          <div className="field">
            <label htmlFor="de">Email for the receipt</label>
            <input id="de" value={form.email} onChange={set('email')} placeholder="alex@email.com" />
            {errors.email && <em>{errors.email}</em>}
          </div>
          <div className="field">
            <label htmlFor="dc">Card number</label>
            <input id="dc" value={form.card} onChange={set('card')} placeholder="4242 4242 4242 4242" inputMode="numeric" />
            {errors.card && <em>{errors.card}</em>}
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="dx">Expiry</label>
              <input id="dx" value={form.exp} onChange={set('exp')} placeholder="04/29" inputMode="numeric" />
              {errors.exp && <em>{errors.exp}</em>}
            </div>
            <div className="field">
              <label htmlFor="dv">CVC</label>
              <input id="dv" value={form.cvc} onChange={set('cvc')} placeholder="123" inputMode="numeric" />
              {errors.cvc && <em>{errors.cvc}</em>}
            </div>
          </div>

          <button className={`btn btn--primary btn--block ${busy ? 'is-busy' : ''}`} onClick={pay} disabled={busy}>
            <span>{busy ? 'Taking payment' : `Confirm $${value} ${monthly ? 'monthly' : 'now'}`}</span>
          </button>
          <button className="linkish" onClick={() => setStep(1)}>
            Change the amount
          </button>
          <p className="donate__demo">Sample checkout. No payment is taken and no card data leaves this page.</p>
        </>
      )}
    </div>
  )
}


/* ---------- DonateModal.jsx ---------- */

function DonateModal({ open, onClose }) {
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


/* ---------- Nav.jsx ---------- */

const links = [
  { key: 'home', label: 'Home' },
  { key: 'animals', label: 'Animals' },
  { key: 'involved', label: 'Get involved' },
]

function Nav({ route, navigate, onDonate }) {
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


/* ---------- Footer.jsx ---------- */

function Footer({ navigate, onDonate }) {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <PawMark size={26} color="#F6C445" />
          <p>
            SavePaws is a network of three shelters and 240 volunteers. We take in animals no one else has room
            for, and we do not put a healthy animal to sleep for space.
          </p>
        </div>

        <div className="footer__col">
          <h4>Pages</h4>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('animals')}>Animals and campaigns</button>
          <button onClick={() => navigate('involved')}>Volunteer and donate</button>
          <button onClick={onDonate}>Give now</button>
        </div>

        <div className="footer__col">
          <h4>Shelters</h4>
          <p>Ridgeway Kennels, Barrow Lane</p>
          <p>Marlow Cattery, Ashgrove</p>
          <p>Halden Farm Rescue, Winterbourne</p>
        </div>

        <div className="footer__col">
          <h4>Reach us</h4>
          <p>hello@savepaws.demo</p>
          <p>Intake line, open 24 hours</p>
          <p>Registered charity 1148 2290</p>
        </div>
      </div>

      <div className="footer__base">
        <span>SavePaws demo build. Sample data and sample donations only.</span>
        <span>Built for a campaign coursework project.</span>
      </div>
    </footer>
  )
}


/* ---------- Home.jsx ---------- */

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

function Home({ navigate, onDonate, onOpenAnimal }) {
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


/* ---------- Animals.jsx ---------- */

const species = ['All', 'Dog', 'Cat', 'Rabbit']
const sorts = [
  { key: 'waiting', label: 'Longest wait first' },
  { key: 'newest', label: 'Newest arrivals' },
  { key: 'name', label: 'Name' },
]

function Animals({ onDonate, onOpenAnimal }) {
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


/* ---------- Involved.jsx ---------- */

function VolunteerForm() {
  const [values, setValues] = useState({ name: '', email: '', role: roles[0].title, when: 'Weekends', note: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const submit = () => {
    const e = {}
    if (values.name.trim().length < 2) e.name = 'We need a name to put on the rota'
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Enter an email we can reach you on'
    setErrors(e)
    if (Object.keys(e).length === 0) setSent(true)
  }

  if (sent) {
    return (
      <div className="signup signup--done">
        <h3>You are on the list, {values.name.split(' ')[0]}.</h3>
        <p>
          A coordinator picks up new {values.role.toLowerCase()} applications on Tuesdays. Expect an email within
          three days with a shift to try.
        </p>
        <button className="btn btn--ghost" onClick={() => setSent(false)}>
          <span>Sign someone else up</span>
        </button>
      </div>
    )
  }

  return (
    <div className="signup">
      <h3>Put your name down</h3>
      <div className="field">
        <label htmlFor="vn">Name</label>
        <input id="vn" value={values.name} onChange={set('name')} placeholder="Sam Okafor" />
        {errors.name && <em>{errors.name}</em>}
      </div>
      <div className="field">
        <label htmlFor="ve">Email</label>
        <input id="ve" value={values.email} onChange={set('email')} placeholder="sam@email.com" />
        {errors.email && <em>{errors.email}</em>}
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="vr">Role</label>
          <select id="vr" value={values.role} onChange={set('role')}>
            {roles.map((r) => (
              <option key={r.id}>{r.title}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="vw">Availability</label>
          <select id="vw" value={values.when} onChange={set('when')}>
            <option>Weekends</option>
            <option>Weekday mornings</option>
            <option>Weekday evenings</option>
            <option>Whenever you need me</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="vx">Anything we should know</label>
        <textarea id="vx" rows="3" value={values.note} onChange={set('note')} placeholder="Nervous around big dogs, happy with cats." />
      </div>
      <button className="btn btn--primary btn--block" onClick={submit}>
        <span>Send my details</span>
      </button>
    </div>
  )
}

function Involved() {
  const [open, setOpen] = useState(roles[0].id)

  return (
    <>
      <header className="pagehead">
        <h1>Money keeps the lights on. People get animals out of kennels.</h1>
        <p>
          Both boxes below are live. Pick a shift on the left or set up a gift on the right, and skip the part
          where you feel guilty about choosing one.
        </p>
      </header>

      <section className="split">
        <div className="split__left">
          <h2 className="section__title">Open roles this month</h2>
          <div className="roles">
            {roles.map((r) => {
              const isOpen = open === r.id
              return (
                <div className={`role ${isOpen ? 'is-open' : ''}`} key={r.id}>
                  <button className="role__head" onClick={() => setOpen(isOpen ? null : r.id)} aria-expanded={isOpen}>
                    <span className="role__title">{r.title}</span>
                    <span className="role__meta">{r.commitment}</span>
                    <span className="role__spots">{r.spots} spots</span>
                    <span className="role__sign" aria-hidden="true" />
                  </button>
                  <div className="role__panel">
                    <p>{r.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <VolunteerForm />
        </div>

        <aside className="split__right">
          <div className="sticky">
            <DonationPanel />
            <ul className="assure">
              <li>91 cents of every dollar reaches an animal.</li>
              <li>Monthly gifts can be stopped from any receipt email.</li>
              <li>We never sell or share a donor list.</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  )
}


/* ---------- App.jsx ---------- */

function App() {
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


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
