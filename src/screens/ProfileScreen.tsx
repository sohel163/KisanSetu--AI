import type { NavProps, Language, Role } from '../types'
import { farmer, salesHistory } from '../data'

interface ProfileScreenProps extends NavProps {
  lang: Language
  setLang: (l: Language) => void
  role: Role
}

// ── Mock data for non-farmer roles ───────────────────────────────────────────

const buyerData = {
  bizName: 'Sharma Agro Traders',
  owner: 'Rajesh Sharma',
  phone: '+91 98765 43210',
  bizType: 'Wholesaler',
  gstin: '22AAAAA0000A1Z5',
  address: 'Shop No. 12, Main Market',
  location: 'Nagpur, Maharashtra',
  crops: ['Tomatoes', 'Onions', 'Wheat', 'Soybean'],
  quantity: '500 kg / month',
  frequency: 'Weekly',
  mandi: 'Nagpur APMC Yard',
  verified: true,
  paymentSetup: true,
}

const fpoData = {
  name: 'Vidarbha Farmers Collective',
  regId: 'FPO-MH-2019-0124',
  contact: 'Suresh Patil',
  phone: '+91 94012 34567',
  village: 'Dhamangaon',
  district: 'Akola',
  state: 'Maharashtra',
  members: 47,
  crops: ['Soybean', 'Cotton', 'Wheat', 'Tur Dal'],
  totalStock: '12,000 kg',
  verified: true,
  bankSetup: true,
}

const consumerData = {
  name: 'Priya Sharma',
  phone: '+91 98765 43210',
  address: 'Flat 4B, Green Park Colony',
  location: 'Nagpur, Maharashtra',
  preferredCrops: ['Vegetables', 'Fruits', 'Organic'],
  preferences: 'Home Delivery · Weekly',
  savedFarmers: 3,
  orders: 8,
  verified: true,
}

// ── Shared helper components ─────────────────────────────────────────────────

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

