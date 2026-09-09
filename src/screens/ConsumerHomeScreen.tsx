import type { NavProps, Language } from '../types'

interface Listing {
  id: number; emoji: string; bg: string
  name: Record<Language, string>; price: number; qty: number
  farmer: string; verified: boolean; distance: number; hoursAgo: number
  grade: string; location: string
}

const listings: Listing[] = [
  { id: 1, emoji: '🌱', bg: '#DCFCE7', name: { en: 'Fresh Soybean',  hi: 'ताजा सोयाबीन', mr: 'ताजे सोयाबीन', te: 'తాజా సోయాబీన్' }, price: 65,  qty: 100, farmer: 'Rajesh Kumar', verified: true,  distance: 12, hoursAgo: 4,  grade: 'Premium', location: 'Akola' },
  { id: 2, emoji: '🍅', bg: '#FEE2E2', name: { en: 'Farm Tomatoes',  hi: 'खेत के टमाटर', mr: 'शेतातील टोमॅटो', te: 'పొలం టమాటాలు' }, price: 18,  qty: 500, farmer: 'Suresh Patil', verified: true,  distance: 23, hoursAgo: 20, grade: 'Grade A', location: 'Nashik' },
  { id: 3, emoji: '🧅', bg: '#FEF3C7', name: { en: 'Red Onion',      hi: 'लाल प्याज',    mr: 'लाल कांदा',   te: 'ఎరుపు ఉల్లిపాయ' }, price: 22,  qty: 300, farmer: 'Vinod Shinde', verified: false, distance: 31, hoursAgo: 48, grade: 'Grade B', location: 'Pune' },
  { id: 4, emoji: '🌶️', bg: '#DCFCE7', name: { en: 'Green Chili',   hi: 'हरी मिर्च',    mr: 'हिरवी मिरची', te: 'పచ్చి మిరప'   }, price: 95,  qty: 50,  farmer: 'Ramesh Yadav', verified: true,  distance: 8,  hoursAgo: 2,  grade: 'Premium', location: 'Nagpur' },
]

const filters: { key: string; en: string; hi: string; mr: string; te: string }[] = [
  { key: 'all',      en: '🌾 All',      hi: '🌾 सभी',    mr: '🌾 सर्व',    te: '🌾 అన్నీ' },
  { key: 'fresh',    en: '🌱 Fresh',    hi: '🌱 ताजा',    mr: '🌱 ताजे',    te: '🌱 తాజా' },
  { key: 'near',     en: '📍 Nearby',   hi: '📍 पास में', mr: '📍 जवळचे',  te: '📍 దగ్గర' },
  { key: 'verified', en: '✅ Verified', hi: '✅ जांचे',   mr: '✅ तपासले',  te: '✅ ధృవీకరించిన' },
]

const ui: Record<Language, Record<string, string>> = {
  en: { title: 'Fresh from nearby farms 🌱', sub: 'Order directly from verified farmers',
    km: 'km', hoursAgo: 'h ago', verified: '✅ Verified Farmer', view: 'View →', available: 'kg available',
    speak: 'Speak 🎤', notifications: '' },
  hi: { title: 'पास के खेत से ताजा 🌱', sub: 'सीधे किसान से मंगाओ',
    km: 'किमी', hoursAgo: 'घंटे पहले', verified: '✅ सत्यापित किसान', view: 'देखो →', available: 'किलो उपलब्ध',
    speak: 'बोलो 🎤', notifications: '' },
  mr: { title: 'जवळच्या शेतातून ताजे 🌱', sub: 'थेट शेतकऱ्याकडून मागवा',
    km: 'किमी', hoursAgo: 'तासांपूर्वी', verified: '✅ तपासलेला शेतकरी', view: 'पहा →', available: 'किलो उपलब्ध',
    speak: 'बोला 🎤', notifications: '' },
  te: { title: 'సమీప పొలాల నుండి తాజాగా 🌱', sub: 'నేరుగా రైతు నుండి ఆర్డర్ చేయండి',
    km: 'కిమీ', hoursAgo: 'గంటల క్రితం', verified: '✅ ధృవీకరించిన రైతు', view: 'చూడు →', available: 'కిలో అందుబాటులో',
    speak: 'మాట్లాడు 🎤', notifications: '' },
}

const filterLabel = (f: typeof filters[0], lang: Language) =>
  lang === 'hi' ? f.hi : lang === 'mr' ? f.mr : lang === 'te' ? f.te : f.en

export default function ConsumerHomeScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]

  return (
    <div className="flex flex-col" style={{ background: '#F4EFE4', minHeight: '100%' }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
            <p className="text-sm text-stone-500 mt-0.5">{l.sub}</p>
          </div>
          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
            <button className="h-10 px-3 bg-amber-500 rounded-full flex items-center gap-1.5 shadow-md shadow-amber-200 active:opacity-80">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              </svg>
              <span className="text-white text-xs font-bold">{l.speak}</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 relative active:opacity-80">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {filters.map((f, i) => (
            <button
              key={f.key}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-all active:scale-[0.97] ${i === 0 ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-stone-200'}`}
            >
              {filterLabel(f, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3">
        {listings.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate('produceDetail')}
            className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden text-left active:scale-[0.98] transition-transform"
          >
            {/* Produce image area */}
            <div className="flex items-center justify-center py-6" style={{ background: item.bg }}>
              <span style={{ fontSize: 72 }}>{item.emoji}</span>
            </div>

            <div className="px-4 py-3.5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-lg font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {item.name[lang]}
                  </p>
                  <p className="text-2xl font-black text-amber-600 mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{item.price}/kg
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-xs text-stone-400">{item.qty} {l.available}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.grade}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="space-y-0.5">
                  {item.verified && (
                    <p className="text-xs font-bold text-green-700">{l.verified}</p>
                  )}
                  <p className="text-xs text-stone-400">📍 {item.location} · {item.distance} {l.km}</p>
                  <p className="text-xs text-stone-400">📅 {item.hoursAgo} {l.hoursAgo}</p>
                </div>
                <div className="bg-green-700 text-white px-3 py-2 rounded-xl font-black text-sm flex-shrink-0">
                  {l.view}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
