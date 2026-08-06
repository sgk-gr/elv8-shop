"use client";

import React from "react";
import Image from "next/image";
import WholesaleForm from "@/components/WholesaleForm";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

export default function B2BWholesaleClient() {
  const { t, language } = useTranslation();
  const isEl = language === "el";

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-20 bg-white overflow-x-hidden">
      
      {/* ================= 1. B2B HERO LANDING SECTION ================= */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-pink-50/70 via-white to-yellow-50/50 text-slate-900 border-b border-slate-200/80 overflow-hidden">
        {/* Glowing Soft Background Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FF1D8E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FDE047]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight text-slate-900 leading-none">
                {isEl ? (
                  <>Απογειώστε την Επιχείρησή σας με το <span className="text-[#FF1D8E]">ELV8 Energy</span></>
                ) : (
                  <>Fuel Your Business With <span className="text-[#FF1D8E]">ELV8 Energy</span></>
                )}
              </h1>

              <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {isEl ? (
                  "Γίνετε μέλος του ταχύτερα αναπτυσσόμενου κινήματος καθαρής ενέργειας. Συνεργαστείτε απευθείας με το ELV8 για να προμηθεύσετε τα γυμναστήρια, τα σούπερ μάρκετ, τα περίπτερα ή το δίκτυο διανομής σας με υψηλού κέρδους premium ενεργειακά ποτά."
                ) : (
                  "Join the fastest-growing clean energy movement in Europe. Partner directly with ELV8 to stock your gyms, supermarkets, kiosks, or distribution network with high-margin premium energy cans."
                )}
              </p>

              {/* High-level Partner Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 font-display">200mg</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isEl ? "Φυσική Καφεΐνη" : "Natural Caffeine"}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-[#FF1D8E] font-display">
                    {isEl ? "Υψηλό" : "High"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isEl ? "Περιθώριο Κέρδους" : "Profit Margins"}
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 font-display">24-48h</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isEl ? "Γρήγορη Αποστολή" : "Fast Dispatch"}
                  </span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#partner-form"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FF1D8E] hover:bg-[#d80f74] text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF1D8E]/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isEl ? "Αίτηση για Τιμές Χονδρικής" : "Apply For Wholesale Pricing"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Showcase Can */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-[300px] sm:w-[380px] h-[460px] sm:h-[540px]">
                <Image
                  src="/elv8-can-clean.png"
                  alt="ELV8 Energy Wholesale Can"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_25px_45px_rgba(255,29,142,0.3)]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. WHY PARTNER WITH ELV8 (PROFIT & QUALITY) ================= */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              {isEl ? (
                <>Γιατί οι Λιανοπωλητές Επιλέγουν το <span className="text-[#FF1D8E]">ELV8</span></>
              ) : (
                <>Why Retailers & Distributors Choose <span className="text-[#FF1D8E]">ELV8</span></>
              )}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isEl ? (
                "Παρέχουμε στους συνεργάτες μας χονδρικής κορυφαία ποιότητα προϊόντων, ισχυρή υποστήριξη μάρκετινγκ και ασυναγώνιστους εμπορικούς όρους."
              ) : (
                "We provide our wholesale partners with premium product quality, strong brand backing, and unbeatable commercial terms."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Advantage 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {isEl ? "Υψηλό Περιθώριο Κέρδους" : "High Profit Margins"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEl ? (
                  "Ανταγωνιστικές τιμές χονδρικής σχεδιασμένες για μέγιστη κερδοφορία σε περίπτερα, γυμναστήρια και μίνι μάρκετ."
                ) : (
                  "Generous wholesale margins designed to maximize sell-through profitability for kiosks, gyms, and supermarkets."
                )}
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {isEl ? "Ζήτηση Καθαρής Φόρμουλας" : "Clean Formula Demand"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEl ? (
                  "Zero Sugar, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες Β. Η φόρμουλα που αναζητά ο σύγχρονος καταναλωτής."
                ) : (
                  "Zero Sugar, 200mg Natural Caffeine, Electrolytes & B-Vitamins. The exact formula modern health-conscious consumers demand."
                )}
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {isEl ? "Αξιόπιστη Τροφοδοσία" : "Reliable Supply Chain"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEl ? (
                  "Γρήγορη αποστολή κιβωτίων και παλετών σε όλη την Ελλάδα με εγγυημένο απόθεμα και άμεση υποστήριξη."
                ) : (
                  "Fast pallet & case shipping across Greece & Europe with guaranteed stock availability and dedicated customer support."
                )}
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {isEl ? "Υποστήριξη POS & Marketing" : "POS & Marketing Support"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {isEl ? (
                  "Παρέχουμε στους συνεργάτες μας επώνυμα stand, mini ψυγεία, διαφημιστικό υλικό και προώθηση στα social media."
                ) : (
                  "We equip our retail partners with branded mini fridges, counter displays, stickers, and active social media promotion."
                )}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 3. WHO WE WORK WITH (RETAIL CATEGORIES) ================= */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              {isEl ? (
                <>Σχεδιασμένο για Κάθε <span className="text-[#FF1D8E]">Κανάλι Λιανικής</span></>
              ) : (
                <>Tailored For Every <span className="text-[#FF1D8E]">Retail Channel</span></>
              )}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {isEl ? (
                "Είτε λειτουργείτε ένα μεμονωμένο γυμναστήριο είτε μια εθνική αλυσίδα λιανικής, το ELV8 προσφέρει προσαρμοσμένες κατηγορίες χονδρικής."
              ) : (
                "Whether you operate a single boutique gym or a nationwide retail chain, ELV8 offers customized wholesale tiers."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Channel 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-slate-900">
                  {isEl ? "Γυμναστήρια & Fitness" : "Gyms & Fitness Centers"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isEl ? (
                    "Ιδανική επιλογή για αγορά πριν και μετά την προπόνηση. Αυξήστε τα έσοδα του γυμναστηρίου σας ανά μέλος με το καθαρό ενεργειακό ποτό ELV8."
                  ) : (
                    "High impulse purchases pre and post workout. Increase your gym revenue per member with ELV8 clean energy."
                  )}
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 z-10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" />
                  {isEl ? "Επιτραπέζια Stand Πάγκου" : "Branded Counter Display Units"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" />
                  {isEl ? "Προνομιακή Τιμολόγηση Κιβωτίου" : "High Margin Case Pricing"}
                </li>
              </ul>
            </div>

            {/* Channel 2 */}
            <div className="bg-[#FF1D8E] text-white rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-lg relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-white">
                  {isEl ? "Μίνι Μάρκετ & Περίπτερα" : "Kiosks & Convenience"}
                </h3>
                <p className="text-slate-100 text-sm leading-relaxed">
                  {isEl ? (
                    "Ξεχωρίστε στα ψυγεία με τα εντυπωσιακά, ζωντανά χρώματα των κουτιών ELV8 και κερδίστε την προτίμηση των πελατών."
                  ) : (
                    "Stand out in cold beverage fridges with vibrant eye-catching cans and instant customer brand recognition."
                  )}
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-100 z-10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  {isEl ? "Γρήγορη Παράδοση σε 24-48 ώρες" : "Fast 24-48h Restock Delivery"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  {isEl ? "Υψηλή Συχνότητα Πωλήσεων" : "High Frequency Repeat Sales"}
                </li>
              </ul>
            </div>

            {/* Channel 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-slate-900">
                  {isEl ? "Διανομείς & Χονδρική" : "Distributors & Wholesalers"}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {isEl ? (
                    "Εμπλουτίστε το χαρτοφυλάκιο των ποτών σας με αποκλειστική διανομή και εκπτώσεις μεγάλου όγκου σε παλέτες."
                  ) : (
                    "Expand your FMCG beverage portfolio with exclusive regional distribution rights and full pallet volume discounts."
                  )}
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 z-10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" />
                  {isEl ? "Κλιμακωτές Τιμές Παλέτας" : "Full Pallet Tiered Pricing"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" />
                  {isEl ? "Προσωπικός Σύμβουλος Συνεργασίας" : "Dedicated Key Account Rep"}
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 4. WHOLESALE APPLICATION FORM SECTION ================= */}
      <section id="partner-form" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200 relative">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black tracking-[0.25em] text-[#FF1D8E] uppercase bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full inline-block">
              {isEl ? "Αίτηση Συνεργασίας" : "Apply For Partnership"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              {isEl ? "Ζητήστε Κατάλογο Χονδρικής & Τιμές" : "Request Wholesale Catalog & Pricing"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              {isEl ? (
                "Συμπληρώστε την παρακάτω φόρμα συνεργασίας και το τμήμα πωλήσεών μας θα επικοινωνήσει μαζί σας εντός 24 εργάσιμων ωρών."
              ) : (
                "Fill out the partner application form below and our sales team will contact you within 24 business hours."
              )}
            </p>
          </div>

          <WholesaleForm />

        </div>
      </section>

    </main>
  );
}
