import { useState } from 'react'
import type { Language } from '../types'

interface LoginScreenProps {
  onLogin?: (lang: Language) => void
  onRegister?: (lang: Language) => void
}

const languages: { code: Language; label: string; sublabel: string }[] = [
  { code: 'hi', label: 'हिंदी',   sublabel: 'Hindi' },
  { code: 'mr', label: 'मराठी',  sublabel: 'Marathi' },
  { code: 'te', label: 'తెలుగు', sublabel: 'Telugu' },
  { code: 'en', label: 'English', sublabel: 'English' },
]

const tagline: Record<Language, string> = {
  en: 'Sell smart. Earn more.',
  hi: 'समझदारी से बेचो। ज़्यादा कमाओ।',
  mr: 'हुशारीने विका. जास्त कमवा.',
  te: 'తెలివిగా అమ్మండి. ఎక్కువ సంపాదించండి.',
}

const selectLangLabel: Record<Language, string> = {
  en: 'Choose your language',
  hi: 'अपनी भाषा चुनो',
  mr: 'तुमची भाषा निवडा',
  te: 'మీ భాష ఎంచుకోండి',
}

const loginLabel: Record<Language, string> = {
  en: 'Login',
  hi: 'लॉगिन करो',
  mr: 'लॉगिन करा',
  te: 'లాగిన్',
}

const existingFarmerLabel: Record<Language, string> = {
  en: 'Existing Farmer',
  hi: 'पुराने किसान',
  mr: 'जुने शेतकरी',
  te: 'ఇప్పటి రైతు',
}

const registerCta: Record<Language, string> = {
  en: '🌱 New Farmer? Register here →',
  hi: '🌱 नया किसान? यहाँ नाम लिखाओ →',
  mr: '🌱 नवीन शेतकरी? इथे नोंदणी करा →',
  te: '🌱 కొత్త రైతు? ఇక్కడ నమోదు చేయండి →',
}

export default function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [lang, setLang] = useState<Language>('hi')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4EFE4' }}>

      {/* Branding */}
      <div className="flex flex-col items-center pt-20 pb-8 px-5">
        <div className="w-20 h-20 rounded-3xl bg-green-700 flex items-center justify-center shadow-xl shadow-green-200 mb-5">
          <span style={{ fontSize: 44 }}>🌾</span>
        </div>
        <h1
          className="text-4xl font-black text-stone-900 tracking-tight"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          KisanSetu
        </h1>
        <p className="text-stone-500 text-base font-semibold mt-2 text-center">
          {tagline[lang]}
        </p>
      </div>

      {/* Language picker */}
      <div className="px-5">
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">
          {selectLangLabel[lang]}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lg) => (
            <button
              key={lg.code}
              onClick={() => setLang(lg.code)}
              className={`py-5 rounded-2xl font-bold text-center border-2 transition-all active:scale-95 ${
                lang === lg.code
                  ? 'bg-green-700 text-white border-green-700 shadow-md shadow-green-200'
                  : 'bg-white text-stone-700 border-stone-200'
              }`}
            >
              <span className="block text-2xl font-black">{lg.label}</span>
              <span className={`text-xs mt-1 block ${lang === lg.code ? 'text-green-200' : 'text-stone-400'}`}>
                {lg.sublabel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action buttons */}
      <div className="px-5 pb-12 flex flex-col gap-3">

        {/* Primary — Login */}
        <button
          onClick={() => onLogin?.(lang)}
          className="w-full rounded-2xl bg-green-700 shadow-lg shadow-green-200 active:scale-[0.98] transition-transform overflow-hidden"
        >
          <div className="py-4 flex flex-col items-center">
            <span
              className="text-white font-black text-2xl leading-tight"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {loginLabel[lang]}
            </span>
            <span className="text-green-200 text-sm font-semibold mt-0.5">
              {existingFarmerLabel[lang]}
            </span>
          </div>
        </button>

        {/* Secondary — Register */}
        <button
          onClick={() => onRegister?.(lang)}
          className="w-full py-4 rounded-2xl bg-green-50 border-2 border-green-300 text-green-800 font-black text-base active:scale-[0.98] transition-transform"
        >
          {registerCta[lang]}
        </button>
      </div>
    </div>
  )
}
