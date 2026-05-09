"use client";

import { WooProduct } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: WooProduct[];
    isLoading: boolean;
    backUrl?: string;
}

export default function ProductCarousel({ title, subtitle, products, isLoading, backUrl }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!isLoading && products.length === 0) return null;

    return (
        <section className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#C4196D]">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-muted-foreground text-sm font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="relative group/carousel">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#C4196D] hover:text-white hidden md:flex"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#C4196D] hover:text-white hidden md:flex"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {isLoading ? (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[280px] space-y-4 animate-pulse">
                                <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                                <div className="space-y-2">
                                    <div className="h-5 bg-secondary rounded-full w-3/4" />
                                    <div className="h-4 bg-secondary rounded-full w-1/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                    >
                        {products.map((product: WooProduct) => (
                            <div key={product.id} className="flex-shrink-0 w-[280px]">
                                <ProductCard product={product} backUrl={backUrl} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
