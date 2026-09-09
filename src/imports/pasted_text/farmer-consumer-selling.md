EXTEND THE EXISTING KISANSETU FRONTEND WITH A NEW
FARMER → CONSUMER DIRECT SELLING FEATURE.

IMPORTANT:
DO NOT REDESIGN THE EXISTING KISANSETU UI.
DO NOT CHANGE THE CURRENT COLOR PALETTE, TYPOGRAPHY,
CARD STYLE, ICON STYLE, ILLUSTRATION STYLE, NAVIGATION,
BUTTONS, SPACING OR OVERALL VISUAL LANGUAGE.

STRICTLY FOLLOW THE EXISTING KISANSETU FRONTEND AND
REFERENCE DESIGN AS THE SOURCE OF TRUTH.

The new feature must look like it was always part of the
same KisanSetu application.

==================================================
CORE CONCEPT
==================================================

Add a new selling channel:

🌾 FARMER → 🏠 CONSUMER

KisanSetu already supports:

🌾 Farmer
🏢 FPO
🛒 Buyer

Now add direct consumer selling as an additional market
channel without disturbing the existing Farmer, FPO and
Buyer workflows.

The purpose is:

Help farmers discover whether selling directly to consumers
could provide better EXPECTED NET REALIZATION than other
available channels.

Do NOT present direct consumer selling as automatically
better.

==================================================
FARMER SIDE
==================================================

Add a new option inside the existing Farmer experience:

🌱 SELL DIRECT

Possible placement:
Farmer Home → Sell My Crop → Selling Channels

Show:

┌─────────────────────────────┐
│ 🌾 SELLING CHANNELS         │
│                             │
│ 🏪 Mandi                    │
│ Expected net ₹56,000        │
│                             │
│ 🛒 Buyer                    │
│ Expected net ₹57,000        │
│                             │
│ 🏢 FPO                      │
│ Expected net ₹57,500        │
│                             │
│ 🏠 Direct Consumer          │
│ Expected net ₹60,000        │
│                             │
│ ⭐ Potentially better       │
└─────────────────────────────┘

Use the same rounded-card style and visual hierarchy as the
existing KisanSetu frontend.

==================================================
FARMER — CREATE CONSUMER LISTING
==================================================

Screen:
"Sell Direct to Consumers"

Allow farmer to create a produce listing.

Fields:

🌾 Crop
📦 Available Quantity
💰 Price / kg
🔬 Quality / Grade
📅 Harvest Date
📍 Pickup Location
📸 Produce Photos
📝 Short Description

Example:

SOYBEAN

Available:
100 kg

Price:
₹65 / kg

Quality:
Premium

Harvested:
Today

📍 Akola

[ CREATE LISTING ]

Keep the screen visual and simple.
Use icons and short labels instead of long forms.

==================================================
FARMER — MY LISTINGS
==================================================

Add:

🌱 MY LISTINGS

Cards should show:

Crop
Photo
Price
Available quantity
Orders received
Listing status

Statuses:

🟢 ACTIVE
⏸ PAUSED
📦 LOW STOCK
✅ SOLD OUT

Example:

🌾 Soybean
₹65/kg
100 kg available

12 orders
🟢 Active

[ VIEW LISTING ]

==================================================
CONSUMER EXPERIENCE
==================================================

Add a new role:

🏠 CONSUMER

Do NOT redesign the existing role-selection screen.

Simply extend the existing role selection using the same
role-card design.

Role:

🏠 CONSUMER
"Buy fresh produce directly from farmers"

After selecting Consumer:

Mobile + OTP
↓
Basic Consumer Profile
↓
Location
↓
Consumer Home

==================================================
CONSUMER HOME
==================================================

Use the SAME KisanSetu visual language.

Heading:

"Fresh from nearby farms 🌱"

Show produce listings as attractive product cards.

Example:

┌─────────────────────────────┐
│ [Produce Image]             │
│                             │
│ 🌾 Fresh Soybean            │
│ ₹65 / kg                    │
│                             │
│ 👨‍🌾 Verified Farmer          │
│ 📍 12 km away               │
│ 📅 Harvested today          │
│                             │
│ [ VIEW PRODUCE → ]          │
└─────────────────────────────┘

Add filters:

🌾 Crop
📍 Distance
💰 Price
🌱 Freshness
✅ Verified

==================================================
CONSUMER — PRODUCT DETAILS
==================================================

Screen:

🌾 FARM-FRESH SOYBEAN

Large produce image.

Show:

₹65 / kg

Available:
100 kg

👨‍🌾 Farmer
📍 Location
📅 Harvest date
🔬 Quality / Grade
✅ Verification status

Do NOT make unsupported claims such as "organic" unless
there is actual certification.

CTA:

[ ADD TO CART ]

[ BUY NOW ]

