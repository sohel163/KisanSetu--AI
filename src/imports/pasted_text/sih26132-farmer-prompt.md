# KisanSetu — Farmer-First UI/UX Design Prompt

Design a complete, modern, responsive farmer-first web/mobile application called **KisanSetu** for SIH26132: Farmer Market Linkage and Price Discovery.

The application must help farmers decide **when, where, and to whom to sell their produce** by considering market price, buyer demand, transport cost, quality, perishability risk, payment reliability, and estimated final net earnings.

Do NOT design this as a generic agriculture dashboard or an AI-looking application. The interface should feel like a real, trustworthy agricultural marketplace designed for actual farmers using low-end Android phones and limited internet connectivity.

## 1. PRIMARY USERS

Design for:

* Small and marginal farmers
* Farmer Producer Organisations (FPOs)
* Verified buyers such as wholesalers, processors, retailers, exporters and institutional buyers
* Transport providers

The primary interface should be optimized for farmers.

## 2. FARMER UX REQUIREMENTS

The application must:

* Use simple language
* Support Telugu, Hindi and English
* Use large touch-friendly buttons
* Minimize typing
* Provide optional voice input
* Provide audio guidance where useful
* Use clear icons with text
* Work well on low-end Android devices
* Avoid information overload
* Clearly explain every recommendation
* Never assume that the farmer understands technical terms
* Clearly distinguish real/verified data from estimates or simulated demo data

Avoid excessive charts, complicated analytics, tiny text, technical terminology and unnecessary animations.

## 3. MAIN FARMER JOURNEY

Create a clear end-to-end flow:

Login → Home → Add Produce → Market Comparison → Best Selling Recommendation → Buyer Matching → Compare Offers → Accept Offer → Transport → Delivery → Payment → Feedback/Dispute

The prototype must allow the user to experience this complete journey.

## 4. LOGIN

Create a simple login screen.

Include:

* Mobile number
* OTP
* Language selection
* Farmer/FPO/Buyer role selection
* Large Login button
* Voice/help option

Keep authentication simple and trustworthy.

## 5. FARMER HOME SCREEN

The home screen must immediately answer:

1. What is happening with my crop?
2. What is today's price?
3. Where can I earn the most?
4. Should I sell now or wait?
5. Are there buyers interested in my produce?

Show:

* Current produce
* Quantity
* Harvest date
* Current nearby prices
* Best selling option
* Estimated net earnings
* Market demand
* Spoilage risk
* Sell-now/wait recommendation
* Active buyer offers
* Order/payment status

Prioritize actionable information over decorative statistics.

Example:

"Your tomato crop is ready in 2 days."

"Recommended: Buyer A"

"Estimated net earnings: ₹22,800"

"Pickup: Tomorrow"

"Spoilage risk: Medium"

"Why? Better net earnings after transport cost."

Provide a prominent CTA:

**View Best Selling Options**

## 6. ADD PRODUCE / CREATE LOT

Create a simple step-by-step form.

Fields:

* Crop
* Variety
* Quantity
* Expected harvest date
* Farmer location
* Expected price
* Storage availability
* Cash urgency
* Produce photos
* Quality/grade

Use cards, dropdowns, number inputs and selectable options instead of long forms.

Add:

**Find Best Selling Options**

The farmer should be able to create a digital produce lot quickly.

## 7. MARKET PRICE DASHBOARD

Create a farmer-friendly market comparison screen.

Show:

* Nearby markets/mandis
* Current price
* Minimum price
* Maximum price
* Modal price
* Distance
* Recent price trend
* Market arrivals
* Demand level

Do not only show the highest price.

Example:

Market A
₹22/kg
8 km
Demand: Medium

Market B
₹25/kg
30 km
Demand: High

Buyer C
₹24/kg
18 km
Demand: High

Make it obvious that the highest price does not necessarily mean the highest earnings.

## 8. BEST MARKET RECOMMENDATION

Create a prominent recommendation screen.

Rank the top 3 selling options using estimated **net proceeds**, not headline price.

For every recommendation show:

* Gross revenue
* Transport cost
* Loading/handling
* Market/platform fees
* Expected spoilage loss
* Estimated net earnings
* Distance
* Pickup/delivery timing
* Buyer trust/verification
* Reason for ranking

Example:

⭐ RECOMMENDED

Buyer C

₹24/kg

Gross revenue: ₹24,000
Transport: -₹1,000
Loading: -₹200
Fees: -₹0
Expected spoilage: -₹0

Estimated net:

**₹22,800**

Reason:

"Good price + nearby pickup + verified buyer + lower transport cost."

Use simple explanations rather than mathematical terminology.

## 9. SELL NOW VS WAIT

Create a dedicated decision-support card/page.

Show:

* Current price
* Recent trend
* Expected short-term price direction
* Market arrivals
* Buyer demand
* Crop perishability
* Storage availability
* Farmer cash urgency

Possible recommendations:

**SELL NOW**

or

**WAIT 2 DAYS**

or

**SELL WITHIN 24 HOURS**

Always explain WHY.

Example:

"Sell within 1–2 days."

"Nearby arrivals are high, projected prices are declining, and tomato spoilage risk is high without cold storage."

Clearly label predictions and recommendations as estimates, not guarantees.

## 10. PERISHABILITY / SPOILAGE RISK

Create a simple visual risk indicator:

🟢 Low
🟡 Medium
🔴 High

Explain the reason.

Example:

"High spoilage risk"

"Tomatoes are harvested and no cold storage is available."

Then provide an action:

"Consider selling today or arranging cold storage."

Do not make the risk indicator decorative; it must lead to a clear action.

## 11. BUYER MATCHING

Create a verified buyer marketplace.

Each buyer card should show:

