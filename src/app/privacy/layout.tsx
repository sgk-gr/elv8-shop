import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Πολιτική Απορρήτου",
    description:
        "Η πολιτική απορρήτου του Vaia Charms. Πληροφορίες για τον τρόπο συλλογής, χρήσης και προστασίας των προσωπικών δεδομένων σας σύμφωνα με τον GDPR.",
    openGraph: {
        title: "Πολιτική Απορρήτου | Vaia Charms",
        description: "Πληροφορίες για την προστασία των προσωπικών δεδομένων σας (GDPR).",
        url: "https://www.vaiacharms.gr/privacy",
    },
    alternates: { canonical: "https://www.vaiacharms.gr/privacy" },
    robots: { index: false, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
