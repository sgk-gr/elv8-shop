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
                                <Link href="/b2b-wholesale" className="text-sm text-[#FF1D8E] font-bold transition-colors hover:underline">
                                    B2B Wholesale
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
                                <span className="text-white/70 font-medium text-base">Developed by:</span>
                                <span className="text-white font-black tracking-wider text-xl uppercase font-display">sgk.gr</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
