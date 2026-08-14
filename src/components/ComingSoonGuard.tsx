"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Zap, CheckCircle2, ShieldCheck, Lock, Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function ComingSoonGuard({ children }: { children: React.ReactNode }) {
  const [isBypassed, setIsBypassed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [showSecretModal, setShowSecretModal] = useState(false);

  // Maintenance mode active flag
  const isMaintenanceActive = process.env.NEXT_PUBLIC_COMING_SOON === "true" || true;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const previewParam = urlParams.get("preview");
      const storedPasskey = localStorage.getItem("elv8_preview_unlocked");

      // Secret preview keys: "sgk", "elv8_secret", "admin"
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

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Παρακαλώ εισάγετε ένα έγκυρο email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Coming Soon Page" }),
      });
      setIsSubscribed(true);
      toast.success("Ευχαριστούμε! Θα ενημερωθείτε πρώτοι για το launch! 🚀");
    } catch (err) {
      toast.error("Σφάλμα εγγραφής.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isChecking) {
    return <div className="min-h-screen bg-black" />;
  }

  // If maintenance is off or bypassed with secret key, render normal site
  if (!isMaintenanceActive || isBypassed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-body selection:bg-[#FF1D8E] selection:text-white">
      {/* Dynamic Energy Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF1D8E]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#FF1D8E] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            ELV8 ENERGY GREECE
          </span>
        </div>

        <button
          onClick={() => setShowSecretModal(true)}
          className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 opacity-60 hover:opacity-100"
          title="Πρόσβαση Διαχειριστή"
        >
          <Lock className="w-3.5 h-3.5" />
          Admin Access
        </button>
      </header>

      {/* Hero Coming Soon Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center text-center max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF1D8E] text-xs font-black uppercase tracking-[0.25em] mb-8 shadow-2xl backdrop-blur-md">
          <Zap className="w-4 h-4 text-[#FF1D8E] fill-[#FF1D8E]" />
          COMING SOON / ΣΥΝΤΟΜΑ ΚΟΝΤΑ ΣΑΣ
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-none text-white mb-6">
          Η ΝΕΑ ΕΠΟΧΗ ΣΤΗΝ <span className="text-[#FF1D8E] underline decoration-[#FF1D8E]/40 underline-offset-8">ΕΝΕΡΓΕΙΑ</span> ΦΤΑΝΕΙ.
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Το επίσημο ηλεκτρονικό κατάστημα της <strong className="text-white">ELV8 Energy Drink</strong> ετοιμάζεται. 
          0% Ζάχαρη, 200mg Φυσική Καφεΐνη, Ηλεκτρολύτες & Βιταμίνες για μέγιστη απόδοση.
        </p>

        {/* Features Chips */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {["0% Ζάχαρη (Zero Sugar)", "200mg Φυσική Καφεΐνη", "Ηλεκτρολύτες & Βιταμίνες B", "100% Greek Brand"].map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs font-semibold text-slate-200 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-[#FF1D8E]" />
              {feat}
            </div>
          ))}
        </div>

        {/* Notify Me Form Box */}
        <div className="w-full max-w-md bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          {!isSubscribed ? (
            <>
              <h3 className="text-base font-bold text-white flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-[#FF1D8E]" />
                Μάθετε πρώτοι για το Launch & Κερδίστε 15% Έκπτωση!
              </h3>
              <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Το email σας..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF1D8E]"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FF1D8E] hover:bg-[#ff3b9d] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg hover:scale-105 disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? "..." : "Ενημέρωση"}
                </button>
              </form>
              <p className="text-[11px] text-slate-400">
                Δεν στέλνουμε spam. Μπορείτε να διαγραφείτε ανά πάσα στιγμή.
              </p>
            </>
          ) : (
            <div className="py-4 space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-lg">Ευχαριστούμε!</h4>
              <p className="text-xs text-slate-300">
                Η εγγραφή σας καταχωρήθηκε επιτυχώς. Θα λάβετε ειδοποίηση αμέσως μόλις ανοίξουμε!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 container mx-auto px-6 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          © {new Date().getFullYear()} <strong className="text-white">ELV8 Ι.Κ.Ε.</strong> | ΑΦΜ: 803354749 | Γ.Ε.ΜΗ: 195202901000
        </div>
        <div className="flex items-center gap-6">
          <Link href="/gemi" className="hover:text-white transition-colors">
            Δημοσιότητα Γ.Ε.ΜΗ.
          </Link>
          <a href="mailto:info@elv8now.com" className="hover:text-white transition-colors">
            info@elv8now.com
          </a>
        </div>
      </footer>

      {/* Secret Admin Passkey Modal */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 max-w-sm w-full space-y-4 text-center">
            <Lock className="w-8 h-8 text-[#FF1D8E] mx-auto" />
            <h3 className="text-lg font-bold text-white">Πρόσβαση Προεπισκόπησης (Admin)</h3>
            <p className="text-xs text-slate-400">
              Εισάγετε τον κωδικό πρόσβασης για να εμφανιστεί το πλήρες e-shop.
            </p>
            <form onSubmit={handleSecretUnlock} className="space-y-3">
              <input
                type="password"
                placeholder="Κωδικός..."
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF1D8E]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSecretModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-[#FF1D8E] text-white text-xs font-bold uppercase tracking-wider"
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
