import type { ConsumerTab, Language } from '../types'

interface ConsumerBottomNavProps {
  activeTab: ConsumerTab
  onTabChange: (tab: ConsumerTab) => void
  lang: Language
  cartCount?: number
}

const labels: Record<Language, Record<ConsumerTab, string>> = {
  en: { cHome: 'Home', cExplore: 'Explore', cCart: 'Cart', cOrders: 'Orders', cProfile: 'Profile' },
  hi: { cHome: 'होम',  cExplore: 'खोजो',   cCart: 'कार्ट', cOrders: 'ऑर्डर', cProfile: 'खाता'  },
  mr: { cHome: 'होम',  cExplore: 'शोधा',    cCart: 'कार्ट', cOrders: 'ऑर्डर', cProfile: 'खाते'  },
  te: { cHome: 'హోం',  cExplore: 'వెతకండి', cCart: 'కార్ట్', cOrders: 'ఆర్డర్లు', cProfile: 'ప్రొఫైల్' },
}

const TABS: ConsumerTab[] = ['cHome', 'cExplore', 'cCart', 'cOrders', 'cProfile']

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    {active ? <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /> : <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />}
  </svg>
)

const ExploreIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" strokeWidth={2} />
  </svg>
)

const CartIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <path d="M3 6h18M16 10a4 4 0 01-8 0" fill="none" stroke={active ? 'white' : 'currentColor'} />
  </svg>
)

const OrdersIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <path d="M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" fill={active ? 'currentColor' : 'none'} />
    <path d="M9 12l2 2 4-4" stroke={active ? 'white' : 'currentColor'} fill="none" />
  </svg>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const icons = { cHome: HomeIcon, cExplore: ExploreIcon, cCart: CartIcon, cOrders: OrdersIcon, cProfile: ProfileIcon }

export default function ConsumerBottomNav({ activeTab, onTabChange, lang, cartCount = 2 }: ConsumerBottomNavProps) {
  const l = labels[lang]
  return (
    <div className="bg-white border-t border-stone-200 pt-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
      <div className="flex items-center">
        {TABS.map((tab) => {
          const Icon = icons[tab]
          const active = activeTab === tab
          const isCart = tab === 'cCart'
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 transition-colors relative ${active ? 'text-green-700' : 'text-stone-400'}`}
            >
              <div className="relative">
                <Icon active={active} />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-black" style={{ fontSize: 9 }}>{cartCount}</span>
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold leading-none">{l[tab]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
