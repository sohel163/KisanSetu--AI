import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface ChannelT {
  emoji: string
  key: string
  net: number
  highlight?: boolean
}

const channels: ChannelT[] = [
  { emoji: '🏠', key: 'consumer', net: 6200, highlight: true },
  { emoji: '🏢', key: 'fpo',      net: 5750 },
  { emoji: '🛒', key: 'buyer',    net: 5700 },
  { emoji: '🏪', key: 'mandi',    net: 5600 },
]

interface SellingChannelsT {
  back: string; title: string; sub: string;
  consumer: string; fpo: string; buyer: string; mandi: string;
  youGet: string; recommended: string; potentially: string;
  why: string; whyClose: string;
  pros: string[]; cons: string[]; prosLabel: string; consLabel: string;
  sellDirect: string; compareBuyers: string; note: string;
}

const t: Record<Language, SellingChannelsT> = {
  en: {
    back: 'Back', title: 'Selling Channels', sub: '100 kg Soybean · Estimated',
    consumer: 'Direct Consumer', fpo: 'FPO', buyer: 'Buyer', mandi: 'Mandi',
    youGet: 'Expected net',
    recommended: '⭐ RECOMMENDED', potentially: 'Potentially highest earnings',
    why: '⭐ Why sell direct?', whyClose: 'Close ↑',
    pros: ['Higher price per kg', 'No middleman fee', 'Nearby consumer demand'],
    cons: ['Smaller order sizes', 'More handling effort', 'Delivery coordination'],
    prosLabel: '✓ Advantages', consLabel: '⚠ Consider',
    sellDirect: '🌱 Sell Direct →', compareBuyers: 'Compare Buyers →',
    note: '* Estimated. Actual earnings may vary. Not a guarantee.',
  },
  hi: {
    back: 'वापस', title: 'बेचने के तरीके', sub: '100 किलो सोयाबीन · अनुमानित',
    consumer: 'सीधे ग्राहक को', fpo: 'किसान समूह', buyer: 'खरीदार', mandi: 'मंडी',
    youGet: 'अनुमानित कमाई',
    recommended: '⭐ सबसे अच्छा', potentially: 'सबसे ज़्यादा कमाई हो सकती है',
    why: '⭐ सीधे क्यों बेचें?', whyClose: 'बंद करो ↑',
    pros: ['ज़्यादा भाव मिलता है', 'बीच में कोई नहीं', 'पास में ग्राहक हैं'],
    cons: ['कम मात्रा में ऑर्डर', 'ज़्यादा काम', 'डिलीवरी करनी होगी'],
    prosLabel: '✓ फायदे', consLabel: '⚠ ध्यान रखें',
    sellDirect: '🌱 सीधे बेचो →', compareBuyers: 'खरीदार देखो →',
    note: '* अनुमानित। वास्तविक कमाई अलग हो सकती है — गारंटी नहीं।',
  },
  mr: {
    back: 'मागे', title: 'विकण्याचे मार्ग', sub: '100 किलो सोयाबीन · अंदाजे',
    consumer: 'थेट ग्राहकाला', fpo: 'शेतकरी संघटना', buyer: 'खरेदीदार', mandi: 'बाजार',
    youGet: 'अंदाजे कमाई',
    recommended: '⭐ सर्वोत्तम', potentially: 'सर्वाधिक कमाई होऊ शकते',
    why: '⭐ थेट का विकावे?', whyClose: 'बंद करा ↑',
    pros: ['जास्त भाव मिळतो', 'मध्यस्थ नाही', 'जवळचे ग्राहक'],
    cons: ['लहान ऑर्डर', 'जास्त काम', 'डिलिव्हरी करावी लागते'],
    prosLabel: '✓ फायदे', consLabel: '⚠ लक्षात ठेवा',
    sellDirect: '🌱 थेट विका →', compareBuyers: 'खरेदीदार पहा →',
    note: '* अंदाजे. प्रत्यक्ष कमाई वेगळी असू शकते — हमी नाही.',
  },
  te: {
    back: 'వెనుక', title: 'అమ్మకం మార్గాలు', sub: '100 కిలో సోయాబీన్ · అంచనా',
    consumer: 'నేరుగా వినియోగదారునికి', fpo: 'FPO', buyer: 'కొనుగోలుదారు', mandi: 'మంది',
    youGet: 'అంచనా నికర మొత్తం',
    recommended: '⭐ సిఫార్సు చేయబడింది', potentially: 'ఎక్కువ సంపాదన సాధ్యం',
    why: '⭐ నేరుగా ఎందుకు అమ్మాలి?', whyClose: 'మూయండి ↑',
    pros: ['ఎక్కువ ధర వస్తుంది', 'మధ్యవర్తి లేదు', 'సమీప వినియోగదారులు'],
    cons: ['చిన్న ఆర్డర్లు', 'ఎక్కువ శ్రమ', 'డెలివరీ అవసరం'],
    prosLabel: '✓ ప్రయోజనాలు', consLabel: '⚠ పరిగణించాల్సినవి',
    sellDirect: '🌱 నేరుగా అమ్ము →', compareBuyers: 'కొనుగోలుదారులు →',
    note: '* అంచనా. వాస్తవ ఆదాయం మారవచ్చు — హామీ కాదు.',
  },
}

