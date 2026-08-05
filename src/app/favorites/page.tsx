"use client";

import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <main className="min-h-screen pt-28 pb-20 md:pt-36 bg-white relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Blobs */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -left-[10vw] top-[5%] w-[40vw] h-[40vw] bg-[#FF1D8E]/10 rounded-full blur-3xl" />
                <div className="absolute -right-[10vw] top-[20%] w-[40vw] h-[40vw] bg-[#FDE047]/20 rounded-full blur-3xl" />
            </div>

            <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex justify-center items-center">


                {/* Products Grid */}
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                        {favorites.map((product) => (
                            <ProductCard key={product.id} product={product} backUrl="/favorites" />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 px-6 w-full max-w-xl text-center bg-slate-50/80 border border-slate-200/80 rounded-3xl space-y-6 shadow-sm">
                        <div className="w-24 h-24 rounded-full bg-white border border-pink-200 shadow-md flex items-center justify-center text-[#FF1D8E]">
                            <Heart className="w-12 h-12 text-[#FF1D8E]" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                                Your Wishlist is Empty
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                                Discover our natural, zero-sugar energy drinks and tap the heart icon on any flavor to save it here.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-[#FF1D8E] text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#FF1D8E]/20"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Explore Flavors
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