==================================================
CONSUMER — FARMER PROFILE
==================================================

Allow consumer to see an evidence-based farmer profile.

Show:

👨‍🌾 Farmer
📍 Location
✅ Verified

🌾 Crops
📦 Completed orders
📅 Recent harvests
⭐ Transaction history

Keep this profile consistent with the existing KisanSetu
evidence-profile design.

==================================================
CONSUMER — CART
==================================================

Show:

Produce
Quantity
Price
Farmer
Subtotal
Delivery / pickup option
Total

CTA:

[ PLACE ORDER → ]

Keep the checkout extremely simple.

==================================================
CONSUMER — ORDER FLOW
==================================================

ORDER FLOW:

View Produce
↓
Select Quantity
↓
Add to Cart
↓
Choose Pickup / Delivery
↓
Confirm Order
↓
Payment
↓
Order Tracking
↓
Delivered
↓
Completed

==================================================
FARMER ORDER MANAGEMENT
==================================================

Add a section inside Farmer → My Deals / Direct Orders:

🏠 DIRECT ORDERS

Example:

🌾 Soybean
5 kg

Consumer Order #KS1024

₹325

🟡 Payment confirmed
🚚 Delivery pending

[ VIEW ORDER ]

Farmer can:

Accept
Prepare
Mark Ready
Handover / Dispatch
Complete

==================================================
ORDER STATUS
==================================================

Use a simple visual timeline:

🛒 ORDER PLACED
      ↓
💳 PAYMENT CONFIRMED
      ↓
📦 FARMER PREPARING
      ↓
🚚 READY / DELIVERY
      ↓
🏠 DELIVERED
      ↓
✅ COMPLETED

==================================================
KISANSETU DECISION ENGINE INTEGRATION
==================================================

IMPORTANT:

Direct consumer selling must become another option inside
the existing KisanSetu Decision Engine.

Example:

Farmer has 100 kg soybean.

Show:

🏪 Mandi
Expected net: ₹5,400

🛒 Buyer
Expected net: ₹5,700

🏢 FPO
Expected net: ₹5,600

🏠 Direct Consumer
Expected net: ₹6,200

Then:

⭐ RECOMMENDED CHANNEL

Direct Consumer

"Potentially higher estimated realization"

Explain why:

✓ Higher selling price
✓ Nearby consumer demand
✓ Manageable order volume

Also show possible considerations:

⚠️ Delivery effort
⚠️ Smaller order sizes
⚠️ More handling

Never guarantee profit.

==================================================
CONSUMER DISCOVERY
==================================================

Consumers should be able to discover:

🌾 Nearby produce
🌱 Recently harvested produce
👨‍🌾 Verified farmers
🏢 FPO-supplied produce
📍 Local availability

Prioritize freshness, distance and availability.

==================================================
IMPORTANT PRODUCT RULE
==================================================

Do NOT turn KisanSetu into a generic grocery shopping app.

The core identity remains:

MARKET INTELLIGENCE
+
BETTER SELLING DECISIONS
+
TRUST
+
TRANSACTIONS

Consumer commerce is ONE additional selling channel.

==================================================
NAVIGATION
==================================================

Do not unnecessarily add new bottom navigation items.

Farmer:

🏠 HOME
🌾 MY CROPS
📦 MY DEALS
📊 MARKET
👤 PROFILE

Consumer:

🏠 HOME
🔎 EXPLORE
🛒 CART
📦 ORDERS
👤 PROFILE

FPO and Buyer navigation must remain unchanged.

==================================================
VOICE ASSISTANT
==================================================

Keep the existing KisanSetu Voice Assistant available.

Farmer example:

"Can I earn more by selling directly to consumers?"

Consumer example:

"Show me fresh vegetables from nearby farmers."

The voice assistant must use the same visual treatment as
the existing KisanSetu frontend.

==================================================
FINAL REQUIREMENT
==================================================

EXTEND, DO NOT REDESIGN.

Every new screen must visually belong to the existing
KisanSetu application.

Preserve:
• Existing green brand identity
• Existing soft backgrounds
• Existing rounded cards
• Existing icons
• Existing typography
• Existing illustrations
• Existing buttons
• Existing voice assistant
• Existing navigation
• Existing spacing
• Existing visual hierarchy

The final experience should feel like:

🌾 Farmer
      ↓
🧠 KisanSetu Decision Engine
      ↓
🏪 Mandi
🛒 Buyer
🏢 FPO
🏠 Consumer
      ↓
💰 Expected Net Realization
      ↓
🤝 Transaction
      ↓
📦 Delivery
      ↓
💳 Payment
      ↓
📊 Actual Outcome

The new Farmer → Consumer marketplace must feel like a
NATIVE PART OF KISANSETU, NOT A SEPARATE E-COMMERCE APP.