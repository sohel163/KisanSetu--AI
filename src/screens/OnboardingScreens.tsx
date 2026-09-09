import { useState } from 'react'
import type { NavProps } from '../types'

// ── Shared sub-components ────────────────────────────────────────────────────

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
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-stone-400 flex-shrink-0">{step}/7</span>
      </div>
    </div>
  )
}

function Hero({ emoji, bg = '#DCFCE7' }: { emoji: string; bg?: string }) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm" style={{ background: bg }}>
        <span style={{ fontSize: 52, lineHeight: 1 }}>{emoji}</span>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder = '', type = 'text', suffix,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; suffix?: string
}) {
  return (
    <div>
      <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">{label}</p>
      <div className="flex items-center bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-4 text-stone-900 font-bold text-base outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
        />
        {suffix && <span className="pr-4 text-stone-500 font-bold text-sm flex-shrink-0">{suffix}</span>}
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

// ── Step 1 — Role Selection ──────────────────────────────────────────────────

const roleOptions = [
  {
    id: 'farmer',
    emoji: '🌾',
    label: 'Farmer',
    sub: 'Sell crops with better market information',
  },
  {
    id: 'buyer',
    emoji: '🏪',
    label: 'Buyer',
    sub: 'Buy directly from verified farmers',
  },
  {
    id: 'fpo',
    emoji: '🤝',
    label: 'FPO / Group',
    sub: 'Manage farmer groups and bulk sales',
  },
  {
    id: 'consumer',
    emoji: '🛒',
    label: 'Consumer',
    sub: 'Buy fresh produce directly',
  },
]

export function OnboardingRoleScreen({ navigate }: NavProps) {
  const [selected, setSelected] = useState('farmer')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <div className="px-4 pt-10 pb-2 flex justify-end">
        <button
          onClick={() => navigate('login')}
          className="text-sm text-stone-400 font-semibold active:opacity-60"
        >
          Login instead
        </button>
      </div>

      <Hero emoji="🌾" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How will you use KisanSetu?
          </h1>
          <p className="text-sm text-stone-500 mt-1">Choose what describes you best</p>
        </div>

        <div className="flex flex-col gap-3">
          {roleOptions.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                selected === r.id ? 'bg-green-50 border-green-600' : 'bg-white border-stone-200'
              }`}
            >
              <span style={{ fontSize: 36 }}>{r.emoji}</span>
              <div className="flex-1">
                <p className={`font-black text-base ${selected === r.id ? 'text-green-800' : 'text-stone-800'}`}>
                  {r.label}
                </p>
                <p className="text-xs text-stone-400 mt-0.5 leading-snug">{r.sub}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selected === r.id ? 'border-green-700 bg-green-700' : 'border-stone-300'
              }`}>
                {selected === r.id && <span className="text-white text-xs font-black">✓</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Voice assistant option */}
        <button className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl active:opacity-70">
          <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="white" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth={2} strokeLinecap="round" />
              <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-stone-800">Ask KisanSetu</p>
            <p className="text-xs text-stone-400">Tap to speak your choice</p>
          </div>
        </button>

        <GreenCTA
          label="Continue →"
          onClick={() => {
            if (selected === 'buyer') navigate('buyerOnboardingPhone')
            else if (selected === 'consumer') navigate('consumerOnbPhone')
            else if (selected === 'fpo') navigate('fpoOnbPhone')
            else navigate('onboardingPhone')
          }}
        />
      </div>
    </div>
  )
}

// ── Step 2 — Mobile Number ───────────────────────────────────────────────────

export function OnboardingPhoneScreen({ navigate }: NavProps) {
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={2} onBack={() => navigate('onboardingRole')} />
      <Hero emoji="👨‍🌾" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome, Farmer!
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

        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <span className="text-xl flex-shrink-0">🔒</span>
          <p className="text-xs text-green-800 font-semibold leading-relaxed">
            Your number is safe. We never share it with buyers or third parties without your permission.
          </p>
        </div>

        <GreenCTA label="Request OTP →" onClick={() => navigate('onboardingOtp')} />
      </div>
    </div>
  )
}

// ── Step 3 — OTP Verification ────────────────────────────────────────────────

export function OnboardingOtpScreen({ navigate }: NavProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleDigit = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`ob-otp-${idx + 1}`)?.focus()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={3} onBack={() => navigate('onboardingPhone')} />
      <Hero emoji="📱" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Verify your Phone
          </h1>
          <p className="text-sm text-stone-500 mt-1">6-digit OTP sent to +91 94012 34567</p>
        </div>

        {/* 6-digit OTP boxes */}
        <div className="flex gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              id={`ob-otp-${i}`}
              type="tel"
              value={d}
              onChange={(e) => handleDigit(e.target.value, i)}
              className="flex-1 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => navigate('onboardingPhone')}
            className="text-sm text-stone-500 font-semibold active:opacity-60"
          >
            ← Edit Number
          </button>
          <button className="text-sm text-green-700 font-bold active:opacity-60">
            Resend OTP
          </button>
        </div>

        <GreenCTA label="Verify & Continue →" onClick={() => navigate('onboardingIdentity')} />
      </div>
    </div>
  )
}

// ── Step 4 — Identity Verification ──────────────────────────────────────────

