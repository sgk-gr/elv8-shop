"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin, CreditCard, Shield, Truck, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/context/LanguageContext";

export default function Footer() {
    const { t, language, setLanguage } = useTranslation();
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEl = language === "el";

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error(isEl ? "Παρακαλώ εισάγετε ένα έγκυρο email" : "Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Post to local API route
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, source: "Footer Newsletter" }),
            });
            const data = await res.json();

            // 2. Direct POST to WordPress REST API for 100% instant sync
            try {
                fetch("https://store.elv8now.com/wp-json/elv8/v1/newsletter-subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, source: "Footer Newsletter" }),
                }).catch(() => {});
            } catch (_) {}

            if (data.success) {
                toast.success(data.message || (isEl ? "Ευχαριστούμε! Εγγραφήκατε επιτυχώς στο ενημερωτικό μας δελτίο! 🎉" : "Thank you! You have successfully subscribed to our newsletter! 🎉"));
                setEmail("");
            } else {
                toast.error(data.message || (isEl ? "Σφάλμα εγγραφής" : "Subscription error"));
            }
        } catch (err) {
            toast.error(isEl ? "Σφάλμα επικοινωνίας" : "Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-black text-white">




            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
                    {/* Company Info */}
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <Image
                                src="/logo2.png"
                                alt="ELV8 Logo"
                                width={60}
                                height={60}
                                className="w-14 h-14 object-contain drop-shadow-md"
                            />
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed max-w-sm">
                            {t("footer.desc")}
                        </p>
                        <div className="flex gap-3 justify-center md:justify-start">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF1D8E] flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">{t("footer.quick_links")}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Γεύσεις" : "Flavors"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?on_sale=true" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Ειδικές Προσφορές" : "Special Offers"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Ο Λογαριασμός μου" : "My Account"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/checkout" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Καλάθι" : "Cart"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/b2b-wholesale" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Χονδρική B2B" : "B2B Wholesale"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">{isEl ? "Υποστήριξη" : "Support"}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Όροι Χρήσης" : "Terms of Use"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Πολιτική Απορρήτου" : "Privacy Policy"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Πολιτική Επιστροφών" : "Return Policy"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns/withdraw" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Δήλωση Υπαναχώρησης (14 Ημέρες)" : "Right of Withdrawal Form"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-methods" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Τρόποι Πληρωμής" : "Payment Methods"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Συχνές Ερωτήσεις (FAQ)" : "FAQ"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/gemi" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    {isEl ? "Στοιχεία Γ.Ε.ΜΗ." : "GEMI Disclosures"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info & Business Details */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">{t("footer.contact")}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 justify-center md:justify-start">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FF1D8E]" />
                                <div className="text-sm text-white/60 text-left">
                                    <p className="font-semibold text-white/90">ELV8 Ι.Κ.Ε.</p>
                                    <p>Καστριώτη Γεωργίου 2-4</p>
                                    <p>Τ.Κ. 11476, Αθήνα, Ελλάδα</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Phone className="w-5 h-5 flex-shrink-0 text-[#FF1D8E]" />
                                <a href="tel:+306980273388" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    +30 6980 273 388
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <Mail className="w-5 h-5 flex-shrink-0 text-[#FF1D8E]" />
                                <a href="mailto:info@elv8now.com" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    info@elv8now.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Statutory Business Identity Bar (Compliant with Greek Law & Nexi Requirements) */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="bg-white/5 rounded-2xl p-6 text-xs text-white/70 leading-relaxed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center md:text-left">
                        <div>
                            <span className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                {isEl ? "Επωνυμία & Μορφή" : "Company & Legal Form"}
                            </span>
                            <p>ELV8 Ι.Κ.Ε. (ELV8 P.C.)</p>
                            <p className="text-white/50">{isEl ? "Διακριτικός Τίτλος: ELV8" : "Trade Name: ELV8"}</p>
                        </div>
                        <div>
                            <span className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                {isEl ? "Φορολογικά Στοιχεία" : "Tax Information"}
                            </span>
                            <p>ΑΦΜ: <strong className="text-white">803354749</strong></p>
                            <p className="text-white/50">ΔΟΥ: Δ' Αθηνών</p>
                        </div>
                        <div>
                            <span className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                {isEl ? "Μητρώο Γ.Ε.ΜΗ." : "G.E.M.I. Register"}
                            </span>
                            <p>Αρ. Γ.Ε.ΜΗ.: <strong className="text-white">195202901000</strong></p>
                            <p className="text-white/50">EUID: ELGEMI.195202901000</p>
                        </div>
                        <div>
                            <span className="block font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                {isEl ? "Έδρα & Επικοινωνία" : "Headquarters"}
                            </span>
                            <p>Καστριώτη Γεωργίου 2-4, 11476 Αθήνα</p>
                            <p className="text-white/50">Τηλ: +30 6980273388</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 md:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-sm text-white/40 text-center md:text-left space-y-1">
                            <p>© {currentYear} ELV8 Energy. {t("footer.rights")}</p>
                            <div className="flex justify-center md:justify-start gap-2 mt-2 pt-2 border-t border-white/10">
                                <button onClick={() => setLanguage('el')} className={language === 'el' ? 'text-white' : 'hover:text-white'}>EL</button>
                                <span>|</span>
                                <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-white' : 'hover:text-white'}>EN</button>
                            </div>
                        </div>
                        
                        {/* Official Nexi XPay Card Schemes Banner (No Amex) */}
                        <div className="flex flex-col items-center md:items-center gap-1.5">
                            <div className="bg-white/10 hover:bg-white/15 transition-colors px-3 py-1.5 rounded-xl backdrop-blur-sm">
                                <Image
                                    src="/Horizontal_Banner_Logos-no-AMEX_new_transparent.png"
                                    alt="Ασφαλείς Πληρωμές μέσω Nexi XPay - Visa, Mastercard, Maestro, Diners, Discover"
                                    width={320}
                                    height={50}
                                    className="h-7 sm:h-8 w-auto object-contain"
                                />
                            </div>
                            <span className="text-[10px] sm:text-[11px] text-white/50 tracking-wider">
                                {isEl ? "Ασφαλείς συναλλαγές μέσω Nexi XPay (Alpha Bank)" : "Secure checkout powered by Nexi XPay"}
                            </span>
                        </div>

                        <div className="text-center md:text-right">
                            <a
                                href="https://sgk.gr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-lg font-bold text-white hover:scale-105 transition-transform duration-300"
                            >
                                <span className="text-white/70 font-medium text-base">
                                    {isEl ? "Σχεδίαση & Ανάπτυξη:" : "Developed by:"}
                                </span>
                                <span className="text-white font-black tracking-wider text-xl uppercase font-display">sgk.gr</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
