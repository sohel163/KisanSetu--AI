import { useState } from 'react'
import type { Screen, TabName, ConsumerTab, FpoTab, BuyerTab, Language, Role } from './types'
import BottomNav from './components/BottomNav'
import ConsumerBottomNav from './components/ConsumerBottomNav'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import MyProduceScreen from './screens/MyProduceScreen'
import AddProduceScreen from './screens/AddProduceScreen'
import MarketScreen from './screens/MarketScreen'
import BestOptionsScreen from './screens/BestOptionsScreen'
import SellNowScreen from './screens/SellNowScreen'
import BuyerScreen from './screens/BuyerScreen'
import OfferCompareScreen from './screens/OfferCompareScreen'
import TransportScreen from './screens/TransportScreen'
import OrdersScreen from './screens/OrdersScreen'
import OrderTrackingScreen from './screens/OrderTrackingScreen'
import PaymentScreen from './screens/PaymentScreen'
import FeedbackScreen from './screens/FeedbackScreen'
import ProfitDashboardScreen from './screens/ProfitDashboardScreen'
import ProfileScreen from './screens/ProfileScreen'
import BuyerDashboardScreen from './screens/BuyerDashboardScreen'
import FPODashboardScreen from './screens/FPODashboardScreen'
import NegotiationScreen from './screens/NegotiationScreen'
import PaymentSecuredScreen from './screens/PaymentSecuredScreen'
import WeighingQCScreen from './screens/WeighingQCScreen'
import FinalReceiptScreen from './screens/FinalReceiptScreen'
import BuyerProfileScreen from './screens/BuyerProfileScreen'
import SpoilageRiskScreen from './screens/SpoilageRiskScreen'
import CropScanScreen from './screens/CropScanScreen'
import QualityAnalysisScreen from './screens/QualityAnalysisScreen'
import SmartDecisionScreen from './screens/SmartDecisionScreen'
// Farmer → Consumer direct selling
import SellingChannelsScreen from './screens/SellingChannelsScreen'
import CreateListingScreen from './screens/CreateListingScreen'
import MyListingsScreen from './screens/MyListingsScreen'
import DirectOrdersScreen from './screens/DirectOrdersScreen'
import FarmerLoginScreen from './screens/FarmerLoginScreen'
// Consumer onboarding flow
import {
  ConsumerOnbPhoneScreen,
  ConsumerOnbOtpScreen,
  ConsumerOnbProfileScreen,
  ConsumerOnbPrefsScreen,
  ConsumerOnbPurchaseScreen,
} from './screens/ConsumerOnboardingScreens'
import ConsumerDashboardScreen from './screens/ConsumerDashboardScreen'
// Buyer onboarding flow
import {
  BuyerOnboardingPhoneScreen,
  BuyerOnboardingOtpScreen,
  BuyerOnboardingBusinessScreen,
  BuyerOnboardingProfileScreen,
  BuyerOnboardingRequirementsScreen,
  BuyerOnboardingPaymentScreen,
} from './screens/BuyerOnboardingScreens'
import BuyerHomeScreen from './screens/BuyerHomeScreen'
// FPO onboarding flow
import {
  FpoOnbPhoneScreen,
  FpoOnbOtpScreen,
  FpoOnbDetailsScreen,
  FpoOnbVerifyScreen,
  FpoOnbFarmersScreen,
  FpoOnbStockScreen,
  FpoOnbBankScreen,
} from './screens/FPOOnboardingScreens'
import FPOHomeScreen from './screens/FPOHomeScreen'
// Buyer post-login flow
import {
  BuyerFindFarmersScreen,
  BuyerCropDetailsScreen,
  BuyerRecommendationScreen,
  BuyerFarmerProfileScreen,
  BuyerMakeOfferScreen,
  BuyerNegotiationScreen,
  BuyerConfirmDealScreen,
  BuyerLogisticsScreen,
  BuyerPaymentScreen,
  BuyerCompletedDealScreen,
  BuyerPurchaseHistoryScreen,
} from './screens/BuyerFlowScreens'
// Farmer onboarding flow
import {
  OnboardingRoleScreen,
  OnboardingPhoneScreen,
  OnboardingOtpScreen,
  OnboardingIdentityScreen,
  OnboardingProfileScreen,
  OnboardingFarmScreen,
  OnboardingBankScreen,
} from './screens/OnboardingScreens'
// Consumer role
import ConsumerHomeScreen from './screens/ConsumerHomeScreen'
import ProduceDetailScreen from './screens/ProduceDetailScreen'
import FarmerPublicProfileScreen from './screens/FarmerPublicProfileScreen'
import CartScreen from './screens/CartScreen'
import ConsumerOrderTrackingScreen from './screens/ConsumerOrderTrackingScreen'

