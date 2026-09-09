import { useState } from 'react'
import type { NavProps, Language } from '../types'
import { recommendations } from '../data'

const t: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', buyer: 'BUYER', verified: 'VERIFIED',
    confirmTab: 'Confirm Deal', negotiateTab: 'Negotiate',
    receipt: 'DEAL RECEIPT',
    rowCrop: 'TOMATOES', rowQty: 'QUANTITY', rowPrice: 'PRICE PER KG',
    rowYouGet: 'YOU RECEIVE', rowPickup: 'PICKUP', rowPayment: 'PAYMENT',
    cropVal: 'Hybrid Roma', qtyVal: '1,000 KG', priceVal: '₹24.50',
    pickupVal: 'Tomorrow 8 AM', paymentVal: 'After delivery',
    receiptNote: '* Estimated. Actual may vary after weighing.',
    confirmBtn: 'CONFIRM DEAL', negotiateBtn: 'NEGOTIATE PRICE',
    rejectBtn: '✕ Reject — Find other buyers',
    yourPrice: 'YOUR PRICE', perKg: 'per kg',
    buyerOffers: 'BUYER OFFERS', yourAsk: 'YOUR ASK',
    counterNote: 'Buyer may accept, reject, or counter',
    sendCounter: '📨 SEND COUNTER OFFER →',
    backToReceipt: '← Back to Deal',
  },
  hi: {
    back: 'वापस', buyer: 'खरीदार', verified: 'सत्यापित',
    confirmTab: 'सौदा पक्का करें', negotiateTab: 'बातचीत करें',
    receipt: 'सौदे का कागज़',
    rowCrop: 'टमाटर', rowQty: 'मात्रा', rowPrice: 'भाव / किलो',
    rowYouGet: 'आपको मिलेगा', rowPickup: 'उठान', rowPayment: 'भुगतान',
    cropVal: 'हाइब्रिड रोमा', qtyVal: '1,000 किलो', priceVal: '₹24.50',
    pickupVal: 'कल सुबह 8 बजे', paymentVal: 'डिलीवरी के बाद',
    receiptNote: '* अनुमानित — तोलने के बाद बदल सकता है',
    confirmBtn: 'सौदा पक्का करें', negotiateBtn: '≈ भाव बदलें',
    rejectBtn: '✕ नहीं — दूसरे खरीदार देखें',
    yourPrice: 'आपका भाव', perKg: 'प्रति किलो',
    buyerOffers: 'खरीदार का भाव', yourAsk: 'आपकी मांग',
    counterNote: 'खरीदार हां/ना कर सकता है',
    sendCounter: '📨 भाव भेजो →',
    backToReceipt: '← वापस जाओ',
  },
  mr: {
    back: 'मागे', buyer: 'खरेदीदार', verified: 'तपासलेला',
    confirmTab: 'सौदा मान्य करा', negotiateTab: 'बोलणी करा',
    receipt: 'सौद्याचा कागद',
    rowCrop: 'टोमॅटो', rowQty: 'प्रमाण', rowPrice: 'भाव / किलो',
    rowYouGet: 'तुम्हाला मिळेल', rowPickup: 'उचल', rowPayment: 'पैसे',
    cropVal: 'हायब्रिड रोमा', qtyVal: '1,000 किलो', priceVal: '₹24.50',
    pickupVal: 'उद्या सकाळी 8 वाजता', paymentVal: 'डिलिव्हरीनंतर',
    receiptNote: '* अंदाजे — वजनानंतर बदलू शकतो',
    confirmBtn: 'सौदा मान्य करा', negotiateBtn: '≈ भाव बदला',
    rejectBtn: '✕ नको — दुसरे खरेदीदार पहा',
    yourPrice: 'तुमचा भाव', perKg: 'प्रति किलो',
    buyerOffers: 'खरेदीदाराचा भाव', yourAsk: 'तुमची मागणी',
    counterNote: 'खरेदीदार हो/नाही करू शकतो',
    sendCounter: '📨 भाव पाठवा →',
    backToReceipt: '← मागे जा',
  },
  te: {
    back: 'వెనుక', buyer: 'కొనుగోలుదారు', verified: 'ధృవీకరించిన',
    confirmTab: 'డీల్ ఖరారు', negotiateTab: 'బేరం చేయి',
    receipt: 'డీల్ రశీదు',
    rowCrop: 'టమాటాలు', rowQty: 'పరిమాణం', rowPrice: 'ధర / కిలో',
    rowYouGet: 'మీకు వస్తుంది', rowPickup: 'పికప్', rowPayment: 'చెల్లింపు',
    cropVal: 'హైబ్రిడ్ రోమా', qtyVal: '1,000 కిలో', priceVal: '₹24.50',
    pickupVal: 'రేపు ఉదయం 8 గంటలకు', paymentVal: 'డెలివరీ తర్వాత',
    receiptNote: '* అంచనా — తూకం తర్వాత మారవచ్చు',
    confirmBtn: 'డీల్ ఖరారు', negotiateBtn: '≈ ధర మార్చు',
    rejectBtn: '✕ వద్దు — మిగతా కొనుగోలుదారులు చూడు',
    yourPrice: 'మీ ధర', perKg: 'కిలోకు',
    buyerOffers: 'కొనుగోలుదారు ధర', yourAsk: 'మీ అడుగు',
    counterNote: 'కొనుగోలుదారు అంగీకరించవచ్చు లేదా తిరస్కరించవచ్చు',
    sendCounter: '📨 ధర పంపు →',
    backToReceipt: '← వెనక్కి',
  },
}

