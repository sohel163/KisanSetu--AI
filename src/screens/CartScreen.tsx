import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface CartItem {
  id: number; emoji: string; name: Record<Language, string>
  price: number; farmer: string
}

const initialItems: CartItem[] = [
  { id: 1, emoji: '🌱', name: { en: 'Fresh Soybean', hi: 'ताजा सोयाबीन', mr: 'ताजे सोयाबीन', te: 'తాజా సోయాబీన్' }, price: 65, farmer: 'Rajesh Kumar' },
  { id: 4, emoji: '🌶️', name: { en: 'Green Chili',  hi: 'हरी मिर्च',    mr: 'हिरवी मिरची', te: 'పచ్చి మిరప'   }, price: 95, farmer: 'Ramesh Yadav' },
]

const ui: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', title: 'My Cart', sub: 'Fresh from local farms',
    qty: 'kg', subtotal: 'Subtotal', delivery: 'Delivery', free: 'FREE', total: 'Total',
    pickup: '📍 Pickup from Farm', deliver: '🚚 Home Delivery',
    deliveryNote: 'Delivery fee depends on your location.',
    placeOrder: '✓ Place Order →', empty: 'Your cart is empty',
    emptyBtn: 'Browse Produce', perKg: '/kg',
  },
  hi: {
    back: 'वापस', title: 'मेरा कार्ट', sub: 'पास के खेत से ताजा',
    qty: 'किलो', subtotal: 'कुल', delivery: 'डिलीवरी', free: 'मुफ्त', total: 'जोड़',
    pickup: '📍 खेत से उठाओ', deliver: '🚚 घर डिलीवरी',
    deliveryNote: 'डिलीवरी शुल्क जगह के हिसाब से।',
    placeOrder: '✓ ऑर्डर दो →', empty: 'कार्ट खाली है',
    emptyBtn: 'फसल देखो', perKg: '/किलो',
  },
  mr: {
    back: 'मागे', title: 'माझी कार्ट', sub: 'जवळच्या शेतातून ताजे',
    qty: 'किलो', subtotal: 'एकूण', delivery: 'डिलिव्हरी', free: 'मोफत', total: 'बेरीज',
    pickup: '📍 शेतातून उचला', deliver: '🚚 घरी डिलिव्हरी',
    deliveryNote: 'डिलिव्हरी शुल्क तुमच्या ठिकाणावर अवलंबून.',
    placeOrder: '✓ ऑर्डर द्या →', empty: 'कार्ट रिकामी आहे',
    emptyBtn: 'पीक पहा', perKg: '/किलो',
  },
  te: {
    back: 'వెనుక', title: 'నా కార్ట్', sub: 'స్థానిక పొలాల నుండి తాజాగా',
    qty: 'కిలో', subtotal: 'మొత్తం', delivery: 'డెలివరీ', free: 'ఉచితం', total: 'మొత్తం',
    pickup: '📍 పొలం నుండి తీసుకో', deliver: '🚚 ఇంటికి డెలివరీ',
    deliveryNote: 'డెలివరీ ఫీజు మీ స్థానంపై ఆధారపడి ఉంటుంది.',
    placeOrder: '✓ ఆర్డర్ ఇవ్వు →', empty: 'కార్ట్ ఖాళీగా ఉంది',
    emptyBtn: 'పంట చూడు', perKg: '/కిలో',
  },
}

export default function CartScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]
  const [qtys, setQtys] = useState<Record<number, number>>({ 1: 5, 4: 2 })
  const [mode, setMode] = useState<'pickup' | 'deliver'>('pickup')

  const subtotal = initialItems.reduce((s, i) => s + (qtys[i.id] ?? 1) * i.price, 0)
  const deliveryFee = mode === 'deliver' ? 50 : 0
  const total = subtotal + deliveryFee

  const setQty = (id: number, v: number) => setQtys(q => ({ ...q, [id]: Math.max(1, Math.min(50, v)) }))

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('consumerHome')} className="flex items-center gap-2 text-stone-500 font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>🛒 {l.title}</h1>
        <p className="text-sm text-stone-500 mt-0.5">{l.sub}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4 space-y-3">
        {/* Cart items */}
        {initialItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-stone-200 px-4 py-3.5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span style={{ fontSize: 28 }}>{item.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-stone-900 leading-tight">{item.name[lang]}</p>
              <p className="text-xs text-stone-400">👨‍🌾 {item.farmer} · ₹{item.price}{l.perKg}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setQty(item.id, (qtys[item.id] ?? 1) - 1)} className="w-9 h-9 bg-stone-100 rounded-xl flex items-center justify-center font-black text-lg active:bg-stone-200">−</button>
              <p className="w-6 text-center font-black text-stone-900">{qtys[item.id] ?? 1}</p>
              <button onClick={() => setQty(item.id, (qtys[item.id] ?? 1) + 1)} className="w-9 h-9 bg-green-700 rounded-xl flex items-center justify-center font-black text-white text-lg active:bg-green-800">+</button>
            </div>
          </div>
        ))}

        {/* Delivery / Pickup toggle */}
        <div>
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Pickup / Delivery</p>
          <div className="flex bg-stone-200 rounded-2xl p-1 gap-1">
            {(['pickup', 'deliver'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${mode === m ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
              >
                {m === 'pickup' ? l.pickup : l.deliver}
              </button>
            ))}
          </div>
          <p className="text-xs text-stone-400 mt-1.5 px-1">{l.deliveryNote}</p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">{l.subtotal}</span>
            <span className="font-black text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">{l.delivery}</span>
            <span className="font-black text-stone-900">{mode === 'pickup' ? l.free : `₹${deliveryFee}`}</span>
          </div>
          <div className="border-t border-stone-200 pt-3 flex justify-between">
            <span className="font-black text-stone-700">{l.total}</span>
            <span className="text-2xl font-black text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 pt-2 bg-white border-t border-stone-100">
        <button
          onClick={() => navigate('consumerOrderTracking')}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {l.placeOrder}
        </button>
      </div>
    </div>
  )
}
