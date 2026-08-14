"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ComingSoonGuard({ children }: { children: React.ReactNode }) {
  const [isBypassed, setIsBypassed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Maintenance mode active flag
  const isMaintenanceActive = process.env.NEXT_PUBLIC_COMING_SOON === "true" || true;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const previewParam = urlParams.get("preview");
      const storedPasskey = localStorage.getItem("elv8_preview_unlocked");

      // Secret preview keys: "sgk", "elv8"
      if (previewParam === "sgk" || previewParam === "elv8" || storedPasskey === "true") {
        setIsBypassed(true);
        localStorage.setItem("elv8_preview_unlocked", "true");
      }
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div className="min-h-screen bg-white" />;
  }

  // If maintenance is off or bypassed with secret key, render normal site
  if (!isMaintenanceActive || isBypassed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden font-body selection:bg-[#FF1D8E] selection:text-white">
      {/* Light subtle accent background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF1D8E]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-center">
        <Link href="/" className="relative flex items-center">
          <Image
            src="/elv8_logo.svg"
            alt="ELV8 Energy Logo"
            width={140}
            height={46}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center text-center max-w-3xl my-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-none text-slate-900 mb-6">
          Η ΝΕΑ ΕΠΟΧΗ ΣΤΗΝ <span className="text-[#FF1D8E] underline decoration-[#FF1D8E]/30 underline-offset-8">ΕΝΕΡΓΕΙΑ</span> ΦΤΑΝΕΙ.
        </h1>

        <p className="text-slate-600 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium">
          Το επίσημο ηλεκτρονικό κατάστημα της <strong className="text-slate-900 font-bold">ELV8 Energy Drink</strong> ετοιμάζεται. 
          0% Ζάχαρη, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες για μέγιστη απόδοση.
        </p>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 container mx-auto px-6 py-8 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500">
        <div>
          Created by{" "}
          <a
            href="https://sgk.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-slate-800 hover:text-[#FF1D8E] transition-colors"
          >
            sgk.gr
          </a>
        </div>
      </footer>
    </div>
  );
}
