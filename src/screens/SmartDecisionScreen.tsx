import type { NavProps } from '../types'
import { produce, pricePredictions, spoilageData, qualityData } from '../data'

export default function SmartDecisionScreen({ navigate }: NavProps) {
  const pp = pricePredictions
  const sp = spoilageData
  const qd = qualityData

  const spoilageEatsGain = sp.riskLevel === 'HIGH' || sp.riskLevel === 'CRITICAL'
  const finalRec = spoilageEatsGain ? 'SELL NOW' : 'WAIT'
  const isUrgent = finalRec === 'SELL NOW'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('sellNow')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Smart Selling Advice
        </h1>
        <p className="text-sm text-stone-500">{produce.crop} · {produce.variety} · {produce.quantity} kg</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Final recommendation — hero card */}
        <div className={`rounded-2xl p-5 shadow-md text-center ${isUrgent ? 'bg-red-600 shadow-red-200' : 'bg-green-700 shadow-green-200'}`}>
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isUrgent ? 'text-red-200' : 'text-green-200'}`}>
            Smart Selling Advice — Final Recommendation
          </p>
          <p className="text-white text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {finalRec}
          </p>
          <p className={`text-sm mt-2 leading-relaxed ${isUrgent ? 'text-red-100' : 'text-green-100'}`}>
            {isUrgent
              ? 'Although market price may increase, high spoilage risk could reduce your final earnings.'
              : 'Prices are expected to rise and spoilage risk is low — you can wait a few days.'}
          </p>
        </div>

        {/* 4-factor summary */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-3">Smart Selling Advice</p>
          <div className="space-y-3">
            {[
              {
                label: 'Crop',
                val: `${produce.crop} · ${produce.variety}`,
                icon: '🍅',
                color: 'text-stone-800',
              },
              {
                label: 'Quality',
                val: `${qd.score}/100 — ${qd.overall} (Grade ${qd.grade})`,
                icon: '✅',
                color: 'text-green-700',
              },
              {
                label: 'Current Price',
                val: `₹${pp.currentPerQtl}/quintal`,
                icon: '💰',
                color: 'text-amber-700',
              },
              {
                label: 'Predicted Price',
                val: `₹${pp.threeDaysPerQtl}/quintal in 3 days`,
                icon: '📈',
                color: 'text-green-700',
              },
              {
                label: 'Spoilage Risk',
                val: `${sp.riskLevel} · Sell within ${sp.safeWindow}`,
                icon: '⚠️',
                color: 'text-red-700',
              },
              {
                label: 'Expected Quality Loss',
                val: `${sp.valueLossAfterDeadline}% if you wait 3+ days`,
                icon: '📉',
                color: 'text-red-700',
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                <span className="text-lg">{row.icon}</span>
                <div className="flex-1">
                  <p className="text-xs text-stone-400 font-semibold">{row.label}</p>
                  <p className={`text-sm font-bold ${row.color}`}>{row.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why this recommendation */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="text-sm font-bold text-stone-700 mb-2">Why We Recommend {finalRec}</p>
          <div className="space-y-2">
            {isUrgent ? [
              { icon: '📈', text: `Price may rise to ₹${pp.threeDaysPerQtl}/quintal in 3 days (+₹200)` },
              { icon: '⚠️', text: `BUT spoilage risk is HIGH — quality may drop ${sp.valueLossAfterDeadline}% in 3 days` },
              { icon: '💸', text: `Potential loss from spoilage: ₹${sp.potentialLoss.toLocaleString('en-IN')}` },
              { icon: '✅', text: `Verified buyer ready: ABC Foods · ₹24/kg · pickup tomorrow` },
              { icon: '🏆', text: `Selling now is safer and more profitable given your situation` },
            ] : [
              { icon: '📈', text: `Price expected to rise by ₹200/quintal in 3 days` },
              { icon: '✅', text: `Spoilage risk is low — crop will stay fresh` },
              { icon: '📊', text: `Quality score ${qd.score}/100 — Grade A — good holding ability` },
              { icon: '⏳', text: `Waiting could gain you ₹2,000 more on 1,000 kg` },
            ].map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">{pt.icon}</span>
                <p className="text-sm text-stone-700 leading-snug">{pt.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison: sell now vs wait */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-2xl border p-4 ${isUrgent ? 'border-green-400 bg-green-50' : 'border-stone-200 bg-white'}`}>
            <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isUrgent ? 'text-green-700' : 'text-stone-500'}`}>
              {isUrgent ? '⭐ Sell Now' : 'Sell Now'}
            </p>
            <p className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>₹22,800</p>
            <p className="text-xs text-stone-500 mt-0.5">Est. net earnings</p>
            {isUrgent && <p className="text-xs text-green-700 font-bold mt-1">Recommended</p>}
          </div>
          <div className={`rounded-2xl border p-4 ${!isUrgent ? 'border-green-400 bg-green-50' : 'border-stone-200 bg-stone-50'}`}>
            <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${!isUrgent ? 'text-green-700' : 'text-stone-400'}`}>
              {!isUrgent ? '⭐ Wait 3 Days' : 'Wait 3 Days'}
            </p>
            <p className={`text-xl font-bold ${isUrgent ? 'text-stone-400' : 'text-stone-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>₹21,500</p>
            <p className="text-xs text-stone-400 mt-0.5">After spoilage loss</p>
            {isUrgent && <p className="text-xs text-red-600 font-bold mt-1">−₹1,300 risk</p>}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-stone-100 border border-stone-200 rounded-2xl px-4 py-3">
          <p className="text-xs text-stone-500 font-semibold leading-relaxed">
            ℹ️ This recommendation combines price predictions, spoilage risk, and crop quality. It is an estimate — not a guarantee. Final decision is yours.
          </p>
        </div>

        <div className="space-y-3 pb-4">
          <button
            onClick={() => navigate('bestOptions')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Sell My Crop →
          </button>
          <button
            onClick={() => navigate('market')}
            className="w-full py-3.5 bg-white border border-stone-200 text-stone-700 rounded-2xl font-bold text-sm"
          >
            Track Price
          </button>
        </div>
      </div>
    </div>
  )
}
