"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#c4196d] hover:text-white hover:border-[#c4196d] hover:shadow-lg hover:shadow-[#c4196d]/20 group animate-in fade-in slide-in-from-bottom-5"
        >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
    );
}