export default function SellingChannelsScreen({ navigate, lang = 'en' }: NavProps) {
  const [whyOpen, setWhyOpen] = useState(false)
  const l = t[lang]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 text-stone-500 text-base font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
        <p className="text-sm text-stone-500 mt-0.5">🌱 {l.sub}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-6">
        {channels.map((ch) => {
          const name = l[ch.key as keyof SellingChannelsT] as string
          return (
            <div
              key={ch.key}
              className={`rounded-3xl overflow-hidden border-2 ${ch.highlight ? 'border-green-500' : 'border-stone-200 bg-white'}`}
            >
              {ch.highlight && (
                <div className="bg-green-700 px-4 py-2.5 flex items-center gap-2">
                  <span className="text-white">{l.recommended}</span>
                </div>
              )}
              <div className={`px-4 py-4 flex items-center gap-4 ${ch.highlight ? 'bg-green-50' : 'bg-white'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${ch.highlight ? 'bg-green-100' : 'bg-stone-100'}`}>
                  {ch.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>{name}</p>
                  {ch.highlight && <p className="text-green-700 text-xs font-bold mt-0.5">{l.potentially}</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-stone-400 font-semibold">{l.youGet}</p>
                  <p className={`text-2xl font-black leading-tight ${ch.highlight ? 'text-green-700' : 'text-stone-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{ch.net.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Why sell direct */}
        <button
          onClick={() => setWhyOpen(!whyOpen)}
          className={`w-full py-3 rounded-xl border-2 font-black text-sm transition-all active:scale-[0.98] ${whyOpen ? 'bg-stone-800 border-stone-800 text-white' : 'bg-white border-stone-200 text-stone-700'}`}
        >
          {whyOpen ? l.whyClose : l.why}
        </button>

        {whyOpen && (
          <div className="bg-stone-900 rounded-2xl px-4 py-4 space-y-4">
            <div>
              <p className="text-green-400 text-xs font-black uppercase tracking-wider mb-2">{l.prosLabel}</p>
              <div className="space-y-2">
                {l.pros.map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="text-green-400 text-lg font-black flex-shrink-0">✓</span>
                    <p className="text-white text-sm font-bold">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-amber-400 text-xs font-black uppercase tracking-wider mb-2">{l.consLabel}</p>
              <div className="space-y-2">
                {l.cons.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <span className="text-amber-400 text-lg flex-shrink-0">⚠</span>
                    <p className="text-stone-300 text-sm">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-stone-500 text-xs pt-1">{l.note}</p>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => navigate('createListing')}
            className="flex-1 py-5 bg-green-700 text-white rounded-2xl font-black text-base shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {l.sellDirect}
          </button>
          <button
            onClick={() => navigate('bestOptions')}
            className="flex-1 py-5 bg-white border-2 border-stone-200 text-stone-700 rounded-2xl font-black text-sm active:opacity-80"
          >
            {l.compareBuyers}
          </button>
        </div>

        <p className="text-center text-xs text-stone-400">{l.note}</p>
      </div>
    </div>
  )
}
