import type { NavProps } from '../types'
import { produce, orderStatus } from '../data'

const riskConfig = {
  high: { dot: '🔴', label: 'High Risk', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', action: 'Sell within 24 hrs' },
  medium: { dot: '🟡', label: 'Medium Risk', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', action: 'Sell within 3 days' },
  low: { dot: '🟢', label: 'Low Risk', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', action: 'Can wait up to 7 days' },
}

const pastLots = [
  { id: 'LOT-2026-074', crop: 'Chillies', qty: 800, date: 'Jul 15, 2026', net: 20560, status: 'Sold & Paid' },
  { id: 'LOT-2026-052', crop: 'Onion', qty: 1200, date: 'May 3, 2026', net: 16260, status: 'Sold & Paid' },
  { id: 'LOT-2026-031', crop: 'Tomatoes', qty: 600, date: 'Mar 12, 2026', net: 13356, status: 'Sold & Paid' },
]

export default function MyProduceScreen({ navigate }: NavProps) {
  const risk = riskConfig[produce.spoilageRisk]

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              My Produce
            </h1>
            <p className="text-sm text-stone-500">Active lots and past sales</p>
          </div>
          <button
            onClick={() => navigate('addProduce')}
            className="flex items-center gap-1.5 bg-amber-600 text-white px-3.5 py-2 rounded-xl font-bold text-sm shadow-sm shadow-amber-200"
          >
            <span className="text-lg leading-none">+</span> Add Lot
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Active Lot</p>
          <div className="bg-white rounded-2xl border border-amber-300 shadow-sm overflow-hidden">
            <div className="bg-amber-600 px-4 py-2 flex items-center justify-between">
              <p className="text-white text-xs font-bold">ACTIVE — {produce.id}</p>
              <span className="text-amber-200 text-xs font-semibold">Not sold yet</span>
            </div>
            <img src={produce.photo} alt={produce.crop} className="w-full h-40 object-cover" />
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {produce.crop}
                    </h2>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{produce.quality}</span>
                  </div>
                  <p className="text-sm text-stone-500">{produce.variety} · {produce.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {produce.quantity.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-stone-400 font-semibold">kg</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-stone-50 rounded-xl px-2.5 py-2">
                  <p className="text-stone-400 font-semibold">HARVEST</p>
                  <p className="font-bold text-amber-700">In {produce.harvestDays} days</p>
                </div>
                <div className="bg-stone-50 rounded-xl px-2.5 py-2">
                  <p className="text-stone-400 font-semibold">STORAGE</p>
                  <p className="font-bold text-red-600">No cold</p>
                </div>
                <div className="bg-stone-50 rounded-xl px-2.5 py-2">
                  <p className="text-stone-400 font-semibold">URGENCY</p>
                  <p className="font-bold text-red-600">High</p>
                </div>
              </div>

              <div className={`mt-3 rounded-xl px-3 py-2.5 flex items-center justify-between ${risk.bg} border ${risk.border}`}>
                <div>
                  <p className={`font-bold text-sm ${risk.text}`}>{risk.dot} Spoilage Risk: {risk.label}</p>
                  <p className={`text-xs ${risk.text} mt-0.5`}>{risk.action}</p>
                </div>
                <button onClick={() => navigate('sellNow')} className={`text-xs font-bold ${risk.text} whitespace-nowrap`}>
                  See Advice →
                </button>
              </div>
            </div>

            <div className="border-t border-stone-100 px-4 py-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('bestOptions')}
                className="py-3 bg-amber-600 text-white rounded-xl font-bold text-sm"
              >
                Best Options →
              </button>
              <button
                onClick={() => navigate('market')}
                className="py-3 bg-stone-100 text-stone-700 rounded-xl font-bold text-sm"
              >
                Check Prices
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
          <p className="font-bold text-stone-900 text-sm mb-3">Active Order Status</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-stone-800">{orderStatus.buyer}</p>
              <p className="text-sm text-stone-500">Pickup: {orderStatus.pickupDate}</p>
            </div>
            <button
              onClick={() => navigate('orderTracking')}
              className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-bold"
            >
              Track →
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            {orderStatus.steps.slice(0, 3).map((s) => (
              <div key={s.label} className={`flex-1 h-1.5 rounded-full ${s.done ? 'bg-green-500' : 'bg-stone-200'}`} />
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-1">2 of 6 steps completed</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Past Lots</p>
            <button onClick={() => navigate('profitDashboard')} className="text-xs text-amber-700 font-bold">
              View Earnings →
            </button>
          </div>
          <div className="space-y-2">
            {pastLots.map((lot) => (
              <div key={lot.id} className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{lot.crop} · {lot.qty} kg</p>
                  <p className="text-xs text-stone-400">{lot.date} · {lot.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{lot.net.toLocaleString('en-IN')}</p>
                  <span className="text-xs text-green-600 font-semibold">✓ {lot.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}
