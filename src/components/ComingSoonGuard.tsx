"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function ComingSoonGuard({ children }: { children: React.ReactNode }) {
  const [isBypassed, setIsBypassed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [showSecretModal, setShowSecretModal] = useState(false);

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

  const handleSecretUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput.trim().toLowerCase() === "sgk" || passkeyInput.trim() === "elv82026") {
      localStorage.setItem("elv8_preview_unlocked", "true");
      setIsBypassed(true);
      setShowSecretModal(false);
      toast.success("Πρόσβαση εγκρίθηκε! Προβολή πλήρους e-shop. 🔓");
    } else {
      toast.error("Λανθασμένος κωδικός πρόσβασης.");
    }
  };

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
      <header className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="relative flex items-center">
          <Image
            src="https://store.elv8now.com/wp-content/uploads/2026/01/logo.png"
            alt="ELV8 Energy Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <button
          onClick={() => setShowSecretModal(true)}
          className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
          title="Πρόσβαση Διαχειριστή"
        >
          <Lock className="w-3.5 h-3.5" />
          Admin Access
        </button>
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

      {/* Secret Admin Passkey Modal */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-sm w-full space-y-4 text-center shadow-2xl">
            <Lock className="w-8 h-8 text-[#FF1D8E] mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Πρόσβαση Προεπισκόπησης (Admin)</h3>
            <p className="text-xs text-slate-500">
              Εισάγετε τον κωδικό πρόσβασης για να εμφανιστεί το πλήρες e-shop.
            </p>
            <form onSubmit={handleSecretUnlock} className="space-y-3">
              <input
                type="password"
                placeholder="Κωδικός..."
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF1D8E]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSecretModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-[#FF1D8E] hover:bg-[#ff3b9d] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Είσοδος
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
