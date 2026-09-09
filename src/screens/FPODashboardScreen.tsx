import { useState } from 'react'
import type { NavProps } from '../types'
import { fpoMembers, fpoSummary } from '../data'

const statusConfig: Record<string, { color: string; bg: string }> = {
  Ready: { color: 'text-green-700', bg: 'bg-green-100' },
  Harvested: { color: 'text-amber-700', bg: 'bg-amber-100' },
  Pending: { color: 'text-stone-600', bg: 'bg-stone-100' },
}

export default function FPODashboardScreen({ navigate }: NavProps) {
  const [showInvite, setShowInvite] = useState(false)
  const tomatoMembers = fpoMembers.filter((m) => m.crop === 'Tomatoes')
  const totalTomatoQty = tomatoMembers.reduce((s, m) => s + m.qty, 0)
  const totalTomatoNet = tomatoMembers.reduce((s, m) => s + m.net, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-xl">🤝</div>
          <div>
            <h1 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              FPO Dashboard
            </h1>
            <p className="text-xs text-stone-500">{fpoSummary.name}</p>
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
            { label: 'Members', val: fpoSummary.members, color: 'text-stone-900' },
            { label: 'Active Lots', val: fpoSummary.activeLots, color: 'text-amber-600' },
            { label: 'Total Qty', val: `${(fpoSummary.totalQty / 1000).toFixed(1)}T`, color: 'text-green-600' },
          ].map((s) => (
            <div key={s.label} className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-center">
              <p className={`text-xl font-bold ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              <p className="text-xs text-stone-400 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-stone-900 rounded-2xl p-4">
          <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Bulk Lot — Tomatoes</p>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {totalTomatoQty.toLocaleString('en-IN')} kg
              </p>
              <p className="text-stone-400 text-sm">from {tomatoMembers.length} farmers · Ready to sell</p>
            </div>
            <div className="text-right">
              <p className="text-stone-400 text-xs">Bulk target</p>
              <p className="text-amber-400 text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{fpoSummary.bulkTargetPrice}/kg
              </p>
            </div>
          </div>
          <div className="mt-3 border-t border-stone-800 pt-3 flex justify-between">
            <span className="text-stone-400 text-sm">Estimated bulk net earnings</span>
            <span className="text-green-400 font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ₹{totalTomatoNet.toLocaleString('en-IN')}
            </span>
          </div>
          <button className="mt-3 w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm">
            Create Bulk Lot →
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Member Contributions</p>
            <button
              onClick={() => setShowInvite(!showInvite)}
              className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full"
            >
              + Invite Member
            </button>
          </div>

          {showInvite && (
            <div className="mb-3 bg-white border border-amber-200 rounded-xl px-4 py-3 space-y-2">
              <p className="text-sm font-bold text-stone-800">Invite a Farmer</p>
              <input
                type="tel"
                placeholder="Mobile number"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm outline-none focus:border-amber-400"
              />
              <button className="w-full py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm">
                Send Invite
              </button>
            </div>
          )}

          <div className="space-y-2">
            {fpoMembers.map((m) => {
              const sc = statusConfig[m.status]
              const isUser = m.name === 'Ramu Rao'
              return (
                <div key={m.id} className={`bg-white border rounded-xl px-4 py-3 flex items-center justify-between ${isUser ? 'border-amber-300' : 'border-stone-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isUser ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-600'}`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800 text-sm">
                        {m.name} {isUser && <span className="text-xs text-amber-600 font-bold">(You)</span>}
                      </p>
                      <p className="text-xs text-stone-400">{m.village} · {m.crop} · {m.qty} kg</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.color}`}>{m.status}</span>
                    <p className="text-xs font-bold text-stone-900">₹{m.net.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Bulk Buyer Offers</p>
          <div className="space-y-2">
            {[
              { buyer: 'FreshMart Foods', price: 23, qty: '10,000+ kg', payment: '48 hours', verified: true },
              { buyer: 'AgriStar Exports', price: 22.5, qty: '5,000–20,000 kg', payment: '3 days', verified: true },
              { buyer: 'City Wholesale', price: 21, qty: '3,000+ kg', payment: '5 days', verified: false },
            ].map((offer, i) => (
              <div key={i} className={`bg-white border rounded-xl px-4 py-3 ${i === 0 ? 'border-amber-300' : 'border-stone-200'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-stone-900 text-sm">{offer.buyer}</p>
                      {offer.verified
                        ? <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">✓</span>
                        : <span className="text-xs bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full font-bold">Unverified</span>}
                    </div>
                    <p className="text-xs text-stone-500">Needs: {offer.qty} · Payment: {offer.payment}</p>
                  </div>
                  <p className="text-xl font-bold text-stone-900 ml-2" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{offer.price}</p>
                </div>
                {i === 0 && (
                  <button className="mt-2 w-full py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm">
                    Accept Bulk Offer →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}
