Redesign and rearrange the existing KisanSetu mobile app UI/UX into a clear TILE-BASED information architecture.

IMPORTANT:
Do NOT redesign the product from scratch.
Do NOT remove existing functionality.
Do NOT turn this into a generic marketplace app.
Preserve the existing KisanSetu visual identity and core flows, but reorganize the features so that users can clearly understand and access every major capability through a simple tile-based dashboard.

==================================================
PRODUCT CONTEXT
==================================================

KisanSetu is a farmer-focused market linkage and decision-support platform.

Its core purpose is:

“Turn fragmented agricultural market information into a personalized, explainable and safer transaction decision.”

The farmer should not have to understand the entire agricultural marketplace.

The interface should help answer:

“What should I do with my crop right now?”

The main hero action is:

SELL MY CROP

The product should complement existing ecosystems such as e-NAM and Agmarknet rather than look like an e-NAM clone.

==================================================
CORE UX PRINCIPLE
==================================================

Use a TILE-BASED information architecture.

Each important feature must have a clearly named, visually identifiable tile.

However:

DO NOT make every tile equally prominent.

Create a clear hierarchy:

LEVEL 1:
Most important actions

LEVEL 2:
Decision-support features

LEVEL 3:
Management / supporting features

The interface should feel simple even though the product contains many capabilities.

Think:

“Simple outside, intelligent inside.”

==================================================
FARMER HOME SCREEN
==================================================

Redesign the farmer home screen around tiles.

TOP AREA:

Greeting:
“Good morning 👋”

Location:
“Your location”

Then immediately show the primary action:

[LARGE HERO TILE]

🌾 SELL MY CROP

Subtitle:
“Find the best selling option for your crop”

This must be the largest and most visually prominent tile.

Optional secondary CTA:

[FIND SUPPLIES]

Only show this prominently if the logged-in user has buyer/FPO functionality.

==================================================
SMART RECOMMENDATION AREA
==================================================

Immediately below the primary action, create a prominent:

💡 KISANSETU RECOMMENDATION

Example:

“Better selling option found”

Soybean • 20 quintals

Buyer B
₹2,850/quintal

Estimated net realization:
₹55,000

“₹2,500 better than your current best option”

CTA:
VIEW RECOMMENDATION

This section is extremely important.

KisanSetu should NOT feel like an app that simply displays features.

It should actively surface useful decisions.

==================================================
SECTION 1 — SELL & TRANSACT
==================================================

Create a clearly labelled section:

“SELL & TRANSACT”

Use visually consistent tiles.

Tile 1:
🌾 MY CROPS
“Manage crops available for sale”

Tile 2:
💰 SELLING OPTIONS
“Compare buyers, markets and expected net realization”

Tile 3:
🤝 MY BUYERS
“View buyers you have interacted or transacted with”

Tile 4:
📦 MY DEALS
“Track active and completed transactions”

These are core marketplace functions.

The “SELLING OPTIONS” tile should have higher visual priority than the other tiles because it contains the main decision engine.

==================================================
SECTION 2 — MARKET & DECISION SUPPORT
==================================================

Section title:

“MARKET & DECISION SUPPORT”

Tiles:

📊 MARKET PRICES
“View current market prices and arrivals”

📈 PRICE OUTLOOK
“Understand price trends and possible movement”

🚚 TRANSPORT
“Estimate transport options and cost”

🏪 STORAGE
“Find storage options and understand storage cost”

🌦️ WEATHER IMPACT
“See weather information relevant to your selling decision”

Important:

Do not make these feel like separate disconnected apps.

Their visual copy should communicate that they help the farmer make a selling decision.

For example:

MARKET PRICES
“Know today’s prices”

TRANSPORT
“Know what delivery will cost”

STORAGE
“Compare selling now vs storing”

WEATHER IMPACT
“See how upcoming weather may affect your plan”

==================================================
SECTION 3 — TRUST & SAFETY
==================================================

Section title:

“TRUST & SAFETY”

Tiles:

✅ VERIFIED BUYERS
“View available verification and transaction evidence”

🛡️ TRUST & SAFETY
“Protect your account and transactions”

⚠️ ALERTS
“Important market, transaction and risk alerts”

⚖️ DISPUTES
“Raise or manage transaction disputes”

Do NOT create a fake numerical “Trust Score”.

Trust must be represented through evidence such as:

- Identity/business verification
- Completed transactions
- Payment behaviour
- Cancellation history
- Dispute history
- Account history
- Current risk indicators

Use labels such as:

“Established”
“New but verified”
“Limited history”
“Risk flagged”

Clearly communicate that verification is not a guarantee of trustworthiness.

==================================================
SECTION 4 — MONEY
==================================================

Section title:

“MONEY”

Tiles:

💳 PAYMENTS
“Track incoming and completed payments”

📊 MY EARNINGS
“Understand your earnings and transaction outcomes”

The financial experience should focus on what the farmer actually receives.

Where relevant, emphasize:

GROSS VALUE

minus

TRANSPORT

minus

OTHER COSTS

equals

ESTIMATED NET REALIZATION

==================================================
SECTION 5 — MY FARM
==================================================

Section title:

“MY FARM”

Tiles:

🌱 MY FIELD / CROP DETAILS
“Manage crop and field information”

📔 CROP DIARY
“Record important crop activities”

👤 MY PROFILE
“Manage farmer profile and preferences”

These are supporting features and should have lower visual prominence than selling/decision features.

