import { useState } from 'react'
import type { NavProps, Language } from '../types'
import { recommendations } from '../data'

interface BestOptionsT {
  back: string; title: string;
  bestFor: string; other: string;
  youGet: string; best: string;
  established: string; verified: string; newBuyer: string;
  why: string; whyClose: string; because: string;
  reasons: string[];
  seeBuyer: string; accept: string;
  sellNow: string; sellSub: string; estNote: string;
  deals: string; paysOnTime: string; fullQty: string;
}

const t: Record<Language, BestOptionsT> = {
  en: {
    back: 'Back', title: 'Best Options',
    bestFor: 'BEST FOR YOU', other: 'OTHER OPTION',
    youGet: 'YOU MAY GET', best: '↑ BEST',
    established: 'Established', verified: 'Verified', newBuyer: 'New · Verified',
    why: '⭐ Why this buyer?', whyClose: 'Close ↑', because: 'Because',
    reasons: ['More money stays with you', 'Less transport cost', 'Takes your full quantity', 'Has done many deals before', 'Pays on time'],
    seeBuyer: '👤 See Profile', accept: '✓ ACCEPT →',
    sellNow: 'Sell within 24–48 hours', sellSub: 'Price is falling · Spoilage risk high',
    estNote: '* Estimated — may change after weighing',
    deals: 'deals', paysOnTime: 'Pays on time', fullQty: 'Takes full qty',
  },
  hi: {
    back: 'वापस', title: 'सबसे अच्छे विकल्प',
    bestFor: 'आपके लिए बेस्ट', other: 'दूसरा विकल्प',
    youGet: 'आपको मिलेगा', best: '↑ बेस्ट',
    established: 'पुराना', verified: 'सत्यापित', newBuyer: 'नया · भरोसेमंद',
    why: '⭐ क्यों यह खरीदार?', whyClose: 'बंद करो ↑', because: 'क्योंकि',
    reasons: ['ज़्यादा पैसे मिलते हैं', 'ट्रक खर्च कम है', 'पूरी फसल लेते हैं', 'पहले भी सौदे किए हैं', 'समय पर पैसे देते हैं'],
    seeBuyer: '👤 प्रोफाइल देखो', accept: '✓ हाँ करो →',
    sellNow: '24–48 घंटे में बेचो', sellSub: 'भाव गिर रहे हैं · खराब होने का खतरा',
    estNote: '* अनुमानित — तोलने के बाद बदल सकता है',
    deals: 'सौदे', paysOnTime: 'समय पर पैसे', fullQty: 'पूरी फसल',
  },
  mr: {
    back: 'मागे', title: 'सर्वोत्तम पर्याय',
    bestFor: 'तुमच्यासाठी बेस्ट', other: 'दुसरा पर्याय',
    youGet: 'तुम्हाला मिळेल', best: '↑ बेस्ट',
    established: 'जुना', verified: 'तपासलेला', newBuyer: 'नवीन · विश्वासू',
    why: '⭐ हा खरेदीदार का?', whyClose: 'बंद करा ↑', because: 'कारण',
    reasons: ['जास्त पैसे मिळतात', 'ट्रक खर्च कमी', 'संपूर्ण पीक घेतात', 'आधीही सौदे केले', 'वेळेवर पैसे देतात'],
    seeBuyer: '👤 प्रोफाइल पहा', accept: '✓ मान्य करा →',
    sellNow: '24–48 तासांत विका', sellSub: 'भाव खाली जात आहेत · पीक खराब होण्याचा धोका',
    estNote: '* अंदाजे — वजनानंतर बदलू शकतो',
    deals: 'सौदे', paysOnTime: 'वेळेत पैसे', fullQty: 'पूर्ण पीक',
  },
  te: {
    back: 'వెనుక', title: 'అత్యుత్తమ ఎంపికలు',
    bestFor: 'మీకు అత్యుత్తమం', other: 'మరో ఎంపిక',
    youGet: 'మీకు వచ్చే మొత్తం', best: '↑ అత్యుత్తమం',
    established: 'అనుభవజ్ఞుడు', verified: 'ధృవీకరించిన', newBuyer: 'కొత్త · ధృవీకరించిన',
    why: '⭐ ఈ కొనుగోలుదారు ఎందుకు?', whyClose: 'మూయండి ↑', because: 'ఎందుకంటే',
    reasons: ['ఎక్కువ పైసలు వస్తాయి', 'రవాణా తక్కువ', 'పూర్తి పంట తీసుకుంటారు', 'గతంలో చాలా డీల్స్ చేశారు', 'సమయానికి చెల్లిస్తారు'],
    seeBuyer: '👤 ప్రొఫైల్ చూడు', accept: '✓ అంగీకరించు →',
    sellNow: '24–48 గంటల్లో అమ్మండి', sellSub: 'ధర తగ్గుతోంది · పంట పాడవుతుంది',
    estNote: '* అంచనా — తూకం తర్వాత మారవచ్చు',
    deals: 'సౌదాలు', paysOnTime: 'సమయానికి పైసలు', fullQty: 'పూర్తి పంట',
  },
}

