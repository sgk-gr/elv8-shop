import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Πολιτική Επιστροφών",
    description:
        "Μάθετε για την πολιτική επιστροφών και ανταλλαγών του Vaia Charms. Επιστροφές εντός 14 ημερών για ελαττωματικά ή λανθασμένα προϊόντα. Δωρεάν επιστροφή.",
    openGraph: {
        title: "Πολιτική Επιστροφών | Vaia Charms",
        description: "Επιστροφές εντός 14 ημερών για ελαττωματικά προϊόντα. Δωρεάν επιστροφή.",
        url: "https://www.vaiacharms.gr/returns",
    },
    alternates: { canonical: "https://www.vaiacharms.gr/returns" },
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
