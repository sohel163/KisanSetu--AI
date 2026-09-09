import { useState } from 'react'
import type { NavProps } from '../types'

// ── Shared sub-components (5-step consumer flow) ─────────────────────────────

function StepHeader({ step, onBack }: { step: number; onBack: () => void }) {
  return (
    <div className="px-4 pt-10 pb-2">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 active:opacity-70 flex-shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-700 rounded-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-stone-400 flex-shrink-0">{step}/5</span>
      </div>
    </div>
  )
}

function Hero({ emoji, bg }: { emoji: string; bg: string }) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm" style={{ background: bg }}>
        <span style={{ fontSize: 52, lineHeight: 1 }}>{emoji}</span>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder = '', type = 'text', optional,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; optional?: boolean
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{label}</p>
        {optional && <span className="text-xs text-stone-300 font-semibold">(optional)</span>}
      </div>
      <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-4 text-stone-900 font-bold text-base outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
        />
      </div>
    </div>
  )
}

function GreenCTA({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
      style={{ fontFamily: 'Outfit, sans-serif' }}
    >
      {label}
    </button>
  )
}

// ── Step 1 — Mobile Number ───────────────────────────────────────────────────

export function ConsumerOnbPhoneScreen({ navigate }: NavProps) {
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={1} onBack={() => navigate('onboardingRole')} />
      <Hero emoji="📱" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome, Consumer!
          </h1>
          <p className="text-sm text-stone-500 mt-1">Enter your mobile number to get started</p>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Mobile Number (+91)</p>
          <div className="flex gap-2">
            <div className="flex items-center px-3.5 bg-white border-2 border-stone-200 rounded-2xl text-stone-700 font-black text-base flex-shrink-0">
              🇮🇳 +91
            </div>
            <div className="flex-1 bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, '').slice(0, 10))}
                placeholder="94012 34567"
                className="w-full px-4 py-4 text-stone-900 font-black text-2xl outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-base"
              />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-stone-400 px-1">A 6-digit OTP will be sent to verify your number</p>
        </div>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
          <span className="text-xl flex-shrink-0">🔒</span>
          <p className="text-xs text-blue-800 font-semibold leading-relaxed">
            Your number is private. We never share it with farmers or any third party without your consent.
          </p>
        </div>

        <GreenCTA label="Request OTP →" onClick={() => navigate('consumerOnbOtp')} />
      </div>
    </div>
  )
}

// ── Step 2 — OTP Verification ────────────────────────────────────────────────

export function ConsumerOnbOtpScreen({ navigate }: NavProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleDigit = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`co-otp-${idx + 1}`)?.focus()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={2} onBack={() => navigate('consumerOnbPhone')} />
      <Hero emoji="🔐" bg="#F0FDF4" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Verify your Phone
          </h1>
          <p className="text-sm text-stone-500 mt-1">6-digit OTP sent to +91 94012 34567</p>
        </div>

        <div className="flex gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              id={`co-otp-${i}`}
              type="tel"
              value={d}
              onChange={(e) => handleDigit(e.target.value, i)}
              className="flex-1 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => navigate('consumerOnbPhone')}
            className="text-sm text-stone-500 font-semibold active:opacity-60"
          >
            ← Edit Number
          </button>
          <button className="text-sm text-green-700 font-bold active:opacity-60">
            Resend OTP
          </button>
        </div>

        <GreenCTA label="Verify & Continue →" onClick={() => navigate('consumerOnbProfile')} />
      </div>
    </div>
  )
}

// ── Step 3 — Consumer Profile ────────────────────────────────────────────────

