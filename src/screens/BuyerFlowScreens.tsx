import { useState } from 'react'
import type { NavProps } from '../types'

// ── Shared sub-components ────────────────────────────────────────────────────

function ScreenHeader({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack: () => void }) {
  return (
    <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center flex-shrink-0 active:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h1>
          {subtitle && <p className="text-xs text-stone-400 font-semibold mt-0.5">{subtitle}</p>}
        </div>
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

function SectionLabel({ text }: { text: string }) {
  return <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2.5">{text}</p>
}

function InfoCard({ rows }: { rows: { icon: string; label: string; value: string }[] }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="divide-y divide-stone-100">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3 px-4 py-3.5">
            <span className="text-lg flex-shrink-0 w-7 text-center mt-0.5">{r.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-stone-400 font-semibold">{r.label}</p>
              <p className="text-sm font-black text-stone-900 mt-0.5">{r.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Mock supplier used throughout the flow
const mockSupplier = {
  name: 'Rajesh Kumar',
  type: 'Farmer',
  village: 'Dhamangaon',
  district: 'Akola',
  state: 'Maharashtra',
  distance: '22 km',
  crops: ['Tomato', 'Soybean', 'Onion'],
  crop: 'Tomato',
  variety: 'Hybrid Red',
  quantity: 500,
  quality: 'Grade A',
  askPrice: 18,
  harvestDate: 'Sep 05, 2026',
  rating: 4.8,
  deals: 14,
  verified: true,
  fpo: 'Vidarbha Farmers Collective',
}

// ── 1. Find Farmers / FPOs ───────────────────────────────────────────────────

const mockSuppliers = [
  { id: '1', name: 'Rajesh Kumar', type: 'Farmer', crops: ['Tomato', 'Onion'], location: 'Akola, MH', dist: '22 km', rating: 4.8, verified: true, bg: '#DCFCE7', emoji: '🧑‍🌾' },
  { id: '2', name: 'Vidarbha Collective', type: 'FPO', crops: ['Soybean', 'Cotton', 'Wheat'], location: 'Amravati, MH', dist: '38 km', rating: 4.6, verified: true, bg: '#FEF3C7', emoji: '🤝' },
  { id: '3', name: 'Suresh Patil', type: 'Farmer', crops: ['Chilli', 'Tomato'], location: 'Yavatmal, MH', dist: '61 km', rating: 4.3, verified: true, bg: '#EFF6FF', emoji: '🧑‍🌾' },
  { id: '4', name: 'Konkan Agro FPO', type: 'FPO', crops: ['Mango', 'Cashew', 'Turmeric'], location: 'Ratnagiri, MH', dist: '78 km', rating: 4.5, verified: false, bg: '#F3E8FF', emoji: '🤝' },
]

const cropFilters = ['All', 'Vegetables', 'Grains', 'Pulses', 'Fruits']
const distFilters = ['Any', '<25 km', '<50 km']

export function BuyerFindFarmersScreen({ navigate }: NavProps) {
  const [search, setSearch] = useState('')
  const [cropF, setCropF] = useState('All')
  const [distF, setDistF] = useState('Any')

  const filtered = mockSuppliers.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.crops.some((c) => c.toLowerCase().includes(search.toLowerCase()))
    const matchDist = distF === 'Any' || (distF === '<25 km' && parseInt(s.dist) < 25) || (distF === '<50 km' && parseInt(s.dist) < 50)
    return matchSearch && matchDist
  })

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Find Farmers / FPOs" subtitle="Browse verified suppliers near you" onBack={() => navigate('buyerDashboard')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Search */}
        <div className="bg-white border-2 border-stone-200 rounded-2xl flex items-center gap-3 px-4 focus-within:border-green-500 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop or farmer name…"
            className="flex-1 py-4 text-sm font-semibold text-stone-900 outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal"
          />
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cropFilters.map((f) => (
              <button
                key={f}
                onClick={() => setCropF(f)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  cropF === f ? 'bg-green-700 text-white' : 'bg-white border border-stone-200 text-stone-600'
                }`}
              >{f}</button>
            ))}
          </div>
          <div className="flex gap-2">
            {distFilters.map((f) => (
              <button
                key={f}
                onClick={() => setDistF(f)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  distF === f ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600'
                }`}
              >{f}</button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <SectionLabel text={`${filtered.length} Suppliers Found`} />
          <div className="space-y-3">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate('buyerCropDetails')}
                className="w-full bg-white border border-stone-200 rounded-2xl p-4 shadow-sm text-left active:scale-[0.98] transition-transform"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: s.bg }}>
                    {s.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-stone-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.name}</p>
                      {s.verified && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓ Verified</span>}
                    </div>
                    <p className="text-xs text-stone-400 font-semibold mt-0.5">{s.type} · {s.location} · {s.dist}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {s.crops.map((c) => (
                        <span key={c} className="px-2 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-full">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-amber-600 font-black text-sm">⭐ {s.rating}</p>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-300 mt-1 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 2. Crop & Supply Details ─────────────────────────────────────────────────

export function BuyerCropDetailsScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Crop & Supply Details" subtitle={`${mockSupplier.name} · ${mockSupplier.district}`} onBack={() => navigate('buyerFindFarmers')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Crop hero */}
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-4 p-4" style={{ background: 'linear-gradient(135deg, #DCFCE7, #f0fdf4)' }}>
            <div className="w-20 h-20 rounded-2xl bg-white/60 flex items-center justify-center shadow-sm flex-shrink-0">
              <span style={{ fontSize: 52, lineHeight: 1 }}>🍅</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {mockSupplier.crop}
              </h2>
              <p className="text-sm text-stone-600 font-semibold">{mockSupplier.variety}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-2.5 py-1 bg-white rounded-full text-xs font-bold text-stone-700 shadow-sm">{mockSupplier.quality}</span>
                <span className="px-2.5 py-1 bg-amber-100 rounded-full text-xs font-bold text-amber-700">₹{mockSupplier.askPrice}/kg ask</span>
              </div>
            </div>
          </div>
        </div>

        {/* Crop details */}
        <InfoCard rows={[
          { icon: '⚖️', label: 'Available Quantity', value: `${mockSupplier.quantity} kg` },
          { icon: '🏅', label: 'Quality Grade', value: `${mockSupplier.quality} · Well-sorted, minimal blemishes` },
          { icon: '📍', label: 'Farm Location', value: `${mockSupplier.village}, ${mockSupplier.district}, ${mockSupplier.state}` },
          { icon: '📏', label: 'Distance from You', value: mockSupplier.distance },
          { icon: '💰', label: 'Expected Price', value: `₹${mockSupplier.askPrice}/kg (negotiable)` },
          { icon: '🗓️', label: 'Harvested On', value: mockSupplier.harvestDate },
        ]} />

        {/* Farmer snippet */}
        <div>
          <SectionLabel text="Supplier" />
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">🧑‍🌾</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-black text-stone-900 text-sm">{mockSupplier.name}</p>
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓ Verified</span>
              </div>
              <p className="text-xs text-stone-400 font-semibold mt-0.5">{mockSupplier.fpo} · ⭐ {mockSupplier.rating} · {mockSupplier.deals} deals</p>
            </div>
          </div>
        </div>

        <GreenCTA label="Get Best Match →" onClick={() => navigate('buyerRecommendation')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 3. KisanSetu Recommendation ──────────────────────────────────────────────

const mockMatches = [
  {
    rank: 1, name: 'Rajesh Kumar', type: 'Farmer', crop: 'Tomato 500 kg', price: '₹16/kg', dist: '22 km',
    scores: { price: 4.7, distance: 4.8, quality: 5.0, trust: 4.8 }, overall: 4.8, bg: '#DCFCE7', emoji: '🧑‍🌾', label: 'Best Match',
  },
  {
    rank: 2, name: 'Vidarbha Collective', type: 'FPO', crop: 'Tomato 800 kg', price: '₹17/kg', dist: '38 km',
    scores: { price: 4.2, distance: 4.0, quality: 4.8, trust: 4.6 }, overall: 4.4, bg: '#FEF3C7', emoji: '🤝', label: '',
  },
  {
    rank: 3, name: 'Suresh Patil', type: 'Farmer', crop: 'Tomato 300 kg', price: '₹17.5/kg', dist: '61 km',
    scores: { price: 3.8, distance: 3.5, quality: 4.5, trust: 4.3 }, overall: 4.0, bg: '#EFF6FF', emoji: '🧑‍🌾', label: '',
  },
]

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs text-stone-500 font-semibold w-16 flex-shrink-0">{label}</p>
      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <p className="text-xs font-black text-stone-700 w-7 text-right">{score}</p>
    </div>
  )
}

export function BuyerRecommendationScreen({ navigate }: NavProps) {
  const [selected, setSelected] = useState(1)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="KisanSetu Recommendation" subtitle="AI-ranked by price, distance, quality & trust" onBack={() => navigate('buyerCropDetails')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* AI badge */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 24 }}>🧠</span>
          </div>
          <div>
            <p className="font-black text-stone-900 text-sm">Smart Matching Active</p>
            <p className="text-xs text-stone-400 mt-0.5">Analysed 4 suppliers · Tomato · 500 kg required</p>
          </div>
        </div>

        {/* Ranked cards */}
        <div>
          <SectionLabel text="Top Matches" />
          <div className="space-y-3">
            {mockMatches.map((m) => (
              <button
                key={m.rank}
                onClick={() => setSelected(m.rank)}
                className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all active:scale-[0.98] ${
                  selected === m.rank ? 'border-green-600 shadow-md shadow-green-100' : 'border-stone-200 bg-white'
                }`}
              >
                {m.label === 'Best Match' && (
                  <div className="px-4 py-1.5 bg-green-700 text-white text-xs font-black flex items-center gap-2">
                    <span>🏆</span> Best Match — Recommended by KisanSetu
                  </div>
                )}
                <div className={`p-4 ${selected === m.rank && m.label !== 'Best Match' ? 'bg-green-50' : 'bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: m.bg }}>
                      {m.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-stone-900 text-sm">{m.name}</p>
                        <span className="text-xs text-stone-400">{m.type}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{m.crop} · {m.price} ask · {m.dist}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-black text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>⭐ {m.overall}</p>
                      <div className={`w-5 h-5 rounded-full border-2 ml-auto mt-1 flex items-center justify-center ${
                        selected === m.rank ? 'bg-green-600 border-green-600' : 'border-stone-300'
                      }`}>
                        {selected === m.rank && (
                          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {selected === m.rank && (
                    <div className="mt-3 space-y-1.5">
                      <ScoreBar label="Price" score={m.scores.price} />
                      <ScoreBar label="Distance" score={m.scores.distance} />
                      <ScoreBar label="Quality" score={m.scores.quality} />
                      <ScoreBar label="Trust" score={m.scores.trust} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <GreenCTA label="View Supplier Profile →" onClick={() => navigate('buyerFarmerProfile')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 4. Farmer / FPO Profile (Buyer view) ─────────────────────────────────────

const prevDeals = [
  { crop: 'Tomato', qty: 400, price: '₹16.5/kg', date: 'Jul 2026', status: 'Completed' },
  { crop: 'Onion', qty: 250, price: '₹14/kg', date: 'Apr 2026', status: 'Completed' },
  { crop: 'Soybean', qty: 600, price: '₹38/kg', date: 'Jan 2026', status: 'Completed' },
]

export function BuyerFarmerProfileScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Supplier Profile" onBack={() => navigate('buyerRecommendation')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Hero */}
        <div
          className="rounded-2xl p-5 flex flex-col items-center text-center shadow-sm"
          style={{ background: 'linear-gradient(160deg, #14532d 0%, #15803d 100%)' }}
        >
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl mb-3 border-4 border-white/30 shadow-lg">
            🧑‍🌾
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{mockSupplier.name}</h2>
            <span className="text-xs bg-green-400/40 text-white px-2.5 py-1 rounded-full font-bold">✅ Verified</span>
          </div>
          <p className="text-green-200 text-sm font-semibold mt-1">{mockSupplier.fpo} · {mockSupplier.district}, {mockSupplier.state}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="text-center">
              <p className="text-xl font-black text-white">⭐ {mockSupplier.rating}</p>
              <p className="text-green-300 text-xs mt-0.5">Rating</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-black text-white">{mockSupplier.deals}</p>
              <p className="text-green-300 text-xs mt-0.5">Deals Done</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-xl font-black text-white">{mockSupplier.distance}</p>
              <p className="text-green-300 text-xs mt-0.5">Distance</p>
            </div>
          </div>
        </div>

        <InfoCard rows={[
          { icon: '📍', label: 'Village / District', value: `${mockSupplier.village}, ${mockSupplier.district}` },
          { icon: '🌾', label: 'Primary Crops', value: mockSupplier.crops.join(' · ') },
          { icon: '🔒', label: 'Identity', value: 'Aadhaar Verified · Bank Linked' },
          { icon: '📅', label: 'On KisanSetu Since', value: 'January 2024' },
        ]} />

        {/* Trust indicators */}
        <div>
          <SectionLabel text="Trust & Reliability" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: '✅', val: '100%', sub: 'Fulfilment' },
              { emoji: '⚡', val: '< 2h', sub: 'Response' },
              { emoji: '💬', val: '4.9/5', sub: 'Reviews' },
            ].map((t) => (
              <div key={t.sub} className="bg-white border border-stone-200 rounded-2xl px-2 py-3 text-center shadow-sm">
                <p className="text-xl">{t.emoji}</p>
                <p className="text-sm font-black text-stone-900 mt-1">{t.val}</p>
                <p className="text-xs text-stone-400">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Previous deals */}
        <div>
          <SectionLabel text="Previous Deals" />
          <div className="space-y-2">
            {prevDeals.map((d, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                <div>
                  <p className="font-black text-stone-900 text-sm">{d.crop} · {d.qty} kg</p>
                  <p className="text-xs text-stone-400 mt-0.5">{d.price} · {d.date}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold">{d.status}</span>
              </div>
            ))}
          </div>
        </div>

        <GreenCTA label="Make an Offer →" onClick={() => navigate('buyerMakeOffer')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 5. Make Offer ────────────────────────────────────────────────────────────

export function BuyerMakeOfferScreen({ navigate }: NavProps) {
  const [qty, setQty] = useState('400')
  const [price, setPrice] = useState('')
  const [delivery, setDelivery] = useState<'pickup' | 'delivery'>('pickup')
  const [address, setAddress] = useState('')

  const askPrice = mockSupplier.askPrice
  const offeredPrice = parseFloat(price) || 0
  const total = qty ? parseInt(qty) * offeredPrice : 0

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Make an Offer" subtitle={`${mockSupplier.name} · ${mockSupplier.crop}`} onBack={() => navigate('buyerFarmerProfile')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Listing chip */}
        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <span style={{ fontSize: 32 }}>🍅</span>
          <div>
            <p className="font-black text-stone-900 text-sm">{mockSupplier.crop} · {mockSupplier.variety}</p>
            <p className="text-xs text-stone-400">{mockSupplier.quality} · {mockSupplier.quantity} kg available · Ask ₹{askPrice}/kg</p>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <SectionLabel text="Quantity Required (kg)" />
          <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors">
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="e.g. 400"
              className="w-full px-4 py-4 text-stone-900 font-black text-2xl outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-base"
            />
          </div>
          <p className="text-xs text-stone-400 mt-1.5 px-1">Max available: {mockSupplier.quantity} kg</p>
        </div>

        {/* Offered price */}
        <div>
          <SectionLabel text="Your Offered Price (₹/kg)" />
          <div className="bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-black text-xl">₹</div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={`${askPrice - 2}`}
              className="w-full pl-8 pr-4 py-4 text-stone-900 font-black text-2xl outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-base"
            />
          </div>
          <p className="text-xs text-stone-400 mt-1.5 px-1">Farmer asking ₹{askPrice}/kg · Suggest ₹{askPrice - 2}–₹{askPrice - 1}</p>
        </div>

        {/* Pickup / Delivery */}
        <div>
          <SectionLabel text="Pickup / Delivery Preference" />
          <div className="grid grid-cols-2 gap-2">
            {(['pickup', 'delivery'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setDelivery(opt)}
                className={`py-4 rounded-2xl font-black text-sm border-2 transition-all ${
                  delivery === opt ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'
                }`}
              >
                {opt === 'pickup' ? '🚜 Farm Pickup' : '🚚 Home Delivery'}
              </button>
            ))}
          </div>
          {delivery === 'delivery' && (
            <div className="mt-3 bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery address…"
                className="w-full px-4 py-4 text-stone-900 font-bold text-sm outline-none bg-transparent placeholder:text-stone-300"
              />
            </div>
          )}
        </div>

        {/* Estimate */}
        {total > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-stone-700 text-sm">Estimated Total</p>
              <p className="font-black text-stone-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{total.toLocaleString('en-IN')}
              </p>
            </div>
            <p className="text-xs text-stone-400 mt-1">{qty} kg × ₹{offeredPrice}/kg (subject to negotiation)</p>
          </div>
        )}

        <GreenCTA label="Send Offer →" onClick={() => navigate('buyerNegotiation')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 6. Offer / Negotiation ───────────────────────────────────────────────────

export function BuyerNegotiationScreen({ navigate }: NavProps) {
  const [stage, setStage] = useState<'waiting' | 'counter' | 'making-counter'>('waiting')
  const [counterInput, setCounterInput] = useState('')

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Negotiation" subtitle={`Offer sent to ${mockSupplier.name}`} onBack={() => navigate('buyerMakeOffer')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Deal summary chip */}
        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 shadow-sm">
          <p className="text-xs text-stone-400 font-semibold mb-1">Active Negotiation</p>
          <p className="font-black text-stone-900 text-sm">{mockSupplier.crop} · {mockSupplier.variety} · 400 kg</p>
          <p className="text-xs text-stone-400 mt-0.5">Farm Pickup · {mockSupplier.village}, {mockSupplier.district}</p>
        </div>

        {/* Offer thread */}
        <div>
          <SectionLabel text="Offer Thread" />

          {/* Buyer's offer */}
          <div className="flex justify-end mb-3">
            <div className="max-w-[80%] bg-green-700 text-white rounded-2xl rounded-br-md px-4 py-3">
              <p className="text-xs font-bold opacity-80 mb-1">Your Offer</p>
              <p className="font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>₹16/kg</p>
              <p className="text-xs opacity-80 mt-0.5">400 kg · Farm Pickup</p>
              <p className="text-xs opacity-60 mt-1">Today, 10:32 AM</p>
            </div>
          </div>

          {/* Farmer's counter */}
          {stage !== 'waiting' || true ? (
            <div className="flex justify-start mb-3">
              <div className="max-w-[80%] bg-white border border-amber-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">🧑‍🌾</span>
                  <p className="text-xs font-bold text-stone-500">{mockSupplier.name}</p>
                </div>
                <p className="font-black text-lg text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>₹17.50/kg</p>
                <p className="text-xs text-stone-500 mt-0.5">Counter offer · 400 kg · OK with pickup</p>
                <p className="text-xs text-stone-400 mt-0.5">"My harvest is fresh, Grade A. Please consider."</p>
                <p className="text-xs text-stone-300 mt-1">Today, 10:45 AM</p>
              </div>
            </div>
          ) : null}

          {stage === 'making-counter' && (
            <div className="flex justify-end mb-3">
              <div className="max-w-[80%] bg-white border-2 border-green-500 rounded-2xl rounded-br-md px-4 py-3">
                <p className="text-xs font-bold text-green-700 mb-2">Your Counter</p>
                <div className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden focus-within:border-green-500 flex items-center">
                  <span className="pl-3 text-stone-400 font-black">₹</span>
                  <input
                    type="number"
                    value={counterInput}
                    onChange={(e) => setCounterInput(e.target.value)}
                    placeholder="17.00"
                    className="flex-1 px-2 py-3 text-stone-900 font-black text-xl outline-none bg-transparent placeholder:text-stone-300"
                  />
                  <span className="pr-3 text-xs text-stone-400 font-semibold">/kg</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pb-2" />
      </div>

      {/* Action bar */}
      <div className="flex-shrink-0 px-4 py-4 space-y-2" style={{ background: '#F4EFE4' }}>
        {stage === 'making-counter' ? (
          <GreenCTA label="Send Counter Offer →" onClick={() => navigate('buyerConfirmDeal')} />
        ) : (
          <>
            <GreenCTA label="✓ Accept ₹17.50/kg — Confirm Deal" onClick={() => navigate('buyerConfirmDeal')} />
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStage('making-counter')}
                className="py-4 border-2 border-stone-300 rounded-2xl text-stone-700 font-bold text-sm active:opacity-70"
              >
                ↕ Counter Offer
              </button>
              <button
                onClick={() => navigate('buyerFindFarmers')}
                className="py-4 border-2 border-red-200 rounded-2xl text-red-500 font-bold text-sm active:opacity-70"
              >
                ✗ Decline
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── 7. Confirm Deal ──────────────────────────────────────────────────────────

export function BuyerConfirmDealScreen({ navigate }: NavProps) {
  const total = 400 * 17.5

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Confirm Deal" onBack={() => navigate('buyerNegotiation')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Agreed badge */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <span className="text-2xl">🤝</span>
          <div>
            <p className="font-black text-green-800 text-sm">Price Agreed!</p>
            <p className="text-xs text-green-600 mt-0.5">Both parties agreed at ₹17.50/kg</p>
          </div>
        </div>

        {/* Deal summary */}
        <div>
          <SectionLabel text="Deal Summary" />
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-stone-50 px-4 py-3 border-b border-stone-100 flex items-center gap-3">
              <span style={{ fontSize: 32 }}>🍅</span>
              <div>
                <p className="font-black text-stone-900 text-base">{mockSupplier.crop} · {mockSupplier.variety}</p>
                <p className="text-xs text-stone-400">{mockSupplier.quality}</p>
              </div>
            </div>
            <div className="divide-y divide-stone-100">
              {[
                { label: 'Farmer / FPO', value: `${mockSupplier.name}  ✅` },
                { label: 'Quantity', value: '400 kg' },
                { label: 'Agreed Price', value: '₹17.50/kg' },
                { label: 'Delivery', value: 'Farm Pickup' },
                { label: 'Location', value: `${mockSupplier.village}, ${mockSupplier.district}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center px-4 py-3.5">
                  <p className="text-sm text-stone-500 font-semibold">{r.label}</p>
                  <p className="text-sm font-black text-stone-900">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total */}
        <div
          className="rounded-2xl px-5 py-5 text-center shadow-sm"
          style={{ background: 'linear-gradient(135deg, #14532d, #15803d)' }}
        >
          <p className="text-green-200 text-xs font-black uppercase tracking-widest mb-2">Total Deal Value</p>
          <p className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ₹{total.toLocaleString('en-IN')}
          </p>
          <p className="text-green-300 text-xs mt-1.5">400 kg × ₹17.50 · payable after quality check</p>
        </div>

        <GreenCTA label="Confirm & Proceed to Logistics →" onClick={() => navigate('buyerLogistics')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 8. Logistics & Delivery Tracking ────────────────────────────────────────

const logSteps = [
  { icon: '✅', label: 'Deal Confirmed', sub: 'Sep 9, 10:55 AM', done: true },
  { icon: '✅', label: 'Pickup Scheduled', sub: 'Sep 11, 7:00 AM · Farm, Dhamangaon', done: true },
  { icon: '🔄', label: 'In Transit', sub: 'KisanSetu Logistics · MH-21 1234', active: true },
  { icon: '⏳', label: 'Delivery Complete', sub: 'Expected Sep 12 · Your warehouse', done: false },
]

export function BuyerLogisticsScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Logistics & Tracking" subtitle="Deal #KS-2026-0924" onBack={() => navigate('buyerConfirmDeal')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Live status chip */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-xl animate-pulse">🔄</span>
          <div>
            <p className="font-black text-blue-800 text-sm">Shipment In Transit</p>
            <p className="text-xs text-blue-600 mt-0.5">Last updated: Today, 1:22 PM</p>
          </div>
        </div>

        <InfoCard rows={[
          { icon: '🚜', label: 'Pickup Location', value: `${mockSupplier.village}, ${mockSupplier.district} · Sep 11, 7:00 AM` },
          { icon: '🏢', label: 'Delivery To', value: 'Sharma Agro Traders, Nagpur' },
          { icon: '🚛', label: 'Transporter', value: 'KisanSetu Logistics · MH-21 TN 1234' },
          { icon: '📦', label: 'Cargo', value: `${mockSupplier.crop} 400 kg · Grade A · Sealed` },
          { icon: '📅', label: 'Expected Delivery', value: 'Sep 12, 2026 (2–3 days)' },
        ]} />

        {/* Timeline */}
        <div>
          <SectionLabel text="Shipment Timeline" />
          <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4 shadow-sm space-y-0">
            {logSteps.map((step, i) => (
              <div key={step.label} className={`flex gap-4 ${i < logSteps.length - 1 ? 'pb-5' : ''}`}>
                {/* Spine */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base border-2 ${
                    step.done ? 'bg-green-100 border-green-400' :
                    'active' in step && step.active ? 'bg-blue-100 border-blue-400 animate-pulse' :
                    'bg-stone-100 border-stone-200'
                  }`}>
                    {step.icon}
                  </div>
                  {i < logSteps.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[20px] mt-1 ${step.done ? 'bg-green-300' : 'bg-stone-200'}`} />
                  )}
                </div>
                <div className="flex-1 pt-1.5">
                  <p className={`text-sm font-black ${step.done || ('active' in step && step.active) ? 'text-stone-900' : 'text-stone-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-stone-400 font-semibold mt-0.5">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <GreenCTA label="Proceed to Payment →" onClick={() => navigate('buyerPayment')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 9. Payment ───────────────────────────────────────────────────────────────

const payMethods = ['UPI', 'Bank Transfer', 'Cash on Delivery']

export function BuyerPaymentScreen({ navigate }: NavProps) {
  const [method, setMethod] = useState('UPI')

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Payment" subtitle="Deal #KS-2026-0924" onBack={() => navigate('buyerLogistics')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Amount banner */}
        <div
          className="rounded-2xl px-5 py-5 text-center shadow-sm"
          style={{ background: 'linear-gradient(135deg, #14532d, #15803d)' }}
        >
          <p className="text-green-200 text-xs font-black uppercase tracking-widest mb-1">Amount Due</p>
          <p className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>₹7,000</p>
          <p className="text-green-300 text-xs mt-1.5">400 kg × ₹17.50 · Deal #KS-2026-0924</p>
          <span className="inline-block mt-2 px-3 py-1 bg-amber-500/80 text-white text-xs font-bold rounded-full">Payment Pending</span>
        </div>

        <InfoCard rows={[
          { icon: '🧑‍🌾', label: 'Pay To', value: `${mockSupplier.name} · ${mockSupplier.fpo}` },
          { icon: '🏦', label: "Farmer's Bank", value: 'SBI A/C ····4512 · IFSC SBIN00123' },
          { icon: '🧾', label: 'Transaction ID', value: 'TXN-KS-20260909-8821' },
          { icon: '📅', label: 'Payment Due By', value: 'Sep 13, 2026' },
        ]} />

        {/* Payment method */}
        <div>
          <SectionLabel text="Payment Method" />
          <div className="space-y-2">
            {payMethods.map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl border-2 transition-all ${
                  method === m ? 'bg-green-50 border-green-600' : 'bg-white border-stone-200'
                }`}
              >
                <span className="text-xl">{m === 'UPI' ? '📲' : m === 'Bank Transfer' ? '🏦' : '💵'}</span>
                <span className={`font-bold text-sm flex-1 text-left ${method === m ? 'text-green-800' : 'text-stone-700'}`}>{m}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  method === m ? 'bg-green-600 border-green-600' : 'border-stone-300'
                }`}>
                  {method === m && (
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <GreenCTA label="Pay ₹7,000 Now →" onClick={() => navigate('buyerCompletedDeal')} />
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 10. Completed Deal ───────────────────────────────────────────────────────

export function BuyerCompletedDealScreen({ navigate }: NavProps) {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Deal Complete!" onBack={() => navigate('buyerPayment')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Success hero */}
        <div
          className="rounded-3xl px-5 py-8 flex flex-col items-center text-center shadow-sm"
          style={{ background: 'linear-gradient(160deg, #14532d 0%, #16a34a 100%)' }}
        >
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-5xl mb-4">
            🎉
          </div>
          <h2 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Deal Completed!
          </h2>
          <p className="text-green-200 text-sm">Payment confirmed · Produce delivered</p>
          <div className="mt-4 grid grid-cols-3 gap-3 w-full">
            {[
              { val: '400 kg', sub: 'Tomato' },
              { val: '₹7,000', sub: 'Paid' },
              { val: 'Grade A', sub: 'Quality' },
            ].map((s) => (
              <div key={s.sub} className="bg-white/15 rounded-2xl py-3">
                <p className="text-lg font-black text-white">{s.val}</p>
                <p className="text-green-300 text-xs mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rate & Review */}
        <div>
          <SectionLabel text={`Rate ${mockSupplier.name}`} />
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-4">
            {/* Stars */}
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className="text-3xl active:scale-110 transition-transform"
                >
                  {s <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <p className="text-center text-sm font-black text-stone-700">
              {rating >= 5 ? 'Excellent!' : rating >= 4 ? 'Very Good' : rating >= 3 ? 'Good' : rating >= 2 ? 'Fair' : 'Poor'}
            </p>

            {/* Review text */}
            <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write a review for this farmer… (optional)"
                rows={3}
                className="w-full px-4 py-3 text-stone-900 font-semibold text-sm outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal resize-none"
              />
            </div>
          </div>
        </div>

        <GreenCTA label="Submit Review & Finish →" onClick={() => navigate('buyerPurchaseHistory')} />
        <button
          onClick={() => navigate('buyerPurchaseHistory')}
          className="w-full py-3.5 text-stone-500 font-semibold text-sm"
        >
          Skip Review
        </button>
        <div className="pb-4" />
      </div>
    </div>
  )
}

// ── 11. Purchase History ─────────────────────────────────────────────────────

type HistoryTab = 'active' | 'completed' | 'cancelled'

const historyDeals = {
  active: [
    { crop: 'Tomato', farmer: 'Rajesh Kumar', qty: 400, total: 7000, date: 'Sep 9, 2026', status: 'In Transit' },
    { crop: 'Onion', farmer: 'Suresh Patil', qty: 300, total: 4200, date: 'Sep 7, 2026', status: 'Pending Payment' },
  ],
  completed: [
    { crop: 'Wheat', farmer: 'Vidarbha Collective', qty: 1000, total: 22000, date: 'Aug 15, 2026', status: 'Completed' },
    { crop: 'Tomato', farmer: 'Ramu Rao', qty: 500, total: 8250, date: 'Jul 28, 2026', status: 'Completed' },
    { crop: 'Chilli', farmer: 'Manoj Kumar', qty: 200, total: 6000, date: 'Jun 10, 2026', status: 'Completed' },
  ],
  cancelled: [
    { crop: 'Soybean', farmer: 'Patil FPO', qty: 800, total: 30400, date: 'May 22, 2026', status: 'Cancelled' },
  ],
}

const statusColors: Record<string, string> = {
  'In Transit': 'bg-blue-100 text-blue-700',
  'Pending Payment': 'bg-amber-100 text-amber-700',
  'Completed': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700',
}

export function BuyerPurchaseHistoryScreen({ navigate }: NavProps) {
  const [tab, setTab] = useState<HistoryTab>('active')

  const deals = historyDeals[tab]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <ScreenHeader title="Purchase History" subtitle="All your deals on KisanSetu" onBack={() => navigate('buyerDashboard')} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Summary row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Active', val: historyDeals.active.length, color: 'text-blue-700', bg: '#EFF6FF' },
            { label: 'Completed', val: historyDeals.completed.length, color: 'text-green-700', bg: '#DCFCE7' },
            { label: 'Cancelled', val: historyDeals.cancelled.length, color: 'text-red-600', bg: '#FEF2F2' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl px-2 py-3 text-center border border-stone-200" style={{ background: s.bg }}>
              <p className={`text-xl font-black ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              <p className="text-xs text-stone-500 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-stone-200 rounded-2xl p-1">
          {(['active', 'completed', 'cancelled'] as HistoryTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                tab === t ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Deal list */}
        <div className="space-y-3">
          {deals.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl py-10 text-center">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-stone-400 font-semibold text-sm">No {tab} deals</p>
            </div>
          ) : deals.map((d, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-2xl px-4 py-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-black text-stone-900 text-sm">{d.crop} · {d.qty} kg</p>
                  <p className="text-xs text-stone-400 font-semibold mt-0.5">{d.farmer}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{d.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{d.total.toLocaleString('en-IN')}
                  </p>
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mt-1 ${statusColors[d.status]}`}>
                    {d.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('buyerDashboard')}
          className="w-full py-4 border-2 border-stone-200 rounded-2xl text-stone-600 font-bold text-sm active:opacity-70"
        >
          ← Back to Dashboard
        </button>
        <div className="pb-4" />
      </div>
    </div>
  )
}