==================================================
ACTIVE DEAL
==================================================

If the farmer has an active transaction, show a dedicated compact tile near the top.

Example:

📦 ACTIVE DEAL

Soybean • 20 quintals

Buyer B

Pickup:
Tomorrow, 10:00 AM

Status:
Pickup scheduled

CTA:
TRACK DEAL

This tile should link directly to the transaction timeline.

==================================================
DECISION INBOX
==================================================

Add a lightweight “IMPORTANT FOR YOU” / “DECISION INBOX” section.

This should not be a generic notification feed.

Only show events that may require a decision or action.

Examples:

💰
“Buyer B increased their offer.”

🚚
“Pickup transport changed.”

🌦️
“Rain is expected around your planned pickup.”

⚠️
“Buyer payment information changed. Review before confirming.”

📈
“A better estimated net realization is available.”

The system should surface useful information instead of forcing the farmer to search through features.

==================================================
TILE DESIGN SYSTEM
==================================================

Every tile should have:

1. Simple icon
2. Clear feature name
3. One-line explanation
4. Optional important metric/status
5. Optional CTA

Example:

┌─────────────────────────────┐
│ 💰                          │
│ SELLING OPTIONS             │
│ Compare your best options   │
│                             │
│ Best net: ₹55,000           │
│                         →   │
└─────────────────────────────┘

Avoid excessive text.

Avoid decorative cards that do not provide information.

==================================================
VISUAL HIERARCHY
==================================================

Use different tile sizes according to importance.

LARGE:
SELL MY CROP
KISANSETU RECOMMENDATION

MEDIUM:
SELLING OPTIONS
MY DEALS
MY CROPS
PAYMENTS

SMALL:
MARKET PRICES
TRANSPORT
STORAGE
WEATHER
BUYERS
ALERTS
DISPUTES
PROFILE
CROP DIARY

The home screen should NOT look like a uniform grid of 15 identical cards.

Hierarchy is essential.

==================================================
NAVIGATION
==================================================

Use a simple bottom navigation.

Recommended:

HOME
MY CROPS
MY DEALS
MARKET
PROFILE

Do not put every feature into bottom navigation.

The tile system is the primary feature discovery mechanism.

==================================================
SELL MY CROP FLOW
==================================================

The tile-based home screen must connect directly into the existing selling journey:

SELL MY CROP
↓
SELECT CROP
↓
ENTER QUANTITY
↓
SELECT SELLING URGENCY
↓
OPTIONAL CONSTRAINTS
↓
COMPARE SELLING OPTIONS
↓
WHY THIS RECOMMENDATION?
↓
BUYER TRUST PROFILE
↓
CONFIRM DEAL
↓
DEAL TRACKING

Do not add unnecessary screens.

==================================================
COMPARE SELLING OPTIONS
==================================================

This is the most important functional screen after the home screen.

Show 3–4 options.

Each option should display:

Buyer / market

Listed price

Estimated net realization

Transport cost

Distance

Quantity fit

Trust/evidence status

Payment reliability

Information freshness

Example:

RECOMMENDED

Buyer B

₹2,850 / quintal

Estimated net:
₹55,000

35 km away

Established buyer

Reliable payment history

Updated 20 min ago

WHY THIS OPTION?

The recommendation must be based on realistic economic outcome, not simply the highest listed price.

==================================================
WHY RECOMMENDATION SCREEN
==================================================

Explain the recommendation transparently.

Example:

“Buyer B is recommended because:”

✓ Higher estimated net realization

✓ Lower transport cost

✓ Your quantity matches the buyer requirement

✓ Strong payment history

✓ Established transaction history

✓ Offer recently updated

Then show:

CONFIDENCE:
High

INFORMATION UPDATED:
20 minutes ago

Never claim certainty when data is incomplete.

==================================================
RESPONSIVE / MOBILE UX
==================================================

This is primarily a mobile farmer experience.

Design for:

- One-handed use
- Large tap targets
- High readability
- Simple language
- Clear icons
- Minimal cognitive load
- Local-language expansion
- Low digital literacy

Do not rely on tiny text or dense tables.

Use cards/tiles to simplify complexity.

==================================================
LANGUAGE
==================================================

Design the interface so labels can later support:

English
Hindi
Marathi

Avoid long English phrases that will become difficult to translate.

Use simple terminology.

Example:

Instead of:

“Expected Net Realization After Transactional Cost Adjustment”

Use:

“Estimated Net You Receive”

==================================================
IMPORTANT PRODUCT RULE
==================================================

Do NOT remove or hide important functionality merely to make the UI look clean.

Instead organize functionality into logical tile groups.

The final architecture should make it immediately obvious:

1. What can I do?
2. What is happening with my crop?
3. What is the best option?
4. Can I trust the buyer?
5. What will I actually earn?
6. What happens next?

==================================================
FINAL DESIGN GOAL
==================================================

The redesigned UI should communicate KisanSetu in 5 seconds.

A farmer should immediately understand:

“I can tell KisanSetu what crop I want to sell.”

“KisanSetu can compare my available selling options.”

“It considers more than just price.”

“It explains why an option is recommended.”

“It helps me transact more safely.”

Do not make the interface feel like a collection of features.

Make it feel like:

A SIMPLE FARMER DECISION CENTRE.

Create/update the Figma screens accordingly while preserving the existing design language where possible.

Prioritize usability, information hierarchy, feature discoverability and the core selling decision journey over visual decoration.