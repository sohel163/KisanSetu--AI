export type Screen =
  | 'login'
  | 'home'
  | 'myProduce'
  | 'addProduce'
  | 'market'
  | 'bestOptions'
  | 'sellNow'
  | 'buyers'
  | 'offerCompare'
  | 'transport'
  | 'orders'
  | 'orderTracking'
  | 'payment'
  | 'feedback'
  | 'profitDashboard'
  | 'profile'
  | 'buyerDashboard'
  | 'fpoDashboard'
  | 'negotiation'
  | 'paymentSecured'
  | 'weighingQC'
  | 'finalReceipt'
  | 'buyerProfile'
  | 'spoilageRisk'
  | 'cropScan'
  | 'qualityAnalysis'
  | 'smartDecision'
  // Farmer → Consumer direct selling
  | 'sellingChannels'
  | 'createListing'
  | 'myListings'
  | 'directOrders'
  // Farmer login
  | 'farmerLogin'
  // Consumer onboarding flow
  | 'consumerOnbPhone'
  | 'consumerOnbOtp'
  | 'consumerOnbProfile'
  | 'consumerOnbPrefs'
  | 'consumerOnbPurchase'
  | 'consumerDashboard'
  // Buyer onboarding flow
  | 'buyerOnboardingPhone'
  | 'buyerOnboardingOtp'
  | 'buyerOnboardingBusiness'
  | 'buyerOnboardingProfile'
  | 'buyerOnboardingRequirements'
  | 'buyerOnboardingPayment'
  // Farmer onboarding flow
  | 'onboardingRole'
  | 'onboardingPhone'
  | 'onboardingOtp'
  | 'onboardingIdentity'
  | 'onboardingProfile'
  | 'onboardingFarm'
  | 'onboardingBank'
  // Buyer home
  | 'buyerHome'
  // FPO onboarding flow
  | 'fpoOnbPhone'
  | 'fpoOnbOtp'
  | 'fpoOnbDetails'
  | 'fpoOnbVerify'
  | 'fpoOnbFarmers'
  | 'fpoOnbStock'
  | 'fpoOnbBank'
  | 'fpoHome'
  // Buyer post-login flow
  | 'buyerFindFarmers'
  | 'buyerCropDetails'
  | 'buyerRecommendation'
  | 'buyerFarmerProfile'
  | 'buyerMakeOffer'
  | 'buyerNegotiation'
  | 'buyerConfirmDeal'
  | 'buyerLogistics'
  | 'buyerPayment'
  | 'buyerCompletedDeal'
  | 'buyerPurchaseHistory'
  // Consumer role
  | 'consumerHome'
  | 'produceDetail'
  | 'farmerPublicProfile'
  | 'cart'
  | 'consumerOrderTracking'

export type TabName = 'home' | 'myProduce' | 'market' | 'orders' | 'profile'

export type ConsumerTab = 'cHome' | 'cExplore' | 'cCart' | 'cOrders' | 'cProfile'

export type FpoTab = 'fHome' | 'fFarmers' | 'fStock' | 'fDeals' | 'fProfile'

export type BuyerTab = 'bHome' | 'bExplore' | 'bOrders' | 'bPayments' | 'bProfile'

export type Language = 'en' | 'te' | 'hi' | 'mr'

export type Role = 'farmer' | 'fpo' | 'buyer' | 'consumer'

export interface NavProps {
  navigate: (screen: Screen) => void
  lang?: Language
}
