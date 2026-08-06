"use client";

import { ChevronRight, CreditCard, Landmark, Info, Zap, Truck } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function PaymentMethodsPage() {
    const { t, language } = useTranslation();
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

                            <section className="flex gap-5 items-start text-left">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-blue-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-display text-xl font-bold text-slate-800">
                                        {isEl ? "IRIS Payments" : "IRIS Payments"}
                                    </h2>
                                    <p className="font-body text-slate-600 text-sm leading-relaxed">
                                        {isEl ? (
                                            "Άμεση πληρωμή μέσω του e-banking σας χρησιμοποιώντας μόνο τον ΑΦΜ ή τον αριθμό κινητού τηλεφώνου."
                                        ) : (
                                            "Direct payment from your e-banking using only your VAT number or mobile phone number."
                                        )}
                                    </p>
                                </div>
                            </section>

                            <section className="flex gap-5 items-start text-left">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Truck className="w-6 h-6 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-display text-xl font-bold text-slate-800">
                                        {isEl ? "Αντικαταβολή" : "Cash on Delivery"}
                                    </h2>
                                    <p className="font-body text-slate-600 text-sm leading-relaxed">
                                        {isEl ? (
                                            "Πληρώστε το αντίτιμο της παραγγελίας σας κατά την παράδοση στον κούριερ. Επιπλέον χρέωση αντικαταβολής: 2€."
                                        ) : (
                                            "Pay for your order upon delivery to the courier agent. Cash on delivery fee: €2."
                                        )}
                                    </p>
                                </div>
                            </section>

                            <section className="flex gap-5 items-start text-left">
                                <div className="w-12 h-12 bg-slate-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <Landmark className="w-6 h-6 text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="font-display text-xl font-bold text-slate-800">
                                        {isEl ? "Τραπεζική Κατάθεση" : "Bank Transfer"}
                                    </h2>
                                    <p className="font-body text-slate-600 text-sm leading-relaxed">
                                        {isEl ? (
                                            "Μπορείτε να καταθέσετε το ποσό της παραγγελίας σας στον τραπεζικό λογαριασμό ELV8 Energy."
                                        ) : (
                                            "You can deposit the order amount directly to the ELV8 Energy bank account."
                                        )}
                                    </p>
                                </div>
                            </section>
                        </div>

                        <section className="space-y-6 pt-4 border-t border-slate-100 text-left">
                            <div className="flex gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <Info className="w-6 h-6 text-blue-500 shrink-0" />
                                <div className="space-y-4">
                                    <p className="font-body text-sm text-slate-700 leading-relaxed italic">
                                        {isEl ? (
                                            "Κατά την κατάθεση, αναγράφετε ως αιτιολογία το ονοματεπώνυμό σας και τον αριθμό παραγγελίας σας για ταχύτερη εξυπηρέτηση."
                                        ) : (
                                            "During deposit, please include your full name and order number as the transaction reference for faster processing."
                                        )}
                                    </p>
                                    <p className="font-body text-sm font-bold text-[#FF1D8E]">
                                        {isEl ? (
                                            "Η επεξεργασία της παραγγελίας ξεκινά μετά την επιβεβαίωση της πληρωμής. Μη επιβεβαιωμένες πληρωμές εντός 2-3 ημερών οδηγούν σε ακύρωση."
                                        ) : (
                                            "Order processing starts after payment confirmation. Unconfirmed payments within 2-3 days will be cancelled."
                                        )}
                                    </p>
                                </div>
                            </div>
                        </section>
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
