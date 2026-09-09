import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface Crop {
  name: string
  emoji: string
  hi: string
  mr: string
  te: string
}

const crops: Crop[] = [
  { name: 'Tomatoes', emoji: '🍅', hi: 'टमाटर',    mr: 'टोमॅटो',   te: 'టమాటాలు' },
  { name: 'Onion',    emoji: '🧅', hi: 'प्याज',    mr: 'कांदा',     te: 'ఉల్లిపాయలు' },
  { name: 'Chillies', emoji: '🌶️', hi: 'मिर्च',    mr: 'मिरची',    te: 'మిర్చి' },
  { name: 'Potato',   emoji: '🥔', hi: 'आलू',      mr: 'बटाटा',     te: 'బంగాళాదుంపలు' },
  { name: 'Soybean',  emoji: '🫘', hi: 'सोयाबीन',  mr: 'सोयाबीन',  te: 'సోయాబీన్' },
  { name: 'Wheat',    emoji: '🌾', hi: 'गेहूं',    mr: 'गहू',       te: 'గోధుమ' },
  { name: 'Corn',     emoji: '🌽', hi: 'मक्का',    mr: 'मका',       te: 'మొక్కజొన్న' },
  { name: 'Brinjal',  emoji: '🍆', hi: 'बैंगन',    mr: 'वांगं',     te: 'వంకాయ' },
  { name: 'Other',    emoji: '➕', hi: 'और कुछ',  mr: 'इतर',       te: 'ఇతర' },
]

interface Urgency {
  id: string
  emoji: string
  en: string
  hi: string
  mr: string
  te: string
}

const urgencies: Urgency[] = [
  { id: 'today',  emoji: '☀️', en: 'TODAY',    hi: 'आज ही',       mr: 'आजच',          te: 'నేడే' },
  { id: 'soon',   emoji: '📅', en: '1–2 DAYS', hi: '1–2 दिन में',  mr: '1–2 दिवसांत',  te: '1–2 రోజులు' },
  { id: 'week',   emoji: '📅', en: '3–7 DAYS', hi: '3–7 दिन में',  mr: '3–7 दिवसांत',  te: '3–7 రోజులు' },
  { id: 'norush', emoji: '🕐', en: 'NO RUSH',  hi: 'जल्दी नहीं',   mr: 'घाई नाही',     te: 'తొందర లేదు' },
]

interface Quality {
  id: string
  emoji: string
  en: string
  hi: string
  mr: string
  te: string
  sub: string
}

const qualities: Quality[] = [
  { id: 'A', emoji: '⭐', en: 'Grade A', hi: 'ग्रेड A — बढ़िया',  mr: 'ग्रेड A — चांगला',  te: 'గ్రేడ్ A', sub: 'Best quality' },
  { id: 'B', emoji: '✓',  en: 'Grade B', hi: 'ग्रेड B — ठीक है',   mr: 'ग्रेड B — बरा आहे', te: 'గ్రేడ్ B', sub: 'Good quality' },
  { id: 'C', emoji: '○',  en: 'Grade C', hi: 'ग्रेड C — साधा',     mr: 'ग्रेड C — साधा',   te: 'గ్రేడ్ C', sub: 'Average quality' },
]

const stepQ: Record<Language, [string, string][]> = {
  en: [
    ['WHAT DO YOU WANT TO SELL?', 'Choose your crop'],
    ['HOW MUCH?', 'Enter quantity'],
    ['WHEN TO SELL?', 'Choose urgency'],
    ['QUALITY?', 'Choose grade'],
  ],
  hi: [
    ['क्या बेचना है?', 'अपनी फसल चुनो'],
    ['कितना?', 'मात्रा बताओ'],
    ['कब बेचना है?', 'समय चुनो'],
    ['कैसा माल है?', 'ग्रेड चुनो'],
  ],
  mr: [
    ['काय विकायचं?', 'तुमचं पीक निवडा'],
    ['किती?', 'किती पीक आहे'],
    ['कधी विकायचं?', 'वेळ निवडा'],
    ['कसं पीक आहे?', 'ग्रेड निवडा'],
  ],
  te: [
    ['ఏం అమ్మాలి?', 'మీ పంట ఎంచుకోండి'],
    ['ఎంత?', 'పరిమాణం చెప్పండి'],
    ['ఎప్పుడు?', 'సమయం ఎంచుకోండి'],
    ['నాణ్యత?', 'గ్రేడ్ ఎంచుకోండి'],
  ],
}

