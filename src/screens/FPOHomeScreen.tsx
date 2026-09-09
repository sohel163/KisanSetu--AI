import type { NavProps, Screen, FpoTab } from '../types'
import { fpoSummary, fpoMembers } from '../data'

interface FPOHomeScreenProps extends NavProps {
  activeTab: FpoTab
  onTabChange: (tab: FpoTab) => void
}

const tiles: { emoji: string; label: string; sub: string; bg: string; nav: Screen }[] = [
  { emoji: '👨‍🌾', label: 'Manage Farmers',     sub: 'Members & contributions',    bg: '#FEF3C7', nav: 'fpoDashboard' },
  { emoji: '📦', label: 'Add Stock',            sub: 'Crop, qty & grade',          bg: '#DCFCE7', nav: 'fpoDashboard' },
  { emoji: '🔎', label: 'Find Buyers',          sub: 'Browse verified buyers',     bg: '#EFF6FF', nav: 'buyers' },
  { emoji: '📋', label: 'Buyer Requirements',   sub: 'What buyers want',           bg: '#F3E8FF', nav: 'buyers' },
  { emoji: '⚖️', label: 'Compare Offers',       sub: 'Best price & terms',         bg: '#FFF7ED', nav: 'offerCompare' },
  { emoji: '📊', label: 'Active Orders',        sub: 'Track ongoing deals',        bg: '#F0FDF4', nav: 'orders' },
  { emoji: '💳', label: 'Payments',             sub: 'Dues & settlements',         bg: '#FEFCE8', nav: 'payment' },
  { emoji: '🎙️', label: 'Ask KisanSetu',        sub: 'Voice assistant',            bg: '#DCFCE7', nav: 'fpoHome' },
]

export default function FPOHomeScreen({ navigate, activeTab, onTabChange }: FPOHomeScreenProps) {
  const totalStock = fpoMembers.reduce((s, m) => s + m.qty, 0)
  const totalNet   = fpoMembers.reduce((s, m) => s + m.net, 0)

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>

      {/* Header */}
      <div className="px-4 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500 font-semibold">Namaste! 🤝</p>
            <h1 className="text-2xl font-black text-stone-900 mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
              FPO Dashboard
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
          <div className="px-5 py-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-200 text-xs font-black uppercase tracking-widest mb-1">{fpoSummary.name}</p>
                <p className="text-white font-black text-xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Bulk selling,<br />smarter & faster
                </p>
                <span className="inline-block mt-2 px-2.5 py-1 bg-green-500/50 text-white text-xs font-bold rounded-full">
                  ✅ Verified FPO
                </span>
              </div>
              <span style={{ fontSize: 56, lineHeight: 1 }}>🤝</span>
            </div>
          </div>
        </div>

        {/* 4 stat tiles */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: '👨‍🌾', label: 'Total Farmers',   val: String(fpoSummary.members),                   color: 'text-stone-900', bg: '#FEF3C7' },
            { emoji: '📦', label: 'Available Stock',    val: `${(totalStock / 1000).toFixed(1)}T kg`,      color: 'text-green-700', bg: '#DCFCE7' },
            { emoji: '🤝', label: 'Active Deals',       val: String(fpoSummary.activeLots),                color: 'text-amber-600', bg: '#FFF7ED' },
            { emoji: '💰', label: 'Total Sales',        val: `₹${(totalNet / 1000).toFixed(0)}K`,          color: 'text-blue-700',  bg: '#EFF6FF' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-stone-200 px-4 py-4 shadow-sm" style={{ background: s.bg }}>
              <p className="text-2xl mb-1.5">{s.emoji}</p>
              <p className={`text-xl font-black ${s.color}`} style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
              <p className="text-xs text-stone-500 font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick access tiles */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Quick Access</p>
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile) => (
              <button
                key={tile.label}
                onClick={() => navigate(tile.nav)}
                className="rounded-2xl border border-stone-200 text-left p-4 active:scale-[0.97] transition-transform shadow-sm"
                style={{ background: tile.bg, minHeight: 106 }}
              >
                <span style={{ fontSize: 36, lineHeight: 1, display: 'block' }}>{tile.emoji}</span>
                <p className="font-black text-stone-900 text-sm mt-3 leading-tight">{tile.label}</p>
                <p className="text-xs text-stone-500 mt-0.5 leading-snug">{tile.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent member activity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Recent Member Activity</p>
            <button
              onClick={() => navigate('fpoDashboard')}
              className="text-xs text-green-700 font-bold active:opacity-60"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {fpoMembers.slice(0, 3).map((m) => (
              <div key={m.id} className="bg-white border border-stone-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center font-black text-green-700 text-sm flex-shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-stone-900 text-sm">{m.name}</p>
                  <p className="text-xs text-stone-400 font-semibold">{m.village} · {m.crop} · {m.qty} kg</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                  m.status === 'Ready' ? 'bg-green-100 text-green-700' :
                  m.status === 'Harvested' ? 'bg-amber-100 text-amber-700' :
                  'bg-stone-100 text-stone-600'
                }`}>
                  {m.status}
                </span>
              </div>
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

      {/* FPO Bottom Nav — inlined here since it owns this screen's state */}
      <FPOBottomNavBar activeTab={activeTab} onTabChange={onTabChange} navigate={navigate} />
    </div>
  )
}

// ── FPO Bottom Nav (inlined to keep state ownership in one place) ─────────────

const fpoNavItems: { id: FpoTab; emoji: string; label: string }[] = [
  { id: 'fHome',    emoji: '🏠', label: 'Home' },
  { id: 'fFarmers', emoji: '👨‍🌾', label: 'Farmers' },
  { id: 'fStock',   emoji: '📦', label: 'Stock' },
  { id: 'fDeals',   emoji: '🤝', label: 'Deals' },
  { id: 'fProfile', emoji: '👤', label: 'Profile' },
]

function FPOBottomNavBar({
  activeTab, onTabChange, navigate,
}: {
  activeTab: FpoTab
  onTabChange: (tab: FpoTab) => void
  navigate: NavProps['navigate']
}) {
  const handleTap = (item: typeof fpoNavItems[0]) => {
    onTabChange(item.id)
    if (item.id === 'fHome')    navigate('fpoHome')
    else if (item.id === 'fFarmers') navigate('fpoDashboard')
    else if (item.id === 'fStock')   navigate('fpoDashboard')
    else if (item.id === 'fDeals')   navigate('fpoDashboard')
    else if (item.id === 'fProfile') navigate('profile')
  }

  return (
    <div className="flex-shrink-0 bg-white border-t border-stone-100 shadow-lg">
      <div className="flex items-center px-2 py-2">
        {fpoNavItems.map((item) => {
          const active = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleTap(item)}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 active:opacity-70 transition-opacity"
            >
              <span style={{ fontSize: 22, lineHeight: 1 }}>{item.emoji}</span>
              <span className={`text-xs font-bold mt-1 ${active ? 'text-green-700' : 'text-stone-400'}`}>
                {item.label}
              </span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-green-600 mt-0.5" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