* Buyer name
* Verification status
* Required crop
* Required quantity
* Quality requirement
* Offered price
* Distance
* Pickup date
* Payment terms
* Buyer rating
* Estimated net earnings

Example:

ABC Foods

✓ Verified Buyer

Needs: 1,000–5,000 kg tomatoes

Offer: ₹24/kg

Pickup: Tomorrow

Payment: Within 24 hours

Rating: 4.7/5

Estimated net: ₹22,800

CTA:

**Compare Offer**

## 12. OFFER COMPARISON

Allow farmers to compare multiple offers.

Compare:

* Price
* Quantity
* Net earnings
* Transport cost
* Pickup timing
* Payment terms
* Buyer verification
* Buyer rating
* Quality requirements

Highlight the best overall option.

Do NOT automatically select an offer for the farmer.

The farmer must remain in control.

## 13. TRANSPORT PLANNER

Create a simple transport screen showing:

* Distance
* Vehicle option
* Estimated transport cost
* Loading cost
* Cost per kg/ton
* Pickup schedule

Example:

Mini Truck
18 km
₹1,000 estimated
Pickup: Tomorrow 8 AM

CTA:

**Confirm Transport**

## 14. ORDER TRACKING

After accepting an offer, create a simple progress tracker:

✓ Order confirmed
✓ Vehicle assigned
→ Pickup
○ In transit
○ Delivered
○ Payment completed

Use clear status labels.

## 15. PAYMENT STATUS

Create a payment screen showing:

* Agreed price
* Quantity
* Total amount
* Deductions
* Net amount
* Payment status
* Expected payment date
* Payment history

Statuses:

**Pending**

**Processing**

**Paid**

Make payment information extremely easy to understand.

## 16. QUALITY AND DISPUTES

Create a quality documentation interface.

Allow:

* Produce photos
* Grade
* Weight
* Weight slip
* Agreed quality
* Buyer comments
* Delivery evidence

Create a dispute flow for:

* Payment issue
* Quality dispute
* Quantity/weight dispute
* Delivery issue

Show dispute status clearly.

## 17. FARMER PROFIT DASHBOARD

Create a simple profit screen.

Show:

* Quantity sold
* Average price
* Gross earnings
* Transport expenses
* Loading expenses
* Storage expenses
* Fees
* Net profit
* Sales history

Use understandable visualizations rather than complex financial charts.

## 18. ALERTS

Create farmer-friendly alerts for:

* Major price changes
* New buyer demand
* FPO bulk-sale opportunity
* Increasing spoilage risk
* Pickup reminders
* Payment updates

Use short messages.

Example:

"🍅 Tomato price increased by ₹2/kg nearby."

"🚚 Your buyer pickup is tomorrow at 8 AM."

"⚠️ Spoilage risk is increasing. Consider selling within 24 hours."

## 19. FPO FEATURES

Create an FPO section where the organisation can:

* Aggregate farmer lots
* View member contributions
* Create bulk lots
* Invite farmers
* Receive bulk buyer offers
* Compare bulk offers
* Show expected earnings for each member

Keep the FPO interface separate from the simpler farmer interface.

## 20. DESIGN SYSTEM

Create a consistent design system.

Use:

* Agriculture-inspired but professional visual language
* High readability
* Strong contrast
* Large typography
* Rounded cards
* Clear hierarchy
* Simple icons
* Accessible buttons
* Consistent spacing
* Minimal decorative elements

Do not overuse green.

Avoid making every component green.

Use color primarily to communicate:

* Success
* Warning
* Risk
* Information
* Verification

## 21. NAVIGATION

Create simple bottom navigation for the farmer mobile experience:

Home
My Produce
Market
Orders
Profile

Important actions should always remain easy to access.

Use a floating/primary action for:

**+ Sell Produce**

## 22. TRUST DESIGN

Trust is a major concern.

Clearly communicate:

* Verified buyers
* Buyer ratings
* Payment terms
* Quality records
* Digital trade records
* Delivery status
* Dispute support

Never make unknown buyers appear identical to verified buyers.

## 23. DATA TRANSPARENCY

Clearly label:

**Live / Verified Data**

**Estimated**

**Predicted**

**Demo Data**

Do not present simulated hackathon data as real-world outcomes.

AI recommendations must be presented as decision support, not guaranteed predictions.

## 24. RESPONSIVE DESIGN

Design:

1. Farmer mobile interface first
2. Tablet version
3. Desktop buyer/FPO dashboard

The farmer experience must remain usable on small screens.

Design for low bandwidth and limited connectivity.

## 25. PROTOTYPE REQUIREMENTS

Create a clickable prototype demonstrating this scenario:

A farmer has **1,000 kg of tomatoes**, harvest is approaching, the farmer has limited/no cold storage and needs money soon.

The prototype should demonstrate:

Add tomato lot → View nearby prices → Compare markets → Calculate estimated net earnings → See spoilage risk → Receive sell-now recommendation → View verified buyers → Compare offers → Accept buyer → Arrange transport → Track delivery → View payment → Submit feedback.

## 26. IMPORTANT UX RULE

The application is NOT a price-display app.

The central experience must be:

**"What is the best realistic way for this farmer to sell this crop and maximize expected net earnings while reducing risk?"**

Every major screen should help answer that question.

## 27. FINAL OUTPUT

Generate:

* Complete UI/UX
* User flow
* Mobile-first farmer screens
* Buyer dashboard
* FPO dashboard
* Responsive layouts
* Design system
* Reusable components
* Clickable prototype flow
* Realistic agricultural sample data
* Telugu/English language-ready interface
* Clear farmer-friendly microcopy

The final design should look like a production-ready agricultural marketplace, not a generic AI-generated dashboard.

Prioritize **clarity, trust, accessibility, farmer decision-making and real-world usability over visual complexity**.