export default function NegotiationScreen({ navigate, lang = 'en' }: NavProps) {
  const rec = recommendations[0]
  const [mode, setMode] = useState<'confirm' | 'counter'>('confirm')
  const [counterPrice, setCounterPrice] = useState(24.5)
  const l = t[lang]

  const qty = 1000
  const transport = 1000
  const loading = 200
  const calcNet = (price: number) => Math.round(qty * price - transport - loading)
  const acceptNet = calcNet(24.5)
  const counterNet = calcNet(counterPrice)

  const receiptRows = [
    { emoji: '🍅', key: 'rowCrop',    value: l.cropVal },
    { emoji: '📦', key: 'rowQty',     value: l.qtyVal },
    { emoji: '💰', key: 'rowPrice',   value: l.priceVal },
    { emoji: '💵', key: 'rowYouGet',  value: `₹${acceptNet.toLocaleString('en-IN')}`, large: true },
    { emoji: '🚚', key: 'rowPickup',  value: l.pickupVal },
    { emoji: '💳', key: 'rowPayment', value: l.paymentVal },
  ]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-green-800 px-4 pt-10 pb-5">
        <button onClick={() => navigate('bestOptions')} className="flex items-center gap-2 text-green-300 text-base font-bold mb-4 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">👤</div>
          <div>
            <p className="text-xs text-green-400 font-black uppercase tracking-wide">{l.buyer}</p>
            <p className="text-xl font-black text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{rec.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">✅ {l.verified}</span>
              <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">🚚 {rec.distance} km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-4">
        <div className="flex bg-stone-200 rounded-2xl p-1">
          {[
            { id: 'confirm', emoji: '✓', label: l.confirmTab },
            { id: 'counter', emoji: '≈', label: l.negotiateTab },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as 'confirm' | 'counter')}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${mode === m.id ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {mode === 'confirm' && (
          <>
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="bg-stone-900 px-5 py-4 text-center">
                <p className="text-white/60 text-xs font-black uppercase tracking-widest">{l.receipt}</p>
                <p className="text-white font-black text-lg mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{rec.name}</p>
              </div>
              <div className="divide-y divide-stone-100">
                {receiptRows.map((row) => (
                  <div key={row.key} className={`flex items-center gap-4 px-5 ${row.large ? 'py-4 bg-amber-50' : 'py-3.5'}`}>
                    <span style={{ fontSize: row.large ? 36 : 28 }}>{row.emoji}</span>
                    <div className="flex-1">
                      <p className={`font-black leading-tight ${row.large ? 'text-base text-stone-900' : 'text-sm text-stone-700'}`}>{l[row.key]}</p>
                    </div>
                    <p className={`font-black text-right leading-tight ${row.large ? 'text-2xl text-amber-600' : 'text-base text-stone-900'}`}
                       style={row.large ? { fontFamily: 'Outfit, sans-serif' } : {}}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-stone-50 border-t border-stone-100">
                <p className="text-xs text-stone-400 text-center">{l.receiptNote}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('paymentSecured')}
              className="w-full rounded-3xl overflow-hidden active:scale-[0.98] transition-transform shadow-xl shadow-green-300"
              style={{ background: 'linear-gradient(135deg, #14532d 0%, #15803d 100%)', minHeight: 96 }}
            >
              <div className="flex items-center justify-center gap-4 h-full px-6 py-5">
                <span style={{ fontSize: 44 }}>🤝</span>
                <div className="text-left">
                  <p className="text-white font-black leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26 }}>{l.confirmBtn}</p>
                </div>
                <span className="text-white text-3xl ml-auto">→</span>
              </div>
            </button>

            <button onClick={() => setMode('counter')} className="w-full py-4 bg-white border-2 border-stone-300 text-stone-700 rounded-2xl font-black text-base active:opacity-80">
              {l.negotiateBtn}
            </button>

            <button onClick={() => navigate('bestOptions')} className="w-full py-3.5 text-stone-500 font-bold text-base active:opacity-60">
              {l.rejectBtn}
            </button>
          </>
        )}

        {mode === 'counter' && (
          <>
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="bg-stone-800 px-5 py-4 text-center">
                <p className="text-white/60 text-xs font-black uppercase tracking-widest">{l.yourPrice}</p>
              </div>
              <div className="px-5 py-6 flex flex-col items-center">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setCounterPrice((p) => Math.max(22, +(p - 0.5).toFixed(1)))}
                    className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center border-2 border-stone-200 active:bg-stone-200 transition-colors"
                    style={{ fontSize: 32 }}
                  >−</button>
                  <div className="text-center min-w-[120px]">
                    <p className="font-black text-stone-900 leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 64 }}>
                      ₹{counterPrice.toFixed(1)}
                    </p>
                    <p className="text-sm text-stone-400 font-semibold mt-1">{l.perKg}</p>
                  </div>
                  <button
                    onClick={() => setCounterPrice((p) => Math.min(27, +(p + 0.5).toFixed(1)))}
                    className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center active:bg-green-800 transition-colors"
                    style={{ fontSize: 32, color: 'white' }}
                  >+</button>
                </div>
                <div className="mt-5 w-full grid grid-cols-2 gap-3">
                  <div className="bg-stone-50 rounded-2xl px-3 py-3 text-center border border-stone-200">
                    <p className="text-xs text-stone-400 font-black">{l.buyerOffers}</p>
                    <p className="text-xl font-black text-stone-700 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>₹24.50</p>
                    <p className="text-xs text-green-700 font-bold">₹{calcNet(24.5).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-amber-50 rounded-2xl px-3 py-3 text-center border border-amber-200">
                    <p className="text-xs text-amber-600 font-black">{l.yourAsk}</p>
                    <p className="text-xl font-black text-stone-900 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{counterPrice.toFixed(1)}</p>
                    <p className="text-xs text-green-700 font-bold">₹{counterNet.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <p className="text-xs text-stone-400 mt-3 text-center">{l.counterNote}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('paymentSecured')}
              className="w-full py-5 bg-amber-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-amber-200 active:scale-[0.98] transition-transform"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {l.sendCounter}
            </button>
            <button onClick={() => setMode('confirm')} className="w-full py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-2xl font-bold active:opacity-80">
              {l.backToReceipt}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
