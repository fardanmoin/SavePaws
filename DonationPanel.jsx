import { useMemo, useState } from 'react'
import { donationTiers } from '../data'
import { PawMark } from './Bits'

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

export default function DonationPanel({ compact = false }) {
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