const ui: Record<Language, Record<string, string>> = {
  en: {
    speak: 'Tap to speak',
    speakSub: 'Say the crop name',
    next: 'NEXT →',
    selectAbove: 'SELECT ABOVE',
    findBuyers: '🔍 FIND BEST BUYERS →',
    quintal: '🧺 QUINTAL',
    kg: '⚖️ KG',
    perKg: 'per kg',
    quickSelect: 'Quick select',
    summary: 'Your crop summary',
    crop: 'Crop', qty: 'Quantity', when: 'When', quality: 'Quality',
    back: 'Back',
    approxKg: '= {n} kg',
    tapChange: 'Tap − or + to change',
  },
  hi: {
    speak: 'बोलकर बताओ',
    speakSub: 'फसल का नाम बोलो',
    next: 'आगे →',
    selectAbove: 'ऊपर से चुनो',
    findBuyers: '🔍 खरीदार खोजो →',
    quintal: '🧺 क्विंटल',
    kg: '⚖️ किलो',
    perKg: 'प्रति किलो',
    quickSelect: 'जल्दी चुनो',
    summary: 'आपकी फसल',
    crop: 'फसल', qty: 'मात्रा', when: 'कब', quality: 'ग्रेड',
    back: 'वापस',
    approxKg: '= {n} किलो',
    tapChange: '− या + दबाओ',
  },
  mr: {
    speak: 'बोलून सांगा',
    speakSub: 'पिकाचं नाव सांगा',
    next: 'पुढे →',
    selectAbove: 'वर निवडा',
    findBuyers: '🔍 खरेदीदार शोधा →',
    quintal: '🧺 क्विंटल',
    kg: '⚖️ किलो',
    perKg: 'प्रति किलो',
    quickSelect: 'लवकर निवडा',
    summary: 'तुमचं पीक',
    crop: 'पीक', qty: 'किती', when: 'कधी', quality: 'ग्रेड',
    back: 'मागे',
    approxKg: '= {n} किलो',
    tapChange: '− किंवा + दाबा',
  },
  te: {
    speak: 'మాట్లాడండి',
    speakSub: 'పంట పేరు చెప్పండి',
    next: 'తర్వాత →',
    selectAbove: 'పైన ఎంచుకోండి',
    findBuyers: '🔍 కొనుగోలుదారులను వెతకండి →',
    quintal: '🧺 క్వింటల్',
    kg: '⚖️ కిలో',
    perKg: 'కిలోకు',
    quickSelect: 'వేగంగా ఎంచుకోండి',
    summary: 'మీ పంట',
    crop: 'పంట', qty: 'పరిమాణం', when: 'ఎప్పుడు', quality: 'గ్రేడ్',
    back: 'వెనుక',
    approxKg: '= {n} కిలో',
    tapChange: '− లేదా + నొక్కండి',
  },
}

function localName(c: Crop, lang: Language): string {
  if (lang === 'hi') return c.hi
  if (lang === 'mr') return c.mr
  if (lang === 'te') return c.te
  return c.name
}

function urgLabel(u: Urgency, lang: Language): [string, string] {
  if (lang === 'hi') return [u.hi, u.en]
  if (lang === 'mr') return [u.mr, u.en]
  if (lang === 'te') return [u.te, u.en]
  return [u.en, '']
}

function qualLabel(q: Quality, lang: Language): [string, string] {
  if (lang === 'hi') return [q.hi, q.sub]
  if (lang === 'mr') return [q.mr, q.sub]
  if (lang === 'te') return [q.te, q.sub]
  return [q.en, q.sub]
}

