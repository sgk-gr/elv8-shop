import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Return Policy | ELV8 Energy",
    description:
        "Learn about the ELV8 Energy return policy. Replacement within 14 days for damaged or defective products.",
    openGraph: {
        title: "Return Policy | ELV8 Energy",
        description: "Replacements within 14 days for damaged or defective products.",
        url: "https://elv8now.com/returns",
    },
    alternates: { canonical: "https://elv8now.com/returns" },
};

export default function ReturnsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
