import type { NavProps } from '../types'
import { payment } from '../data'

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: '⏳' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: '🔄' },
  paid: { label: 'Paid ✓', color: 'bg-green-100 text-green-700', icon: '✅' },
}

export default function PaymentScreen({ navigate }: NavProps) {
  const status = statusConfig[payment.status]

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('orders')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Payment
            </h1>
            <p className="text-sm text-stone-500">{payment.orderId}</p>
          </div>
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${status.color}`}>
            {status.icon} {status.label}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{payment.buyer}</p>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>{status.label}</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Crop</span>
              <span className="font-semibold text-stone-800">{payment.crop}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Quantity</span>
              <span className="font-semibold text-stone-800">{payment.quantity} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Agreed Price</span>
              <span className="font-semibold text-stone-800">₹{payment.agreedPrice}/kg</span>
            </div>

            <div className="border-t border-stone-100 pt-2.5 flex justify-between text-sm">
              <span className="text-stone-600 font-semibold">Gross Amount</span>
              <span className="font-bold text-stone-900">₹{payment.grossAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="space-y-1.5">
              {payment.deductions.map((d) => (
                <div key={d.label} className="flex justify-between text-sm">
                  <span className="text-stone-500">{d.label}</span>
                  <span className={`font-semibold ${d.amount === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {d.amount === 0 ? 'Free' : `−₹${Math.abs(d.amount).toLocaleString('en-IN')}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-stone-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 text-base">Net Amount</span>
                <span className="font-bold text-2xl text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  ₹{payment.netAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border px-4 py-4 ${payment.status === 'pending' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
          <p className={`font-bold text-sm ${payment.status === 'pending' ? 'text-amber-800' : 'text-green-800'}`}>
            {payment.status === 'pending' ? '⏳ Payment Expected' : '✅ Payment Received'}
          </p>
          <p className={`text-sm mt-1 ${payment.status === 'pending' ? 'text-amber-700' : 'text-green-700'}`}>
            {payment.status === 'pending'
              ? `Expected by ${payment.expectedDate}`
              : 'Credited to your bank account'
            }
          </p>
          <div className="mt-3 flex gap-3 text-sm">
            <div className="bg-white rounded-xl px-3 py-2 flex-1">
              <p className="text-xs text-stone-400 font-semibold">PAYMENT MODE</p>
              <p className="font-semibold text-stone-800">{payment.paymentMode}</p>
            </div>
            <div className="bg-white rounded-xl px-3 py-2 flex-1">
              <p className="text-xs text-stone-400 font-semibold">UPI ID</p>
              <p className="font-semibold text-stone-800 text-xs">{payment.upiId}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="font-bold text-stone-900 text-sm mb-3">Payment History</p>
          {[
            { date: 'Jul 15, 2026', buyer: 'Guntur APMC', amount: 19200, status: 'Paid' },
            { date: 'May 3, 2026', buyer: 'FreshLink Traders', amount: 16800, status: 'Paid' },
          ].map((h) => (
            <div key={h.date} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
              <div>
                <p className="text-sm font-semibold text-stone-700">{h.buyer}</p>
                <p className="text-xs text-stone-400">{h.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-stone-900">₹{h.amount.toLocaleString('en-IN')}</p>
                <span className="text-xs text-green-600 font-semibold">✓ {h.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
          <p className="font-semibold text-stone-700 text-sm mb-2">💬 Issue with payment?</p>
          <button className="w-full py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700">
            Report a Payment Issue
          </button>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  )
}
