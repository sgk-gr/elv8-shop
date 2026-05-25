"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/woocommerce";
import { WooProduct } from "@/types/product";
import ProductGridWithLoadMore from "@/components/ProductGridWithLoadMore";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AndrikaRoloiaPage() {
    // Φέρνουμε τα προϊόντα για την κατηγορία Ρολόι Χειρός (ID: 27)
    const { data: products = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", { category: "27" }],
        queryFn: () => getProducts({ per_page: "100", category: "27" }),
    });

    return (
        <main className="container mx-auto px-4 md:px-8 py-12 md:py-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Αρχική</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/products?category=25" className="hover:text-primary transition-colors">Ανδρικά</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-primary font-medium">Ρολόι Χειρός</span>
            </nav>

            <div className="space-y-4 mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#C4196D]">
                    Ανδρικά Ρολόγια Χειρός
                </h1>
                <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
                    Επιλέξτε ανάμεσα σε μοναδικά ανδρικά ρολόγια χειρός. 
                    Σχεδιασμοί που συνδυάζουν τη λειτουργικότητα με την απόλυτη κομψότητα, ιδανικά για κάθε στιγμή.
                </p>
                <div className="flex items-center gap-2 pt-4">
                    <span className="text-sm font-medium text-muted-foreground">
                        {products.length} {products.length === 1 ? "προϊόν" : "προϊόντα"}
                    </span>
                </div>
            </div>

            {products.length === 0 && !isLoading ? (
                (<div className="text-center py-32 space-y-4 bg-secondary/20 rounded-[2rem] border border-dashed border-border">
                    <p className="text-muted-foreground font-display text-2xl font-medium">Δεν βρέθηκαν προϊόντα σε αυτή την κατηγορία</p>
                    <Link href="/products?category=25" className="inline-block text-primary font-body text-sm font-semibold border-b border-primary">
                        Δείτε όλα τα ανδρικά κοσμήματα
                    </Link>
                </div>)
            ) : (
                <ProductGridWithLoadMore 
                    products={products} 
                    isLoading={isLoading} 
                    emptyMessage="Δεν βρέθηκαν προϊόντα σε αυτή την κατηγορία"
                />
            )}
        </main>
    );
}
