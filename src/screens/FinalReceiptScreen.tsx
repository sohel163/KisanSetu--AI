import type { NavProps } from '../types'
import { qcData, farmer } from '../data'

export default function FinalReceiptScreen({ navigate }: NavProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-green-800 px-5 pt-10 pb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-3 shadow-lg">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-green-300 text-sm font-bold uppercase tracking-wider mb-1">Payment Released!</p>
        <p className="text-white text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
          ₹{qcData.netFinal.toLocaleString('en-IN')}
        </p>
        <p className="text-green-300 text-sm mt-2">Credited to your bank account · Sep 8, 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-3">Final Receipt</p>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Buyer</span>
              <span className="font-semibold text-stone-800">ABC Foods Pvt Ltd</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Crop</span>
              <span className="font-semibold text-stone-800">Tomatoes · Hybrid Roma</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Actual weight</span>
              <span className="font-semibold text-stone-800">980 kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Price</span>
              <span className="font-semibold text-stone-800">₹24/kg</span>
            </div>
            <div className="border-t border-stone-100 pt-2 flex justify-between text-sm">
              <span className="text-stone-600 font-semibold">Gross Amount</span>
              <span className="font-bold text-stone-900">₹{qcData.grossActual.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Transport</span>
              <span className="text-red-600 font-semibold">−₹{qcData.transport.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Loading & Handling</span>
              <span className="text-red-600 font-semibold">−₹{qcData.loading}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Platform Fee</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="border-t-2 border-stone-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-stone-900 text-base">Net Amount Paid</span>
              <span className="font-bold text-green-700 text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{qcData.netFinal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
          <p className="text-sm font-bold text-green-800">📤 Credited to</p>
          <p className="text-sm text-green-700 mt-1">Bank: SBI · Account: ****3456</p>
          <p className="text-sm text-green-700">UPI: {farmer.name.toLowerCase().replace(' ', '')}@upi</p>
          <p className="text-xs text-green-600 mt-1 font-semibold">Transaction ID: KS-2026-0912-PAY</p>
        </div>

        <div className="space-y-3 pb-4">
          <button
            onClick={() => navigate('feedback')}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            ★ Rate Buyer — ABC Foods
          </button>
          <button
            onClick={() => navigate('profitDashboard')}
            className="w-full py-3.5 bg-white border border-stone-200 text-stone-700 rounded-2xl font-bold text-sm"
          >
            View My Earnings Dashboard
          </button>
          <button
            onClick={() => navigate('home')}
            className="w-full py-3.5 bg-stone-100 text-stone-600 rounded-2xl font-semibold text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
