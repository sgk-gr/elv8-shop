"use client";

import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <main className="min-h-screen py-20">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-12 space-y-4 animate-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-3">
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                            Τα Αγαπημένα μου
                        </h1>
                    </div>
                    <p className="text-muted-foreground font-body text-sm max-w-lg leading-relaxed">
                        {favorites.length > 0
                            ? `Έχετε ${favorites.length} ${favorites.length === 1 ? "προϊόν" : "προϊόντα"} στη λίστα αγαπημένων σας`
                            : "Δεν έχετε προσθέσει ακόμα προϊόντα στα αγαπημένα σας"}
                    </p>
                </div>

                {/* Products Grid */}
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-1000">
                        {favorites.map((product) => (
                            <ProductCard key={product.id} product={product} backUrl="/favorites" />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in fade-in zoom-in duration-700">
                        <div className="w-32 h-32 rounded-full bg-secondary/50 flex items-center justify-center">
                            <Heart className="w-16 h-16 text-muted-foreground" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="font-display text-2xl font-bold">
                                Η λίστα αγαπημένων σας είναι άδεια
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                Ανακαλύψτε τα προϊόντα μας και προσθέστε τα αγαπημένα σας πατώντας το εικονίδιο καρδιάς
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-[#c4196d] text-white px-8 py-4 rounded-full font-body text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg hover:shadow-[#c4196d]/20"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Δείτε τα Προϊόντα
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
