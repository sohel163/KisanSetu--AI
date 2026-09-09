import type { NavProps } from '../types'
import { orderStatus } from '../data'

export default function OrdersScreen({ navigate }: NavProps) {
  const doneCount = orderStatus.steps.filter((s) => s.done).length
  const progress = (doneCount / orderStatus.steps.length) * 100

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          My Orders
        </h1>
        <p className="text-sm text-stone-500">Active and past orders</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl border border-amber-300 shadow-sm overflow-hidden">
          <div className="bg-amber-600 px-4 py-2">
            <p className="text-amber-100 text-xs font-bold uppercase tracking-wider">Active Order</p>
          </div>
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{orderStatus.buyer}</p>
                <p className="text-sm text-stone-500">{orderStatus.crop} · {orderStatus.quantity} kg</p>
                <p className="text-sm text-stone-500">ID: {orderStatus.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-400 font-semibold">EST. NET</p>
                <p className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  ₹{orderStatus.netEarnings.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-stone-400 font-semibold mb-1">
                <span>Progress</span>
                <span>{doneCount}/{orderStatus.steps.length} steps done</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {orderStatus.steps.map((s, i) => {
                const next = !s.done && orderStatus.steps[i - 1]?.done
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      s.done ? 'bg-green-500 text-white' : next ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-400'
                    }`}>
                      {s.done ? '✓' : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${s.done ? 'text-green-700' : next ? 'text-amber-700' : 'text-stone-400'}`}>
                        {s.label}
                        {next && <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Next</span>}
                      </p>
                      {s.time && <p className="text-xs text-stone-400">{s.time}</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 bg-stone-50 rounded-xl px-3 py-2.5">
              <p className="text-sm font-semibold text-stone-700">🚚 Pickup: <span className="text-amber-700">{orderStatus.pickupDate}</span></p>
              <p className="text-xs text-stone-500 mt-0.5">Vehicle: {orderStatus.vehicle}</p>
            </div>
          </div>
          <div className="border-t border-stone-100 px-4 py-3 flex gap-2">
            <button
              onClick={() => navigate('orderTracking')}
              className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-bold text-sm"
            >
              Track Order →
            </button>
            <button
              onClick={() => navigate('payment')}
              className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-xl font-bold text-sm"
            >
              Payment Details
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Past Orders</p>
          <div className="space-y-2">
            {[
              { id: 'ORD-2026-0789', buyer: 'Guntur APMC', crop: 'Chillies', qty: 800, net: 19200, date: 'Jul 15, 2026' },
              { id: 'ORD-2026-0541', buyer: 'FreshLink Traders', crop: 'Onion', qty: 1200, net: 16800, date: 'May 3, 2026' },
            ].map((o) => (
              <div key={o.id} className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-stone-800 text-sm">{o.buyer}</p>
                  <p className="text-xs text-stone-500">{o.crop} · {o.qty} kg · {o.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900">₹{o.net.toLocaleString('en-IN')}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Paid ✓</span>
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
