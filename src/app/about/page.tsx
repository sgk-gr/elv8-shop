import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck, Sparkles, Heart, ArrowRight, Laptop, Dumbbell, Sun, Brain, Smile, CheckCircle2 } from "lucide-react";
import WholesaleForm from "@/components/WholesaleForm";

export const metadata: Metadata = {
  title: "About ELV8 | Energy For Everyone",
  description:
    "Discover ELV8. Clean, natural energy drink crafted for office work, studying, workouts, and everyday life.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-body overflow-x-hidden">

      {/* ================= 1. HERO SECTION (BRIGHT WHITE DESIGN) ================= */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden">
        {/* Soft Organic Background Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -left-[10vw] top-[10%] w-[50vw] h-[50vw] bg-[#FF1D8E]/15 rounded-full blur-3xl" />
          <div className="absolute -right-[10vw] top-[30%] w-[50vw] h-[50vw] bg-[#FDE047]/30 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Copy */}
            <div className="w-full lg:w-6/12 text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.05] text-slate-900">
                Energy Built For <span className="text-[#FF1D8E]">Everyone.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                ELV8 was created for ambitious people who refuse to slow down. Whether you are an athlete pushing limits, a professional chasing deadlines, a student grinding through exams, or a gamer locked in for hours, ELV8 delivers clean, sustained energy with <strong>zero crash</strong>. No spikes. No jitters. Just steady, elevated performance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#use-cases"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-full transition-all duration-300 border border-slate-200"
                >
                  Who It's For
                </a>
              </div>
            </div>

            {/* Right: Large Can with Organic Blobs & Lightning Bolts (Riot-Style) */}
            <div className="w-full lg:w-6/12 flex justify-center items-center overflow-visible">
              <div className="relative w-full max-w-[500px] h-[380px] sm:h-[420px] md:h-[440px]">
                
                {/* Background Organic Blob 1 - Large Yellow */}
                <div className="absolute top-[5%] right-[0%] w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] bg-[#FDE047] rounded-full opacity-80 z-0" />
                
                {/* Background Organic Blob 2 - Medium Pink */}
                <div className="absolute bottom-[0%] left-[0%] w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] bg-[#FF1D8E]/70 rounded-full opacity-60 z-0" />
                
                {/* Background Organic Blob 3 - Small Yellow accent */}
                <div className="absolute top-[45%] left-[8%] w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] bg-[#FDE047]/60 rounded-full z-0" />

                {/* Lightning Bolt SVG - Top Left */}
                <svg className="absolute top-[2%] left-[5%] w-9 h-9 sm:w-11 sm:h-11 text-black z-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>

                {/* Lightning Bolt SVG - Top Right */}
                <svg className="absolute top-[8%] right-[2%] w-8 h-8 sm:w-10 sm:h-10 text-black z-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>

                {/* Lightning Bolt SVG - Bottom Left */}
                <svg className="absolute bottom-[10%] left-[2%] w-7 h-7 sm:w-9 sm:h-9 text-black z-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>

                {/* Lightning Bolt SVG - Bottom Right */}
                <svg className="absolute bottom-[15%] right-[5%] w-8 h-8 sm:w-9 sm:h-9 text-black z-20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
                </svg>

                {/* Main ELV8 Can - HUGE, overflows the container */}
                <div className="absolute inset-x-0 -top-[30%] -bottom-[20%] z-10 flex items-center justify-center pointer-events-none">
                  <div className="relative w-[260px] sm:w-[300px] md:w-[320px] h-[520px] sm:h-[580px] md:h-[620px]">
                    <Image
                      src="/elv8-can-clean.png"
                      alt="ELV8 Strawberry Lemon Energy Drink"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. HIGHLIGHTS BAR ================= */}
      <section className="py-10 bg-[#FDE047] text-black border-y border-black/10">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-display">100%</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider">Natural Caffeine</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-display">0g</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider">Added Sugar</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-display">4x</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider">Essential B Vitamins</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black font-display">⚡</p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider">Slow Release Energy</p>
          </div>
        </div>
      </section>

      {/* ================= 3. ENERGY FOR EVERY MOMENT (USE CASES) ================= */}
      <section id="use-cases" className="py-20 sm:py-28 bg-slate-50 relative">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Built For Every Kind of Achiever
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              From the gym to the studio, from the office to the classroom, ELV8's slow-release formula keeps you focused and energized without the crash.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Work & Study */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#FF1D8E] transition-all duration-300 overflow-hidden">
              <div className="relative w-full h-40">
                <Image src="/about-office.jpg" alt="Office & Studying" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900">Professionals & Students</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Stay razor-sharp during long work sessions, coding marathons, or exam prep. Sustained focus, zero afternoon slump.
                </p>
              </div>
            </div>

            {/* Card 2: Fitness & Gym */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#FF1D8E] transition-all duration-300 overflow-hidden">
              <div className="relative w-full h-40">
                <Image src="/about-gym.jpg" alt="Gym & Sports" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900">Athletes & Gym</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fuel your training with natural caffeine, Taurine, and electrolytes. Maintain peak intensity from warm-up to the final rep.
                </p>
              </div>
            </div>

            {/* Card 3: Outdoor & Travel */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#FF1D8E] transition-all duration-300 overflow-hidden">
              <div className="relative w-full h-40">
                <Image src="/about-outdoors.jpg" alt="Outdoors & Trips" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900">Gamers & Creators</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Long sessions demand sharp reactions and deep focus. ELV8's nootropics and slow-release formula keep you locked in, without the jitters.
                </p>
              </div>
            </div>

            {/* Card 4: Daily Life */}
            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#FF1D8E] transition-all duration-300 overflow-hidden">
              <div className="relative w-full h-40">
                <Image src="/about-daily.jpg" alt="Everyday Hustle" fill className="object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold font-display text-slate-900">The Everyday Hustler</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  For people with big ambitions and busy lives. Slow-release energy means you stay productive and driven from morning to night.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 4. FORMULA & INGREDIENTS ================= */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Image Showcase */}
            <div className="w-full lg:w-5/12 flex justify-center">
              <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[36px] border-4 border-black bg-[#FFA5C4] flex items-center justify-center shadow-xl overflow-hidden">
                
                {/* Can - Large, fills the card */}
                <div className="relative w-full h-[110%] z-10">
                  <Image
                    src="/elv8-can-clean.png"
                    alt="ELV8 Clean Energy Can"
                    fill
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                  />
                </div>

                {/* Fruits at bottom - many, overlapping the can */}
                <div className="absolute -bottom-8 -left-8 w-[50%] h-[45%] z-20 pointer-events-none">
                  <Image src="/elv8-lemon-fruit.png" alt="Lemons" fill className="object-contain object-bottom" />
                </div>
                <div className="absolute -bottom-6 left-[22%] w-[38%] h-[38%] z-20 pointer-events-none">
                  <Image src="/elv8-strawberry-fruit.png" alt="Strawberry" fill className="object-contain object-bottom" />
                </div>
                <div className="absolute -bottom-7 left-[38%] w-[38%] h-[40%] z-20 pointer-events-none">
                  <Image src="/elv8-lemon-fruit.png" alt="Lemon" fill className="object-contain object-bottom scale-x-[-1]" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-[50%] h-[45%] z-20 pointer-events-none">
                  <Image src="/elv8-strawberry-fruit.png" alt="Strawberries" fill className="object-contain object-bottom" />
                </div>

              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-7/12 space-y-6 text-left">
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
                What Goes Into Every Can
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We believe in radical transparency and high-quality ingredients. Our formula delivers clean, slow-release energy with no jitters, no crash, no compromises. Just the best version of you, sustained.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#FF1D8E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Natural Coffee & Guarana Extract</h4>
                    <p className="text-slate-600 text-sm">Provides sustained alertness without nervous jitters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#FF1D8E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Essential B-Vitamins (B2, B6, B12)</h4>
                    <p className="text-slate-600 text-sm">Helps body convert fat into natural energy & reduces tiredness.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#FF1D8E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Nootropics / Focus</h4>
                    <p className="text-slate-600 text-sm">Fuel a slow, steady release of energy with zero crash. Taurine supports muscular endurance and mental sharpness, while Niacin keeps your energy stable and your concentration locked in, perfect for ambitious people with busy schedules.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= 5. FOUNDERS & BRAND PHILOSOPHY ================= */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white relative">
        <div className="container max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="text-[#FDE047] text-xs font-black tracking-[0.25em] uppercase">Our Philosophy</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
            Created in Greece for the Modern Lifestyle
          </h2>
          <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
            "ELV8 was founded with a clear mission: create a drink for the modern high-achiever. Whether you're building a business, studying for exams, training hard, or grinding through a late-night session, you deserve energy that's clean, sustained, and built around your ambitions. No crash. No compromise. Just ELV8."
          </p>
          <div className="pt-4">
            <span className="text-white font-bold text-base block font-display">The ELV8 Team</span>
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Athens, Greece</span>
          </div>
        </div>
      </section>

      {/* ================= 5.5. MEET THE CREATORS ================= */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              Meet the Creators
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              The visionaries behind ELV8 who wanted to build a clean energy brand for the modern hustler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start justify-center max-w-5xl mx-auto">
            {/* Creator 1 */}
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-[#FF1D8E] transition-colors duration-500 shadow-xl bg-slate-100 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300" fill="currentColor">
                  <circle cx="50" cy="38" r="22" />
                  <ellipse cx="50" cy="90" rx="35" ry="28" />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black font-display text-slate-900">Co-Founder</h3>
                <p className="text-[#FF1D8E] font-bold text-sm uppercase tracking-widest">Visionary & Strategy</p>
                <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                  Passionate about clean energy and building brands that connect with the modern generation.
                </p>
              </div>
            </div>

            {/* Creator 2 */}
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-[#FDE047] transition-colors duration-500 shadow-xl bg-slate-100 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300" fill="currentColor">
                  <circle cx="50" cy="38" r="22" />
                  <ellipse cx="50" cy="90" rx="35" ry="28" />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black font-display text-slate-900">Co-Founder</h3>
                <p className="text-slate-900 font-bold text-sm uppercase tracking-widest">Operations & Growth</p>
                <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                  Focused on bringing ELV8 to athletes, professionals and creators who demand more from their energy drink.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. WHOLESALE & B2B INQUIRIES SECTION ================= */}
      <section id="wholesale" className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900">
              Interested in Wholesale?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Are you a gym, supermarket, kiosk, or distributor? Fill out the form below and our team will get in touch with you.
            </p>
          </div>

          <WholesaleForm />
        </div>
      </section>

      {/* ================= 6. CALL TO ACTION ================= */}
      <section className="py-20 bg-gradient-to-r from-[#FF1D8E] to-[#FDE047] text-white text-center relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight drop-shadow-md text-slate-900">
            Ready to ELV8 Your Day?
          </h2>
          <p className="text-lg sm:text-xl font-bold max-w-2xl mx-auto text-slate-900/90">
            Join the athletes, professionals, creators and hustlers who have already elevated their performance with ELV8.
          </p>
          <div>
            <Link
              href="/products"
              className="bg-black text-white hover:bg-white hover:text-black font-black text-xs sm:text-sm tracking-[0.25em] uppercase px-12 py-5 rounded-full shadow-2xl transition-all duration-300 inline-block"
            >
              Shop All Flavors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
