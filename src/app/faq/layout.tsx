import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Συχνές Ερωτήσεις (FAQ)",
    description:
        "Απαντήσεις σε όλες τις συχνές ερωτήσεις για παραγγελίες, αποστολές, πληρωμές, επιστροφές και προϊόντα του Vaia Charms. Αποστολή 3-5 εργάσιμες μέρες, δωρεάν άνω των 65€.",
    openGraph: {
        title: "Συχνές Ερωτήσεις | Vaia Charms",
        description: "Βρείτε απαντήσεις σε ερωτήσεις για παραγγελίες, αποστολές και επιστροφές.",
        url: "https://www.vaiacharms.gr/faq",
    },
    alternates: { canonical: "https://www.vaiacharms.gr/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
