import { useState } from 'react'
import type { NavProps, Language } from '../types'

interface FarmerLoginScreenProps extends NavProps {
  lang: Language
  onSuccess: () => void
}

const t: Record<Language, Record<string, string>> = {
  en: {
    back: 'Back',
    title: 'Welcome back!',
    sub: 'Enter your mobile number to login',
    mobileLabel: 'Mobile Number',
    placeholder: '94012 34567',
    requestOtp: 'Request OTP →',
    otpTitle: 'Verify your Phone',
    otpSent: 'OTP sent to +91 ',
    editNum: '← Edit Number',
    resend: 'Resend OTP',
    loginBtn: 'Login →',
    privacy: 'Your number is safe and never shared without permission.',
  },
  hi: {
    back: 'वापस',
    title: 'वापस आए!',
    sub: 'लॉगिन के लिए मोबाइल नंबर डालो',
    mobileLabel: 'मोबाइल नंबर',
    placeholder: '94012 34567',
    requestOtp: 'OTP मांगो →',
    otpTitle: 'फ़ोन जांचो',
    otpSent: 'OTP गया +91 ',
    editNum: '← नंबर बदलो',
    resend: 'OTP दोबारा भेजो',
    loginBtn: 'लॉगिन करो →',
    privacy: 'आपका नंबर सुरक्षित है।',
  },
  mr: {
    back: 'मागे',
    title: 'परत आलात!',
    sub: 'लॉगिनसाठी मोबाईल नंबर टाका',
    mobileLabel: 'मोबाईल नंबर',
    placeholder: '94012 34567',
    requestOtp: 'OTP मागवा →',
    otpTitle: 'फोन तपासा',
    otpSent: 'OTP गेला +91 ',
    editNum: '← नंबर बदला',
    resend: 'OTP परत पाठवा',
    loginBtn: 'लॉगिन करा →',
    privacy: 'तुमचा नंबर सुरक्षित आहे.',
  },
  te: {
    back: 'వెనుక',
    title: 'తిరిగి వచ్చారు!',
    sub: 'లాగిన్ కోసం మొబైల్ నంబర్ ఇవ్వండి',
    mobileLabel: 'మొబైల్ నంబర్',
    placeholder: '94012 34567',
    requestOtp: 'OTP పంపు →',
    otpTitle: 'ఫోన్ ధృవీకరించండి',
    otpSent: 'OTP పంపబడింది +91 ',
    editNum: '← నంబర్ మార్చు',
    resend: 'OTP మళ్ళీ పంపు',
    loginBtn: 'లాగిన్ →',
    privacy: 'మీ నంబర్ సురక్షితం.',
  },
}

export default function FarmerLoginScreen({ navigate, lang = 'en', onSuccess }: FarmerLoginScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const l = t[lang]

  const handleDigit = (val: string, idx: number) => {
    const next = [...otp]
    next[idx] = val.replace(/\D/, '').slice(0, 1)
    setOtp(next)
    if (val && idx < 5) document.getElementById(`fl-otp-${idx + 1}`)?.focus()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#F4EFE4' }}>

      {/* Header */}
      <div className="px-4 pt-12 pb-2">
        <button
          onClick={() => step === 'otp' ? setStep('phone') : navigate('login')}
          className="flex items-center gap-2 text-stone-500 font-bold active:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {l.back}
        </button>
      </div>

      {/* Illustration */}
      <div className="flex justify-center py-6">
        <div className="w-20 h-20 rounded-3xl bg-green-700 flex items-center justify-center shadow-lg shadow-green-200">
          <span style={{ fontSize: 44 }}>🌾</span>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {step === 'phone' ? (
          <>
            <div>
              <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {l.title}
              </h1>
              <p className="text-sm text-stone-500 mt-1">{l.sub}</p>
            </div>

            <div>
              <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">{l.mobileLabel}</p>
              <div className="flex gap-2">
                <div className="flex items-center px-3.5 bg-white border-2 border-stone-200 rounded-2xl text-stone-700 font-black text-base flex-shrink-0">
                  🇮🇳 +91
                </div>
                <div className="flex-1 bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-green-500 transition-colors">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/, '').slice(0, 10))}
                    placeholder={l.placeholder}
                    className="w-full px-4 py-4 text-stone-900 font-black text-2xl outline-none bg-transparent placeholder:text-stone-300 placeholder:font-normal placeholder:text-base"
                  />
                </div>
              </div>
              <p className="mt-1.5 text-xs text-stone-400 px-1">{l.privacy}</p>
            </div>

            <button
              onClick={() => setStep('otp')}
              className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {l.requestOtp}
            </button>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {l.otpTitle}
              </h1>
              <p className="text-sm text-stone-500 mt-1">{l.otpSent}{phone || '94012 34567'}</p>
            </div>

            <div className="flex gap-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`fl-otp-${i}`}
                  type="tel"
                  value={d}
                  onChange={(e) => handleDigit(e.target.value, i)}
                  className="flex-1 h-14 text-center text-2xl font-black bg-white border-2 border-stone-200 rounded-2xl outline-none focus:border-green-500 text-stone-900 transition-colors"
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={() => setStep('phone')} className="text-sm text-stone-500 font-semibold active:opacity-60">
                {l.editNum}
              </button>
              <button className="text-sm text-green-700 font-bold active:opacity-60">
                {l.resend}
              </button>
            </div>

            <button
              onClick={onSuccess}
              className="w-full py-5 bg-green-700 text-white rounded-2xl font-black text-xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {l.loginBtn}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