export default function AddProduceScreen({ navigate, lang = 'en' }: NavProps) {
  const [step, setStep] = useState(0)
  const [crop, setCrop] = useState<Crop | null>(null)
  const [quantity, setQuantity] = useState(20)
  const [unit, setUnit] = useState<'quintal' | 'kg'>('quintal')
  const [urgency, setUrgency] = useState<string | null>(null)
  const [quality, setQuality] = useState<string | null>(null)

  const l = ui[lang]
  const q = stepQ[lang]
  const qtyStep = unit === 'quintal' ? 1 : 50
  const totalKg = unit === 'quintal' ? quantity * 100 : quantity

  const canNext = [!!crop, quantity > 0, !!urgency, !!quality]

  return (
    <div className="flex flex-col h-full" style={{ background: '#F4EFE4' }}>

      {/* ── HEADER ─────────────────────────────────── */}
      <div className="bg-white px-4 pt-10 pb-4 border-b border-stone-100">
        <button
          onClick={() => step === 0 ? navigate('home') : setStep(step - 1)}
          className="flex items-center gap-2 text-stone-500 text-base font-bold mb-3 active:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {l.back}
        </button>
        {/* Progress */}
        <div className="flex gap-2 mb-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`rounded-full h-2 transition-all ${i <= step ? 'bg-green-600 flex-1' : 'bg-stone-200 w-6'}`} />
          ))}
        </div>
        <h1 className="text-2xl font-black text-stone-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {q[step][0]}
        </h1>
        <p className="text-sm text-stone-400 mt-0.5">{q[step][1]}</p>
      </div>

      {/* ── CONTENT ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        {/* STEP 0 — CROP */}
        {step === 0 && (
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3.5">
              <span className="text-3xl">🎤</span>
              <div className="text-left">
                <p className="text-sm font-black text-amber-700">{l.speak}</p>
                <p className="text-xs text-amber-600">{l.speakSub}</p>
              </div>
            </button>
            <div className="grid grid-cols-3 gap-2">
              {crops.map((c) => {
                const name = localName(c, lang)
                const selected = crop?.name === c.name
                return (
                  <button
                    key={c.name}
                    onClick={() => setCrop(c)}
                    className={`rounded-2xl py-4 px-2 flex flex-col items-center gap-1.5 border-2 transition-all active:scale-95 ${
                      selected ? 'bg-green-700 border-green-700' : 'bg-white border-stone-200'
                    }`}
                    style={{ minHeight: 96 }}
                  >
                    <span style={{ fontSize: 40 }}>{c.emoji}</span>
                    <p className={`text-sm font-black leading-tight text-center ${selected ? 'text-white' : 'text-stone-800'}`}>{name}</p>
                    {lang !== 'en' && <p className={`text-xs leading-tight text-center ${selected ? 'text-green-100' : 'text-stone-400'}`}>{c.name}</p>}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 1 — QUANTITY */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex bg-stone-200 rounded-2xl p-1">
              {(['quintal', 'kg'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => { setUnit(u); setQuantity(u === 'quintal' ? 20 : 1000) }}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${unit === u ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
                >
                  {u === 'quintal' ? l.quintal : l.kg}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center py-6 bg-white rounded-3xl border border-stone-200 shadow-sm">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - qtyStep))}
                  className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center border-2 border-stone-200 active:bg-stone-200 transition-colors"
                  style={{ fontSize: 32 }}
                >−</button>
                <div className="text-center min-w-[120px]">
                  <p className="font-black text-stone-900 leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 72 }}>
                    {quantity}
                  </p>
                  <p className="text-sm text-stone-400 mt-1">
                    {l.approxKg.replace('{n}', totalKg.toLocaleString('en-IN'))}
                  </p>
                </div>
                <button
                  onClick={() => setQuantity(quantity + qtyStep)}
                  className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center active:bg-green-800 transition-colors"
                  style={{ fontSize: 32, color: 'white' }}
                >+</button>
              </div>
              <p className="text-xs text-stone-400 mt-4">{l.tapChange}</p>
            </div>

            <div>
              <p className="text-xs font-black text-stone-400 uppercase mb-2">{l.quickSelect}</p>
              <div className="flex gap-2 flex-wrap">
                {(unit === 'quintal' ? [5, 10, 20, 50, 100] : [100, 500, 1000, 2000]).map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuantity(n)}
                    className={`px-4 py-2.5 rounded-xl border-2 font-black text-sm transition-all ${
                      quantity === n ? 'bg-green-700 border-green-700 text-white' : 'bg-white border-stone-200 text-stone-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — WHEN */}
        {step === 2 && (
          <div className="space-y-3">
            {urgencies.map((u) => {
              const [primary, secondary] = urgLabel(u, lang)
              const selected = urgency === u.id
              return (
                <button
                  key={u.id}
                  onClick={() => setUrgency(u.id)}
                  className={`w-full flex items-center gap-5 rounded-2xl border-2 px-5 py-5 transition-all active:scale-[0.98] ${
                    selected ? 'bg-green-700 border-green-700' : 'bg-white border-stone-200'
                  }`}
                  style={{ minHeight: 80 }}
                >
                  <span style={{ fontSize: 44 }}>{u.emoji}</span>
                  <div className="text-left flex-1">
                    <p className={`text-xl font-black leading-tight ${selected ? 'text-white' : 'text-stone-900'}`}>{primary}</p>
                    {secondary && <p className={`text-sm mt-0.5 ${selected ? 'text-green-200' : 'text-stone-400'}`}>{secondary}</p>}
                  </div>
                  {selected && <span className="text-white text-2xl font-black">✓</span>}
                </button>
              )
            })}
          </div>
        )}

        {/* STEP 3 — QUALITY */}
        {step === 3 && (
          <div className="space-y-3">
            {qualities.map((q) => {
              const [primary, sub] = qualLabel(q, lang)
              const selected = quality === q.id
              return (
                <button
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`w-full flex items-center gap-5 rounded-2xl border-2 px-5 py-5 transition-all active:scale-[0.98] ${
                    selected ? 'bg-green-700 border-green-700' : 'bg-white border-stone-200'
                  }`}
                  style={{ minHeight: 80 }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${selected ? 'bg-white/20' : 'bg-stone-100'}`}>
                    <span className={`text-2xl font-black ${selected ? 'text-white' : 'text-stone-700'}`}>{q.emoji}</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className={`text-xl font-black leading-tight ${selected ? 'text-white' : 'text-stone-900'}`}>{primary}</p>
                    <p className={`text-sm mt-0.5 ${selected ? 'text-green-200' : 'text-stone-500'}`}>{sub}</p>
                  </div>
                  {selected && <span className="text-white text-2xl font-black">✓</span>}
                </button>
              )
            })}

            {crop && quality && (
              <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-4 mt-2">
                <p className="text-xs font-black text-green-700 uppercase mb-3">{l.summary}</p>
                {[
                  [l.crop, `${crop.emoji} ${localName(crop, lang)}`],
                  [l.qty, `${quantity} ${unit} (${totalKg.toLocaleString('en-IN')} kg)`],
                  [l.when, urgencies.find(u => u.id === urgency) ? urgLabel(urgencies.find(u => u.id === urgency)!, lang)[0] : ''],
                  [l.quality, qualities.find(q => q.id === quality) ? qualLabel(qualities.find(q => q.id === quality)!, lang)[0] : ''],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-green-100 last:border-0">
                    <span className="text-stone-500">{k}</span>
                    <span className="font-black text-stone-900">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pb-4" />
      </div>

      {/* ── NEXT BUTTON ─────────────────────────────── */}
      <div className="px-4 pb-7 pt-3 bg-white border-t border-stone-100">
        {step < 3 ? (
          <button
            onClick={() => canNext[step] && setStep(step + 1)}
            disabled={!canNext[step]}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
              canNext[step] ? 'bg-green-700 text-white shadow-lg shadow-green-200 active:scale-[0.98]' : 'bg-stone-200 text-stone-400'
            }`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {canNext[step] ? l.next : l.selectAbove}
          </button>
        ) : (
          <button
            onClick={() => canNext[3] && navigate('bestOptions')}
            disabled={!canNext[3]}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
              canNext[3] ? 'bg-amber-500 text-white shadow-lg shadow-amber-200 active:scale-[0.98]' : 'bg-stone-200 text-stone-400'
            }`}
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {canNext[3] ? l.findBuyers : l.selectAbove}
          </button>
        )}
      </div>
    </div>
  )
}
