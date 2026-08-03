import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | ELV8 Energy",
    description:
        "ELV8 Energy privacy policy. Information on how we collect, use, and protect your personal data in compliance with GDPR.",
    openGraph: {
        title: "Privacy Policy | ELV8 Energy",
        description: "Information on how we protect your personal data (GDPR).",
        url: "https://elv8now.com/privacy",
    },
    alternates: { canonical: "https://elv8now.com/privacy" },
    robots: { index: false, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
