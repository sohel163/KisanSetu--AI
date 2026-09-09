import { useState } from 'react'
import type { NavProps } from '../types'
import { orderStatus } from '../data'

const disputeTypes = [
  { id: 'payment', icon: '💰', label: 'Payment Issue', desc: 'Late payment or wrong amount' },
  { id: 'quality', icon: '🍅', label: 'Quality Dispute', desc: 'Buyer rejected or downgraded quality' },
  { id: 'weight', icon: '⚖️', label: 'Weight / Quantity', desc: 'Wrong weight measurement' },
  { id: 'delivery', icon: '🚚', label: 'Delivery Issue', desc: 'Pickup was late or cancelled' },
]

export default function FeedbackScreen({ navigate }: NavProps) {
  const [overallRating, setOverallRating] = useState(0)
  const [buyerRating, setBuyerRating] = useState(0)
  const [hasIssue, setHasIssue] = useState<boolean | null>(null)
  const [disputeType, setDisputeType] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Thank You, Ramu Rao!
        </h2>
        <p className="text-stone-500 text-sm leading-relaxed mb-2">
          Your feedback has been submitted. {disputeType ? 'Our team will review your dispute within 24 hours.' : 'Your rating helps other farmers choose trusted buyers.'}
        </p>
        {disputeType && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mt-2 mb-6 w-full">
            <p className="text-amber-800 font-semibold text-sm">Dispute ID: DIS-2026-0031</p>
            <p className="text-amber-700 text-xs mt-1">Status: Under Review · Expected resolution: Sep 10, 2026</p>
          </div>
        )}
        <button
          onClick={() => navigate('home')}
          className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const StarRow = ({ rating, setRating, label }: { rating: number; setRating: (r: number) => void; label: string }) => (
    <div>
      <p className="text-sm font-bold text-stone-700 mb-2">{label}</p>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setRating(s)}
            className={`text-3xl transition-transform active:scale-90 ${s <= rating ? 'opacity-100' : 'opacity-30'}`}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('orderTracking')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Feedback & Dispute
        </h1>
        <p className="text-sm text-stone-500">{orderStatus.buyer} · {orderStatus.id}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4 space-y-4 shadow-sm">
          <StarRow rating={overallRating} setRating={setOverallRating} label="How was your overall experience?" />
          <StarRow rating={buyerRating} setRating={setBuyerRating} label={`Rate ${orderStatus.buyer}`} />
        </div>

        <div>
          <p className="text-sm font-bold text-stone-700 mb-2">Did you face any issues?</p>
          <div className="flex gap-3">
            {[{ v: false, label: '✅ No issues', sub: 'Everything went well' }, { v: true, label: '⚠️ Yes, I have an issue', sub: 'File a dispute' }].map((opt) => (
              <button
                key={String(opt.v)}
                onClick={() => { setHasIssue(opt.v); if (!opt.v) setDisputeType(null) }}
                className={`flex-1 py-3 px-3 rounded-xl border transition-all text-left ${
                  hasIssue === opt.v ? (opt.v ? 'bg-red-50 border-red-400 ring-1 ring-red-400' : 'bg-green-50 border-green-400 ring-1 ring-green-400') : 'bg-white border-stone-200'
                }`}
              >
                <p className="font-bold text-sm text-stone-900">{opt.label}</p>
                <p className="text-xs text-stone-500 mt-0.5">{opt.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {hasIssue === true && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-stone-700">Select dispute type</p>
            <div className="space-y-2">
              {disputeTypes.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDisputeType(d.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    disputeType === d.id ? 'bg-red-50 border-red-400 ring-1 ring-red-400' : 'bg-white border-stone-200'
                  }`}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <p className={`font-semibold text-sm ${disputeType === d.id ? 'text-red-700' : 'text-stone-800'}`}>{d.label}</p>
                    <p className="text-xs text-stone-500">{d.desc}</p>
                  </div>
                  {disputeType === d.id && <span className="ml-auto text-red-600 font-bold">✓</span>}
                </button>
              ))}
            </div>

            {disputeType && (
              <>
                <div>
                  <p className="text-sm font-bold text-stone-700 mb-2">Describe the issue</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us what happened in your own words..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm outline-none focus:border-amber-400 resize-none"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-700 mb-2">Add evidence (optional)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Weight slip', 'Produce photo', 'Other document'].map((label) => (
                      <button key={label} className="aspect-square bg-white border-2 border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center gap-1">
                        <span className="text-xl">📎</span>
                        <span className="text-xs text-stone-400 font-semibold text-center leading-tight px-1">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {hasIssue === false && (
          <div>
            <p className="text-sm font-bold text-stone-700 mb-2">Any comments? (optional)</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience to help other farmers..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-sm outline-none focus:border-amber-400 resize-none"
            />
          </div>
        )}

        <div className="space-y-3 pb-4">
          <button
            onClick={() => setSubmitted(true)}
            disabled={overallRating === 0}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
              overallRating > 0
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-100'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
          >
            {hasIssue ? 'Submit Feedback & Dispute' : 'Submit Feedback'}
          </button>
          {overallRating === 0 && (
            <p className="text-center text-xs text-stone-400">Please rate your experience to continue</p>
          )}
        </div>
      </div>
    </div>
  )
}
