import type { NavProps, Screen, BuyerTab } from '../types'
import { buyerListings } from '../data'

interface BuyerHomeScreenProps extends NavProps {
  activeTab: BuyerTab
  onTabChange: (tab: BuyerTab) => void
}

// ── Tile data ────────────────────────────────────────────────────────────────

const tiles: { emoji: string; label: string; sub: string; bg: string; nav: Screen }[] = [
  { emoji: '🧑‍🌾', label: 'Find Farmers',        sub: 'Browse verified sellers',    bg: '#DCFCE7', nav: 'buyerFindFarmers' },
  { emoji: '🤝', label: 'Find FPOs',             sub: 'Buy in bulk from groups',    bg: '#FEF3C7', nav: 'buyerFindFarmers' },
  { emoji: '🥬', label: 'Browse Crops',           sub: 'Available produce near you', bg: '#EFF6FF', nav: 'buyerFindFarmers' },
  { emoji: '💰', label: 'Market Prices',          sub: 'Live mandi rates',           bg: '#F3E8FF', nav: 'market' },
  { emoji: '📋', label: 'My Requirements',        sub: 'Saved buying needs',         bg: '#FFF7ED', nav: 'buyerPurchaseHistory' },
  { emoji: '⭐', label: 'Recommended',            sub: 'Best matches for you',       bg: '#F0FDF4', nav: 'buyerRecommendation' },
  { emoji: '📦', label: 'Active Orders',          sub: 'Track your purchases',       bg: '#FEFCE8', nav: 'buyerLogistics' },
  { emoji: '💳', label: 'Payments',               sub: 'Dues & transaction history', bg: '#FEF2F2', nav: 'buyerPayment' },
  { emoji: '🎙️', label: 'Ask KisanSetu',          sub: 'Voice assistant',            bg: '#DCFCE7', nav: 'buyerHome' },
]

// ── Bottom nav config ────────────────────────────────────────────────────────

const navItems: { id: BuyerTab; emoji: string; label: string; screen: Screen }[] = [
  { id: 'bHome',     emoji: '🏠', label: 'Home',     screen: 'buyerHome' },
  { id: 'bExplore',  emoji: '🔎', label: 'Explore',  screen: 'buyerFindFarmers' },
  { id: 'bOrders',   emoji: '📦', label: 'Orders',   screen: 'buyerPurchaseHistory' },
  { id: 'bPayments', emoji: '💳', label: 'Payments', screen: 'buyerPayment' },
  { id: 'bProfile',  emoji: '👤', label: 'Profile',  screen: 'profile' },
]

// ── Main component ───────────────────────────────────────────────────────────

export default function BuyerHomeScreen({ navigate, activeTab, onTabChange }: BuyerHomeScreenProps) {
  const activeBids = 3
  const pendingPay = '₹48K'
  const completed  = buyerListings.length + 9

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>

      {/* Header */}
      <div className="px-4 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500 font-semibold">Namaste! 🏪</p>
            <h1 className="text-2xl font-black text-stone-900 mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Buyer Dashboard
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

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">

        {/* Hero banner */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(140deg, #14532d 0%, #15803d 55%, #22c55e 100%)' }}
        >
          <div className="px-5 py-5 flex items-start justify-between">
            <div>
              <p className="text-green-200 text-xs font-black uppercase tracking-widest mb-1">KisanSetu · Buyer</p>
              <p className="text-white font-black text-xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Smart buying,<br />direct from farmers
              </p>
              <span className="inline-block mt-2 px-2.5 py-1 bg-green-500/50 text-white text-xs font-bold rounded-full">
                ✅ Verified Buyer
              </span>
            </div>
            <span style={{ fontSize: 56, lineHeight: 1 }}>🛒</span>
          </div>
        </div>

        {/* 3 stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { emoji: '🤝', label: 'Active Bids',   val: String(activeBids), color: 'text-amber-600', bg: '#FFF7ED' },
            { emoji: '💳', label: 'Pending Pay',    val: pendingPay,         color: 'text-red-600',   bg: '#FEF2F2' },
            { emoji: '✅', label: 'Completed',      val: String(completed),  color: 'text-green-700', bg: '#DCFCE7' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-stone-200 px-3 py-3 text-center shadow-sm" style={{ background: s.bg }}>
              <p className="text-xl">{s.emoji}</p>
              <p className={`text-lg font-black mt-1 ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              <p className="text-xs text-stone-500 font-semibold mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick find CTA */}
        <button
          onClick={() => navigate('buyerFindFarmers')}
          className="w-full flex items-center gap-4 rounded-2xl px-4 py-4 text-left active:scale-[0.98] transition-transform shadow-sm"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0">🔎</div>
          <div className="flex-1">
            <p className="text-white font-black text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Find Farmers &amp; FPOs
            </p>
            <p className="text-blue-200 text-xs mt-0.5">Browse · Compare · Negotiate · Pay</p>
          </div>
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* 3×3 tile grid */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Quick Access</p>
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile) => (
              <button
                key={tile.label}
                onClick={() => navigate(tile.nav)}
                className="rounded-2xl border border-stone-200 text-left p-3 active:scale-[0.97] transition-transform shadow-sm"
                style={{ background: tile.bg, minHeight: 96 }}
              >
                <span style={{ fontSize: 28, lineHeight: 1, display: 'block' }}>{tile.emoji}</span>
                <p className="font-black text-stone-900 text-xs mt-2.5 leading-tight">{tile.label}</p>
                <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">{tile.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent available produce */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Available Produce</p>
            <button
              onClick={() => navigate('buyerFindFarmers')}
              className="text-xs text-green-700 font-bold active:opacity-60"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {buyerListings.slice(0, 3).map((lot) => (
              <button
                key={lot.id}
                onClick={() => navigate('buyerCropDetails')}
                className="w-full bg-white border border-stone-200 rounded-2xl p-3 shadow-sm flex items-center gap-3 text-left active:opacity-80"
              >
                <img src={lot.photo} alt={lot.crop} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-stone-100" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-stone-900 text-sm">{lot.crop} · {lot.variety}</p>
                    {lot.farmerVerified && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">✓</span>}
                  </div>
                  <p className="text-xs text-stone-400 font-semibold mt-0.5">{lot.farmerName} · {lot.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-semibold">{lot.quantity} kg</span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">₹{lot.askedPrice}/kg</span>
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Voice assistant card */}
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

        <div className="pb-4" />
      </div>

      {/* Buyer Bottom Nav */}
      <div className="flex-shrink-0 bg-white border-t border-stone-100 shadow-lg">
        <div className="flex items-center px-2 py-2">
          {navItems.map((item) => {
            const active = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); navigate(item.screen) }}
                className="flex-1 flex flex-col items-center py-2 gap-0.5 active:opacity-70 transition-opacity"
              >
                <span style={{ fontSize: 22, lineHeight: 1 }}>{item.emoji}</span>
                <span className={`text-xs font-bold mt-1 ${active ? 'text-green-700' : 'text-stone-400'}`}>
                  {item.label}
                </span>
                {active && <span className="w-1 h-1 rounded-full bg-green-600 mt-0.5" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
