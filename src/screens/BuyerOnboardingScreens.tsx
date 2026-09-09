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
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-stone-400 flex-shrink-0">{step}/5</span>
      </div>
    </div>
  )
}

function Hero({ emoji, bg = '#EFF6FF' }: { emoji: string; bg?: string }) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm" style={{ background: bg }}>
        <span style={{ fontSize: 52, lineHeight: 1 }}>{emoji}</span>
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder = '', type = 'text', suffix, optional,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; suffix?: string; optional?: boolean
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{label}</p>
        {optional && <span className="text-xs text-stone-300 font-semibold">(optional)</span>}
      </div>
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

// ── Step 1 — Mobile Number ───────────────────────────────────────────────────

export function BuyerOnboardingPhoneScreen({ navigate }: NavProps) {
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={1} onBack={() => navigate('onboardingRole')} />
      <Hero emoji="🏪" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome, Buyer!
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
            Your number is safe. We never share it with sellers or third parties without your permission.
          </p>
        </div>

        <GreenCTA label="Send OTP →" onClick={() => navigate('buyerOnboardingOtp')} />
      </div>
    </div>
  )
}

// ── Step 1 (cont.) — OTP Verification ───────────────────────────────────────

export function BuyerOnboardingOtpScreen({ navigate }: NavProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleDigit = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`bo-otp-${idx + 1}`)?.focus()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={1} onBack={() => navigate('buyerOnboardingPhone')} />
      <Hero emoji="📱" bg="#F0FDF4" />

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
              id={`bo-otp-${i}`}
              type="tel"
              value={d}
              onChange={(e) => handleDigit(e.target.value, i)}
              className="flex-1 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-1">
          <button onClick={() => navigate('buyerOnboardingPhone')} className="text-sm text-stone-500 font-semibold active:opacity-60">
            ← Edit Number
          </button>
          <button className="text-sm text-green-700 font-bold active:opacity-60">Resend OTP</button>
        </div>

        <GreenCTA label="Verify & Continue →" onClick={() => navigate('buyerOnboardingBusiness')} />
      </div>
    </div>
  )
}

// ── Step 2 — Business Details ─────────────────────────────────────────────────

const bizTypes = ['Wholesaler', 'Retailer', 'Processor', 'Trader', 'Exporter', 'Restaurant']

