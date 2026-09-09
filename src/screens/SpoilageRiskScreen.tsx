import type { NavProps } from '../types'
import { produce, spoilageData } from '../data'

const riskLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const

export default function SpoilageRiskScreen({ navigate }: NavProps) {
  const sp = spoilageData
  const levelIdx = riskLevels.indexOf(sp.riskLevel)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('sellNow')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Spoilage Risk
        </h1>
        <p className="text-sm text-stone-500">{produce.crop} · {produce.variety}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Big risk badge */}
        <div className="bg-red-600 rounded-2xl p-5 text-center shadow-md shadow-red-200">
          <p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-2">Spoilage Risk</p>
          <p className="text-white text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {sp.riskLevel}
          </p>
          {/* Risk meter */}
          <div className="flex gap-1 justify-center mb-2">
            {riskLevels.map((lvl, i) => (
              <div
                key={lvl}
                className={`h-2 rounded-full flex-1 max-w-[40px] transition-all ${
                  i <= levelIdx
                    ? i === 0 ? 'bg-green-400'
                    : i === 1 ? 'bg-yellow-400'
                    : i === 2 ? 'bg-orange-400'
                    : 'bg-red-300'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-red-100 text-sm">
            Tomatoes may lose quality if stored more than {sp.shelfLifeDays} days.
          </p>
        </div>

        {/* Safe window details */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Safe Selling Window', val: sp.safeWindow, icon: '🗓', color: 'bg-amber-50 border-amber-200 text-amber-800' },
            { label: 'Value Loss After 3 Days', val: `${sp.valueLossAfterDeadline}%`, icon: '📉', color: 'bg-red-50 border-red-200 text-red-800' },
            { label: 'Recommended Deadline', val: sp.deadline, icon: '⏰', color: 'bg-red-50 border-red-200 text-red-800' },
            { label: 'Potential Loss (₹)', val: `₹${sp.potentialLoss.toLocaleString('en-IN')}`, icon: '💸', color: 'bg-orange-50 border-orange-200 text-orange-800' },
          ].map((item) => (
            <div key={item.label} className={`rounded-2xl border px-4 py-3 ${item.color.split(' ').slice(0, 2).join(' ')}`}>
              <p className="text-xl mb-1">{item.icon}</p>
              <p className={`text-xs font-semibold ${item.color.split(' ')[2]}`}>{item.label}</p>
              <p className={`text-base font-bold mt-0.5 ${item.color.split(' ')[2]}`}>{item.val}</p>
            </div>
          ))}
        </div>

        {/* Visual risk progress bar */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="text-sm font-bold text-stone-700 mb-3">Quality Over Time</p>
          <div className="space-y-2">
            {[
              { label: 'Today', quality: 100, color: 'bg-green-500' },
              { label: 'Tomorrow', quality: 92, color: 'bg-green-400' },
              { label: '2 days', quality: 80, color: 'bg-amber-400' },
              { label: '3 days', quality: 65, color: 'bg-orange-500' },
              { label: '4 days', quality: 40, color: 'bg-red-500' },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-xs text-stone-500 font-semibold w-14">{row.label}</span>
                <div className="flex-1 h-4 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${row.color}`}
                    style={{ width: `${row.quality}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-stone-700 w-10 text-right">{row.quality}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Factors */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="text-sm font-bold text-stone-700 mb-3">Risk Factors</p>
          <div className="space-y-2.5">
            {[
              { icon: '🌡️', label: 'Crop type', val: 'Tomatoes — highly perishable', bad: true },
              { icon: '🏚️', label: 'Cold storage', val: 'Not available', bad: true },
              { icon: '☀️', label: 'Weather', val: 'Hot & humid — 34°C', bad: true },
              { icon: '📅', label: 'Harvest timing', val: 'Ready in 2 days', bad: false },
              { icon: '🌱', label: 'Crop condition', val: 'Good — Grade A', bad: false },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="text-lg">{f.icon}</span>
                <div className="flex-1">
                  <p className="text-xs text-stone-400 font-semibold">{f.label}</p>
                  <p className={`text-sm font-semibold ${f.bad ? 'text-red-700' : 'text-green-700'}`}>{f.val}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${f.bad ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {f.bad ? 'Risk' : '✓ OK'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage tip */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <p className="text-sm font-bold text-green-800 mb-1">💡 Storage Tip</p>
          <p className="text-sm text-green-700">{sp.storageTip}</p>
        </div>

        <div className="space-y-3 pb-4">
          <button
            onClick={() => navigate('smartDecision')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Get Smart Selling Decision →
          </button>
          <button
            onClick={() => navigate('bestOptions')}
            className="w-full py-3.5 bg-white border border-stone-200 text-stone-700 rounded-2xl font-bold text-sm"
          >
            View Best Selling Options
          </button>
        </div>
      </div>
    </div>
  )
}
