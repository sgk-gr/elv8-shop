"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * ScrollRestoration
 *
 * Saves the window scroll position to sessionStorage whenever the user
 * navigates away, and restores it when they return to the same URL.
 *
 * Key format:  scroll_<pathname><search>
 * e.g.         scroll_/products?category=27
 */
function ScrollRestorationInner() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const key = `scroll_${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
    const savedKey = useRef(key);
    const isRestored = useRef(false);

    // When the key (URL) changes → restore scroll for the new page
    useEffect(() => {
        // We changed pages — reset the restoration flag
        isRestored.current = false;
        savedKey.current = key;

        const saved = sessionStorage.getItem(key);

        if (saved !== null) {
            const y = parseInt(saved, 10);
            // Small delay so the page has time to render content
            const timeout = setTimeout(() => {
                window.scrollTo({ top: y, behavior: "instant" });
                isRestored.current = true;
            }, 80);
            return () => clearTimeout(timeout);
        } else {
            // New page — scroll to top
            window.scrollTo({ top: 0, behavior: "instant" });
            isRestored.current = true;
        }
    }, [key]);

    // Save scroll position continuously while on the current page
    useEffect(() => {
        const handleScroll = () => {
            sessionStorage.setItem(savedKey.current, String(Math.round(window.scrollY)));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
}

// Wrap in Suspense because useSearchParams() requires it in Next.js App Router
import { Suspense } from "react";

export default function ScrollRestoration() {
    return (
        <Suspense fallback={null}>
            <ScrollRestorationInner />
        </Suspense>
    );
}
