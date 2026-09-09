import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface Order {
  id: string; consumer: string; crop: string; cropEmoji: string
  qty: number; amount: number
  status: 'placed' | 'paid' | 'preparing' | 'ready' | 'delivered' | 'done'
}

const orders: Order[] = [
  { id: 'KS1024', consumer: 'Priya S.',   crop: 'Soybean', cropEmoji: '🌱', qty: 5,  amount: 325, status: 'paid' },
  { id: 'KS1025', consumer: 'Amit K.',    crop: 'Soybean', cropEmoji: '🌱', qty: 10, amount: 650, status: 'preparing' },
  { id: 'KS1026', consumer: 'Meena R.',   crop: 'Tomato',  cropEmoji: '🍅', qty: 3,  amount: 54,  status: 'placed' },
  { id: 'KS1027', consumer: 'Suresh L.',  crop: 'Soybean', cropEmoji: '🌱', qty: 20, amount: 1300, status: 'ready' },
]

const statusFlow = ['placed', 'paid', 'preparing', 'ready', 'delivered', 'done'] as const

const ui: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', title: 'Direct Orders', sub: 'Consumer orders for your listings',
    placed: '🛒 Order Placed', paid: '💳 Payment Confirmed', preparing: '📦 You are Preparing',
    ready: '🚚 Ready for Pickup', delivered: '🏠 Delivered', done: '✅ Completed',
    kg: 'kg', accept: 'Accept', prepare: 'Preparing…', markReady: 'Mark Ready',
    dispatch: 'Dispatch', complete: 'Complete', call: '📞 Call Consumer',
  },
  hi: {
    back: 'वापस', title: 'डायरेक्ट ऑर्डर', sub: 'आपकी लिस्टिंग पर ग्राहक के ऑर्डर',
    placed: '🛒 ऑर्डर आया', paid: '💳 पैसे पक्के', preparing: '📦 आप तैयार कर रहे हैं',
    ready: '🚚 उठान के लिए तैयार', delivered: '🏠 पहुँच गया', done: '✅ पूरा हुआ',
    kg: 'किलो', accept: 'स्वीकार करो', prepare: 'तैयार कर रहे हैं…', markReady: 'तैयार है',
    dispatch: 'भेजो', complete: 'पूरा', call: '📞 ग्राहक को कॉल करो',
  },
  mr: {
    back: 'मागे', title: 'थेट ऑर्डर', sub: 'तुमच्या यादीवरील ग्राहकांचे ऑर्डर',
    placed: '🛒 ऑर्डर आला', paid: '💳 पैसे पक्के', preparing: '📦 तुम्ही तयार करत आहात',
    ready: '🚚 उचलण्यासाठी तयार', delivered: '🏠 पोहोचले', done: '✅ पूर्ण झाले',
    kg: 'किलो', accept: 'मान्य करा', prepare: 'तयार करत आहे…', markReady: 'तयार आहे',
    dispatch: 'पाठवा', complete: 'पूर्ण', call: '📞 ग्राहकाला फोन करा',
  },
  te: {
    back: 'వెనుక', title: 'డైరెక్ట్ ఆర్డర్లు', sub: 'మీ లిస్టింగ్‌లకు వినియోగదారు ఆర్డర్లు',
    placed: '🛒 ఆర్డర్ వచ్చింది', paid: '💳 చెల్లింపు ధృవీకరించబడింది', preparing: '📦 మీరు సిద్ధం చేస్తున్నారు',
    ready: '🚚 పికప్‌కు సిద్ధం', delivered: '🏠 డెలివర్ చేయబడింది', done: '✅ పూర్తయింది',
    kg: 'కిలో', accept: 'అంగీకరించు', prepare: 'సిద్ధం చేస్తున్నారు…', markReady: 'సిద్ధంగా ఉంది',
    dispatch: 'పంపు', complete: 'పూర్తి', call: '📞 వినియోగదారుని కాల్ చేయి',
  },
}

const actionLabel = (status: Order['status'], l: Record<string, string>) => {
  if (status === 'placed')    return l.accept
  if (status === 'paid')      return l.prepare
  if (status === 'preparing') return l.markReady
  if (status === 'ready')     return l.dispatch
  if (status === 'delivered') return l.complete
  return ''
}

const statusColor: Record<string, string> = {
  placed: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  preparing: 'bg-amber-100 text-amber-700',
  ready: 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-800',
  done: 'bg-stone-100 text-stone-500',
}

export default function DirectOrdersScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]
  const [statuses, setStatuses] = useState<Record<string, Order['status']>>(
    Object.fromEntries(orders.map(o => [o.id, o.status])) as Record<string, Order['status']>
  )

  const advance = (id: string) => {
    const cur = statuses[id]
    const idx = statusFlow.indexOf(cur)
    if (idx < statusFlow.length - 1) {
      setStatuses(prev => ({ ...prev, [id]: statusFlow[idx + 1] }))
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('myListings')} className="flex items-center gap-2 text-stone-500 font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>🏠 {l.title}</h1>
        <p className="text-sm text-stone-500 mt-0.5">{l.sub}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6 space-y-3">
        {orders.map((order) => {
          const status = statuses[order.id]
          const action = actionLabel(status, l)
          const isDone = status === 'done'
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: 28 }}>{order.cropEmoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-stone-900">{order.crop} · {order.qty} {l.kg}</p>
                      <p className="text-base font-black text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{order.amount}</p>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">#{order.id} · {order.consumer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-black px-2.5 py-1 rounded-full ${statusColor[status]}`}>
                        {l[status]}
                      </span>
                    </div>
                  </div>
                </div>

                {!isDone && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-xl font-bold text-xs active:opacity-80">
                      {l.call}
                    </button>
                    <button
                      onClick={() => advance(order.id)}
                      className="flex-1 py-3 bg-green-700 text-white rounded-xl font-black text-xs active:opacity-80"
                    >
                      {action} →
                    </button>
                  </div>
                )}
              </div>

              {/* Mini timeline */}
              <div className="px-4 pb-3 flex gap-1">
                {statusFlow.map((s) => {
                  const reached = statusFlow.indexOf(s) <= statusFlow.indexOf(status)
                  return <div key={s} className={`flex-1 h-1 rounded-full ${reached ? 'bg-green-500' : 'bg-stone-200'}`} />
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
