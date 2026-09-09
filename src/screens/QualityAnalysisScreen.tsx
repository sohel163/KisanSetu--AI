import type { NavProps } from '../types'
import { produce, qualityData } from '../data'

export default function QualityAnalysisScreen({ navigate }: NavProps) {
  const qd = qualityData
  const scorePct = qd.score

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('cropScan')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Quality Check
        </h1>
        <p className="text-sm text-stone-500">{produce.crop} · {produce.variety} · AI estimate</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

        {/* Score circle + grade */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-5 flex items-center gap-5">
          {/* Score ring */}
          <div className="relative flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-24 h-24">
              <circle cx="40" cy="40" r="33" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="33"
                fill="none"
                stroke="#16a34a"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(scorePct / 100) * 207} 207`}
                strokeDashoffset="52"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{qd.score}</p>
              <p className="text-xs text-stone-400 font-semibold">/ 100</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Overall Quality</p>
            <p className="text-3xl font-bold text-green-700 mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {qd.overall.toUpperCase()}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Grade {qd.grade}
              </span>
            </div>
          </div>
        </div>

        {/* Quality indicators */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="text-sm font-bold text-stone-700 mb-3">Quality Indicators</p>
          <div className="space-y-2.5">
            {qd.indicators.map((ind) => (
              <div key={ind.label} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${ind.ok ? 'bg-green-100' : 'bg-amber-100'}`}>
                  <span className="text-sm">{ind.ok ? '✓' : '⚠'}</span>
                </div>
                <p className={`text-sm font-semibold flex-1 ${ind.ok ? 'text-stone-800' : 'text-stone-600'}`}>
                  {ind.label}
                </p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ind.ok ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {ind.ok ? 'Good' : 'Minor'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Market value + grade */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
            <p className="text-xs text-stone-400 font-semibold">Recommended Grade</p>
            <p className="text-4xl font-bold text-green-700 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {qd.grade}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">Based on scan</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
            <p className="text-xs text-stone-400 font-semibold">Est. Market Value</p>
            <p className="text-lg font-bold text-amber-600 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {qd.marketValueRange}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">/ quintal</p>
          </div>
        </div>

        {/* Suggested action */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <p className="text-sm font-bold text-green-800">💡 Suggested Action</p>
          <p className="text-base font-bold text-green-900 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {qd.suggestedAction}
          </p>
          <p className="text-xs text-green-700 mt-1">
            Quality is good — sell soon to get the best price.
          </p>
        </div>

        {/* AI disclaimer */}
        <div className="bg-stone-100 border border-stone-200 rounded-2xl px-4 py-3">
          <p className="text-xs text-stone-500 font-semibold leading-relaxed">
            🤖 {qd.disclaimer}
          </p>
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
            Find Best Buyers for This Quality
          </button>
        </div>
      </div>
    </div>
  )
}
