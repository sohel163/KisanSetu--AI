import { useState } from 'react'
import type { NavProps } from '../types'

// ── Shared sub-components ────────────────────────────────────────────────────

function StepHeader({ step, total = 6, onBack }: { step: number; total?: number; onBack: () => void }) {
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
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-stone-400 flex-shrink-0">{step}/{total}</span>
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

export function FpoOnbPhoneScreen({ navigate }: NavProps) {
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={1} onBack={() => navigate('onboardingRole')} />
      <Hero emoji="🤝" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Welcome, FPO!
          </h1>
          <p className="text-sm text-stone-500 mt-1">Enter your FPO contact number to get started</p>
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
          <p className="mt-1.5 text-xs text-stone-400 px-1">A 6-digit OTP will be sent to verify this number</p>
        </div>

        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <span className="text-xl flex-shrink-0">🔒</span>
          <p className="text-xs text-green-800 font-semibold leading-relaxed">
            Your FPO number is private and secure. KisanSetu never shares it without your consent.
          </p>
        </div>

        <GreenCTA label="Request OTP →" onClick={() => navigate('fpoOnbOtp')} />
      </div>
    </div>
  )
}

// ── Step 1b — OTP Verification ────────────────────────────────────────────────

export function FpoOnbOtpScreen({ navigate }: NavProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleDigit = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`fpo-otp-${idx + 1}`)?.focus()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={1} onBack={() => navigate('fpoOnbPhone')} />
      <Hero emoji="🔐" bg="#F0FDF4" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Verify your Mobile
          </h1>
          <p className="text-sm text-stone-500 mt-1">6-digit OTP sent to +91 94012 34567</p>
        </div>

        <div className="flex gap-2">
          {otp.map((d, i) => (
            <input
              key={i}
              id={`fpo-otp-${i}`}
              type="tel"
              value={d}
              onChange={(e) => handleDigit(e.target.value, i)}
              className="flex-1 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-1">
          <button onClick={() => navigate('fpoOnbPhone')} className="text-sm text-stone-500 font-semibold active:opacity-60">
            ← Edit Number
          </button>
          <button className="text-sm text-green-700 font-bold active:opacity-60">Resend OTP</button>
        </div>

        <GreenCTA label="Verify & Continue →" onClick={() => navigate('fpoOnbDetails')} />
      </div>
    </div>
  )
}

// ── Step 2 — FPO Details ─────────────────────────────────────────────────────

const fpoTypes = ['Producer Company', 'Cooperative Society', 'Section 8 Company', 'Trust / NGO']

export function FpoOnbDetailsScreen({ navigate }: NavProps) {
  const [fpoName, setFpoName] = useState('')
  const [regNo, setRegNo] = useState('')
  const [fpoType, setFpoType] = useState('')
  const [contact, setContact] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [village, setVillage] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={2} onBack={() => navigate('fpoOnbOtp')} />
      <Hero emoji="🏢" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Tell us about your FPO
          </h1>
          <p className="text-sm text-stone-500 mt-1">These details appear on your verified profile</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="FPO Name" value={fpoName} onChange={setFpoName} placeholder="Vidarbha Farmers Collective" />
          <Field label="Registration Number" value={regNo} onChange={setRegNo} placeholder="FPO-MH-2019-0124" />

          <div>
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">FPO Type</p>
            <div className="grid grid-cols-2 gap-2">
              {fpoTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setFpoType(t)}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold border-2 text-left transition-all ${
                    fpoType === t ? 'bg-green-50 border-green-600 text-green-800' : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Field label="Contact Person Name" value={contact} onChange={setContact} placeholder="Suresh Patil" />
          <Field label="Contact Person Number" value={contactPhone} onChange={setContactPhone} placeholder="98765 43210" type="tel" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Village" value={village} onChange={setVillage} placeholder="Dhamangaon" />
            <Field label="District" value={district} onChange={setDistrict} placeholder="Akola" />
          </div>
          <Field label="State" value={state} onChange={setState} placeholder="Maharashtra" />
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('fpoOnbVerify')} />
      </div>
    </div>
  )
}

