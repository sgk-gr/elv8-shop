import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions (FAQ) | ELV8 Energy",
    description:
        "Answers to frequently asked questions about ELV8 Energy drinks, orders, shipping, payment methods, and returns. Delivery in 2-4 business days, free shipping over €65.",
    openGraph: {
        title: "Frequently Asked Questions | ELV8 Energy",
        description: "Find answers to questions about orders, shipping, and ELV8 products.",
        url: "https://elv8now.com/faq",
    },
    alternates: { canonical: "https://elv8now.com/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
