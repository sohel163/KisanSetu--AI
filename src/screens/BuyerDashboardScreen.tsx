import { useState } from 'react'
import type { NavProps } from '../types'
import { buyerListings } from '../data'

const riskDot: Record<string, string> = { high: '🔴', medium: '🟡', low: '🟢' }

type Filter = 'all' | 'Tomatoes' | 'Chillies' | 'Onion'

export default function BuyerDashboardScreen({ navigate }: NavProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [activeBid, setActiveBid] = useState<string | null>(null)
  const [offerPrices, setOfferPrices] = useState<Record<string, string>>({})

  const filtered = filter === 'all' ? buyerListings : buyerListings.filter((l) => l.crop === filter)

  const submitBid = (id: string) => {
    setActiveBid(id)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🏪</div>
          <div>
            <h1 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Buyer Dashboard
            </h1>
            <p className="text-xs text-stone-500 flex items-center gap-1">
              ABC Foods Pvt Ltd
              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓ Verified</span>
            </p>
          </div>
          <button
            onClick={() => navigate('home')}
            className="ml-auto text-xs text-stone-500 font-semibold bg-stone-100 px-3 py-1.5 rounded-full"
          >
            ← Farmer View
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { label: 'Active Bids', val: '3', color: 'text-amber-600' },
            { label: 'Lots Bought', val: '12', color: 'text-green-600' },
            { label: 'Due Payments', val: '₹48K', color: 'text-red-600' },
          ].map((s) => (
            <div key={s.label} className="bg-stone-50 rounded-xl px-3 py-2.5 text-center border border-stone-200">
              <p className={`text-lg font-bold ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              <p className="text-xs text-stone-400 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Entry to new buyer flow */}
        <button
          onClick={() => navigate('buyerFindFarmers')}
          className="w-full flex items-center gap-4 rounded-2xl px-4 py-4 text-left active:scale-[0.98] transition-transform shadow-sm"
          style={{ background: 'linear-gradient(135deg, #14532d 0%, #15803d 100%)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">🔎</div>
          <div className="flex-1">
            <p className="text-white font-black text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Find Farmers / FPOs</p>
            <p className="text-green-200 text-xs mt-0.5">Browse · Recommend · Negotiate · Pay</p>
          </div>
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Shortcut row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { emoji: '📊', label: 'Buy History', screen: 'buyerPurchaseHistory' as const },
            { emoji: '🤝', label: 'Active Deals', screen: 'buyerNegotiation' as const },
            { emoji: '💳', label: 'Payments', screen: 'buyerPayment' as const },
          ].map((tile) => (
            <button
              key={tile.label}
              onClick={() => navigate(tile.screen)}
              className="bg-white border border-stone-200 rounded-2xl py-3 px-2 text-center active:opacity-70 shadow-sm"
            >
              <p className="text-2xl">{tile.emoji}</p>
              <p className="text-xs font-bold text-stone-600 mt-1.5 leading-tight">{tile.label}</p>
            </button>
          ))}
        </div>

        {activeBid && (
          <div className="bg-green-50 border border-green-300 rounded-2xl px-4 py-3 flex items-start gap-3">
            <span className="text-xl mt-0.5">✅</span>
            <div className="flex-1">
              <p className="font-bold text-green-800 text-sm">Bid Submitted!</p>
              <p className="text-green-700 text-xs mt-0.5">
                Your offer of ₹{offerPrices[activeBid]}/kg sent to the farmer. They will respond within 24 hours.
              </p>
            </div>
            <button onClick={() => setActiveBid(null)} className="text-green-600 text-lg font-bold">×</button>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Available Produce</p>
            <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-semibold border border-stone-200">Demo Data</span>
          </div>
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {(['all', 'Tomatoes', 'Chillies', 'Onion'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === f ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {f === 'all' ? 'All Crops' : f}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((lot) => (
              <div key={lot.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="flex gap-3 p-3">
                  <img
                    src={lot.photo}
                    alt={lot.crop}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-stone-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-stone-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{lot.crop} · {lot.variety}</p>
                        <p className="text-xs text-stone-500">{lot.farmerName} {lot.farmerVerified ? '✓' : ''} · {lot.location}</p>
                      </div>
                      <span className="text-xs ml-1">{riskDot[lot.spoilageRisk]}</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">{lot.quantity} kg</span>
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">{lot.quality}</span>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Ask: ₹{lot.askedPrice}/kg</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">Harvest: {lot.harvestDate} · {lot.bidsCount} bid{lot.bidsCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="border-t border-stone-100 px-3 py-2.5 flex gap-2 items-center">
                  <input
                    type="number"
                    value={offerPrices[lot.id] ?? ''}
                    onChange={(e) => setOfferPrices((p) => ({ ...p, [lot.id]: e.target.value }))}
                    placeholder="Your price (₹/kg)"
                    className="flex-1 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => submitBid(lot.id)}
                    className="px-4 py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm whitespace-nowrap"
                  >
                    Bid Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">My Active Bids</p>
          <div className="space-y-2">
            {[
              { farmer: 'Ramu Rao', crop: 'Tomatoes', qty: 1000, myOffer: 24, status: 'Accepted', net: 22800 },
              { farmer: 'Venkat Rao', crop: 'Tomatoes', qty: 800, myOffer: 23, status: 'Pending', net: 18240 },
            ].map((bid, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{bid.farmer} · {bid.crop} {bid.qty} kg</p>
                  <p className="text-xs text-stone-500">My bid: ₹{bid.myOffer}/kg · Est. cost: ₹{bid.net.toLocaleString('en-IN')}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  bid.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {bid.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Payment Due</p>
          <div className="bg-white border border-red-200 rounded-2xl px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-stone-800">Ramu Rao · Tomatoes 1,000 kg</p>
                <p className="text-xs text-stone-500">Due by Sep 8, 2026 · UPI / Bank Transfer</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-stone-900">₹22,800</p>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Pending</span>
              </div>
            </div>
            <button className="mt-2.5 w-full py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm">
              Pay Now →
            </button>
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}