function ProfileHero({
  avatarEmoji, avatarBg, showCamera = false,
  name, roleLabel, roleEmoji, verified, subtitle,
}: {
  avatarEmoji: string; avatarBg: string; showCamera?: boolean
  name: string; roleLabel: string; roleEmoji: string; verified: boolean; subtitle: string
}) {
  return (
    <div
      className="px-4 pt-12 pb-8 flex flex-col items-center"
      style={{ background: 'linear-gradient(170deg, #14532d 0%, #166534 60%, #15803d 100%)' }}
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <div
          className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center shadow-xl"
          style={{ background: avatarBg }}
        >
          <span style={{ fontSize: 48, lineHeight: 1 }}>{avatarEmoji}</span>
        </div>
        {showCamera && (
          <button className="absolute bottom-0.5 right-0.5 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-2 border-white shadow-md active:bg-green-700">
            <CameraIcon />
          </button>
        )}
      </div>

      {/* Name */}
      <h2 className="text-xl font-black text-white text-center leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {name}
      </h2>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
        <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">
          {roleEmoji} {roleLabel}
        </span>
        {verified && (
          <span className="px-3 py-1 bg-green-500/60 rounded-full text-white text-xs font-bold">
            ✅ Verified
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-green-200 text-sm font-semibold mt-2">{subtitle}</p>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100">
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest">{title}</p>
      </div>
      <div className="divide-y divide-stone-100">{children}</div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <span className="text-xl flex-shrink-0 w-7 text-center mt-0.5">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-stone-400 font-semibold">{label}</p>
        <p className="text-sm font-black text-stone-900 mt-0.5 leading-snug">{value}</p>
      </div>
    </div>
  )
}

function StatusRow({ icon, label, ok, okLabel, failLabel }: {
  icon: string; label: string; ok: boolean; okLabel: string; failLabel: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <span className="text-xl flex-shrink-0 w-7 text-center">{icon}</span>
      <span className="flex-1 text-sm font-black text-stone-900">{label}</span>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
        ok ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'
      }`}>
        {ok ? okLabel : failLabel}
      </span>
    </div>
  )
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="px-4 py-3.5 flex flex-wrap gap-2">
      {items.map((c) => (
        <span key={c} className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700">
          {c}
        </span>
      ))}
    </div>
  )
}

function EditProfileBtn({ label }: { label: string }) {
  return (
    <button className="w-full py-4 border-2 border-green-600 rounded-2xl text-green-700 font-black text-base active:bg-green-50 transition-colors">
      ✏️ {label}
    </button>
  )
}

// ── FARMER profile content ────────────────────────────────────────────────────

function FarmerProfile({ navigate, lang }: { navigate: (s: Parameters<NavProps['navigate']>[0]) => void; lang: Language }) {
  const totalNet = salesHistory.reduce((s, r) => s + r.net, 0)
  const l = (en: string, hi: string, mr: string, te: string) =>
    lang === 'hi' ? hi : lang === 'mr' ? mr : lang === 'te' ? te : en

  return (
    <>
      <SectionCard title={l('Personal Details', 'निजी जानकारी', 'वैयक्तिक माहिती', 'వ్యక్తిగత వివరాలు')}>
        <InfoRow icon="📱" label={l('Mobile', 'मोबाइल', 'मोबाईल', 'మొబైల్')} value={farmer.phone} />
        <InfoRow icon="🏘️" label={l('Village / District', 'गांव / जिला', 'गाव / जिल्हा', 'గ్రామం / జిల్లా')} value={`${farmer.village}, ${farmer.district}`} />
        <InfoRow icon="🗺️" label={l('State', 'राज्य', 'राज्य', 'రాష్ట్రం')} value="Maharashtra" />
        <InfoRow icon="📅" label={l('Member Since', 'सदस्य से', 'सदस्यपद', 'సభ్యుడు')} value={farmer.memberSince} />
      </SectionCard>

      <SectionCard title={l('Farm Details', 'खेत की जानकारी', 'शेत माहिती', 'వ్యవసాయ వివరాలు')}>
        <InfoRow icon="🌾" label={l('Farm Size', 'खेत का आकार', 'शेताचे क्षेत्रफळ', 'పొలం పరిమాణం')} value="4.5 Acres" />
        <div>
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-1">
            <span className="text-xl w-7 text-center">🌱</span>
            <p className="text-xs text-stone-400 font-semibold">{l('Crops & Produce', 'फसलें', 'पिके', 'పంటలు')}</p>
          </div>
          <ChipRow items={['Tomato', 'Soybean', 'Cotton', 'Wheat']} />
        </div>
        <InfoRow icon="📊" label={l('Crop Status', 'फसल की स्थिति', 'पीक स्थिती', 'పంట స్థితి')} value="🌱 Growing · Harvest in 3 weeks" />
      </SectionCard>

      <SectionCard title={l('FPO Membership', 'किसान समूह', 'किसान गट', 'FPO సభ్యత్వం')}>
        <InfoRow icon="🤝" label={l('FPO Name', 'समूह का नाम', 'गटाचे नाव', 'FPO పేరు')} value={farmer.fpo} />
        <InfoRow icon="👥" label={l('Members', 'सदस्य', 'सदस्य', 'సభ్యులు')} value="47 farmers" />
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('fpoDashboard')}
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-sm font-bold active:opacity-80"
          >
            {l('View FPO Dashboard →', 'FPO डैशबोर्ड देखो →', 'FPO डॅशबोर्ड पहा →', 'FPO డాష్‌బోర్డ్ →')}
          </button>
        </div>
      </SectionCard>

      {/* Season earnings */}
      <div className="bg-amber-600 rounded-2xl p-4">
        <p className="text-amber-100 text-xs font-black uppercase tracking-widest mb-3">
          {l('Season Earnings', 'इस सीज़न की कमाई', 'या हंगामाची कमाई', 'సీజన్ ఆదాయం')}
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: l('Sales', 'बिक्री', 'विक्री', 'అమ్మకాలు'), val: farmer.totalSales },
            { label: l('Net', 'कुल', 'निव्वळ', 'నికర'), val: `₹${(totalNet / 1000).toFixed(0)}K` },
            { label: l('Best/kg', 'सर्वोत्तम', 'सर्वोत्तम', 'సర్వోత్తమ'), val: '₹24' },
          ].map((s) => (
            <div key={s.label} className="bg-amber-500 rounded-xl px-2 py-3 text-center">
              <p className="text-amber-100 text-xs font-semibold">{s.label}</p>
              <p className="text-white font-bold text-xl mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.val}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('profitDashboard')}
          className="w-full py-3 bg-white text-amber-700 rounded-xl font-bold text-sm active:opacity-80"
        >
          {l('Full Earnings Report →', 'पूरी कमाई देखो →', 'पूर्ण कमाई पहा →', 'పూర్తి నివేదిక →')}
        </button>
      </div>

      <SectionCard title={l('Verification & Payments', 'सत्यापन और भुगतान', 'पडताळणी आणि पेमेंट', 'ధృవీకరణ మరియు చెల్లింపు')}>
        <StatusRow icon="✅" label={l('Identity Verified', 'पहचान सत्यापित', 'ओळख पडताळणी', 'గుర్తింపు ధృవీకరణ')} ok={true} okLabel="Verified" failLabel="Pending" />
        <StatusRow icon="🏦" label={l('Bank Account', 'बैंक खाता', 'बँक खाते', 'బ్యాంక్ ఖాతా')} ok={true} okLabel="Linked" failLabel="Not Linked" />
        <StatusRow icon="📲" label="UPI" ok={true} okLabel="Active" failLabel="Not Set" />
      </SectionCard>

      <EditProfileBtn label={l('Edit Profile', 'प्रोफाइल बदलो', 'प्रोफाइल बदला', 'ప్రొఫైల్ మార్చు')} />
    </>
  )
}

// ── BUYER profile content ─────────────────────────────────────────────────────

function BuyerProfile({ lang }: { lang: Language }) {
  const l = (en: string, hi: string, mr: string, te: string) =>
    lang === 'hi' ? hi : lang === 'mr' ? mr : lang === 'te' ? te : en

  return (
    <>
      <SectionCard title={l('Business Details', 'व्यापार की जानकारी', 'व्यवसाय माहिती', 'వ్యాపార వివరాలు')}>
        <InfoRow icon="🏪" label={l('Business Name', 'दुकान का नाम', 'दुकानाचे नाव', 'వ్యాపార పేరు')} value={buyerData.bizName} />
        <InfoRow icon="👤" label={l('Owner / Contact', 'मालिक', 'मालक', 'యజమాని')} value={buyerData.owner} />
        <InfoRow icon="📱" label={l('Mobile', 'मोबाइल', 'मोबाईल', 'మొబైల్')} value={buyerData.phone} />
        <InfoRow icon="🏷️" label={l('Business Type', 'व्यापार प्रकार', 'व्यवसाय प्रकार', 'వ్యాపార రకం')} value={buyerData.bizType} />
        <InfoRow icon="📄" label="GSTIN" value={buyerData.gstin} />
        <InfoRow icon="📍" label={l('Address', 'पता', 'पत्ता', 'చిరునామా')} value={`${buyerData.address}, ${buyerData.location}`} />
      </SectionCard>

      <SectionCard title={l('Buying Preferences', 'खरीदारी प्राथमिकताएं', 'खरेदी प्राधान्यता', 'కొనుగోలు ప్రాధాన్యతలు')}>
        <div>
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-1">
            <span className="text-xl w-7 text-center">🌾</span>
            <p className="text-xs text-stone-400 font-semibold">{l('Crops Required', 'जरूरी फसलें', 'आवश्यक पिके', 'అవసరమైన పంటలు')}</p>
          </div>
          <ChipRow items={buyerData.crops} />
        </div>
        <InfoRow icon="⚖️" label={l('Required Quantity', 'आवश्यक मात्रा', 'आवश्यक प्रमाण', 'అవసరమైన పరిమాణం')} value={buyerData.quantity} />
        <InfoRow icon="🔄" label={l('Buying Frequency', 'खरीद आवृत्ति', 'खरेदी वारंवारता', 'కొనుగోలు పౌనఃపున్యం')} value={buyerData.frequency} />
        <InfoRow icon="🏢" label={l('Preferred Mandi', 'पसंदीदा मंडी', 'पसंतीची मंडी', 'ఇష్టమైన మండి')} value={buyerData.mandi} />
      </SectionCard>

      <SectionCard title={l('Verification & Payments', 'सत्यापन और भुगतान', 'पडताळणी आणि पेमेंट', 'ధృవీకరణ మరియు చెల్లింపు')}>
        <StatusRow icon="✅" label={l('Business Verified', 'व्यापार सत्यापित', 'व्यवसाय पडताळणी', 'వ్యాపార ధృవీకరణ')} ok={buyerData.verified} okLabel="Verified" failLabel="Pending" />
        <StatusRow icon="🏦" label={l('Payment Setup', 'भुगतान सेटअप', 'पेमेंट सेटअप', 'చెల్లింపు సెటప్')} ok={buyerData.paymentSetup} okLabel="Ready" failLabel="Not Set" />
      </SectionCard>

      <EditProfileBtn label={l('Edit Profile', 'प्रोफाइल बदलो', 'प्रोफाइल बदला', 'ప్రొఫైల్ మార్చు')} />
    </>
  )
}

// ── FPO profile content ───────────────────────────────────────────────────────

function FpoProfile({ navigate, lang }: { navigate: (s: Parameters<NavProps['navigate']>[0]) => void; lang: Language }) {
  const l = (en: string, hi: string, mr: string, te: string) =>
    lang === 'hi' ? hi : lang === 'mr' ? mr : lang === 'te' ? te : en

  return (
    <>
      <SectionCard title={l('FPO Details', 'किसान समूह जानकारी', 'किसान गट माहिती', 'FPO వివరాలు')}>
        <InfoRow icon="🤝" label={l('FPO Name', 'समूह का नाम', 'गटाचे नाव', 'FPO పేరు')} value={fpoData.name} />
        <InfoRow icon="🔑" label={l('Registration ID', 'पंजीकरण आईडी', 'नोंदणी आयडी', 'నమోదు ID')} value={fpoData.regId} />
        <InfoRow icon="👤" label={l('Contact Person', 'संपर्क व्यक्ति', 'संपर्क व्यक्ती', 'సంప్రదింపు వ్యక్తి')} value={fpoData.contact} />
        <InfoRow icon="📱" label={l('Mobile', 'मोबाइल', 'मोबाईल', 'మొబైల్')} value={fpoData.phone} />
        <InfoRow icon="📍" label={l('Location', 'स्थान', 'ठिकाण', 'స్థానం')} value={`${fpoData.village}, ${fpoData.district}, ${fpoData.state}`} />
      </SectionCard>

      <SectionCard title={l('Group Details', 'समूह विवरण', 'गट तपशील', 'గ్రూప్ వివరాలు')}>
        <InfoRow icon="👥" label={l('Farmer Members', 'किसान सदस्य', 'शेतकरी सदस्य', 'రైతు సభ్యులు')} value={`${fpoData.members} Farmers`} />
        <div>
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-1">
            <span className="text-xl w-7 text-center">🌾</span>
            <p className="text-xs text-stone-400 font-semibold">{l('Crops Aggregated', 'एकत्र फसलें', 'एकत्रित पिके', 'కూడగట్టిన పంటలు')}</p>
          </div>
          <ChipRow items={fpoData.crops} />
        </div>
        <InfoRow icon="📦" label={l('Total Stock Available', 'कुल स्टॉक', 'एकूण साठा', 'మొత్తం స్టాక్')} value={fpoData.totalStock} />
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('fpoDashboard')}
            className="w-full py-2.5 bg-green-700 text-white rounded-xl text-sm font-bold active:opacity-80"
          >
            {l('Manage FPO Dashboard →', 'FPO डैशबोर्ड →', 'FPO डॅशबोर्ड →', 'FPO డాష్‌బోర్డ్ →')}
          </button>
        </div>
      </SectionCard>

      <SectionCard title={l('Verification & Payments', 'सत्यापन और भुगतान', 'पडताळणी आणि पेमेंट', 'ధృవీకరణ మరియు చెల్లింపు')}>
        <StatusRow icon="✅" label={l('FPO Verified', 'FPO सत्यापित', 'FPO पडताळणी', 'FPO ధృవీకరణ')} ok={fpoData.verified} okLabel="Verified" failLabel="Pending" />
        <StatusRow icon="🏦" label={l('Bank / UPI', 'बैंक / UPI', 'बँक / UPI', 'బ్యాంక్ / UPI')} ok={fpoData.bankSetup} okLabel="Active" failLabel="Not Set" />
      </SectionCard>

      <EditProfileBtn label={l('Edit FPO Profile', 'FPO प्रोफाइल बदलो', 'FPO प्रोफाइल बदला', 'FPO ప్రొఫైల్ మార్చు')} />
    </>
  )
}

// ── CONSUMER profile content ──────────────────────────────────────────────────

function ConsumerProfile({ navigate, lang }: { navigate: (s: Parameters<NavProps['navigate']>[0]) => void; lang: Language }) {
  const l = (en: string, hi: string, mr: string, te: string) =>
    lang === 'hi' ? hi : lang === 'mr' ? mr : lang === 'te' ? te : en

  return (
    <>
      <SectionCard title={l('Personal Details', 'निजी जानकारी', 'वैयक्तिक माहिती', 'వ్యక్తిగత వివరాలు')}>
        <InfoRow icon="📱" label={l('Mobile', 'मोबाइल', 'मोबाईल', 'మొబైల్')} value={consumerData.phone} />
        <InfoRow icon="🚚" label={l('Delivery Address', 'डिलीवरी पता', 'डिलिव्हरी पत्ता', 'డెలివరీ చిరునామా')} value={consumerData.address} />
        <InfoRow icon="📍" label={l('City / Location', 'शहर / स्थान', 'शहर / ठिकाण', 'నగరం / స్థానం')} value={consumerData.location} />
      </SectionCard>

      <SectionCard title={l('Shopping Preferences', 'खरीदारी प्राथमिकता', 'खरेदी प्राधान्यता', 'షాపింగ్ ప్రాధాన్యతలు')}>
        <div>
          <div className="flex items-center gap-3 px-4 pt-3.5 pb-1">
            <span className="text-xl w-7 text-center">🥬</span>
            <p className="text-xs text-stone-400 font-semibold">{l('Preferred Produce', 'पसंदीदा उपज', 'पसंतीचे उत्पादन', 'ఇష్టమైన ఉత్పత్తులు')}</p>
          </div>
          <ChipRow items={consumerData.preferredCrops} />
        </div>
        <InfoRow icon="⚙️" label={l('Delivery Preference', 'डिलीवरी प्राथमिकता', 'डिलिव्हरी प्राधान्यता', 'డెలివరీ ప్రాధాన్యత')} value={consumerData.preferences} />
      </SectionCard>

      <SectionCard title={l('Activity', 'गतिविधि', 'क्रियाकलाप', 'కార్యకలాపం')}>
        <InfoRow icon="❤️" label={l('Saved Farmers', 'सहेजे किसान', 'जतन केलेले शेतकरी', 'సేవ్ చేసిన రైతులు')} value={`${consumerData.savedFarmers} Farmers`} />
        <InfoRow icon="🛒" label={l('Total Orders', 'कुल आर्डर', 'एकूण ऑर्डर', 'మొత్తం ఆర్డర్‌లు')} value={`${consumerData.orders} Orders placed`} />
        <div className="px-4 py-3">
          <button
            onClick={() => navigate('consumerOrderTracking')}
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-sm font-bold active:opacity-80"
          >
            {l('View Order History →', 'ऑर्डर इतिहास देखो →', 'ऑर्डर इतिहास पहा →', 'ఆర్డర్ చరిత్ర చూడు →')}
          </button>
        </div>
      </SectionCard>

      <SectionCard title={l('Verification', 'सत्यापन', 'पडताळणी', 'ధృవీకరణ')}>
        <StatusRow icon="✅" label={l('Identity Verified', 'पहचान सत्यापित', 'ओळख पडताळणी', 'గుర్తింపు ధృవీకరణ')} ok={consumerData.verified} okLabel="Verified" failLabel="Pending" />
      </SectionCard>

      <EditProfileBtn label={l('Edit Profile', 'प्रोफाइल बदलो', 'प्रोफाइल बदला', 'ప్రొఫైల్ మార్చు')} />
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

const langLabels: Record<Language, string> = { en: 'English', te: 'తెలుగు', hi: 'हिंदी', mr: 'मराठी' }

export default function ProfileScreen({ navigate, lang, setLang, role }: ProfileScreenProps) {
  // Hero props per role
  const heroProps = {
    farmer: {
      avatarEmoji: '🧑‍🌾', avatarBg: '#FEF3C7', showCamera: true,
      name: farmer.name, roleLabel: 'Farmer', roleEmoji: '🌾',
      verified: true, subtitle: `${farmer.village}, ${farmer.district}`,
    },
    buyer: {
      avatarEmoji: '🏪', avatarBg: '#EFF6FF', showCamera: true,
      name: buyerData.bizName, roleLabel: 'Buyer', roleEmoji: '🏪',
      verified: buyerData.verified, subtitle: buyerData.location,
    },
    fpo: {
      avatarEmoji: '🤝', avatarBg: '#DCFCE7', showCamera: true,
      name: fpoData.name, roleLabel: 'FPO / Group', roleEmoji: '🤝',
      verified: fpoData.verified, subtitle: `${fpoData.district}, ${fpoData.state}`,
    },
    consumer: {
      avatarEmoji: '🛒', avatarBg: '#F3E8FF', showCamera: true,
      name: consumerData.name, roleLabel: 'Consumer', roleEmoji: '🛒',
      verified: consumerData.verified, subtitle: consumerData.location,
    },
  }[role]

  const pageTitleL = lang === 'hi' ? 'मेरा खाता' : lang === 'mr' ? 'माझं खाते' : lang === 'te' ? 'ప్రొఫైల్' : 'Profile'
  const langTitleL = lang === 'hi' ? 'भाषा चुनो' : lang === 'mr' ? 'भाषा निवडा' : lang === 'te' ? 'భాష' : 'Language'
  const signOutL   = lang === 'hi' ? 'बाहर जाओ' : lang === 'mr' ? 'बाहेर पडा' : lang === 'te' ? 'సైన్ అవుట్' : 'Sign Out'

  return (
    <div className="flex flex-col h-full">

      {/* Page title */}
      <div className="bg-white px-5 pt-10 pb-4 border-b border-stone-100">
        <h1 className="text-xl font-bold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {pageTitleL}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* Role-based hero header */}
        <ProfileHero {...heroProps} />

        {/* Role-specific profile cards */}
        <div className="px-4 py-4 space-y-4">
          {role === 'farmer'   && <FarmerProfile navigate={navigate} lang={lang} />}
          {role === 'buyer'    && <BuyerProfile lang={lang} />}
          {role === 'fpo'      && <FpoProfile navigate={navigate} lang={lang} />}
          {role === 'consumer' && <ConsumerProfile navigate={navigate} lang={lang} />}

          {/* Language picker — common */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">{langTitleL}</p>
            <div className="grid grid-cols-2 gap-2">
              {(['hi', 'mr', 'te', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                    lang === l ? 'bg-green-700 text-white border-green-700' : 'bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>

          {/* Settings — common */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {[
              { icon: '🔔', label: lang === 'hi' ? 'नोटिफिकेशन' : lang === 'mr' ? 'सूचना' : lang === 'te' ? 'నోటిఫికేషన్లు' : 'Notifications', val: 'On' },
              { icon: '🔒', label: lang === 'hi' ? 'प्राइवेसी' : lang === 'mr' ? 'गोपनीयता' : lang === 'te' ? 'గోప్యత' : 'Privacy & Security' },
              { icon: '📞', label: lang === 'hi' ? 'मदद' : lang === 'mr' ? 'मदत' : lang === 'te' ? 'సహాయం' : 'Help & Support' },
              { icon: '📋', label: lang === 'hi' ? 'नियम' : lang === 'mr' ? 'अटी' : lang === 'te' ? 'నిబంధనలు' : 'Terms' },
            ].map((item, i, arr) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? 'border-b border-stone-100' : ''}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1 font-semibold text-stone-700 text-sm">{item.label}</span>
                {item.val && <span className="text-xs text-stone-400 font-semibold">{item.val}</span>}
                <ChevronRight />
              </button>
            ))}
          </div>

          {/* Sign out — common */}
          <button
            onClick={() => navigate('login')}
            className="w-full py-3.5 border-2 border-stone-200 rounded-2xl text-stone-600 font-bold text-sm active:opacity-70"
          >
            {signOutL}
          </button>

          <div className="pb-4" />
        </div>
      </div>
    </div>
  )
}
