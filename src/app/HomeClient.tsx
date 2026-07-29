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

export default function HomeClient({ 
    initialFeaturedProducts, 
    initialSaleProducts, 
    initialCategories, 
    initialTags 
}: { 
    initialFeaturedProducts: WooProduct[], 
    initialSaleProducts: WooProduct[], 
    initialCategories: WooCategory[], 
    initialTags: WooTag[] 
}) {

    const { data: products = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", "featured"],
        queryFn: () => getProducts({ per_page: "10", orderby: "date" }),
        initialData: initialFeaturedProducts,
    });

    const { data: saleProducts = [], isLoading: isLoadingSale } = useQuery<WooProduct[]>({
        queryKey: ["products", "on_sale"],
        queryFn: () => getProducts({ per_page: "10", on_sale: "true" }),
        initialData: initialSaleProducts,
    });

    const { data: categories = [] } = useQuery<WooCategory[]>({
        queryKey: ["categories", "homepage"],
        queryFn: () => getCategories({ hide_empty: "true" }),
        initialData: initialCategories,
    });

    const { data: tags = [] } = useQuery<WooTag[]>({
        queryKey: ["tags"],
        queryFn: () => getTags({ hide_empty: "true" }),
        initialData: initialTags,
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
                        sizes="100vw"
                        className="object-cover"
                        priority
                        fetchPriority="high"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 container mx-auto px-4 text-center space-y-6 md:space-y-10 animate-in fade-in zoom-in duration-1000">
                    <div className="space-y-4">
                        <span className="font-body text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-emerald-600 dark:text-emerald-400 block bg-emerald-100/80 dark:bg-emerald-950/80 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mx-auto border border-emerald-500/30">
                            ⚡ HIGH-PERFORMANCE ENERGY & FOCUS DRINK
                        </span>
                        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900">
                            ΕΝΕΡΓΕΙΑ ΧΩΡΙΣ ΟΡΙΑ. <br />
                            <span className="text-[#E50914] bg-clip-text">ZERO SUGAR.</span>
                        </h1>
                    </div>

                    <p className="font-body text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
                        Φυσική καφεΐνη, ηλεκτρολύτες, βιταμίνες B6/B12 και μέγιστη συγκέντρωση (Focus). Νιώσε την ανώτερη ενέργεια του elv8.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pt-4">
                        <Link
                            href="/products"
                            className="inline-flex items-center justify-center bg-[#E50914] text-white px-12 py-5 rounded-full font-body text-sm font-bold tracking-widest hover:scale-105 transition-all shadow-2xl hover:shadow-[#E50914]/40 min-w-[240px]"
                        >
                            ΑΓΟΡΑΣΕ ΤΩΡΑ
                        </Link>
                        <Link
                            href="/store-locator"
                            className="inline-flex items-center justify-center bg-slate-900 text-white px-12 py-5 rounded-full font-body text-sm font-bold tracking-widest hover:scale-105 transition-all shadow-2xl min-w-[240px] border border-slate-800"
                        >
                            📍 STORE LOCATOR
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