export default function BestOptionsScreen({ navigate, lang = 'en' }: NavProps) {
  const [whyOpen, setWhyOpen] = useState<number | null>(null)
  const l = t[lang]

  const trustLabel = (rank: number) => {
    if (rank === 1) return { icon: '✅', label: l.established, color: 'text-green-700', bg: 'bg-green-100' }
    if (rank === 2) return { icon: '✓',  label: l.verified,    color: 'text-blue-700',  bg: 'bg-blue-100' }
    return               { icon: '🆕', label: l.newBuyer,    color: 'text-amber-700', bg: 'bg-amber-100' }
  }

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-stone-500 text-base font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-6">
        {recommendations.map((rec) => {
          const isOpen = whyOpen === rec.rank
          const trust = trustLabel(rec.rank)

          return (
            <div key={rec.rank} className={`rounded-3xl overflow-hidden border-2 ${rec.highlight ? 'border-green-500' : 'border-stone-200 bg-white'}`}>
              {/* Banner */}
              {rec.highlight ? (
                <div className="bg-green-700 px-4 py-2.5 flex items-center gap-2">
                  <span className="text-white text-lg">⭐</span>
                  <p className="text-white font-black text-sm">{l.bestFor}</p>
                </div>
              ) : (
                <div className="bg-stone-100 px-4 py-2">
                  <p className="text-stone-500 text-xs font-black">#{rec.rank} {l.other}</p>
                </div>
              )}

              <div className={`px-4 py-4 ${rec.highlight ? 'bg-green-50' : 'bg-white'}`}>
                {/* Buyer row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${rec.highlight ? 'bg-green-100' : 'bg-stone-100'}`}>👤</div>
                  <div className="flex-1">
                    <p className="text-lg font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{rec.name}</p>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full mt-1 ${trust.bg}`}>
                      <span className="text-xs">{trust.icon}</span>
                      <span className={`text-xs font-bold ${trust.color}`}>{trust.label}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{rec.price}/kg</p>
                    <p className="text-xs text-stone-400">{rec.distance} km</p>
                  </div>
                </div>

                {/* YOU MAY GET */}
                <div className={`rounded-2xl px-4 py-4 mb-3 ${rec.highlight ? 'bg-green-700' : 'bg-stone-800'}`}>
                  <p className="text-xs font-black text-white/50 uppercase tracking-widest mb-1">{l.youGet}</p>
                  <div className="flex items-end justify-between">
                    <p className="font-black text-white leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 44 }}>
                      ₹{rec.netEarnings.toLocaleString('en-IN')}
                    </p>
                    {rec.highlight && <p className="text-green-200 font-black">{l.best}</p>}
                  </div>
                </div>

                {/* WHY button */}
                <button
                  onClick={() => setWhyOpen(isOpen ? null : rec.rank)}
                  className={`w-full py-3 rounded-xl border-2 font-black text-sm transition-all active:scale-[0.98] mb-3 ${isOpen ? 'bg-stone-800 border-stone-800 text-white' : 'bg-white border-stone-200 text-stone-700'}`}
                >
                  {isOpen ? l.whyClose : l.why}
                </button>

                {isOpen && (
                  <div className="bg-stone-900 rounded-2xl px-4 py-4 mb-3 space-y-3">
                    <p className="text-white text-sm font-black">{l.because}:</p>
                    {l.reasons.map((reason, i) => {
                      const emojis = ['💰', '🚚', '📦', '👤', '💳']
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span style={{ fontSize: 28 }}>{emojis[i]}</span>
                          <p className="text-white text-sm font-bold">{reason}</p>
                        </div>
                      )
                    })}
                    <p className="text-stone-500 text-xs pt-1">{l.estNote}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => navigate('buyers')} className="flex-1 py-3.5 bg-stone-100 text-stone-700 rounded-2xl font-black text-sm active:opacity-80">
                    {l.seeBuyer}
                  </button>
                  {rec.highlight && (
                    <button onClick={() => navigate('negotiation')} className="flex-1 py-3.5 bg-green-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-green-200 active:scale-[0.98] transition-transform">
                      {l.accept}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Urgency banner */}
        <div className="bg-stone-900 rounded-2xl px-4 py-4 flex items-start gap-3">
          <span style={{ fontSize: 32 }}>⚠️</span>
          <div className="flex-1">
            <p className="text-white font-black text-base">{l.sellNow}</p>
            <p className="text-stone-400 text-sm mt-0.5">{l.sellSub}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
