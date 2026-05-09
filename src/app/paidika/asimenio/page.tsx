"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/woocommerce";
import { WooProduct } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PaidikaAsimenioPage() {
    // Φέρνουμε τα προϊόντα για την κατηγορία Παιδικά -> Ασημένιο (ID: 30)
    const { data: products = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", { category: "30" }],
        queryFn: () => getProducts({ per_page: "100", category: "30" }),
    });

    return (
        <main className="container mx-auto px-4 md:px-8 py-12 md:py-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Αρχική</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/products?category=29" className="hover:text-primary transition-colors">Παιδικά</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-primary font-medium">Ασημένιο</span>
            </nav>

            <div className="space-y-4 mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#C4196D]">
                    Παιδικά Ασημένια Κοσμήματα
                </h1>
                <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
                    Ανακαλύψτε τη συλλογή μας από παιδικά ασημένια κοσμήματα. 
                    Τρυφερά σχέδια και ασφαλή υλικά, ιδανικά για τα αγαπημένα σας πρόσωπα.
                </p>
                <div className="flex items-center gap-2 pt-4">
                    <span className="text-sm font-medium text-muted-foreground">
                        {products.length} {products.length === 1 ? "προϊόν" : "προϊόντα"}
                    </span>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-4 animate-pulse">
                            <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                            <div className="space-y-2">
                                <div className="h-5 bg-secondary rounded-full w-3/4" />
                                <div className="h-4 bg-secondary rounded-full w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-32 space-y-4 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
                    <p className="text-muted-foreground font-display text-2xl font-medium">Δεν βρέθηκαν προϊόντα σε αυτή την κατηγορία</p>
                    <Link href="/products?category=29" className="inline-block text-primary font-body text-sm font-semibold border-b border-primary">
                        Δείτε όλα τα παιδικά κοσμήματα
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-in fade-in duration-1000">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
