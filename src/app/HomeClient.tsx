"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCarousel from "@/components/ProductCarousel";
import EnergyButton from "@/components/EnergyButton";
import { useCart } from "@/context/CartContext";
import { WooProduct, WooCategory, WooTag } from "@/types/product";
import { useTranslation } from "@/context/LanguageContext";

export default function HomeClient({
  initialFeaturedProducts = [],
}: {
  initialFeaturedProducts?: WooProduct[];
  initialSaleProducts?: WooProduct[];
  initialCategories?: WooCategory[];
  initialTags?: WooTag[];
}) {
  const { t } = useTranslation();
  const { setIsCartOpen } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const containerRef = useState<HTMLDivElement | null>(null)[0];

  const [isMobile, setIsMobile] = useState(false);

  // Restore scroll position on refresh and handle smart auto-scroll between Hero & Section 2
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      const maxScroll = Math.max(Math.min(window.innerHeight, 600), 100);
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax transform calculations based on scrollProgress (0 to 1)
  const fruit1Transform = `translate3d(${-scrollProgress * 160}px, ${-scrollProgress * 140}px, 0) scale(${1 - scrollProgress * 0.3})`;
  const fruit2Transform = `translate3d(${-scrollProgress * 180}px, ${scrollProgress * 160}px, 0) scale(${1 - scrollProgress * 0.3})`;
  const fruit3Transform = `translate3d(${scrollProgress * 180}px, ${-scrollProgress * 140}px, 0) scale(${1 - scrollProgress * 0.3})`;
  const fruit4Transform = `translate3d(${scrollProgress * 200}px, ${scrollProgress * 100}px, 0) scale(${1 - scrollProgress * 0.3})`;
  const canTransform = `translate3d(0, ${scrollProgress * 80}px, 0) scale(${1 + scrollProgress * 0.08})`;
  const bgTextTransform = `translate3d(0, ${-scrollProgress * 50}px, 0) scale(${1 - scrollProgress * 0.15})`;

  const fruitOpacity = Math.max(1 - scrollProgress * 1.5, 0);
  const bgTextOpacity = Math.max(0.45 - scrollProgress * 0.8, 0);

  return (
    <div className="text-slate-900 font-body overflow-x-hidden">
      
      {/* ================= FULL SURFACE FLAVOR HERO SECTION ================= */}
      <section className="relative h-screen w-full flex flex-col justify-between pt-20 pb-8 px-4 md:px-8 bg-gradient-to-t from-[#FF1D8E] via-[#FF5E97] to-[#FDE047] transition-all duration-700 text-white snap-start snap-always">
        
        {/* Subtle Center Radial Glow Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, transparent 65%)"
          }}
        />

        {/* 1. Lemon Slice (Top Left) */}
        <div 
          className="absolute top-[18%] left-[4%] md:left-[10%] z-10 pointer-events-none transition-transform duration-75 ease-out flex flex-col items-center gap-2"
          style={{
            transform: fruit1Transform,
            opacity: fruitOpacity,
          }}
        >
          <div className="relative w-28 h-28 md:w-44 md:h-44 animate-float-slow">
            <Image
              src="/elv8-lemon-pure.png"
              alt="Floating Lemon Slice"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
          <span className="text-white text-[11px] md:text-sm font-semibold tracking-[0.18em] uppercase drop-shadow-lg">{t("hero.caffeine")}</span>
        </div>

        {/* 2. Strawberry (Middle Left) */}
        <div 
          className="absolute top-[52%] left-[8%] lg:left-[32%] z-10 pointer-events-none transition-transform duration-75 ease-out flex flex-col items-center gap-2"
          style={{
            transform: fruit2Transform,
            opacity: fruitOpacity,
          }}
        >
          <div className="relative w-28 h-28 md:w-44 md:h-44 animate-float-fast">
            <Image
              src="/elv8-strawberry-pure.png"
              alt="Floating Strawberry"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
          <span className="text-white text-[11px] md:text-sm font-semibold tracking-[0.18em] uppercase drop-shadow-lg">{t("hero.sugar")}</span>
        </div>

        {/* 3. Strawberry (Top Right) */}
        <div 
          className="absolute top-[20%] right-[4%] md:right-[10%] z-10 pointer-events-none transition-transform duration-75 ease-out flex flex-col items-center gap-2"
          style={{
            transform: fruit3Transform,
            opacity: fruitOpacity,
          }}
        >
          <div className="relative w-32 h-32 md:w-52 md:h-52 animate-float-slow">
            <Image
              src="/elv8-strawberry-pure.png"
              alt="Floating Strawberry"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
          <span className="text-white text-[11px] md:text-sm font-semibold tracking-[0.18em] uppercase drop-shadow-lg">{t("hero.focus")}</span>
        </div>

        {/* 4. Lemon Slice (Middle Right) */}
        <div 
          className="absolute top-[58%] md:top-[54%] right-[8%] lg:right-[34%] z-10 pointer-events-none transition-transform duration-75 ease-out flex flex-col items-center gap-2"
          style={{
            transform: fruit4Transform,
            opacity: fruitOpacity,
          }}
        >
          <div className="relative w-24 h-24 md:w-40 md:h-40 animate-float-fast">
            <Image
              src="/elv8-lemon-pure.png"
              alt="Floating Lemon Slice"
              fill
              className="object-contain drop-shadow-xl"
            />
          </div>
          <span className="text-white text-[11px] md:text-sm font-semibold tracking-[0.18em] uppercase drop-shadow-lg">{t("hero.electrolytes")}</span>
        </div>

        {/* Giant Outlined Stroke Background Typography ("ELV8") */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden transition-transform duration-75 ease-out"
          style={{
            transform: bgTextTransform,
            opacity: bgTextOpacity,
          }}
        >
          <span 
            className="text-[34vw] sm:text-[28vw] md:text-[22vw] lg:text-[18vw] font-black tracking-widest text-transparent uppercase whitespace-nowrap select-none responsive-stroke"
            style={{ WebkitTextStroke: "3px #FFFFFF" }}
          >
            <span style={{ fontFamily: "var(--font-oswald), sans-serif" }}>ELV</span>
            <span style={{ fontFamily: '"Myriad Pro", Myriad, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>8</span>
          </span>
        </div>

        {/* Central CAN Container */}
        <div 
          className="relative z-30 my-auto flex flex-col items-center justify-center min-h-[480px] sm:min-h-[540px] md:min-h-[600px] transition-transform duration-75 ease-out"
          style={{
            transform: canTransform,
          }}
        >
          <div className="relative w-64 sm:w-80 md:w-96 h-[380px] sm:h-[480px] md:h-[540px]">
            <Image
              src="/elv8-can-clean.png"
              alt="ELV8 Energy Can"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        {/* STATIC ORDER BUTTON (Fixed at Hero Bottom) */}
        <div className="z-30 flex justify-center pb-10 md:pb-4">
          <EnergyButton />
        </div>

        {/* Empty bottom spacer */}
        <div />

      </section>

      {/* ================= INGREDIENTS / FEATURES SECTION ================= */}
      <section id="section-2" className="relative min-h-screen lg:h-screen w-full flex items-center justify-center bg-white overflow-hidden py-20 lg:py-12 lg:pt-16">
        
        {/* Left Yellow & Right Red Shapes */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Left Shape - YELLOW */}
          <div className="absolute -left-[140px] sm:-left-[180px] lg:-left-[220px] -top-[120px] sm:-top-[160px] lg:-top-[220px] w-[500px] sm:w-[680px] lg:w-[820px] h-[500px] sm:h-[680px] lg:h-[820px] bg-[#FDE047] rounded-full pointer-events-none opacity-80" />
          
          {/* Right Full-Height Double Wave - RED (Paler) */}
          <svg
            className="absolute right-0 top-0 bottom-0 h-full w-[45vw] min-w-[320px] max-w-[680px] text-[#FF1D8E] fill-current opacity-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M 55 0 C 30 14 28 28 42 42 C 58 56 15 72 26 86 C 36 94 15 100 0 100 L 100 100 L 100 0 Z" />
          </svg>
        </div>

        <div className="container max-w-[1360px] mx-auto px-4 md:px-8 z-10 relative h-full flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 w-full my-auto">
            
            {/* Left: Vertical ELV8 Clean Can */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-start items-center lg:-ml-12 xl:-ml-32 z-20">
              <div className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] xl:w-[540px] h-[55vh] sm:h-[68vh] md:h-[72vh] lg:h-[78vh] drop-shadow-[0_25px_35px_rgba(0,0,0,0.2)]">
                <Image
                  src="/elv8-can-clean.png"
                  alt="ELV8 Energy Can"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: Exact Feature Rows matching Screenshot */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center gap-6 sm:gap-8 py-2 font-sans">
              
              {/* Feature 1: Caffeine */}
              <div className="flex items-center gap-6 sm:gap-7">
                <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full border-[3px] border-black flex items-center justify-center shrink-0 bg-transparent">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 sm:w-10 sm:h-10 text-black">
                    <path d="M13 2L3 14h7v8l10-12h-7l3-8z" />
                  </svg>
                </div>
                <p className="text-black text-base sm:text-lg md:text-[18px] lg:text-[19px] font-normal leading-relaxed m-0">
                  <span className="font-bold">Natural Caffeine</span> gives you an instant boost of energy, increases brain function & gets your Hustle Mode On!
                </p>
              </div>

              {/* Feature 2: B vitamins */}
              <div className="flex items-center gap-6 sm:gap-7">
                <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full border-[3px] border-black flex flex-col items-center justify-center shrink-0 bg-transparent relative">
                  <span className="font-bold text-[30px] sm:text-[34px] text-black leading-none -mt-1 font-sans">B</span>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-black">
                    <path id="curve" d="M 20 65 A 30 30 0 0 0 80 65" fill="transparent" />
                    <text width="100" textAnchor="middle" className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest fill-black font-sans">
                      <textPath href="#curve" startOffset="50%">VITAMINS</textPath>
                    </text>
                  </svg>
                </div>
                <p className="text-black text-base sm:text-lg md:text-[18px] lg:text-[19px] font-normal leading-relaxed m-0">
                  <span className="font-bold">Electrolytes & Vitamins</span> like B2 enable your body to create natural energy by converting body fat into Glucose.<br className="hidden sm:block" />
                  B6 Improves brain & immune function. B12 helps combat fatigue.
                </p>
              </div>

              {/* Feature 3: Taurine */}
              <div className="flex items-center gap-6 sm:gap-7">
                <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full border-[3px] border-black flex items-center justify-center shrink-0 bg-transparent">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 sm:w-10 sm:h-10 text-black">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="19" cy="6" r="2.5" />
                    <circle cx="5" cy="6" r="2.5" />
                    <circle cx="19" cy="18" r="2.5" />
                    <circle cx="5" cy="18" r="2.5" />
                    <path d="M12 12L19 6M12 12L5 6M12 12L19 18M12 12L5 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-black text-base sm:text-lg md:text-[18px] lg:text-[19px] font-normal leading-relaxed m-0">
                  <span className="font-bold">Nootropics / Focus</span> sharpen cognitive performance, keeping you focused, alert and productive during the most demanding hours of your day.
                </p>
              </div>

              {/* Feature 4: Niacin */}
              <div className="flex items-center gap-6 sm:gap-7">
                <div className="w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-full border-[3px] border-black flex items-center justify-center shrink-0 bg-transparent">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 sm:w-10 sm:h-10 text-black">
                    <path d="M12 3l-8 9h5v9h6v-9h5l-8-9z" />
                  </svg>
                </div>
                <p className="text-black text-base sm:text-lg md:text-[18px] lg:text-[19px] font-normal leading-relaxed m-0">
                  <span className="font-bold">Zero Sugar</span> enables a slow release of energy, no spikes, no crash. Just steady, clean fuel that keeps you at peak performance all day long.
                </p>
              </div>

              {/* READ MORE Button */}
              <div className="pt-2 pl-0 sm:pl-[100px]">
                <Link
                  href="/about"
                  className="bg-black text-white px-10 py-3.5 text-xs font-black tracking-[0.2em] uppercase hover:bg-[#FF1D8E] transition-colors duration-300 inline-block rounded-full shadow-md"
                >
                  READ MORE
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      <div className="w-full snap-align-none bg-white text-slate-900 py-6 border-t border-slate-100">
        <ProductCarousel
          title="ELV8 Suited to Your Expectations"
          products={[...initialFeaturedProducts].reverse()}
          isLoading={false}
          backUrl="/"
        />
      </div>



      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.3em] text-[#FF1D8E] uppercase mb-3">{t("home.testimonials.title")}</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight whitespace-pre-line">{t("home.testimonials.subtitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Alex K.", handle: "@alexk_fit", text: t("home.review.alex.text"), stars: 5, flavor: "Strawberry Lemon" },
              { name: "Maria P.", handle: "@mariap", text: t("home.review.maria.text"), stars: 5, flavor: "Green Apple" },
              { name: "Nikos T.", handle: "@nikostrains", text: t("home.review.nikos.text"), stars: 5, flavor: "Strawberry Lemon" },
            ].map((review) => (
              <div key={review.name} className="bg-slate-50 p-7 flex flex-col gap-4 border border-slate-100">
                <div className="flex gap-0.5">
                  {[...Array(review.stars)].map((_, i) => (
                    <span key={i} className="text-[#FF1D8E] text-base">★</span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-slate-900 font-black text-sm">{review.name}</p>
                    <p className="text-slate-400 text-xs">{review.handle}</p>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#FF1D8E] uppercase bg-pink-50 px-2 py-1">{review.flavor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FULL-WIDTH LIFESTYLE BANNER ================= */}
      <section className="relative w-full bg-gradient-to-r from-[#FF1D8E] to-[#FDE047] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
          <span className="text-[20vw] font-black text-white tracking-widest uppercase">ELV8</span>
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none mb-8 whitespace-pre-line">
            {t("home.lifestyle.title")}
          </h2>
          <a
            href="/products"
            className="bg-white text-[#FF1D8E] px-12 py-4 font-black text-xs tracking-[0.25em] uppercase hover:bg-slate-900 hover:text-white transition-colors duration-300 inline-block"
          >
            {t("home.lifestyle.btn")}
          </a>
        </div>
      </section>

      {/* ================= NEWSLETTER SECTION ================= */}
      <section className="w-full bg-slate-900 py-20">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <p className="text-[#FF1D8E] text-[11px] font-black tracking-[0.3em] uppercase mb-3">{t("home.newsletter.title")}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">{t("home.newsletter.subtitle")}</h2>
          <p className="text-slate-400 text-sm mb-8">{t("home.newsletter.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("home.newsletter.placeholder")}
              className="flex-1 bg-slate-800 text-white placeholder:text-slate-500 px-5 py-4 text-sm border border-slate-700 focus:border-[#FF1D8E] outline-none transition-colors"
            />
            <button className="bg-[#FF1D8E] text-white px-8 py-4 font-black text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#FF1D8E] transition-colors duration-300 shrink-0">
              {t("home.newsletter.btn")}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
