import React from 'react'
import type { NavProps } from '../types'
import { recommendations } from '../data'

export default function OfferCompareScreen({ navigate }: NavProps) {
  const opts = recommendations.slice(0, 3)
  const maxGross = Math.max(...opts.map((o) => o.grossRevenue))

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('buyers')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Compare Net Profit
        </h1>
        <p className="text-sm text-stone-500">Gross − Fees = Net · 1,000 kg tomatoes</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {/* Visual bar comparison matching reference */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-5">
          <div className="flex items-center gap-4 mb-4">
            {[['bg-green-400', 'Gross'], ['bg-red-400', 'Fees'], ['bg-green-700', 'Net']].map(([cls, lbl]) => (
              <div key={lbl} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${cls}`} />
                <span className="text-xs text-stone-500 font-semibold">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {opts.map((opt, i) => {
              const deductions = Math.abs(opt.transport + opt.loading + opt.fees + opt.spoilage)
              const grossPct = (opt.grossRevenue / maxGross) * 100
              const feesPct = (deductions / maxGross) * 100
              const netPct = (opt.netEarnings / maxGross) * 100
              const isTop = i === 0
              return (
                <div key={opt.rank}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-bold">
                        Buyer {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-semibold text-stone-700 truncate max-w-[100px]">
                        {opt.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                      {opt.verified && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓</span>}
                    </div>
                    {isTop && <span className="text-xs bg-green-700 text-white px-2 py-0.5 rounded-full font-bold">Recommended</span>}
                  </div>

                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-stone-400 w-10 text-right font-semibold">Gross</span>
                    <div className="flex-1 h-4 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${grossPct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-stone-700 w-12 text-right">
                      ₹{(opt.grossRevenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-stone-400 w-10 text-right font-semibold">Fees</span>
                    <div className="flex-1 h-4 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${feesPct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-red-500 w-12 text-right">
                      −₹{(deductions / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-800 w-10 text-right font-bold">Net</span>
                    <div className="flex-1 h-5 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isTop ? 'bg-green-700' : 'bg-green-500'}`}
                        style={{ width: `${netPct}%` }}
                      />
                    </div>
                    <span className={`text-sm font-bold w-12 text-right ${isTop ? 'text-green-700' : 'text-green-600'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                      ₹{(opt.netEarnings / 1000).toFixed(1)}k
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recommended buyer card */}
        <div className="bg-white rounded-2xl border-2 border-green-500 shadow-sm overflow-hidden">
          <div className="bg-green-700 px-4 py-2.5">
            <p className="text-white font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ⭐ Selected Buyer — Best Net Earnings
            </p>
          </div>
          <div className="px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-green-700 flex items-center justify-center text-white font-bold flex-shrink-0">AB</div>
              <div className="flex-1">
                <p className="font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{opts[0].name}</p>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} viewBox="0 0 20 20" className={`w-3.5 h-3.5 ${s <= Math.round(opts[0].rating ?? 0) ? 'text-amber-500' : 'text-stone-200'}`} fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-stone-500 ml-1">({opts[0].rating})</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">📍 {opts[0].distance} km · Pickup: {opts[0].pickup}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400 font-semibold">NET</p>
                <p className="text-xl font-bold text-green-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  ₹{(opts[0].netEarnings / 1000).toFixed(1)}k
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed numbers table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-x-auto">
          <div className="min-w-[340px]" style={{ display: 'grid', gridTemplateColumns: '90px repeat(3, 1fr)' }}>
            <div className="bg-stone-50 px-2 py-2.5" />
            {opts.map((opt, i) => (
              <div key={opt.rank} className={`px-2 py-2.5 text-center ${i === 0 ? 'bg-green-700' : 'bg-stone-800'}`}>
                <p className={`text-xs font-bold ${i === 0 ? 'text-green-200' : 'text-stone-400'}`}>#{opt.rank}</p>
                <p className="text-xs font-bold text-white leading-tight">
                  {opt.name.split(' ')[0]}
                </p>
              </div>
            ))}

            {([
              { label: 'Price/kg', key: 'price', fmt: (v: number) => `₹${v}`, green: true },
              { label: 'Gross', key: 'grossRevenue', fmt: (v: number) => `₹${(v/1000).toFixed(0)}k`, green: true },
              { label: 'Transport', key: 'transport', fmt: (v: number) => v === 0 ? 'Free' : `−₹${Math.abs(v)}`, green: false },
              { label: 'Loading', key: 'loading', fmt: (v: number) => `−₹${Math.abs(v)}`, green: false },
              { label: 'Fees', key: 'fees', fmt: (v: number) => v === 0 ? 'Free' : `−₹${Math.abs(v)}`, green: false },
              { label: 'Net', key: 'netEarnings', fmt: (v: number) => `₹${(v/1000).toFixed(1)}k`, green: true, highlight: true },
            ] as { label: string; key: string; fmt: (v: number) => string; green: boolean; highlight?: boolean }[]).map((row) => (
              <React.Fragment key={row.label}>
                <div className={`flex items-center px-3 py-2.5 border-t border-stone-100 ${row.highlight ? 'bg-green-50' : 'bg-stone-50'}`}>
                  <p className={`text-xs font-semibold ${row.highlight ? 'text-green-800 font-bold' : 'text-stone-500'}`}>{row.label}</p>
                </div>
                {opts.map((opt) => {
                  const val = (opt as unknown as Record<string, number>)[row.key]
                  const allVals = opts.map((o) => (o as unknown as Record<string, number>)[row.key])
                  const isBest = row.green && val === Math.max(...allVals)
                  return (
                    <div
                      key={`${opt.rank}-${row.label}`}
                      className={`flex items-center justify-center px-1 py-2.5 border-t border-stone-100 ${row.highlight ? 'bg-green-50' : isBest ? 'bg-green-50' : 'bg-white'}`}
                    >
                      <span className={`text-sm font-semibold text-center ${
                        row.highlight ? 'text-green-700 font-bold' : isBest ? 'text-green-700' : row.green ? 'text-stone-700' : 'text-red-600'
                      }`} style={row.highlight ? { fontFamily: 'Outfit, sans-serif' } : {}}>
                        {row.fmt(val)}
                      </span>
                    </div>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-3 pb-4">
          <button
            onClick={() => navigate('negotiation')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Accept & Negotiate with Best Buyer →
          </button>
          <p className="text-xs text-center text-stone-400">
            Net = actual money you receive after all deductions
          </p>
        </div>
      </div>
    </div>
  )
}
