import type { NavProps } from '../types'

// ── Chart constants ───────────────────────────────────────────────
const DATA = [
  { label: 'Today',    price: 2400, actual: true  },
  { label: 'Tomorrow', price: 2450, actual: false },
  { label: '2 Days',   price: 2520, actual: false },
  { label: '3 Days',   price: 2600, actual: false },
  { label: '4 Days',   price: 2550, actual: false },
  { label: '5 Days',   price: 2500, actual: false },
]

const Y_GRID  = [2300, 2400, 2500, 2600]
const Y_MIN   = 2200
const Y_MAX   = 2680
const VW      = 320
const VH      = 170
const PL      = 50   // left padding for y-axis labels
const PT      = 22   // top padding so peak label isn't clipped
const PB      = 26   // bottom padding for x-axis labels
const PR      = 8
const CW      = VW - PL - PR
const CH      = VH - PT - PB

const cx = (i: number)       => PL + (i / (DATA.length - 1)) * CW
const cy = (price: number)   => PT + (1 - (price - Y_MIN) / (Y_MAX - Y_MIN)) * CH

// polyline string from a slice of DATA starting at global index `offset`
const pts = (slice: typeof DATA, offset: number) =>
  slice.map((d, i) => `${cx(i + offset)},${cy(d.price)}`).join(' ')

