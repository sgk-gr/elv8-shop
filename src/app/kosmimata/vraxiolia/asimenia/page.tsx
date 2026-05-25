"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/woocommerce";
import { WooProduct } from "@/types/product";
import ProductGridWithLoadMore from "@/components/ProductGridWithLoadMore";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AsimeniaBraceletsPage() {
    // Φέρνουμε τα προϊόντα για την κατηγορία ασημένια
    const { data: products = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", { category: "24" }],
        queryFn: () => getProducts({ per_page: "100", category: "24" }),
    });

    return (
        <main className="container mx-auto px-4 md:px-8 py-12 md:py-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Αρχική</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/products" className="hover:text-primary transition-colors">Κοσμήματα</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/products?category=16" className="hover:text-primary transition-colors">Βραχιόλια</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-primary font-medium">Ασημένια</span>
            </nav>

            <div className="space-y-4 mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#C4196D]">
                    Ασημένια
                </h1>
                <p className="text-muted-foreground font-body max-w-2xl leading-relaxed">
                    Ανακαλύψτε τη συλλογή μας από κομψά ασημένια βραχιόλια. 
                    Διαχρονικά κοσμήματα που προσδίδουν λάμψη και στυλ σε κάθε σας εμφάνιση.
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
                    <Link href="/products?category=16" className="inline-block text-primary font-body text-sm font-semibold border-b border-primary">
                        Δείτε όλα τα βραχιόλια
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
