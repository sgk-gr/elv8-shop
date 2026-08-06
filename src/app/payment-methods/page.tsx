"use client";

import { ChevronRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function PaymentMethodsPage() {
    const { language } = useTranslation();
    const isEl = language === "el";

    return (
        <main className="min-h-screen py-16 md:py-24 bg-slate-50/50">
            <div className="container mx-auto px-4 md:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
                    <Link href="/" className="hover:text-[#FF1D8E] transition-colors">
                        {isEl ? "Αρχική" : "Home"}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#FF1D8E] font-medium">
                        {isEl ? "Τρόποι Πληρωμής" : "Payment Methods"}
                    </span>
                </nav>

                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-8 text-slate-900">
                        {isEl ? "Πληρωμές" : "Payments"}
                    </h1>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">
                        {/* Payment Methods Grid */}
                        <div className="grid gap-8">
                            <section className="flex gap-5 items-start text-left">
                                <div className="w-12 h-12 bg-[#FF1D8E]/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <CreditCard className="w-6 h-6 text-[#FF1D8E]" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-display text-xl font-bold text-slate-800">
                                        {isEl ? "Πιστωτική / Χρεωστική Κάρτα" : "Credit / Debit Card"}
                                    </h2>
                                    <p className="font-body text-slate-600 text-sm leading-relaxed">
                                        {isEl ? (
                                            "Δεχόμαστε όλες τις κύριες κάρτες (Visa, Mastercard, Maestro). Η πληρωμή γίνεται μέσω του ασφαλούς περιβάλλοντος της τράπεζας με κρυπτογράφηση SSL."
                                        ) : (
                                            "We accept all major cards (Visa, Mastercard, Maestro). Payments are processed through the bank's secure SSL environment."
                                        )}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#FF1D8E] hover:underline"
                        >
                            {isEl ? "Επιστροφή στις Αγορές" : "Return to Shopping"}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