export function ConsumerOnbProfileScreen({ navigate }: NavProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={3} onBack={() => navigate('consumerOnbOtp')} />
      <Hero emoji="👤" bg="#F3E8FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Tell us about yourself
          </h1>
          <p className="text-sm text-stone-500 mt-1">Your details help farmers deliver fresh produce to you</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Full Name" value={name} onChange={setName} placeholder="Priya Sharma" />
          <Field label="City / Location" value={location} onChange={setLocation} placeholder="Nagpur, Maharashtra" />
          <Field label="Delivery Address" value={address} onChange={setAddress} placeholder="Flat 4B, Green Park, Nagpur" />
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('consumerOnbPrefs')} />
      </div>
    </div>
  )
}

// ── Step 4 — Buying Preferences ──────────────────────────────────────────────

const produceCategories = [
  { emoji: '🥬', label: 'Vegetables' },
  { emoji: '🍎', label: 'Fruits' },
  { emoji: '🌾', label: 'Grains' },
  { emoji: '🫘', label: 'Pulses' },
  { emoji: '🌿', label: 'Herbs & Spices' },
  { emoji: '🥛', label: 'Dairy' },
  { emoji: '🌰', label: 'Dry Fruits' },
  { emoji: '🌱', label: 'Organic Only' },
]

export function ConsumerOnbPrefsScreen({ navigate }: NavProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (label: string) =>
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    )

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={4} onBack={() => navigate('consumerOnbProfile')} />
      <Hero emoji="🛒" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            What do you want to buy?
          </h1>
          <p className="text-sm text-stone-500 mt-1">We will show you the freshest produce from local farmers</p>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Select categories</p>
          <div className="grid grid-cols-2 gap-2">
            {produceCategories.map(({ emoji, label }) => {
              const active = selected.includes(label)
              return (
                <button
                  key={label}
                  onClick={() => toggle(label)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-left transition-all active:scale-[0.97] ${
                    active
                      ? 'bg-green-50 border-green-600'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <span style={{ fontSize: 28 }}>{emoji}</span>
                  <p className={`font-black text-sm leading-tight ${active ? 'text-green-800' : 'text-stone-700'}`}>
                    {label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('consumerOnbPurchase')} />
      </div>
    </div>
  )
}

// ── Step 5 — Purchase Preferences ────────────────────────────────────────────

const priceRanges = ['Budget', 'Mid-range', 'Premium']
const deliveryOptions = ['Home Delivery', 'Pickup from Farm', 'Both']
const quantities = ['Under 5 kg', '5–20 kg', '20–50 kg', '50+ kg']

export function ConsumerOnbPurchaseScreen({ navigate }: NavProps) {
  const [qty, setQty] = useState('')
  const [priceRange, setPriceRange] = useState('Mid-range')
  const [delivery, setDelivery] = useState('Home Delivery')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={5} onBack={() => navigate('consumerOnbPrefs')} />
      <Hero emoji="📦" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Your Buying Preferences
          </h1>
          <p className="text-sm text-stone-500 mt-1">Helps us match you with the right farmers</p>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Typical Quantity (per week)</p>
          <div className="grid grid-cols-2 gap-2">
            {quantities.map((q) => (
              <button
                key={q}
                onClick={() => setQty(q)}
                className={`py-3.5 rounded-2xl text-sm font-bold border-2 transition-all active:scale-95 ${
                  qty === q
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Preferred Price Range</p>
          <div className="flex gap-2">
            {priceRanges.map((p) => (
              <button
                key={p}
                onClick={() => setPriceRange(p)}
                className={`flex-1 py-3.5 rounded-2xl text-sm font-bold border-2 transition-all active:scale-95 ${
                  priceRange === p
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Delivery Preference</p>
          <div className="flex flex-col gap-2">
            {deliveryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setDelivery(opt)}
                className={`w-full py-3.5 px-4 rounded-2xl text-sm font-bold border-2 text-left transition-all active:scale-[0.98] ${
                  delivery === opt
                    ? 'bg-green-50 border-green-600 text-green-800'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                {opt === 'Home Delivery' ? '🚚 ' : opt === 'Pickup from Farm' ? '🌾 ' : '✅ '}{opt}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('consumerDashboard')}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Setup Complete ✓
        </button>
      </div>
    </div>
  )
}
