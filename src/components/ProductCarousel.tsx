"use client";

import { WooProduct } from "@/types/product";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, MapPin } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: WooProduct[];
    isLoading: boolean;
    backUrl?: string;
}

function ProductAqaCard({ product }: { product: WooProduct }) {
    const { addItem, setIsCartOpen } = useCart();
    const { isFavorite, toggleFavorite } = useFavorites();
    const router = useRouter();
    const favorite = isFavorite(product.id);

    const imageUrl =
        product.images?.[0]?.src ||
        product.images?.[0]?.thumbnail ||
        "/elv8-can-clean.png";

    const price = parseFloat(product.price || product.regular_price || "0");
    const formattedPrice = `€${price.toFixed(2)}`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem(product, 1);
        setIsCartOpen(true);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(product);
    };

    const handleStoreLocator = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/store-locator");
    };

    return (
        <div
            className="group cursor-pointer relative"
            onClick={() => router.push(`/product/${product.id}`)}
        >
            {/* Card */}
            <div className="relative bg-[#FFF0F7] rounded-[28px] px-5 pb-5 pt-0 flex flex-col items-center transition-all duration-300 group-hover:-translate-y-2 border border-pink-100">
                {/* Heart / Favorite Button */}
                <button
                    onClick={handleToggleFavorite}
                    aria-label="Add to favorites"
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all duration-200"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                            favorite
                                ? "fill-red-500 text-red-500"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    />
                </button>

                {/* Big Can Image — centered inside card, top portion */}
                <div className="relative w-[200px] h-[280px] -mt-14 mb-4 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105 z-10">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="200px"
                    />
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-slate-900 text-[13px] text-left w-full mb-1 line-clamp-2 min-h-[2.6rem] leading-snug">
                    {product.name}
                </h3>

                {/* Size & Price Row */}
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-slate-500 text-sm font-normal">250ml</span>
                    <span className="font-bold text-slate-900 text-[17px]">{formattedPrice}</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 w-full">
                    <button
                        onClick={handleStoreLocator}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1E4D7B] hover:bg-[#163a5e] text-white text-[12px] font-semibold rounded-xl py-2.5 px-2 transition-colors duration-200"
                    >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        Stockists
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FF1D8E] hover:bg-[#e0187f] text-white text-[12px] font-semibold rounded-xl py-2.5 px-2 transition-colors duration-200"
                    >
                        <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductCarousel({ title, products, isLoading }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
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
                    <span className="font-black text-slate-900">{boldPart} </span>
                    <span className="font-black italic text-[#FF1D8E]">{italicPart}</span>
                </h2>

                {/* Arrow Buttons */}
                <div className="flex gap-2 mt-1 shrink-0">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#FF1D8E] hover:text-white text-slate-900 flex items-center justify-center transition-colors duration-200"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#FF1D8E] hover:text-white text-slate-900 flex items-center justify-center transition-colors duration-200"
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
                        className="flex gap-6 overflow-x-auto pb-8 pt-16 px-1 touch-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product: WooProduct) => (
                            <div key={product.id} className="flex-shrink-0 w-[320px]">
                                <ProductAqaCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
