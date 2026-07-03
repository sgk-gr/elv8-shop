"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, CreditCard, Shield, Truck, Send } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/logotipo13.png";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error("Παρακαλώ εισάγετε ένα έγκυρο email");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Ευχαριστούμε! Εγγραφήκατε επιτυχώς στο newsletter μας! 🎉");
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <footer className="bg-black text-white mt-20">
            {/* Top Section - Features */}
            <div className="border-b border-white/10">
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/50">
                                <Truck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-lg mb-1">Δωρεάν Μεταφορικά</h3>
                                <p className="text-sm text-white/60">Για παραγγελίες άνω των 65€</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/50">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-lg mb-1">Ασφαλείς Πληρωμές</h3>
                                <p className="text-sm text-white/60">100% ασφαλείς συναλλαγές</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-violet-500/50">
                                <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-lg mb-1">Πολιτική Επιστροφών</h3>
                                <p className="text-sm text-white/60">Εγγύηση αντικατάστασης ελαττωματικών</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="border-b border-white/10">
                <div className="container mx-auto px-4 md:px-8 py-6 md:py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-4 sm:p-6 rounded-2xl border border-primary/20 relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />

                            <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-display text-lg sm:text-xl font-bold">
                                            Εγγραφή στο Newsletter
                                        </h3>
                                    </div>
                                    <p className="text-white/80 text-sm sm:text-base mb-4">
                                        Μείνετε ενημερωμένοι για νέες αφίξεις και αποκλειστικές προσφορές!
                                    </p>
                                </div>

                                <div className="md:min-w-[320px]">
                                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Το email σας"
                                            className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-sm text-sm sm:text-base"
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-white hover:text-[#FFF2EB] rounded-full font-body font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span className="hidden sm:inline">Εγγραφή...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Εγγραφή</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                    <p className="text-white/50 text-[10px] sm:text-xs mt-2 sm:mt-3 text-center sm:text-left">
                                        Με την εγγραφή συμφωνείτε με την{" "}
                                        <Link href="/privacy" className="underline hover:text-[#FFF2EB] transition-colors">
                                            Πολιτική Απορρήτου
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <Link href="/" className="block group decoration-transparent">
                            <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center p-3 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-white/20">
                                <Image
                                    src={logoImg}
                                    alt="Vaia Charms"
                                    width={200}
                                    height={80}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Η κορυφαία επιλογή σας για ποιοτικά προϊόντα και μοναδικές εμπειρίες αγορών. Ανακαλύψτε τη συλλογή μας σήμερα.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Γρήγορες Συνδέσεις</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Προϊόντα
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?on_sale=true" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Προσφορές
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Ο Λογαριασμός μου
                                </Link>
                            </li>
                            <li>
                                <Link href="/checkout" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Καλάθι
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Εξυπηρέτηση Πελατών</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Όροι Χρήσης
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Πολιτική Απορρήτου
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Πολιτική Επιστροφών
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns/withdraw" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Υπαναχώρηση από Αγορά
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-methods" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Τρόποι Πληρωμής
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    Συχνές Ερωτήσεις
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Επικοινωνία</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F8F4EC' }} />
                                <span className="text-sm text-white/60">
                                    Καλή Βρύση<br />
                                    Προσοτσάνη, Τ.Κ. 66200
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#F8F4EC' }} />
                                <a href="tel:+306943105742" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    +30 694 310 5742
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#F8F4EC' }} />
                                <a href="mailto:info@vaiacharms.gr" className="text-sm text-white/60 transition-colors hover:text-[#FFF2EB]">
                                    info@vaiacharms.gr
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
                            <p>© {currentYear} Vaia Charms. Όλα τα δικαιώματα κατοχυρωμένα.</p>
                            <p className="text-xs text-white/30">
                                Επωνυμία: ΠΑΠΑΘΕΟΔΩΡΟΥ ΙΩΑΝΝΗΣ ΘΕΟΔΩΡΟΣ | Α.Φ.Μ.: 123622009
                            </p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-4 bg-white/5 px-4 py-2 rounded-xl opacity-80 hover:opacity-100 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Maestro_logo.svg" alt="Maestro" className="h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg" alt="Diners" className="h-5" />
                        </div>

                        <div className="text-center md:text-right">
                            <a
                                href="https://sgk.gr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm font-medium text-white/60 hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                Κατασκευή E-shop: <span className="text-white font-bold tracking-wide">sgk.gr</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
