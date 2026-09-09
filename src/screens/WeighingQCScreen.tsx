import { useState } from 'react'
import type { NavProps } from '../types'
import { qcData } from '../data'

export default function WeighingQCScreen({ navigate }: NavProps) {
  const [approved, setApproved] = useState(false)
  const diff = qcData.actualQty - qcData.agreedQty

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('orderTracking')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Weighing & Quality Check
        </h1>
        <p className="text-sm text-stone-500">ABC Foods Pvt Ltd · Sep 7, 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-stone-400 font-bold uppercase">Agreed Weight</p>
            <p className="text-3xl font-bold text-stone-800 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>1,000</p>
            <p className="text-sm text-stone-500 font-semibold">kg</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-green-600 font-bold uppercase">Actual Weight</p>
            <p className="text-3xl font-bold text-green-800 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>980</p>
            <p className="text-sm text-green-600 font-semibold">kg</p>
          </div>
        </div>

        {diff !== 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <p className="text-sm font-bold text-amber-800">
              ⚖️ Weight difference: {Math.abs(diff)} kg {diff < 0 ? 'less' : 'more'} than agreed
            </p>
            <p className="text-xs text-amber-700 mt-1">{qcData.buyerNotes}</p>
          </div>
        )}

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-3">Quality Assessment</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Agreed Grade', val: qcData.agreedQuality, ok: true },
              { label: 'Actual Grade', val: qcData.actualQuality, ok: true },
              { label: 'Colour', val: 'Uniform red', ok: true },
              { label: 'Damage', val: 'Minimal (<2%)', ok: true },
            ].map((row) => (
              <div key={row.label} className="bg-stone-50 rounded-xl px-3 py-2.5">
                <p className="text-xs text-stone-400 font-semibold">{row.label}</p>
                <p className={`text-sm font-bold mt-0.5 ${row.ok ? 'text-green-700' : 'text-red-600'}`}>
                  {row.ok && '✓ '}{row.val}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-3">Revised Payment</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">980 kg × ₹24/kg</span>
              <span className="font-semibold text-stone-800">₹{qcData.grossActual.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Transport</span>
              <span className="font-semibold text-red-600">−₹{qcData.transport.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Loading</span>
              <span className="font-semibold text-red-600">−₹{qcData.loading}</span>
            </div>
            <div className="border-t border-stone-100 pt-2 flex justify-between">
              <span className="font-bold text-stone-900">Net Receivable</span>
              <span className="font-bold text-green-700 text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{qcData.netFinal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {!approved ? (
          <div className="space-y-3 pb-4">
            <button
              onClick={() => setApproved(true)}
              className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base shadow-sm shadow-green-200"
            >
              ✓ Approve QC — Confirm ₹{qcData.netFinal.toLocaleString('en-IN')}
            </button>
            <button
              onClick={() => navigate('feedback')}
              className="w-full py-3.5 bg-white border-2 border-red-400 text-red-600 rounded-2xl font-bold text-base"
            >
              Raise Issue with Weight or Quality
            </button>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-4 text-center">
              <p className="text-2xl mb-1">✅</p>
              <p className="font-bold text-green-800" style={{ fontFamily: 'Outfit, sans-serif' }}>QC Approved!</p>
              <p className="text-sm text-green-700 mt-1">Payment of ₹{qcData.netFinal.toLocaleString('en-IN')} will be released within 24 hours.</p>
            </div>
            <button
              onClick={() => navigate('finalReceipt')}
              className="w-full py-4 bg-green-700 text-white rounded-2xl font-bold text-base"
            >
              View Final Receipt →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
