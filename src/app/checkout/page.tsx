"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ArrowRight, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/woocommerce";
import { WooProduct } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useTranslation } from "@/context/LanguageContext";

const WC_STORE_URL = "https://store.elv8now.com";

export default function CheckoutPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const { t, language } = useTranslation();
    const isEl = language === "el";

    const { data: relatedProducts } = useQuery<WooProduct[]>({
        queryKey: ["related-products", "checkout"],
        queryFn: () => getProducts({ per_page: "5" }),
        enabled: items.length > 0,
    });

    const [showEmbeddedCheckout, setShowEmbeddedCheckout] = useState(false);
    const [iframeLoading, setIframeLoading] = useState(true);

    const itemsParam = items.map((i) => `${i.variationId || i.product.id}:${i.quantity}`).join(',');
    let checkoutUrl = `${WC_STORE_URL}/?fill-cart=${itemsParam}`;
    if (user?.email) {
        checkoutUrl += `&billing_email=${encodeURIComponent(user.email)}`;
    }

    const handleCheckout = () => {
        if (items.length === 0) return;
        setShowEmbeddedCheckout(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (items.length === 0) {
        return (
            <main className="container mx-auto px-4 md:px-8 py-16 md:py-24 text-center flex-1 flex flex-col items-center justify-center min-h-[65vh]">
                <h1 className="font-display text-3xl md:text-4xl font-light mb-4">{t("cart.empty")}</h1>
                <p className="text-muted-foreground font-body text-sm mb-8">{isEl ? "Προσθέστε προϊόντα για να συνεχίσετε." : "Add products to continue."}</p>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    {isEl ? "Συνέχεια Αγορών" : "Continue Shopping"}
                </Link>
            </main>
        );
    }

    if (showEmbeddedCheckout) {
        return (
            <main className="container mx-auto px-2 sm:px-4 pt-32 md:pt-36 pb-16 min-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between mb-4 px-2">
                    <button
                        onClick={() => { setShowEmbeddedCheckout(false); setIframeLoading(true); }}
                        className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold text-slate-600 hover:text-[#FF1D8E] transition-colors bg-slate-100/80 px-4 py-2 rounded-full shadow-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {t("checkout.back_to_cart")}
                    </button>
                    <span className="text-xs font-bold text-slate-400 font-body uppercase tracking-wider hidden sm:inline">
                        🔒 {t("checkout.secure")}
                    </span>
                </div>
                <div className="w-full flex-1 bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden min-h-[750px] relative">
                    {iframeLoading && (
                        <div className="absolute inset-0 bg-[#F7F5EC] flex flex-col items-center justify-center z-50 transition-opacity duration-300">
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative w-40 h-16 animate-pulse">
                                    <Image
                                        src="/elv8_logo.svg"
                                        alt="ELV8 Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-[#FF1D8E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2.5 h-2.5 bg-[#FF1D8E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2.5 h-2.5 bg-[#FF1D8E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                                <span className="text-sm font-black text-slate-900 font-body tracking-wider uppercase">
                                    {t("checkout.preparing")}
                                </span>
                            </div>
                        </div>
                    )}
                    <iframe
                        src={checkoutUrl}
                        title="Secure Checkout"
                        className="w-full h-full min-h-[750px] border-none"
                        allow="payment"
                        style={{ minHeight: "750px" }}
                        onLoad={() => setIframeLoading(false)}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-3 sm:px-4 md:px-8 pt-32 md:pt-36 pb-16">
            <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-body text-xs sm:text-sm font-bold text-slate-600 hover:text-[#FF1D8E] transition-colors mb-6 md:mb-8 bg-slate-100/80 px-4 py-2 rounded-full w-fit shadow-2xs"
            >
                <ChevronLeft className="w-4 h-4" />
                {isEl ? "Συνέχεια Αγορών" : "Continue Shopping"}
            </Link>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 md:mb-10">{t("cart.title")}</h1>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16">
                {/* Cart items */}
                <div className="lg:col-span-2 space-y-0">
                    {/* Header */}
                    <div className="hidden md:grid grid-cols-[1fr_120px_120px_40px] gap-4 pb-4 border-b border-border">
                        <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">{isEl ? "Προϊόν" : "Product"}</span>
                        <span className="font-body text-xs tracking-widest uppercase text-muted-foreground text-center">{isEl ? "Ποσότητα" : "Quantity"}</span>
                        <span className="font-body text-xs tracking-widest uppercase text-muted-foreground text-right">{isEl ? "Τιμή" : "Price"}</span>
                        <span />
                    </div>

                    {items.map((item) => {
                        const image = item.product.images?.[0];
                        const lineTotal = parseFloat(item.product.price || "0") * item.quantity;
                        const itemKey = `${item.product.id}-${item.variationId || 0}`;

                        return (
                            <div
                                key={itemKey}
                                className="grid grid-cols-[60px_1fr] sm:grid-cols-[70px_1fr] md:grid-cols-[80px_1fr_120px_120px_40px] gap-3 sm:gap-4 py-4 sm:py-5 md:py-6 border-b border-border items-center"
                            >
                                {/* Image — clickable */}
                                <Link
                                    href={`/product/${item.product.id}/?backUrl=${encodeURIComponent("/checkout")}`}
                                    className="w-[60px] h-[75px] sm:w-[70px] sm:h-[85px] md:w-20 md:h-24 bg-secondary flex-shrink-0 overflow-hidden rounded-sm hover:opacity-80 transition-opacity"
                                >
                                    {image && (
                                        <img src={image.src} alt={image.alt || item.product.name} className="w-full h-full object-cover" />
                                    )}
                                </Link>

                                {/* Name + Price (mobile) */}
                                <div className="min-w-0">
                                    <Link
                                        href={`/product/${item.product.id}/?backUrl=${encodeURIComponent("/checkout")}`}
                                        className="font-body text-xs sm:text-sm font-medium leading-tight mb-1 line-clamp-2 hover:text-primary transition-colors block"
                                        dangerouslySetInnerHTML={{ __html: item.product.name }}
                                    />

                                    {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1.5 sm:mb-2">
                                            {Object.entries(item.selectedAttributes).map(([name, value]) => (
                                                <span key={name} className="text-[9px] sm:text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 uppercase tracking-wider rounded-sm">
                                                    {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <p className="font-body text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-0">{item.product.price}€</p>

                                    {/* Mobile quantity + remove */}
                                    <div className="flex items-center justify-between mt-2 sm:mt-3 md:hidden">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variationId)}
                                                className="w-9 h-9 sm:w-10 sm:h-10 border border-border flex items-center justify-center hover:bg-secondary active:bg-secondary/80 transition-colors rounded-sm"
                                                aria-label={isEl ? "Μείωση ποσότητας" : "Decrease quantity"}
                                            >
                                                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            </button>
                                            <span className="w-11 sm:w-12 h-9 sm:h-10 border-y border-border flex items-center justify-center font-body text-sm sm:text-base font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variationId)}
                                                className="w-9 h-9 sm:w-10 sm:h-10 border border-border flex items-center justify-center hover:bg-secondary active:bg-secondary/80 transition-colors rounded-sm"
                                                aria-label={isEl ? "Αύξηση ποσότητας" : "Increase quantity"}
                                            >
                                                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-body text-sm sm:text-base font-semibold">{lineTotal.toFixed(2)}€</span>
                                            <button
                                                onClick={() => removeItem(item.product.id, item.variationId)}
                                                className="text-muted-foreground hover:text-destructive active:text-destructive/80 transition-colors p-1.5"
                                                aria-label={isEl ? "Αφαίρεση προϊόντος" : "Remove product"}
                                            >
                                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop quantity */}
                                <div className="hidden md:flex items-center justify-center">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variationId)}
                                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                        aria-label={isEl ? "Μείωση ποσότητας" : "Decrease quantity"}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-10 h-8 border-y border-border flex items-center justify-center font-body text-sm">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variationId)}
                                        className="w-8 h-8 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                        aria-label={isEl ? "Αύξηση ποσότητας" : "Increase quantity"}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>

                                {/* Desktop line total */}
                                <div className="hidden md:block text-right">
                                    <span className="font-body text-sm font-medium">€{lineTotal.toFixed(2)}</span>
                                </div>

                                {/* Desktop remove */}
                                <div className="hidden md:flex justify-center">
                                    <button
                                        onClick={() => removeItem(item.product.id, item.variationId)}
                                        className="text-muted-foreground hover:text-foreground p-1"
                                        aria-label={isEl ? "Αφαίρεση προϊόντος" : "Remove product"}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order summary */}
                <div className="lg:col-span-1">
                    <div className="bg-secondary/50 p-4 sm:p-5 md:p-6 lg:p-8 lg:sticky lg:top-24 rounded-sm">
                        <h2 className="font-display text-lg sm:text-xl mb-4 sm:mb-5 md:mb-6">{isEl ? "Σύνοψη Παραγγελίας" : "Order Summary"}</h2>

                        <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                            {items.map((item) => {
                                const itemKey = `${item.product.id}-${item.variationId || 0}`;
                                return (
                                    <div key={itemKey} className="flex justify-between font-body text-xs sm:text-sm gap-3">
                                        <div className="flex flex-col min-w-0 pr-2">
                                            <span className="text-muted-foreground truncate">
                                                {item.quantity}x <span dangerouslySetInnerHTML={{ __html: item.product.name }} />
                                            </span>
                                            {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                                <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase opacity-70 mt-0.5">
                                                    {Object.values(item.selectedAttributes).join(", ")}
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-medium whitespace-nowrap">€{(parseFloat(item.product.price || "0") * item.quantity).toFixed(2)}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-border pt-3 sm:pt-4 mb-5 sm:mb-6">
                            <div className="flex justify-between items-center">
                                <span className="font-body text-xs sm:text-sm uppercase tracking-widest">{t("cart.subtotal")}</span>
                                <span className="font-display text-xl sm:text-2xl">€{totalPrice.toFixed(2)}</span>
                            </div>
                            <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5">
                                {isEl ? "Τα μεταφορικά υπολογίζονται στο ταμείο" : "Shipping calculated at checkout"}
                            </p>
                        </div>

                        <Button
                            onClick={handleCheckout}
                            className="w-full h-12 font-body text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all shadow-md bg-black hover:bg-[#FF1D8E] text-white"
                        >
                            {t("cart.checkout")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            {relatedProducts && relatedProducts.length > 0 && (
                <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-border pb-6">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8 text-center">
                        {isEl ? "Μπορεί να σας αρέσει επίσης" : "You may also like"}
                    </h2>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full pb-4"
                    >
                        <CarouselContent className="-ml-3 sm:-ml-4">
                            {relatedProducts.map((product) => (
                                <CarouselItem key={product.id} className="pl-3 sm:pl-4 basis-[70%] sm:basis-[45%] md:basis-[33.33%] lg:basis-[20%]">
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            )}
        </main>
    );
}