export default function SellNowScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>

      {/* ── Header ── */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Sell Now or Wait?
        </h1>
        <p className="text-sm text-stone-500">Tomatoes · 1,000 kg · Pedakurapadu, Guntur</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* ══ 1. EXPECTED PRICE TREND ══ */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-1">
            <p className="font-bold text-stone-800 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Expected Price Trend
            </p>
            <p className="text-xs text-stone-400 mt-0.5">Tomatoes · Guntur Mandi</p>
          </div>

          <div className="px-2 pb-0">
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full"
              style={{ height: VH, display: 'block' }}
              aria-label="Expected price trend line chart"
            >
              {/* ── Y-axis grid lines + labels ── */}
              {Y_GRID.map((val) => {
                const y = cy(val)
                return (
                  <g key={val}>
                    <line x1={PL} y1={y} x2={VW - PR} y2={y} stroke="#e7e5e4" strokeWidth="0.7" />
                    <text
                      x={PL - 4} y={y + 3.5}
                      textAnchor="end" fontSize="8" fill="#a8a29e"
                      fontFamily="Nunito, sans-serif"
                    >
                      ₹{val.toLocaleString('en-IN')}
                    </text>
                  </g>
                )
              })}

              {/* ── X-axis labels ── */}
              {DATA.map((d, i) => (
                <text
                  key={d.label}
                  x={cx(i)} y={VH - 5}
                  textAnchor="middle" fontSize="7.5"
                  fill={d.actual ? '#44403c' : '#71717a'}
                  fontWeight={d.actual ? '700' : '400'}
                  fontFamily="Nunito, sans-serif"
                >
                  {d.label}
                </text>
              ))}

              {/* ── Solid segment: Today only ── */}
              <circle cx={cx(0)} cy={cy(2400)} r="5" fill="#16a34a" />

              {/* ── Bridge: solid line Today → Tomorrow ── */}
              <line
                x1={cx(0)} y1={cy(2400)} x2={cx(1)} y2={cy(2450)}
                stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round"
              />

              {/* ── Dashed predicted line: Tomorrow → 5 Days ── */}
              <polyline
                points={pts(DATA.slice(1), 1)}
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.2"
                strokeDasharray="5 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* ── Predicted dots ── */}
              {DATA.slice(1).map((d, i) => {
                const x = cx(i + 1)
                const y = cy(d.price)
                const isPeak = d.price === 2600
                return (
                  <g key={d.label}>
                    <circle
                      cx={x} cy={y}
                      r={isPeak ? 5.5 : 3.5}
                      fill="white" stroke="#16a34a"
                      strokeWidth={isPeak ? 2.5 : 1.8}
                    />
                    {isPeak && (
                      <>
                        {/* Peak triangle marker */}
                        <polygon
                          points={`${x},${y - 10} ${x - 4},${y - 17} ${x + 4},${y - 17}`}
                          fill="#15803d"
                        />
                        <text
                          x={x} y={y - 19}
                          textAnchor="middle" fontSize="7.5"
                          fill="#15803d" fontWeight="700"
                          fontFamily="Nunito, sans-serif"
                        >
                          Peak ₹2,600
                        </text>
                      </>
                    )}
                  </g>
                )
              })}

              {/* ── Today price label ── */}
              <text
                x={cx(0)} y={cy(2400) - 9}
                textAnchor="middle" fontSize="7.5"
                fill="#16a34a" fontWeight="700"
                fontFamily="Nunito, sans-serif"
              >
                ₹2,400
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex gap-5 px-4 pt-1 pb-4 text-xs text-stone-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <svg width="22" height="10">
                <line x1="1" y1="5" x2="21" y2="5" stroke="#16a34a" strokeWidth="2" />
                <circle cx="11" cy="5" r="3.5" fill="#16a34a" />
              </svg>
              Actual
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="22" height="10">
                <line x1="1" y1="5" x2="21" y2="5" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2.5" />
                <circle cx="11" cy="5" r="3.5" fill="white" stroke="#16a34a" strokeWidth="1.5" />
              </svg>
              Predicted
            </span>
          </div>
        </div>

        {/* ══ 2. SELL NOW vs WAIT ══ */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm px-4 py-4">
          <p className="font-bold text-stone-800 text-sm mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Sell Now vs Wait
          </p>
          <div className="grid grid-cols-2 gap-3">

            {/* Sell Now */}
            <div className="bg-green-50 border-2 border-green-400 rounded-xl px-3 py-3">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Sell Now</p>
              <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>₹2,400</p>
              <p className="text-xs text-stone-400">/ quintal</p>
              <div className="mt-2 border-t border-green-200 pt-2 space-y-1">
                <p className="text-xs text-stone-500 font-semibold">Estimated income</p>
                <p className="text-base font-bold text-green-700">₹24,000</p>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-green-700 flex items-center gap-1">✓ Low price risk</p>
                <p className="text-xs text-green-700 flex items-center gap-1">✓ Low spoilage exposure</p>
              </div>
            </div>

            {/* Wait 3 Days */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Wait 3 Days</p>
              <p className="text-2xl font-bold text-stone-700" style={{ fontFamily: 'Outfit, sans-serif' }}>₹2,600</p>
              <p className="text-xs text-stone-400">/ quintal</p>
              <div className="mt-2 border-t border-stone-200 pt-2 space-y-1">
                <p className="text-xs text-stone-500 font-semibold">Potential extra</p>
                <p className="text-sm font-bold text-amber-600">+₹200/quintal</p>
                <p className="text-xs text-stone-500 font-semibold">Estimated income</p>
                <p className="text-sm font-bold text-stone-700">₹26,000</p>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-red-600 flex items-center gap-1">⚠ Higher spoilage risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ 3. SPOILAGE RISK ══ */}
        <div className="bg-red-50 border border-red-300 rounded-2xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-red-800 text-sm">Spoilage Risk</p>
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
              HIGH
            </span>
          </div>

          <div className="h-3 bg-red-100 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-red-500 rounded-full" style={{ width: '78%' }} />
          </div>
          <p className="text-xs text-red-400 text-right mb-3">78 / 100</p>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white/80 rounded-xl px-3 py-2">
              <p className="text-xs text-red-500 font-semibold">Safe window</p>
              <p className="text-sm font-bold text-red-800">2–3 days</p>
            </div>
            <div className="bg-white/80 rounded-xl px-3 py-2">
              <p className="text-xs text-red-500 font-semibold">Quality loss after 3 days</p>
              <p className="text-sm font-bold text-red-800">15%</p>
            </div>
          </div>

          <p className="text-xs text-red-700 font-semibold">
            🗓 Expected quality loss after 3 days: 15%
          </p>
          <p className="text-xs text-red-600 mt-0.5">Sell within 2 days to avoid loss.</p>

          <button
            onClick={() => navigate('spoilageRisk')}
            className="mt-3 w-full py-2 bg-white border border-red-200 rounded-xl text-xs font-bold text-red-700"
          >
            View Full Spoilage Details →
          </button>
        </div>

        {/* ══ 4. SMART SELLING ADVICE ══ */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-stone-700">
          {/* Red header band */}
          <div className="bg-red-600 px-4 py-3 flex items-center justify-between">
            <p className="text-white text-xs font-bold uppercase tracking-widest">Smart Selling Advice</p>
            <span className="text-white text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              SELL NOW
            </span>
          </div>

          <div className="bg-stone-900 px-4 py-4 space-y-3">
            {/* Price tiles */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-stone-800 rounded-xl px-3 py-2.5">
                <p className="text-stone-400 text-xs font-semibold">Current price</p>
                <p className="text-white font-bold text-sm">₹2,400/quintal</p>
              </div>
              <div className="bg-stone-800 rounded-xl px-3 py-2.5">
                <p className="text-stone-400 text-xs font-semibold">Expected maximum</p>
                <p className="text-green-400 font-bold text-sm">₹2,600 in 3 days</p>
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-stone-800 rounded-xl px-3 py-3 space-y-2">
              <p className="text-amber-400 text-xs font-bold flex items-center gap-2">
                <span className="text-base leading-none">⚠</span> High spoilage risk
              </p>
              <p className="text-amber-400 text-xs font-bold flex items-center gap-2">
                <span className="text-base leading-none">⚠</span> Estimated quality loss: 15% after 3 days
              </p>
            </div>

            {/* Recommendation text */}
            <div className="bg-red-950/60 border border-red-800 rounded-xl px-3 py-3">
              <p className="text-red-300 text-xs font-bold mb-1">Recommendation</p>
              <p className="text-white text-sm font-semibold leading-relaxed">
                "Prices may rise, but the high spoilage risk could reduce the final value of your tomatoes."
              </p>
              <p className="text-red-200 text-xs font-bold mt-2">
                Sell within 1–2 days to protect crop value.
              </p>
            </div>
          </div>
        </div>

        {/* ══ CTAs ══ */}
        <div className="space-y-3 pb-4">
          <button
            onClick={() => navigate('bestOptions')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Sell Now →
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
