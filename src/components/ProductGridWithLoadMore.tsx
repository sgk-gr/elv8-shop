import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { WooProduct } from "@/types/product";
import { Plus } from "lucide-react";

interface ProductGridWithLoadMoreProps {
    products: WooProduct[];
    isLoading: boolean;
    emptyMessage?: string;
    columnsClass?: string;
}

export default function ProductGridWithLoadMore({
    products,
    isLoading,
    emptyMessage = "Δεν βρέθηκαν προϊόντα",
    columnsClass = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
}: ProductGridWithLoadMoreProps) {
    const [visibleCount, setVisibleCount] = useState(6);

    // Reset visible count back to 6 when products list changes (e.g. filters are applied)
    useEffect(() => {
        setVisibleCount(6);
    }, [products]);

    if (isLoading) {
        return (
            <div className={`grid ${columnsClass} gap-6 md:gap-8`}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-4 animate-pulse">
                        <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                        <div className="space-y-2">
                            <div className="h-5 bg-secondary rounded-full w-3/4" />
                            <div className="h-4 bg-secondary rounded-full w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-32 space-y-4 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
                <p className="text-muted-foreground font-display text-2xl font-medium">{emptyMessage}</p>
            </div>
        );
    }

    const visibleProducts = products.slice(0, visibleCount);
    const hasMore = products.length > visibleCount;

    return (
        <div className="space-y-12">
            <div className={`grid ${columnsClass} gap-6 md:gap-8 animate-in fade-in duration-1000`}>
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="inline-flex items-center gap-2 bg-[#FCF8F8] hover:bg-[#C4196D] text-slate-900 hover:text-white px-8 py-4 rounded-full font-body text-xs font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-lg border border-slate-100 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        ΦΟΡΤΩΣΗ ΠΕΡΙΣΣΟΤΕΡΩΝ
                    </button>
                </div>
            )}
        </div>
    );
}
