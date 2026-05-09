"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProducts, getCategories, getTags } from "@/lib/woocommerce";
import { WooProduct, WooCategory, WooTag } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import TagSection from "@/components/TagSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCarousel from "@/components/CategoryCarousel";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero-new.png";
import { useRef } from "react";

export default function HomePage() {
    const { data: products = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", "featured"],
        queryFn: () => getProducts({ per_page: "10", orderby: "date" }),
    });

    const { data: saleProducts = [], isLoading: isLoadingSale } = useQuery<WooProduct[]>({
        queryKey: ["products", "on_sale"],
        queryFn: () => getProducts({ per_page: "10", on_sale: "true" }),
    });

    const { data: categories = [] } = useQuery<WooCategory[]>({
        queryKey: ["categories", "homepage"],
        queryFn: () => getCategories({ hide_empty: "true" }),
    });

    const { data: tags = [] } = useQuery<WooTag[]>({
        queryKey: ["tags"],
        queryFn: () => getTags({ hide_empty: "true" }),
    });

    return (
        <main className="space-y-20 pb-20">
            {/* Hero Full Surface */}
            <section className="relative h-[85vh] md:h-[95vh] w-full flex items-center justify-center overflow-hidden">
                {/* Background Image with 10s Seamless Smooth Zoom Effect */}
                <div className="absolute inset-0 scale-100 animate-[ken-burns_10s_ease-in-out_infinite_alternate]">
                    <Image
                        src={heroImage}
                        alt="Fashion collection background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-4 text-center space-y-6 md:space-y-10 animate-in fade-in zoom-in duration-1000">
                    <div className="space-y-4">
                        <span className="font-body text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-slate-800/80 block">
                            EXCLUSIVE JEWELRY BOUTIQUE
                        </span>
                        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900">
                            η ζωή είναι πολύ <span className="text-[#C4196D]">μικρή</span><br />
                            για μέτρια κοσμήματα
                        </h1>
                    </div>

                    <p className="font-body text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Ανακαλύψτε τη μοναδική συλλογή μας από κοσμήματα.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pt-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center bg-[#C4196D] text-white px-12 py-5 rounded-full font-body text-sm font-bold tracking-widest hover:scale-105 transition-all shadow-2xl hover:shadow-[#C4196D]/40 min-w-[240px]"
                        >
                            ΔΕΙΤΕ ΤΗ ΣΥΛΛΟΓΗ
                        </Link>
                        <Link
                            href="/products?on_sale=true"
                            className="inline-flex items-center justify-center bg-[#FCF8F8] text-slate-900 px-12 py-5 rounded-full font-body text-sm font-bold tracking-widest hover:scale-105 transition-all shadow-2xl min-w-[240px] border border-slate-100"
                        >
                            SPECIAL OFFERS
                        </Link>
                    </div>
                </div>

                {/* Subtle gradient at the bottom for transition */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
            </section>

            {/* Categories Carousel */}
            <CategoryCarousel categories={categories} />


            {/* Featured Products */}
            <ProductCarousel 
                title="Νέες Αφίξεις"
                subtitle="Επιλεγμένα στυλ, μόνο για εσάς"
                products={products}
                isLoading={isLoading}
                backUrl="/"
            />

            {/* Sale Products */}
            <ProductCarousel 
                title="Προσφορές"
                subtitle="Προλάβετε τις καλύτερες τιμές"
                products={saleProducts}
                isLoading={isLoadingSale}
                backUrl="/"
            />
        </main>
    );
}
