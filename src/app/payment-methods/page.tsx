"use client";

import { ChevronRight, CreditCard, ShieldCheck, Lock, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

                <div className="max-w-4xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
                        {isEl ? "Τρόποι Πληρωμής & Ασφάλεια Συναλλαγών" : "Payment Methods & Security"}
                    </h1>
                    <p className="text-slate-600 mb-8 text-sm md:text-base">
                        {isEl
                            ? "Στο ηλεκτρονικό κατάστημα της ELV8 Ι.Κ.Ε., όλες οι πληρωμές διεκπεραιώνονται με τα υψηλότερα διεθνή πρότυπα τραπεζικής ασφάλειας."
                            : "At ELV8 P.C. online store, all transactions are processed using the highest international banking security standards."}
                    </p>

                    <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-sm border border-slate-100 space-y-10">
                        
                        {/* Nexi XPay Official Banner */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
                                {isEl ? "Αποδεκτά Σχήματα Καρτών Πληρωμών" : "Accepted Card Schemes"}
                            </span>
                            <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100">
                                <Image
                                    src="/Horizontal_Banner_Logos-no-AMEX_new_transparent.png"
                                    alt="Nexi XPay Card Schemes - Visa, Mastercard, Maestro, Diners, Discover"
                                    width={380}
                                    height={55}
                                    className="h-10 md:h-12 w-auto object-contain"
                                    priority
                                />
                            </div>
                            <p className="text-xs text-slate-500 max-w-lg">
                                {isEl
                                    ? "Συναλλαγές σε ασφαλές περιβάλλον της πλατφόρμας e-Commerce Nexi XPay (Alpha Bank)."
                                    : "Transactions processed securely via Nexi XPay e-Commerce platform (Alpha Bank)."}
                            </p>
                        </div>

                        {/* Payment Method 1: Credit / Debit Cards */}
                        <section className="flex flex-col sm:flex-row gap-5 items-start text-left">
                            <div className="w-12 h-12 bg-[#FF1D8E]/10 rounded-2xl flex items-center justify-center shrink-0">
                                <CreditCard className="w-6 h-6 text-[#FF1D8E]" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="font-display text-xl font-bold text-slate-900">
                                    {isEl ? "1. Πληρωμή με Πιστωτική, Χρεωστική ή Προπληρωμένη Κάρτα" : "1. Credit, Debit or Prepaid Card"}
                                </h2>
                                <p className="font-body text-slate-600 text-sm leading-relaxed">
                                    {isEl ? (
                                        "Δεχόμαστε όλες τις έγκυρες πιστωτικές, χρεωστικές και προπληρωμένες κάρτες των διεθνών σχημάτων Visa, Mastercard, Maestro, Diners Club και Discover, ανεξαρτήτως εκδότριας τράπεζας. Με την ολοκλήρωση της παραγγελίας σας, ανακατευθύνεστε αυτόματα στην κρυπτογραφημένη και πιστοποιημένη σελίδα πληρωμών της Nexi XPay (Alpha Bank) για να καταχωρίσετε τα στοιχεία της κάρτας σας."
                                    ) : (
                                        "We accept all valid credit, debit and prepaid cards under Visa, Mastercard, Maestro, Diners Club and Discover networks from any issuing bank. Upon checkout, you are redirected to the certified and encrypted payment environment of Nexi XPay (Alpha Bank)."
                                    )}
                                </p>
                            </div>
                        </section>

                        {/* Security Protocols */}
                        <section className="flex flex-col sm:flex-row gap-5 items-start text-left border-t border-slate-100 pt-8">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="font-display text-xl font-bold text-slate-900">
                                    {isEl ? "2. Πρωτόκολλο Ασφάλειας & Ταυτοποίηση 3D-Secure" : "2. Security Protocols & 3D-Secure"}
                                </h2>
                                <p className="font-body text-slate-600 text-sm leading-relaxed">
                                    {isEl ? (
                                        "Όλες οι ηλεκτρονικές συναλλαγές προστατεύονται από το αυστηρό πρωτόκολλο ισχυρής ταυτοποίησης πελάτη (Strong Customer Authentication - SCA / 3D-Secure v2, Visa Secure, Mastercard Identity Check). Κατά τη διαδικασία, ενδέχεται να σας ζητηθεί έγκριση μέσω του e-Banking app της τράπεζάς σας (push notification) ή κωδικός μίας χρήσης (OTP SMS)."
                                    ) : (
                                        "All online transactions are protected by Strong Customer Authentication (SCA / 3D-Secure v2, Visa Secure, Mastercard Identity Check). You may be prompted to authorize payment via your bank's mobile app or by SMS OTP."
                                    )}
                                </p>
                            </div>
                        </section>

                        {/* Privacy & Card Data Guarantee */}
                        <section className="flex flex-col sm:flex-row gap-5 items-start text-left border-t border-slate-100 pt-8">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="space-y-3">
                                <h2 className="font-display text-xl font-bold text-slate-900">
                                    {isEl ? "3. Μηδενική Αποθήκευση Στοιχείων Καρτών" : "3. No Card Data Retention"}
                                </h2>
                                <p className="font-body text-slate-600 text-sm leading-relaxed">
                                    {isEl ? (
                                        "Η εταιρεία ELV8 Ι.Κ.Ε. δεν διατηρεί, δεν αποθηκεύει και δεν έχει καμία απολύτως πρόσβαση στα ευαίσθητα στοιχεία της κάρτας σας (αριθμός κάρτας, CVV/CVC, ημερομηνία λήξης). Τα δεδομένα μεταφέρονται αποκλειστικά και κρυπτογραφημένα (TLS 1.3 / SSL 256-bit) απευθείας προς το τραπεζικό ίδρυμα σύμφωνα με τα διεθνή πρότυπα ασφαλείας PCI-DSS."
                                    ) : (
                                        "ELV8 P.C. never stores, retains, or accesses sensitive card numbers, CVVs, or expiration dates. All payment data is encrypted and transferred via TLS 1.3 / 256-bit SSL directly to the bank under strict PCI-DSS compliance."
                                    )}
                                </p>
                            </div>
                        </section>

                        {/* Merchant Statutory Details */}
                        <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-left space-y-3">
                            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                                <Building2 className="w-4 h-4 text-[#FF1D8E]" />
                                <span>{isEl ? "Στοιχεία Εμπόρου / Εκδότη Παραγγελιών" : "Merchant Statutory Information"}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                <p><strong>Επωνυμία:</strong> ELV8 Ι.Κ.Ε. (ELV8 P.C.)</p>
                                <p><strong>ΑΦΜ:</strong> 803354749 (ΔΟΥ Δ' Αθηνών)</p>
                                <p><strong>Αρ. Γ.Ε.ΜΗ.:</strong> 195202901000 (EUID: ELGEMI.195202901000)</p>
                                <p><strong>Έδρα:</strong> Καστριώτη Γεωργίου 2-4, Τ.Κ. 11476, Αθήνα</p>
                                <p><strong>Τηλέφωνο:</strong> +30 6980273388</p>
                                <p><strong>Email:</strong> info@elv8now.com</p>
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
