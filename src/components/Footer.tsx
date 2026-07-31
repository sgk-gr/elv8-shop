"use client";

import Link from "next/link";
import { Instagram, Mail, Phone, MapPin, CreditCard, Shield, Truck, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Thank you! You have successfully subscribed to our newsletter! 🎉");
            setEmail("");
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <footer className="bg-black text-white">




            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6 flex flex-col items-center text-center">
                        <Link href="/" className="inline-block transition-transform hover:scale-105">
                            <span className="text-3xl font-black tracking-tight text-white font-display">
                                ELV<span className="text-[#FF1D8E]">8</span>
                            </span>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Real fruit energy. Zero sugar. 200mg Natural Caffeine & Electrolytes. Made for those who push limits.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF1D8E] flex items-center justify-center transition-all hover:scale-110"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?on_sale=true" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Special Offers
                                </Link>
                            </li>
                            <li>
                                <Link href="/account" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/checkout" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/about#wholesale" className="text-sm text-[#FF1D8E] font-bold transition-colors hover:underline">
                                    💼 B2B & Χονδρική
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Customer Service</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-methods" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    Payment Methods
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-white/60 transition-colors hover:text-[#FF1D8E]">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold text-lg">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#FF1D8E]" />
                                <span className="text-sm text-white/60">
                                    Greece
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
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
                            <p>© {currentYear} ELV8 Energy. All rights reserved.</p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-4 bg-white/5 px-4 py-2 rounded-xl opacity-80 hover:opacity-100 transition-opacity">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Maestro_logo.svg" alt="Maestro" className="h-5" />
                        </div>

                        <div className="text-center md:text-right">
                            <a
                                href="https://sgk.gr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm font-medium text-white/60 hover:text-white transition-all duration-300 hover:scale-105"
                            >
                                Developed by: <span className="text-white font-bold tracking-wide">sgk.gr</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
