import { useState } from 'react'
import type { NavProps } from '../types'
import { markets, recommendations } from '../data'

const trendLabel = (t: string) => {
  if (t === 'declining') return { text: '↓ Declining', color: 'text-red-600' }
  if (t === 'rising') return { text: '↑ Rising', color: 'text-green-600' }
  return { text: '→ Stable', color: 'text-stone-500' }
}

const demandColor = (d: string) => {
  if (d === 'High') return 'bg-green-100 text-green-700'
  if (d === 'Medium') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

type Sort = 'price' | 'distance' | 'net'

const avatarColors = ['bg-green-700', 'bg-blue-600', 'bg-purple-600']
const avatarInitials = ['AB', 'VJ', 'FL']

export default function MarketScreen({ navigate }: NavProps) {
  const [sort, setSort] = useState<Sort>('net')
  const [selected, setSelected] = useState<number[]>([])

  const sorted = [...markets].sort((a, b) => {
    if (sort === 'price') return b.price - a.price
    if (sort === 'distance') return a.distance - b.distance
    const netA = recommendations.find((r) => r.marketId === a.id)?.netEarnings ?? 0
    const netB = recommendations.find((r) => r.marketId === b.id)?.netEarnings ?? 0
    return netB - netA
  })

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Mandi Prices
            </h1>
            <p className="text-sm text-stone-500">Tomatoes · Guntur area</p>
          </div>
          <span className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full font-semibold border border-stone-200">
            Demo Data
          </span>
        </div>

        <div className="flex gap-2">
          {([['net', 'By Net Earnings'], ['price', 'By Price'], ['distance', 'By Distance']] as [Sort, string][]).map(
            ([s, label]) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  sort === s ? 'bg-green-700 text-white' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-xs text-stone-500 font-semibold bg-green-50 border border-green-200 rounded-xl px-3 py-2">
          💡 Highest price is not always the best — check net earnings after transport cost.
        </p>

        {sorted.map((m, idx) => {
          const trend = trendLabel(m.trend)
          const isSelected = selected.includes(m.id)
          const rec = recommendations.find((r) => r.marketId === m.id)
          const netEarnings = rec?.netEarnings ?? 0
          const originalIdx = markets.findIndex((x) => x.id === m.id)
          return (
            <div
              key={m.id}
              className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                isSelected ? 'border-green-500 ring-1 ring-green-400' : idx === 0 ? 'border-green-300' : 'border-stone-200'
              }`}
            >
              {idx === 0 && (
                <div className="bg-green-700 px-4 py-1.5 flex items-center gap-2">
                  <span className="text-white text-xs">⭐</span>
                  <p className="text-white text-xs font-bold">Best Net Earnings</p>
                </div>
              )}

              <div className="px-4 pt-3 pb-2">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className={`w-11 h-11 rounded-full ${avatarColors[originalIdx] ?? 'bg-stone-400'} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                    {avatarInitials[originalIdx] ?? '??'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="text-sm font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {m.name}
                      </h2>
                      {m.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓</span>
                      )}
                    </div>
                    {m.rating && (
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${s <= Math.round(m.rating ?? 0) ? 'text-amber-500' : 'text-stone-200'}`} fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-stone-500 ml-0.5">({m.rating})</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-stone-500">📍 {m.distance} km</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${demandColor(m.demand)}`}>
                        {m.demand}
                      </span>
                      <span className={`text-xs font-semibold ${trend.color}`}>{trend.text}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      ₹{m.price}
                    </p>
                    <p className="text-xs text-stone-400">/kg</p>
                  </div>
                </div>

                {/* Net earnings highlight */}
                {netEarnings > 0 && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2 flex justify-between items-center">
                    <p className="text-xs font-semibold text-green-700">Est. Net Earnings</p>
                    <p className="font-bold text-green-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      ₹{netEarnings.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}

                {/* Mandi min/modal/max */}
                {m.type === 'mandi' && (
                  <div className="mt-3 grid grid-cols-3 gap-2 bg-stone-50 rounded-xl p-2.5">
                    <div className="text-center">
                      <p className="text-xs text-stone-400 font-semibold">MIN</p>
                      <p className="text-sm font-bold text-stone-700">₹{m.minPrice}</p>
                    </div>
                    <div className="text-center border-x border-stone-200">
                      <p className="text-xs text-stone-400 font-semibold">MODAL</p>
                      <p className="text-sm font-bold text-amber-700">₹{m.modalPrice}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-stone-400 font-semibold">MAX</p>
                      <p className="text-sm font-bold text-stone-700">₹{m.maxPrice}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pickup timing */}
              <div className="px-4 pb-3">
                <p className="text-xs text-stone-400 font-semibold">Pickup Timing: <span className="text-stone-700 font-bold">{m.pickup}</span></p>
              </div>

              <div className="border-t border-stone-100 px-4 py-2.5 flex gap-2">
                <button
                  onClick={() => toggleSelect(m.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isSelected ? 'bg-green-700 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {isSelected ? '✓ Selected' : 'Select to Compare'}
                </button>
                <button
                  onClick={() => navigate('bestOptions')}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-stone-900 text-white"
                >
                  See Net Earnings
                </button>
              </div>
            </div>
          )
        })}

        <div className="pb-4" />
      </div>

      {selected.length >= 2 && (
        <div className="px-4 pb-6 pt-2 bg-white border-t border-stone-100">
          <button
            onClick={() => navigate('offerCompare')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-green-200"
          >
            Compare {selected.length} Options →
          </button>
        </div>
      )}
    </div>
  )
}
