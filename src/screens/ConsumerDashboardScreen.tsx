import type { NavProps, Language, Screen } from '../types'

interface ConsumerDashboardProps extends NavProps {
  lang?: Language
}

const tiles: {
  emoji: string
  label: string
  sub: string
  bg: string
  nav: Screen
}[] = [
  { emoji: '🥬', label: 'Browse Produce',    sub: 'Fresh from local farms',      bg: '#DCFCE7', nav: 'consumerHome' },
  { emoji: '👨‍🌾', label: 'Nearby Farmers',    sub: 'Find verified growers',        bg: '#FEF3C7', nav: 'farmerPublicProfile' },
  { emoji: '💰', label: 'Market Prices',     sub: 'Live mandi rates',             bg: '#EFF6FF', nav: 'market' },
  { emoji: '🛒', label: 'My Orders',         sub: 'Track your purchases',         bg: '#F3E8FF', nav: 'consumerOrderTracking' },
  { emoji: '🚚', label: 'Track Delivery',    sub: 'Live delivery status',         bg: '#FFF7ED', nav: 'consumerOrderTracking' },
  { emoji: '💳', label: 'My Payments',       sub: 'History & receipts',           bg: '#F0FDF4', nav: 'consumerOrderTracking' },
  { emoji: '⭐', label: 'Order History',     sub: 'All past purchases',           bg: '#FEFCE8', nav: 'consumerOrderTracking' },
  { emoji: '🎙️', label: 'Ask KisanSetu',     sub: 'Voice assistant',              bg: '#DCFCE7', nav: 'consumerHome' },
]

export default function ConsumerDashboardScreen({ navigate, lang = 'en' }: ConsumerDashboardProps) {
  const greeting = lang === 'hi' ? 'नमस्ते!' : lang === 'mr' ? 'नमस्कार!' : lang === 'te' ? 'నమస్కారం!' : 'Namaste!'
  const welcome  = lang === 'hi' ? 'KisanSetu में आपका स्वागत है' : lang === 'mr' ? 'KisanSetu मध्ये स्वागत आहे' : lang === 'te' ? 'KisanSetu కి స్వాగతం' : 'Welcome to KisanSetu'

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>

      {/* Header */}
      <div className="px-4 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500 font-semibold">{welcome}</p>
            <h1 className="text-2xl font-black text-stone-900 mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {greeting} 🛒
            </h1>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 relative active:opacity-80 flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* Hero banner */}
      <div className="mx-4 mb-4 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(140deg, #14532d 0%, #15803d 55%, #22c55e 100%)', minHeight: 100 }}>
        <div className="px-5 py-5 flex items-center gap-4">
          <div>
            <p className="text-green-200 text-xs font-black uppercase tracking-widest mb-1">Farm to Table</p>
            <p className="text-white font-black text-xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Fresh produce,<br />directly from farmers
            </p>
          </div>
          <span style={{ fontSize: 56, lineHeight: 1, marginLeft: 'auto', flexShrink: 0 }}>🥬</span>
        </div>
      </div>

      {/* 2-column tile grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Quick Access</p>
        <div className="grid grid-cols-2 gap-3">
          {tiles.map((tile) => (
            <button
              key={tile.label}
              onClick={() => navigate(tile.nav)}
              className="rounded-2xl border border-stone-200 text-left p-4 active:scale-[0.97] transition-transform"
              style={{ background: tile.bg, minHeight: 110 }}
            >
              <span style={{ fontSize: 36, lineHeight: 1, display: 'block' }}>{tile.emoji}</span>
              <p className="font-black text-stone-900 text-sm mt-3 leading-tight">{tile.label}</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">{tile.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Voice assistant card */}
      <div className="flex-shrink-0 px-4 pt-2 pb-3" style={{ background: '#F4EFE4' }}>
        <button
          className="w-full flex items-center gap-4 rounded-2xl px-4 py-3.5 border border-green-200 active:opacity-70 transition-opacity"
          style={{ background: '#DCFCE7' }}
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#BBF7D0' }}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" fill="#16A34A" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#16A34A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="19" x2="12" y2="23" stroke="#16A34A" strokeWidth={2} strokeLinecap="round" />
              <line x1="8" y1="23" x2="16" y2="23" stroke="#16A34A" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-stone-900 font-black text-base leading-tight">Ask KisanSetu</p>
            <p className="text-stone-400 text-xs mt-0.5">Voice Assistant</p>
          </div>
        </button>
      </div>
    </div>
  )
}
