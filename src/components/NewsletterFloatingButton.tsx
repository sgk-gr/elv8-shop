"use client";

import { useState } from "react";
import { X, Mail } from "lucide-react";

export default function NewsletterFloatingButton() {
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    if (!isVisible && !isModalOpen) return null;

    return (
        <>
            {/* Floating Button */}
            {isVisible && (
                <div className="fixed bottom-6 left-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="relative group">
                        {/* Close button for the floating button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVisible(false);
                            }}
                            className="absolute -top-2 -right-2 bg-white text-slate-400 hover:text-slate-800 rounded-full p-1 shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-all z-10"
                            aria-label="Κλείσιμο"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white hover:bg-slate-50 text-slate-800 font-display font-bold text-xs md:text-sm px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 transition-transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4 text-[#c4196d]" />
                            Κέρδισε έκπτωση 15%!
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-white rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors z-10"
                            aria-label="Κλείσιμο παραθύρου"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative text-center space-y-6">
                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Mail className="w-8 h-8 text-[#c4196d]" />
                            </div>

                            {!isSubscribed ? (
                                <>
                                    <div className="space-y-2">
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                                            Μην χάσετε τις προσφορές μας!
                                        </h3>
                                        <p className="text-slate-500 text-sm md:text-base font-body">
                                            Εγγραφείτε στο Newsletter μας και κερδίστε
                                            <span className="text-[#c4196d] font-bold mx-1">15% έκπτωση</span>
                                            στην επόμενη παραγγελία σας.
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            if (email) {
                                                try {
                                                    await fetch("/api/newsletter", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ email, source: "Floating Popup (15% Off)" }),
                                                    });
                                                } catch (_) {}
                                                setIsSubscribed(true);
                                            }
                                        }}
                                        className="flex flex-col gap-3 mt-4"
                                    >
                                        <input
                                            type="email"
                                            required
                                            placeholder="Το email σας..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#c4196d] focus:ring-1 focus:ring-[#c4196d] transition-all font-body text-sm text-slate-900 placeholder:text-slate-400"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full bg-[#c4196d] text-white font-bold tracking-wide uppercase font-body text-sm py-4 rounded-xl shadow-lg shadow-[#c4196d]/20 hover:bg-[#a3155a] transition-colors"
                                        >
                                            Λήψη Κουπονιού
                                        </button>
                                    </form>
                                    <p className="text-xs text-slate-400 pt-2">
                                        Δεν στέλνουμε spam. Μπορείτε να διαγραφείτε ανά πάσα στιγμή.
                                    </p>
                                </>
                            ) : (
                                <div className="space-y-4 py-6">
                                    <h3 className="font-display text-2xl font-bold text-green-600">Επιτυχής εγγραφή!</h3>
                                    <p className="text-slate-600 font-body">
                                        Ελέγξτε τα email σας στο <b className="text-slate-900">{email}</b> για να βρείτε το εκπτωτικό κουπόνι σας.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsVisible(false);
                                        }}
                                        className="mt-6 w-full py-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors text-slate-900"
                                    >
                                        Επιστροφή στις Αγορές
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
