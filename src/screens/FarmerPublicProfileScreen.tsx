import type { NavProps, Language } from '../types'

const ui: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', farmerLabel: 'FARMER',
    verified: 'Verified Farmer', memberSince: 'Member Since',
    listingsLabel: 'Listings', ordersLabel: 'Completed Orders', cropsLabel: 'Crops Grown',
    evidenceTitle: 'Track Record',
    ev1: 'IDENTITY VERIFIED', ev2: 'ORDERS DONE', ev3: 'ACTIVE LISTINGS',
    ev4: 'MEMBER SINCE', ev5: 'CROPS',
    disclaimer: 'Verification shows documented evidence — not a guarantee.',
    listings: 'View All Listings →',
    recentLabel: 'Recent Harvests',
  },
  hi: {
    back: 'वापस', farmerLabel: 'किसान',
    verified: 'सत्यापित किसान', memberSince: 'सदस्य बने',
    listingsLabel: 'लिस्टिंग', ordersLabel: 'पूरे ऑर्डर', cropsLabel: 'फसलें',
    evidenceTitle: 'रिकॉर्ड',
    ev1: 'पहचान जांची', ev2: 'पूरे ऑर्डर', ev3: 'लिस्टिंग',
    ev4: 'सदस्य बने', ev5: 'फसलें',
    disclaimer: 'यह सत्यापन उपलब्ध सबूत दिखाता है — गारंटी नहीं।',
    listings: 'सभी लिस्टिंग देखो →',
    recentLabel: 'हाल की फसलें',
  },
  mr: {
    back: 'मागे', farmerLabel: 'शेतकरी',
    verified: 'तपासलेला शेतकरी', memberSince: 'सदस्य झाले',
    listingsLabel: 'यादी', ordersLabel: 'पूर्ण ऑर्डर', cropsLabel: 'पिके',
    evidenceTitle: 'नोंदी',
    ev1: 'ओळख तपासली', ev2: 'पूर्ण ऑर्डर', ev3: 'यादी',
    ev4: 'सदस्य झाले', ev5: 'पिके',
    disclaimer: 'हे उपलब्ध पुरावे दाखवते — हमी नाही.',
    listings: 'सर्व यादी पहा →',
    recentLabel: 'अलीकडील पिके',
  },
  te: {
    back: 'వెనుక', farmerLabel: 'రైతు',
    verified: 'ధృవీకరించిన రైతు', memberSince: 'సభ్యుడు అయిన',
    listingsLabel: 'లిస్టింగ్‌లు', ordersLabel: 'పూర్తయిన ఆర్డర్లు', cropsLabel: 'పంటలు',
    evidenceTitle: 'రికార్డు',
    ev1: 'గుర్తింపు ధృవీకరించిన', ev2: 'పూర్తయిన ఆర్డర్లు', ev3: 'లిస్టింగ్‌లు',
    ev4: 'సభ్యుడు అయిన', ev5: 'పంటలు',
    disclaimer: 'అందుబాటులో ఉన్న ఆధారాలు చూపిస్తుంది — హామీ కాదు.',
    listings: 'అన్ని లిస్టింగ్‌లు చూడు →',
    recentLabel: 'ఇటీవలి పంటలు',
  },
}

const recentHarvests = [
  { emoji: '🌱', name: 'Soybean', price: 65, hoursAgo: 4 },
  { emoji: '🍅', name: 'Tomato',  price: 18, hoursAgo: 26 },
]

export default function FarmerPublicProfileScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      {/* Header */}
      <div className="bg-green-800 px-4 pt-10 pb-6">
        <button onClick={() => navigate('produceDetail')} className="flex items-center gap-2 text-green-300 font-bold mb-4 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center flex-shrink-0">
            <span style={{ fontSize: 44 }}>👨‍🌾</span>
          </div>
          <div className="flex-1">
            <p className="text-green-400 text-xs font-black uppercase mb-1">{l.farmerLabel}</p>
            <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Rajesh Kumar</h1>
            <p className="text-green-300 text-sm mt-1">📍 Akola, Maharashtra · 12 km</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-700 rounded-xl">
              <span className="text-white text-sm">✅</span>
              <p className="text-white text-sm font-black">{l.verified}</p>
            </div>
          </div>
        </div>
        <p className="text-green-400 text-xs mt-3">ⓘ {l.disclaimer}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-6">
        {/* 3 key stats */}
        <div className="flex gap-2">
          {[
            { emoji: '📦', val: '37+', label: l.ordersLabel },
            { emoji: '🌾', val: '3',   label: l.listingsLabel },
            { emoji: '📅', val: '2021', label: l.memberSince },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 bg-white rounded-2xl border border-stone-200 px-3 py-3 flex flex-col items-center text-center gap-1">
              <span style={{ fontSize: 28 }}>{stat.emoji}</span>
              <p className="text-xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.val}</p>
              <p className="text-xs text-stone-500 font-bold leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent harvests */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">{l.recentLabel}</p>
          <div className="space-y-2">
            {recentHarvests.map((h) => (
              <button
                key={h.name}
                onClick={() => navigate('produceDetail')}
                className="w-full bg-white rounded-2xl border border-stone-200 px-4 py-3.5 flex items-center gap-4 text-left active:opacity-80"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span style={{ fontSize: 28 }}>{h.emoji}</span>
                </div>
                <div className="flex-1">
                  <p className="font-black text-stone-900">{h.name}</p>
                  <p className="text-xs text-stone-400">{h.hoursAgo}h ago</p>
                </div>
                <p className="font-black text-amber-600">₹{h.price}/kg</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('consumerHome')}
          className="w-full py-4 bg-green-700 text-white rounded-2xl font-black text-base shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {l.listings}
        </button>
      </div>
    </div>
  )
}
