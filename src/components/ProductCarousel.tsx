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
    const isMouseDown = useRef(false);
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isMouseDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeftPos.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.scrollBehavior = 'auto'; // Disable CSS smooth scroll while dragging
    };

    const handleMouseLeave = () => {
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = 'smooth';
        }
        isMouseDown.current = false;
    };

    const handleMouseUp = () => {
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = 'smooth';
        }
        isMouseDown.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!isLoading && products.length === 0) return null;

    return (
        <section className="w-full px-4 md:px-8">
            <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
                <div className="flex items-baseline gap-4">
                    <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-slate-500 text-xs md:text-sm font-medium hidden sm:block">
                            {subtitle}
                        </p>
                    )}
                </div>
                <a
                    href="/products"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm"
                >
                    View All
                    <ChevronRight className="w-3.5 h-3.5" />
                </a>
            </div>

            <div className="relative group/carousel w-full px-2 md:px-12">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 p-3.5 sm:p-4 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800 opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#FF1D8E] hover:text-white hover:border-[#FF1D8E] flex items-center justify-center cursor-pointer"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 p-3.5 sm:p-4 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-slate-800 opacity-90 sm:opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#FF1D8E] hover:text-white hover:border-[#FF1D8E] flex items-center justify-center cursor-pointer"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {isLoading ? (
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[300px] sm:w-[340px] space-y-4 animate-pulse">
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
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 px-2 cursor-grab active:cursor-grabbing select-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product: WooProduct) => (
                            <div key={product.id} className="flex-shrink-0 w-[300px] sm:w-[340px]">
                                <ProductCard product={product} backUrl={backUrl} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
