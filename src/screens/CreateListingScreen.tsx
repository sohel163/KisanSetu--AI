import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface Crop { emoji: string; en: string; hi: string; mr: string; te: string }
const crops: Crop[] = [
  { emoji: '🌱', en: 'Soybean',  hi: 'सोयाबीन',  mr: 'सोयाबीन',  te: 'సోయాబీన్' },
  { emoji: '🍅', en: 'Tomato',   hi: 'टमाटर',     mr: 'टोमॅटो',   te: 'టమాటా' },
  { emoji: '🧅', en: 'Onion',    hi: 'प्याज',      mr: 'कांदा',     te: 'ఉల్లిపాయ' },
  { emoji: '🌾', en: 'Wheat',    hi: 'गेहूँ',       mr: 'गहू',       te: 'గోధుమ' },
  { emoji: '🌽', en: 'Maize',    hi: 'मक्का',      mr: 'मका',       te: 'మొక్కజొన్న' },
  { emoji: '🌶️', en: 'Chili',   hi: 'मिर्च',      mr: 'मिरची',     te: 'మిరప' },
  { emoji: '🥔', en: 'Potato',   hi: 'आलू',        mr: 'बटाटा',     te: 'బంగాళాదుంప' },
  { emoji: '🫘', en: 'Other',    hi: 'अन्य',       mr: 'इतर',       te: 'ఇతర' },
]

const grades = [
  { id: 'premium', emoji: '⭐', en: 'Premium', hi: 'प्रीमियम', mr: 'प्रीमियम', te: 'ప్రీమియం' },
  { id: 'A',       emoji: '🥇', en: 'Grade A', hi: 'ग्रेड A',  mr: 'ग्रेड A',  te: 'గ్రేడ్ A' },
  { id: 'B',       emoji: '🥈', en: 'Grade B', hi: 'ग्रेड B',  mr: 'ग्रेड B',  te: 'గ్రేడ్ B' },
]

