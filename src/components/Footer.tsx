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
                                src="/elv8_logo.svg"
                                alt="ELV8 Logo"
                                width={120}
                                height={55}
                                className="object-contain"
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

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">{t("footer.contact")}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 justify-center md:justify-start">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FF1D8E]" />
                                <span className="text-sm text-white/60">
                                    {isEl ? "Ελλάδα" : "Greece"}
                                </span>
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
                        
                        <div className="flex justify-center items-center gap-4 bg-white/5 px-4 py-2 rounded-xl opacity-80 hover:opacity-100 transition-opacity">
                            <svg className="h-4 w-auto text-white fill-current" viewBox="0 0 100 32" aria-label="Visa">
                              <path d="M37.1 2.3L24.3 30.5h-6.7L10.5 8.7c-.5-1.9-1.3-2.6-2.9-3.4C5.2 4 1.7 2.8 0 2.4l.2-.9h10.9c1.4 0 2.7 1 3 2.6l2.7 14.1L23.7 2.3h13.4zm28.8 19c.1-7.4-10.3-7.8-10.2-11.1 0-1 1-2.1 3.2-2.3 1.1-.1 4.1-.2 7.5 1.4l1.3-6.2C66.1 2.5 63.3 2 60 2c-6.6 0-11.3 3.5-11.3 8.6 0 3.7 3.3 5.8 5.8 7 2.6 1.3 3.5 2.1 3.5 3.3 0 1.8-2.1 2.6-4.1 2.6-3.4 0-5.4-.5-8.3-1.8l-1.4 6.7c2.1.9 6 1.7 10 1.7 7.1 0 11.7-3.5 11.7-8.8zm18.3 9.2h5.8L85 2.3h-5.4c-1.2 0-2.2.7-2.7 1.8L66.7 30.5h6.7l1.3-3.7h8.2l1.3 3.7zm-7.1-8.7l3.4-9.3 1.9 9.3h-5.3zM45.7 2.3l-5.3 28.2h-6.4L39.3 2.3h6.4z"/>
                            </svg>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Maestro_logo.svg" alt="Maestro" className="h-5" />
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
