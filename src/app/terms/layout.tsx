import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Όροι Χρήσης",
    description:
        "Οι όροι και προϋποθέσεις χρήσης του eshop Vaia Charms. Πληροφορίες για αγορές, παραδόσεις, επιστροφές και τα δικαιώματά σας ως καταναλωτής.",
    openGraph: {
        title: "Όροι Χρήσης | Vaia Charms",
        description: "Όροι και προϋποθέσεις χρήσης του Vaia Charms eshop.",
        url: "https://www.vaiacharms.gr/terms",
    },
    alternates: { canonical: "https://www.vaiacharms.gr/terms" },
    robots: { index: false, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
