"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Mouse, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import ProductCarousel from "@/components/ProductCarousel";
import { WooProduct, WooCategory, WooTag } from "@/types/product";

export default function HomeClient({
  initialFeaturedProducts = [],
  initialSaleProducts = [],
  initialCategories = [],
  initialTags = []
}: {
  initialFeaturedProducts?: WooProduct[];
  initialSaleProducts?: WooProduct[];
  initialCategories?: WooCategory[];
  initialTags?: WooTag[];
}) {
  return (
    <div className="bg-white text-slate-900 overflow-x-hidden font-body min-h-screen">
      {/* ================= HERO SECTION (EXACT RIDGED DESIGN REPLICATE) ================= */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between pt-6 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Top Pill Badge */}
        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#F3F3F3] border border-slate-200/60 px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide text-slate-700 shadow-sm">
            <span>Discover Exquisite Exclusive Collection</span>
          </div>
        </div>

        {/* Hero Middle Content Container */}
        <div className="relative my-8 md:my-12 flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[480px]">
          
          {/* Giant Outlined Text Overlay (BEHIND THE CAN) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span 
              className="text-[22vw] lg:text-[20vw] font-black tracking-widest text-transparent uppercase opacity-25 whitespace-nowrap"
              style={{ WebkitTextStroke: "2px #0F382C" }}
            >
              ELV8
            </span>
          </div>

          {/* Central Product Can Render */}
          <div className="relative z-10 w-full max-w-[340px] md:max-w-[420px] lg:max-w-[460px] mx-auto flex justify-center items-center">
            {/* CAN Image */}
            <div className="relative w-full h-[420px] md:h-[520px] lg:h-[560px]">
              <Image
                src="/elv8-can-hero.jpg"
                alt="elv8 Energy Drink Can"
                fill
                priority
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Soft Floating Lime Accent Square (Bottom Right of the Can) */}
            <div className="absolute bottom-6 right-2 md:right-8 w-16 h-16 md:w-20 md:h-20 bg-[#E2FB71] rounded-2xl shadow-xl border border-[#d4f657] transform rotate-6 animate-pulse z-20" />
          </div>

          {/* Left Column Text (Positioned at Bottom-Left of the Hero) */}
          <div className="lg:absolute lg:left-0 lg:bottom-4 z-20 max-w-sm space-y-4 text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0F382C] leading-[1.1] font-display">
              Healthy Energy-<br />
              Boosting Drinks
            </h1>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Transform Your daily routine with energy drinks- Designed to promote long terms health benefits,
            </p>
          </div>

          {/* Right Floating Elements */}
          <div className="lg:absolute lg:right-0 lg:top-8 z-20 flex flex-col items-end gap-12 w-full lg:w-auto">
            
            {/* Top Right Floating Review Badge */}
            <div className="bg-[#F3F3F3] p-3 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-3.5 backdrop-blur-md">
              <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                <Image
                  src="/elv8-cans-pair.jpg"
                  alt="elv8 Energy Cans Pair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-slate-800 tracking-tight">
                  12.832 <span className="text-slate-500 font-medium">(Review)</span>
                </p>
              </div>
            </div>

            {/* Bottom Right Floating Mouse Scroll Button */}
            <div className="hidden lg:flex items-center justify-center w-14 h-14 bg-[#EFEFEF] hover:bg-slate-200 text-[#0F382C] rounded-full shadow-sm cursor-pointer transition-all hover:scale-110">
              <Mouse className="w-5 h-5" />
            </div>

          </div>

        </div>

        {/* Bottom Review / Quote Section (Identical to Screenshot) */}
        <div className="pt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-4">
            <h3 className="text-base md:text-lg font-bold text-[#0F382C] tracking-tight">
              Top reviews from the Greece & Europe.
            </h3>
          </div>

          <div className="lg:col-span-8 flex items-start gap-4 bg-[#F8F9F8] p-5 md:p-6 rounded-2xl border border-slate-100">
            <Quote className="w-8 h-8 text-[#0F382C] shrink-0 rotate-180" />
            <p className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed italic">
              "On Days When I Need Extra Energy To Get Through My Tasks, This Drink Is My Go-To. It’s Refreshing And Keeps Me Alert Without Making me Feel Weird."
            </p>
          </div>

        </div>

      </section>

      {/* ================= PRODUCT CAROUSEL SECTION ================= */}
      <div className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <ProductCarousel
            title="Δημοφιλή Προϊόντα elv8"
            subtitle="Zero Sugar • Natural Energy • Maximum Focus"
            products={initialFeaturedProducts}
            isLoading={false}
            backUrl="/"
          />
        </div>
      </div>
    </div>
  );
}
