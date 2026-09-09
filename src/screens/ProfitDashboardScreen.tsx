import type { NavProps } from '../types'
import { profitSummary, salesHistory } from '../data'

const cropColors: Record<string, string> = {
  Tomatoes: 'bg-red-400',
  Chillies: 'bg-orange-500',
  Onion: 'bg-purple-400',
  Potato: 'bg-yellow-500',
}

export default function ProfitDashboardScreen({ navigate }: NavProps) {
  const maxNet = Math.max(...salesHistory.map((s) => s.net))

  const deductions = [
    { label: 'Transport', val: profitSummary.totalTransport },
    { label: 'Loading', val: profitSummary.totalLoading },
    { label: 'Fees', val: profitSummary.totalFees },
    { label: 'Spoilage', val: profitSummary.totalSpoilage },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('profile')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              My Earnings
            </h1>
            <p className="text-sm text-stone-500">{profitSummary.season}</p>
          </div>
          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-bold">
            ₹{(profitSummary.totalNet / 1000).toFixed(1)}K net
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Sales', val: profitSummary.totalSales },
            { label: 'Total Qty', val: `${(profitSummary.totalQuantity / 1000).toFixed(1)}T` },
            { label: 'Avg/kg', val: `₹${profitSummary.avgPricePerKg.toFixed(1)}` },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-stone-200 rounded-2xl px-3 py-3.5 text-center shadow-sm">
              <p className="text-xs text-stone-400 font-semibold uppercase tracking-wide">{s.label}</p>
              <p className="text-xl font-bold text-stone-900 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-stone-900 rounded-2xl p-4">
          <p className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-3">Season Breakdown</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-300 text-sm">Gross Revenue</span>
              <span className="text-white font-bold">₹{profitSummary.totalGross.toLocaleString('en-IN')}</span>
            </div>
            {deductions.map((d) => (
              <div key={d.label} className="flex justify-between text-sm">
                <span className="text-stone-500">− {d.label}</span>
                <span className={`font-semibold ${d.val === 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {d.val === 0 ? 'None' : `−₹${d.val.toLocaleString('en-IN')}`}
                </span>
              </div>
            ))}
            <div className="border-t border-stone-700 pt-2 flex justify-between">
              <span className="text-white font-bold">Net Profit</span>
              <span className="text-green-400 font-bold text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{profitSummary.totalNet.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">📈</span>
          <div>
            <p className="font-bold text-green-800 text-sm">
              You earn ₹{(profitSummary.avgPricePerKg - profitSummary.mandiAvgPerKg).toFixed(1)}/kg more than mandi average
            </p>
            <p className="text-green-700 text-xs mt-0.5">
              Using KisanSetu saved you ~₹8,400 vs selling at local mandi
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Sales by Crop</p>
          <div className="space-y-3">
            {salesHistory.map((s) => (
              <div key={s.month} className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${cropColors[s.crop] || 'bg-stone-400'}`} />
                    <p className="font-bold text-stone-800 text-sm">{s.crop}</p>
                  </div>
                  <p className="text-xs text-stone-400 font-semibold">{s.month} · {s.qty} kg</p>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${cropColors[s.crop] || 'bg-stone-400'}`}
                    style={{ width: `${(s.net / maxNet) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Gross ₹{s.gross.toLocaleString('en-IN')}</span>
                  <span className="font-bold text-stone-900">Net ₹{s.net.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4 shadow-sm">
          <p className="font-bold text-stone-900 text-sm mb-3">💡 Tips to Earn More</p>
          <div className="space-y-2.5">
            {[
              { icon: '🤝', text: 'Join FPO bulk lots to negotiate better prices as a group.' },
              { icon: '❄️', text: 'Use cold storage for tomatoes to extend shelf life by 5–7 days.' },
              { icon: '✓', text: 'Sell to verified buyers — faster payment, better trust.' },
              { icon: '📊', text: 'Compare net earnings, not just price, before accepting any offer.' },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg flex-shrink-0">{tip.icon}</span>
                <p className="text-sm text-stone-600 leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}
