import React from "react";
import Image from "next/image";
import Link from "next/link";
import WholesaleForm from "@/components/WholesaleForm";
import { Zap, ShieldCheck, Truck, TrendingUp, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Wholesale Partnership | ELV8 Energy Drink",
  description: "Become an official ELV8 Energy Drink wholesale distributor or retail partner. Premium clean formula, zero sugar, high profit margins.",
  alternates: {
    canonical: "https://www.elv8.gr/b2b-wholesale",
  }
};

export default function B2BWholesalePage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-white overflow-x-hidden">
      
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
                Fuel Your Business With <span className="text-[#FF1D8E]">ELV8 Energy</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Join the fastest-growing clean energy movement in Europe. Partner directly with ELV8 to stock your gyms, supermarkets, kiosks, or distribution network with high-margin premium energy cans.
              </p>

              {/* High-level Partner Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 font-display">200mg</span>
                  <span className="text-xs text-slate-500 font-medium">Natural Caffeine</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-[#FF1D8E] font-display">High</span>
                  <span className="text-xs text-slate-500 font-medium">Profit Margins</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-black text-slate-900 font-display">24-48h</span>
                  <span className="text-xs text-slate-500 font-medium">Fast Dispatch</span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#partner-form"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FF1D8E] hover:bg-[#d80f74] text-white rounded-full font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl hover:shadow-[#FF1D8E]/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply For Wholesale Pricing</span>
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
                  className="object-contain drop-shadow-[0_25px_45px_rgba(255,29,142,0.3)] animate-float-slow"
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
              Why Retailers & Distributors Choose <span className="text-[#FF1D8E]">ELV8</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              We provide our wholesale partners with premium product quality, strong brand backing, and unbeatable commercial terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Advantage 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">High Profit Margins</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Generous wholesale margins designed to maximize sell-through profitability for kiosks, gyms, and supermarkets.
              </p>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">Clean Formula Demand</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zero Sugar, 200mg Natural Caffeine, Electrolytes & B-Vitamins. The exact formula modern health-conscious consumers demand.
              </p>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">Reliable Supply Chain</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fast pallet & case shipping across Greece & Europe with guaranteed stock availability and dedicated customer support.
              </p>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 text-left">
              <h3 className="text-xl font-bold font-display text-slate-900">POS & Marketing Support</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We equip our retail partners with branded mini fridges, counter displays, stickers, and active social media promotion.
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
              Tailored For Every <span className="text-[#FF1D8E]">Retail Channel</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Whether you operate a single boutique gym or a nationwide retail chain, ELV8 offers customized wholesale tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Channel 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-slate-900">Gyms & Fitness Centers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  High impulse purchases pre and post workout. Increase your gym revenue per member with ELV8 clean energy.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" /> Branded Counter Display Units</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" /> High Margin Case Pricing</li>
              </ul>
            </div>

            {/* Channel 2 */}
            <div className="bg-[#FF1D8E] text-white rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-lg relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-white">Kiosks & Convenience</h3>
                <p className="text-slate-100 text-sm leading-relaxed">
                  Stand out in cold beverage fridges with vibrant eye-catching cans and instant customer brand recognition.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-100 z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Fast 24-48h Restock Delivery</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> High Frequency Repeat Sales</li>
              </ul>
            </div>

            {/* Channel 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-all relative overflow-hidden">
              <div className="space-y-3 z-10">
                <h3 className="text-2xl font-black font-display text-slate-900">Distributors & Wholesalers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Expand your FMCG beverage portfolio with exclusive regional distribution rights and full pallet volume discounts.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" /> Full Pallet Tiered Pricing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" /> Dedicated Key Account Rep</li>
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
              Apply For Partnership
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              Request Wholesale Catalog & Pricing
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Fill out the partner application form below and our sales team will contact you within 24 business hours.
            </p>
          </div>

          <WholesaleForm />

        </div>
      </section>

    </main>
  );
}
