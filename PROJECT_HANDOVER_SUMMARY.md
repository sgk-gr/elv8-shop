# PROJECT_HANDOVER_SUMMARY.md — ELV8 Shop Project Context & Directives

> **Οδηγίες προς το Antigravity στο νέο Laptop:**
> Διαβάζοντας αυτό το αρχείο, έχεις όλο το ιστορικό, τις σχεδιαστικές αποφάσεις, τους κανόνες και την κατάσταση του project ELV8 Shop, ώστε να συνεχίσεις άμεσα τη δουλειά χωρίς να χαθεί καμία προτίμηση του χρήστη.

---

## 1. 📌 Βασικές Πληροφορίες Project
- **Όνομα Project:** ELV8 Shop
- **Repository:** `https://github.com/sgk-gr/elv8-shop.git` (Branch: `main`)
- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, WooCommerce API Bridge.
- **Backend WooCommerce Store URL:** `https://store.elv8now.com`

---

## 2. 🎨 Σχεδιαστικές Αρχές & Προτιμήσεις Χρήστη (Strict Rules)
1. **Bright / White Theme (ΟΧΙ Dark Mode):** 
   - Η εφαρμογή είναι φωτεινή, με λευκό φόντο (`bg-white`), ζωηρά χρώματα, οργανικά blobs και καθαρή τυπογραφία.
   - Απαγορεύεται η χρήση σκοτεινών φόντων (Dark Mode) στις κύριες σελίδες.
2. **Χρωματική Παλέτα Brand:**
   - **ELV8 Pink (Primary Accent):** `#FF1D8E` (ή `text-[#FF1D8E]`, `bg-[#FF1D8E]`)
   - **ELV8 Yellow:** `#FDE047`
   - **Text & Dark Accents:** `slate-900` / `black`
3. **Φωτογραφίες & Assets:**
   - Προτίμηση σε πραγματικές φωτογραφίες υψηλής ποιότητας (π.χ. Unsplash) έναντι generic AI εικόνων.
   - Επίσημα PNGs προϊόντος με διαφάνεια στο `/public`:
     - `/elv8-can-clean.png` (Can)
     - `/elv8-lemon-pure.png` & `/elv8-lemon-fruit.png`
     - `/elv8-strawberry-pure.png` & `/elv8-strawberry-fruit.png`
     - `/elv8-apple-can.png` & `/elv8-apple-fruit.png`
4. **Header Navigation (Συμπεριφορά Header):**
   - **Αρχική σελίδα (Hero):** 100% διαφανές (`bg-transparent`) στην κορυφή, γίνεται λευκό με θόλωση (`bg-white/90 backdrop-blur-md`) στο scroll.
   - **Υπόλοιπες σελίδες (About, Products, Store Locator κλπ):** Σταθερά λευκό φόντο με θόλωση (`bg-white/90 backdrop-blur-md`).
   - **Active Link Indicator:** Το μενού της σελίδας που βρίσκεται ο χρήστης γίνεται **Ροζ (`#FF1D8E`)** με ροζ υπογράμμιση.

---

## 3. 🚀 Βασικές Λειτουργίες που Υλοποιήθηκαν

### A. 🏠 Αρχική Σελίδα (`/`)
- **Full-screen Parallax Hero:** Οργανικά blobs, ιπτάμενα φρούτα (λεμόνια & φράουλες) με παράλλαξη στο scroll, γιγαντιαία stroke τυπογραφία "ELV8" και κεντρικό 3D Can.
- **Section 2 (Features):** Caffeine, B Vitamins, Taurine, Niacin με custom icons & badges.
- **Product Carousel & Marquee Strip:** Carousel προϊόντων και κινούμενη ταινία κοινωνικής απόδειξης.

### B. ℹ️ Σελίδα About (`/about`) & B2B Form
- **Hero & Highlights:** Section με μεγάλο ELV8 can και 4 lifestyle φωτογραφίες (Office, Gym, Outdoors, Daily Life).
- **Pink Product Card:** Κάρτα με το κουτί ELV8 σε μεγάλο μέγεθος (75-100% container overflow) και φρούτα στη βάση (`overflow-hidden` για απόκρυψη artifacts).
- **💼 B2B & Χονδρική Πώληση Section (`#wholesale`):**
  - Αυτόνομο Client Component `src/components/WholesaleForm.tsx`.
  - Φόρμα αιτήματος χονδρικής για Γυμναστήρια, Περίπτερα, Supermarkets & Διανομείς.
  - Με την υποβολή εμφανίζει toast + **Success Card UI** και στέλνει αίτημα στο WordPress REST API (`/wp-json/elv8/v1/wholesale-submit`) και email ειδοποίηση στον admin!

### C. 🛒 Καλάθι & Checkout (`/checkout`)
- **Ελάχιστη Παραγγελία:** Περιορισμός **τουλάχιστον 4 τεμαχίων (4-άδα)**. Αν το καλάθι έχει < 4 κουτάκια, εμφανίζεται προειδοποίηση και το κουμπί είναι απενεργοποιημένο.
- **Direct WooCommerce Checkout Redirect:** Ανακατεύθυνση ολοκλήρωσης παραγγελίας στο **`https://store.elv8now.com/?fill-cart=...`** (με προ-συμπλήρωση email χρήστη αν είναι συνδεδεμένος).

### D. 📍 Store Locator (`/store-locator`)
- **Διαδραστικός Χάρτης Google Maps:** Αυτόματη εστίαση στην τοποθεσία του επιλεγμένου καταστήματος.
- **Custom Animated ELV8 Map Pin Overlay:** Floating animated badge (`elv8` με pulsing dot) πάνω στον χάρτη.
- **Καθαρό Header:** Χωρίς περιττά badges ή download buttons. Καθαρά κείμενα φίλτρων (Όλα, Γυμναστήρια, Περίπτερα, Supermarkets).
- **WordPress Integration:** Φορτώνει ζωντανά δεδομένα από το `/wp-json/elv8/v1/stores`.

### E. 💖 Αγαπημένα (`/favorites`)
- Κεντραρισμένο layout στην οθόνη (`flex items-center justify-center`), καθαρή κάρτα empty state με εικονίδιο καρδιάς και κουμπί «Explore Flavors».

---

## 4. 🔌 WordPress Custom Plugins
1. **`elv8-store-locator-plugin` (`public/elv8-store-locator.zip`):**
   - Δημιουργεί CPT `elv8_store` (Σημεία Πώλησης) & CPT `elv8_b2b_lead` (Αιτήματα Χονδρικής B2B).
   - Προσφέρει REST endpoints:
     - `GET /wp-json/elv8/v1/stores`
     - `POST /wp-json/elv8/v1/wholesale-submit` (αποθηκεύει το αίτημα στο WP Admin & στέλνει email στον admin).
2. **`sgk-custom-checkout` (`public/sgk-custom-checkout.zip`):**
   - Custom WooCommerce checkout template στα χρώματα του ELV8 (`#FF1D8E`).

---

## 5. 🛠️ Πώς να ξεκινήσεις στο νέο Laptop
1. Κάνε `git pull origin main`.
2. Εκτέλεσε `npm install`.
3. Τρέξε τον dev server με `npm run dev`.
4. Αν ο χρήστης σου ζητήσει οτιδήποτε, διάβασε τις προτιμήσεις του σε αυτό το αρχείο (`PROJECT_HANDOVER_SUMMARY.md`).
