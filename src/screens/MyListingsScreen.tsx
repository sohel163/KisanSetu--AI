import type { NavProps, Language } from '../types'

interface Listing {
  id: number; emoji: string; name: Record<Language, string>
  price: number; qty: number; orders: number
  status: 'active' | 'paused' | 'lowstock' | 'soldout'
}

const listings: Listing[] = [
  { id: 1, emoji: '🌱', name: { en: 'Soybean', hi: 'सोयाबीन', mr: 'सोयाबीन', te: 'సోయాబీన్' }, price: 65, qty: 100, orders: 12, status: 'active' },
  { id: 2, emoji: '🍅', name: { en: 'Tomato',  hi: 'टमाटर',  mr: 'टोमॅटो',  te: 'టమాటా'  }, price: 18, qty: 8,   orders: 5,  status: 'lowstock' },
  { id: 3, emoji: '🧅', name: { en: 'Onion',   hi: 'प्याज',   mr: 'कांदा',   te: 'ఉల్లిపాయ' }, price: 22, qty: 0,   orders: 20, status: 'soldout' },
]

const ui: Record<Language, Record<string, string>> = {
  en: { back: 'Back', title: 'My Listings', addListing: '+ Add Listing', orders: 'orders',
    active: '🟢 Active', paused: '⏸ Paused', lowstock: '📦 Low Stock', soldout: '✅ Sold Out',
    view: 'Manage', available: 'available', empty: 'No listings yet', emptySub: 'Start selling direct to consumers' },
  hi: { back: 'वापस', title: 'मेरी लिस्टिंग', addListing: '+ लिस्टिंग जोड़ो', orders: 'ऑर्डर',
    active: '🟢 उपलब्ध', paused: '⏸ रुका हुआ', lowstock: '📦 कम स्टॉक', soldout: '✅ बिक गया',
    view: 'देखो', available: 'उपलब्ध', empty: 'कोई लिस्टिंग नहीं', emptySub: 'ग्राहकों को सीधे बेचना शुरू करो' },
  mr: { back: 'मागे', title: 'माझ्या यादी', addListing: '+ यादी जोडा', orders: 'ऑर्डर',
    active: '🟢 उपलब्ध', paused: '⏸ थांबवलेले', lowstock: '📦 कमी साठा', soldout: '✅ संपला',
    view: 'पहा', available: 'उपलब्ध', empty: 'कोणतीही यादी नाही', emptySub: 'ग्राहकांना थेट विकणे सुरू करा' },
  te: { back: 'వెనుక', title: 'నా లిస్టింగ్‌లు', addListing: '+ లిస్టింగ్ జోడించు', orders: 'ఆర్డర్లు',
    active: '🟢 అందుబాటులో', paused: '⏸ ఆపబడింది', lowstock: '📦 తక్కువ స్టాక్', soldout: '✅ అమ్ముడైంది',
    view: 'చూడు', available: 'అందుబాటులో', empty: 'లిస్టింగ్‌లు లేవు', emptySub: 'వినియోగదారులకు నేరుగా అమ్మడం ప్రారంభించండి' },
}

const statusColor: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  paused: 'bg-stone-100 text-stone-500',
  lowstock: 'bg-amber-100 text-amber-700',
  soldout: 'bg-stone-100 text-stone-400',
}

export default function MyListingsScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-stone-500 font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
          <button
            onClick={() => navigate('createListing')}
            className="px-4 py-2.5 bg-green-700 text-white rounded-xl font-black text-sm shadow-md shadow-green-200 active:opacity-80"
          >
            {l.addListing}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6 space-y-3">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span style={{ fontSize: 64 }}>🌱</span>
            <p className="text-lg font-black text-stone-600 mt-4">{l.empty}</p>
            <p className="text-sm text-stone-400 mt-1">{l.emptySub}</p>
            <button onClick={() => navigate('createListing')} className="mt-6 px-6 py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg shadow-green-200">
              {l.addListing}
            </button>
          </div>
        ) : (
          listings.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <span style={{ fontSize: 36 }}>{item.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full ${statusColor[item.status]}`}>
                      {l[item.status]}
                    </span>
                  </div>
                  <p className="text-lg font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {item.name[lang]}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-base font-black text-amber-600">₹{item.price}/kg</p>
                    <p className="text-xs text-stone-400">{item.qty} kg {l.available}</p>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">📦 {item.orders} {l.orders}</p>
                </div>
                <button
                  onClick={() => navigate('directOrders')}
                  className="px-3 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-black text-xs flex-shrink-0 active:opacity-80"
                >
                  {l.view}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
