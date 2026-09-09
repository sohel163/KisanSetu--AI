import type { NavProps, Language } from '../types'
import { orderStatus } from '../data'

interface Step {
  emoji: string
  label: Record<Language, string>
  done: boolean
  active: boolean
  time?: string
}

const steps: Step[] = [
  { emoji: '🤝', label: { en: 'Deal Confirmed', hi: 'सौदा पक्का', mr: 'सौदा पक्का', te: 'డీల్ ఖరారు' }, done: true,  active: false, time: 'Sep 5, 3:12 PM' },
  { emoji: '🚛', label: { en: 'Truck Arranged', hi: 'ट्रक तैयार', mr: 'ट्रक तयार',   te: 'ట్రక్కు సిద్ధం' }, done: true,  active: false, time: 'Sep 5, 4:30 PM' },
  { emoji: '🚚', label: { en: 'Truck Coming',   hi: 'ट्रक आ रहा है', mr: 'ट्रक येत आहे', te: 'ట్రక్కు వస్తోంది' }, done: false, active: true,  time: 'Sep 7, 8:00 AM' },
  { emoji: '📦', label: { en: 'Crop Picked Up', hi: 'फसल उठाई जाएगी', mr: 'पीक उचलतील', te: 'పంట తీసుకుంటారు' }, done: false, active: false },
  { emoji: '⚖️', label: { en: 'Weight Checked', hi: 'वज़न होगा', mr: 'वजन होईल', te: 'బరువు చెక్' }, done: false, active: false },
  { emoji: '💰', label: { en: 'Payment',         hi: 'पैसे मिलेंगे', mr: 'पैसे मिळतील', te: 'పైసలు వస్తాయి' }, done: false, active: false },
  { emoji: '✅', label: { en: 'Done!',            hi: 'पूरा हो जाएगा', mr: 'पूर्ण होईल', te: 'పూర్తవుతుంది' }, done: false, active: false },
]

const t: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', title: 'MY DEAL', youReceive: 'YOU RECEIVE', est: 'Estimated',
    truckComing: 'Truck Coming', truckSub: 'Sep 7 at 8:00 AM',
    driver: 'DRIVER', call: '📞 CALL',
    afterDelivery: 'AFTER DELIVERY',
    rate: 'Rate Buyer', dispute: 'Dispute', callDriver: 'Call Driver', help: 'Help',
    demoData: 'Demo Data',
  },
  hi: {
    back: 'वापस', title: 'मेरी डील', youReceive: 'आपको मिलेगा', est: 'अनुमानित',
    truckComing: 'ट्रक आ रहा है', truckSub: 'कल 8 बजे आएगा',
    driver: 'ड्राइवर', call: '📞 कॉल करो',
    afterDelivery: 'डिलीवरी के बाद',
    rate: 'रेटिंग दें', dispute: 'शिकायत', callDriver: 'ड्राइवर को कॉल', help: 'मदद',
    demoData: 'डेमो डेटा',
  },
  mr: {
    back: 'मागे', title: 'माझा सौदा', youReceive: 'तुम्हाला मिळेल', est: 'अंदाजे',
    truckComing: 'ट्रक येत आहे', truckSub: 'उद्या सकाळी 8 वाजता',
    driver: 'ड्रायव्हर', call: '📞 फोन करा',
    afterDelivery: 'डिलिव्हरीनंतर',
    rate: 'रेटिंग द्या', dispute: 'तक्रार', callDriver: 'ड्रायव्हरला फोन', help: 'मदत',
    demoData: 'डेमो माहिती',
  },
  te: {
    back: 'వెనుక', title: 'నా డీల్', youReceive: 'మీకు వస్తుంది', est: 'అంచనా',
    truckComing: 'ట్రక్కు వస్తోంది', truckSub: 'Sep 7 ఉదయం 8:00',
    driver: 'డ్రైవర్', call: '📞 కాల్',
    afterDelivery: 'డెలివరీ తర్వాత',
    rate: 'రేటింగ్ ఇవ్వు', dispute: 'వివాదం', callDriver: 'డ్రైవర్ కాల్', help: 'సహాయం',
    demoData: 'డెమో డేటా',
  },
}

export default function OrderTrackingScreen({ navigate, lang = 'en' }: NavProps) {
  const os = orderStatus
  const l = t[lang]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('orders')} className="flex items-center gap-2 text-stone-500 text-base font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>

        <div className="mt-3 flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3">
          <span style={{ fontSize: 32 }}>🍅</span>
          <div className="flex-1">
            <p className="text-sm font-black text-stone-900">{os.crop} · {os.quantity.toLocaleString('en-IN')} kg</p>
            <p className="text-xs text-stone-500">{os.buyer}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400 font-semibold">{l.youReceive}</p>
            <p className="text-lg font-black text-amber-600" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{os.netEarnings.toLocaleString('en-IN')}</p>
            <p className="text-xs text-stone-400">{l.est}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">
        <div className="bg-amber-500 rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
          <span style={{ fontSize: 32 }}>🚚</span>
          <div>
            <p className="text-white font-black text-base leading-tight">{l.truckComing}</p>
            <p className="text-amber-100 text-sm">{l.truckSub}</p>
          </div>
          <div className="ml-auto bg-white/20 rounded-full w-3 h-3 animate-pulse" />
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const stepLabel = step.label[lang]

            if (step.active) {
              return (
                <div key={i}>
                  <div className="flex justify-center my-1"><div className="w-0.5 h-4 bg-green-400" /></div>
                  <div className="bg-amber-500 rounded-3xl overflow-hidden shadow-lg shadow-amber-200">
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <span style={{ fontSize: 40 }}>{step.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-black text-xl leading-tight">{stepLabel}</p>
                          <p className="text-white/80 text-xs mt-1">📅 {step.time}</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-amber-500 text-xl font-black">→</span>
                        </div>
                      </div>
                      <div className="mt-4 bg-white/20 rounded-2xl px-4 py-3">
                        <p className="text-white/70 text-xs font-black uppercase mb-2">{l.driver}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-black text-base">{os.driver}</p>
                            <p className="text-amber-100 text-sm">{os.vehicle}</p>
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
                      <span style={{ fontSize: 28 }}>{step.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-black text-green-800 leading-tight">{stepLabel}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{step.time}</p>
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
                    <span style={{ fontSize: 28 }}>{step.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-stone-500 leading-tight">{stepLabel}</p>
                  </div>
                  <div className="w-9 h-9 bg-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-stone-400 text-lg">○</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 bg-white border border-stone-200 rounded-2xl px-4 py-4">
          <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">{l.afterDelivery}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { emoji: '⭐', label: l.rate,       nav: () => navigate('feedback') },
              { emoji: '⚖️', label: l.dispute,    nav: () => navigate('feedback') },
              { emoji: '📞', label: l.callDriver,  nav: () => {} },
              { emoji: '🆘', label: l.help,        nav: () => {} },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.nav}
                className="flex flex-col items-center gap-1.5 py-4 bg-stone-50 border border-stone-200 rounded-2xl active:scale-95 transition-transform"
              >
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
                <p className="text-sm font-black text-stone-700">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-3">{l.demoData} · {os.id}</p>
      </div>
    </div>
  )
}
