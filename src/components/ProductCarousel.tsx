"use client";

import { WooProduct } from "@/types/product";
import { ChevronLeft, ChevronRight, MapPin, ShoppingCart } from "lucide-react";
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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
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
            className="block group cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
        >
            <div className="relative bg-[#DFF0FA] rounded-3xl pt-16 pb-5 px-5 flex flex-col items-center min-w-[200px] w-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                {/* Product Can — overflows top */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-36 z-10 drop-shadow-xl transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="112px"
                    />
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-slate-900 text-base mt-2 text-center line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                </h3>

                {/* Size & Price Row */}
                <div className="flex items-center justify-between w-full mt-1 mb-4">
                    <span className="text-slate-500 text-xs font-medium">330mL</span>
                    <span className="font-bold text-slate-900 text-base">{formattedPrice}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full">
                    <button
                        onClick={handleStoreLocator}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#1a3a5c] hover:bg-[#0f2744] text-white text-[11px] font-bold rounded-xl py-2.5 px-2 transition-colors duration-200"
                    >
                        <MapPin className="w-3 h-3 shrink-0" />
                        Find stockist
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#1a3a5c] hover:bg-[#FF1D8E] text-white text-[11px] font-bold rounded-xl py-2.5 px-2 transition-colors duration-200"
                    >
                        <ShoppingCart className="w-3 h-3 shrink-0" />
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
                left: direction === "left" ? scrollLeft - clientWidth * 0.7 : scrollLeft + clientWidth * 0.7,
                behavior: "smooth",
            });
        }
    };

    if (!isLoading && products.length === 0) return null;

    // Split title into two parts for styled heading
    const titleWords = title.split(" ");
    const firstWord = titleWords[0];
    const restWords = titleWords.slice(1).join(" ");

    return (
        <section className="w-full px-4 md:px-8 py-4">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-10 max-w-7xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900">
                    <span className="font-black text-[#1a3a5c]">{firstWord} </span>
                    <span className="font-black italic text-[#FF1D8E]">{restWords || "Suited to Your Expectations"}</span>
                </h2>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-[#DFF0FA] hover:bg-[#1a3a5c] hover:text-white text-[#1a3a5c] flex items-center justify-center transition-colors duration-200 shadow-sm"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-[#DFF0FA] hover:bg-[#1a3a5c] hover:text-white text-[#1a3a5c] flex items-center justify-center transition-colors duration-200 shadow-sm"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative w-full max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex gap-6 overflow-x-auto pb-6 pt-14">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-[200px] h-[260px] bg-[#DFF0FA] rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="flex gap-5 sm:gap-7 overflow-x-auto pb-6 pt-14 px-2 cursor-grab active:cursor-grabbing select-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product: WooProduct) => (
                            <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[220px]">
                                <ProductAqaCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