const tabForScreen: Partial<Record<Screen, TabName>> = {
  home: 'home',
  myProduce: 'myProduce',
  addProduce: 'myProduce',
  myListings: 'myProduce',
  market: 'market',
  bestOptions: 'market',
  sellNow: 'market',
  buyers: 'market',
  offerCompare: 'market',
  sellingChannels: 'market',
  createListing: 'market',
  orders: 'orders',
  orderTracking: 'orders',
  transport: 'orders',
  payment: 'orders',
  feedback: 'orders',
  directOrders: 'orders',
  profitDashboard: 'profile',
  profile: 'profile',
  buyerDashboard: 'profile',
  fpoDashboard: 'profile',
  negotiation: 'market',
  paymentSecured: 'orders',
  weighingQC: 'orders',
  finalReceipt: 'orders',
  buyerProfile: 'market',
  spoilageRisk: 'market',
  cropScan: 'market',
  qualityAnalysis: 'market',
  smartDecision: 'market',
}

const consumerTabForScreen: Partial<Record<Screen, ConsumerTab>> = {
  consumerHome: 'cHome',
  consumerDashboard: 'cHome',
  produceDetail: 'cExplore',
  farmerPublicProfile: 'cExplore',
  cart: 'cCart',
  consumerOrderTracking: 'cOrders',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [activeTab, setActiveTab] = useState<TabName>('home')
  const [consumerTab, setConsumerTab] = useState<ConsumerTab>('cHome')
  const [fpoTab, setFpoTab] = useState<FpoTab>('fHome')
  const [buyerTab, setBuyerTab] = useState<BuyerTab>('bHome')
  const [lang, setLang] = useState<Language>('en')
  const [role, setRole] = useState<Role>('farmer')

  const navigate = (s: Screen) => {
    // Set role when entering role-specific home screens from onboarding
    if (s === 'consumerDashboard') setRole('consumer')
    if (s === 'fpoHome') { setRole('fpo'); setFpoTab('fHome') }
    if (s === 'buyerHome') { setRole('buyer'); setBuyerTab('bHome') }
    setScreen(s)
    const tab = tabForScreen[s]
    if (tab) setActiveTab(tab)
    const ctab = consumerTabForScreen[s]
    if (ctab) setConsumerTab(ctab)
  }

  const handleLogin = (r: Role, l: Language) => {
    setRole(r)
    setLang(l)
    if (r === 'buyer') navigate('buyerHome')
    else if (r === 'fpo') navigate('fpoDashboard')
    else if (r === 'consumer') navigate('consumerHome')
    else navigate('home')
  }

  const onboardingScreens: Screen[] = [
    'farmerLogin',
    'onboardingRole', 'onboardingPhone', 'onboardingOtp',
    'onboardingIdentity', 'onboardingProfile', 'onboardingFarm', 'onboardingBank',
    'buyerOnboardingPhone', 'buyerOnboardingOtp', 'buyerOnboardingBusiness',
    'buyerOnboardingProfile', 'buyerOnboardingRequirements', 'buyerOnboardingPayment',
    'consumerOnbPhone', 'consumerOnbOtp', 'consumerOnbProfile',
    'consumerOnbPrefs', 'consumerOnbPurchase',
    'fpoOnbPhone', 'fpoOnbOtp', 'fpoOnbDetails',
    'fpoOnbVerify', 'fpoOnbFarmers', 'fpoOnbStock', 'fpoOnbBank',
  ]
  const isOnboarding = onboardingScreens.includes(screen)
  const isLoggedIn = screen !== 'login' && !isOnboarding
  const isConsumer = role === 'consumer'
  const isFpo = role === 'fpo'
  const showFpoNav  = isFpo && screen === 'fpoHome'
  const showBuyerNav = role === 'buyer' && screen === 'buyerHome'
  const buyerFlowScreens: Screen[] = [
    'buyerFindFarmers', 'buyerCropDetails', 'buyerRecommendation', 'buyerFarmerProfile',
    'buyerMakeOffer', 'buyerNegotiation', 'buyerConfirmDeal', 'buyerLogistics',
    'buyerPayment', 'buyerCompletedDeal', 'buyerPurchaseHistory',
  ]
  const hideBotNav = ['buyerDashboard', 'fpoDashboard', 'cropScan', ...buyerFlowScreens].includes(screen)

  const sharedProps = { navigate, lang }

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={(l) => { setLang(l); navigate('farmerLogin') }}
            onRegister={(l) => { setLang(l); navigate('onboardingRole') }}
          />
        )
      case 'farmerLogin':
        return (
          <FarmerLoginScreen
            navigate={navigate}
            lang={lang}
            onSuccess={() => { setRole('farmer'); navigate('home') }}
          />
        )
      case 'home':         return <HomeScreen {...sharedProps} />
      case 'myProduce':    return <MyProduceScreen {...sharedProps} />
      case 'addProduce':   return <AddProduceScreen {...sharedProps} />
      case 'market':       return <MarketScreen {...sharedProps} />
      case 'bestOptions':  return <BestOptionsScreen {...sharedProps} />
      case 'sellNow':      return <SellNowScreen {...sharedProps} />
      case 'buyers':       return <BuyerScreen {...sharedProps} />
      case 'offerCompare': return <OfferCompareScreen {...sharedProps} />
      case 'transport':    return <TransportScreen {...sharedProps} />
      case 'orders':       return <OrdersScreen {...sharedProps} />
      case 'orderTracking':return <OrderTrackingScreen {...sharedProps} />
      case 'payment':      return <PaymentScreen {...sharedProps} />
      case 'feedback':     return <FeedbackScreen {...sharedProps} />
      case 'profitDashboard': return <ProfitDashboardScreen {...sharedProps} />
      case 'profile':
        return (
          <ProfileScreen
            navigate={navigate}
            lang={lang}
            setLang={setLang}
            role={role}
          />
        )
      case 'buyerHome':
        return (
          <BuyerHomeScreen
            navigate={navigate}
            lang={lang}
            activeTab={buyerTab}
            onTabChange={setBuyerTab}
          />
        )
      case 'buyerDashboard':   return <BuyerDashboardScreen {...sharedProps} />
      // Buyer post-login flow
      case 'buyerFindFarmers':    return <BuyerFindFarmersScreen {...sharedProps} />
      case 'buyerCropDetails':    return <BuyerCropDetailsScreen {...sharedProps} />
      case 'buyerRecommendation': return <BuyerRecommendationScreen {...sharedProps} />
      case 'buyerFarmerProfile':  return <BuyerFarmerProfileScreen {...sharedProps} />
      case 'buyerMakeOffer':      return <BuyerMakeOfferScreen {...sharedProps} />
      case 'buyerNegotiation':    return <BuyerNegotiationScreen {...sharedProps} />
      case 'buyerConfirmDeal':    return <BuyerConfirmDealScreen {...sharedProps} />
      case 'buyerLogistics':      return <BuyerLogisticsScreen {...sharedProps} />
      case 'buyerPayment':        return <BuyerPaymentScreen {...sharedProps} />
      case 'buyerCompletedDeal':  return <BuyerCompletedDealScreen {...sharedProps} />
      case 'buyerPurchaseHistory':return <BuyerPurchaseHistoryScreen {...sharedProps} />
      case 'fpoDashboard':     return <FPODashboardScreen {...sharedProps} />
      case 'fpoHome':
        return (
          <FPOHomeScreen
            navigate={navigate}
            lang={lang}
            activeTab={fpoTab}
            onTabChange={setFpoTab}
          />
        )
      // FPO onboarding flow
      case 'fpoOnbPhone':    return <FpoOnbPhoneScreen navigate={navigate} />
      case 'fpoOnbOtp':      return <FpoOnbOtpScreen navigate={navigate} />
      case 'fpoOnbDetails':  return <FpoOnbDetailsScreen navigate={navigate} />
      case 'fpoOnbVerify':   return <FpoOnbVerifyScreen navigate={navigate} />
      case 'fpoOnbFarmers':  return <FpoOnbFarmersScreen navigate={navigate} />
      case 'fpoOnbStock':    return <FpoOnbStockScreen navigate={navigate} />
      case 'fpoOnbBank':     return <FpoOnbBankScreen navigate={navigate} />
      case 'negotiation':      return <NegotiationScreen {...sharedProps} />
      case 'paymentSecured':   return <PaymentSecuredScreen {...sharedProps} />
      case 'weighingQC':       return <WeighingQCScreen {...sharedProps} />
      case 'finalReceipt':     return <FinalReceiptScreen {...sharedProps} />
      case 'buyerProfile':     return <BuyerProfileScreen {...sharedProps} />
      case 'spoilageRisk':     return <SpoilageRiskScreen {...sharedProps} />
      case 'cropScan':         return <CropScanScreen navigate={navigate} />
      case 'qualityAnalysis':  return <QualityAnalysisScreen {...sharedProps} />
      case 'smartDecision':    return <SmartDecisionScreen {...sharedProps} />
      // Farmer → Consumer direct selling
      case 'sellingChannels':  return <SellingChannelsScreen {...sharedProps} />
      case 'createListing':    return <CreateListingScreen {...sharedProps} />
      case 'myListings':       return <MyListingsScreen {...sharedProps} />
      case 'directOrders':     return <DirectOrdersScreen {...sharedProps} />
      // Consumer onboarding flow
      case 'consumerOnbPhone':    return <ConsumerOnbPhoneScreen navigate={navigate} />
      case 'consumerOnbOtp':      return <ConsumerOnbOtpScreen navigate={navigate} />
      case 'consumerOnbProfile':  return <ConsumerOnbProfileScreen navigate={navigate} />
      case 'consumerOnbPrefs':    return <ConsumerOnbPrefsScreen navigate={navigate} />
      case 'consumerOnbPurchase': return <ConsumerOnbPurchaseScreen navigate={navigate} />
      case 'consumerDashboard':   return <ConsumerDashboardScreen navigate={navigate} lang={lang} />
      // Buyer onboarding flow
      case 'buyerOnboardingPhone':        return <BuyerOnboardingPhoneScreen navigate={navigate} />
      case 'buyerOnboardingOtp':          return <BuyerOnboardingOtpScreen navigate={navigate} />
      case 'buyerOnboardingBusiness':     return <BuyerOnboardingBusinessScreen navigate={navigate} />
      case 'buyerOnboardingProfile':      return <BuyerOnboardingProfileScreen navigate={navigate} />
      case 'buyerOnboardingRequirements': return <BuyerOnboardingRequirementsScreen navigate={navigate} />
      case 'buyerOnboardingPayment':      return <BuyerOnboardingPaymentScreen navigate={navigate} />
      // Farmer onboarding flow
      case 'onboardingRole':     return <OnboardingRoleScreen navigate={navigate} />
      case 'onboardingPhone':    return <OnboardingPhoneScreen navigate={navigate} />
      case 'onboardingOtp':      return <OnboardingOtpScreen navigate={navigate} />
      case 'onboardingIdentity': return <OnboardingIdentityScreen navigate={navigate} />
      case 'onboardingProfile':  return <OnboardingProfileScreen navigate={navigate} />
      case 'onboardingFarm':     return <OnboardingFarmScreen navigate={navigate} />
      case 'onboardingBank':     return <OnboardingBankScreen navigate={navigate} />
      // Consumer role
      case 'consumerHome':             return <ConsumerHomeScreen {...sharedProps} />
      case 'produceDetail':            return <ProduceDetailScreen {...sharedProps} />
      case 'farmerPublicProfile':      return <FarmerPublicProfileScreen {...sharedProps} />
      case 'cart':                     return <CartScreen {...sharedProps} />
      case 'consumerOrderTracking':    return <ConsumerOrderTrackingScreen {...sharedProps} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-start">
      <div
        className="w-full max-w-md flex flex-col relative overflow-hidden"
        style={{ minHeight: '100svh', background: '#F4EFE4' }}
      >
        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: isLoggedIn && !hideBotNav && !showFpoNav && !showBuyerNav ? 72 : 0 }}
        >
          {renderScreen()}
        </div>

        {isLoggedIn && !hideBotNav && !isConsumer && !showFpoNav && !showBuyerNav && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
            <BottomNav
              activeTab={activeTab}
              lang={lang}
              onTabChange={(tab) => {
                setActiveTab(tab)
                const tabScreenMap: Record<TabName, Screen> = {
                  home: 'home',
                  myProduce: 'myProduce',
                  market: 'market',
                  orders: 'orders',
                  profile: 'profile',
                }
                navigate(tabScreenMap[tab])
              }}
            />
          </div>
        )}

        {isLoggedIn && !hideBotNav && isConsumer && !showFpoNav && !showBuyerNav && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
            <ConsumerBottomNav
              activeTab={consumerTab}
              lang={lang}
              cartCount={2}
              onTabChange={(tab) => {
                setConsumerTab(tab)
                const tabScreenMap: Record<ConsumerTab, Screen> = {
                  cHome: 'consumerHome',
                  cExplore: 'consumerHome',
                  cCart: 'cart',
                  cOrders: 'consumerOrderTracking',
                  cProfile: 'profile',
                }
                navigate(tabScreenMap[tab])
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
