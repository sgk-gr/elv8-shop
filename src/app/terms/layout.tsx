import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Use | ELV8 Energy",
    description:
        "Terms and conditions of use for ELV8 Energy. Information on purchases, delivery, returns, and consumer rights.",
    openGraph: {
        title: "Terms of Use | ELV8 Energy",
        description: "Terms and conditions of use for ELV8 Energy.",
        url: "https://elv8now.com/terms",
    },
    alternates: { canonical: "https://elv8now.com/terms" },
    robots: { index: false, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
