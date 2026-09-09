import { useState } from 'react'
import type { NavProps } from '../types'
import { transportOptions } from '../data'

export default function TransportScreen({ navigate }: NavProps) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('buyers')} className="flex items-center gap-1 text-stone-500 text-sm font-semibold mb-2">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Arrange Transport
        </h1>
        <p className="text-sm text-stone-500">Pickup from Pedakurapadu → ABC Foods, Narasaraopet · 18 km</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
          <div className="flex gap-4 text-sm">
            <div><p className="text-xs text-stone-400 font-semibold">FROM</p><p className="font-semibold text-stone-800">Pedakurapadu, Guntur</p></div>
            <div className="text-stone-300 text-xl mt-2">→</div>
            <div><p className="text-xs text-stone-400 font-semibold">TO</p><p className="font-semibold text-stone-800">ABC Foods, Narasaraopet</p></div>
          </div>
          <div className="mt-2 flex gap-4 text-sm">
            <div><p className="text-xs text-stone-400 font-semibold">DISTANCE</p><p className="font-semibold">18 km</p></div>
            <div><p className="text-xs text-stone-400 font-semibold">LOAD</p><p className="font-semibold">1,000 kg tomatoes</p></div>
          </div>
        </div>

        <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider">Select Vehicle</p>

        <div className="space-y-3">
          {transportOptions.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => setSelected(i)}
              className={`w-full text-left rounded-2xl border transition-all p-4 ${
                selected === i ? 'border-amber-400 bg-amber-50 ring-1 ring-amber-400' : 'border-stone-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>🚚 {opt.type}</p>
                    {i === 2 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">FPO Offer</span>}
                  </div>
                  <p className="text-sm text-stone-500">{opt.capacity} · {opt.provider}</p>
                  {opt.note && <p className="text-xs text-amber-700 font-semibold mt-0.5">⚠️ {opt.note}</p>}
                  <p className="text-sm text-stone-600 mt-1.5">
                    <span className="font-semibold">Pickup:</span> {opt.pickup}
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-2xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{opt.cost.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-stone-400">₹{opt.costPerKg}/kg</p>
                </div>
              </div>
              {selected === i && (
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-amber-200 pt-3">
                  <div className="bg-white rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-stone-400 font-semibold">TRANSPORT COST</p>
                    <p className="font-bold text-red-600">−₹{opt.cost.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2 text-center">
                    <p className="text-xs text-stone-400 font-semibold">YOU EARN (est.)</p>
                    <p className="font-bold text-green-700">₹{(22800 - opt.cost + 1000).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-stone-900 rounded-2xl p-4">
          <p className="text-white font-bold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Driver Contact</p>
          <p className="text-stone-400 text-sm mt-1">You will receive driver details after confirming.</p>
          <div className="mt-3 bg-stone-800 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">👨‍✈️</span>
            <div>
              <p className="text-white font-semibold text-sm">Driver assigned after confirmation</p>
              <p className="text-stone-400 text-xs">You will get a call to confirm pickup time</p>
            </div>
          </div>
        </div>

        <div className="pb-4" />
      </div>

      <div className="px-4 pb-6 pt-3 bg-white border-t border-stone-100 space-y-2">
        <div className="flex justify-between text-sm font-semibold text-stone-600 px-1">
          <span>Selected: {transportOptions[selected].type}</span>
          <span>Cost: ₹{transportOptions[selected].cost.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={() => navigate('orderTracking')}
          className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-amber-100"
        >
          Confirm Transport →
        </button>
      </div>
    </div>
  )
}