const ui: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back', title: 'Sell Direct to Consumers', step1: 'Which crop?', step2: 'Quantity & Price',
    step3: 'Quality & When', step4: 'Location', step5: 'Review & Publish',
    qty: 'Available (kg)', price: 'Your price (₹/kg)', grade: 'Quality grade',
    harvest: 'Harvested', today: 'Today', yesterday: 'Yesterday', twoDays: '2 days ago',
    location: 'Pickup location', desc: 'Short note (optional)',
    descHint: 'e.g. Freshly harvested, no chemicals',
    next: 'Next →', publish: '🌱 Publish Listing', back2: '← Back',
    cropLabel: 'Crop', priceLabel: 'Price', qtyLabel: 'Quantity', gradeLabel: 'Grade',
    harvestLabel: 'Harvested', locLabel: 'Location',
    readyMsg: 'Your listing is ready!',
    publishNote: 'Consumers nearby will be able to see and order your produce.',
  },
  hi: {
    back: 'वापस', title: 'सीधे ग्राहक को बेचो', step1: 'कौन सी फसल?', step2: 'मात्रा और भाव',
    step3: 'क्वालिटी और कटाई', step4: 'जगह', step5: 'देखो और छापो',
    qty: 'उपलब्ध (किलो)', price: 'आपका भाव (₹/किलो)', grade: 'क्वालिटी',
    harvest: 'कटाई', today: 'आज', yesterday: 'कल', twoDays: '2 दिन पहले',
    location: 'उठान की जगह', desc: 'छोटा नोट (optional)',
    descHint: 'जैसे: ताजी फसल, कोई रसायन नहीं',
    next: 'आगे →', publish: '🌱 लिस्टिंग छापो', back2: '← वापस',
    cropLabel: 'फसल', priceLabel: 'भाव', qtyLabel: 'मात्रा', gradeLabel: 'क्वालिटी',
    harvestLabel: 'कटाई', locLabel: 'जगह',
    readyMsg: 'आपकी लिस्टिंग तैयार है!',
    publishNote: 'पास के ग्राहक आपकी फसल देख और ऑर्डर कर पाएंगे।',
  },
  mr: {
    back: 'मागे', title: 'थेट ग्राहकाला विका', step1: 'कोणते पीक?', step2: 'प्रमाण आणि भाव',
    step3: 'दर्जा आणि कापणी', step4: 'ठिकाण', step5: 'पहा आणि प्रकाशित करा',
    qty: 'उपलब्ध (किलो)', price: 'तुमचा भाव (₹/किलो)', grade: 'दर्जा',
    harvest: 'कापणी', today: 'आज', yesterday: 'काल', twoDays: '2 दिवसांपूर्वी',
    location: 'उचलण्याची जागा', desc: 'छोटी नोंद (ऐच्छिक)',
    descHint: 'उदा. ताजे पीक, रासायनिक खत नाही',
    next: 'पुढे →', publish: '🌱 यादी प्रकाशित करा', back2: '← मागे',
    cropLabel: 'पीक', priceLabel: 'भाव', qtyLabel: 'प्रमाण', gradeLabel: 'दर्जा',
    harvestLabel: 'कापणी', locLabel: 'ठिकाण',
    readyMsg: 'तुमची यादी तयार आहे!',
    publishNote: 'जवळचे ग्राहक तुमचे पीक पाहू आणि ऑर्डर करू शकतात.',
  },
  te: {
    back: 'వెనుక', title: 'నేరుగా వినియోగదారులకు అమ్మండి', step1: 'ఏ పంట?', step2: 'పరిమాణం & ధర',
    step3: 'నాణ్యత & పంట తేదీ', step4: 'స్థానం', step5: 'సమీక్ష & ప్రచురించు',
    qty: 'అందుబాటులో ఉన్నది (కిలో)', price: 'మీ ధర (₹/కిలో)', grade: 'నాణ్యత',
    harvest: 'పంట కోత', today: 'ఈరోజు', yesterday: 'నిన్న', twoDays: '2 రోజుల క్రితం',
    location: 'పికప్ స్థానం', desc: 'చిన్న నోట్ (ఐచ్ఛికం)',
    descHint: 'ఉదా. తాజా పంట, రసాయనాలు లేవు',
    next: 'తదుపరి →', publish: '🌱 లిస్టింగ్ ప్రచురించు', back2: '← వెనుక',
    cropLabel: 'పంట', priceLabel: 'ధర', qtyLabel: 'పరిమాణం', gradeLabel: 'నాణ్యత',
    harvestLabel: 'పంట కోత', locLabel: 'స్థానం',
    readyMsg: 'మీ లిస్టింగ్ సిద్ధంగా ఉంది!',
    publishNote: 'సమీప వినియోగదారులు మీ పంటను చూసి ఆర్డర్ చేయవచ్చు.',
  },
}

const cropName = (c: Crop, lang: Language) =>
  lang === 'hi' ? c.hi : lang === 'mr' ? c.mr : lang === 'te' ? c.te : c.en

const gradeName = (g: typeof grades[0], lang: Language) =>
  lang === 'hi' ? g.hi : lang === 'mr' ? g.mr : lang === 'te' ? g.te : g.en

