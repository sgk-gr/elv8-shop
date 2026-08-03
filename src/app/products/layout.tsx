import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flavors & Collection | ELV8 Energy",
    description:
        "Explore all ELV8 Energy drink flavors and multi-packs. Zero Sugar, 200mg Natural Caffeine, Electrolytes & B-Vitamins. Free shipping on orders over €65.",
    openGraph: {
        title: "Flavors & Collection | ELV8 Energy",
        description: "Explore all ELV8 Energy drink flavors and multi-packs.",
        url: "https://elv8now.com/products",
    },
    alternates: {
        canonical: "https://elv8now.com/products",
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