export function BuyerOnboardingBusinessScreen({ navigate }: NavProps) {
  const [bizName, setBizName] = useState('')
  const [bizType, setBizType] = useState('')
  const [owner, setOwner] = useState('')
  const [pan, setPan] = useState('')
  const [gstin, setGstin] = useState('')
  const [address, setAddress] = useState('')
  const [location, setLocation] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={2} onBack={() => navigate('buyerOnboardingOtp')} />
      <Hero emoji="🏢" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Business Details
          </h1>
          <p className="text-sm text-stone-500 mt-1">Farmers will see these details on your profile</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Business / Shop Name" value={bizName} onChange={setBizName} placeholder="Sharma Agro Traders" />

          <div>
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Business Type</p>
            <div className="flex flex-wrap gap-2">
              {bizTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setBizType(t)}
                  className={`px-3.5 py-2 rounded-full text-sm font-bold border transition-all active:scale-95 ${
                    bizType === t ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Field label="Owner / Contact Person" value={owner} onChange={setOwner} placeholder="Rajesh Sharma" />
          <Field label="PAN / Business ID" value={pan} onChange={(v) => setPan(v.toUpperCase())} placeholder="ABCDE1234F" />
          <Field label="GSTIN" value={gstin} onChange={(v) => setGstin(v.toUpperCase())} placeholder="22AAAAA0000A1Z5" optional />
          <Field label="Business Address" value={address} onChange={setAddress} placeholder="Shop No. 12, Main Market" />
          <Field label="City / Location" value={location} onChange={setLocation} placeholder="Nagpur, Maharashtra" />
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('buyerOnboardingProfile')} />
      </div>
    </div>
  )
}

// ── Step 3 — Business Verification ──────────────────────────────────────────

export function BuyerOnboardingProfileScreen({ navigate }: NavProps) {
  const [docUploaded, setDocUploaded] = useState(false)
  const [licUploaded, setLicUploaded] = useState(false)

  const allDone = docUploaded && licUploaded

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={3} onBack={() => navigate('buyerOnboardingBusiness')} />
      <Hero emoji="📋" bg="#F3E8FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Verify your Business
          </h1>
          <p className="text-sm text-stone-500 mt-1">Upload documents to get the "Verified Buyer" badge</p>
        </div>

        {/* Document uploads */}
        <div className="space-y-3">
          {[
            { id: 'reg', label: 'Business Registration / Shop License', sub: 'Shop Act / Trade License / GST Certificate', uploaded: docUploaded, toggle: () => setDocUploaded((v) => !v) },
            { id: 'id', label: 'Owner ID Proof', sub: 'Aadhaar / PAN Card / Voter ID', uploaded: licUploaded, toggle: () => setLicUploaded((v) => !v) },
          ].map((doc) => (
            <button
              key={doc.id}
              onClick={doc.toggle}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 transition-all text-left ${
                doc.uploaded ? 'bg-green-50 border-green-500' : 'bg-white border-dashed border-stone-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                doc.uploaded ? 'bg-green-100' : 'bg-stone-100'
              }`}>
                {doc.uploaded ? '✅' : '📄'}
              </div>
              <div className="flex-1">
                <p className={`font-black text-sm leading-tight ${doc.uploaded ? 'text-green-800' : 'text-stone-700'}`}>
                  {doc.uploaded ? `${doc.label} · Uploaded` : `Upload ${doc.label}`}
                </p>
                <p className={`text-xs mt-0.5 ${doc.uploaded ? 'text-green-600' : 'text-stone-400'}`}>{doc.sub}</p>
              </div>
              {!doc.uploaded && (
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Verification status */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Verification Status</p>
          </div>
          {[
            { label: 'Business Registration', done: docUploaded },
            { label: 'Identity Proof', done: licUploaded },
            { label: 'KisanSetu Review (Auto)', done: false },
          ].map((item, i, arr) => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}>
              <span className="text-lg w-7 text-center">{item.done ? '✅' : '⏳'}</span>
              <p className="flex-1 text-sm font-bold text-stone-700">{item.label}</p>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                item.done ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-400'
              }`}>
                {item.done ? 'Done' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* Verified message */}
        {allDone && (
          <div
            className="rounded-2xl px-4 py-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #14532d, #16a34a)' }}
          >
            <span className="text-3xl">🏅</span>
            <div>
              <p className="text-white font-black text-sm">Verified &amp; Trusted Buyer</p>
              <p className="text-green-200 text-xs mt-0.5">Documents received · KisanSetu review in progress</p>
            </div>
          </div>
        )}

        {/* Security note */}
        <div className="flex items-start gap-3 bg-white border border-stone-200 rounded-2xl px-4 py-3.5">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <p className="text-xs text-stone-600 font-semibold leading-relaxed">
            Your documents are encrypted with bank-grade security. KisanSetu is RBI-compliant and NPCI-verified.
          </p>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('buyerOnboardingRequirements')} />
      </div>
    </div>
  )
}

// ── Step 4 — Buying Requirements ─────────────────────────────────────────────

const cropOptions = [
  { emoji: '🥦', label: 'Vegetables' },
  { emoji: '🍎', label: 'Fruits' },
  { emoji: '🌾', label: 'Grains' },
  { emoji: '🫘', label: 'Pulses' },
  { emoji: '🌿', label: 'Herbs & Spices' },
  { emoji: '🌰', label: 'Other Crops' },
]

const gradeOptions = ['Grade A', 'Grade B', 'Premium', 'Export Quality', 'Any']
const priceRanges  = ['Budget (₹10–15)', 'Mid (₹15–25)', 'Premium (₹25+)', 'Flexible']
const frequencies  = ['Weekly', 'Bi-weekly', 'Monthly', 'Seasonal']

export function BuyerOnboardingRequirementsScreen({ navigate }: NavProps) {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [quantity, setQuantity] = useState('')
  const [grade, setGrade] = useState('Grade A')
  const [priceRange, setPriceRange] = useState('Mid (₹15–25)')
  const [location, setLocation] = useState('')
  const [frequency, setFrequency] = useState('Weekly')

  const toggleCrop = (label: string) =>
    setSelectedCrops((prev) => prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label])

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={4} onBack={() => navigate('buyerOnboardingProfile')} />
      <Hero emoji="🛒" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Buying Requirements
          </h1>
          <p className="text-sm text-stone-500 mt-1">We will match you with the right farmers and FPOs</p>
        </div>

        {/* Crop categories */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Select Crops</p>
          <div className="flex flex-wrap gap-2">
            {cropOptions.map(({ emoji, label }) => {
              const active = selectedCrops.includes(label)
              return (
                <button
                  key={label}
                  onClick={() => toggleCrop(label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold border transition-all active:scale-95 ${
                    active ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quantity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Required Quantity</p>
            <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 flex items-center">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="500"
                className="flex-1 px-4 py-4 text-stone-900 font-black text-xl outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-base"
              />
              <span className="pr-3 text-xs text-stone-400 font-bold flex-shrink-0">kg/mo</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Quality / Grade</p>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-4 bg-white border-2 border-stone-200 rounded-2xl text-stone-900 font-bold text-sm outline-none focus:border-green-500 transition-colors appearance-none"
            >
              {gradeOptions.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Price range */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Preferred Price Range</p>
          <div className="grid grid-cols-2 gap-2">
            {priceRanges.map((p) => (
              <button
                key={p}
                onClick={() => setPriceRange(p)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold border-2 text-left transition-all ${
                  priceRange === p ? 'bg-green-50 border-green-600 text-green-800' : 'bg-white border-stone-200 text-stone-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Preferred Location / Mandi</p>
          <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Nagpur APMC Mandi, Maharashtra"
              className="w-full px-4 py-4 text-stone-900 font-bold text-base outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Purchase frequency */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Purchase Frequency</p>
          <div className="flex flex-wrap gap-2">
            {frequencies.map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all active:scale-95 ${
                  frequency === f ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('buyerOnboardingPayment')} />
      </div>
    </div>
  )
}

// ── Step 5 — Payment Details ─────────────────────────────────────────────────

const paymentMethods = [
  { id: 'bank', label: 'Bank Transfer', emoji: '🏦' },
  { id: 'upi',  label: 'UPI',           emoji: '📲' },
  { id: 'both', label: 'Both',          emoji: '✅' },
]

export function BuyerOnboardingPaymentScreen({ navigate }: NavProps) {
  const [account, setAccount] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [upi, setUpi] = useState('')
  const [paymentPref, setPaymentPref] = useState('both')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={5} onBack={() => navigate('buyerOnboardingRequirements')} />
      <Hero emoji="💳" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Payment Details
          </h1>
          <p className="text-sm text-stone-500 mt-1">Pay farmers quickly and securely</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="Bank Account Number" value={account} onChange={setAccount} placeholder="1234 5678 9012 3456" type="tel" />
          <Field label="IFSC Code" value={ifsc} onChange={(v) => setIfsc(v.toUpperCase())} placeholder="SBIN0001234" />
          <Field label="UPI ID" value={upi} onChange={setUpi} placeholder="sharma@upi" optional />
        </div>

        {/* Payment method preference */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Preferred Payment Method</p>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentPref(m.id)}
                className={`flex flex-col items-center py-4 px-2 rounded-2xl border-2 gap-2 transition-all active:scale-95 ${
                  paymentPref === m.id ? 'bg-green-50 border-green-600' : 'bg-white border-stone-200'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className={`text-xs font-bold ${paymentPref === m.id ? 'text-green-800' : 'text-stone-600'}`}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secure message */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-4">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="text-sm font-black text-green-800">Secure Payment Guarantee</p>
            <p className="text-xs text-green-700 font-semibold mt-0.5 leading-relaxed">
              Bank-grade encryption. All payments are held in KisanSetu Escrow and released to farmers only after quality confirmation.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('buyerHome')}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Setup Complete ✓
        </button>
      </div>
    </div>
  )
}
