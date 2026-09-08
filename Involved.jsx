import { useState } from 'react'
import { roles } from '../data'
import DonationPanel from '../components/DonationPanel'

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

export default function Involved() {
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
