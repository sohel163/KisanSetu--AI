import type { NavProps, Language } from '../types'

interface Step {
  emoji: string
  label: Record<Language, string>
  done: boolean
  active: boolean
  time?: string
}

const steps: Step[] = [
  { emoji: '🛒', label: { en: 'Order Placed',       hi: 'ऑर्डर आया',       mr: 'ऑर्डर आला',      te: 'ఆర్డర్ వచ్చింది'        }, done: true,  active: false, time: 'Just now' },
  { emoji: '💳', label: { en: 'Payment Confirmed',  hi: 'पैसे पक्के',       mr: 'पैसे पक्के',      te: 'చెల్లింపు ధృవీకరించబడింది' }, done: true,  active: false, time: '2 min ago' },
  { emoji: '📦', label: { en: 'Farmer Preparing',   hi: 'किसान तैयार कर रहे हैं', mr: 'शेतकरी तयार करत आहे', te: 'రైతు సిద్ధం చేస్తున్నారు' }, done: false, active: true },
  { emoji: '🚚', label: { en: 'Ready / In Transit', hi: 'तैयार है / आ रहा है', mr: 'तयार / येत आहे', te: 'సిద్ధంగా / మార్గంలో ఉంది'   }, done: false, active: false },
  { emoji: '🏠', label: { en: 'Delivered',          hi: 'पहुँच गया',        mr: 'पोहोचले',         te: 'డెలివర్ చేయబడింది'       }, done: false, active: false },
  { emoji: '✅', label: { en: 'Completed',           hi: 'पूरा हुआ',         mr: 'पूर्ण झाले',      te: 'పూర్తయింది'             }, done: false, active: false },
]

const ui: Record<Language, Record<string, string>> = {
  en: { back: 'Back', title: 'Your Order', youPaid: 'YOU PAID', est: 'Estimated',
    preparing: 'Farmer is Preparing', prepareSub: 'Rajesh Kumar is packing your order',
    farmerLabel: 'FARMER', call: '📞 Contact', afterLabel: 'AFTER DELIVERY',
    review: 'Rate Farmer', help: '🆘 Help', demoLabel: 'Demo Order · #KS1024' },
  hi: { back: 'वापस', title: 'आपका ऑर्डर', youPaid: 'आपने दिया', est: 'अनुमानित',
    preparing: 'किसान तैयार कर रहे हैं', prepareSub: 'राजेश कुमार आपका ऑर्डर पैक कर रहे हैं',
    farmerLabel: 'किसान', call: '📞 संपर्क', afterLabel: 'डिलीवरी के बाद',
    review: 'किसान को रेटिंग दो', help: '🆘 मदद', demoLabel: 'डेमो ऑर्डर · #KS1024' },
  mr: { back: 'मागे', title: 'तुमचा ऑर्डर', youPaid: 'तुम्ही दिले', est: 'अंदाजे',
    preparing: 'शेतकरी तयार करत आहे', prepareSub: 'राजेश कुमार तुमचा ऑर्डर पॅक करत आहे',
    farmerLabel: 'शेतकरी', call: '📞 संपर्क', afterLabel: 'डिलिव्हरीनंतर',
    review: 'शेतकऱ्याला रेटिंग द्या', help: '🆘 मदत', demoLabel: 'डेमो ऑर्डर · #KS1024' },
  te: { back: 'వెనుక', title: 'మీ ఆర్డర్', youPaid: 'మీరు చెల్లించారు', est: 'అంచనా',
    preparing: 'రైతు సిద్ధం చేస్తున్నారు', prepareSub: 'రాజేష్ కుమార్ మీ ఆర్డర్ ప్యాక్ చేస్తున్నారు',
    farmerLabel: 'రైతు', call: '📞 సంప్రదించు', afterLabel: 'డెలివరీ తర్వాత',
    review: 'రైతుకు రేటింగ్ ఇవ్వు', help: '🆘 సహాయం', demoLabel: 'డెమో ఆర్డర్ · #KS1024' },
}

export default function ConsumerOrderTrackingScreen({ navigate, lang = 'en' }: NavProps) {
  const l = ui[lang]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('consumerHome')} className="flex items-center gap-2 text-stone-500 font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>

        <div className="mt-3 flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
          <span style={{ fontSize: 28 }}>🌱</span>
          <div className="flex-1">
            <p className="text-sm font-black text-stone-900">Soybean 5kg + Chili 2kg</p>
            <p className="text-xs text-stone-400">Rajesh Kumar · Akola</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400">{l.youPaid}</p>
            <p className="text-lg font-black text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹515</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        {/* Active banner */}
        <div className="bg-amber-500 rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
          <span style={{ fontSize: 28 }}>📦</span>
          <div>
            <p className="text-white font-black text-base">{l.preparing}</p>
            <p className="text-amber-100 text-sm">{l.prepareSub}</p>
          </div>
          <div className="ml-auto bg-white/20 rounded-full w-3 h-3 animate-pulse" />
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const label = step.label[lang]

            if (step.active) {
              return (
                <div key={i}>
                  <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-green-400" /></div>
                  <div className="bg-amber-500 rounded-3xl overflow-hidden shadow-lg shadow-amber-200">
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/25 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span style={{ fontSize: 36 }}>{step.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-black text-xl leading-tight">{label}</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-white/20 rounded-2xl px-4 py-3">
                        <p className="text-white/70 text-xs font-black uppercase mb-2">{l.farmerLabel}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-black">Rajesh Kumar</p>
                            <p className="text-amber-100 text-sm">📍 Akola · 12 km</p>
                          </div>
                          <button className="bg-white text-amber-600 font-black text-sm px-4 py-2.5 rounded-xl active:opacity-80">
                            {l.call}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!isLast && <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-stone-300" /></div>}
                </div>
              )
            }

            if (step.done) {
              return (
                <div key={i}>
                  {i > 0 && <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-green-400" /></div>}
                  <div className="bg-white border-2 border-green-200 rounded-2xl px-4 py-3.5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span style={{ fontSize: 26 }}>{step.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-black text-green-800 leading-tight">{label}</p>
                      {step.time && <p className="text-xs text-stone-400 mt-0.5">{step.time}</p>}
                    </div>
                    <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg font-black">✓</span>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div key={i}>
                <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-stone-200" /></div>
                <div className="bg-white border border-stone-200 rounded-2xl px-4 py-3 flex items-center gap-4 opacity-50">
                  <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span style={{ fontSize: 26 }}>{step.emoji}</span>
                  </div>
                  <p className="flex-1 text-base font-black text-stone-500">{label}</p>
                  <div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-stone-400 text-lg">○</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* After delivery actions */}
        <div className="mt-4 bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">{l.afterLabel}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { emoji: '⭐', label: l.review },
              { emoji: '🆘', label: l.help },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-2 py-4 bg-stone-50 border border-stone-200 rounded-2xl active:scale-95 transition-transform">
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
                <p className="text-sm font-black text-stone-700 text-center leading-tight">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-3">{l.demoLabel}</p>
      </div>
    </div>
  )
}