// ── Step 3 — FPO Verification ────────────────────────────────────────────────

export function FpoOnbVerifyScreen({ navigate }: NavProps) {
  const [panId, setPanId] = useState('')
  const [fpoId, setFpoId] = useState('')
  const [docUploaded, setDocUploaded] = useState(false)

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={3} onBack={() => navigate('fpoOnbDetails')} />
      <Hero emoji="📋" bg="#F3E8FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Verify your FPO
          </h1>
          <p className="text-sm text-stone-500 mt-1">Required for trusted, verified FPO badge</p>
        </div>

        <div className="flex flex-col gap-4">
          <Field label="PAN / FPO ID" value={panId} onChange={setPanId} placeholder="AAAAA0000A" />
          <Field label="MCA / Ministry Registration ID" value={fpoId} onChange={setFpoId} placeholder="FPO-CIN-2019-MH" optional />
        </div>

        {/* Document upload */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Registration Document</p>
          <button
            onClick={() => setDocUploaded((v) => !v)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border-2 transition-all ${
              docUploaded ? 'bg-green-50 border-green-600' : 'bg-white border-dashed border-stone-300'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
              docUploaded ? 'bg-green-100' : 'bg-stone-100'
            }`}>
              {docUploaded ? '✅' : '📄'}
            </div>
            <div className="flex-1 text-left">
              <p className={`font-black text-sm ${docUploaded ? 'text-green-800' : 'text-stone-700'}`}>
                {docUploaded ? 'Document Uploaded' : 'Upload Registration Certificate'}
              </p>
              <p className={`text-xs mt-0.5 ${docUploaded ? 'text-green-600' : 'text-stone-400'}`}>
                {docUploaded ? 'Tap to replace · PDF / JPG / PNG' : 'PDF, JPG or PNG · Max 5 MB'}
              </p>
            </div>
            {!docUploaded && (
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            )}
          </button>
        </div>

        {/* Verification status indicator */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Verification Status</p>
          </div>
          {[
            { label: 'PAN / FPO ID', done: panId.length > 4, icon: panId.length > 4 ? '✅' : '⏳' },
            { label: 'Registration Document', done: docUploaded, icon: docUploaded ? '✅' : '⏳' },
            { label: 'KisanSetu Review', done: false, icon: '📋' },
          ].map((item, i, arr) => (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-3.5 ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}>
              <span className="text-lg w-7 text-center">{item.icon}</span>
              <p className="flex-1 text-sm font-bold text-stone-700">{item.label}</p>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                item.done ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-400'
              }`}>
                {item.done ? 'Done' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* Security message */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3.5">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="text-sm font-black text-green-800">Secure &amp; Trusted</p>
            <p className="text-xs text-green-700 font-semibold mt-0.5 leading-relaxed">
              Documents are encrypted with bank-grade security. KisanSetu is RBI-compliant and NABARD-registered.
            </p>
          </div>
        </div>

        <GreenCTA label="Continue →" onClick={() => navigate('fpoOnbFarmers')} />
      </div>
    </div>
  )
}

// ── Step 4 — Farmer Members ──────────────────────────────────────────────────

interface FpoFarmer {
  id: number
  name: string
  village: string
  crops: string
  qty: string
}

const CROP_CHIPS = ['🌾 Wheat', '🌱 Soybean', '🍅 Tomato', '🧅 Onion', '🌙 Cotton', '🌽 Maize', '🫘 Tur Dal', '🌿 Vegetables']

export function FpoOnbFarmersScreen({ navigate }: NavProps) {
  const [memberCount, setMemberCount] = useState('12')
  const [farmers, setFarmers] = useState<FpoFarmer[]>([
    { id: 1, name: '', village: '', crops: '', qty: '' },
  ])
  const [selectedChips, setSelectedChips] = useState<Record<number, string[]>>({})

  const addFarmer = () =>
    setFarmers((prev) => [...prev, { id: Date.now(), name: '', village: '', crops: '', qty: '' }])

  const updateFarmer = (id: number, key: keyof FpoFarmer, val: string) =>
    setFarmers((prev) => prev.map((f) => f.id === id ? { ...f, [key]: val } : f))

  const toggleChip = (farmerId: number, crop: string) => {
    setSelectedChips((prev) => {
      const current = prev[farmerId] ?? []
      const next = current.includes(crop) ? current.filter((c) => c !== crop) : [...current, crop]
      return { ...prev, [farmerId]: next }
    })
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={4} onBack={() => navigate('fpoOnbVerify')} />
      <Hero emoji="👨‍🌾" bg="#FEF3C7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Add your Farmers
          </h1>
          <p className="text-sm text-stone-500 mt-1">Register your member farmers to manage them here</p>
        </div>

        {/* Total member count */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Total Farmer Members</p>
          <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors flex items-center gap-2">
            <input
              type="number"
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
              className="flex-1 px-4 py-4 text-stone-900 font-black text-2xl outline-none bg-transparent"
            />
            <span className="pr-4 text-stone-400 font-bold text-sm">farmers</span>
          </div>
        </div>

        {/* Farmer cards */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Add Farmer Details</p>
            <span className="text-xs text-stone-400 font-semibold">{farmers.length} added</span>
          </div>

          <div className="space-y-4">
            {farmers.map((f, idx) => (
              <div key={f.id} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-stone-500 uppercase tracking-widest">Farmer {idx + 1}</p>
                  {farmers.length > 1 && (
                    <button
                      onClick={() => setFarmers((prev) => prev.filter((x) => x.id !== f.id))}
                      className="text-red-400 text-sm font-bold active:opacity-60"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Name</p>
                    <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => updateFarmer(f.id, 'name', e.target.value)}
                        placeholder="Ramu Rao"
                        className="w-full px-3 py-3 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Village</p>
                    <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                      <input
                        type="text"
                        value={f.village}
                        onChange={(e) => updateFarmer(f.id, 'village', e.target.value)}
                        placeholder="Akola"
                        className="w-full px-3 py-3 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Crops Grown</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CROP_CHIPS.map((crop) => {
                      const active = (selectedChips[f.id] ?? []).includes(crop)
                      return (
                        <button
                          key={crop}
                          onClick={() => toggleChip(f.id, crop)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                            active ? 'bg-green-700 text-white border-green-700' : 'bg-stone-50 border-stone-200 text-stone-600'
                          }`}
                        >
                          {crop}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Available Quantity (kg)</p>
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                    <input
                      type="number"
                      value={f.qty}
                      onChange={(e) => updateFarmer(f.id, 'qty', e.target.value)}
                      placeholder="500"
                      className="w-full px-3 py-3 text-stone-900 font-black text-lg outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Farmer button */}
        <button
          onClick={addFarmer}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-green-400 rounded-2xl text-green-700 font-bold text-sm bg-green-50 active:opacity-70"
        >
          <span className="text-lg">＋</span> Add Another Farmer
        </button>

        <GreenCTA label="Continue →" onClick={() => navigate('fpoOnbStock')} />
      </div>
    </div>
  )
}

// ── Step 5 — Stock Details ────────────────────────────────────────────────────

interface StockItem {
  id: number
  crop: string
  qty: string
  grade: string
  harvestDate: string
  price: string
  location: string
}

const QUALITY_GRADES = ['Grade A', 'Grade B', 'Grade C', 'Premium', 'Export Quality']

export function FpoOnbStockScreen({ navigate }: NavProps) {
  const [stocks, setStocks] = useState<StockItem[]>([
    { id: 1, crop: '', qty: '', grade: 'Grade A', harvestDate: '', price: '', location: '' },
  ])

  const updateStock = (id: number, key: keyof StockItem, val: string) =>
    setStocks((prev) => prev.map((s) => s.id === id ? { ...s, [key]: val } : s))

  const addStock = () =>
    setStocks((prev) => [...prev, { id: Date.now(), crop: '', qty: '', grade: 'Grade A', harvestDate: '', price: '', location: '' }])

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={5} onBack={() => navigate('fpoOnbFarmers')} />
      <Hero emoji="📦" bg="#EFF6FF" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Manage Available Stock
          </h1>
          <p className="text-sm text-stone-500 mt-1">Add the produce your FPO has ready to sell</p>
        </div>

        {/* Stock cards */}
        <div className="space-y-4">
          {stocks.map((s, idx) => (
            <div key={s.id} className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-stone-500 uppercase tracking-widest">Stock Item {idx + 1}</p>
                {stocks.length > 1 && (
                  <button
                    onClick={() => setStocks((prev) => prev.filter((x) => x.id !== s.id))}
                    className="text-red-400 text-sm font-bold active:opacity-60"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Crop</p>
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                    <input
                      type="text"
                      value={s.crop}
                      onChange={(e) => updateStock(s.id, 'crop', e.target.value)}
                      placeholder="Tomato"
                      className="w-full px-3 py-3 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Quantity (kg)</p>
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                    <input
                      type="number"
                      value={s.qty}
                      onChange={(e) => updateStock(s.id, 'qty', e.target.value)}
                      placeholder="2000"
                      className="w-full px-3 py-3 text-stone-900 font-black text-base outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Quality / Grade</p>
                <div className="flex gap-2 flex-wrap">
                  {QUALITY_GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => updateStock(s.id, 'grade', g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        s.grade === g ? 'bg-green-700 text-white border-green-700' : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Harvest Date</p>
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                    <input
                      type="text"
                      value={s.harvestDate}
                      onChange={(e) => updateStock(s.id, 'harvestDate', e.target.value)}
                      placeholder="Sep 05, 2026"
                      className="w-full px-3 py-3 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Expected Price (₹/kg)</p>
                  <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                    <input
                      type="number"
                      value={s.price}
                      onChange={(e) => updateStock(s.id, 'price', e.target.value)}
                      placeholder="18"
                      className="w-full px-3 py-3 text-stone-900 font-black text-base outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">Location</p>
                <div className="bg-stone-50 border-2 border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500">
                  <input
                    type="text"
                    value={s.location}
                    onChange={(e) => updateStock(s.id, 'location', e.target.value)}
                    placeholder="Dhamangaon, Akola, Maharashtra"
                    className="w-full px-3 py-3 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Stock button */}
        <button
          onClick={addStock}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-green-400 rounded-2xl text-green-700 font-bold text-sm bg-green-50 active:opacity-70"
        >
          <span className="text-lg">＋</span> Add Stock
        </button>

        <GreenCTA label="Continue →" onClick={() => navigate('fpoOnbBank')} />
      </div>
    </div>
  )
}

// ── Step 6 — Bank / Payment Setup ────────────────────────────────────────────

const payPreferences = ['UPI', 'Bank Transfer', 'Both']

export function FpoOnbBankScreen({ navigate }: NavProps) {
  const [account, setAccount] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [upi, setUpi] = useState('')
  const [payPref, setPayPref] = useState('Both')

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>
      <StepHeader step={6} onBack={() => navigate('fpoOnbStock')} />
      <Hero emoji="🏦" bg="#DCFCE7" />

      <div className="px-5 pb-8 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Set up Payments
          </h1>
          <p className="text-sm text-stone-500 mt-1">Receive bulk payments directly to your FPO account</p>
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
            label="UPI ID"
            value={upi}
            onChange={setUpi}
            placeholder="vidarbhafpo@upi"
            optional
          />
        </div>

        {/* Payment preference */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">Payment Preference</p>
          <div className="grid grid-cols-3 gap-2">
            {payPreferences.map((p) => (
              <button
                key={p}
                onClick={() => setPayPref(p)}
                className={`py-3.5 rounded-2xl text-sm font-bold border-2 transition-all ${
                  payPref === p ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Secure message */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-4">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="text-sm font-black text-green-800">Secure Transactions</p>
            <p className="text-xs text-green-700 font-semibold mt-0.5 leading-relaxed">
              Bank-grade encryption. Payments verified by NPCI. Bulk settlements handled securely via KisanSetu Escrow.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('fpoHome')}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Setup Complete ✓
        </button>
      </div>
    </div>
  )
}