export function OnboardingIdentityScreen({ navigate }: NavProps) {
  const [method, setMethod] = useState<'aadhaar' | 'docs' | null>(null)

  const idOptions: { id: 'aadhaar' | 'docs'; emoji: string; title: string; sub: string }[] = [
    {
      id: 'aadhaar',
      emoji: '🪪',
      title: 'Use Aadhaar (OTP)',
      sub: 'Quick · Uses your Aadhaar-linked mobile number',
    },
    {
      id: 'docs',
      emoji: '📄',
      title: 'Upload Documents',
      sub: 'PAN Card / Voter ID · Takes 1-2 days to review',
    },
  ]

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={4} onBack={() => navigate('onboardingOtp')} />
      <Hero emoji="🪪" bg="#F3E8FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Confirm your Identity
          </h1>
          <p className="text-sm text-stone-500 mt-1">Required for secure payments and verified badge</p>
        </div>

        <div className="flex flex-col gap-3">
          {idOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMethod(opt.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] ${
                method === opt.id ? 'bg-green-50 border-green-600' : 'bg-white border-stone-200'
              }`}
            >
              <span className="text-4xl flex-shrink-0">{opt.emoji}</span>
              <div className="flex-1">
                <p className={`font-black text-base leading-tight ${method === opt.id ? 'text-green-800' : 'text-stone-800'}`}>
                  {opt.title}
                </p>
                <p className="text-xs text-stone-400 mt-0.5 leading-snug">{opt.sub}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                method === opt.id ? 'border-green-700 bg-green-700' : 'border-stone-300'
              }`}>
                {method === opt.id && <span className="text-white text-xs font-black">✓</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-start gap-3 bg-white border border-stone-200 rounded-2xl px-4 py-3">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <p className="text-xs text-stone-600 font-semibold leading-relaxed">
            Your documents are encrypted and stored securely. KisanSetu is RBI-compliant and NPCI-verified.
          </p>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('onboardingProfile')} />
      </div>
    </div>
  )
}

// ── Step 5 — Farmer Profile ──────────────────────────────────────────────────

export function OnboardingProfileScreen({ navigate }: NavProps) {
  const [name, setName] = useState('')
  const [parentName, setParentName] = useState('')
  const [village, setVillage] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={5} onBack={() => navigate('onboardingIdentity')} />
      <Hero emoji="🧑‍🌾" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Tell us about yourself
          </h1>
          <p className="text-sm text-stone-500 mt-1">Your profile helps buyers trust you</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Full Name" value={name} onChange={setName} placeholder="Ramesh Kumar" />
          <Field
            label="Father's / Spouse's Name"
            value={parentName}
            onChange={setParentName}
            placeholder="Suresh Kumar"
          />
          <Field label="Village / Location" value={village} onChange={setVillage} placeholder="Akola, Maharashtra" />
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('onboardingFarm')} />
      </div>
    </div>
  )
}

// ── Step 6 — Farm & Crop Details ─────────────────────────────────────────────

const CROPS = ['🌾 Wheat', '🌱 Soybean', '🍅 Tomato', '🧅 Onion', '🌿 Vegetables', '🌙 Cotton', '🌽 Maize', '🥔 Potato']

export function OnboardingFarmScreen({ navigate }: NavProps) {
  const [acres, setAcres] = useState('')
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [status, setStatus] = useState<'growing' | 'harvested'>('growing')

  const toggleCrop = (c: string) =>
    setSelectedCrops((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={6} onBack={() => navigate('onboardingProfile')} />
      <Hero emoji="🌱" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Your Farm & Crops
          </h1>
          <p className="text-sm text-stone-500 mt-1">Help buyers know what you grow</p>
        </div>

        <Field
          label="Total Farmland"
          value={acres}
          onChange={setAcres}
          placeholder="5"
          type="number"
          suffix="Acres"
        />

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Crops You Grow</p>
          <div className="flex flex-wrap gap-2">
            {CROPS.map((crop) => {
              const active = selectedCrops.includes(crop)
              return (
                <button
                  key={crop}
                  onClick={() => toggleCrop(crop)}
                  className={`px-3.5 py-2 rounded-full text-sm font-bold border transition-all active:scale-95 ${
                    active
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  {crop}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Current Crop Status</p>
          <div className="flex gap-1 bg-stone-200 rounded-2xl p-1">
            {([
              { id: 'growing' as const, label: '🌱 Growing' },
              { id: 'harvested' as const, label: '🌾 Harvested' },
            ] as const).map((s) => (
              <button
                key={s.id}
                onClick={() => setStatus(s.id)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                  status === s.id ? 'bg-white shadow text-stone-900' : 'text-stone-500'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('onboardingBank')} />
      </div>
    </div>
  )
}

// ── Step 7 — Bank / Payment Details ─────────────────────────────────────────

export function OnboardingBankScreen({ navigate }: NavProps) {
  const [account, setAccount] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [upi, setUpi] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={7} onBack={() => navigate('onboardingFarm')} />
      <Hero emoji="🏦" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            For secure, direct payments
          </h1>
          <p className="text-sm text-stone-500 mt-1">Receive payment directly to your bank account</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field
            label="Bank Account Number"
            value={account}
            onChange={setAccount}
            placeholder="1234 5678 9012 3456"
            type="tel"
          />
          <Field
            label="IFSC Code"
            value={ifsc}
            onChange={(v) => setIfsc(v.toUpperCase())}
            placeholder="SBIN0001234"
          />
          <Field
            label="UPI ID (Optional)"
            value={upi}
            onChange={setUpi}
            placeholder="ramesh@upi"
          />
        </div>

        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3.5">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="text-sm font-black text-green-800">Secure Transaction</p>
            <p className="text-xs text-green-700 font-semibold mt-0.5 leading-relaxed">
              Bank-grade encryption. Verified by NPCI. Your money goes directly to you.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('home')}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Setup Complete ✓
        </button>
      </div>
    </div>
  )
}
