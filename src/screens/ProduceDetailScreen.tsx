import { useState } from 'react'
import type { NavProps, Language } from '../types'

const ui: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', title: 'Farm-Fresh Soybean', available: 'Available',
    farmer: 'Farmer', location: 'Location', harvested: 'Harvested',
    grade: 'Quality', verified: '✅ Verified Farmer',
    desc: 'Freshly harvested premium soybean. No chemical fertilizers used in the last 30 days. Ideal for home use and small businesses.',
    qty: 'Quantity (kg)', addCart: '🛒 Add to Cart', buyNow: '🌱 Buy Now →',
    farmerProfile: '👨‍🌾 View Farmer',
    note: '* Prices and availability subject to change. Not certified organic unless stated.',
    perKg: '/kg',
  },
  hi: {
    back: 'वापस', title: 'ताजा सोयाबीन', available: 'उपलब्ध',
    farmer: 'किसान', location: 'जगह', harvested: 'कटाई',
    grade: 'क्वालिटी', verified: '✅ सत्यापित किसान',
    desc: 'ताजी कटाई का प्रीमियम सोयाबीन। पिछले 30 दिनों में रासायनिक खाद नहीं।',
    qty: 'मात्रा (किलो)', addCart: '🛒 कार्ट में डालो', buyNow: '🌱 अभी खरीदो →',
    farmerProfile: '👨‍🌾 किसान देखो',
    note: '* भाव और मात्रा बदल सकते हैं। जब तक न लिखा हो, ऑर्गेनिक नहीं।',
    perKg: '/किलो',
  },
  mr: {
    back: 'मागे', title: 'ताजे सोयाबीन', available: 'उपलब्ध',
    farmer: 'शेतकरी', location: 'ठिकाण', harvested: 'कापणी',
    grade: 'दर्जा', verified: '✅ तपासलेला शेतकरी',
    desc: 'नुकत्याच काढलेल्या उत्तम दर्जाचे सोयाबीन। गेल्या 30 दिवसांत रासायनिक खत नाही.',
    qty: 'प्रमाण (किलो)', addCart: '🛒 कार्टमध्ये टाका', buyNow: '🌱 आता खरेदी करा →',
    farmerProfile: '👨‍🌾 शेतकरी पहा',
    note: '* भाव आणि उपलब्धता बदलू शकते. सेंद्रिय असेल तरच लिहिले जाईल.',
    perKg: '/किलो',
  },
  te: {
    back: 'వెనుక', title: 'తాజా సోయాబీన్', available: 'అందుబాటులో',
    farmer: 'రైతు', location: 'స్థానం', harvested: 'పంట కోత',
    grade: 'నాణ్యత', verified: '✅ ధృవీకరించిన రైతు',
    desc: 'తాజాగా కోసిన ప్రీమియం సోయాబీన్. గత 30 రోజులలో రసాయన ఎరువులు వాడలేదు.',
    qty: 'పరిమాణం (కిలో)', addCart: '🛒 కార్ట్‌కు జోడించు', buyNow: '🌱 ఇప్పుడే కొనండి →',
    farmerProfile: '👨‍🌾 రైతు చూడు',
    note: '* ధరలు మరియు లభ్యత మారవచ్చు. సేంద్రీయం అని పేర్కొనబడిన తర్వాతే.',
    perKg: '/కిలో',
  },
}

export default function ProduceDetailScreen({ navigate, lang = 'en' }: NavProps) {
  const [qty, setQty] = useState(5)
  const l = ui[lang]
  const price = 65

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      {/* Hero */}
      <div className="relative bg-green-800 px-4 pt-10 pb-6">
        <button onClick={() => navigate('consumerHome')} className="flex items-center gap-2 text-green-300 font-bold mb-4 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-green-700 rounded-3xl flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 56 }}>🌱</span>
          </div>
          <div className="flex-1">
            <p className="text-green-400 text-xs font-black uppercase tracking-wide mb-1">🌾 Farm Fresh</p>
            <h1 className="text-xl font-black text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
            <p className="text-3xl font-black text-amber-400 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ₹{price}{l.perKg}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4 space-y-3">
        {/* Key details */}
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
          {[
            { emoji: '📦', label: l.available, val: '100 kg' },
            { emoji: '📅', label: l.harvested,  val: 'Today' },
            { emoji: '⭐', label: l.grade,      val: 'Premium' },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-4 px-4 py-3.5">
              <span style={{ fontSize: 24 }}>{row.emoji}</span>
              <p className="flex-1 text-sm text-stone-500">{row.label}</p>
              <p className="font-black text-stone-900">{row.val}</p>
            </div>
          ))}
        </div>

        {/* Farmer */}
        <button
          onClick={() => navigate('farmerPublicProfile')}
          className="w-full bg-white rounded-2xl border border-stone-200 px-4 py-3.5 flex items-center gap-4 text-left active:opacity-80"
        >
          <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 28 }}>👨‍🌾</span>
          </div>
          <div className="flex-1">
            <p className="text-xs text-stone-400 font-black uppercase">{l.farmer}</p>
            <p className="font-black text-stone-900">Rajesh Kumar</p>
            <p className="text-xs text-green-700 font-bold mt-0.5">{l.verified}</p>
            <p className="text-xs text-stone-400">📍 Akola · 12 km</p>
          </div>
          <span className="text-stone-400 text-xl">›</span>
        </button>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
          <p className="text-sm text-stone-700 leading-relaxed">{l.desc}</p>
          <p className="text-xs text-stone-400 mt-2">{l.note}</p>
        </div>

        {/* Qty selector */}
        <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">{l.qty}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-2xl font-black active:bg-stone-200"
            >−</button>
            <p className="text-4xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{qty}</p>
            <button
              onClick={() => setQty(q => Math.min(100, q + 1))}
              className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center text-2xl font-black text-white active:bg-green-800"
            >+</button>
          </div>
          <p className="text-center text-sm text-stone-400 mt-2">= ₹{(qty * price).toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-4 pb-8 pt-2 bg-white border-t border-stone-100 space-y-2">
        <button
          onClick={() => navigate('cart')}
          className="w-full py-4 bg-green-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {l.buyNow}
        </button>
        <button
          onClick={() => navigate('cart')}
          className="w-full py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-2xl font-black text-base active:opacity-80"
        >
          {l.addCart}
        </button>
      </div>
    </div>
  )
}
