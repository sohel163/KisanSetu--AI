import type { TabName, Language } from '../types'

interface BottomNavProps {
  activeTab: TabName
  onTabChange: (tab: TabName) => void
  lang: Language
}

const labels: Record<Language, Record<TabName, string>> = {
  en: { home: 'Home',   myProduce: 'My Crops', market: 'Market', orders: 'My Deals', profile: 'Profile'   },
  hi: { home: 'होम',   myProduce: 'फसल',      market: 'मंडी',   orders: 'सौदे',     profile: 'खाता'      },
  mr: { home: 'होम',   myProduce: 'पिके',      market: 'बाजार',  orders: 'सौदे',     profile: 'खाते'      },
  te: { home: 'హోం',   myProduce: 'పంటలు',    market: 'మార్కెట్', orders: 'డీల్స్',  profile: 'ప్రొఫైల్'  },
}

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    {active
      ? <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      : <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />}
  </svg>
)

const ProduceIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={active ? 'currentColor' : 'none'} />
    <path d="M12 6c-1.5 2-2 4-2 6s.5 4 2 6c1.5-2 2-4 2-6s-.5-4-2-6z" fill={active ? 'white' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth={1.8} />
    <path d="M6 12c2-1.5 4-2 6-2s4 .5 6 2" stroke={active ? 'white' : 'currentColor'} strokeWidth={active ? 1.5 : 1.8} fill="none" />
  </svg>
)

const MarketIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 0 : 1.8} />
    <path d="M7 13L5.4 5M7 13l-2 9m14-9l2 9" stroke="currentColor" />
    <circle cx="9" cy="21" r="1" fill="currentColor" />
    <circle cx="19" cy="21" r="1" fill="currentColor" />
  </svg>
)

const OrdersIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" fill={active ? 'currentColor' : 'none'} />
    <path d="M9 12l2 2 4-4" stroke={active ? 'white' : 'currentColor'} strokeWidth={1.8} fill="none" />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const icons = {
  home: HomeIcon,
  myProduce: ProduceIcon,
  market: MarketIcon,
  orders: OrdersIcon,
  profile: ProfileIcon,
}

const TABS: TabName[] = ['home', 'myProduce', 'market', 'orders', 'profile']

export default function BottomNav({ activeTab, onTabChange, lang }: BottomNavProps) {
  const l = labels[lang]

  return (
    <div className="bg-white border-t border-stone-200 pt-2 pb-safe" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
      <div className="flex items-center">
        {TABS.map((tab) => {
          const Icon = icons[tab]
          const active = activeTab === tab
          const isCenter = tab === 'market'
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 transition-colors relative ${
                active ? 'text-green-700' : 'text-stone-400'
              }`}
            >
              {isCenter && (
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  active ? 'bg-green-700 shadow-green-200' : 'bg-stone-800'
                }`}>
                  <MarketIcon active={false} />
                </div>
              )}
              {!isCenter && <Icon active={active} />}
              {isCenter && <div className="mt-7" />}
              <span className="text-xs font-semibold leading-none">{l[tab]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
