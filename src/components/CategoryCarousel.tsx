"use client";

import { WooCategory } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface CategoryCarouselProps {
    categories: WooCategory[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const validCategories = categories.filter(c => c.count > 0 && c.slug !== 'uncategorized' && c.parent === 0);

    if (validCategories.length === 0) return null;

    return (
        <section className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-2">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#C4196D]">
                        Εξερευνήστε Κατηγορίες
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium">
                        Βρείτε ακριβώς αυτό που ψάχνετε
                    </p>
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

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                >
                    {validCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            className="flex-shrink-0 w-[280px] group relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {cat.image ? (
                                <Image
                                    src={cat.image.src}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                    <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">No Image</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="font-display text-xl md:text-2xl text-white font-bold tracking-wide" dangerouslySetInnerHTML={{ __html: cat.name }} />
                                <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 block">
                                    {cat.count} Προϊόντα
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
