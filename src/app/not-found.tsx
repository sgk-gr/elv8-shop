"use client";

import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function NotFound() {
    const { language } = useTranslation();
    const isEl = language === "el";

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-muted">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="mb-4 text-xl text-muted-foreground">
                    {isEl ? "Ωχ! Η σελίδα δεν βρέθηκε" : "Oops! Page not found"}
                </p>
                <Link href="/" className="text-primary underline hover:text-primary/90 font-bold">
                    {isEl ? "Επιστροφή στην Αρχική" : "Return to Home"}
                </Link>
            </div>
        </div>
    );
}
