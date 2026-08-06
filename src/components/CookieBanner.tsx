"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [cookiesConfigured, setCookiesConfigured] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t, language } = useTranslation();

    useEffect(() => {
        setMounted(true);
        // Check if user has already accepted or declined cookies
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (!cookiesAccepted) {
            // Show banner after a small delay for better UX
            setTimeout(() => setShowBanner(true), 1000);
        } else {
            setCookiesConfigured(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setShowBanner(false);
        setCookiesConfigured(true);
    };

    const declineCookies = () => {
        localStorage.setItem("cookiesAccepted", "false");
        setShowBanner(false);
        setCookiesConfigured(true);
    };

    if (!mounted) return null;

    return (
        <>


            {/* Banner Modal */}
            {showBanner && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="container mx-auto max-w-6xl">
                        <div className="bg-white/80 backdrop-blur-xl border border-pink-100/80 rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-4">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
                                {/* Icon */}
                                <div className="hidden md:flex w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FF1D8E]/10 items-center justify-center flex-shrink-0">
                                    <Cookie className="w-5 h-5 md:w-6 md:h-6 text-[#FF1D8E]" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm md:text-base text-slate-700 leading-relaxed font-body">
                                        {t("ui.cookie.desc")}{" "}
                                        <a href="/privacy" className="text-[#FF1D8E] hover:underline font-bold transition-colors">
                                            {language === "el" ? "Μάθετε περισσότερα" : "Learn more"}
                                        </a>
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto relative mt-1 md:mt-0">
                                    <Button
                                        onClick={acceptCookies}
                                        className="bg-[#FF1D8E] hover:bg-[#e0187f] text-white px-5 py-3 md:py-4 rounded-xl font-body text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-[#FF1D8E]/20 transition-all hover:scale-[1.02]"
                                    >
                                        {t("ui.cookie.accept")}
                                    </Button>
                                    <Button
                                        onClick={declineCookies}
                                        variant="outline"
                                        className="border-pink-200 text-slate-700 hover:bg-pink-50/50 px-5 py-3 md:py-4 rounded-xl font-body text-xs md:text-sm font-bold uppercase tracking-wider transition-all"
                                    >
                                        {t("ui.cookie.decline")}
                                    </Button>
                                </div>

                                {/* Close Button */}
                                {cookiesConfigured && (
                                    <button
                                        onClick={() => setShowBanner(false)}
                                        className="absolute top-4 right-4 md:relative md:top-0 md:right-0 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center transition-all group"
                                        aria-label="Κλείσιμο"
                                    >
                                        <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
