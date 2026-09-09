Modify my existing KisanSetu mobile app prototype to implement the COMPLETE FARMER ONBOARDING FLOW shown in the second reference image.

IMPORTANT:
The SECOND reference image is the target workflow and screen sequence.
Do not treat it as just a visual reference. Recreate the navigation and interaction flow shown there.

Keep the existing KisanSetu visual identity, but restructure the screens so they open STEP-BY-STEP.

==================================================
FARMER ONBOARDING FLOW
==================================================

STEP 1 — ROLE SELECTION
Screen title:
"How will you use KisanSetu?"

Show role selection cards.

Primary role:
FARMER
"Sell crops with better market information"

Include:
- Farmer illustration
- Continue button
- Ask KisanSetu voice assistant option

When the user selects FARMER and taps CONTINUE:
→ Open Step 2.

==================================================

STEP 2 — MOBILE NUMBER
Screen title:
"Welcome, Farmer"

Text:
"Enter your Mobile Number (+91)"

Show:
- +91 country code
- Mobile number input
- Farmer illustration
- Short supporting message
- "Request OTP →" button

When the user taps Request OTP:
→ Open Step 3.

==================================================

STEP 3 — OTP VERIFICATION
Screen title:
"Verify your Phone"

Show:
- 6-digit OTP input boxes
- Resend OTP
- Edit Number
- "Verify & Continue" button

When OTP is entered and user taps Verify & Continue:
→ Open Step 4.

For prototype purposes, accept any valid 6-digit input.

==================================================

STEP 4 — IDENTITY VERIFICATION
Screen title:
"Confirm your Identity"

Show two options:
1. "Use Aadhaar (OTP)"
2. "Upload documents (PAN/Voter ID)"

Also show:
- Security/trust message
- Security badge/message

When identity verification is completed:
→ Open Step 5.

For the clickable prototype, allow the user to continue without implementing a real Aadhaar verification API.

==================================================

STEP 5 — FARMER PROFILE
Screen title:
"Tell us about yourself"

Show input fields:
- Full Name
- Father's/Spouse's Name
- Village/Location

Include a farmer illustration.

Button:
"Continue"

When Continue is pressed:
→ Open Step 6.

==================================================

STEP 6 — FARM & CROP DETAILS
Screen title:
"Your Farm & Crops"

Show:
- Total Farmland (Acres)
- Crops You Grow
- Crop selection chips such as:
  Wheat
  Soybean
  Vegetables
- Crop Status:
  Growing
  Harvested

Include suitable agricultural illustration.

Button:
"Continue"

When Continue is pressed:
→ Open Step 7.

==================================================

STEP 7 — BANK / PAYMENT DETAILS
Screen title:
"For secure, direct payments"

Show:
- Bank Account Number
- IFSC Code
- UPI ID (optional)

Show:
"Secure Transaction"

Button:
"Setup Complete →"

For prototype purposes, do not connect to a real banking API.

When Setup Complete is pressed:
→ Open Step 8.

==================================================

STEP 8 — FARMER HOME
After successful onboarding, open the Farmer Home screen.

Show:
"Namaste, Rameshji!"
"Welcome to KisanSetu"

Create the Farmer Home dashboard with:

1. Sell Crops
   "Find Buyers"

2. Crop Price Trends
   "Mandi Bhav"

3. My Listings
   "Active"

4. My Payments

5. Mandi / Buyers map section

6. Ask KisanSetu voice assistant at the bottom.

==================================================
NAVIGATION REQUIREMENTS
==================================================

The screens MUST open sequentially:

ROLE SELECTION
↓
MOBILE NUMBER
↓
OTP VERIFICATION
↓
IDENTITY VERIFICATION
↓
FARMER PROFILE
↓
FARM & CROP DETAILS
↓
BANK / PAYMENT DETAILS
↓
FARMER HOME

Do NOT place all onboarding information on one screen.

Each step must be its own mobile screen.

Use the Back arrow on onboarding screens so the user can return to the previous step.

The Continue/Next buttons must navigate to the correct next screen.

The final "Setup Complete" button must navigate to Farmer Home.

==================================================
DESIGN REQUIREMENTS
==================================================

Use the SECOND reference image as the main visual and structural reference.

Maintain:
- KisanSetu branding
- Agricultural/farmer illustrations
- Green and cream color palette
- Rounded cards
- Large readable typography
- Simple farmer-friendly UI
- Clear buttons
- Minimal clutter
- Mobile-first layout

Make every screen feel like part of ONE consistent KisanSetu application.

==================================================
IMPORTANT — DO NOT BREAK EXISTING DESIGN
==================================================

Do not redesign unrelated screens or components.

Do not remove existing KisanSetu functionality unless it conflicts with this onboarding flow.

Do not create unnecessary screens.

Do not make all steps appear simultaneously.

The user should experience the onboarding exactly as a step-by-step journey.

Create proper clickable prototype interactions between every screen.