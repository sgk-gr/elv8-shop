"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import { WooProduct, WooTag } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Tag as TagIcon } from "lucide-react";

interface TagSectionProps {
    tag: WooTag;
}

export default function TagSection({ tag }: TagSectionProps) {
    const { data: tagProducts = [], isLoading } = useQuery<WooProduct[]>({
        queryKey: ["products", "tag", tag.id],
        queryFn: () => getProducts({ tag: String(tag.id), per_page: "4" }),
    });

    if (isLoading || tagProducts.length === 0) return null;

    return (
        <section className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <TagIcon className="w-5 h-5 text-primary" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                            {tag.name}
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                        {tag.count} {tag.count === 1 ? "προϊόν" : "προϊόντα"} διαθέσιμα
                    </p>
                </div>
                <Link
                    href={`/products?tag=${tag.id}`}
                    className="group flex items-center gap-2 bg-secondary/50 hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full transition-all duration-300"
                >
                    <span className="hidden md:inline font-body text-xs font-bold uppercase tracking-wider">Δείτε τα Όλα</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
                {tagProducts.map((product: WooProduct) => (
                    <div key={product.id} className="flex-shrink-0 w-[280px]">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