export default function CreateListingScreen({ navigate, lang = 'en' }: NavProps) {
  const [step, setStep] = useState(0)
  const [crop, setCrop] = useState<Crop | null>(null)
  const [qty, setQty] = useState('100')
  const [price, setPrice] = useState('65')
  const [grade, setGrade] = useState(grades[0])
  const [harvest, setHarvest] = useState('today')
  const [location, setLocation] = useState('Akola')
  const [desc, setDesc] = useState('')
  const l = ui[lang]

  const steps = [l.step1, l.step2, l.step3, l.step4, l.step5]

  const canNext = () => {
    if (step === 0) return crop !== null
    return true
  }

  const handlePublish = () => navigate('myListings')

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button onClick={() => step === 0 ? navigate('sellingChannels') : setStep(s => s - 1)} className="flex items-center gap-2 text-stone-500 text-base font-bold mb-3 active:opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          {l.back}
        </button>
        <h1 className="text-xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>{l.title}</h1>
        {/* Step dots */}
        <div className="flex gap-1.5 mt-3">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-green-600' : 'bg-stone-200'}`} />
          ))}
        </div>
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest mt-2">{steps[step]}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">

        {/* Step 0: Crop */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {crops.map((c) => (
              <button
                key={c.en}
                onClick={() => setCrop(c)}
                className={`rounded-2xl border-2 p-4 text-left active:scale-[0.97] transition-all ${crop?.en === c.en ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-white'}`}
                style={{ minHeight: 90 }}
              >
                <span style={{ fontSize: 36 }}>{c.emoji}</span>
                <p className={`text-base font-black mt-2 ${crop?.en === c.en ? 'text-green-800' : 'text-stone-900'}`}>{cropName(c, lang)}</p>
                {lang !== 'en' && <p className="text-xs text-stone-400">{c.en}</p>}
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Qty & Price */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 32 }}>📦</span>
                <p className="font-black text-stone-700">{l.qty}</p>
              </div>
              <input
                type="number"
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-full text-4xl font-black text-stone-900 bg-transparent outline-none border-b-2 border-stone-200 pb-1 focus:border-green-500"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 32 }}>💰</span>
                <p className="font-black text-stone-700">{l.price}</p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-stone-400">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="flex-1 text-4xl font-black text-stone-900 bg-transparent outline-none border-b-2 border-stone-200 pb-1 focus:border-green-500"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
              </div>
              <p className="text-sm text-stone-400 mt-2">
                = ₹{(+qty * +price).toLocaleString('en-IN')} total
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Grade & Harvest */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{l.grade}</p>
              {grades.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGrade(g)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left active:scale-[0.98] transition-all ${grade.id === g.id ? 'border-green-500 bg-green-50' : 'border-stone-200 bg-white'}`}
                >
                  <span style={{ fontSize: 32 }}>{g.emoji}</span>
                  <div className="flex-1">
                    <p className={`font-black text-base ${grade.id === g.id ? 'text-green-800' : 'text-stone-800'}`}>{gradeName(g, lang)}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${grade.id === g.id ? 'border-green-700 bg-green-700' : 'border-stone-300'}`}>
                    {grade.id === g.id && <span className="text-white text-sm font-black">✓</span>}
                  </div>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{l.harvest}</p>
              <div className="flex gap-2">
                {[['today', l.today], ['yesterday', l.yesterday], ['two', l.twoDays]].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setHarvest(id)}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${harvest === id ? 'border-green-500 bg-green-50 text-green-800' : 'border-stone-200 bg-white text-stone-700'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 32 }}>📍</span>
                <p className="font-black text-stone-700">{l.location}</p>
              </div>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full text-xl font-black text-stone-900 bg-transparent outline-none border-b-2 border-stone-200 pb-1 focus:border-green-500"
              />
            </div>
            <div className="bg-white rounded-2xl border border-stone-200 px-4 py-4">
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontSize: 32 }}>📝</span>
                <p className="font-black text-stone-700">{l.desc}</p>
              </div>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder={l.descHint}
                rows={3}
                className="w-full text-base text-stone-900 bg-transparent outline-none resize-none placeholder:text-stone-300"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="bg-green-700 px-4 py-3 flex items-center gap-3">
                <span style={{ fontSize: 32 }}>{crop?.emoji ?? '🌾'}</span>
                <p className="text-white font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {crop ? cropName(crop, lang) : '—'}
                </p>
              </div>
              <div className="divide-y divide-stone-100">
                {[
                  { emoji: '💰', label: l.priceLabel, val: `₹${price}/kg` },
                  { emoji: '📦', label: l.qtyLabel,   val: `${qty} kg` },
                  { emoji: '⭐', label: l.gradeLabel,  val: gradeName(grade, lang) },
                  { emoji: '📅', label: l.harvestLabel, val: harvest === 'today' ? l.today : harvest === 'yesterday' ? l.yesterday : l.twoDays },
                  { emoji: '📍', label: l.locLabel,    val: location },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4 px-4 py-3">
                    <span style={{ fontSize: 24 }}>{row.emoji}</span>
                    <p className="flex-1 text-sm text-stone-500">{row.label}</p>
                    <p className="font-black text-stone-900">{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
              <p className="text-green-800 text-sm font-bold">{l.readyMsg}</p>
              <p className="text-green-600 text-xs mt-0.5">{l.publishNote}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 pb-8 pt-2 bg-white border-t border-stone-100">
        <button
          onClick={() => step < 4 ? (canNext() && setStep(s => s + 1)) : handlePublish()}
          disabled={step < 4 && !canNext()}
          className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform disabled:opacity-40"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {step === 4 ? l.publish : l.next}
        </button>
      </div>
    </div>
  )
}
