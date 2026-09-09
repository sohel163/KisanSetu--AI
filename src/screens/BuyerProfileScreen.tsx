import type { NavProps, Language } from '../types'
import { buyerProfile } from '../data'

const t: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', buyerLabel: 'BUYER',
    established: 'Established Buyer', known: 'Known Buyer', newVerified: 'New — Verified',
    dealsLabel: 'deals done', paysLabel: 'pays on time', verifiedLabel: 'Identity verified',
    offerTitle: 'CURRENT OFFER',
    reviewsTitle: 'Farmers Say',
    disclaimer: 'This shows available evidence — not a guarantee.',
    negotiate: '🤝 Negotiate / Accept →',
    compareBuyers: '← Compare All Buyers',
  },
  hi: {
    back: 'वापस', buyerLabel: 'खरीदार',
    established: 'अनुभवी खरीदार', known: 'जाना-पहचाना खरीदार', newVerified: 'नया — सत्यापित',
    dealsLabel: 'सौदे', paysLabel: 'समय पर पैसे', verifiedLabel: 'पहचान जांची',
    offerTitle: 'मौजूदा भाव',
    reviewsTitle: 'किसान कहते हैं',
    disclaimer: 'यह उपलब्ध सबूत दिखाता है — गारंटी नहीं।',
    negotiate: '🤝 बातचीत / हाँ करो →',
    compareBuyers: '← सभी खरीदार देखें',
  },
  mr: {
    back: 'मागे', buyerLabel: 'खरेदीदार',
    established: 'अनुभवी खरेदीदार', known: 'ओळखीचा खरेदीदार', newVerified: 'नवीन — तपासलेला',
    dealsLabel: 'सौदे', paysLabel: 'वेळेत पैसे', verifiedLabel: 'ओळख तपासली',
    offerTitle: 'सध्याचा भाव',
    reviewsTitle: 'शेतकरी काय म्हणतात',
    disclaimer: 'हे उपलब्ध पुरावे दाखवते — हमी नाही.',
    negotiate: '🤝 बोलणी / मान्य करा →',
    compareBuyers: '← सर्व खरेदीदार पहा',
  },
  te: {
    back: 'వెనుక', buyerLabel: 'కొనుగోలుదారు',
    established: 'అనుభవజ్ఞుడైన కొనుగోలుదారు', known: 'పరిచిత కొనుగోలుదారు', newVerified: 'కొత్త — ధృవీకరించిన',
    dealsLabel: 'డీల్స్', paysLabel: 'సమయానికి పైసలు', verifiedLabel: 'గుర్తింపు ధృవీకరించిన',
    offerTitle: 'ప్రస్తుత ఆఫర్',
    reviewsTitle: 'రైతులు చెప్పేది',
    disclaimer: 'అందుబాటులో ఉన్న ఆధారాలు చూపిస్తుంది — హామీ కాదు.',
    negotiate: '🤝 బేరం / అంగీకరించు →',
    compareBuyers: '← అందరు కొనుగోలుదారులు',
  },
}

export default function BuyerProfileScreen({ navigate, lang = 'en' }: NavProps) {
  const bp = buyerProfile
  const l = t[lang]

  const trust = bp.completedDeals >= 100
    ? { label: l.established, color: 'bg-green-700' }
    : bp.completedDeals >= 20
    ? { label: l.known,       color: 'bg-blue-600' }
    : { label: l.newVerified, color: 'bg-amber-500' }

  const badges = [
    { emoji: '✅', value: l.verifiedLabel },
    { emoji: '🤝', value: `${bp.completedDeals}+ ${l.dealsLabel}` },
    { emoji: '💳', value: `${bp.paymentReliability}% ${l.paysLabel}` },
  ]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-green-800 px-4 pt-10 pb-6">
        <button onClick={() => navigate('buyers')} className="flex items-center gap-2 text-green-300 text-base font-bold mb-4 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 44 }}>👤</span>
          </div>
          <div className="flex-1">
            <p className="text-green-400 text-xs font-black uppercase mb-1">{l.buyerLabel}</p>
            <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{bp.name}</h1>
            <p className="text-green-300 text-sm mt-1">📍 {bp.location} · {bp.distance} km</p>
            <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${trust.color}`}>
              <span className="text-white text-sm">✅</span>
              <p className="font-black text-sm text-white">{trust.label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-6">

        {/* 3 key badges */}
        <div className="flex gap-2">
          {badges.map((b) => (
            <div key={b.value} className="flex-1 bg-white rounded-2xl border border-stone-200 px-3 py-3 flex flex-col items-center text-center gap-1">
              <span style={{ fontSize: 28 }}>{b.emoji}</span>
              <p className="text-xs font-bold text-stone-700 leading-tight">{b.value}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-stone-400 text-center px-2">ⓘ {l.disclaimer}</p>

        {/* Offer */}
        <div className="bg-amber-500 rounded-2xl px-5 py-4">
          <p className="text-white/70 text-xs font-black uppercase tracking-widest mb-2">{l.offerTitle}</p>
          <p className="text-white font-black leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44 }}>
            ₹{bp.currentOffer}/kg
          </p>
          <p className="text-amber-100 text-sm mt-1">1,000 kg · <span className="font-black text-white">₹22,800</span></p>
        </div>

        {/* Reviews */}
        <div>
          <p className="text-sm font-black text-stone-600 mb-2">{l.reviewsTitle}</p>
          <div className="space-y-2">
            {bp.recentReviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: 22 }}>👨‍🌾</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-stone-900">{r.farmer}</p>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <span key={s} className={`text-sm ${s <= r.rating ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-400">{r.village}</p>
                    <p className="text-sm text-stone-700 mt-1.5 leading-relaxed">"{r.text}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => navigate('negotiation')}
            className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {l.negotiate}
          </button>
          <button onClick={() => navigate('bestOptions')} className="w-full py-4 bg-white border-2 border-stone-200 text-stone-700 rounded-2xl font-bold text-base active:opacity-80">
            {l.compareBuyers}
          </button>
        </div>
      </div>
    </div>
  )
}
