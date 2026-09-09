import type { NavProps } from '../types'

export default function PaymentSecuredScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full bg-green-800">
      {/* Full-green top section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Shield icon */}
        <div className="w-28 h-28 rounded-full bg-green-600 flex items-center justify-center mb-6 shadow-2xl shadow-green-900/60">
          <svg viewBox="0 0 24 24" className="w-14 h-14" fill="none">
            <path
              d="M12 2L3 7v6c0 5 3.75 9.69 9 10.93C17.25 22.69 21 18 21 13V7L12 2z"
              fill="white"
              opacity="0.15"
            />
            <path
              d="M12 2L3 7v6c0 5 3.75 9.69 9 10.93C17.25 22.69 21 18 21 13V7L12 2z"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-green-300 text-sm font-bold uppercase tracking-widest mb-2">Payment Secured</p>
        <p className="text-white text-5xl font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>₹22,800</p>
        <p className="text-green-300 text-base font-semibold">Amt: ₹22,800 Secured</p>
        <p className="text-green-400 text-sm mt-3 leading-relaxed max-w-xs">
          Money is with platform{'\n'}
          <span className="font-bold text-white">BEFORE</span> delivery
        </p>

        {/* 3 trust points */}
        <div className="mt-8 space-y-3 w-full max-w-xs">
          {[
            'Buyer identity verified',
            'Payment locked in escrow',
            'Dispute protection active',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-green-700/50 rounded-2xl px-4 py-3">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                  <path d="M5 10l3 3 7-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-semibold text-sm text-left">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action area */}
      <div className="px-5 pb-10 pt-4 space-y-3 bg-green-800">
        <div className="bg-green-700/40 rounded-2xl px-4 py-3 mb-1">
          <div className="flex justify-between text-sm">
            <span className="text-green-300">Buyer</span>
            <span className="text-white font-semibold">ABC Foods Pvt Ltd</span>
          </div>
          <div className="flex justify-between text-sm mt-1.5">
            <span className="text-green-300">Pickup</span>
            <span className="text-white font-semibold">Tomorrow 8 AM</span>
          </div>
          <div className="flex justify-between text-sm mt-1.5">
            <span className="text-green-300">Payment mode</span>
            <span className="text-white font-semibold">UPI / Bank Transfer</span>
          </div>
        </div>

        <button
          onClick={() => navigate('transport')}
          className="w-full py-4 bg-white text-green-800 rounded-2xl font-bold text-base shadow-lg"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Arrange Pickup →
        </button>
        <button
          onClick={() => navigate('orderTracking')}
          className="w-full py-3.5 bg-green-700/50 border border-green-600 text-white rounded-2xl font-semibold text-sm"
        >
          View Order Details
        </button>
      </div>
    </div>
  )
}
