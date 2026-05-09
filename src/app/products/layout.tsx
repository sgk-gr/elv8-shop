import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Συλλογές & Κατηγορίες",
    description:
        "Εξερευνήστε όλες τις κατηγορίες κοσμημάτων, cosmetics και αξεσουάρ στο Vaia Charms. Βραχιόλια, σκουλαρίκια, κολιέ, δαχτυλίδια, ρολόγια CLUSE και πολλά άλλα. Δωρεάν αποστολή άνω των 65€.",
    openGraph: {
        title: "Συλλογές & Κατηγορίες | Vaia Charms",
        description: "Εξερευνήστε όλες τις κατηγορίες κοσμημάτων, cosmetics και αξεσουάρ.",
        url: "https://www.vaiacharms.gr/products",
    },
    alternates: {
        canonical: "https://www.vaiacharms.gr/products",
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
