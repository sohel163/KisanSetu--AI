import type { NavProps } from '../types'
import { buyers } from '../data'

export default function BuyerScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('bestOptions')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Buyer Matching
        </h1>
        <p className="text-sm text-stone-500">Buyers looking for tomatoes · 1,000 kg</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">✓ Verified only</span>
          <span className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full font-semibold">Demo Data</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-xs text-stone-400 font-semibold leading-relaxed">
          🔒 Verified buyers are checked by KisanSetu. Always review payment terms before accepting.
        </p>

        {buyers.map((buyer, idx) => (
          <div key={buyer.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${idx === 0 ? 'border-green-400' : 'border-stone-200'}`}>
            {idx === 0 && (
              <div className="bg-green-700 px-4 py-1.5">
                <p className="text-white text-xs font-bold">⭐ Best Net Earnings for You</p>
              </div>
            )}
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{buyer.name}</h2>
                    {buyer.verified ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ Verified</span>
                    ) : (
                      <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold">Unverified</span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mt-0.5">⭐ {buyer.rating}/5 ({buyer.reviews} reviews)</p>
                  <p className="text-sm text-stone-500">📍 {buyer.location} · {buyer.distance} km</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs text-stone-400 font-semibold">OFFER</p>
                  <p className="text-2xl font-bold text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{buyer.price}</p>
                  <p className="text-xs text-stone-400">/kg</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { label: 'Needs', val: buyer.needs },
                  { label: 'Quality', val: buyer.qualityReq },
                  { label: 'Pickup', val: buyer.pickup },
                  { label: 'Payment', val: buyer.payment },
                ].map((item) => (
                  <div key={item.label} className="bg-stone-50 rounded-xl px-2.5 py-2">
                    <p className="text-xs text-stone-400 font-semibold">{item.label}</p>
                    <p className="text-sm font-semibold text-stone-700 leading-tight">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2 flex justify-between items-center">
                <p className="text-sm font-semibold text-green-800">Est. Net Earnings</p>
                <p className="text-xl font-bold text-green-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  ₹{buyer.netEarnings.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="border-t border-stone-100 px-4 py-3 flex gap-2">
              <button
                onClick={() => navigate('buyerProfile')}
                className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-xl font-bold text-sm"
              >
                View Profile
              </button>
              <button
                onClick={() => navigate('negotiation')}
                className={`flex-1 py-3 rounded-xl font-bold text-sm ${
                  idx === 0 ? 'bg-green-700 text-white' : 'bg-stone-900 text-white'
                }`}
              >
                {idx === 0 ? 'Negotiate →' : 'Make Offer →'}
              </button>
            </div>
          </div>
        ))}

        <div className="pb-4" />
      </div>
    </div>
  )
}
