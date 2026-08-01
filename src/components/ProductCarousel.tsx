"use client";

import { WooProduct } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: WooProduct[];
    isLoading: boolean;
    backUrl?: string;
}

function ProductAqaCard({ product }: { product: WooProduct }) {
    const { addItem, setIsCartOpen } = useCart();
    const router = useRouter();

    const imageUrl =
        product.images?.[0]?.src ||
        product.images?.[0]?.thumbnail ||
        "/elv8-can-clean.png";

    const price = parseFloat(product.price || product.regular_price || "0");
    const formattedPrice = `€${price.toFixed(2)}`;

    // Short display name: strip "ELV8" prefix and "Energy Drink" suffix for cleaner labels
    const shortName = product.name
        .replace(/ELV8\s*/i, "")
        .replace(/Energy Drink.*/i, "")
        .trim() || product.name;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(product, 1);
        setIsCartOpen(true);
    };

    const handleStoreLocator = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/store-locator");
    };

    return (
        <div
            className="group cursor-pointer select-none"
            onClick={() => router.push(`/product/${product.id}`)}
        >
            {/* Card */}
            <div className="relative bg-[#D6EEF8] rounded-[28px] px-5 pb-5 pt-0 flex flex-col items-center transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">

                {/* Big Can Image — centered inside card, top portion */}
                <div className="relative w-[160px] h-[220px] -mt-10 mb-3 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 z-10">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="160px"
                    />
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-slate-900 text-[17px] text-left w-full mb-1 line-clamp-2 min-h-[2.6rem] leading-tight">
                    {shortName}
                </h3>

                {/* Size & Price Row */}
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-slate-500 text-sm font-normal">330mL</span>
                    <span className="font-bold text-slate-900 text-[17px]">{formattedPrice}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full">
                    <button
                        onClick={handleStoreLocator}
                        className="flex-1 bg-[#1E4D7B] hover:bg-[#163a5e] text-white text-[13px] font-semibold rounded-xl py-2.5 px-3 transition-colors duration-200"
                    >
                        Find stokiest
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#1E4D7B] hover:bg-[#FF1D8E] text-white text-[13px] font-semibold rounded-xl py-2.5 px-3 transition-colors duration-200"
                    >
                        Order now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductCarousel({ title, products, isLoading }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isMouseDown = useRef(false);
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        isMouseDown.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeftPos.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.scrollBehavior = "auto";
    };

    const handleMouseLeave = () => {
        if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth";
        isMouseDown.current = false;
    };

    const handleMouseUp = () => {
        if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth";
        isMouseDown.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        scrollRef.current.scrollLeft = scrollLeftPos.current - (x - startX.current) * 1.5;
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - 320 : scrollLeft + 320,
                behavior: "smooth",
            });
        }
    };

    if (!isLoading && products.length === 0) return null;

    // Title: first word bold dark blue, rest italic pink (like "Aqa lite Suited to Your Expectations")
    const words = title.split(" ");
    const boldPart = words.slice(0, 1).join(" ");
    const italicPart = words.slice(1).join(" ");

    return (
        <section className="w-full px-6 md:px-12 py-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 max-w-7xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl leading-tight max-w-xs md:max-w-none">
                    <span className="font-black text-[#1E4D7B]">{boldPart} </span>
                    <span className="font-black italic text-[#3BB4E8]">{italicPart}</span>
                </h2>

                {/* Arrow Buttons */}
                <div className="flex gap-2 mt-1 shrink-0">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-[#D6EEF8] hover:bg-[#1E4D7B] hover:text-white text-[#1E4D7B] flex items-center justify-center transition-colors duration-200"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-[#D6EEF8] hover:bg-[#1E4D7B] hover:text-white text-[#1E4D7B] flex items-center justify-center transition-colors duration-200"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative w-full max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex gap-6 overflow-x-auto pb-6 pt-12">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[240px] h-[340px] bg-[#D6EEF8] rounded-[28px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="flex gap-6 overflow-x-auto pb-8 pt-12 px-1 cursor-grab active:cursor-grabbing select-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product: WooProduct) => (
                            <div key={product.id} className="flex-shrink-0 w-[240px]">
                                <ProductAqaCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
